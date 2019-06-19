<style lang="less">
@import './login.less';
</style>

<template>
<div class="login" @keydown.enter="handleSubmit">
    <div class="screenBg" id="screenBg"></div>
    <div class="login-con">
        <h1 class="header-title">众能联合设备管理系统</h1>
        <Card :bordered="false">
            <p slot="title">登录</p>
            <div class="form-con">
                <Form ref="loginForm" :model="form" :rules="rules">
                    <FormItem prop="userName">
                        <Input v-model="form.userName" placeholder="请输入用户名" >
                            <span slot="prepend">
                                <Icon :size="16" type="person"></Icon>
                            </span>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="form.password" placeholder="请输入密码">
                        <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                        </Input>
                    </FormItem>
                    <FormItem class="btn-list">
                        <Button  @click="handleSubmit()" type="primary" :disabled="load" event-param="30000|0536001|登录">登录</Button>
                        <Checkbox class="re-password" :class="verify ? 'new_password': ''">
                            <span>记住密码</span>
                        </Checkbox>
                    </FormItem>
                </Form>
                <p class="login-tip"></p>
            </div>
        </Card>
        <p class="copy-right">2019 © by znlh.</p>
    </div>
</div>
</template>

<script>
import {
    setStore,
    setJSONStore,
    getStore,
    removeStore
} from '@/utils/localStorage' // 获取用户信息
import jsCookie from 'js-cookie'
import THREE from '../../libs/three/three'
import DA from '../../../static/js/da.js'
import Verify from 'vue2-verify'

