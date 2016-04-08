'use strict';

describe('Service: viewDB', function () {

  // load the service's module
  beforeEach(module('testApp'));

  // instantiate service
  var viewDB;
  beforeEach(inject(function (_viewDB_) {
    viewDB = _viewDB_;
  }));

  it('should do something', function () {
    expect(!!viewDB).toBe(true);
  });

});
