import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './TrackRow.module.css';
import {AddTrackTolist,RemoveFromPlaylist} from "./Services";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Plstyles from "./Playstyle.module.css";
import TrackRow from './TrackRow';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'black',
  border: '2px solid white',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  width:'60%'
};



export default function CommonModal({type,allplaylist,track,currentTrack}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (type == "playlist")
  {
    setOpen(true);
  }

  return (
   <>
   <div className={Plstyles.hgButtons} onClick={ handleOpen} >Add</div>
   {<><div>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              { type === "main" ?
              <Box sx={style}><h2> Add To Your PlayList</h2>
              <div className={Plstyles.modalinside}>
                  {allplaylist.map((playlist, ix) => (
                      <>
                          <div className={styles.trackRow}> <LibraryMusicIcon />   <span className={styles.trackadd} id={playlist.id} onClick={() => AddTrackTolist(track, playlist.id, currentTrack)}>{playlist.name} kk</span></div></>
                  ))}
                  </div>
              </Box>
              : null
              }
          </Modal>
      </div></>}</>
  );
}
