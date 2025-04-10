import { useEffect, useState } from "react";
import { BsGripVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import ModulesControls from "./ModulesControls";
import { addModule, deleteModule, editModule, setModules, updateModule } from "./reducer";

export default function Comments() {
  
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };
  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };
  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div id="wd-kambaz-modules">
      <ModulesControls moduleName={moduleName} addModule={createModuleForCourse} setModuleName={setModuleName} />
      <div>
        <ul id="wd-modules" className="list-group rounded-0 mt-5 ms-5">
          {modules.map((module: any) => (
            <li
              className="wd-module list-group-item p-3 mb-4 border rounded shadow-sm"
              style={{ borderColor: "#ddd", backgroundColor: "#f9f9f9" }}
            >
              <div className="wd-title d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <BsGripVertical className="me-2 fs-3 text-muted" />
                  {!module.editing && (
                    <span
                      className="module-name"
                      style={{
                        flexGrow: 1,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {module.name}
                    </span>
                  )}
                  {module.editing && (
                    <input
                      className="form-control w-50 d-inline-block"
                      onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveModule({ ...module, editing: false });
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-link text-primary p-0"
                    onClick={() => dispatch(editModule(module._id))}
                  >
                    Reply
                  </button>
                </div>
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0 mt-3">
                  {module.lessons.map((lesson: any) => (
                    <li
                      className="wd-lesson list-group-item p-3 ps-1 border rounded shadow-sm"
                      style={{ borderColor: "#ddd", backgroundColor: "#fff" }}
                    >
                      <BsGripVertical className="me-2 fs-3 text-muted" /> {lesson.name}{" "}
                      <button className="btn btn-link text-primary p-0">Reply</button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
