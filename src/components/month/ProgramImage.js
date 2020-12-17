import React, {useState} from 'react'
import {observer} from 'mobx-react-lite'
import classNames from 'classnames/bind'

import {useDiaryStore} from 'contexts'

import styles from './ProgramImage.module.scss'
const cx = classNames.bind(styles)

import emptyImg from 'images/empty.JPG'

const ProgramImage = observer(({order}) => {
    const {diary, updateUploadImage} = useDiaryStore()

    const [imageFile, setImageFile] = useState(diary.images[order])

    const reader = new FileReader()

    reader.onloadend = async () => {
        const success = await updateUploadImage({order, file: reader.result})
        if (success) {
            setImageFile(reader.result)
        }
    }

    const handleChangeImage = async ({currentTarget}) => {
        const file = currentTarget.files[0]
        reader.readAsDataURL(file)
    }

    return (
        <div className={cx('image_wrapper')}>
            <input id={`fileInput_${order}`} type="file" onChange={handleChangeImage} style={{display: 'none'}} />
            <label htmlFor={`fileInput_${order}`}>
                {imageFile ? <img src={imageFile} width={266} height={406} /> : <img src={emptyImg} />}
                <div>+ 이미지업로드</div>
            </label>
        </div>
    )
})

export default ProgramImage
