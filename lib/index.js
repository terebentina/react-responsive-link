module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _function = __webpack_require__(1);

	var _function2 = _interopRequireDefault(_function);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var swipePX = 30;

	var ReactResponsiveLink = function (_React$Component) {
		_inherits(ReactResponsiveLink, _React$Component);

		function ReactResponsiveLink() {
			var _Object$getPrototypeO;

			var _temp, _this, _ret;

			_classCallCheck(this, ReactResponsiveLink);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ReactResponsiveLink)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.shouldComponentUpdate = _function2.default, _this.touchPos = [], _temp), _possibleConstructorReturn(_this, _ret);
		}

		_createClass(ReactResponsiveLink, [{
			key: 'onAction',
			value: function onAction(cb, e) {
				if (e.cancelable) {
					e.preventDefault();
				}
				var doAction = true;
				if (e.type == 'touchend') {
					if (this.touchPos.length && e.changedTouches[0] && e.changedTouches[0].clientX) {
						if (Math.abs(this.touchPos[0] - e.changedTouches[0].clientX) > swipePX || Math.abs(this.touchPos[1] - e.changedTouches[0].clientY) > swipePX) {
							// this is a swipe, don't do anything
							doAction = false;
						}
					}
					this.touchPos = [];
				}
				if (doAction) {
					cb(e);
				}
			}
		}, {
			key: 'onTouchStart',
			value: function onTouchStart(e) {
				// this is what prevents click events from happening. Doing the same from touchend doesn't work!!!
				//e.preventDefault();
				if (e.changedTouches[0] && e.changedTouches[0].clientX) {
					this.touchPos = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
				}
			}

			// keeps the touchstart position to compare it with touchend position so we know if the user swiped or tapped

		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props;
				var onClickTap = _props.onClickTap;
				var href = _props.href;
				var onClick = _props.onClick;
				var disabled = _props.disabled;
				var onTouchStart = _props.onTouchStart;

				var props = _objectWithoutProperties(_props, ['onClickTap', 'href', 'onClick', 'disabled', 'onTouchStart']);

				if (disabled) {
					props.disabled = true;
					props.onClick = props.onTouchEnd = function (e) {
						e.preventDefault();
					};
					props.href = href || '#';
				} else if (onClickTap) {
					props.onClick = props.onTouchEnd = this.onAction.bind(this, onClickTap);
					props.href = '#';
				} else if (href) {
					props.onClick = props.onTouchEnd = this.onAction.bind(this, function () {
						window.location = href;
					});
					props.href = href;
				} else if (onClick) {
					props.onTouchEnd = this.onAction.bind(this, onClick);
					props.href = '#';
				}

				if (onTouchStart) {
					props.onTouchStart = function (e) {
						_this2.onTouchStart.call(_this2, e);
						onTouchStart(e);
					};
				} else {
					props.onTouchStart = this.onTouchStart.bind(this);
				}

				return _react2.default.createElement(
					'a',
					props,
					this.props.children
				);
			}
		}]);

		return ReactResponsiveLink;
	}(_react2.default.Component);

	ReactResponsiveLink.propTypes = {
		disabled: _react2.default.PropTypes.bool,
		href: _react2.default.PropTypes.string,
		onClick: _react2.default.PropTypes.func,
		onClickTap: _react2.default.PropTypes.func,
		onTouchStart: _react2.default.PropTypes.func,
		children: _react2.default.PropTypes.node
	};
	exports.default = ReactResponsiveLink;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = shouldPureComponentUpdate;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _shallowEqual = __webpack_require__(2);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	function shouldPureComponentUpdate(nextProps, nextState) {
	  return !(0, _shallowEqual2['default'])(this.props, nextProps) || !(0, _shallowEqual2['default'])(this.state, nextState);
	}

	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = shallowEqual;

	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ }
/******/ ]);