import { configureStore } from "@reduxjs/toolkit";
import reduxReducer from "./reduxSlice.js";

const store = configureStore({
    reducer: reduxReducer
});

export default store;