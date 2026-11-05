document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar todas las imágenes del catálogo que tienen la clase específica
    const imagenesDePlantas = document.querySelectorAll(".imagen-planta-click");

    imagenesDePlantas.forEach(imagen => {
        imagen.addEventListener("click", (e) => {
            // Buscamos la descripción que está dentro de la misma caja de esta planta
            const tarjetaContenedora = e.target.closest(".tarjeta-planta");
            const descripcion = tarjetaContenedora.querySelector(".descripcion-oculta");

            // Alternar la clase 'mostrar' para abrir o cerrar la descripción
            if (descripcion) {
                descripcion.classList.toggle("mostrar");
            }
        });
    });
});
