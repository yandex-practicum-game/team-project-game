import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import {route} from './const';
import {store} from './stores';

import {Provider} from 'react-redux';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import {LoginPage, LogoutPage, ProfilePage, RegistrationPage} from './pages';
import {ErrorPage, ExamplePage, GamePage, LeaderboardPage} from './pages';

export const router = createBrowserRouter([
  {path: route.root, element: <GamePage />},
  {path: route.login, element: <LoginPage />},
  {path: route.logout, element: <LogoutPage />},
  {path: route.error, element: <ErrorPage />},
  {path: route.leaderboard, element: <LeaderboardPage />},
  {path: route.profile, element: <ProfilePage />},
  {path: route.registration, element: <RegistrationPage />},
  {path: route.example, element: <ExamplePage />},
]);

const App = () => <RouterProvider router={router} />;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

export default App;
