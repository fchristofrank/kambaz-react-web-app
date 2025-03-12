import { configureStore } from "@reduxjs/toolkit";
import enrollmentsReducer from "./Account/Enrollments/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import modulesReducer from "./Courses/Modules/reducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer
  },
});
export default store;