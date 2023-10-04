import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Set font-size scaling to 1rem = 10px */
html{
  font-size: 62.5%;
}


/* Set font-family */

body,
html{
  font-family: 'Lato', 'sans-serif';
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

body{
  background-color: ${(props) => props.theme.neutral[700]};
}

/* Set header and paragraph typography scale */
h1{
  font-size: clamp(3.666rem, 3.44rem + 0.604vw, 4.888rem);
}

h2{
  font-size: clamp(2.929rem, 2.749rem + 0.482vw, 3.906rem);
}

h3{
  font-size: clamp(2.344rem, 2.199rem + 0.386vw, 3.125rem);
}

h4{
  font-size: clamp(1.875rem, 1.759rem + 0.309vw, 2.5rem);
}

h5{
  font-size: clamp(1.5rem, 1.407rem + 0.247vw, 2rem);
}

h6{
  font-size: clamp(1.2rem, 1.126rem + 0.198vw, 1.6rem);
}

p{
  font-size: clamp(0.96rem, 0.901rem + 0.158vw, 1.28rem);
}

label{
  font-size: clamp(1.2rem, 1.126rem + 0.198vw, 1.6rem);
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

export default GlobalStyle;
