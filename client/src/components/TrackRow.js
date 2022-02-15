import React,{ useState } from "react";
import styles from "./TrackRow.module.css";
import 'react-toastify/dist/ReactToastify.css';
import Plstyles from "./Playstyle.module.css";
import {AddTrackTolist,RemoveFromPlaylist} from "./Services";
import CommonModal from "./CommonModal";



function TrackRow({allplaylist, track, handlePlay, type ,PlistId, showTracks}) {

  
  const [currentTrack, setCurrentTrack] = useState(false);
  

  return (
    <><div>
      <div className={styles.trackRow}>
        <button className={styles.trackPlay} onClick={() => handlePlay(track)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 12L8 5V19L20 12Z" fill="white" />
          </svg>
        </button>
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.title} </div>
          {type === "main" ?
            <><div  className={styles.trackArtist}>
              {track.main_artists.join(", ")}
            </div><CommonModal type={type} allplaylist={allplaylist} track ={track} currentTrack={currentTrack} />
            </>
            : <div className={Plstyles.hgButtons} id={track.id} onClick={(e) => RemoveFromPlaylist(e,track.id,PlistId,showTracks)}>remove from playlist</div>
            }

        </div>
      </div>
      
    </div>
   
      </>
    
  );
}

export default TrackRow;
