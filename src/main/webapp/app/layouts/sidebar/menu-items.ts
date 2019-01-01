import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '', title: 'Security', icon: 'mdi mdi-lock', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/admin/users', title: 'Users', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/admin/groups', title: 'Groups', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ]
    },

];

