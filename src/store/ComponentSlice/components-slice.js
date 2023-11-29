import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const componentsSlice = createSlice({
  name: "@@COMPONENTS",
  initialState: {
   modalVisibility: false,
   todoInfoVisibility: false,
   subTodoVisibility: false
  },
  reducers: {
    setModalVisibility: (state, {payload}) =>{
      state.modalVisibility =  payload
    },
    setTodoInfoVisibility: (state, {payload}) =>{ 
        state.todoInfoVisibility = payload
    },
    setSubTodoModalVisibility: (state, {payload}) =>{
      state.subTodoVisibility = payload
    }
  }
});
export const {setSubTodoModalVisibility, setTodoInfoVisibility, setModalVisibility} = componentsSlice.actions;
export const componentsReducer = componentsSlice.reducer;
