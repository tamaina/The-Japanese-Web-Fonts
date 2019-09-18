const fs = require('fs')
const childProcess = require('child_process')
const tmp = require('tmp')
const sass = require('sass')
const { JSDOM } = require('jsdom');

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

const ranges = Object.fromEntries(baseEntries.map(e => [ e, { chars: genCharStringArrFromType(e), urange: getURangesFromType(e) } ]))

const voidPromise = async () => { return }

const pyftsubset = (s, [ext, flavor]) => {
  return new Promise((res, rej) => {
    childProcess.exec(`pyftsubset "${s.fontFile}" --text-file="${s.unicodesFile}" --no-hinting --layout-features='' --recommended-glyphs${flavor ? ` --flavor=${flavor}` : ''} --output-file="${s.outputFileName}${ext}"`, (err, stdout, stderr) => {
      if (err) return rej(err)
      res()
    })
  })
}

const subset = async s => {
  // await pyftsubset(s, [s.fontFile.slice(s.fontFile.lastIndexOf('.')), null])
  // await pyftsubset(s, ['.woff', 'woff'])
  await pyftsubset(s, ['.woff2', 'woff2'])
  return
}

const addScss = ({ family, style, display, weight, fileName, ranges }) => {
  return `@font-face
  font-family: ${family}
  font-style: ${style}
  font-weight: ${weight}
  font-display: ${display}
  src: url('./${fileName}.woff2') format('woff2')
  unicode-range: ${ranges.join(',')}
`
}

const composeFull = async ({ fontName, ranges, srcFontBase = `${fontName}/${fontName}`, srcFontExt, tmpPath, weightSet = weights[fontName] }) => {
  console.log(`Compose: ${fontName}`)

  const parser = new (new JSDOM()).window.DOMParser();

  const fontChars = await (new Promise((res, rej) => {
    childProcess.exec(`ttx -t cmap -o - "${process.cwd()}/src/base/${srcFontBase}-${weightSet[0][0]}${srcFontExt}"`, { maxBuffer: 1024 * 1024 * 16 }, (err, stdout, stderr) => {
      if (err) return rej(err)
      res(stdout)
    })
  })).then(xmlText => {
    const doc = parser.parseFromString(xmlText, "text/xml")
    return Array.from(doc.querySelectorAll('cmap_format_12 > map')).map(e => String.fromCodePoint(e.getAttribute('code')))
  })

  const cranges = {}

  for (const [r, { chars }] of Object.entries(ranges)) {
    const validChars = chars.filter(c => fontChars.indexOf(c) >= 0)
    if (validChars.length > 0){
      cranges[r] = { chars: validChars, urange: genURanges(validChars)  }
      fs.writeFileSync(`${tmpPath}/${fontName}-${r}`, validChars.join(''))
    }
  }

  let scss = ''

  for (const w of weightSet) {
    for (const r in cranges) {
      const fileName = `${fontName}-${w[0]}.${r}`
      await subset({
        fontFile: `${process.cwd()}/src/base/${srcFontBase}-${w[0]}${srcFontExt}`,
        unicodesFile: `${tmpPath}/${fontName}-${r}`,
        outputFileName: `${process.cwd()}/dist/${fileName}`
      })
      console.log('☑', fontName, `${process.cwd()}/dist/${fileName}`)
      scss += addScss({
        family: `${fontName}-w`,
        style: w[0],
        weight: w[1],
        display: latainEntries.indexOf(r) >= 0 ? 'swap' : 'fallback',
        fileName,
        ranges: cranges[r].urange
      })
    }
  }

  const sassResult = sass.renderSync({
    data: scss,
    indentedSyntax: true
  })
  fs.writeFileSync(`${process.cwd()}/dist/${fontName}.css`, sassResult.css.toString())
  console.log('☑ CSS', `${process.cwd()}/dist/${fontName}.css`)
  console.log('Compose succeed')
}

new Promise ((resolve, reject) => {
  tmp.dir(async (err, tmpPath, cb) => {
    if (err) return reject(err)

    await composeFull({
      fontName: 'SourceHanSans',
      ranges,
      srcFontExt: '.otf',
      tmpPath
    })

    await composeFull({
      fontName: 'mplus-c',
      srcFontBase: 'mplus/mplus-1c',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplus']
    })
    await composeFull({
      fontName: 'mplus-p',
      srcFontBase: 'mplus/mplus-1p',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplus']
    })
    await composeFull({
      fontName: 'mplus-m',
      srcFontBase: 'mplus/mplus-1m',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplusm']
    })
    await composeFull({
      fontName: 'mplus-mn',
      srcFontBase: 'mplus/mplus-1mn',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => latainEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplusm']
    })
    await composeFull({
      fontName: 'mplus-1',
      srcFontBase: 'mplus/mplus-1c',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => japaneseEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplus']
    })
    await composeFull({
      fontName: 'mplus-2',
      srcFontBase: 'mplus/mplus-2c',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => japaneseEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplus']
    })
    await composeFull({
      fontName: 'mplus-S',
      srcFontBase: 'mplus/mplus-1c',
      ranges: Object.fromEntries(Object.entries(ranges).filter(e => otherEntries.indexOf(e[0]) >= 0)),
      srcFontExt: '.ttf',
      tmpPath,
      weightSet: weights['mplus']
    })

    cb()
    resolve()
  })
})
