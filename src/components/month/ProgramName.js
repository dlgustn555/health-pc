import React, {useState, useRef, useEffect} from 'react'
import api from 'utils/api'
import className from 'classnames/bind'

import {useRecoilValue} from 'recoil'
import {getDiary} from 'stores/DiaryStore'

import styles from './ProgramName.module.scss'
const cx = className.bind(styles)

const ProgramName = ({year, month, date}) => {
    const diary = useRecoilValue(getDiary({year, month, date}))
    
    const [hide, setHide] = useState(true)
    const inputRef = useRef(null)

    // dispaly 상태를 토글한다.
    const handleToggleProramArea = () => {
        setHide(!hide)
    }

    // 프로그램명 텍스트 변경을 처리한다.
    const handleProgramChange = ({currentTarget: {value}}) => {
        diary.program = value
        // setDiary({...diary, program: value})
    }

    // 프로그래명 DB 업데이트를 한다
    const handleProramPatch = async (program) => {
        const {success} = await api.patch('/diary/program', {
            program,
            year,
            month,
            date
        })

        if (!success) {
            alert('업데이트 실패')
            return
        }
        // setDiary(data)
    }

    // input 태그 포커스 아웃이벤트를 처리한다.
    const handleProgramBlur = async ({currentTarget}) => {
        await handleProramPatch(currentTarget.value)
        handleToggleProramArea()
    }

    const handleKeyUp = ({keyCode}) => {
        if (keyCode === 13) {
            inputRef.current.blur()
        }
    }

    // input 태그 Show > input 태그에 auto focusing
    useEffect(() => {
        if (!inputRef) {
            return
        }

        const isInputHide = inputRef.current.classList.contains(cx('hide'))
        if (!isInputHide) {
            inputRef.current.focus()
        }
    }, [hide])

    return (
        <div onClick={handleToggleProramArea} className={cx('program')}>
            <span className={cx({hide: !hide})}>{diary.program}</span>
            <input
                ref={inputRef}
                className={cx('input', {hide: hide})}
                type="text"
                value={diary.program}
                onBlur={handleProgramBlur}
                onChange={handleProgramChange}
                onKeyUp={handleKeyUp}
            />
        </div>
    )
}

export default ProgramName
