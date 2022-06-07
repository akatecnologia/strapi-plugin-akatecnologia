'use strict';

/**
 *  service.
 */

const fs = require('fs')
const path = require('path');
const archiver = require('archiver');
const spawn = require('child_process').spawn
const { createCoreService } = require('@strapi/strapi').factories;
const backupsPath = `${path.resolve("./")}/private/backups`; 
const AWS = require('aws-sdk');


module.exports = createCoreService('plugin::aka-plugins.aka-backup', ({ strapi }) =>  ({

    doBackupWithCompress: async () => {

        let dumpFileName;
        try {

            dumpFileName = await strapi.plugin('aka-plugins').service('akaBackup').doBackup();
            const fileSizeInBytes = fs.statSync(dumpFileName).size;
            if (fileSizeInBytes === 0){
                fs.unlinkSync(dumpFileName);
                throw Error(`Unable to dump db`); 
            }
            await strapi.plugin('aka-plugins').service('akaBackup').compressFile(dumpFileName);
            fs.unlinkSync(dumpFileName);
            await strapi.plugin('aka-plugins').service('akaBackup')
                .uploadFile(`${path.basename(dumpFileName)}.zip`, `${dumpFileName}.zip`);

        } catch (err) {
            throw Error(`Unable to create zip file. error: ${err.toString()}`);
        }

        return dumpFileName;

    },

    doBackup: async () => {
    
        await strapi.plugin('aka-plugins').service('akaBackup').cleanOldBackups();

        const doBackupPromise = new Promise((resolve, reject) => {

            const dumpFileName = `${backupsPath}/${Math.round(Date.now() / 1000)}.dump.sql`;
            const writeStream = fs.createWriteStream(dumpFileName);
            const connection = strapi.config.database.connection.connection;
            
            const dump = spawn('mysqldump',  [
                '-u', connection.user,
                '-p' + connection.password,
                connection.database
            ]);
    
            dump.stdout
            .pipe(writeStream)
            .on('finish', async function () {
                resolve(dumpFileName);
            })
            .on('error', function (err) {
                console.log("err")
                reject(err)
            });

        });

        return doBackupPromise;
    },  
    
    compressFile: async (filePath) => {

        const compressFilePromise = new Promise((resolve, reject) => {
            
            let fileName = `${path.basename(filePath)}`;
            const output = fs.createWriteStream(`${filePath}.zip`);
            const archive = archiver("zip", {
                zlib: { level: 9 },
            });

            archive.pipe(output);
            archive.file(filePath, { name: fileName });
            archive.finalize();

            output.on('close', resolve);
            output.on('end', resolve);
            archive.on('error', reject);
        });

        return compressFilePromise;

    },

    cleanOldBackups: async () => {
    
        const backuFolder = `${backupsPath}/`; 
    
        let files = fs.readdirSync(backupsPath).sort(function(a, b) {
          return fs.statSync(backuFolder + a).mtime.getTime() - 
                  fs.statSync(backuFolder + b).mtime.getTime();
        });
    
        let fileCountToRemove = files.length - 9;
        if (fileCountToRemove < 1)  
          return;
    
        files.slice(0, fileCountToRemove).forEach(file => {
          let filePath = `${backuFolder}/${file}`;
          fs.unlinkSync(filePath);
        });
    },
    
    uploadFile: async (remoteFileName, filePath, mimeType) => {
        if (!strapi.config.server.s3)
            return;

        const s3 = new AWS.S3({
            accessKeyId: strapi.config.server.s3.accessKeyId,
            secretAccessKey: strapi.config.server.s3.secretAccessKey,
            region: process.env.AWS_REGION
        })
    
        const fileContent = fs.readFileSync(filePath);
    
        let remoteFileFullPath = `${strapi.config.server.s3.backupFolder}/${remoteFileName}`;
    
        const params = {
            Bucket: '01-aka-backups',
            Key: remoteFileFullPath,
            Body: fileContent,
            //ContentType: mimeType//geralmente se acha sozinho
        };
    
        const data = await s3.upload(params).promise();
        return data.Location;
    }
        
}));
