const { client } = require('../../../db/connection');

const authIps = async (request, response) => {

    const {name} = request.params;  
    const result = await client.query('SELECT * authorized_ips WHERE name = $1', [name]);
    console.log('result authorized_ips', result)
    return result;
}

const authKeys = async (request, response) => {

    const {name} = request.params;  
    const result = await client.query('SELECT * authorized_keys WHERE name = $1', [name]);
    console.log('result authorized_keys', result)
    return result;
}

const authUser = async (request, response) => {

    const {name} = request.params;  
    const result = await client.query('SELECT * authorized_keys WHERE name = $1', [name]);
    console.log('result authorized_keys', result)
    return result;
}

module.exports = {
    authUser,
    authIps,
    authKeys
  }