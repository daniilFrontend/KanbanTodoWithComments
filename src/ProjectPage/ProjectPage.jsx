import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../store/ProjectSlice/project-slice";
import ProjectItem from "./ProjectItem";
import s from "./Style/ProjectPage.module.scss";
export default function ProjectPage() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState({ status: false, text: null });
  
  const projectList = useSelector((state) => state.projects.allProjects);
  const titleInput = useRef()

  useEffect(() => {
    const handleFocusTitle = () => {
      setTitleError({ status: false, text: null });
    };
    if (titleInput.current) {
      titleInput.current.addEventListener("focus", handleFocusTitle);
    }
    return () => {
      if (titleInput.current) {
        titleInput.current.removeEventListener("focus", handleFocusTitle);
      }
    };
  }, [setTitleError, titleInput]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const memoizedProjectList = useMemo(() => {
    return projectList.map((i) => <ProjectItem key={i.id} project={i} />);
  }, [projectList]);

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

  const onAddProject = (e) => {
    e.preventDefault();
    const validateTitle = (title) => validateField(title, 1, 30, setTitleError);
    const isValidTitle = validateTitle(title);
    if (isValidTitle) {
      setTitle("");
      dispatch(addProject(title));
    }

  };

  return (
    <div className={s.appContainer}>
      <div className={s.projectModal}>
        <form className={s.projectInput}>
        <label className={s.titleLabel}>{titleError.status ? `${titleError.text}` : ""}</label>
          <input
            ref={titleInput}
            placeholder="Название проекта"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e)}
          />
          <button onClick={(e) => onAddProject(e)}>Добавить</button>
        </form>
        <hr />
        <div className={s.projectList}>{memoizedProjectList}</div>
      </div>
    </div>
  );
}
