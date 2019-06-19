import Dashboard from '@/views/Dashboard'
export default [
    {
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
            label: '欢迎页',
            icon: 'table'
        },
        component: Dashboard
    },
    {
        path: '*',
        name: 'error-404',
        redirect: '/dashboard'
    }
]
