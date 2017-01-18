import React from "react"
import { connect } from "react-redux"
import Sound  from 'react-sound'
import { fetchUser } from "../actions/userActions"
import { fetchMessages } from "../actions/messagesActions"
import { addMessage } from "../actions/messagesActions"

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    messages: store.messages.messages,
  };
})

export default class Layout extends React.Component {

  componentWillMount() {

    this.props.dispatch(fetchUser())
    //here check for the local store name.
    if(!localStorage.getItem('react_app_nick')){

      const nick_name = prompt("type in your name");

      localStorage.setItem('react_app_nick', nick_name);
    }
  }
  
  fetchMessages() {
    this.props.dispatch(fetchMessages())
  }

  addMessage(author, message){
    this.props.dispatch(addMessage(author, message))
  }
  
  render() {

    const { user, messages } = this.props;
    
    if (!messages.length) {
      this.fetchMessages()

      
      //addMessage method which passes yhe message to the state the chart,
      //randomly taken from JSON component->dispatch.my_message_sent->...

    }

    const mappedMessages = messages.map(mes =>  <li>{mes.author} wrote: {mes.message}</li> )

    const random_message = mappedMessages[Math.floor(Math.random() * mappedMessages.length)];

    let input
    const nick = localStorage.getItem('react_app_nick')
    //form for my_message 

    return <div>
      <ul>{mappedMessages}</ul>

      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        this.addMessage(nick,input.value)
        input.value = ''
        }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>

      <Sound
        url="k.mp3"
        playStatus={Sound.status.PLAYING}
        playFromPosition={300 }
      />      
    </div>
  }
}
