import Axios from 'axios';
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';





export async function AllPlayLists(){
    try{
        const response = await Axios.get("http://localhost:8000/allplaylist/")
        const data = response.data
        return data
    }catch(error){
        console.log("failed to fetch");
        throw Error(error);
    }
}



export function AddTrackTolist(track,playlid,getTracklist){
    return Axios.put('http://localhost:8000/playlist/addTrack/'+playlid,{
              id : track.id,
              title : track.title,
              length : track.length,
              bpm : track.bpm,
              main_artists : track.main_artists,
              audio : track.audio
          })
          .then(response => {toast(response.data.status)
        if (getTracklist){getTracklist()}
        })
          .catch(error => {
              console.error('There was an error!', error);
          });
}



export function RemoveFromPlaylist(e,Trackid,PLid,showTracks){
    e.preventDefault();
    const newClicked = Trackid;
    console.log(newClicked,'kkk')
    return  Axios.patch('http://localhost:8000/playlist/removeTrack/'+PLid,{
              id : newClicked,
          })
          .then(response => showTracks(e))
          .catch(error => {
              console.error('There was an error!', error);
          });
  }




  export function Deletplaylist(delid, getPlaylist){
   
        // DELETE request using axios with error handling
       
        return Axios.delete('http://localhost:8000/playlist/delete/'+delid)
            .then(response => {
              getPlaylist()
          })
            .catch(error => {
                console.error('There was an error!', error);
            }); 
  }


export function CreatePlaylist(newpL,getPlaylist) {
    return Axios.post('http://localhost:8000/playlist/add',{
        name: newpL.name,
        description: newpL.description
    })
    .then(res => {
      getPlaylist()
      
    })
}

export async function ShowPlaylistTracks(PLid){
    try{
        const response = await Axios.get("http://localhost:8000/playlist/"+PLid)
        const data = response.data.all_tracks
        return data
    }catch(error){
        console.log("failed to fetch");
        throw Error(error);
    }
}

