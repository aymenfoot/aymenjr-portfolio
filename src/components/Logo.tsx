export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Aymen Jr. logo"
      role="img"
    >
      <rect x="1" y="1" width="38" height="38" rx="8" stroke="currentColor" strokeWidth="1.5" />
      <text
        x="20"
        y="26"
        textAnchor="middle"
        fontFamily="inherit"
        fontWeight="700"
        fontSize="15"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        AJ
      </text>
    </svg>
  );
}
