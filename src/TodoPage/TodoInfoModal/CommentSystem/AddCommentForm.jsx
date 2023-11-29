import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../store/ProjectSlice/project-slice";
import { useEffect } from "react";
import s from "./Style/AddCommentForm.module.scss";

const TEXT = "TEXT";
const NAME = "NAME";

const AddCommentForm = ({ onAddNestedComment, isCommentFirst = true }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    name: "",
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

  const onCommentChange = (e, TYPE) => {
    if (TYPE === TEXT) {
      setComment({ ...comment, text: e.target.value });
    }
    if (TYPE === NAME) {
      setComment({ ...comment, name: e.target.value });
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
  const onAddComment = () => {
    const validateTitle = (title) => validateField(title, 0, 50, setTitleError);
    const validateText = (text) => validateField(text, 1, 60, setTextError);
    const isValidTitle = validateTitle(comment.name);
    const isValidText = validateText(comment.text);

    if (isValidTitle && isValidText) {
      dispatch(addComment(comment));
      setComment({
        name: "",
        text: "",
      });
    }
  };
  const addNestedComment = () => {
    const validateTitle = (title) => validateField(title, 0, 50, setTitleError);
    const validateText = (text) => validateField(text, 1, 60, setTextError);
    const isValidTitle = validateTitle(comment.name);
    const isValidText = validateText(comment.text);
    if (isValidTitle && isValidText) {
      onAddNestedComment(comment.name === "" ? "Гость" : comment.name, comment.text);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.titleContainer}>
        <label className={s.titleLabel}>
          {titleError.status ? `${titleError.text}` : ""}
        </label>
        <input
          className={s.title}
          ref={titleInput}
          value={comment.name}
          onChange={(e) => onCommentChange(e, NAME)}
          type="text"
          placeholder="Имя (необязательно)"
        />
      </div>
      <div className={s.textContainer}>
        <label className={s.textLabel}>
          {textError.status ? `${textError.text}` : ""}
        </label>
        <input
          className={s.text}
          ref={textInput}
          value={comment.text}
          type="text"
          onChange={(e) => onCommentChange(e, TEXT)}
          placeholder="Вашу непревзойденную мысль о задаче писать тут"
        />
      </div>
      <div>
      <button
        className={s.addButton}
        onClick={isCommentFirst ? onAddComment : addNestedComment}
      >
        Добавить комментарий
      </button>
      
      </div>
    </div>
  );
};

export default AddCommentForm;
