import React from 'react';
import Sound from '../components/Sound';

export default function SoundContainer (props) {

    soundComponents = () => {
       return props.sounds.map((sound) => 
           <Sound sound={sound}/>
       )
    }

    return(
        <div className="sound-container">
            {soundComponents()}
        </div>
    )


}

