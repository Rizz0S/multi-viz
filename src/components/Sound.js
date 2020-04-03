import React, { useState } from 'react';
import soundIcon from '../sound-icon.png';

const Sound = (props) => {
   const [currentlyPlaying, setCurrentlyPlaying] = useState(true);
   const [volume, setVolume] = useState(50);

   const sound = props.sound;

   const handleTogglePlay = () => {
       currentlyPlaying ? sound.pause() : sound.play()

       setCurrentlyPlaying(!currentlyPlaying);
   }

   const handleVolumeInput = (e) => {
       let input = e.target.value;
       setVolume(input);
       input = parseFloat(input * 0.01).toFixed(2);
       sound.volume = input;
    }

   return(
       <div className="sound">
           <img
             className="sound-icon"
             src={soundIcon} 
             alt='sound-icon' 
             height='60' width='60'
           />
           <div className="controls">
              <i className="material-icons play-pause-btn" onClick={handleTogglePlay}> {currentlyPlaying ? "pause_circle_outline" : "play_circle_outline"}</i>
           </div>
           <div>
            <input
              className="volume-slider"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeInput}
            />
          </div>
          <p className="now-playing">{sound.name.replace(/\.[^/.]+$/, "")}</p>
       </div>
   ) 
}

export default Sound