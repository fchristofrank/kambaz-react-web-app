import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentControls from "./AssignmentControls";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentCOntrolButtons from "./AssignmentControlButtons";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegPenToSquare } from "react-icons/fa6";

export default function Assignments() {
  return (
    <div >
      <AssignmentControls /><br /><br />
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-0.5 fs-3" /><IoMdArrowDropdown className="fs-4" /> <b>ASSIGNMENTS</b><IoEllipsisVertical className="fs-4 float-end mt-1" /><AiOutlinePlus className="float-end fs-5 mt-1 me-4" /><span className="float-end rounded-5 me-2 border p-1">40% of Total</span></div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-start">
              <BsGripVertical className="me-4 fs-3 mt-4" />
              <FaRegPenToSquare className="me-4 fs-3 mt-4 text-success" />
              <div>
                <a className="wd-assignment-link wd-disabled-link"
                  href="#/Kanbas/Courses/1234/Assignments/123">A1</a>
                <p><span className="wd-assignment-modules-text">Multiple Modules</span> <span className="wd-assignment-subtext">| <b>Not available until</b> May 13 at 12:00am | <br /> <b>Due</b> May 20 at 11:59pm | 100 pts</span></p>
              </div>
              <AssignmentCOntrolButtons />
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-start">
              <BsGripVertical className="me-4 fs-3 mt-4" />
              <FaRegPenToSquare className="me-4 fs-3 mt-4 text-success" />
              <div>
                <a className="wd-assignment-link wd-disabled-link"
                  href="#/Kanbas/Courses/1234/Assignments/123">A1</a>
                <p><span className="wd-assignment-modules-text">Multiple Modules</span> <span className="wd-assignment-subtext">| <b>Not available until</b> May 20 at 12:00am | <br /> <b>Due</b> June 10 at 11:59pm | 100 pts</span></p>
              </div>
              <AssignmentCOntrolButtons />
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-start">
              <BsGripVertical className="me-4 fs-3 mt-4" />
              <FaRegPenToSquare className="me-4 fs-3 mt-4 text-success" />
              <div>
                <a className="wd-assignment-link wd-disabled-link"
                  href="#/Kanbas/Courses/1234/Assignments/123">A1</a>
                <p><span className="wd-assignment-modules-text">Multiple Modules</span> <span className="wd-assignment-subtext">| <b>Not available until</b> June 10 at 12:00am | <br /> <b>Due</b> July 20 at 11:59pm | 100 pts</span></p>
              </div>
              <AssignmentCOntrolButtons />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
