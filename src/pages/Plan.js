import React, {Suspense} from 'react'
import queryStrign from 'query-string'
import {useLocation} from 'react-router-dom'
import className from 'classnames/bind'

import ProgramName from 'components/month/ProgramName'
import Program from 'components/month/Program'

import {DIARY_TYPE} from 'constants/calendar'

import {useRecoilValue, useSetRecoilState} from 'recoil'
import {getMonthDiary, diariesState} from 'stores/DiaryStore'

import styles from './Plan.module.scss'



const cx = className.bind(styles)

const Plan = () => {
    const {search} = useLocation()
    const {year, month, date} = queryStrign.parse(search)
    const diaries = useRecoilValue(getMonthDiary({year, month}))
    useSetRecoilState(diariesState)(diaries)

    // const plans = JSON.parse(diary.plan || '[]')
    // plans.push('')

    return (
        
        <div className={cx('plan')}>
            <p>
                {year}. {+month + 1}. {date}
            </p>
            <p>PLAN</p>
            <Suspense fallback={<></>}>
            <ProgramName year={year} month={month} date={date} />
            {/* {plans.map((plan, index) => (
                <div key={index}>
                    <Program
                        index={index}
                        program={plan}
                        type={DIARY_TYPE.PLAN}
                        handleAddDiary={handleAddDiary}
                    />
                </div>
            ))} */}
            </Suspense>
        </div>
    )
}
export default Plan
