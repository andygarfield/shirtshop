<template>
<div 
  :class="headerColor + '--text subheading'"
>
  <div
    class="headline"
  >
    {{ header }}{{ ':  ' + selectedName }}
  </div>
  <div
    v-if="!small"
  >
    <v-btn
      v-for="c of colors"
      :key="c.attribute_value_id"
      @click="selectColor(c.attribute_value_id, c.attribute_value)"
      :class="selectedID === c.attribute_value_id ? 'info' : ''"
    >
      {{ c.attribute_value }}
    </v-btn>
  </div>
  <div
    v-if="small"
  >
    <v-btn
      fab small :color="colorMap[c.attribute_value]"
      :ripple="false"
      v-for="c of colors"
      :key="c.attribute_value_id"
      @click="selectColor(c.attribute_value_id, c.attribute_value)"
      :class="selectedID === c.attribute_value_id ? '': 'small-button'"
    >
    </v-btn>
  </div>
</div>
</template>

<script>
import { colorMap } from '../helpers'

export default {
  props: [
    'header',
    'headerColor',
    'colors',
    'small'
  ],
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
.small-button {
  height: 25px;
  width: 25px;
  margin: 6px;
}
</style>