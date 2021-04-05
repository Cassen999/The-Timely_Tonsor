const aptDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_APT_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default aptDetailsReducer;
