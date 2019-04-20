<template>
  <div>
    <v-btn
      v-for="a of attributes"
      :key="a.attribute_value_id"
      @click="selected = a.attribute_value_id"
      :class="selected === a.attribute_value_id ? 'info' : ''"
    >
      {{ a.attribute_value }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ['attributes'],
  data: () => ({
    selected: -1
  })
}
</script>