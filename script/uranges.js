const fs = require('fs')
const genCharStr = require('./uRangesGen/genCharStringArrFromType')
const getURanges = require('./uRangesGen/getURangesFromType')

const baseEntries = fs.readdirSync(`${process.cwd()}/text/chars`).map(n => n.slice(0, -4))

const strs = baseEntries.map(e => {
  const uranges = getURanges(e)
  const charstr = genCharStr(e)

  console.log(e, uranges, charstr.length)
  return `### ${e} （${charstr.length}文字）\n${uranges.join(', ')}  \n${charstr.join('')}\n\n`
})

console.log(baseEntries.length)

fs.writeFileSync(`${process.cwd()}/characters.md`, strs.join(''))
