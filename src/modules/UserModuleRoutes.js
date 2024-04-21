// UserModuleRoutes.js

import React,{lazy,Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
// import CreateUserComponent from '../component/CreateUserComponent';
import ViewAllUsersComponent from '../component/ViewAllUsersComponent';
const LazyCreateUserComponent = lazy(() => import('../component/CreateUserComponent'));

// Add the lazy-loaded component 

const UserModuleRoutes = () => {
  return (
    <Routes>
  <Route path="/create" element={
  <Suspense fallback={<div>Loading...</div>}>
    <LazyCreateUserComponent />
  </Suspense>} />      
  <Route path="/view" element={<ViewAllUsersComponent />} />

    </Routes>
  );
};

export default UserModuleRoutes;
