import { Local } from './Local.js'

class ApiUser {
  static API_URL = 'https://api-blog-m2.herokuapp.com/user'

  // método registrar/post

  static async post (path, data) {
    const response = await fetch(`${this.API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()
    return responseData
  }
  // método logar/POST
  static async logar (path, data) {
    const response = await fetch(`${this.API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()

    return responseData
  }

  // INFORMAÇÕES DO USUARIO
  static async infoUsuario () {
    const { autenticacao: { userId, token } } = Local.infoUser

    const response = await fetch(`${this.API_URL}/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const responseData = await response.json()

    return responseData
  }
}

export { ApiUser }
