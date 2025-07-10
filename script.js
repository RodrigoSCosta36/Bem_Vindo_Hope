function abrirEdicao() {
  document.getElementById("formularioEdicao").style.display = "block";
}

function salvarEdicao() {
  const nome = document.getElementById("novoNome").value.trim();
  const usuario = document.getElementById("novoUsuario").value.trim();
  const senha = document.getElementById("novaSenha").value.trim();

  if (nome) document.getElementById("nomeCompleto").textContent = nome;

  if (usuario) {
    document.getElementById("usuario").textContent = usuario;
    const email = `${usuario}@grupohope.com.br`;
    document.getElementById("email").textContent = email;
    document.getElementById("teams").textContent = email;
  }

  if (senha) document.getElementById("senha").textContent = senha;

  document.getElementById("formularioEdicao").style.display = "none";
}

function copiarComoImagem() {
  const quadro = document.querySelector(".container");

  html2canvas(quadro).then(canvas => {
    canvas.toBlob(blob => {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]).then(() => {
        alert("Imagem copiada! Agora você pode colar com Ctrl + V.");
      }).catch(() => {
        alert("Imagem gerada! Clique com o botão direito e copie manualmente.");
      });
    });
  });
}
