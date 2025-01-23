import React, { ReactNode } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen?: boolean;
  onConfirm: () => void;
  children?: ReactNode;
  confirmText?: string;
}

const Modal = ({ isOpen = false, onConfirm, children = '모달 내용', confirmText }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBack}>
      <div className={styles.modalBox}>
        <div className={styles.content}>
          <span>Voting completed</span>
          <span>Thank you for voting</span>
        </div>
        <button onClick={onConfirm} className={styles.confirmBtn}>
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
