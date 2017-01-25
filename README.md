Key
===

> Easy keyboard events.

Demo
----

[Demo](https://tovic.github.io/key)

Usage
-----

### Apply to Specific Event

~~~ .js
input.addEventListener("keydown", function(e) {
    console.log(K.set(e).key());
}, false);
~~~

### Apply to All Keyboard Events

~~~ .js
K.set(); // apply to all keyboard events…

input.addEventListener("keydown", function(e) {
    console.log(e.K.key());
}, false);

textarea.addEventListener("keydown", function(e) {
    console.log(e.K.key());
}, false);
~~~

### Properties

 - `K.set()`
 - `K.reset()`
 - `K.keys`
 - `K.keys_a`
 - `K.id`
 - `K.version`

~~~ .js
K.set();

input.addEventListener("keydown", function(e) {

    console.log(e.key); // [^1]

    console.log(e.K.key()); // [^2]
    console.log(e.K.control()); // [^3]
    console.log(e.K.shift()); // [^4]
    console.log(e.K.option()); // [^5]
    console.log(e.K.meta()); // [^6]

    console.log(e.K.control('b')); // [^7]

    // check for current key character (try pressing the “control” key)
    if (e.K.key('ctrl')) { … } // [^8]
    if (e.K.key() === 'ctrl') { … } // [^9]
    if (e.K.key() === 'control') { … } // [^10]
    if (e.K.key(/^[abc]$/)) { … } // [^11]
    if (e.K.key(['ctrl', 'alt', 'shift'])) { … } // [^12]

}, false);

// [^1]: return the native `KeyboardEvent.key` value if supported
// [^2]: return the current key character (lower–cased)
// [^3]: return `true` if “control” key is pressed
// [^4]: return `true` if “shift” key is pressed
// [^5]: return `true` if “option” key is pressed
// [^6]: return `true` if “meta” key is pressed
// [^7]: return `true` if “control” and `b` keys are pressed
// [^8]: `ctrl` is an alias for `control`, this will return `true`
// [^9]: comparing `ctrl` outside the function, this will return `false`
// [^10]: is equal to the original key value, this will return `true`
// [^11]: return `true` if key character is either `a`, `b` or `c`
// [^12]: return `true` if key character is either `control`, `alt` or `shift`
~~~