export default function install (Vue) {
    Vue.directive('copyable', {     
        bind (el, binding, vnode) {
            el.onclick = function(){
                const vm = new Vue()
                var div = document.createElement("div")
                var body = document.getElementsByTagName('body')
                div.setAttribute("id", "copyableId")
                // console.log(binding.value)
                div.innerHTML = '&nbsp'
                var msg = ''
                if (typeof(binding.value) == 'object') {
                    if (binding.value.text) {
                        div.innerHTML = binding.value.text
                    }
                    if (binding.value.tips) {
                        msg = binding.value.tips
                    } else {
                        msg = '已复制'
                    }
                }
                body[0].appendChild(div)

                var range = document.createRange()
                range.selectNode(div) 
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(range) 
                var successful = document.execCommand('copy')

                //执行完毕删除  
                var oldElem = document.getElementById('copyableId')
                oldElem.parentNode.removeChild(oldElem)
                window.getSelection().removeAllRanges()

                if(successful){
                    vm.$Message.info({
                        content: msg
                    })
                }else{
                    alert('浏览器不支持复制')
                }
            }
        }
    })
}