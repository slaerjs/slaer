
// Provides a means to create a function that
// delegates its calles to some other function,
// optionally overriding the 'this' variable.
function delegate(fn, thisInstance) {
	return function() { return fn.apply(thisInstance || this, Array.prototype.slice.call(arguments)); };
}

// Export the module.
module.exports = slaer.delegate = delegate;

