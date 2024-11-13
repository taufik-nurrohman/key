import {isArray, isFunction, isSet, isString} from '@taufik-nurrohman/is';

function Key(self) {

    const $ = this;

    $.commands = {};
    $.key = null;
    $.keys = {};
    $.self = self || $;
    $.set = new Set;

    return $;

}

const $$ = Key.prototype;

$$.command = function (v) {
    let $ = this;
    if (isString(v)) {
        return v === $.toString();
    }
    let command = $.keys[$.toString()];
    return isSet(command) ? command : false;
};

$$.fire = function (command, data) {
    let $ = this;
    let self = $.self || $,
        value, exist;
    data = data || [];
    if (isFunction(command)) {
        value = command.apply(self, data);
        exist = true;
    } else if (isString(command) && (command = $.commands[command])) {
        value = command.apply(self, data);
        exist = true;
    } else if (isArray(command)) {
        if (isArray(command[1])) {
            command[1].forEach((v, k) => data[k] = v);
        }
        if (command = $.commands[command[0]]) {
            value = command.apply(self, data);
            exist = true;
        }
    }
    return exist ? (isSet(value) ? value : true) : null;
};

$$.pull = function (key) {
    let $ = this;
    $.key = null;
    if (!isSet(key)) {
        return ($.set = new Set), $;
    }
    return $.set.delete(key), $;
};

$$.push = function (key) {
    let $ = this;
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

export default Key;