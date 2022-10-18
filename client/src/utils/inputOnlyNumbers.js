export function inputKeyDown(evt) {
  let theEvent = evt;

  if (theEvent.key == 'Backspace') return true;

  // Permitir flecha izquierda
  if (theEvent.key == 'ArrowLeft') return true;

  // Permitir flecha derecha
  if (theEvent.key == 'ArrowRight') return true;

  // Bloquear tecla de espacio
  if (theEvent.key == ' ') return false;

  // Bloquear tecla si no es un numero
  if (isNaN(theEvent.key)) {
    theEvent.preventDefault();
    return false;
  }
}

export function inputKeyUpTel(numeros) {
  if (numeros.target.value.length === 3) {
    numeros.target.value += ' ';
  }

  if (numeros.target.value.length === 7) {
    numeros.target.value += ' ';
  }

  if (numeros.target.value.length === 10) {
    numeros.target.value += ' ';
  }
}

export function inputKeyUpPh(numeros) {
  if (numeros.target.value.length === 3) {
    numeros.target.value += ' ';
  }
}
