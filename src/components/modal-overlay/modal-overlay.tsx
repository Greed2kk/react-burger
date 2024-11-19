import { FC, ReactNode } from 'react'

import styles from './modal-overlay.module.css'

interface ModalOverlayProps {
  children: ReactNode
  onClick?: () => void
}

export const ModalOverlay: FC<ModalOverlayProps> = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={styles.modalOverlay}>
      {children}
    </div>
  )
}
