const iconPaths = {
  building:
    "M4 20V8l6-4 6 4v12M7 20v-7m3 7v-9m3 9v-7M3 20h18M16 20v-9l4 2v7",
  user: "M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  search: "m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15",
  location:
    "M12 21s7-4.44 7-11a7 7 0 1 0-14 0c0 6.56 7 11 7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8.5-3a7 7 0 0 0-.12-1.26l2.02-1.57-2-3.46-2.39.96a8 8 0 0 0-2.18-1.26L15.5 3h-4l-.36 2.41a8 8 0 0 0-2.18 1.26l-2.36-.96-2 3.46 2 1.57A7 7 0 0 0 6.5 12c0 .43.04.85.12 1.26L4.6 14.83l2 3.46 2.36-.96a8 8 0 0 0 2.18 1.26l.36 2.41h4l.36-2.41a8 8 0 0 0 2.18-1.26l2.36.96 2-3.46-2.02-1.57c.08-.41.12-.83.12-1.26Z",
  calendar:
    "M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z",
  check: "m5 13 4 4L19 7",
  chart: "M4 19V5M8 19v-7m4 7V9m4 10V3m4 16H3",
  calculator:
    "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2 5h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  help: "M12 18h.01M9.1 9a3 3 0 1 1 5.45 1.73c-.96.58-1.55 1.13-1.55 2.27M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
};

function Icon({ name, className = "", size = 22 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={iconPaths[name]}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Icon;
