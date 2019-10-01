const concurrency = 8

const fs = require('fs')
const childProcess = require('child_process')
const tmp = require('tmp')
const sass = require('sass')
const { JSDOM } = require('jsdom')
const async = require('async')
const { toArray } = require('stringz')

const getURangesFromType = require('./uRangesGen/getURangesFromType')
const genURanges = require('./uRangesGen/genURanges')
const genCharStringArrFromType = require('./uRangesGen/genCharStringArrFromType')

const weights = {
  mplus: [
    ['thin', 100], ['light', 200], ['regular', 400], ['medium', 500], ['bold', 700], ['heavy', 800], ['black', 900]
  ],
  mplusm: [
    ['thin', 100], ['light', 200], ['regular', 400], ['medium', 500], ['bold', 700]
  ],
  SourceHanSans: [
    ['ExtraLight', 100], ['Light', 200], ['Normal', 300], ['Regular', 400], ['Medium', 500], ['Bold', 700], ['Heavy', 800]
  ],
  SourceHanSansHW: [
    ['Regular', 400], ['Bold', 700]
  ],
  SourceHanSerif: [
    ['ExtraLight', 100], ['Light', 200], ['Regular', 400], ['Medium', 500], ['SemiBold', 600], ['Bold', 700], ['Black', 800]
  ],
  irohakakuC: [
    ['ExtraLight', 100], ['Light', 200], ['Regular', 400], ['Medium', 500], ['Bold', 700]
  ]
}

const baseEntries = fs.readdirSync(`${process.cwd()}/text/chars`).map(n => n.slice(0, -4))

const latainEntries = ['latain', 'latainExtended', 'zenkakuLatain', 'latainSymbol', 'mathmeticalAlphanum']
const kanaEntries = ['katakana', 'hankakuKatakana', 'hiragana', 'katakanaSymbol', 'hiraganaSymbol', 'japaneseBase']
const kanjiEntries = ['shogakuseiKanji', 'joyoKanji', 'jinmeiyoKanji', 'hyogaiKanji', 'dai1suijunKanji', 'dai2suijunKanji', 'supportKanji', 'kanjiSymbol']
const japaneseEntries = [...kanaEntries, ...kanjiEntries]
const otherEntries = ['jisx0213Hikanji', 'unicodeHikanji']

const ranges = Object.fromEntries(baseEntries.map(e => [ e, { chars: genCharStringArrFromType(e), uranges: getURangesFromType(e) } ]))

const voidPromise = async () => { return }

const pyftsubsetq = async.queue(({s, type}, cb) => {
  const [ext, flavor] = type
  childProcess.exec(`pyftsubset "${s.fontFile}" --text-file="${s.unicodesFile}" --no-hinting --layout-features=${s.layoutFeatures.join(',')} --recommended-glyphs${flavor ? ` --flavor=${flavor}` : ''} --output-file="${s.outputFileName}${ext}"`, (err, stdout, stderr) => {
    if (err) {
      console.log('✖', `${s.outputFileName}${ext}`)
      cb(err)
      return;
    }
    console.log('☑', `${s.outputFileName}${ext}`)
    cb(null)
  })
}, concurrency)

const subset = s => {
  // await pyftsubset(s, [s.fontFile.slice(s.fontFile.lastIndexOf('.')), null])
  // await pyftsubset(s, ['.woff', 'woff'])
  pyftsubsetq.push({s, type: ['.woff2', 'woff2']})
  console.log('ⓘ', `Worker pushed: ${s.outputFileName}`)
}

const ffScss = ({ family, style, display, weight, fileName, uranges }) => {
  return `@font-face
  font-family: ${family}
  font-weight: ${weight}
  font-display: ${display}
  src: url('./${fileName}.woff2') format('woff2')
  unicode-range: ${uranges.join(',')}
`
}

