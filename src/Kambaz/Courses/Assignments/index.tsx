import { ListGroup, Button, InputGroup, FormControl } from "react-bootstrap";
import { BsSearch, BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";

export default function Assignments() {
    return (
        <div className="container mt-4">
            <div className="row mb-3 align-items-center"><div className="col-12 col-md-4 mb-2 mb-md-0"><InputGroup className="me-2"><InputGroup.Text><BsSearch /></InputGroup.Text><FormControl placeholder="Search" /></InputGroup></div><div className="col-12 col-md-8 d-flex justify-content-end"><Button variant="secondary" className="me-2">+ Group</Button><Button variant="danger" className="me-2">+ Assignment</Button><BsPlus className="fs-4 me-2" /><IoEllipsisVertical className="fs-4" /></div></div><div className="row justify-content-between align-items-center border-bottom pb-2"><div className="col-6 col-md-4"><h4 className="fw-bold text-secondary">ASSIGNMENTS</h4></div><div className="col-6 col-md-4 text-end"><span className="badge bg-secondary rounded-pill">40% of Total</span></div></div>
            <ListGroup className="mt-3">
                {[{
                    id: 1,
                    title: "A1 - ENV + HTML",
                    details: "Multiple Modules | Not available until May 6 at 12:00am",
                    due: "Due May 13 at 11:59pm | 100 pts"
                }, {
                    id: 2,
                    title: "A2 - CSS + BOOTSTRAP",
                    details: "Multiple Modules | Not available until May 13 at 12:00am",
                    due: "Due May 20 at 11:59pm | 100 pts"
                }, {
                    id: 3,
                    title: "A3 - JAVASCRIPT + REACT",
                    details: "Multiple Modules | Not available until May 20 at 12:00am",
                    due: "Due May 27 at 11:59pm | 100 pts"
                }].map((assignment) => (
                    <ListGroup.Item key={assignment.id} className="d-flex align-items-center">
                        <BsGripVertical className="me-3" />
                        <FaFileAlt className="me-3" />
                        <div className="flex-grow-1">
                            <a href="#" className="text-decoration-none fw-bold">{assignment.title}</a>
                            <div className="text-muted">{assignment.details}</div>
                            <div className="text-muted">{assignment.due}</div>
                        </div>
                        <IoEllipsisVertical className="fs-4" />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}
