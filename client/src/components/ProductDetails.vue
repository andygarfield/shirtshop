<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-btn outline @click="goBack">Go back</v-btn>
          <v-img>
          </v-img>
          <v-card-text>{{ this.$store.state.currentProduct.description }}</v-card-text>
          <v-layout>
            <attribute-selector
              :attributes="currentSizes"         
            >
            </attribute-selector>
          </v-layout>
          <v-layout>
            <attribute-selector
              :attributes="currentColors"         
            >
            </attribute-selector>
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
  computed: {
    productID() {return this.$route.params.id},
    ...mapState({
      currentSizes: 'currentSizes',
      currentColors: 'currentColors'
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
  }
}
</script>
