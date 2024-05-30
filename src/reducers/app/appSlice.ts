import {
    createSlice,
    createEntityAdapter,
    nanoid
} from "@reduxjs/toolkit";
import { App, Contact } from "./App";
const appAdapter = createEntityAdapter<App>({
});
let initState = {
    title: 'Multi page application',
    userLogin: false,
    snackMsg: '',
    snackOpen: false,
    contacts: new Array<Contact>()
}
const initialState = appAdapter.getInitialState(initState);
const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        toggleLogin(state, action) {
            console.log('toggleLogin reducer')
            const { status } = action.payload;
            state.userLogin = status;
        },
        toggleSnack(state, action) {
            console.log('toggleLogin reducer')
            const { msg, open } = action.payload;
            state.snackMsg = msg;
            state.snackOpen = open;
        },
        addContact(state, action) {
            console.log('toggleLogin reducer')
            const { name, msg, grade, mail } = action.payload;
            state.contacts = [ ...state.contacts, {
                name, msg, grade, mail, id: nanoid(),
            }]
            state.snackMsg = "Contact details added with message"
            state.snackOpen = true;
        },
    },
    extraReducers(builder) {
    }
});
export const { toggleLogin, toggleSnack, addContact } = appSlice.actions;
export default appSlice.reducer;
