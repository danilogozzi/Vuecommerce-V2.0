<template>
  <footer class="footer">
    <v-container>
      <v-row>
        <v-col sm="6" md="6">
          <p>
            Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          </p>
        </v-col>
        <v-col sm="6" md="6"> Vuemmerce | Made with ❤ </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
  
  },
})
export default class Footer extends Vue {
}
</script>

<style lang="scss">
.footer {
  clear: both;
  background-color: #b9e2fc;
  height: 15rem;
  display: flex;
  align-items: center;
}
</style>