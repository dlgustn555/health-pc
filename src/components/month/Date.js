import React from 'react';
import className from 'classnames/bind'

import calendar from 'utils/calendar'

import styles from './Date.module.scss'
const cx = className.bind(styles)

const Date = ({date = null}) => {
    const isToDate = calendar.date === date
    return (
        <div className={cx('date')}>
            <span className={cx({toDate: isToDate})}>{date}</span>
        </div>
    );
};

export default Date;