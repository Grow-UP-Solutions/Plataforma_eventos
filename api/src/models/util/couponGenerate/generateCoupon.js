const LETRAS = 2;
const NUMEROS = 4;

const generateRandomCoupons = () => {
    const characters = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz";
    let letrasResult = "";
   const numeros = "123456789";
   let numerosResult = "";
   const charactersLength = characters.length;
   const numerosLength = numeros.length;

   for (let i = 0; i < LETRAS; i++) {
      letrasResult += characters.charAt(
         Math.floor(Math.random() * charactersLength)
      );
   }

   for (let i = 0; i < NUMEROS; i++) {
      numerosResult += numeros.charAt(Math.floor(Math.random() * numerosLength));
   }
   return `Z-` + letrasResult  + numerosResult;
};


module.exports = generateRandomCoupons;
