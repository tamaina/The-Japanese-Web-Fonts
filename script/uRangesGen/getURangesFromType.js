const genURanges = require('./genURanges')
const genCharStringArrFromType = require('./genCharStringArrFromType')

module.exports = (type) => genURanges(genCharStringArrFromType(type))
