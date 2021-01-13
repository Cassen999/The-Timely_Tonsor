const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    case 'UPDATE_USER':
      return state.map((user) => 
        user.id === action.payload.id ? action.payload : user
      );
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
