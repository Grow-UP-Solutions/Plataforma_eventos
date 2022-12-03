
function calculoDeComicion(precio) {
   return precio - ((precio * 0.16 )+ (precio * 0.16 * 0.19));
};
let tola= calculoDeComicion(20000)

console.log(tola)