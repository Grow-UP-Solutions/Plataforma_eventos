const CodeGenerator = require('node-code-generator');
const randomCoding = () => {
  let arr = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  let idvalue = '';
  let n = 3;

  for (let i = 0; i < n; i++) {
    idvalue += arr[Math.floor(Math.random() * 24)];
  }
  return idvalue;
};

export const generarCodigo = () => {
  const generator = new CodeGenerator();
  const codeLetters = randomCoding();
  const pattern = `U###${codeLetters}#`;
  const howMany = 1;
  const options = { alphanumericsChars: 'ABCDEFGHJKLMNPQRSTUVWXYZ', numericChars: '123456789' };

  const codeGerenate = generator.generateCodes(pattern, howMany, options);
  return codeGerenate[0];
};
