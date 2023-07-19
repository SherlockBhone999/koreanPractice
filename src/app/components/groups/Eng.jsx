
import Container from './1NContainer'

import { useContext } from 'react'
import { Context } from '../../../App'

export default function OneN () {
  const { allGroups } = useContext(Context)
  const objInsideAllGroups = allGroups.eng
  return <div>
    <Container groupObj={objInsideAllGroups}/>
  </div>
}

