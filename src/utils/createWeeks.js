// 计算一年有多少周， 并展示日期范围
function formatDig (num) {
    return num > 9 ? '' + num : '0' + num
}

function formatDate (mill) {
    var y = new Date(mill)
    let raws = [
        y.getFullYear(),
        formatDig(y.getMonth() + 1),
        formatDig(y.getDate())
    ]
    // let format = ['年', '月']
    return String.raw({raw: raws})
}

function *createWeeks (year) {
    const ONE_DAY = 24 * 3600 * 1000
    let start = new Date(year, 0, 1)
    let end = new Date(year, 11, 31)
    let firstDay = start.getDay() || 7
    let lastDay = end.getDay() || 7
    let startTime = +start
    let endTime = startTime + (7 - firstDay) * ONE_DAY
    let _endTime = end - (7 - lastDay) * ONE_DAY
    yield [startTime, endTime]
    startTime = endTime + ONE_DAY
    endTime = endTime + 7 * ONE_DAY
    while (endTime < _endTime) {
        yield [startTime, endTime]
        startTime = endTime + ONE_DAY
        endTime = endTime + 7 * ONE_DAY
    }
    yield [startTime, +end]
}

function getWeek (year) {
    let weekArr = []
    let index = 1
    for (let i of createWeeks(year)) {
        let start = i[0]
        let end = i[1]
        let str = `第${index++}周（${formatDate(start)}~${formatDate(end)}）`
        weekArr.push({
            id: str,
            name: str
        })
    }
    return weekArr
}
export default getWeek
