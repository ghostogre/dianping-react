const headers = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json"
});

function get(url) {
  return fetch(url, {
    method: 'get',
    headers
  }).then((response) => {
    return handleResponse(url, response);
  }).catch(err => {
    console.error(`Request Failed. Url = ${url}. Message=${err}`);
    return Promise.reject({ error: { message: 'Request failed' } });
  });
}

function post(url, data) {
  return fetch(url, {
    method: 'get',
    headers,
    body: data
  }).then((response) => {
    return handleResponse(url, response);
  }).catch(err => {
    console.error(`Request Failed. Url = ${url}. Message=${err}`);
    return Promise.reject({ error: { message: 'Request failed' } });
  });
}

// 处理response
function handleResponse (url, response) {
  if (response.status === 200) {
    return response.json();
  } else {
    console.error(`Request Failed. Url = ${url}.`);
    return Promise.reject({ error: { message: 'Request failed due to server error' } });
  }
}

export {
  get,
  post
};
