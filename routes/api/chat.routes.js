const router = require("express").Router();

const chatController = require("../../controllers/chat.controller");

// Matches with "/api/chat"
router.get("/", chatController.getAll); // no args passed in
router.get("/rooms", chatController.getAllRoom);
router.get("/:id", chatController.getByRoomId); // args passed in req.params.id
// router.delete("/:id", bookController.del); // args passed in req.params.id
// router.put("/", bookController.update); // args passed in req.body
router.post("/", chatController.post); // args passed in req.body
router.post("/login", chatController.login);
router.post("/message", chatController.postMessage);

module.exports = router;
