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
        return this.diaries
    },
    
    changeSelectedMonth(changeMonth) {
        this.selectedMonth = changeMonth
    },

    async addProgram({year, month, date, order, program}) {
        const {success, result: {data}} = await api.post('/diary/program/add', {year, month, date, order, program})
        if (!success) {
            return
        }
        this.diaries = [...this.diaries, data]
    },

    async updateProgram({_id, order, program}) {
        const {success, result: {data}} = await api.patch('/diary/program/modify', {_id, order, program})
        if (!success) {
            return
        }
        
        this.diaries = this.diaries.map((diary) => {
            if (diary._id === data._id) {
                diary.program = data.program
            }
            console.log(diary)
            return diary
        })
    }
})