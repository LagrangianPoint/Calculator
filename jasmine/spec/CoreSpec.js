describe("Core", function() {
  var core;

  beforeEach(function() {
    core = new Core();
  });

  describe("#getRunningTotal", function() {
    it("should return 12.5", function() {
      core.setTemp(12, 5);
      expect(core.getRunningTotal()).toBe(12.5);
    });
  });

  describe("#clear", function() {
    it("should reset values", function() {
      core.running_total = 50;
      core.total_elements = 10;
      core.temp_entered = true;
      core.temp_is_decimal = true;
      core.temp_integer = 20;
      core.temp_decimal = 30;
      core.stack = [1,2];
      core.math_operators = ['+'];

      core.clear();
      expect(core.running_total).toBe(0);
      expect(core.total_elements).toBe(0);
      expect(core.temp_entered).toBe(false);
      expect(core.temp_is_decimal).toBe(false);
      expect(core.temp_integer).toBe(0);
      expect(core.temp_decimal).toBe(0);
      expect(core.stack).toEqual([]);
      expect(core.math_operators).toEqual([]);
    });
  });

  describe("#equals", function() {
    it("should be zero when nothing is present", function() {
      expect(core.equals()).toBe(0);
    });

    it("should be 2.5 when only that value is present in tmp", function() {
      core.setTemp(2, 5);
      expect(core.equals()).toBe(2.5);
    });
  });

  describe("#add", function() {
    it("adding 5 with be 2.5 should equals 7.5", function() {
      core.setTemp(5, 0);
      core.add();
      core.setTemp(2, 5);
      expect(core.equals()).toBe(7.5);
    });
  });

  describe("#subtract", function() {
    it("subtracting 11.5 with be 1.5 should equals 10", function() {
      core.setTemp(11, 5);
      core.subtract();
      core.setTemp(1, 5);
      expect(core.equals()).toBe(10.0);
    });
  });

  describe("#multiply", function() {
    it("multiplying 2.5 with be 6 should equals 15", function() {
      core.setTemp(2, 5);
      core.multiply();
      core.setTemp(6, 0);
      expect(core.equals()).toBe(15.0);
    });
  });

  describe("#divide", function() {
    it("dividing 30 with be 1.5 should equals 20", function() {
      core.setTemp(30, 0);
      core.divide();
      core.setTemp(1, 5);
      expect(core.equals()).toBe(20.0);
    });
  });

  describe("#percent", function() {
    it("converts 10 to 0.10", function() {
      core.setTemp(10, 0);
      core.percent();
      expect(core.equals()).toBe(0.10);
    });

    it("adding 1 + 2 , pressing equals, and calculating percent returns 0.03", function() {
      core.setTemp(1, 0);
      core.add();
      core.setTemp(2, 0);
      core.equals();
      core.percent();
      expect(core.equals()).toBe(0.03);
    });

    it("adding 1 + 2 and calculating percent returns 1.02", function() {
      core.setTemp(1, 0);
      core.add();
      core.setTemp(2, 0);
      core.percent();
      expect(core.equals()).toBe(1.02);
    });
  });

  describe("#invert_sign", function() {
    it("changes temp sign from positive to negative", function() {
      console.log(core.stack);
      core.setTemp(3, 5);
      core.invert_sign();
      expect(core.equals()).toBe(-3.5);
    });

    it("changes temp sign from negative to positive", function() {
      core.setTemp(3, 5);
      core.invert_sign();
      expect(core.equals()).toBe(-3.5);
    });

    it("leaves empty sign untouched", function() {
      core.invert_sign();
      expect(core.equals()).toBe(0);
    });
  });

  describe("#period", function() {
    it("prediod changes flag correctly", function() {
      core.period();
      expect(core.temp_is_decimal).toBe(true);
    });

  });

  describe("#useDigit", function() {
    it("ads the correct integer digit to temp", function() {
      core.useDigit(1);
      core.useDigit(2);
      expect(core.equals()).toBe(12.0);
    });

    it("ads the correct decimals to temp", function() {
      core.useDigit(3);
      core.useDigit(4);
      core.period();
      core.useDigit(5);
      core.useDigit(6);
      expect(core.equals()).toBe(34.56);
    });

  });

});
