const post = async (url, payload) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export default {
  post
}
