import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    courses: [],
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        initializeCourses: (state, action) => {
            state.courses = action.payload;
        },
        addCourse: (state, { payload: course }) => {
            const newCourse: any = {
                _id: new Date().getTime().toString(),
                name: course.name,
                number: course.number,
                startDate: course.startDate,
                endDate: course.endDate,
                department: course.department,
                credits: course.credits,
                imgSource: course.imgSource,
                description: course.description
            };
            state.courses = [...state.courses, newCourse] as any;
        },
        deleteCourse: (state, { payload: courseID }) => {
            state.courses = state.courses.filter(
                (course: any) => course._id !== courseID
            );
        },
        updateCourse: (state, { payload: course }) => {
            state.courses = state.courses.map((c: any) =>
                c._id === course._id ? course : c
            ) as any;
        }
    },
});

export const { initializeCourses, addCourse, deleteCourse, updateCourse } =
    coursesSlice.actions;

export default coursesSlice.reducer;