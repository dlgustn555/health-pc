import React from 'react'
import {observer} from 'mobx-react-lite'
import {useHistory} from 'react-router-dom'
import className from 'classnames/bind'

import ROUTES from 'constants/routes'
import calendar from 'utils/calendar'

import ProgramName from 'components/month/ProgramName'

import {useDiaryStore} from 'contexts'

import styles from './Date.module.scss'
const cx = className.bind(styles)

const Date = observer(({date = null}) => {
    const {
        selectedMonth: {year, month},
        diaries,
    } = useDiaryStore()
    const {today} = calendar
    const history = useHistory()

    const isToDate = today.year === year && today.month === month && today.date === date
    const todayDiaries = diaries.filter((diary) => (diary.year === year && diary.month === month && diary.date === date))
    todayDiaries.push({_id: null, program: '', year, month, date})
    
    const handleDoubleClick = (diary) => (event) => {
        if (diary._id) {
            history.push(`${ROUTES.PROGRAM}/${diary._id}`)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <span className={cx('date', {toDate: isToDate})}>{date}</span>
            {todayDiaries.map((diary, order) => {
                diary.order = order
                return (
                    <div key={order} className={cx('program')} onDoubleClick={handleDoubleClick(diary)}>
                        <ProgramName diary={diary} />
                    </div>
                )
            })}
        </div>
    )
})

export default Date
