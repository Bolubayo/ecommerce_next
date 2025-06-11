import React from 'react'


interface Props{
    className: string;
    children: React.ReactNode
    disabled?: boolean
    handleClick?: () => void
}

const Button = ({className, children, disabled, handleClick}: Props) => {
  return (
    <button onClick={handleClick} disabled={disabled} className={className}>{children}</button>
  )
}

export default Button