import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TrackRow from './TrackRow';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AddIcon from '@mui/icons-material/Add';
import Plstyles from "./Playstyle.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import {AddTrackTolist} from './Services';
import { useState, useEffect } from "react";

import TextField from '@mui/material/TextField';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'black',
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
  
};

 function PlaylistDialog({playlisId, alltracks, getTracklist}) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchedlist, setSearch] = useState({})
  const [gotrendered, setGotrender] = useState(false)
  function allTrackstoadd(e){
    setOpen(true);
  }

  const [data, setData] = useState({
    title:'',
})

  function handle(e){

    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata);
    if(newdata[e.target.id].length > 1){
    Axios.get("http://localhost:8000/search/?search="+e.target.value).then(res => {
      setSearch(res.data);
      setGotrender(true)});
    }
   
}

  // function addTrackTolist(e){
  //     if (open){
  //       const newclick = e.target.id
  //       console.log("hello",playlisId,newclick);
  //       Axios.put('http://localhost:8000/playlist/addTrack/'+playlisId.id,{
  //           id : alltracks[newclick].id,
  //           title : alltracks[newclick].title,
  //           length : alltracks[newclick].length,
  //           bpm : alltracks[newclick].bpm,
  //           main_artists : alltracks[newclick].main_artists,
  //           audio : alltracks[newclick].audio
  //       })
  //       .then(response => {toast(response.data.status)
  //           getTracklist()})
  //       .catch(error => {
  //           console.error('There was an error!', error);
  //       });
  //   }
  // }

  return (
    <div>
      <Button onClick={(e) => allTrackstoadd(e)}>Add Tracks</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div >
        <h2>Add Tracks to your playlist</h2>

        <TextField style={{backgroundColor:'#404040',paddingRight:'25px'}} onChange={(e) => handle(e)}  id="title" value={data.name} label="Search Track" variant="filled" />
        </div>
        
        <div className={Plstyles.modalinside}>{gotrendered ? 
        searchedlist.map((track, ix) => (
          <div className={Plstyles.dialogcomp} > <MusicNoteIcon className={Plstyles.dialogmus}/> 
          <span className={Plstyles.dialogTitle} id={ix} onClick={() => AddTrackTolist(searchedlist[ix],playlisId.id,getTracklist)}> {track.title}</span> </div>
        ))
      : null
      }</div>
        
        </Box>
      </Modal>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default PlaylistDialog;