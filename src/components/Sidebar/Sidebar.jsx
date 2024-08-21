import React from "react";
import "./Sidebar.scss";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoPeopleOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GoTasklist } from "react-icons/go";
import { useStateValue } from "../../StateProvider";
import { isAdmin } from "../../utils/adminAccess";
import { BsPersonVcard } from "react-icons/bs";
const Sidebar = ({ toggle }) => {
  const { pathname } = useLocation();
  const [{ userInfo }, dispatch] = useStateValue();

  return (
    <div className="app-menu">
      {/* Sidebar */}
      <div className="navbar-vertical navbar nav-dashboard">
        <div className="h-100" data-simplebar="">
          {/* Brand logo */}
          <div className="logo">Task Trak</div>
          {/* Navbar nav */}
          <ul className="navbar-nav flex-column" id="sideNavbar">
            {/* Nav item */}

            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link has-arrow ${
                  pathname === "/" ? "active" : ""
                } `}
                onClick={toggle}
              >
                <IoHomeOutline size={20} />
                Home
              </Link>
            </li>
            {/* Nav item */}
            <li className="nav-item">
              <Link
                to="/patient"
                className={`nav-link has-arrow ${
                  pathname === "/patient" ? "active" : ""
                } `}
                onClick={toggle}
              >
                <BsPersonVcard size={20} />
                Patient
              </Link>
            </li>
            {/* Nav item */}
            {isAdmin(userInfo) && (
              <li className="nav-item">
                <div className="navbar-heading">CONFIGURATION</div>
              </li>
            )}
            {/* Nav item */}
            {isAdmin(userInfo) && (
              <li className="nav-item">
                <Link
                  to="/company-info"
                  className={`nav-link has-arrow ${
                    pathname === "/company-info" ? "active" : ""
                  } `}
                  onClick={toggle}
                >
                  <HiOutlineBuildingOffice2 size={16} />
                  Company
                </Link>
              </li>
            )}

            {/* Nav item */}
            {isAdmin(userInfo) && (
              <li className="nav-item">
                <Link
                  to="/staff"
                  className={`nav-link has-arrow ${
                    pathname === "/staff" ? "active" : ""
                  } `}
                  onClick={toggle}
                >
                  <IoPeopleOutline size={16} />
                  Staff
                </Link>
              </li>
            )}
            {/* Nav item */}
            {isAdmin(userInfo) && (
              <li className="nav-item">
                <Link
                  to="/task-template"
                  className={`nav-link has-arrow ${
                    pathname === "/task-template" ? "active" : ""
                  } `}
                  onClick={toggle}
                >
                  <BiTask size={16} />
                  Task Template
                </Link>
              </li>
            )}
            {/* Nav item */}
            {isAdmin(userInfo) && (
              <li className="nav-item">
                <Link
                  to="/project-template"
                  className={`nav-link has-arrow ${
                    pathname === "/project-template" ? "active" : ""
                  } `}
                  onClick={toggle}
                >
                  <AiOutlineFundProjectionScreen size={16} />
                  Project Template
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
