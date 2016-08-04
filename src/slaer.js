// The heart and sole of the entire system.
function SlaerApp(parent, path) {
	this._parent = parent;
	this._children = [];
	this._routes = {};
    this._path = path;
	
	if (parent) {
		this._parent._children.push(this);
	}
};


// The regex pattern used to identify individual path segments.
SlaerApp.SEGMENT_EXTRACTION_PATTERN = /[^\/]+/g;


// Extracts the segment values from the given path.
SlaerApp.extractSegments = function(path) {
    path = path || '';

    var segments = [];

    // We use replace because it gives us a convenient easy pattern for auto-extracting the values.
    path.replace(SlaerApp.SEGMENT_EXTRACTION_PATTERN, function (match) { segments.push(match); });

    return segments;
}

// Defines a new route.
SlaerApp.prototype.route = function(path, handler) {
	var segments = SlaerApp.extractSegments(path);
	
	var route = this;
	
	for (var s in segments) {
		route = route._routes[segments[s]] = route._routes[segments[s]] || {
			_routes: {}
		};
	}
	
	route._handler = handler;
};


// Executes the given path relative to this aplication's path.
SlaerApp.prototype.execute = function(path) {
	var segments = SlaerApp.extractSegments(path);
	
	var route = this;
	
	for (var s in segments) {
		route = route._routes[segments[s]];
		
		if (!route) {
			throw new Error("404: Path '" + path + "' was not found!");
		}
	}
	
	if (typeof route._handler !== 'function') {
		throw new Error("404: Path '" + path + "' was not found!");
	}
	
	route._handler.call();
}


// Navigates to the given path.
SlaerApp.prototype.go = function(path) {
	window.location = '#' + path;
};


// Bootstrap the default application.
var slaer = new SlaerApp();

slaer.defaultPath = '/';

// Check for a browser.
// TODO: Integrate proper module exposure
if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', function() {		
		if (window.location.hash === '#' || window.location.hash === '#/') {
			if (slaer.defaultPath && slaer.defaultPath === '/') {
				slaer.execute(slaer.defaultPath);
			} else {
				slaer.go(slaer.defaultPath);
			}
		} else {
			slaer.execute(window.location.hash.substring(1));
		}
    });

    window.addEventListener('load', function() {
        if (!window.location.hash) {
			if (window.location.pathname === '/') {
				slaer.go(slaer.defaultPath);
			} else {
				slaer.go(window.location.pathname);
			}
        } else {
			if (window.location.hash === '#' || window.location.hash === '#/') {
				slaer.go(slaer.defaultPath);
			} else {
				slaer.execute(window.location.hash.substring(1));
			}
        }
    });
}

// Not a browser so assume NodeJS (for now)
else if (typeof module !== 'undefined' && module.exports) {

	// Include a special reference to the SlaerApp class for testing.
	slaer.__SlaerApp = SlaerApp;

	// Export the module
    module.exports = slaer;
}











/*!
Creates a new slaer app issolation at the given path.
*/
// SlaerApp.prototype.app = function(path) {
    // if (!path || path.trim() === '/') {
        // throw new Error("app path cannot be empty or a root '/'")
    // }

    // return new SlaerApp(this, path);
//};



