const socket = io();

// camiseta form
const $formAddProduct = document.querySelector('#form-add-camiseta');
const $listcamiseta = document.querySelector('#list-camiseta');
const $equipoInput = document.querySelector('#equipo-camiseta');
const $descInput = document.querySelector('#desc-camiseta');
const $precioInput = document.querySelector('#precio-camiseta');
const $urlInput = document.querySelector('#url-camiseta');
const $tablecamiseta = document.querySelector('#table-camiseta');
const $sectionProduct = document.querySelector('#section-camiseta');
const $nocamiseta = document.querySelector('#no-camiseta');

$formAddProduct.addEventListener('submit', e => {
	e.preventDefault();
	const product = {
		equipo: $equipoInput.value,
		descripcion: $descInput.value,
		precio: $precioInput.value,
		url: $urlInput.value
	};
	socket.emit('camiseta', product);
	e.target.reset();
});

const renderCamiseta = camiseta => {
	if (camiseta.length > 0) {
		$nocamiseta.style.display = 'none';
		$tablecamiseta.innerHTML = '';
		camiseta.forEach(product => {
			$tablecamiseta.innerHTML += `
		<tr class="text-center">
			<td class="align-middle">${product.equipo}</td>
			<td class="align-middle">${product.descripcion}</td>
			<td class="align-middle">${product.precio}</td>
			<td class="align-middle">
				<img src="${product.url}" alt="${product.equipo}" width="100px">
			</td>
		</tr>`;
		});
	} else {
		$nocamiseta.style.display = 'block';
	}
}

// Chat form

const addMessage = () => {
    const message = {
        correo: document.getElementById("correo").value,
        date: new Date().toLocaleString("fr-FR"),
        message: document.getElementById("text").value
    }

    socket.emit("new-message", message);
    return false;
}

const renderMessage = data => {
    const html = data.map((msg, index) => {
        return (`
            <div>
                <p class="correo">${msg.correo}</p>
                <p><strong>[</strong><p class="fecha">${msg.date}</p><strong>]</strong></p>
                <em class="mensaje"> ${msg.message}</em>
            </div>
        `)
    }).join(" ")

    document.getElementById("messages").innerHTML = html
}


socket.on('camiseta', camiseta => {
	renderCamiseta(camiseta);
});

socket.on("messages", data => { 
	renderMessage(data) 
})