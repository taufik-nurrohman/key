/*!
 *
 * The MIT License (MIT)
 *
 * Copyright © 2022 Taufik Nurrohman <https://github.com/taufik-nurrohman>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
(function(g, f) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = f() : typeof define === 'function' && define.amd ? define(f) : (g = typeof globalThis !== 'undefined' ? globalThis : g || self, g.K = f());
})(this, (function() {
    'use strict';
    var isArray = function isArray(x) {
        return Array.isArray(x);
    };
    var isDefined = function isDefined(x) {
        return 'undefined' !== typeof x;
    };
    var isFunction = function isFunction(x) {
        return 'function' === typeof x;
    };
    var isNull = function isNull(x) {
        return null === x;
    };
    var isSet = function isSet(x) {
        return isDefined(x) && !isNull(x);
    };
    var isString = function isString(x) {
        return 'string' === typeof x;
    };
    var toObjectKeys = function toObjectKeys(x) {
        return Object.keys(x);
    };

    function K(source) {
        if (source === void 0) {
            source = {};
        }
        var $ = this;
        $.command = function(v) {
            if (isString(v)) {
                return v === $.toString();
            }
            var command = $.keys[$.toString()];
            return isSet(command) ? command : false;
        };
        $.commands = {};
        $.fire = function(command) {
            var context = $.source,
                value,
                exist;
            if (isFunction(command)) {
                value = command.call(context);
                exist = true;
            } else if (isString(command) && (command = $.commands[command])) {
                value = command.call(context);
                exist = true;
            } else if (isArray(command)) {
                var data = command[1] || [];
                if (command = $.commands[command[0]]) {
                    value = command.apply(context, data);
                    exist = true;
                }
            }
            return exist ? isSet(value) ? value : true : null;
        };
        $.key = null;
        $.keys = {};
        $.pull = function(key) {
            $.key = null;
            if (!isSet(key)) {
                return $.queue = {}, $;
            }
            return delete $.queue[key], $;
        };
        $.push = function(key) {
            return $.queue[$.key = key] = 1, $;
        };
        $.queue = {};
        $.source = source;
        $.toString = function() {
            return toObjectKeys($.queue).join('-');
        };
        return $;
    }
    return K;
}));