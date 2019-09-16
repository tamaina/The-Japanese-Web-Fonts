const fs = require('fs')
const childProcess = require('child_process')
const tmp = require('tmp')

const getURanges = require('./uRangesGen/getURangesFromType')
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

const latainEntries = ['latain', 'latainExtended', 'zenkakuLatain', 'latainSymbol']
const kanaEntries = ['katakana', 'hankakuKatakana', 'hiragana', 'katakanaSymbol', 'hiraganaSymbol']
const kanjiEntries = ['shogakuseiKanji', 'joyoKanji', 'jinmeiyoKanji', 'hyogaiKanji', 'dai1suijunKanji', 'dai2suijunKanji', 'kanjiSymbol']
const otherEntries = ['japaneseBase', 'jisx0213Hikanji', 'unicodeHikanji']

const ranges = Object.fromEntries(baseEntries.map(e => [ e, { chars: genCharStringArrFromType(e), urange: getURanges(e) } ]))

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
  await pyftsubset(s, [s.fontFile.slice(s.fontFile.lastIndexOf('.')), null])
  await pyftsubset(s, ['.woff', 'woff'])
  await pyftsubset(s, ['.woff2', 'woff2'])
  return
}

tmp.dir(async (err, path, cb) => {
  if (err) throw Error(err)

  for (const [r, { chars }] of Object.entries(ranges)) {
    fs.writeFileSync(`${path}/${r}`, chars.join(''))
  }

  for (const w of weights.SourceHanSans) {
    for (const r in ranges) {
      await subset({
        fontFile: `${process.cwd()}/src/base/SourceHanSans/SourceHanSans-${w[0]}.otf`,
        unicodesFile: `${path}/${r}`,
        outputFileName: `${process.cwd()}/dist/SourceHanSans-${w[0]}.${r}`
      })
    }
  }

  cb()
})
