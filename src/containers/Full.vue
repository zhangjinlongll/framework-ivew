<template>
<div class="app znlhApp" :class="{'znTest': isTest}" id="J-beta-app">
    <AppHeader id="J-beta-header"/>
    <div class="app-body">
        <Sidebar :navItems="leftmenuList" />
        <main class="main">
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </main>
        <AppAside/>
    </div>
    <AppFooter/>
</div>
</template>

<script>
import {
    Header as AppHeader,
    Sidebar,
    Aside as AppAside,
    Footer as AppFooter,
    Breadcrumb
} from '../components/'
import {
    mapGetters
} from 'vuex'
import { getStore } from '@/utils/localStorage' // 获取用户信息
import DA from '../../static/js/da.js'
export default {
    name: 'full',
    components: {
        AppHeader,
        Sidebar,
        AppAside,
        AppFooter,
        Breadcrumb
    },
    beforeCreate () {
        if (!getStore('znUserdata')) {
            // 进入埋点
            try {
                DA.log({
                    logType: 'K0102001',
                    log: 'znUserdata=null;' + document.cookie
                })
            } catch (e) {
                console.log(e)
            }
            // this.$router.push('/login')
        } else {
            // store存储用户信息
            this.$store.dispatch('setUserInfo')
            this.$store.dispatch('setUserRoleInfo')
            this.$store.dispatch('getMenuList')
        }
    },
    data () {
        return {
            isTest: false
        }
    },
    computed: {
        ...mapGetters([
            'leftmenuList'
        ]),
        name () {
            return this.$route.name
        },
        list () {
            return this.$route.meta.label
        }
    },
    beforeMount () {
        if (process.env.BASE_STYLE && process.env.BASE_STYLE !== 'PRDStyle') {
            this.isTest = true
        }
        try {
            DA.init()
        } catch (e) {
            console.log(e)
        }
    },
    mounted () {}
}
</script>

<style>
    .znlhApp{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
