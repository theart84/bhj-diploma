/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = async (options = {}) => {
  if (!options.data) {
    return;
  }
  const formData = new FormData();
  let requestURL = options.url;
  options.method === 'GET'
      ? requestURL = `${options.url}${encodeURL(options.data)}`
      : Object.entries(options.data).forEach(([key, value]) => formData.append(`${key}`, `${value}`));

  try {
    let response = await fetch(requestURL, {
      method: options.method,
      body: options.method === 'GET' ? null : formData,
    });
    response = await response.json();
    options.callback(response);
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
}

function encodeURL(url) {
  let firstSymbol = '?';
  return firstSymbol + Object.entries(url).map(([key, value]) => `${key}=${value}`).join('&');
}
