const { Router } = require("express");
require("../../DB");
const Users = require("../../models/db/Users");
const { getAllUsers, createUsers } = require("../services/users.services");

const router = Router();

router.get("/", async (req, res) => {
  const allUsers = await getAllUsers();
  return res.json(allUsers);
});
router.post("/create", async (req, res) => {
  const user = req.body;
  const userCreate = await createUsers(user);
  return res.json(userCreate)
});

module.exports = router;
