import { React, useState, useRef } from 'react';

import { Button, Image } from '@fluentui/react-components';
import { DismissCircle32Filled, Add20Filled } from "@fluentui/react-icons";
import { getRandomId } from '../utils/getRandomId';

const FileUploaderMultiple = (props) => {
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = {
                    id: images.length,
                    url: reader.result,
                };
                setImages((prevImages) => [...prevImages, imageData]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (id) => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            {images.map((image) => {
                const rndKey = getRandomId(image.id);
                return (
                    <div key={rndKey}>
                        <div className='row-divider' />
                        <div className="centerpanel panel column">
                            <div key={'dwx' + rndKey} className='imgcontainer'>
                                <Image key={'imgg' + rndKey} src={image.url} width='290' />
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
                accept="image/*"
            />
            {images.length < 10 &&
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