const composeFull = async ({ fontName, ranges, srcFontBase = `base/${fontName}/${fontName}`, srcFontExt, tmpPath, weightSet = weights[fontName], cssHeader, layoutFeatures = [] }) => {
  console.log(`Compose: ${fontName}`)
  try {
    fs.mkdirSync(`${process.cwd()}/dist/${fontName}`)
  } catch(e) {
    // nanimosinai
  }

  const parser = new (new JSDOM()).window.DOMParser();

  const [fontChars] = await Promise.all([
    (new Promise((res, rej) => {
      childProcess.exec(`ttx -t cmap -o - "${process.cwd()}/src/${srcFontBase}-${weightSet[0][0]}${srcFontExt}"`, { maxBuffer: 1024 * 1024 * 16 }, (err, stdout, stderr) => {
        if (err) return rej(err)
        res(stdout)
      })
    })).then(xmlText => {
      const doc = parser.parseFromString(xmlText, "text/xml")
      const maps = doc.querySelector('cmap_format_12 > map') ? doc.querySelectorAll('cmap_format_12 > map')
                : doc.querySelector('cmap_format_6 > map')  ? doc.querySelectorAll('cmap_format_6 > map') : doc.querySelectorAll('cmap_format_4 > map')
      return Array.from(maps).map(e => String.fromCodePoint(e.getAttribute('code')))
    }),
    ...weightSet.map(w => {
      return new Promise((res, rej) => {
        try {
          fs.statSync(`${process.cwd()}/src/${srcFontBase}-${w[0]}.otf`)
        } catch(e) {
          childProcess.exec(`fontforge -script "${process.cwd()}/text/ttf2otf.sh" "${process.cwd()}/src/${srcFontBase}-${w[0]}${srcFontExt}"`, (err, stdout, stderr) => {
            if (err) return rej(err)
            res(stdout)
          })
          return
        }
        res()
      })
    })
  ])

  const cranges = {}

  for (const [r, { chars, uranges }] of Object.entries(ranges)) {
    const validChars = chars.filter(c => fontChars.indexOf(c) >= 0)
    if (validChars.length > 0){
      cranges[r] = { chars: validChars, uranges: validChars.length === chars.length ? uranges : genURanges(validChars)  }
      fs.writeFileSync(`${tmpPath}/${fontName}-${r}`, validChars.join(''))
    }
  }

  const csses = { header: cssHeader }
  let bcss = `${cssHeader || ''}\n`

  for (const w of weightSet) {
    csses[w[1]] = {}
    for (const r in cranges) {
      const fileName = `${fontName}-${w[0]}.${r}`
      subset({
        fontFile: `${process.cwd()}/src/${srcFontBase}-${w[0]}.otf`,
        unicodesFile: `${tmpPath}/${fontName}-${r}`,
        outputFileName: `${process.cwd()}/dist/${fontName}/${fileName}`,
        layoutFeatures
      })
      const scss = ffScss({
        family: `${fontName}-w`,
        style: w[0],
        weight: w[1],
        display: latainEntries.indexOf(r) >= 0 ? 'swap' : 'fallback',
        fileName,
        uranges: cranges[r].uranges
      })
      csses[w[1]][r] = sass.renderSync({
        data: scss,
        indentedSyntax: true,
        outputStyle: "compressed"
      }).css.toString()
      bcss += `${csses[w[1]][r]}\n`
    }
  }

  fs.writeFileSync(`${process.cwd()}/dist/${fontName}/${fontName}.css`, bcss)
  console.log('☑ CSS', `${process.cwd()}/dist/${fontName}/${fontName}.css`)

  return csses
}

