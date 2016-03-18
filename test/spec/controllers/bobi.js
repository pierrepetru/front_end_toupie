'use strict';

describe('Controller: BobiCtrl', function () {

  // load the controller's module
  beforeEach(module('testApp'));

  var BobiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BobiCtrl = $controller('BobiCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BobiCtrl.awesomeThings.length).toBe(3);
  });
});
