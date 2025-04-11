import { useEffect, useState } from "react";
import { BiSolidCommentDetail, BiSolidCommentEdit } from "react-icons/bi";
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
    <div className="comments-container container mt-4">
      <h2 className="comments-header mb-4">Add Your Comment</h2>
      
      {/* Comment Input Section */}
      <div className="comment-input-section mb-4 p-3 rounded shadow-sm bg-light">
      <ModulesControls 
        moduleName={moduleName} 
        addModule={createModuleForCourse} 
        setModuleName={setModuleName}
      />
      </div>

      {/* Comments List */}
      <div className="comments-list">
      {modules.map((module: any) => (
        <div 
      key={module._id} 
      className="comment-card card mb-3 shadow-sm border-0"
      style={{
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
      }}
        >
      <div className="card-body">
        <div className="comment-header d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title mb-0" style={{ flex: 1 }}>
        {!module.editing ? (
          <span className="text-truncate" style={{ display: "inline-block", maxWidth: "90%" }}>
            {module.name.split(' ').slice(0, 5).join(' ')}
          </span>
        ) : (
          <input
            className="form-control"
            style={{ width: "100%" }}
            onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
            onKeyDown={(e) => {
          if (e.key === "Enter") {
            saveModule({ ...module, editing: false });
          }
            }}
            defaultValue={module.name}
          />
        )}
          </h5>
          <button
        className="btn btn-sm btn-outline-danger ms-2"
        onClick={() => removeModule(module._id)}
        style={{
          transition: "background-color 0.2s ease, color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#dc3545";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#dc3545";
        }}
          >
        Delete
          </button>
        </div>
        <div className="d-flex align-items-center">
          <BiSolidCommentEdit className="text-primary me-2" size={24} />
          <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => dispatch(editModule(module._id))}
        style={{
          transition: "background-color 0.2s ease, color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#0d6efd";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#0d6efd";
        }}
          >
        {module.editing ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      {/* Comment Content */}
      <p className="card-text text-muted px-3">
        {module.name}
      </p>

      {/* Replies Section */}
      {module.lessons && module.lessons.length > 0 && (
        <div className="replies-section mt-3 px-3">
        <h6 className="text-muted mb-3">Replies</h6>
        {module.lessons.map((lesson: any) => (
        <div 
        key={lesson._id} 
        className="reply-item d-flex align-items-start mb-2 ps-4"
        style={{
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(5px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0)";
        }}
        >
        <BiSolidCommentDetail className="text-secondary me-2" size={20} />
        <div>{lesson.name}</div>
        </div>
        ))}
        </div>
      )}
        </div>
      ))}
      </div>
    </div>
  );
}
