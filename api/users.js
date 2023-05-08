const UserController = require("../controller/users");
const express = require("express");
const router = express.Router();

router.get("/all", UserController.findAllUsers);
router.get("/geousers", UserController.findAllGeoUser);
router.get("/:id", UserController.findById);
router.post("/add", UserController.addUser);
router.post("/updateUserLocation", UserController.updateUserLocation);
router.get('/byusermanagername/:manager_name', UserController.findBymanagerName);
router.delete("/delete", UserController.deleteUser);

module.exports = router;
