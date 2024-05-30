import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  TextField, Button, Unstable_Grid2 as Grid, Select, MenuItem,
  InputLabel, FormControl, NativeSelect
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { AppDispatch } from "../../common/store";
import { toggleSnack, addContact } from "../../reducers/app/appSlice";
import './contact.css';
export const ContactForm = () => {
  // const currentView = useSelector((state: RootState) => state.app.view);
  const dispatch = useDispatch<AppDispatch>();
  const nameRef: any = useRef("");
  let [nameError, setNameError] = useState(false);
  const mailRef: any = useRef("");
  let [mailError, setMailError] = useState(false);
  const [grade, setGrade] = useState('A');
  const gradeRef: any = useRef("");
  const msgRef: any = useRef("");
  let [msgError, setMsgError] = useState(false);
  const validateForm = () => {
    if (!nameRef.current.value) {
      setNameError(true)
      dispatch(toggleSnack({
        msg: "No value found for username",
        open: true
      }))
      return;
    }
    if (!mailRef.current.value) {
      setMailError(true)
      dispatch(toggleSnack({
        msg: "No value found for mail",
        open: true
      }))
      return;
    }
    if (!msgRef.current.value) {
      setMsgError(true)
      dispatch(toggleSnack({
        msg: "No value found for message",
        open: true
      }))
      return;
    }
    const newContact = {
      name: nameRef.current.value,
      msg: msgRef.current.value,
      grade: gradeRef.current.value,
      mail: mailRef.current.value
    };
    nameRef.current.value = ""
    msgRef.current.value = ""
    gradeRef.current.value = ""
    mailRef.current.value = ""

    dispatch(addContact(newContact))
  }
  const handleChange = (event: SelectChangeEvent) => {
    setGrade(event.target.value as string);
  };
  return (
    <section className="contactForm">
      <Grid justifyContent="center" alignItems="center" margin="0 auto" maxWidth={300} alignSelf="center" container>
        <FormControl fullWidth>
          <TextField fullWidth id="standard-basic" label="Name" variant="standard"
            inputRef={nameRef} error={nameError ? true : false} helperText="" />
          <span className="formLabel">
            Age
          </span>
          <Select id="demo-select-small" defaultValue="10" value={grade} label="Age"
            inputRef={gradeRef} onChange={handleChange}>
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
          </Select>
          <TextField fullWidth id="standard-basic" error={mailError ? true : false} inputRef={mailRef}
            helperText="" label="E-Mail" sx={{ marginTop: 3 }} variant="standard" />
          <TextField fullWidth id="standard-basic" error={msgError ? true : false} inputRef={msgRef}
            helperText="" label="Message" sx={{ marginTop: 3 }} variant="standard" />
          <Button variant="contained" fullWidth sx={{ marginTop: 3 }} onClick={validateForm} >
            Submit
          </Button>
        </FormControl>
      </Grid>
    </section>
  );
};
