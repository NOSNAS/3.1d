<script>
import { RouterLink, RouterView } from 'vue-router'
import { ref, reactive, computed } from 'vue';
export default {
  name: "App",
  data: () => ({
    showProductList: true,
    showDescription: false, 
    searchQuery: '',
    selectedItem: null,
    productList: [
      {
        title: "GLASSES",
        price: 150,
        count: 0,
        img: "src/assets/1.png",
        description: "High-quality designer glasses for a stylish look. ",

      },
      {
        title: "BACKPACK",
        price: 50,
        count: 0,
        img: "src/assets/2.png",
        description: "the perfect companion for your everyday adventures.",
      },
      {
        title: "CLOTHES",
        price: 55,
        count: 0,
        img: "src/assets/4.png",
        description:"Our garments are carefully curated to cater to your diverse needs and preferences, offering a wide range of options for every occasion.",
      },
      {
        title: "HELMET",
        price: 45,
        count: 0,
        img: "src/assets/5.png",
        description:"prioritize your safety without compromising on style or comfort",
      },
      {
        title: "HEADPHONE",
        price: 50,
        count: 0,
        img: "src/assets/6.png",
        description:"designed to elevate your audio experience to new heights.",
      },
      {
        title: "BOTTLE",
        price: 50,
        count: 0,
        img: "src/assets/7.png",
        description:"designed to keep your beverages at the ideal temperature.",
      },
      {
        title: "BOOK",
        price: 30,
        count: 0,
        img: "src/assets/8.png",
        description:" windows into different worlds, voices of wisdom, and vessels of inspiration.",
      },
      {
        title: "IPAD",
        price: 599,
        count: 0,
        img: "src/assets/9.png",
        description:" seamlessly integrates into your daily life. ",
      },
      {
        title: "WATCH",
        price: 555,
        count: 0,
        img: "src/assets/10.png",
        description:" a testament to precision, craftsmanship, and timeless elegance.",
      },
      {
        title: "SOCK",
        price: 25,
        count: 0,
        img: "src/assets/11.png",
        description:"featuring luxurious materials that wrap your feet in softness while providing durability that lasts.",
      },
      {
        title: "PANT",
        price: 50,
        count: 0,
        img: "src/assets/12.png",
        description:"Crafted with precision and tailored to perfection",
      },

    ],
  }),
  computed: {
    // Calculate the total price of items in the shopping cart
    total() {
      let sum = 0;  
      this.productList.forEach((item) => {
        sum += item.count * item.price;
      });
      return sum;
    },
    // Filter the product list to show only items with a count greater than 0
    cartList() {
      return this.productList.filter((item) => item.count > 0);
    },
    // Filter the product list based on the user's search query
    filteredProductList() {
      return this.productList.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    // Increase the count of a product when the "+ or —" button is clicked
    handleAdd(index) {
      this.productList[index].count += 1;
    },
    handleSub(index) {
      this.productList[index].count -= 1;
    },
    // Toggle between displaying the product list and the shopping cart
    toggleView() {
      this.showProductList = !this.showProductList;
    },
    // Toggle the visibility of product descriptions
    toggleDescription() {
      this.showDescription = !this.showDescription; 
    },
    // Perform a product search based on the user's input
    searchItems() {
      
      this.showProductList = true; 
    },
    // Show details of a selected product
    showSelectedItem(item) {
      this.selectedItem = item;
    },

    
    clearSelectedItem() {
      this.selectedItem = null;
    },
    // Determine whether a product should be displayed based on the search query
    shouldShowProduct(item) {
      return (
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        this.searchQuery.length > 0
      );
    },
  },
};


</script>

<template>
  <header>
    <h1>VueSHOP The Shopping Mall</h1>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">Recommend</RouterLink>
        <RouterLink to="children">Advance</RouterLink>
        <RouterLink to="/backend">Backend</RouterLink>
      </nav>
    </div>
  </header>

  <section>
    <button @click="toggleView">{{ showProductList ? 'GO TO CART' : 'SHOW PRODUCT' }}</button>
  </section>

  <section class="search-bar">
    <input v-model="searchQuery" type="text" placeholder="Search by name" />
    <button @click="searchItems">Search</button>
  </section>

  <section class="product-list">
    <ul class="list">
      <li v-for="(item, index) in productList" :key="index">
        <div class="product-item" v-if="shouldShowProduct(item)">
          <img :src="item.img" alt="" class="product-img" />
          <div class="product-info">
            
            <button @click="showSelectedItem(item)">VIEW DETAILS</button>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="selectedItem" class="selected-item">
      <img :src="selectedItem.img" alt="" class="selected-img" />
      <h2>{{ selectedItem.title }}</h2>
      <p>{{ selectedItem.description }}</p>
      <p>PRICE:  {{ selectedItem.price }}</p>
      <button @click="clearSelectedItem">GO BACK</button>
    </div>
  </section>

  <section v-if="showProductList" class="product">
    <ul class="list">
      <li v-for="(item, index) in productList" :key="index">
        <img :src="item.img" alt="" class="responsive-img"/>
        <div class="title">{{ item.title }}</div>
        <div class="description" v-show="showDescription">{{ item.description }}</div>
        <button @click="toggleDescription">Description</button>
        
        <div class="price">PRICE: {{ item.price }}</div>
        <div class="btn add-to-cart" @click="handleAdd(index)" v-if="!item.count">
          ADD TO CART
        </div>
        <div class="btn-box" v-else>
          <div class="btn" @click="handleSub(index)">-</div>
          <div>{{ item.count }}</div>
          <div class="btn" @click="handleAdd(index)">+</div>
        </div>
      </li>
    </ul>
  </section>
  <!-- Cart Table -->
  <section v-else class="cart">
    <ul class="list-header">
      <li>NO.</li>
      <li>NAME</li>
      <li>PICTURE</li>
      <li>QUANTITY</li>
      <li>PRICE</li>
    </ul>
    <ul class="list-body">
      <li v-for="(item, index) in cartList" :key="index">
        <div>{{ index }}</div>
        <div>{{ item.title }}</div>
        <div><img :src="item.img" alt="" /></div>
        <div>{{ item.count }}</div>
        <div>{{ item.count * item.price }}</div>
      </li>
    </ul>
  </section>
  <p>information</p>
  <section class="total"><span>TOTAL PRICE:</span>${{ total }}</section>

  <footer>
    <p>Author: Sanson LI</p>
    <p>contact at: email@gmail.com</p>
  </footer>

  <RouterView name="middle"/>
  <RouterView name="bottom"/>
  <RouterView />
</template>

<style scoped>
footer{
  position:fixed;
  left:0;
  right: 0; 
  bottom:0;
  width:50%;
  margin: 0 auto;
  background-color:none;
  color:black;
  text-align:center;
}
.btn {
  text-align: center;
  width: 100%;
  background-color: #4897dd;
  border-radius: 8px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
}
.btn:hover {
  background-color: lightblue;
}
header {
  line-height: 1.5;
  max-height: 100vh;
  background-color: aquamarine;
  text-align: center;
  font-size: 40px;
  border: 1px solid aquamarine;
  border-radius: 16px;
}
.product {
  margin-bottom: 24px;
}
.product .list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.product .list li {
  width: calc(25% - 12px); /* 25% width for each item (4 items in a row). */
  margin-bottom: 12px;
  list-style: none; 
}
.product .list li .title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}
.product .list li .price {
  font-size: 20px;
  margin-bottom: 8px;
}
.product .list li img {
  width: 220px;
  height: 220px;
}
.product .list li .btn-box {
  display: flex;
}
.product .list li .btn-box .btn {
  width: 40px;
}
.product .list li .btn-box > div {
  flex: 1;
  text-align: center;
  line-height: 32px;
}
.cart .list-header {
  display: flex;
}
.cart .list-header li {
  flex: 1;
  border-top: 1px solid #c6c6c6;
  border-left: 1px solid #c6c6c6;
  border-bottom: 1px solid #c6c6c6;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  font-size: 25px;
}
.cart .list-body li {
  display: flex;
  border-top: 1px solid #c6c6c6;
  height: 60px;
  line-height: 44px;
  text-align: center;
  font-size: 20px;
}
.cart .list-body li:first-child {
  border-top: none;
}
.cart .list-body li:last-child {
  border-bottom: 1px solid #c6c6c6;
}
.cart .list-body li > div {
  flex: 1;
  border-left: 1px solid #c6c6c6;
  padding: 8px;
}
.cart .list-header li:last-child,
.cart .list-body li > div:last-child {
  border-right: 1px solid #c6c6c6;
}
.cart .list-body li > div img {
  width: 45px;
  height: 45px;
}
.total {
  text-align: right;
  margin-top: 24px;
  font-size: 32px;
}
.total span {
  margin-right: 12px;
}

