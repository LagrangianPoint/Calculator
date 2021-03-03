Vue.component('Operator', {
  props: ['operation'],
  data: function () {
    return {
    }
  },
  methods: {
    useOperator: function (operator) {
      if (operator == "+") {
        main_calculator.add();
      } else if (operator == "-"){
        main_calculator.subtract();
      } else if (operator == "×"){
        main_calculator.multiply();
      } else if (operator == "÷"){
        main_calculator.divide();
      }
    }
  },
  template: '<div class="calc-button calc-operator" v-on:click="useOperator(operation)" >{{ operation }}</div>'
})
