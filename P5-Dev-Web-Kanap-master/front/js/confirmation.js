// Afficher numero de commande



function confirmOrder(){
    const str = window.location.search;
    const url = new URLSearchParams(str);
    const id = url.get('id');
    document.getElementById('orderId').innerHTML+= `${id}`
}
confirmOrder()
   