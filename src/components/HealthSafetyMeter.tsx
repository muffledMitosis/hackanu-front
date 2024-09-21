import React from 'react';

const HealthSafetyMeter = ({ value }) => {
  // Ensure the value is between 0 and 100
  const safeValue = Math.min(100, Math.max(0, value));
  
  // Calculate the angle for the needle
  const angle = (safeValue / 100) * 180 - 90;
  
  // Calculate the color based on the value
  const getColor = (val) => {
    if (val < 33) return 'rgb(239, 68, 68)'; // red-500
    if (val < 66) return 'rgb(234, 179, 8)'; // yellow-500
    return 'rgb(34, 197, 94)'; // green-500
  };

  // Calculate the end coordinates for the colored arc
  // const endX = 100 + 80 * Math.cos((Math.PI * (safeValue / 100 - 0.5)));
  // const endY = 90 + 80 * Math.sin((Math.PI * (safeValue / 100 - 0.5)));

	// Calculate the end coordinates for the colored arc
	const endX = 100 + 80 * Math.cos((safeValue / 100) * Math.PI - Math.PI / 2);
	const endY = 90 + 80 * Math.sin((safeValue / 100) * Math.PI - Math.PI / 2);


  return (
    <div className="w-64 h-64 relative">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Meter background */}
        <path
          d="M20 90 A 80 80 0 0 1 180 90"
          fill="none"
          // stroke="#e5e7eb"
					stroke={getColor(safeValue)}
          strokeWidth="20"
          strokeLinecap="round"
        />
        
        {/* Colored meter fill */}
        {/* <path
          d={`M20 90 A 80 80 0 ${safeValue > 50 ? 1 : 0} 1 ${endX} ${endY}`}
          fill="none"
          stroke={getColor(safeValue)}
          strokeWidth="20"
          strokeLinecap="round"
        /> */}
        
        {/* Needle */}
        <line
          x1="100"
          y1="90"
          x2="100"
          y2="20"
          // stroke="#1f2937"
					stroke="#ffffff"
          strokeWidth="2"
          transform={`rotate(${angle}, 100, 90)`}
        />
        
        {/* Center circle */}
        <circle cx="100" cy="90" r="5" fill="#ffffff" />
        
        {/* Value text */}
        <text x="100" y="70" textAnchor="middle" fontSize="24" fill="#ffffff">
          {safeValue}
        </text>
      </svg>
    </div>
  );
};

export default HealthSafetyMeter;