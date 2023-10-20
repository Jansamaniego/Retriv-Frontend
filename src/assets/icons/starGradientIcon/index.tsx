import React from 'react';
import { useTheme } from 'styled-components';

interface Props {
  gradient?: number;
  width?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const StarGradientIcon: React.FC<Props> = ({ gradient, ...props }) => {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="0.5"
      stroke="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <linearGradient id="lg0" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="100%" stopColor="white"></stop>
        <stop offset="0%" stopColor={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="90%" stopColor="white"></stop>
        <stop offset="10%" stopColor={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="80%" stopColor="white"></stop>
        <stop offset="20%" stopColor={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="70%" stopColor="white"></stop>
        <stop offset="30%" stopColor={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg4" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="60%" stopColor="white"></stop>
        <stop offset="40%" stopColor={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg5" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="50%" stopColor="white"></stop>
        <stop offset="50%" stopColor={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg6" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="40%" stopColor="white"></stop>
        <stop offset="60%" stopColor={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg7" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="30%" stopColor="white"></stop>
        <stop offset="70%" stopColor={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg8" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="20%" stopColor="white"></stop>
        <stop offset="80%" stopColor={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg9" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="10%" stopColor="white"></stop>
        <stop offset="90%" stopColor={theme.primary.main}></stop>
      </linearGradient>
      <linearGradient id="lg10" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white"></stop>
        <stop offset="100%" stopColor={theme.primary.main}></stop>
      </linearGradient>

      <path
        fill={`url(#lg${gradient})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
};
