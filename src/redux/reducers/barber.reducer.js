const barberReducer = (state = [], action) => {
    const newData = Object.entries(state)
    switch (action.type) {
      case 'SET_BARBERS':
        console.log('barberReducer action.payload', action.payload)
        return action.payload;
      case 'UNSET_BARBERS':
        return [];
      case 'UPDATE_BARBERS':
        return newData.map((user) => 
          user.id === action.payload.id ? action.payload : user
        );
      default:
        return state;
    }
  };

export default barberReducer