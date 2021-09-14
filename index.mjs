import {isArray, isFunction, isSet, isString} from '@taufik-nurrohman/is';
import {toObjectKeys} from '@taufik-nurrohman/to';

function K(context = {}) {

    let $ = this,
        keys = {};

    $.commands = {};

    $.fire = command => {
        let value, exist;
        if (isFunction(command)) {
            value = command.call(context);
            exist = true;
        } else if (isString(command) && (command = $.commands[command])) {
            value = command.call(context);
            exist = true;
        } else if (isArray(command)) {
            let data = command[1] || [];
            if (command = $.commands[command[0]]) {
                value = command.apply(context, data);
                exist = true;
            }
        }
        return exist ? (isSet(value) ? value : true) : null;
    };

    $.keys = {};

    $.pull = key => {
        if (!isSet(key)) {
            return (keys = {}), $;
        }
        return (delete keys[key]), $;
    };

    $.push = key => {
        return (keys[key] = 1), $;
    };

    $.test = () => {
        let command = $.keys[$.toString()];
        return isSet(command) ? command : false;
    };

    $.toString = () => {
        return toObjectKeys(keys).join('-');
    };

    return $;

}

K.version = '2.0.1';

export default K;