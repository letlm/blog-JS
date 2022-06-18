import { ApiUser } from '../api/ApiUser.js'
import { Local } from '../api/Local.js'

class FormLogin {
  static formulario = document.querySelector('form')

  static start () {
    this.formulario.addEventListener('submit', this.logarUsuario.bind(this))
  }

  static logarUsuario (event) {
    event.preventDefault()

    const inputs = event.target

    const novoLogin = {}
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        const name = inputs[i].name
        const value = inputs[i].value

        novoLogin[name] = value
      }

      inputs[i].value = ''
    }

    ApiUser.logar('/login', novoLogin)
      .then(async responseData => {
        if (responseData.status === 'error') {
          this.modalErro()
        } else {
          Local.infoUser.autenticacao = { ...responseData }
          localStorage.setItem('infoUserKey', JSON.stringify(Local.infoUser))
          localStorage.setItem('infoUser', JSON.stringify(await ApiUser.infoUsuario()))
          console.log()
          window.location.href = '/src/pages/feed.html'
        }
      })
  }

  static modalErro(){
    const modal = document.querySelector("#modalErro")
    modal.classList.add("aparecer")
    modal.addEventListener("click", (event) => {
      if(event.target.tagName === "BUTTON"){
        modal.classList.remove("aparecer")
      }
    })
  }

  static fecharLogin(){
    const btnFecharLogin = document.querySelector("#exit")
    btnFecharLogin.addEventListener("click", () => {
      window.location.href = "/index.html"
    })
  }
}
FormLogin.start()
export { FormLogin }
