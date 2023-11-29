import { createSlice } from "@reduxjs/toolkit";
import { DONE, QUEUE } from "./todos-const";

const projectSlice = createSlice({
  name: "@@PROJECT",
  initialState: {
    allProjects: [],
    currentProjectId: null,
    currentTodoId: null,
  },
  reducers: {
    addProject: (state, { payload }) => {
      const newProject = {
        title: payload,
        id: Date.now(),
        todos: [],
      };
      state.allProjects.push(newProject);
    },
    deleteProject: (state, { payload }) => {
      state.allProjects = state.allProjects.filter(
        (project) => project.id !== payload
      );
    },
    setCurrentProjectId: (state, { payload }) => {
      state.currentProjectId = payload;
    },
    setCurrentTodoId: (state, { payload }) => {
      state.currentTodoId = payload;
    },
    addTodo: (state, { payload }) => {
      const { title, description, priority } = payload;
      const newTodo = {
        id: Date.now(),
        title: title,
        description: description,
        priority: priority,
        nestedTodos: [],
        status: QUEUE,
        isEditing: {
          todoTitle: false,
          todoDescription: false,
          todoDeadline: false,
        },
        createAt: new Date().toISOString(),
        endAt: null,
        comments: [],
      };
      const neededProject = state.allProjects.findIndex(
        (i) => i.id === state.currentProjectId
      );
      state.allProjects[neededProject].todos.push(newTodo);
    },
    deleteTodo: (state, { payload }) => {
      const { todoId } = payload;
      const neededProject = state.allProjects.find(
        (i) => i.id === state.currentProjectId
      );
      neededProject.todos = neededProject.todos.filter((i) => i.id !== todoId);
    },
    switchTodoStatus: (state, { payload }) => {
      const { id, status, draggedItem, hoveredItem } = payload;
      const neededProject = state.allProjects.find(
        (i) => i.id === state.currentProjectId
      );
      neededProject.todos.map((i) => {
        if (i.id === id) i.status = status;
        if (i.id === id && status === DONE) i.endAt = new Date().toISOString();
        if (i.id === id && status !== DONE) i.endAt = null;
      });
      const draggedItemIndex = neededProject.todos.findIndex(
        (i) => i.id === draggedItem.id
      );
      const hoveredItemIndex = neededProject.todos.findIndex(
        (i) => i.id === hoveredItem.id
      );
      const nedeedItem = neededProject.todos.find(
        (i) => i.id === draggedItem.id
      );
      neededProject.todos.splice(draggedItemIndex, 1);
      neededProject.todos.splice(hoveredItemIndex, 0, nedeedItem);
    },
    addSubTodo: (state, { payload }) => {
      const { title, text } = payload;
      const newSubTodo = {
        title,
        text,
        id: Date.now(),
        done: false,
      };
      const neededProject = state.allProjects.find(
        (i) => i.id === state.currentProjectId
      );
      neededProject.todos.map((i) => {
        if (i.id === state.currentTodoId) {
          i.nestedTodos.push(newSubTodo);
        }
      });
    },
    changeSubTodoStatus: (state, { payload }) => {
      const { subTodoIndex } = payload;
      const neededProject = state.allProjects.find(
        (i) => i.id === state.currentProjectId
      );
      const neededTodo = neededProject.todos.find(
        (i) => i.id === state.currentTodoId
      );
      neededTodo.nestedTodos[subTodoIndex].done =
        !neededTodo.nestedTodos[subTodoIndex].done;
    },
    deleteSubTodo: (state, { payload }) => {
      const { subTodoIndex } = payload;
      const neededProject = state.allProjects.find(
        (i) => i.id === state.currentProjectId
      );
      const neededTodo = neededProject.todos.find(
        (i) => i.id === state.currentTodoId
      );
      neededTodo.nestedTodos = neededTodo.nestedTodos.filter(
        (_, index) => index !== subTodoIndex
      );
    },
    editTodoDescription: (state, { payload }) => {
      const { description } = payload;
      const neededProject = state.allProjects.find(
        (i) => i.id === state.currentProjectId
      );
      const neededTodo = neededProject.todos.find(
        (i) => i.id === state.currentTodoId
      );
      neededTodo.isEditing.todoDescription =
        !neededTodo.isEditing.todoDescription;
      neededTodo.description = description;
    },
    addComment: (state, { payload }) => {
      const { name, text } = payload;
      const newComment = {
        name: name ? name : "Гость",
        text,
        id: Date.now(),
        commentReplied: false,
        parentId: null,
        nestedComments: [],
      };
      const neededProject = state.allProjects.find(
        (i) => i.id === state.currentProjectId
      );
      neededProject.todos.map((i) => {
        if (i.id === state.currentTodoId) {
          i.comments.push(newComment);
        }
      });
    },
    addNestedComment: (state, { payload }) => {
      const { name, text, parentId } = payload[0];
      const { rootCommentId, nested } = payload[1];
     
      const newNestedComment = {
        name,
        text,
        id: Date.now(),
        parentId: parentId,
        rootCommentId: rootCommentId,
        nestedComments: [],
      };
      const neededProject = state.allProjects.find(
        (i) => i.id === state.currentProjectId
      );
      const neededTodo = neededProject.todos.find(
        (i) => i.id === state.currentTodoId
      );
      const rootComment = neededTodo.comments.find(
        (i) => i.id === rootCommentId
      );
      if (!nested) {
        rootComment.commentReplied = true;
        rootComment.nestedComments.push(newNestedComment);
      }
      if (nested) {
        function addCommentToStructure(comments, parentId, newComment) {
          for (const comment of comments) {
            if (comment.id === parentId) {
              if (!comment.nestedComments) {
                comment.nestedComments = [];
              }
              comment.commentReplied = true;
              comment.nestedComments.push(newComment);
            }

            if (comment.nestedComments && comment.nestedComments.length > 0) {
              const addedToNested = addCommentToStructure(
                comment.nestedComments,
                parentId,
                newComment
              );
              if (addedToNested) {
                comment.commentReplied = true;
              }
            }
          }

          return false;
        }
        addCommentToStructure(neededTodo.comments, parentId, newNestedComment);
      }
    },
  },
});
export const {
  deleteTodo,
  addComment,
  setCurrentTodoId,
  switchTodoStatus,
  addProject,
  deleteProject,
  setCurrentProjectId,
  addTodo,
  addSubTodo,
  changeSubTodoStatus,
  deleteSubTodo,
  editTodoDescription,
  addNestedComment,
} = projectSlice.actions;
export const projectReducer = projectSlice.reducer;
