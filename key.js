/*! <https://github.com/tovic/key> */

(function(win, NS) {
    function slug(s) {
        return s.replace(/[A-Z]/g, function($) {
            return '-' + $.toLowerCase();
        }).replace(/^-*|-*$/g, "");
    }
    var K = win[NS] = function(event, id) {
        var $ = this,
            i, j, k, l;
        $.id = id || NS;
        function set(e) {
            // custom `KeyboardEvent.key` for internal use
            var alias = K.alias,
                k = slug(e.key);
            function ret(x, y) {
                if (typeof y === "string") {
                    y = e[y + 'Key'];
                }
                if (!x || x === true) {
                    if (typeof y === "boolean") {
                        return y;
                    }
                    return k;
                }
                if (x instanceof RegExp) {
                    return y && x.test(k);
                }
                if (typeof x === "object") {
                    if (y) {
                        for (i = 0, j = x.length; i < j; ++i) {
                            l = slug(x[i]);
                            if ((alias[l] || l) === k) return true;
                        }
                    }
                    return false;
                }
                return x = slug(x), y && (alias[x] || x) === k;
            }
            return {
                key: function(x) {
                    return ret(x, 1);
                },
                control: function(x) {
                    return ret(x, 'ctrl');
                },
                shift: function(x) {
                    return ret(x, 'shift');
                },
                option: function(x) {
                    return ret(x, 'alt');
                },
                meta: function(x) {
                    return ret(x, 'meta');
                }
            };
        }
        var proto = KeyboardEvent.prototype;
        $.set = function() {
            if (event) {
                return set(event);
            }
            Object.defineProperty(proto, $.id, {
                configurable: true,
                get: function() {
                    return set(this);
                }
            });
            return $;
        };
        $.reset = function() {
            delete proto[NS];
        };
    };
    K.version = '2.0.0';
    // key alias(es)
    K.alias = {
        'alternate': 'alt',
        'option': 'alt',
        'ctrl': 'control',
        'cmd': 'control',
        'command': 'control',
        'os': 'meta', // <https://bugzilla.mozilla.org/show_bug.cgi?id=1232918>
        'context': 'context-menu',
        'menu': 'context-menu',
        'return': 'enter',
        'ins': 'insert',
        'del': 'delete',
        'esc': 'escape',
        'left': 'arrow-left',
        'right': 'arrow-right',
        'up': 'arrow-up',
        'down': 'arrow-down',
        'back': 'backspace',
        'back-space': 'backspace',
        'space': ' ',
        'plus': '+',
        'minus': '-'
    };
})(window, 'K');