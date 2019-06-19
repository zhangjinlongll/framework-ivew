<template>
<div class="animated fadeIn">
    <div class="welcome-pic">
        <img :src="contentImg">
    </div>
</div>
</template>


<script>
import {TOP_WELCOME_PIC} from '@/constants'
export default {
    data () {
        return {
            contentImg: TOP_WELCOME_PIC
        }
    },
    mounted () {}
}
</script>
