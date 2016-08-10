

slaer._constraints = {};

slaer.constraint = function(name, handler) {
	this._constraints[name] = handler;
};

slaer.constraint('default', function(value) {
	return value;
});

slaer.constraint('int', function(value) {
    vaule = parseInt(value);
    
    if (!isNaN(vaule)) {
      return vaule;
    }
});

slaer.constraint('float', function(value) {
    vaule = parseFloat(value);
    
    if (!isNaN(vaule)) {
      return vaule;
    }
});


// Export the module.
//module.exports = slaer.Constraint = Constraint;
