/**
 * Circular.js V1.0
 * Author: Nitesh Oswal
 */

;(function(scope, factory) {

    this.circular = factory;

})(this, function(name) { //I always forget the techincal name for this, IIFE - Immediately-Invoked Function Expression

    return function(key, value) {
        return value;
    }

});