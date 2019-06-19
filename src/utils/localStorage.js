const _LS = window.localStorage

export function getStore (key) {
    return _LS.getItem(key)
}

export function setStore (key, value) {
    return _LS.setItem(key, value)
}

export function removeStore (key) {
    return _LS.removeItem(key)
}

export function getJSONStore (key) {
    return JSON.parse(_LS.getItem(key))
}

export function setJSONStore (key, value) {
    return _LS.setItem(key, JSON.stringify(value))
}
