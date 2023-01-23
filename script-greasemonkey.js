// ==UserScript==
// @name     InfoJobs: búsqueda acelerada
// @version  1
// @grant    none
// ==/UserScript==

console.log("En 5 segundos empieza...");

setTimeout(async function () {
  const simplyWait = (milisegundos) => new Promise(ok => setTimeout(ok, milisegundos));
  // 1. Si es la página del formulario, rellenar automático:
  if (window.location.href.startsWith("https://www.infojobs.net/candidate/application/index.xhtml?")) {
    const f = document.querySelector("form#myForm");
    // Rellena los textareas:
    Array.from(f.querySelectorAll("textarea")).forEach(t => t.value = "Esto es un lenguaje lógico en castellano que traduce a JavaScript: https://github.com/allnulled/castelog y esto es para montar redes de servidores https://github.com/allnulled/restologia Estoy en el pozo, ¿me puede sacar alguien, por favor?");
    // Rellena los checkboxes:
    Array.from(f.querySelectorAll("input[type=radio]")).forEach(i => i.click());
    // Envía el formulario:
    document.querySelector("button#botonEnviar").click();
  } else {
    // 2. Si tiene el botón de inscribirse, darle automático:
    try {
      const btn_aplicar = document.querySelector("#candidate_application_bottom");
      // 2.1 Si ya está inscrito, salir:
      if (btn_aplicar && btn_aplicar.textContent.trim() === "Ya inscrito") {
        return window.close();
      }
      return btn_aplicar.click();
    } catch (error) {

    }
    // 3. Si es la página de ofertas y no estamos buscando nosotros (redirigido por completar formulario), cerrar la pestaña:
    // En Firefox tendrás que ir a "about:config" y habilitar (a true) la config: dom.allow_scripts_to_close_windows
    const link1 = "https://www.infojobs.net/ofertas-trabajo/programador?";
    const link2 = "https://www.infojobs.net/jobsearch/search-results/list.xhtml?";
    if (window.location.href.startsWith(link1) || window.location.href.startsWith(link2)) {
      if (window.location.href.indexOf("keyword=") === -1) {
        window.close();
      }
      // 4. Si es la página de ofertas y SÍ estamos buscando nosotros, abrir todas las ofertas (paulatinamente) y clicar siguiente:
      else {
        // 4.1. Scrolear hasta abajo primero para que se carguen todas las ofertas:
        for (let i = 0; i < 3; i++) {
          console.log("Scrol número " + i);
          window.scrollTo(0, document.body.scrollHeight);
          await simplyWait(1000);
        }
        let links = Array.from(document.querySelectorAll("a.ij-OfferCardContent-description-title-link"));
        let indiceLinks = 0;
        // 4.2. Abrir links en intervalos de 1s
        let idInterval = setInterval(() => {
          try {
            const link = links[indiceLinks++];
            console.log("Abriendo link " + indiceLinks);
            window.open(link.href, '_blank');
          } catch (error) {
            clearInterval(idInterval);
            console.log("En 7 segundos, siguiente");
            setTimeout(() => {
              Array.from(document.querySelectorAll("button")).filter(b => b.textContent.trim() === "Siguiente")[0].click();
              console.log("En 3 segundos, refrescar");
              setTimeout(() => {
                window.location.reload()
              }, 3000);
            }, 7000);
          }
        }, 1000);
      }
    }

  }
}, 5000);