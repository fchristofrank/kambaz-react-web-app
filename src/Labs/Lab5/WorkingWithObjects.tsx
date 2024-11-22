import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: 1, name: "NodeJS Module",
        description: "Learn how to create a NodeJS server with ExpressJS",
        course: "Rocket Propulsion"
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`
    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a><hr />
            <a id="wd-retrieve-module" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a><hr />
            <h4>Retrieving Assignment Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Assignment Title
            </a><hr />
            <h4>Retrieving Module Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Module Name
            </a><hr />
            <h4>Modifying Assignment Properties</h4>
            <a id="wd-update-assignment-title"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input className="form-control w-75" id="wd-assignment-title"
                defaultValue={assignment.title} onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })} />

            <a id="wd-update-assignment-score"
                className="btn btn-primary float-end mt-3"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <input type="number" className="form-control w-75 mt-3" id="wd-assignment-score"
                defaultValue={assignment.score} onChange={(e) =>
                    setAssignment({ ...assignment, score: Number(e.target.value) })} />

            <a id="wd-update-assignment-completed-status"
                className="btn btn-primary float-end mt-3 mb-3"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                Update Completed Status
            </a>
            <input type="checkbox" className="mt-3 ms-3 mb-3" id="wd-assignment-completed-status"
                defaultChecked={assignment.completed} onChange={(e) =>
                    setAssignment({ ...assignment, completed: Boolean(e.target.value) })} />
            <hr />


            <h4>Modifying Module Properties</h4>
            <a id="wd-update-module-name"
                className="btn btn-primary float-end"
                href={`${MODULE_API_URL}/name/${module.name}`}>
                Update Name
            </a>
            <input className="form-control w-75" id="wd-module-name"
                defaultValue={module.name} onChange={(e) =>
                    setModule({ ...module, name: e.target.value })} />
            <a id="wd-update-module-description"
                className="btn btn-primary float-end mt-3"
                href={`${MODULE_API_URL}/description/${module.description}`}>
                Update Description
            </a>
            <input className="form-control w-75 mt-3" id="wd-module-name"
                defaultValue={module.description} onChange={(e) =>
                    setModule({ ...module, description: e.target.value })} />
            <hr />

        </div>
    );
}
