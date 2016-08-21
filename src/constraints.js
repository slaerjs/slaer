

slaer._constraints = {};

slaer.constraint = function(name, handler) {
	this._constraints[name] = handler;
};

slaer.constraint('default', function(value) {
	return value;
});

slaer.constraint('int', function(value) {
    value = parseInt(value);
    
    if (!isNaN(value)) {
      return value;
    }
});

slaer.constraint('float', function(value) {
    value = parseFloat(value);
    
    if (!isNaN(value)) {
      return value;
    }
});


// Export the module.
//module.exports = slaer.Constraint = Constraint;
