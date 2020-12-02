import React from 'react'
import {Link} from 'react-router-dom'
import className from 'classnames/bind'

import ROUTES from 'constants/routes'
import calendar from 'utils/calendar'

import ProgramName from 'components/month/ProgramName'

import {useRecoilValue} from 'recoil'
import {selectedMonthState} from 'stores/DiaryStore'

import styles from './Date.module.scss'
const cx = className.bind(styles)

const Date = ({date = null}) => {
    const {today} = calendar
    const isToDate = today.date === date
    const {year, month} = useRecoilValue(selectedMonthState)

    return (
        <div className={cx('wrapper')}>
            <span className={cx('date', {toDate: isToDate})}>{date}</span>
            <div className={cx('program')}>
                <ProgramName year={year} month={month} date={date} />
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
