import api from 'utils/api'

export const createDiaryStore = () => ({
    selectedMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    },
    diaries: [],

    async getMonthDiaries() {
        const {year, month} = this.selectedMonth
        const {success, result:{data}} = await api.get(`/diary/month`, { arams: {year, month}})

        if (success) {
            this.diaries = data
        }
    },

    changeSelectedMonth(changeMonth) {
        this.selectedMonth = changeMonth
    }
})