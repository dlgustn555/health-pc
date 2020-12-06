import api from 'utils/api'

export const createDiaryStore = () => ({
    selectedMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    },
    diaries: [],
    diary: {
        _id: null,
        program: '',
        plan: [],
        practice: []
    },

    // "YYYY. M" 월의 다이어리를 조회한다.
    async getMonthDiaries() {
        const {year, month} = this.selectedMonth
        const {success, result:{data}} = await api.get(`/diary/month`, { params: {year, month}})

        if (success) {
            this.diaries = data
        }
        return this.diaries
    },
    
    // 현재 선택한 YYYY.M을 변경한다.
    changeSelectedMonth(changeMonth) {
        this.selectedMonth = changeMonth
    },

    // 신규 프로그램을 추가한다.
    async addProgram({year, month, date, order, program}) {
        const {success, result: {data}} = await api.post('/diary/program/add', {year, month, date, order, program})
        if (!success) {
            return
        }
        this.diaries = [...this.diaries, data]
    },

    // 선택한 프로그램을 수정한다.
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
    },

    // 선택한 다이어리를 조회한다.
    async getDiary({_id}) {
        const {success, result: {data}} = await api.get(`/diary/content/${_id}`)

        if (success) {
            this.diary = data
        }
        return this.diary   
    }
})