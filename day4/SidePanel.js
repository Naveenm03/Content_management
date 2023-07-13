import React, { useState } from "react";
// import DehazeOutlinedIcon from "@mui/icons-material/DehazeOutlined";
// import DehazeIcon from '@mui/icons-material/Dehaze';
import "./SidePanel.css";
import { Link } from "react-router-dom";

const Sidepanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`side-panel ${isOpen ? "open" : ""}`}>
        <button className="toggle-button" onClick={togglePanel}></button>
        <div className="panel-content">
          <div className="Links">
            <Link to="/home">Post</Link>
            <Link to="/user">Followers</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidepanel;