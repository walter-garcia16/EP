document.getElementById('registroForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const response = await fetch('http://localhost:3000/api/usuarios/registrar', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.mensaje);
        this.reset(); // Limpiar el formulario después de guardar
    } else {
        alert('Error: ' + data.mensaje);
    }
});
