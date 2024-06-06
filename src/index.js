import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Fusao from './pages/radiofusao/Fusao';
import './styles.css';
import Matricular from './pages/Matricular/Matricular';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/home/",
    element: <Home/>,
    children:[{
      path: 'radio_fusao',
      element: <Fusao />,

    },
    {
      path:'matricular',
      element:<Matricular/>

    }
    
    ]
  },
  {
    path: "/signup/",
    element: <Signup/>,
  },

]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);

