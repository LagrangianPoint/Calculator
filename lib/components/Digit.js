Vue.component('Digit', {
  props: ['number'],
  data: function () {
    return {
    }
  },
  methods: {
    useDigit: function (number) {
      main_calculator.useDigit(number);
      this.$root.$emit('updateCalcInput');
    }
  },
  template: '<div class="calc-button calc-digit" v-on:click="useDigit(number)" >{{ number }}</div>'
})
