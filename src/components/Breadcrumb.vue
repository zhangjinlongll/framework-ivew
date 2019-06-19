<template>
<ol class="breadcrumb">
    <li class="breadcrumb-item">
        <span class="title_span"></span>
        <a href="javascript:void(0)">{{ list }}</a>
    </li>
</ol>
</template>

<script>
export default {
    props: {
        list: {}
    },
    methods: {
        isLast (index) {
            return index === this.list.length - 1
        },
        showName (item) {
            if (item.meta && item.meta.label) {
                item = item.meta && item.meta.label
            }
            if (item.name) {
                item = item.name
            }
            return item
        }
    }
}
</script>
