
// Holds logged in client's appointment history
const aptHistoryReducer = (state = [], action) => {
    const newData = Object.entries(state)
    switch (action.type) {
      case 'SET_HISTORY':
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