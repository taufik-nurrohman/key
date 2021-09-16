import {isArray, isFunction, isSet, isString} from '@taufik-nurrohman/is';
import {toObjectKeys} from '@taufik-nurrohman/to';

function K(source = {}) {

    let $ = this,
        keys = {};

    $.commands = {};

    $.fire = command => {
        let context = $.source,
            value, exist;
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

    $.source = source;

    $.test = () => {
        let command = $.keys[$.toString()];
        return isSet(command) ? command : false;
    };

    $.toString = () => {
        return toObjectKeys(keys).join('-');
    };

    return $;

}

K.version = '%(version)';

export default K;