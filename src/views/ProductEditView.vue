<template>
    <div id="ProductEdit">
      <div class="header">
      <h1>제품 {{ product.id > 0 ? "수정" : "등록" }}</h1>
      <div>
        <input type="text" placeholder="이름을 입력하세요." v-model="product.title"/>
      </div>
      <div>
        <input type="number" placeholder="가격을 입력하세요." v-model="product.price"/>
      </div>
      <div>
        <input type="number" placeholder="수량을 입력하세요." v-model="product.quantity"/>
      </div>
      <div>
        <select v-model="product.category">
          <option value="">카테고리를 선택하세요</option>
          <option value="음료수">음료수</option>
          <option value="과자">과자</option>
          <option value="주류">주류</option>
        </select>
      </div>
      <div>
        <button type="button" @click="save">저장</button>
        <button type="button" @click="goList">취소</button>
        <div>금액: {{ calculateAmount(product) }}</div>
        <!-- {{ product.price * product.quantity }}와 동일 -->
      </div>
      </div>
    </div>
  </template>
  
  <script>
  import { loadProduct, updateProduct, insertProduct} 
          from '../productService';
  
  export default {
    name: "ProductEditView",
    data() {
      return {
        product: { }
      };
    },
    async mounted() { 
      const id = this.$route.params.id;
      if (id > 0)
        this.product = await loadProduct(id);
      else
        this.product = {id:0, title: "", price: 0, category: "" };
    },
     methods: {
      async save() {
         if (this.product.id > 0)
           await updateProduct(this.product);
         else 
          await insertProduct(this.product);
        this.goList();
      },
      goList() {
        this.$router.push("/product/");
      },
      calculateAmount(product) {
      return product.quantity * product.price;
    }
    }
  }
  </script>
  
  <style>
  div.header { margin-left:250px;}
  h1 { font-size: 35px;}
  input[type=text], input[type=number] { padding: 6px; width: 200px; }
  select { padding: 6px; width: 150px }
  div { margin-bottom: 15px; }
  label { margin-right: 15px; }
  button { padding: 5px 20px; margin-right: 10px; }
  </style>
  
  