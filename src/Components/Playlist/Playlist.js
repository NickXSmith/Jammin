import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

class Playlist extends React.Component {
    render(){
        return(
            <div class="Playlist">
                <input value={this.props.playlistName}/>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
                <button class="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export {Playlist}