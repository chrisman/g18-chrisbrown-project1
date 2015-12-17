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

describe('a use case', function(){
  it("should be wrap chunks and then flatten them", function(){
    function chunkAndJoin(arr, len){
      var myarray = ab.chunk(arr, len)
      myarray = myarray.map(function(x){
        return x.join('')
      })
      myarray = ab.chunk(myarray,1)
      return myarray
    }

    var testarray = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    testarray = chunkAndJoin(testarray, 3)
    expect(testarray).toEqual([['123'], ['456'], ['789']])

    testarray = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    testarray = chunkAndJoin(testarray, 2)
    expect(testarray).toEqual([['12'], ['34'], ['56'], ['78'], ['9']])

    testarray = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    testarray = ab.chunk(testarray, 3)
    testarray = testarray.map(function(a){
      return a.join('')
    }).map(function(s){
      return "<div>"+s+"</div>"
    })
    expect(testarray).toEqual(['<div>123</div>', '<div>456</div>', '<div>789</div>'])
  })
})
