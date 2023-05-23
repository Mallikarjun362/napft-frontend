import React, { useState } from "react";
import "./ToolTip.css";

const ToolTip = ({ text , body }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="tooltip-container">
      <span
        className="tooltip-text"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {body}
      </span>
      {showTooltip && <div className="tooltip">{text}</div>}
    </div>
  );
};

export default ToolTip;