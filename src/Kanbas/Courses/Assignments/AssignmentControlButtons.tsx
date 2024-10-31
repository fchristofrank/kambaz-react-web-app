import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import DeleteDialog from "./DeleteDialog";
export default function AssignmentCOntrolButtons({assignmentID, deleteAssignment} : {assignmentID: String, deleteAssignment: (assignmentID: String) => void;}) {
  return (
    <div id="wd-assignment-control-buttons" className="float-end mt-4 ms-2">
      <FaTrash className="text-danger mt-1 me-4 mb-1" data-bs-toggle="modal" data-bs-target="#wd-delete-module-dialog"/>
      <DeleteDialog assignmentID={assignmentID} deleteAssignment={deleteAssignment}/>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
