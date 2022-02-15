import React, { useState, useEffect } from "react";
import styles from "./TrackRow.module.css";
import Plstyles from "./Playstyle.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TrackRow from "./TrackRow";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Trackstoadd from './PlaylistDialog';

import {Deletplaylist,ShowPlaylistTracks} from './Services';
import CommonModal from "./CommonModal";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'black',
  border: '1px solid lightgrey',
  boxShadow: 24,
  width:'60%',
  p: 4,
  
};


function PlayList({ alltracks, playlist, handlePlay ,getPlaylist}) {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [deletelists, setDeletelists] = useState(false);
  const [listTracks, setlistTracks] = useState(null);
  const [temptrack, setTemptrack] = useState({title:"",main_artists:""});
 

  async function showTracks(e){
    setOpen(true)
    const Pltrack =await ShowPlaylistTracks(playlist.id)
    setlistTracks(Pltrack) 
    console.log(Pltrack,"checking");
      // Axios.get("http://localhost:8000/playlist/"+playlist.id)
      //   .then((res) =>{ const trackdata = res.data.all_tracks
      //     console.log(trackdata);
      //   setlistTracks(trackdata)
      //   console.log(listTracks);
      // });
  }

  // function deletplaylist(e){
  //   console.log(typeof(getPlaylist))
  //    e.preventDefault();
  //     const newClicked = true;
  //     setDeletelists(newClicked)
      
  //     if (deletelists) {
  //       console.log(deletelists,newClicked,'kkk')
  //       // DELETE request using axios with error handling
  //       Axios.delete('http://localhost:8000/playlist/delete/'+e.target.id)
  //           .then(response => {
  //             getPlaylist()
  //         })
  //           .catch(error => {
  //               console.error('There was an error!', error);
  //           });
  //         }
          
  // }

  return (
    <><div className={styles.trackRow} id={playlist.id}>
      <button className={styles.trackPlay} onClick={() => handlePlay(playlist)}>
      <LibraryMusicIcon style = {{color:"white"}} />
      </button>
      <div className={styles.trackInfo} >
        <div className={styles.trackTitleimp}   id ={playlist.id}    onClick={(e) => showTracks(e)} >{playlist.name}</div>
        {/* <div className={styles.trackArtist}>
              {playlist.name.join(", ")}
              </div> */}
        <div className={Plstyles.hgButtons} id={playlist.id} onClick={() => {Deletplaylist(playlist.id,getPlaylist)}}> Delete </div>
      </div>
    </div>
      {/* <CommonModal type="playlist" allplaylist={playlist} track = {listTracks}  currentTrack = {showTracks} handlePlay={handlePlay} /> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
           <h2>{playlist.name}</h2> 
            <Trackstoadd playlisId={playlist} alltracks={alltracks} getTracklist={showTracks}></Trackstoadd>
            <div className={Plstyles.modalinside}>
          {
          listTracks !== null ? 
          listTracks.map((lT, ix) => (
          <TrackRow allplaylist={playlist} key={ix} track={lT} handlePlay={handlePlay} type="playlist" PlistId = {playlist.id} showTracks = {showTracks}></TrackRow>
        ) ) : null
        }</div>
          </Box>
        </Modal>
        {/* <ToastContainer /> */}
      </>

  );
}

export default PlayList;
