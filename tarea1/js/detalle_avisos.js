document.addEventListener("DOMContentLoaded", () => {
    const tablaAvisos = document.getElementById("tabla-avisos");
    const detalleAviso = document.getElementById("detalle-aviso");
    const modal = document.getElementById("modal");
    const cerrarModal = document.getElementById("cerrar-modal");

    tablaAvisos.addEventListener("click", (event) => {
        const fila = event.target.closest("tr");
        if (!fila || fila.rowIndex === 0) return; 

        const celdas = fila.getElementsByTagName("td");
        const foto = celdas[8].querySelector("img");
            detalleAviso.innerHTML = `
                <p><strong>Fecha Publicación:</strong> ${celdas[0].innerText}</p>
                <p><strong>Fecha Entrega:</strong> ${celdas[1].innerText}</p>
                <p><strong>Comuna:</strong> ${celdas[2].innerText}</p>
                <p><strong>Sector:</strong> ${celdas[3].innerText}</p>
                <p><strong>Cantidad:</strong> ${celdas[4].innerText}</p>
                <p><strong>Tipo:</strong> ${celdas[5].innerText}</p>
                <p><strong>Edad:</strong> ${celdas[6].innerText}</p>
                <p><strong>Contacto:</strong> ${celdas[7].innerText}</p>
                <img src="${foto.src}" alt="${foto.alt}" width="320" height="240" id="foto-detalle">
                <br><br>
                <button onclick="location.href='listado.html'">Volver al Listado</button>
                <button onclick="location.href='portada.html'">Volver a la portada</button>
            `;
            detalleAviso.style.display = "block";
  
    });
    cerrarModal.addEventListener("click", () => {
        modal.style.display = "none";
    });
});


