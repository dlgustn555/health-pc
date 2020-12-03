import React, {Suspense} from 'react'
import queryStrign from 'query-string'
import className from 'classnames/bind'

import ProgramName from 'components/month/ProgramName'
// import Program from 'components/month/Program'

import {useRecoilState, useRecoilValue} from 'recoil'
import {getMonthDiaryState, getDiaryState} from 'stores/DiaryStore'

import styles from './Plan.module.scss'

const cx = className.bind(styles)

const Plan = ({location}) => {
    const {search} = location
    const {year, month, date} = queryStrign.parse(search)

    const [diaries, setDiaries] = useRecoilState(getMonthDiaryState({year, month}))
    setDiaries(diaries)
    const diary = useRecoilValue(getDiaryState({year, month, date}))

    console.log(diaries)
    return (
        <div className={cx('plan')}>
            <p>
                {year}. {+month + 1}. {date}
            </p>
            <p>PLAN</p>
            <Suspense fallback={<></>}>
                <ProgramName diary={diary} />
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
