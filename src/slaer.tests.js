var expect = require('chai').expect;
var slaer = require('./slaer');


describe('default slaer route', function() {
    
    it('should have no segments', function() {
        expect(slaer.segments()).to.be.empty;
    });
    it('should have path /', function() {
        expect(slaer.path()).to.equal('/');
    });

});

describe('segment extraction', function() {

    it('handles undefined gracefully', function() {
        expect(slaer.__SlaerApp.extractSegments()).to.be.empty;
    });
    it('handles null gracefully', function() {
        expect(slaer.__SlaerApp.extractSegments(null)).to.be.empty;
    });
    it('handles empty strings gracefully', function() {
        expect(slaer.__SlaerApp.extractSegments('')).to.be.empty;
    });
    it('handles single forward slash gracefully', function() {
        expect(slaer.__SlaerApp.extractSegments('/')).to.be.empty;
    });
    it('handles leading forward slashs gracefully', function() {
        expect(slaer.__SlaerApp.extractSegments('///test')).to.eql(['test']);
    });
    it('handles trailing forward slashs gracefully', function() {
        expect(slaer.__SlaerApp.extractSegments('test///')).to.eql(['test']);
    });
    it('handles multiple segments', function() {
        expect(slaer.__SlaerApp.extractSegments('/test//one/two//3/')).to.eql(['test', 'one', 'two', '3']);
    });

});
