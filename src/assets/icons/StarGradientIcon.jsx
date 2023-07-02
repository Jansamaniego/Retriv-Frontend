import { useTheme } from 'styled-components';

export const StarGradientIcon = ({ gradient, ...props }) => {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="0.5"
      stroke="currentColor"
      class="w-6 h-6"
      {...props}
    >
      <linearGradient id="lg0" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="100%" stop-color="white"></stop>
        <stop offset="0%" stop-color={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="90%" stop-color="white"></stop>
        <stop offset="10%" stop-color={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="80%" stop-color="white"></stop>
        <stop offset="20%" stop-color={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="70%" stop-color="white"></stop>
        <stop offset="30%" stop-color={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg4" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="60%" stop-color="white"></stop>
        <stop offset="40%" stop-color={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg5" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="50%" stop-color="white"></stop>
        <stop offset="50%" stop-color={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg6" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="40%" stop-color="white"></stop>
        <stop offset="60%" stop-color={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg7" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="30%" stop-color="white"></stop>
        <stop offset="70%" stop-color={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg8" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="20%" stop-color="white"></stop>
        <stop offset="80%" stop-color={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg9" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="10%" stop-color="white"></stop>
        <stop offset="90%" stop-color={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg10" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="white"></stop>
        <stop offset="100%" stop-color={theme.primary.main}></stop>
      </linearGradient>

      <path
        fill={`url(#lg${gradient})`}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
};
