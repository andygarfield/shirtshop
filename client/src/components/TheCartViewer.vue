<template>
<v-container>
  <v-layout wrap justify-center>
    <v-flex xs12 md9 class="pa-4">
      <v-btn outline small @click="goBack">Go back</v-btn>
      <h3 class="display-2 mt-4">Your Cart</h3>
      <v-divider class="mb-4"></v-divider>
      <div class="headline" v-if="cart.length === 0">Your cart is empty</div>
      <div v-for="(item, index) in cart" :key="index" class="mt-4">
        <v-layout>
          <v-flex xs8>
            <p class="title font-weight-light ma-1">{{ item.name }}</p>
            <p class="ma-1">{{ item.quantity }} @ {{ item.price }}</p>
            <p class="font-weight-bold ma-1">
              {{ item.price * item.quantity | toCurrency }}
            </p>
            <p class="ma-1">
              <span style="font-weight: bold;">Size: </span>
              {{ item.size }}
            </p>
            <p class="ma-1">
              <span style="font-weight: bold;">Color: </span>
              {{ item.color }}
            </p>
          </v-flex>
          <v-flex xs4 style="display: flex; justify-content: center; align-items: center;">
            <v-btn
              flat color="error"
              @click="removeFromCart(index)"
            >Remove</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
    <v-flex xs12 md3>
      <v-card
        class="pa-4"
      >
        <h6 class="title">Subtotal</h6>
        <p class="mt-3">{{ this.subtotal | toCurrency }}</p>
        <v-divider></v-divider>
        <h6 class="title mt-3">Shipping</h6>
        <p class="mt-3">Free</p>
        <v-divider></v-divider>
        <h6 class="title mt-3">Total</h6>
        <p class="mt-3">{{ subtotal | toCurrency }} </p>
        <PayPal
          @payment-completed="completeTransaction"
          :amount="subtotal.toFixed(2)"
          currency="USD"
          :client="credentials"
          :items="sendingItems"
          env="sandbox"
        >
        </PayPal> 
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import PayPal from 'vue-paypal-checkout';
import { mapState, mapGetters, mapMutations } from 'vuex';
import { toCurrency, routerGoBack } from '../helpers';

export default {
  components: {
    PayPal
  },
  data: () => ({
    credentials: {
      sandbox: 'Aeh8a8mrVxsGGV2EgFDVLjB7suBiPJ_zuVG8tnXroklPEd2ToVFqE_uTmE1639XK6uDBBaXxkv2kOr2E',
      production: 'ASSh0OtT5Z2A15D1AWr7MiKgONhaCDbYwJhOHrFY4jw28EJbtA1sRHEJr_PZklCyttikQAYKdsJkoyir'
    }
  }),
  computed: {
    sendingItems() {
      let items = [];
      this.cart.forEach(i => {
        items.push({
          sku: i.id,
          name: i.name,
          description: JSON.stringify({
            size: i.size,
            color: i.color
          }),
          quantity: i.quantity,
          price: i.price.toFixed(2),
          currency: 'USD',
        })
      })

      return items;
    },
    ...mapState({
      cart: 'cart'
    }),
    ...mapGetters([
      'subtotal'
    ])
  },
  methods: {
    async completeTransaction(payRes) {
      let order = {
        total_amount: Number.parseFloat(payRes.transactions[0].amount.total),
        created_on: payRes.create_time,
        comments: payRes.state,
        auth_code: payRes.id,
        reference: payRes.cart
      }

      let orderRes = await fetch(
        '/api/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(order)
        }
      ).then(res => res.json());
      let detail_promises = payRes.transactions[0].item_list.items.map(i => {
        let detail = {
          order_id: orderRes.order_id,
          product_id: Number.parseInt(i.sku),
          attributes: i.description,
          product_name: i.name,
          quantity: i.quantity,
          unit_cost: Number.parseFloat(i.price)
        }
        return fetch(
          '/api/order-detail',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(detail)
          }
        );
      })

      await Promise.all(detail_promises);
      this.$router.push('/success');
    },
    goBack: routerGoBack,
    ...mapMutations([
      'removeFromCart'
    ])
  },
  filters: {
    toCurrency: toCurrency
  }
}
</script>
