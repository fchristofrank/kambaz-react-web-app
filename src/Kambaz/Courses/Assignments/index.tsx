import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegPenToSquare } from "react-icons/fa6";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
    return (
        <div id="wd-assignments" className="ms-5">
            <AssignmentControls />
            <br />
            <br />
            <ul id="wd-assignment-list" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary d-flex flex-wrap align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <IoMdArrowDropdown className="fs-4 me-2" /> <b>ASSIGNMENTS</b>
                        <span className="ms-auto d-flex align-items-center">
                            <span style={{ paddingLeft: "15px", paddingRight: "15px" }} className="rounded-5 me-2 border">
                                40% of Total
                            </span>
                            <AiOutlinePlus className="fs-5 me-4" />
                            <IoEllipsisVertical className="fs-4" />
                        </span>
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        {[
                            {
                                id: "123",
                                title: "A1",
                                notAvailableUntil: "May 13 at 12:00am",
                                due: "May 20 at 11:59pm",
                                points: 100,
                            },
                            {
                                id: "124",
                                title: "A2",
                                notAvailableUntil: "May 20 at 12:00am",
                                due: "June 10 at 11:59pm",
                                points: 100,
                            },
                            {
                                id: "125",
                                title: "A3",
                                notAvailableUntil: "June 10 at 12:00am",
                                due: "July 20 at 11:59pm",
                                points: 100,
                            },
                        ].map((assignment) => (
                            <li key={assignment.id} className="wd-lesson list-group-item p-3 ps-1 d-flex flex-column flex-md-row justify-content-between align-items-start">
                                <div className="d-flex align-items-center mb-2 mb-md-0">
                                    <BsGripVertical className="fs-3 me-2" />
                                    <FaRegPenToSquare className="fs-3 text-success me-2" />
                                    <div>
                                        <a className="wd-assignment-link wd-disabled-link" href={`#/kambaz/Courses/1234/Assignments/${assignment.id}`}>
                                            {assignment.title}
                                        </a>
                                        <p className="mb-0">
                                            <span style= {{color: "red" }} className="wd-assignment-modules-text">Multiple Modules</span>{" "}
                                            <span className="wd-assignment-subtext">
                                                | <b>Not available until</b> {assignment.notAvailableUntil} | <br /> <b>Due</b> {assignment.due} | {assignment.points} pts
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <AssignmentControlButtons />
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}
