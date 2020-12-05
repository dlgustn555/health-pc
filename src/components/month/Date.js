import React from 'react'
import {observer} from 'mobx-react-lite'
import {Link} from 'react-router-dom'
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

    const isToDate = today.year === year && today.month === month && today.date === date
    const todayDiaries = diaries.filter((diary) => (diary.year === year && diary.month === month && diary.date === date))
    todayDiaries.push({_id: null, program: ''})
    
    return (
        <div className={cx('wrapper')}>
            <span className={cx('date', {toDate: isToDate})}>{date}</span>
            <div className={cx('program')}>
                {todayDiaries.map((diary, order) => {
                    return (
                        <ProgramName key={order} _id={diary._id} program={diary.program} order={order} date={date} />
                    // <Link key={order} to={ROUTES.PLAN}>
                    //     <ProgramName _id={diary._id} program={diary.program} order={order} date={date} />
                    // </Link>
                )})}
            </div>
        </div>
    )
})

export default Date
