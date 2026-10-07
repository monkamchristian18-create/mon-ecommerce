export default function CartIcon({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 4H5L7.4 15.2C7.6 16.2 8.5 17 9.6 17H18.5C19.5 17 20.4 16.3 20.7 15.3L22 9H6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="10"
        cy="21"
        r="1.5"
        fill="currentColor"
      />

      <circle
        cx="18"
        cy="21"
        r="1.5"
        fill="currentColor"
      />
    </svg>
  );
}