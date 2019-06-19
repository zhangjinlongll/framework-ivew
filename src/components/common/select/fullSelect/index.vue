<template>
    <div class="ai-select">
        <Select v-model="aiSKey" :filterable="!aiSelectFilterable" :clearable="aiSelectClearable" :multiple="aiSelectMultiple" @on-change="aiChange" :placeholder="placeholder" :not-found-text="notFoundText"   :disabled="disabled">
            <Option v-for="item in aiSelectArr" :value="item[aiSelectKey]" :key="item[aiSelectKey]">{{ item[aiSelectName] }}</Option>
        </Select>
    </div>
</template>
<script>
    export default {
        props: {
            aiSelectKey: {},
            aiSelectName: {},
            aiSelectArr: {
                type: Array,
                default () {
                    return []
                }
            },
            disabled: {
                type: Boolean,
                default () {
                    return false
                }
            },
            aiSelectFilterable: {
                type: Boolean,
                default () {
                    return false
                }
            },
            aiSelectClearable: {
                type: Boolean,
                default () {
                    return true
                }
            },
            aiSelectMultiple: {
                type: Boolean,
                default () {
                    return false
                }
            },
            value: {},
            placeholder: {},
            notFoundText: {}
        },
        data () {
            return {
                aiSKey: this.value
            }
        },
        watch: {
            value (val) {
                this.aiSKey = this.value
            }
            // aiSKey (val) {
            //     this.$emit('input', val)
            // }
        },
        methods: {
            aiChange (val) {
                let _this = this
                let _data = null
                if (_this.aiSelectArr && _this.aiSelectArr.length) {
                    _this.aiSelectArr.forEach(function (v) {
                        if (v[_this.aiSelectKey] == val) {
                            _data = v
                        }
                    })
                }
                this.$emit('input', val)
                this.$emit('aiSelectChange', val, _data)
            }
        },
        mounted () {
            // this.aiSKey = this.value
            // this.getSelectOptions()
        }
    }
</script>
<style lang="less">
    .ai-select {
        // position: relative;
        .ivu-select-input {
            font-size: 14px !important;
        }
        .ivu-select-dropdown {
            box-shadow: none;
            border: 1px solid #e5e5e5;
            border-radius: 0;
            // top: 27px !important;
            .ivu-select-item {
                font-size: 13px !important;
            }
        }
        ::-webkit-scrollbar{
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-thumb{
            -webkit-border-radius:4px;
        }
        ::-webkit-scrollbar-thumb:hover{
            -webkit-border-radius:4px;
        }
    }
</style>
