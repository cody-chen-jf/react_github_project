export default class HttpUtils {
  static async get(url) {
    let response = await fetch(url)
    return response.json()
  }

  static async post(url, data) {
    let config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    let response = await fetch(url, config)
    return response.json()
  }
}