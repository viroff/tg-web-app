import React from 'react';
import ImageUploading from 'react-images-uploading';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

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

                        <div className='row-divider' />
                        <div className="flex flex-wrap imgwrapper">
                            {imageList.map((image, index) => (
                                <div key={'dwx' + index} className='imgcontainer'>
                                    <Image key={index} src={image['data']} width="250" />
                                    <Button type='button' key={'bsd' + index} icon="pi pi-times" rounded text severity="danger" className='imgbutton' onClick={() => onImageRemove(index)} aria-label="Cancel" />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-content-center ">
                            <Button
                                size='small'
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                type='button'
                            >
                                Загрузить...
                            </Button>
                            <Button
                                size='small'
                                className='marginLeft'
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