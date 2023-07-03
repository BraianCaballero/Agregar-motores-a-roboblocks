//////////// Definiciones e inicialización de motores //////////////////////

this["JST"]["motor_dc_definitions_include"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += '#define In1 <2>\n';
        __p += '#define In2 <4>\n';
        __p += '#define In3 <5>\n';
        __p += '#define In4 <7>\n';
        __p += '#define EnA <3>\n';
        __p += '#define EnB <6>\n';
    }
    return __p;
};

this["JST"]["motor_dc_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode(In1, OUTPUT);\n';
        __p += 'pinMode(In2, OUTPUT);\n';
        __p += 'pinMode(In3, OUTPUT);\n';
        __p += 'pinMode(In4, OUTPUT);\n';
        __p += 'pinMode(EnA, OUTPUT);\n';
        __p += 'pinMode(EnB, OUTPUT);\n';
    }
    return __p;
};

////////////// Motores en conjunto (MotorA + MotorB) ///////////////////////
@type {Object}

Blockly.Arduino.motor_dc = {
  category: RoboBlocks.locales.getKey('LANG_CATEGORY_MOTOR_DC'),
  tags: ['MotorDC'],

  Blockly.Arduino.motor_dc.definitions = function() {
      var pinEnA = Blockly.Arduino.valueToCode(this, 'ENA', Blockly.Arduino.ORDER_ATOMIC) || '0';
      var pinIn1 = Blockly.Arduino.valueToCode(this, 'IN1', Blockly.Arduino.ORDER_ATOMIC) || '0';
      var pinIn2 = Blockly.Arduino.valueToCode(this, 'IN2', Blockly.Arduino.ORDER_ATOMIC) || '0';
      var pinIn3 = Blockly.Arduino.valueToCode(this, 'IN3', Blockly.Arduino.ORDER_ATOMIC) || '0';
      var pinIn4 = Blockly.Arduino.valueToCode(this, 'IN4', Blockly.Arduino.ORDER_ATOMIC) || '0';
      var pinEnB = Blockly.Arduino.valueToCode(this, 'ENB', Blockly.Arduino.ORDER_ATOMIC) || '0';

      Blockly.Arduino.definitions_['motor_dc_definitions_include'] = JST['motor_dc_definitions_include']();

      var definitions = JST['motor_dc_definitions']({
          'pinEnA': pinEnA,
          'pinIn1': pinIn1,
          'pinIn2': pinIn2,
          'pinIn3': pinIn3,
          'pinIn4': pinIn4,
          'pinEnB': pinEnB
      });

      return definitions;
  },
};

