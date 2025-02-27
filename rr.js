<div class="card" style="width: 18rem;">
<img class="card-img-top" src=${value.img} alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">${value.name}</h5>
  <p class="card-text">${value.desc}</p>
  <h4>$${value.price}</h4>
  <button onclick="addToCart(${value.id})" class="btn btn-primary">Add to cart</button>
</div>
</div>