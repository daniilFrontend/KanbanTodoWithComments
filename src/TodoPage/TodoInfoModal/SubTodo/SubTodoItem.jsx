import React from "react";
import { useDispatch } from "react-redux";
import {
  changeSubTodoStatus,
  deleteSubTodo,
} from "../../../store/ProjectSlice/project-slice";
import s from "./Style/SubTodoItem.module.scss";
import { deleteIcon } from "../../../ProjectPage/ProjectItem";
export const SubTodoItem = ({ todo, index }) => {
  const dispatch = useDispatch();
  const changeStatus = () => {
    dispatch(
      changeSubTodoStatus({
        subTodoIndex: index,
      })
    );
  };
  const deleteTodo = () => {
    dispatch(
      deleteSubTodo({
        subTodoIndex: index,
      })
    );
  };
  return (
    <div className={s.container}>
      <input type="checkbox" checked={todo.done} onChange={changeStatus} />
      <div className={s.textContainer}>
        <p className={s.title}>{todo.title}</p>
        <p className={s.text}>{todo.text}</p>
      </div>
      <button  onClick={deleteTodo}>{deleteIcon}</button>
    </div>
  );
};