Blockly.Arduino.motor_dc.setup = function() {
    var pinEnA = Blockly.Arduino.valueToCode(this, 'ENA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinIn1 = Blockly.Arduino.valueToCode(this, 'IN1', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinIn2 = Blockly.Arduino.valueToCode(this, 'IN2', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinIn3 = Blockly.Arduino.valueToCode(this, 'IN3', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinIn4 = Blockly.Arduino.valueToCode(this, 'IN4', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinEnB = Blockly.Arduino.valueToCode(this, 'ENB', Blockly.Arduino.ORDER_ATOMIC) || '0';

    Blockly.Arduino.setups_['motor_dc_setup'] = JST['motor_dc_setups']({
        'pinEnA': pinEnA,
        'pinIn1': pinIn1,
        'pinIn2': pinIn2,
        'pinIn3': pinIn3,
        'pinIn4': pinIn4,
        'pinEnB': pinEnB
    });

    return '';
};

Blockly.Arduino.motor_dc.codeGenerator = function() {
    var pinEnA = Blockly.Arduino.valueToCode(this, 'ENA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinIn1 = Blockly.Arduino.valueToCode(this, 'IN1', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinIn2 = Blockly.Arduino.valueToCode(this, 'IN2', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinIn3 = Blockly.Arduino.valueToCode(this, 'IN3', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinIn4 = Blockly.Arduino.valueToCode(this, 'IN4', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinEnB = Blockly.Arduino.valueToCode(this, 'ENB', Blockly.Arduino.ORDER_ATOMIC) || '0';

    var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var direction = this.getFieldValue('DIRECTION');

    var code = '';

    if (direction === 'CLOCKWISE') {
        code += 'digitalWrite(' + pinIn1 + ', HIGH);\n';
        code += 'digitalWrite(' + pinIn3 + ', HIGH);\n';
        code += 'digitalWrite(' + pinIn2 + ', LOW);\n';
        code += 'digitalWrite(' + pinIn4 + ', LOW);\n';
    } else if (direction === 'COUNTER_CLOCKWISE') {
        code += 'digitalWrite(' + pinIn2 + ', HIGH);\n';
        code += 'digitalWrite(' + pinIn4 + ', HIGH);\n';
        code += 'digitalWrite(' + pinIn1 + ', LOW);\n';
        code += 'digitalWrite(' + pinIn3 + ', LOW);\n';
    } else if (direction === 'STOP') {
        code += 'digitalWrite(' + pinIn1 + ', LOW);\n';
        code += 'digitalWrite(' + pinIn3 + ', LOW);\n';
        code += 'digitalWrite(' + pinIn2 + ', LOW);\n';
        code += 'digitalWrite(' + pinIn4 + ', LOW);\n';
    }

    code += 'analogWrite(' + pinEnA + ', ' + speed + ');\n';
    code += 'analogWrite(' + pinEnB + ', ' + speed + ');\n';

    return code;
};

Blockly.Blocks['motor_dc'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motor DC")
            .appendField("ENA:")
            .appendField(new Blockly.FieldTextInput("0"), "ENA")
            .appendField("IN1:")
            .appendField(new Blockly.FieldTextInput("0"), "IN1")
            .appendField("IN2:")
            .appendField(new Blockly.FieldTextInput("0"), "IN2")
            .appendField("IN3:")
            .appendField(new Blockly.FieldTextInput("0"), "IN3")
            .appendField("IN4:")
            .appendField(new Blockly.FieldTextInput("0"), "IN4")
            .appendField("ENB:")
            .appendField(new Blockly.FieldTextInput("0"), "ENB");
        this.appendDummyInput()
            .appendField("Direction:")
            .appendField(new Blockly.FieldDropdown([
                ["Clockwise", "CLOCKWISE"],
                ["Counter Clockwise", "COUNTER_CLOCKWISE"],
                ["Stop", "STOP"]
            ]), "DIRECTION");
        this.appendValueInput("SPEED")
            .setCheck("Number")
            .appendField("Speed (0-255):");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// Generator stubs for the motor_dc code generator
Blockly.JavaScript['motor_dc'] = Blockly.Arduino.motor_dc.codeGenerator;
Blockly.Arduino.motor_dc_definitions = Blockly.Arduino.motor_dc.definitions;
Blockly.Arduino.motor_dc_setups = Blockly.Arduino.motor_dc.setup;


///////////////////// Motores por separado (Motor0, Motor1) ///////////////////////////
Blockly.Arduino['motor_dc'] = function(block) {
  var motor = block.getFieldValue('MOTOR');
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var direction = block.getFieldValue('DIRECTION');

  var pinEnA, pinIn1, pinIn2, pinEnB, pinIn3, pinIn4;
  if (motor === 'Motor0') {
    pinEnA = '3';
    pinIn1 = '2';
    pinIn2 = '4';
  } else if (motor === 'Motor1') {
    pinEnB = '6';
    pinIn3 = '5';
    pinIn4 = '7';
  }

  var code = '';

  if (direction === 'CLOCKWISE') {
    code += 'digitalWrite(' + pinIn1 + ', HIGH);\n';
    code += 'digitalWrite(' + pinIn2 + ', LOW);\n';
    code += 'digitalWrite(' + pinIn3 + ', HIGH);\n';
    code += 'digitalWrite(' + pinIn4 + ', LOW);\n';
  } else if (direction === 'COUNTER_CLOCKWISE') {
    code += 'digitalWrite(' + pinIn1 + ', LOW);\n';
    code += 'digitalWrite(' + pinIn2 + ', HIGH);\n';
    code += 'digitalWrite(' + pinIn3 + ', LOW);\n';
    code += 'digitalWrite(' + pinIn4 + ', HIGH);\n';
  } else if (direction === 'STOP') {
    code += 'digitalWrite(' + pinIn1 + ', LOW);\n';
    code += 'digitalWrite(' + pinIn2 + ', LOW);\n';
    code += 'digitalWrite(' + pinIn3 + ', LOW);\n';
    code += 'digitalWrite(' + pinIn4 + ', LOW);\n';
  }

  if (pinEnA) {
    code += 'analogWrite(' + pinEnA + ', ' + speed + ');\n';
  }
  
  if (pinEnB) {
    code += 'analogWrite(' + pinEnB + ', ' + speed + ');\n';
  }

  return code;
};

Blockly.Blocks['motor_dc'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Motor DC")
        .appendField(new Blockly.FieldDropdown([["Motor0", "Motor0"], ["Motor1", "Motor1"]]), "MOTOR");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("Speed (0-255):");
    this.appendDummyInput()
        .appendField("Direction:")
        .appendField(new Blockly.FieldDropdown([
          ["Clockwise", "CLOCKWISE"],
          ["Counter Clockwise", "COUNTER_CLOCKWISE"],
          ["Stop", "STOP"]
        ]), "DIRECTION");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(RoboBlocks.locales.getKey('LANG_MOTOR_TOOLTIP'));
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['motor_dc'] = Blockly.Arduino['motor_dc'];
Blockly.Arduino['motor_dc'].definitions = function() {
  return '';
};

Blockly.Arduino['motor_dc'].setup = function() {
  var code = '';

  code += 'pinMode(2, OUTPUT);\n';
  code += 'pinMode(3, OUTPUT);\n';
  code += 'pinMode(4, OUTPUT);\n';
  code += 'pinMode(5, OUTPUT);\n';
  code += 'pinMode(6, OUTPUT);\n';
  code += 'pinMode(7, OUTPUT);\n';

  return code;
};
