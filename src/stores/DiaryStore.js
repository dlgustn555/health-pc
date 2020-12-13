import api from 'utils/api'

export const createDiaryStore = () => ({
    selectedMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
    },
    diaries: [],
    diary: {
        _id: null,
        program: '',
        plan: [],
        practice: [],
    },

    // 현재 선택한 YYYY.M을 변경한다.
    changeSelectedMonth(changeMonth) {
        this.selectedMonth = changeMonth
    },

    // "YYYY. M" 월의 다이어리를 조회한다.
    async getMonthDiaries() {
        const {year, month} = this.selectedMonth
        const {
            success,
            result: {data},
        } = await api.get(`/diary/month/diaries`, {params: {year, month}})

        if (success) {
            this.diaries = data
        }
        return this.diaries
    },

    // 신규 "프로그램명" 을 추가한다.
    async addProgramName({year, month, date, order, program}) {
        const {
            success,
            result: {data},
        } = await api.post('/diary/program/name', {year, month, date, order, program})
        if (!success) {
            return
        }
        this.diaries = [...this.diaries, data]
    },

    // 선택한 "프로그램명" 을 수정한다.
    async updateProgramName({_id, order, program}) {
        const {
            success,
            result: {data},
        } = await api.patch('/diary/program/name', {_id, order, program})
        if (!success) {
            return
        }

        this.diaries = this.diaries.map((diary) => {
            if (diary._id === data._id) {
                diary.program = data.program
            }
            return diary
        })
    },

    // 선택한 다이어리를 조회한다.
    async getDiary({_id}) {
        const {
            success,
            result: {data},
        } = await api.get(`/diary/${_id}`)

        if (success) {
            this.diary = data
        }
        return this.diary
    },

    // Plan or Practice 프로그램 내용을 수정한다.
    async updateProgram({order, program, type}) {
        const {_id} = this.diary
        const {
            success,
            result: {data},
        } = await api.patch('/diary/program/content', {_id, order, program, type})

        if (success) {
            this.diary = {
                ...this.diary,
                [type]: [...data[type]],
            }
        }
    },

    // 프로그램을 삭제한다.
    async deleteProgram({_id}) {
        const {
            success,
            result: {data},
        } = await api.delete(`/diary/program/delete/${_id}`)

        if (success) {
            const filtredDiaryies = this.diaries.filter((diary) => diary._id !== data._id)
            this.diaries = filtredDiaryies
        }

        return success
    },

    // 프로그램 내용을 삭제한다.
    async deleteProgramContent({order, type}) {
        const {_id} = this.diary
        const {
            success,
            result: {data},
        } = await api.put('/diary/program/content', {_id, order, type})

        if (success) {
            this.diary = {
                ...this.diary,
                [type]: [...data[type]],
            }

            this.diaries = this.diaries.map((diary) => {
                return diary._id === data._id ? data : diary
            })
        }

        return success
    },
})
