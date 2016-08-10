
// Expose the global namespace.
module.exports = global.slaer = {};


slaer.debug = true;

slaer.log = function() {
	if (slaer.debug === true) {
		console.log.apply(console, Array.prototype.slice.call(arguments));
	}
}


// Import the modules.
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
		doit(window.location.hash.substring(1));
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

