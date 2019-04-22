<template>
<div>
  <div
    v-if="!small"
  >
    <div
      class="headline"
    >
      {{ header }}{{ ':  ' + selectedName }}
    </div>
    <v-btn
      v-for="a of attributes"
      :key="a.attribute_value_id"
      @click="selectAttribute(a.attribute_value_id, a.attribute_value)"
      :class="selectedID === a.attribute_value_id ? 'info' : ''"
    >
      {{ a.attribute_value }}
    </v-btn>
  </div>
  <div 
     v-if="small"
    :class="headerColor + '--text subheading selector'"
  >
    {{ header }}{{ ':  ' + selectedName }}
   <div
   >
     <v-btn
       fab small color="white"
       :ripple="false"
       v-for="a of attributes"
       :key="a.attribute_value_id"
       @click="selectAttribute(a.attribute_value_id, a.attribute_value)"
       :class="selectedID === a.attribute_value_id ? 'info': 'small-button'"
     >
       {{ a.attribute_value }}
     </v-btn>
   </div>
  </div>
</div>
</template>

<script>
  export default {
    props: [
      'header',
      'headerColor',
      'attributes',
      'small'
    ],
    data: () => ({
      selectedID: -1,
      selectedName: ""
    }),
    methods: {
      selectAttribute(attID, attName) {
        this.selectedID = attID;
        this.selectedName = attName;
        this.$emit('attributeSelected', attName);
      }
    }
  }
</script>

<style scoped>
  .selector { margin-bottom: 10px;}

  .small-button {
    height: 35px;
    width: 35px;
    margin: 6px;
  }
</style>