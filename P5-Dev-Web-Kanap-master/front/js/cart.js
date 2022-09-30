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
        console.log(products)
         displayCart(products)
        // const produc =  {
        //     id : products.id,
        //     color :products.color,
        //     quantity: products.quantity,
        //     imageUrl: localProduct.imageUrl ,
        //     name: localProduct.name,
        //     price: localProduct.price
        //     }
        //     fullCart.push(produc)
    
        
    })
      .catch(function(error){
        return alert(error)
      })
      
      }
    }
    
   
    getId();
    
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


// let localProduct = JSON.parse(localStorage.getItem('products'));
// fetch('http://localhost:3000/api/products/')
//     .then((response) => response.json())
//     .then((products) =>{
//         console.log(products)
 
        
//     })
//       .catch(function(error){
//         return alert(error)
//       })
      
//     displayCart()
//       function displayCart() {
//         if (localProduct.length == 0) {
//              let emptyCart = document.getElementById('cart__items');
//              emptyCart.innerHTML = 'Votre panier est vide'
//          }else{
             
//      for (let i of localProduct){
     
     
//       document.getElementById('cart__items').innerHTML +=
//      ` <article class="cart__item" data-id="${i.id}" data-color="${i.color}">
//      <div class="cart__item__img">
//        <img src="${i.imageUrl}" alt="${i.altTxt}">
//      </div>
//      <div class="cart__item__content">
//        <div class="cart__item__content__description">
//          <h2>${i.name}</h2>
//          <p>${i.color}</p>
//          <p>${i.price}€</p>
//        </div>
//        <div class="cart__item__content__settings">
//          <div class="cart__item__content__settings__quantity">
//            <p>Qté : </p>
//            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${i.quantity}">
//          </div>
//          <div class="cart__item__content__settings__delete">
//            <p class="deleteItem">Supprimer</p>
//          </div>
//        </div>
//      </div>
//      </article>`
//      }}
//     }




    /////////////////////SUPPRIMER DES ARTICLES //////////////////

     // Suppression d'un produit du panier
    
     function removeItem(e){
        let article = e.target.closest('article');
        localProduct = localProduct.filter(product => product.id !== article.dataset.id || product.color !== article.dataset.color);
        localStorage.setItem("products", JSON.stringify(localProduct));
        article.remove();
        getTotals();
    }
    // Application de la suppression du produit
    
    function deleteItem(){
        let cartItems = document.getElementsByClassName('deleteItem');
        for (let item of cartItems){
            item.onclick = removeItem;
        } 
    }
    deleteItem();



//////////////////// CHANGER QUANTITE DANS LE PANIER ////////////////////

    function updateQuantity(e){
        let article = e.target.closest('article');
        let i = localProduct.findIndex(product => product.id === article.dataset.id && product.color === article.dataset.color);
        localProduct[i].quantity = parseInt(e.target.value);
        localStorage.setItem("products", JSON.stringify(localProduct));
        getTotals();    
    }
    // Application de la modification de la quantité
    
    function modifyQuantity(){
        let cartItems = document.getElementById('cart__items');
        cartItems.onchange = updateQuantity;
    }
    modifyQuantity();
    
   
    
    ////////////////////////////////////// Calcul des prix et quantites totaux  //////////////////////////////////////
    
    function getTotals() {
        let totalQuantity = 0;
        let totalPrice = 0;
        for (let i of localProduct) {
            totalQuantity += parseInt(localProduct[i].quantity);
            totalPrice += parseInt(localProduct[i].quantity) * parseInt(localProduct[i].price);
        }
        document.getElementById('totalPrice').textContent = totalPrice;
        document.getElementById('totalQuantity').textContent = totalQuantity;
    }
    getTotals();
    