import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import classNames from 'classnames/bind'
import {useHistory} from 'react-router-dom'

import {useDiaryStore} from 'contexts'

import ProgramName from 'components/month/ProgramName'
import ProgramContent from 'components/month/ProgramContent'
import ProgramImage from 'components/month/ProgramImage'

import ROUTES from 'constants/routes'
import {PROGRAM_TYPE} from 'constants/calendar'

import styles from './ProgramDetail.module.scss'
const cx = classNames.bind(styles)

const ProgramDetail = observer(({match}) => {
    const {_id} = match.params
    const {diary, getDiary} = useDiaryStore()

    const [isLoading, setIsLoading] = useState(true)
    const {push} = useHistory()

    const handleBackButton = () => {
        push(ROUTES.MONTH)
    }

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
                <ProgramImage order={0} />
                <ProgramImage order={1} />
                <ProgramImage order={2} />
            </div>
            <div>
                <button onClick={handleBackButton}>목록으로</button>
            </div>
        </div>
    )
})

export default ProgramDetail
