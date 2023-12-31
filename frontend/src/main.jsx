import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import "./styles/index.scss";

import Connection from "./pages/Connection";
import Home, { loaderIdeas } from "./pages/Home";
import Rules from "./pages/Rules";
import Profile from "./pages/Profile";
import Idea from "./pages/Idea";
import HomeAdministrator, { loader } from "./pages/HomeAdministrator";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Connection />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        loader: loaderIdeas,
      },
      {
        path: "/idea",
        element: (
          <ProtectedRoute>
            <Idea />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rules",
        element: <Rules />,
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/administrator",
        element: (
          // <ProtectedRoute>
          <HomeAdministrator />
          // </ProtectedRoute>
        ),
        loader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

/* adding following root for test modal
{
  path: "/modalcreateidea",
  element: <CreateIdeaModal />,
},
{
  path: "/decisionmodal",
  element: <DecisionModal />,
},

*/
