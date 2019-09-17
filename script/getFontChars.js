
const childProcess = require('child_process')
const { JSDOM } = require('jsdom');

const parser = new (new JSDOM()).window.DOMParser();

(new Promise((res, rej) => {
  childProcess.exec(`ttx -t cmap -o - "${process.argv[2]}"`, { maxBuffer: 1024 * 1024 * 8 }, (err, stdout, stderr) => {
    if (err) return rej(err)
    res(stdout)
  })
})).then(xmlText => {
  const doc = parser.parseFromString(xmlText, "text/xml")
  console.log(
    Array.from(doc.querySelectorAll('cmap_format_12>map'))
      .map(e => String.fromCodePoint(e.getAttribute('code')))
  )
})
