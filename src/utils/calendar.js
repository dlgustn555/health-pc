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

    const getPrevMonth = (year, month) => {
        const prevMonthDate = new Date(year, month, 1)
        prevMonthDate.setDate(0)
        return getMonthInfo(prevMonthDate.getFullYear(), prevMonthDate.getMonth())
    }

    const getNextMonth = (year, month) => {
        const nextMonthDate = new Date(year, month)
        nextMonthDate.setMonth(month + 1)
        return getMonthInfo(nextMonthDate.getFullYear(), nextMonthDate.getMonth())
    }

    const toDate = new Date()
    const today = {
        year: toDate.getFullYear(),
        month: toDate.getMonth(),
        date: toDate.getDate()
    }

    return {
        today,
        getMonthInfo,
        getPrevMonth,
        getNextMonth
    }
}

export default calendar()
