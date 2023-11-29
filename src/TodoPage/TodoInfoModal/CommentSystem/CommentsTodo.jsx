import React from "react";
import AddCommentForm from "./AddCommentForm";
 import CommentItem from "./CommentItem";
import s from "./Style/CommentsTodo.module.scss"
export const CommentsTodo = ({ todo }) => {
  return (
    <div className={s.container}>
      <AddCommentForm />
      <div>
        {todo.comments.map((i) => {
          return (
            <CommentItem
              parentId = {i.parentId}
              nested={false}
              rootCommentId={i.id}
              key={i.id}
              comment={i}
            />
          );
        })}
      </div>
    </div>
  );
};

