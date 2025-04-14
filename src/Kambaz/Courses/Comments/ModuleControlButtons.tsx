import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import GreenCheckmark from "./GreenCheckmark";
export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: { moduleId: string; deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void; } ) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';
  return (

    <div id="wd-module-control-buttons" className="float-end">
      {isFaculty && <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />}
      {isFaculty && <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>}
      <GreenCheckmark />
      <AiOutlinePlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
