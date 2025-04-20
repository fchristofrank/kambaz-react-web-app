import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    enrollments: [],
};
const accountSlice = createSlice({
    name: "enrollements",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },
        enroll: (state, { payload: enrollment }) => {
            const newEnrollment: any = {
                _id: new Date().getTime().toString(),
                user: enrollment.user,
                course: enrollment.course

            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },

        unenroll: (state, { payload: enrollmentID }) => {
            state.enrollments = state.enrollments.filter(
                (e: any) => e._id !== enrollmentID);
        }
    },
});
export const { setEnrollments, enroll, unenroll } = accountSlice.actions;
export default accountSlice.reducer;