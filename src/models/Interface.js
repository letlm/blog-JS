import { ApiPost } from '../api/ApiPost.js'

class Interface {
  static infos = []

  static async listarPosts (page = 1) {
    const ul = document.querySelector('ul')
    ul.innerHTML = ''
    const publicacoes = await ApiPost.getPosts(page)
    publicacoes.data.forEach((infos) => {
      const templatePosts = this.template(infos)
      if (templatePosts !== null) {
        ul.appendChild(templatePosts)
      }
    })
    // this.formulario.addEventListener("submit", this.postar.bind(this))
  }

  static template ({ id, post, owner, createdAt }) {
    const dadosUser = JSON.parse(localStorage.getItem('infoUser'))
    const idUser = dadosUser.id
    const { username, avatarUrl } = owner
    const ownerId = owner.id

    const li = document.createElement('li')
    li.classList.add('posts')
    const img = document.createElement('img')
    img.classList.add('imgPost')
    const divMiddle = document.createElement('div')
    divMiddle.classList.add('middle')
    const h2 = document.createElement('h2')
    h2.classList.add('titlePost')
    const span = document.createElement('span')
    span.classList.add('textPost')
    const divEnd = document.createElement('div')
    divEnd.classList.add('end')
    const pEdit = document.createElement('p')
    pEdit.classList.add('edit')
    const aEdit = document.createElement('a')
    const pRemove = document.createElement('p')
    pRemove.classList.add('remove')
    const aRemove = document.createElement('a')
    const spanDate = document.createElement('span')
    spanDate.classList.add('date')

    img.src = `${avatarUrl}`
    img.alt = 'Imagem de Perfil do Usuário'
    aEdit.href = ''
    aRemove.href = ''

    h2.innerText = `${username}`
    span.innerText = `${post}`
    aEdit.innerText = 'Editar'
    aRemove.innerText = 'Apagar'
    spanDate.innerText = `${createdAt}`

    if (idUser === ownerId) {
      aRemove.addEventListener('click', (event) => {
        event.preventDefault()
        ApiPost.deletePost(id).then(async () => {
          await this.listarPosts()
        })
      })
      aEdit.addEventListener('click', (event) => {
        event.preventDefault()
        document.querySelector('.divSecond').classList.add('aparecer')
        document.querySelector('#postId').value = id
        document.querySelector('#editContent').value = post
      })
      pEdit.appendChild(aEdit)
      pRemove.appendChild(aRemove)
      console.log(pRemove)
    }

    divMiddle.appendChild(h2)
    divMiddle.appendChild(span)

    divEnd.appendChild(pEdit)
    divEnd.appendChild(pRemove)
    divEnd.appendChild(spanDate)

    li.appendChild(img)
    li.appendChild(divMiddle)
    li.appendChild(divEnd)

    return li
  }
}

export { Interface }
