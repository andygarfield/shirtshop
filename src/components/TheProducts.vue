<template>
  <v-flex xs9>
    <v-layout wrap>
      <v-flex
        xs4 class="pa-4"
        v-for="p in products"
        :key="p.product_id"
      >
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            class="mx-auto"
            color="grey lighten-4"
            max-width="600"
          >
            <v-img
              :src="p.image"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out shirt-blue darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  {{ p.discounted_price != 0 ? p.discounted_price : p.price | toCurrency }}
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text
              class="pt-4"
              style="position: relative;"
            >
              <h6 class="title mb-0 pb-3">{{ p.name }}</h6>
              <p
                class="text-xs-center headline font-weight-black"
              >
                {{ p.discounted_price != 0 ? p.discounted_price : p.price | toCurrency }}
              </p>
              <p
                v-if="p.discounted_price != 0"
                class="subheading text-xs-center"
              >
                <span class="red--text">
                  <s>{{ p.price | toCurrency }}</s>
                </span>
              </p>
              <!-- <div class="font-weight-light title mb-2"> -->
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      products: 'products'
    })
  },
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
    opacity: .5;
    position: absolute;
    width: 100%;
  }
</style>
