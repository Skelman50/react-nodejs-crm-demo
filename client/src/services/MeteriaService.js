import M from '../../node_modules/materialize-css/dist/js/materialize';

class MaterialService {
  toast(message) {
    return M.toast({ html: message });
  }

  floatingInit(elementInit) {
    M.FloatingActionButton.init(elementInit);
  }

  updateInput(element) {
    M.updateTextFields(element);
  }

  modalInit(elementInit) {
    return M.Modal.init(elementInit);
  }

  targetInit(elementInit) {
    return M.TapTarget.init(elementInit);
  }

  toolTipInit(elementInit) {
    return M.Tooltip.init(elementInit);
  }

  datePickeInit(elementInit, options) {
    return M.Datepicker.init(elementInit, options);
  }
}

export default MaterialService;
