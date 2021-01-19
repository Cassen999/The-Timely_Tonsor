const ConfBarberReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CONF_BARBER':
        console.log('ConfBarber reducer action.payload', action.payload)
        return action.payload;
      default:
        return state;
    }
  };

export default ConfBarberReducer;