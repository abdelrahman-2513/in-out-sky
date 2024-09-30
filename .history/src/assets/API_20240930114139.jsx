export function takeAction(data) {
  return fetch("https://api.api-ninjas.com/v1/nutrition?query=apple", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      return err;
    });
}
