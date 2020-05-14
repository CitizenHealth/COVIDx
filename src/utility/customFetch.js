const baseEndpoint = process.env.REACT_APP_ENDPOINT_URI;

export const customGet = async (url, token) => {
  const getPayload = {
    method:"GET",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Authorization": "Bearer: " + token,
    }
  };

  let payload;
  await fetch(baseEndpoint + url, getPayload)
    .then(res => res.json())
    .then(json => {
      payload = json;
    })
    .catch(e => console.log(e))
  return payload;
}

export const customPost = async (url, token, values) => {
  console.log(values)
  const postPayload = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bearer: " + token,
    },
    body: JSON.stringify(values)
  }
  let payload;
  await fetch(baseEndpoint + "/create_survey_response", postPayload)
    .then(res => {
      payload = res.text();
    })
    .catch(e => console.log(e))
}