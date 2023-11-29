import { useDrop } from "react-dnd";
import React from "react";
import s from "../TodoPage/Style/TodoPage.module.scss" // стили с тудуПэйдж
const DropWrapper = ({ onDrop, children, status }) => {
  const [_, drop] = useDrop({
    accept: "todoItem",
    drop: (item) => {
      onDrop(item, status);
    },
  });
  return <div className={s.taskContainer} ref={drop}>{children}</div>;
};

export default DropWrapper;
