import { Button } from 'antd'
import React, { useState } from 'react'
const InterfaceManagement: React.FC = () => {
  const [Count, setCount] = useState(0)
  const changeCount = () => {
    setCount(Count + 1)
  }
  return (
    <div>
      {Count}
      this is Interface management
      <Button onClick={changeCount}> haha</Button>
    </div>
  )
}

export default InterfaceManagement
