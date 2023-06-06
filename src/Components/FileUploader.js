import React, { useState } from 'react';

const FileUploader = (props) => {

  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    // Фильтруем файлы по количеству и размеру
    const filteredFiles = selectedFiles.slice(0, 10).filter(file => file.size <= 10 * 1024 * 1024);

    props.setFiles(filteredFiles);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...props.files];
    updatedFiles.splice(index, 1);
    props.setFiles(updatedFiles);
  };

  const uploadFiles = () => {
    const formData = new FormData();

    for (let i = 0; i < props.files.length; i++) {
      formData.append('files', props.files[i]);
    }

    fetch('http://localhost:5007/api/poster', {
      method: 'POST',
      body: formData,
      mode: 'cors', // Указываем режим CORS
      headers: {
        'Access-Control-Allow-Origin': '*', // Указываем разрешенный источник
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUploadStatus('Files uploaded successfully!');
        props.setFiles([]);
      })
      .catch(error => {
        setUploadStatus('File upload failed!');
        props.setFiles([]);
      });
  };

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleFileChange} />
      <div>
        {props.files.map((file, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(file)} alt={`${index}`} />
            <button onClick={() => handleRemoveFile(index)}>Удалить</button>
          </div>
        ))}
      </div>
      <button onClick={uploadFiles}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default FileUploader;