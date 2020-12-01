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
    const {year, month} = useMonthContext()
    const {date: toDate} = calendar
    const isToDate = toDate === date

    return (
        <div className={cx('wrapper')}>
            <div className={cx('program')}>
                <span className={cx({toDate: isToDate})}>{date}</span>
                <ProgramName date={date} />
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
