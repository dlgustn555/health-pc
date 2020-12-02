import api from 'utils/api'
import {atom, selectorFamily} from 'recoil'

export const diariesState = atom({
    key: 'diariesState',
    default: []
})

export const selectedMonthState = atom({
    key: 'selectedDateState',
    default: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    }
})

export const getMonthDiary = selectorFamily({
    key: 'getMonthDiary',
    get: ({year, month}) => async () => {
        const {success, result: {data}} = await api.get(`/diary/month`, {params: {year, month}})
        return success ? data : []
    }
})

export const getDiary = selectorFamily({
    key: 'diaryState',
    get: ({year, month, date}) => ({get}) => {
        const diaries = get(diariesState)
        const findDiary = diaries.find((d) => d.year === +year && d.month === +month && d.date === +date)
        return findDiary ? findDiary : {program: '', plan: [], practice: []}
    },
    set: (program) => ({set}) => {
        set()
    }
})