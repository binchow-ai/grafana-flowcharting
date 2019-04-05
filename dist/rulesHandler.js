"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rule_class = _interopRequireDefault(require("./rule_class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RulesHandler =
/*#__PURE__*/
function () {
  /** @ngInject */
  function RulesHandler($scope, data) {
    _classCallCheck(this, RulesHandler);

    u.log(1, "RulesHandler.constructor()");
    u.log(0, "RulesHandler.constructor() Rules", rules);
    this.$scope = $scope || null;
    this.rules = rules;
    this.data = data; // if (version != this.panel.version) this.migrate(this.rules)
    // else this.import(this.rules);

    if (this.data != undefined && this.data != null && this.data.length > 0) {
      this.import(this.data);
    }
  }

  _createClass(RulesHandler, [{
    key: "backup",
    value: function backup() {
      this.panel.rules = this.export();
    }
  }, {
    key: "export",
    value: function _export() {}
  }, {
    key: "import",
    value: function _import(obj) {
      var _this = this;

      obj.forEach(function (rule) {
        var data = {};
        var newRule = new _rule_class.default('', data);

        _this.rules.push(newRule);

        _this.data.push(data);
      });
    }
  }, {
    key: "migrate",
    value: function migrate(obj) {
      var _this2 = this;

      obj.forEach(function (rule) {
        var data = {};
        var newRule = new _rule_class.default('', data);

        _this2.rules.push(newRule);

        _this2.data.push(data);
      });
    }
  }, {
    key: "getRules",
    value: function getRules() {
      return this.rules;
    }
  }, {
    key: "getRule",
    value: function getRule(index) {
      return this.rules[index];
    }
  }, {
    key: "addRule",
    value: function addRule(pattern) {
      var data = {};
      var newRule = new _rule_class.default(pattern, data);
      this.rules.push(newRule);
      this.data.push(data);
    }
  }, {
    key: "countRules",
    value: function countRules() {
      if (this.rules != undefined && Array.isArray(this.rules)) return this.rules.length;else return 0;
    }
  }, {
    key: "removeRule",
    value: function removeRule(index) {
      // this.rules = _.without(this.rules, rule);
      this.rules.splice(index, 1);
      this.data.splice(index, 1);
    }
  }, {
    key: "cloneRule",
    value: function cloneRule(rule) {
      var newRule = angular.copy(rule);
      var rules = this.rules;
      var rulesCount = rules.length;
      var indexToInsert = rulesCount; // check if last is a catch all rule, then add it before that one

      if (rulesCount > 0) {
        var last = rules[rulesCount - 1];

        if (last.pattern === "/.*/") {
          indexToInsert = rulesCount - 1;
        }
      }

      rules.splice(indexToInsert, 0, newRule);
      this.activeRuleIndex = indexToInsert;
    }
  }, {
    key: "moveRuleToUp",
    value: function moveRuleToUp(index) {
      var first = 0;
      var rules = this.rules;
      var last = rules.length - 1;

      if (index != first && last != first) {
        var curr = rules[index];
        var before = rules[index - 1];
        rules[index - 1] = curr;
        rules[index] = before;
      }
    }
  }, {
    key: "moveRuleToDown",
    value: function moveRuleToDown(index) {
      var first = 0;
      var rules = this.rules;
      var last = rules.length - 1;

      if (index != last && last != first) {
        var curr = rules[index];
        var after = rules[index + 1];
        rules[index + 1] = curr;
        rules[index] = after;
      }
    }
  }]);

  return RulesHandler;
}();

exports.default = RulesHandler;