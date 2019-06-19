import utils from './utils'

export default function install (Vue) {
    Vue.filter('NoToChinese', utils.NoToChinese)
    Vue.filter('NumberToChinese', utils.NumberToChinese)
    Vue.filter('cut', utils.cut)
    Vue.filter('customCurrency', utils.customCurrency)
    Vue.filter('currency', utils.currency)
    Vue.filter('dateFormate', utils.dateFormate)
    Vue.filter('query', utils.query)
    Vue.filter('jsonParse', utils.jsonParse)
    Vue.filter('imageTrim', utils.imageTrim)
    Vue.filter('yearMonthDay', utils.yearMonthDay)
    Vue.filter('noRepeat', utils.noRepeat)
    Vue.filter('getRoomType', utils.getRoomType)
    Vue.filter('getStyleText', utils.getStyleText)
    Vue.filter('getEmployeeName', utils.getEmployeeName)
    Vue.filter('number2', utils.number2)
    Vue.filter('number0', utils.number0)
    Vue.filter('number100', utils.number100)
}
