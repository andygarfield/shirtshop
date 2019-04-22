<template>
<v-container fluid class="fill">
  <v-layout row xs12 class="fill">
    <v-flex class="fill">
      <v-card flat class="fill">
        <v-layout row wrap>
          <v-flex xs12 sm4 pa-1>
            <v-layout row wrap>
              <v-flex xs12 pa-3>
                <v-img :src="'/product_images/' + product.image"></v-img>
              </v-flex>
              <v-flex xs4 pa-3>
                <div pa-2 class="thumbnail-background" v-if="imageSelected === 1">
                <div>
                  <v-img
                    @click="imageSelected = 1"
                    :src="'/product_images/' + product.image_2"
                  ></v-img>
                </div>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm8 pa-1>
            <v-btn outline small @click="goBack">Go back</v-btn>
            <v-card-text class="display-2">{{ product.name }}</v-card-text>
            <v-card-text>{{ product.description }}</v-card-text>
            <v-layout>
              <attribute-selector
                header="Size"
                :attributes="sizes"
                @attributeSelected="selectSize"
              >
              </attribute-selector>
            </v-layout>
            <v-layout>
              <color-selector
                header="Color"
                :colors="colors"         
                @colorSelected="selectColor"
              >
              </color-selector>
            </v-layout>
            <div class="pt-4">
              <v-btn
                large class="info" :disabled="!cardEnabled"
                @click="addToCart(product.product_id, product.name)"
              >Add To Cart</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import AttributeSelector from './AttributeSelector';
import ColorSelector from './ColorSelector';
import { routerGoBack } from '../helpers';

export default {
  components: {
    AttributeSelector,
    ColorSelector
  },
  data: () => ({
    imageSelected: 1,
    selectedSize: null,
    selectedColor: null
  }),
  computed: {
    productID() {return this.$route.params.id},
    cardEnabled() {return this.selectedSize && this.selectedColor ? true : false},
    actualPrice() {
      return this.product.discounted_price === 0
        ? this.product.discounted_price
        : this.product.price
    },
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
    selectSize(sizeName) {
      this.selectedSize = sizeName;
    },
    selectColor(colorName) {
      this.selectedColor = colorName;
    },
    goBack: routerGoBack,
    addToCart(productID, productName) {
      this.pushToCart([
        productID,
        productName,
        this.selectedSize,
        this.selectedColor,
        this.actualPrice
      ]);
    },
    ...mapMutations([
      'pushToCart'
    ]),
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
