import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing

const Formulario = Loadable(lazy(() => import('views/pages/formulario')));
const InfoProyecto = Loadable(lazy(() => import('views/pages/tfgInfo')));
const Company = Loadable(lazy(() => import('views/pages/company')));


const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/views/pages/tfgInfo',
            element: <InfoProyecto/>
        },
        {
            path: '/views/pages/formulario',
            element: <Formulario />
        }, 
        {
            path: 'views/pages/company/:id',
            element: <Company />

        },
        {
            path: 'views/pages/company:id/formulario',
            element: <Formulario />
        }
    ]
};

export default MainRoutes;
