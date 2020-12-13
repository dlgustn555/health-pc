import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import classNames from 'classnames/bind'

import {useDiaryStore} from 'contexts'

import ProgramName from 'components/month/ProgramName'
import ProgramContent from 'components/month/ProgramContent'
import ProgramImage from 'components/month/ProgramImage'

import {PROGRAM_TYPE} from 'constants/calendar'

import styles from './ProgramDetail.module.scss'
const cx = classNames.bind(styles)

const ProgramDetail = observer(({match}) => {
    const {_id} = match.params
    const {diary, getDiary} = useDiaryStore()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getDiary({_id}).finally(() => {
            setIsLoading(false)
        })
    }, [_id])

    if (isLoading) {
        return null
    }

    return (
        <div className={cx('program_wrapper')}>
            <ProgramName diary={diary} />
            <div className={cx('program_list')}>
                <div className={cx('program')}>
                    <ProgramContent type={PROGRAM_TYPE.PLAN} />
                </div>
                <div className={cx('program')}>
                    <ProgramContent type={PROGRAM_TYPE.PRACTICE} />
                </div>
            </div>
            <div style={{width: '100%'}}>
                <ProgramImage />
                <ProgramImage />
                <ProgramImage />
            </div>
        </div>
    )
})

export default ProgramDetail
