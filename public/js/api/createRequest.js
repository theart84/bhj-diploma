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
  if (options.method === 'GET') {
    requestURL = `${options.url}${encodeURL(options.data)}`
  }
  if (options.method === 'POST') {
    Object.entries(options.data).forEach(([key, value]) => formData.append(`${key}`, `${value}`));
  }
  try {
    let response = await fetch(requestURL, {
      method: options.method,
      body: options.method === 'GET' ? null : formData,
    });
    response = await response.json();
    options.callback(response);
    return response;
  } catch (err) {
    return Promise.reject(err)
  }
}

function encodeURL(url) {
  let firstSymbol = '?';
  return firstSymbol + Object.entries(url).map(([key, value]) => `${key}=${value}`).join('&');
}

// const createRequest = (options = {}) => {
//   const formData = new FormData();
//   const xhr = new XMLHttpRequest();
//   let requestURL = options.url
//   if (options.method === 'GET') {
//     requestURL = `${options.url}${encodeURL(options.data)}`
//   }
//   if (options.method === 'POST') {
//     Object.entries(options.data).forEach(([key, value]) => formData.append(`${key}`, `${value}`));
//   }
//   try {
//     xhr.open( options.method, requestURL );
//     xhr.addEventListener('load', () => {
//       const response = xhr.responseText;
//       options.callback(response);
//       return response;
//     });
//     xhr.send(options.method === 'GET' ? null : formData);
//   }
//   catch (err) {
//     console.log(err);
//   }
// };