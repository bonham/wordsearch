const _ = require('lodash')

class WordListFilter {
  constructor(arrayOfStrings) {
    this.ar = arrayOfStrings
  }
  len() {
    return this.ar.length
  }

  getArray() {
    return this.ar
  }

  clone() {
    return new WordListFilter(this.ar)
  }

  reduceAnyChar(c) {

    if (c.length != 1) {
      throw Error(`Parameter must have length 1 , but has length ${c.length}`)
    }

    const r = _.filter(this.ar, (x) => x.indexOf(c) >= 0);
    this.ar = r
    return this
  }

  reduceByMultChars(c, n) {
    if (c.length != 1) {
      throw Error(`Parameter must have length 1 , but has length ${c.length}`)
    }

    if ( n == 1 ) { 
      this.reduceAnyChar(c)
      return

    } else {
      const r = _.filter(this.ar, (x) => {
        const regex = new RegExp(c,'g')
        const numOc = (x.match(regex)||[]).length
        return (numOc >= n)
      })
      this.ar = r
    }
  }

  reduceAnyCharInString(s) {
    const charhist = charHistogram(s)

    // iterate over properties
    for (const c in charhist) {
      const numOccurrence = charhist[c]
      this.reduceByMultChars(c, numOccurrence)
    }

    return this
  }

  reduceWithoutChar(c) {

    if (c.length != 1) {
      throw Error(`Parameter must have length 1 , but has length ${c.length}`)
    }
    const r = _.filter(this.ar, (x) => x.indexOf(c) < 0);
    this.ar = r
    return this
  }

  reduceWithoutAnyCharInString(s) {
    Array.from(s).forEach((c) => {
      this.reduceWithoutChar(c)
    })
    return this
  }

  reduceCharAtPosition(c,pos) {

    if (c.length != 1) {
      throw Error(`Parameter must have length 1 , but has length ${c.length}`)
    }

    const r = _.filter(this.ar, (x)=> x[pos] == c)
    this.ar = r
    return this
  }

  convertToUpperCase() {
    this.ar = _.map(this.ar,x => x.toUpperCase())
    return this
  }
}

function charHistogram(s) {

  const counted = {}
  // returns obj of format { 'x' : 3, 'y': 1 }
  for(let c of s) {
    const curVal = (counted[c] === undefined) ? 0 : counted[c]
    counted[c] = curVal + 1
  }
  return counted
}

export { WordListFilter, charHistogram }

