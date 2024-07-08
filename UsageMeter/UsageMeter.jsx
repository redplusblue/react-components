import React, { useEffect, useRef } from "react";
import "../styles/UsageMeter.css";

const UsageMeter = ({ name, usage, temperature }) => {
  const scoreRef = useRef(null);

  useEffect(() => {
    if (scoreRef.current) {
      const rotation = Math.round(usage * 1.8) - 45;
      scoreRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, [usage]);

  return (
    <div className="speedbox">
      <div className="speedbox__score" ref={scoreRef}></div>
      <div className="speedbox__groove"></div>
      <div className="speedbox__odo">
        <div className="speedbox__ping">{name}</div>
        <div className="speedbox__down">
          {usage}
          <span>%</span>
        </div>
        {temperature && (
          <div className="speedbox__up">
            {temperature}
            <span>°C</span>
          </div>
        )}
      </div>
      <div className="speedbox__base"></div>
    </div>
  );
};

export default UsageMeter;
