import { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithArrays() {
    const API = `${REMOTE_SERVER}/lab5/todos`;
    const [todo, setTodo] = useState({
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
                Get Todos
            </a>
            <hr />
            <h4>Retrieving an Item from an Array by ID</h4>
            <div className="d-flex align-items-center mb-3">
                <input
                    id="wd-todo-id"
                    defaultValue={todo.id}
                    className="form-control w-50 me-2"
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                />
                <a
                    id="wd-retrieve-todo-by-id"
                    className="btn btn-primary ms-auto"
                    href={`${API}/${todo.id}`}
                >
                    Get Todo by ID
                </a>
            </div>
            <hr />

            <h3>Filtering Array Items</h3>
            <a
                id="wd-retrieve-completed-todos"
                className="btn btn-primary"
                href={`${API}?completed=true`}
            >
                Get Completed Todos
            </a>
            <hr />
            <h3>Creating new Items in an Array</h3>
            <a
                id="wd-create-todo"
                className="btn btn-primary"
                href={`${API}/create`}
            >
                Create Todo
            </a>
            <hr />

            <h3>Deleting from an Array</h3>
            <div className="d-flex align-items-center mb-3">
                <input
                    defaultValue={todo.id}
                    className="form-control w-50 me-2"
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                />
                <a
                    id="wd-delete-todo"
                    className="btn btn-primary ms-auto"
                    href={`${API}/${todo.id}/delete`}
                >
                    Delete Todo with ID = {todo.id}
                </a>
            </div>
            <hr />

            <h3>Updating an Item in an Array</h3>

            {/* Update Title Row */}
            <div className="d-flex align-items-center mb-3">
                <input
                    defaultValue={todo.id}
                    className="form-control w-25 me-2"
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                />
                <input
                    defaultValue={todo.title}
                    className="form-control w-50 me-2"
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                />
                <a
                    href={`${API}/${todo.id}/title/${todo.title}`}
                    className="btn btn-primary ms-auto"
                >
                    Update Todo
                </a>
            </div>

            {/* Update Description Row */}
            <div className="d-flex align-items-center mb-3">
                <input
                    defaultValue={todo.id}
                    className="form-control w-25 me-2"
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                />
                <input
                    defaultValue={todo.description}
                    className="form-control w-50 me-2"
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                />
                <a
                    href={`${API}/${todo.id}/description/${todo.description}`}
                    className="btn btn-primary ms-auto"
                >
                    Update Todo
                </a>
            </div>

            {/* Update Completion Status Row */}
            <div className="d-flex align-items-center mb-3">
                <input
                    defaultValue={todo.id}
                    className="form-control w-25 me-10"
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                />
                <div className="form-check me-2">
                    <input
                        type="checkbox"
                        defaultChecked={todo.completed}
                        className="form-check-input ms-1"
                        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
                    />
                    <label className="form-check-label">Completed</label>
                </div>
                <a
                    href={`${API}/${todo.id}/completed/${todo.completed}`}
                    className="btn btn-primary ms-auto"
                >
                    Update Todo
                </a>
            </div>
            <br />
            <hr />
        </div>
    );
}
