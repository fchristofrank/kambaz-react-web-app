import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addModule, updateModule, deleteModule, editModule } from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch  = useDispatch();

  return (
    <div id="wd-kanbas-modules" >
      <ModulesControls moduleName={moduleName} addModule={() => { dispatch(addModule({ name: moduleName, course: cid })); setModuleName("") }} setModuleName={setModuleName} />
      <div>
        <ul id="wd-modules" className="list-group rounded-0 mt-5 ms-5">
          {modules
            .filter((module: any) => module.course === cid)
            .map((module: any) => (
              <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" />       {!module.editing && module.name}
                  {module.editing && (
                    <input className="form-control w-50 d-inline-block"
                      onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name} />
                  )} <ModuleControlButtons moduleId={module._id}
                    deleteModule={(moduleId) => {
                      dispatch(deleteModule(moduleId));
                    }}
                    editModule={(moduleId) => dispatch(editModule(moduleId))} />
                </div>
                {module.lessons && (
                  <ul className="wd-lessons list-group rounded-0">
                    {module.lessons.map((lesson: any) => (
                      <li className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </div></div>
  );
}
