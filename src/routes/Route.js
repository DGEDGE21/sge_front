import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Fusao from '../pages/radiofusao/Fusao';
import Matricular from '../pages/Matricular/Matricular';
const routes = [
  {
    path: '/radio_fusao/',
    element: <Fusao />,
  },
  {
    path:'/matricular/',
    element:<Matricular/>

  }
];

function RouteComponent() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default RouteComponent;
