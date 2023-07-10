import { React, useState, useRef } from 'react';
import ImageUploading from 'react-images-uploading';
import { Button, Image } from '@fluentui/react-components';
import { DismissCircle32Filled } from "@fluentui/react-icons";

const FileUploader = (props) => {
    const onFileUpload = (imageList, addUpdateIndex) => {
        const addedImage = { ...imageList[0], uploaderIndex: props.uploaderIndex }
        const images = [...props.uploadedImages, addedImage];
        props.setUploadedImages(images);
    };
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        onFileUpload(files);
    };
    let justThisUploaderImage = [];
    const thisUploaderImage = props.uploadedImages.find((img) => img.uploaderIndex === props.uploaderIndex);
    if (thisUploaderImage) {
        justThisUploaderImage.push(thisUploaderImage);
    }
    return (
        <div className='Uploader'>
            <div className="centerpanel">
                <input
                    type='file'
                    ref={fileInputRef}
                    accept='.jpg, .jpeg'
                    className='hiddenInput'
                    onChange={handleFileChange} />

                <Button
                    size='normal'
                    onClick={handleButtonClick}
                    type='button'
                >
                    Загрузить {props.uploaderIndex}
                </Button>
            </div>
            {/* <ImageUploading
                value={justThisUploaderImage}
                onChange={onChange}
                acceptType={['jpg', 'jpeg']}
                maxNumber={1}
                dataURLKey="data"
                key={props.uploaderIndex}
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
                        <div className="centerpanel panel column">
                            {
                                imageList.map((image, index) => (
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
                                onClick={onImageUpload}
                                type='button'
                            >
                                Загрузить...
                            </Button>
                        </div>
                    </>
                )}
            </ImageUploading> */}
        </div>
    );
};

export default FileUploader;