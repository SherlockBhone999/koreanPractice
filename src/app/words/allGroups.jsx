import {items} from './allItems'


const derived = "derived"
const eng = "eng"
const grammarAndExtra = "grammar&extra"
const sentence = "sentence"
const normal = "normal"




//groups - group - subgroup 
const groupThemNormally= (list, n) => {
  const subgroupsCount = Math.floor( list.length / n )
  //[ { } , { } , ...]
  const arr = []
  for(let i=1 ; i<= subgroupsCount+1 ; i++){
    const f = ( i - 1 )*n
    const l = f+n
    //[]
    const arr2 = []
    for(let j=f ; j<l ; j++ ){
      if(list[j]) arr2.push(list[j])
    }
    const obj = { num : i , items : arr2 }
    arr.push(obj)
  }
  return arr
}

// start 2N
const groupThemAsTwoN= (list) => {
  
  const ifAlreadyExist = (list, letter) => {
    const arrOfLetter = []
    list.map(obj => {
      if(obj.letter === letter ){
        arrOfLetter.push("doesnotmatter")
      }
    })
    if(arrOfLetter.length === 0){
      return false
    } else {
      return true
    }
  }
  
  // ['a', 'a', 'b'] to [ { l : 'a', c : 2 } , { l : 'b' , c : 1 }]
  const getArrayOfObj = (arrayOfString, resultArray) => {
    arrayOfString.map(str => {
      var count = 0
      arrayOfString.map(str2 => {
        if(str === str2){ count += 1 }
      })
      const item = { letter : str , count : count }
      
      //don't repeat 
      const alreadyExist = ifAlreadyExist(resultArray, str)
      if(!alreadyExist) resultArray.push(item)
    })
  }
  
  //sort the items by count 
  const sortTheArray = (arrayOfObj, resultArray) => {
    const counts = []
    arrayOfObj.map(obj => counts.push(obj.count))
    counts.sort(function(a, b){return b - a});
    counts.map(num => {
      arrayOfObj.map(obj => {
        if(num === obj.count){
          //check exist
          const alreadyExist = ifAlreadyExist(resultArray, obj.letter)
          if(!alreadyExist) resultArray.push(obj)
        }
      })
    })
  }
  
  const startWordsWithRepetitions = []
  const endWordsWithRepetitions= []
  list.map(obj => {
    const f = obj.korean[0]
    const l = obj.korean[1]
    startWordsWithRepetitions.push(f)
    endWordsWithRepetitions.push(l)
  })
  
  const startWords = []
  getArrayOfObj(startWordsWithRepetitions, startWords)
  
  const endWords = []
  getArrayOfObj(endWordsWithRepetitions, endWords)
  
  //points.sort(function(a, b){return b - a});
  const startWordsSorted = []
  sortTheArray(startWords, startWordsSorted)

  const endWordsSorted = []
  sortTheArray(endWords, endWordsSorted)
  
  
  //to get { letter : blah , items : [] }
  const startWordsWithItems = []
  startWordsSorted.map(obj => {
    const arrr = list.filter(obj2 => obj2.korean.startsWith(obj.letter) )
    const item = { letter : obj.letter, items : arrr }
    startWordsWithItems.push(item)
  })
  
  const endWordsWithItems = []
  endWordsSorted.map(obj => {
    const arrr = list.filter( obj2 => obj2.korean[1]=== obj.letter )
    const item = { letter : obj.letter , items : arrr }
    endWordsWithItems.push(item)
  })
  
  //get subgroups
  const allLoneWords = []
  const NotLoneStartLetters = []
  const NotLoneEndLetters = []
  // get lone words
  const startWordsWithItemsG1 = []
  startWordsWithItems.map(obj => {
    if(obj.items.length > 1 ){ 
      startWordsWithItemsG1.push(obj) 
      NotLoneStartLetters.push(obj.letter)
    }
  })
  
  const endWordsWithItemsG1 = []
  endWordsWithItems.map(obj => {
    if(obj.items.length > 1 ){ 
      endWordsWithItemsG1.push(obj) 
      NotLoneEndLetters.push(obj.letter)
    }
  })
  
  list.map(obj => {
    if(NotLoneStartLetters.includes(obj.korean[0]) || NotLoneEndLetters.includes(obj.korean[1]) ){
    }else{
      allLoneWords.push(obj)
    }
  })
  
  const subGroupsArr = groupThemNormally(allLoneWords, 30)

  const obj = { starts : startWordsWithItemsG1 , ends : endWordsWithItemsG1, subgroups : subGroupsArr } 
  return  obj
}
//end 


