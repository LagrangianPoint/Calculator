Vue.component('Dot', {
  props: [],
  data: function () {
    return {
    }
  },
  methods: {
    useDot: function () {
      main_calculator.period();
      this.$root.$emit('updateCalcInput');
    }
  },
  template: '<div class="calc-button calc-dot" v-on:click="useDot" >.</div>'
})
