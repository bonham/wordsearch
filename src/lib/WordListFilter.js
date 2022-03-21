const _ = require('lodash')

class WordListFilter {
  constructor(arrayOfStrings) {
    this.ar = arrayOfStrings
  }
  len() {
    return this.ar.length
  }
  reduceAnyChar(c) {

    if (c.length != 1) {
      throw Error(`Parameter must have length 1 , but has length ${c.length}`)
    }

    const r = _.filter(this.ar, (x) => x.indexOf(c) >= 0);
    this.ar = r
  }

  reduceAnyCharInString(s) {
    Array.from(s).forEach((c) => {
      this.reduceAnyChar(c)
    })
  }

  reduceWithoutChar(c) {

    if (c.length != 1) {
      throw Error(`Parameter must have length 1 , but has length ${c.length}`)
    }
    const r = _.filter(this.ar, (x) => x.indexOf(c) < 0);
    this.ar = r
  }

  reduceWithoutAnyCharInString(s) {
    Array.from(s).forEach((c) => {
      this.reduceWithoutChar(c)
    })
  }
}

export { WordListFilter }

