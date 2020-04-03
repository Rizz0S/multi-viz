import React from 'react';

class FileLoader extends React.Component {

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const uploadedFile = this.fileInput.current.files[0];
        const soundElement = this.createSound(uploadedFile);
        this.props.handleFileUpload(soundElement)
    }
    
    createSound (uploadedFile) {
        const sound = document.createElement('audio');
        
        sound.src = URL.createObjectURL(uploadedFile);
        sound.preload="none";
        sound.crossOrigin = "anonymous";
        sound.name = uploadedFile.name;
        
        return sound;
    }

    render() {
        return(
            <div>
                <input
                id="file-load"
                type="file" 
                ref={this.fileInput}
                onChange={this.handleSubmit}
                />
                <label 
                htmlFor="file-load" 
                className="upload-file-label"
                >Load file...
                </label>
            </div>
        )
    }
} // end of FileLoader class

export default FileLoader;