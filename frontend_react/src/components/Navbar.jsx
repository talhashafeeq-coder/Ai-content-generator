import {Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import Swal from 'sweetalert2';

function Navbar_component() {
   const handleLogout = () => {
     Swal.fire({
       title: 'Are you sure?',
       text: "You will be logged out and redirected to the login page.",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, logout!',
       cancelButtonText: 'Cancel'
     }).then((result) => {
       if (result.isConfirmed) {
         localStorage.removeItem("token");
         window.location.href = "/login";
       } else {
         console.log("Logout cancelled.");
       }
     });
   };  // Logout function
   
  return (
    <Navbar expand="lg" className="">
  <div className="container">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto d-flex align-items-center gap-3">
        <Link className="nav-link text-white" to="/profile">
          <FaUser />
        </Link>
        <Nav.Link className="nav-link text-white" onClick={handleLogout}>
          <FaSignOutAlt />
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </div>
</Navbar>

  );
}

export default Navbar_component;