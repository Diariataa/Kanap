fetch('http://localhost:3000/api/products/')
.then((response) => response.json())
.then((data) =>{
  console.log(data)
  createElement(data)

})

.catch(function(error){
  return console.log(error)
   
})
// Creer la fonction d'affichage des kanap
function createElement(data){
  for(let i of data){
     document.getElementById('items').innerHTML += `<a href="./product.html?id=${i._id}">
     <article>
       <img src="${i.imageUrl}" alt="${i.altTxt}">
       <h3 class="productName">${i.name}</h3>
       <p class="productDescription">${i.description}</p>
     </article>
   </a>`
  }}