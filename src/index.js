import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuizComponent from './components/QuizComponent';
import ScoreCard from './components/ScoreCard';
import NotFoundPage from './components/NotFoundPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const routes = createBrowserRouter([
  {path: "/", element: <HomePage /> },
  {path: "/quizSection", element: <QuizComponent />},
  {path: "/scoreCard", element: <ScoreCard/>},
  {path: "*", element: <NotFoundPage />}
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
