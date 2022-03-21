import { CharListFilter } from '@/lib/CharListFilter.js'

describe ('CharListFilter Tests', () => {
  test('Instantiation', () => {
    const cf = new CharListFilter(["a","A","b"])
    expect(cf).not.toBeNull() 
  })
})
