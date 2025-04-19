import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsGripVertical } from "react-icons/bs";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as coursesClient from "../client";
import AssignmentCOntrolButtons from "./AssignmentControlButtons";
import AssignmentControls from "./AssignmentControls";
import * as assignmentsClient from "./client";
import { deleteAssignment, setAssignments } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
  return (
    <div id="wd-assignments" className="ms-5">
      <AssignmentControls /><br /><br />
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-0.5 fs-3" />
            <IoMdArrowDropdown className="fs-4" />
            <b>ASSIGNMENTS</b>
            <IoEllipsisVertical className="fs-4 float-end mt-1" />
            <AiOutlinePlus className="float-end fs-5 mt-1 me-4" />
            <span className="float-end rounded-5 me-2 border p-1">40% of Total</span>
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-start" key={assignment._id}>
                  <BsGripVertical className="fs-3 mt-4 me-3" />
                  <FaRegPenToSquare className="fs-3 mt-4 text-success me-3" />
                  <div className="wd-content-container flex-grow-1 mx-4">
                    <a className="wd-assignment-link wd-disabled-link"
                      href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}>
                      {assignment.title}
                    </a>
                    <p>
                      <span className="wd-assignment-modules-text">Multiple Modules</span>
                      <span className="wd-assignment-subtext"> |
                        <b> Not available until</b> {formatDate(assignment.availableAfterDate)} |
                        <br />
                        <b> Due</b> {formatDate(assignment.dueDate)} | {assignment.points} pts
                      </span>
                    </p>
                  </div>
                  <AssignmentCOntrolButtons assignmentID={assignment._id} deleteAssignment={(assignmentID) => removeAssignment(assignmentID)} />
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${month} ${day} at ${formattedHour}:${formattedMinutes} ${ampm}`;
}
