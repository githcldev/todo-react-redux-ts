import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../common/store";
import { todoAdded, todoUpdated, changeView } from "../../reducers/todo/todoSlice";
import { AppDispatch } from "../../common/store";
// import { Todo } from "../../reducers/todo/Todo";
export const AddPostForm = () => {
  const currentView = useSelector((state: RootState) => state.todos.view);
  const currentTodo: any = useSelector((state: RootState) => state.todos.currentTodo);
  let [title, setTitle] = useState("");
  let [completed, setCompleted] = useState(false);
  if (currentView === 'edit') {
    title = currentTodo.title; completed = currentTodo.completed
  }
  const dispatch = useDispatch<AppDispatch>();
  const onSaveTodoClicked = async () => {
    console.log('onSaveTodoClicked')
    if (currentView === 'edit') {
      dispatch(
        todoUpdated({
          id: currentTodo.id,
          title, completed
        })
      );
    } else {
      await dispatch(todoAdded({ title, completed }));
    }
    setTitle("");
    setCompleted(false);
  };
  return (
    <section className="add-new-post">
      <h2>{currentView === 'edit' ? 'Edit' : 'Add'} Todo</h2>
      <form className="post-excerpt form-container">
        <label htmlFor="todoTitle">Post Title:</label>
        <input type="text" id="todoTitle" name="todoTitle"
          onChange={(e) => {
            if(currentView === 'edit') {
              dispatch(changeView({view: 'edit',
              value: {
                ...currentTodo,
                title: e.target.value
              }}))
            } else setTitle(e.target.value)
          }}
          value={title} className="form-input" /><br />
        <label htmlFor="completed">Completed:</label>
        <input type="checkbox" id="completed" name="completed"
          onChange={(e) => {
            if(currentView === 'edit') {
              dispatch(changeView({
                view: 'edit',
                value: {...currentTodo, completed:Boolean(e.target.value) }
              }))
            } else {
              setCompleted(Boolean(e.target.value))
            }
          }}
          checked={completed} /><br />
        <button type="button" onClick={onSaveTodoClicked} className="button">
          Save</button>
      </form>
    </section>
  );
};
