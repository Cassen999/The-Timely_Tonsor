const userReducer = (state = {}, action) => {
  const newData = Object.entries(state)
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    case 'UPDATE_USER':
      return newData.map((user) => 
        user.id === action.payload.id ? action.payload : user
      );
    default:
      return state;
  }
};

export default userReducer;
