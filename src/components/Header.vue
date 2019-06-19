<template>
<header class="app-header navbar" :class="{'min-header': isOverWidth}">
    <div class="logo">
       <link class="navbar-brand" to="#" ref="navbar-brand"></link>
    </div>
    <button class="navbar-toggler sidebar-toggler d-md-down-none mr-auto" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
	<div class="menu-wrap" ref="menu-wrap">
		<Menu mode="horizontal" theme="dark" class="navbar-menu" :active-name="meunCurrentIndex">
	        <MenuItem :name="index" v-for="(menuItem, index) in menuList" :key="index" v-if="menuList && menuList.length">
	        <a class="item-link" @click="pushmenu(menuItem)">{{menuItem.menuName}}</a>
	        </MenuItem>
	    </Menu>
	</div>
    <Dropdown class="navbar-dropdown">
        <Avatar icon="person" :src='avatarImg'/>
        <span class="username">{{username}}</span>
        <Icon type="arrow-down-b"></Icon>
        <DropdownMenu slot="list">
            <DropdownItem><li @click="toChangePassword">修改密码</li></DropdownItem>
            <DropdownItem><li @click="quit">退出登录</li></DropdownItem>
        </DropdownMenu>
    </Dropdown>
</header>
</template>
<script>
import {
    mapGetters
} from 'vuex'

import { setJSONStore, removeStore } from '@/utils/localStorage' // 获取用户信息
import jsCookie from 'js-cookie'
import {TOP_AVATAR_IMG, NAVBAR_BRAND_LOGO} from '@/constants'
export default {
    name: 'c-header',
    data () {
        return {
            screenWidth: document.body.clientWidth,
            timer: false,
            isOverWidth: false,
            meunCurrentIndex: 0,
            username: '',
            avatarImg: TOP_AVATAR_IMG,
            naverBrandLogo: NAVBAR_BRAND_LOGO
        }
    },
    watch: { //  解决浏览器后退左侧menu不改变问题
        '$route': 'setMenuInfo',
        'menuList': 'setMinHeader',
        'username': 'setMinHeader',
        screenWidth (val) {
            if (!this.timer) {
                this.screenWidth = val
                this.timer = true
                setTimeout(() => {
                    this.setMinHeader()
                    this.timer = false
                }, 100)
            }
        }
    },
    created () {
        this.setMenuInfo()
    },
    computed: {
        ...mapGetters([
            'userData',
            'menuList'
        ])
    },
    mounted () {
        this.username = this.getUserName()
        window.onresize = () => {
            return (() => {
                this.screenWidth = document.body.clientWidth
            })()
        }
    },
    methods: {
        setCurrentMenu (list) {
            let menuIndex = 0
            let _hash = null
            if (location.href.indexOf('#') !== -1) {
                _hash = location.href.split('#')[1].split('/')
            }
            let _hashStr = _hash && _hash.length >= 2 ? '/' + _hash[1] : ''

            if (list) {
                for (let i = 0, len = list.length; i < len; i++) {
                    let item = list[i]
                    if (item.childs && item.childs.length) {
                        let str = JSON.stringify(item.childs)
                        if (str.indexOf(_hashStr) !== -1) {
                            let itemMenuId = item.menuId // 获取全量匹配成功的menuId
                            // 匹配拥有的menulist
                            for (let m = 0, mLen = this.menuList.length; m < mLen; m++) {
                                let mItem = this.menuList[m]
                                if (itemMenuId == mItem.menuId) {
                                    menuIndex = m
                                    return menuIndex
                                }
                            }
                            break
                        }
                    }
                }
            }
            return menuIndex
        },
        /**
         * @Author: dragon
         * @Date: 2019-06-16 16:49:14
         * @Desc: get left menu list
         */
        setMenuInfo () {
            if (this.menuList && this.menuList.length) {
                // this.$$getButtonSteer(this) // TODO
                // let menuListAll = getJSONStore('menuListAll')
                // let index = this.setCurrentMenu(menuListAll)
                // this.meunCurrentIndex = index
                let item = this.menuList[0]
                // setJSONStore('childrenmenuList', item)
                this.$store.dispatch('getLeftMenu', item)
            }
        },
        sidebarToggle (e) {
            e.preventDefault()
            document.body.classList.toggle('sidebar-hidden')
        },
        mobileSidebarToggle (e) {
            e.preventDefault()
            document.body.classList.toggle('sidebar-mobile-show')
        },
        pushmenu (item) {
            let url = ''
            if (item.childs[0]) {
                if (item.childs[0].url) {
                    url = item.childs[0].url
                } else if (item.childs[0].childs[0] && item.childs[0].childs[0].url) {
                    url = item.childs[0].childs[0].url
                }
            }
            setJSONStore('childrenmenuList', item)
            this.$store.dispatch('getLeftMenu')
            if (url) {
                if (url.indexOf('/znlhApp/') != -1) {
                    location.href = location.origin + url
                } else if (url == '/UpmsApp/') { // 权限系统
                    location.href = location.origin + url
                } else if (url.indexOf('/NewstarApp/') != -1) {
                    location.href = location.origin + url
                } else if (url.indexOf('/DemandApp/') != -1) { // 需求池系统
                    location.href = location.origin + url
                }
            }
            if (document.body.classList.contains('sidebar-hidden')) {
                document.body.classList.toggle('sidebar-hidden')
            }
            if (!document.body.classList.contains('sidebar-mobile-show')) {
                document.body.classList.toggle('sidebar-mobile-show')
            }
        },
        getUserName () {
            return this.userData ? this.userData.userNameZh : null
        },
        /* 退出清除缓存 */
        quit () {
            removeStore('znUserdata')
            removeStore('menuList')
            removeStore('menuListAll')
            removeStore('childrenmenuList')
            removeStore('systemId')
            removeStore('znUserRoledata')
            removeStore('zntargeturl')
            jsCookie.remove('targeturl', { path: '' })
            this.$$api_login_logout({
                opts: {
                    'code': true
                },
                fn: (data) => {
                    this.$router.push('/login')
                }
            })
        },
        setMinHeader () {
            var _w = document.body.offsetWidth || document.body.offsetWidth
            if (_w <= 991.98) {
                return false
            }
            this.$nextTick(() => {
                var oMenuWrap = this.$refs['menu-wrap']
                var _defWidth = document.querySelector('.navbar-dropdown').offsetWidth + 80

                if (_w <= this.$refs['navbar-brand'].offsetWidth + oMenuWrap.offsetWidth + _defWidth) {
                    this.isOverWidth = true
                    this.$refs['menu-wrap'].style.width = (_w - this.$refs['navbar-brand'].offsetWidth - _defWidth - 10) + 'px'
                } else {
                    this.isOverWidth = false
                    this.$refs['menu-wrap'].style.width = 'auto'
                }
            })
        },
        toChangePassword () {
            location.href = location.origin + '/change_password.html'
        }
    }
}
</script>

