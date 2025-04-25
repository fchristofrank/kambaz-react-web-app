import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { addAssignment, updateAssignment } from "./reducer";

export default function Editor() {
    const { cid, aid } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [assignment, setAssignment] = useState(() => {
        const existingAssignment = assignments.find((assignment: any) => assignment._id === aid);
        return existingAssignment ? { ...existingAssignment } : { course: cid, title: '', description: '', points: '', dueDate: '', availableAfterDate: '', availableUntilDate: '' };
    });
    const dispatch = useDispatch();
    const handleEdit = () => {
        navigate(-1);
    };
    const handleSave = async () => {
        if (assignment._id) {
            await assignmentsClient.updateAssignment(assignment);
            dispatch(updateAssignment(assignment));
        } else {
            if (cid) {
                await coursesClient.createAssignmentForCourse(cid, assignment);
            }
            dispatch(addAssignment(assignment));
        }
        handleEdit();
    };
    const handleCancel = () => {
        handleEdit();
    }



    const formatDateTime = (dateString: string | undefined | null): string => {
        if (!dateString) return '';
        const date = new Date(dateString);

        // Format date as YYYY-MM-DDTHH:mm
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <div id="wd-assignments-editor" className="ms-5 mt-3">
            <div className="row mb-3">
                <div className="col-sm-12">
                    <label htmlFor="wd-name"><b>Assignment Name</b></label>
                    <input id="wd-name" className="form-control mt-2" value={assignment.title}
                        onChange={(e) => { setAssignment({ ...assignment, title: e.target.value }) }}
                        disabled={!isFaculty} />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12">
                    <div id="wd-description-container" className="wd-assignment-editor-desc-container">
                        <textarea id="wd-description" className="form-control mt-2" cols={50} rows={15}
                            onChange={(e) => { setAssignment({ ...assignment, description: e.target.value }) }}
                            disabled={!isFaculty}>
                            {assignment.description}
                        </textarea>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-5">
                    <label htmlFor="wd-points" className="col-form-label float-end" >Points</label>
                </div>
                <div className="col-sm-7">
                    <input id="wd-points" className="form-control" placeholder="100"
                        onChange={(e) => { setAssignment({ ...assignment, points: e.target.value }) }}
                        disabled={!isFaculty} />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-5">
                    <label htmlFor="wd-group" className="col-form-label float-end">Assignment Group</label>
                </div>
                <div className="col-sm-7">
                    <select id="wd-group" className="form-select" disabled={!isFaculty}>
                        <option value="VAL1" selected>Assignments</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-5">
                    <label htmlFor="wd-display-grade-as" className="col-form-label float-end">Display Grade as</label>
                </div>
                <div className="col-sm-7">
                    <select id="wd-display-grade-as" className="form-select" disabled={!isFaculty}>
                        <option value="VAL1" selected>Percentage</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-5">
                    <label htmlFor="wd-submission-type" className="col-form-label float-end">Submission Type</label>
                </div>
                <div className="col-md-7">
                    <fieldset className="border p-2">
                        <div>
                            <select id="wd-submission-type" className="form-select" disabled={!isFaculty}>
                                <option value="VAL1" selected>Online</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <span><b>Online Entry Options</b></span><br />
                            <br />
                            <input id="wd-text-entry" type="checkbox" disabled={!isFaculty} />
                            <label htmlFor="wd-text-entry" className="ms-1">Text Entry</label><br />
                            <br />
                            <input id="wd-website-url" type="checkbox" disabled={!isFaculty} />
                            <label htmlFor="wd-website-url" className="ms-1">Website URL</label><br />
                            <br />
                            <input id="wd-media-recordings" type="checkbox" disabled={!isFaculty} />
                            <label htmlFor="wd-media-recordings" className="ms-1">Media Recordings</label><br />
                            <br />
                            <input id="wd-student-annotation" type="checkbox" disabled={!isFaculty} />
                            <label htmlFor="wd-student-annotation" className="ms-1">Student Annotation</label><br />
                            <br />
                            <input id="wd-file-upload" type="checkbox" disabled={!isFaculty} />
                            <label htmlFor="wd-file-upload" className="ms-1">File Uploads</label>
                        </div>
                    </fieldset>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-5">
                    <label htmlFor="wd-assign-to" className="col-form-label float-end">Assign</label>
                </div>
                <div className="col-sm-7">
                    <fieldset className="border p-2">
                        <div className="wd-assign-to-input-wrapper">
                            <div className="wd-assign-to-input-content">Everyone <IoCloseOutline /></div>
                            <label htmlFor="wd-assign-to" className="col-form-label"><b>Assign to</b></label>
                            <input id="wd-assign-to" className="form-control" placeholder="" disabled={!isFaculty} />
                        </div>
                        <label htmlFor="wd-due-date" className="col-form-label">Due</label>
                        <input id="wd-due-date" className="form-control" type="datetime-local"
                            value={formatDateTime(assignment.dueDate)}
                            onChange={(e) => { setAssignment({ ...assignment, dueDate: e.target.value }) }}
                            disabled={!isFaculty} />
                        <div className="d-flex">
                            <div className="me-2">
                                <label htmlFor="wd-available-from" className="col-form-label"><b>Available from</b></label>
                                <input id="wd-available-from" className="form-control" type="datetime-local" style={{ width: '155px' }}
                                    value={formatDateTime(assignment.availableAfterDate)}
                                    onChange={(e) => { setAssignment({ ...assignment, availableAfterDate: e.target.value }) }}
                                    disabled={!isFaculty} />
                            </div>
                            <div className="float-end">
                                <label htmlFor="wd-available-until" className="col-form-label"><b>Until</b></label>
                                <input id="wd-available-until" className="form-control" type="datetime-local" style={{ width: '155px' }}
                                    value={formatDateTime(assignment.availableUntilDate)}
                                    onChange={(e) => { setAssignment({ ...assignment, availableUntilDate: e.target.value }) }}
                                    disabled={!isFaculty} />
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            <hr />
            {isFaculty &&
                <div className="row mt-4">
                    <div className="col-12 d-flex justify-content-end">
                        <button id="wd-cancel" className="btn btn-secondary me-1" onClick={() => { handleCancel() }}>Cancel</button>
                        <button id="wd-save" className="btn btn-primary btn-danger" onClick={() => { handleSave() }}>Save</button>
                    </div>
                </div>
            }
        </div>
    );
}
