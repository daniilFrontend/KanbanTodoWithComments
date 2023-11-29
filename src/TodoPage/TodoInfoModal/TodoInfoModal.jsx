import React  from "react";
import { ModalContainer } from "../../components/ModalContainer";
import { SubTodo } from "./SubTodo/SubTodo";
import { InformationTodo } from "./InformationTodo";
import { CommentsTodo } from "./CommentSystem/CommentsTodo";
import { setTodoInfoVisibility } from "../../store/ComponentSlice/components-slice";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  setCurrentTodoId,
} from "../../store/ProjectSlice/project-slice";
import s from "./Style/TodoInfoModal.module.scss";
export const TodoInfoModal = () => {
  const dispatch = useDispatch();
  const currentProjectId = useSelector(
    (state) => state.projects.currentProjectId
  );
  const currentTodoId = useSelector((state) => state.projects.currentTodoId);
  const todo = useSelector((state) => {
    return state.projects.allProjects
      .find((i) => i.id === currentProjectId)
      .todos.find((i) => i.id === currentTodoId);
  });

  const onDeleteTodo = (e) => {
    e.stopPropagation();
    dispatch(setTodoInfoVisibility());
    dispatch(setCurrentTodoId(null));
    dispatch(deleteTodo({ todoId: todo.id }));
  };

  return (
    <ModalContainer callBack={setTodoInfoVisibility}>
      <div className={s.container}>
        <div className={s.titleContainer}>
          <p>{todo.title}</p>
        </div>
        <div className={s.informationContainer}>
          <InformationTodo todo={todo} />
        </div>
        <div className={s.subTodoContainer}>
          <SubTodo todo={todo} />
        </div>
        <div className={s.commentContainer}>
          <CommentsTodo todo={todo} />
        </div>
        <div className={s.deleteButton}>
          <button onClick={(e) => onDeleteTodo(e)}>Удалить туду</button>
        </div>
      </div>
    </ModalContainer>
  );
};
