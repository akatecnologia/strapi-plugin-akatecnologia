# 🚀 Getting started with Strapi with AKA

## AKA Plugin
- yarn add ou npm install strapi-plugin-akatecnologia/
- Adicionar "private/backups/*" em .gitignore;
- Adicionar "watchIgnoreFiles: ['****/private/backups/****']" em "config/admin.js";
- Criar AWS IAM Policy se baseando em <Cliente>-Backup-Policy;
- Criar AWS IAM User associando a Policy Acima e salvar Access Key e Secret;
- Adicionar s3: { 
    accessKeyId: <accessKey>,
    secretAccessKey: <secretKey>,
    backupFolder:<backupFolder> 
  } em "config/server.js";
- Adicionar "await strapi.plugin('strapi-plugin-akatecnologia').service('aka-backup').doBackupWithCompress()" ao cron.