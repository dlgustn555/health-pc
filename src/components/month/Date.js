import React from 'react';
import {Link} from 'react-router-dom'
import className from 'classnames/bind'

import ROUTES from 'constants/routes'
import calendar from 'utils/calendar'

import styles from './Date.module.scss'
const cx = className.bind(styles)

const Date = ({date = null}) => {
    const {year, month, date: toDate} = calendar
    const isToDate = toDate === date

    return (
        <div className={cx('date')}>
            <div>
                <span className={cx({toDate: isToDate})}>{date}</span>
            </div>
            <ul>
                <li><Link to={`${ROUTES.PLAN.MAIN}?date=${year}${month}${date < 10 ? '0' : ''}${date}`}>PLAN</Link></li>
                <li><Link to={`${ROUTES.PRACTICE.MAIN}?date=${year}${month}${date < 10 ? '0' : ''}${date}`}>PRACTICE</Link></li>
            </ul>
        </div>
    );
};

export default Date;