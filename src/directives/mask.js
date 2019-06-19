export default function install (Vue) {
    Vue.directive('mask', {  
        bind (el, binding, vnode) {
            var div = document.createElement("div")
            div.setAttribute("class", "ai-mask")
            el.appendChild(div)
        },
        update (el, binding) {
            el.querySelectorAll('.ai-mask')[0].style.height = el.clientHeight + "px"
            el.querySelectorAll('.ai-mask')[0].style.top = el.scrollTop + "px"    
        }
    })
}