new Promise ((resolve, reject) => {
  const csses = {}

  tmp.dir(async (err, tmpPath, cb) => {
    if (err) return reject(err)

    //#region BASE SourceHan
    csses.SourceHanSans = await composeFull({
      fontName: 'SourceHanSans',
      ranges,
      srcFontExt: '.otf',
      tmpPath,
      layoutFeatures: ['pwid', 'palt'],
      cssHeader: `/*!
 * "Source Han Sans" is lisenced under the SIL Open Font License 1.1
 * by https://github.com/adobe-fonts/source-han-sans/
 */
`
    })

    csses.SourceHanSansHW = await composeFull({
      fontName: 'SourceHanSansHW',
      ranges,
      srcFontExt: '.otf',
      tmpPath,
      cssHeader: `/*!
 * "Source Han Sans HW" is lisenced under the SIL Open Font License 1.1
 * by https://github.com/adobe-fonts/source-han-sans/
 */
`
    })

    csses.SourceHanSerif = await composeFull({
      fontName: 'SourceHanSerif',
      ranges,
      srcFontExt: '.otf',
      tmpPath,
      layoutFeatures: ['pwid', 'palt'],
      cssHeader: `/*!
 * "Source Han Serif" is lisenced under the SIL Open Font License 1.1
 * by https://github.com/adobe-fonts/source-han-serif/
 */
`
    })
    //#endregion

    //#region BASE M+
    csses['mplus-c'] = await composeFull({
      fontName: 'mplus-c',
      srcFontBase: 'base/mplus/mplus-1c',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplus'],
      cssHeader: `/*!
 * "M+ c" is lisenced under the M+ Fonts License
 * by https://mplus-fonts.osdn.jp/
 */
`
    })
    csses['mplus-p'] = await composeFull({
      fontName: 'mplus-p',
      srcFontBase: 'base/mplus/mplus-1p',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplus'],
      cssHeader: `/*!
 * "M+ p" is lisenced under the M+ Fonts License
 * by https://mplus-fonts.osdn.jp/
 */
`
    })
    csses['mplus-m'] = await composeFull({
      fontName: 'mplus-m',
      srcFontBase: 'base/mplus/mplus-1m',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplusm'],
      cssHeader: `/*!
 * "M+ m" is lisenced under the M+ Fonts License
 * by https://mplus-fonts.osdn.jp/
 */
`
    })
    csses['mplus-mn'] = await composeFull({
      fontName: 'mplus-mn',
      srcFontBase: 'base/mplus/mplus-1mn',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplusm'],
      cssHeader: `/*!
 * "M+ mn" is lisenced under the M+ Fonts License
 * by https://mplus-fonts.osdn.jp/
 */
`
    })
    csses['mplus-1'] = await composeFull({
      fontName: 'mplus-1',
      srcFontBase: 'base/mplus/mplus-1c',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => japaneseEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplus'],
      cssHeader: `/*!
 * "M+ 1" is lisenced under the M+ Fonts License
 * by https://mplus-fonts.osdn.jp/
 */
`
    })
    csses['mplus-2'] = await composeFull({
      fontName: 'mplus-2',
      srcFontBase: 'base/mplus/mplus-2c',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => japaneseEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplus'],
      cssHeader: `/*!
 * "M+ 2" is lisenced under the M+ Fonts License
 * by https://mplus-fonts.osdn.jp/
 */
`
    })

    csses['mplus-S'] = await composeFull({
      fontName: 'mplus-S',
      srcFontBase: 'base/mplus/mplus-1c',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => otherEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplus'],
      cssHeader: `/*!
 * "M+ Fonts" is lisenced under the M+ Fonts License
 * by https://mplus-fonts.osdn.jp/
 */
`
    })
    //#endregion

    //#region ADDON kana
    csses.irohakakuC = await composeFull({
      fontName: 'irohakakuC',
      ranges: {
        hiragana: ranges.hiragana,
        katakana: ranges.katakana
      },
      srcFontBase: 'addon/irohakakuC/irohakakuC',
      srcFontExt: '.ttf',
      tmpPath,
      cssHeader: `/*!
 * "いろは角クラシック" is lisenced under the SIL Open Font License 1.1
 * by http://modi.jpn.org/font_irohakakuc.php
 */
`
    })

    csses.corporateLogo = await composeFull({
      fontName: 'corporateLogo',
      ranges: {
        japaneseBase: ranges.japaneseBase,
        hiragana: ranges.hiragana,
        katakana: ranges.katakana
      },
      weightSet: [['medium', 500], ['bold', 700]],
      srcFontBase: 'addon/corporateLogo/logotypejp_mp',
      srcFontExt: '.ttf',
      tmpPath,
      cssHeader: `/*!
 * "コーポレート・ロゴ" is lisenced under the SIL Open Font License 1.1
 * by http://logotype.jp/corporate-logo-font-dl.html
 */
`
    })

    csses.LiNovePOP = await composeFull({
      fontName: 'LiNovePOP',
      ranges: {
        japaneseBase: ranges.japaneseBase,
        hiragana: ranges.hiragana,
        katakana: ranges.katakana
      },
      weightSet: [['Heavy', 800]],
      srcFontBase: 'addon/LightNovelPOP/LiNovePOP',
      srcFontExt: '.otf',
      tmpPath,
      cssHeader: `/*!
 * "ラノベPOP" is lisenced under the M+ Fonts License
 * by http://www.fontna.com/blog/1706/
 */
`
    })

    csses.KeiFont = await composeFull({
      fontName: 'KeiFont',
      ranges: {
        japaneseBase: ranges.japaneseBase,
        hiragana: ranges.hiragana,
        katakana: ranges.katakana
      },
      weightSet: [['heavy', 800]],
      srcFontBase: 'addon/keifont/keifont-kana',
      srcFontExt: '.ttf',
      tmpPath,
      cssHeader: `/*!
 * "けいふぉんと" is lisenced under Apache License 2.0
 * by http://font.sumomo.ne.jp/font_1.html
 */
`
    })

    csses.Boku2Gothic = await composeFull({
      fontName: 'Boku2Gothic',
      ranges: {
        hiragana: ranges.hiragana,
        katakana: ranges.katakana
      },
      weightSet: [['Regular', 400], ['Bold', 700]],
      srcFontBase: 'addon/boku/2/Boku2',
      srcFontExt: '.otf',
      tmpPath,
      cssHeader: `/*!
 * "ぼくたちのゴシック2" is lisenced under Apache License 2.0
 * by https://fontopo.com/?p=94, https://fontopo.com/?p=98
 */
`
    })

    csses.BokuGothic = await composeFull({
      fontName: 'BokuGothic',
      ranges: {
        hiragana: ranges.hiragana,
        katakana: ranges.katakana
      },
      weightSet: [['Regular', 400]],
      srcFontBase: 'addon/boku/bokutachi',
      srcFontExt: '.otf',
      tmpPath,
      cssHeader: `/*!
 * "ぼくたちのゴシック" is lisenced under IPAフォントライセンスv1.0
 * by https://fontopo.com/?p=164
 */
`
    })

    //#endregion

    //#region ADDON GenEi

    //#region GenEiAntique
    const antique = '†‡•‣․‥…‧‰′″‹›※‼‾⁂⁄⁇⁈⁉⁊⁋☀☁☂☃★☆☉☊☋☌☍☎☏☐☑☒☓☖☗☘☙☜☝☞☟☠☡☺☻☼☽☾☿♀♁♂♃♄♅♆♇♈♉♊♋♌♍♎♏♐♑♒♓♚♛♜♝♞♟♠♡♢♣♤♥♦♧♨♩♪♫♬♭♮♯⚀⚁⚂⚃⚄⚅⚲⚹⚽⚾✂✈✉❤❥❦❧⤴⤵🌝🌟🌠𪜈'

    csses.GenEiAntique = await composeFull({
      fontName: 'GenEiAntique',
      ranges: {
        ...Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
        antiqueSymbols: { chars: toArray(antique), uranges: genURanges(antique) }
      },
      weightSet: [['Medium', 500]],
      srcFontBase: 'addon/GenEi/Antique/GenEiAntiquePv5',
      srcFontExt: '.ttf',
      tmpPath,
      cssHeader: `/*!
 * "源瑛アンチック" is lisenced under the SIL Open Font License 1.1
 * by http://okoneya.jp/font/genei-antique.html
 */
`
    })

    csses['GenEiAntique-N'] = await composeFull({
      fontName: 'GenEiAntique-N',
      ranges: {
        japaneseBase: ranges.japaneseBase,
        hiragana: ranges.hiragana,
        katakana: ranges.katakana
      },
      weightSet: [['Medium', 500]],
      srcFontBase: 'addon/GenEi/Antique/GenEiAntiquePv5',
      srcFontExt: '.ttf',
      tmpPath,
      cssHeader: `/*!
 * "源瑛アンチック N" is lisenced under the SIL Open Font License 1.1
 * by http://okoneya.jp/font/genei-antique.html
 */
`
    })

    csses['GenEiAntique-P'] = await composeFull({
      fontName: 'GenEiAntique-P',
      ranges: {
        japaneseBase: ranges.japaneseBase,
        hiragana: ranges.hiragana,
        katakana: ranges.katakana
      },
      weightSet: [['Medium', 500]],
      srcFontBase: 'addon/GenEi/Antique/GenEiAntiqueNv5',
      srcFontExt: '.ttf',
      tmpPath,
      cssHeader: `/*!
 * "源瑛アンチック P" is lisenced under the SIL Open Font License 1.1
 * by http://okoneya.jp/font/genei-antique.html
 */
`
    })
    //#endregion GenEiAntique

    //#region GenEiLateGo

    csses.GenEiLateGo = await composeFull({
      fontName: 'GenEiLateGo',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
      weightSet: [['Medium', 500]],
      srcFontBase: 'addon/GenEi/Latin/GenEiLateGoN_v2',
      srcFontExt: '.ttf',
      tmpPath,
      cssHeader: `/*!
 * "源瑛ラテゴ" is lisenced under the SIL Open Font License 1.1
 * by http://okoneya.jp/font/genei-antique.html
 */
`
    })

    csses['GenEiLateGo-N'] = await composeFull({
      fontName: 'GenEiLateGo-N',
      ranges: {
        hiragana: ranges.hiragana,
        katakana: ranges.katakana
      },
      weightSet: [['Medium', 500]],
      srcFontBase: 'addon/GenEi/Latin/GenEiLateGoN_v2',
      srcFontExt: '.ttf',
      tmpPath,
      cssHeader: `/*!
 * "源瑛ラテゴ N" is lisenced under the SIL Open Font License 1.1
 * by http://okoneya.jp/font/genei-latin.html
 */
`
    })

    csses['GenEiLateGo-P'] = await composeFull({
      fontName: 'GenEiLateGo-P',
      ranges: {
        hiragana: ranges.hiragana,
        katakana: ranges.katakana
      },
      weightSet: [['Medium', 500]],
      srcFontBase: 'addon/GenEi/Latin/GenEiLateGoP_v2',
      srcFontExt: '.ttf',
      tmpPath,
      cssHeader: `/*!
 * "源瑛ラテゴ P" is lisenced under the SIL Open Font License 1.1
 * by http://okoneya.jp/font/genei-antique.html
 */
`
    })
    //#endregion GenEiLateGo

    //#region GenEiNuGothic
    const nuGothic = '†‡•‥…‧‰′″‵‹›※‼⁂⁄⁇⁈⁉☀☁☂☃★☆☉☎☏☜☝☞☟♀♁♂♠♡♢♣♤♥♦♧♨♩♪♫♬♭♮♯𛀀𛀁'

    csses.GenEiNuGothic = await composeFull({
      fontName: 'GenEiNuGothic',
      ranges: {
        ...Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
        hiragana: ranges.hiragana,
        katakana: ranges.katakana,
        nuSymbols: { chars: toArray(nuGothic), uranges: genURanges(nuGothic) }
      },
      weightSet: [['EB', 800]],
      srcFontBase: 'addon/GenEi/NuGothic/GenEiNuGothic',
      srcFontExt: '.ttf',
      tmpPath,
      cssHeader: `/*!
 * "源瑛Nuゴシック" is lisenced under the SIL Open Font License 1.1
 * by https://okoneya.jp/font/genei-nu-gothic.html
 */
`
    })
    //#endregion GenEiNuGothic

    //#region GenEi Latin
    csses.GenEiUniverSans = await composeFull({
      fontName: 'GenEiUniverSans',
      srcFontBase: 'addon/GenEi/UniverSans/GenEiUniverSans',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.otf',
      tmpPath,
      weightSet: [['L', 100], ['SL', 200], ['R', 400], ['SB', 600], ['B', 700], ['H', 800], ['Bk', 900]],
      cssHeader: `/*!
 * "GenEi Unvier Sans"is lisenced under the SIL Open Font License 1.1
 * by https://okoneya.jp/font/download.html
 */
`
    })
    csses.GenEiRomanNotes = await composeFull({
      fontName: 'GenEiRomanNotes',
      srcFontBase: 'addon/GenEi/RomanNotes/GenEiRomanNotes',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.otf',
      tmpPath,
      weightSet: [['W9', 900]],
      cssHeader: `/*!
 * "GenEi Roman Notes"is lisenced under the SIL Open Font License 1.1
 * by https://okoneya.jp/font/genei-romanotes.html
 */
`
    })
    //#endregion GenEi Latin

    //#endregion ADDON GenEi

    //#region ADDON Nasu

    csses.Nasu = await composeFull({
      fontName: 'Nasu',
      ranges,
      weightSet: [['Regular', 400], ['Bold', 700]],
      srcFontBase: 'addon/Nasu/Nasu',
      srcFontExt: '.ttf',
      tmpPath,
      cssHeader: `/*!
 * "Nasu" is lisenced under the SIL Open Font License 1.1
 * by http://itouhiro.hatenablog.com/entry/20140917/font
 */
`
    })
    csses.NasuM = await composeFull({
      fontName: 'NasuM',
      ranges,
      weightSet: [['Regular', 400], ['Bold', 700]],
      srcFontBase: 'addon/Nasu/NasuM',
      srcFontExt: '.ttf',
      tmpPath,
      cssHeader: `/*!
 * "Nasu M" is lisenced under the SIL Open Font License 1.1
 * by http://itouhiro.hatenablog.com/entry/20140917/font
 */
`
    })

    //#endregion ADDON Nasu

    fs.writeFileSync(`${process.cwd()}/dist/csses.json`, JSON.stringify(csses))
    console.log('☑ JSON', `${process.cwd()}/dist/csses.json`)

    pyftsubsetq.drain()
      .then(() => {
        console.log('💮')

        cb()
        resolve()
      })
  })
})
