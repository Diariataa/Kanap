let localProduct = JSON.parse(localStorage.getItem('products'));
let fullCart = []

async function getId(){
    for( let products of localProduct){
       // Creer le tableau pour afficher le panier
        const product =  {
            id : products.id,
            color :localProduct.color,
            quantity: localProduct.quantity,
            imageUrl: products.imageUrl ,
            name: products.name,
            price: products.price
            }
            fullCart.push(product)
    
    await fetch('http://localhost:3000/api/products/'+ products.id)
    .then((response) => response.json())
    .then((products) =>{
        console.log(products)
        displayCart(products)
      })
      .catch(function(error){
        return alert(error)
      })
      
      }
    }
    
   
 getId();
// Création de la fonction de l'affichage du panier
function displayCart(products) {
   if (localProduct.length == 0) {
        let emptyCart = document.getElementById('cart__items');
        emptyCart.innerHTML = 'Votre panier est vide'
    }else{
        for (let i of localProduct){
            document.getElementById('cart__items').innerHTML +=
` <article class="cart__item" data-id="${products.id}" data-color="${i.color}">
<div class="cart__item__img">
  <img src="${products.imageUrl}" alt="${products.altTxt}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${products.name}</h2>
    <p>${i.color}</p>
    <p>${products.price}€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${i.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`
}}
}


 