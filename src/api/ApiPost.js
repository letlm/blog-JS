class ApiPost {
  static API_URL = 'https://api-blog-m2.herokuapp.com/post'

  // método registrar/post

  static async createPost (data) {
    const infos = localStorage.getItem('infoUserKey')
    const infosOk = JSON.parse(infos)

    const response = await fetch(`${this.API_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${infosOk.autenticacao.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const create = await response.json()

    return create
  }

  static async getPosts (page) {
    const infos = localStorage.getItem('infoUserKey')
    const infosOk = JSON.parse(infos)

    const response = await fetch(`${this.API_URL}?page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${infosOk.autenticacao.token}`
      }
    })
    const data = await response.json()
    return data
  }

  static async editPost (id, newContent) {
    const infos = localStorage.getItem('infoUserKey')
    const infosOk = JSON.parse(infos)

    const responseEdit = await fetch(`${this.API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json', // Indica o tipo de dado da requisição
        Authorization: `Bearer ${infosOk.autenticacao.token}`
      },
      body: JSON.stringify({ newContent })
    })
    const data = await responseEdit.json()
    return data
  }

  static async deletePost (id) {
    const infos = localStorage.getItem('infoUserKey')
    const infosOk = JSON.parse(infos)

    await fetch(`${this.API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${infosOk.autenticacao.token}`
      }
    })
  }
}

export { ApiPost }
