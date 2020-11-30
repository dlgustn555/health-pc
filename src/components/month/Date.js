import React from 'react'
import {Link} from 'react-router-dom'
import className from 'classnames/bind'

import ROUTES from 'constants/routes'
import {useMonthContext} from 'contexts'

import DateProgram from 'components/month/DateProgram'

import styles from './Date.module.scss'
const cx = className.bind(styles)

const Date = ({date = null}) => {
    const {year, month} = useMonthContext()

    return (
        <div className={cx('wrapper')}>
            <DateProgram date={date} />
            <ul>
                <li>
                    <Link to={`${ROUTES.PLAN}?year=${year}&month=${month}&date=${date}`} >
                        PLAN
                    </Link>
                </li>
                <li>
                    <Link to={`${ROUTES.PRACTICE}?date=${date}`} >
                        PRACTICE
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Date
