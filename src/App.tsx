import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { changeView } from "./reducers/todo/todoSlice";
import { PostsList } from "./components/todos/TodosList";
import { AddPostForm } from "./components/todos/AddTodoForm";
import './App.css';
function App() {
  const dispatch = useDispatch();
  return (
    <div className="App">
      <section>
          <React.Fragment>
              <h2>All Todos</h2>
              <span>
                <button onClick={() => dispatch(changeView({view: 'add', value: null}))}>
                  Add Todo
                </button>
              </span>
              <PostsList />
              <AddPostForm />
          </React.Fragment>
      </section>
    </div>
  );
}
export default App;
