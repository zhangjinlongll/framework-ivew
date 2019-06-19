import Vue from 'vue'
import Router from 'vue-router'

// Containers
// import Full from '@/containers/Full'

// Views
// 导入login router模块
import Login from './login'
import Common from './common'
import Sale from './sale'
import Main from '../components/main'
// import Cis from './cis'
// import Dms from './dms'
// import Fin from './fin'
// import Iot from './iot'
// import Opr from './opr'
// import Ser from './ser'
// import Tms from './tms'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [
        Login,
        {
            path: '/',
            name: 'Home',
            component: Main,
            children: [
                ...Sale,
                // ...Cis,
                // ...Dms,
                // ...Fin,
                // ...Iot,
                // ...Opr,
                // ...Ser,
                // ...Tms,
                ...Common
            ]
        }
    ]
})
