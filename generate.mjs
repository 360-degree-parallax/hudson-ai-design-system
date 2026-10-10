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
vm.runInContext(executable+`\nglobalThis.api={hubs,hubPage,colorRatio,pages,colors,typeTokens,registry,guides,contract,briefSchema,defaultBrief,validateSchema,componentCode,header,body,footer,setPage:p=>currentPage=p,setSpecs:s=>specSections=s};`,sandbox);
const a=sandbox.api;
const primitive=Object.fromEntries(a.colors);
const semantic={
 'bg.canvas':'warm-50','bg.surface':'warm-0','bg.subtle':'warm-100','bg.inverse':'warm-950','text.primary':'warm-950','text.secondary':'warm-600','text.muted':'warm-600','text.inverse':'warm-0','text.brand':'orange-700','border.subtle':'warm-200','border.control':'warm-500','field.bg':'warm-100','field.border':'warm-200','field.border.hover':'warm-300','action.primary.bg':'orange-500','action.primary.hover':'orange-600','action.primary.pressed':'orange-700','action.primary.fg':'warm-950','action.primary.pressed.fg':'warm-0','action.selected.bg':'orange-100','action.selected.fg':'orange-700','focus.ring':'warm-950'
};
const semanticDark={
 'bg.canvas':'warm-950','bg.surface':'warm-900','bg.subtle':'warm-800','bg.inverse':'warm-100','text.primary':'warm-50','text.secondary':'warm-300','text.muted':'warm-300','text.inverse':'warm-950','text.brand':'orange-400','border.subtle':'warm-700','border.control':'warm-500','field.bg':'warm-800','field.border':'warm-700','field.border.hover':'warm-600','action.primary.hover':'orange-400','action.primary.pressed':'orange-300','action.primary.pressed.fg':'warm-950','action.selected.bg':'orange-900','action.selected.fg':'orange-300','focus.ring':'warm-50'
};
const statusLight={fg:{danger:'orange-700',success:'warm-950',warning:'orange-800'},surface:{danger:'orange-100',success:'warm-0',warning:'orange-50'},border:{danger:'orange-500',success:'warm-700',warning:'orange-200'}};
const statusDark={fg:{danger:'orange-400',success:'warm-50',warning:'orange-300'},surface:{danger:'orange-900',success:'warm-900',warning:'orange-900'},border:{danger:'orange-500',success:'warm-300',warning:'orange-700'}};
const elevationDark=['none','0 2px 8px rgb(0 0 0 / .32)','0 8px 24px rgb(0 0 0 / .44)','0 16px 48px rgb(0 0 0 / .6)'];
const tokens={version:'1.0.0',primitive,semantic,inverse:{'bg.canvas':'warm-950','bg.surface':'warm-900','text.primary':'warm-0','text.secondary':'warm-300','focus.ring':'warm-0'},status:statusLight.fg,statusSurface:statusLight.surface,statusBorder:statusLight.border,themes:{dark:{semantic:semanticDark,status:statusDark.fg,statusSurface:statusDark.surface,statusBorder:statusDark.border,elevation:elevationDark}},typography:a.typeTokens.map(([name,size,lineHeight,weight,usage])=>({name,size,lineHeight,weight,usage})),spacing:[0,4,8,12,16,24,32,48,64,96],radius:[0,4,8,12,16,'full'],elevation:['none','0 2px 8px rgb(23 22 20 / .08)','0 8px 24px rgb(23 22 20 / .12)','0 16px 48px rgb(23 22 20 / .18)'],motion:{instant:0,fast:120,standard:180,slow:240,easing:'cubic-bezier(.2,0,0,1)'},zIndex:{base:0,sticky:100,dropdown:200,modal:300,toast:400,tooltip:500},colorRatio:a.colorRatio.map(({role,share,tokens,use})=>({role,share,tokens,use}))};
for(const [name,ref]of Object.entries({...semantic,...semanticDark}))if(!primitive[ref])throw Error('Unknown alias '+name);
const fontValue=t=>t.name==='display'?'clamp(2.5rem, 1.5rem + 3vw, 4rem)':t.size;
let css='/* Generated from tokens.json. Do not edit directly. */\n:root {\n'+Object.entries(primitive).map(([k,v])=>`  --hds-color-${k}: ${v};\n  --${k}: var(--hds-color-${k});`).join('\n')+'\n'+Object.entries(semantic).map(([k,v])=>`  --hds-${k.replaceAll('.','-')}: var(--hds-color-${v});`).join('\n')+'\n'+tokens.typography.map(t=>`  --hds-font-${t.name}: ${fontValue(t)};\n  --hds-line-${t.name}: ${t.lineHeight};`).join('\n')+'\n'+tokens.spacing.map(n=>`  --hds-space-${n}: ${n/16}rem;`).join('\n')+'\n'+['none','code','control','card','modal','full'].map((n,i)=>`  --hds-radius-${n}: ${typeof tokens.radius[i]==='number'?tokens.radius[i]/16+'rem':'9999px'};`).join('\n')+'\n'+tokens.elevation.map((v,i)=>`  --hds-elevation-${i}: ${v};`).join('\n')+'\n'+Object.keys(tokens.status).map(k=>`  --hds-status-${k}: var(--hds-color-${tokens.status[k]});\n  --hds-status-${k}-surface: var(--hds-color-${tokens.statusSurface[k]});\n  --hds-status-${k}-border: var(--hds-color-${tokens.statusBorder[k]});`).join('\n')+'\n}\n';
{const D=tokens.themes.dark;css+='[data-theme="dark"]{color-scheme:dark;'+Object.entries(D.semantic).map(([k,v])=>`--hds-${k.replaceAll('.','-')}:var(--hds-color-${v});`).join('')+Object.keys(D.status).map(k=>`--hds-status-${k}:var(--hds-color-${D.status[k]});--hds-status-${k}-surface:var(--hds-color-${D.statusSurface[k]});--hds-status-${k}-border:var(--hds-color-${D.statusBorder[k]});`).join('')+D.elevation.map((v,i)=>`--hds-elevation-${i}:${v};`).join('')+'}\n';}
css+='[data-theme="inverse"]{'+Object.entries(tokens.inverse).map(([k,v])=>`--hds-${k.replaceAll('.','-')}:var(--hds-color-${v});`).join('')+'}\n';
fs.writeFileSync(path.join(dist,'tokens.json'),JSON.stringify(tokens,null,2));
fs.writeFileSync(path.join(dist,'tokens.css'),css);
const contracts=a.pages.filter(p=>a.registry[p.title]).map(p=>a.contract(p));
fs.writeFileSync(path.join(dist,'registry.json'),JSON.stringify({version:'1.0.0',components:contracts},null,2));
const schema=a.briefSchema;
fs.writeFileSync(path.join(dist,'screen-brief.schema.json'),JSON.stringify(schema,null,2));
const index=fs.readFileSync(path.join(dist,'index.html'),'utf8');
for(const p of [...a.pages,...a.hubs.map(h=>({path:h.path,title:h.label}))]){const dir=path.join(dist,p.path);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),index.replace('<title>Overview — Hudson AI Design System</title>',`<title>${p.title} — Hudson AI Design System</title>`));}
fs.writeFileSync(path.join(dist,'404.html'),index);
a.setSpecs(JSON.parse(fs.readFileSync(path.join(dist,'spec.json'),'utf8')));
const out=[];
for(const p of a.pages){a.setPage(p);const html=a.header(p)+a.body(p)+a.footer(p);if(!html.includes('<h1'))throw Error('Missing h1 '+p.path);out.push({path:p.path,title:p.title,html});}

