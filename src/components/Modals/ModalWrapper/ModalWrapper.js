import React, { useRef } from "react";
import "./ModalWrapper.css";

const ModalWrapper = ({ children, closeModal }) => {

    const modalRef = useRef(null);
    const handleModalClick = (e) => {
        if(modalRef.current) {
            if(!modalRef.current.contains(e.target)) closeModal();
        }
    }

    return (
        <div className={`Modal__Wrapper`} onClick={handleModalClick}>
            <div className="Modal__Content" ref={modalRef}>
                {children}
            </div>
        </div>
    )
}

export default ModalWrapper;