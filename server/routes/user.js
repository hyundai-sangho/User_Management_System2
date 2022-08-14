const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 사용자 등록, 찾기, 갱신, 삭제
router.get("/", userController.view);
router.post("/", userController.find);
router.get("/addUser", userController.form);
router.post("/addUser", userController.create);
router.get("/editUser/:id", userController.edit);
router.post("/editUser/:id", userController.update);
router.get("/viewUser/:id", userController.viewAll);
router.get("/:id", userController.delete);

module.exports = router;
