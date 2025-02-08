import { Link } from 'react-router-dom';
// import { UtensilsCrossed } from 'lucide-react';
import logo from '../assets/logo.svg';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          {/* <UtensilsCrossed className="me-2" /> */}
          <img src={logo} alt="Food4U" width={48}/>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">หน้าแรก</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/calculator">คำนวณแคลอรี่</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipe">คำนวณสูตรอาหาร</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;