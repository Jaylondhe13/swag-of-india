let country = document.getElementById('country');
let num = document.getElementById('num');
let img1 = document.getElementById('img1');
let myImage = new Image(21, 21);
let addwishProduct = document.querySelector('.addwishProduct');
let totalWishItem = document.querySelector('.totalWishItem');
let empty = document.querySelector('.empty')
let count = document.querySelector('.cartCount');
let wishCount = document.querySelector('.wishCount');
let view = document.querySelector('.view');

let totalProduct = document.querySelector('.totalProduct');
let totalCost = document.querySelector('.totalCost');


cartBody = document.querySelector('.cartBody')
let dataInStorage;
let placeOrder = document.querySelector('.placeOrder');
let total = 0;
let priceAfterDiscount = 0;
let a = document.querySelector('.myCart');
let addData;

let myProfile = document.querySelector('.myProfile');
let mobNo = document.getElementById('mobNo');
let save;
let saveChanges = document.getElementById('saveChanges');
let placeOrder1 = document.querySelector('.placeOrder1');
let productItem;

// When the user scrolls the page, execute myFunction
window.onscroll = function () { myFunction(); };

// Get the navbar
let navbar = document.getElementById("nav");

// Get the Logo
let logo = document.getElementById('logo');

// Get the offset position of the navbar
let sticky = navbar.offsetTop;

//  Get Top button
let topBtn = document.getElementById('topBtn')



const gap = -10;

const carousel = document.getElementById("carousel"),
  content = document.getElementById("content"),
  next = document.getElementById("next"),
  prev = document.getElementById("prev");







// Get Jason data

// let file = 'https://my-json-server.typicode.com/Jaylondhe13/products/db';
async function loadFile() {
  fetch('https://my-json-server.typicode.com/Jaylondhe13/products/db').then(Response => Response.json())
    .then(json => {
      productItem = json;

    }).then(() => {

      localStorage.setItem('products', JSON.stringify(productItem));
      if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', '[]');
      }
      else {
        cart = JSON.parse(localStorage.getItem('cart'));
        count.innerHTML = cart.length

      }


      if (!localStorage.getItem('wishList')) {
        localStorage.setItem('wishList', '[]');
      }
      else {
        wish = JSON.parse(localStorage.getItem('wishList'));
        wishCount.innerHTML = wish.length
      }


      // cart = JSON.parse(localStorage.getItem('cart'));
      getFile(productItem);
    })




}
// loadFile();



function getFile(item) {
  n = item.products.length;
  //Traverse Json data through loop
  for (i = 0; i < n; i++) {

    out = `<div class="col" id="">
          <div class="card">
            <div class="Prod-hover">
              <img src="img\\product${item.products[i].id}.png" class="card-img-top w-100 h-100 mx-auto" alt="...">
              <div class="card-body text-center">
                <h5 class="card-title fw-bold">${item.products[i].name}</h5>
                <p class="card-text fs-6"> Rs. ${item.products[i].priceAfterDiscount}<del> Rs. ${item.products[i].price}</del> (60%)</p>
                <img src="img\\rating.png" alt="" class="w-50 h-25">
              </div>


            </div>

            <div class="newProduct">

            <img src="img\\Group 2579.png" alt="" class="wishlist" onclick=addToWishList(${item.products[i].id})>
            <img src="img\\Group 2580.png" alt="" class="eye" onclick="viewProduct()" >
            <img src="img\\Group 2581.png" alt="" class="basket" onclick =addProductToCart(${item.products[i].id})>
            </div>


          </div>


            `;

    document.querySelector('.productA').innerHTML += out;



  };



  $('.newProduct img').addClass('hide')
  $('.card .Prod-hover').mouseover(function () {
    $(this).addClass('Blur1');
    $('.Blur1+ .newProduct img').removeClass('hide');
  })



  $('.col').mouseleave(function () {

    $('.Blur1+ .newProduct img').addClass('hide')
    $('.card> .Prod-hover').removeClass('Blur1')


  })


  $('.wishlist').mouseover(function () {
    $(this).attr('src', 'img\\h1.png')

  })

  $('.eye').mouseover(function () {
    $(this).attr('src', 'img\\h2.png')

  })

  $('.basket').mouseover(function () {
    $(this).attr('src', 'img\\h3.png')

  })

  $('.wishlist').mouseout(function () {
    $(this).attr('src', 'img\\Group 2579.png')
  })


  $('.eye').mouseout(function () {
    $(this).attr('src', 'img\\Group 2580.png')
  })

  $('.basket').mouseout(function () {
    $(this).attr('src', 'img\\Group 2581.png')



  })


}


