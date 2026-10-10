import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=new URL('.',import.meta.url).pathname;
const dist=path.join(root,'dist');
const source=fs.readFileSync(path.join(dist,'app.js'),'utf8');
const noop=()=>{};
const dummy={addEventListener:noop,classList:{add:noop,remove:noop},setAttribute:noop};
const doc={querySelector:()=>({...dummy}),querySelectorAll:()=>[],addEventListener:noop};
const sandbox={document:doc,window:{addEventListener:noop},console,setTimeout,clearTimeout,clearInterval,URL,Blob,IntersectionObserver:class{},history:{},location:{pathname:'/'}};
vm.createContext(sandbox);
const executable=source.slice(0,source.indexOf("try{const r=await fetch('/spec.json')"));
vm.runInContext(executable+`\nglobalThis.api={pages,colors,typeTokens,registry,contract,header,body,footer,setPage:p=>currentPage=p,setSpecs:s=>specSections=s};`,sandbox);
const a=sandbox.api;
const primitive=Object.fromEntries(a.colors);
const semantic={
 'bg.canvas':'warm-50','bg.surface':'warm-0','bg.subtle':'warm-100','text.primary':'warm-950','text.secondary':'warm-600','text.muted':'warm-600','text.brand':'orange-700','border.subtle':'warm-200','border.control':'warm-500','action.primary.bg':'orange-500','action.primary.fg':'warm-950','action.selected.bg':'orange-50','action.selected.fg':'orange-700','focus.ring':'warm-950'
};
const tokens={version:'1.0.0',primitive,semantic,inverse:{'bg.canvas':'warm-950','bg.surface':'warm-900','text.primary':'warm-0','text.secondary':'warm-300','focus.ring':'warm-0'},status:{danger:'#B42318',success:'#17643B',warning:'#805500'},typography:a.typeTokens.map(([name,size,lineHeight,weight,usage])=>({name,size,lineHeight,weight,usage})),spacing:[0,4,8,12,16,24,32,48,64,96],radius:[0,4,8,12,16,'full'],elevation:['none','0 2px 8px rgb(23 22 20 / .08)','0 8px 24px rgb(23 22 20 / .12)','0 16px 48px rgb(23 22 20 / .18)'],motion:{instant:0,fast:120,standard:180,slow:240,easing:'cubic-bezier(.2,0,0,1)'},zIndex:{base:0,sticky:100,dropdown:200,modal:300,toast:400,tooltip:500}};
for(const [name,ref]of Object.entries(semantic))if(!primitive[ref])throw Error('Unknown alias '+name);
const fontValue=t=>t.name==='display'?'clamp(2.5rem, 1.5rem + 3vw, 4rem)':t.size;
let css='/* Generated from tokens.json. Do not edit directly. */\n:root {\n'+Object.entries(primitive).map(([k,v])=>`  --hds-color-${k}: ${v};\n  --${k}: var(--hds-color-${k});`).join('\n')+'\n'+Object.entries(semantic).map(([k,v])=>`  --hds-${k.replaceAll('.','-')}: var(--hds-color-${v});`).join('\n')+'\n'+tokens.typography.map(t=>`  --hds-font-${t.name}: ${fontValue(t)};\n  --hds-line-${t.name}: ${t.lineHeight};`).join('\n')+'\n'+tokens.spacing.map(n=>`  --hds-space-${n}: ${n/16}rem;`).join('\n')+'\n'+['none','code','control','card','modal','full'].map((n,i)=>`  --hds-radius-${n}: ${typeof tokens.radius[i]==='number'?tokens.radius[i]/16+'rem':'9999px'};`).join('\n')+'\n'+tokens.elevation.map((v,i)=>`  --hds-elevation-${i}: ${v};`).join('\n')+'\n}\n';
css+='[data-theme="inverse"]{'+Object.entries(tokens.inverse).map(([k,v])=>`--hds-${k.replaceAll('.','-')}:var(--hds-color-${v});`).join('')+'}\n';
fs.writeFileSync(path.join(dist,'tokens.json'),JSON.stringify(tokens,null,2));
fs.writeFileSync(path.join(dist,'tokens.css'),css);
const contracts=a.pages.filter(p=>a.registry[p.title]).map(p=>a.contract(p));
fs.writeFileSync(path.join(dist,'registry.json'),JSON.stringify({version:'1.0.0',components:contracts},null,2));
const schema={$schema:'https://json-schema.org/draft/2020-12/schema',title:'Hudson ScreenBrief',type:'object',additionalProperties:false,required:['schemaVersion','systemVersion','screenId','purpose','audience','primaryAction','secondaryActions','layout','density','theme','contentPriority','requiredStates','dataSource','responsivePolicy','acceptanceCriteria'],properties:{schemaVersion:{const:'1.0.0'},systemVersion:{const:'1.0.0'},screenId:{type:'string',minLength:1},purpose:{type:'string',minLength:1},audience:{type:'array',minItems:1,items:{enum:['designer','developer','ai']}},primaryAction:{type:'object',additionalProperties:false,required:['label','actionId'],properties:{label:{type:'string',minLength:1},actionId:{type:'string',minLength:1}}},secondaryActions:{type:'array',items:{type:'string'}},layout:{enum:['DocsShell','ProductShell','MediaWorkspace']},density:{enum:['comfortable','compact']},theme:{enum:['light','inverse']},contentPriority:{type:'array',minItems:1,items:{type:'string'}},requiredStates:{type:'array',minItems:1,items:{type:'string'}},dataSource:{type:'string',minLength:1},responsivePolicy:{type:'string',minLength:1},acceptanceCriteria:{type:'array',minItems:1,items:{type:'string'}}}};
fs.writeFileSync(path.join(dist,'screen-brief.schema.json'),JSON.stringify(schema,null,2));
const index=fs.readFileSync(path.join(dist,'index.html'),'utf8');
for(const p of a.pages){const dir=path.join(dist,p.path);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),index.replace('<title>Typography — Hudson AI Design System</title>',`<title>${p.title} — Hudson AI Design System</title>`));}
fs.writeFileSync(path.join(dist,'404.html'),index);
a.setSpecs(JSON.parse(fs.readFileSync(path.join(dist,'spec.json'),'utf8')));
const out=[];
for(const p of a.pages){a.setPage(p);const html=a.header(p)+a.body(p)+a.footer(p);if(!html.includes('<h1'))throw Error('Missing h1 '+p.path);out.push({path:p.path,title:p.title,html});}
// Render validation stays in memory; no machine-specific output path.
console.log(`Generated ${a.pages.length} direct routes, ${contracts.length} component contracts, tokens and JSON Schema. All page render functions passed.`);
