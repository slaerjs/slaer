


// The heart and sole of the entire system.
function Route(parent, segment) {
	this._parent = parent;
	this._children = {};
	
	if (segment) {
		this._segment = new slaer.Segment(segment);
	}
	
	if (parent) {
		this._parent._children[segment] = this;
	}
};


// The regex pattern used to identify individual path segments.
Route.SEGMENT_EXTRACTION_PATTERN = /[^\/]+/g;


// Extracts the segment values from a path.
Route.extractSegments = function(path) {
    path = path || '';

    var segments = [];

    // We use replace because it gives us a convenient pattern for auto-iterating the matches.
    path.replace(Route.SEGMENT_EXTRACTION_PATTERN, function (match) { segments.push(match); });

    return segments;
}

// Sets the initialization handler for a path.
Route.prototype.init = function(path, handler) {
  this.route(path, { init: handler });
};

// Sets the entering handler for a path.
Route.prototype.on =
Route.prototype.enter =
function(path, handler) {
  this.route(path, { enter: handler });
};

// Sets the exiting handler for a path.
Route.prototype.off =
Route.prototype.exit =
function(path, handler) {
  this.route(path, { exit: handler });
};

// Defines a new or updates an existing route configuration for a path.
Route.prototype.route = function(path, cfg) {
	if (!cfg) throw new Error("cfg parameter is required");
  
	if (typeof cfg === 'function') {
		return this.route(path, { enter: cfg });
	}
	
	var segments = Route.extractSegments(path);

	var route = this;
	
	// /one/two/{id} --> ['one', 'two', '{id}']
	for (var s in segments) {
		route = route._children[segments[s]] || new Route(route, segments[s]);
	}
  
	for (var i in cfg) {
		route[i] = cfg[i];
	}
};


/*!
Route.routes()
  Returns an array of route urls.

Route.routes(cfg)
  Defines route configurations for all routes defined in the config.
*/
Route.prototype.routes = function(cfg) {
  if (!cfg) {
    return ["todo: send back the routes"];
  }
};


// Executes the given path.
Route.prototype.execute = function(path) {
	var segments = Route.extractSegments(path);
	
	var route = this, params = [];
	
	for (var s in segments) {
		var segment = segments[s];
		
		slaer.log('segment:', segment);		
		
		// search the possible values for a match
		for (var r in route._children) {
			if (route._children[r]._segment.satisfies(segment, params)) {
				route = route._children[r];
				break;
			}
		}
		
		if (!route) {
			throw new Error("404: '" + path + "' was not found!");
		}
	}
	
	if (typeof route.enter !== 'function') {
		throw new Error("404: '" + path + "' was not found!");
	}
	
	route.enter.apply(route, params);
	
	
	
	var links = document.body.getElementsByTagName("a");
		
	for (var i = 0; i < links.length; i++) {
		
		console.log(links[i].getAttribute('href'));
	
		links[i].addEventListener('click', function(evt) {
			evt.preventDefault();
			
			console.log("clicked:", evt.target.getAttribute('href'));
			
			slaer.go(evt.target.getAttribute('href'));
		});
	}
};



// Navigates to the given path.
Route.prototype.go = function(path) {
	var hash = '#' + path;
	
	if (window.location.hash === hash) {
		this.execute(path);
	}
	
	else if (window.location.hash !== '') {
		window.location.hash = path;
	}
	
	else {
		window.location = hash;
	}
};


// Export the module.
module.exports = slaer.Route = Route;


function delegate(obj, fn) {
	return function() { return fn.apply(obj, Array.prototype.slice.call(arguments)); };
}


slaer._router = new Route();

// Configure the facade routing interface.
slaer.init = delegate(slaer._router, slaer._router.init);
slaer.on = delegate(slaer._router, slaer._router.on);
slaer.enter = delegate(slaer._router, slaer._router.enter);
slaer.off = delegate(slaer._router, slaer._router.off);
slaer.exit = delegate(slaer._router, slaer._router.exit);
slaer.route = delegate(slaer._router, slaer._router.route);
slaer.routes = delegate(slaer._router, slaer._router.routes);
slaer.go = delegate(slaer._router, slaer._router.go);
slaer.execute = delegate(slaer._router, slaer._router.execute);
