import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Catalog from './pages/CatalogPage';
import Profile from './pages/ProfilePage';
import Login from './pages/LoginPage';
import SignUp from './pages/SignupPage';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const router = createBrowserRouter([
  {
  path: '/',
  element: <Catalog/>,
  errorElement: <div>Error 404</div>,
  },
  {
    path: '/profile',
    element: <Profile/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/signup',
    element: <SignUp/>,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider 
      domain='dev-fnrnn64sdqefi86m.us.auth0.com' 
      clientId='r2BuYsNLiZ4SahlZOkgYmRUEi1ZpwrLy' 
      authorizationParams={{
        redirect_uri: "http://localhost:3000/profile"
    }}>
      <RouterProvider router={router}/>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
