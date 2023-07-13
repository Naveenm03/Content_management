import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import SidePanel from "./SidePanel";

export default function Header() {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(search);
    setSearch("");
  };

  return (
    <div className="header-container">
      <div className="outerLayer">
        <div className="NavBar">
          <div className="header">
            <Link to="/home">Home</Link>
            <Link to="/home">About</Link>
            <Link to="/home">Contact</Link>
          </div>
          <input
            type="text"
            className="searchBar"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            style={{
              borderRadius: "5px",
              height: "32px",
              borderStyle: "hidden",
              width: "20%",
              color: "#c4c3ca",
            }}
          />
          <span>
            {" "}
            <button
              type="submit"
              onClick={handleSubmit}
              style={{
                borderRadius: "5px",
                height: "35px",
                backgroundColor: "black",
                color: "#c4c3ca",
              }}
            >
              Search
            </button>
          </span>
          <Link to="/user" style={{ float: "right", paddingRight: "2%" }}>
            <AccountBoxIcon sx={{ fontSize: "40", color: "#c4c3ca" }} />
          </Link>
        </div>
      </div>
      <SidePanel/>
    </div>
  );
}