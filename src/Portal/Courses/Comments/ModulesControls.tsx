import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ModuleEditor from "./ModuleEditor";
export default function ModulesControls(
    { moduleName, setModuleName, addModule }:
        { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    console.log("ModulesControls", currentUser);
    return (
        <div id="wd-modules-controls" className="d-flex justify-content-end align-items-end mt-4 ms-5">

            <button id="wd-add-module-btn" className="btn btn-md btn-danger me-1 flex-shrink-0" style={{ whiteSpace: "nowrap" }} data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog">
                <FaPlus className="position-relative" style={{ bottom: "1px" }} />
                Add your Comments</button>
            <ModuleEditor dialogTitle="Add Module" moduleName={moduleName}
                setModuleName={setModuleName} addModule={addModule} />
        </div>
    );
}