export default {
    data () {
        return {
            verify: false,
            form: {
                userName: '',
                password: ''
            },
            load: false,
            loginData: null,
            rules: {
                userName: [{
                    required: true,
                    message: '账号不能为空',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }]
            },
            timer: false,
            screenWidth: document.body.clientWidth
        }
    },
    methods: {
        handleSubmit () {
            this.load = true
            // this.removeUserInfo() TODO
            // 清除登录cookie
            try {
                var _domainArr = document.domain.split('.')
                var _domain = ''
                var _as_domain = ''
                if (_domainArr.length === 3) {
                    _domain = '.' + _domainArr.slice(-2).join('.')
                    _as_domain = '.' + _domainArr.slice(-3).join('.')
                } else if (_domainArr.length === 4) {
                    _domain = '.' + _domainArr.slice(-3).join('.')
                    _as_domain = '.' + _domainArr.slice(-4).join('.')
                }
                jsCookie.set('_aj_token_', null, { expires: -1, domain: _domain })
                jsCookie.set('_d_id_', null, { expires: -1, domain: _domain })
                jsCookie.set('_h_id_', null, { expires: -1, domain: _domain })
                jsCookie.set('_u_id_', null, { expires: -1, domain: _domain })
                jsCookie.set('_a_s_', null, { expires: -1, domain: _domain })
                jsCookie.set('_aj_token_', null, { expires: -1, domain: _as_domain })
                jsCookie.set('_d_id_', null, { expires: -1, domain: _as_domain })
                jsCookie.set('_h_id_', null, { expires: -1, domain: _as_domain })
                jsCookie.set('_u_id_', null, { expires: -1, domain: _as_domain })
                jsCookie.set('_a_s_', null, { expires: -1, domain: _as_domain })
            } catch (err) {}
            let that = this
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    if (!that.verify) {
                        that.login()
                    } else {
                        setTimeout(() => {
                            if (!that.verifyCodeFlag) {
                                that.$Message.error('验证码输入有误')
                            } else {
                                that.login()
                            }
                        })
                    }
                } else {
                    that.load = false
                }
            })
        },
        /**
         * [login 登录]
         * @author dragon
         * @return {[type]}                 [description]
         */
        login () {
            this.handleLogin()
            // this.$$api_login_login({
            //     data: {
            //         name: this.form.userName,
            //         pwd: this.form.password
            //     },
            //     fn: (data) => {
            //         this.verify = false
            //         if (+data.errCode === 0) { // 登录成功
            //             this.loginData = data.data
            //             // this.handleLogin()
            //             // this.aes()
            //         } else if (data.code == 50102) {
            //             this.verify = false
            //             this.load = false
            //             this.$Message.error('您没有权限')
            //         } else if (data.code == 50105) {
            //             this.load = false
            //             this.$Message.error('您的账号输入错误次数过多，暂被锁定')
            //         } else if (data.code == 50106) {
            //             this.load = false
            //             this.$Message.error('您登录过于频繁，请联系管理员')
            //         } else {
            //             this.load = false
            //             this.$Message.error('系统异常')
            //         }
            //     },
            //     errFn: () => {
            //         this.load = false
            //     }
            // })
        },
        /**
         * [handleLogin 登录成功后操作]
         * 1. 存储systemId信息
         * 2. 获取菜单，全量菜单数据
         */
        handleLogin () {
            // setStore('systemId', 1000)
            // if (!this.loginData.roleCode) {
            //     this.$Message.error('您的账号尚未配置角色，请发申请配置')
            //     this.load = false
            //     return
            // }
            this.getNewMenuList().then((res) => {
                this.$router.push('dashboard')
            })
        },
        /**
         * [getNewMenuList 获取菜单]
         */
        getNewMenuList () {
            // let self = this
            return new Promise((resolve, reject) => {
                this.$$api_login_getIndexMenuAndButton({
                    data: {
                        'token': getStore('token')
                    },
                    fn: (res) => {
                        if (res.data && res.data.menus && res.data.menus.length) {
                            setJSONStore('menuList', res.data.menus)
                            this.$store.dispatch('getMenuList', res.data.menus)
                            // self.loginSucess()
                            this.$router.push('/dashboard')
                            resolve(res)
                        } else {
                            setStore('menuList', '')
                        }
                        // if (!getStore('menuList')) {
                        //     this.load = false
                        //     this.$Message.error('您没有权限')
                        //     return
                        // }
                        resolve(res)
                    },
                    errFn: (data) => {
                        if (data && data.code == '-10049') {
                            this.$Message.error('您的账号尚未配置角色，请发its申请配置')
                        }
                        this.load = false
                    }
                })
            // })
            // return new Promise((resolve, reject) => {
            //     self.$$api_common_query({
            //         path: location.origin + '/mocks/usercenter/getIndexMenuAndButton',
            //         type: 'get',
            //         data: {},
            //         fn: (res) => {
            //             if (res.data && res.data.menus && res.data.menus.length) {
            //                 setJSONStore('menuList', res.data.menus)
            //                 this.$store.dispatch('getMenuList', res.data.menus)
            //                 // self.loginSucess()
            //                 resolve(res)
            //             } else {
            //                 setStore('menuList', '')
            //             }
            //         // if (!getStore('menuList')) {
            //         //     this.load = false
            //         //     this.$Message.error('您没有权限')
            //         //     return
            //         // }
            //         }
            //     })
            })
        },
        // TODO 获取全量菜单
        // getAllMenuList () {
        //     this.$$api_login_tree({
        //         data: {
        //             'roleId': null,
        //             'systemId': getStore('systemId')
        //         },
        //         fn: (data) => {
        //             if (data && data.data && data.data.length) {
        //                 setJSONStore('menuListAll', data.data)
        //             } else {
        //                 setStore('menuListAll', '')
        //             }
        //             this.loginSucess()
        //         },
        //         errFn: () => {
        //             this.load = false
        //         }
        //     })
        // },
        /**
         * [loginSucess 登录成功]
         * 1.存储user信息
         * 2.页面跳转处理
         * @return   {[type]}                 [description]
         */
        loginSucess () {
            this.setUserInfo()
            this.setUserRole()
            let url = ''
            if (getStore('zntargeturl') && getStore('zntargeturl').indexOf('login') == -1) {
                url = getStore('zntargeturl')
                location.href = url
                console.log(url, 2001)
            } else {
                console.log(url, 2002)
            }
        },
        // 判断是否有需求池系统权限
        isHaveAuth (list, _hashStr) {
            let flag = false
            if (list && list.length) {
                for (let i = 0, len = list.length; i < len; i++) {
                    let item = list[i]
                    if (item.childs && item.childs.length) {
                        let str = JSON.stringify(item.childs)
                        if (str.indexOf(_hashStr) !== -1) {
                            flag = true
                            break
                        }
                    }
                }
            }
            return flag
        },
        setUserInfo () {
            let obj = {
                userId: Number(this.loginData.userId),
                sessionId: '1',
                username: this.loginData.userName,
                roleCode: this.loginData.roleCode,
                userNameZh: this.loginData.userNameZh,
                pwd: this.form.password
            }
            // store存储备份
            setJSONStore('znUserdata', obj)
        },
        removeUserInfo () {
            removeStore('znUserdata')
            removeStore('menuList')
            removeStore('menuListAll')
            removeStore('childrenmenuList')
            removeStore('systemId')
            removeStore('znUserRoledata')
            removeStore('znAes')
        },
        setUserRole () {
            let roleDtoListArr = this.loginData.roleCodeList // 多个角色列表
            let obj = {
                roleCode: roleDtoListArr.toString()
            }
            setJSONStore('znUserRoledata', obj)
        },
        /* 登录界面动画 */
        screenBg () {
            if (document.getElementsByTagName('canvas') && document.getElementsByTagName('canvas').length > 0) {
                document.getElementById('screenBg').innerHTML = ''
            }
            var SCREEN_WIDTH = window.innerWidth
            var SCREEN_HEIGHT = window.innerHeight
            var SEPARATION = 90
            var AMOUNTX = 50
            var AMOUNTY = 50
            var container
            var particles, particle
            var count
            var camera
            var scene
            var renderer
            var mouseX = 0
            var windowHalfX = window.innerWidth / 2
            init()
            this.interval = setInterval(loop, 1000 / 60)
            function init () {
                container = document.createElement('div')
                container.style.position = 'relative'
                container.style.top = '200px'
                document.getElementById('screenBg').appendChild(container)

                camera = new THREE.Camera(60, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000)
                // camera = new THREE.PerspectiveCamera(60, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 20000)
                camera.position.z = 1000

                scene = new THREE.Scene()

                renderer = new THREE.CanvasRenderer()
                renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

                particles = []

                var i = 0
                var material = new THREE.ParticleCircleMaterial(0x556171, 1)

                for (var ix = 0; ix < AMOUNTX; ix++) {
                    for (var iy = 0; iy < AMOUNTY; iy++) {
                        particle = particles[i++] = new THREE.Particle(material)
                        particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2)
                        particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2)
                        scene.add(particle)
                    }
                }
                count = 0
                container.appendChild(renderer.domElement)
                document.addEventListener('mousemove', onDocumentMouseMove, false)
            }

            function onDocumentMouseMove (event) {
                mouseX = event.clientX - windowHalfX
            }

            function loop () {
                camera.position.x += (mouseX - camera.position.x) * 0.05
                camera.position.y = 364
                var i = 0
                for (var ix = 0; ix < AMOUNTX; ix++) {
                    for (var iy = 0; iy < AMOUNTY; iy++) {
                        particle = particles[i++]
                        particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50)
                        particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2
                    }
                }

                renderer.render(scene, camera)
                count += 0.1
            }
            this.interval = null
        }
    },
    watch: {
        screenWidth (val) {
            if (!this.timer) {
                this.screenWidth = val
                this.timer = true
                setTimeout(() => {
                    this.screenBg()
                    this.timer = false
                }, 400)
            }
        }
    },
    beforeMount () {
        try {
            DA.init()
        } catch (e) {
            console.log(e)
        }
    },
    mounted: function () {
        const _this = this
        _this.screenBg()
        window.onresize = () => {
            return (() => {
                _this.screenWidth = document.body.clientWidth
            })()
        }
    },
    components: {
        Verify
    }
}
</script>

<style lang='less' scoped>
.blockOverlay {
    z-index: 1000;
    border: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: rgb(85, 85, 85);
    opacity: 0.05;
    cursor: wait;
    position: fixed;
}

.blockMsg{
    z-index: 1011;
    position: fixed;
    padding: 10px;
    margin: 0px;
    width: 30%;
    top: 40%;
    left: 35%;
    text-align: center;
    color: rgb(0, 0, 0);
    border: 1px solid rgb(221, 221, 221);
    background-color: rgb(238, 238, 238);
    cursor: wait;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 8px;
}
.forgot-btn {
    color: #45b6af;
    float: right;
    margin-right: 30px;
}
</style>
