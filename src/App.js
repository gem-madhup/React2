// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserModuleRoutes from './modules/UserModuleRoutes';
import Navigation from './UserModule/Navigation';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/users/*" element={<UserModuleRoutes />} />
          <Route path="/" element={<Navigate to="/users/create" />} />
          <Route path="/users" element={<Navigate to="/users/create" />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
