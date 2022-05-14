import React, { useEffect, useState } from 'react'

// const server = "http://localhost:5000";
const server = "https://meme-friend.herokuapp.com";

export default function App() {
  
  const [msg, setMsg] = useState('');


  useEffect(() => {
    fetch(`${server}/test`)
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        setMsg(result.message);
      })

  }, [])

  return (
    <div>
      {msg ? msg : 'no message'}
    </div>
  )
}
