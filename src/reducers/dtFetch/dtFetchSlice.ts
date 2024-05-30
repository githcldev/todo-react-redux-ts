import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "../../common/store";
export interface DtFetch {
    id: string;
    inProgress: boolean;
    data: object;
}
const dtFetchAdapter = createEntityAdapter<DtFetch>({
});
let initState = {
    data: {},
    isProgress: false
}
const initialState = dtFetchAdapter.getInitialState(initState);
export const fetchDt: any = createAsyncThunk(
    "dt/fetchDt",
    async (_, { getState }) => {
        const data: any = (getState() as RootState).data;
        // const response = await axios.get(API_URL + "/posts");
        // return response.data;
        return data;
    }
);
const dtSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        addDt(state, action) {
            console.log('userToggle reducer')
            const { data } = action.payload;
            state.data = data;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDt.fulfilled, (state, action) => {
                console.log('fetchDt extraReducers')
                //   state.status = "succeeded";
                // Add any fetched posts to the array
                // Use the `upsertMany` reducer as a mutating update utility
                // todosAdapter.upsertMany(state, action.payload);
            })
    }
});
export const { addDt } = dtSlice.actions;
export default dtSlice.reducer;
