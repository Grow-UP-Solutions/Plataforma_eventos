const { Router } = require('express');
const {
  getCategory,
  createCategory,
  categoryUpdate,
  getAllCategory,
  deleteCategory,
} = require('../services/category.service.js');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allCategory = await getAllCategory();
    return res.json(allCategory);
  } catch (error) {
    return res.status(400).json({ ERROR_CATEGORY: error });
  }
});
router.get('/category', async (req, res) => {
  const { name } = req.query;
  try {
    const allCategory = await getCategory(name);

    return res.json(allCategory);
  } catch (error) {
    return res.status(400).json({ ERROR_CATEGORY: error });
  }
});

router.post('/create', async (req, res) => {
  try {
    const category = req.body;
    const categoryCreat = await createCategory(category);
    return res.json(categoryCreat);
  } catch (error) {
    return res.status(400).json({ ERROR_CATEGORY_CREATE: error });
  }
});
router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params;
    const newCategory = req.body;
    const categoryUpdates = await categoryUpdate(id, newCategory);
    return res.status(200).json(categoryUpdates);
  } catch (error) {
    return res.status(400).json({ ERROR_CATEGORY_UPDATE: error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCategory(id);
    res.json('Eliminado correctamente.');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
