export const GraphQlAPI = (requestBody) => {
  return fetch("/api/graphql", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
