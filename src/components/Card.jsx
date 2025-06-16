import React, { useState, useEffect, useRef } from 'react'
import '../assets/css/card.css'
import musics from '../assets/data/index'
import { timer } from '../utils/timer'
import { visualizer } from '../utils/visualizer'

const Card = ({ props: { musicNumber, setMusicNumber, setOpen } }) => {
  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [play, setPlay] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(50);
  const [repeat, setRepeat] = useState('repeat');

  const audioRef = useRef();
  const canvasRef = useRef();

  const handleLoadStart = (e) => {
    const src = e.nativeEvent.srcElement.src;
    const audio = new Audio(src);
    audio.onloadedmetadata = () => {
      if (audio.readyState > 0) {
        setDuration(audio.duration);
      }
    }
    if (play) {
      audioRef.current.play();
    }
  }

  const handlePlayingAudio = () => {
    visualizer(audioRef.current, canvasRef.current, play)
    if (play) {
      audioRef.current.pause();
      setPlay(false)
    } else {
      audioRef.current.play();
      setPlay(true);
    }
  }

  const handleTimeUpdate = (e) => {
    const currentTime = audioRef.current.currentTime;
    setCurrentTime(currentTime);

  }

  const changeCurrentTime = (e) => {
    const currentTime = Number(e.target.value);
    audioRef.current.currentTime = currentTime;
    setCurrentTime(currentTime);
  }

  const handleNextPrev = (e) => {
    setMusicNumber(value => {
      if (e > 0) {
        return value + e > musics.length - 1 ? 0 : value + e;
      }
      return value + e < 0 ? musics.length - 1 : value + e;
    })
  }

  const handleRepeat = () => {
    setRepeat(value => {
      switch (value) {
        case 'repeat':
          return 'repeat_one';
        case 'repeat_one':
          return 'shuffle';
        default:
          return 'repeat';
      }
    })
  }

  const EndedAudio = () => {
    switch (repeat) {
      case 'repeat_one':
        return audioRef.current.play();

      case 'shuffle':
        return handleShuffle();

      default:
        return handleNextPrev(1);
    }
  }

  const handleShuffle = () => {
    const num = randomNumber();
    setMusicNumber(num);
  }

  const randomNumber = () => {
    const number = Math.floor(Math.random() * (musics.length - 1));
    if (number === musicNumber) {
      return randomNumber();
    }
    return number;
  }

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume])

  return (
    <div className='card'>
      <div className="nav">
        <i className="material-icons">expand_more</i>
        <span>La Oveja Negra {musicNumber + 1}/{musics.length} </span>
        <i className="material-icons" onClick={() => setOpen(prev => !prev)}>queue_music</i>
      </div>
      <div className="img">
        <img src={musics[musicNumber].img} alt="" 
          className={`${play ? 'playing' : ''}`}
        />
        <canvas ref={canvasRef} />
      </div>

      <div className="details">
        <p className="title">
          {musics[musicNumber].title}
        </p>
        <p className="artist">
          {musics[musicNumber].artist}
        </p>
      </div>

      <div className="progress">
        <input type="range" min={0} max={duration} value={currentTime} onChange={e => changeCurrentTime(e)} />
      </div>

      <div className="timer">
        <span>{timer(currentTime)}</span>
        <span>{timer(duration)}</span>
      </div>

      <div className="controls">
        <i className="material-icons" onClick={handleRepeat}>{repeat}</i>

        <i className="material-icons" id='prev' onClick={() => handleNextPrev(-1)}>skip_previous</i>

        <div className="play" onClick={handlePlayingAudio}>
          <i className="material-icons" >
            {play ? 'pause' : 'play_arrow'}
          </i>
        </div>

        <i className="material-icons" id="next" onClick={() => handleNextPrev(1)}>skip_next</i>

        {/* Volumen */}
        <i className="material-icons" onClick={() => setShowVolume(prev => !prev)}>{volume === 0 ? 'volume_off' : 'volume_up'}</i>

        <div className={`volume ${showVolume ? 'show' : ''}`}>
          <i className="material-icons" onClick={() => setVolume(v => v > 0 ? 0 : 100)}>
            {volume === 0 ? 'volume_off' : 'volume_up'}
          </i>

          <input type="range" min={0} max={100} value={volume} onChange={e => setVolume(Number(e.target.value))} />

          <span>{volume}</span>
        </div>

      </div>

      <audio src={musics[musicNumber].song} hidden ref={audioRef}
        onLoadStart={handleLoadStart}
        onTimeUpdate={handleTimeUpdate}
        onEnded={EndedAudio}
      />
    </div>
  )
}

export default Card
