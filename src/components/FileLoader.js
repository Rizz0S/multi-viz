import React, { useRef } from 'react';

export default function FileLoader (props) {
    const fileInput = useRef();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const uploadedFile = fileInput.current.files[0];
        const soundElement = createSound(uploadedFile);
        props.handleFileUpload(soundElement)
    }
    
    const createSound = (uploadedFile) => {
        const sound = document.createElement('audio');
        
        sound.src = URL.createObjectURL(uploadedFile);
        sound.preload="none";
        sound.crossOrigin = "anonymous";
        sound.name = uploadedFile.name;
        
        return sound;
    }

    return(
        <div>
            <input
            id="file-load"
            type="file" 
            ref={fileInput}
            onChange={handleSubmit}
            />
            <label 
            htmlFor="file-load" 
            className="upload-file-label"
            >Load file...
            </label>
        </div>
    )
}

export default FileLoader;