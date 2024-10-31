import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../../Database";
const initialState = {
    enrollments: enrollments,
};
const accountSlice = createSlice({
    name: "enrollements",
    initialState,
    reducers: {
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
export const { enroll, unenroll } = accountSlice.actions;
export default accountSlice.reducer;