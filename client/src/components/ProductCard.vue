<template>
  <v-hover>
    <v-card
      @mouseover="getProductAttributes(product.product_id)"
      slot-scope="{ hover }"
      class="mx-auto"
      color="grey lighten-4"
      max-width="600"
    >
      <v-img
        :src="'/product_images/' + product.image"
      >
      </v-img>
      <v-card-text
        class="pt-4"
        style="position: relative;"
      >
        <h6 class="title mb-0 pb-3">{{ product.name }}</h6>
        <p
          class="align-center headline font-weight-black"
        >
          {{
            product.discounted_price != 0
              ? product.discounted_price
              : product.price | toCurrency
          }}
        </p>
        <p
          class="subheading text-xs-center"
        >
          <span
            class="red--text"
            v-if="product.discounted_price !== 0"
          >
            <s>{{ product.price | toCurrency }}</s>
          </span>
          <span 
            v-if="product.discounted_price === 0"
          >

          </span>
        </p>
      </v-card-text>
      <v-expand-transition>
        <div
          v-if="hover"
          class="d-flex transition-fast-in-fast-out shirt-blue darken-2 v-card--reveal display-3"
          >
          <div>
            <p class="headline font-weight-black white--text">
              {{ product.name }}
            </p>
            <p
              class="align-center headline font-weight-black"
              style="color: #FFCDD2"
            >
              {{
                product.discounted_price != 0
                  ? product.discounted_price
                  : product.price | toCurrency
              }}
            </p>
            <div class="text-xs-center">
              <attribute-selector
                header="Size"
                headerColor="white"
                @attributeSelected="selectSize"
                :attributes="currentSizes"
                :small="true"
              ></attribute-selector>
            </div>
            <div>
              <color-selector
                header="Color"
                headerColor="white"
                :colors="currentColors"
                @colorSelected="selectColor"
                :small="true"
              ></color-selector>
            </div>
            <v-btn
              @click="addToCart(product.product_id, product.name)"
              v-if="selectedColor && selectedSize"
              outline
              color="white"
              small
            >
              Add to Cart
            </v-btn>
            <router-link class="router-button" :to="'/product/' + product.product_id">
              <v-btn
                outline
                color="white"
                small
              >
                View Details
              </v-btn>
            </router-link>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </v-hover>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { copyObj, toCurrency } from '../helpers';
import AttributeSelector from './AttributeSelector';
import ColorSelector from './ColorSelector';

export default {
  props: [
    'product'
  ],
  components: {
    AttributeSelector,
    ColorSelector
  },
  data: () => ({
    clicked: false,
    selectedSize: null,
    selectedColor: null
  }),
  computed: {
    actualPrice() {
      return this.product.discounted_price !== 0
        ? this.product.discounted_price
        : this.product.price
    },
    ...mapState({
      currentSizes: 'currentSizes',
      currentColors: 'currentColors',
    })
  },
  methods: {
    toggleClicked() {this.clicked = !this.clicked},
    selectSize(sizeName) {
      this.selectedSize = sizeName;
    },
    selectColor(colorName) {
      this.selectedColor = colorName;
    },
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
      'getProductAttributes'
    ])
  },
  filters: {
    toCurrency: toCurrency
  }
}
</script>

<style>
  .shirt-blue {
    background-color: #0690C7;
    border-color: #0690C7;
  }

  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    background-color: rgba(6, 144, 199, 0.5);
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .router-button {
    text-decoration: none;
  }
</style>