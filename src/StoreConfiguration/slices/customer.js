import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    count: 0,
    EntryListArray_Redux: [],
    header_slug: "news"

};


export const customerSlice = createSlice({
    name: "cusromer",
    initialState,
    reducers: {
        addCount: (state, action) => {
            state.count = action.payload;
        },
        EntryList_Redux_function: (state, action) => {
            state.EntryListArray_Redux = action.payload;
        },
        header_slug_Reduc_function: (state, action) => {
            state.header_slug = action.payload;
        }

    },
});


export const { addCount, EntryList_Redux_function, header_slug_Reduc_function } = customerSlice.actions;

export default customerSlice.reducer;
