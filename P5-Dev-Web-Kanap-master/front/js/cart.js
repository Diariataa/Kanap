let localProduct = JSON.parse(localStorage.getItem('products'));
let fullCart = []

async function getId(){
    for( let products of localProduct){
    //   
    await fetch('http://localhost:3000/api/products/'+ products.id)
    .then((response) => response.json())
    .then((data) =>{
     //    Creer le tableau pour afficher le panier
        const product =  {
            id : products.id,
            color :products.color,
            quantity: products.quantity,
            imageUrl: data.imageUrl ,
            name: data.name,
            price: data.price
            }
            fullCart.push(product)
    
        
      })
      
      .catch(function(error){
        return alert(error)
      })
      
      } displayCart()
      getTotals()
      deleteItem();
    }
    
   
 getId();
// Création de la fonction de l'affichage du panier
function displayCart() {
   if (localProduct.length == 0) {
        let emptyCart = document.getElementById('cart__items');
        emptyCart.innerHTML = 'Votre panier est vide'
    }else{
        for (let i of fullCart){
            document.getElementById('cart__items').innerHTML +=
` <article class="cart__item" data-id="${i.id}" data-color="${i.color}">
<div class="cart__item__img">
  <img src="${i.imageUrl}" alt="${i.altTxt}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${i.name}</h2>
    <p>${i.color}</p>
    <p>${i.price}€</p>
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
        fullCart = fullCart.filter(product => product.id !== article.dataset.id || product.color !== article.dataset.color);
        article.remove();
        getTotals()
    }
    // Produit supprimé effectué
    
function deleteItem(){
        let cartItems = document.getElementsByClassName('deleteItem');
        for (let item of cartItems){
            item.onclick = removeItem;
        } 
    }
    



// //////////////////// CHANGER QUANTITE DANS LE PANIER ////////////////////

function updateQuantity(e){
        let article = e.target.closest('article');
        let i = localProduct.findIndex(product => product.id === article.dataset.id && product.color === article.dataset.color);
        localProduct[i].quantity = parseInt(e.target.value);
        localStorage.setItem("products", JSON.stringify(localProduct));
        fullCart[i].quantity = parseInt(e.target.value);

        getTotals()
       
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
        for (let i of fullCart) {
            console.log(fullCart)
            totalQuantity += parseInt(i.quantity);
            totalPrice += parseInt(i.quantity) * parseInt(i.price);
        }
        document.getElementById('totalPrice').innerText = totalPrice;
        document.getElementById('totalQuantity').innerText = totalQuantity;
    }
    



//                                 /////////////////////////FORMULAIRE/////////////////////////////////////


    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');


function form(){

// ///*********************************** */ PRENOM *****************************************


firstName.addEventListener('change', function(){
    firstNameErrorMsg.innerHTML = ''
    validFirstName(this);
   
})

const validFirstName = function(inputFirstName){
let firstNameRe = new RegExp(/^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/)

let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
console.log(firstNameRe.test(inputFirstName.value))
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
// // ***************************************LAST NAME*****************************************
lastName.addEventListener('change', function(){
    validLastName(this);
   
})

const validLastName = function(inputLastName){
let lastNameRe = new RegExp(/[a-z]+[ \-']?[[a-z]+[ \-']?]*[a-z]+$/)

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
// // ******************************** ADRESSE***********************************************************
address.addEventListener('change', function(){
    validAddress(this);
   
})

const validAddress = function(inputAddress){
let addressRe = new RegExp(/^([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)/)

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
// //**************************************** */  VILLE DONNEES  **********************************************
city.addEventListener('change', function(){
    validCity(this);
   
})

const validCity = function(inputCity){
let cityRe = new RegExp(/([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/)
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

// // ********************************   Email  ************************************************
email.addEventListener('change', function(){
        validEmail(this);
       
})

const validEmail = function(inputEmail){
 let emailRe = new RegExp(/^[A-Za-z0-9-_\.]+@([A-Za-z0-9-_]+\.)+[A-Za-z]{2,5}$/)

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
    let cartOrder = document.getElementById('order')
    cartOrder.addEventListener('click', function(e){

        if (document.getElementById('order')){
            e.preventDefault()
        // recuperation des donnees du formulaire et panier
        
        let products = []
        for (let product of localProduct){
            products.push(product.id)
        
        }
            const contact = {
                firstName : firstName.value,
                lastName : lastName.value,
                address : address.value,
                city: city.value,
                email: email.value
            }
        console.log(contact, products)
        fetch('http://localhost:3000/api/products/order',{
                method : 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({contact, products})
                })
            .then((response) => response.json())
             .then((data) => {
                console.log(data)
               document.location.href = `confirmation.html?order=${data.orderId}`
            
            })
            .catch((err)=> {
                alert(err)
            })
        
        }})}
    
order()







// const validInput = function(input, msg, regex){
//     let Re = new RegExp(regex)
   
//    let ErrorMsg = document.getElementById('emailErrorMsg')
//    if(Re.test(input.value)) {
//        ErrorMsg.innerHTML = msg
//        ErrorMsg.classList.remove('text-danger')
//        ErrorMsg.classList.add('text-success')
//        return true
   
//    }else{
//        ErrorMsg.innerHTML = msg
//        ErrorMsg.classList.remove('text-success')
//        ErrorMsg.classList.add('text-danger')
//        return false
//    }
// }
// validInput (inputMail, "Votre email est invalide", "^[a-zA-Z]+ [a-zA-Z]+$, 'g'")