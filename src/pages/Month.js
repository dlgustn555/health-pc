import React from 'react';
import classNames from 'classnames/bind'

import calendar from 'utils/calendar'
import {DAY} from 'constants/calendar'

import styles from './Month.module.scss'

import Header from 'components/month/Header'
import Date from 'components/month/Date'

const cx = classNames.bind(styles)

const Month = () => {
    const {thisMonth: {first, last}} = calendar

    return (
        <div className={cx('month-wrapper')}>
            <Header start={DAY.SUNDAY} />
            {Array.from(Array(42)).map((_, index) => {
                const date = first.day <= index ? first.date + index : null

                return (
                    <Date key={index} date={date > last.date ? null : date} />
                )
            }) }
        </div>
    );
};

export default Month;