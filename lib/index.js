'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var reactSimpleAnimate = require('react-simple-animate');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var commonAnimateStyle = {
  position: 'absolute',
  height: '100%',
  transformStyle: 'preserve-3d'
};
var easeType = 'cubic-bezier(0.19, 1, 0.22, 1)';
var revolutionDegrees = 1; // const resetRouteCounter = 1000;

var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var rotateDegreePerNumber = 0.10;

var calculateDegrees = function calculateDegrees(rotateCounter, activeNumber) {
  var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var animateDegree = numbers.findIndex(function (v) {
    return v === activeNumber;
  }) * rotateDegreePerNumber + loop * revolutionDegrees;
  animateDegree += rotateCounter;
  return {
    rotateCounter: rotateCounter + loop * revolutionDegrees,
    degree: -animateDegree
  };
};

var FlipNumber = /*#__PURE__*/function (_React$Component) {
  _inherits(FlipNumber, _React$Component);

  var _super = _createSuper(FlipNumber);

  function FlipNumber() {
    var _this;

    _classCallCheck(this, FlipNumber);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      degree: 0,
      rotateCounter: 0 // eslint-disable-line react/no-unused-state

    });

    _defineProperty(_assertThisInitialized(_this), "updateNumber", function () {
      _this.setState(function (_ref) {
        var rotateCounter = _ref.rotateCounter;
        return calculateDegrees(rotateCounter, _this.props.activeNumber, _this.props.loop);
      });
    });

    return _this;
  }

  _createClass(FlipNumber, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.updateNumberTimeout = setTimeout(function () {
        return _this2.updateNumber();
      }, 50 * this.props.position);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.activeNumber !== this.props.activeNumber || nextProps.height !== this.props.height || nextProps.width !== this.props.width || this.state.degree === 0 || nextProps.play !== this.props.play;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.updateNumberTimeout);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activeNumber = _this$props.activeNumber,
          height = _this$props.height,
          color = _this$props.color,
          background = _this$props.background,
          width = _this$props.width,
          perspective = _this$props.perspective,
          duration = _this$props.duration,
          play = _this$props.play,
          delay = _this$props.delay,
          length = _this$props.length,
          position = _this$props.position,
          _this$props$numberSty = _this$props.numberStyle,
          numberStyle = _this$props$numberSty === void 0 ? {} : _this$props$numberSty;
      var degree = this.state.degree;
      var viewPortSize = {
        width: "".concat(width, "px"),
        height: "".concat(height + 3, "px")
      };
      var halfElementHeight = height / 2;
      var translateZ = halfElementHeight + height;
      return /*#__PURE__*/React.createElement("span", {
        style: _objectSpread2(_objectSpread2({}, viewPortSize), {}, {
          perspective: perspective,
          overflow: 'hidden',
          display: 'inline-block',
          textAlign: 'left',
          height: height
        }),
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement(reactSimpleAnimate.Animate, {
        tag: "span",
        play: play,
        start: _objectSpread2({}, commonAnimateStyle),
        end: _objectSpread2(_objectSpread2({}, commonAnimateStyle), {}, {
          transform: "rotateX(".concat(degree, "turn)")
        }),
        easeType: easeType,
        duration: duration,
        delay: delay,
        render: function render(_ref2) {
          var style = _ref2.style;
          return /*#__PURE__*/React.createElement("span", {
            style: style
          }, numbers.map(function (n, i) {
            return /*#__PURE__*/React.createElement("span", {
              style: _objectSpread2(_objectSpread2({}, viewPortSize), {}, {
                height: height,
                lineHeight: "".concat(height, "px"),
                fontSize: "".concat(height - 1, "px"),
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                WebkitFontSmoothing: 'antialiased',
                color: color,
                background: background,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: "rotateX(".concat(rotateDegreePerNumber * i, "turn) translateZ(").concat(translateZ, "px)")
              }, numberStyle),
              key: "".concat(rotateDegreePerNumber * i)
            }, n);
          }));
        }
      }), /*#__PURE__*/React.createElement("span", {
        data: length - position,
        style: _objectSpread2(_objectSpread2({}, viewPortSize), {}, {
          height: height,
          lineHeight: "".concat(height, "px"),
          fontSize: "".concat(height - 1, "px"),
          left: "".concat(length - position > 4 ? 0.25 : 0, "px"),
          // hacky fix for weird misalignment in Chrome.
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          WebkitFontSmoothing: 'antialiased',
          color: color,
          background: background,
          transform: "rotateX(0turn) translateZ(".concat(translateZ, "px)"),
          visibility: 'hidden'
        }, numberStyle)
      }, activeNumber));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref3, _ref4) {
      var activeNumber = _ref3.activeNumber,
          loop = _ref3.loop;
      var rotateCounter = _ref4.rotateCounter;
      return calculateDegrees(rotateCounter, activeNumber, loop);
    }
  }]);

  return FlipNumber;
}(React.Component);

_defineProperty(FlipNumber, "defaultProps", {
  loop: 0
});

var FlipNumbers = /*#__PURE__*/function (_React$Component) {
  _inherits(FlipNumbers, _React$Component);

  var _super = _createSuper(FlipNumbers);

  function FlipNumbers() {
    _classCallCheck(this, FlipNumbers);

    return _super.apply(this, arguments);
  }

  _createClass(FlipNumbers, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.numbers !== this.props.numbers || nextProps.height !== this.props.height || nextProps.width !== this.props.width || nextProps.duration !== this.props.duration || nextProps.delay !== this.props.delay || nextProps.loop !== this.props.loop || nextProps.play !== this.props.play;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          numbers = _this$props.numbers,
          nonNumberStyle = _this$props.nonNumberStyle,
          numberStyle = _this$props.numberStyle,
          height = _this$props.height,
          width = _this$props.width,
          color = _this$props.color,
          background = _this$props.background,
          perspective = _this$props.perspective,
          duration = _this$props.duration,
          animate = _this$props.animate,
          play = _this$props.play,
          delay = _this$props.delay,
          loop = _this$props.loop;
      var numberCounter = 0;
      return /*#__PURE__*/React.createElement("section", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        "aria-label": numbers
      }, Array.from(numbers).map(function (n, key) {
        var nonNumber = /*#__PURE__*/React.createElement("span", {
          "aria-hidden": true,
          style: nonNumberStyle,
          key: numberCounter
        }, n);

        if (animate) {
          numberCounter += 1;
          return !Number.isNaN(parseInt(n, 10)) ? /*#__PURE__*/React.createElement(FlipNumber, {
            key: key,
            height: height,
            width: width,
            color: color,
            background: background,
            perspective: perspective,
            duration: duration,
            play: play,
            delay: delay,
            loop: loop,
            numberStyle: numberStyle,
            position: numberCounter,
            length: numbers.length,
            activeNumber: parseInt(n, 10)
          }) : nonNumber;
        }

        return !Number.isNaN(parseInt(n, 10)) ? /*#__PURE__*/React.createElement("span", {
          "aria-hidden": true,
          style: {
            padding: 0
          },
          className: nonNumberStyle,
          key: numberCounter
        }, n) : nonNumber;
      }));
    }
  }]);

  return FlipNumbers;
}(React.Component);

_defineProperty(FlipNumbers, "defaultProps", {
  perspective: 500,
  duration: 0.3,
  animate: true,
  play: false,
  delay: 0,
  loop: 1,
  nonNumberStyle: {},
  numberStyle: {}
});

exports.FlipNumber = FlipNumber;
exports.default = FlipNumbers;
