import React from 'react';
import './mypage_modal.css';

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <p>Mypage Modal</p>
        {/* 팝업에 표시할 내용을 여기에 추가 */}
      </div>
    </div>
  );
}

export default Modal;
