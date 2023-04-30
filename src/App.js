import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';

const App = (props) => (
  <Routes>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
    </Route>
  </Routes>
);

export default App;
