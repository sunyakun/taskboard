import client from './client'

export default {
  getCards () {
    let cli = new client.Client()
    return cli.request('load-config').then(data => {
      return data
    })
  },
  saveCards (cards) {
    let cli = new client.Client()
    return cli.request('save-config', cards)
  },
  getStatic (url) {
    let cli = new client.Client()
    return cli.request('load-static', url)
  }
}
