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

export const getMonthDiaryState = selectorFamily({
    key: 'getMonthDiaryState',
    get: ({year, month}) => async () => {
        const {
            success,
            result: {data}
        } = await api.get(`/diary/month`, {params: {year: +year, month: +month}})
        return success ? data : []
    },
    set: () => ({set}, newDiaries) => {
        set(diariesState, newDiaries)
    }
})

export const getDiaryState = selectorFamily({
    key: 'getDiaryState',
    get: ({year, month, date}) => ({get}) => {
        const diaries = get(diariesState)
        const findDiary = diaries.find(
            (d) => d.year === +year && d.month === +month && d.date === +date
        )
        return findDiary ? findDiary : {program: '', plan: [], practice: []}
    }
})

export const updateDiaryState = selectorFamily({
    key: 'updateDiaryState',
    get: ({year, month, date}) => ({get}) => {
        return get(getDiaryState({year, month, date}))
    },
    set: ({program, year, month, date}) => async ({set}) => {
        const {
            success,
            result: {data}
        } = await api.patch('/diary/program', {
            program,
            year,
            month,
            date
        })

        set(diariesState, [])
    }
})
