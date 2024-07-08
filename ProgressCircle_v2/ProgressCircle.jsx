import React, { useEffect, useRef } from "react";
import "../styles/ProgressCircle.css";

const ProgressCircle = ({ percent = 75, size = 85, name, temperature }) => {
  const circleRef = useRef(null);

  const colorDecider = () => {
    if (percent <= 50) {
      return "#2eb35a";
    } else if (percent > 50 && percent <= 75) {
      return "#efb700";
    } else {
      return "#b81d13";
    }
  };

  useEffect(() => {
    const circle = circleRef.current;
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }, [percent]);

  const svgSize = size;
  const strokeWidth = 7.5;
  const radius = (svgSize - strokeWidth) / 2;
  const viewBox = `0 0 ${svgSize} ${svgSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percent) / 100;

  const progressStyle = {
    fill: "none",
    stroke: colorDecider(),
    strokeWidth: `${strokeWidth}px`,
    strokeLinecap: "round",
    strokeDasharray: dashArray,
    strokeDashoffset: dashOffset,
    transition: "stroke-dashoffset 0.5s ease 0s",
  };

  const textStyle = {
    fill: "#FFFFFF",
    textAnchor: "middle",
  };

  return (
    <div className="progress-container">
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={viewBox}
        style={{ transform: "rotate(144deg)" }}
      >
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke="#f1f1f1"
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          ref={circleRef}
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          style={progressStyle}
        />
        <g transform={`rotate(-144 ${svgSize / 2} ${svgSize / 2})`}>
          {temperature && (
            <text x="50%" y="45%" style={{ ...textStyle, fontSize: "0.85rem" }}>
              {`${temperature}°C`}
            </text>
          )}
          <text
            x="50%"
            y="70%"
            style={{ ...textStyle, fontSize: "1rem", fontWeight: "bold" }}
          >
            {`${percent}%`}
          </text>
        </g>
      </svg>
      <text
        x="50%"
        y="65%"
        style={{ ...textStyle, fontSize: "1rem", fontFamily: "BV" }}
      >
        {name}
      </text>
    </div>
  );
};

export default ProgressCircle;
