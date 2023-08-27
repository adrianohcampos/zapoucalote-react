import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Watch from './pages/Watch';
import Home from './pages/Home';
import Title from './pages/Title';
// import ErrorPage from './pages/ErrorPage';

import ReactGA from 'react-ga';
const TRACKING_ID = "G-L57RPL0X0W"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/watch/:id",
        element: <Watch />
      },
      {
        path: "/title/:id",
        element: <Title />
      }
    ]
  }
])

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);