// --- 품질 검사: 실패하면 빌드를 멈춥니다 ---
const fail=m=>{throw Error('[check] '+m);};
for(const f of ['useWhen','avoidWhen','tokenBindings','keyboardBehavior']){const seen=new Map();for(const c of contracts){const k=JSON.stringify(c[f]);if(seen.has(k))fail(`${c.id}와 ${seen.get(k)}의 ${f}가 같아요. 컴포넌트별로 작성하세요.`);seen.set(k,c.id);}}
const tokenNames=new Set([...Object.keys(semantic),...Object.keys(tokens.inverse).map(k=>'inverse.'+k),...Object.keys(tokens.status).flatMap(k=>['status.'+k,`status.${k}.surface`,`status.${k}.border`]),...[0,1,2,3].map(i=>'elevation.'+i),...['none','code','control','card','modal','full'].map(n=>'radius.'+n)]);
for(const c of contracts){for(const [k,v]of Object.entries(c.tokenBindings))if(!tokenNames.has(v))fail(`${c.id}.tokenBindings.${k}: 알 수 없는 토큰 ${v}`);for(const alt of c.alternatives)if(!alt.path)fail(`${c.id}의 대안 ${alt.id} 문서가 없어요.`);if(!c.code)fail(`${c.id}에 코드 예제가 없어요.`);if(/data-demo|id="[A-Za-z]*Demo"|데모/.test(c.code))fail(`${c.id} 코드 예제에 데모 전용 마크업이 남아 있어요.`);}
const briefErrors=a.validateSchema(schema,a.defaultBrief);if(briefErrors.length)fail('기본 ScreenBrief가 스키마를 통과하지 못했어요: '+briefErrors.join(' / '));

