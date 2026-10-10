import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const target=new URL('../dist/assets/PretendardVariable.woff2',import.meta.url);
const expected='9599f12fd42fc0bce1cd50b47a0c022e108d7aa64dd0d1bb0ed44f3282d900b4';
const hash=data=>createHash('sha256').update(data).digest('hex');
try{if(hash(await readFile(target))===expected){console.log('Pretendard font ready.');process.exit(0);}}catch{}
const response=await fetch('https://raw.githubusercontent.com/orioncactus/pretendard/main/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',{signal:AbortSignal.timeout(60000)});
if(!response.ok)throw Error('Font download failed: '+response.status);
const data=Buffer.from(await response.arrayBuffer());
if(hash(data)!==expected)throw Error('Upstream font changed. Review version and license before updating the expected hash.');
await mkdir(new URL('../dist/assets/',import.meta.url),{recursive:true});
await writeFile(target,data);
console.log('Self-hosted Pretendard installed and SHA-256 verified.');
