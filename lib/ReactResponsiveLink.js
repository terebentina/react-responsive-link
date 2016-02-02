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

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _mixin = __webpack_require__(2);

	var _mixin2 = _interopRequireDefault(_mixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//import history from '../history';

	var swipePX = 30;

	var ReactResponsiveLink = _react2.default.createClass({
		displayName: 'ReactResponsiveLink',

		propTypes: {
			disabled: _react2.default.PropTypes.bool,
			className: _react2.default.PropTypes.string,
			title: _react2.default.PropTypes.string,
			tabIndex: _react2.default.PropTypes.string,
			rel: _react2.default.PropTypes.string,
			target: _react2.default.PropTypes.string,
			to: _react2.default.PropTypes.string,
			href: _react2.default.PropTypes.string,
			onClick: _react2.default.PropTypes.func,
			onClickTap: _react2.default.PropTypes.func,
			children: _react2.default.PropTypes.node
		},

		mixins: [_mixin2.default],

		onAction: function onAction(cb, e) {
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
		},
		onTouchStart: function onTouchStart(e) {
			// this is what prevents click events from happening. Doing the same from touchend doesn't work!!!
			e.preventDefault();
			if (e.changedTouches[0] && e.changedTouches[0].clientX) {
				this.touchPos = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
			}
		},

		// keeps the touchstart position to compare it with touchend position so we know if the user swiped or tapped
		touchPos: [],

		render: function render() {
			var _this = this;

			var props = {
				href: '#',
				className: this.props.className,
				title: this.props.title,
				tabIndex: this.props.tabIndex,
				rel: this.props.rel,
				target: this.props.target,
				onTouchStart: this.onTouchStart
			};

			if (this.props.to) {
				props.onClick = props.onTouchEnd = this.onAction.bind(this, function () {
					history.pushState(null, _this.props.to);
				});
			} else if (this.props.href) {
				props.onClick = props.onTouchEnd = this.onAction.bind(this, function () {
					window.location = _this.props.href;
				});
				props.href = this.props.href;
			} else if (this.props.onClickTap) {
				props.onClick = this.props.onClickTap;
				props.onTouchEnd = this.props.onClickTap;
			} else if (this.props.onClick) {
				props.onClick = this.props.onClick;
				props.onTouchEnd = this.props.onClick;
			}

			if (this.props.disabled) {
				props.disabled = true;
				props.onClick = props.onTouchEnd = function (e) {
					e.preventDefault();
				};
			}

			return _react2.default.createElement(
				'a',
				props,
				this.props.children
			);
		}
	});

	exports.default = ReactResponsiveLink;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = shouldPureComponentUpdate;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _shallowEqual = __webpack_require__(3);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	function shouldPureComponentUpdate(nextProps, nextState) {
	  return !(0, _shallowEqual2['default'])(this.props, nextProps) || !(0, _shallowEqual2['default'])(this.state, nextState);
	}

	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _function = __webpack_require__(1);

	var _function2 = _interopRequireDefault(_function);

	exports['default'] = {
	  shouldComponentUpdate: _function2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports) {

	module.exports = react;

/***/ }
/******/ ]);