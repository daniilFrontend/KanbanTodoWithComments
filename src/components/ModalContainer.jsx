import React from "react";
import s from "./Style/ModalContainer.module.css";
import { useDispatch } from "react-redux";
export const ModalContainer = (props) => {
  const dispatch = useDispatch();
  const onCloseModal = () => {
    dispatch(props.callBack(false));
  };
  return (
    <div onClick={onCloseModal} className={s.modal}>
      <div onClick={(e) => e.stopPropagation()} className={s.modal__content}>
        {props.children}
      </div>
    </div>
  );
};
