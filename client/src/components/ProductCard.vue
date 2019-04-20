<template>
  <v-hover>
    <v-card
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
          v-if="product.discounted_price != 0"
          class="subheading text-xs-center"
        >
          <span class="red--text">
            <s>{{ product.price | toCurrency }}</s>
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
            <router-link class="router-button" :to="'/product/' + product.product_id">
              <v-btn
                outline
                color="white"
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
export default {
  props: [
    'product'
  ],
  filters: {
    toCurrency: function(value) {
      if (typeof value !== "number") {
          return value;
      }
      var formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2
      });
      return formatter.format(value);
    }
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