const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case "allEvents":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default eventsReducer;
