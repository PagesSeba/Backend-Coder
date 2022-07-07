const socket = io();


const productForm = document.querySelector('#productForm');
const urlInput = document.querySelector('#urlInput');
const priceInput = document.querySelector('#priceInput');
const nameInput = document.querySelector('#nameInput');
const msgForm = document.querySelector('#msgForm');
const usernameInput = document.querySelector('#usernameInput');
const msgInput = document.querySelector('#msgInput');
const msgStyle = document.querySelector('#msgStyle');


function sendProduct (productInfo) {
    socket.emit('client:product', productInfo)
};
async function renderProducts (productos) {
    const response = await fetch('/partials/productList.ejs');
    const page = await response.text();
    document.querySelector('#productList').innerHTML = "";
    productos.forEach(product => {
        const html = ejs.render(page, product);
        document.querySelector('#productList').innerHTML += html;
    });
}
function submitProduct (event) {
    event.preventDefault();
    const productData = { url: urlInput.value, price: priceInput.value, name: nameInput.value };
    sendProduct(productData);
};


function sendMessage (msgInfo) {
    socket.emit('client:msg', msgInfo);
}
function renderMessage (msgsInfo) {
    const html = msgsInfo.map(msgInfo => {
        return(`<div>
        <span class="msgStyle-user">${msgInfo.username}</span>
        [<span class="msgStyle-date">${msgInfo.time}<span>]: 
        <span class="msgStyle-msg">${msgInfo.message}</span>
        </div>`)
    }).join(" ");
    msgStyle.innerHTML = html;
}
function submitMessage (event) {
    event.preventDefault();
    const timeStamp = new Date();
    const fechayhora = timeStamp.toLocaleString("fr-FR");
    const msgInfo = { username: usernameInput.value, time: fechayhora, message: msgInput.value };
    sendMessage(msgInfo);
}


msgForm.addEventListener('submit', submitMessage);
socket.on('server:msgs', renderMessage);

productForm.addEventListener('submit', submitProduct)
socket.on('server:products', renderProducts);