<template>
<v-container fluid class="fill">
  <v-layout row xs12 class="fill">
    <v-flex class="fill">
      <v-card flat class="fill">
        <v-layout row wrap>
          <v-flex xs4 pa-1>
            <v-layout row wrap>
              <v-flex xs12 pa-3>
                <v-img :src="'/product_images/' + product.image"></v-img>
              </v-flex>
              <v-flex xs4 pa-3>
                <div pa-2 class="thumbnail-background" v-if="imageSelected === 1">
                <div>
                  <v-img
                    @click="imageSelected = 1"
                    :src="'/product_images/' + product.image"
                  ></v-img>
                </div>
                </div>
              </v-flex>
              <v-flex xs4 pa-3>
                <div class="thumbnail-background" v-if="imageSelected === 2">
                  <v-img
                    class="pa-2"
                    @click="imageSelected = 2"
                    :src="'/product_images/' + product.image_2"
                  ></v-img>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs8 pa-1>
            <v-btn outline @click="goBack">Go back</v-btn>
            <v-card-text>{{ product.description }}</v-card-text>
            <v-layout>
              <attribute-selector
                :attributes="sizes"         
              >
              </attribute-selector>
            </v-layout>
            <v-layout>
              <attribute-selector
                :attributes="colors"         
              >
              </attribute-selector>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AttributeSelector from './AttributeSelector';

export default {
  components: {
    AttributeSelector
  },
  data: () => ({
    imageSelected: 1
  }),
  computed: {
    productID() {return this.$route.params.id},
    ...mapState({
      product: 'currentProduct',
      sizes: 'currentSizes',
      colors: 'currentColors'
    })
  },
  mounted() {
    this.getProduct(this.productID);
    this.getProductAttributes(this.productID);
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    ...mapActions([
      'getProduct',
      'getProductAttributes'
    ])
  },
  created() {
  },
  watch:{
    $route (to, from){
      this.getProduct(this.productID);
      this.getProductAttributes(this.productID);
    }
  } 
}
</script>

<style scoped>
.fill {
  height: 100%;
}

.thumbnail-background {
  background-color: crimson;
}
</style>
