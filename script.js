function abrirEdicao() {
  const formulario = document.getElementById("formularioEdicao");

  document.getElementById("novoNome").value =
    document.getElementById("nomeCompleto").textContent.trim();

  document.getElementById("novoUsuario").value =
    document.getElementById("usuario").textContent.trim();

  document.getElementById("novaSenha").value =
    document.getElementById("senha").textContent.trim();

  formulario.style.display = "block";
}


function salvarEdicao() {
  const nome = document.getElementById("novoNome").value.trim();
  const usuario = document.getElementById("novoUsuario").value.trim();
  const senha = document.getElementById("novaSenha").value.trim();

  if (nome) {
    document.getElementById("nomeCompleto").textContent = nome;
  }

  if (usuario) {
    const email = `${usuario}@grupohope.com.br`;

    document.getElementById("usuario").textContent = usuario;
    document.getElementById("email").textContent = email;
    document.getElementById("teams").textContent = email;
  }

  if (senha) {
    document.getElementById("senha").textContent = senha;
  }

  document.getElementById("formularioEdicao").style.display = "none";
}


async function copiarComoImagem() {

  const quadro = document.querySelector(".container");
  const formulario = document.getElementById("formularioEdicao");
  const botao = document.querySelector(
    '.edit-bar button:nth-child(2)'
  );

  try {

    botao.disabled = true;
    botao.textContent = "⏳ Gerando...";

    // Esconde o formulário caso esteja aberto
    formulario.style.display = "none";


    // ------------------------------------------------
    // Aguarda as imagens da página carregarem
    // ------------------------------------------------

    const imagens = Array.from(document.images);

    await Promise.all(
      imagens.map(img => {

        if (img.complete) {
          return img.decode?.().catch(() => {});
        }

        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });

      })
    );


    // Aguarda fontes
    if (document.fonts) {
      await document.fonts.ready;
    }


    // ------------------------------------------------
    // Captura SOMENTE o .container
    // ------------------------------------------------

    const canvas = await html2canvas(quadro, {

      scale: 1,

      useCORS: true,

      allowTaint: true,

      backgroundColor: null,

      imageTimeout: 15000,

      logging: false,


      // ------------------------------------------------
      // Aqui está a correção principal
      // ------------------------------------------------

      onclone: (doc) => {

        const container =
          doc.querySelector(".container");

        if (!container) {
          return;
        }


        // Remove o background-image CSS
        // que estava sendo perdido pelo html2canvas
        container.style.backgroundImage = "none";


        // Cria uma imagem REAL dentro do cartão
        const fundo = doc.createElement("img");

        fundo.src = "./img/wallpaper01.png";

        fundo.style.position = "absolute";
        fundo.style.left = "0";
        fundo.style.top = "0";
        fundo.style.width = "100%";
        fundo.style.height = "100%";

        fundo.style.objectFit = "cover";
        fundo.style.objectPosition = "center";

        fundo.style.zIndex = "0";

        fundo.style.pointerEvents = "none";


        // Coloca a imagem como primeiro elemento
        // do cartão
        container.insertBefore(
          fundo,
          container.firstChild
        );


        // Garante que a camada branca fique
        // acima da foto
        const estilo = doc.createElement("style");

        estilo.textContent = `

          .container::before {
            z-index: 1 !important;
            background: rgba(255, 255, 255, 0.88) !important;
          }

          .container > * {
            position: relative;
            z-index: 2;
          }

        `;

        doc.head.appendChild(estilo);


        // O formulário nunca entra na imagem
        const formularioClone =
          doc.getElementById("formularioEdicao");

        if (formularioClone) {
          formularioClone.style.display = "none";
        }

      }

    });


    // ------------------------------------------------
    // Converte para PNG
    // ------------------------------------------------

    const blob = await new Promise(resolve => {

      canvas.toBlob(
        resolve,
        "image/png"
      );

    });


    if (!blob) {
      throw new Error(
        "Não foi possível gerar a imagem."
      );
    }


    // ------------------------------------------------
    // Copia a imagem
    // ------------------------------------------------

    await navigator.clipboard.write([

      new ClipboardItem({
        "image/png": blob
      })

    ]);


    alert(
      "Imagem copiada! Agora você pode colar com Ctrl + V."
    );


  } catch (erro) {

    console.error(
      "Erro ao copiar imagem:",
      erro
    );

    alert(
      "Não foi possível gerar a imagem."
    );


  } finally {

    botao.disabled = false;
    botao.textContent = "📸 Copiar Imagem";

  }

}