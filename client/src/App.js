import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import TrackRow from "./components/TrackRow";
import PlayList from "./components/PlayList";
import AddPlayList from "./components/AddPlayList";
import AudioPlayer from "./components/AudioPlayer";

import {AllTracks,AllPlayLists} from "./components/Services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [Playlists, setPlaylists] = useState([]);
  const [displaycomp, setcomp] = useState("tracks");
  const [popup, setTrackpop] = useState("true")
  useEffect(() => {
    fetch("http://localhost:8000/tracks")
      .then((res) => res.json())
      .then((data) => setTracks(data));
      getPlaylist();
      
  }, []);


 
  async function  getPlaylist()  { 
    const alllist = await AllPlayLists();
    setPlaylists(alllist);
   }
 
  const handlePlay = (track) => setCurrentTrack(track);

   function trackpopup(){
        setTrackpop("false")
   }

  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li className={styles.tabtitle}>
              <a onClick={() => setcomp("tracks") } className={displaycomp === "tracks" ? styles.active : null}>
                Tracks
              </a>
            </li>
            <li style={{display:"flex",justifyContent:"space-between",width:"100%",cursor:"pointer"}}>
              <a  onClick={() => setcomp("lists") } className={displaycomp !== "tracks" ? styles.active : null}>Playlists</a>
              {displaycomp !== "tracks" ? <div><AddPlayList  getPlaylist={getPlaylist}/></div>:null}
            </li>
            
          </ul>
        </nav>
       {
       displaycomp == "tracks" ?
       tracks.map((track, ix) => (
          <TrackRow allplaylist={Playlists} key={ix} track={track} handlePlay={handlePlay} type="main" PlistId = "null" />
        ))
        : 
        
        Playlists.map((playlist, ix) => (
          <PlayList alltracks={tracks} key={ix} playlist={playlist} handlePlay={handlePlay} getPlaylist={getPlaylist}/>
        ))}
        
      </main>
      {currentTrack && popup=="true" ? <AudioPlayer track={currentTrack}  />:null}

      <ToastContainer /> 
      
    </>
  );
}

export default App;
