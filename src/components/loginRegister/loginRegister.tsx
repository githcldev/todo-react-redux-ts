import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Unstable_Grid2 as Grid } from '@mui/material';

import type { RootState } from "../../common/store";
import { userAdded } from "../../reducers/user/userSlice";
import { toggleLogin, toggleSnack } from "../../reducers/app/appSlice";

export const LoginRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users.users);
  let [nameError, setNameError] = useState(false);
  let [passError, setPassError] = useState(false);
  const nameRef: any = useRef("");
  const passRef: any = useRef("");

  const validateForm = () => {
    if(!nameRef.current.value) {
      setNameError(true)
      dispatch(toggleSnack({
        msg: "No value found for username",
        open: true
      }))
      return;
    }
    if(!passRef.current.value) {
      setPassError(true)
      dispatch(toggleSnack({
        msg: "No value found for password",
        open: true
      }))
      return;
    }
    const foundUser = users.find(user => user.name === nameRef.current.value)
    if (!foundUser) {
      dispatch(toggleSnack({
        msg: "User not found! Registered now",
        open: true
      }))
      dispatch(userAdded({name: nameRef.current.value, pass: passRef.current.value}))
    } else if(foundUser && users.find(user => user.name === nameRef.current.value && user.pass === passRef.current.value)) {
      // navigate to protected page
      dispatch(toggleSnack({
        msg: "Success login, navigating to protected page",
        open: true
      }))
      // set user login true
      dispatch(toggleLogin({status: true}))
      navigate(`/pOne`);
      return;
    } else if(foundUser){
      // password not match for given username
      dispatch(toggleSnack({
        msg: "Password not match for given username, Retry!",
        open: true
      }))
      passRef.current.value = ""
      return;
    }
  }
  
  return (
    <div className="App">
      <section>
        <h1>Register / Login</h1>
        <Grid justifyContent="center" alignItems="center" margin="0 auto" maxWidth={300} alignSelf="center" container>
          <TextField fullWidth id="standard-basic" label="Name" variant="standard" inputRef={nameRef}
            error={nameError ? true : false} helperText="" />
          <TextField fullWidth id="standard-basic" error={passError ? true : false} inputRef={passRef}
            helperText="" label="Password" sx={{marginTop: 3}} variant="standard" />
          <Button variant="contained" fullWidth sx={{marginTop: 3}} onClick={validateForm} >
            Register / Login
          </Button>
        </Grid>
      </section>
    </div>
  );
}
