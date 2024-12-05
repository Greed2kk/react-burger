import React, { FC, HTMLProps, ReactNode } from 'react'

import { Button as YaButton } from '@ya.praktikum/react-developer-burger-ui-components'

import { HtmlTypeButton, SizeButton, TypeButton } from './types'

interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'type' | 'size'> {
  children: ReactNode
  type?: TypeButton
  htmlType?: HtmlTypeButton
  size?: SizeButton
  extraClass?: string
  onClick?: () => void
}

export const Button: FC<ButtonProps> = props => {
  const {
    children,
    htmlType = HtmlTypeButton.BUTTON,
    type = TypeButton.PRIMARY,
    size = SizeButton.MEDIUM,
    extraClass,
    onClick,
    ...otherProps
  } = props

  return (
    <YaButton
      htmlType={htmlType}
      type={type}
      size={size}
      extraClass={extraClass}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </YaButton>
  )
}
