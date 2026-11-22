import{readdirSync as R,readFileSync as F,writeFileSync as W,mkdirSync as M}from"node:fs";
import{join as J}from"node:path";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output",X=[0,0,-1,1],Y=[-1,1,0,0],C="udlr",V=[1,0,3,2];
function S(t){let r=t.split("\n").filter(s=>s),w=Math.max(...r.map(s=>s.length)),h=r.length,wa=new Array(w*h).fill(0),gl=new Array(w*h).fill(0),bx=[],pl=0;
r.forEach((s,y)=>{for(let x=0;x<w;x++){let c=s[x]||"#",n=y*w+x;wa[n]=c=="#";if(c=="."||c=="*"||c=="+")gl[n]=1;if(c=="$"||c=="*")bx.push(n);if(c=="@"||c=="+")pl=n}});bx.sort((a,b)=>a-b);
function wk(bl,a,b){if(a==b)return"";let pr=new Array(wa.length).fill(-2),ch=new Array(wa.length),q=[a],o=0;pr[a]=-1;
while(o<q.length){let c=q[o++],x=c%w,y=c/w|0;
for(let d=0;d<4;d++){let nx=x+X[d],ny=y+Y[d];if(nx<0||ny<0||nx>=w)continue;let n=ny*w+nx;
if(n>=wa.length||wa[n]||bl.has(n)||pr[n]!=-2)continue;pr[n]=c;ch[n]=C[d];
if(n==b){let s="",k=n;while(k!=a){s=ch[k]+s;k=pr[k]}return s}q.push(n)}}return null}
function rm(){let hr=pl/w|0,se=new Set,rs=[];
for(let y=0;y<h;y++){if(y==hr)continue;for(let x=0;x<w;x++){let i=y*w+x;
if(wa[i]||se.has(i))continue;let co=[],q=[i];se.add(i);
while(q.length){let c=q.pop();co.push(c);let cx=c%w,cy=c/w|0;
for(let d=0;d<4;d++){let nx=cx+X[d],ny=cy+Y[d];if(nx<0||ny<0||nx>=w||ny>=h)continue;let n=ny*w+nx;
if(wa[n]||ny==hr||se.has(n))continue;se.add(n);q.push(n)}}
let rb=bx.filter(z=>co.includes(z)),rg=co.filter(z=>gl[z]),dr=-1,en=-1;
for(let c of co){let cx=c%w,cy=c/w|0;
for(let d=0;d<4;d++){let nx=cx+X[d],ny=cy+Y[d];
if(ny==hr&&nx>=0&&nx<w&&!wa[ny*w+nx]){dr=c;en=ny*w+nx;break}}if(dr>=0)break}
if(dr<0)continue;rs.push({ce:co,bx:rb,gl:rg,dr,en})}}return rs}
function sr(rm2){let lo=[...rm2.ce,rm2.en],m=lo.length,of=new Map(lo.map((x,i)=>[x,i])),n=rm2.ce.length,en=m-1;
let nb=[];for(let i=0;i<m;i++){let x=lo[i]%w,y=lo[i]/w|0,z=[];
for(let d=0;d<4;d++){let nx=x+X[d],ny=y+Y[d],v=-1;
if(nx>=0&&ny>=0&&nx<w&&ny<h&&!wa[ny*w+nx])v=of.get(ny*w+nx)??-1;z.push(v)}nb.push(z)}
let g2=lo.map(x=>gl[x]),li=new Array(m).fill(0),q=[];for(let c=0;c<m;c++)if(g2[c]){li[c]=1;q.push(c)}
let o=0;while(o<q.length){let t=q[o++];for(let d=0;d<4;d++){let s=nb[t][d];if(s<0||li[s])continue;if(nb[s][d]>=0){li[s]=1;q.push(s)}}}
let de=li.map(x=>!x),n2=rm2.bx.length;if(!n2)return{m:"",e:rm2.en};
let b0=rm2.bx.map(x=>of.get(x)).sort((a,b)=>a-b);
let pk=(bs,p)=>{let k=0;for(let x of bs)k=k*m+x;return k*m+p};
let un=k=>{let bs=new Array(n2),p=k%m;k=k/m|0;for(let j=n2-1;j>=0;j--){bs[j]=k%m;k=k/m|0}return[bs,p]};
let gs=bs=>bs.every(x=>g2[x]),bs2=new Set;
let d2=(bs,t)=>{bs2.clear();for(let x of bs)bs2.add(lo[x]);let z=lo[t],x=z%w,y=z/w|0;
for(let a of[[x,y],[x-1,y],[x,y-1],[x-1,y-1]]){let ax=a[0],ay=a[1];if(ax<0||ay<0||ax+1>=w||ay+1>=h)continue;
let cs=[ay*w+ax,ay*w+ax+1,(ay+1)*w+ax,(ay+1)*w+ax+1];
if(cs.every(c=>bs2.has(c))&&!cs.every(c=>gl[c]))return 1}return 0};
let sk=pk(b0,en),K=[sk],pa=[-1],sg=[""],se=new Map([[sk,0]]),Q=[0],hd=0,gi=-1;
if(gs(b0))gi=0;
let rp=new Int32Array(m),rc=new Array(m),ba=new Int32Array(m);
while(hd<Q.length&&gi<0){let id=Q[hd++];if(id>=6e5)break;let[bs,p]=un(K[id]);
rp.fill(-2);ba.fill(-1);for(let x of bs)ba[x]=1;let rq=[p];rp[p]=-1;let rh=0;
while(rh<rq.length){let c=rq[rh++];for(let d=0;d<4;d++){let z=nb[c][d];if(z<0||rp[z]!=-2||ba[z]==1)continue;rp[z]=c;rc[z]=C[d];rq.push(z)}}
let wt=t=>{if(t==p)return"";if(rp[t]==-2)return null;let s="",k=t;while(k!=p){s=rc[k]+s;k=rp[k]}return s};
for(let j=0;j<n2;j++){let b=bs[j];
for(let d=0;d<4;d++){let to=nb[b][d];if(to<0||to>=n)continue;if(ba[to]==1)continue;if(de[to])continue;
let f=nb[b][V[d]];if(f<0)continue;let w2=wt(f);if(w2==null)continue;
let ns=[...bs];ns[j]=to;ns.sort((a,b)=>a-b);if(d2(ns,to))continue;
let nk=pk(ns,b);if(se.has(nk))continue;let ni=K.length;se.set(nk,ni);K.push(nk);pa.push(id);sg.push(w2+C[d]);
if(gs(ns)){gi=ni;break}Q.push(ni)}if(gi>=0)break}}
if(gi<0)return null;let ps=[],c=gi;while(c>0){ps.push(sg[c]);c=pa[c]}ps.reverse();
let[bs,p]=un(K[gi]);return{m:ps.join(""),e:lo[p]}}
let rs=rm();rs.sort((a,b)=>a.dr%w-b.dr%w);let mv="",pl2=pl,cb=new Set(bx);
for(let r2 of rs){if(!r2.bx.length)continue;let w2=wk(cb,pl2,r2.en);
if(w2==null)return mv;mv+=w2;pl2=r2.en;let r3=sr(r2);if(!r3)return mv;
mv+=r3.m;pl2=r3.e;for(let x of r2.bx)cb.delete(x);for(let x of r2.gl)cb.add(x)}return mv}
for(let id of R(I).sort()){let mv=S(F(J(I,id,"level.txt"),"utf8"));M(J(O,id),{recursive:true});W(J(O,id,"solution.txt"),mv+"\n")}
