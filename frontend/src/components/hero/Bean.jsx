export default function Bean({ className = '', style = {}, depth = 1 }) {
  return (
    <svg
      className={`uc-bean ${className}`}
      style={style}
      data-depth={depth}
      viewBox="0 0 100 140"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="beanGrad" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#8a5a3f" />
          <stop offset="55%" stopColor="#4a2a1b" />
          <stop offset="100%" stopColor="#1d0e08" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="70" rx="42" ry="62" fill="url(#beanGrad)" />
      <path
        d="M52 10 C 30 45, 70 80, 48 130"
        fill="none"
        stroke="#150a05"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="34" cy="38" rx="9" ry="18" fill="#ffffff" opacity="0.08" transform="rotate(-18 34 38)" />
    </svg>
  )
}