// --- 색 검사: 대비(WCAG)와 오렌지 램프 색상각 ---
const lin=c=>{c/=255;return c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4;};const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const L=h=>{const [r,g,b]=rgb(h).map(lin);return 0.2126*r+0.7152*g+0.0722*b;};const cr=(a,b)=>{const [x,y]=[L(a),L(b)].sort((m,n)=>m-n);return (y+0.05)/(x+0.05);};
const hue=h=>{const [r,g,b]=rgb(h).map(lin);const l=Math.cbrt(0.4122214708*r+0.5363325363*g+0.0514459929*b),m=Math.cbrt(0.2119034982*r+0.6806995451*g+0.1073969566*b),q=Math.cbrt(0.0883024619*r+0.2817188376*g+0.6299787005*b);const A=1.9779984951*l-2.4285922050*m+0.4505937099*q,B=0.0259040371*l+0.7827717662*m-0.8086757660*q;return (Math.atan2(B,A)*180/Math.PI+360)%360;};
const resolve=(theme,k)=>{const m=k.match(/^status\.(danger|success|warning)(\.surface|\.border)?$/);if(m){const T=theme==='dark'?tokens.themes.dark:tokens;const set=m[2]==='.surface'?T.statusSurface:m[2]==='.border'?T.statusBorder:T.status;return primitive[set[m[1]]];}return primitive[(theme==='dark'&&semanticDark[k])||semantic[k]];};
const pairs=[['text.primary','bg.canvas'],['text.primary','bg.surface'],['text.primary','bg.subtle'],['text.secondary','bg.canvas'],['text.secondary','bg.surface'],['text.secondary','bg.subtle'],['text.primary','field.bg'],['text.secondary','field.bg'],['text.brand','bg.surface'],['text.brand','bg.canvas'],['text.brand','bg.subtle'],['action.primary.fg','action.primary.bg'],['action.primary.fg','action.primary.hover'],['action.primary.pressed.fg','action.primary.pressed'],['action.selected.fg','action.selected.bg'],['text.inverse','bg.inverse'],['text.primary','action.selected.bg']];
for(const s of ['danger','success','warning'])pairs.push([`status.${s}`,`status.${s}.surface`],['text.secondary',`status.${s}.surface`],[`status.${s}`,'bg.surface'],[`status.${s}`,'bg.canvas']);
for(const theme of ['light','dark'])for(const [fg,bg] of pairs){const r=cr(resolve(theme,fg),resolve(theme,bg));if(r<4.5)fail(`대비 부족 [${theme}] ${fg} on ${bg} = ${r.toFixed(2)} (< 4.5)`);}
const brandPair=cr(primitive['warm-950'],primitive['orange-500']);if(brandPair<4.5)fail('primary 글자 대비 부족');
for(const set of [tokens.status,tokens.statusSurface,tokens.statusBorder,tokens.themes.dark.status,tokens.themes.dark.statusSurface,tokens.themes.dark.statusBorder])for(const [k,v] of Object.entries(set))if(!/^(orange|warm)-\d+$/.test(v)||!primitive[v])fail(`상태 색 ${k}는 팔레트(orange·warm)에서만 가져올 수 있어요: ${v}`);
const ramp=['500','600','700','800','900'].map(k=>hue(primitive['orange-'+k]));for(let i=1;i<ramp.length;i++)if(ramp[i]+0.5<ramp[i-1])fail(`오렌지 램프가 어두워질수록 빨강 쪽으로 돌아가요: orange-${['500','600','700','800','900'][i]} 색상각 ${ramp[i].toFixed(1)}°`);
const ratioSum=a.colorRatio.reduce((n,r)=>n+r.share,0);if(ratioSum!==100)fail('colorRatio 합계가 100이 아니에요: '+ratioSum);for(const r of a.colorRatio)for(const t of [r.swatch,...r.tokens])if(!primitive[t])fail(`colorRatio ${r.role}: 알 수 없는 토큰 ${t}`);
for(const h of a.hubs){const html=a.hubPage(h);if(!html.includes('<h1'))fail('허브 페이지에 h1이 없어요: '+h.path);if(!a.pages.some(p=>p.group===h.group))fail('빈 허브: '+h.path);for(const t of Object.values(h.cats??{}).flat())if(!a.pages.some(p=>p.title===t&&p.group===h.group))fail(`${h.path} 분류에 없는 문서: ${t}`);const inCats=new Set(Object.values(h.cats??{}).flat());if(h.cats)for(const p of a.pages.filter(p=>p.group===h.group))if(!inCats.has(p.title))fail(`${h.path}: ${p.title}가 어느 분류에도 없어요.`);}
const siteCss=fs.readFileSync(path.join(dist,'style.css'),'utf8');const hex=siteCss.match(/#[0-9a-fA-F]{3,8}\b/g);if(hex)fail('style.css에 HEX가 있어요: '+hex.join(', ')+'. tokens.css 변수를 쓰세요.');
// Render validation stays in memory; no machine-specific output path.
console.log(`Generated ${a.pages.length+a.hubs.length} direct routes (${a.hubs.length} hubs), ${contracts.length} component contracts, tokens and JSON Schema. All page render functions and quality checks passed.`);
