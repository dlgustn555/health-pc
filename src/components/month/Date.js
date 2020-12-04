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
        diaries
    } = useDiaryStore()
    const {today} = calendar

    const isToDate = today.year === year && today.month === month && today.date === date
    const {_id, programs} = diaries.find((d) => d.year === year && d.month === month && d.date === date) || {programs: []}

    return (
        <div className={cx('wrapper')}>
            <span className={cx('date', {toDate: isToDate})}>{date}</span>
            <div className={cx('program')}>
                {programs.map((program, key) => (
                    <Link key={key} to={ROUTES.PLAN}><ProgramName date={date} program={program} /></Link>
                ))}
                <ProgramName _id={_id} date={date} program={{name: ''}} />
            </div>
        </div>
    )
})

export default Date
