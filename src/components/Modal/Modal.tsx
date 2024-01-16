import { FC, useContext, useEffect } from "react";
import css from "./Modal.module.css";
import { IModalProps } from "./Modal.types";
import { ModalDataContext } from "../App";

export const Modal: FC<IModalProps> = ({ onClose }) => {
  const onModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const onBtnClick = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onBtnClick);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onBtnClick);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const modalData = useContext(ModalDataContext);

  return (
    <div className={css.overlay} onClick={onModalClick}>
      <div className={css.modal}>
        <img className={css.photo} src={modalData} alt="" />
      </div>
    </div>
  );
};
