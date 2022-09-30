let localProduct = JSON.parse(localStorage.getItem('products'));
let fullCart = []

async function getId(){
    for( let products of localProduct){
   let product =  {
        id : products.id,
        color :products.color,
        quantity: products.quantity
    }

    await fetch('http://localhost:3000/api/products/'+ product.id)
    .then((response) => response.json())
    .then((products) =>{
        console.log(product)
        displayCart(products)
        
    })
      .catch(function(error){
        return alert(error)
      })
      

      }
    }
    getId()
 
function displayCart(products) {
   if (localProduct.length == 0) {
        let emptyCart = document.getElementById('cart__items');
        emptyCart.innerHTML = 'Votre panier est vide'
    }else{
       
for (let i of localProduct){
const produc =  {
        id : products.id,
        color :products.color,
        quantity: products.quantity,
        imageUrl: products.imageUrl ,
        name: products.name,
        price: products.price
        }
        
document.getElementById('cart__items').innerHTML +=
` <article class="cart__item" data-id="${i.id}" data-color="${i.color}">
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

