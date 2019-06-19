import utils from './utils'

// 必填
const required = (rule, value, callback) => {
    if (value !== '' && value !== null && value !== undefined) {
        callback()
    } else {
        callback(new Error('必填项目'))
    }
}

// 空数组
const requiredArr = (rule, value, callback) => {
    if (value !== '' && value !== null && value !== undefined && value.length !== 0 && (value.length && value[0] !== '' && value[1] !== '')) {
        callback()
    } else {
        callback(new Error('必填项目'))
    }
}

// 省市区必填
const requiredArea = (rule, value, callback) => {
    if (value.provincesId !== null && value.cityId !== null && value.areaId !== null && value.provincesId !== '' && value.cityId !== '' && value.areaId !== '') {
        callback()
    } else {
        callback(new Error('必填项目'))
    }
}

// 评分校验
const requiredRate = (rule, value, callback) => {
    if (value !== '' && value !== null && value !== 0) {
        callback()
    } else {
        callback(new Error('必填项目'))
    }
}

// 封装表单校验
const requiredDatePart = (rule, value, callback) => {
    console.log(value, 41)
    if (value !== '' && value !== null && value !== undefined && value.length !== 0 && (value.startTime !== '' && value.endTime !== '') && (value.startTime !== undefined && value.endTime !== undefined) && (value.startTime !== null && value.endTime !== null)) {
        callback()
    } else {
        callback(new Error('必填项目'))
    }
}

// 正整数
const intTest = (rule, value, callback) => {
    let reg = /^[0-9]*[1-9][0-9]*$/
    if (reg.test(value) || value === '') {
        callback()
    } else {
        callback(new Error('必须为正整数！'))
    }
}

// 手机号码格式校验
const phoneTest = (rule, value, callback) => {
    if (utils.phoneTest(value)) {
        callback()
    } else {
        callback(new Error('手机号码格式不正确'))
    }
}

// 富文本编辑器校验
const isEditorNull = (rule, value, callback) => {
    let reg = /^<p><br><\/p>$/g
    if (!reg.test(value) && value !== '') {
        callback()
    } else {
        callback(new Error('内容不能为空'))
    }
}
// 大于等于0的两位小数
const price2 = (rule, value, callback) => {
    let reg = /^(([1-9]+\d*)|([1-9]+\d*\.\d{1,2})|[0].[1-9]|[0].[0-9][1-9])$/
    if (reg.test(value) || value === '' || value == 0) {
        callback()
    } else {
        callback(new Error('请填写两位小数的正数'))
    }
}
// 大于等于0的三位小数
const price3 = (rule, value, callback) => {
    let reg = /^(([1-9]+\d*)|([1-9]+\d*\.\d{1,3})|[0].[0-9]\d*|[0].[0-9][0-9]\d*|[0].[0-9][0-9][0-9])$/
    if (reg.test(value) || value === '' || value == 0) {
        callback()
    } else {
        callback(new Error('请填写三位小数的正数'))
    }
}

// 大于0的三位小数
const number3 = (rule, value, callback) => {
    let reg = /^(([1-9]+\d*)|([0-9]+\d*\.\d{1,3}))$/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('请填写三位小数的正数'))
    }
}
// 最多100万
const price100 = (rule, value, callback) => {
    if ((parseFloat(value) >= 0 && parseFloat(value) <= 1000000) || value === '') {
        callback()
    } else {
        callback(new Error('请填写两位小数的正数'))
    }
}

// 八位订单号
const isOrder = (rule, value, callback) => {
    let reg = /^\d{8}$/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('请输入8位订单号'))
    }
}
// 1-10
const isNumber1 = (rule, value, callback) => {
    var reg = /^[1-9]+(.[0-9]{0,2})?$/
    if (value > 1 && value < 10 && reg.test(value)) {
        callback()
    } else {
        callback(new Error('请输入1~10之间的数,最多2位小数'))
    }
}
// 0-100内的两位数
const isTax = (rule, value, callback) => {
    var reg = /^(([0-9]+\d*)|([0-9]+\d*\.\d{1,2}))$/
    if (value >= 0 && value <= 100 && reg.test(value)) {
        callback()
    } else {
        callback(new Error('税点值介于0到100'))
    }
}

const idCardPass = (rule, value, callback) => {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (value === '') {
        callback(new Error('身份证号不能为空'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入正确的身份证号'))
    } else if (reg.test(value)) {
        callback()
    }
}
const mobile = (rule, value, callback) => {
    if (utils.mobile(value)) {
        callback()
    } else {
        callback(new Error('号码格式不正确'))
    }
}

// number
const number = (rule, value, callback) => {
    var reg = /^[0-9]*$/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('请输入整数'))
    }
}
// 大于0的数字
const greaterZero = (rule, value, callback) => {
    var reg = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('请输入大于零的数字'))
    }
}

// 非负浮点数 0 整数 小数
const nonnegativeFloat = (rule, value, callback) => {
    var reg = /^\d+(\.\d+)?$/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的数字'))
    }
}

const passwordReg = (rule, value, callback) => {
    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('请输入8位以上密码，需含大小写字母'))
    }
}

export default {
    required,
    requiredArr,
    requiredDatePart,
    requiredRate,
    requiredArea,
    intTest,
    phoneTest,
    isEditorNull,
    price2,
    price3,
    price100,
    isOrder,
    isNumber1,
    isTax,
    idCardPass,
    mobile,
    number,
    greaterZero,
    nonnegativeFloat,
    number3,
    passwordReg
}
