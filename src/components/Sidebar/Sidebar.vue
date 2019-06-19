
<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <Menu
                theme="dark"
                width="auto"
                ref="side_menu"
                :active-name="$route.path"
                :open-names="routeArr"
            >
                <template v-if="navItems&&navItems.subs&&navItems.subs.length">
                    <template v-for="(item, index) in navItems.subs">
                        <template v-if="item.subs&&item.subs.length">
                            <Submenu :name="index" :key="index">
                                <template slot="title">
                                    <Icon :type="item.icon" :size="iconSize"></Icon>
                                    {{item.title}}
                                </template>
                                <template v-for="(value, index) in item.subs">
                                    <router-link :to="value.index|capitalize" :key="index">
                                        <MenuItem :name="value.index">
                                            <Icon :type="item.icon" :size="iconSize"></Icon>
                                            {{value.title}}
                                        </MenuItem>
                                    </router-link>
                                </template>
                            </Submenu>
                        </template>
                        <template v-else>
                            <router-link :to="item.index|capitalize" :key="index">
                                <MenuItem :name="item.title">
                                    <Icon :type="item.icon" :size="iconSize"></Icon>
                                    {{item.title}}
                                </MenuItem>
                            </router-link>
                        </template>
                    </template>
                </template>
            </Menu>
        </nav>
        <SidebarFooter/>
    </div>
</template>
<script>
import SidebarFooter from './SidebarFooter'
import SidebarMinimizer from './SidebarMinimizer'
import SidebarNavDropdown from './SidebarNavDropdown'
import SidebarNavLink from './SidebarNavLink'
import SidebarNavItem from './SidebarNavItem'

export default {
    name: 'sidebar',
    props: {
        navItems: {}
    },
    watch: {
        routeArr: function (val, oldval) {
            this.$nextTick(() => {
                this.$refs.side_menu.updateOpened()
                this.$refs.side_menu.updateActiveName()
            })
        }
    },
    computed: {
        iconSize () {
            return this.spanLeft === 5 ? 14 : 24
        },
        routeArr () {
            let arr = []
            let index = -1
            if (this.navItems && this.navItems.subs && this.navItems.subs.length) {
                let list = this.navItems.subs
                for (let i = 0, len = list.length; i < len; i++) {
                    if (list[i].subs && list[i].subs.length) {
                        let str = JSON.stringify(list[i].subs)
                        if (str.indexOf(this.$route.path) !== -1) {
                            index = i
                            break
                        }
                    }
                }
            }
            if (index !== -1) {
                arr.push(index)
            }
            return arr
        }
    },
    components: {
        SidebarFooter,
        SidebarMinimizer,
        SidebarNavDropdown,
        SidebarNavLink,
        SidebarNavItem
    },
    data () {
        return {
            spanLeft: 5,
            spanRight: 19
        }
    },
    methods: {
        toggleClick () {
            if (this.spanLeft === 5) {
                this.spanLeft = 2
                this.spanRight = 22
            } else {
                this.spanLeft = 5
                this.spanRight = 19
            }
        }
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.replace('#', '')
            return value
        }
    }
}
</script>
<style lang="less" scoped>
//   .sidebar {
//       .sidebar-nav {
//           width: 260px
//       }
//   }
</style>

