// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/pages/login/login3',
                    target: true
                },
                {
                    id: 'tfgInfo',
                    title: 'Información del proyecto',
                    type: 'item',
                    url: '/pages/tfgInfo',
                    target: true
                },
                {
                    id: 'formulario',
                    title: 'Formulario',
                    type: 'item',
                    url: '/pages/formu-denuncia',
                    target: true
                },
                {
                    id: 'company',
                    title: 'Company',
                    type: 'item',
                    url: '/pages/companies',
                    target: true
                }

            ]
        }
    ]
};

export default pages;
