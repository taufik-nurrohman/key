import {isArray, isFunction, isSet, isString} from '@taufik-nurrohman/is';
import {toObjectKeys} from '@taufik-nurrohman/to';

function Key(self) {

    const $ = this;

    $.commands = {};
    $.key = null;
    $.keys = {};
    $.queue = {};
    $.self = self || $;

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

$$.fire = function (command) {
    let $ = this;
    let self = $.self || $,
        value, exist;
    if (isFunction(command)) {
        value = command.call(self);
        exist = true;
    } else if (isString(command) && (command = $.commands[command])) {
        value = command.call(self);
        exist = true;
    } else if (isArray(command)) {
        let data = command[1] || [];
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
        return ($.queue = {}), $;
    }
    return (delete $.queue[key]), $;
};

$$.push = function (key) {
    let $ = this;
    return ($.queue[$.key = key] = 1), $;
};

$$.toString = function () {
    return toObjectKeys(this.queue).join('-');
};

Object.defineProperty(Key, 'name', {
    value: 'Key'
});

export default Key;