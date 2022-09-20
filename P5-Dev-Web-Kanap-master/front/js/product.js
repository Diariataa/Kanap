const str = window.location.search;
const url = new URLSearchParams(str);
const id = url.get('id');

fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((res) =>data(res))

function data(product){
const { altTxt, colors, description, imageUrl, name, price} = product
createImg(imageUrl, altTxt)
createTitle(name)
descriptionImg(description)
createPrice(price)
createColors(colors)

}

function createImg(imageUrl, altTxt){
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
function descriptionImg(description){
   const des = document.getElementById('description')
  if (des!= null) des.textContent= description
}

function createPrice(price){
    const prices = document.getElementById('price')
    if (prices!= null) prices.textContent= price
}

function createColors(colors){
 for (let color of colors){
    document.getElementById('colors').innerHTML +=
    `<option value="vert">${color}</option>
                      <option value="blanc">${color}</option> `
 }
}