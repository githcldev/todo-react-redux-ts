import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

import type { RootState } from "./common/store";
import { changeView } from "./reducers/todo/todoSlice";
import { toggleSnack } from "./reducers/app/appSlice";
import { NavBar } from './components/NavBar';
import { PostsList } from "./components/todos/TodosList";
import { AddPostForm } from "./components/todos/AddTodoForm";
import { ContactForm } from "./components/contact/ContactForm";
import { Dt } from "./components/dt/dt";
import { LoginRegister } from "./components/loginRegister/loginRegister";
import { POne } from "./components/protectedPages/pOne/pOne";
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state: RootState) => state.app.userLogin);
  const snackMsg = useSelector((state: RootState) => state.app.snackMsg);
  const snackOpen = useSelector((state: RootState) => state.app.snackOpen);
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(toggleSnack({
      msg: "",
      open: false
    }))
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className="App">
      <section>
        <NavBar />
      </section>
      <section>
        <Routes>
          <Route path="/" element={<Navigate replace to="/contact" />} />
          <Route
            path="/dt"
            element={
              <section>
                <React.Fragment>
                  <h1>Data</h1>
                  <Dt />
                </React.Fragment>
              </section>
            }
          />
          <Route
            path="/loginRegister"
            element={
              <section>
                <React.Fragment>
                  <LoginRegister />
                </React.Fragment>
              </section>
            }
          />
          <Route
            path={userLogin ? "/pOne" : "/loginRegister"}
            element={
              <section>
                <React.Fragment>
                  <h1>Protected page One</h1>
                  <POne />
                </React.Fragment>
              </section>
            }
          />
          <Route
            path="/contact"
            element={
              <section>
                <React.Fragment>
                  <h1>Contact</h1>
                  <ContactForm />
                </React.Fragment>
              </section>
            }
          />
          <Route
            path="/home"
            element={
              <section>
                <React.Fragment>
                  <h1>Home</h1>
                </React.Fragment>
              </section>
            }
          />
          <Route
            path="/todo"
            element={
              <section>
                <React.Fragment>
                  <h2>All Todos</h2>
                  <span>
                    <button onClick={() => dispatch(changeView({ view: 'add', value: null }))}>
                      Add Todo
                    </button>
                  </span>
                  <PostsList />
                  <AddPostForm />
                </React.Fragment>
              </section>
            }
          />
        </Routes>
      </section>
      <section>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={handleClose}
          message={snackMsg}
          action={action}
        />
      </section>
    </div>
  );
}
export default App;
