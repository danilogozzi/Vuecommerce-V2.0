<template>
  <div>
    <Header />
    <section>
      <v-container>
        <v-row>
          <v-col sm="12" md="12" class="showcase">
            <v-card class="item-prod">
              <img
                src="https://bulma.io/images/placeholders/480x480.png"
                alt=""
              />
              <div class="detailProduct">
                <v-card-text
                  ><h2>{{ selectProducts.name }}</h2></v-card-text
                >
                <v-card-subtitle>{{
                  selectProducts.description
                }}</v-card-subtitle>
                <v-container>
                  <v-row class="cx-info">
                    <v-col sm="12" md="12">
                      <v-rating
                        v-model="selectProducts.rating"
                        medium
                        color="dark"
                        background-color="dark dark"
                      ></v-rating>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container>
                  <v-row>
                    <v-col sm="9" md="9">
                      <span>R$ {{ selectProducts.value }}</span>
                    </v-col>
                    <v-col sm="3" md="3">
                      <div class="prodQtd">
                                            <input
                      v-model="selectProducts.qtdInCart"
                      class="qtd-prod"
                      min="0"
                      type="number"
                    />
                        <br />
                                            <v-btn
                      @click="incrementar(selectProducts, userList)"
                      v-if="!selectProducts.inCart"
                      class="add-item"
                      >Add to cart</v-btn
                    >
                      <v-btn @click="decrementar(selectProducts)" v-else class="remove-item"
                      >Remove from cart</v-btn
                    >
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import { Shop } from "@/store";
import { getModule } from "vuex-module-decorators";

@Component({
  components: {
    Header,
  },
})
export default class DetailProduct extends Vue {
  selectProducts = Shop.state._selectProducts;
  shop = getModule(Shop, this.$store);
  delta = 1 | 0;
  qtdInCart = 0;
  list = [];

  get qtdProducts(): number {
    return this.shop.qtdProducts;
  }

    get userList(): Array<any> {
    return this.shop.userList;
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

  decrementar(selectProducts: any): void {
    this.shop.decrementar(this.delta);
    selectProducts.inCart = false;
    this.userList.splice(selectProducts, 1);
    Shop.state._total -= selectProducts.value * selectProducts.qtdInCart;
  }
}
</script>

<style lang="scss" scoped>
.item-prod {
  border: #0005;
  width: max-content;
  height: max-content;
  margin: 1rem 1rem;
  display: flex !important;
  align-items: stretch !important;
  flex-direction: row !important;
  justify-content: space-evenly;
  cursor: pointer;
  .cx-info {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: max-content;
    padding: 0.8rem;
    height: max-content;
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
  .prodQtd {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.showcase {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>