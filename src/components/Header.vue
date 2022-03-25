<template>
  <header class="header">
    <v-container>
      <nav>
        <v-row>
          <v-col xs="12" sm="12" md="9" class="start">
            <router-link to="/">
              <img
                to="/"
                class="logo"
                src="https://ivanlori.github.io/Vuemmerce/_nuxt/img/vuemmerce-logo.6809a10.png"
              />
            </router-link>
            <input
              v-on:keyup.enter="srcProducts"
              v-model="srcProduct"
              placeholder="Search..."
              class="search"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3" class="usermenu">
            <i class="fab fa-facebook"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-linkedin"></i>

            <v-dialog transition="dialog-top-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                  <i class="fas fa-shopping-cart">{{ qtdProducts }}</i>
                </v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card v-if="!bought">
                  <v-toolbar color="primary" dark><h3>Checkout</h3></v-toolbar>
                  <v-card-text>
                    <div
                      class="text-h6 pa-4"
                      v-for="(ul, i) in userList"
                      :key="i"
                    >
                      {{ ul.name }} - Quantity:{{ ul.qtdInCart }}
                      <br />
                      R${{ ul.value * ul.qtdInCart }}
                      <v-btn
                        @click="decrementar(ul, i)"
                        class="float-right warning"
                        >Remove from cart</v-btn
                      >
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn class="success" text @click="buy(products)"
                      >Buy {{ qtdProducts }} products at {{ total }}R$</v-btn
                    >
                    <v-btn class="error" text @click="dialog.value = false"
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-card>
                <v-card v-else class="bought">You bought it :-)</v-card>
              </template>
            </v-dialog>
            <div v-if="!load">
              <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text v-bind="attrs" v-on="on"
                    ><i class="fas fa-user-plus"></i>&nbsp;
                    <h5>Sign Up</h5></v-btn
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="primary" dark>Sign Up</v-toolbar>
                    <v-card-text>
                      <div class="text-h2 pa-12">
                        <v-text-field
                          label="Name"
                          :rules2="rules2"
                          hide-details="auto"
                          v-model="name"
                        ></v-text-field>
                        <v-text-field
                          label="E-mail"
                          :rules2="rules2"
                          hide-details="auto"
                          v-model="email"
                        ></v-text-field>
                        <v-text-field
                          v-model="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="signIn(), (dialog.value = false)"
                        >Sign Up</v-btn
                      >
                      <v-btn text @click="dialog.value = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text v-bind="attrs" v-on="on"
                    ><i class="fas fa-user"></i>&nbsp;
                    <h5>Log In</h5></v-btn
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="primary" dark>Log In</v-toolbar>
                    <v-card-text>
                      <div class="text-h2 pa-12">
                        <v-text-field
                          label="E-mail"
                          :rules2="rules2"
                          hide-details="auto"
                          v-model="email"
                        ></v-text-field>
                        <v-text-field
                          v-model="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password required"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="logIn(), (dialog.value = false)"
                        >Log In</v-btn
                      >
                      <v-btn text @click="dialog.value = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </div>
            <div v-else>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" text>
                    Welcome {{ name }}!
                  </v-btn>
                </template>
                <div class="userMenu">
                  <div>
                    <router-link to="wishlist"> Wish List </router-link>
                  </div>
                  <div @click="load = false">Logout</div>
                </div>
              </v-menu>
            </div>
          </v-col>
        </v-row>
      </nav>
    </v-container>
  </header>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Shop } from "@/store";

@Component
export default class Header extends Vue {
  shop = getModule(Shop, this.$store);
  srcProduct = "";
  name = "";
  email = "";
  repeatpass = "";
  delta = 1 | 0;
  password = "";
  show1 = false;
  rules = {
    required: (value: any) => !!value || "Required.",
    min: (v: any) => v.length >= 8 || "Min 8 characters",
    emailMatch: (): string => `The email and password you entered don't match`,
  };
  rules2 = [
    (value: any) => !!value || "Required.",
    (value: any) => (value && value.length >= 3) || "Min 3 characters",
  ];
  load = Shop.state._load;
  items = [{ title: "Wish List" }, { title: "Logout" }];
  bought = false;

  get qtdProducts(): number {
    return this.shop.qtdProducts;
  }

  get userList(): Array<any> {
    return this.shop.userList;
  }

  get total(): number {
    return this.shop.total;
  }
  get products(): Array<any> {
    return this.shop.products;
  }

  buy(products: Array<any>): void {
    for (const p of products) {
      this.bought = true;
      this.load = false;
      p.qtdInCart = 0
      p.inCart = false
      Shop.state._qtdProducts = 0
      Shop.state._total = 0
      this.userList.pop()
      setTimeout(()=> this.bought = false, 2000);
    }
  }
  logIn(): void {
    console.log(this.email, this.password);
    this.load = true;
  }
  signIn(): void {
    console.log(this.name, this.email, this.password);
  }
  decrementar(ul: any, i: number): void {
    this.shop.decrementar(this.delta);
    ul.inCart = false;
    Shop.state._total -= ul.value * ul.qtdInCart;
    i != -1 ? this.userList.splice(i, 1) : "";
  }
  srcProducts(): void {
    Shop.state._searchProducts = Shop.state._products;
    if (this.srcProduct == "" || this.srcProduct == " ") {
      Shop.state._searchProducts = Shop.state._products;
    } else {
      Shop.state._searchProducts = Shop.state._products.filter(
        (ps: any) =>
          ps.name ==
          this.srcProduct[0].toUpperCase() +
            this.srcProduct.slice(1).toLowerCase()
      );
    }
  }
}
</script>
<style lang="scss">
header {
  nav {
    .start {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .logo {
        width: 12rem;
        cursor: pointer;
        margin-right: 2rem;
      }
    }
    .search {
      border: 1px solid #0003;
      outline: none;
      height: 2.5rem;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
      text-indent: 15px;
    }
    .usermenu > button {
      background-color: white !important;
      text-transform: capitalize;
    }
    .usermenu {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .usermenu > i {
      cursor: pointer;
    }
    .usermenu > i:nth-child(1) {
      cursor: pointer;
      color: darkblue;
    }
    .usermenu > i:nth-child(2) {
      cursor: pointer;
      color: darkturquoise;
    }
    .usermenu > i:nth-child(3) {
      cursor: pointer;
      color: saddlebrown;
    }
    .usermenu > i:nth-child(4) {
      cursor: pointer;
      color: darkslateblue;
    }
    .usermenu > i:nth-child(5) {
      cursor: pointer;
      color: #0009;
    }
  }
}
.bought {
  height: 10rem;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.userMenu {
  background-color: white;
  padding: 0.5rem;
}
.userMenu > div {
  margin: 0.5rem 0;
  cursor: pointer;
}
.userOption a,
.userMenu a {
  color: black !important;
  text-decoration: none;
}
.userOption {
  .btn-logout {
    cursor: pointer;
  }
}
</style>
