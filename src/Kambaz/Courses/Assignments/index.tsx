import { ListGroup, Button, InputGroup, FormControl } from "react-bootstrap";
import { BsSearch, BsGripVertical, BsPlus, BsFillCaretDownFill } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaFileAlt } from "react-icons/fa";
import "./Assignments.css";
import { FiCheckCircle } from "react-icons/fi";

export default function Assignments() {
    return (
        <div className="container mt-4">
            <div className="row mb-3 align-items-center">
                <div className="col-12 col-md-4 mb-2 mb-md-0">
                    <InputGroup className="me-2"><InputGroup.Text><BsSearch />
                    </InputGroup.Text><FormControl placeholder="Search" /></InputGroup>
                </div>

                <div className="col-12 col-md-8 d-flex justify-content-end">
                    <Button variant="secondary" className="me-2">+ Group</Button>
                    <Button variant="danger" className="me-2">+ Assignment</Button>
                    <BsPlus className="fs-4 me-2" /><IoEllipsisVertical className="fs-4" />
                </div></div>

            <div className="p-3" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="row justify-content-between align-items-center pb-2">
                    <div className="col-6 col-md-4 d-flex align-items-center">
                        <BsGripVertical className="me-3" />
                        <BsFillCaretDownFill className="me-2" />
                        <h4 className="fw-bold mb-0">ASSIGNMENTS</h4>
                    </div>

                    <div className="col-6 col-md-4 text-end">
                        <span className="customBackground rounded-pill me-2">40% of Total</span>
                        <BsPlus className="fs-4 me-2" />
                        <IoEllipsisVertical className="fs-4 ms-2" />
                    </div>
                </div>
            </div>
            <ListGroup className="mt-3">
                {[{
                    id: 1,
                    title: "A1 - ENV + HTML",
                    details: <span style={{ color: 'red' }}>Multiple Modules </span>,
                    detailsColor: "| Not available until May 6 at 12:00am",
                    due: "Due May 13 at 11:59pm | 100 pts"
                }, {
                    id: 2,
                    title: "A2 - CSS + BOOTSTRAP",
                    details: <span style={{ color: 'red' }}>Multiple Modules </span>,
                    detailsColor: "| Not available until May 13 at 12:00am",
                    due: "Due May 20 at 11:59pm | 100 pts"
                }, {
                    id: 3,
                    title: "A3 - JAVASCRIPT + REACT",
                    details: <span style={{ color: 'red' }}>Multiple Modules </span>,
                    detailsColor: "| Not available until May 20 at 12:00am",
                    due: "Due May 27 at 11:59pm | 100 pts"
                }].map((assignment) => (
                    <ListGroup.Item key={assignment.id} className="d-flex align-items-center">
                        <BsGripVertical className="me-3" />
                        <FaFileAlt className="me-3" style={{ color: 'green' }} />
                        <div className="flex-grow-1">
                            <a href="#" className="text-decoration-none fw-bold" style={{ color: "black" }}>{assignment.title}</a>
                            <br />
                            <div className="text-muted d-inline"><span className="d-inline">{assignment.details}</span> {assignment.detailsColor}</div>
                            <br />
                            <div className="text-muted d-inline">{assignment.due}</div>
                        </div>
                        <div className="ms-3">
                            <FaCheckCircle size={24} className="text-green-500" style={{ color: 'green' }}/>
                        </div>
                        <IoEllipsisVertical className="fs-4" />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}
