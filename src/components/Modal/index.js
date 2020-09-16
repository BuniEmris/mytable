import React, { forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import style from "../Modal/modal.module.css";
const Modal = forwardRef((props, ref) => {
  const [display, setDisplay] = React.useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      close: () => close(),
    };
  });

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <div className={style.modalwrapper}>
        <div onClick={close} className={style.modalbackdrop} />
        <div className={style.modalbox}>{props.children}</div>
      </div>,
      document.getElementById("modal-root")
    );
  }

  return null;
});

export default Modal;
