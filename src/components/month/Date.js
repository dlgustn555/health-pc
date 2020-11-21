import React from 'react';
import className from 'classnames/bind'

import styles from './Date.module.scss'
const cx = className.bind(styles)

const Date = ({index, date = null}) => {
    return (
        <div className={cx('date')}>
            {date}
        </div>
    );
};

export default Date;