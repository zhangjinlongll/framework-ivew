/**
 * 验证器工具
 */

const _argsTag = '[object Arguments]'
const _boolTag = '[object Boolean]'
const _dateTag = '[object Date]'
const _funcTag = '[object Function]'
const _numberTag = '[object Number]'
const _objectTag = '[object Object]'
const _regexpTag = '[object RegExp]'
const _arrayTag = '[object Array]'
const _stringTag = '[object String]'

/**
 * @private
 * [JS类型检测]
 * @param  {[Any]} arg [任何类型]
 * @return {[String]}     [arg toString后的类型展示]
 */
const _toStr = (arg) => {
    if (arg === undefined) {
        return undefined
    }
    return Object.prototype.toString.call(arg)
}

/**
 * [具体类型检测]
 * @param  {[Any]} arg [任何类型]
 * @return {[Boolean]}     [判断是否匹配当前的类型定义]
 */
const isArguments = (arg) => {
    return _toStr(arg) === _argsTag
}

const isBoolean = (arg) => {
    return _toStr(arg) === _boolTag
}

const isDate = (arg) => {
    return _toStr(arg) === _dateTag
}

const isFunction = (arg) => {
    return _toStr(arg) === _funcTag
}

const isNumber = (arg) => {
    return _toStr(arg) === _numberTag
}

const isObject = (arg) => {
    return _toStr(arg) === _objectTag
}

const isRegExp = (arg) => {
    return _toStr(arg) === _regexpTag
}

const isArray = (arg) => {
    if (Array.isArray) {
        return Array.isArray(arg)
    } else {
        return _toStr(arg) === _arrayTag
    }
}
const isString = (arg) => {
    return _toStr(arg) === _stringTag
}
/**
 * [手机号码校验]
 * @param  {[Number/"Number"]} phoneNum [手机号码]
 * @return {[Boolean]}     [符合规则返回ture，否在false]
 */
const isPhoneNum = (phoneNum) => {
    return /^1\d{10}/g.test(phoneNum)
}

export {
    isArguments,
    isBoolean,
    isDate,
    isFunction,
    isNumber,
    isObject,
    isRegExp,
    isArray,
    isString,
    isPhoneNum
}
