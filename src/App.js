import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './components/RootLayout';

const App = (props) => (
  <Routes>
    <Route path="/" element={<RootLayout />}>
      {/* <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />}>
          <Route path="signup" element={<SignUpForm />} />
          <Route path="signin" element={<SignInForm />} /> */}
      {/* </Route> */}
    </Route>
  </Routes>
);

export default App;
