import api from 'utils/api'

export const createDiaryStore = () => ({
    selectedMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    },
    diaries: [],

    async getMonthDiaries() {
        const {year, month} = this.selectedMonth
        const {success, result:{data}} = await api.get(`/diary/month`, { params: {year, month}})

        if (success) {
            this.diaries = data
        }
    },
    
    changeSelectedMonth(changeMonth) {
        this.selectedMonth = changeMonth
    },

    async updateProgram({_id, program}) {
        const {success, result: data} = await api.patch('/diary/program/modify', {_id, program})
        console.log(success, data)
    },

    async addProgram({year, month, date, program}) {
        const {success, result: data} = await api.patch('/diary/program/add', {year, month, date, program})
        console.log(success, data)
    }
})