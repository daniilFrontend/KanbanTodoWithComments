import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddTodoModal } from "./AddTodoModal/AddTodoModal";
import {
  setModalVisibility,
  setSubTodoModalVisibility,
  setTodoInfoVisibility,
} from "../store/ComponentSlice/components-slice";
import { DEVELOPMENT, DONE, QUEUE } from "../store/ProjectSlice/todos-const";
import { TodoItem } from "./TodoItem";
import { TodoInfoModal } from "./TodoInfoModal/TodoInfoModal";
import { switchTodoStatus } from "../store/ProjectSlice/project-slice";
import DropWrapper from "../components/DropWrapper";
import s from "./Style/TodoPage.module.scss";

export const TodoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todoInfoModalVisibility = useSelector(
    (state) => state.components.todoInfoVisibility
  );
  const currentProject = useSelector(
    (state) => state.projects.currentProjectId
  );
  const todoList = useSelector((state) => {
    const neededProject = state.projects.allProjects.find(
      (i) => i.id === currentProject
    );
    return neededProject.todos;
  });
  const todoModalVisibility = useSelector(
    (state) => state.components.modalVisibility
  );
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    dispatch(setTodoInfoVisibility(false));
    dispatch(setModalVisibility(false));
    dispatch(setSubTodoModalVisibility(false));
  }, []);

  const filteredTodo = (type) => {
    const MemoizedTodoItem = React.memo(TodoItem);
    const filteredTodos = todoList.filter((i) => i.status === type);
    return filteredTodos.map((i) => (
      <MemoizedTodoItem findHoveredItem={findHoveredItem} todo={i} key={i.id} />
    ));
  };
  const onAddTodoModal = () => {
    dispatch(setModalVisibility(true));
  };
  const backToProjects = () => {
    navigate("/");
  };
  const findHoveredItem = (item) => {
    setHoveredItem(item);
  };
  const onDrop = (item, status) => {
    dispatch(
      switchTodoStatus({
        id: item.id,
        status: status,
        hoveredItem,
        draggedItem: item,
      })
    );
  };

  return (
    <div className={s.background}>
      {todoInfoModalVisibility ? <TodoInfoModal /> : ""}
      {todoModalVisibility ? <AddTodoModal /> : ""}
      <div className={s.container}>
        <div className={s.menu}>
          <button onClick={backToProjects}>Назад</button>
          <button onClick={onAddTodoModal}>Добавить задачу</button>
        </div>

        <div className={s.dropArea}>
          <DropWrapper status={QUEUE} onDrop={onDrop}>
            <p className={s.todoType}>В очереди</p>
            <div className={s.todoItem}>{filteredTodo(QUEUE)}</div>
          </DropWrapper>

          <DropWrapper status={DEVELOPMENT} onDrop={onDrop}>
            <p className={s.todoType}>В разработке</p>
            <div className={s.todoItem}>{filteredTodo(DEVELOPMENT)}</div>
          </DropWrapper>

          <DropWrapper status={DONE} onDrop={onDrop}>
            <p className={s.todoType}>Закрытые</p>
            <div className={s.todoItem}>{filteredTodo(DONE)}</div>
          </DropWrapper>
        </div>
      </div>
    </div>
  );
};
