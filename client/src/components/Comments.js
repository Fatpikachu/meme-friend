import React, {useState, useRef, useEffect} from 'react';


export default function Comments({ comments }) {
  const commentsRef = useRef(null);

  useEffect(() => {
    console.log('the comments:  ', comments)
  }, [comments])
  return (
    comments.length
      ? <div className='comment-container' ref={commentsRef}>
          <div className='comment-title'>Top Comments:</div>
        {
          comments.map((comment) => {
            if(comment.comment.match(/\.(jpeg|jpg|gif|png)$/)){
              return (
                <div className='comment'>  
                  <img className='comment-gifs' src={comment.comment} />
                </div>)
            } else {
              return (
                <div className='comment'>  
                  {comment.comment}
                </div>)
            }
          })
        }
      </div>
      : <div className='comment-container'>Looooading...</div>
  )
}

