var arraychunker = require('../arraychunker')

describe("chunk", function(){
  it("returns a chunked array", function(){
    expect(arraychunker.chunk([1, 2, 3, 4, 5, 6])).toEqual([[1, 2], [3, 4], [5, 6]])
    expect(arraychunker.chunk([1, 2, 3, 4, 5])).toEqual([[1, 2], [3, 4], [5]])
  })
  it('takes a second argument for the size of the chunk',function(){
    expect(arraychunker.chunk([1, 2, 3, 4, 5, 6], 3)).toEqual([[1, 2, 3], [4, 5, 6]])
    expect(arraychunker.chunk([1, 2, 3, 4, 5, 6], 4)).toEqual([[1, 2, 3, 4], [5, 6]])
    expect(arraychunker.chunk([1, 2, 3],5)).toEqual([[1, 2, 3]])
    expect(arraychunker.chunk([1, 2, 3],1)).toEqual([[1], [2], [3]])
  })
})

describe("flattenChunks", function(){
  it("flattens a chunked array",function(){
    expect(arraychunker.flatten([[1, 2, 3], [4, 5, 6]])).toEqual([1, 2, 3, 4, 5, 6])
    expect(arraychunker.flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5])
    expect(arraychunker.flatten([[1, 2], 3, 4, [5]])).toEqual([1, 2, 3, 4, 5])
  })
})
