import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { AiOutlinePlus } from "react-icons/ai";
export default function ModuleControlButtons() {
  return (
    <div id="wd-module-control-buttons" className="float-end">
      <GreenCheckmark />
      <AiOutlinePlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
