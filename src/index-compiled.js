'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function curry(fn) {
    var arity = fn.length;
    return getArgs([]);

    function getArgs(totalArgs) {
        return function stepTwo() {
            var nextTotalArgs = totalArgs.concat([].slice.call(arguments, 0));
            if (nextTotalArgs.length >= arity) return fn.apply(this, nextTotalArgs);else return getArgs(nextTotalArgs);
        };
    }
}

function Component(x) {
    this.__value = x;
}

Component.of = function (x) {
    return new Component(x);
};

Component.prototype.empty = function () {
    return new Component(null);
};

function flatten(seq) {
    return seq.reduce(function flat(a, b) {
        if ({}.toString.call(b) === '[object Array]') return b.reduce(flat, a);
        a.push(b);
        return a;
    }, []);
}

Component.prototype.concat = function (other) {

    return new Component([this.__value].concat(other));
};

Component.prototype.map = function (f) {
    return new Component(f(this.__value));
};

Component.prototype.ap = function (other) {
    return other.map(this.__value);
};

Component.prototype.flatMap = function (f) {
    return new Component(f(flatten(this.__value)));
};

Component.prototype.join = function () {
    return this.__value;
};

var ContentA = function ContentA(props) {
    return _react2.default.createElement(
        'p',
        null,
        'Widget A'
    );
};

var ContentB = function ContentB(props) {
    return _react2.default.createElement(
        'p',
        null,
        'Widget B'
    );
};

var ContentC = function ContentC(props) {
    return _react2.default.createElement(
        'p',
        null,
        'Widget C'
    );
};

var Page = function (_React$Component) {
    _inherits(Page, _React$Component);

    function Page(props) {
        _classCallCheck(this, Page);

        return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));
    }

    _createClass(Page, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    'A Page'
                ),
                this.props.children
            );
        }
    }]);

    return Page;
}(_react2.default.Component);

var Home = function (_React$Component2) {
    _inherits(Home, _React$Component2);

    function Home(props) {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));
    }

    _createClass(Home, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.props.children
            );
        }
    }]);

    return Home;
}(_react2.default.Component);

// Should be Curried


var rLoop = curry(function rLoop(C, id) {
    return function (props) {
        _reactDom2.default.render(_react2.default.cloneElement(C, { props: props }), document.querySelector(id));
        return rLoop(C, id);
    };
});

function renderAdapter(B) {
    switch ({}.toString.call(B)) {
        case '[object Function]':
            return _react2.default.createElement(B, null);
        case '[object Object]':
            return B;
        case '[object Array]':
            return B.map(function (C) {
                return _react2.default.createElement(C, { key: Math.random() });
            });
    }
}

var render = function render(A) {
    return function (B) {
        return _react2.default.createElement(
            A,
            null,
            renderAdapter(B)
        );
    };
};
var compose = function compose() {
    for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
        fns[_key] = arguments[_key];
    }

    return function (x) {
        return fns.reverse().reduce(function (a, b) {
            return b(a);
        }, x);
    };
};
var compSeq = compose(render(Page), render(Home))([ContentA, ContentB, ContentC]);
var AppUpdate = rLoop(compSeq, '#app-1');
AppUpdate({ id: 10 });

var App = Component.of(Home).concat(Page).concat(Page).flatMap(function (r) {
    return renderAdapter(r);
});

// Fix for multi components -> React.children issue
var renderApp = Component.of(rLoop).ap(Component.of(renderAdapter(Page))).ap(Component.of('#app-2')).ap(Component.of({ id: 10 }));

//# sourceMappingURL=index-compiled.js.map