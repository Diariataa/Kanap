

//PAGE PRODUIT


const str = window.location.search;
const url = new URLSearchParams(str);
const id = url.get('id');

fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((product) =>{
    data(product);
   
})
.catch((err)=>{
    return alert(err)
})

function data(product){
const { altTxt, colors, description, imageUrl, name, price} = product
createImg(imageUrl, altTxt)
createTitle(name)
descriptionImg(description)
createPrice(price)
createColors(colors)


}

function createImg (imageUrl, altTxt) {
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    const eltParent = document.querySelector('.item__img')
    if(eltParent != null) eltParent.appendChild(image)
}

function createTitle(name){
   const title= document.getElementById('title')
   if(title != null) title.textContent = name
}
function descriptionImg (description){
   const des = document.getElementById('description')
  if (des!= null) des.textContent= description
}

function createPrice (price){
    const prices = document.getElementById('price')
    if (prices!= null) prices.textContent= price
}

function createColors(colors){
 for (let color of colors){
    document.getElementById('colors').innerHTML +=
    `<option value="${color}">${color}</option>
                      `
 }
}


let cart = document.getElementById('addToCart')
errorColor = document.createElement('div')
document.getElementById('colors').after(errorColor)
errorQuantity = document.createElement('div')
document.getElementById('quantity').after(errorQuantity)

       
cart.addEventListener('click', (e) =>{
    e.preventDefault()
    
        const color = document.getElementById('colors').value
        const quantity = document.getElementById('quantity').value
        console.log(quantity)
        if(color ===''){
            errorColor.innerHTML = 'Veuillez choisir une couleur'
        
        } 
         if(quantity == 0) {
            errorQuantity.innerHTML = 'Veuiller choisir une quantité'
       }
      
   if (color.length > 0 && quantity > 0 ){
    
    let data = {
        color : color,
        id: id,
        quantity: parseInt(quantity),
        
    }
    console.log(data)

  
  
let localStorageProduct = JSON.parse(localStorage.getItem('products')) 
if(localStorageProduct === null || localStorageProduct === []){
    localStorageProduct = [];
    localStorageProduct.push(data);
    localStorage.setItem('products', JSON.stringify(localStorageProduct));

}
else if(localStorageProduct !== null) {  
    console.log(id)
    let article = localStorageProduct.find((article) => 
    article.id == id && article.color === color
    )

    if(article){
         article.quantity += parseInt(quantity);
         localStorage.setItem('products', JSON.stringify(localStorageProduct));
    }
    if(!article){
        localStorageProduct.push(data);
        localStorage.setItem('products', JSON.stringify(localStorageProduct))
    }
}   

}
   })
