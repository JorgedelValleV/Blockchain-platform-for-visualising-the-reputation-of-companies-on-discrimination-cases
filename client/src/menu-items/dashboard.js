// assets
import { IconDashboard , IconAlertOctagon, IconInfoCircle} from '@tabler/icons';

// constant
const icons = { IconDashboard , IconAlertOctagon, IconInfoCircle};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Menú',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Inicio',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },

        {
            id: 'tfg info',
            title: 'Información del proyecto',
            type: 'item',
            url: '/views/pages/tfgInfo',
            icon: icons.IconInfoCircle,
            breadcrumbs: false
        },
        {
            id: 'Denuncia',
            title: 'Formulario Denuncia',
            type: 'item',
            url: '/views/pages/formulario', 
            icon: icons.IconAlertOctagon,
            breadcrumbs: false
        },
        {
            id: 'Todas empresas',
            title: 'Todas las empresas',
            type: 'item',
            url: '/views/pages/companies',
            icon: icons.IconInfoCircle,
            breadcrumbs: false
        },
    ]
};

export default dashboard;
