const clickHide = '@@clickHide';
export default function install (Vue) {
    Vue.directive('click-hide', {
        bind (el, binding, vnode) {
            const documentHandler = function(e) {
                if(!vnode.context || el.contains(e.target)) {
                    return false;
                }
                if (binding.expression) {
                    vnode.context[el[clickHide].methodName](e)
                } else {
                    el[clickHide].bindingFn(e);
                }
            }
            el[clickHide] = {
                documentHandler,
                methodName: binding.expression,
                bindingFn: binding.value
            }
            setTimeout( () => {
                document.addEventListener('click', documentHandler);
            }, 0)
        },
        update (el, binding) {
            el[clickHide].methodName = binding.expression;
            el[clickHide].bindingFn = binding.value;
        },
        unbind(el) {
            document.removeEventListener('click', el[clickHide].documentHandler);
        }
    })
}
