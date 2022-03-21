import { CharListFilter } from '@/lib/CharListFilter.js'

describe ('CharListFilter Tests', () => {
  test('Instantiation', () => {
    const cf = new CharListFilter(["a","A","b"])
    expect(cf.len()).toBe(3)
    expect(cf).not.toBeNull() 
  })
  test('Reduce anychar',() => {
    const cf = new CharListFilter(["Sauber","grAt","bello","übermütig"])
    cf.reduceAnyChar("g")
    expect(cf.len()).toBe(2)
  })
  test('Reduce anychar in string',()=>{
    const cf = new CharListFilter(["Sauber","grAt","bello","übermütig"])
    cf.reduceAnyCharInString('bü')
    expect(cf.len()).toBe(1)

  })
})
