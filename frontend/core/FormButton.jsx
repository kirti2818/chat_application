import { Button } from '@nextui-org/react'
import React from 'react'

const FormButton = ({size="md" ,text,type = "button",isLoading=false,startContent=""}) => {
  return (
    <Button startContent={startContent} isLoading={isLoading}  type={type} className = "w-full bg-blue-400 text-white" size={size}  >{text}</Button>
  )
}

export default FormButton
