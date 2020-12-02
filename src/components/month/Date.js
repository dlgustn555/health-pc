import React from 'react'
import {Link} from 'react-router-dom'
import className from 'classnames/bind'

import ROUTES from 'constants/routes'
import {useMonthContext} from 'contexts'
import calendar from 'utils/calendar'

import ProgramName from 'components/month/ProgramName'

import styles from './Date.module.scss'
const cx = className.bind(styles)

const Date = ({date = null}) => {
    const {year, month, diaries} = useMonthContext()
    const {date: toDate} = calendar
    const isToDate = toDate === date
    const diary = diaries.find((d) => {
        console.log(d)
        return +d.year === +year && +d.month === +month && +d.date === +date
    })

    console.log(diary)
    return (
        <div className={cx('wrapper')}>
            <span className={cx('date', {toDate: isToDate})}>{date}</span>
            <div className={cx('program')}>
                <ProgramName diary={diary} date={date} />
            </div>
            <ul>
                <li>
                    <Link to={`${ROUTES.PLAN}?year=${year}&month=${month}&date=${date}`}>
                        PLAN
                    </Link>
                </li>
                <li>
                    <Link to={`${ROUTES.PRACTICE}?date=${date}`}>PRACTICE</Link>
                </li>
            </ul>
        </div>
    )
}

export default Date
