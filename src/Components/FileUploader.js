import React from 'react';
import ImageUploading from 'react-images-uploading';

const FileUploader = (props) => {
    const maxNumber = 10;
    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        props.setImages(imageList);
    };
    return (
        <div className="Uploader">
            <ImageUploading
                multiple
                value={props.images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <button
                            type='button'
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Загрузить...
                        </button>
                        &nbsp;
                        <button onClick={onImageRemoveAll}>Очистить</button>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Заменить</button>
                                    <button onClick={() => onImageRemove(index)}>Удалить</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
            {/* <button onClick={onSubmit}>Отправить</button> */}
        </div>
    );
};

export default FileUploader;