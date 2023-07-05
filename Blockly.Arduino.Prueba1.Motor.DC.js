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

  Blockly.Arduino.definitions_['motor_dc_definitions_include'] = JST['motor_dc_definitions_include']({
    'In1': pinIn1,
    'In2': pinIn2,
    'In3': pinIn3,
    'In4': pinIn4,
    'EnA': pinEnA,
    'EnB': pinEnB
  });

  var definitions = JST['motor_dc_setups']({
    'In1': pinIn1,
    'In2': pinIn2,
    'In3': pinIn3,
    'In4': pinIn4,
    'EnA': pinEnA,
    'EnB': pinEnB
  });
  return definitions;
};

Blockly.Arduino.motor_dc.setup = function() {
    var pinEnA = Blockly.Arduino.valueToCode(this, 'ENA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinIn1 = Blockly.Arduino.valueToCode(this, 'IN1', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinIn2 = Blockly.Arduino.valueToCode(this, 'IN2', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinIn3 = Blockly.Arduino.valueToCode(this, 'IN3', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinIn4 = Blockly.Arduino.valueToCode(this, 'IN4', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pinEnB = Blockly.Arduino.valueToCode(this, 'ENB', Blockly.Arduino.ORDER_ATOMIC) || '0';

    Blockly.Arduino.setups_['motor_dc_setup'] = JST['motor_dc_setup']({
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
    var rotation = this.getFieldValue('ROTATION');

    var code = '';

    if (rotation === 'CLOCKWISE') {
        code += 'digitalWrite(' + pinIn1 + ', HIGH);\n';
        code += 'digitalWrite(' + pinIn3 + ', HIGH);\n';
        code += 'digitalWrite(' + pinIn2 + ', LOW);\n';
        code += 'digitalWrite(' + pinIn4 + ', LOW);\n';
    } else if (rotation === 'COUNTER_CLOCKWISE') {
        code += 'digitalWrite(' + pinIn2 + ', HIGH);\n';
        code += 'digitalWrite(' + pinIn4 + ', HIGH);\n';
        code += 'digitalWrite(' + pinIn1 + ', LOW);\n';
        code += 'digitalWrite(' + pinIn3 + ', LOW);\n';
    } else if (rotation === 'STOP') {
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
        this.setColour(RoboBlocks.LANG_COLOUR_MOTOR_DC)
        this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_MOTOR_DEF')).appendField(new Blockly.FieldImage('img/blocks/Motor-DC.png', 208 * options.zoom, 100 * options.zoom));
        this.appendDummyInput()
            .appendField("Motor DC")
            .appendField(RoboBlocks.locales.getKey('LANG_MOTOR_MOVE_PIN'))
            .appendField("ENA:")
            .appendField(new Blockly.FieldTextInput("3"), "ENA")
            .appendField("IN1:")
            .appendField(new Blockly.FieldTextInput("2"), "IN1")
            .appendField("IN2:")
            .appendField(new Blockly.FieldTextInput("4"), "IN2")
            .appendField("IN3:")
            .appendField(new Blockly.FieldTextInput("5"), "IN3")
            .appendField("IN4:")
            .appendField(new Blockly.FieldTextInput("7"), "IN4")
            .appendField("ENB:")
            .appendField(new Blockly.FieldTextInput("6"), "ENB");
        this.appendDummyInput()
            .appendField("Rotation:")
            .appendField(new Blockly.FieldDropdown([
                ["Clockwise", "CLOCKWISE"],
                ["Counter Clockwise", "COUNTER_CLOCKWISE"],
                ["Stop", "STOP"]
            ]), "ROTATION");
        this.appendValueInput("SPEED")
            .setCheck("Number")
            .appendField("Speed (0-255):");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(RoboBlocks.locales.getKey('LANG_Motor_DEF_TOOLTIP'));
    }
};

// Generator stubs for the motor_dc code generator
Blockly.JavaScript['motor_dc'] = Blockly.Arduino.motor_dc.codeGenerator;
Blockly.Arduino.['motor_dc'].definitions = Blockly.Arduino.motor_dc.definitions;
Blockly.Arduino.['motor_dc'].setups = Blockly.Arduino.motor_dc.setup;


///////////////////// Motores por separado (Motor0, Motor1) ///////////////////////////
Blockly.Arduino['motor_dc'] = function(block) {
  var motor = block.getFieldValue('MOTOR');
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var rotation = block.getFieldValue('ROTATION');

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

  if (rotation === 'CLOCKWISE') {
    code += 'digitalWrite(' + pinIn1 + ', HIGH);\n';
    code += 'digitalWrite(' + pinIn2 + ', LOW);\n';
    code += 'digitalWrite(' + pinIn3 + ', HIGH);\n';
    code += 'digitalWrite(' + pinIn4 + ', LOW);\n';
  } else if (rotation === 'COUNTER_CLOCKWISE') {
    code += 'digitalWrite(' + pinIn1 + ', LOW);\n';
    code += 'digitalWrite(' + pinIn2 + ', HIGH);\n';
    code += 'digitalWrite(' + pinIn3 + ', LOW);\n';
    code += 'digitalWrite(' + pinIn4 + ', HIGH);\n';
  } else if (rotation === 'STOP') {
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

Blockly.Blocks.['motor_dc'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Motor DC")
        .appendField(new Blockly.FieldDropdown([["Motor0", "Motor0"], ["Motor1", "Motor1"]]), "MOTOR");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("Speed (0-255):");
    this.appendDummyInput()
        .appendField("Rotation:")
        .appendField(new Blockly.FieldDropdown([
          ["Clockwise", "CLOCKWISE"],
          ["Counter Clockwise", "COUNTER_CLOCKWISE"],
          ["Stop", "STOP"]
        ]), "ROTATION");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(RoboBlocks.locales.getKey('LANG_MOTOR_TOOLTIP'));
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['motor_dc'] = Blockly.Arduino['motor_dc'],
Blockly.Arduino['motor_dc'] = Blockly.Arduino['motor_dc'],
};



//motor dc blocks :
LANG_CATEGORY_MOTOR_DC: 'Motor DC',
LANG_MOTOR_DEF: 'Motor DC',
LANG_MOTOR_DEF_TOOLTIP: 'Define el Motor',
LANG_MOTOR_MOVE_TURN_CLOCKWISE: 'Rotar motor en sentido horario',
LANG_MOTOR_MOVE_TURN_COUNTERCLOCKWISE: 'Rotar motor en sentido antihorario',
LANG_MOTOR_CONT_ROT: 'Rotación',
LANG_MOTOR_MOVE_STOPPED: 'Detener',
LANG_MOTOR_MOVE_MOTOR: 'Motor#',
LANG_MOTOR_CONT_SPEED: 'Velocidad',
LANG_MOTOR_MOVE_PIN: 'PIN#',
LANG_MOTOR_MOVE_DELAY: 'Tiempo [ms]',
LANG_MOTOR_MOVE_SPEED: 'Velocidad',
LANG_MOTOR_MOVE_FORWARD: 'Mover hacia adelante',
LANG_MOTOR_MOVE_BACKWARD: 'Mover hacia atras',
LANG_MOTOR_MOVE_TURN_RIGHT: 'Girar hacia la derecha',
LANG_MOTOR_MOVE_TURN_LEFT: 'Girar hacia la izquierda',
LANG_MOTOR_MOVE_STOP_MOVING: 'Detener el movimiento',
LAN_MOTOR_TOOLTIP: 'Gira el motor en el sentido seleccionado',
LANG_MOTOR_WARNING: 'No puedes asignar una variable al pin del motor'

// RGB block colors
RoboBlocks.LANG_COLOUR_BQ = '#D04141';
RoboBlocks.LANG_COLOUR_ZUM = '#CC7B44';
RoboBlocks.LANG_COLOUR_SERVO = '#CECE42';
RoboBlocks.LANG_COLOUR_LCD = '#ACCE42';
RoboBlocks.LANG_COLOUR_CONTROL = '#44CC44';
RoboBlocks.LANG_COLOUR_LOGIC = '#42CE91';
RoboBlocks.LANG_COLOUR_MATH = '#42CBCE';
RoboBlocks.LANG_COLOUR_TEXT = '#42A3CE';
RoboBlocks.LANG_COLOUR_COMMUNICATION = '#4263CE';
RoboBlocks.LANG_COLOUR_ADVANCED = '#9142CE';
RoboBlocks.LANG_COLOUR_VARIABLES = '#B244CC';
RoboBlocks.LANG_COLOUR_PROCEDURES = '#CE42B3';
RoboBlocks.LANG_COLOUR_MOTOR_DC = '#D3830E';
RoboBlocks.setColors = function(colorArray) {
    RoboBlocks.LANG_COLOUR_BQ = colorArray[0];
    RoboBlocks.LANG_COLOUR_ZUM = colorArray[1];
    RoboBlocks.LANG_COLOUR_SERVO = colorArray[2];
    RoboBlocks.LANG_COLOUR_LCD = colorArray[3];
    RoboBlocks.LANG_COLOUR_CONTROL = colorArray[4];
    RoboBlocks.LANG_COLOUR_LOGIC = colorArray[5];
    RoboBlocks.LANG_COLOUR_MATH = colorArray[6];
    RoboBlocks.LANG_COLOUR_TEXT = colorArray[7];
    RoboBlocks.LANG_COLOUR_COMMUNICATION = colorArray[8];
    RoboBlocks.LANG_COLOUR_ADVANCED = colorArray[9];
    RoboBlocks.LANG_COLOUR_VARIABLES = colorArray[10];
    RoboBlocks.LANG_COLOUR_PROCEDURES = colorArray[11];
    RoboBlocks.LANG_COLOUR_MOTOR_DC = colorArray[12];


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