const groupThemAsTwoV= (list) => {
  const listWithoutDa = []
  list.map(item => {
    const newItem = {...item, korean : item.korean.slice(0,2)}
    listWithoutDa.push(newItem)
  })
  const arr = groupThemAsTwoN(listWithoutDa)
  return arr
}




//very inefficient but clean 
const groupTheItems = (allItems) => {
    //because of extra space behind every korean word, below is not what it seemed like
    const engs = allItems.filter(item => item.group === eng )
    const deriveds = allItems.filter(item => item.group === derived )
    const grammerAndExtras = allItems.filter(item => item.group === grammarAndExtra )
    const sentences = allItems.filter(item => item.group === sentence )
    const normals = allItems.filter(item => item.group === normal)
    const oneNs = normals.filter(item => item.korean.length === 2)
    const oneVs = normals.filter(item => item.korean.length === 3 && item.korean.endsWith("다 "))
    const twoNs = normals.filter(item => item.korean.length ===3 && !item.korean.endsWith("다 "))
    const twoVs = normals.filter(item => item.korean.length ===4 && item.korean.endsWith("다 "))
    const threeNs = normals.filter(item => item.korean.length ===4 && !item.korean.endsWith("다 "))
    const theRests = normals.filter(item => item.korean.length >4 )
    
    
    
    const subgroupseng = groupThemNormally(engs, 30)
    const objeng = { 
      count : engs.length ,
      subgroups : subgroupseng
    }
    
    const subgroupsderived = groupThemNormally(deriveds, 30)
    const objderived = {
      count : deriveds.length,
      subgroups : subgroupsderived
    }
    
    const subgroupssentence = groupThemNormally( sentences, 30)
    const objsentence = {
      count : sentences.length,
      subgroups : subgroupssentence
    }
    
    const subgroupsgrammarAndExtra = groupThemNormally( grammerAndExtras, 10)
    const objgrammerAndExtras = {
      count : grammerAndExtras.length ,
      subgroups : subgroupsgrammarAndExtra
    }
    
    const subgroupsoneN = groupThemNormally(oneNs, 30)
    const objoneN = {
      count : oneNs.length,
      subgroups : subgroupsoneN
    }
    
    //reuse the fuction
    const subgroupsoneV = groupThemNormally(oneVs, 30)
    const objoneV = {
      count : oneVs.length,
      subgroups : subgroupsoneV
    }
    
    const subgroupstheRest = groupThemNormally(theRests, 30)
    const objtheRest= {
      count : theRests.length,
      subgroups : subgroupstheRest
    }
    
    const startsANDendsTwoN = groupThemAsTwoN(twoNs)
    const objtwoN = {
      count : twoNs.length,
      subgroups : [],
      ...startsANDendsTwoN
    }
    
    const startsANDendsTwoV = groupThemAsTwoN(twoVs)
    const objtwoV= {
      count : twoVs.length,
      ...startsANDendsTwoV
    }
    
    const startsANDendsThreeN = groupThemAsTwoN(threeNs)
    const objthreeN= {
      count : threeNs.length,
      ...startsANDendsThreeN
    }
    

    const theObj = {
      derived : objderived,
      eng : objeng,
      sentence : objsentence,
      grammarAndExtra : objgrammerAndExtras,
      oneN : objoneN,
      oneV : objoneV,
      twoN : objtwoN,
      twoV : objtwoV,
      threeN : objthreeN,
      theRest : objtheRest,
    }
    return theObj
}




const allgroupsObj = groupTheItems(items)

export const groups = allgroupsObj 


/*
demo data for allgroups 

const allgroups = {
  oneN : {
    count : 100,
    subgroups : [
      { num : 1 , items : [ word objs]  },
      { num : 2 , items : []  }, 
      ...
    ]
  }
  
  twoN : {
    count : 100,
    subgroups : [
      { num : 1 , items : [ word objs]  },
      { num : 2 , items : []  }, 
      ...
    ],
    starts : [
      { letter : " " , items : [ ] },
      ...
    ],
    ends : [ ]
  }
}

*/