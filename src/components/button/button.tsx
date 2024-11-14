import React from 'react'

import { Button as YaButton } from '@ya.praktikum/react-developer-burger-ui-components'

import { HtmlTypeButton, SizeButton, TypeButton } from './types'

interface ButtonProps {
  children: React.ReactNode
  type?: TypeButton
  htmlType?: HtmlTypeButton
  size?: SizeButton
  extraClass?: string
}

class Button extends React.Component<ButtonProps, {}> {
  render() {
    const {
      children,
      htmlType = HtmlTypeButton.BUTTON,
      type = TypeButton.PRIMARY,
      size = SizeButton.MEDIUM,
      extraClass,
    } = this.props

    return (
      <YaButton
        htmlType={htmlType}
        type={type}
        size={size}
        extraClass={extraClass}
      >
        {children}
      </YaButton>
    )
  }
}

export default Button
