// Afficher numero de commande

function confirmOrder(){
    const str = window.location.search;
    const url = new URLSearchParams(str);
    const order = url.get('order');
    document.getElementById('orderId').innerHTML+= `${order}`
}
confirmOrder()
   