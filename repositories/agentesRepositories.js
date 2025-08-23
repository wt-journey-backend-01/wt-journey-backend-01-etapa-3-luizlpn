async function find(query = {}) {
  try {
    const result = await db("agentes").where(query);
    const isSingular = Object.keys(query).length == 1 && "id" in query;

    return isSingular ? result[0] : result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function create(object) {
  try{

    const created = await db("agentes").insert(object, ["*"])

    return created


    }catch (error){

        console.log(error)
        return false

    }
}

async function update(id, fieldsToUpdate) {
   try {
        const updated = await db("agentes").where({id : id}).update(fieldsToUpdate, ["*"])
        if(!updated){
            return false
        }

        return updated[0]
    } catch (error) {
         console.log(error)
        return false
    }
}

async function remove(id) {
try {
    const deleted = await db("agentes").where({id}).del()
    if(!deleted){
        return false
    }
    return true


} catch (error) {
     console.log(error)
        return false
}
}



module.exports = {
  find,
  create,
  update,
  remove
};
