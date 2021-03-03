Vue.component('Equal', {
  props: [],
  data: function () {
    return {
    }
  },
  methods: {
    useEqual: function () {
      main_calculator.equals();
      this.$root.$emit('updateCalcInput');
    }
  },
  template: '<div class="calc-button calc-operator" v-on:click="useEqual"  >=</div> '
})
