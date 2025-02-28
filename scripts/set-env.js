import { copyFileSync } from 'fs';

const args = process.argv.slice(2);
const envFile = args.includes('--prod') ? '.env.prod' : '.env.dev';

copyFileSync(envFile, '.env');
console.log(`✅ Archivo de entorno configurado: ${envFile}`);
