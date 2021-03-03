function Core() {
  this.running_total = 0;
  this.total_elements = 0;
  this.temp_entered = false;
  this.temp_is_decimal = false;
  this.temp_integer = 0;
  this.temp_decimal = 0;
  this.stack = [];
  this.math_operators = [];
  this.last_value = false;
}

Core.prototype.clear = function() {
  this.running_total = 0;
  this.total_elements = 0;
  this.last_value = false;
  this.stack = [];
  this.math_operators = [];
  this.clearTemp();
  return this.running_total;
};


Core.prototype.show = function() {
  if (this.temp_entered) {
    return this.getTemp();
  } else {
    return this.getRunningTotal();
  }
};

Core.prototype.getRunningTotal = function() {
  if (this.stack.length == 0) {
    this.stack.push(this.getTemp());
    this.clearTemp();
  } else {
    if (this.temp_entered) {
      this.stack.push(this.getTemp());
      this.clearTemp();
    }
  }

  if (this.math_operators == 0) {
    this.running_total  = this.stack[0];
    return this.running_total;
  } else {
    var current_operator = this.math_operators.pop();
    var last_stack_number = this.stack.pop();

    if (current_operator == "+") {
      var result = this.stack[0] + last_stack_number;
    } else if (current_operator == "-") {
      var result = this.stack[0] - last_stack_number;
    } else if (current_operator == "/") {
      var result = this.stack[0] / last_stack_number;
    } else if (current_operator == "*") {
      var result = this.stack[0] * last_stack_number;
    } else {
      throw new Error("operation not recognized");
    }
    this.stack[0] = result;
    this.running_total  = result;
    return this.running_total;
  }
};


Core.prototype.equals = function() {
  this.last_value = true;
  if (this.total_elements == 0) {
    this.total_elements += 1;
    this.stack.push(this.getTemp());
    this.clearTemp();
  }
  return this.getRunningTotal();
};

Core.prototype.add = function() {
  this.total_elements += 1;
  this.stack.push(this.getTemp());
  this.math_operators.push('+');
  this.clearTemp();
};

Core.prototype.subtract = function() {
  this.total_elements += 1;
  this.stack.push(this.getTemp());
  this.math_operators.push('-');
  this.clearTemp();
};

Core.prototype.multiply = function() {
  this.total_elements += 1;
  this.stack.push(this.getTemp());
  this.math_operators.push('*');
  this.clearTemp();
};

Core.prototype.divide = function() {
  this.total_elements += 1;
  this.stack.push(this.getTemp());
  this.math_operators.push('/');
  this.clearTemp();
};

Core.prototype.percent = function() {
  if (this.temp_entered) {
    var temp = this.getTemp();
    temp = temp / 100.0;
    var parts = ("" + temp).split(".");
    this.setTemp(parts[0], parts[1]);
  } else {
    var output = this.getRunningTotal();
    output = output / 100.0;
    var parts = ("" + output).split(".");
    this.stack[0] = output;
  }
};

Core.prototype.getTemp = function() {
  if (this.temp_is_decimal) {
    return parseFloat(this.temp_integer + "." + this.temp_decimal);
  } else {
    return this.temp_integer;
  }
};

Core.prototype.setTemp = function(integer, decimal) {
  this.temp_entered = true;
  this.temp_integer = integer;
  this.temp_decimal = decimal;
  if (decimal > 0) {
    this.temp_is_decimal = true;
  }
};

Core.prototype.clearTemp = function() {
  this.temp_entered = false;
  this.temp_is_decimal = false;
  this.temp_integer = 0;
  this.temp_decimal = 0;
};

Core.prototype.invert_sign = function() {
  if (this.temp_entered) {
    this.temp_integer *= -1;
  } else {
    if (this.stack.length == 1) {
      this.stack[0] *= -1;
    }
  }
};

Core.prototype.period = function() {
  this.temp_is_decimal = true;
  return true;
};

Core.prototype.useDigit = function(digit) {
  if (this.last_value == true) {
    this.stack = [];
    this.last_value = false;
  }
  digit = parseInt(digit);
  this.temp_entered = true;
  if (this.temp_is_decimal) {
    this.temp_decimal = parseInt(this.temp_decimal + "" + digit);
    return this.getTemp();
  } else {
    this.temp_integer = parseInt(this.temp_integer + "" + digit);
    return this.getTemp();
  }
};
