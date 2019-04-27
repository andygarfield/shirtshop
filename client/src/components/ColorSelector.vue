<template>
<div
  class="white--text subheading selector"
>
  <div>
  Color: {{ selectedName }}
  </div>
  <v-btn
    v-for="c of colors"
    :ripple="false"
    fab small :color="colorMap[c.attribute_value]"
    :key="c.attribute_value_id"
    @click="selectColor(c.attribute_value_id, c.attribute_value)"
    :class="selectedID === c.attribute_value_id ? '': 'small-button'"
  >
  </v-btn>
</div>
</template>

<script>
import { colorMap } from '../helpers'

export default {
  props: {
    'header': String,
    'headerColor': String,
    'colors': Array
  },
  data: () => ({
    selectedID: -1,
    selectedName: '', 
    colorMap
  }),
  methods: {
    selectColor(colorID, colorName) {
      this.selectedID = colorID;
      this.selectedName = colorName;
      this.$emit('colorSelected', colorName);
    }
  }
}
</script>

<style scoped>
.selector { margin-bottom: 10px;}

.small-button {
  height: 25px;
  width: 25px;
  margin: 6px;
}
</style>