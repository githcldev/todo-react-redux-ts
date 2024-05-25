import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { Todo } from "./Todo";
import { RootState } from "../../common/store";
import produce from 'immer';
const todosAdapter = createEntityAdapter<Todo>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});
interface InitState {
  status: string;
  error: null | string;
  view: string;
  currentTodo: null | Todo;
  todos: Todo[]
}
let initState: InitState = {
  status: "idle",
  error: null,
  view: "add",     // edit
  currentTodo: null,
  todos: []
}
const initialState = todosAdapter.getInitialState(initState);
export const fetchTodos: any = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { getState }) => {
    const allTodos: any = (getState() as RootState).todos;
    // const response = await axios.get(API_URL + "/posts");
    // return response.data;
    return allTodos;
  }
);
const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    todoAdded(state, action) {
      console.log('todoAdded reducer')
      const { title, completed } = action.payload;
      let todoItem: Todo = {
        id: nanoid(),
        title,
        completed,
        date: new Date().toISOString()
      }
      state.todos = [...state.todos, todoItem]
    },
    todoUpdated(state, action) {
      console.log('todoUpdated reducer')
      const { id, title, completed } = action.payload;
      const existingTodo = state.todos.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.completed = completed;
      }
      state.currentTodo = null;
      state.view = 'add';
    },
    deleteTodo(state, action) {
      console.log('deleteTodo reducer')
      const todo = action.payload;
      state.todos.splice(action.payload, 1);
      // delete todos[todoId]
      // debugger;
    },
    completeTodo(state, action) {
      console.log('completeTodo reducer')
      const id = action.payload;
      const existingTodo = state.todos.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.completed = !existingTodo.completed;
      }
    },
    changeView(state, action) {
      console.log('changeView reducer')
      const { view, value } = action.payload;
      state.view = view;
      if (value) {
        state.currentTodo = value
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        console.log('fetchTodos extraReducers')
        state.status = "succeeded";
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
    selectAllTodos: (state) => {
      console.log('select all todos')
      console.log(state)
    },
    selectTodoById: (state: any, todoId) => {
      console.log('selectTodoById')
      console.log(state, todoId)
      return null
      // return state.todos.find(todo => todo.id === todoId)
    },
    selectTodoIds: (state) => {
      console.log('selectTodoIds');
      console.log(state)
      // state.todos.map(todo => todo.id)
    }
  }
});
export const { todoAdded, todoUpdated, deleteTodo,
  changeView, completeTodo } = todosSlice.actions;
export default todosSlice.reducer;
// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds
  // Pass in a selector that returns the posts slice of state
} = todosAdapter.getSelectors((state: RootState) => state.todos)

