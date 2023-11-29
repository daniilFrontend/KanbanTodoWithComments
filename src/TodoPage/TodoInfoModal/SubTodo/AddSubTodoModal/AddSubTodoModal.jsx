import React, { useEffect, useState } from "react";
import { ModalContainer } from "../../../../components/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { setSubTodoModalVisibility } from "../../../../store/ComponentSlice/components-slice";
import { addSubTodo } from "../../../../store/ProjectSlice/project-slice";
import { useRef } from "react";
import s from "./Style/AddSubTodoModal.module.scss";
const NAME = "NAME";
const TEXT = "TEXT";
export const AddSubTodoModal = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    title: "",
    text: "",
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

  const onAddSubTodo = () => {
    const validateTitle = (title) => validateField(title, 1, 50, setTitleError);
    const validateText = (text) => validateField(text, 0, 60, setTextError);
    const isValidTitle = validateTitle(todo.title);
    const isValidText = validateText(todo.text);

    if (isValidTitle && isValidText) {
      dispatch(addSubTodo(todo));
      dispatch(setSubTodoModalVisibility());
    }
  };

  const onTodoFieldsChange = (e, type) => {
    switch (type) {
      case NAME:
        setTodo({ ...todo, title: e.target.value });
        break;
      case TEXT:
        setTodo({ ...todo, text: e.target.value });
        break;
      default:
        return;
    }
  };

  return (
    <ModalContainer callBack={setSubTodoModalVisibility}>
      <div className={s.container}>
        <label>{titleError.status ? `${titleError.text}` : ""}</label>

        <input
          onChange={(e) => onTodoFieldsChange(e, NAME)}
          type="text"
          placeholder="Название задачи"
          value={todo.title}
          ref={titleInput}
        />
      </div>
      <div className={s.descriptionContainer}>
        <label>{textError.status ? `${textError.text}` : ""}</label>
        <textarea
          className={s.description}
          onChange={(e) => onTodoFieldsChange(e, TEXT)}
          value={todo.text}
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Описание задачи"
          ref={textInput}
        ></textarea>
      </div>

      <button className={s.addTodoButton} onClick={onAddSubTodo}>
        Добавить подзадачу
      </button>
    </ModalContainer>
  );
};
