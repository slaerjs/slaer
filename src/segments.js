
function regexMatches(input, regex) {
  var matches = [],
      re = new RegExp(regex),
      match;
  
  while (match = re.exec(input)) {
    matches.push(match);
  }
  
  return matches;
}

function regexMatchGroups(match) {
  return Array.prototype.slice.call(match, 1);
}


function Segment(segment) {
  this.segment = segment;
  this.pattern = new RegExp(segment.replace(Segment.PARAMETER_EXTRACTION_PATTERN, "(\\w+)"));
  this.params = Segment.extractParameters(segment);
}

Segment.PARAMETER_EXTRACTION_PATTERN = /\{(\w+)(?:\:(\w+))?\}/g;

Segment.extractParameters = function(segment) {
  var matches = regexMatches(segment, Segment.PARAMETER_EXTRACTION_PATTERN);
  
  var params = [];
  
  for (var m in matches) {
    var match = matches[m];
    
    var name = match[1];
    var constraint = match[2] || "default";
    
    params.push({
      name: name,
      constraint: slaer._constraints[constraint]
    });
  }
  
  return params;
};

Segment.prototype.satisfies = function(segment, routeParams) {
  slaer.log('satisfies?', segment);
  
  var match = this.pattern.exec(segment);
  
  if (!match) {
    return false;
  }
  
  var params = regexMatchGroups(match);
  
  slaer.log(params);
  
  if (params.length !== this.params.length) {
    return false;
  }
  
  for (var i in params) {
    slaer.log('checking', params[i], 'against', this.params[i]);
    
    if (!this.params[i].constraint(params[i])) {
      return false;
    }
  }
  
  // Copy the parameters for the route.
  for (var i in params) {
	routeParams.push(params[i]);
  }
  
  return true;
}

// Export the module.
module.exports = slaer.Segment = Segment;

