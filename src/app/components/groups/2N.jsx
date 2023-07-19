

import Container from './2NContainer'

import { useContext } from 'react'
import { Context } from '../../../App'

export default function TwoN () {
  const { allGroups } = useContext(Context)
  const objInsideAllGroups = allGroups.twoN
  return <div>
    <Container groupObj={objInsideAllGroups}/>
  </div>
}

