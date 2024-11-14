import React from 'react'
import ConstructorElement, {
  ConstructorElementType,
} from './constructor-element/constructor-element'

import styles from './constructor-elements.module.css'

interface ConstructorElementProps {}

class ConstructorElements extends React.Component<ConstructorElementProps, {}> {
  render() {
    return (
      <section className={styles.constructorElements}>
        <ConstructorElement
          type={ConstructorElementType.TOP}
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
        />
        <section className={styles.editableConstructorElements}>
          <ConstructorElement
            text='Краторная булка N-200i (верх)'
            price={50}
            thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
          />
          <ConstructorElement
            text='Краторная булка N-200i (верх)'
            price={50}
            thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
          />
          <ConstructorElement
            text='Краторная булка N-200i (верх)'
            price={50}
            thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
          />
          <ConstructorElement
            text='Краторная булка N-200i (верх)'
            price={50}
            thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
          />
          <ConstructorElement
            text='Краторная булка N-200i (верх)'
            price={50}
            thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
          />
          <ConstructorElement
            text='Краторная булка N-200i (верх)'
            price={50}
            thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
          />
        </section>
        <ConstructorElement
          type={ConstructorElementType.BOTTOM}
          isLocked={true}
          text='Краторная булка N-200i (низ)'
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
        />
      </section>
    )
  }
}

export default ConstructorElements
