module.exports = strings => {
  if (strings.length === 0) {
    console.log("No character is passed!")
    return
  }

  const numArr = strings
    .map(c => c.codePointAt(0))
    .sort((a, b) => a - b)
  const rangedNumArr = numArr.reduce((acc, curv, curi, arr) => {
    if (curi === 0) return acc
    
    const accTailIdx = acc.length - 1
    const accTail = acc[accTailIdx]

    if (typeof accTail === "number") {
      if (accTail === curv - 1)      acc[accTailIdx] = [accTail, curv]
      else if (accTail !== curv)     acc.push(curv)
    } else {
      if (accTail[1] === curv - 1)   acc[accTailIdx][1] = curv
      else if (accTail[1] !== curv)  acc.push(curv)
    }
    return acc
  }, [numArr[0]])
  
  const resArr = rangedNumArr.map(e => {
    if (typeof e === 'number') return `u+${e.toString(16)}`
    else return `u+${e[0].toString(16)}-${e[1].toString(16)}`
  })

  return resArr
}
