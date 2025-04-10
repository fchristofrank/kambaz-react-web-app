import { configureStore } from "@reduxjs/toolkit";
import enrollmentsReducer from "./Account/Enrollments/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import modulesReducer from "./Courses/Comments/reducer";
import coursesReducer from "./Courses/reducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    coursesReducer
  },
});
export default store;