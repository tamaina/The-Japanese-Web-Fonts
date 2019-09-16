const fs = require('fs')
const genCharStr = require('./uRangesGen/genCharStringArrFromType')
const getURanges = require('./uRangesGen/getURangesFromType')

const baseEntries = fs.readdirSync(`${process.cwd()}/text/chars`).map(n => n.slice(0, -4))

baseEntries.map(e => console.log(e, getURanges(e), genCharStr(e).length))

console.log(baseEntries.length)
