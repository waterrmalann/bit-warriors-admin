import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css'

import PrivateRoute from '@components/wrappers/PrivateRoute.tsx';
import AdminLoginPage from '@pages/LoginPage.tsx';
import DashboardLayout from '@pages/DashboardLayout.tsx';
import DashboardHomePage from '@pages/DashboardHomePage.tsx';
import NotFoundPage from '@pages/NotFoundPage.tsx';
import HomePage from '@pages/HomePage.tsx';
import DashboardProblemsPage from '@pages/DashboardProblemsPage.tsx';
import DashboardNewProblemPage from '@pages/DashboardNewProblemPage.tsx';
import DashboardEditProblemPage from '@pages/DashboardEditProblemPage.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<HomePage />} />
            <Route path='/login' element={<AdminLoginPage />} />
            
            {/* Private Routes */}
            <Route path='' element={<PrivateRoute />}>
                <Route path="/dash" element={<DashboardLayout />}>
                    <Route index element={<DashboardHomePage />} />
                    <Route path="problems" element={<DashboardProblemsPage />} />
                    <Route path="new-problem" element={<DashboardNewProblemPage />} />
                    <Route path="problems/:id" element={<DashboardEditProblemPage />} />
                    {/* <Route path="boards/:boardId" element={<BoardViewPage />} /> */}
                    {/* <Route path="/:" */}
                </Route>
                <Route path='/dash' element={<DashboardLayout />} />
            </Route>

            <Route path='*' element={<NotFoundPage />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)