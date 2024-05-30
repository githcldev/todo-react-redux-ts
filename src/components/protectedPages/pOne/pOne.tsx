import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { toggleLogin, toggleSnack } from '../../../reducers/app/appSlice';
export const POne = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(toggleLogin({ status: false }));
    dispatch(toggleSnack({
      msg: "User logged out!",
      open: true
    }));
    navigate(`/home`);
  }
  return (
    <div className="App">
      <section>
        <h1>Protected Page One</h1>
        <Button variant="contained" fullWidth sx={{ marginTop: 3 }} onClick={logout} >
          Logout
        </Button>
      </section>
    </div>
  );
}