nav a {
  font-weight: bold;
  color:black;
  text-decoration:none;
  padding:10px;
  border-radius: 4px;
  border-left: 1px solid var(--color-border);
}

nav a.router-link-exact-active{
  color:black;
  background:lightblue;
}

.responsive-img {
  max-width: 100%; 
  height: auto; 
}

@media only screen and (max-width: 768px) {
  [class*="col-"] {
    width: 100%;
  }
}

.add-to-cart {
  text-align: center;
  width: 100px; 
  background-color: red;
  transition: width 2s; 
  animation-name: example; 
  animation-duration: 4s;
}

.add-to-cart:hover {
  width: 300px; 
}

@keyframes example {
  from {
    background-color: red;
  }
  to {
    background-color: yellow;
  }
}

.description {
  column-count: 3; 
  column-gap: 20px; 
}

.search-bar {
  margin-top: 20px;
  text-align: center;
}

.search-bar input {
  padding: 6px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.search-bar button {
  padding: 6px 12px;
  background-color: #4897dd;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: lightblue;
}

.product-list {
  margin-top: 20px;
}

.selected-item {
  margin-top: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

.selected-item h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.selected-item p {
  font-size: 16px;
  margin-bottom: 8px;
}

.selected-item button {
  padding: 6px 12px;
  background-color: #4897dd;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.selected-item button:hover {
  background-color: lightblue;
}

.product-img {
  max-width: 100%; 
  max-height: 200px; 
  margin-bottom: 10px; 
}

.selected-img {
  max-width: 100%; 
  max-height: 300px; 
  margin-bottom: 10px; 
}


</style>
