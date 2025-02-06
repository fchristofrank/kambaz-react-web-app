import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div id="wd-modules-controls" className="d-flex justify-content-end align-items-end mt-4 ms-5">
            <button id="wd-collapse-all" className="btn btn-md btn-secondary me-1 flex-shrink-0" style={{ whiteSpace: "nowrap" }}>
                Collapse All
            </button>
            <button id="wd-view-progress" className="btn btn-md btn-secondary me-1 flex-shrink-0" style={{ whiteSpace: "nowrap" }}>
                View Progress
            </button>
            <div className="dropdown d-inline me-1">
                <button
                    id="wd-publish-all-btn"
                    className="btn btn-md btn-secondary dropdown-toggle flex-shrink-0"
                    style={{ whiteSpace: "nowrap" }}
                    type="button"
                    onClick={toggleDropdown}
                >
                    <GreenCheckmark />
                    Publish All
                </button>
                <ul
                    className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                    aria-labelledby="wd-publish-all-btn"
                >
                    <li>
                        <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item">
                            <GreenCheckmark />
                            Publish all modules and items
                        </a>
                    </li>
                    <li>
                        <a id="wd-publish-modules-only-button" className="dropdown-item">
                            <GreenCheckmark />
                            Publish modules only
                        </a>
                    </li>
                    <li>
                        <a id="wd-unpublish-all-modules-and-item" className="dropdown-item">
                            <GreenCheckmark />
                            Unpublish all modules and items
                        </a>
                    </li>
                    <li>
                        <a id="wd-unpublish-modules-only" className="dropdown-item">
                            <GreenCheckmark />
                            Unpublish modules only
                        </a>
                    </li>
                </ul>
            </div>
            <button id="wd-add-module-btn" className="btn btn-md btn-danger me-1 flex-shrink-0" style={{ whiteSpace: "nowrap" }}>
                <FaPlus className="position-relative" style={{ bottom: "1px" }} />
                Module
            </button>
        </div>
    );
}
