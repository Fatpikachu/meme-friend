import React, { useRef, useEffect, useState } from 'react'


export default function Display({ meme }) {
  const displayRef = useRef(null);
  const videoRef = useRef(null);
  const [url, setUrl] = useState('');


  useEffect(() => {
    let url = meme ? meme.link.replace('gifv', 'mp4') : null;
    setUrl(url)
    console.log('the url: ', url)
  }, [meme])

  const defaultVolume = () => {
    videoRef.current.volume = 0;
    videoRef.current.defaultMuted = true;
    videoRef.current.muted = true;
  }

  return (
    <>
    {
      meme
      ?
      <div className='display-container' ref={displayRef}>
        <h3>
          {meme.title}
        </h3>
      {
        meme.images
        ? meme.images.map((item) => {
          let url = item.link.replace('gifv', 'mp4')
          return(
            <div className='display-item'>
              {
              url.slice(-3) === 'mp4'
              ? <video ref={videoRef} src={url} width='550px' type="video/mp4" autoPlay loop controls onLoadStart={defaultVolume}/>
              : <img src={url} width='550px' />
              }
              <p>{item.description}</p>
            </div>
          )
        })
        :
          <div className='display-item'>
            {
            url.slice(-3) === 'mp4'
            ? <video ref={videoRef} src={url} width='550px' type="video/mp4" autoPlay loop controls onLoadStart={defaultVolume}/>
            : <img src={url} width='550px' />
            }
          </div>
        }
        <p className='description'>
          {
          meme.description
          ? meme.description
          : ''
          }
        </p>
      </div>
      :
      <div className='display-container'>loading ...</div>
    }
    </>
  )
}

