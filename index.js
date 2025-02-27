// const products = [
//   {
//     id: 1,
//     name: "Product 1",
//     desc: "description of the prodct description of the prodct description of the prodct description of the prodct",
//     price: 25,
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     desc: "description of the prodct description of the prodct description of the prodct description of the prodct",
//     price: 45,
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     desc: "description of the prodct description of the prodct description of the prodct description of the prodct",
//     price: 50,
//   },
// ];
let products = [];
let cart = {};
let users = [];
let user = {};
let orders = [];
let total = 0;
document.write(`<div id=root ></div>`);
function showPage(i) {
  root.innerHTML = `<div class="container-fluid">

      <div class="header">
        <h1>My Store </h1>
        <div class="menu">
        <li onclick="showProducts()">Home</li>
        <li onclick="showOrders()">Orders</li>
        <li onclick="displayCart()">Cart:<span id="items"></span></li>
        <li onclick="showLogin()">Log out</li>
        </div>
      </div>

      <div class="productBlock">
        
        <div id="divProducts"></div>
      </div>

      <div id="divCartBlock" class="cartBlock" style="display: block">
        <h3>My Cart</h3>
        <div id="divCart"></div>
        <div id="divTotal">Total :</div>
        <button onclick="hideCart()">Close</button>
        <button onclick="placeOrder()">Place Order</button>
        
      </div>

    </div>
    <hr>
    <h4 class="text-center">@Copyright 2025. All Rights Reserved.</h4>`;
  tempmail = users[i].email;
  showProducts();
}
const addToCart = (id) => {
  if (!cart[id]) cart[id] = 1;
  showCart(id);
};
const decrement = (id) => {
  cart[id] = cart[id] - 1;
  cart[id] < 1 && delete cart[id];
  showCart();
};
const increment = (id) => {
  cart[id] = cart[id] + 1;
  showCart();
};

const showTotal = () => {
  total = products.reduce((sum, value) => {
    return sum + value.price * (cart[value.id] ? cart[value.id] : 0);
  }, 0);

  divTotal.innerHTML = `Oder Value : $${total} `;
};
const displayCart = () => {
  divCartBlock.style.left = "80%";
};

const hideCart = () => {
  divCartBlock.style.left = "100%";
};
const showCart = () => {
  let str = "";
  products.map((value) => {
    if (cart[value.id]) {
      str += `<li>${value.name}-$${value.price}-<button onclick="decrement(${
        value.id
      })">-</button>${cart[value.id]}<button onclick="increment(${
        value.id
      })">+</button>-${value.price * cart[value.id]}</li>`;
    }
  });
  divCart.innerHTML = str;
  showTotal();
  let count = Object.keys(cart).length;
  items.innerHTML = count;
};

function showLogin() {
  let str = `
  <div class="login w-50">
      <h2>Login Form</h2>
      <div id='msg'></div>
      <p><input id="email" type="text"></p>
      <p><input id="password" type="password"></p>
      <button onclick='chkUser()' class="m-3">Log In</button>
      <p><button onclick='showForm()'>Create Account</button></p>
  </div>
  `;
  root.innerHTML = str;
}

function showForm() {
  let str = `
  <div class="registration">
  <h2>Registration Form</h2>
  <p><input type="text" id="name" placeholder="Name"></p>
  <p><input type="text" id="email" placeholder="Email"></p>
  <p><input type="password" id="password" placeholder="Password"></p>
  <p><input type="date" id="dob"></p>
  <p><button onclick='addUser()'>Submit</button></p>
  <p>Already a member?<button onclick='showLogin()'>Login Here</button></p>
  </div>
  `;
  root.innerHTML = str;
}

function chkUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      // useremail = email;
      // username = users[i].name;
      // currBalance = users[i].balance;
      user = users[i];
      showPage(i);

      break;
    } else {
      msg.innerHTML = "Access Denied";
    }
  }
}

function addUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let user = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    balance: 0,
  };
  users.push(user);
  showLogin();
}

const showProducts = () => {
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => (products = data))
    .then(() => {
      let str = "<div class='row'>";
      products.map((value) => {
        str += `
        
        <div class="card m-5 p-5" style="width: 18rem;">
<img class="card-img-top" src=${value.img} alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">${value.name}</h5>
  <p class="card-text">${value.desc}</p>
  <h4>$${value.price}</h4>
  <button onclick="addToCart(${value.id})" class="btn btn-info">Add to cart</button>
</div>
 
        </div>`;
      });
      divProducts.innerHTML = str + "</div>";
    });


   

};

const placeOrder = () => {
  let order = {
    customer: user.email,
    items: cart,
    orderValue: total,
    status: "pending",
  };
  orders.push(order);
  cart = {};
  showCart();
  hideCart();
  showOrders();
  console.log(orders);
};
const showOrders = () => {
  let str = "";
  orders.map((value) => {
    if (value.customer == user.email) {
      str += `<div style='padding:30px'><h1>My Orders</h1>
        <div>
        ${value.customer}--
        ${value.orderValue}--
        ${Object.keys(value.items).length}--
        ${value.status}
        </div>`;
    }
  });
  divProducts.innerHTML = str+"</div>";
};
