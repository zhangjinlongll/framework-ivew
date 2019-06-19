<template>
    <router-view></router-view>
</template>

<script>
import txtMarkFn from '@/utils/txtMark'
export default {
    name: 'znlhApp',
    watch: {
        '$route' (to, from) {
            this.txtMarkCallback(to.name)
        }
    },
    methods: {
        txtMarkCallback (urlNameStr) {
            var txtMarkObj = document.querySelector('.gTxtMark')
            if (urlNameStr != 'Login' && urlNameStr != 'forgot-pwd') {
                setTimeout(function () {
                    try {
                        var mData = JSON.parse(localStorage.aijiaUserdata)
                        var str = mData && mData.userNameZh ? '' + mData.userNameZh : ''
                        txtMarkFn({
                            content: str,
                            urlName: urlNameStr
                        })
                        if (txtMarkObj) {
                            txtMarkObj.style.display = 'block'
                        }
                    } catch (e) {
                    }
                }, 1000)
            } else {
                if (txtMarkObj) {
                    txtMarkObj.style.display = 'none'
                }
            }
        }
    },
    mounted: function () {
        this.txtMarkCallback(this.$route.name)
    }
}
</script>

<style>
/* Import Font Awesome Icons Set */

$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/css/font-awesome.min.css';
/* Import Simple Line Icons Set */

$simple-line-font-path: '~simple-line-icons/fonts/';
@import '~simple-line-icons/css/simple-line-icons.css';
/* Import Bootstrap Vue Styles */

@import '~bootstrap-vue/dist/bootstrap-vue.css';

</style>
<style lang="less">
/* Import iView Vue Styles */
@import '~iview/src/styles/index.less';
</style>

<style lang="scss">
/* Import Main styles for this application*/
@import './styles/scss/style';
/* Import customer Vue Styles */
@import './static/scss/theme/index';
</style>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
