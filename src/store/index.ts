/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
@Module({ name: 'shop' })
export class Shop extends VuexModule {
  _products: { name: string, value: number, description: string, rating: number, inCart: boolean, inSearch: boolean, qtdInCart?: number }[] =
    [
      {
        name: 'Product 1',
        value: 150,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud',
        rating: 1,
        inCart: false,
        inSearch: false,
        qtdInCart: 1
      },
      {
        name: 'Product 2',
        value: 250,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud',
        rating: 2,
        inCart: false,
        inSearch: false,
        qtdInCart: 1
      },
      {
        name: 'Product 3',
        value: 350,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud',
        rating: 3,
        inCart: false,
        inSearch: false,
        qtdInCart: 1
      },
      {
        name: 'Product 4',
        value: 450,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud',
        rating: 4,
        inCart: false,
        inSearch: false,
        qtdInCart: 1
      },
      {
        name: 'Product 5',
        value: 550,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud',
        rating: 5,
        inCart: false,
        inSearch: false,
        qtdInCart: 1
      }
    ]
  _selectProducts?: []
  _searchProducts = this._products
  _qtdProducts = 0
  _user?: { name: string, email: string, password: string }
  _userList: [] = []
  _total = 0
  _userWishlist: [] = []
  _load = false

  get products(): Array<any> {
    return this._products
  }
  get qtdProducts(): number {
    return this._qtdProducts
  }
  get selectProducts(): any {
    return this._selectProducts
  }
  get searchProducts(): Array<any> {
    return this._searchProducts
  }
  get user(): any {
    return this._user
  }
  get userList(): Array<any> {
    return this._userList
  }
  get total(): number {
    return this._total
  }
  get userWishlist(): any {
    return this._userWishlist
  }
  get load(): boolean {
    return this._load
  }



  @Mutation
  _incrementar(delta: number): void {
    this._qtdProducts += Number(delta)
  }

  @Action({ commit: '_incrementar' })
  incrementar(delta: number): number {
    return delta
  }

  @Action
  decrementar(delta: number): void {
    this.context.commit('_incrementar', this.qtdProducts != 0 ? -delta : '')
  }
}

export default new Vuex.Store({
  modules: {
    Shop
  },

})
