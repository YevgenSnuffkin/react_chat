import axios from "axios";
export function fetchMessages() {
  return function(dispatch) {
    axios.get("./messages_list.json")
      .then((response) => {
        dispatch({type: "FETCH_MESSAGES_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_MESSAGES_REJECTED", payload: err})
      })
  }
}

export function addMessage(author, message) {
  return {
    type: 'ADD_MESSAGE',
    payload: {
      message,
      author,   
    },
  }
}

export function updateTweet(id, text) {
  return {
    type: 'UPDATE_MESSAGE',
    payload: {
      id,
      text,
    },
  }
}

export function deleteTweet(id) {
  return { type: 'DELETE_MESSAGE', payload: id}
}