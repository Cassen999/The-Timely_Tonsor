const aptDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_APT_DETAILS':
      console.log('aptDetails reducer set apt details action.payload', action.payload)
      return action.payload;
    default:
      return state;
  }
};

export default aptDetailsReducer;
