
main_calculator = new Core();

new Vue({
  el: '#calculator',
  data: {
    inputValue: '0'
  },
  methods: {
  },
  computed: {
    'calc_input' : {
      get: function () {
        return  this.inputValue;
      },
      set: function (newValue) {
        this.inputValue = newValue;
      }
    }


  },
  mounted() {
    this.$root.$on("updateCalcInput", function() {
      this.inputValue = main_calculator.show();
      console.log(">> updateCalcInput");
      console.log(this.inputValue);

    });

    this.$root.$on("clearCalcInput", function() {
      this.inputValue = "0";
      console.log(">> clearCalcInput");
      console.log(this.inputValue);

    });



  }
});
