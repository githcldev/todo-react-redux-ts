import React from 'react';
import { PostsList } from "./components/todos/TodosList";
import { AddPostForm } from "./components/todos/AddTodoForm";
import './App.css';

function App() {
  return (
    <div className="App">
      <section>
          <React.Fragment>
              <h2>All Todos</h2>
              <PostsList />
              <AddPostForm />
          </React.Fragment>
      </section>
    </div>
  );
}

export default App;