// LOCAL STORAGE DATA


// ADD PRODUCTS TO CARTS
function addProductToCart(productId) {

  let products = JSON.parse(localStorage.getItem('products'));
  let cart = JSON.parse(localStorage.getItem('cart'));



  let product = products.products.find(product => { return product.id == productId });
  if (cart.length == 0 || cart == null) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    count.innerHTML = cart.length


  } else {

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    count.innerHTML = cart.length



  }

}


// ADD PRODUCTS TO WISHLIST
function addToWishList(productId) {

  let products = JSON.parse(localStorage.getItem('products'));
  let wishList = JSON.parse(localStorage.getItem('wishList'));

  let product = products.products.find(product => { return product.id == productId });
  if (wishList.length == 0 || wishList == null) {
    wishList.push(product);
    localStorage.setItem('wishList', JSON.stringify(wishList));
    wishCount.innerHTML = wishList.length
  } else {

    wishList.push(product);
    localStorage.setItem('wishList', JSON.stringify(wishList));
    wishCount.innerHTML = wishList.length


  }




}

function updateWishList() {

  let wishList = JSON.parse(localStorage.getItem('wishList'));

  if (wishList.length == 0 || wishList == null) {
    empty.innerHTML = '<h3>Wish List is Empty</h3>'


  } else {

    addwishProduct.innerHTML = null;


    wishList.map((item) => {


      addwishData = `
      <hr>
                            <div class="col-sm-3">
                                <img src="img\\product${item.id}.png" alt="return Product" role="image" class="border mx-auto img-fluid" width= 190>
                            </div>
                            <div class="col-sm-9">
                                <h6 class=fw-bold>${item.describtion}</h6>
                                <img src="img\\rating.png" alt=""> <br><br>
                                <p>Color: ${item.color} <br>Seller: ${item.SoldBy}</p>
                                <p><strong>Rs. ${item.priceAfterDiscount}</strong> <del>Rs. ${item.price}</del><span>(60% off)</span></p>


                                
                                    <button class="btn" id=remove  onclick=addProductToCart(${item.id})>Add To Cart</button> |
                                    <button class="border-0 mb-5" onclick=removeWishProduct(${item.id})>Remove</button>
                                
                            </div>

    `;




      addwishProduct.innerHTML += addwishData;
      totalWishItem.innerHTML = `My Wish List (${wishList.length})`



    }


    )

  }








}

// UPDATE DATA
function updateData() {



  let cart = JSON.parse(localStorage.getItem('cart'));
  total = 0;
  priceAfterDiscount = 0;



  // CART IS EMPTY
  if (cart.length == 0 || cart == null) {
    cartBody.innerHTML = '<h1>Cart is empty</h1>'





  } else {

    a.innerHTML = null;



    cart.map((item) => {


      addData = `
      <div class="row border mb-3">
      <div class="col-12 col-md-6 col-lg-3 m-3"><img src="img\\product${item.id}.png" class="border mx-auto img-fluid" width= 160 alt=""></div>
      <div class="col-12 col-lg-4 my-4 mx-3"><h6>${item.describtion}</h6>
        <p> color: ${item.color}</p>
        <p> Sold By: ${item.SoldBy}</p>
        <label for="size">SIZE</label>
        <select name="size" id="size">
          <option value="">One</option>
        </select>
        <label for="size">QTY</label>
        <select name="size" id="size">
          <option value="">One</option>
        </select>
      </div>
      <div class="col-12 col-lg-3 m-4 text-end">
        <P>Rs. ${item.priceAfterDiscount}</P>
        <p><del>Rs. ${item.price}</del>(60% off)</p>
        <p>Delivery in 4-6 Days</p>
      </div>
      <div class="border-top p-3">
        <button class="border-0 mx-5" id=remove  onclick=removeProduct(${item.id})>Remove</button> | 
        <button class="border-0 mx-5" onclick=addToWishList(${item.id})>WishList</button>
      </div>
    </div>
    `;




      a.innerHTML += addData;
      total += item.price;
      priceAfterDiscount += item.priceAfterDiscount;


    }


    )

    totalProduct.innerHTML = `MY CARTS (${cart.length}) ITEMS`;
    totalCost.innerHTML = `Total: Rs ${priceAfterDiscount}`;










    order = `<h5 class="fw-bold mt-3 border-bottom">COUPONS</h5>
    
      
<div>
  
  <h6 class="fw-bold px-3">Price Details</h6>
  <div class="row px-3">
    <p class="col-7">Price Details:</p>
    <p class="col-5">Rs. ${total}</p>
    <p class="col-7">Bag Discounts:</p>
    <p class="col-5">Rs. ${total - priceAfterDiscount}</p>
    <p class="col-7">Coupon Discounts:</p>
    <p class="col-5">Apply Coupon</p>
    <p class="col-7">Order Total:</p>
    <p class="col-5">Rs. ${priceAfterDiscount}</p>
    <p class="col-7">Delivery Charges:</p>
    <p class="col-5"><del>Rs. 99</del> free </p>
    <hr>
    <p class="col-7">Total</p>
    <p class="col-5">Rs. ${priceAfterDiscount}</p>
    
     
  </div>
  <a href="checkout.htm"><button class="btn bgColor form-control mb-3"> PLACE ORDERS</button></a>
</div>`



    placeOrder.innerHTML = order;
    placeOrder.innerHTML = order;


  }



}










