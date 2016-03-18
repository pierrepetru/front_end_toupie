'use strict';

describe('Controller: FormulaireCtrl', function () {

  // load the controller's module
  beforeEach(module('testApp'));

  var FormulaireCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormulaireCtrl = $controller('FormulaireCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FormulaireCtrl.awesomeThings.length).toBe(3);
  });
});
