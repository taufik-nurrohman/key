import {isArray, isFunction, isSet, isString} from '@taufik-nurrohman/is';
import {toObjectKeys} from '@taufik-nurrohman/to';

function K(source = {}) {

    let $ = this;

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

    $.key = null;

    $.keys = {};

    $.pull = key => {
        $.key = null;
        if (!isSet(key)) {
            return ($.queue = {}), $;
        }
        return (delete $.queue[key]), $;
    };

    $.push = key => {
        return ($.queue[$.key = key] = 1), $;
    };

    $.queue = {};

    $.source = source;

    $.test = () => {
        let command = $.keys[$.toString()];
        return isSet(command) ? command : false;
    };

    $.toString = () => {
        return toObjectKeys($.queue).join('-');
    };

    return $;

}

export default K;