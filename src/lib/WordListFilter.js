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

  reduceAnyCharInString(s) {
    Array.from(s).forEach((c) => {
      this.reduceAnyChar(c)
    })
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

export { WordListFilter }

