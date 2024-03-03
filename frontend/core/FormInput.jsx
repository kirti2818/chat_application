"use client"
import { Input } from '@nextui-org/react'
import React from 'react'

const FormInput = ({placeholder,disabled,label,size="none",onChange,value}) => {
  return (
    <div className='flex flex-col gap-2 w-full '>
    <p className='text-gray-900 font-semibold'>{label}</p>
      <Input onChange={onChange} value = {value} size={size} className='w-full' variant="bordered" radius="sm" color="primary"   placeholder={placeholder} disabled={disabled}  />
     
    </div>
  )
}

export default FormInput
