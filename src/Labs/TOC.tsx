import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router";
// import { Link } from "react-router";
export default function TOC() {
  const { pathname } = useLocation();
 return (
   <Nav variant="pills">
     <Nav.Item>
       <Nav.Link href="#/Labs">Labs</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link active={pathname.includes("Lab1")} href="#/Labs/Lab1">Lab 1</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link active={pathname.includes("Lab2")} href="#/Labs/Lab2">Lab 2</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link active={pathname.includes("Lab3")} href="#/Labs/Lab3">Lab 3</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link active={pathname.includes("Lab4")} href="#/Labs/Lab4">Lab 4</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link active={pathname.includes("Kambaz")} href="#/Kambaz">Kambaz</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link href="https://github.com/fchristofrank">My GitHub</Nav.Link>
     </Nav.Item>
   </Nav>
);}
