import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div class="container">
      <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top --bg-secondary">
        <div class="col mb-3">
          <Link
            to="/"
            class="d-flex align-items-center mb-3 link-dark text-decoration-none"
          >Inventory Management System</Link>
          <p class="text-muted">All Rights Reserved. &copy; 2024</p>
        </div>
{/* 
        <div class="col mb-3"></div>

        <div class="col mb-3">
          <h5>Section</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2">
              <Link to="/" class="nav-link p-0 text-muted">
                Home
              </Link>
            </li>
            <li class="nav-item mb-2">
              <Link to="/features" class="nav-link p-0 text-muted">
                Features
              </Link>
            </li>
            <li class="nav-item mb-2">
              <Link to="/pricing" class="nav-link p-0 text-muted">
                Pricing
              </Link>
            </li>
            <li class="nav-item mb-2">
              <Link to="/faqs" class="nav-link p-0 text-muted">
                FAQs
              </Link>
            </li>
            <li class="nav-item mb-2">
              <Link to="/about" class="nav-link p-0 text-muted">
                About
              </Link>
            </li>
          </ul>
        </div> */}
      </footer>
    </div>
  );
};

export default Footer;
