
// Expose the global namespace.
module.exports = global.slaer = {};

// Set to true to enable some diagnostic debugging information to be outputed to the console.
// Development package only, doesn't work on the minified production releases.
slaer.debug = true;

// Wrapper for the standard console.log calls.
slaer.log = function() {
	if (slaer.debug === true) {
		console.log.apply(console, Array.prototype.slice.call(arguments));
	}
}


// Import the modules.
require('./utils/delegate');
require('./utils/regex');
require('./constraints')
require('./segments')
require('./routes')


slaer.defaultPath = '/';


function doit(path) {
	if (path === '' || (path === '/' && path !== slaer.defaultPath)) {
		return slaer.go(slaer.defaultPath);
	}
	
	slaer.go(path);
}


// Check for a browser.
if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', function() {
		slaer.execute(window.location.hash.substring(1));
    });

    window.addEventListener('load', function() {
		if (window.location.hash !== '') {
			doit(window.location.hash.substring(1));
		}
		
		else {
			doit(window.location.pathname);
		}
    });
}

