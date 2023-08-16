import React,{ useState } from 'react';
import './creategroup_modal.css';



function Group_Modal({isOpen, onClose, inputGroupValue, inputEmailValue, emailList, handleEmailChange, handleChange, handleEmailSubmit, handleRemoveEmail, handleSubmit}){
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <h2>그룹 생성하기</h2>
        <hr className="line" />
        <h3>그룹 이름</h3>
        <div>
          <input className="inputGroupName"
            type="text"
            value={inputGroupValue}
            onChange={handleChange}
            placeholder="그룹 이름을 입력하세요"
          />
        </div>
        <div>
          <h4 className="GroupEmail">추가하려는 멤버의 이메일을 입력하세요</h4>
          <input className="inputGroupEmail"
            type="text"
            value={inputEmailValue}
            onChange={handleEmailChange}
            placeholder="이메일을 입력하세요"
          />
          <button className="buttonGroupEmail" onClick={handleEmailSubmit}>입력</button>
        </div>
        <div>
          <p>추가한 이메일</p>
          <ul>
            {emailList.map((inputEmailValue, index) => (
              <li key={index}>{inputEmailValue}
               <button className="buttonGroupEmailRemove" onClick={() => handleRemoveEmail(index)}>x</button>
              </li>
            ))}
          </ul>
        </div>
        <button className="buttonSubmit" onClick={handleSubmit}>확인</button>

      </div>
    </div>
  );
};

export default Group_Modal;