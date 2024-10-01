import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
export default function AssignmentControls() {
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <button id="wd-add-module-btn" className="btn btn-danger float-end">
                <FaPlus className="me1" style={{ bottom: "1px" }} />
                Assignment</button>
            <button id="wd-add-module-btn" className="btn btn-outline-secondary me-1 float-end">
                <FaPlus className="me1" style={{ bottom: "1px" }} />
                Group</button>
            <div className="input-group me-1 float-right" style={{ maxWidth: "275px" }}>
                <span className="input-group-text bg-white border-end-0">
                    <CiSearch />
                </span>
                <input
                    type="search"
                    placeholder="Search..."
                    className="form-control border-start-0"
                    style={{ paddingLeft: "5px" }}
                />
            </div>
        </div>
    );
}
