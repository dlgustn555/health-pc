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
    const diary = diaries.find((d) => {
        // console.log(typeof d.year, typeof d.month, typeof d.date)
        return d.year === year && d.month === month && d.date === date
    })

    return (
        <div className={cx('wrapper')}>
            <span className={cx('date', {toDate: isToDate})}>{date}</span>
            <div className={cx('program')}>
                <ProgramName date={date} />
            </div>
            {/* <ul>
                <li>
                    <Link to={`${ROUTES.PLAN}?year=${year}&month=${month}&date=${date}`}>
                        PLAN
                    </Link>
                </li>
                <li>
                    <Link to={`${ROUTES.PRACTICE}?date=${date}`}>PRACTICE</Link>
                </li>
            </ul> */}
        </div>
    )
})

export default Date
