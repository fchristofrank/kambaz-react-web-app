import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentControls from "./AssignmentControls";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentCOntrolButtons from "./AssignmentControlButtons";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegPenToSquare } from "react-icons/fa6";
import * as db from "../../Database";
import { useParams } from "react-router";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div id="wd-assignments" className="ms-5 me-5">
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
                  <BsGripVertical className="fs-3 mt-4" />
                  <FaRegPenToSquare className="fs-3 mt-4 text-success" />
                  <div>
                    <a className="wd-assignment-link wd-disabled-link"
                      href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}>
                      {assignment.title}
                    </a>
                    <p className="wd-assignment-subtext" style={{ "color": "grey" }}>
                      <span className="wd-assignment-modules-text" style={{ "color": "red" }}>Multiple Modules</span>
                      <span className="wd-assignment-subtext"> |
                        <b> Not available until</b> {formatDate(assignment.availableAfterDate)} |
                        <br />
                        <b> Due</b> {formatDate(assignment.dueDate)} | {assignment.points} pts
                      </span>
                    </p>
                  </div>
                  <AssignmentCOntrolButtons />
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
