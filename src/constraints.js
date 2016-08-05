

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

slaer.constraint('int', function(value) {
    vaule = parseFloat(value);
    
    if (!isNaN(vaule)) {
      return vaule;
    }
});

