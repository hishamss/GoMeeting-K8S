export const GraphQlAPI = (requestBody) => {
  return fetch("/graphql", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
