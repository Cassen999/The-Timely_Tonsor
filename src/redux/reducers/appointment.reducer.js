const appointmentReducer = (state = {}, action) => {
    const newData = Object.entries(state)
    switch (action.type) {
      case 'SET_APPOINTMENTS':
        return action.payload;
      case 'UNSET_APPOINTMENTS':
        return {};
      case 'UPDATE_APPOINTMENTS':
        return newData.map((user) => 
          user.id === action.payload.id ? action.payload : user
        );
      default:
        return state;
    }
  };

export default appointmentReducer