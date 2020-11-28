const calendar = () => {
    const getMonthInfo = (year, month) => {
        const firstDate = new Date(year, month, 1)
        const lastDate = new Date(year, month + 1, 1)
        lastDate.setDate(0)

        return {
            year,
            month,
            first: {
                date: 1,
                day: firstDate.getDay()
            },
            last: {
                date: lastDate.getDate(),
                day: lastDate.getDay()
            },
            total: firstDate.getDay() + lastDate.getDate() + 6 - lastDate.getDay()
        }
    }

    const getYearMonth = (date) => ({
        year: date.getFullYear(),
        month: date.getMonth()
    })

    const toDate = new Date()

    const {year, month} = getYearMonth(toDate)
    const date = toDate.getDate()

    const prevMonthDate = new Date(year, month, 1)
    prevMonthDate.setDate(0)

    const nextMonthDate = new Date()
    nextMonthDate.setMonth(month + 1)

    return {
        year,
        month,
        date,
        thisMonth: getMonthInfo(year, month),
        prevMonth: getMonthInfo(prevMonthDate.getFullYear(), prevMonthDate.getMonth()),
        nextMonth: getMonthInfo(nextMonthDate.getFullYear(), nextMonthDate.getMonth()),
        getMonthInfo,
        getYearMonth
    }
}

export default calendar()
