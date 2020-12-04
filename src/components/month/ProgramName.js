import React, {useState, useRef, useEffect} from 'react'
import className from 'classnames/bind'

import {useDiaryStore} from 'contexts'

import styles from './ProgramName.module.scss'

const cx = className.bind(styles)

const ProgramName = ({_id, date, program}) => {
    const {selectedMonth: {year, month}, updateProgram, addProgram} = useDiaryStore()

    const [hide, setHide] = useState(true)
    const [programName, setProgramName] = useState(program.name)

    const inputRef = useRef(null)

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
        program.name = programName
       if (program._id) {
            updateProgram({_id, program})
       } else {
            addProgram({year, month, date, program})
       }
    }

    // input 태그 포커스 아웃이벤트를 처리한다.
    const handleProgramBlur = async () => {
        await handleProramPatch()
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
