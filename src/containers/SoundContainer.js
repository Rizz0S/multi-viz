import React from 'react';
import Sound from '../components/Sound';

export default class SoundContainer extends React.Component {

    soundComponents = () => {
       return this.props.sounds.map((sound) => 
           <Sound sound={sound}/>
       )
    }

    render() {
        return(
            <div className="sound-container">
                {this.soundComponents()}
            </div>
        )
    }


} // end of SoundContainer class

