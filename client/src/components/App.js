import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPooStorm} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import Display from './Display';
import Comments from './Comments';

const server = "http://localhost:5000";
// const server = "https://meme-friend.herokuapp.com";

export default function App() {
  const [memeDatas, setMemeDatas] = useState([]);
  const [page, setPage] = useState(0);
  const [currData, setCurrData] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [comments, setComments] = useState([]);

  const appRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log('got initial gallery')
    fetch(`${server}/gallery`)
      .then(res => res.json())
      .then((result) => {
        console.log('result:  ', result);
        setMemeDatas(result);
      })
  }, [])

  useEffect(() => {
    console.log('render in app')
    setCurrData(memeDatas[page]);
    if(currData) {
      fetch(`${server}/comments?id=${currData.id}`)
        .then((res) => res.json())
        .then((commentsArr) => {
          setComments(commentsArr.data);
        })
    }
  }, [page, memeDatas, currData])

  const handleOnChange = (e) => {
    setRecipient(e.target.value)
  }

  const nxtPage = () => {
    let indx = page + 1;
    if(indx <= 199){
      setPage((prevPage) => prevPage + 1);
    }
    // window.scrollTo(0, 115);
  }

  const prevPage = () => {
    let indx = page - 1;
    if(indx >= 0){
      setPage((prevPage) => prevPage - 1);
    }
    // window.scrollTo(0, 115);
  }

  const sendText = () => {
    fetch(`${server}/send-text/${recipient}/?txtMsg=${currData.link}`)
      .then((res) => {
        res.status === 200 
        ? swal("Sent!", "Text message sent", "success") 
        : swal({
          title: "Oh no, something went wrong",
          text: "Please check that you entered a valid phone number",
          icon: "warning",
        });
      })
  }


  return (
    <>
      <div className='app-container' ref={appRef}>
        <div className='header'>
          <FontAwesomeIcon className='icon' icon={faPooStorm} />
          <i className="fas fa-poo-storm"></i>
          <div className='title-first-letter'>M</div>
          <div className='title'> eme-a-friend </div>
        </div>
        <div className='sms-field'>
          <input placeholder={'Enter phone number'}
            ref={inputRef}
            onChange={handleOnChange}
          />
          <button className='send-to' onClick={sendText}>Send To Friend</button>
        </div>
        <div className='paginate'>
          <button className='prev-button' onClick={prevPage}>
            &lt; Prev
          </button>
          <button className='next-button' onClick={nxtPage}>
            Next &gt;
          </button>
        </div>
        {
          currData !== null ? <Display meme={currData} /> : <div className='loading-display'>Loading ...</div>
        }
        <Comments comments={comments} />
      </div>
    </>
  )
}
