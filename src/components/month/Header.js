import React from 'react';
import className from 'classnames/bind'

import {DAY, days} from 'constants/calendar'

import styles from './Header.module.scss'
className.bind(styles)

const Header = ({start = DAY.MODAY}) => {
    return (
        <ul>
           {days[start].map((day, key) => (
               <li key={key}>{day}</li>
           ))}
        </ul>
    );
};

export default Header;