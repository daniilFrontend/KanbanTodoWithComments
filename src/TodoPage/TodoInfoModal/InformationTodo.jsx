import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editTodoDescription } from "../../store/ProjectSlice/project-slice";
import s from "./Style/InformationTodo.module.scss"

export const timeInWork = (dateStart, dateEnd) => {
  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);
  if (dateEnd === null) {
    let timeDifference = new Date() - startDate;
    const hours = Math.floor(timeDifference / 3600000);
    timeDifference %= 3600000;
    const minutes = Math.floor(timeDifference / 60000);
    const formattedDifference = `${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}`;

    return formattedDifference;
  }
  if (dateEnd !== null) {
    let timeDifference = endDate - startDate;
    const hours = Math.floor(timeDifference / 3600000);
    timeDifference %= 3600000;
    const minutes = Math.floor(timeDifference / 60000);

    const formattedDifference = `${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}`;

    return formattedDifference;
  }
};
export const InformationTodo = ({ todo }) => {
  const dispatch = useDispatch();
  const isDescriptionEditing = todo.isEditing.todoDescription;
  const [description, setDescription] = useState(todo.description ?? "");

  useEffect(() => {
    if (isDescriptionEditing === true) {
      dispatch(editTodoDescription({ description: todo.description }));
    }
  }, []); 

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const onEditDecription = () => {
    dispatch(editTodoDescription({ description: description }));
  };
  const dateCreate = (date) => {
    if (date === null) {
      return "--.--.--";
    }
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
    const year = String(newDate.getFullYear()).slice(2); // Получаем последние две цифры года

    // Форматируем дату в "DD:MM:YY"
    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
  };

  return (
    <div>
      <div className={s.timeContainer}>
        <div>
          <h2>Дата создания</h2>
          <p>{dateCreate(todo.createAt)}</p>
        </div>
        <div>
          <p>Время в работе</p>
          <p>{timeInWork(todo.createAt, todo.endAt)}</p>
        </div>
        <div>
          <p>Дата окончания</p>
          <p>{dateCreate(todo.endAt)}</p>
        </div>
      </div>
      <div  className={s.descriptionContainer}>
        {isDescriptionEditing ? (
          
            <textarea
              className={s.descriptionEdit}
              value={description}
              onChange={(e) => onDescriptionChange(e)}
            />
         
        ) : (
          <p className={s.description}>{description}</p>
        )}
        <button onClick={onEditDecription}>
          {isDescriptionEditing ? "Готово" : "Изменить описание"}
        </button>
      </div>
    </div>
  );
};
