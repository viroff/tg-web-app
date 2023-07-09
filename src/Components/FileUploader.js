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
        <ImageUploading
        multiple
        value={props.images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
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
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
        // <div className="Uploader">
        //     <ImageUploading
        //         multiple
        //         value={props.images}
        //         onChange={onChange}
        //         acceptType={['png', 'jpg', 'jpeg']}
        //         maxNumber={maxNumber}
        //         dataURLKey="data"
        //     >
        //         {({
        //             imageList,
        //             onImageUpload,
        //             onImageRemoveAll,
        //             onImageUpdate,
        //             onImageRemove,
        //             isDragging,
        //             dragProps,
        //         }) => (
        //             <>
        //             {imageList.length}
        //                 <div className='row-divider' />
        //                 <div className="centerpanel panel column">
        //                     {imageList.map((image, index) => (
        //                         <div key={'dwx' + index} className='imgcontainer'>
        //                             <Image key={index} src={image['data']} width="290" />
        //                             <Button
        //                                 appearance='transparent'
        //                                 key={'bsd' + index}
        //                                 icon={<DismissCircle32Filled />}
        //                                 className='imgbutton'
        //                                 onClick={() => onImageRemove(index)} />
        //                         </div>
        //                     ))}
        //                 </div>
        //                 <div className="centerpanel">
        //                     <Button
        //                         size="normal"
        //                         style={isDragging ? { color: 'red' } : undefined}
        //                         onClick={onImageUpload}
        //                         {...dragProps}
        //                         type='button'
        //                     >
        //                         Загрузить...
        //                     </Button>
        //                     <Button
        //                         disabled={imageList.length === 0}
        //                         size="normal"
        //                         onClick={onImageRemoveAll}
        //                         type='button'>
        //                         Очистить
        //                     </Button>
        //                 </div>
        //             </>
        //         )}
        //     </ImageUploading>
        // </div>
    );
};

export default FileUploader;