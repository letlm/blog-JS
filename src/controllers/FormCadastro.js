import { ApiUser } from '../api/ApiUser.js'

class FormCadastro {
  static formulario = document.querySelector('form')

  static start () {
    this.formulario.addEventListener('submit', this.cadastrarUsuario.bind(this))
  }

  static cadastrarUsuario (event) {
    event.preventDefault()

    const inputs = event.target

    const novoUsuario = {}
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        const name = inputs[i].name
        const value = inputs[i].value

        novoUsuario[name] = value
      }
      inputs[i].value = ''
    }
    ApiUser.post('/register', novoUsuario)
      .then(responseData => {
        if (responseData.status === 'error') {
          this.modalErro()
        } else {
          window.location.href = '/src/pages/logar.html'
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

  static fecharCasdastro(){
    const btnFecharCadastro = document.querySelector("#exit")
    btnFecharCadastro.addEventListener("click", () => {
      localStorage.clear()
      window.location.href = "/index.html"
    })
  }
  
}
FormCadastro.start()
FormCadastro.fecharCasdastro()
export { FormCadastro }
