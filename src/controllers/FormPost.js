import { ApiPost } from "../api/ApiPost.js";
import { Interface } from "../models/Interface.js";

class FormPostar {
  static formulario = document.querySelector("form");
  static novoFormulario = document.querySelector(".editBlog");

  static start() {
    this.formulario.addEventListener("submit", this.postar.bind(this));
    FormPostar.novoFormulario.addEventListener(
      "submit",
      this.postar.bind(this)
    );
    Interface.listarPosts().catch(console.error);

    const btnLogout = document.querySelector(".btnLogout");
    btnLogout.addEventListener("click", this.limparLocalStorage.bind(this));
  }

  static listarUsuario() {
    const dadosDoLogin = JSON.parse(localStorage.getItem("infoUser"));
    const { username, avatarUrl } = dadosDoLogin;
    const imgUsuario = document.querySelector(".imgHeader");
    const nameUsuario = document.querySelector(".nameUsuario");
    imgUsuario.src = `${avatarUrl}`;
    nameUsuario.innerHTML = `${username}`;
  }

  static postar(event) {
    event.preventDefault();

    const inputs = event.target;

    const novoPost = {};
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        const name = inputs[i].name;
        const value = inputs[i].value;

        novoPost[name] = value;
      }

      inputs[i].value = "";
    }

    if (novoPost.id !== undefined && novoPost.id !== "") {
      ApiPost.editPost(novoPost.id, novoPost.content).then(async () => {
        await Interface.listarPosts();
      });
    } else {
      ApiPost.createPost(novoPost).then(async () => {
        await Interface.listarPosts();
      });
    }
    document.querySelector(".divSecond").classList.remove("aparecer");
  }

  static limparLocalStorage() {
    localStorage.clear();
    window.location.href = "/index.html";
  }
}
FormPostar.start();
FormPostar.listarUsuario();

export { FormPostar };
