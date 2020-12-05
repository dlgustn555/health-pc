import React, {useState, useRef, useEffect} from 'react'
import className from 'classnames/bind'

import {useDiaryStore} from 'contexts'

import styles from './ProgramName.module.scss'

const cx = className.bind(styles)

const ProgramName = ({_id = null, program = '', order, date}) => {
    const {selectedMonth: {year, month}, updateProgram, addProgram} = useDiaryStore()

    const [hide, setHide] = useState(true)
    const [programName, setProgramName] = useState(program)

    const inputRef = useRef(null)

    const isNewDiary = !_id

    // dispaly 상태를 토글한다.
    const handleToggleProramArea = () => {
        setHide(!hide)
    }

    // 프로그램명 텍스트 변경을 처리한다.
    const handleProgramChange = ({currentTarget: {value}}) => {
        setProgramName(value)
    }

    // 프로그래명 DB 업데이트를 한다
    const handleProramPatch = async () => {
        if (programName.length === 0 || programName === program) {
            return 
        }

        const fnCall = isNewDiary ? addProgram : updateProgram
        await fnCall({
            _id,
            year,
            month,
            date,
            program: programName,
            order
        })
    }

    // input 태그 포커스 아웃이벤트를 처리한다.
    const handleProgramBlur = async () => {
        await handleProramPatch()
        handleToggleProramArea()
        if (programName.length === 0) {
            setProgramName(program) 
        }
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
            <span className={cx({hide: !hide})}>{programName}</span>
            <input
                ref={inputRef}
                className={cx('input', {hide: hide})}
                type="text"
                value={programName}
                onBlur={handleProgramBlur}
                onChange={handleProgramChange}
                onKeyUp={handleKeyUp}
            />
        </div>
    )
}

export default ProgramName
