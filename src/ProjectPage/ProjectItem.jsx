import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteProject,
  setCurrentProjectId,
} from "../store/ProjectSlice/project-slice";
import { useNavigate } from "react-router-dom";
import s from "./Style/ProjectItem.module.scss";

export const deleteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="25"
    height="25"
    viewBox="0 0 48 48"
  >
    <polygon fill="#9575cd" points="32,10 28,6 20,6 16,10"></polygon>
    <path
      fill="#9575cd"
      d="M11,10v30c0,2.2,1.8,4,4,4h18c2.2,0,4-1.8,4-4V10H11z"
    ></path>
    <path
      fill="#7454b3"
      d="M24.5,39h-1c-0.8,0-1.5-0.7-1.5-1.5v-19c0-0.8,0.7-1.5,1.5-1.5h1c0.8,0,1.5,0.7,1.5,1.5v19	C26,38.3,25.3,39,24.5,39z"
    ></path>
    <path
      fill="#7454b3"
      d="M31.5,39L31.5,39c-0.8,0-1.5-0.7-1.5-1.5v-19c0-0.8,0.7-1.5,1.5-1.5l0,0c0.8,0,1.5,0.7,1.5,1.5v19	C33,38.3,32.3,39,31.5,39z"
    ></path>
    <path
      fill="#7454b3"
      d="M16.5,39L16.5,39c-0.8,0-1.5-0.7-1.5-1.5v-19c0-0.8,0.7-1.5,1.5-1.5l0,0c0.8,0,1.5,0.7,1.5,1.5v19	C18,38.3,17.3,39,16.5,39z"
    ></path>
    <path
      fill="#b39ddb"
      d="M11,8h26c1.1,0,2,0.9,2,2v2H9v-2C9,8.9,9.9,8,11,8z"
    ></path>
  </svg>
);

export default function ProjectItem({ project }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, id } = project;
  const onDeleteProject = (e, itemId) => {
    e.stopPropagation();
    dispatch(deleteProject(itemId));
  };
  const onChoseProject = (e) => {
    e.stopPropagation();
    dispatch(setCurrentProjectId(id));
    navigate("/todos");
  };
  return (
    <div  className={s.container}>
      <p onClick={(e) =>onChoseProject(e)} className={s.title}>{title}</p>
      <button onClick={(e) => onDeleteProject(e, id)}>{deleteIcon}</button>
    </div>
  );
}
