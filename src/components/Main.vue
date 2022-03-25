<template>
  <main>
    <section class="banner">
      <v-container>
        <v-row>
          <v-col sm="12" md="12">
            <h2>Free ecommerce template for Vue.js projects</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <v-container>
        <v-row>
          <v-col sm="12" md="12" class="showcase">
            <v-card v-for="(p, i) in searchProducts" :key="i" class="item-prod">
              <router-link to="/detailproduct">
                <img
                  @click="setSelectProducts(p)"
                  src="https://bulma.io/images/placeholders/1280x960.png"
                  alt=""
                />
              </router-link>
              <v-card-text
                ><h2>{{ p.name }}</h2></v-card-text
              >
              <v-card-subtitle>{{ p.description }}</v-card-subtitle>
              <v-container>
                <v-row class="cx-info">
                  <v-col sm="9" md="9">
                    <v-rating
                      background-color="dark dark"
                      color="dark"
                      v-model="p.rating"
                      medium
                    ></v-rating>
                  </v-col>
                  <v-col sm="3" md="3">
                    <span>R$ {{ p.value }}</span>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col sm="9" md="9">
                    <v-btn
                      @click="incrementar(p, userList)"
                      v-if="!p.inCart"
                      class="add-item"
                      >Add to cart</v-btn
                    >
                    <v-btn @click="decrementar(p, i)" v-else class="remove-item"
                      >Remove from cart</v-btn
                    >
                  </v-col>
                  <v-col sm="3" md="3">
                    <input
                      v-model="p.qtdInCart"
                      class="qtd-prod"
                      min="0"
                      type="number"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Shop } from "@/store";

@Component
export default class Main extends Vue {
  shop = getModule(Shop, this.$store);
  delta = 1 | 0;
  qtdInCart = 0;
  list = [];
  ratings = []
  
  get qtdProducts(): number {
    return this.shop.qtdProducts;
  }

  get selectProducts(): any {
    return this.shop._selectProducts;
  }

  get searchProducts(): Array<any> {
    return this.shop.searchProducts;
  }

  get userList(): Array<any> {
    return this.shop.userList;
  }

  get userWishlist(): Array<any> {
    return this.shop.userWishlist;
  }

  setSelectProducts(p: any): void {
    Shop.state._selectProducts = p;
  }

  incrementar(p: any, userList: Array<any>): void {
    this.shop.incrementar(this.delta);
    userList.push(p);
    p.inCart = true;
    Shop.state._total += p.value * p.qtdInCart;
  }

  decrementar(p: any, i: number): void {
    this.shop.decrementar(this.delta);
    p.inCart = false;
    this.userList.splice(i, 1);
    Shop.state._total -= p.value * p.qtdInCart;
  }
}
</script>

<style lang="scss">
.banner {
  background-color: #51bafc;
  color: white;
  font-size: 1.2rem;
  height: 23rem;
  display: flex;
  align-items: center;
  text-indent: 15rem;
}
.item-prod {
  border: #0005;
  width: 30rem;
  height: 41rem;
  margin: 1rem 1rem;
  display: flex !important;
  align-items: center !important;
  flex-direction: column !important;
  cursor: pointer;
  .cx-info {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #0002;
  }
  img {
    width: 100%;
    padding: 0.8rem;
  }
  .qtd-prod {
    width: 4rem;
    height: 2rem;
    border: 1px solid #0005;
    border-radius: 10px;
    text-indent: 1rem;
    text-align: center;
  }
  .add-item {
    background-color: #00c4a7 !important;
  }
}
.showcase {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>