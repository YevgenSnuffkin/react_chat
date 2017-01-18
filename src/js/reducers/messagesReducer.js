export default function reducer(state={
    messages: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_MESSAGES": {
        return {...state, fetching: true}
      }
      case "FETCH_MESSAGES_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_MESSAGES_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          messages: action.payload,
        }
      }
      case "ADD_MESSAGE": {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        }
      }
      case "UPDATE_MESSAGE": {
        const { id, text } = action.payload
        const newMessages = [...state.messages]
        const messageToUpdate = newMessages.findIndex(message => message.id === id)
        newMessages[messageToUpdate] = action.payload;

        return {
          ...state,
          messages: newMessages,
        }
      }
      case "DELETE_MESSAGE": {
        return {
          ...state,
          messages: state.messages.filter(message => message.id !== action.payload),
        }
      }
    }
    return state
}
