const aptHistoryReducer = (state = [], action) => {
    const newData = Object.entries(state)
    switch (action.type) {
      case 'SET_HISTORY':
        console.log('apt history action.payload', action.payload)
        return action.payload;
      case 'UNSET_HISTORY':
        return [];
      case 'UPDATE_HISTORY':
        return newData.map((user) => 
          user.id === action.payload.id ? action.payload : user
        );
      default:
        return state;
    }
  };

export default aptHistoryReducer