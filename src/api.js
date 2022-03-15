const API_KEY = "bTkEdVRqIZQjplCl04dDMZUvMyg1iTbl"

export async function fetchGifs({ offset }) {
  const response = await fetch(`
    https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&offset=${offset}
  `)
  if (response.ok) {
    const json = await response.json()
    return json
  } else {
    throw new Error("Couldn't get gifs :(")
  }
}

export async function searchGifs(query, { offset }) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}=&limit=25&offset=${offset}`)
  if (response.ok) {
    const json = await response.json()
    return json
  } else {
    throw new Error("Couldn't get gifs :(")
  }
}

export async function fetchGif(id) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`)
  if (response.ok) {
    const json = await response.json()
    return json
  } else {
    throw new Error("Couldn't get gif :(")
  }
}

export async function fetchTags(query) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&q=${query}&limit=10`
  )
  if (response.ok) {
    const json = await response.json()
    return json
  } else {
    throw new Error(" Couldn't get tags :(")
  }
}

export async function postGif(gif) {
  await fetch('gif', {
    method: 'POST',
    headers: {
      Authorization: "Bearer 12345"
    },
    body: JSON.stringify(gif)
  })
  return Promise.resolve('success')
}

export async function editGif() {
  // await fetch(`gif/${id}`, {
  //   method: 'PUT',
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer 12345"
  //   },
  //   body: JSON.stringify(gif)
  // })
  return Promise.resolve('success')
}

export async function deleteGif() {
  // await fetch(`gif/${id}`, {
  //   method: 'DELETE',
  //   headers: {
  //     Authorization: "Bearer 12345"
  //   },
  // })
  return Promise.resolve('success')
}
