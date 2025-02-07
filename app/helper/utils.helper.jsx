export function keyNumberFloat(event, enterCallback) {
    const key = event.key;
    const isDigit = /\d/.test(key);
    const isDot = key === '.';
    const hasDot = event.target.value.includes('.');
  
    if (!(isDigit || isDot || key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab' || (event.ctrlKey || event.metaKey) && key === 'c' || (event.ctrlKey || event.metaKey) && key === 'v')) {
      event.preventDefault();
    }
  
    if (isDot && hasDot) {
      event.preventDefault();
    }
  
    // Permitir solo un punto al principio del número
    if (event.target.selectionStart === 0 && isDot) {
      event.preventDefault();
    }
  
    // Ejecutar el callback si la tecla presionada es "Enter"
    if (key === "Enter" && typeof enterCallback === "function") {
      enterCallback();
    }
  }

  export function isEmpty(object) {
    if (object === null || typeof object === 'undefined') {
      return true;
    }
  
    if (Array.isArray(object) || object instanceof FileList) {
      return object.length === 0;
    }
  
    if (typeof object === 'string') {
      return object === '';
    }
  
    if (typeof object === 'object') {
      return Object.keys(object).length === 0;
    }
  
    return false;
  }