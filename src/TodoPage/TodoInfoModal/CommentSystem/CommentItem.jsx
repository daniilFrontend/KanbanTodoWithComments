import AddCommentForm from "./AddCommentForm";
import { useDispatch } from "react-redux";
import { addNestedComment } from "../../../store/ProjectSlice/project-slice";
import { useState } from "react";
import s from "./Style/CommentItem.module.scss"
const CommentItem = ({ comment, rootCommentId, nested }) => {
  const dispatch = useDispatch();
  const [addCommentForm, setAddCommentForm] = useState(false);

  const onAddNestedComment = (name, text) => {
    dispatch(
      addNestedComment([
        {
          nested,
          name,
          text,
          parentId: comment.id,
          commentReplied: true,
        },
        { rootCommentId, nested },
      ])
    );
    setAddCommentForm(false);
  };
  const addCommentFormToggle = () => {
    setAddCommentForm(!addCommentForm);
  };
  return (
    <div className={s.container}>
      <div className={s.topicStarter}>
      <p className={s.commentName}>{comment.name}</p>
      <p className={s.commentText}>{comment.text}</p>
      {addCommentForm ? (
        <AddCommentForm
          isCommentFirst ={false}
          nested={nested}
          onAddNestedComment={onAddNestedComment}
        />
      ) : (
        ""
      )}
      <button className={addCommentForm 
        ? s.cancelButton 
        : s.replyButton} 
        onClick={addCommentFormToggle}>
        {addCommentForm ? "Отмена" : "Ответить"}
      </button>
      </div>
   
      <div  className={s.commentsContainer}>
        {comment.commentReplied
          ? comment.nestedComments.map((i) => {
              return (
                <CommentItem
                  nested={true}
                  rootCommentId={rootCommentId}
                  parentId={i.id}
                  comment={i}
                  key={i.id}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default CommentItem;
