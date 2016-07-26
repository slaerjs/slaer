/*!
The heart and sole of the entire system.
*/
function SlaerApp(parent, path) {
    this._parent = parent;
    this._segments = SlaerApp.extractSegments(path);
};

/*!
The regex pattern used to identify individual path segments.
*/
SlaerApp.SEGMENT_EXTRACTION_PATTERN = /[^\/]+/g;

/*!
Extracts the segment values from the given path.
*/
SlaerApp.extractSegments = function(path) {
    path = path || '';

    var segments = [];

    // We only use replace because it gives us a convenient pattern for auto-looping the values.
    path.replace(SlaerApp.SEGMENT_EXTRACTION_PATTERN, function (match) { segments.push(match); });

    return segments;
}

/*!
Creates a new slaer app issolation at the given path.
*/
SlaerApp.prototype.app = function(path) {
    return new SlaerApp(this, path);
};

/*!
Returns the application path segments. 
*/ 
SlaerApp.prototype.segments = function() {
    return this._parent ? this._parent.segments() + this._segments : this._segments; 
};

/*!
Returns the application path.
*/
SlaerApp.prototype.path = function() {
    return '/' + this.segments().join('/');
};

/*!
Executes the given path relative to this aplication's path.
*/
SlaerApp.prototype.execute = function(path) {
    console.log("executing:", path, SlaerApp.extractSegments(path));
}


// Bootstrap the root application.
var slaer = new SlaerApp();

// Include a reference to the SlaerApp class for testing.
slaer.__SlaerApp = SlaerApp;

if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', function() {
        slaer.execute(window.location.hash.substring(1));
    });

    window.addEventListener('load', function() {
        if (!window.location.hash) {
            window.location = '#' + window.location.pathname;
        } else {
            slaer.execute(window.location.hash.substring(1));
        }
    });
}

else if (typeof module !== 'undefined' && module.exports) {
    module.exports = slaer;
}
