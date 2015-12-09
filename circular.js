
/**
 * The wrapper which allows the module to work in different environment, CommonJS-like envs like Node, AMD loaders such as Require.js, and ofcourse can be used globally in browser
 * @param  {function} scope   The scope or the root, it is the environment we're going to glue our logic to
 * @param  {function} utility The Circular.js utility itself
 * @return {undefined}
 */
;(function(scope, utility) {

    if(typeof define === "function" && define.amd) {
        //For AMD loaders & lovers
        define(['circular'], function(circular) {

            return (scope.circular = utility);
        });
    } else if(typeof exports === "object") {
        //for Node
        module.exports = utility;
    } else {
        //for the browsers
        scope.circular = utility;
    }

    this.circular = utility;

})(this, 
/**
 * Circular replacer int it's utmost glory
 * @param  {string|object} ref     The alternative replacer text for a circular object
 * @param  {object} options        Options for the 
 * @return {mixed}                 Returns the value
 */ 
function(ref, options) {
    
    const AUTHOR = "Nitesh Oswal"; //for the lols..

    if(typeof ref === "object" || typeof ref === "undefined") {
        options = ref || {};
        ref = "[circular Circular]";
    }

    var defaults = {
        stringifyFunctions: true, //do you want to stringify functions, I really don't know why, but I don't wanna
        keep: [], //much like the replacer's already known functionality, of filtering objects using arrays
        discard: [] //yoo, just in case we need to discard something
    };

    //Extend defaults with options
    if(typeof Object.assign === "function") { //needs ES6, why not!
        defaults = Object.assign(defaults, options); 
    } else { //fallback -_- didn't wanted the ES6 polyfill, just for my use case
        for(option in options) { //copy options into options
            defaults[option] = options[option];
        }
    }

    var traversed = [];
    return function(key, value) {

        if(defaults.keep.length > 0 && defaults.keep.indexOf(key) == -1) return;
        if(defaults.discard.length > 0 && defaults.discard.indexOf(key) > -1) return;

        if(typeof value === "function" && defaults.stringifyFunctions) {
            return value.toString(); //stringify functions
        }

        if(!value || typeof value !== "object") {
            return value; //let those booleans and strings and other things pass
        }

        if(traversed.indexOf(value) > -1) { //check if the "value" was present in the traversed stack
            if(typeof ref === "function") return ref(value);
            return ref;
        }

        traversed.push(value); //we've traversed "this" lol, get it? no? k..

        return value; //who are we! utilities! 
                      //What do we do! return that value!
    }
});