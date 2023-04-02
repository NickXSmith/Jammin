import React from 'react';

import './TrackList.css';
import { Track } from '../Track/Track';

class TrackList extends React.Component {

    inInPlaylist(track) {
        let tracksIn = this.props.playlistTracks;
        if (!tracksIn) {
            return
        }
        return (tracksIn.find(savedTrack =>(savedTrack.id === track.id))) ? true : false;
    }   
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        if (!this.inInPlaylist(track)) {
                            return <Track track={track}
                            key={track.id} 
                            onAdd={this.props.onAdd}
                            onRemove={this.props.onRemove}
                            isRemoval={this.props.isRemoval}/>
                    } else {
                        return null;
;                    } 
                    })
                }
            </div>
        )
    }
}

export {TrackList};