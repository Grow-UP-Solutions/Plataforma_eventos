require('../../../DB');
const { getUser } = require('../../../routes/services/users.services');
const CodeDiscountModel = require('../../DB/CodeDiscount');
const formatDate = require('../helpers/formatDate');

const createCodeDiscount = async (data) => {
  try {
    const user = await getUser(data.idCreator);
    user.availableCredit = user.availableCredit - data.value;
    await user.save();
    const newCodeDiscount = new CodeDiscountModel(data);
    return await newCodeDiscount.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllCodeDiscount = async () => {
  try {
    return await CodeDiscountModel.find().lean();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCodeDiscountById = async (id) => {
  try {
    const codeDiscount = await CodeDiscountModel.findById(id).lean();
    if (!codeDiscount) throw new Error('No existe el código de descuento.');
    return codeDiscount;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getListCodeDiscountByCreator = async (id) => {
  try {
    const listCodeDiscount = await CodeDiscountModel.find({ idCreator: id });
    if (!listCodeDiscount) throw new Error('Este usuario no tiene códigos creados.');
    return listCodeDiscount;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCodeDiscountByCode = async (code) => {
  try {
    const codeDiscount = await CodeDiscountModel.find({ code });
    if (!codeDiscount) throw new Error('No existe el código de descuento.');
    return codeDiscount;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCodeDiscount = async (id, value, percentage, quotas) => {
  try {
    const codeDiscount = await CodeDiscountModel.findById(id);
    const userCodeDiscount = await getUser(codeDiscount.idCreator);

    if (value > userCodeDiscount.availableCredit) throw new Error('No tienes suficiente saldo');
    if (value === 0 || value < 0) throw new Error('Valor invalido');

    let auxValue = 0;
    if (value > codeDiscount.value) {
      auxValue = value - codeDiscount.value;
      userCodeDiscount.availableCredit = userCodeDiscount.availableCredit - auxValue;
    } else if (value < codeDiscount.value) {
      auxValue = codeDiscount.value - value;
      userCodeDiscount.availableCredit = userCodeDiscount.availableCredit + auxValue;
    }

    codeDiscount.value = value;
    codeDiscount.percentage = percentage;
    codeDiscount.quotas = quotas;

    await codeDiscount.save();
    await userCodeDiscount.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCodeDiscountById = async (id) => {
  try {
    const codeDiscount = await CodeDiscountModel.findById(id);

    if (codeDiscount.isRedimeed) throw new Error('Este código ya ha sido utilizado.');

    const codeDiscountDeleted = await CodeDiscountModel.findByIdAndDelete(id);
    const userCreateCodeDiscount = await getUser(codeDiscountDeleted.idCreator);
    userCreateCodeDiscount.availableCredit = userCreateCodeDiscount.availableCredit + codeDiscountDeleted.value;
    await userCreateCodeDiscount.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const redimeedCodeDiscount = async (idCode, idUser) => {
  try {
    const codeDiscount = await CodeDiscountModel.findById(idCode);

    if (codeDiscount.isRedimeed) throw new Error('Este codigo ya ha sido redimido.');

    const user = await getUser(idUser);
    codeDiscount.dateRedimeed = formatDate(new Date());
    codeDiscount.userRedimeed = user.nickname;
    codeDiscount.isRedimeed = true;
    await codeDiscount.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllCodeDiscount,
  createCodeDiscount,
  getCodeDiscountById,
  updateCodeDiscount,
  deleteCodeDiscountById,
  getListCodeDiscountByCreator,
  redimeedCodeDiscount,
  getCodeDiscountByCode,
};
