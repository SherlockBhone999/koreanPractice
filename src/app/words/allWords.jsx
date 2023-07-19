import {items} from './allItems'


const derived = "derived"
const eng = "eng"
const grammarAndExtra = "grammar&extra"
const sentence = "sentence"
const normal = "normal"


const allwordsArr = []
for(let i=0; i<items.length ; i++){
  if(items[i].group !== grammarAndExtra && items[i].group !== sentence )
  allwordsArr.push(items[i])
}

export const words = allwordsArr

