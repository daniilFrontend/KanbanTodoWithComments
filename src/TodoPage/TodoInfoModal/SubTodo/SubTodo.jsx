import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSubTodoModalVisibility } from '../../../store/ComponentSlice/components-slice'
import { AddSubTodoModal } from './AddSubTodoModal/AddSubTodoModal'
import { SubTodoItem } from './SubTodoItem'
import s from "./Style/SubTodo.module.scss"
export const SubTodo = ({todo}) => {
  const dispatch = useDispatch()
  const subTodoVisibility = useSelector(state => state.components.subTodoVisibility)
  const onAddSubTodo = () =>{
    dispatch(setSubTodoModalVisibility(true))
  } 
  const subTodoList = (todos) =>{
    return todos.nestedTodos.map( (i, index) => {
      return(
        <li key ={i.id}>
            <SubTodoItem todo = {i} key ={i.id} index = {index}/>
        </li>
      )
      })
    }
  return (
    <div className={s.container}>
      {subTodoVisibility ? <AddSubTodoModal/> : ""}
        <ul className={s.subTodoList}>
            {subTodoList(todo)}
        </ul>
      <button className={s.addButton} onClick={onAddSubTodo}>Добавить подзадачу</button>
    </div>
  )
}
