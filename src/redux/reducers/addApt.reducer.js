const AddAptReducer = (state = {}, action) => {
    const newData = Object.entries(state)
    switch (action.type) {
      case 'SET_ADD_APT':
        console.log('AddApt action.payload', action.payload)
        return action.payload;
      case 'UNSET_ADD_APT':
        return {};
      case 'UPDATE_ADD_APT':
        return newData.map((user) => 
          user.id === action.payload.id ? action.payload : user
        );
      default:
        return state;
    }
  };

export default AddAptReducer;