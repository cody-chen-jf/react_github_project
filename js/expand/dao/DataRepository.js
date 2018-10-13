export default class DataRepository {
  async fetchNetRepository(url) {
    let response = await fetch(url)
    return response.json()
  }
}