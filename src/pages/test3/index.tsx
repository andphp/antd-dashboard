import { Button } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
const Test3: FC = () => {
  const navigate = useNavigate()
  const updateTab = () => {
    navigate('/system/authority/interface?dada=e3', { replace: true })
  }
  return (
    <div>
      this is a Test3 <Button type='link' onClick={updateTab} >fsd</Button>
    </div>
  )
}

export default Test3
