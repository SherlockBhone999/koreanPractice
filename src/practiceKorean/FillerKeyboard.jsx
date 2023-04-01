import {useState, useEffect} from 'react'


const extraArray = [
'회',
'뇌',
'외',
'웨',
'의',
  ]
  
const gaArray = [
'갑',
'각',
'감',
'강',
'값',
'갈',
'같',
'간',

'건',
'것',
'겁',

'격',
'경',
'결',

'곡',
'공',
'곳',
'곱',

'국',

'금',
'글',
'근',

'김',

'관',
'권',
  ]

const naArray = [
'낫',
'남',
'난',
'날',

'넘',
"넣",

'년',

'놓',

'늘',

'님',

'냉',

'넷',
  ]

const daArray = [

'단',
'달',
'담',
'닦',
'닫',

"덟",

'동',
'돈',

'둘',

'들',
'등',
"든",
  ]
  
const raArray = [
'락',
'람',
'랑',

'럽',

'력',

'릇',

'름',
'를',
"른",
  ]

const maArray = [
'만',
'말',
'많',
'맞',
'망',
'맛',

'멀',
'먹',

'면',
'명',

'목',
'못',

'문',
'물',

"및",

'맵',
'뭐',
  ]
  
const baArray = [
'박',
'반',
'밭',
'밧',
'밥',
'방',
'받',
'밖',
  
'번',
'벌',
  
'볍',
'벽',
'병',

'복',
'볼',
'봉',

'분',
'불',

'빔',

'백',

'벨',
  ]
  
const saArray = [
'산',
'상',
'살',

'선',
'섭',
'설',
'섯',

'속',
'손',
'송',

'숨',
'숟',
"순",

'슨',

'신',
'심',
'십',
'싣',
'식',

'생',
'셋',
  ]

const aArray = [
'알',
'앉',
'안',
"않",

'약',
'얕',
'얇',

'억',
'없',
'엇',
'업',
'없',

'연',
'영',
'열',

'옷',
'올',
'옮',

'용',

'운',
'울',

'육',

'음',
'을',

'일',
'있',
'인',

'월',
'원',
  ]
  
const jaArray = [
'잠',
'장',
'작',
  
'전',
'젓',
'접',
'점',
'절',

'좋',
'종',

'줄',
'중',
'줌',

'즘',

'집',
'진',
  ]
  
const chaArray = [
'철',
'첩',
'천',
'청',

'축',

'침',
'칠',

'책',

  ]

const khaArray = [
'컴',
'켤',
  ]

const htaArray = [
'탁',
'탕',
'톱',
'통',
'택',
  ]
  
const phaArray =[
'판',
'팔',

'편',
'평',

'풍',

'필',
  ]
  
const haArray = [
'함',
'합',
'한',
'학',

'향',

'형',

"홉",
"혼",

"흔",

'행',
  ]

const kaArray = [
'깥',
'꽃',
'꽂',
'꼭',
'끈',
  ]

const paArray = [
 '빵',
  ]
  
const ssaArray = [
'쌀',
'씻',
  ]
  
const kyaArray = [
'짧',
'찍',
  ]
  



const bigArray = [ extraArray, gaArray, naArray, daArray, raArray, maArray, baArray, saArray, aArray, jaArray, chaArray, khaArray, htaArray, phaArray, haArray, kaArray, paArray, ssaArray, kyaArray ]

const OneItem = ({setInput,value,styledItem,setStyledItem}) => {
  const [style, setStyle] = useState('')
  
  useEffect(()=>{
    if(styledItem === value){
      setStyle('bg-blue-600 rounded text-white')
    }else{
      setStyle('')
    }
  },[styledItem])
  
  return <div>
    <button onClick={()=>{
      setInput(value)
      setStyledItem(value)
    }} class={`pr-2 ${style}`}>{value}</button>
  </div>
}

export default function FillerKeyboard({setInput, keyboardState }){
  const [styledItem,setStyledItem] = useState('')
  return (
  <div class={`grid fixed top-0 right-0 h-60 w-60 overflow-scroll overflow-x-scroll bg-blue-200 border-4 border-black p-2 ${keyboardState}`}>
    {bigArray.map(arr => <div class='flex p-1 '>
      {
        arr.map(str => <div>
          <OneItem setInput={setInput} 
          value={str} 
          styledItem={styledItem}
          setStyledItem={setStyledItem}/>
        </div>)
      }
      </div>
    ) }
  </div>
    )
}