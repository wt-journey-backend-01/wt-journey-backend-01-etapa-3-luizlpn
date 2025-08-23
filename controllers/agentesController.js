const { v4: uuidv4 } = require("uuid");
const agentesRepository = require("../repositories/agentesRepository");

function validateCargo(cargo) {
  return ["inspetor", "delegado", "escriturario", "agente"].includes(cargo);
}

function validateDate(dateString) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

function getAllAgentes(req, res) {
  const agentes = agentesRepository.find();
  res.status(200).json(agentes);
}

function getAgenteById(req, res) {
  const { id } = req.params;
  const agente = agentesRepository.find(id);

  if (!agente) return res.status(404).json({ message: "Agente não encontrado" });

  res.status(200).json(agente);
}

function createAgente(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;

  if (!nome || !dataDeIncorporacao || !cargo) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }
  
  if (!validateDate(dataDeIncorporacao)) {
    return res.status(400).json({ message: "Data de incorporação deve estar no formato YYYY-MM-DD" });
  }

  if (!validateCargo(cargo)) {
    return res.status(400).json({ message: "Cargo inválido" });
  }

  const novoAgente = {
    id: uuidv4(),
    nome,
    dataDeIncorporacao,
    cargo,
  };

  const agenteCriado = agentesRepository.create(novoAgente);
  res.status(201).json(agenteCriado);
}

function updateAgente(req, res) {
  const { id } = req.params;
  const { nome, dataDeIncorporacao, cargo } = req.body;

  if (!nome || !dataDeIncorporacao || !cargo) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }
  
  if (!validateDate(dataDeIncorporacao)) {
    return res.status(400).json({ message: "Data de incorporação deve estar no formato YYYY-MM-DD" });
  }

  if (!validateCargo(cargo)) {
    return res.status(400).json({ message: "Cargo inválido" });
  }

  const agenteAtualizado = agentesRepository.update(id, {
    nome,
    dataDeIncorporacao,
    cargo
  });

  if (!agenteAtualizado) {
    return res.status(404).json({ message: "Agente não encontrado" });
  }

  res.status(200).json(agenteAtualizado);
}

function patchAgente(req, res) {
  const { id } = req.params;
  const updates = req.body;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "Nenhum campo para atualizar!" });
  }

  if (updates.dataDeIncorporacao && !validateDate(updates.dataDeIncorporacao)) {
    return res.status(400).json({ message: "Data de incorporação deve estar no formato YYYY-MM-DD" });
  }

  if (updates.cargo && !validateCargo(updates.cargo)) {
    return res.status(400).json({ message: "Cargo inválido" });
  }
  
  const agenteAtualizado = agentesRepository.patch(id, updates);
  
  if (!agenteAtualizado) {
    return res.status(404).json({ message: "Agente não encontrado" });
  }

  res.status(200).json(agenteAtualizado);
}

function deleteAgente(req, res) {
  const { id } = req.params;
  const success = agentesRepository.remove(id);
  
  if (!success) {
    return res.status(404).json({ message: "Agente não encontrado" });
  }

  res.status(204).end();
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  patchAgente,
  deleteAgente
};