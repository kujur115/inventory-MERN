import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiProductHuntLine } from "react-icons/ri";
import { HiMenuAlt3 } from "react-icons/hi";
import menu from "../../data/sidebarMenu";
import SidebarItem from "./SidebarItem";
import { Outlet } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const goHome = () => navigate("/");
  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <RiProductHuntLine
              size={35}
              style={{ cursor: "pointer" }}
              onClick={goHome}
            />
          </div>
          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {menu.map((item, i) => {
          return <SidebarItem key={i} item={item} isOpen={isOpen} />;
        })}
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
