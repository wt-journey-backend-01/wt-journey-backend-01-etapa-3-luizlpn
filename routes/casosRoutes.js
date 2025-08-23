const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");

// define a rota para /agentes usando o método GET
router.get("/agentes", agentesController.seuMetodo);

router.get("/casos", casosController.getAllCasos);
router.get("/casos/:id", casosController.getCasoById);
router.post("/casos", casosController.createCaso);
router.put("/casos/:id", casosController.updateCaso);
router.patch("/casos/:id", casosController.patchCaso)
router.delete("/casos/:id", casosController.deleteCaso);

module.exports = router;
