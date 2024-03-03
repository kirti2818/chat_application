import { Button } from '@nextui-org/react'
import React from 'react'

const FormButton = ({size="md" ,text,type = "button"}) => {
  return (
    <Button type={type} className = "w-full bg-blue-400 text-white" size={size}  >{text}</Button>
  )
}

export default FormButton
