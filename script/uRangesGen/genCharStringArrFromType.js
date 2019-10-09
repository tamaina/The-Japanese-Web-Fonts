const fs = require('fs')
const { toArray } = require('stringz')

const getStringfromFile = (type) => fs.readFileSync(`${__dirname}/../../text/chars/${type}.txt`, { encoding: 'utf8' }).replace(/\r|\n/g, '')

module.exports = (type) => {
  let ignoreChars = ''
  switch (type) {

    // 漢字順位: shogakuseiKanji < joyoKanji < jinmeiyoKanji < hyogaiKanji < dai1suijunKanji = dai2suijunKanji < ibmKakuchoKanji
    case 'ibmKakuchoKanji':
      ignoreChars += getStringfromFile('dai1suijunKanji')
      ignoreChars += getStringfromFile('dai2suijunKanji')
    case 'dai1suijunKanji':
    case 'dai2suijunKanji':
      ignoreChars += getStringfromFile('hyogaiKanji')
    case 'hyogaiKanji':
      ignoreChars += getStringfromFile('jinmeiyoKanji')
    case 'jinmeiyoKanji':
      ignoreChars += getStringfromFile('joyoKanji')
    case 'joyoKanji':
      ignoreChars += getStringfromFile('shogakuseiKanji')
      break;

    // 非漢字順位: hiragana = katakana = latain = latainExtended = zenkakuLatain
    //     < [katakana|hiragana|kanji|latain]Symbol < japaneseBase < unicodeHikanji < jisx0213Hikanji
    case 'unicodeHikanji':
      ignoreChars += getStringfromFile('jisx0213Hikanji')
    case 'jisx0213Hikanji':
      ignoreChars += getStringfromFile('japaneseBase')
    case 'japaneseBase':
      ignoreChars += getStringfromFile('katakanaSymbol')
      ignoreChars += getStringfromFile('hiraganaSymbol')
      ignoreChars += getStringfromFile('kanjiSymbol')
      ignoreChars += getStringfromFile('latainSymbol')
    case 'katakanaSymbol':
    case 'hiraganaSymbol':
    case 'kanjiSymbol':
    case 'latainSymbol':
      ignoreChars += getStringfromFile('hiragana')
      ignoreChars += getStringfromFile('katakana')
      ignoreChars += getStringfromFile('latain')
      ignoreChars += getStringfromFile('latainExtended')
      ignoreChars += getStringfromFile('zenkakuLatain')
      break;
  }

  if (ignoreChars.length > 0) {
    return toArray(getStringfromFile(type))
      .filter(c => ignoreChars.indexOf(c) < 0)
  } else {
    return toArray(getStringfromFile(type))
  }
}
