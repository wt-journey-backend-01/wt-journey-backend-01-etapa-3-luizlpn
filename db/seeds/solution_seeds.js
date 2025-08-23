/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  await knex('casos').del()
  await knex('agentes').del()

  const agentesInseridos = await knex('agentes').insert([
  {
    
    nome: 'Carlos',
    dataDeIncorporacao: '2021-05-24',
    cargo: 'Detetive'
  },
  {
    
    nome: 'Marcela',
    dataDeIncorporacao: '2013-08-15',
    cargo: 'Investigadora'
  },
  
  ]).returning('id');

   await knex('casos').insert([
    {
      titulo: 'Caso do Roubo na Joalheria',
      descricao: 'Roubo ocorrido na joalheria central na madrugada de ontem',
      status: 'aberto',
      agente_id: agentesInseridos[0].id
    },
    {
      titulo: 'Investigação de Fraude Bancária',
      descricao: 'Sistema bancário comprometido com transferências suspeitas',
      status: 'solucionado',
      agente_id: agentesInseridos[1].id
    }
  ])
};
