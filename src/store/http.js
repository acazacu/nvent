export default {
  post(url, payload) {
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload),
    });
  }
}
