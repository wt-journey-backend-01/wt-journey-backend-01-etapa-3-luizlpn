const { v4: uuidv4 } = require("uuid");
const casosRepository = require("../repositories/casosRepository");

function validateStatus(status) {
  return status === "aberto" || status === "solucionado";
}

function getAllCasos(req, res) {
  const casos = casosRepository.find();
  res.status(200).json(casos);
}

function getCasoById(req, res) {
  const { id } = req.params;
  const caso = casosRepository.find(id);

  if (!caso) return res.status(404).json({ message: "caso inexistente" });

  res.status(200).json(caso);
}

function createCaso(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;

  if (!titulo || !descricao || !status || !agente_id) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios!" });
  }
  if (!validateStatus(status)) {
    return res
      .status(400)
      .json({ message: "o status deve ser aberto ou solucionado" });
  }
  const novoCaso = {
    id: uuidv4(),
    titulo,
    descricao,
    status,
    agente_id,
  };

  const casoCriado = casosRepository.create(novoCaso);
  res.status(201).json(casoCriado);
}

function updateCaso(req, res) {
  const { id } = req.params;
  const { titulo, descricao, status, agente_id } = req.body;

  if (!id || !titulo || !descricao || !status || !agente_id) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios!" });
  }

  if (!validateStatus(status)) {
    return res
      .status(400)
      .json({ message: "o status deve ser aberto ou solucionado" });
  }

  const caso = {
    id,
    titulo,
    descricao,
    status,
    agente_id,
  };

  const casoAtualizado = casosRepository.update(caso);
  if (!casoAtualizado) {
    return res.status(404).json({ message: "Caso não encontrado" });
  }
  res.status(200).json(casoAtualizado);
}


function deleteCaso(req, res) {
  const { id } = req.params;

  const casoDeletado = casosRepository.remove(id);
  if (!casoDeletado) {
    return res.status(404).json({ message: "caso inexistente" });
  }
  res.status(204).json(casoDeletado);
}

module.exports = {
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  deleteCaso,
};
