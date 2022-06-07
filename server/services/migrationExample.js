const fs = require('fs');

module.exports = {

    execute: async () => {
        
        const filePath = `${__dirname }/query.sqlfile`; 
        const queries = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});

        for await(const query of queries.split(';')){
            if (query)
                await strapi.db.connection.raw(query);
        } 

    }
}
