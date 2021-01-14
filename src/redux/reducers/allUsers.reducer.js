const AllUsersReducer = (state = [], action) => {
    const newData = Object.entries(state)
    switch (action.type) {
      case 'SET_ALL_USERS':
        console.log('AllUsers reducer action.payload', action.payload)
        return action.payload;
      case 'UNSET_ALL_USERS':
        return [];
      case 'UPDATE_ALL_USERS':
        return newData.map((user) => 
          user.id === action.payload.id ? action.payload : user
        );
      default:
        return state;
    }
  };

export default AllUsersReducer