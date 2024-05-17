import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { Todo } from "./Todo";
import { RootState } from "../../common/store";
import produce from 'immer';
const todosAdapter = createEntityAdapter<Todo>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});
const initialState = todosAdapter.getInitialState({
  status: "idle",
  error: null,
  view: "add",     // edit
  currentTodo: null
});
export const fetchTodos: any = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { getState }) => {
    const allTodos: any = (getState() as RootState).todos;
    // const response = await axios.get(API_URL + "/posts");
    // return response.data;
    return allTodos;
  }
);
export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (initialTodo: any, api) => {
    console.log('addNewTodo thunk')
    debugger;
    const { title, completed } = initialTodo;
    let todoItem: Todo = {
      id: nanoid(),
      title,
      completed,
      date: new Date().toISOString()
    }
    return todoItem;
  }
);
const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    todoAdded: {
      reducer(state, action: PayloadAction<Todo>) {
        console.log('todoAdded reducer')
        return produce(state, (draftState: { todos: Todo[] }) => {
          draftState.todos.push(action.payload);
        });
      },
      prepare(title, completed) {
        console.log('todoAdded prepare')
        return {
          payload: {
            id: nanoid(),
            title,
            completed,
            date: new Date().toISOString()
          },
        };
      },
    },
    todoUpdated(state, action) {
      console.log('todoUpdated reducer')
      debugger;
      const { id, title, completed } = action.payload;
      const existingTodo = state.entities[id];
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.completed = completed;
      }
      // reset state.todos.currentTodo to null
      state.currentTodo = null;
      // change view to add
      state.view = 'add';
    },
    deleteTodo(state, action) {
      console.log('deleteTodo reducer')
      debugger;
      const { id, title, completed } = action.payload;
      const existingTodo = state.entities[id];
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.completed = completed;
      }
    },
    completeTodo(state, action) {
      console.log('completeTodo reducer')
      const id = action.payload;
      const existingTodo = state.entities[id];
      if (existingTodo) {
        existingTodo.completed = !existingTodo.completed;
      }
    },
    changeView(state, action) {
      console.log('changeView reducer')
      debugger;
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
      .addCase(addNewTodo.fulfilled, todosAdapter.addOne);
  },
  selectors: {
    selectAllTodos: (state) => {
      console.log('select all todos')
      console.log(state)
    },
    selectTodoById: (state, todoId) => {
      console.log('selectTodoById')
      console.log(state, todoId)
      // state["todos"].filter(todo => todo.id === todoId)[0]
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

