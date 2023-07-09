import React from 'react';
import ImageUploading from 'react-images-uploading';
import { Button, Image } from '@fluentui/react-components';
import { DismissCircle32Filled } from "@fluentui/react-icons";

const FileUploader = (props) => {
    const maxNumber = 10;
    const onChange = (imageList, addUpdateIndex) => {
        props.setImages(imageList);
    };
    return (
        <div className="Uploader">
            <ImageUploading
                value={props.images}
                onChange={onChange}
                acceptType={['png', 'jpg', 'jpeg']}
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
                    <>
                    {imageList.length}
                        <div className='row-divider' />
                        <div className="centerpanel panel column">
                            {imageList.map((image, index) => (
                                <div key={'dwx' + index} className='imgcontainer'>
                                    <Image key={index} src={image['data']} width="290" />
                                    <Button
                                        appearance='transparent'
                                        key={'bsd' + index}
                                        icon={<DismissCircle32Filled />}
                                        className='imgbutton'
                                        onClick={() => onImageRemove(index)} />
                                </div>
                            ))}
                        </div>
                        <div className="centerpanel">
                            <Button
                                size="normal"
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                type='button'
                            >
                                Загрузить...
                            </Button>
                            <Button
                                disabled={imageList.length === 0}
                                size="normal"
                                onClick={onImageRemoveAll}
                                type='button'>
                                Очистить
                            </Button>
                        </div>
                    </>
                )}
            </ImageUploading>
        </div>
    );
};

export default FileUploader;