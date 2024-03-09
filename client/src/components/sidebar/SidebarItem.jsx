import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? "active" : "link");
const activeSubLink = ({ isActive, isOpen }) =>
  isActive ? "active" : isOpen ? "link" : "closed";
const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);
  if (item.children)
    return (
      <div className={`sidebar-item s-parent ${expandMenu ? "open" : ""} `}>
        <div className="sidebar-title">
          <span>
            {item.icon && <div className="icon">{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdKeyboardArrowRight
            size={25}
            className="arrow-icon"
            onClick={() => setExpandMenu(!expandMenu)}
          />
        </div>
        <div className="sidebar-content">
          {item.children.map((child, index) => (
            <div key={index} className="s-child">
              <NavLink to={child.path} className={activeSubLink}>
                <div className="sidebar-item">
                  <div className="sidebar-title">
                    <span>
                      {child.icon && <div className="icon">{child.icon}</div>}
                      {isOpen && <div>{child.title}</div>}
                    </span>
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    );
  else
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) => activeLink({ isActive, isOpen })}
      >
        <div className="sidebar-item s-parent">
          <div className="sidebar-title">
            {isOpen ? (
              <span>
                {item.icon && <div className="icon">{item.icon}</div>}
                {item.title}
              </span>
            ) : (
              <div className="icon">{item.icon}</div>
            )}
          </div>
        </div>
      </NavLink>
    );
};

export default SidebarItem;
