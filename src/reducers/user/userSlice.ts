import {
    createSlice,
    nanoid,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../common/store";
const userAdapter = createEntityAdapter<User>({});
export interface User {
    id: string;
    name: string;
    pass: string;
    date: string;
}
export interface Users {
    users: User[]
}
let initState: Users = {
    users: []
}
const initialState = userAdapter.getInitialState(initState);
export const fetchUser: any = createAsyncThunk(
    "user/fetchUser",
    async (_, { getState }) => {
        const allUser: any = (getState() as RootState).users;
        // const response = await axios.get(API_URL + "/posts");
        // return response.data;
        return allUser;
    }
);
const userSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        userAdded(state: any, action) {
            console.log('todoAdded reducer')
            const { name, pass } = action.payload;
            let UserItem: User = {
                id: nanoid(),
                name,
                pass,
                date: new Date().toISOString()
            }
            state.users = [...state.users, UserItem]
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                console.log('fetchUser extraReducers')
                // Add any fetched posts to the array
                // Use the `upsertMany` reducer as a mutating update utility
                // todosAdapter.upsertMany(state, action.payload);
            })
        // .addCase(addNewTodo.fulfilled, (state: any, action) => {
        //   const value = { ...action.payload }
        //   state.todos.push(value);
        //   state.currentTodo = value;
        // });
    },
    selectors: {
        selectAllUsers: (state) => {
            console.log('select all users')
            console.log(state)
        },
        selectUserById: (state: any, todoId) => {
            console.log('selectUserById')
            console.log(state, todoId)
            return null
            // return state.todos.find(todo => todo.id === todoId)
        }
    }
});
export const { userAdded } = userSlice.actions;
export default userSlice.reducer;
// Export the customized selectors for this adapter using `getSelectors`
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
    // Pass in a selector that returns the posts slice of state
} = userAdapter.getSelectors((state: RootState) => state.users);
