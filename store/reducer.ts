const initialState = {
    rows: [],
  };
  
  const reducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'SET_ROWS':
        return { ...state, rows: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;