// REMOVE PRODUCTS
function removeProduct(productId) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  let cart1 = cart.filter(item => item.id != productId)
  localStorage.setItem('cart', JSON.stringify(cart1));

  updateData();
}

function removeWishProduct(productId) {
  let wishList = JSON.parse(localStorage.getItem('wishList'));
  let wish1 = wishList.filter(item => item.id != productId)
  localStorage.setItem('wishList', JSON.stringify(wish1));

  updateWishList();
}









// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    logo.classList.add('noLogo')
    topBtn.style.display = 'block';

  } else {
    navbar.classList.remove("sticky");
    logo.classList.remove('noLogo');
    topBtn.style.display = 'none';

  }
}







topBtn.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});







function countryFlag(cName) {

  if (cName === 'UK') {
    myImage.src = 'img\\UK.png';
    img1.src = myImage.src;
  } else if (cName === 'FRANCE') {
    myImage.src = 'img\\france.png';
    img1.src = myImage.src;
  } else if (cName === 'USA') {
    myImage.src = 'img\\USA.png';
    img1.src = myImage.src;
  } else if (cName === 'INDIA') {
    myImage.src = 'img\\INDIA.png';
    img1.src = myImage.src;
  }





}


country.addEventListener('change', (event) => {

  // change contact number
  num.textContent = event.target.value;
  let index = country.selectedIndex;
  const countryName = country.options[index].label;

  // Change country flag
  countryFlag(countryName);








})








loadFile();



// UPDATE DATA

$(document).ready(function () {
  updateWishList();






})

$(document).ready(function () {


  updateData();




})


saveChanges.addEventListener('click', editData);


// RELATED PRODUCT CAROUSOL



next.addEventListener("click", e => {
  carousel.scrollBy(width + gap, 0);
  if (carousel.scrollWidth !== 0) {
    prev.style.display = "flex";
  }
  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "none";
  }
});
prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.display = "none";
  }
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "flex";
  }
});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));


// EDIT DATA
function editData() {
    save = `<div>
  <h2>My Profile</h2>
  <hr>
  <table class="table table-borderless">
      <tr>
          <td>Mobile</td>
          <td></td>
      </tr>
      <tr>
          <td>Full Name</td>
          <td>Jay Satish Londhe</td>
      </tr>
      <tr>
          <td>Email id</td>
          <td>jay1341990@gmail.com</td>
      </tr>
      <tr>
          <td>Gender</td>
          <td>Male</td>
      </tr>
      <tr>
          <td>Date of Birth</td>
          <td>-not added-</td>
      </tr>
      <tr>
          <td>Location</td>
          <td>Akola</td>
      </tr>
      <tr>
          <td>Alternate Mobile</td>
          <td>7020011909</td>
      </tr>
      <tr>
          <td>Nick Name</td>
          <td>7020011909</td>
      </tr>
  </table> <br><br>
  <a href="Edit.htm"> <button type="button" class="btn px-5">
      Edit
  </button></a>

  </div>`

  myProfile.innerHTML = 'jay';
}
















