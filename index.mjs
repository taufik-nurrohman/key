import {isArray, isFunction, isSet, isString} from '@taufik-nurrohman/is';
import {toObjectKeys} from '@taufik-nurrohman/to';

export default function Key(self) {

    let $ = this;
    let queue = {};

    $.command = v => {
        if (isString(v)) {
            return v === $.toString();
        }
        let command = $.keys[$.toString()];
        return isSet(command) ? command : false;
    };

    $.commands = {};

    $.fire = command => {
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

    $.key = null;

    $.keys = {};

    $.pull = key => {
        $.key = null;
        if (!isSet(key)) {
            return (queue = {}), $;
        }
        return (delete queue[key]), $;
    };

    $.push = key => {
        return (queue[$.key = key] = 1), $;
    };

    $.self = self;

    $.toString = () => {
        return toObjectKeys(queue).join('-');
    };

    return $;

}