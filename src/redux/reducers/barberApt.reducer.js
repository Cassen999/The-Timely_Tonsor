const appointmentReducer = (state = [], action) => {
    const newData = Object.entries(state)
    switch (action.type) {
      case 'SET_BARBER_APT':
        console.log('barberAptReducer action.payload', action.payload)
        return action.payload;
      case 'UNSET_BARBER_APT':
        return [];
      case 'UPDATE_BARBER_APT':
        return newData.map((user) => 
          user.id === action.payload.id ? action.payload : user
        );
      default:
        return state;
    }
  };

export default appointmentReducer