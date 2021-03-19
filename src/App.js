import React, {useEffect, useState} from "react";
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';
function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      } )
  }, []);

  //run this code once when app runs
  useEffect(() => {
    var pusher = new Pusher('0443d15258d76a74fda7', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      //alert(JSON.stringify(data));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
      
    </div>
  );
}

export default App;
