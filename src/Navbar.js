import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap-icons/font/bootstrap-icons.css";
import './Navbar.css';
import { Link } from 'react-router-dom';

function MyNavbar(){
    return (
        <Navbar className="nav-bar" sticky="top" style={{ background: "rgb(200, 16, 46)" }}>
            <Nav className="px-3" style={{ fontSize: "2em"}}>
                <Nav.Item>
                    <Nav.Link className="nav-link" as={Link} to="/" style={{ color: "white", float: "left"}}>
                        <i className="bi bi-house-fill"></i>
                    </Nav.Link>

                    <Nav.Link className="nav-link" as={Link} to="/about" style={{ color: "white", float: "left"}}>
                        <span> About </span>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
}

export default MyNavbar