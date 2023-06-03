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
  background-color: ${(props) => props.theme.offWhite};
}

/* Set header and paragraph typography scale */
h1{
  font-size: 4.8883rem;
}

h2{
  font-size: 3.906rem;
}

h3{
  font-size: 3.125rem;
}

h4{
  font-size: 2.5rem;
}

h5{
  font-size: 2rem;
}

h6{
  font-size: 1.6rem;
}

p{
  font-size: 1.28rem;
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
