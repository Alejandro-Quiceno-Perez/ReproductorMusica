import React, { useState } from 'react';


import Card from './components/Card';
import List from './components/List';
import { albums } from './assets/data/index';

const App = () => {
  const [albumId, setAlbumId] = useState(albums[0].id);
  const [musicNumber, setMusicNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const selectedAlbum = albums.find(album => album.id === albumId) || albums[0];

  const handleAlbumChange = (event) => {
    setAlbumId(event.target.value);
    setMusicNumber(0);
    setOpen(false);
  };


  return (
      <div className={`container`}>
        <main>
          <Card props={{
            album: selectedAlbum,
            albumId,
            albums,
            handleAlbumChange,
            musicNumber,
            setMusicNumber,
            setOpen
          }} />
          <List props={{
            open,
            setOpen,
            musicNumber,
            setMusicNumber,
            musics: selectedAlbum.musics
          }} />
        </main>
      </div>
  );
};

export default App;