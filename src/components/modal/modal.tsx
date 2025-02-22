import { FC, MouseEvent, ReactNode, useCallback, useEffect } from 'react'

import classNames from 'classnames'
import { createPortal } from 'react-dom'

import { ModalOverlay } from '@/components/modal-overlay/modal-overlay'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './modal.module.css'

interface ModalProps {
  children: ReactNode
  onCloseHandler: () => void
  headerText?: string
}

const modalRoot = document.getElementById('react-modals') as HTMLElement

export const Modal: FC<ModalProps> = ({
  children,
  headerText,
  onCloseHandler,
}) => {
  const onEscPress = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onCloseHandler()
      }
    },
    [onCloseHandler],
  )

  useEffect(() => {
    window.document.addEventListener('keydown', onEscPress)

    return () => {
      window.document.removeEventListener('keydown', onEscPress)
    }
  }, [onEscPress])

  const blockPropagationClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
  }

  return createPortal(
    <ModalOverlay onClick={onCloseHandler}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={classNames(styles.modal, 'pt-10 pr-10 pb-15 pl-10')}
        onClick={blockPropagationClick}
      >
        <div className={styles.header} data-testid="modal">
          <p className="text text_type_main-large">{headerText}</p>

          <button onClick={onCloseHandler} className={styles.closeButtonWrapper} data-testid="modal-close-btn">
            <CloseIcon type="primary" className={styles.closeModal} />
          </button>
        </div>

        <div className={styles.modalBody}>{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot,
  )
}
