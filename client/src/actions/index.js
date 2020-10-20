export const getAllEvents = (events) => {
  return {
    type: "allEvents",
    payload: events,
  };
};
