import React from 'react';

const Plan = () => {
    
    return (
        <div>
            
        </div>
    );
};

export default Plan;

// import React, {useEffect, useState} from 'react'
// import queryStrign from 'query-string'
// import {useLocation} from 'react-router-dom'
// import className from 'classnames/bind'

// import api from 'utils/api'
// import {MonthContext} from 'contexts'

// import ProgramName from 'components/month/ProgramName'
// import Program from 'components/month/Program'

// import styles from './Plan.module.scss'

// import {DIARY_TYPE} from 'constants/calendar'

// const cx = className.bind(styles)

// const Plan = () => {
//     const {search} = useLocation()
//     const {year, month, date} = queryStrign.parse(search)

//     const [diary, setDiary] = useState({
//         program: '',
//         plan: '[]'
//     })

//     const handleAddDiary = () => {
//         console.log('handleAddDiary')
//     }

//     useEffect(() => {
//         api.get('/diary', {
//             params: {year, month, date}
//         }).then(({success, result: {data}}) => {
//             if (!success) {
//                 return
//             }
//             setDiary(data)
//         })
//     }, [year, month, date])

//     const plans = JSON.parse(diary.plan || '[]')
//     plans.push('')

//     return (
//         <MonthContext.Provider value={{
//             year, month
//         }}>
//         <div className={cx('plan')}>
//             <p>
//                 {year}. {+month + 1}. {date}
//             </p>
//             <p>PLAN</p>
//             <ProgramName diary={diary} date={date} />
//             {plans.map((plan, index) => (
//                 <div key={index}>
//                     <Program
//                         index={index}
//                         program={plan}
//                         type={DIARY_TYPE.PLAN}
//                         handleAddDiary={handleAddDiary}
//                     />
//                 </div>
//             ))}
//         </div>
//         </MonthContext.Provider>
//     )
// }
// export default Plan
