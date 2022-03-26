import { WordListFilter, charHistogram } from '@/lib/WordListFilter.js'

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

describe('Double letters in anychar', ()=>{
  test('double',()=>{
    const cf = new WordListFilter(["Lallen","kalle","Malen","Nixda","Lohn","alola"])
    cf.reduceAnyCharInString("ll")
    expect(cf.len()).toBe(3)
    const a = cf.getArray()
    expect(a).toContain('Lallen')
    expect(a).toContain('kalle')
  })

  test('double plus 1',()=>{
    const cf = new WordListFilter(["Lallen","kalle","Malen","Nixda","Lohn","alola"])
    cf.reduceAnyCharInString("lkl")
    expect(cf.len()).toBe(1)
    const a = cf.getArray()
    expect(a).toContain('kalle')
  })

  test('triple',()=>{
    const cf = new WordListFilter(["Lallen","kalle","Malen","Nixda","Lohn"])
    cf.reduceAnyCharInString("lll")
    expect(cf.len()).toBe(0)
  })

  test('reduce by mult chars 0a',()=>{
    const cf = new WordListFilter(["Lallen","kalle","Malen","Nixda","Lohn"])
    cf.reduceByMultChars('a',2)
    expect(cf.len()).toBe(0)
  })
 
  test('reduce by mult chars 0b',()=>{
    const cf = new WordListFilter(["Lallen","kalle","Malen","Nixda","Lohn"])
    cf.reduceByMultChars('y',2)
    expect(cf.len()).toBe(0)
  })
 
  test('reduce by mult chars 0c',()=>{
    const cf = new WordListFilter(["Lallen","kalle","Malen","Nixda","Lohn"])
    cf.reduceByMultChars('m',1)
    expect(cf.len()).toBe(0)
  })
 
  test('reduce by mult chars 1a',()=>{
    const cf = new WordListFilter(["Lallen","kalle","Malen","Nixda","Lohn",'alola'])
    cf.reduceByMultChars('l',1)
    expect(cf.len()).toBe(4)
  })
 
  test('reduce by mult chars 1b',()=>{
    const cf = new WordListFilter(["Lallen","kalle","Malen","Nixda","Lohn"])
    cf.reduceByMultChars('x',1)
    expect(cf.len()).toBe(1)
  })
 
  test('numletters bigger than requested number',()=>{
    const cf = new WordListFilter(["Lallen","kalle","Malen","Nixda","Lohn","alola","alolal"])
    cf.reduceByMultChars('l',2)
    expect(cf.len()).toBe(4)
  })
 
  test('charHistogram',()=>{
    const h = charHistogram('PraalleKuhlel')
    const keys = Object.keys(h)
    expect(keys).toStrictEqual(['P','r','a','l','e','K','u','h'])
    expect(h['P']).toBe(1)
    expect(h['l']).toBe(4)
    expect(h['e']).toBe(2)
  })
})
