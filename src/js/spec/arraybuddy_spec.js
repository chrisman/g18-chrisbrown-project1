var ab = require('../arraybuddy')

describe("chunk", function(){
  it("returns a chunked array", function(){
    expect(ab.chunk([1, 2, 3, 4, 5, 6])).toEqual([[1, 2], [3, 4], [5, 6]])
    expect(ab.chunk([1, 2, 3, 4, 5])).toEqual([[1, 2], [3, 4], [5]])
  })
  it('takes a second argument for the size of the chunk',function(){
    expect(ab.chunk([1, 2, 3, 4, 5, 6], 3)).toEqual([[1, 2, 3], [4, 5, 6]])
    expect(ab.chunk([1, 2, 3, 4, 5, 6], 4)).toEqual([[1, 2, 3, 4], [5, 6]])
    expect(ab.chunk([1, 2, 3],5)).toEqual([[1, 2, 3]])
    expect(ab.chunk([1, 2, 3],1)).toEqual([[1], [2], [3]])
  })
})

describe("flatten", function(){
  it("flattens a chunked array",function(){
    expect(ab.flatten([[1, 2, 3], [4, 5, 6]])).toEqual([1, 2, 3, 4, 5, 6])
    expect(ab.flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5])
    expect(ab.flatten([[1, 2], 3, 4, [5]])).toEqual([1, 2, 3, 4, 5])
  })
})

describe('chaining', function(){
  it("should be chainable", function(){
    
    expect(ab.chunk([1,2,3,4],2).flatten()).toEqual([1,2,3,4])
  })
})
