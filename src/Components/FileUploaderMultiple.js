import { React, useState, useRef } from 'react';

import { Button, Image } from '@fluentui/react-components';
import { DismissCircle32Filled, Add20Filled } from "@fluentui/react-icons";
import { getRandomId } from '../utils/getRandomId';
import ReactPlayer from 'react-player'
import Video from 'react-native-video';

const FileUploaderMultiple = (props) => {
    const fileInputRef = useRef(null);
    const maxImagesCount = 10;
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = {
                    id: props.images.length,
                    url: reader.result,
                };
                props.setImages((prevImages) => [...prevImages, imageData]);
            };
            reader.readAsDataURL(file);
            console.log('IMG LENGTH:' + props.images.length)
        }
    };

    const handleRemoveImage = (id) => {
        props.setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };
    const player = useRef(null);
    return (
        <div>
            {props.images.map((image) => {
                const rndKey = getRandomId(image.id);
                const mediaType = image.url.split(';')[0].split('/')[0].split(':')[1];
                return (
                    <div key={rndKey}>
                        <div className='row-divider' />
                        <div className="centerpanel panel column">
                            <div key={'dwx' + rndKey} className='imgcontainer'>
                                {mediaType === 'video' && <Video
                                    source={{ uri: image.url }}
                                    ref={player}
                                    paused={true}
                                    onLoad={() => {
                                        player.current.seek(10); // this will set first frame of video as thumbnail
                                    }}
                                />}

                                {mediaType === 'image' && <Image key={'imgg' + rndKey} src={image.url} width='290' />}
                                <Button
                                    appearance='transparent'
                                    key={'bsd' + rndKey}
                                    icon={<DismissCircle32Filled />}
                                    className='imgbutton'
                                    onClick={() => handleRemoveImage(image.id)} >
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            })}

            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*, video/*"
            />
            {props.images.length < maxImagesCount &&
                <div className="centerpanel">
                    <Button
                        size="normal"
                        onClick={handleUploadButtonClick}
                        type='button'
                        icon={<Add20Filled />}
                    >
                        Добавить
                    </Button>
                </div>}
        </div >
    );
};

export default FileUploaderMultiple;