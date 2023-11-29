import React from "react";
import { useDispatch } from "react-redux";
import {  setCurrentTodoId} from "../store/ProjectSlice/project-slice";
import { setTodoInfoVisibility } from "../store/ComponentSlice/components-slice";
import { useDrag, useDrop } from "react-dnd";
import { timeInWork } from "./TodoInfoModal/InformationTodo";
import s from "./Style/TodoItem.module.scss";
export const TodoItem = ({ todo, findHoveredItem }) => {
  const dispatch = useDispatch();
  const [isDragging, drag] = useDrag(() => ({
    type: "todoItem",
    item: todo,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isOver }, drop] = useDrop({
    accept: "todoItem",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  isOver ? (() => findHoveredItem(todo))() : "";
  const showTodoInfo = () => {
    dispatch(setCurrentTodoId(todo.id));
    dispatch(setTodoInfoVisibility(true));
  };
  return (
    <div style={{ borderLeft: `4px solid ${todo.priority}`} } className={s.todoItemContainer} onClick={showTodoInfo} ref={drag}>
      <div ref={drop}>
       
        <p className={s.todoTitle}>{todo.title}</p>
        <p className={s.todoDescription}>{todo.description}</p>
        <p className={s.todoTime}>{timeInWork(todo.createAt, todo.endAt)}</p>
       
      </div>
    </div>
  );
};
