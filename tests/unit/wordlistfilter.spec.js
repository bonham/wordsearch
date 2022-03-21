import { WordListFilter } from '@/lib/WordListFilter.js'

describe ('WordListFilter Tests', () => {
  test('Instantiation', () => {
    const cf = new WordListFilter(["a","A","b"])
    expect(cf.len()).toBe(3)
    expect(cf).not.toBeNull() 
  })
  test('Reduce anychar',() => {
    const cf = new WordListFilter(["Sauber","grAt","bello","übermütig"])
    cf.reduceAnyChar("g")
    expect(cf.len()).toBe(2)
  })
  test('Reduce anychar in string',()=>{
    const cf = new WordListFilter(["Sauber","grAt","bello","übermütig"])
    cf.reduceAnyCharInString('bü')
    expect(cf.len()).toBe(1)

  })
  test('Reduce all except char',() => {
    const cf = new WordListFilter(["Sauber","grAt","bello","übermütig"])
    cf.reduceWithoutChar("ü")
    expect(cf.len()).toBe(3)
  })
  test('Reduce all except char',() => {
    const cf = new WordListFilter(["Sauber","grAt","bello","übermütig","ohno","XXX"])
    cf.reduceWithoutAnyCharInString("eA")
    expect(cf.len()).toBe(2)
  })
})

describe('Position Char filters',() => {
  test('char at position',() => {
    const cf = new WordListFilter(["Sauber","grAt","bello","übermütig","ohno","Garn"])
    cf.reduceCharAtPosition("a",1)
    expect(cf.len()).toBe(2)
  })
})
