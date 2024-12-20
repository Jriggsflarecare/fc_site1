const Logo = ({ width = "50", height = "50" }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 200 200"
      style={{ 
        filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.05))',
      }}
    >
      {/* Main flame */}
      <path
        d="M100 20
           C130 50, 170 80, 170 130
           C170 170, 130 190, 100 190
           C70 190, 30 170, 30 130
           C30 80, 70 50, 100 20"
        fill="#2DD4BF"
        stroke="none"
      />
      {/* Inner flame detail */}
      <path
        d="M100 40
           C120 60, 140 80, 140 120
           C140 150, 120 170, 100 170
           C80 170, 60 150, 60 120
           C60 80, 80 60, 100 40"
        fill="#34D399"
        stroke="none"
      />
      {/* Center accent */}
      <path
        d="M100 60
           C110 70, 120 90, 120 110
           C120 130, 110 140, 100 150
           C90 140, 80 130, 80 110
           C80 90, 90 70, 100 60"
        fill="#A7F3D0"
        stroke="none"
      />
    </svg>
  );
};

export default Logo;