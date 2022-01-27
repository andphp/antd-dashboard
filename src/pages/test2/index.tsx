import { Button } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
const Test2: FC = () => {
  const navigate = useNavigate()
  const updateTab = () => {
    navigate('/system/authority/interface?dada=oo', { replace: true })
  }
  return (
    <div>
      this is a Test2 <Button type='link' onClick={updateTab} >fsd</Button>
    </div>
  )
}

export default Test2
