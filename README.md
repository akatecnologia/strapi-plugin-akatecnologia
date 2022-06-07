# 🚀 Getting started with Strapi with AKA

## AKA Plugin
- Adicionar "private/backups/*" em .gitignore;
- Adicionar "watchIgnoreFiles: ['**/private/backups/**']" em "config/admin.js";
- Copiar "aka-plugins" para "./src/plugins";
- Adicionar dependency em package.json: "aka-plugins": "file:./src/plugins/aka-plugins";
- Criar AWS IAM Policy se baseando em <Cliente>-Backup-Policy;
- Criar AWS IAM User associando a Policy Acima e salvar Access Key e Secret;
- Adicionar s3: { 
    accessKeyId: <accessKey>,
    secretAccessKey: <secretKey>,
    backupFolder:<backupFolder> 
  } em "config/server.js";
- Adicionar "await strapi.plugin('aka-plugins').service('aka-backup').doBackupWithCompress()" ao cron.
