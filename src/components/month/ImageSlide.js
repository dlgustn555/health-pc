import React, {useState, useEffect} from 'react'
import {observer} from 'mobx-react-lite'

import {useDiaryStore} from 'contexts'

import DimmedLayer from 'components/common/DimmedLayer'

export const ImageSlideButton = ({children}) => {
    const [showImageSlide, toggleImageSlide] = useState(false)

    const handleShowImageSlide = () => {
        toggleImageSlide(true)
    }

    const handleCloseImageSlide = () => {
        toggleImageSlide(false)
    }

    return (
        <div>
            <button onClick={handleShowImageSlide}>{children}</button>
            {showImageSlide && <ImageSlide closeButton={handleCloseImageSlide} />}
        </div>
    )
}

const ImageSlide = observer(({closeButton}) => {
    const {diaries, getDiary} = useDiaryStore()
    const [isLoading, setIsLoaing] = useState(true)

    const emptyDiaries = diaries.length === 0

    useEffect(() => {
        if (emptyDiaries) {
            getDiary().then(() => {
                setIsLoaing(false)
            })
        } else {
            setIsLoaing(false)
        }
    }, [])

    if (isLoading) {
        return null
    }

    return (
        <DimmedLayer closeButton={closeButton}>
            <ul>
                {diaries.map(
                    (diary) =>
                        diary.images.length > 0 && (
                            <li key={diary._id}>
                                <p>
                                    {diary.year}.{diary.month + 1}.{diary.date} {diary.program}
                                </p>

                                <div>
                                    {diary.images.map((image, index) => (
                                        <img width={266} height={406} key={`${diary._id}_${index}`} src={image} />
                                    ))}
                                </div>
                            </li>
                        ),
                )}
            </ul>
        </DimmedLayer>
    )
})

export default ImageSlide
