import React, { useEffect, useRef, useState } from "react";
import { ModalContainer } from "../../components/ModalContainer";
import { useDispatch } from "react-redux";
import { GREEN, RED, YELLOW } from "../../store/ProjectSlice/todos-const";
import { setModalVisibility } from "../../store/ComponentSlice/components-slice";
import { addTodo } from "../../store/ProjectSlice/project-slice";
import s from "./Style/AddTodoModal.module.scss"
const TITLE = "TITLE";
const DESCCRIPTION = "DESCCRIPTION";
const PRIORITY = "PRIORITY";
const priorityList = [GREEN, YELLOW, RED];

export const AddTodoModal = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    priority: GREEN,
  });
  const [titleError, setTitleError] = useState({ status: false, text: null });
  const [textError, setTextError] = useState({ status: false, text: null });
  const textInput = useRef(null);
  const titleInput = useRef(null);
  useEffect(() => {
    const handleFocusTitle = () => {
      setTitleError({ status: false, text: null });
    };

    if (titleInput.current) {
      titleInput.current.addEventListener("focus", handleFocusTitle);
    }
    const handleFocusText = () => {
      setTextError({ status: false, text: null });
    };

    if (textInput.current) {
      textInput.current.addEventListener("focus", handleFocusText);
    }

    return () => {
      if (titleInput.current) {
        titleInput.current.removeEventListener("focus", handleFocusTitle);
      }
      if (textInput.current) {
        textInput.current.removeEventListener("focus", handleFocusText);
      }
    };
  }, [setTitleError, titleInput]);

  const onTodoFieldsChange = (e, type, priority) => {
    switch (type) {
      case TITLE:
        setTodo({ ...todo, title: e.target.value });
        break;
      case DESCCRIPTION:
        setTodo({ ...todo, description: e.target.value });
        break;
      case PRIORITY:
        setTodo({ ...todo, priority: priority });
        break;
      default:
        return;
    }
  };
  const validateField = (value, minLength, maxLength, setError) => {
    const error = { status: false, text: "" };
    if (value.trim() < minLength) {
      error.status = true;
      error.text = "Не может быть пустым";
    } else if (value.length > maxLength) {
      error.status = true;
      error.text = `Не более ${maxLength} знаков`;
    }
    setError(error);
    return !error.status;
  };

  const onAddTodo = () => {
    //Описана валидация
    const validateText = (text) => validateField(text, 0, 150, setTextError);
    const validateTitle = (title) => validateField(title, 1, 30, setTitleError);
    const isValidTitle = validateTitle(todo.title);
    const isValidText = validateText(todo.description);

    if (isValidTitle && isValidText) {
      dispatch(addTodo(todo));
      dispatch(setModalVisibility());
    }
  };
  return (
    <ModalContainer callBack={setModalVisibility}>
      
      <div className={s.container}>
      <label className={s.titleLabel}>{titleError.status ? `${titleError.text}` : ""}</label>
        <input
          ref={titleInput}
          onChange={(e) => onTodoFieldsChange(e, TITLE)}
          type="text"
          placeholder="Назавание туду "
          value={todo.title}
          className={s.titleInput}
        />
        <div className={s.todoPriorityContainer}>
          <ul className={s.todoPriorityList}>
          {priorityList.map((i) => {
            return (
              <li
                className={s.todoPriority}
                key={i}
                style={
                  todo.priority === i 
                  ? { outline: `2px solid ${i}`, backgroundColor: `${i.toLowerCase()}` } 
                  : {backgroundColor: `${i.toLowerCase()}`}
                }
                onClick={(e) => onTodoFieldsChange(e, PRIORITY, i)}
              >
              </li>
            );
          })}
          </ul>
        </div>
      </div>
      <div className={s.descriptionContainer}>
        <label className={s.descriptionLabel}>{textError.status ? `${textError.text}` : ""}</label>
        <textarea
          ref={textInput}
          onChange={(e) => onTodoFieldsChange(e, DESCCRIPTION)}
          value={todo.description}
          placeholder="Описание задачи"
          className={s.description}
          resise = "none"
        ></textarea>
      </div>      
      <button className={s.addTodoButton} onClick={onAddTodo}>Добавить задачу</button>
  
    </ModalContainer>
  );
};
