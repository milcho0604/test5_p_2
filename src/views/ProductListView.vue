<template>
    <div id="ProductListView">
      <div class="header">
        <h1>제품 목록</h1>
      </div>
      <table>
        <tr><td></td><td>id</td><td>제품명</td><td>수량</td><td>가격</td><td>금액</td><td>카테고리</td></tr>
        <tr v-for="product in products" v-bind:key="product.id" v-on:click="goEdit(product.id)">
          <td><input type="checkbox" v-model="product.checked" v-on:click.stop /></td>
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.price }}</td>
          <td>{{ calculateAmount(product) }}</td>
          <!-- {{ product.price * product.quantity }}와 동일, 가격의 합-->
          <td>{{ product.category }}</td>
        </tr>
      </table>
      <!-- 총액은 가격(price)이 아닌 금액(price * quantity)의 합 -->
      <div>총액: {{ total }}</div>
      <div><button type="button" @click="goEdit(0)">등록</button>
      <button type="button" @click="remove(0)">삭제</button>
      <button type="button" @click="reload">새로고침</button>
    </div>
    </div>
  </template>
  
  <script>
  import { loadProducts, deleteProduct } from '../productService';
  
  export default {
    name: "ProductListView",
    data() {
      return {
        products: [ ]
      }
    },
    computed: {
    total() {
        return this.products.reduce((sum, product) => sum + product.quantity * product.price, 0);
    },
  },
    async mounted() {
      this.products = await loadProducts();
    },
    methods: {
      async reload(){
        this.products = await loadProducts();
      },
      goEdit(id) {
        this.$router.push("/product/edit/" + id);
      },
      async remove() {
        const removeIds = this.products
        .filter(product => product.checked)
        .map(product => product.id);
        if (confirm('선택한 제품을 삭제하시겠습니까?')) {
        await Promise.all(removeIds.map(id => deleteProduct(id)));
        this.reload();
      }
      },
    //   {{ product.price * product.quantity }}로 사용하려면 아래 calculateAmount를 삭제
      calculateAmount(product) {
      return product.quantity * product.price;
    }
    }
  }
  </script>
  
  <style scoped>
  div.header { display: flex; justify-content: space-between; align-items: baseline; }
  button { padding: 5px 20px;  margin-top: 10px ; }
  h1 { font-size: 35px; margin-left: 10px; }
  table { border-collapse: collapse; width: 60%; margin : auto; text-align: center; }
  tr:nth-child(1) { background-color: #eee; text-align: center; }
  td { border: 1px solid gray; padding: 6px; }
  td:nth-child(1) { text-align: center; width: 30px; }
  tr:hover { background-color: #ffd; cursor: pointer }
  tr.done { background-color: #f8f8f8; color: #bbb; text-decoration: line-through; }
  div:nth-child(3) { margin-left: 250px; margin-top: 5px; }
  div:nth-child(4) { padding: 5px 20px; margin-left: 230px; margin-top: 10px ; }
  </style>
  
  