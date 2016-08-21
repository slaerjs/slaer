
// Returns all the regex matches against an input string, as an array.
module.exports.regexMatches =
slaer.regexMatches =
function regexMatches(input, regex) {
  var matches = [],
      re = new RegExp(regex),
      match;
  
  while (match = re.exec(input)) {
    matches.push(match);
  }
  
  return matches;
}

// Returns just the match groups from the regex match.
module.exports.regexMatchGroups =
slaer.regexMatchGroups =
function regexMatchGroups(match) {
  return Array.prototype.slice.call(match, 1);
}

