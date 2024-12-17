import { FC, ReactNode } from 'react'

import styles from './modal-overlay.module.css'

interface ModalOverlayProps {
  children: ReactNode
  onClick?: () => void
}

export const ModalOverlay: FC<ModalOverlayProps> = ({ children, onClick }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div onClick={onClick} className={styles.modalOverlay}>
    {children}
  </div>
)
