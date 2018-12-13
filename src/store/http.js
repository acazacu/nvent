const postOptions = {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  headers: {
    "Content-type": "application/json; charset=utf-8"
  }
};
const post = async (url, payload) => {
  let request = { ...postOptions };

  if (payload) {
    request.body = JSON.stringify(payload);
  }

  const response = await fetch(url, request);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error("Invalid response");
  }
};

const http = {
  post
};

export default http;
