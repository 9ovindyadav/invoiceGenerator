const axios = require('axios');

async function getData(url){
    try{
        const response = await axios.get(url);
        return response.data;
    }catch(error){
        return error;
    }
}

module.exports = getData;