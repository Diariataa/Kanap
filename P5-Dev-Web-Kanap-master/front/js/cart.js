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


 /////////////////////SUPPRIMER DES ARTICLES //////////////////

     // Suppression d'un produit du panier
    
function removeItem(e){
        let article = e.target.closest('article');
        localProduct = localProduct.filter(product => product.id !== article.dataset.id || product.color !== article.dataset.color);
        localStorage.setItem("products", JSON.stringify(localProduct));
        article.remove();
        getTotals();
    }
    // Produit supprimé effectué
    
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
    // Appliquer la quantité modifié
    
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
        document.getElementById('totalPrice').innerText = totalPrice;
        document.getElementById('totalQuantity').innerText = totalQuantity;
    }
    getTotals();
    



                                /////////////////////////FORMULAIRE/////////////////////////////////////


    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');


function form(){

///*********************************** */ PRENOM *****************************************
firstName.addEventListener('change', function(){
    validFirstName(this);
   
})

const validFirstName = function(inputFirstName){
let firstNameRe = new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$, 'g'/)

let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
if(firstNameRe.test(inputFirstName.value)) {
    firstNameErrorMsg.innerHTML = 'Prénom valide'
    firstNameErrorMsg.classList.remove('text-danger')
    firstNameErrorMsg.classList.add('text-success')
    return true

}else{
    firstNameErrorMsg.innerHTML = 'Prénom invalide'
    firstNameErrorMsg.classList.remove('text-success')
    firstNameErrorMsg.classList.add('text-danger')
    return false
}
}
// ***************************************LAST NAME*****************************************
lastName.addEventListener('change', function(){
    validLastName(this);
   
})

const validLastName = function(inputLastName){
let lastNameRe = new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$, 'g'/)

let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
if(lastNameRe.test(inputLastName.value)) {
    lastNameErrorMsg.innerHTML = 'Nom de famille valide'
    lastNameErrorMsg.classList.remove('text-danger')
    lastNameErrorMsg.classList.add('text-success')
    return true

}else{
    lastNameErrorMsg.innerHTML = 'Nom de famille invalide'
    lastNameErrorMsg.classList.remove('text-success')
    lastNameErrorMsg.classList.add('text-danger')
    return false
}
}
// ******************************** ADRESSE***********************************************************
address.addEventListener('change', function(){
    validAddress(this);
   
})

const validAddress = function(inputAddress){
let addressRe = new RegExp(/^[a-zA-Z0-9\s,'-]*$, 'g'/)

let addressErrorMsg = document.getElementById('addressErrorMsg')
if(addressRe.test(inputAddress.value)) {
    addressErrorMsg.innerHTML = 'Adresse valide'
    addressErrorMsg.classList.remove('text-danger')
    addressErrorMsg.classList.add('text-success')
    return true

}else{
    addressErrorMsg.innerHTML = 'Adresse invalide'
    addressErrorMsg.classList.remove('text-success')
    addressErrorMsg.classList.add('text-danger')
    return false
}
}
//**************************************** */  VILLE DONNEES  **********************************************
city.addEventListener('change', function(){
    validCity(this);
   
})

const validCity = function(inputCity){
let cityRe = new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$, 'g'/)
let cityErrorMsg = document.getElementById('cityErrorMsg')

if(cityRe.test(inputCity.value)) {
    cityErrorMsg.innerHTML = 'Ville valide'
    cityErrorMsg.classList.remove('text-danger')
    cityErrorMsg.classList.add('text-success')
    return true

}else{
    cityErrorMsg.innerHTML = 'Ville invalide'
    cityErrorMsg.classList.remove('text-success')
    cityErrorMsg.classList.add('text-danger')
    return false
}
}

// ********************************   Email  ************************************************
email.addEventListener('change', function(){
        validEmail(this);
       
})

const validEmail = function(inputEmail){
 let emailRe = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$, 'g'/)

let emailErrorMsg = document.getElementById('emailErrorMsg')
if(emailRe.test(inputEmail.value)) {
    emailErrorMsg.innerHTML = 'Email valide'
    emailErrorMsg.classList.remove('text-danger')
    emailErrorMsg.classList.add('text-success')
    return true

}else{
    emailErrorMsg.innerHTML = 'Email invalide'
    emailErrorMsg.classList.remove('text-success')
    emailErrorMsg.classList.add('text-danger')
    return false
}
}}
form();


//***************************************ORDER FORM */
function order(){
    let cartOrder = document.getElementById('cart__order__form')
    cart.addEventListener('submit', (e))
    e.preventDefault()


    fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((data) => {
        console.log()
    })
    .catch(err){
        alert(err)
    }
}
order()