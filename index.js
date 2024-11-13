/*!
 *
 * The MIT License (MIT)
 *
 * Copyright © 2024 Taufik Nurrohman <https://github.com/taufik-nurrohman>
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
(function (g, f) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = f() : typeof define === 'function' && define.amd ? define(f) : (g = typeof globalThis !== 'undefined' ? globalThis : g || self, g.Key = f());
})(this, (function () {
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

    function Key(self) {
        var $ = this;
        $.commands = {};
        $.key = null;
        $.keys = {};
        $.self = self || $;
        $.set = new Set();
        return $;
    }
    var $$ = Key.prototype;
    $$.command = function (v) {
        var $ = this;
        if (isString(v)) {
            return v === $.toString();
        }
        var command = $.keys[$.toString()];
        return isSet(command) ? command : false;
    };
    $$.fire = function (command, data) {
        var $ = this;
        var self = $.self || $,
            value,
            exist;
        data = data || [];
        if (isFunction(command)) {
            value = command.apply(self, data);
            exist = true;
        } else if (isString(command) && (command = $.commands[command])) {
            value = command.apply(self, data);
            exist = true;
        } else if (isArray(command)) {
            if (isArray(command[1])) {
                command[1].forEach(function (v, k) {
                    return isSet(v) && (data[k] = v);
                });
            }
            if (command = $.commands[command[0]]) {
                value = command.apply(self, data);
                exist = true;
            }
        }
        return exist ? isSet(value) ? value : true : null;
    };
    $$.pull = function (key) {
        var $ = this;
        $.key = null;
        if (!isSet(key)) {
            return $.set = new Set(), $;
        }
        return $.set.delete(key), $;
    };
    $$.push = function (key) {
        var $ = this;
        return $.set.add($.key = key, 1), $;
    };
    $$.toArray = function () {
        return Array.from(this.set);
    };
    $$.toString = function () {
        return this.toArray().join('-');
    };
    Object.defineProperty(Key, 'name', {
        value: 'Key'
    });
    return Key;
}));