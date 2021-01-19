const ConfTimeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CONF_TIME':
        console.log('ConfTime reducer action.payload', action.payload)
        return action.payload;
      default:
        return state;
    }
  };

export default ConfTimeReducer;