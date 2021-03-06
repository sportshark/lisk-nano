/**
 * This service uses mdDialog to show a modal containing the set second passphrase form
 *
 * @module app
 * @submodule setSecondPassFactory
 * @todo Should be replaced by a general dialog service
 */
const setSecondPassConstructor = function ($mdDialog) {
  this.ok = () => {
    $mdDialog.hide();
  };

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.show = () => {
    $mdDialog.show({
      template: require('./secondPass.pug')(),
      bindToController: true,
      locals: {
        ok: this.ok,
        cancel: this.cancel,
      },
      controller: () => {},
      controllerAs: 'md',
    });
  };

  return this;
};

app.factory('setSecondPass', setSecondPassConstructor);
