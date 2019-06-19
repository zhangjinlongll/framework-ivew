export default [
    {
        path: 'crm-list',
        name: 'crm-list',
        meta: {
            label: '列表'
        },
        component: resolve => require(['@/views/sale-app/crm/crm-list.vue'], resolve)
    }
]
