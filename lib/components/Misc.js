Vue.component('Misc', {
  props: ['operation'],
  data: function () {
    return {
    }
  },
  methods: {
    useOperation: function (operation) {
      console.log("OPERATION: " + operation) ;
      if (operation == "AC") {
        main_calculator.clear();
        this.$root.$emit('clearCalcInput');
      } else if (operation == "+/-"){
        main_calculator.invert_sign();
        this.$root.$emit('updateCalcInput');
      } else if (operation == "%"){
        main_calculator.percent();
        this.$root.$emit('updateCalcInput');
      }

    }
  },
  template: '<div class="calc-button calc-misc" v-on:click="useOperation(operation)" >{{ operation }}</div>'
})
