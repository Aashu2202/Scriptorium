import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { v4 } from "uuid";
import toast from "react-hot-toast";
// import { useNavigate } from 'react-router-dom';
import './Entry.css';

function Entry() {
  // const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');

  const CreateRoom = (e) => {
    e.preventDefault();
    const id = v4(); 
    setRoomId(id);
    toast.success("New Room Created ")
  }

  const JoinRoom = (e) => {

    if (!roomId || !userName) {
      e.preventDefault() 
      toast.error("UserName and Room Id is required !")
    }
    else {
      // navigate(`/Collaborate/${roomId}`, {
      //   state: {
      //     userName, roomId, 
      //   },
      // })
    }
  }

  const ForEnter = (e) => {
    if (e.code === "Enter") {
      JoinRoom();
    }
  }

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Room ID Copied!");
  };

  return (
    <div className='entry-div'>
      <div className='fill-entry-info'>
        <h3>
          Code Syncronix
        </h3>
        <form className='input-form'>
          <div className='input-container'>
            <input className='entry-input' placeholder='Username' value={userName} onChange={(e) => { setUserName(e.target.value) }} onKeyUp={ForEnter}/>
            <i className='bx bx-user input-icon'></i>
          </div>
          <div className='input-container'>
            <input
              className='entry-input'
              placeholder='Room Id'
              onChange={(e) => { setRoomId(e.target.value) }} value={roomId} onKeyUp={ForEnter}
            />
            <i className='bx bx-copy input-icon' onClick={handleCopyRoomId}></i>
          </div>
          <div className='entry-btn-class'>
            <Button variant="light" className='mt-3 entry-btn' onClick={JoinRoom}>Join Room</Button>
            <Button variant="light" className='mt-3 entry-btn' onClick={CreateRoom}>Create Id</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Entry;
