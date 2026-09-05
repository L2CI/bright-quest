var Ys={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var wu=([i,e,t])=>{let n=document.createElementNS("http://www.w3.org/2000/svg",i);return Object.keys(e).forEach(r=>{n.setAttribute(r,String(e[r]))}),t?.length&&t.forEach(r=>{let s=wu(r);n.appendChild(s)}),n},Mu=(i,e={})=>{let n={...Ys,...e};return wu(["svg",n,i])};var Eu=i=>{for(let e in i)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};var Tu=(...i)=>i.filter((e,t,n)=>!!e&&e.trim()!==""&&n.indexOf(e)===t).join(" ").trim();var Au=i=>i.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase());var Cu=i=>{let e=Au(i);return e.charAt(0).toUpperCase()+e.slice(1)};var bf=i=>Array.from(i.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),Ru=i=>typeof i=="string"?i:!i||!i.class?"":i.class&&typeof i.class=="string"?i.class.split(" "):i.class&&Array.isArray(i.class)?i.class:"",Lo=(i,{nameAttr:e,icons:t,attrs:n})=>{let r=i.getAttribute(e);if(r==null)return;let s=Cu(r),a=t[s];if(!a)return console.warn(`${i.outerHTML} icon name was not found in the provided icons object.`);let o=bf(i),l=Eu(o)?{}:{"aria-hidden":"true"},c={...Ys,"data-lucide":r,...l,...n,...o},u=Ru(o),d=Ru(n),h=Tu("lucide",`lucide-${r}`,...u,...d);h&&Object.assign(c,{class:h});let f=Mu(a,c);return i.parentNode?.replaceChild(f,i)};var Do=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var Uo=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var No=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]];var Fo=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];var ko=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18"}],["path",{d:"M16 10h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M8 10h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M8 18h.01"}]];var Oo=[["path",{d:"M20 6 9 17l-5-5"}]];var Bo=[["path",{d:"m9 18 6-6-6-6"}]];var os=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];var zo=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"}]];var Ho=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];var Vo=[["path",{d:"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"}]];var Go=[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"}],["path",{d:"M6.453 15h11.094"}],["path",{d:"M8.5 2h7"}]];var Wo=[["path",{d:"M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"}],["path",{d:"M14 6a6 6 0 0 1 6 6v3"}],["path",{d:"M4 15v-3a6 6 0 0 1 6-6"}],["rect",{x:"2",y:"15",width:"20",height:"4",rx:"1"}]];var Zs=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];var qo=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{cx:"12",cy:"10",r:"3"}]];var $o=[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"}],["path",{d:"M15 5.764v15"}],["path",{d:"M9 3.236v15"}]];var ls=[["path",{d:"M5 12h14"}]];var Xo=[["polygon",{points:"3 11 22 2 13 21 11 13 3 11"}]];var Yo=[["path",{d:"M20.341 6.484A10 10 0 0 1 10.266 21.85"}],["path",{d:"M3.659 17.516A10 10 0 0 1 13.74 2.152"}],["circle",{cx:"12",cy:"12",r:"3"}],["circle",{cx:"19",cy:"5",r:"2"}],["circle",{cx:"5",cy:"19",r:"2"}]];var Zo=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{d:"M12 22V12"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["path",{d:"m7.5 4.27 9 5.15"}]];var jo=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];var Jo=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];var ar=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];var Ko=[["path",{d:"M19.07 4.93A10 10 0 0 0 6.99 3.34"}],["path",{d:"M4 6h.01"}],["path",{d:"M2.29 9.62A10 10 0 1 0 21.31 8.35"}],["path",{d:"M16.24 7.76A6 6 0 1 0 8.23 16.67"}],["path",{d:"M12 18h.01"}],["path",{d:"M17.99 11.66A6 6 0 0 1 15.77 16.67"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"m13.41 10.59 5.66-5.66"}]];var Qo=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478"}],["circle",{cx:"12",cy:"12",r:"2"}]];var el=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var or=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];var tl=[["circle",{cx:"6",cy:"19",r:"3"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"}],["circle",{cx:"18",cy:"5",r:"3"}]];var nl=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var il=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];var rl=[["path",{d:"M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"}],["path",{d:"M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"}],["path",{d:"M5 21h14"}]];var sl=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];var al=[["path",{d:"m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"}],["path",{d:"m13.56 11.747 4.332-.924"}],["path",{d:"m16 21-3.105-6.21"}],["path",{d:"M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"}],["path",{d:"m6.158 8.633 1.114 4.456"}],["path",{d:"m8 21 3.105-6.21"}],["circle",{cx:"12",cy:"13",r:"2"}]];var ol=[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],["path",{d:"M15 18H9"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"}],["circle",{cx:"17",cy:"18",r:"2"}],["circle",{cx:"7",cy:"18",r:"2"}]];var ll=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];var cl=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15"}]];var ul=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]];var dl=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var hl=({icons:i={},nameAttr:e="data-lucide",attrs:t={},root:n=document,inTemplates:r}={})=>{if(!Object.values(i).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof n>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(n.querySelectorAll(`[${e}]`)).forEach(a=>Lo(a,{nameAttr:e,icons:i,attrs:t})),r&&Array.from(n.querySelectorAll("template")).forEach(o=>hl({icons:i,nameAttr:e,attrs:t,root:o.content,inTemplates:r})),e==="data-lucide"){let a=n.querySelectorAll("[icon-name]");a.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(a).forEach(o=>Lo(o,{nameAttr:"icon-name",icons:i,attrs:t})))}};var Sf=0,Pu=1,wf=2;var uh=1,Hc=2,ei=3,Mi=0,ln=1,Rn=2,bi=0,Lr=1,Ms=2,Iu=3,Lu=4,Mf=5,qi=100,Ef=101,Tf=102,Af=103,Cf=104,Rf=200,Pf=201,If=202,Lf=203,Zl=204,jl=205,Df=206,Uf=207,Nf=208,Ff=209,kf=210,Of=211,Bf=212,zf=213,Hf=214,Vf=0,Gf=1,Wf=2,Ta=3,qf=4,$f=5,Xf=6,Yf=7,dh=0,Zf=1,jf=2,Si=0,Jf=1,Kf=2,Qf=3,Vc=4,ep=5,tp=6,np=7;var hh=300,Fr=301,kr=302,Jl=303,Kl=304,co=306,ri=1e3,Xi=1001,Ql=1002,on=1003,ip=1004;var js=1005;var Pn=1006,fl=1007;var Yi=1008;var Ei=1009,rp=1010,sp=1011,Aa=1012,fh=1013,Or=1014,ni=1015,uo=1016,ph=1017,mh=1018,Br=1020,ap=35902,op=1021,lp=1022,On=1023,cp=1024,up=1025,Dr=1026,zr=1027,gh=1028,xh=1029,dp=1030,vh=1031,yh=1033,pl=33776,ml=33777,gl=33778,xl=33779,Du=35840,Uu=35841,Nu=35842,Fu=35843,ku=36196,Ou=37492,Bu=37496,zu=37808,Hu=37809,Vu=37810,Gu=37811,Wu=37812,qu=37813,$u=37814,Xu=37815,Yu=37816,Zu=37817,ju=37818,Ju=37819,Ku=37820,Qu=37821,vl=36492,ed=36494,td=36495,hp=36283,nd=36284,id=36285,rd=36286;var Ca=2300,ec=2301,yl=2302,sd=2400,ad=2401,od=2402;var fp=3200,pp=3201,_h=0,mp=1,_i="",Ft="srgb",Pi="srgb-linear",Gc="display-p3",ho="display-p3-linear",Ra="linear",xt="srgb",Pa="rec709",Ia="p3";var lr=7680;var ld=519,gp=512,xp=513,vp=514,bh=515,yp=516,_p=517,bp=518,Sp=519,tc=35044;var cd="300 es",ii=2e3,La=2001,Ti=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ud=1234567,ys=Math.PI/180,Es=180/Math.PI;function Bn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function Vt(i,e,t){return Math.max(e,Math.min(t,i))}function Wc(i,e){return(i%e+e)%e}function wp(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Mp(i,e,t){return i!==e?(t-i)/(e-i):0}function _s(i,e,t){return(1-t)*i+t*e}function Ep(i,e,t,n){return _s(i,e,1-Math.exp(-t*n))}function Tp(i,e=1){return e-Math.abs(Wc(i,e*2)-e)}function Ap(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Cp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Rp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Pp(i,e){return i+Math.random()*(e-i)}function Ip(i){return i*(.5-Math.random())}function Lp(i){i!==void 0&&(ud=i);let e=ud+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Dp(i){return i*ys}function Up(i){return i*Es}function Np(i){return(i&i-1)===0&&i!==0}function Fp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function kp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Op(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),d=s((e-n)/2),h=a((e-n)/2),f=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*d,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function In(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var $r={DEG2RAD:ys,RAD2DEG:Es,generateUUID:Bn,clamp:Vt,euclideanModulo:Wc,mapLinear:wp,inverseLerp:Mp,lerp:_s,damp:Ep,pingpong:Tp,smoothstep:Ap,smootherstep:Cp,randInt:Rp,randFloat:Pp,randFloatSpread:Ip,seededRandom:Lp,degToRad:Dp,radToDeg:Up,isPowerOfTwo:Np,ceilPowerOfTwo:Fp,floorPowerOfTwo:kp,setQuaternionFromProperEuler:Op,normalize:ct,denormalize:In},ee=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},$e=class i{constructor(e,t,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],g=n[8],x=r[0],p=r[3],m=r[6],S=r[1],v=r[4],b=r[7],D=r[2],T=r[5],A=r[8];return s[0]=a*x+o*S+l*D,s[3]=a*p+o*v+l*T,s[6]=a*m+o*b+l*A,s[1]=c*x+u*S+d*D,s[4]=c*p+u*v+d*T,s[7]=c*m+u*b+d*A,s[2]=h*x+f*S+g*D,s[5]=h*p+f*v+g*T,s[8]=h*m+f*b+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*s,f=c*s-a*l,g=t*d+n*h+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=d*x,e[1]=(r*c-u*n)*x,e[2]=(o*n-r*a)*x,e[3]=h*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(_l.makeScale(e,t)),this}rotate(e){return this.premultiply(_l.makeRotation(-e)),this}translate(e,t){return this.premultiply(_l.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},_l=new $e;function Sh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ts(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Bp(){let i=Ts("canvas");return i.style.display="block",i}var dd={};function qc(i){i in dd||(dd[i]=!0,console.warn(i))}function zp(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var hd=new $e().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),fd=new $e().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Js={[Pi]:{transfer:Ra,primaries:Pa,toReference:i=>i,fromReference:i=>i},[Ft]:{transfer:xt,primaries:Pa,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[ho]:{transfer:Ra,primaries:Ia,toReference:i=>i.applyMatrix3(fd),fromReference:i=>i.applyMatrix3(hd)},[Gc]:{transfer:xt,primaries:Ia,toReference:i=>i.convertSRGBToLinear().applyMatrix3(fd),fromReference:i=>i.applyMatrix3(hd).convertLinearToSRGB()}},Hp=new Set([Pi,ho]),ut={enabled:!0,_workingColorSpace:Pi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Hp.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=Js[e].toReference,r=Js[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Js[i].primaries},getTransfer:function(i){return i===_i?Ra:Js[i].transfer}};function Ur(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function bl(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var cr,nc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{cr===void 0&&(cr=Ts("canvas")),cr.width=e.width,cr.height=e.height;let n=cr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=cr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ts("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ur(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ur(t[n]/255)*255):t[n]=Ur(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Vp=0,Da=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vp++}),this.uuid=Bn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Sl(r[a].image)):s.push(Sl(r[a]))}else s=Sl(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Sl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Gp=0,sn=class i extends Ti{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Xi,r=Xi,s=Pn,a=Yi,o=On,l=Ei,c=i.DEFAULT_ANISOTROPY,u=_i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=Bn(),this.name="",this.source=new Da(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ee(0,0),this.repeat=new ee(1,1),this.center=new ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==hh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ri:e.x=e.x-Math.floor(e.x);break;case Xi:e.x=e.x<0?0:1;break;case Ql:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ri:e.y=e.y-Math.floor(e.y);break;case Xi:e.y=e.y<0?0:1;break;case Ql:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=hh;sn.DEFAULT_ANISOTROPY=1;var kt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],g=l[9],x=l[2],p=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(c+1)/2,b=(f+1)/2,D=(m+1)/2,T=(u+h)/4,A=(d+x)/4,L=(g+p)/4;return v>b&&v>D?v<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(v),r=T/n,s=A/n):b>D?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=T/r,s=L/r):D<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),n=A/s,r=L/s),this.set(n,r,s,t),this}let S=Math.sqrt((p-g)*(p-g)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(d-x)/S,this.z=(h-u)/S,this.w=Math.acos((c+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ic=class extends Ti{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new kt(0,0,e,t),this.scissorTest=!1,this.viewport=new kt(0,0,e,t);let r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new sn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Da(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},si=class extends ic{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ua=class extends sn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=on,this.minFilter=on,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var rc=class extends sn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=on,this.minFilter=on,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ai=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],d=n[r+3],h=s[a+0],f=s[a+1],g=s[a+2],x=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(d!==x||l!==h||c!==f||u!==g){let p=1-o,m=l*h+c*f+u*g+d*x,S=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){let D=Math.sqrt(v),T=Math.atan2(D,m*S);p=Math.sin(p*T)/D,o=Math.sin(o*T)/D}let b=o*S;if(l=l*p+h*b,c=c*p+f*b,u=u*p+g*b,d=d*p+x*b,p===1-o){let D=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=D,c*=D,u*=D,d*=D}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],d=s[a],h=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+u*d+l*f-c*h,e[t+1]=l*g+u*h+c*d-o*f,e[t+2]=c*g+u*f+o*h-l*d,e[t+3]=u*g-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),d=o(s/2),h=l(n/2),f=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"YZX":this._x=h*u*d+c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d-h*f*g;break;case"XZY":this._x=h*u*d-c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Vt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=a*d+this._w*h,this._x=n*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-s*d,this.z=r+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return wl.copy(this).projectOnVector(e),this.sub(wl)}reflect(e){return this.sub(wl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},wl=new I,pd=new Ai,ai=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Tn):Tn.fromBufferAttribute(s,a),Tn.applyMatrix4(e.matrixWorld),this.expandByPoint(Tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ks.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ks.copy(n.boundingBox)),Ks.applyMatrix4(e.matrixWorld),this.union(Ks)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Tn),Tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cs),Qs.subVectors(this.max,cs),ur.subVectors(e.a,cs),dr.subVectors(e.b,cs),hr.subVectors(e.c,cs),pi.subVectors(dr,ur),mi.subVectors(hr,dr),Oi.subVectors(ur,hr);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-Oi.z,Oi.y,pi.z,0,-pi.x,mi.z,0,-mi.x,Oi.z,0,-Oi.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-Oi.y,Oi.x,0];return!Ml(t,ur,dr,hr,Qs)||(t=[1,0,0,0,1,0,0,0,1],!Ml(t,ur,dr,hr,Qs))?!1:(ea.crossVectors(pi,mi),t=[ea.x,ea.y,ea.z],Ml(t,ur,dr,hr,Qs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Zn=[new I,new I,new I,new I,new I,new I,new I,new I],Tn=new I,Ks=new ai,ur=new I,dr=new I,hr=new I,pi=new I,mi=new I,Oi=new I,cs=new I,Qs=new I,ea=new I,Bi=new I;function Ml(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Bi.fromArray(i,s);let o=r.x*Math.abs(Bi.x)+r.y*Math.abs(Bi.y)+r.z*Math.abs(Bi.z),l=e.dot(Bi),c=t.dot(Bi),u=n.dot(Bi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Wp=new ai,us=new I,El=new I,ji=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Wp.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;us.subVectors(e,this.center);let t=us.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(us,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(El.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(us.copy(e.center).add(El)),this.expandByPoint(us.copy(e.center).sub(El))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},jn=new I,Tl=new I,ta=new I,gi=new I,Al=new I,na=new I,Cl=new I,Na=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Tl.copy(e).add(t).multiplyScalar(.5),ta.copy(t).sub(e).normalize(),gi.copy(this.origin).sub(Tl);let s=e.distanceTo(t)*.5,a=-this.direction.dot(ta),o=gi.dot(this.direction),l=-gi.dot(ta),c=gi.lengthSq(),u=Math.abs(1-a*a),d,h,f,g;if(u>0)if(d=a*l-o,h=a*o-l,g=s*u,d>=0)if(h>=-g)if(h<=g){let x=1/u;d*=x,h*=x,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Tl).addScaledVector(ta,h),f}intersectSphere(e,t){jn.subVectors(e.center,this.origin);let n=jn.dot(this.direction),r=jn.dot(jn)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,n,r,s){Al.subVectors(t,e),na.subVectors(n,e),Cl.crossVectors(Al,na);let a=this.direction.dot(Cl),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;gi.subVectors(this.origin,e);let l=o*this.direction.dot(na.crossVectors(gi,na));if(l<0)return null;let c=o*this.direction.dot(Al.cross(gi));if(c<0||l+c>a)return null;let u=-o*gi.dot(Cl);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},pt=class i{constructor(e,t,n,r,s,a,o,l,c,u,d,h,f,g,x,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,d,h,f,g,x,p)}set(e,t,n,r,s,a,o,l,c,u,d,h,f,g,x,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=g,m[11]=x,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/fr.setFromMatrixColumn(e,0).length(),s=1/fr.setFromMatrixColumn(e,1).length(),a=1/fr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let h=a*u,f=a*d,g=o*u,x=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=h-x*c,t[9]=-o*l,t[2]=x-h*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,f=l*d,g=c*u,x=c*d;t[0]=h+x*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=x+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,f=l*d,g=c*u,x=c*d;t[0]=h-x*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,f=a*d,g=o*u,x=o*d;t[0]=l*u,t[4]=g*c-f,t[8]=h*c+x,t[1]=l*d,t[5]=x*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=x-h*d,t[8]=g*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+g,t[10]=h-x*d}else if(e.order==="XZY"){let h=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+x,t[5]=a*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qp,e,$p)}lookAt(e,t,n){let r=this.elements;return pn.subVectors(e,t),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),xi.crossVectors(n,pn),xi.lengthSq()===0&&(Math.abs(n.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),xi.crossVectors(n,pn)),xi.normalize(),ia.crossVectors(pn,xi),r[0]=xi.x,r[4]=ia.x,r[8]=pn.x,r[1]=xi.y,r[5]=ia.y,r[9]=pn.y,r[2]=xi.z,r[6]=ia.z,r[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],g=n[2],x=n[6],p=n[10],m=n[14],S=n[3],v=n[7],b=n[11],D=n[15],T=r[0],A=r[4],L=r[8],M=r[12],y=r[1],C=r[5],z=r[9],k=r[13],H=r[2],$=r[6],V=r[10],ne=r[14],G=r[3],ge=r[7],we=r[11],be=r[15];return s[0]=a*T+o*y+l*H+c*G,s[4]=a*A+o*C+l*$+c*ge,s[8]=a*L+o*z+l*V+c*we,s[12]=a*M+o*k+l*ne+c*be,s[1]=u*T+d*y+h*H+f*G,s[5]=u*A+d*C+h*$+f*ge,s[9]=u*L+d*z+h*V+f*we,s[13]=u*M+d*k+h*ne+f*be,s[2]=g*T+x*y+p*H+m*G,s[6]=g*A+x*C+p*$+m*ge,s[10]=g*L+x*z+p*V+m*we,s[14]=g*M+x*k+p*ne+m*be,s[3]=S*T+v*y+b*H+D*G,s[7]=S*A+v*C+b*$+D*ge,s[11]=S*L+v*z+b*V+D*we,s[15]=S*M+v*k+b*ne+D*be,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],x=e[7],p=e[11],m=e[15];return g*(+s*l*d-r*c*d-s*o*h+n*c*h+r*o*f-n*l*f)+x*(+t*l*f-t*c*h+s*a*h-r*a*f+r*c*u-s*l*u)+p*(+t*c*d-t*o*f-s*a*d+n*a*f+s*o*u-n*c*u)+m*(-r*o*u-t*l*d+t*o*h+r*a*d-n*a*h+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],x=e[13],p=e[14],m=e[15],S=d*p*c-x*h*c+x*l*f-o*p*f-d*l*m+o*h*m,v=g*h*c-u*p*c-g*l*f+a*p*f+u*l*m-a*h*m,b=u*x*c-g*d*c+g*o*f-a*x*f-u*o*m+a*d*m,D=g*d*l-u*x*l-g*o*h+a*x*h+u*o*p-a*d*p,T=t*S+n*v+r*b+s*D;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/T;return e[0]=S*A,e[1]=(x*h*s-d*p*s-x*r*f+n*p*f+d*r*m-n*h*m)*A,e[2]=(o*p*s-x*l*s+x*r*c-n*p*c-o*r*m+n*l*m)*A,e[3]=(d*l*s-o*h*s-d*r*c+n*h*c+o*r*f-n*l*f)*A,e[4]=v*A,e[5]=(u*p*s-g*h*s+g*r*f-t*p*f-u*r*m+t*h*m)*A,e[6]=(g*l*s-a*p*s-g*r*c+t*p*c+a*r*m-t*l*m)*A,e[7]=(a*h*s-u*l*s+u*r*c-t*h*c-a*r*f+t*l*f)*A,e[8]=b*A,e[9]=(g*d*s-u*x*s-g*n*f+t*x*f+u*n*m-t*d*m)*A,e[10]=(a*x*s-g*o*s+g*n*c-t*x*c-a*n*m+t*o*m)*A,e[11]=(u*o*s-a*d*s-u*n*c+t*d*c+a*n*f-t*o*f)*A,e[12]=D*A,e[13]=(u*x*r-g*d*r+g*n*h-t*x*h-u*n*p+t*d*p)*A,e[14]=(g*o*r-a*x*r-g*n*l+t*x*l+a*n*p-t*o*p)*A,e[15]=(a*d*r-u*o*r+u*n*l-t*d*l-a*n*h+t*o*h)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,h=s*c,f=s*u,g=s*d,x=a*u,p=a*d,m=o*d,S=l*c,v=l*u,b=l*d,D=n.x,T=n.y,A=n.z;return r[0]=(1-(x+m))*D,r[1]=(f+b)*D,r[2]=(g-v)*D,r[3]=0,r[4]=(f-b)*T,r[5]=(1-(h+m))*T,r[6]=(p+S)*T,r[7]=0,r[8]=(g+v)*A,r[9]=(p-S)*A,r[10]=(1-(h+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=fr.set(r[0],r[1],r[2]).length(),a=fr.set(r[4],r[5],r[6]).length(),o=fr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],An.copy(this);let c=1/s,u=1/a,d=1/o;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=u,An.elements[5]*=u,An.elements[6]*=u,An.elements[8]*=d,An.elements[9]*=d,An.elements[10]*=d,t.setFromRotationMatrix(An),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=ii){let l=this.elements,c=2*s/(t-e),u=2*s/(n-r),d=(t+e)/(t-e),h=(n+r)/(n-r),f,g;if(o===ii)f=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===La)f=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=ii){let l=this.elements,c=1/(t-e),u=1/(n-r),d=1/(a-s),h=(t+e)*c,f=(n+r)*u,g,x;if(o===ii)g=(a+s)*d,x=-2*d;else if(o===La)g=s*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},fr=new I,An=new pt,qp=new I(0,0,0),$p=new I(1,1,1),xi=new I,ia=new I,pn=new I,md=new pt,gd=new Ai,zn=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Vt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return md.makeRotationFromQuaternion(e),this.setFromRotationMatrix(md,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gd.setFromEuler(this),this.setFromQuaternion(gd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zn.DEFAULT_ORDER="XYZ";var As=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Xp=0,xd=new I,pr=new Ai,Jn=new pt,ra=new I,ds=new I,Yp=new I,Zp=new Ai,vd=new I(1,0,0),yd=new I(0,1,0),_d=new I(0,0,1),bd={type:"added"},jp={type:"removed"},mr={type:"childadded",child:null},Rl={type:"childremoved",child:null},Et=class i extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new I,t=new zn,n=new Ai,r=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pt},normalMatrix:{value:new $e}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new As,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pr.setFromAxisAngle(e,t),this.quaternion.multiply(pr),this}rotateOnWorldAxis(e,t){return pr.setFromAxisAngle(e,t),this.quaternion.premultiply(pr),this}rotateX(e){return this.rotateOnAxis(vd,e)}rotateY(e){return this.rotateOnAxis(yd,e)}rotateZ(e){return this.rotateOnAxis(_d,e)}translateOnAxis(e,t){return xd.copy(e).applyQuaternion(this.quaternion),this.position.add(xd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vd,e)}translateY(e){return this.translateOnAxis(yd,e)}translateZ(e){return this.translateOnAxis(_d,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ra.copy(e):ra.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(ds,ra,this.up):Jn.lookAt(ra,ds,this.up),this.quaternion.setFromRotationMatrix(Jn),r&&(Jn.extractRotation(r.matrixWorld),pr.setFromRotationMatrix(Jn),this.quaternion.premultiply(pr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bd),mr.child=e,this.dispatchEvent(mr),mr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jp),Rl.child=e,this.dispatchEvent(Rl),Rl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bd),mr.child=e,this.dispatchEvent(mr),mr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,e,Yp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,Zp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++){let o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};Et.DEFAULT_UP=new I(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Cn=new I,Kn=new I,Pl=new I,Qn=new I,gr=new I,xr=new I,Sd=new I,Il=new I,Ll=new I,Dl=new I,Zi=class i{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Cn.subVectors(e,t),r.cross(Cn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Cn.subVectors(r,t),Kn.subVectors(n,t),Pl.subVectors(e,t);let a=Cn.dot(Cn),o=Cn.dot(Kn),l=Cn.dot(Pl),c=Kn.dot(Kn),u=Kn.dot(Pl),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let h=1/d,f=(c*l-o*u)*h,g=(a*u-o*l)*h;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Qn.x),l.addScaledVector(a,Qn.y),l.addScaledVector(o,Qn.z),l)}static isFrontFacing(e,t,n,r){return Cn.subVectors(n,t),Kn.subVectors(e,t),Cn.cross(Kn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Cn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;gr.subVectors(r,n),xr.subVectors(s,n),Il.subVectors(e,n);let l=gr.dot(Il),c=xr.dot(Il);if(l<=0&&c<=0)return t.copy(n);Ll.subVectors(e,r);let u=gr.dot(Ll),d=xr.dot(Ll);if(u>=0&&d<=u)return t.copy(r);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(gr,a);Dl.subVectors(e,s);let f=gr.dot(Dl),g=xr.dot(Dl);if(g>=0&&f<=g)return t.copy(s);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(xr,o);let p=u*g-f*d;if(p<=0&&d-u>=0&&f-g>=0)return Sd.subVectors(s,r),o=(d-u)/(d-u+(f-g)),t.copy(r).addScaledVector(Sd,o);let m=1/(p+x+h);return a=x*m,o=h*m,t.copy(n).addScaledVector(gr,a).addScaledVector(xr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},wh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},sa={h:0,s:0,l:0};function Ul(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ke=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=ut.workingColorSpace){return this.r=e,this.g=t,this.b=n,ut.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=ut.workingColorSpace){if(e=Wc(e,1),t=Vt(t,0,1),n=Vt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ul(a,s,e+1/3),this.g=Ul(a,s,e),this.b=Ul(a,s,e-1/3)}return ut.toWorkingColorSpace(this,r),this}setStyle(e,t=Ft){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ft){let n=wh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ur(e.r),this.g=Ur(e.g),this.b=Ur(e.b),this}copyLinearToSRGB(e){return this.r=bl(e.r),this.g=bl(e.g),this.b=bl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ft){return ut.fromWorkingColorSpace(Yt.copy(this),e),Math.round(Vt(Yt.r*255,0,255))*65536+Math.round(Vt(Yt.g*255,0,255))*256+Math.round(Vt(Yt.b*255,0,255))}getHexString(e=Ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.fromWorkingColorSpace(Yt.copy(this),t);let n=Yt.r,r=Yt.g,s=Yt.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ut.workingColorSpace){return ut.fromWorkingColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=Ft){ut.fromWorkingColorSpace(Yt.copy(this),e);let t=Yt.r,n=Yt.g,r=Yt.b;return e!==Ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(vi),this.setHSL(vi.h+e,vi.s+t,vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vi),e.getHSL(sa);let n=_s(vi.h,sa.h,t),r=_s(vi.s,sa.s,t),s=_s(vi.l,sa.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yt=new ke;ke.NAMES=wh;var Jp=0,Ci=class extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=Bn(),this.name="",this.type="Material",this.blending=Lr,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zl,this.blendDst=jl,this.blendEquation=qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=Ta,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ld,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=lr,this.stencilZFail=lr,this.stencilZPass=lr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Lr&&(n.blending=this.blending),this.side!==Mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Zl&&(n.blendSrc=this.blendSrc),this.blendDst!==jl&&(n.blendDst=this.blendDst),this.blendEquation!==qi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ta&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ld&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==lr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==lr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==lr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Hn=class extends Ci{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=dh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Ct=new I,aa=new ee,Zt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=tc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return qc("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)aa.fromBufferAttribute(this,t),aa.applyMatrix3(e),this.setXY(t,aa.x,aa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=In(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=In(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=In(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=In(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=In(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array),s=ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==tc&&(e.usage=this.usage),e}};var Fa=class extends Zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ka=class extends Zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Qe=class extends Zt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Kp=0,_n=new pt,Nl=new Et,vr=new I,mn=new ai,hs=new ai,Nt=new I,Ot=class i extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kp++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Sh(e)?ka:Fa)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new $e().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,n){return _n.makeTranslation(e,t,n),this.applyMatrix4(_n),this}scale(e,t,n){return _n.makeScale(e,t,n),this.applyMatrix4(_n),this}lookAt(e){return Nl.lookAt(e),Nl.updateMatrix(),this.applyMatrix4(Nl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vr).negate(),this.translate(vr.x,vr.y,vr.z),this}setFromPoints(e){let t=[];for(let n=0,r=e.length;n<r;n++){let s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Qe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];mn.setFromBufferAttribute(s),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ji);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let n=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];hs.setFromBufferAttribute(o),this.morphTargetsRelative?(Nt.addVectors(mn.min,hs.min),mn.expandByPoint(Nt),Nt.addVectors(mn.max,hs.max),mn.expandByPoint(Nt)):(mn.expandByPoint(hs.min),mn.expandByPoint(hs.max))}mn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Nt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Nt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Nt.fromBufferAttribute(o,c),l&&(vr.fromBufferAttribute(e,c),Nt.add(vr)),r=Math.max(r,n.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new I,l[L]=new I;let c=new I,u=new I,d=new I,h=new ee,f=new ee,g=new ee,x=new I,p=new I;function m(L,M,y){c.fromBufferAttribute(n,L),u.fromBufferAttribute(n,M),d.fromBufferAttribute(n,y),h.fromBufferAttribute(s,L),f.fromBufferAttribute(s,M),g.fromBufferAttribute(s,y),u.sub(c),d.sub(c),f.sub(h),g.sub(h);let C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(C),p.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(C),o[L].add(x),o[M].add(x),o[y].add(x),l[L].add(p),l[M].add(p),l[y].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let L=0,M=S.length;L<M;++L){let y=S[L],C=y.start,z=y.count;for(let k=C,H=C+z;k<H;k+=3)m(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let v=new I,b=new I,D=new I,T=new I;function A(L){D.fromBufferAttribute(r,L),T.copy(D);let M=o[L];v.copy(M),v.sub(D.multiplyScalar(D.dot(M))).normalize(),b.crossVectors(T,M);let C=b.dot(l[L])<0?-1:1;a.setXYZW(L,v.x,v.y,v.z,C)}for(let L=0,M=S.length;L<M;++L){let y=S[L],C=y.start,z=y.count;for(let k=C,H=C+z;k<H;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let r=new I,s=new I,a=new I,o=new I,l=new I,c=new I,u=new I,d=new I;if(e)for(let h=0,f=e.count;h<f;h+=3){let g=e.getX(h+0),x=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,p),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),f=0,g=0;for(let x=0,p=l.length;x<p;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*u;for(let m=0;m<u;m++)h[g++]=c[f++]}return new Zt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},wd=new pt,zi=new Na,oa=new ji,Md=new I,yr=new I,_r=new I,br=new I,Fl=new I,la=new I,ca=new ee,ua=new ee,da=new ee,Ed=new I,Td=new I,Ad=new I,ha=new I,fa=new I,St=class extends Et{constructor(e=new Ot,t=new Hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){la.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],d=s[l];u!==0&&(Fl.fromBufferAttribute(d,e),a?la.addScaledVector(Fl,u):la.addScaledVector(Fl.sub(t),u))}t.add(la)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere),oa.applyMatrix4(s),zi.copy(e.ray).recast(e.near),!(oa.containsPoint(zi.origin)===!1&&(zi.intersectSphere(oa,Md)===null||zi.origin.distanceToSquared(Md)>(e.far-e.near)**2))&&(wd.copy(s).invert(),zi.copy(e.ray).applyMatrix4(wd),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){let p=h[g],m=a[p.materialIndex],S=Math.max(p.start,f.start),v=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let b=S,D=v;b<D;b+=3){let T=o.getX(b),A=o.getX(b+1),L=o.getX(b+2);r=pa(this,m,e,n,c,u,d,T,A,L),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let S=o.getX(p),v=o.getX(p+1),b=o.getX(p+2);r=pa(this,a,e,n,c,u,d,S,v,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){let p=h[g],m=a[p.materialIndex],S=Math.max(p.start,f.start),v=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let b=S,D=v;b<D;b+=3){let T=b,A=b+1,L=b+2;r=pa(this,m,e,n,c,u,d,T,A,L),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let S=p,v=p+1,b=p+2;r=pa(this,a,e,n,c,u,d,S,v,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}};function Qp(i,e,t,n,r,s,a,o){let l;if(e.side===ln?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Mi,o),l===null)return null;fa.copy(o),fa.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(fa);return c<t.near||c>t.far?null:{distance:c,point:fa.clone(),object:i}}function pa(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,yr),i.getVertexPosition(l,_r),i.getVertexPosition(c,br);let u=Qp(i,e,t,n,yr,_r,br,ha);if(u){r&&(ca.fromBufferAttribute(r,o),ua.fromBufferAttribute(r,l),da.fromBufferAttribute(r,c),u.uv=Zi.getInterpolation(ha,yr,_r,br,ca,ua,da,new ee)),s&&(ca.fromBufferAttribute(s,o),ua.fromBufferAttribute(s,l),da.fromBufferAttribute(s,c),u.uv1=Zi.getInterpolation(ha,yr,_r,br,ca,ua,da,new ee)),a&&(Ed.fromBufferAttribute(a,o),Td.fromBufferAttribute(a,l),Ad.fromBufferAttribute(a,c),u.normal=Zi.getInterpolation(ha,yr,_r,br,Ed,Td,Ad,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new I,materialIndex:0};Zi.getNormal(yr,_r,br,d.normal),u.face=d}return u}var bn=class i extends Ot{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Qe(c,3)),this.setAttribute("normal",new Qe(u,3)),this.setAttribute("uv",new Qe(d,2));function g(x,p,m,S,v,b,D,T,A,L,M){let y=b/A,C=D/L,z=b/2,k=D/2,H=T/2,$=A+1,V=L+1,ne=0,G=0,ge=new I;for(let we=0;we<V;we++){let be=we*C-k;for(let Ye=0;Ye<$;Ye++){let tt=Ye*y-z;ge[x]=tt*S,ge[p]=be*v,ge[m]=H,c.push(ge.x,ge.y,ge.z),ge[x]=0,ge[p]=0,ge[m]=T>0?1:-1,u.push(ge.x,ge.y,ge.z),d.push(Ye/A),d.push(1-we/L),ne+=1}}for(let we=0;we<L;we++)for(let be=0;be<A;be++){let Ye=h+be+$*we,tt=h+be+$*(we+1),W=h+(be+1)+$*(we+1),ie=h+(be+1)+$*we;l.push(Ye,tt,ie),l.push(tt,W,ie),G+=6}o.addGroup(f,G,M),f+=G,h+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Hr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function nn(i){let e={};for(let t=0;t<i.length;t++){let n=Hr(i[t]);for(let r in n)e[r]=n[r]}return e}function em(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Mh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}var tm={clone:Hr,merge:nn},nm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,im=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Vn=class extends Ci{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nm,this.fragmentShader=im,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hr(e.uniforms),this.uniformsGroups=em(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Oa=class extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=ii}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},yi=new I,Cd=new ee,Rd=new ee,rn=class extends Oa{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Es*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Es*2*Math.atan(Math.tan(ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,Cd,Rd),t.subVectors(Rd,Cd)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ys*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Sr=-90,wr=1,sc=class extends Et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new rn(Sr,wr,e,t);r.layers=this.layers,this.add(r);let s=new rn(Sr,wr,e,t);s.layers=this.layers,this.add(s);let a=new rn(Sr,wr,e,t);a.layers=this.layers,this.add(a);let o=new rn(Sr,wr,e,t);o.layers=this.layers,this.add(o);let l=new rn(Sr,wr,e,t);l.layers=this.layers,this.add(l);let c=new rn(Sr,wr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===ii)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===La)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ba=class extends sn{constructor(e,t,n,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Fr,super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ac=class extends si{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ba(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Pn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new bn(5,5,5),s=new Vn({name:"CubemapFromEquirect",uniforms:Hr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ln,blending:bi});s.uniforms.tEquirect.value=t;let a=new St(r,s),o=t.minFilter;return t.minFilter===Yi&&(t.minFilter=Pn),new sc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}},kl=new I,rm=new I,sm=new $e,ti=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=kl.subVectors(n,t).cross(rm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(kl),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||sm.getNormalMatrix(e),r=this.coplanarPoint(kl).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Hi=new ji,ma=new I,Cs=class{constructor(e=new ti,t=new ti,n=new ti,r=new ti,s=new ti,a=new ti){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ii){let n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],d=r[6],h=r[7],f=r[8],g=r[9],x=r[10],p=r[11],m=r[12],S=r[13],v=r[14],b=r[15];if(n[0].setComponents(l-s,h-c,p-f,b-m).normalize(),n[1].setComponents(l+s,h+c,p+f,b+m).normalize(),n[2].setComponents(l+a,h+u,p+g,b+S).normalize(),n[3].setComponents(l-a,h-u,p-g,b-S).normalize(),n[4].setComponents(l-o,h-d,p-x,b-v).normalize(),t===ii)n[5].setComponents(l+o,h+d,p+x,b+v).normalize();else if(t===La)n[5].setComponents(o,d,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){return Hi.center.set(0,0,0),Hi.radius=.7071067811865476,Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ma.x=r.normal.x>0?e.max.x:e.min.x,ma.y=r.normal.y>0?e.max.y:e.min.y,ma.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ma)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Eh(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function am(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let u=l.array,d=l._updateRange,h=l.updateRanges;if(i.bindBuffer(c,o),d.count===-1&&h.length===0&&i.bufferSubData(c,0,u),h.length!==0){for(let f=0,g=h.length;f<g;f++){let x=h[f];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}d.count!==-1&&(i.bufferSubData(c,d.offset*u.BYTES_PER_ELEMENT,u,d.offset,d.count),d.count=-1),l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var oi=class i extends Ot{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,d=e/o,h=t/l,f=[],g=[],x=[],p=[];for(let m=0;m<u;m++){let S=m*h-a;for(let v=0;v<c;v++){let b=v*d-s;g.push(b,-S,0),x.push(0,0,1),p.push(v/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<o;S++){let v=S+c*m,b=S+c*(m+1),D=S+1+c*(m+1),T=S+1+c*m;f.push(v,b,T),f.push(b,D,T)}this.setIndex(f),this.setAttribute("position",new Qe(g,3)),this.setAttribute("normal",new Qe(x,3)),this.setAttribute("uv",new Qe(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},om=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,cm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,um=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mm=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,gm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,xm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ym=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_m=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,wm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Em=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Am=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Rm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,Pm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Im=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Lm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Dm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Um=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,km="gl_FragColor = linearToOutputTexel( gl_FragColor );",Om=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Bm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,zm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Hm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Vm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$m=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ym=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Zm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Km=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Qm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,eg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ng=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ig=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ag=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,og=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ug=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_g=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,wg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Eg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ag=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Rg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Pg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ig=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Lg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ug=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ng=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Fg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Og=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Hg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,Gg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Wg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$g=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Yg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,jg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ex=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,tx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,nx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,sx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ax=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ox=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,fx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,px=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_x=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,bx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ex=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ax=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Cx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Px=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ix=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ux=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Nx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ox=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qe={alphahash_fragment:om,alphahash_pars_fragment:lm,alphamap_fragment:cm,alphamap_pars_fragment:um,alphatest_fragment:dm,alphatest_pars_fragment:hm,aomap_fragment:fm,aomap_pars_fragment:pm,batching_pars_vertex:mm,batching_vertex:gm,begin_vertex:xm,beginnormal_vertex:vm,bsdfs:ym,iridescence_fragment:_m,bumpmap_pars_fragment:bm,clipping_planes_fragment:Sm,clipping_planes_pars_fragment:wm,clipping_planes_pars_vertex:Mm,clipping_planes_vertex:Em,color_fragment:Tm,color_pars_fragment:Am,color_pars_vertex:Cm,color_vertex:Rm,common:Pm,cube_uv_reflection_fragment:Im,defaultnormal_vertex:Lm,displacementmap_pars_vertex:Dm,displacementmap_vertex:Um,emissivemap_fragment:Nm,emissivemap_pars_fragment:Fm,colorspace_fragment:km,colorspace_pars_fragment:Om,envmap_fragment:Bm,envmap_common_pars_fragment:zm,envmap_pars_fragment:Hm,envmap_pars_vertex:Vm,envmap_physical_pars_fragment:Qm,envmap_vertex:Gm,fog_vertex:Wm,fog_pars_vertex:qm,fog_fragment:$m,fog_pars_fragment:Xm,gradientmap_pars_fragment:Ym,lightmap_pars_fragment:Zm,lights_lambert_fragment:jm,lights_lambert_pars_fragment:Jm,lights_pars_begin:Km,lights_toon_fragment:eg,lights_toon_pars_fragment:tg,lights_phong_fragment:ng,lights_phong_pars_fragment:ig,lights_physical_fragment:rg,lights_physical_pars_fragment:sg,lights_fragment_begin:ag,lights_fragment_maps:og,lights_fragment_end:lg,logdepthbuf_fragment:cg,logdepthbuf_pars_fragment:ug,logdepthbuf_pars_vertex:dg,logdepthbuf_vertex:hg,map_fragment:fg,map_pars_fragment:pg,map_particle_fragment:mg,map_particle_pars_fragment:gg,metalnessmap_fragment:xg,metalnessmap_pars_fragment:vg,morphinstance_vertex:yg,morphcolor_vertex:_g,morphnormal_vertex:bg,morphtarget_pars_vertex:Sg,morphtarget_vertex:wg,normal_fragment_begin:Mg,normal_fragment_maps:Eg,normal_pars_fragment:Tg,normal_pars_vertex:Ag,normal_vertex:Cg,normalmap_pars_fragment:Rg,clearcoat_normal_fragment_begin:Pg,clearcoat_normal_fragment_maps:Ig,clearcoat_pars_fragment:Lg,iridescence_pars_fragment:Dg,opaque_fragment:Ug,packing:Ng,premultiplied_alpha_fragment:Fg,project_vertex:kg,dithering_fragment:Og,dithering_pars_fragment:Bg,roughnessmap_fragment:zg,roughnessmap_pars_fragment:Hg,shadowmap_pars_fragment:Vg,shadowmap_pars_vertex:Gg,shadowmap_vertex:Wg,shadowmask_pars_fragment:qg,skinbase_vertex:$g,skinning_pars_vertex:Xg,skinning_vertex:Yg,skinnormal_vertex:Zg,specularmap_fragment:jg,specularmap_pars_fragment:Jg,tonemapping_fragment:Kg,tonemapping_pars_fragment:Qg,transmission_fragment:ex,transmission_pars_fragment:tx,uv_pars_fragment:nx,uv_pars_vertex:ix,uv_vertex:rx,worldpos_vertex:sx,background_vert:ax,background_frag:ox,backgroundCube_vert:lx,backgroundCube_frag:cx,cube_vert:ux,cube_frag:dx,depth_vert:hx,depth_frag:fx,distanceRGBA_vert:px,distanceRGBA_frag:mx,equirect_vert:gx,equirect_frag:xx,linedashed_vert:vx,linedashed_frag:yx,meshbasic_vert:_x,meshbasic_frag:bx,meshlambert_vert:Sx,meshlambert_frag:wx,meshmatcap_vert:Mx,meshmatcap_frag:Ex,meshnormal_vert:Tx,meshnormal_frag:Ax,meshphong_vert:Cx,meshphong_frag:Rx,meshphysical_vert:Px,meshphysical_frag:Ix,meshtoon_vert:Lx,meshtoon_frag:Dx,points_vert:Ux,points_frag:Nx,shadow_vert:Fx,shadow_frag:kx,sprite_vert:Ox,sprite_frag:Bx},de={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},kn={basic:{uniforms:nn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:nn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ke(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:nn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:nn([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:nn([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new ke(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:nn([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:nn([de.points,de.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:nn([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:nn([de.common,de.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:nn([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:nn([de.sprite,de.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:nn([de.common,de.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:nn([de.lights,de.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};kn.physical={uniforms:nn([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};var ga={r:0,b:0,g:0},Vi=new zn,zx=new pt;function Hx(i,e,t,n,r,s,a){let o=new ke(0),l=s===!0?0:1,c,u,d=null,h=0,f=null;function g(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function x(S){let v=!1,b=g(S);b===null?m(o,l):b&&b.isColor&&(m(b,1),v=!0);let D=i.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,a):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(S,v){let b=g(v);b&&(b.isCubeTexture||b.mapping===co)?(u===void 0&&(u=new St(new bn(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:Hr(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Vi.copy(v.backgroundRotation),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(zx.makeRotationFromEuler(Vi)),u.material.toneMapped=ut.getTransfer(b.colorSpace)!==xt,(d!==b||h!==b.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,d=b,h=b.version,f=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new St(new oi(2,2),new Vn({name:"BackgroundMaterial",uniforms:Hr(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=ut.getTransfer(b.colorSpace)!==xt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||h!==b.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=b,h=b.version,f=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function m(S,v){S.getRGB(ga,Mh(i)),n.buffers.color.setClear(ga.r,ga.g,ga.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(S,v=1){o.set(S),l=v,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,m(o,l)},render:x,addToRenderList:p}}function Vx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null),s=r,a=!1;function o(y,C,z,k,H){let $=!1,V=d(k,z,C);s!==V&&(s=V,c(s.object)),$=f(y,k,z,H),$&&g(y,k,z,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,b(y,C,z,k),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function d(y,C,z){let k=z.wireframe===!0,H=n[y.id];H===void 0&&(H={},n[y.id]=H);let $=H[C.id];$===void 0&&($={},H[C.id]=$);let V=$[k];return V===void 0&&(V=h(l()),$[k]=V),V}function h(y){let C=[],z=[],k=[];for(let H=0;H<t;H++)C[H]=0,z[H]=0,k[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:z,attributeDivisors:k,object:y,attributes:{},index:null}}function f(y,C,z,k){let H=s.attributes,$=C.attributes,V=0,ne=z.getAttributes();for(let G in ne)if(ne[G].location>=0){let we=H[G],be=$[G];if(be===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(be=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(be=y.instanceColor)),we===void 0||we.attribute!==be||be&&we.data!==be.data)return!0;V++}return s.attributesNum!==V||s.index!==k}function g(y,C,z,k){let H={},$=C.attributes,V=0,ne=z.getAttributes();for(let G in ne)if(ne[G].location>=0){let we=$[G];we===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(we=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(we=y.instanceColor));let be={};be.attribute=we,we&&we.data&&(be.data=we.data),H[G]=be,V++}s.attributes=H,s.attributesNum=V,s.index=k}function x(){let y=s.newAttributes;for(let C=0,z=y.length;C<z;C++)y[C]=0}function p(y){m(y,0)}function m(y,C){let z=s.newAttributes,k=s.enabledAttributes,H=s.attributeDivisors;z[y]=1,k[y]===0&&(i.enableVertexAttribArray(y),k[y]=1),H[y]!==C&&(i.vertexAttribDivisor(y,C),H[y]=C)}function S(){let y=s.newAttributes,C=s.enabledAttributes;for(let z=0,k=C.length;z<k;z++)C[z]!==y[z]&&(i.disableVertexAttribArray(z),C[z]=0)}function v(y,C,z,k,H,$,V){V===!0?i.vertexAttribIPointer(y,C,z,H,$):i.vertexAttribPointer(y,C,z,k,H,$)}function b(y,C,z,k){x();let H=k.attributes,$=z.getAttributes(),V=C.defaultAttributeValues;for(let ne in $){let G=$[ne];if(G.location>=0){let ge=H[ne];if(ge===void 0&&(ne==="instanceMatrix"&&y.instanceMatrix&&(ge=y.instanceMatrix),ne==="instanceColor"&&y.instanceColor&&(ge=y.instanceColor)),ge!==void 0){let we=ge.normalized,be=ge.itemSize,Ye=e.get(ge);if(Ye===void 0)continue;let tt=Ye.buffer,W=Ye.type,ie=Ye.bytesPerElement,Se=W===i.INT||W===i.UNSIGNED_INT||ge.gpuType===fh;if(ge.isInterleavedBufferAttribute){let le=ge.data,He=le.stride,Ge=ge.offset;if(le.isInstancedInterleavedBuffer){for(let Be=0;Be<G.locationSize;Be++)m(G.location+Be,le.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Be=0;Be<G.locationSize;Be++)p(G.location+Be);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let Be=0;Be<G.locationSize;Be++)v(G.location+Be,be/G.locationSize,W,we,He*ie,(Ge+be/G.locationSize*Be)*ie,Se)}else{if(ge.isInstancedBufferAttribute){for(let le=0;le<G.locationSize;le++)m(G.location+le,ge.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let le=0;le<G.locationSize;le++)p(G.location+le);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let le=0;le<G.locationSize;le++)v(G.location+le,be/G.locationSize,W,we,be*ie,be/G.locationSize*le*ie,Se)}}else if(V!==void 0){let we=V[ne];if(we!==void 0)switch(we.length){case 2:i.vertexAttrib2fv(G.location,we);break;case 3:i.vertexAttrib3fv(G.location,we);break;case 4:i.vertexAttrib4fv(G.location,we);break;default:i.vertexAttrib1fv(G.location,we)}}}}S()}function D(){L();for(let y in n){let C=n[y];for(let z in C){let k=C[z];for(let H in k)u(k[H].object),delete k[H];delete C[z]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;let C=n[y.id];for(let z in C){let k=C[z];for(let H in k)u(k[H].object),delete k[H];delete C[z]}delete n[y.id]}function A(y){for(let C in n){let z=n[C];if(z[y.id]===void 0)continue;let k=z[y.id];for(let H in k)u(k[H].object),delete k[H];delete z[y.id]}}function L(){M(),a=!0,s!==r&&(s=r,c(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:L,resetDefaultState:M,dispose:D,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:p,disableUnusedAttributes:S}}function Gx(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function o(c,u,d){if(d===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let f=0;f<d;f++)this.render(c[f],u[f]);else{h.multiDrawArraysWEBGL(n,c,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];t.update(f,n,1)}}function l(c,u,d,h){if(d===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],u[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x];for(let x=0;x<h.length;x++)t.update(g,n,h[x])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Wx(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==On&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let A=T===uo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Ei&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==ni&&!A)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=f>0,D=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:x,maxAttributes:p,maxVertexUniforms:m,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:b,maxSamples:D}}function qx(i){let e=this,t=null,n=0,r=!1,s=!1,a=new ti,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||r;return r=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let g=d.clippingPlanes,x=d.clipIntersection,p=d.clipShadows,m=i.get(d);if(!r||g===null||g.length===0||s&&!p)s?u(null):c();else{let S=s?0:n,v=S*4,b=m.clippingState||null;l.value=b,b=u(g,h,v,f);for(let D=0;D!==v;++D)b[D]=t[D];m.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,g){let x=d!==null?d.length:0,p=null;if(x!==0){if(p=l.value,g!==!0||p===null){let m=f+x*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,b=f;v!==x;++v,b+=4)a.copy(d[v]).applyMatrix4(S,o),a.normal.toArray(p,b),p[b+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}function $x(i){let e=new WeakMap;function t(a,o){return o===Jl?a.mapping=Fr:o===Kl&&(a.mapping=kr),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Jl||o===Kl)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new ac(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){let o=a.target;o.removeEventListener("dispose",r);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var za=class extends Oa{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Pr=4,Pd=[.125,.215,.35,.446,.526,.582],$i=20,Ol=new za,Id=new ke,Bl=null,zl=0,Hl=0,Vl=!1,Wi=(1+Math.sqrt(5))/2,Mr=1/Wi,Ld=[new I(-Wi,Mr,0),new I(Wi,Mr,0),new I(-Mr,0,Wi),new I(Mr,0,Wi),new I(0,Wi,-Mr),new I(0,Wi,Mr),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],Ha=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Bl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),Hl=this._renderer.getActiveMipmapLevel(),Vl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ud(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Bl,zl,Hl),this._renderer.xr.enabled=Vl,e.scissorTest=!1,xa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Fr||e.mapping===kr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),Hl=this._renderer.getActiveMipmapLevel(),Vl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pn,minFilter:Pn,generateMipmaps:!1,type:uo,format:On,colorSpace:Pi,depthBuffer:!1},r=Dd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dd(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xx(s)),this._blurMaterial=Yx(s,e,t)}return r}_compileMaterial(e){let t=new St(this._lodPlanes[0],e);this._renderer.compile(t,Ol)}_sceneToCubeUV(e,t,n,r){let o=new rn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Id),u.toneMapping=Si,u.autoClear=!1;let f=new Hn({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),g=new St(new bn,f),x=!1,p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,x=!0):(f.color.copy(Id),x=!0);for(let m=0;m<6;m++){let S=m%3;S===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):S===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));let v=this._cubeSize;xa(r,S*v,m>2?v:0,v,v),u.setRenderTarget(r),x&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Fr||e.mapping===kr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ud());let s=r?this._cubemapMaterial:this._equirectMaterial,a=new St(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;xa(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Ol)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ld[(r-s-1)%Ld.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new St(this._lodPlanes[r],c),h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*$i-1),x=s/g,p=isFinite(s)?1+Math.floor(u*x):$i;p>$i&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${$i}`);let m=[],S=0;for(let A=0;A<$i;++A){let L=A/x,M=Math.exp(-L*L/2);m.push(M),A===0?S+=M:A<p&&(S+=2*M)}for(let A=0;A<m.length;A++)m[A]=m[A]/S;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:v}=this;h.dTheta.value=g,h.mipInt.value=v-n;let b=this._sizeLods[r],D=3*b*(r>v-Pr?r-v+Pr:0),T=4*(this._cubeSize-b);xa(t,D,T,3*b,2*b),l.setRenderTarget(t),l.render(d,Ol)}};function Xx(i){let e=[],t=[],n=[],r=i,s=i-Pr+1+Pd.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);t.push(o);let l=1/o;a>i-Pr?l=Pd[a-i+Pr-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,x=3,p=2,m=1,S=new Float32Array(x*g*f),v=new Float32Array(p*g*f),b=new Float32Array(m*g*f);for(let T=0;T<f;T++){let A=T%3*2/3-1,L=T>2?0:-1,M=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];S.set(M,x*g*T),v.set(h,p*g*T);let y=[T,T,T,T,T,T];b.set(y,m*g*T)}let D=new Ot;D.setAttribute("position",new Zt(S,x)),D.setAttribute("uv",new Zt(v,p)),D.setAttribute("faceIndex",new Zt(b,m)),e.push(D),r>Pr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Dd(i,e,t){let n=new si(i,e,t);return n.texture.mapping=co,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xa(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Yx(i,e,t){let n=new Float32Array($i),r=new I(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:$i,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:$c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Ud(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Nd(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function $c(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Zx(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Jl||l===Kl,u=l===Fr||l===kr;if(c||u){let d=e.get(o),h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Ha(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{let f=o.image;return c&&f&&f.height>0||u&&f&&r(f)?(t===null&&(t=new Ha(i)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function jx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&qc("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Jx(i,e,t,n){let r={},s=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let g in h.attributes)e.remove(h.attributes[g]);for(let g in h.morphAttributes){let x=h.morphAttributes[g];for(let p=0,m=x.length;p<m;p++)e.remove(x[p])}h.removeEventListener("dispose",a),delete r[h.id];let f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let g in h)e.update(h[g],i.ARRAY_BUFFER);let f=d.morphAttributes;for(let g in f){let x=f[g];for(let p=0,m=x.length;p<m;p++)e.update(x[p],i.ARRAY_BUFFER)}}function c(d){let h=[],f=d.index,g=d.attributes.position,x=0;if(f!==null){let S=f.array;x=f.version;for(let v=0,b=S.length;v<b;v+=3){let D=S[v+0],T=S[v+1],A=S[v+2];h.push(D,T,T,A,A,D)}}else if(g!==void 0){let S=g.array;x=g.version;for(let v=0,b=S.length/3-1;v<b;v+=3){let D=v+0,T=v+1,A=v+2;h.push(D,T,T,A,A,D)}}else return;let p=new(Sh(h)?ka:Fa)(h,1);p.version=x;let m=s.get(d);m&&e.remove(m),s.set(d,p)}function u(d){let h=s.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Kx(i,e,t){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,s,h*a),t.update(f,n,1)}function c(h,f,g){g!==0&&(i.drawElementsInstanced(n,f,s,h*a,g),t.update(f,n,g))}function u(h,f,g){if(g===0)return;let x=e.get("WEBGL_multi_draw");if(x===null)for(let p=0;p<g;p++)this.render(h[p]/a,f[p]);else{x.multiDrawElementsWEBGL(n,f,0,s,h,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];t.update(p,n,1)}}function d(h,f,g,x){if(g===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<h.length;m++)c(h[m]/a,f[m],x[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,s,h,0,x,0,g);let m=0;for(let S=0;S<g;S++)m+=f[S];for(let S=0;S<x.length;S++)t.update(m,n,x[S])}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Qx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function e0(i,e,t){let n=new WeakMap,r=new kt;function s(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==d){let M=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",M)};h!==void 0&&h.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],v=0;f===!0&&(v=1),g===!0&&(v=2),x===!0&&(v=3);let b=o.attributes.position.count*v,D=1;b>e.maxTextureSize&&(D=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let T=new Float32Array(b*D*4*d),A=new Ua(T,b,D,d);A.type=ni,A.needsUpdate=!0;let L=v*4;for(let y=0;y<d;y++){let C=p[y],z=m[y],k=S[y],H=b*D*4*y;for(let $=0;$<C.count;$++){let V=$*L;f===!0&&(r.fromBufferAttribute(C,$),T[H+V+0]=r.x,T[H+V+1]=r.y,T[H+V+2]=r.z,T[H+V+3]=0),g===!0&&(r.fromBufferAttribute(z,$),T[H+V+4]=r.x,T[H+V+5]=r.y,T[H+V+6]=r.z,T[H+V+7]=0),x===!0&&(r.fromBufferAttribute(k,$),T[H+V+8]=r.x,T[H+V+9]=r.y,T[H+V+10]=r.z,T[H+V+11]=k.itemSize===4?r.w:1)}}h={count:d,texture:A,size:new ee(b,D)},n.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function t0(i,e,t,n){let r=new WeakMap;function s(l){let c=n.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return d}function a(){r=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}var Va=class extends sn{constructor(e,t,n,r,s,a,o,l,c,u=Dr){if(u!==Dr&&u!==zr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Dr&&(n=Or),n===void 0&&u===zr&&(n=Br),super(null,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:on,this.minFilter=l!==void 0?l:on,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Th=new sn,Ah=new Va(1,1);Ah.compareFunction=bh;var Ch=new Ua,Rh=new rc,Ph=new Ba,Fd=[],kd=[],Od=new Float32Array(16),Bd=new Float32Array(9),zd=new Float32Array(4);function Xr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=Fd[r];if(s===void 0&&(s=new Float32Array(r),Fd[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function It(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function fo(i,e){let t=kd[e];t===void 0&&(t=new Int32Array(e),kd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function n0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function i0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2fv(this.addr,e),It(t,e)}}function r0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;i.uniform3fv(this.addr,e),It(t,e)}}function s0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4fv(this.addr,e),It(t,e)}}function a0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;zd.set(n),i.uniformMatrix2fv(this.addr,!1,zd),It(t,n)}}function o0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;Bd.set(n),i.uniformMatrix3fv(this.addr,!1,Bd),It(t,n)}}function l0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;Od.set(n),i.uniformMatrix4fv(this.addr,!1,Od),It(t,n)}}function c0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function u0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2iv(this.addr,e),It(t,e)}}function d0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3iv(this.addr,e),It(t,e)}}function h0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4iv(this.addr,e),It(t,e)}}function f0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function p0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2uiv(this.addr,e),It(t,e)}}function m0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3uiv(this.addr,e),It(t,e)}}function g0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4uiv(this.addr,e),It(t,e)}}function x0(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s=this.type===i.SAMPLER_2D_SHADOW?Ah:Th;t.setTexture2D(e||s,r)}function v0(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Rh,r)}function y0(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Ph,r)}function _0(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Ch,r)}function b0(i){switch(i){case 5126:return n0;case 35664:return i0;case 35665:return r0;case 35666:return s0;case 35674:return a0;case 35675:return o0;case 35676:return l0;case 5124:case 35670:return c0;case 35667:case 35671:return u0;case 35668:case 35672:return d0;case 35669:case 35673:return h0;case 5125:return f0;case 36294:return p0;case 36295:return m0;case 36296:return g0;case 35678:case 36198:case 36298:case 36306:case 35682:return x0;case 35679:case 36299:case 36307:return v0;case 35680:case 36300:case 36308:case 36293:return y0;case 36289:case 36303:case 36311:case 36292:return _0}}function S0(i,e){i.uniform1fv(this.addr,e)}function w0(i,e){let t=Xr(e,this.size,2);i.uniform2fv(this.addr,t)}function M0(i,e){let t=Xr(e,this.size,3);i.uniform3fv(this.addr,t)}function E0(i,e){let t=Xr(e,this.size,4);i.uniform4fv(this.addr,t)}function T0(i,e){let t=Xr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function A0(i,e){let t=Xr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function C0(i,e){let t=Xr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function R0(i,e){i.uniform1iv(this.addr,e)}function P0(i,e){i.uniform2iv(this.addr,e)}function I0(i,e){i.uniform3iv(this.addr,e)}function L0(i,e){i.uniform4iv(this.addr,e)}function D0(i,e){i.uniform1uiv(this.addr,e)}function U0(i,e){i.uniform2uiv(this.addr,e)}function N0(i,e){i.uniform3uiv(this.addr,e)}function F0(i,e){i.uniform4uiv(this.addr,e)}function k0(i,e,t){let n=this.cache,r=e.length,s=fo(t,r);Pt(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Th,s[a])}function O0(i,e,t){let n=this.cache,r=e.length,s=fo(t,r);Pt(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Rh,s[a])}function B0(i,e,t){let n=this.cache,r=e.length,s=fo(t,r);Pt(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Ph,s[a])}function z0(i,e,t){let n=this.cache,r=e.length,s=fo(t,r);Pt(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Ch,s[a])}function H0(i){switch(i){case 5126:return S0;case 35664:return w0;case 35665:return M0;case 35666:return E0;case 35674:return T0;case 35675:return A0;case 35676:return C0;case 5124:case 35670:return R0;case 35667:case 35671:return P0;case 35668:case 35672:return I0;case 35669:case 35673:return L0;case 5125:return D0;case 36294:return U0;case 36295:return N0;case 36296:return F0;case 35678:case 36198:case 36298:case 36306:case 35682:return k0;case 35679:case 36299:case 36307:return O0;case 35680:case 36300:case 36308:case 36293:return B0;case 36289:case 36303:case 36311:case 36292:return z0}}var oc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=b0(t.type)}},lc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=H0(t.type)}},cc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},Gl=/(\w+)(\])?(\[|\.)?/g;function Hd(i,e){i.seq.push(e),i.map[e.id]=e}function V0(i,e,t){let n=i.name,r=n.length;for(Gl.lastIndex=0;;){let s=Gl.exec(n),a=Gl.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Hd(t,c===void 0?new oc(o,i,e):new lc(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new cc(o),Hd(t,d)),t=d}}}var Nr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);V0(s,a,this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function Vd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var G0=37297,W0=0;function q0(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function $0(i){let e=ut.getPrimaries(ut.workingColorSpace),t=ut.getPrimaries(i),n;switch(e===t?n="":e===Ia&&t===Pa?n="LinearDisplayP3ToLinearSRGB":e===Pa&&t===Ia&&(n="LinearSRGBToLinearDisplayP3"),i){case Pi:case ho:return[n,"LinearTransferOETF"];case Ft:case Gc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Gd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+q0(i.getShaderSource(e),a)}else return r}function X0(i,e){let t=$0(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Y0(i,e){let t;switch(e){case Jf:t="Linear";break;case Kf:t="Reinhard";break;case Qf:t="OptimizedCineon";break;case Vc:t="ACESFilmic";break;case tp:t="AgX";break;case np:t="Neutral";break;case ep:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Z0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vs).join(`
`)}function j0(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function J0(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function vs(i){return i!==""}function Wd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function qd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var K0=/^[ \t]*#include +<([\w\d./]+)>/gm;function uc(i){return i.replace(K0,ev)}var Q0=new Map;function ev(i,e){let t=qe[e];if(t===void 0){let n=Q0.get(e);if(n!==void 0)t=qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return uc(t)}var tv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $d(i){return i.replace(tv,nv)}function nv(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Xd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function iv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===uh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Hc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ei&&(e="SHADOWMAP_TYPE_VSM"),e}function rv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Fr:case kr:e="ENVMAP_TYPE_CUBE";break;case co:e="ENVMAP_TYPE_CUBE_UV";break}return e}function sv(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===kr&&(e="ENVMAP_MODE_REFRACTION"),e}function av(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case dh:e="ENVMAP_BLENDING_MULTIPLY";break;case Zf:e="ENVMAP_BLENDING_MIX";break;case jf:e="ENVMAP_BLENDING_ADD";break}return e}function ov(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function lv(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=iv(t),c=rv(t),u=sv(t),d=av(t),h=ov(t),f=Z0(t),g=j0(s),x=r.createProgram(),p,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(vs).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(vs).join(`
`),m.length>0&&(m+=`
`)):(p=[Xd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vs).join(`
`),m=[Xd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Si?"#define TONE_MAPPING":"",t.toneMapping!==Si?qe.tonemapping_pars_fragment:"",t.toneMapping!==Si?Y0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,X0("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(vs).join(`
`)),a=uc(a),a=Wd(a,t),a=qd(a,t),o=uc(o),o=Wd(o,t),o=qd(o,t),a=$d(a),o=$d(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===cd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===cd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let v=S+p+a,b=S+m+o,D=Vd(r,r.VERTEX_SHADER,v),T=Vd(r,r.FRAGMENT_SHADER,b);r.attachShader(x,D),r.attachShader(x,T),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(C){if(i.debug.checkShaderErrors){let z=r.getProgramInfoLog(x).trim(),k=r.getShaderInfoLog(D).trim(),H=r.getShaderInfoLog(T).trim(),$=!0,V=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,D,T);else{let ne=Gd(r,D,"vertex"),G=Gd(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+z+`
`+ne+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(k===""||H==="")&&(V=!1);V&&(C.diagnostics={runnable:$,programLog:z,vertexShader:{log:k,prefix:p},fragmentShader:{log:H,prefix:m}})}r.deleteShader(D),r.deleteShader(T),L=new Nr(r,x),M=J0(r,x)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(x,G0)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=W0++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=D,this.fragmentShader=T,this}var cv=0,dc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new hc(e),t.set(e,n)),n}},hc=class{constructor(e){this.id=cv++,this.code=e,this.usedTimes=0}};function uv(i,e,t,n,r,s,a){let o=new As,l=new dc,c=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures,f=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return c.add(M),M===0?"uv":`uv${M}`}function p(M,y,C,z,k){let H=z.fog,$=k.geometry,V=M.isMeshStandardMaterial?z.environment:null,ne=(M.isMeshStandardMaterial?t:e).get(M.envMap||V),G=ne&&ne.mapping===co?ne.image.height:null,ge=g[M.type];M.precision!==null&&(f=r.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let we=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,be=we!==void 0?we.length:0,Ye=0;$.morphAttributes.position!==void 0&&(Ye=1),$.morphAttributes.normal!==void 0&&(Ye=2),$.morphAttributes.color!==void 0&&(Ye=3);let tt,W,ie,Se;if(ge){let dt=kn[ge];tt=dt.vertexShader,W=dt.fragmentShader}else tt=M.vertexShader,W=M.fragmentShader,l.update(M),ie=l.getVertexShaderID(M),Se=l.getFragmentShaderID(M);let le=i.getRenderTarget(),He=k.isInstancedMesh===!0,Ge=k.isBatchedMesh===!0,Be=!!M.map,R=!!M.matcap,X=!!ne,J=!!M.aoMap,re=!!M.lightMap,Q=!!M.bumpMap,te=!!M.normalMap,xe=!!M.displacementMap,pe=!!M.emissiveMap,ze=!!M.metalnessMap,E=!!M.roughnessMap,_=M.anisotropy>0,B=M.clearcoat>0,j=M.dispersion>0,Z=M.iridescence>0,K=M.sheen>0,Ce=M.transmission>0,ue=_&&!!M.anisotropyMap,he=B&&!!M.clearcoatMap,We=B&&!!M.clearcoatNormalMap,se=B&&!!M.clearcoatRoughnessMap,Ee=Z&&!!M.iridescenceMap,Je=Z&&!!M.iridescenceThicknessMap,Ne=K&&!!M.sheenColorMap,me=K&&!!M.sheenRoughnessMap,Ze=!!M.specularMap,Ke=!!M.specularColorMap,wt=!!M.specularIntensityMap,P=Ce&&!!M.transmissionMap,ve=Ce&&!!M.thicknessMap,q=!!M.gradientMap,Y=!!M.alphaMap,oe=M.alphaTest>0,Fe=!!M.alphaHash,nt=!!M.extensions,Mt=Si;M.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(Mt=i.toneMapping);let Dt={shaderID:ge,shaderType:M.type,shaderName:M.name,vertexShader:tt,fragmentShader:W,defines:M.defines,customVertexShaderID:ie,customFragmentShaderID:Se,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Ge,batchingColor:Ge&&k._colorsTexture!==null,instancing:He,instancingColor:He&&k.instanceColor!==null,instancingMorph:He&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:le===null?i.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Pi,alphaToCoverage:!!M.alphaToCoverage,map:Be,matcap:R,envMap:X,envMapMode:X&&ne.mapping,envMapCubeUVHeight:G,aoMap:J,lightMap:re,bumpMap:Q,normalMap:te,displacementMap:h&&xe,emissiveMap:pe,normalMapObjectSpace:te&&M.normalMapType===mp,normalMapTangentSpace:te&&M.normalMapType===_h,metalnessMap:ze,roughnessMap:E,anisotropy:_,anisotropyMap:ue,clearcoat:B,clearcoatMap:he,clearcoatNormalMap:We,clearcoatRoughnessMap:se,dispersion:j,iridescence:Z,iridescenceMap:Ee,iridescenceThicknessMap:Je,sheen:K,sheenColorMap:Ne,sheenRoughnessMap:me,specularMap:Ze,specularColorMap:Ke,specularIntensityMap:wt,transmission:Ce,transmissionMap:P,thicknessMap:ve,gradientMap:q,opaque:M.transparent===!1&&M.blending===Lr&&M.alphaToCoverage===!1,alphaMap:Y,alphaTest:oe,alphaHash:Fe,combine:M.combine,mapUv:Be&&x(M.map.channel),aoMapUv:J&&x(M.aoMap.channel),lightMapUv:re&&x(M.lightMap.channel),bumpMapUv:Q&&x(M.bumpMap.channel),normalMapUv:te&&x(M.normalMap.channel),displacementMapUv:xe&&x(M.displacementMap.channel),emissiveMapUv:pe&&x(M.emissiveMap.channel),metalnessMapUv:ze&&x(M.metalnessMap.channel),roughnessMapUv:E&&x(M.roughnessMap.channel),anisotropyMapUv:ue&&x(M.anisotropyMap.channel),clearcoatMapUv:he&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:We&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:me&&x(M.sheenRoughnessMap.channel),specularMapUv:Ze&&x(M.specularMap.channel),specularColorMapUv:Ke&&x(M.specularColorMap.channel),specularIntensityMapUv:wt&&x(M.specularIntensityMap.channel),transmissionMapUv:P&&x(M.transmissionMap.channel),thicknessMapUv:ve&&x(M.thicknessMap.channel),alphaMapUv:Y&&x(M.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(te||_),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!$.attributes.uv&&(Be||Y),fog:!!H,useFog:M.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:k.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:Ye,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Mt,decodeVideoTexture:Be&&M.map.isVideoTexture===!0&&ut.getTransfer(M.map.colorSpace)===xt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Rn,flipSided:M.side===ln,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:nt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:nt&&M.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Dt.vertexUv1s=c.has(1),Dt.vertexUv2s=c.has(2),Dt.vertexUv3s=c.has(3),c.clear(),Dt}function m(M){let y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(let C in M.defines)y.push(C),y.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(S(y,M),v(y,M),y.push(i.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function S(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function v(M,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.skinning&&o.enable(4),y.morphTargets&&o.enable(5),y.morphNormals&&o.enable(6),y.morphColors&&o.enable(7),y.premultipliedAlpha&&o.enable(8),y.shadowMapEnabled&&o.enable(9),y.doubleSided&&o.enable(10),y.flipSided&&o.enable(11),y.useDepthPacking&&o.enable(12),y.dithering&&o.enable(13),y.transmission&&o.enable(14),y.sheen&&o.enable(15),y.opaque&&o.enable(16),y.pointsUvs&&o.enable(17),y.decodeVideoTexture&&o.enable(18),y.alphaToCoverage&&o.enable(19),M.push(o.mask)}function b(M){let y=g[M.type],C;if(y){let z=kn[y];C=tm.clone(z.uniforms)}else C=M.uniforms;return C}function D(M,y){let C;for(let z=0,k=u.length;z<k;z++){let H=u[z];if(H.cacheKey===y){C=H,++C.usedTimes;break}}return C===void 0&&(C=new lv(i,y,M,s),u.push(C)),C}function T(M){if(--M.usedTimes===0){let y=u.indexOf(M);u[y]=u[u.length-1],u.pop(),M.destroy()}}function A(M){l.remove(M)}function L(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:b,acquireProgram:D,releaseProgram:T,releaseShaderCache:A,programs:u,dispose:L}}function dv(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function hv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Yd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Zd(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d,h,f,g,x,p){let m=i[e];return m===void 0?(m={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:x,group:p},i[e]=m):(m.id=d.id,m.object=d,m.geometry=h,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=x,m.group=p),e++,m}function o(d,h,f,g,x,p){let m=a(d,h,f,g,x,p);f.transmission>0?n.push(m):f.transparent===!0?r.push(m):t.push(m)}function l(d,h,f,g,x,p){let m=a(d,h,f,g,x,p);f.transmission>0?n.unshift(m):f.transparent===!0?r.unshift(m):t.unshift(m)}function c(d,h){t.length>1&&t.sort(d||hv),n.length>1&&n.sort(h||Yd),r.length>1&&r.sort(h||Yd)}function u(){for(let d=e,h=i.length;d<h;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function fv(){let i=new WeakMap;function e(n,r){let s=i.get(n),a;return s===void 0?(a=new Zd,i.set(n,[a])):r>=s.length?(a=new Zd,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function pv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new ke};break;case"SpotLight":t={position:new I,direction:new I,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function mv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var gv=0;function xv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function vv(i){let e=new pv,t=mv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let r=new I,s=new pt,a=new pt;function o(c){let u=0,d=0,h=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,x=0,p=0,m=0,S=0,v=0,b=0,D=0,T=0,A=0;c.sort(xv);for(let M=0,y=c.length;M<y;M++){let C=c[M],z=C.color,k=C.intensity,H=C.distance,$=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=z.r*k,d+=z.g*k,h+=z.b*k;else if(C.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(C.sh.coefficients[V],k);A++}else if(C.isDirectionalLight){let V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let ne=C.shadow,G=t.get(C);G.shadowBias=ne.bias,G.shadowNormalBias=ne.normalBias,G.shadowRadius=ne.radius,G.shadowMapSize=ne.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=C.shadow.matrix,S++}n.directional[f]=V,f++}else if(C.isSpotLight){let V=e.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(z).multiplyScalar(k),V.distance=H,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,n.spot[x]=V;let ne=C.shadow;if(C.map&&(n.spotLightMap[D]=C.map,D++,ne.updateMatrices(C),C.castShadow&&T++),n.spotLightMatrix[x]=ne.matrix,C.castShadow){let G=t.get(C);G.shadowBias=ne.bias,G.shadowNormalBias=ne.normalBias,G.shadowRadius=ne.radius,G.shadowMapSize=ne.mapSize,n.spotShadow[x]=G,n.spotShadowMap[x]=$,b++}x++}else if(C.isRectAreaLight){let V=e.get(C);V.color.copy(z).multiplyScalar(k),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),n.rectArea[p]=V,p++}else if(C.isPointLight){let V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){let ne=C.shadow,G=t.get(C);G.shadowBias=ne.bias,G.shadowNormalBias=ne.normalBias,G.shadowRadius=ne.radius,G.shadowMapSize=ne.mapSize,G.shadowCameraNear=ne.camera.near,G.shadowCameraFar=ne.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=C.shadow.matrix,v++}n.point[g]=V,g++}else if(C.isHemisphereLight){let V=e.get(C);V.skyColor.copy(C.color).multiplyScalar(k),V.groundColor.copy(C.groundColor).multiplyScalar(k),n.hemi[m]=V,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let L=n.hash;(L.directionalLength!==f||L.pointLength!==g||L.spotLength!==x||L.rectAreaLength!==p||L.hemiLength!==m||L.numDirectionalShadows!==S||L.numPointShadows!==v||L.numSpotShadows!==b||L.numSpotMaps!==D||L.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=b+D-T,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,L.directionalLength=f,L.pointLength=g,L.spotLength=x,L.rectAreaLength=p,L.hemiLength=m,L.numDirectionalShadows=S,L.numPointShadows=v,L.numSpotShadows=b,L.numSpotMaps=D,L.numLightProbes=A,n.version=gv++)}function l(c,u){let d=0,h=0,f=0,g=0,x=0,p=u.matrixWorldInverse;for(let m=0,S=c.length;m<S;m++){let v=c[m];if(v.isDirectionalLight){let b=n.directional[d];b.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),d++}else if(v.isSpotLight){let b=n.spot[f];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),f++}else if(v.isRectAreaLight){let b=n.rectArea[g];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),a.identity(),s.copy(v.matrixWorld),s.premultiply(p),a.extractRotation(s),b.halfWidth.set(v.width*.5,0,0),b.halfHeight.set(0,v.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){let b=n.point[h];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),h++}else if(v.isHemisphereLight){let b=n.hemi[x];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(p),x++}}}return{setup:o,setupView:l,state:n}}function jd(i){let e=new vv(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function yv(i){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new jd(i),e.set(r,[o])):s>=a.length?(o=new jd(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var fc=class extends Ci{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},pc=class extends Ci{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},_v=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Sv(i,e,t){let n=new Cs,r=new ee,s=new ee,a=new kt,o=new fc({depthPacking:pp}),l=new pc,c={},u=t.maxTextureSize,d={[Mi]:ln,[ln]:Mi,[Rn]:Rn},h=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ee},radius:{value:4}},vertexShader:_v,fragmentShader:bv}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ot;g.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new St(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=uh;let m=this.type;this.render=function(T,A,L){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;let M=i.getRenderTarget(),y=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),z=i.state;z.setBlending(bi),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let k=m!==ei&&this.type===ei,H=m===ei&&this.type!==ei;for(let $=0,V=T.length;$<V;$++){let ne=T[$],G=ne.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);let ge=G.getFrameExtents();if(r.multiply(ge),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ge.x),r.x=s.x*ge.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ge.y),r.y=s.y*ge.y,G.mapSize.y=s.y)),G.map===null||k===!0||H===!0){let be=this.type!==ei?{minFilter:on,magFilter:on}:{};G.map!==null&&G.map.dispose(),G.map=new si(r.x,r.y,be),G.map.texture.name=ne.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();let we=G.getViewportCount();for(let be=0;be<we;be++){let Ye=G.getViewport(be);a.set(s.x*Ye.x,s.y*Ye.y,s.x*Ye.z,s.y*Ye.w),z.viewport(a),G.updateMatrices(ne,be),n=G.getFrustum(),b(A,L,G.camera,ne,this.type)}G.isPointLightShadow!==!0&&this.type===ei&&S(G,L),G.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(M,y,C)};function S(T,A){let L=e.update(x);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new si(r.x,r.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,L,h,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,L,f,x,null)}function v(T,A,L,M){let y=null,C=L.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)y=C;else if(y=L.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let z=y.uuid,k=A.uuid,H=c[z];H===void 0&&(H={},c[z]=H);let $=H[k];$===void 0&&($=y.clone(),H[k]=$,A.addEventListener("dispose",D)),y=$}if(y.visible=A.visible,y.wireframe=A.wireframe,M===ei?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:d[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let z=i.properties.get(y);z.light=L}return y}function b(T,A,L,M,y){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===ei)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);let k=e.update(T),H=T.material;if(Array.isArray(H)){let $=k.groups;for(let V=0,ne=$.length;V<ne;V++){let G=$[V],ge=H[G.materialIndex];if(ge&&ge.visible){let we=v(T,ge,M,y);T.onBeforeShadow(i,T,A,L,k,we,G),i.renderBufferDirect(L,null,k,we,T,G),T.onAfterShadow(i,T,A,L,k,we,G)}}}else if(H.visible){let $=v(T,H,M,y);T.onBeforeShadow(i,T,A,L,k,$,null),i.renderBufferDirect(L,null,k,$,T,null),T.onAfterShadow(i,T,A,L,k,$,null)}}let z=T.children;for(let k=0,H=z.length;k<H;k++)b(z[k],A,L,M,y)}function D(T){T.target.removeEventListener("dispose",D);for(let L in c){let M=c[L],y=T.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}function wv(i){function e(){let P=!1,ve=new kt,q=null,Y=new kt(0,0,0,0);return{setMask:function(oe){q!==oe&&!P&&(i.colorMask(oe,oe,oe,oe),q=oe)},setLocked:function(oe){P=oe},setClear:function(oe,Fe,nt,Mt,Dt){Dt===!0&&(oe*=Mt,Fe*=Mt,nt*=Mt),ve.set(oe,Fe,nt,Mt),Y.equals(ve)===!1&&(i.clearColor(oe,Fe,nt,Mt),Y.copy(ve))},reset:function(){P=!1,q=null,Y.set(-1,0,0,0)}}}function t(){let P=!1,ve=null,q=null,Y=null;return{setTest:function(oe){oe?Se(i.DEPTH_TEST):le(i.DEPTH_TEST)},setMask:function(oe){ve!==oe&&!P&&(i.depthMask(oe),ve=oe)},setFunc:function(oe){if(q!==oe){switch(oe){case Vf:i.depthFunc(i.NEVER);break;case Gf:i.depthFunc(i.ALWAYS);break;case Wf:i.depthFunc(i.LESS);break;case Ta:i.depthFunc(i.LEQUAL);break;case qf:i.depthFunc(i.EQUAL);break;case $f:i.depthFunc(i.GEQUAL);break;case Xf:i.depthFunc(i.GREATER);break;case Yf:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}q=oe}},setLocked:function(oe){P=oe},setClear:function(oe){Y!==oe&&(i.clearDepth(oe),Y=oe)},reset:function(){P=!1,ve=null,q=null,Y=null}}}function n(){let P=!1,ve=null,q=null,Y=null,oe=null,Fe=null,nt=null,Mt=null,Dt=null;return{setTest:function(dt){P||(dt?Se(i.STENCIL_TEST):le(i.STENCIL_TEST))},setMask:function(dt){ve!==dt&&!P&&(i.stencilMask(dt),ve=dt)},setFunc:function(dt,Nn,Fn){(q!==dt||Y!==Nn||oe!==Fn)&&(i.stencilFunc(dt,Nn,Fn),q=dt,Y=Nn,oe=Fn)},setOp:function(dt,Nn,Fn){(Fe!==dt||nt!==Nn||Mt!==Fn)&&(i.stencilOp(dt,Nn,Fn),Fe=dt,nt=Nn,Mt=Fn)},setLocked:function(dt){P=dt},setClear:function(dt){Dt!==dt&&(i.clearStencil(dt),Dt=dt)},reset:function(){P=!1,ve=null,q=null,Y=null,oe=null,Fe=null,nt=null,Mt=null,Dt=null}}}let r=new e,s=new t,a=new n,o=new WeakMap,l=new WeakMap,c={},u={},d=new WeakMap,h=[],f=null,g=!1,x=null,p=null,m=null,S=null,v=null,b=null,D=null,T=new ke(0,0,0),A=0,L=!1,M=null,y=null,C=null,z=null,k=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,V=0,ne=i.getParameter(i.VERSION);ne.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(ne)[1]),$=V>=1):ne.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),$=V>=2);let G=null,ge={},we=i.getParameter(i.SCISSOR_BOX),be=i.getParameter(i.VIEWPORT),Ye=new kt().fromArray(we),tt=new kt().fromArray(be);function W(P,ve,q,Y){let oe=new Uint8Array(4),Fe=i.createTexture();i.bindTexture(P,Fe),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let nt=0;nt<q;nt++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(ve,0,i.RGBA,1,1,Y,0,i.RGBA,i.UNSIGNED_BYTE,oe):i.texImage2D(ve+nt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,oe);return Fe}let ie={};ie[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),ie[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ie[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),Se(i.DEPTH_TEST),s.setFunc(Ta),Q(!1),te(Pu),Se(i.CULL_FACE),J(bi);function Se(P){c[P]!==!0&&(i.enable(P),c[P]=!0)}function le(P){c[P]!==!1&&(i.disable(P),c[P]=!1)}function He(P,ve){return u[P]!==ve?(i.bindFramebuffer(P,ve),u[P]=ve,P===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ve),P===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ve),!0):!1}function Ge(P,ve){let q=h,Y=!1;if(P){q=d.get(ve),q===void 0&&(q=[],d.set(ve,q));let oe=P.textures;if(q.length!==oe.length||q[0]!==i.COLOR_ATTACHMENT0){for(let Fe=0,nt=oe.length;Fe<nt;Fe++)q[Fe]=i.COLOR_ATTACHMENT0+Fe;q.length=oe.length,Y=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,Y=!0);Y&&i.drawBuffers(q)}function Be(P){return f!==P?(i.useProgram(P),f=P,!0):!1}let R={[qi]:i.FUNC_ADD,[Ef]:i.FUNC_SUBTRACT,[Tf]:i.FUNC_REVERSE_SUBTRACT};R[Af]=i.MIN,R[Cf]=i.MAX;let X={[Rf]:i.ZERO,[Pf]:i.ONE,[If]:i.SRC_COLOR,[Zl]:i.SRC_ALPHA,[kf]:i.SRC_ALPHA_SATURATE,[Nf]:i.DST_COLOR,[Df]:i.DST_ALPHA,[Lf]:i.ONE_MINUS_SRC_COLOR,[jl]:i.ONE_MINUS_SRC_ALPHA,[Ff]:i.ONE_MINUS_DST_COLOR,[Uf]:i.ONE_MINUS_DST_ALPHA,[Of]:i.CONSTANT_COLOR,[Bf]:i.ONE_MINUS_CONSTANT_COLOR,[zf]:i.CONSTANT_ALPHA,[Hf]:i.ONE_MINUS_CONSTANT_ALPHA};function J(P,ve,q,Y,oe,Fe,nt,Mt,Dt,dt){if(P===bi){g===!0&&(le(i.BLEND),g=!1);return}if(g===!1&&(Se(i.BLEND),g=!0),P!==Mf){if(P!==x||dt!==L){if((p!==qi||v!==qi)&&(i.blendEquation(i.FUNC_ADD),p=qi,v=qi),dt)switch(P){case Lr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ms:i.blendFunc(i.ONE,i.ONE);break;case Iu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Lu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Lr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ms:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Iu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Lu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}m=null,S=null,b=null,D=null,T.set(0,0,0),A=0,x=P,L=dt}return}oe=oe||ve,Fe=Fe||q,nt=nt||Y,(ve!==p||oe!==v)&&(i.blendEquationSeparate(R[ve],R[oe]),p=ve,v=oe),(q!==m||Y!==S||Fe!==b||nt!==D)&&(i.blendFuncSeparate(X[q],X[Y],X[Fe],X[nt]),m=q,S=Y,b=Fe,D=nt),(Mt.equals(T)===!1||Dt!==A)&&(i.blendColor(Mt.r,Mt.g,Mt.b,Dt),T.copy(Mt),A=Dt),x=P,L=!1}function re(P,ve){P.side===Rn?le(i.CULL_FACE):Se(i.CULL_FACE);let q=P.side===ln;ve&&(q=!q),Q(q),P.blending===Lr&&P.transparent===!1?J(bi):J(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),s.setFunc(P.depthFunc),s.setTest(P.depthTest),s.setMask(P.depthWrite),r.setMask(P.colorWrite);let Y=P.stencilWrite;a.setTest(Y),Y&&(a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),pe(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Se(i.SAMPLE_ALPHA_TO_COVERAGE):le(i.SAMPLE_ALPHA_TO_COVERAGE)}function Q(P){M!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),M=P)}function te(P){P!==Sf?(Se(i.CULL_FACE),P!==y&&(P===Pu?i.cullFace(i.BACK):P===wf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):le(i.CULL_FACE),y=P}function xe(P){P!==C&&($&&i.lineWidth(P),C=P)}function pe(P,ve,q){P?(Se(i.POLYGON_OFFSET_FILL),(z!==ve||k!==q)&&(i.polygonOffset(ve,q),z=ve,k=q)):le(i.POLYGON_OFFSET_FILL)}function ze(P){P?Se(i.SCISSOR_TEST):le(i.SCISSOR_TEST)}function E(P){P===void 0&&(P=i.TEXTURE0+H-1),G!==P&&(i.activeTexture(P),G=P)}function _(P,ve,q){q===void 0&&(G===null?q=i.TEXTURE0+H-1:q=G);let Y=ge[q];Y===void 0&&(Y={type:void 0,texture:void 0},ge[q]=Y),(Y.type!==P||Y.texture!==ve)&&(G!==q&&(i.activeTexture(q),G=q),i.bindTexture(P,ve||ie[P]),Y.type=P,Y.texture=ve)}function B(){let P=ge[G];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ce(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ue(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function he(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function We(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function se(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ee(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Je(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ne(P){Ye.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Ye.copy(P))}function me(P){tt.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),tt.copy(P))}function Ze(P,ve){let q=l.get(ve);q===void 0&&(q=new WeakMap,l.set(ve,q));let Y=q.get(P);Y===void 0&&(Y=i.getUniformBlockIndex(ve,P.name),q.set(P,Y))}function Ke(P,ve){let Y=l.get(ve).get(P);o.get(ve)!==Y&&(i.uniformBlockBinding(ve,Y,P.__bindingPointIndex),o.set(ve,Y))}function wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},G=null,ge={},u={},d=new WeakMap,h=[],f=null,g=!1,x=null,p=null,m=null,S=null,v=null,b=null,D=null,T=new ke(0,0,0),A=0,L=!1,M=null,y=null,C=null,z=null,k=null,Ye.set(0,0,i.canvas.width,i.canvas.height),tt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:Se,disable:le,bindFramebuffer:He,drawBuffers:Ge,useProgram:Be,setBlending:J,setMaterial:re,setFlipSided:Q,setCullFace:te,setLineWidth:xe,setPolygonOffset:pe,setScissorTest:ze,activeTexture:E,bindTexture:_,unbindTexture:B,compressedTexImage2D:j,compressedTexImage3D:Z,texImage2D:Ee,texImage3D:Je,updateUBOMapping:Ze,uniformBlockBinding:Ke,texStorage2D:We,texStorage3D:se,texSubImage2D:K,texSubImage3D:Ce,compressedTexSubImage2D:ue,compressedTexSubImage3D:he,scissor:Ne,viewport:me,reset:wt}}function Mv(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ee,u=new WeakMap,d,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,_){return f?new OffscreenCanvas(E,_):Ts("canvas")}function x(E,_,B){let j=1,Z=ze(E);if((Z.width>B||Z.height>B)&&(j=B/Math.max(Z.width,Z.height)),j<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let K=Math.floor(j*Z.width),Ce=Math.floor(j*Z.height);d===void 0&&(d=g(K,Ce));let ue=_?g(K,Ce):d;return ue.width=K,ue.height=Ce,ue.getContext("2d").drawImage(E,0,0,K,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+K+"x"+Ce+")."),ue}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),E;return E}function p(E){return E.generateMipmaps&&E.minFilter!==on&&E.minFilter!==Pn}function m(E){i.generateMipmap(E)}function S(E,_,B,j,Z=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let K=_;if(_===i.RED&&(B===i.FLOAT&&(K=i.R32F),B===i.HALF_FLOAT&&(K=i.R16F),B===i.UNSIGNED_BYTE&&(K=i.R8)),_===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.R8UI),B===i.UNSIGNED_SHORT&&(K=i.R16UI),B===i.UNSIGNED_INT&&(K=i.R32UI),B===i.BYTE&&(K=i.R8I),B===i.SHORT&&(K=i.R16I),B===i.INT&&(K=i.R32I)),_===i.RG&&(B===i.FLOAT&&(K=i.RG32F),B===i.HALF_FLOAT&&(K=i.RG16F),B===i.UNSIGNED_BYTE&&(K=i.RG8)),_===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RG8UI),B===i.UNSIGNED_SHORT&&(K=i.RG16UI),B===i.UNSIGNED_INT&&(K=i.RG32UI),B===i.BYTE&&(K=i.RG8I),B===i.SHORT&&(K=i.RG16I),B===i.INT&&(K=i.RG32I)),_===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),_===i.RGBA){let Ce=Z?Ra:ut.getTransfer(j);B===i.FLOAT&&(K=i.RGBA32F),B===i.HALF_FLOAT&&(K=i.RGBA16F),B===i.UNSIGNED_BYTE&&(K=Ce===xt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function v(E,_){let B;return E?_===null||_===Or||_===Br?B=i.DEPTH24_STENCIL8:_===ni?B=i.DEPTH32F_STENCIL8:_===Aa&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Or||_===Br?B=i.DEPTH_COMPONENT24:_===ni?B=i.DEPTH_COMPONENT32F:_===Aa&&(B=i.DEPTH_COMPONENT16),B}function b(E,_){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==on&&E.minFilter!==Pn?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function D(E){let _=E.target;_.removeEventListener("dispose",D),A(_),_.isVideoTexture&&u.delete(_)}function T(E){let _=E.target;_.removeEventListener("dispose",T),M(_)}function A(E){let _=n.get(E);if(_.__webglInit===void 0)return;let B=E.source,j=h.get(B);if(j){let Z=j[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&L(E),Object.keys(j).length===0&&h.delete(B)}n.remove(E)}function L(E){let _=n.get(E);i.deleteTexture(_.__webglTexture);let B=E.source,j=h.get(B);delete j[_.__cacheKey],a.memory.textures--}function M(E){let _=n.get(E);if(E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(_.__webglFramebuffer[j]))for(let Z=0;Z<_.__webglFramebuffer[j].length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[j][Z]);else i.deleteFramebuffer(_.__webglFramebuffer[j]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[j])}else{if(Array.isArray(_.__webglFramebuffer))for(let j=0;j<_.__webglFramebuffer.length;j++)i.deleteFramebuffer(_.__webglFramebuffer[j]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let j=0;j<_.__webglColorRenderbuffer.length;j++)_.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[j]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let B=E.textures;for(let j=0,Z=B.length;j<Z;j++){let K=n.get(B[j]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(B[j])}n.remove(E)}let y=0;function C(){y=0}function z(){let E=y;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),y+=1,E}function k(E){let _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function H(E,_){let B=n.get(E);if(E.isVideoTexture&&xe(E),E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){let j=E.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(B,E,_);return}}t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+_)}function $(E,_){let B=n.get(E);if(E.version>0&&B.__version!==E.version){tt(B,E,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+_)}function V(E,_){let B=n.get(E);if(E.version>0&&B.__version!==E.version){tt(B,E,_);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+_)}function ne(E,_){let B=n.get(E);if(E.version>0&&B.__version!==E.version){W(B,E,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+_)}let G={[ri]:i.REPEAT,[Xi]:i.CLAMP_TO_EDGE,[Ql]:i.MIRRORED_REPEAT},ge={[on]:i.NEAREST,[ip]:i.NEAREST_MIPMAP_NEAREST,[js]:i.NEAREST_MIPMAP_LINEAR,[Pn]:i.LINEAR,[fl]:i.LINEAR_MIPMAP_NEAREST,[Yi]:i.LINEAR_MIPMAP_LINEAR},we={[gp]:i.NEVER,[Sp]:i.ALWAYS,[xp]:i.LESS,[bh]:i.LEQUAL,[vp]:i.EQUAL,[bp]:i.GEQUAL,[yp]:i.GREATER,[_p]:i.NOTEQUAL};function be(E,_){if(_.type===ni&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Pn||_.magFilter===fl||_.magFilter===js||_.magFilter===Yi||_.minFilter===Pn||_.minFilter===fl||_.minFilter===js||_.minFilter===Yi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,G[_.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,G[_.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,G[_.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ge[_.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ge[_.minFilter]),_.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,we[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===on||_.minFilter!==js&&_.minFilter!==Yi||_.type===ni&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Ye(E,_){let B=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",D));let j=_.source,Z=h.get(j);Z===void 0&&(Z={},h.set(j,Z));let K=k(_);if(K!==E.__cacheKey){Z[K]===void 0&&(Z[K]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Z[K].usedTimes++;let Ce=Z[E.__cacheKey];Ce!==void 0&&(Z[E.__cacheKey].usedTimes--,Ce.usedTimes===0&&L(_)),E.__cacheKey=K,E.__webglTexture=Z[K].texture}return B}function tt(E,_,B){let j=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(j=i.TEXTURE_3D);let Z=Ye(E,_),K=_.source;t.bindTexture(j,E.__webglTexture,i.TEXTURE0+B);let Ce=n.get(K);if(K.version!==Ce.__version||Z===!0){t.activeTexture(i.TEXTURE0+B);let ue=ut.getPrimaries(ut.workingColorSpace),he=_.colorSpace===_i?null:ut.getPrimaries(_.colorSpace),We=_.colorSpace===_i||ue===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let se=x(_.image,!1,r.maxTextureSize);se=pe(_,se);let Ee=s.convert(_.format,_.colorSpace),Je=s.convert(_.type),Ne=S(_.internalFormat,Ee,Je,_.colorSpace,_.isVideoTexture);be(j,_);let me,Ze=_.mipmaps,Ke=_.isVideoTexture!==!0,wt=Ce.__version===void 0||Z===!0,P=K.dataReady,ve=b(_,se);if(_.isDepthTexture)Ne=v(_.format===zr,_.type),wt&&(Ke?t.texStorage2D(i.TEXTURE_2D,1,Ne,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,Ne,se.width,se.height,0,Ee,Je,null));else if(_.isDataTexture)if(Ze.length>0){Ke&&wt&&t.texStorage2D(i.TEXTURE_2D,ve,Ne,Ze[0].width,Ze[0].height);for(let q=0,Y=Ze.length;q<Y;q++)me=Ze[q],Ke?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,me.width,me.height,Ee,Je,me.data):t.texImage2D(i.TEXTURE_2D,q,Ne,me.width,me.height,0,Ee,Je,me.data);_.generateMipmaps=!1}else Ke?(wt&&t.texStorage2D(i.TEXTURE_2D,ve,Ne,se.width,se.height),P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,se.width,se.height,Ee,Je,se.data)):t.texImage2D(i.TEXTURE_2D,0,Ne,se.width,se.height,0,Ee,Je,se.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ke&&wt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,Ne,Ze[0].width,Ze[0].height,se.depth);for(let q=0,Y=Ze.length;q<Y;q++)if(me=Ze[q],_.format!==On)if(Ee!==null)if(Ke){if(P)if(_.layerUpdates.size>0){for(let oe of _.layerUpdates){let Fe=me.width*me.height;t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,oe,me.width,me.height,1,Ee,me.data.slice(Fe*oe,Fe*(oe+1)),0,0)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,me.width,me.height,se.depth,Ee,me.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Ne,me.width,me.height,se.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ke?P&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,me.width,me.height,se.depth,Ee,Je,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,Ne,me.width,me.height,se.depth,0,Ee,Je,me.data)}else{Ke&&wt&&t.texStorage2D(i.TEXTURE_2D,ve,Ne,Ze[0].width,Ze[0].height);for(let q=0,Y=Ze.length;q<Y;q++)me=Ze[q],_.format!==On?Ee!==null?Ke?P&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,me.width,me.height,Ee,me.data):t.compressedTexImage2D(i.TEXTURE_2D,q,Ne,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,me.width,me.height,Ee,Je,me.data):t.texImage2D(i.TEXTURE_2D,q,Ne,me.width,me.height,0,Ee,Je,me.data)}else if(_.isDataArrayTexture)if(Ke){if(wt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,Ne,se.width,se.height,se.depth),P)if(_.layerUpdates.size>0){let q;switch(Je){case i.UNSIGNED_BYTE:switch(Ee){case i.ALPHA:q=1;break;case i.LUMINANCE:q=1;break;case i.LUMINANCE_ALPHA:q=2;break;case i.RGB:q=3;break;case i.RGBA:q=4;break;default:throw new Error(`Unknown texel size for format ${Ee}.`)}break;case i.UNSIGNED_SHORT_4_4_4_4:case i.UNSIGNED_SHORT_5_5_5_1:case i.UNSIGNED_SHORT_5_6_5:q=1;break;default:throw new Error(`Unknown texel size for type ${Je}.`)}let Y=se.width*se.height*q;for(let oe of _.layerUpdates)t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,se.width,se.height,1,Ee,Je,se.data.slice(Y*oe,Y*(oe+1)));_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,Ee,Je,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ne,se.width,se.height,se.depth,0,Ee,Je,se.data);else if(_.isData3DTexture)Ke?(wt&&t.texStorage3D(i.TEXTURE_3D,ve,Ne,se.width,se.height,se.depth),P&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,Ee,Je,se.data)):t.texImage3D(i.TEXTURE_3D,0,Ne,se.width,se.height,se.depth,0,Ee,Je,se.data);else if(_.isFramebufferTexture){if(wt)if(Ke)t.texStorage2D(i.TEXTURE_2D,ve,Ne,se.width,se.height);else{let q=se.width,Y=se.height;for(let oe=0;oe<ve;oe++)t.texImage2D(i.TEXTURE_2D,oe,Ne,q,Y,0,Ee,Je,null),q>>=1,Y>>=1}}else if(Ze.length>0){if(Ke&&wt){let q=ze(Ze[0]);t.texStorage2D(i.TEXTURE_2D,ve,Ne,q.width,q.height)}for(let q=0,Y=Ze.length;q<Y;q++)me=Ze[q],Ke?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,Ee,Je,me):t.texImage2D(i.TEXTURE_2D,q,Ne,Ee,Je,me);_.generateMipmaps=!1}else if(Ke){if(wt){let q=ze(se);t.texStorage2D(i.TEXTURE_2D,ve,Ne,q.width,q.height)}P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ee,Je,se)}else t.texImage2D(i.TEXTURE_2D,0,Ne,Ee,Je,se);p(_)&&m(j),Ce.__version=K.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function W(E,_,B){if(_.image.length!==6)return;let j=Ye(E,_),Z=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+B);let K=n.get(Z);if(Z.version!==K.__version||j===!0){t.activeTexture(i.TEXTURE0+B);let Ce=ut.getPrimaries(ut.workingColorSpace),ue=_.colorSpace===_i?null:ut.getPrimaries(_.colorSpace),he=_.colorSpace===_i||Ce===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);let We=_.isCompressedTexture||_.image[0].isCompressedTexture,se=_.image[0]&&_.image[0].isDataTexture,Ee=[];for(let Y=0;Y<6;Y++)!We&&!se?Ee[Y]=x(_.image[Y],!0,r.maxCubemapSize):Ee[Y]=se?_.image[Y].image:_.image[Y],Ee[Y]=pe(_,Ee[Y]);let Je=Ee[0],Ne=s.convert(_.format,_.colorSpace),me=s.convert(_.type),Ze=S(_.internalFormat,Ne,me,_.colorSpace),Ke=_.isVideoTexture!==!0,wt=K.__version===void 0||j===!0,P=Z.dataReady,ve=b(_,Je);be(i.TEXTURE_CUBE_MAP,_);let q;if(We){Ke&&wt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Ze,Je.width,Je.height);for(let Y=0;Y<6;Y++){q=Ee[Y].mipmaps;for(let oe=0;oe<q.length;oe++){let Fe=q[oe];_.format!==On?Ne!==null?Ke?P&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe,0,0,Fe.width,Fe.height,Ne,Fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe,Ze,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ke?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe,0,0,Fe.width,Fe.height,Ne,me,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe,Ze,Fe.width,Fe.height,0,Ne,me,Fe.data)}}}else{if(q=_.mipmaps,Ke&&wt){q.length>0&&ve++;let Y=ze(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Ze,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(se){Ke?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ee[Y].width,Ee[Y].height,Ne,me,Ee[Y].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ze,Ee[Y].width,Ee[Y].height,0,Ne,me,Ee[Y].data);for(let oe=0;oe<q.length;oe++){let nt=q[oe].image[Y].image;Ke?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe+1,0,0,nt.width,nt.height,Ne,me,nt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe+1,Ze,nt.width,nt.height,0,Ne,me,nt.data)}}else{Ke?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ne,me,Ee[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ze,Ne,me,Ee[Y]);for(let oe=0;oe<q.length;oe++){let Fe=q[oe];Ke?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe+1,0,0,Ne,me,Fe.image[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,oe+1,Ze,Ne,me,Fe.image[Y])}}}p(_)&&m(i.TEXTURE_CUBE_MAP),K.__version=Z.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function ie(E,_,B,j,Z,K){let Ce=s.convert(B.format,B.colorSpace),ue=s.convert(B.type),he=S(B.internalFormat,Ce,ue,B.colorSpace);if(!n.get(_).__hasExternalTextures){let se=Math.max(1,_.width>>K),Ee=Math.max(1,_.height>>K);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,K,he,se,Ee,_.depth,0,Ce,ue,null):t.texImage2D(Z,K,he,se,Ee,0,Ce,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),te(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Z,n.get(B).__webglTexture,0,Q(_)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,Z,n.get(B).__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Se(E,_,B){if(i.bindRenderbuffer(i.RENDERBUFFER,E),_.depthBuffer){let j=_.depthTexture,Z=j&&j.isDepthTexture?j.type:null,K=v(_.stencilBuffer,Z),Ce=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=Q(_);te(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ue,K,_.width,_.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,K,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,K,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ce,i.RENDERBUFFER,E)}else{let j=_.textures;for(let Z=0;Z<j.length;Z++){let K=j[Z],Ce=s.convert(K.format,K.colorSpace),ue=s.convert(K.type),he=S(K.internalFormat,Ce,ue,K.colorSpace),We=Q(_);B&&te(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,We,he,_.width,_.height):te(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,We,he,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,he,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function le(E,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),H(_.depthTexture,0);let j=n.get(_.depthTexture).__webglTexture,Z=Q(_);if(_.depthTexture.format===Dr)te(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(_.depthTexture.format===zr)te(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function He(E){let _=n.get(E),B=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!_.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");le(_.__webglFramebuffer,E)}else if(B){_.__webglDepthbuffer=[];for(let j=0;j<6;j++)t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[j]),_.__webglDepthbuffer[j]=i.createRenderbuffer(),Se(_.__webglDepthbuffer[j],E,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=i.createRenderbuffer(),Se(_.__webglDepthbuffer,E,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(E,_,B){let j=n.get(E);_!==void 0&&ie(j.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&He(E)}function Be(E){let _=E.texture,B=n.get(E),j=n.get(_);E.addEventListener("dispose",T);let Z=E.textures,K=E.isWebGLCubeRenderTarget===!0,Ce=Z.length>1;if(Ce||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=_.version,a.memory.textures++),K){B.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[ue]=[];for(let he=0;he<_.mipmaps.length;he++)B.__webglFramebuffer[ue][he]=i.createFramebuffer()}else B.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let ue=0;ue<_.mipmaps.length;ue++)B.__webglFramebuffer[ue]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Ce)for(let ue=0,he=Z.length;ue<he;ue++){let We=n.get(Z[ue]);We.__webglTexture===void 0&&(We.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&te(E)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ue=0;ue<Z.length;ue++){let he=Z[ue];B.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ue]);let We=s.convert(he.format,he.colorSpace),se=s.convert(he.type),Ee=S(he.internalFormat,We,se,he.colorSpace,E.isXRRenderTarget===!0),Je=Q(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Je,Ee,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,B.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Se(B.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),be(i.TEXTURE_CUBE_MAP,_);for(let ue=0;ue<6;ue++)if(_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)ie(B.__webglFramebuffer[ue][he],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,he);else ie(B.__webglFramebuffer[ue],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);p(_)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let ue=0,he=Z.length;ue<he;ue++){let We=Z[ue],se=n.get(We);t.bindTexture(i.TEXTURE_2D,se.__webglTexture),be(i.TEXTURE_2D,We),ie(B.__webglFramebuffer,E,We,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,0),p(We)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ue=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,j.__webglTexture),be(ue,_),_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)ie(B.__webglFramebuffer[he],E,_,i.COLOR_ATTACHMENT0,ue,he);else ie(B.__webglFramebuffer,E,_,i.COLOR_ATTACHMENT0,ue,0);p(_)&&m(ue),t.unbindTexture()}E.depthBuffer&&He(E)}function R(E){let _=E.textures;for(let B=0,j=_.length;B<j;B++){let Z=_[B];if(p(Z)){let K=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Ce=n.get(Z).__webglTexture;t.bindTexture(K,Ce),m(K),t.unbindTexture()}}}let X=[],J=[];function re(E){if(E.samples>0){if(te(E)===!1){let _=E.textures,B=E.width,j=E.height,Z=i.COLOR_BUFFER_BIT,K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ce=n.get(E),ue=_.length>1;if(ue)for(let he=0;he<_.length;he++)t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let he=0;he<_.length;he++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[he]);let We=n.get(_[he]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,We,0)}i.blitFramebuffer(0,0,B,j,0,0,B,j,Z,i.NEAREST),l===!0&&(X.length=0,J.length=0,X.push(i.COLOR_ATTACHMENT0+he),E.depthBuffer&&E.resolveDepthBuffer===!1&&(X.push(K),J.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,J)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,X))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let he=0;he<_.length;he++){t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[he]);let We=n.get(_[he]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,We,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let _=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Q(E){return Math.min(r.maxSamples,E.samples)}function te(E){let _=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function xe(E){let _=a.render.frame;u.get(E)!==_&&(u.set(E,_),E.update())}function pe(E,_){let B=E.colorSpace,j=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||B!==Pi&&B!==_i&&(ut.getTransfer(B)===xt?(j!==On||Z!==Ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),_}function ze(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=C,this.setTexture2D=H,this.setTexture2DArray=$,this.setTexture3D=V,this.setTextureCube=ne,this.rebindTextures=Ge,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=R,this.updateMultisampleRenderTarget=re,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=te}function Ev(i,e){function t(n,r=_i){let s,a=ut.getTransfer(r);if(n===Ei)return i.UNSIGNED_BYTE;if(n===ph)return i.UNSIGNED_SHORT_4_4_4_4;if(n===mh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ap)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===rp)return i.BYTE;if(n===sp)return i.SHORT;if(n===Aa)return i.UNSIGNED_SHORT;if(n===fh)return i.INT;if(n===Or)return i.UNSIGNED_INT;if(n===ni)return i.FLOAT;if(n===uo)return i.HALF_FLOAT;if(n===op)return i.ALPHA;if(n===lp)return i.RGB;if(n===On)return i.RGBA;if(n===cp)return i.LUMINANCE;if(n===up)return i.LUMINANCE_ALPHA;if(n===Dr)return i.DEPTH_COMPONENT;if(n===zr)return i.DEPTH_STENCIL;if(n===gh)return i.RED;if(n===xh)return i.RED_INTEGER;if(n===dp)return i.RG;if(n===vh)return i.RG_INTEGER;if(n===yh)return i.RGBA_INTEGER;if(n===pl||n===ml||n===gl||n===xl)if(a===xt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===pl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ml)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===gl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===pl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ml)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===gl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Du||n===Uu||n===Nu||n===Fu)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Du)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Uu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Nu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ku||n===Ou||n===Bu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ku||n===Ou)return a===xt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Bu)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===zu||n===Hu||n===Vu||n===Gu||n===Wu||n===qu||n===$u||n===Xu||n===Yu||n===Zu||n===ju||n===Ju||n===Ku||n===Qu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===zu)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Hu)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vu)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Gu)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Wu)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qu)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$u)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xu)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Yu)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Zu)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ju)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ju)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ku)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Qu)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===vl||n===ed||n===td)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===vl)return a===xt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ed)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===td)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hp||n===nd||n===id||n===rd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===vl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===nd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===id)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===rd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Br?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var mc=class extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},je=class extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}},Tv={type:"move"},bs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let p=t.getJointPose(x,n),m=this._getHandJoint(c,x);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Tv)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new je;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Av=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,gc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let r=new sn,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Vn({vertexShader:Av,fragmentShader:Cv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new St(new oi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}},xc=class extends Ti{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,g=null,x=new gc,p=t.getContextAttributes(),m=null,S=null,v=[],b=[],D=new ee,T=null,A=new rn;A.layers.enable(1),A.viewport=new kt;let L=new rn;L.layers.enable(2),L.viewport=new kt;let M=[A,L],y=new mc;y.layers.enable(1),y.layers.enable(2);let C=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ie=v[W];return ie===void 0&&(ie=new bs,v[W]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(W){let ie=v[W];return ie===void 0&&(ie=new bs,v[W]=ie),ie.getGripSpace()},this.getHand=function(W){let ie=v[W];return ie===void 0&&(ie=new bs,v[W]=ie),ie.getHandSpace()};function k(W){let ie=b.indexOf(W.inputSource);if(ie===-1)return;let Se=v[ie];Se!==void 0&&(Se.update(W.inputSource,W.frame,c||a),Se.dispatchEvent({type:W.type,data:W.inputSource}))}function H(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",$);for(let W=0;W<v.length;W++){let ie=b[W];ie!==null&&(b[W]=null,v[W].disconnect(ie))}C=null,z=null,x.reset(),e.setRenderTarget(m),f=null,h=null,d=null,r=null,S=null,tt.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",H),r.addEventListener("inputsourceschange",$),p.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(D),r.renderState.layers===void 0){let ie={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new si(f.framebufferWidth,f.framebufferHeight,{format:On,type:Ei,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ie=null,Se=null,le=null;p.depth&&(le=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=p.stencil?zr:Dr,Se=p.stencil?Br:Or);let He={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:s};d=new XRWebGLBinding(r,t),h=d.createProjectionLayer(He),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new si(h.textureWidth,h.textureHeight,{format:On,type:Ei,depthTexture:new Va(h.textureWidth,h.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),tt.setContext(r),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function $(W){for(let ie=0;ie<W.removed.length;ie++){let Se=W.removed[ie],le=b.indexOf(Se);le>=0&&(b[le]=null,v[le].disconnect(Se))}for(let ie=0;ie<W.added.length;ie++){let Se=W.added[ie],le=b.indexOf(Se);if(le===-1){for(let Ge=0;Ge<v.length;Ge++)if(Ge>=b.length){b.push(Se),le=Ge;break}else if(b[Ge]===null){b[Ge]=Se,le=Ge;break}if(le===-1)break}let He=v[le];He&&He.connect(Se)}}let V=new I,ne=new I;function G(W,ie,Se){V.setFromMatrixPosition(ie.matrixWorld),ne.setFromMatrixPosition(Se.matrixWorld);let le=V.distanceTo(ne),He=ie.projectionMatrix.elements,Ge=Se.projectionMatrix.elements,Be=He[14]/(He[10]-1),R=He[14]/(He[10]+1),X=(He[9]+1)/He[5],J=(He[9]-1)/He[5],re=(He[8]-1)/He[0],Q=(Ge[8]+1)/Ge[0],te=Be*re,xe=Be*Q,pe=le/(-re+Q),ze=pe*-re;ie.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(ze),W.translateZ(pe),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();let E=Be+pe,_=R+pe,B=te-ze,j=xe+(le-ze),Z=X*R/_*E,K=J*R/_*E;W.projectionMatrix.makePerspective(B,j,Z,K,E,_),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function ge(W,ie){ie===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ie.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;x.texture!==null&&(W.near=x.depthNear,W.far=x.depthFar),y.near=L.near=A.near=W.near,y.far=L.far=A.far=W.far,(C!==y.near||z!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,z=y.far,A.near=C,A.far=z,L.near=C,L.far=z,A.updateProjectionMatrix(),L.updateProjectionMatrix(),W.updateProjectionMatrix());let ie=W.parent,Se=y.cameras;ge(y,ie);for(let le=0;le<Se.length;le++)ge(Se[le],ie);Se.length===2?G(y,A,L):y.projectionMatrix.copy(A.projectionMatrix),we(W,y,ie)};function we(W,ie,Se){Se===null?W.matrix.copy(ie.matrixWorld):(W.matrix.copy(Se.matrixWorld),W.matrix.invert(),W.matrix.multiply(ie.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ie.projectionMatrix),W.projectionMatrixInverse.copy(ie.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Es*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(W){l=W,h!==null&&(h.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let be=null;function Ye(W,ie){if(u=ie.getViewerPose(c||a),g=ie,u!==null){let Se=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let le=!1;Se.length!==y.cameras.length&&(y.cameras.length=0,le=!0);for(let Ge=0;Ge<Se.length;Ge++){let Be=Se[Ge],R=null;if(f!==null)R=f.getViewport(Be);else{let J=d.getViewSubImage(h,Be);R=J.viewport,Ge===0&&(e.setRenderTargetTextures(S,J.colorTexture,h.ignoreDepthValues?void 0:J.depthStencilTexture),e.setRenderTarget(S))}let X=M[Ge];X===void 0&&(X=new rn,X.layers.enable(Ge),X.viewport=new kt,M[Ge]=X),X.matrix.fromArray(Be.transform.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale),X.projectionMatrix.fromArray(Be.projectionMatrix),X.projectionMatrixInverse.copy(X.projectionMatrix).invert(),X.viewport.set(R.x,R.y,R.width,R.height),Ge===0&&(y.matrix.copy(X.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),le===!0&&y.cameras.push(X)}let He=r.enabledFeatures;if(He&&He.includes("depth-sensing")){let Ge=d.getDepthInformation(Se[0]);Ge&&Ge.isValid&&Ge.texture&&x.init(e,Ge,r.renderState)}}for(let Se=0;Se<v.length;Se++){let le=b[Se],He=v[Se];le!==null&&He!==void 0&&He.update(le,ie,c||a)}be&&be(W,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),g=null}let tt=new Eh;tt.setAnimationLoop(Ye),this.setAnimationLoop=function(W){be=W},this.dispose=function(){}}},Gi=new zn,Rv=new pt;function Pv(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Mh(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,S,v,b){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),h(p,m),m.isMeshPhysicalMaterial&&f(p,m,b)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),x(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,S,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===ln&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===ln&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let S=e.get(m),v=S.envMap,b=S.envMapRotation;v&&(p.envMap.value=v,Gi.copy(b),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),p.envMapRotation.value.setFromMatrix4(Rv.makeRotationFromEuler(Gi)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,S,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*S,p.scale.value=v*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,S){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ln&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function x(p,m){let S=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Iv(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,v){let b=v.program;n.uniformBlockBinding(S,b)}function c(S,v){let b=r[S.id];b===void 0&&(g(S),b=u(S),r[S.id]=b,S.addEventListener("dispose",p));let D=v.program;n.updateUBOMapping(S,D);let T=e.render.frame;s[S.id]!==T&&(h(S),s[S.id]=T)}function u(S){let v=d();S.__bindingPointIndex=v;let b=i.createBuffer(),D=S.__size,T=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,D,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,b),b}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){let v=r[S.id],b=S.uniforms,D=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,A=b.length;T<A;T++){let L=Array.isArray(b[T])?b[T]:[b[T]];for(let M=0,y=L.length;M<y;M++){let C=L[M];if(f(C,T,M,D)===!0){let z=C.__offset,k=Array.isArray(C.value)?C.value:[C.value],H=0;for(let $=0;$<k.length;$++){let V=k[$],ne=x(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,z+H,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,H),H+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,v,b,D){let T=S.value,A=v+"_"+b;if(D[A]===void 0)return typeof T=="number"||typeof T=="boolean"?D[A]=T:D[A]=T.clone(),!0;{let L=D[A];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return D[A]=T,!0}else if(L.equals(T)===!1)return L.copy(T),!0}return!1}function g(S){let v=S.uniforms,b=0,D=16;for(let A=0,L=v.length;A<L;A++){let M=Array.isArray(v[A])?v[A]:[v[A]];for(let y=0,C=M.length;y<C;y++){let z=M[y],k=Array.isArray(z.value)?z.value:[z.value];for(let H=0,$=k.length;H<$;H++){let V=k[H],ne=x(V),G=b%D;G!==0&&D-G<ne.boundary&&(b+=D-G),z.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=b,b+=ne.storage}}}let T=b%D;return T>0&&(b+=D-T),S.__size=b,S.__cache={},this}function x(S){let v={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(v.boundary=4,v.storage=4):S.isVector2?(v.boundary=8,v.storage=8):S.isVector3||S.isColor?(v.boundary=16,v.storage=12):S.isVector4?(v.boundary=16,v.storage=16):S.isMatrix3?(v.boundary=48,v.storage=48):S.isMatrix4?(v.boundary=64,v.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),v}function p(S){let v=S.target;v.removeEventListener("dispose",p);let b=a.indexOf(v.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function m(){for(let S in r)i.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:m}}var Ga=class{constructor(e={}){let{canvas:t=Bp(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=a;let f=new Uint32Array(4),g=new Int32Array(4),x=null,p=null,m=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ft,this.toneMapping=Si,this.toneMappingExposure=1;let v=this,b=!1,D=0,T=0,A=null,L=-1,M=null,y=new kt,C=new kt,z=null,k=new ke(0),H=0,$=t.width,V=t.height,ne=1,G=null,ge=null,we=new kt(0,0,$,V),be=new kt(0,0,$,V),Ye=!1,tt=new Cs,W=!1,ie=!1,Se=new pt,le=new I,He={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ge=!1;function Be(){return A===null?ne:1}let R=n;function X(w,U){return t.getContext(w,U)}try{let w={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r165"),t.addEventListener("webglcontextlost",ve,!1),t.addEventListener("webglcontextrestored",q,!1),t.addEventListener("webglcontextcreationerror",Y,!1),R===null){let U="webgl2";if(R=X(U,w),R===null)throw X(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let J,re,Q,te,xe,pe,ze,E,_,B,j,Z,K,Ce,ue,he,We,se,Ee,Je,Ne,me,Ze,Ke;function wt(){J=new jx(R),J.init(),me=new Ev(R,J),re=new Wx(R,J,e,me),Q=new wv(R),te=new Qx(R),xe=new dv,pe=new Mv(R,J,Q,xe,re,me,te),ze=new $x(v),E=new Zx(v),_=new am(R),Ze=new Vx(R,_),B=new Jx(R,_,te,Ze),j=new t0(R,B,_,te),Ee=new e0(R,re,pe),he=new qx(xe),Z=new uv(v,ze,E,J,re,Ze,he),K=new Pv(v,xe),Ce=new fv,ue=new yv(J),se=new Hx(v,ze,E,Q,j,h,l),We=new Sv(v,j,re),Ke=new Iv(R,te,re,Q),Je=new Gx(R,J,te),Ne=new Kx(R,J,te),te.programs=Z.programs,v.capabilities=re,v.extensions=J,v.properties=xe,v.renderLists=Ce,v.shadowMap=We,v.state=Q,v.info=te}wt();let P=new xc(v,R);this.xr=P,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let w=J.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=J.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(w){w!==void 0&&(ne=w,this.setSize($,V,!1))},this.getSize=function(w){return w.set($,V)},this.setSize=function(w,U,F=!0){if(P.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=w,V=U,t.width=Math.floor(w*ne),t.height=Math.floor(U*ne),F===!0&&(t.style.width=w+"px",t.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set($*ne,V*ne).floor()},this.setDrawingBufferSize=function(w,U,F){$=w,V=U,ne=F,t.width=Math.floor(w*F),t.height=Math.floor(U*F),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(y)},this.getViewport=function(w){return w.copy(we)},this.setViewport=function(w,U,F,O){w.isVector4?we.set(w.x,w.y,w.z,w.w):we.set(w,U,F,O),Q.viewport(y.copy(we).multiplyScalar(ne).round())},this.getScissor=function(w){return w.copy(be)},this.setScissor=function(w,U,F,O){w.isVector4?be.set(w.x,w.y,w.z,w.w):be.set(w,U,F,O),Q.scissor(C.copy(be).multiplyScalar(ne).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(w){Q.setScissorTest(Ye=w)},this.setOpaqueSort=function(w){G=w},this.setTransparentSort=function(w){ge=w},this.getClearColor=function(w){return w.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor.apply(se,arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha.apply(se,arguments)},this.clear=function(w=!0,U=!0,F=!0){let O=0;if(w){let N=!1;if(A!==null){let ae=A.texture.format;N=ae===yh||ae===vh||ae===xh}if(N){let ae=A.texture.type,ye=ae===Ei||ae===Or||ae===Aa||ae===Br||ae===ph||ae===mh,Me=se.getClearColor(),Te=se.getClearAlpha(),De=Me.r,Ue=Me.g,Ie=Me.b;ye?(f[0]=De,f[1]=Ue,f[2]=Ie,f[3]=Te,R.clearBufferuiv(R.COLOR,0,f)):(g[0]=De,g[1]=Ue,g[2]=Ie,g[3]=Te,R.clearBufferiv(R.COLOR,0,g))}else O|=R.COLOR_BUFFER_BIT}U&&(O|=R.DEPTH_BUFFER_BIT),F&&(O|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ve,!1),t.removeEventListener("webglcontextrestored",q,!1),t.removeEventListener("webglcontextcreationerror",Y,!1),Ce.dispose(),ue.dispose(),xe.dispose(),ze.dispose(),E.dispose(),j.dispose(),Ze.dispose(),Ke.dispose(),Z.dispose(),P.dispose(),P.removeEventListener("sessionstart",Nn),P.removeEventListener("sessionend",Fn),Fi.stop()};function ve(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function q(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let w=te.autoReset,U=We.enabled,F=We.autoUpdate,O=We.needsUpdate,N=We.type;wt(),te.autoReset=w,We.enabled=U,We.autoUpdate=F,We.needsUpdate=O,We.type=N}function Y(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function oe(w){let U=w.target;U.removeEventListener("dispose",oe),Fe(U)}function Fe(w){nt(w),xe.remove(w)}function nt(w){let U=xe.get(w).programs;U!==void 0&&(U.forEach(function(F){Z.releaseProgram(F)}),w.isShaderMaterial&&Z.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,F,O,N,ae){U===null&&(U=He);let ye=N.isMesh&&N.matrixWorld.determinant()<0,Me=xf(w,U,F,O,N);Q.setMaterial(O,ye);let Te=F.index,De=1;if(O.wireframe===!0){if(Te=B.getWireframeAttribute(F),Te===void 0)return;De=2}let Ue=F.drawRange,Ie=F.attributes.position,it=Ue.start*De,_t=(Ue.start+Ue.count)*De;ae!==null&&(it=Math.max(it,ae.start*De),_t=Math.min(_t,(ae.start+ae.count)*De)),Te!==null?(it=Math.max(it,0),_t=Math.min(_t,Te.count)):Ie!=null&&(it=Math.max(it,0),_t=Math.min(_t,Ie.count));let bt=_t-it;if(bt<0||bt===1/0)return;Ze.setup(N,O,Me,F,Te);let fn,lt=Je;if(Te!==null&&(fn=_.get(Te),lt=Ne,lt.setIndex(fn)),N.isMesh)O.wireframe===!0?(Q.setLineWidth(O.wireframeLinewidth*Be()),lt.setMode(R.LINES)):lt.setMode(R.TRIANGLES);else if(N.isLine){let Re=O.linewidth;Re===void 0&&(Re=1),Q.setLineWidth(Re*Be()),N.isLineSegments?lt.setMode(R.LINES):N.isLineLoop?lt.setMode(R.LINE_LOOP):lt.setMode(R.LINE_STRIP)}else N.isPoints?lt.setMode(R.POINTS):N.isSprite&&lt.setMode(R.TRIANGLES);if(N.isBatchedMesh)N._multiDrawInstances!==null?lt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances):lt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else if(N.isInstancedMesh)lt.renderInstances(it,bt,N.count);else if(F.isInstancedBufferGeometry){let Re=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,en=Math.min(F.instanceCount,Re);lt.renderInstances(it,bt,en)}else lt.render(it,bt)};function Mt(w,U,F){w.transparent===!0&&w.side===Rn&&w.forceSinglePass===!1?(w.side=ln,w.needsUpdate=!0,$s(w,U,F),w.side=Mi,w.needsUpdate=!0,$s(w,U,F),w.side=Rn):$s(w,U,F)}this.compile=function(w,U,F=null){F===null&&(F=w),p=ue.get(F),p.init(U),S.push(p),F.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),w!==F&&w.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();let O=new Set;return w.traverse(function(N){let ae=N.material;if(ae)if(Array.isArray(ae))for(let ye=0;ye<ae.length;ye++){let Me=ae[ye];Mt(Me,F,N),O.add(Me)}else Mt(ae,F,N),O.add(ae)}),S.pop(),p=null,O},this.compileAsync=function(w,U,F=null){let O=this.compile(w,U,F);return new Promise(N=>{function ae(){if(O.forEach(function(ye){xe.get(ye).currentProgram.isReady()&&O.delete(ye)}),O.size===0){N(w);return}setTimeout(ae,10)}J.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Dt=null;function dt(w){Dt&&Dt(w)}function Nn(){Fi.stop()}function Fn(){Fi.start()}let Fi=new Eh;Fi.setAnimationLoop(dt),typeof self<"u"&&Fi.setContext(self),this.setAnimationLoop=function(w){Dt=w,P.setAnimationLoop(w),w===null?Fi.stop():Fi.start()},P.addEventListener("sessionstart",Nn),P.addEventListener("sessionend",Fn),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),P.enabled===!0&&P.isPresenting===!0&&(P.cameraAutoUpdate===!0&&P.updateCamera(U),U=P.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,U,A),p=ue.get(w,S.length),p.init(U),S.push(p),Se.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),tt.setFromProjectionMatrix(Se),ie=this.localClippingEnabled,W=he.init(this.clippingPlanes,ie),x=Ce.get(w,m.length),x.init(),m.push(x),P.enabled===!0&&P.isPresenting===!0){let ae=v.xr.getDepthSensingMesh();ae!==null&&Co(ae,U,-1/0,v.sortObjects)}Co(w,U,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(G,ge),Ge=P.enabled===!1||P.isPresenting===!1||P.hasDepthSensing()===!1,Ge&&se.addToRenderList(x,w),this.info.render.frame++,W===!0&&he.beginShadows();let F=p.state.shadowsArray;We.render(F,w,U),W===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();let O=x.opaque,N=x.transmissive;if(p.setupLights(),U.isArrayCamera){let ae=U.cameras;if(N.length>0)for(let ye=0,Me=ae.length;ye<Me;ye++){let Te=ae[ye];vu(O,N,w,Te)}Ge&&se.render(w);for(let ye=0,Me=ae.length;ye<Me;ye++){let Te=ae[ye];xu(x,w,Te,Te.viewport)}}else N.length>0&&vu(O,N,w,U),Ge&&se.render(w),xu(x,w,U);A!==null&&(pe.updateMultisampleRenderTarget(A),pe.updateRenderTargetMipmap(A)),w.isScene===!0&&w.onAfterRender(v,w,U),Ze.resetDefaultState(),L=-1,M=null,S.pop(),S.length>0?(p=S[S.length-1],W===!0&&he.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?x=m[m.length-1]:x=null};function Co(w,U,F,O){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)F=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||tt.intersectsSprite(w)){O&&le.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Se);let ye=j.update(w),Me=w.material;Me.visible&&x.push(w,ye,Me,F,le.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||tt.intersectsObject(w))){let ye=j.update(w),Me=w.material;if(O&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),le.copy(w.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),le.copy(ye.boundingSphere.center)),le.applyMatrix4(w.matrixWorld).applyMatrix4(Se)),Array.isArray(Me)){let Te=ye.groups;for(let De=0,Ue=Te.length;De<Ue;De++){let Ie=Te[De],it=Me[Ie.materialIndex];it&&it.visible&&x.push(w,ye,it,F,le.z,Ie)}}else Me.visible&&x.push(w,ye,Me,F,le.z,null)}}let ae=w.children;for(let ye=0,Me=ae.length;ye<Me;ye++)Co(ae[ye],U,F,O)}function xu(w,U,F,O){let N=w.opaque,ae=w.transmissive,ye=w.transparent;p.setupLightsView(F),W===!0&&he.setGlobalState(v.clippingPlanes,F),O&&Q.viewport(y.copy(O)),N.length>0&&qs(N,U,F),ae.length>0&&qs(ae,U,F),ye.length>0&&qs(ye,U,F),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function vu(w,U,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[O.id]===void 0&&(p.state.transmissionRenderTarget[O.id]=new si(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?uo:Ei,minFilter:Yi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ut.workingColorSpace}));let ae=p.state.transmissionRenderTarget[O.id],ye=O.viewport||y;ae.setSize(ye.z,ye.w);let Me=v.getRenderTarget();v.setRenderTarget(ae),v.getClearColor(k),H=v.getClearAlpha(),H<1&&v.setClearColor(16777215,.5),Ge?se.render(F):v.clear();let Te=v.toneMapping;v.toneMapping=Si;let De=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),p.setupLightsView(O),W===!0&&he.setGlobalState(v.clippingPlanes,O),qs(w,F,O),pe.updateMultisampleRenderTarget(ae),pe.updateRenderTargetMipmap(ae),J.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let Ie=0,it=U.length;Ie<it;Ie++){let _t=U[Ie],bt=_t.object,fn=_t.geometry,lt=_t.material,Re=_t.group;if(lt.side===Rn&&bt.layers.test(O.layers)){let en=lt.side;lt.side=ln,lt.needsUpdate=!0,yu(bt,F,O,fn,lt,Re),lt.side=en,lt.needsUpdate=!0,Ue=!0}}Ue===!0&&(pe.updateMultisampleRenderTarget(ae),pe.updateRenderTargetMipmap(ae))}v.setRenderTarget(Me),v.setClearColor(k,H),De!==void 0&&(O.viewport=De),v.toneMapping=Te}function qs(w,U,F){let O=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ae=w.length;N<ae;N++){let ye=w[N],Me=ye.object,Te=ye.geometry,De=O===null?ye.material:O,Ue=ye.group;Me.layers.test(F.layers)&&yu(Me,U,F,Te,De,Ue)}}function yu(w,U,F,O,N,ae){w.onBeforeRender(v,U,F,O,N,ae),w.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),N.onBeforeRender(v,U,F,O,w,ae),N.transparent===!0&&N.side===Rn&&N.forceSinglePass===!1?(N.side=ln,N.needsUpdate=!0,v.renderBufferDirect(F,U,O,N,w,ae),N.side=Mi,N.needsUpdate=!0,v.renderBufferDirect(F,U,O,N,w,ae),N.side=Rn):v.renderBufferDirect(F,U,O,N,w,ae),w.onAfterRender(v,U,F,O,N,ae)}function $s(w,U,F){U.isScene!==!0&&(U=He);let O=xe.get(w),N=p.state.lights,ae=p.state.shadowsArray,ye=N.state.version,Me=Z.getParameters(w,N.state,ae,U,F),Te=Z.getProgramCacheKey(Me),De=O.programs;O.environment=w.isMeshStandardMaterial?U.environment:null,O.fog=U.fog,O.envMap=(w.isMeshStandardMaterial?E:ze).get(w.envMap||O.environment),O.envMapRotation=O.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,De===void 0&&(w.addEventListener("dispose",oe),De=new Map,O.programs=De);let Ue=De.get(Te);if(Ue!==void 0){if(O.currentProgram===Ue&&O.lightsStateVersion===ye)return bu(w,Me),Ue}else Me.uniforms=Z.getUniforms(w),w.onBuild(F,Me,v),w.onBeforeCompile(Me,v),Ue=Z.acquireProgram(Me,Te),De.set(Te,Ue),O.uniforms=Me.uniforms;let Ie=O.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ie.clippingPlanes=he.uniform),bu(w,Me),O.needsLights=yf(w),O.lightsStateVersion=ye,O.needsLights&&(Ie.ambientLightColor.value=N.state.ambient,Ie.lightProbe.value=N.state.probe,Ie.directionalLights.value=N.state.directional,Ie.directionalLightShadows.value=N.state.directionalShadow,Ie.spotLights.value=N.state.spot,Ie.spotLightShadows.value=N.state.spotShadow,Ie.rectAreaLights.value=N.state.rectArea,Ie.ltc_1.value=N.state.rectAreaLTC1,Ie.ltc_2.value=N.state.rectAreaLTC2,Ie.pointLights.value=N.state.point,Ie.pointLightShadows.value=N.state.pointShadow,Ie.hemisphereLights.value=N.state.hemi,Ie.directionalShadowMap.value=N.state.directionalShadowMap,Ie.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ie.spotShadowMap.value=N.state.spotShadowMap,Ie.spotLightMatrix.value=N.state.spotLightMatrix,Ie.spotLightMap.value=N.state.spotLightMap,Ie.pointShadowMap.value=N.state.pointShadowMap,Ie.pointShadowMatrix.value=N.state.pointShadowMatrix),O.currentProgram=Ue,O.uniformsList=null,Ue}function _u(w){if(w.uniformsList===null){let U=w.currentProgram.getUniforms();w.uniformsList=Nr.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function bu(w,U){let F=xe.get(w);F.outputColorSpace=U.outputColorSpace,F.batching=U.batching,F.batchingColor=U.batchingColor,F.instancing=U.instancing,F.instancingColor=U.instancingColor,F.instancingMorph=U.instancingMorph,F.skinning=U.skinning,F.morphTargets=U.morphTargets,F.morphNormals=U.morphNormals,F.morphColors=U.morphColors,F.morphTargetsCount=U.morphTargetsCount,F.numClippingPlanes=U.numClippingPlanes,F.numIntersection=U.numClipIntersection,F.vertexAlphas=U.vertexAlphas,F.vertexTangents=U.vertexTangents,F.toneMapping=U.toneMapping}function xf(w,U,F,O,N){U.isScene!==!0&&(U=He),pe.resetTextureUnits();let ae=U.fog,ye=O.isMeshStandardMaterial?U.environment:null,Me=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Pi,Te=(O.isMeshStandardMaterial?E:ze).get(O.envMap||ye),De=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ue=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Ie=!!F.morphAttributes.position,it=!!F.morphAttributes.normal,_t=!!F.morphAttributes.color,bt=Si;O.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(bt=v.toneMapping);let fn=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,lt=fn!==void 0?fn.length:0,Re=xe.get(O),en=p.state.lights;if(W===!0&&(ie===!0||w!==M)){let yn=w===M&&O.id===L;he.setState(O,w,yn)}let ht=!1;O.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==en.state.version||Re.outputColorSpace!==Me||N.isBatchedMesh&&Re.batching===!1||!N.isBatchedMesh&&Re.batching===!0||N.isBatchedMesh&&Re.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Re.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Re.instancing===!1||!N.isInstancedMesh&&Re.instancing===!0||N.isSkinnedMesh&&Re.skinning===!1||!N.isSkinnedMesh&&Re.skinning===!0||N.isInstancedMesh&&Re.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Re.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Re.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Re.instancingMorph===!1&&N.morphTexture!==null||Re.envMap!==Te||O.fog===!0&&Re.fog!==ae||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==he.numPlanes||Re.numIntersection!==he.numIntersection)||Re.vertexAlphas!==De||Re.vertexTangents!==Ue||Re.morphTargets!==Ie||Re.morphNormals!==it||Re.morphColors!==_t||Re.toneMapping!==bt||Re.morphTargetsCount!==lt)&&(ht=!0):(ht=!0,Re.__version=O.version);let Yn=Re.currentProgram;ht===!0&&(Yn=$s(O,U,N));let Xs=!1,ki=!1,Ro=!1,Ut=Yn.getUniforms(),fi=Re.uniforms;if(Q.useProgram(Yn.program)&&(Xs=!0,ki=!0,Ro=!0),O.id!==L&&(L=O.id,ki=!0),Xs||M!==w){Ut.setValue(R,"projectionMatrix",w.projectionMatrix),Ut.setValue(R,"viewMatrix",w.matrixWorldInverse);let yn=Ut.map.cameraPosition;yn!==void 0&&yn.setValue(R,le.setFromMatrixPosition(w.matrixWorld)),re.logarithmicDepthBuffer&&Ut.setValue(R,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Ut.setValue(R,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,ki=!0,Ro=!0)}if(N.isSkinnedMesh){Ut.setOptional(R,N,"bindMatrix"),Ut.setOptional(R,N,"bindMatrixInverse");let yn=N.skeleton;yn&&(yn.boneTexture===null&&yn.computeBoneTexture(),Ut.setValue(R,"boneTexture",yn.boneTexture,pe))}N.isBatchedMesh&&(Ut.setOptional(R,N,"batchingTexture"),Ut.setValue(R,"batchingTexture",N._matricesTexture,pe),Ut.setOptional(R,N,"batchingColorTexture"),N._colorsTexture!==null&&Ut.setValue(R,"batchingColorTexture",N._colorsTexture,pe));let Po=F.morphAttributes;if((Po.position!==void 0||Po.normal!==void 0||Po.color!==void 0)&&Ee.update(N,F,Yn),(ki||Re.receiveShadow!==N.receiveShadow)&&(Re.receiveShadow=N.receiveShadow,Ut.setValue(R,"receiveShadow",N.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(fi.envMap.value=Te,fi.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&U.environment!==null&&(fi.envMapIntensity.value=U.environmentIntensity),ki&&(Ut.setValue(R,"toneMappingExposure",v.toneMappingExposure),Re.needsLights&&vf(fi,Ro),ae&&O.fog===!0&&K.refreshFogUniforms(fi,ae),K.refreshMaterialUniforms(fi,O,ne,V,p.state.transmissionRenderTarget[w.id]),Nr.upload(R,_u(Re),fi,pe)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Nr.upload(R,_u(Re),fi,pe),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Ut.setValue(R,"center",N.center),Ut.setValue(R,"modelViewMatrix",N.modelViewMatrix),Ut.setValue(R,"normalMatrix",N.normalMatrix),Ut.setValue(R,"modelMatrix",N.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){let yn=O.uniformsGroups;for(let Io=0,_f=yn.length;Io<_f;Io++){let Su=yn[Io];Ke.update(Su,Yn),Ke.bind(Su,Yn)}}return Yn}function vf(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function yf(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(w,U,F){xe.get(w.texture).__webglTexture=U,xe.get(w.depthTexture).__webglTexture=F;let O=xe.get(w);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=F===void 0,O.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,U){let F=xe.get(w);F.__webglFramebuffer=U,F.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,F=0){A=w,D=U,T=F;let O=!0,N=null,ae=!1,ye=!1;if(w){let Te=xe.get(w);Te.__useDefaultFramebuffer!==void 0?(Q.bindFramebuffer(R.FRAMEBUFFER,null),O=!1):Te.__webglFramebuffer===void 0?pe.setupRenderTarget(w):Te.__hasExternalTextures&&pe.rebindTextures(w,xe.get(w.texture).__webglTexture,xe.get(w.depthTexture).__webglTexture);let De=w.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(ye=!0);let Ue=xe.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ue[U])?N=Ue[U][F]:N=Ue[U],ae=!0):w.samples>0&&pe.useMultisampledRTT(w)===!1?N=xe.get(w).__webglMultisampledFramebuffer:Array.isArray(Ue)?N=Ue[F]:N=Ue,y.copy(w.viewport),C.copy(w.scissor),z=w.scissorTest}else y.copy(we).multiplyScalar(ne).floor(),C.copy(be).multiplyScalar(ne).floor(),z=Ye;if(Q.bindFramebuffer(R.FRAMEBUFFER,N)&&O&&Q.drawBuffers(w,N),Q.viewport(y),Q.scissor(C),Q.setScissorTest(z),ae){let Te=xe.get(w.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,Te.__webglTexture,F)}else if(ye){let Te=xe.get(w.texture),De=U||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,Te.__webglTexture,F||0,De)}L=-1},this.readRenderTargetPixels=function(w,U,F,O,N,ae,ye){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=xe.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(Me=Me[ye]),Me){Q.bindFramebuffer(R.FRAMEBUFFER,Me);try{let Te=w.texture,De=Te.format,Ue=Te.type;if(!re.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-O&&F>=0&&F<=w.height-N&&R.readPixels(U,F,O,N,me.convert(De),me.convert(Ue),ae)}finally{let Te=A!==null?xe.get(A).__webglFramebuffer:null;Q.bindFramebuffer(R.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(w,U,F,O,N,ae,ye){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=xe.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(Me=Me[ye]),Me){Q.bindFramebuffer(R.FRAMEBUFFER,Me);try{let Te=w.texture,De=Te.format,Ue=Te.type;if(!re.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=w.width-O&&F>=0&&F<=w.height-N){let Ie=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Ie),R.bufferData(R.PIXEL_PACK_BUFFER,ae.byteLength,R.STREAM_READ),R.readPixels(U,F,O,N,me.convert(De),me.convert(Ue),0),R.flush();let it=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);await zp(R,it,4);try{R.bindBuffer(R.PIXEL_PACK_BUFFER,Ie),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,ae)}finally{R.deleteBuffer(Ie),R.deleteSync(it)}return ae}}finally{let Te=A!==null?xe.get(A).__webglFramebuffer:null;Q.bindFramebuffer(R.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(w,U=null,F=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,w=arguments[1]);let O=Math.pow(2,-F),N=Math.floor(w.image.width*O),ae=Math.floor(w.image.height*O),ye=U!==null?U.x:0,Me=U!==null?U.y:0;pe.setTexture2D(w,0),R.copyTexSubImage2D(R.TEXTURE_2D,F,0,0,ye,Me,N,ae),Q.unbindTexture()},this.copyTextureToTexture=function(w,U,F=null,O=null,N=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,w=arguments[1],U=arguments[2],N=arguments[3]||0,F=null);let ae,ye,Me,Te,De,Ue;F!==null?(ae=F.max.x-F.min.x,ye=F.max.y-F.min.y,Me=F.min.x,Te=F.min.y):(ae=w.image.width,ye=w.image.height,Me=0,Te=0),O!==null?(De=O.x,Ue=O.y):(De=0,Ue=0);let Ie=me.convert(U.format),it=me.convert(U.type);pe.setTexture2D(U,0),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);let _t=R.getParameter(R.UNPACK_ROW_LENGTH),bt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),fn=R.getParameter(R.UNPACK_SKIP_PIXELS),lt=R.getParameter(R.UNPACK_SKIP_ROWS),Re=R.getParameter(R.UNPACK_SKIP_IMAGES),en=w.isCompressedTexture?w.mipmaps[N]:w.image;R.pixelStorei(R.UNPACK_ROW_LENGTH,en.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,en.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Me),R.pixelStorei(R.UNPACK_SKIP_ROWS,Te),w.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,N,De,Ue,ae,ye,Ie,it,en.data):w.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,N,De,Ue,en.width,en.height,Ie,en.data):R.texSubImage2D(R.TEXTURE_2D,N,De,Ue,Ie,it,en),R.pixelStorei(R.UNPACK_ROW_LENGTH,_t),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,bt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,fn),R.pixelStorei(R.UNPACK_SKIP_ROWS,lt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Re),N===0&&U.generateMipmaps&&R.generateMipmap(R.TEXTURE_2D),Q.unbindTexture()},this.copyTextureToTexture3D=function(w,U,F=null,O=null,N=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,O=arguments[1]||null,w=arguments[2],U=arguments[3],N=arguments[4]||0);let ae,ye,Me,Te,De,Ue,Ie,it,_t,bt=w.isCompressedTexture?w.mipmaps[N]:w.image;F!==null?(ae=F.max.x-F.min.x,ye=F.max.y-F.min.y,Me=F.max.z-F.min.z,Te=F.min.x,De=F.min.y,Ue=F.min.z):(ae=bt.width,ye=bt.height,Me=bt.depth,Te=0,De=0,Ue=0),O!==null?(Ie=O.x,it=O.y,_t=O.z):(Ie=0,it=0,_t=0);let fn=me.convert(U.format),lt=me.convert(U.type),Re;if(U.isData3DTexture)pe.setTexture3D(U,0),Re=R.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)pe.setTexture2DArray(U,0),Re=R.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);let en=R.getParameter(R.UNPACK_ROW_LENGTH),ht=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Yn=R.getParameter(R.UNPACK_SKIP_PIXELS),Xs=R.getParameter(R.UNPACK_SKIP_ROWS),ki=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,bt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,bt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Te),R.pixelStorei(R.UNPACK_SKIP_ROWS,De),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ue),w.isDataTexture||w.isData3DTexture?R.texSubImage3D(Re,N,Ie,it,_t,ae,ye,Me,fn,lt,bt.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(Re,N,Ie,it,_t,ae,ye,Me,fn,bt.data):R.texSubImage3D(Re,N,Ie,it,_t,ae,ye,Me,fn,lt,bt),R.pixelStorei(R.UNPACK_ROW_LENGTH,en),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ht),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Yn),R.pixelStorei(R.UNPACK_SKIP_ROWS,Xs),R.pixelStorei(R.UNPACK_SKIP_IMAGES,ki),N===0&&U.generateMipmaps&&R.generateMipmap(Re),Q.unbindTexture()},this.initRenderTarget=function(w){xe.get(w).__webglFramebuffer===void 0&&pe.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?pe.setTextureCube(w,0):w.isData3DTexture?pe.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?pe.setTexture2DArray(w,0):pe.setTexture2D(w,0),Q.unbindTexture()},this.resetState=function(){D=0,T=0,A=null,Q.reset(),Ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===Gc?"display-p3":"srgb",t.unpackColorSpace=ut.workingColorSpace===ho?"display-p3":"srgb"}},Wa=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ke(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var qa=class extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},vc=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=tc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return qc("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},tn=new I,$a=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=In(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=In(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=In(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=In(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=In(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array),s=ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Rs=class extends Ci{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Er,fs=new I,Tr=new I,Ar=new I,Cr=new ee,ps=new ee,Ih=new pt,va=new I,ms=new I,ya=new I,Jd=new ee,Wl=new ee,Kd=new ee,Xa=class extends Et{constructor(e=new Rs){if(super(),this.isSprite=!0,this.type="Sprite",Er===void 0){Er=new Ot;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new vc(t,5);Er.setIndex([0,1,2,0,2,3]),Er.setAttribute("position",new $a(n,3,0,!1)),Er.setAttribute("uv",new $a(n,2,3,!1))}this.geometry=Er,this.material=e,this.center=new ee(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Tr.setFromMatrixScale(this.matrixWorld),Ih.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ar.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Tr.multiplyScalar(-Ar.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;_a(va.set(-.5,-.5,0),Ar,a,Tr,r,s),_a(ms.set(.5,-.5,0),Ar,a,Tr,r,s),_a(ya.set(.5,.5,0),Ar,a,Tr,r,s),Jd.set(0,0),Wl.set(1,0),Kd.set(1,1);let o=e.ray.intersectTriangle(va,ms,ya,!1,fs);if(o===null&&(_a(ms.set(-.5,.5,0),Ar,a,Tr,r,s),Wl.set(0,1),o=e.ray.intersectTriangle(va,ya,ms,!1,fs),o===null))return;let l=e.ray.origin.distanceTo(fs);l<e.near||l>e.far||t.push({distance:l,point:fs.clone(),uv:Zi.getInterpolation(fs,va,ms,ya,Jd,Wl,Kd,new ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function _a(i,e,t,n,r,s){Cr.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(ps.x=s*Cr.x-r*Cr.y,ps.y=r*Cr.x+s*Cr.y):ps.copy(Cr),i.copy(e),i.x+=ps.x,i.y+=ps.y,i.applyMatrix4(Ih)}var yc=class extends sn{constructor(e=null,t=1,n=1,r,s,a,o,l,c=on,u=on,d,h){super(null,a,o,l,c,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ya=class extends Zt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Rr=new pt,Qd=new pt,ba=[],eh=new ai,Lv=new pt,gs=new St,xs=new ji,li=class extends St{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ya(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Lv)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ai),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rr),eh.copy(e.boundingBox).applyMatrix4(Rr),this.boundingBox.union(eh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ji),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rr),xs.copy(e.boundingSphere).applyMatrix4(Rr),this.boundingSphere.union(xs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(gs.geometry=this.geometry,gs.material=this.material,gs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xs.copy(this.boundingSphere),xs.applyMatrix4(n),e.ray.intersectsSphere(xs)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Rr),Qd.multiplyMatrices(n,Rr),gs.matrixWorld=Qd,gs.raycast(e,ba);for(let a=0,o=ba.length;a<o;a++){let l=ba[a];l.instanceId=s,l.object=this,t.push(l)}ba.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ya(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new yc(new Float32Array(r*this.count),r,this.count,gh,ni));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Vr=class extends sn{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),r=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);let u=n[r],h=n[r+1]-u,f=(a-u)/h;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new ee:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new I,r=[],s=[],a=[],o=new I,l=new pt;for(let f=0;f<=e;f++){let g=f/e;r[f]=this.getTangentAt(g,new I)}s[0]=new I,a[0]=new I;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Vt(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(Vt(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],f*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ps=class extends Sn{constructor(e=0,t=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ee){let n=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},_c=class extends Ps{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Xc(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,d){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;h*=u,f*=u,r(a,o,h,f)},calc:function(s){let a=s*s,o=a*s;return i+e*s+t*a+n*o}}}var Sa=new I,ql=new Xc,$l=new Xc,Xl=new Xc,Ji=class extends Sn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new I){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Sa.subVectors(r[0],r[1]).add(r[0]),c=Sa);let d=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Sa.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Sa),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(h),f),p=Math.pow(h.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),p<1e-4&&(p=x),ql.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,g,x,p),$l.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,g,x,p),Xl.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,g,x,p)}else this.curveType==="catmullrom"&&(ql.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),$l.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),Xl.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return n.set(ql.calc(l),$l.calc(l),Xl.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new I().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function th(i,e,t,n,r){let s=(n-e)*.5,a=(r-t)*.5,o=i*i,l=i*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*i+t}function Dv(i,e){let t=1-i;return t*t*e}function Uv(i,e){return 2*(1-i)*i*e}function Nv(i,e){return i*i*e}function Ss(i,e,t,n){return Dv(i,e)+Uv(i,t)+Nv(i,n)}function Fv(i,e){let t=1-i;return t*t*t*e}function kv(i,e){let t=1-i;return 3*t*t*i*e}function Ov(i,e){return 3*(1-i)*i*i*e}function Bv(i,e){return i*i*i*e}function ws(i,e,t,n,r){return Fv(i,e)+kv(i,t)+Ov(i,n)+Bv(i,r)}var Za=class extends Sn{constructor(e=new ee,t=new ee,n=new ee,r=new ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ee){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ws(e,r.x,s.x,a.x,o.x),ws(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},bc=class extends Sn{constructor(e=new I,t=new I,n=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new I){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ws(e,r.x,s.x,a.x,o.x),ws(e,r.y,s.y,a.y,o.y),ws(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ja=class extends Sn{constructor(e=new ee,t=new ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ee){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Sc=class extends Sn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ja=class extends Sn{constructor(e=new ee,t=new ee,n=new ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ee){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ss(e,r.x,s.x,a.x),Ss(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wc=class extends Sn{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ss(e,r.x,s.x,a.x),Ss(e,r.y,s.y,a.y),Ss(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ka=class extends Sn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ee){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return n.set(th(o,l.x,c.x,u.x,d.x),th(o,l.y,c.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new ee().fromArray(r))}return this}},Mc=Object.freeze({__proto__:null,ArcCurve:_c,CatmullRomCurve3:Ji,CubicBezierCurve:Za,CubicBezierCurve3:bc,EllipseCurve:Ps,LineCurve:ja,LineCurve3:Sc,QuadraticBezierCurve:Ja,QuadraticBezierCurve3:wc,SplineCurve:Ka}),Ec=class extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Mc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new Mc[r.type]().fromJSON(r))}return this}},Qa=class extends Ec{constructor(e){super(),this.type="Path",this.currentPoint=new ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ja(this.currentPoint.clone(),new ee(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Ja(this.currentPoint.clone(),new ee(e,t),new ee(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new Za(this.currentPoint.clone(),new ee(e,t),new ee(n,r),new ee(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ka(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){let c=new Ps(e,t,n,r,s,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};var Gn=class i extends Ot{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],h=[],f=[],g=0,x=[],p=n/2,m=0;S(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Qe(d,3)),this.setAttribute("normal",new Qe(h,3)),this.setAttribute("uv",new Qe(f,2));function S(){let b=new I,D=new I,T=0,A=(t-e)/n;for(let L=0;L<=s;L++){let M=[],y=L/s,C=y*(t-e)+e;for(let z=0;z<=r;z++){let k=z/r,H=k*l+o,$=Math.sin(H),V=Math.cos(H);D.x=C*$,D.y=-y*n+p,D.z=C*V,d.push(D.x,D.y,D.z),b.set($,A,V).normalize(),h.push(b.x,b.y,b.z),f.push(k,1-y),M.push(g++)}x.push(M)}for(let L=0;L<r;L++)for(let M=0;M<s;M++){let y=x[M][L],C=x[M+1][L],z=x[M+1][L+1],k=x[M][L+1];u.push(y,C,k),u.push(C,z,k),T+=6}c.addGroup(m,T,0),m+=T}function v(b){let D=g,T=new ee,A=new I,L=0,M=b===!0?e:t,y=b===!0?1:-1;for(let z=1;z<=r;z++)d.push(0,p*y,0),h.push(0,y,0),f.push(.5,.5),g++;let C=g;for(let z=0;z<=r;z++){let H=z/r*l+o,$=Math.cos(H),V=Math.sin(H);A.x=M*V,A.y=p*y,A.z=M*$,d.push(A.x,A.y,A.z),h.push(0,y,0),T.x=$*.5+.5,T.y=V*.5*y+.5,f.push(T.x,T.y),g++}for(let z=0;z<r;z++){let k=D+z,H=C+z;b===!0?u.push(H,H+1,k):u.push(H+1,H,k),L+=3}c.addGroup(m,L,b===!0?1:2),m+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ki=class i extends Gn{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},eo=class i extends Ot{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];o(r),c(n),u(),this.setAttribute("position",new Qe(s,3)),this.setAttribute("normal",new Qe(s.slice(),3)),this.setAttribute("uv",new Qe(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(S){let v=new I,b=new I,D=new I;for(let T=0;T<t.length;T+=3)f(t[T+0],v),f(t[T+1],b),f(t[T+2],D),l(v,b,D,S)}function l(S,v,b,D){let T=D+1,A=[];for(let L=0;L<=T;L++){A[L]=[];let M=S.clone().lerp(b,L/T),y=v.clone().lerp(b,L/T),C=T-L;for(let z=0;z<=C;z++)z===0&&L===T?A[L][z]=M:A[L][z]=M.clone().lerp(y,z/C)}for(let L=0;L<T;L++)for(let M=0;M<2*(T-L)-1;M++){let y=Math.floor(M/2);M%2===0?(h(A[L][y+1]),h(A[L+1][y]),h(A[L][y])):(h(A[L][y+1]),h(A[L+1][y+1]),h(A[L+1][y]))}}function c(S){let v=new I;for(let b=0;b<s.length;b+=3)v.x=s[b+0],v.y=s[b+1],v.z=s[b+2],v.normalize().multiplyScalar(S),s[b+0]=v.x,s[b+1]=v.y,s[b+2]=v.z}function u(){let S=new I;for(let v=0;v<s.length;v+=3){S.x=s[v+0],S.y=s[v+1],S.z=s[v+2];let b=p(S)/2/Math.PI+.5,D=m(S)/Math.PI+.5;a.push(b,1-D)}g(),d()}function d(){for(let S=0;S<a.length;S+=6){let v=a[S+0],b=a[S+2],D=a[S+4],T=Math.max(v,b,D),A=Math.min(v,b,D);T>.9&&A<.1&&(v<.2&&(a[S+0]+=1),b<.2&&(a[S+2]+=1),D<.2&&(a[S+4]+=1))}}function h(S){s.push(S.x,S.y,S.z)}function f(S,v){let b=S*3;v.x=e[b+0],v.y=e[b+1],v.z=e[b+2]}function g(){let S=new I,v=new I,b=new I,D=new I,T=new ee,A=new ee,L=new ee;for(let M=0,y=0;M<s.length;M+=9,y+=6){S.set(s[M+0],s[M+1],s[M+2]),v.set(s[M+3],s[M+4],s[M+5]),b.set(s[M+6],s[M+7],s[M+8]),T.set(a[y+0],a[y+1]),A.set(a[y+2],a[y+3]),L.set(a[y+4],a[y+5]),D.copy(S).add(v).add(b).divideScalar(3);let C=p(D);x(T,y+0,S,C),x(A,y+2,v,C),x(L,y+4,b,C)}}function x(S,v,b,D){D<0&&S.x===1&&(a[v]=S.x-1),b.x===0&&b.z===0&&(a[v]=D/2/Math.PI+.5)}function p(S){return Math.atan2(S.z,-S.x)}function m(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}},Gr=class i extends eo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Wn=class extends Qa{constructor(e){super(e),this.uuid=Bn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new Qa().fromJSON(r))}return this}},zv={triangulate:function(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=Lh(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c,u,d,h,f;if(n&&(s=qv(i,e,s,t)),i.length>80*t){o=c=i[0],l=u=i[1];for(let g=t;g<r;g+=t)d=i[g],h=i[g+1],d<o&&(o=d),h<l&&(l=h),d>c&&(c=d),h>u&&(u=h);f=Math.max(c-o,u-l),f=f!==0?32767/f:0}return Is(s,a,t,o,l,f,0),a}};function Lh(i,e,t,n,r){let s,a;if(r===ny(i,e,t,n)>0)for(s=e;s<t;s+=n)a=nh(s,i[s],i[s+1],a);else for(s=t-n;s>=e;s-=n)a=nh(s,i[s],i[s+1],a);return a&&po(a,a.next)&&(Ds(a),a=a.next),a}function Qi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(po(t,t.next)||yt(t.prev,t,t.next)===0)){if(Ds(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Is(i,e,t,n,r,s,a){if(!i)return;!a&&s&&jv(i,n,r,s);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,s?Vv(i,n,r,s):Hv(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),Ds(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Gv(Qi(i),e,t),Is(i,e,t,n,r,s,2)):a===2&&Wv(i,e,t,n,r,s):Is(Qi(i),e,t,n,r,s,1);break}}}function Hv(i){let e=i.prev,t=i,n=i.next;if(yt(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=r<s?r<a?r:a:s<a?s:a,d=o<l?o<c?o:c:l<c?l:c,h=r>s?r>a?r:a:s>a?s:a,f=o>l?o>c?o:c:l>c?l:c,g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=f&&Ir(r,o,s,l,a,c,g.x,g.y)&&yt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Vv(i,e,t,n){let r=i.prev,s=i,a=i.next;if(yt(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,u=r.y,d=s.y,h=a.y,f=o<l?o<c?o:c:l<c?l:c,g=u<d?u<h?u:h:d<h?d:h,x=o>l?o>c?o:c:l>c?l:c,p=u>d?u>h?u:h:d>h?d:h,m=Tc(f,g,e,t,n),S=Tc(x,p,e,t,n),v=i.prevZ,b=i.nextZ;for(;v&&v.z>=m&&b&&b.z<=S;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=p&&v!==r&&v!==a&&Ir(o,u,l,d,c,h,v.x,v.y)&&yt(v.prev,v,v.next)>=0||(v=v.prevZ,b.x>=f&&b.x<=x&&b.y>=g&&b.y<=p&&b!==r&&b!==a&&Ir(o,u,l,d,c,h,b.x,b.y)&&yt(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;v&&v.z>=m;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=p&&v!==r&&v!==a&&Ir(o,u,l,d,c,h,v.x,v.y)&&yt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;b&&b.z<=S;){if(b.x>=f&&b.x<=x&&b.y>=g&&b.y<=p&&b!==r&&b!==a&&Ir(o,u,l,d,c,h,b.x,b.y)&&yt(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Gv(i,e,t){let n=i;do{let r=n.prev,s=n.next.next;!po(r,s)&&Dh(r,n,n.next,s)&&Ls(r,s)&&Ls(s,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Ds(n),Ds(n.next),n=i=s),n=n.next}while(n!==i);return Qi(n)}function Wv(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Qv(a,o)){let l=Uh(a,o);a=Qi(a,a.next),l=Qi(l,l.next),Is(a,e,t,n,r,s,0),Is(l,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function qv(i,e,t,n){let r=[],s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*n,l=s<a-1?e[s+1]*n:i.length,c=Lh(i,o,l,n,!1),c===c.next&&(c.steiner=!0),r.push(Kv(c));for(r.sort($v),s=0;s<r.length;s++)t=Xv(r[s],t);return t}function $v(i,e){return i.x-e.x}function Xv(i,e){let t=Yv(i,e);if(!t)return e;let n=Uh(t,i);return Qi(n,n.next),Qi(t,t.next)}function Yv(i,e){let t=e,n=-1/0,r,s=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){let h=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=s&&h>n&&(n=h,r=t.x<t.next.x?t:t.next,h===s))return r}t=t.next}while(t!==e);if(!r)return null;let o=r,l=r.x,c=r.y,u=1/0,d;t=r;do s>=t.x&&t.x>=l&&s!==t.x&&Ir(a<c?s:n,a,l,c,a<c?n:s,a,t.x,t.y)&&(d=Math.abs(a-t.y)/(s-t.x),Ls(t,i)&&(d<u||d===u&&(t.x>r.x||t.x===r.x&&Zv(r,t)))&&(r=t,u=d)),t=t.next;while(t!==o);return r}function Zv(i,e){return yt(i.prev,i,e.prev)<0&&yt(e.next,i,i.next)<0}function jv(i,e,t,n){let r=i;do r.z===0&&(r.z=Tc(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Jv(r)}function Jv(i){let e,t,n,r,s,a,o,l,c=1;do{for(t=i,i=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(r=t,t=t.nextZ,o--):(r=n,n=n.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;t=n}s.nextZ=null,c*=2}while(a>1);return i}function Tc(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Kv(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Ir(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function Qv(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!ey(i,e)&&(Ls(i,e)&&Ls(e,i)&&ty(i,e)&&(yt(i.prev,i,e.prev)||yt(i,e.prev,e))||po(i,e)&&yt(i.prev,i,i.next)>0&&yt(e.prev,e,e.next)>0)}function yt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function po(i,e){return i.x===e.x&&i.y===e.y}function Dh(i,e,t,n){let r=Ma(yt(i,e,t)),s=Ma(yt(i,e,n)),a=Ma(yt(t,n,i)),o=Ma(yt(t,n,e));return!!(r!==s&&a!==o||r===0&&wa(i,t,e)||s===0&&wa(i,n,e)||a===0&&wa(t,i,n)||o===0&&wa(t,e,n))}function wa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ma(i){return i>0?1:i<0?-1:0}function ey(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Dh(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ls(i,e){return yt(i.prev,i,i.next)<0?yt(i,e,i.next)>=0&&yt(i,i.prev,e)>=0:yt(i,e,i.prev)<0||yt(i,i.next,e)<0}function ty(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Uh(i,e){let t=new Ac(i.i,i.x,i.y),n=new Ac(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function nh(i,e,t,n){let r=new Ac(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Ds(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ac(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ny(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var wi=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];ih(e),rh(n,e);let a=e.length;t.forEach(ih);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,rh(n,t[l]);let o=zv.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function ih(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function rh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Wr=class i extends Ot{constructor(e=new Wn([new ee(.5,.5),new ee(-.5,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new Qe(r,3)),this.setAttribute("uv",new Qe(s,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:iy,v,b=!1,D,T,A,L;m&&(v=m.getSpacedPoints(u),b=!0,h=!1,D=m.computeFrenetFrames(u,!1),T=new I,A=new I,L=new I),h||(p=0,f=0,g=0,x=0);let M=o.extractPoints(c),y=M.shape,C=M.holes;if(!wi.isClockWise(y)){y=y.reverse();for(let X=0,J=C.length;X<J;X++){let re=C[X];wi.isClockWise(re)&&(C[X]=re.reverse())}}let k=wi.triangulateShape(y,C),H=y;for(let X=0,J=C.length;X<J;X++){let re=C[X];y=y.concat(re)}function $(X,J,re){return J||console.error("THREE.ExtrudeGeometry: vec does not exist"),X.clone().addScaledVector(J,re)}let V=y.length,ne=k.length;function G(X,J,re){let Q,te,xe,pe=X.x-J.x,ze=X.y-J.y,E=re.x-X.x,_=re.y-X.y,B=pe*pe+ze*ze,j=pe*_-ze*E;if(Math.abs(j)>Number.EPSILON){let Z=Math.sqrt(B),K=Math.sqrt(E*E+_*_),Ce=J.x-ze/Z,ue=J.y+pe/Z,he=re.x-_/K,We=re.y+E/K,se=((he-Ce)*_-(We-ue)*E)/(pe*_-ze*E);Q=Ce+pe*se-X.x,te=ue+ze*se-X.y;let Ee=Q*Q+te*te;if(Ee<=2)return new ee(Q,te);xe=Math.sqrt(Ee/2)}else{let Z=!1;pe>Number.EPSILON?E>Number.EPSILON&&(Z=!0):pe<-Number.EPSILON?E<-Number.EPSILON&&(Z=!0):Math.sign(ze)===Math.sign(_)&&(Z=!0),Z?(Q=-ze,te=pe,xe=Math.sqrt(B)):(Q=pe,te=ze,xe=Math.sqrt(B/2))}return new ee(Q/xe,te/xe)}let ge=[];for(let X=0,J=H.length,re=J-1,Q=X+1;X<J;X++,re++,Q++)re===J&&(re=0),Q===J&&(Q=0),ge[X]=G(H[X],H[re],H[Q]);let we=[],be,Ye=ge.concat();for(let X=0,J=C.length;X<J;X++){let re=C[X];be=[];for(let Q=0,te=re.length,xe=te-1,pe=Q+1;Q<te;Q++,xe++,pe++)xe===te&&(xe=0),pe===te&&(pe=0),be[Q]=G(re[Q],re[xe],re[pe]);we.push(be),Ye=Ye.concat(be)}for(let X=0;X<p;X++){let J=X/p,re=f*Math.cos(J*Math.PI/2),Q=g*Math.sin(J*Math.PI/2)+x;for(let te=0,xe=H.length;te<xe;te++){let pe=$(H[te],ge[te],Q);le(pe.x,pe.y,-re)}for(let te=0,xe=C.length;te<xe;te++){let pe=C[te];be=we[te];for(let ze=0,E=pe.length;ze<E;ze++){let _=$(pe[ze],be[ze],Q);le(_.x,_.y,-re)}}}let tt=g+x;for(let X=0;X<V;X++){let J=h?$(y[X],Ye[X],tt):y[X];b?(A.copy(D.normals[0]).multiplyScalar(J.x),T.copy(D.binormals[0]).multiplyScalar(J.y),L.copy(v[0]).add(A).add(T),le(L.x,L.y,L.z)):le(J.x,J.y,0)}for(let X=1;X<=u;X++)for(let J=0;J<V;J++){let re=h?$(y[J],Ye[J],tt):y[J];b?(A.copy(D.normals[X]).multiplyScalar(re.x),T.copy(D.binormals[X]).multiplyScalar(re.y),L.copy(v[X]).add(A).add(T),le(L.x,L.y,L.z)):le(re.x,re.y,d/u*X)}for(let X=p-1;X>=0;X--){let J=X/p,re=f*Math.cos(J*Math.PI/2),Q=g*Math.sin(J*Math.PI/2)+x;for(let te=0,xe=H.length;te<xe;te++){let pe=$(H[te],ge[te],Q);le(pe.x,pe.y,d+re)}for(let te=0,xe=C.length;te<xe;te++){let pe=C[te];be=we[te];for(let ze=0,E=pe.length;ze<E;ze++){let _=$(pe[ze],be[ze],Q);b?le(_.x,_.y+v[u-1].y,v[u-1].x+re):le(_.x,_.y,d+re)}}}W(),ie();function W(){let X=r.length/3;if(h){let J=0,re=V*J;for(let Q=0;Q<ne;Q++){let te=k[Q];He(te[2]+re,te[1]+re,te[0]+re)}J=u+p*2,re=V*J;for(let Q=0;Q<ne;Q++){let te=k[Q];He(te[0]+re,te[1]+re,te[2]+re)}}else{for(let J=0;J<ne;J++){let re=k[J];He(re[2],re[1],re[0])}for(let J=0;J<ne;J++){let re=k[J];He(re[0]+V*u,re[1]+V*u,re[2]+V*u)}}n.addGroup(X,r.length/3-X,0)}function ie(){let X=r.length/3,J=0;Se(H,J),J+=H.length;for(let re=0,Q=C.length;re<Q;re++){let te=C[re];Se(te,J),J+=te.length}n.addGroup(X,r.length/3-X,1)}function Se(X,J){let re=X.length;for(;--re>=0;){let Q=re,te=re-1;te<0&&(te=X.length-1);for(let xe=0,pe=u+p*2;xe<pe;xe++){let ze=V*xe,E=V*(xe+1),_=J+Q+ze,B=J+te+ze,j=J+te+E,Z=J+Q+E;Ge(_,B,j,Z)}}}function le(X,J,re){l.push(X),l.push(J),l.push(re)}function He(X,J,re){Be(X),Be(J),Be(re);let Q=r.length/3,te=S.generateTopUV(n,r,Q-3,Q-2,Q-1);R(te[0]),R(te[1]),R(te[2])}function Ge(X,J,re,Q){Be(X),Be(J),Be(Q),Be(J),Be(re),Be(Q);let te=r.length/3,xe=S.generateSideWallUV(n,r,te-6,te-3,te-2,te-1);R(xe[0]),R(xe[1]),R(xe[3]),R(xe[1]),R(xe[2]),R(xe[3])}function Be(X){r.push(l[X*3+0]),r.push(l[X*3+1]),r.push(l[X*3+2])}function R(X){s.push(X.x),s.push(X.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return ry(t,n,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Mc[r.type]().fromJSON(r)),new i(n,e.options)}},iy={generateTopUV:function(i,e,t,n,r){let s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[r*3],u=e[r*3+1];return[new ee(s,a),new ee(o,l),new ee(c,u)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],d=e[n*3+2],h=e[r*3],f=e[r*3+1],g=e[r*3+2],x=e[s*3],p=e[s*3+1],m=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new ee(a,1-l),new ee(c,1-d),new ee(h,1-g),new ee(x,1-m)]:[new ee(o,1-l),new ee(u,1-d),new ee(f,1-g),new ee(p,1-m)]}};function ry(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var to=class i extends eo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var no=class i extends Ot{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],l=[],c=[],u=[],d=e,h=(t-e)/r,f=new I,g=new ee;for(let x=0;x<=r;x++){for(let p=0;p<=n;p++){let m=s+p/n*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let x=0;x<r;x++){let p=x*(n+1);for(let m=0;m<n;m++){let S=m+p,v=S,b=S+n+1,D=S+n+2,T=S+1;o.push(v,b,T),o.push(b,D,T)}}this.setIndex(o),this.setAttribute("position",new Qe(l,3)),this.setAttribute("normal",new Qe(c,3)),this.setAttribute("uv",new Qe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Us=class i extends Ot{constructor(e=new Wn([new ee(0,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Qe(r,3)),this.setAttribute("normal",new Qe(s,3)),this.setAttribute("uv",new Qe(a,2));function c(u){let d=r.length/3,h=u.extractPoints(t),f=h.shape,g=h.holes;wi.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,m=g.length;p<m;p++){let S=g[p];wi.isClockWise(S)===!0&&(g[p]=S.reverse())}let x=wi.triangulateShape(f,g);for(let p=0,m=g.length;p<m;p++){let S=g[p];f=f.concat(S)}for(let p=0,m=f.length;p<m;p++){let S=f[p];r.push(S.x,S.y,0),s.push(0,0,1),a.push(S.x,S.y)}for(let p=0,m=x.length;p<m;p++){let S=x[p],v=S[0]+d,b=S[1]+d,D=S[2]+d;n.push(v,b,D),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return sy(t,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}};function sy(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}var Bt=class i extends Ot{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],d=new I,h=new I,f=[],g=[],x=[],p=[];for(let m=0;m<=n;m++){let S=[],v=m/n,b=0;m===0&&a===0?b=.5/t:m===n&&l===Math.PI&&(b=-.5/t);for(let D=0;D<=t;D++){let T=D/t;d.x=-e*Math.cos(r+T*s)*Math.sin(a+v*o),d.y=e*Math.cos(a+v*o),d.z=e*Math.sin(r+T*s)*Math.sin(a+v*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),p.push(T+b,1-v),S.push(c++)}u.push(S)}for(let m=0;m<n;m++)for(let S=0;S<t;S++){let v=u[m][S+1],b=u[m][S],D=u[m+1][S],T=u[m+1][S+1];(m!==0||a>0)&&f.push(v,b,T),(m!==n-1||l<Math.PI)&&f.push(b,D,T)}this.setIndex(f),this.setAttribute("position",new Qe(g,3)),this.setAttribute("normal",new Qe(x,3)),this.setAttribute("uv",new Qe(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ri=class i extends Ot{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],l=[],c=[],u=new I,d=new I,h=new I;for(let f=0;f<=n;f++)for(let g=0;g<=r;g++){let x=g/r*s,p=f/n*Math.PI*2;d.x=(e+t*Math.cos(p))*Math.cos(x),d.y=(e+t*Math.cos(p))*Math.sin(x),d.z=t*Math.sin(p),o.push(d.x,d.y,d.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/r),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=r;g++){let x=(r+1)*f+g-1,p=(r+1)*(f-1)+g-1,m=(r+1)*(f-1)+g,S=(r+1)*f+g;a.push(x,p,S),a.push(p,m,S)}this.setIndex(a),this.setAttribute("position",new Qe(o,3)),this.setAttribute("normal",new Qe(l,3)),this.setAttribute("uv",new Qe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var zt=class extends Ci{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_h,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Ea(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ay(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var qr=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Cc=class extends qr{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sd,endingEnd:sd}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case ad:s=e,o=2*t-n;break;case od:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ad:a=e,l=2*n-t;break;case od:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(r-t),x=g*g,p=x*g,m=-h*p+2*h*x-h*g,S=(1+h)*p+(-1.5-2*h)*x+(-.5+h)*g+1,v=(-1-f)*p+(1.5+f)*x+.5*g,b=f*p-f*x;for(let D=0;D!==o;++D)s[D]=m*a[u+D]+S*a[c+D]+v*a[l+D]+b*a[d+D];return s}},Rc=class extends qr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(r-t),d=1-u;for(let h=0;h!==o;++h)s[h]=a[c+h]*d+a[l+h]*u;return s}},Pc=class extends qr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ln=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ea(t,this.TimeBufferType),this.values=Ea(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ea(e.times,Array),values:Ea(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Pc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Rc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Cc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ca:t=this.InterpolantFactoryMethodDiscrete;break;case ec:t=this.InterpolantFactoryMethodLinear;break;case yl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ca;case this.InterpolantFactoryMethodLinear:return ec;case this.InterpolantFactoryMethodSmooth:return yl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&ay(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===yl,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{let d=o*n,h=d-n,f=d+n;for(let g=0;g!==n;++g){let x=t[d+g];if(x!==t[h+g]||x!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Ln.prototype.TimeBufferType=Float32Array;Ln.prototype.ValueBufferType=Float32Array;Ln.prototype.DefaultInterpolation=ec;var er=class extends Ln{constructor(e,t,n){super(e,t,n)}};er.prototype.ValueTypeName="bool";er.prototype.ValueBufferType=Array;er.prototype.DefaultInterpolation=Ca;er.prototype.InterpolantFactoryMethodLinear=void 0;er.prototype.InterpolantFactoryMethodSmooth=void 0;var Ic=class extends Ln{};Ic.prototype.ValueTypeName="color";var Lc=class extends Ln{};Lc.prototype.ValueTypeName="number";var Dc=class extends qr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let u=c+o;c!==u;c+=4)Ai.slerpFlat(s,0,a,c-o,a,c,l);return s}},io=class extends Ln{InterpolantFactoryMethodLinear(e){return new Dc(this.times,this.values,this.getValueSize(),e)}};io.prototype.ValueTypeName="quaternion";io.prototype.InterpolantFactoryMethodSmooth=void 0;var tr=class extends Ln{constructor(e,t,n){super(e,t,n)}};tr.prototype.ValueTypeName="string";tr.prototype.ValueBufferType=Array;tr.prototype.DefaultInterpolation=Ca;tr.prototype.InterpolantFactoryMethodLinear=void 0;tr.prototype.InterpolantFactoryMethodSmooth=void 0;var Uc=class extends Ln{};Uc.prototype.ValueTypeName="vector";var sh={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Nc=class{constructor(e,t,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},oy=new Nc,Ns=class{constructor(e){this.manager=e!==void 0?e:oy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ns.DEFAULT_MATERIAL_NAME="__DEFAULT";var Fc=class extends Ns{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=sh.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;let o=Ts("img");function l(){u(),sh.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){u(),r&&r(d),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}};var ro=class extends Ns{constructor(e){super(e)}load(e,t,n,r){let s=new sn,a=new Fc(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}},so=class extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},ao=class extends so{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Yl=new pt,ah=new I,oh=new I,kc=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ee(512,512),this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cs,this._frameExtents=new ee(1,1),this._viewportCount=1,this._viewports=[new kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ah.setFromMatrixPosition(e.matrixWorld),t.position.copy(ah),oh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(oh),t.updateMatrixWorld(),Yl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Yl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Oc=class extends kc{constructor(){super(new za(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},oo=class extends so{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new Oc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Yc="\\[\\]\\.:\\/",ly=new RegExp("["+Yc+"]","g"),Zc="[^"+Yc+"]",cy="[^"+Yc.replace("\\.","")+"]",uy=/((?:WC+[\/:])*)/.source.replace("WC",Zc),dy=/(WCOD+)?/.source.replace("WCOD",cy),hy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zc),fy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zc),py=new RegExp("^"+uy+dy+hy+fy+"$"),my=["material","materials","bones","map"],Bc=class{constructor(e,t,n){let r=n||vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},vt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ly,"")}static parseTrackName(e){let t=py.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);my.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};vt.Composite=Bc;vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};vt.prototype.GetterByBindingType=[vt.prototype._getValue_direct,vt.prototype._getValue_array,vt.prototype._getValue_arrayElement,vt.prototype._getValue_toArray];vt.prototype.SetterByBindingTypeAndVersioning=[[vt.prototype._setValue_direct,vt.prototype._setValue_direct_setNeedsUpdate,vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_array,vt.prototype._setValue_array_setNeedsUpdate,vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_arrayElement,vt.prototype._setValue_arrayElement_setNeedsUpdate,vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_fromArray,vt.prototype._setValue_fromArray_setNeedsUpdate,vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Db=new Float32Array(1);var lh=new pt,lo=class{constructor(e,t,n=0,r=1/0){this.ray=new Na(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new As,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return lh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(lh),this}intersectObject(e,t=!0,n=[]){return zc(e,this,n,t),n.sort(ch),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)zc(e[r],this,n,t);return n.sort(ch),n}};function ch(i,e){return i.distance-e.distance}function zc(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){let s=i.children;for(let a=0,o=s.length;a<o;a++)zc(s[a],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"165"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="165");var Pe=(i=0,e=0,t=0)=>new I(i,e,t),Ii=(i,e,t)=>$r.smoothstep(t,i,e),gy={stone:10067083,wall:12764077,roof:5465957,timber:7760724,window:4288120,reflection:9282978,frame:10464678,metal:5661538,soil:7828064,paving:9934985,road:7568235,teal:4619896,red:10315099,violet:7698054,leaf:6586979,gold:11838580,dark:3490624,water:4816521},xy={};function Li(i){return xy[i]||=new zt({color:gy[i],roughness:i==="window"?.3:.88,metalness:i==="window"?.25:.03})}function ci(i,e,t,n=0,r=0,s=0){let a=new St(e,Li(t));return a.position.set(n,r,s),a.castShadow=a.receiveShadow=!0,i.add(a),a}function Ae(i,e,t,n,r,s=0,a=0,o=0){return ci(i,new bn(e,t,n),r,s,a,o)}function jt(i,e,t,n,r=0,s=0,a=0,o=12){return ci(i,new Gn(e,e,t,o),n,r,s,a)}function xn(i,e,t,n,r="frame"){let s=e.clone().add(t).multiplyScalar(.5),a=jt(i,n,e.distanceTo(t),r,s.x,s.y,s.z,6);return a.quaternion.setFromUnitVectors(Pe(0,1,0),t.clone().sub(e).normalize()),a}function Yr(i){i.updateMatrixWorld(!0);let e=i.matrixWorld.clone().invert(),t=new Map;i.traverse(n=>{if(!n.isMesh||n.isInstancedMesh)return;let r=n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone();r.applyMatrix4(e.clone().multiply(n.matrixWorld));let s=t.get(n.material)||[];s.push(r),t.set(n.material,s)}),i.traverse(n=>{n.isMesh&&n.geometry.dispose()}),i.clear();for(let[n,r]of t){let s=new Ot;for(let o of["position","normal","uv"]){let l=o==="uv"?2:3,c=r.reduce((h,f)=>h+f.attributes.position.count,0),u=new Float32Array(c*l),d=0;for(let h of r){let f=h.attributes[o];f&&u.set(f.array,d),d+=h.attributes.position.count*l}s.setAttribute(o,new Zt(u,l))}r.forEach(o=>o.dispose()),s.computeBoundingSphere();let a=new St(s,n);a.castShadow=a.receiveShadow=!0,i.add(a)}}function kh(i){i.traverse(e=>{e.isMesh&&e.geometry.dispose()}),i.clear()}function gn(i,e,t,n,r,s,a,o=!1){let l=new je;if(l.position.set(e,0,t),i.add(l),Ae(l,n+.35,.24,r+.4,"stone",0,.05),Ae(l,n,s,r,"wall",0,s/2+.16),Ae(l,n+.04,.23,r+.04,a,0,s*.76),o){Ae(l,n+.35,.16,r+.35,"roof",0,s+.26);for(let c of[-1,1])Ae(l,.12,.28,r+.35,"frame",c*(n+.23)/2,s+.46);Ae(l,1,.45,.85,"metal",-n*.22,s+.55,-.5)}else{let c=n*.25,u=Math.atan2(c,n/2),d=new Wn;d.moveTo(-n/2,0),d.lineTo(n/2,0),d.lineTo(0,c),d.closePath();let h=new Wr(d,{depth:r,bevelEnabled:!1});h.translate(0,0,-r/2),ci(l,h,"wall",0,s+.16);for(let f of[-1,1]){let g=Ae(l,Math.hypot(n/2,c)+.25,.14,r+.5,"roof",f*n/4,s+.22+c/2);g.rotation.z=-f*u;for(let x=-r/2;x<=r/2;x+=.7){let p=Ae(l,Math.hypot(n/2,c)+.25,.035,.035,"metal",f*n/4,s+.31+c/2,x);p.rotation.z=-f*u}}}for(let c=-n/2+.7;c<n/2-.25;c+=1.05)for(let u of[-1,1])Ae(l,.63,.72,.055,"window",c,s*.56+.16,u*(r/2+.03)),Ae(l,.58,.12,.018,"reflection",c,s*.56+.4,u*(r/2+.065)),Ae(l,.7,.06,.15,"frame",c,s*.56-.23,u*(r/2+.05)),Ae(l,.035,.72,.07,"frame",c,s*.56+.16,u*(r/2+.04));Ae(l,.8,1.35,.09,"dark",.15,.81,r/2+.04),Ae(l,1.45,.1,.8,a,.15,1.6,r/2+.35);for(let c of[-.48,.78])Ae(l,.055,1.5,.055,"frame",c,.83,r/2+.65);for(let c=0;c<3;c++)Ae(l,1.25,.09,.4+c*.23,"stone",.15,.22-c*.065,r/2+.38);return l}function mo(i,e,t,n=.75){let r=Ae(i,2.4,.1,1.5,"frame",e,n,t);r.rotation.x=-.3;let s=Ae(i,2.25,.03,1.36,"window",e,n+.075,t);s.rotation.x=-.3;for(let a of[-.9,.9])Ae(i,.06,n,.08,"metal",e+a,n/2,t);for(let a=-2;a<=2;a++){let o=Ae(i,.025,.02,1.35,"frame",e+a*.4,n+.1,t);o.rotation.x=-.3}}function jc(i,e,t,n=1){let r=new je;r.position.set(e,0,t),r.scale.setScalar(n),i.add(r),Ae(r,4,.22,6,"stone",0,.1),Ae(r,3.8,1.7,5.8,"window",0,1);for(let s of[-1,1]){let a=Ae(r,2.2,.09,5.9,"window",s,2.24);a.rotation.z=-s*.45}for(let s=-2.8;s<=2.9;s+=.72)for(let a of[-1,1])xn(r,Pe(a*1.93,.2,s),Pe(a*1.93,1.8,s),.045),xn(r,Pe(a*1.93,1.8,s),Pe(0,2.73,s),.045);for(let s of[.45,1.65])for(let a of[-1.95,1.95])xn(r,Pe(a,s,-2.9),Pe(a,s,2.9),.035);Ae(r,.95,1.55,.07,"teal",0,.98,2.95);for(let s of[-3.3,3.3])for(let a=-2;a<=2;a+=1.35)Ae(r,1.5,.22,.9,"timber",s,.15,a),Ae(r,1.3,.25,.7,"leaf",s,.36,a)}function Fh(i,e,t,n=1){let r=new je;r.position.set(e,0,t),r.scale.setScalar(n),i.add(r),jt(r,2.4,.3,"stone",0,.12,0,32),jt(r,2.05,2.3,"wall",0,1.3,0,32),jt(r,2.13,.17,"violet",0,2.46,0,32),ci(r,new Bt(2.12,24,12,0,Math.PI*2,0,Math.PI/2),"frame",0,2.52);let s=ci(r,new Bt(2.15,8,12,1.38,.3,0,Math.PI/2),"dark",0,2.52);s.rotation.y=-.35,xn(r,Pe(0,3.2,0),Pe(0,4.3,2.4),.22,"metal"),Ae(r,.8,1.4,.12,"dark",0,.9,2.08);for(let a of[-1.1,1.1])Ae(r,.5,.7,.12,"window",a,1.4,1.76)}function Jc(i,e,t,n=12,r=3.4){Ae(i,r+.45,.4,n,"stone",e,-.04,t),Ae(i,r,.08,n,"timber",e,.21,t);for(let s=-n/2;s<=n/2;s+=.65)Ae(i,r,.035,.05,"metal",e,.265,t+s);for(let s of[-1,1]){let a=e+s*(r/2+.12);for(let o=-n/2;o<=n/2;o+=1.5)Ae(i,.14,1.05,.14,"frame",a,.66,t+o);for(let o of[.65,1.15])xn(i,Pe(a,o,t-n/2),Pe(a,o,t+n/2),.065);for(let o of[-n*.3,n*.3])Ae(i,.7,3,1.25,"stone",a,-1.1,t+o)}}var go=class{root=new je;water;ready;projects=new Map;loadouts=new Map;repairs=new Map;campuses=new Map;roads=[];locations;nodes;river=new Ji([Pe(-86,0,1),Pe(-62,0,5),Pe(-43,0,18),Pe(-24,0,22),Pe(-4,0,19),Pe(13,0,20),Pe(30,0,28),Pe(53,0,28),Pe(86,0,36)]);riverPoints;constructor(e,t,n,r){this.locations=t,this.nodes=n,this.riverPoints=this.river.getPoints(200),e.add(this.root),this.root.name="Expedition valley",this.makeRoads(),this.ready=this.landscape(r),this.vegetation(),this.infrastructure()}riverDistance(e,t){return Math.sqrt(Math.min(...this.riverPoints.map(n=>(n.x-e)**2+(n.z-t)**2)))}height(e,t){let n=this.riverDistance(e,t),r=-2.4+Ii(2.3,5.2,n)*2.34;if(n<5.2)return r;let s=Ii(47,79,-t),a=Ii(47,83,e),o=Ii(47,81,-e),l=Math.max(s,a,o)*(5+8*(.5+.5*Math.sin(e*.11+t*.07))),c=2.3*Math.exp(-((e+8)**2/55+(t+23)**2/85))+2.1*Math.exp(-((e-18)**2/44+(t+6)**2/90)),u=1;for(let d of Object.values(this.locations))u*=Ii(8,12,Math.hypot(e-d.x,t-d.z));for(let d of Object.values(this.nodes))for(let h of d)u*=Ii(2.3,4.3,Math.hypot(e-h.position.x,t-h.position.z));return-.065+(l+c)*u}makeRoads(){let e=this.locations.hq.clone().add(Pe(2.4,.02,4.5));for(let[t,n]of Object.entries(this.locations)){if(t==="hq")continue;let r=n.clone().add(Pe(2.4,.02,4.5)),s=t==="harbour"||t==="english",a=Pe(s?-10:10,.02,9.5),o=t==="grove"?Pe(20,.02,8.5):Pe(s?-12:12,.02,-5);this.roads.push(new Ji([e,a,o,r]).getPoints(64))}}roadPath(e,t,n="hq"){let r=Object.keys(this.locations).filter(d=>d!=="hq"),s=r.indexOf(t),a=this.locations.hq.clone().add(Pe(2.4,.02,4.5)),o=this.roads[r.indexOf(n)];if(t==="hq"){let d=o||this.roads.find(h=>e.distanceTo(h.at(-1))<3);return d?[e.clone(),...d.slice().reverse()]:[e.clone(),a]}let l=this.roads[s];if(!l)return[e.clone(),a];if(n===t)return[e.clone(),l.at(-1).clone()];let c=o||this.roads.find(d=>e.distanceTo(d.at(-1))<3),u=c?c.slice().reverse():e.distanceTo(a)>2?[a]:[];return[e.clone(),...u,...l.slice(1)]}ribbon(e,t,n,r,s=!1){let a=[],o=[],l=[];e.forEach((d,h)=>{let f=e[Math.min(h+1,e.length-1)].clone().sub(e[Math.max(0,h-1)]).normalize();for(let g of[-1,1]){let x=d.x+f.z*t*g/2,p=d.z-f.x*t*g/2;a.push(x,r+(s?this.height(x,p):0),p),o.push((g+1)/2,h/6)}if(h){let g=(h-1)*2;l.push(g,g+2,g+1,g+1,g+2,g+3)}});let c=new Ot;c.setAttribute("position",new Qe(a,3)),c.setAttribute("uv",new Qe(o,2)),c.setIndex(l),c.computeVertexNormals();let u=new St(c,n);return u.receiveShadow=!0,this.root.add(u),u}async landscape(e){let t=new oi(1500,1500);t.rotateX(-Math.PI/2);let n=new St(t,new zt({color:9214077,roughness:1}));n.position.y=-3.2,this.root.add(n);let r=new oi(230,210,180,168);r.rotateX(-Math.PI/2),r.translate(0,0,-12);let s=r.attributes.position,a=[],o=new ke;for(let x=0;x<s.count;x++){let p=s.getX(x),m=s.getZ(x),S=this.height(p,m),v=this.riverDistance(p,m);s.setY(x,S),o.set(9216381),o.lerp(new ke(11252378),Ii(1.5,10,S)*.7),o.lerp(new ke(10197382),(1-Ii(4.6,7.1,v))*.85),o.multiplyScalar(.96+.045*Math.sin(p*.27)*Math.cos(m*.31)),a.push(o.r,o.g,o.b)}r.setAttribute("color",new Qe(a,3)),r.computeVertexNormals();let l=new zt({vertexColors:!0,roughness:.98}),c=new St(r,l);c.receiveShadow=!0,c.castShadow=!0,c.name="Sculpted grass and stone valley",this.root.add(c);let u=new zt({color:4750728,metalness:.22,roughness:.28});this.water=this.ribbon(this.riverPoints,6.5,u,-1.02),this.water.name="Winding river";for(let x of this.roads)this.ribbon(x,3.2,Li("soil"),.075,!0),this.ribbon(x,2.65,Li("road"),.092,!0);for(let[x,p]of Object.entries(this.nodes)){let m=this.locations[x].clone().add(Pe(2.4,0,4.5));for(let S of p){let v=S.position,b=m.clone().lerp(v,.5);b.z+=1,this.ribbon(new Ji([m,b,v]).getPoints(20),1.35,Li("soil"),.083,!0)}}let d=x=>new Promise(p=>new ro().load(`./assets/${x}`,p,void 0,()=>{e.push(x),p(null)})),h=await d("valley-ground.jpg"),f=await d("ground-normal.jpg");if(h&&(h.colorSpace=Ft,h.wrapS=h.wrapT=ri,h.repeat.set(14,14),h.anisotropy=4,l.map=h,l.onBeforeCompile=x=>{x.fragmentShader=x.fragmentShader.replace("#include <map_fragment>",`#ifdef USE_MAP
vec4 grass = texture2D(map, vMapUv);
diffuseColor.rgb *= mix(vec3(1.0), grass.rgb, 0.46);
#endif`)},l.customProgramCacheKey=()=>"valley-grass-46"),f){f.wrapS=f.wrapT=ri,f.repeat.set(31,28),f.anisotropy=4,l.normalMap=f,l.normalScale.set(.32,.32);let x=f.clone();x.repeat.set(2,7),x.needsUpdate=!0,u.normalMap=x,u.normalScale.set(.14,.07),u.needsUpdate=!0}let g=await d("concrete-colour.jpg");if(g){g.colorSpace=Ft,g.wrapS=g.wrapT=ri,g.repeat.set(2,2),g.anisotropy=4;for(let x of["wall","stone"]){let p=Li(x);p.map=g,p.onBeforeCompile=m=>{m.fragmentShader=m.fragmentShader.replace("#include <map_fragment>",`#ifdef USE_MAP
diffuseColor.rgb *= mix(vec3(1.0), texture2D(map, vMapUv).rgb, 0.32);
#endif`)},p.customProgramCacheKey=()=>"valley-masonry-32",p.needsUpdate=!0}}l.needsUpdate=!0}vegetation(){let e=12091,t=()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296),n=[],r=[];for(let c=0;c<1700&&n.length<490;c++){let u=t()*158-79,d=t()*120-82,h=this.height(u,d);[[10,19.7],[12,-48],[44,6]].some(([g,x])=>Math.hypot(u-g,d-x)<7.5)||this.riverDistance(u,d)<6||Object.values(this.locations).some(g=>Math.hypot(u-g.x,d-g.z)<9)||Object.values(this.nodes).flat().some(g=>Math.hypot(u-g.position.x,d-g.position.z)<3)||Object.entries(this.nodes).some(([g,x])=>{let p=this.locations[g].clone().add(Pe(2.4,0,4.5));return x.some(m=>{let S=m.position,v=S.x-p.x,b=S.z-p.z,D=$r.clamp(((u-p.x)*v+(d-p.z)*b)/(v*v+b*b),0,1);return Math.hypot(u-p.x-v*D,d-p.z-b*D)<2.5})})||this.roads.some(g=>g.some(x=>Math.hypot(u-x.x,d-x.z)<3))||d>11&&t()>.25||t()>.62+.24*Math.sin(u*.13+d*.21)||n.push({x:u,y:h,z:d,s:.55+t()*.68,a:t()*6.28})}let s=new Et,a=(c,u,d)=>{let h=new je;for(let g=0;g<3;g++){let x=g/3,p=c*(1-x*.68),m=-u*.3+x*u*.68;for(let S=0;S<4;S++){let v=S/4*Math.PI*2+g*1.7+d,b=ci(h,new to(1,0),"leaf",Math.sin(v)*p*.48,m+Math.sin(v*3)*.08,Math.cos(v)*p*.48);b.scale.set(p*.53,u*.14*(1-x*.45),p*.81),b.rotation.set(.14,v,.08*Math.sin(v))}}let f=ci(h,new Ki(c*.25,u*.4,7),"leaf",0,u*.37);return f.rotation.y=d,Yr(h),h.children[0].geometry},o=[{geo:new Gn(.075,.17,3.8,6),colour:6577999,y:1.9,s:1},{geo:a(1.12,2.65,1),colour:4283725,y:2.2,s:1},{geo:a(.88,2.3,3),colour:5139541,y:3.15,s:1},{geo:a(.59,1.9,5),colour:6059867,y:4.05,s:1}];for(let c of o){let u=new li(c.geo,new zt({color:c.colour,roughness:1}),n.length);n.forEach((d,h)=>{s.position.set(d.x,d.y+c.y*d.s,d.z),s.scale.setScalar(d.s),s.rotation.set(0,d.a,.025*Math.sin(d.a)),s.updateMatrix(),u.setMatrixAt(h,s.matrix),u.setColorAt(h,new ke().setScalar(.86+h%7*.035))}),u.castShadow=u.receiveShadow=!0,u.name="Instanced conifer canopy",this.root.add(u)}for(let c=0;c<210;c++){let u=this.riverPoints[Math.floor(t()*this.riverPoints.length)],d=t()>.5?1:-1,h=u.x+(t()-.5)*3,f=u.z+d*(4.5+t()*2.2),g=this.height(h,f);r.push({x:h,y:g,z:f,s:.25+t()*.75,a:t()*6})}let l=new li(new Gr(1,0),Li("stone"),r.length);r.forEach((c,u)=>{s.position.set(c.x,c.y,c.z),s.scale.set(c.s*1.4,c.s*.8,c.s),s.rotation.set(c.a,c.a*.5,0),s.updateMatrix(),l.setMatrixAt(u,s.matrix)}),l.castShadow=l.receiveShadow=!0,this.root.add(l)}infrastructure(){let e=new je;this.root.add(e),Jc(e,-23,22,12),Jc(e,53,28,13),this.ribbon([Pe(-23,0,16),Pe(-23,0,13),Pe(-25,0,10),Pe(-28.6,0,-2.5)],2.8,Li("soil"),.12,!0),this.ribbon([Pe(-23,0,28),Pe(-23,0,32),Pe(0,0,34),Pe(25,0,38),Pe(53,0,36)],2.4,Li("soil"),.12,!0),Ae(e,7,.27,2.2,"timber",-35,-.2,15.2);for(let n=-38;n<=-32;n+=1.1)jt(e,.12,2.7,"timber",n,-1,16.2,8);ci(e,new Gn(1,.7,.65,6),"teal",-35,-.65,18).scale.set(1,1,2.7),Ae(e,1.1,.75,1.25,"wall",-35,-.03,17.7),Ae(e,1.2,.08,1.45,"roof",-35,.38,17.7);for(let n of[-30.8,-29.6])Ae(e,.8,.7,.9,"timber",n,.4,13.8);Yr(e);for(let n of["bridge","observatory","greenhouse"]){let r=new je;r.name=`Restoration: ${n}`,this.root.add(r),n==="bridge"&&Jc(r,10,19.7,13,4),n==="observatory"&&Fh(r,12,-48,.9),n==="greenhouse"&&jc(r,44,6,.85),Yr(r),r.visible=!1,this.projects.set(n,r)}for(let n of[2,5]){let r=new je;if(r.name=`HQ repair after ${n} resolved stations`,this.root.add(r),n===2){let s=new zt({color:16048045,emissive:16765578,emissiveIntensity:1.6,roughness:.5});for(let a of[-5.8,-2.4,1,4.4]){jt(r,.065,1.5,"metal",a,.75,12.2);let o=new St(new bn(.22,.24,.22),s);o.position.set(a,1.55,12.2),r.add(o),Ae(r,.32,.08,.32,"roof",a,1.72,12.2)}}else{for(let s of[-5.2,-2.1])mo(r,s,12.9,.9);for(let s of[4.8,6])Ae(r,.95,.75,.9,"timber",s,.4,9.2)}Yr(r),r.visible=!1,this.repairs.set(n,r)}}campus(e,t,n=1){let r=t||new je;t||(r.position.copy(this.locations[e]),this.root.add(r)),r.name=`${e} miniature campus`,r.userData.destination=e,this.campuses.set(e,r);let s={hq:"teal",harbour:"teal",english:"red",physics:"violet",chemistry:"teal",grove:"leaf"}[e];if(Ae(r,10.7,.08,8.1,"paving",0,-.01,-.8),e==="hq"){gn(r,-3.5,-3.2,4.8,4.5,2+.5*(n-1),s),gn(r,3.3,-3.2,4.3,4.2,2.3,"metal",!0),Ae(r,2.7,1.6,.09,"dark",3.3,.95,-1.04);for(let a=0;a<3;a++)Ae(r,2.6,.045,.05,"frame",3.3,.5+a*.48,-1);for(let a=0;a<5;a++)Ae(r,.85,.7,.9,a%2?"timber":"teal",-6.8+a*1.08,.4,3.3);for(let a of[-6.6,6.7])jt(r,.07,3.4,"metal",a,1.7,1),Ae(r,.5,.12,.28,"gold",a,3.45,1);if(n>1)for(let a=0;a<3;a++)mo(r,-4+a*3,-7.3);n>2&&(gn(r,-7.6,-2,2,2,5.2,"teal",!0),Ae(r,2.2,.8,2.2,"window",-7.6,4.7,-2))}else if(e==="harbour"){gn(r,-2.3,-2.4,5.6,4,2.6,s),gn(r,3.8,-.9,2.7,3.1,1.9,"gold",!0);for(let a=0;a<6;a++)Ae(r,1.45,.8+a%2*.7,1.1,a%2?"timber":"teal",-4.8+a*1.7,.5+a%2*.35,2.2);for(let a of[-4.5,4.5])xn(r,Pe(a,0,3.7),Pe(a,4.7,3.7),.11,"gold");xn(r,Pe(-4.5,4.7,3.7),Pe(4.5,4.7,3.7),.14,"gold"),xn(r,Pe(-1,4.7,3.7),Pe(-1,2.3,3.7),.035,"metal")}else if(e==="english"){gn(r,-1.8,-2.2,5.6,4.5,2.7,s),gn(r,3.1,-1.1,2.9,3.2,2,s),gn(r,-4.8,1.8,1.6,1.7,4.6,s,!0);let a=jt(r,.5,.06,"wall",-4.8,3.75,2.7,24);a.rotation.x=Math.PI/2,xn(r,Pe(-4.8,3.75,2.75),Pe(-4.8,4.1,2.75),.025,"dark"),xn(r,Pe(-4.8,3.75,2.75),Pe(-4.52,3.75,2.75),.025,"dark");for(let o of[-1,2]){Ae(r,1.8,.13,.55,"timber",o,.55,3);for(let l of[-.65,.65])Ae(r,.08,.5,.5,"metal",o+l,.25,3)}}else if(e==="physics"){Fh(r,-2.1,-1.7),gn(r,3.3,-.7,3.4,3.8,2.1,s,!0);for(let a of[-4,-.9,2.2])mo(r,a,3.4);jt(r,.09,5,"frame",5,2.5,-3.4),xn(r,Pe(4,4.6,-3.4),Pe(6,4.6,-3.4),.06)}else if(e==="chemistry"){gn(r,-1.9,-1.9,5.7,4.4,2.5,s,!0),gn(r,3.9,-.1,2.5,3.2,1.9,s,!0);for(let a of[-4.2,-2.3,-.4])jt(r,.58,2,"frame",a,1.1,2.4),jt(r,.6,.15,"teal",a,2.16,2.4),xn(r,Pe(a,2.2,2.4),Pe(a,3,-.2),.075,"metal");for(let a of[-3.3,-.7])jt(r,.22,1.25,"metal",a,3.3,-2.7),jt(r,.32,.1,"frame",a,3.98,-2.7)}else{jc(r,-1.4,-1.5,.86),gn(r,4.1,.2,2.7,3.5,1.9,s);for(let a=0;a<4;a++)Ae(r,2.8,.16,.6,"timber",-4.7,.1,-2+a*1.3),Ae(r,2.6,.26,.44,"leaf",-4.7,.3,-2+a*1.3);jt(r,.75,1.8,"teal",4.3,.98,-3.2)}for(let[a,o]of(this.nodes[e]||[]).entries()){let l=o.position.clone().sub(this.locations[e]),c=l.x+(e==="grove"&&a===3?-3.3:0);Ae(r,3.2,.08,3.5,"paving",c,-.005,l.z-1.25),e==="grove"&&a===1?jc(r,l.x,l.z-2,.45):gn(r,c,l.z-2,2.45+a%2*.4,2.3,1.4+a%3*.15,s,e==="chemistry"),jt(r,.055,1.5,"metal",l.x+1.5,.75,l.z),Ae(r,.34,.36,.08,s,l.x+1.5,1.3,l.z),a%2===0&&mo(r,l.x+2.7,l.z-2,.6)}return Yr(r),r}syncCampaign(e,t){let n=e?.projectsBuilt??e?.builtProjects??e?.projects??[],r=t??e?.totalResolved??(Array.isArray(e?.resolvedStations)?e.resolvedStations.length:Number(e?.resolvedStations)||0);for(let[s,a]of this.repairs)a.visible=r>=s;for(let[s,a]of this.projects)a.visible=Array.isArray(n)?n.some(o=>o===s||o?.id===s&&(o.built===!0||o.status==="built"||o.completed===!0)):n[s]===!0||n[s]?.built===!0||n[s]?.status==="built"}setLoadout(e,t){if(!this.loadouts.size)for(let r of["survey","engineering","ecology"]){let s=new je;if(s.name=`Atlas ${r} equipment`,e.add(s),r==="survey"&&(jt(s,.04,1.4,"frame",-.8,2.2,-1.5),ci(s,new Bt(.23,12,8),"wall",-.8,2.95,-1.5),Ae(s,.52,.38,.55,"window",.75,1.92,-1.5)),r==="engineering"){Ae(s,2.1,.35,.45,"gold",0,.53,2.5);for(let a of[-.75,.75])xn(s,Pe(a,.6,1.6),Pe(a,.55,2.5),.065,"metal")}if(r==="ecology")for(let a of[-.85,.85])Ae(s,.55,.65,.8,"teal",a,1.98,-1.5),Ae(s,.59,.08,.84,"frame",a,2.34,-1.5);Yr(s),this.loadouts.set(r,s)}let n={scout:"survey",surveyor:"survey",hauler:"engineering",builder:"engineering",engineer:"engineering",botanist:"ecology",ranger:"ecology"};for(let[r,s]of this.loadouts)s.visible=r===(n[t]||t)}};var fe=(i=0,e=0,t=0)=>new I(i,e,t),Ht={hq:fe(0,0,5),harbour:fe(-31,0,-7),english:fe(-19,0,-30),physics:fe(4,0,-38),chemistry:fe(30,0,-25),grove:fe(33,0,3)},Fs=(i,e)=>[fe(-7.7,0,-4.5),fe(7.4,0,-4),fe(-9.9,0,6.9),fe(9.3,0,7.5),fe(0,0,12.3)].map((t,n)=>({id:`station-${n}`,label:e[n],position:i.clone().add(t)})),xo={harbour:Fs(Ht.harbour,["Multiplication Depot","Addition Dispatch","Division Workshop","Subtraction Yard","Place Value Tower"]),english:Fs(Ht.english,["Word Archive","Sentence Studio","Spelling Signal","Reading Room","Story Press"]),physics:Fs(Ht.physics,["Force Track","Light Observatory","Sound Lab","Circuit Station","Energy Workshop"]),chemistry:Fs(Ht.chemistry,["Matter Hall","Mixture Lab","Changes Chamber","Properties Bay","Particle Observatory"]),grove:Fs(Ht.grove,["Seed Lab","Habitat Dome","Life-Cycle Nursery","Food-Web Field","Adaptation Clinic"])},vy={hq:"Headquarters",harbour:"Maths Operations",english:"English Communications",physics:"Physics Research",chemistry:"Chemistry Laboratory",grove:"Life Sciences BioDome"},vo={hq:{colour:3647626,symbol:"HQ"},harbour:{colour:1292209,symbol:"x"},english:{colour:15757171,symbol:"Aa"},physics:{colour:7891176,symbol:"atom"},chemistry:{colour:2409637,symbol:"flask"},grove:{colour:11063107,symbol:"leaf"}},Kc=$r.clamp,Fb=$r.lerp,yy={};function Tt(i,e,t=0,n=.8){return yy[i]||=new zt({color:e,metalness:t,roughness:n})}var Dn=Tt("armour",6844762,.5,.54),Jt=Tt("edge",4541760,.65,.6),rt=Tt("steel",6911355,.8,.35),cn=Tt("rubber",2238506,.1,.96),nr=Tt("concrete",11382951,.04,.94),Di=Tt("blue",3038055,.4,.6),qn=Tt("safety",14267735,.35,.6),ks=Tt("glass",2180694,.65,.19),Qc=new zt({color:15333358,emissive:12049868,emissiveIntensity:1.2}),_y=new zt({color:15783032,emissive:8018454,emissiveIntensity:.85,roughness:.5,transparent:!0,opacity:.94}),Oh=new zt({color:15726287,emissive:10471260,emissiveIntensity:1.4,roughness:.35,transparent:!0,opacity:.9});function by(){let i=document.createElement("canvas");i.width=i.height=256;let e=i.getContext("2d"),t=e.createImageData(256,256),n=71;for(let s=0;s<t.data.length;s+=4){n=n*1664525+1013904223>>>0;let a=191+n%38;t.data.set([a,a,a-3,255],s)}e.putImageData(t,0,0),e.strokeStyle="#9b9d9230",e.lineWidth=.5;for(let s=0;s<256;s+=6)e.beginPath(),e.moveTo(0,s),e.lineTo(256,s+2),e.stroke();let r=new Vr(i);return r.wrapS=r.wrapT=ri,r.repeat.set(3,3),r.colorSpace=Ft,r}function mt(i,e,t,n=0,r=0,s=0){let a=new St(e,t);return a.position.set(n,r,s),a.castShadow=!0,a.receiveShadow=!0,i.add(a),a}function Ve(i,e,t,n,r,s=0,a=0,o=0){return mt(i,new bn(e,t,n),r,s,a,o)}function Xe(i,e,t,n,r,s=0,a=0,o=0,l=16){return mt(i,new Gn(e,t,n,l),r,s,a,o)}function Lt(i,e,t,n,r){let s=e.clone().add(t).multiplyScalar(.5),a=Xe(i,n,n,e.distanceTo(t),r,s.x,s.y,s.z,8);return a.quaternion.setFromUnitVectors(fe(0,1,0),t.clone().sub(e).normalize()),a}function Zr(i,e,t,n,r,s=0,a=0,o=0,l=.12){let c=new Wn;c.moveTo(-e/2+l,-n/2),c.lineTo(e/2-l,-n/2),c.lineTo(e/2,-n/2+l),c.lineTo(e/2,n/2-l),c.lineTo(e/2-l,n/2),c.lineTo(-e/2+l,n/2),c.lineTo(-e/2,n/2-l),c.lineTo(-e/2,-n/2+l),c.closePath();let u=new Wr(c,{depth:t,bevelEnabled:!0,bevelThickness:l/2,bevelSize:l/2,bevelSegments:2,steps:1});return u.rotateX(-Math.PI/2),u.translate(0,-t/2,0),mt(i,u,r,s,a,o)}function yo(i,e,t,n,r,s,a="#eef3ed"){let o=document.createElement("canvas");o.width=512,o.height=128;let l=o.getContext("2d");l.font="bold 65px Arial",l.textAlign="center",l.textBaseline="middle",l.fillStyle=a,l.fillText(e,256,64);let c=new Vr(o);c.colorSpace=Ft;let u=mt(i,new oi(s,s/4),new Hn({map:c,transparent:!0,depthWrite:!1}),t,n,r);return u.castShadow=!1,u}function Os(i,e,t=!1){let n=document.createElement("canvas");n.width=n.height=256;let r=n.getContext("2d"),s=`#${e.toString(16).padStart(6,"0")}`,a=r.createRadialGradient(128,128,12,128,128,116);if(a.addColorStop(0,t?"#d9ff8d":"#ffffff"),a.addColorStop(.38,t?"#54ef9b":s),a.addColorStop(.7,`${t?"#2fe48d":s}a8`),a.addColorStop(1,`${t?"#2fe48d":s}00`),r.fillStyle=a,r.beginPath(),r.arc(128,128,116,0,Math.PI*2),r.fill(),r.fillStyle=t?"#176844":"#fff",r.strokeStyle=t?"#edffd8":"#ffffff",r.lineWidth=11,r.lineCap="round",r.lineJoin="round",t)r.beginPath(),r.moveTo(78,129),r.lineTo(112,161),r.lineTo(181,88),r.stroke();else if(i==="atom"){r.lineWidth=7;for(let l of[0,Math.PI/3,-Math.PI/3])r.save(),r.translate(128,128),r.rotate(l),r.beginPath(),r.ellipse(0,0,63,25,0,0,Math.PI*2),r.stroke(),r.restore();r.beginPath(),r.arc(128,128,10,0,Math.PI*2),r.fill()}else i==="flask"?(r.beginPath(),r.moveTo(108,70),r.lineTo(148,70),r.moveTo(117,70),r.lineTo(117,111),r.lineTo(82,169),r.quadraticCurveTo(78,185,98,187),r.lineTo(158,187),r.quadraticCurveTo(178,185,174,169),r.lineTo(139,111),r.lineTo(139,70),r.stroke(),r.fillStyle="#fff9",r.beginPath(),r.moveTo(99,159),r.lineTo(157,159),r.lineTo(170,181),r.lineTo(86,181),r.closePath(),r.fill()):i==="leaf"?(r.beginPath(),r.moveTo(83,165),r.bezierCurveTo(72,97,118,63,181,73),r.bezierCurveTo(185,137,146,177,83,165),r.fill(),r.strokeStyle=s,r.lineWidth=7,r.beginPath(),r.moveTo(91,158),r.lineTo(166,89),r.stroke()):(r.font=i==="Aa"?"800 74px Arial":"900 96px Arial",r.textAlign="center",r.textBaseline="middle",r.fillText(i,128,130));let o=new Vr(n);return o.colorSpace=Ft,o.needsUpdate=!0,o}var _o=class{renderer;scene;camera;tank;tracks=[];wheels=[];group;hq;dish;rig;water;canvas;routeLayer=new je;waypoint=new je;waypointRing;dustPuffs=[];view="hq";destination="hq";yaw=.72;radius=17;elevation=10;target=fe(0,1,0);cameraGoal=fe();lookGoal=fe();travel=null;paused=!1;reduced=!1;running=!0;frame=0;last=0;clock=0;onTravelEnd=null;onFrame=null;onDestinationPick=null;width=0;height=0;hqLevel=0;ready;textureErrors=[];currentArea="hq";framingKey="";selectedNodeKey="";mapSelection=!1;markerLayer=new je;mapMarkers=new Map;stationMarkers=new Map;animatedProps=[];completedMarkerTexture=Os("check",5566363,!0);resizeObserver;scenery;constructor(e){this.canvas=e,this.renderer=new Ga({canvas:e,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Hc,this.renderer.outputColorSpace=Ft,this.renderer.toneMapping=Vc,this.renderer.toneMappingExposure=1.06,this.scene=new qa,this.scene.background=new ke(12964815),Dn.map=by(),Jt.map=Dn.map,Di.map=Dn.map,this.scene.fog=new Wa(12964815,.007),this.camera=new rn(42,1,.1,650),this.camera.position.set(15,10,18),this.scene.add(new ao(15331309,6581332,1.65));let t=new oo(16771271,2.4);t.position.set(-38,65,25),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-78,right:78,top:78,bottom:-78,near:.5,far:190}),t.shadow.normalBias=.06,t.shadow.bias=-15e-5,t.target.position.set(0,0,-15),this.scene.add(t,t.target),this.group=new je,this.scene.add(this.group),this.group.add(this.routeLayer,this.waypoint,this.markerLayer),this.waypoint.visible=!1,this.waypointRing=mt(this.waypoint,new Ri(1.05,.11,12,40),Oh,0,.18,0),this.waypointRing.rotation.x=Math.PI/2;let n=Xe(this.waypoint,.045,.11,3.7,Oh,0,1.95,0,14);n.castShadow=!1,this.ready=this.createLandscape(),this.hq=new je,this.group.add(this.hq),this.createBase(1),this.createHarbour(),this.createEnglishDistrict(),this.createPhysicsDistrict(),this.createChemistryDistrict(),this.createScienceBase(),this.tank=this.createTank(),this.createWorldMarkers(),this.tank.position.copy(Ht.hq).add(fe(2.4,.02,4.5)),this.tank.rotation.y=.3,this.group.add(this.tank),this.createDust(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e.parentElement);let r=null,s=0,a=0,o=0,l=!1;e.addEventListener("pointerdown",c=>{this.travel||!c.isPrimary||c.button!==0||(r=c.pointerId,a=s=c.clientX,o=c.clientY,l=!1,e.setPointerCapture(c.pointerId))}),e.addEventListener("pointermove",c=>{c.pointerId===r&&(Math.hypot(c.clientX-a,c.clientY-o)>8&&(l=!0),l&&(this.yaw+=(s-c.clientX)*.005),s=c.clientX)}),e.addEventListener("pointerup",c=>{if(c.pointerId!==r)return;let u=!l&&Math.hypot(c.clientX-a,c.clientY-o)<=8;r=null,e.hasPointerCapture(c.pointerId)&&e.releasePointerCapture(c.pointerId),u&&this.view==="map"&&!this.travel&&this.pickDestination(c.clientX,c.clientY)});for(let c of["pointercancel","lostpointercapture"])e.addEventListener(c,()=>{r=null});e.addEventListener("webglcontextlost",c=>{c.preventDefault(),this.running=!1,e.dispatchEvent(new CustomEvent("world-error",{detail:"Graphics paused. Reload to restore the scene; your saved progress is safe."}))}),this.resize(),this.setView("hq"),this.animate(0)}createDust(){let e=new Bt(.48,8,5);for(let t=0;t<9;t++){let n=new Hn({color:12036747,transparent:!0,opacity:0,depthWrite:!1}),r=mt(this.group,e,n);r.castShadow=!1,r.visible=!1,this.dustPuffs.push(r)}}createBeacon(e,t,n=!1,r=e){let s=vo[r]||vo.hq,a=new je;a.position.copy(t),a.position.y=n?3.25:5.5,a.visible=!1;let o=new Xa(new Rs({map:Os(n?"":s.symbol,s.colour),transparent:!0,depthTest:!1,depthWrite:!1}));o.scale.setScalar(n?2.8:4.35),o.renderOrder=20,a.add(o);let l=new Hn({color:s.colour,transparent:!0,opacity:.48,blending:Ms,depthWrite:!1}),c=mt(a,new no(n?.58:.9,n?.76:1.18,40),l,0,-a.position.y+.19,0);c.rotation.x=-Math.PI/2,c.castShadow=!1,c.renderOrder=3;let u=new Hn({color:s.colour,transparent:!0,opacity:.16,blending:Ms,depthWrite:!1,side:Rn}),d=Xe(a,n?.18:.3,n?.48:.72,n?2.5:4.4,u,0,-a.position.y/2+.28,0,32);d.castShadow=!1,d.renderOrder=2;let h={id:e,root:a,sprite:o,halo:c,beam:d,style:s,station:n,selected:!1,completed:!1,baseY:a.position.y};return this.markerLayer.add(a),h}createWorldMarkers(){for(let[e,t]of Object.entries(Ht))this.mapMarkers.set(e,this.createBeacon(e,t));for(let[e,t]of Object.entries(xo))for(let n of t){let r=this.createBeacon(n.id,n.position,!0,e);r.region=e,r.index=Number(n.id.split("-")[1]),r.sprite.material.map=Os(String(r.index+1),vo[e].colour),r.sprite.material.needsUpdate=!0,this.stationMarkers.set(`${e}:${n.id}`,r)}}syncMarkers(e){this.mapSelection=!!e.selectedRegion;let t=e.view==="map"||e.view==="region-info";for(let[n,r]of this.mapMarkers){r.root.visible=t||e.view==="region"&&n==="hq";let s=e.completedRegions?.includes(n)||!1,a=e.selectedRegion===n;r.completed!==s&&(r.completed=s,r.sprite.material.map=s?this.completedMarkerTexture:Os(r.style.symbol,r.style.colour),r.sprite.material.needsUpdate=!0),r.selected=a,r.halo.material.opacity=a?.64:s?.5:.18,r.beam.material.opacity=a?.19:s?.13:.04,r.halo.userData.baseOpacity=r.halo.material.opacity,r.beam.userData.baseOpacity=r.beam.material.opacity}for(let n of this.stationMarkers.values()){let r=e.view==="region"&&n.region===e.region;if(n.root.visible=r,!r)continue;let s=e.stations?.[n.index],a=!!s?.resolved,o=e.selectedStation===s?.id;n.completed!==a&&(n.completed=a,n.sprite.material.map=a?this.completedMarkerTexture:Os(String(n.index+1),vo[n.region].colour),n.sprite.material.needsUpdate=!0),n.selected=o,n.halo.material.opacity=o?.66:a?.48:.18,n.beam.material.opacity=o?.18:.04,n.halo.userData.baseOpacity=n.halo.material.opacity,n.beam.userData.baseOpacity=n.beam.material.opacity}}async createLandscape(){this.scenery=new go(this.group,Ht,xo,this.textureErrors),this.water=this.scenery.water,await this.scenery.ready}syncCampaign(e,t){this.scenery.syncCampaign(e,t)}setLoadout(e){this.scenery.setLoadout(this.tank,e)}pickDestination(e,t){if(this.view!=="map"||this.travel)return null;let n=this.canvas.getBoundingClientRect(),r=new lo;r.setFromCamera(new ee((e-n.left)/n.width*2-1,1-(t-n.top)/n.height*2),this.camera);let a=r.intersectObjects([...this.scenery.campuses.values()],!0)[0]?.object;for(;a&&!a.userData.destination;)a=a.parent;let o=a?.userData.destination;return o&&this.onDestinationPick?.(o),o||null}focusProject(e){let t={bridge:fe(10,0,19.7),observatory:fe(12,0,-48),greenhouse:fe(44,0,6)};return t[e]?(this.view="project",this.framingKey=`project:${e}`,this.target.copy(t[e]).add(fe(0,1.2,0)),this.radius=e==="bridge"?20:14,this.elevation=e==="bridge"?16:10,this.yaw=.52,!0):!1}tree(e,t,n){let r=new je;r.position.set(e,0,t),r.scale.setScalar(n),this.group.add(r),Xe(r,.1,.25,5.3,Tt("bark",5327677),0,2.65,0,9);let s=[Tt("pine0",3098937),Tt("pine1",4020289),Tt("pine2",5335627)];for(let o=0;o<7;o++){let l=2.1+o*.55,c=1.55-o*.13,u=new Gr(1,1),d=mt(r,u,s[o%s.length],o%2?.18:-.12,l,(o%3-1)*.14);d.scale.set(c,.72,c*.9),d.rotation.set(o*.17,o*.83,o*.08)}let a=mt(r,new Ki(.62,1.5,12),s[0],0,5.55,0);a.rotation.y=.4}fieldNode(e,t,n,r,s){Xe(e,.58,.66,.08,Tt("node-pad",5593941,.08,.94),t,.1,n,20);let a=mt(e,new Ri(.48,.045,8,24),s,t,.17,n);a.rotation.x=Math.PI/2;let o=Xe(e,.09,.09,.09,Qc,t,.25,n,12);o.castShadow=!1}sitePad(e,t,n=7.2,r=5.6,s=null){let a=new je;a.position.set(t.x,0,t.z),a.scale.setScalar(.54),e.add(a);let o=new Wn;for(let d=0;d<18;d++){let h=d/18*Math.PI*2,f=1+Math.sin(d*2.7)*.07+Math.cos(d*1.9)*.04,g=Math.cos(h)*n*.5*f,x=Math.sin(h)*r*.5*f;d?o.lineTo(g,x):o.moveTo(g,x)}o.closePath();let l=s?.color?.clone?.().lerp(new ke(13428396),.64)||new ke(9548663),c=new zt({color:l,roughness:.92}),u=mt(a,new Us(o),c,0,.045,0);return u.rotation.x=-Math.PI/2,u.receiveShadow=!0,u.castShadow=!1,a}missionOutpost(e,t,n,r,s){let a=this.sitePad(e,t,6.8,5.2,r),o=Tt(`mission-cream-${s}`,16773073,.03,.82),l=Tt(`mission-window-${s}`,6272706,.22,.3);if(s==="M"){let u=Xe(a,1.75,2.05,1.35,o,0,.78,0,24);for(let h=0;h<=n+2;h++)Ve(a,.58,.42,.58,h%2?r:l,-1.35+h*.62,1.65+h%2*.24,0);let d=mt(a,new Ri(1.35,.11,10,32,Math.PI),r,0,2.15,0);d.rotation.z=Math.PI,d.rotation.y=Math.PI/2}else if(s==="E"){Xe(a,1.85,2.1,1.2,o,0,.7,0,24);for(let h of[-1,1]){let f=Ve(a,2.25,.12,2.4,o,h*1.02,1.55,0);f.rotation.z=h*-.26}let u=Xe(a,.18,.18,3.1,r,2.2,1.55,.4,12),d=mt(a,new Ki(.18,.5,12),cn,2.2,3.35,.4);u.rotation.z=d.rotation.z=-.08}else if(s==="P"){Xe(a,1.8,2.05,1.15,o,0,.66,0,24);let u=mt(a,new Bt(.72,20,12),l,0,2.15,0),d=new je;d.position.set(0,2.15,0),a.add(d);for(let h of[0,Math.PI/3])mt(d,new Ri(1.2,.06,8,36),r).rotation.set(Math.PI/2,h,h);this.animatedProps.push({kind:"spin",object:d,speed:.25+n*.03,phase:n})}else if(s==="C"){Xe(a,1.75,2.1,1.2,o,0,.7,0,24);let u=new je;u.position.set(0,1.4,0),a.add(u),mt(u,new Bt(.9,20,13),l,0,.65,0),Xe(u,.34,.42,1.35,o,0,1.65,0,18);for(let d=0;d<4;d++){let h=mt(u,new Bt(.13+d*.035,12,8),r,-.35+d*.22,1.9+d*.28,0);this.animatedProps.push({kind:"bubble",object:h,baseY:h.position.y,range:1.15,speed:.34+d*.05,phase:n+d*.24})}}else{Xe(a,1.8,2.1,1.05,o,0,.62,0,24);let u=mt(a,new Bt(1.7,22,12,0,Math.PI*2,0,Math.PI/2),new zt({color:7788194,transparent:!0,opacity:.78,roughness:.25}),0,1.35,0);for(let d of[-.9,0,.9]){Xe(a,.1,.18,1.2,Tt("bio-stem",4619090),d,1.2,.25,10);let h=mt(a,new Bt(.38,12,8),r,d+.22,1.7,.25);h.scale.set(1.35,.48,.8),h.rotation.z=-.45}u.castShadow=!1}let c=mt(a,new Bt(.17,12,8),new zt({color:16777215,emissive:r.color,emissiveIntensity:1.6}),0,3.45,0);this.animatedProps.push({kind:"bob",object:c,baseY:c.position.y,speed:1.4,phase:n*.7,amp:.12})}gableRoof(e,t,n,r,s){for(let a of[-1,1]){let o=Ve(e,t*.58,.16,n+.3,s,a*t*.235,r,0);o.rotation.z=a*-.43}}supplyDepot(e,t){let n=this.sitePad(e,t,8,6);Ve(n,5.2,2.25,3.5,Di,-.65,1.24,-.35),this.gableRoof(n,5.5,3.7,2.65,rt);for(let r of[-1.75,-.25])Ve(n,1.15,1.35,.08,cn,r,.86,1.43);for(let r of[2.1,3.25])this.crate(n,r,.75,r>3?Jt:Di)}repairWorkshop(e,t){let n=this.sitePad(e,t,8,6);Ve(n,5.8,2.2,3.7,Jt,0,1.22,-.35),Ve(n,6.1,.16,4,rt,0,2.4,-.35);for(let s of[-1.65,0,1.65])Ve(n,1.35,1.45,.08,s===0?Di:cn,s,.9,1.54);for(let s of[-2.5,2.5]){let a=Xe(n,.48,.48,.28,cn,s,.36,2,18);a.rotation.z=Math.PI/2}let r=new je;r.position.set(0,0,-2.1),n.add(r);for(let s of[-.8,.8])Lt(r,fe(s,0,0),fe(s,2.8,0),.07,qn);Lt(r,fe(-.9,2.8,0),fe(.9,2.8,0),.08,qn)}railYard(e,t){let n=this.sitePad(e,t,9,6.5);for(let a of[-1.2,1.2])Lt(n,fe(a,.14,-3),fe(a,.14,3),.06,rt);for(let a=-2.8;a<=2.8;a+=.65)Ve(n,3.2,.09,.13,cn,0,.09,a);let r=new je;r.position.set(0,.28,-.5),n.add(r),Ve(r,3.2,.75,1.55,Di,0,.58,0),Ve(r,3.45,.12,1.75,rt,0,.14,0);for(let a of[-1.15,1.15])for(let o of[-.68,.68]){let l=Xe(r,.28,.28,.16,cn,a,.08,o,14);l.rotation.x=Math.PI/2}let s=new je;s.position.set(0,0,1.7),n.add(s);for(let a of[-2.4,2.4])Lt(s,fe(a,0,0),fe(a,3.2,0),.09,qn);Lt(s,fe(-2.6,3.2,0),fe(2.6,3.2,0),.11,qn)}powerSubstation(e,t){let n=this.sitePad(e,t,7.8,6.2);for(let r of[-2,0,2]){Ve(n,1.15,1.35,1.45,rt,r,.8,0);for(let s of[-.35,.35])Xe(n,.09,.15,.7,Tt("insulator",7308926,.25,.5),r+s,1.85,0,12)}for(let r of[-3,3])Lt(n,fe(r,0,-2),fe(r,3.4,-2),.08,Jt),Lt(n,fe(r,0,2),fe(r,3.4,2),.08,Jt);Lt(n,fe(-3,3.4,-2),fe(3,3.4,-2),.08,Jt),Lt(n,fe(-3,3.4,2),fe(3,3.4,2),.08,Jt);for(let r of[-2,2])for(let s of[-2,0,2])Xe(n,.07,.12,.5,qn,s,3.7,r,10)}materialsLab(e,t){let n=this.sitePad(e,t,8,6);Ve(n,5.5,2.35,3.8,Tt("lab",12041392,.24,.74),-.45,1.28,-.2),Ve(n,5.8,.16,4.1,rt,-.45,2.53,-.2);for(let s of[-2,-.7,.6,1.9])Ve(n,.95,.85,.07,ks,s,1.45,1.74);for(let s of[-1.6,.2,2])Xe(n,.24,.33,1.1+(s===.2?.35:0),rt,s,3.1,-.6,14);let r=new je;r.position.set(2.8,0,1.75),n.add(r),Ve(r,1.3,.1,.8,nr,0,.85,0);for(let s of[-.5,.5])Xe(r,.04,.04,.85,Jt,s,.43,0,8)}fieldTestRig(e,t){let n=this.sitePad(e,t,8,6),r=Ve(n,4.7,.16,1.5,rt,-.6,1.05,0);r.rotation.z=-.25,Ve(n,1.2,.65,1.25,Di,-2.45,.46,0);let s=new je;s.position.set(2.1,0,0),n.add(s),Lt(s,fe(-1.1,0,0),fe(0,3.6,0),.09,qn),Lt(s,fe(1.1,0,0),fe(0,3.6,0),.09,qn),Lt(s,fe(-1.2,2.4,0),fe(1.2,2.4,0),.08,qn),Lt(s,fe(0,3.55,0),fe(0,1.25,0),.035,cn),Ve(s,.65,.65,.65,Dn,0,.95,0)}researchOutpost(e,t){let n=this.sitePad(e,t,7.5,6);for(let o of[-2,2])for(let l of[-1.3,1.3])Xe(n,.08,.11,1.2,rt,o,.62,l,8);Ve(n,5.1,1.85,3.5,Di,0,2.05,0),this.gableRoof(n,5.3,3.7,3.15,rt),Ve(n,1.2,1.05,.08,ks,0,2.15,1.78);let r=Xe(n,.07,.1,4.4,rt,2.8,2.2,-.9,10),s=new je;s.position.set(2.8,4.05,-.9),n.add(s);let a=mt(s,new Bt(.72,16,8,0,Math.PI*2,0,Math.PI/2),nr);a.rotation.x=1.05}weatherStation(e,t){let n=this.sitePad(e,t,7.2,6),r=Ve(n,2.8,1.65,2.45,nr,-1.45,.95,.5);this.gableRoof(n,3,2.65,1.9,rt);let s=Xe(n,.06,.1,4.7,rt,1.45,2.35,0,10);Lt(n,fe(.6,3.4,0),fe(2.3,3.4,0),.04,rt);for(let[o,l]of[[.6,0],[2.3,0],[1.45,.85]])Xe(n,.22,.22,.1,qn,o,3.55,l,12);let a=mt(n,new Bt(.72,18,9,0,Math.PI*2,0,Math.PI/2),Tt("weather-dome",13096914,.15,.5),1.45,4.85,0);a.scale.y=.7}waterAnalysis(e,t){let n=this.sitePad(e,t,8,6.3);for(let r of[-1.8,.2,2.2])Xe(n,.82,.82,1.75,r===.2?Di:rt,r,.96,-.35,22),Xe(n,.84,.84,.1,nr,r,1.86,-.35,22);Lt(n,fe(-2.6,.75,-.35),fe(3,.75,-.35),.1,Tt("water-pipe",5145999,.35,.45)),Ve(n,4.8,.16,1.5,rt,.2,1.95,1.65);for(let r of[-1.7,2.1])Xe(n,.07,.08,2,rt,r,1,1.65,8);for(let r of[-1.2,.2,1.6])Xe(n,.22,.15,.55,ks,r,2.35,1.65,16)}createTank(){let e=new je;Zr(e,2.45,.52,4.6,Jt,0,.96,0),Zr(e,2.58,.48,3.9,Dn,0,1.37,-.08,.32);let t=Ve(e,2.36,.11,.91,Dn,0,1.28,1.91);t.rotation.x=-.38;for(let c of[-1,1]){let u=new li(new bn(.59,.095,.21),cn,64);u.castShadow=!0,u.receiveShadow=!0;let d=new li(new bn(.63,.045,.11),rt,64);d.castShadow=!0,e.add(u,d),this.tracks.push({track:u,shoe:d,side:c});for(let h=0;h<7;h++){let f=Xe(e,.39,.39,.42,cn,c*1.39,.58,-1.62+h*.54,20);f.rotation.z=Math.PI/2,this.wheels.push(f);let g=Xe(e,.27,.27,.045,Dn,c*1.62,.58,-1.62+h*.54);g.rotation.z=Math.PI/2;let x=Xe(e,.09,.09,.055,rt,c*1.66,.58,-1.62+h*.54,6);x.rotation.z=Math.PI/2}for(let h=0;h<5;h++)Zr(e,.12,.45,.65,Dn,c*1.64,1.24,-1.58+h*.76,.035);Lt(e,fe(c*1.05,1.63,-1.3),fe(c*1.05,1.63,1.35),.025,rt),Ve(e,.5,.06,4.45,Jt,c*1.36,1.54,0),mt(e,new Ri(.12,.027,6,12),rt,c*.8,1.07,2.44),Ve(e,.2,.12,.08,Qc,c*1.08,1.49,1.84),Ve(e,.17,.08,.05,Tt("rear-lamp",9845801,.1),c*1.1,1.46,-2)}let n=new je;e.add(n),n.position.set(0,1.64,.03),Xe(n,.78,.85,.17,cn,0,.05,0,32),Zr(n,1.82,.6,1.92,Dn,0,.44,-.2,.3);let r=Zr(n,.7,.49,.38,Jt,0,.41,.91,.11),s=Xe(n,.092,.14,2.35,Dn,0,.44,2.08,20);s.rotation.x=Math.PI/2;for(let c of[1.1,1.43,2.64,3.1]){let u=Xe(n,.145,.145,.09,rt,0,.44,c,20);u.rotation.x=Math.PI/2}let a=Xe(n,.091,.091,.03,cn,0,.44,3.26,20);a.rotation.x=Math.PI/2,Xe(n,.32,.35,.08,Jt,.4,.81,-.24,24),Xe(n,.23,.25,.1,Dn,-.4,.79,-.45,24),Ve(n,.38,.16,.24,Jt,-.45,.9,.25),Ve(n,.3,.07,.025,ks,-.45,.93,.385),Lt(n,fe(.73,.7,-.85),fe(.76,2.9,-.93),.012,cn);for(let c=0;c<8;c++)Ve(e,1.3,.035,.035,cn,0,1.644,-1.55+c*.055);for(let c of[-.75,.75])Zr(e,.46,.38,.75,Jt,c,1.77,-1.56,.055);yo(n,"07",-.91,.46,-.15,.64).rotation.y=-Math.PI/2,yo(n,"07",.91,.46,-.15,.64).rotation.y=Math.PI/2,yo(e,"ATLAS",0,1.35,2.07,.9);let o=new li(new Gn(.026,.026,.025,6),rt,48),l=new Et;for(let c=0;c<48;c++){let u=c<24?-1:1;l.position.set(u*1.13,1.64,-1.8+c%24*.153),l.updateMatrix(),o.setMatrixAt(c,l.matrix)}return e.add(o),this.updateTracks(0),e}updateTracks(e){let t=new Et;for(let{track:n,shoe:r,side:s}of this.tracks)for(let a=0;a<64;a++){let o=6.6+Math.PI*.96,l=((a/64*o+e)%o+o)%o,c,u,d;if(l<3.3)c=-1.65+l,u=1.06,d=0;else if(l<3.3+Math.PI*.48)d=(l-3.3)/.48,c=1.65+Math.sin(d)*.48,u=.58+Math.cos(d)*.48;else if(l<6.6+Math.PI*.48)c=1.65-(l-3.3-Math.PI*.48),u=.1,d=Math.PI;else{let h=(l-6.6-Math.PI*.48)/.48;d=Math.PI+h,c=-1.65-Math.sin(h)*.48,u=.58-Math.cos(h)*.48}t.position.set(s*1.4,u,c),t.rotation.set(d,0,0),t.updateMatrix(),n.setMatrixAt(a,t.matrix),t.position.y+=Math.cos(d)*.06,t.position.z+=Math.sin(d)*.06,t.updateMatrix(),r.setMatrixAt(a,t.matrix)}for(let{track:n,shoe:r}of this.tracks)n.instanceMatrix.needsUpdate=!0,r.instanceMatrix.needsUpdate=!0}createBase(e){this.hqLevel=e,kh(this.hq),this.hq.position.copy(Ht.hq),this.scenery.campus("hq",this.hq,e);let t=Xe(this.hq,.08,.14,5.5,rt,-6.5,2.75,-5.3,10);this.dish=new je,this.dish.position.set(-6.5,5.1,-5.3),this.hq.add(this.dish);let n=mt(this.dish,new Bt(.85,16,8,0,Math.PI*2,0,Math.PI/2),nr);n.rotation.x=1.1,Lt(this.dish,fe(),fe(0,.3,1),.025,rt)}building(e,t,n,r,s,a,o,l){let c=new je;c.position.set(t,0,n),e.add(c),Ve(c,r+.4,.28,s+.4,nr,0,.2,0),Ve(c,r,a,s,l,0,a/2+.3,0),Ve(c,r+.3,.18,s+.3,rt,0,a+.4,0);for(let u=0;u<Math.floor(r);u++)Ve(c,.63,.67,.06,ks,-r/2+.65+u,a*.68,s/2+.035),Ve(c,.66,.03,.09,rt,-r/2+.65+u,a*.68-.34,s/2+.06);Ve(c,1.2,1.75,.07,cn,r*.27,1.17,s/2+.06);for(let u=0;u<12;u++)Ve(c,.015,a-.2,.035,Jt,-r/2+u*r/12,a/2+.3,s/2+.08);yo(c,o,-r*.12,a-.04,s/2+.12,Math.min(r-.7,3.8)),Ve(c,1.2,.5,1.15,nr,-r/3,a+.73,-.6)}crate(e,t,n,r=Jt){Ve(e,1,.8,.85,r,t,.54,n);for(let s of[-.32,.32])Ve(e,.06,.87,.9,rt,t+s,.54,n);Ve(e,.3,.12,.03,qn,t,.57,n+.44)}lightPole(e,t,n){Xe(e,.055,.09,4.3,rt,t,2.15,n,8),Lt(e,fe(t,4.1,n),fe(t+.65,4.1,n),.045,rt),Ve(e,.4,.1,.25,Qc,t+.65,4.06,n)}districtGarden(e,t){let n=new Wn;for(let o=0;o<28;o++){let l=o/28*Math.PI*2,c=7.1+Math.sin(o*1.9)*.55+Math.cos(o*3.1)*.28;o?n.lineTo(Math.cos(l)*c,Math.sin(l)*c*.82+1):n.moveTo(Math.cos(l)*c,Math.sin(l)*c*.82+1)}n.closePath();let r=new Hn({color:t,transparent:!0,opacity:.27,depthWrite:!1}),s=mt(e,new Us(n),r,0,.085,0);s.rotation.x=-Math.PI/2,s.castShadow=!1;let a=new zt({color:t,emissive:t,emissiveIntensity:.18,roughness:.7});for(let o=0;o<22;o++){let l=o/22*Math.PI*2+Math.sin(o)*.16,c=6+o%3*.5,u=mt(e,new Bt(.11+o%2*.04,9,6),a,Math.cos(l)*c,.19,Math.sin(l)*c*.82+1);u.castShadow=!1}}createHarbour(){this.scenery.campus("harbour")}createEnglishDistrict(){this.scenery.campus("english")}createPhysicsDistrict(){this.scenery.campus("physics")}createChemistryDistrict(){this.scenery.campus("chemistry")}createScienceBase(){this.scenery.campus("grove")}stationNode(e,t){return xo[e]?.[t]||null}clearRoute(){this.routeLayer.traverse(e=>{e.isMesh&&e.geometry.dispose()}),this.routeLayer.clear()}stationRoute(e,t){let n=this.tank.position.clone(),r=(Ht[e]||Ht.hq).clone().add(fe(2.4,.02,4.5)),s=[n];return n.distanceTo(r)>1.2&&t.distanceTo(r)>1.2&&s.push(r),s.push(t.clone()),s}showRoutePath(e){this.clearRoute();for(let t=0;t<e.length-1;t++){let n=e[t],r=e[t+1],s=n.distanceTo(r),a=Math.max(4,Math.floor(s/1.05));for(let o=t?0:1;o<a;o++){if(o%2===0)continue;let l=n.clone().lerp(r,o/a),c=Xe(this.routeLayer,.15,.2,.07,_y,l.x,this.scenery.height(l.x,l.z)+.24,l.z,10);c.castShadow=!1}}}selectStation(e,t){let n=t===null?"":`${e}:${t}`;if(n===this.selectedNodeKey)return;if(this.selectedNodeKey=n,t===null){this.waypoint.visible=!1,this.clearRoute();return}let r=this.stationNode(e,t);r&&(this.waypoint.position.copy(r.position),this.waypoint.visible=!0,this.showRoutePath(this.stationRoute(e,r.position)))}setView(e,t="hq"){if(this.view=e,this.destination=t,e==="travel")return;let n=`${e}:${t}`,r=n!==this.framingKey;if(this.framingKey=n,e==="map"){this.target.set(0,0,-10),this.radius=63,this.elevation=55,r&&(this.yaw=.1);return}let s=Ht[t]||Ht.hq;!this.travel&&this.currentArea!==t&&(this.tank.position.copy(s).add(fe(2.4,.02,4.5)),this.tank.rotation.y=.3,this.currentArea=t);let a=this.selectedNodeKey.startsWith(`${t}:`)?this.stationNode(t,Number(this.selectedNodeKey.split(":")[1]))?.position:null;this.target.copy(e==="region"?s:e==="station"&&a?a:s).add(fe(0,1,0)),e==="region"&&this.width<650&&this.target.lerp(Ht.hq.clone().add(fe(0,1,0)),.5),e==="region"?(this.radius=38,this.elevation=31):e==="station"?(this.radius=23,this.elevation=17):(this.radius=18,this.elevation=11),r&&(this.yaw=e==="region"?.1:e==="station"?.28:.73)}drive(e,t){let n=(Ht[e]||Ht.hq).clone().add(fe(2.4,.02,4.5));this.beginTravel(this.scenery.roadPath(this.tank.position,e,this.currentArea),t,{kind:"region",region:e,label:vy[e]||"Destination"})}driveToStation(e,t,n){let r=this.stationNode(e,t);r&&(this.selectStation(e,t),this.beginTravel(this.stationRoute(e,r.position.clone().add(fe(0,.02,0))),n,{kind:"station",region:e,index:t,label:r.label}))}beginTravel(e,t,n){let r=e.slice(1).map((o,l)=>e[l].distanceTo(o)),s=r.reduce((o,l)=>o+l,0),a=e.at(-1);this.showRoutePath(e),this.travel={...n,path:e,lengths:r,totalLength:s,start:e[0],end:a,elapsed:0,duration:this.reduced?1:n.kind==="station"?5.2:6.5},this.onTravelEnd=t,this.view="travel",this.destination=n.region}zoom(e){let t=this.view==="map"||this.view==="region";this.radius=Kc(this.radius+e,t?34:12,t?68:44)}resetCamera(){this.framingKey="",this.setView(this.view,this.destination)}resize(){let e=this.canvas.parentElement.getBoundingClientRect();this.width=e.width,this.height=e.height,this.camera.aspect=e.width/e.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(e.width,e.height,!1)}animate=e=>{if(!this.running)return;requestAnimationFrame(this.animate);let t=Math.min((e-this.last)/1e3||0,.05);if(this.last=e,!this.paused&&!document.hidden){if(this.clock+=t,this.frame++,this.dish&&!this.reduced&&(this.dish.rotation.y=Math.sin(this.clock*.18)*.7),this.rig&&!this.reduced&&(this.rig.position.y=1+Math.sin(this.clock*.45)*.06),!this.reduced){for(let a of this.animatedProps)if(a.kind==="spin")a.object.rotation.y=this.clock*a.speed+a.phase;else if(a.kind==="swing")a.object.rotation.z=Math.sin(this.clock*a.speed+a.phase)*a.amp;else if(a.kind==="bob")a.object.position.y=a.baseY+Math.sin(this.clock*a.speed+a.phase)*a.amp;else if(a.kind==="slide")a.object.position.x=a.baseX+Math.sin(this.clock*a.speed+a.phase)*.22;else if(a.kind==="bubble"){let o=(this.clock*a.speed+a.phase)%1;a.object.position.y=a.baseY+o*a.range,a.object.scale.setScalar(.72+Math.sin(o*Math.PI)*.38)}}if(this.travel){let a=this.travel;a.elapsed+=t;let o=Kc(a.elapsed/a.duration,0,1),c=o*o*(3-2*o)*a.totalLength,u=0;for(;u<a.lengths.length-1&&c>a.lengths[u];)c-=a.lengths[u],u++;let d=a.path[u],h=a.path[u+1]||a.end,f=a.lengths[u]?Kc(c/a.lengths[u],0,1):1;this.tank.position.lerpVectors(d,h,f),this.tank.rotation.y=Math.atan2(h.x-d.x,h.z-d.z),this.tank.position.y=this.scenery.height(this.tank.position.x,this.tank.position.z)+.085+(this.reduced?0:Math.sin(this.clock*22)*.013),this.updateTracks(this.clock*2.7),this.target.copy(this.tank.position).lerp(a.end,.16).add(fe(0,1,0)),this.radius=42,this.elevation=34,this.yaw=.22;let g=h.clone().sub(d).normalize();if(this.dustPuffs.forEach((x,p)=>{let m=(this.clock*.72+p/this.dustPuffs.length)%1,S=p%2?1:-1;x.visible=!this.reduced,x.position.copy(this.tank.position).addScaledVector(g,-1.7-m*4.3).add(fe(g.z*S*(.3+m),.18+m*.8,-g.x*S*(.3+m))),x.scale.setScalar(.35+m*1.25),x.material.opacity=(1-m)*.24}),o>=1){this.currentArea=a.region,this.travel=null,this.clearRoute(),this.dustPuffs.forEach(p=>{p.visible=!1,p.material.opacity=0});let x=this.onTravelEnd;this.onTravelEnd=null,x?.()}}}if(this.waypoint.visible&&!this.reduced){let a=1+Math.sin(this.clock*3.8)*.12;this.waypointRing.scale.setScalar(a),this.waypoint.rotation.y=this.clock*.18}for(let a of[...this.mapMarkers.values(),...this.stationMarkers.values()])if(a.root.visible){let o=this.reduced?1:1+Math.sin(this.clock*2.4+a.root.position.x*.11)*(a.selected?.11:.045),l=this.width<650?this.view==="map"?2.7:this.view==="region"?2.05:1.2:1,c=a.station?2.8:4.35;a.sprite.scale.setScalar(c*o*l),a.halo.scale.setScalar((a.selected?1.15:1)*o);let u=a.halo.userData.baseOpacity??a.halo.material.opacity,d=a.beam.userData.baseOpacity??a.beam.material.opacity;a.halo.material.opacity=u*(.86+(o-1)*1.7),a.beam.material.opacity=d*(.82+(o-1)*1.4)}this.water&&!this.reduced&&(this.water.position.y=Math.sin(this.clock*.55)*.012,this.water.material.normalMap&&(this.water.material.normalMap.offset.y=this.clock*.012));let n=this.width<650,r=this.view==="map"||this.view==="region",s=n?this.view==="map"?2.73:this.view==="region"?3:this.view==="travel"?1.8:1.32:1;if(this.scene.fog.density=r||this.view==="travel"?.0015:.009,this.cameraGoal.copy(this.target).add(fe(Math.sin(this.yaw)*this.radius*s,this.elevation*s,Math.cos(this.yaw)*this.radius*s)),this.lookGoal.copy(this.target),!r&&this.view!=="travel"&&this.view!=="project"&&(n?this.lookGoal.y-=7:this.lookGoal.add(fe(3.4,0,-2.8))),r&&this.lookGoal.add(n?this.view==="map"?fe(0,this.mapSelection?-26:0,0):fe(0,-8,0):this.view==="map"?fe(0,0,0):fe(2,0,0)),r?this.camera.position.copy(this.cameraGoal):this.camera.position.lerp(this.cameraGoal,this.reduced?1:1-Math.exp(-t*4)),this.camera.lookAt(this.lookGoal),this.renderer.render(this.scene,this.camera),this.onFrame){let a=this.view==="region"||this.view==="station"?[["hq",Ht.hq],["atlas",this.tank.position],...(xo[this.destination]||[]).map(o=>[o.id,o.position])]:[...Object.entries(Ht),["atlas",this.tank.position]];this.onFrame(a.map(([o,l])=>{let c=o.startsWith("station-")?this.stationMarkers.get(`${this.destination}:${o}`):this.mapMarkers.get(o),d=(o==="atlas"?l.clone().add(fe(0,2.7,0)):c?.root.position.clone()||l.clone().add(fe(0,3.5,0))).project(this.camera),h=this.view==="region"&&(o==="hq"||o==="atlas");return{id:o,x:(d.x+1)/2*this.width,y:(-d.y+1)/2*this.height,visible:d.z>-1&&d.z<1&&(h||d.x>-1.12&&d.x<1.12&&d.y>-1.12&&d.y<1.12)}}))}}};var Sy={status:"reviewed",reviewer:"Codex educational content and ambiguity review",reviewedAt:"2026-09-05",humanCurriculumReview:"pending",source:"Original Beacon Brigade content; all evidence tables are authored datasets."};function Rt(i,e,t,n,r,s,a){return{id:t,version:1,regionId:i,subject:e,skill:n,yearBand:t==="chemistry-dissolving-particles"?"Age 8 supported introduction / Year 5 particle concept (provisional)":"Age 8 / Year 3 with supported stretch (provisional)",prerequisites:["Read a short evidence table","Choose the best-supported answer"],parameterPolicy:"Only the two checked authored instances are used.",review:Sy,instances:a.map(o=>({hint:r,wrongFeedback:s,...o,type:"choice",diagram:{kind:"table",source:"Authored mission evidence",simulation:!1,...o.diagram}}))}}var Bh=zh([Rt("english","english","english-context-meaning","Use clues to work out a word's meaning","Read what happens next. What does that tell you about the word's meaning?","That meaning does not fit the clue in the sentence. Read what the team does next.",[{prompt:"The path was narrow, so the team walked one behind another. What does narrow mean?",options:[{id:"not-wide",label:"Not wide"},{id:"very-noisy",label:"Very noisy"},{id:"steep",label:"Steep and rocky"},{id:"bright",label:"Brightly lit"}],answer:"not-wide",explanation:"A narrow path is not wide, so the team has room to walk only one behind another.",diagram:{label:"Word Archive clue",columns:["Sentence clue","What it tells us"],rows:[["One behind another","Little room side by side"]],controls:"Use the meaning that fits this sentence.",limitation:"Here, narrow describes the path."}},{prompt:"The glass cup was fragile, so Noor carried it carefully. What does fragile mean?",options:[{id:"easily-broken",label:"Easily broken"},{id:"very-heavy",label:"Very heavy"},{id:"brightly-coloured",label:"Brightly coloured"},{id:"difficult-to-find",label:"Difficult to find"}],answer:"easily-broken",explanation:"Fragile means easily broken. Noor carries the glass cup carefully to keep it safe.",diagram:{label:"Word Archive clue",columns:["Sentence clue","What it tells us"],rows:[["Noor carried it carefully","The cup could be damaged"]],controls:"Use the meaning that explains Noor's careful action.",limitation:"Here, fragile describes the glass cup."}}]),Rt("english","english","english-complete-sentence","Recognise a complete sentence","Look for who or what the sentence is about, what happens, and an idea that feels finished.","Read those words on their own. Do you still need more words to finish the idea?",[{prompt:"Which option is a complete sentence?",options:[{id:"bridge",label:"Under the old bridge"},{id:"lantern",label:"The lantern glowed brightly."},{id:"because",label:"Because it was dark"},{id:"running",label:"Running towards the gate"}],answer:"lantern",explanation:"The lantern glowed brightly. This tells us what the lantern did and gives a complete idea.",diagram:{label:"Sentence Studio check",columns:["Words","Who or what?","What happens or is true?"],rows:[["Under the old bridge","Not given","Not given"],["The lantern glowed brightly.","The lantern","Glowed brightly"],["Because it was dark","It","Was dark"],["Running towards the gate","Not given","Running"]],controls:"Read each option without adding words.",limitation:"Because it was dark has a subject, it, but needs more words to finish the idea."}},{prompt:"Which option is a complete sentence?",options:[{id:"beacon",label:"The beacon flashed twice."},{id:"beside",label:"Beside the tall tower"},{id:"when",label:"When the bell rang"},{id:"carrying",label:"Carrying the silver key"}],answer:"beacon",explanation:"The beacon flashed twice. This tells us what the beacon did and gives a complete idea.",diagram:{label:"Sentence Studio check",columns:["Words","Who or what?","What happens or is true?"],rows:[["The beacon flashed twice.","The beacon","Flashed twice"],["Beside the tall tower","Not given","Not given"],["When the bell rang","The bell","Rang"],["Carrying the silver key","Not given","Carrying"]],controls:"Read each option without adding words.",limitation:"When the bell rang tells us when, but needs more words to finish the idea."}}]),Rt("english","english","english-possessive-apostrophe","Use apostrophes to show who owns something","Count the owners first. One owner and several owners can need the apostrophe in different places.","Check how many people own the things. Then look closely at the apostrophe.",[{prompt:"The toolkit belongs to one engineer. Which sentence is correct?",hint:"For one owner, add 's to the owner's word. For example: the pilot's hat.",options:[{id:"one-owner",label:"The engineer's toolkit is open."},{id:"many-owners",label:"The engineers' toolkit is open."},{id:"no-apostrophe",label:"The engineers toolkit is open."},{id:"toolkit-owner",label:"The engineer toolkits' is open."}],answer:"one-owner",explanation:"There is one engineer. Add 's: the engineer's toolkit.",diagram:{label:"Spelling Signal ownership note",columns:["Owners","Object owned"],rows:[["One engineer","One toolkit"]],controls:"Use the exact number of owners shown.",limitation:"Here, the apostrophe shows who owns the toolkit."}},{prompt:"The maps belong to several captains. Which sentence is correct?",hint:"For several owners whose word ends in s, put the apostrophe after that s. For example: the pilots' hats.",options:[{id:"plural-owner",label:"The captains' maps are ready."},{id:"single-owner",label:"The captain's maps are ready."},{id:"plain-plural",label:"The captains maps are ready."},{id:"map-owner",label:"The captains map's are ready."}],answer:"plural-owner",explanation:"Several captains own the maps. Captains already ends in s, so add the apostrophe after it: captains' maps.",diagram:{label:"Spelling Signal ownership note",columns:["Owners","Objects owned"],rows:[["Several captains","Several maps"]],controls:"Use the exact number of owners shown.",limitation:"This rule is for words for several owners that end in s."}}]),Rt("english","english","english-linking-ideas","Choose a word to join two ideas","Read both ideas. Does the second tell you why something happened, or what happened next?","Read the sentence with your word in the gap. Check how the two ideas fit together.",[{prompt:"Rain was expected. Choose the word that tells us why: Mia took an umbrella ___ rain was expected.",hint:"The rain is the reason for taking the umbrella. Which word joins an action to its reason?",options:[{id:"because",label:"because"},{id:"but",label:"but"},{id:"or",label:"or"},{id:"until",label:"until"}],answer:"because",explanation:"Because introduces the reason Mia carried an umbrella.",diagram:{label:"Reading Room idea link",columns:["First idea","Second idea","Relationship"],rows:[["Mia took an umbrella","Rain was expected","Why she took it"]],controls:"Choose a word that explains why.",limitation:"The question asks for the clearest meaning in this sentence."}},{prompt:"The team closed the gate after hearing the bell. Choose the best word: The bell rang, ___ the team closed the gate.",hint:"Closing the gate is the result of hearing the bell. Which word joins an event to its result?",options:[{id:"so",label:"so"},{id:"because",label:"because"},{id:"although",label:"although"},{id:"unless",label:"unless"}],answer:"so",explanation:"So introduces the result of the warning bell ringing.",diagram:{label:"Reading Room idea link",columns:["First idea","Second idea","Relationship"],rows:[["The bell rang","The team closed the gate","What happened next"]],controls:"Choose a word that shows the result.",limitation:"The comma and joining word are part of one complete sentence."}}]),Rt("english","english","english-story-sequence","Find what happens first in a story","Read the Before this column. Find the event that needs none of the other events to happen first.","Something in the table happens before that event. Look for the start of this story.",[{prompt:"In this story, which event happens first?",options:[{id:"discover",label:"The team discovers the broken lamp."},{id:"replace",label:"The team replaces the lamp."},{id:"shine",label:"The beacon shines again."},{id:"ships",label:"Ships see the light again."}],answer:"discover",explanation:"In this story, the team finds the broken lamp first. Then they replace it, and ships can see the light again.",diagram:{label:"Story Press event clues",columns:["Event","Before this"],rows:[["Discover broken lamp","Nothing else listed"],["Replace lamp","Broken lamp is discovered"],["Beacon shines","Lamp is replaced"],["Ships see light","Beacon shines"]],controls:"Use the events in this table.",limitation:"Another story could have a different order."}},{prompt:"In this story about a missing key, which event happens first?",options:[{id:"notice",label:"The team notices that the key is missing."},{id:"search",label:"The team searches the map room."},{id:"find",label:"The team finds the key."},{id:"unlock",label:"The team unlocks the storehouse."}],answer:"notice",explanation:"In this story, the team notices the missing key first. Then they search, find it and unlock the storehouse.",diagram:{label:"Story Press event clues",columns:["Event","Before this"],rows:[["Notice missing key","Nothing else listed"],["Search map room","Missing key is noticed"],["Find key","Search begins"],["Unlock storehouse","Key is found"]],controls:"Use the events in this table.",limitation:"Another story could have a different order."}}]),Rt("physics","physics","physics-force-motion","Think about pushes, pulls and movement","A force is a push or a pull. Use the table to find which way each force acts.","Look at what is being pulled and which way the pull acts.",[{prompt:"A builder lets go of a wooden block. Which force pulls it towards the ground?",hint:"The hand is no longer touching the block. Think about the pull from Earth.",wrongFeedback:"The block falls even without a hand or magnet pulling it. What pulls things towards Earth?",options:[{id:"gravity",label:"Gravity"},{id:"magnetism",label:"Magnetism"},{id:"friction",label:"Friction"},{id:"hand-push",label:"A push from the builder's hand"}],answer:"gravity",explanation:"Gravity pulls the released block towards Earth even after the builder is no longer touching it.",diagram:{label:"Force Track release evidence",columns:["What we check","What we see"],rows:[["Object","Wooden block"],["Hand still touching it","No"],["Magnet nearby","No"],["Way it falls","Towards the ground"]],controls:"Let go without a push. Nothing is under the block.",limitation:"Air can slow a fall. This question asks about the downward pull."}},{prompt:"A rope is held still and level. Two teams pull equally hard in opposite directions. What happens while these pulls stay equal?",hint:"Compare the left and right pulls. Is either pull stronger? The rope starts still.",wrongFeedback:"Neither side pulls harder. Think about whether the rope has a stronger pull in either direction.",options:[{id:"stays",label:"It stays in place."},{id:"left",label:"It moves left."},{id:"right",label:"It moves right."},{id:"up",label:"It moves upwards."}],answer:"stays",explanation:"Neither side pulls harder. The sideways pulls balance, so this rope stays still while it is held level.",diagram:{label:"Force Track pull test",columns:["Side","Pull","Direction"],rows:[["Left team","Same strength","Left"],["Right team","Same strength","Right"]],controls:"Hold the rope level. Pull at the same time in one straight line.",limitation:"This model is about sideways pulls on a rope that starts still."}}]),Rt("physics","physics","physics-reflection","Use observations of reflected light","Reflected light bounces back from a surface. Look for the clearest picture in the table.","Compare the pictures seen in each surface. Which was clear, rather than wobbly or not seen?",[{prompt:"Which tested surface reflected the clearest image of the signal card?",options:[{id:"mirror",label:"Smooth mirror"},{id:"brick",label:"Rough brick"},{id:"cloth",label:"Crumpled cloth"},{id:"cardboard",label:"Unpainted cardboard"}],answer:"mirror",explanation:"The smooth mirror bounces light back in a way that keeps the picture clear. Rough surfaces scatter light in different directions.",diagram:{label:"Light Observatory reflection test",columns:["Surface","Picture seen"],rows:[["Smooth mirror","Clear"],["Rough brick","No clear picture"],["Crumpled cloth","No clear picture"],["Unpainted cardboard","No clear picture"]],controls:"Same signal card, light, distance and viewing position.",limitation:"The other surfaces reflect light too, but do not show a clear picture."}},{prompt:"Which tested water surface reflected the clearest image of the tower?",options:[{id:"still",label:"Still water"},{id:"small-ripples",label:"Water with small ripples"},{id:"large-waves",label:"Water with large waves"},{id:"foam",label:"Foamy water"}],answer:"still",explanation:"The still water had the smoothest surface and produced the clearest reflected image in the test.",diagram:{label:"Light Observatory water test",columns:["Water surface","Tower picture"],rows:[["Still","Clear"],["Small ripples","A little wobbly"],["Large waves","Very wobbly"],["Foam","No clear picture"]],controls:"Same tower model, light, container and viewing position.",limitation:"These results describe only the surfaces in this test."}}]),Rt("physics","physics","physics-sound-vibration","Connect vibrations with sound","Look for the object that was moving back and forth when the sound was heard.","Sound was linked to a vibration in this test. Find the part that moved back and forth.",[{prompt:"What was the tuning fork doing when the team heard its sound?",options:[{id:"vibrating",label:"Vibrating (moving quickly back and forth)"},{id:"glowing",label:"Glowing brightly"},{id:"melting",label:"Melting slowly"},{id:"becoming-magnetic",label:"Becoming magnetic"}],answer:"vibrating",explanation:"The fork moves quickly back and forth. This makes the air vibrate too, carrying sound to our ears.",diagram:{label:"Sound Lab tuning-fork test",columns:["What the fork does","Sound heard"],rows:[["Still","No"],["Moving rapidly back and forth","Yes"]],controls:"Same tuning fork, room and listening distance.",limitation:"The table does not show the tiny movements of the air."}},{prompt:"The team taps the drum skin. Which part starts vibrating to make the sound?",options:[{id:"skin",label:"The stretched drum skin"},{id:"stand",label:"The floor under the stand"},{id:"paint",label:"The painted symbol"},{id:"shadow",label:"The drum's shadow"}],answer:"skin",explanation:"The drum skin moves back and forth after the tap. It makes the air vibrate, carrying sound to our ears.",diagram:{label:"Sound Lab drum test",columns:["Part","Movement after the tap"],rows:[["Stretched drum skin","Back and forth"],["Floor under stand","None we can see"],["Painted symbol","Moves with the skin"],["Shadow","Not a part we can touch"]],controls:"Tap the same drum once in the middle.",limitation:"Other drum parts can vibrate too. Here the skin is tapped first."}}]),Rt("physics","physics","physics-complete-circuit","Identify a complete electrical circuit","Look for a battery and a loop with no gaps. The loop must pass through the bulb and join both battery ends.","Check for a battery, then trace the path through the bulb. Is there a gap?",[{prompt:"Which circuit plan will light the working bulb?",options:[{id:"closed",label:"A: battery and bulb joined in a loop"},{id:"beside",label:"B: bulb beside a battery, no wires"},{id:"one-terminal",label:"C: only one battery end wired to the bulb"},{id:"no-battery",label:"D: bulb and wires, no battery"}],answer:"closed",explanation:"A has a battery and a loop with no gaps through the bulb. Electric current can flow around this loop and light the bulb.",diagram:{label:"Circuit Station plans",columns:["Plan","Battery?","Loop through bulb?"],rows:[["A","Yes","Yes"],["B","Yes","No wires"],["C","Yes","No"],["D","No","Yes"]],controls:"All parts work and the bulbs match the small batteries. Wires touch metal contacts where joined.",limitation:"This model uses a small battery. Never experiment with power points."}},{prompt:"Which setup will make the signal lamp light?",options:[{id:"switch-closed",label:"Switch closed: no gap"},{id:"switch-open",label:"Switch open: a gap"},{id:"switch-removed",label:"Switch removed: two gaps"},{id:"battery-removed",label:"Switch closed, but no battery"}],answer:"switch-closed",explanation:"A closed switch joins the gap. With the battery in place, current can flow through the lamp and light it.",diagram:{label:"Circuit Station switch test",columns:["Setup","Battery?","Path through lamp"],rows:[["Switch closed","Yes","Complete"],["Switch open","Yes","Gap"],["Switch removed","Yes","Two gaps"],["Battery removed","No","Gap where battery was"]],controls:"Use matching, working parts. Only the change listed in each row is made.",limitation:"This model uses a small battery. Never experiment with power points."}}]),Rt("physics","physics","physics-thermal-insulation","Find what keeps water warm","All cups start at the same temperature. Find the highest temperature in the last column.","A higher temperature means warmer water. Compare the last column, not the wrap or lid names.",[{prompt:"Which tested wrap kept the warm water warmest after 10 minutes?",options:[{id:"felt",label:"Felt wrap"},{id:"paper",label:"Paper wrap"},{id:"foil",label:"Single foil wrap"},{id:"none",label:"No wrap"}],answer:"felt",explanation:"The felt cup stayed warmest at 54 C. This wrap helped slow heat loss in this test. C means degrees Celsius, a temperature unit.",diagram:{label:"Energy Workshop insulation test",columns:["Cup wrap","Start","After 10 minutes"],rows:[["Felt","60 C","54 C"],["Paper","60 C","50 C"],["Single foil","60 C","48 C"],["None","60 C","45 C"]],controls:"Same cups, water amount, starting temperature and room. C means degrees Celsius.",limitation:"These wraps were tested for 10 minutes. An adult handles hot water."}},{prompt:"Which tested lid kept the warm water warmest after 15 minutes?",options:[{id:"foam",label:"Foam lid"},{id:"card",label:"Card lid"},{id:"metal",label:"Thin metal lid"},{id:"open",label:"No lid"}],answer:"foam",explanation:"The foam-lid cup stayed warmest at 51 C. This lid helped slow heat loss in this test. It did not stop all cooling.",diagram:{label:"Energy Workshop lid test",columns:["Cup lid","Start","After 15 minutes"],rows:[["Foam","58 C","51 C"],["Card","58 C","48 C"],["Thin metal","58 C","46 C"],["None","58 C","42 C"]],controls:"Same cups, water amount, starting temperature and room. C means degrees Celsius.",limitation:"Heat can leave in several ways. An adult handles hot water."}}]),Rt("chemistry","chemistry","chemistry-states-of-matter","Use clues to name a state of matter","Volume means the space something takes up. Check whether the sample keeps its shape or fills the whole container.","Look at all the clues: shape, space taken up, and whether the sample fills the whole container.",[{prompt:"Sample A pours smoothly, with no grains. It changes shape but takes up the same space. What state is it?",hint:"Think about pouring water into a different-shaped cup. Does it fill every space, including the air above it?",options:[{id:"liquid",label:"Liquid"},{id:"solid",label:"Solid"},{id:"gas",label:"Gas"},{id:"light",label:"Light"}],answer:"liquid",explanation:"A liquid takes the shape of the part of the container it fills. Its volume stays about the same when poured.",diagram:{label:"Matter Hall sample test",columns:["Observation","Sample A"],rows:[["Top after settling","Smooth and level; no grains"],["Space taken up after pouring","Same"],["Fills the whole container","No; air above it"]],controls:"Pour the whole sample into another cup. Keep the temperature the same.",limitation:"Sand can pour too, but it is made of solid grains. This sample has no grains."}},{prompt:"Sample B spreads out to fill all the space inside a closed container. What state is it?",hint:"Think about air inside a bottle. Does it sit at the bottom like water, or spread through the space?",options:[{id:"gas",label:"Gas"},{id:"liquid",label:"Liquid"},{id:"solid",label:"Solid"},{id:"sound",label:"Sound"}],answer:"gas",explanation:"A gas spreads out to fill the available space in its sealed container.",diagram:{label:"Matter Hall sample test",columns:["Observation","Sample B"],rows:[["Keeps its own shape","No"],["Has a top like water in a cup","No"],["Fills the whole container","Yes"]],controls:"Keep the container closed and the temperature the same.",limitation:"The table describes the whole sample, not its tiny particles."}}]),Rt("chemistry","chemistry","chemistry-separate-mixture","Choose a tool to separate a mixture","Look for a difference between the two materials. Which tool can use that difference to separate them?","We need to remove one material from the other, not just change how the mixture looks.",[{prompt:"Tiny iron pieces are mixed with dry sand. Which tool can separate them?",hint:"The table shows which material the magnet pulls. Can it pull one material away and leave the other?",options:[{id:"magnet",label:"Move a magnet over the mixture"},{id:"more-sand",label:"Add more sand"},{id:"crush",label:"Crush the mixture"},{id:"stir",label:"Stir it with a wooden stick"}],answer:"magnet",explanation:"The magnet pulls the tiny iron pieces out of this sand. It does not pull the sand used in this test.",diagram:{label:"Mixture Lab property check",columns:["Material","Magnet can pick it up","Dry"],rows:[["Tiny iron pieces","Yes","Yes"],["Sand","No","Yes"]],controls:"Same covered magnet and dry mixture. An adult handles tiny iron pieces.",limitation:"Some sand contains magnetic grains. This tested sand does not."}},{prompt:"Large stones are mixed with fine sand. Which tool can separate them?",hint:"A sieve is a tray with small holes. Which material fits through the holes, and which stays on top?",options:[{id:"sieve",label:"Shake the mixture through a sieve"},{id:"magnet",label:"Use a magnet"},{id:"dissolve",label:"Try to dissolve both in water"},{id:"paint",label:"Paint the stones"}],answer:"sieve",explanation:"The sand falls through the sieve's small holes. The stones are too big, so they stay on top.",diagram:{label:"Mixture Lab size check",columns:["Material","Size compared with holes","Falls through?"],rows:[["Stones","Bigger","No"],["Sand grains","Smaller","Yes"]],controls:"Use the same sieve and keep the mixture dry.",limitation:"Wet sand can stick in lumps and may not fall through."}}]),Rt("chemistry","chemistry","chemistry-observe-change","Use clues about changes in materials","Look at what changed in the material, not just its container.","Use the results in the table to check what happened to the material.",[{prompt:"Which change can we undo by cooling the material?",hint:"Imagine putting melted ice in a freezer. Then think about whether cooling could undo the other changes.",wrongFeedback:"Cooling cannot turn ash back into paper, uncook an egg or remove rust. Look for a change of state.",options:[{id:"melting-ice",label:"Ice melting into liquid water"},{id:"burning-paper",label:"Paper burning into ash and gases"},{id:"frying-egg",label:"An egg cooking in a pan"},{id:"rusting",label:"Iron slowly forming rust"}],answer:"melting-ice",explanation:"Cooling liquid water below its freezing point can turn it back into solid ice.",diagram:{label:"Changes Chamber log",columns:["Change","Cooling turns it back?"],rows:[["Melting ice","Yes, as ice"],["Burning paper","No"],["Cooking egg","No"],["Rusting iron","No"]],controls:"Check whether cooling alone undoes the change.",limitation:"Some changes are hard to undo. Adults handle heat and flames."}},{prompt:"Two liquids are mixed without heating or shaking. Which clue suggests a chemical reaction may be making gas?",hint:"A chemical reaction can make a new material. Look for gas forming inside the liquid, not a change to the cup.",wrongFeedback:"Changing a cup or its label does not show a reaction. Look for a change inside the mixture.",options:[{id:"new-bubbles",label:"Bubbles keep forming in the liquid"},{id:"taller-cup",label:"The mixture is poured into a taller cup"},{id:"new-shape",label:"The cup has a different shape"},{id:"label",label:"A new label is placed on the cup"}],answer:"new-bubbles",explanation:"The new bubbles contain gas. A reaction may be making that gas, but we need more tests to be sure.",diagram:{label:"Changes Chamber reaction check",columns:["Condition","Observation"],rows:[["Before mixing","No bubbles"],["After mixing","Bubbles keep forming"],["Temperature","Room temperature; not boiling"]],controls:"Clean cup, no shaking, no heating. This is a made-up test, not a mixing activity.",limitation:"Bubbles alone are not proof. Gas already dissolved in a liquid can escape too."}}]),Rt("chemistry","chemistry","chemistry-material-properties","Choose a material that does both jobs","Check both needs in the same row. One matching result is not enough.","That sample misses one of the needs. Look across its whole row and check both results.",[{prompt:"A cover must bend around a box and keep water out. Which sample does both?",options:[{id:"film",label:"Sample A: flexible film"},{id:"card",label:"Sample B: card"},{id:"tile",label:"Sample C: tile"},{id:"cloth",label:"Sample D: cloth with small gaps"}],answer:"film",explanation:"Sample A bends around the box and lets no water through, so it meets both requirements.",diagram:{label:"Properties Bay cover tests",columns:["Sample","Bends around box?","Water gets through?"],rows:[["A: flexible film","Yes","No"],["B: card","Yes","Yes"],["C: tile","No","No"],["D: cloth with gaps","Yes","Yes"]],controls:"Same sample size, water amount, box and one-minute test.",limitation:"Other samples or longer tests may give different results."}},{prompt:"A window must let light through and keep water out. Which sample does both?",options:[{id:"clear-plastic",label:"Sample E: clear plastic"},{id:"paper",label:"Sample F: thin paper"},{id:"metal",label:"Sample G: metal sheet"},{id:"mesh",label:"Sample H: plastic mesh"}],answer:"clear-plastic",explanation:"Sample E lets light through and lets no water through, so it meets both window-panel needs.",diagram:{label:"Properties Bay panel tests",columns:["Sample","Light gets through?","Water gets through?"],rows:[["E: clear plastic","Yes","No"],["F: thin paper","Some","Yes"],["G: metal sheet","No","No"],["H: plastic mesh","Yes","Yes"]],controls:"Same sample size, light, water amount and one-minute test.",limitation:"This test does not tell us how strong a window would be."}}]),Rt("chemistry","chemistry","chemistry-dissolving-particles","Use clues to explain dissolving","Look at what is left when the water dries up. Could the material still be in the water, even if you cannot see it?","Look at the last row. The crystals come back when the water dries up, so the material has not vanished.",[{prompt:"Sugar is stirred into water. Tiny particles can be too small to see. Use the table: what happened to the sugar?",options:[{id:"dissolved",label:"It dissolved and spread through the water."},{id:"stopped-existing",label:"It stopped existing."},{id:"oxygen",label:"It changed into oxygen."},{id:"left-cup",label:"It passed through the solid cup."}],answer:"dissolved",explanation:"When sugar dissolves, its tiny particles spread through the water. They are too small to see. The sugar is still there and forms crystals when the water dries up.",diagram:{label:"Particle Observatory sugar evidence",columns:["Check","Observation"],rows:[["Before stirring","Sugar crystals can be seen"],["After stirring with the lid on","No crystals seen; same total mass"],["Lid off; water dries up","Sugar crystals remain"]],controls:"No spills. Compare the whole cup's mass with the lid on. Then remove the lid to let water dry up.",limitation:"This made-up test does not show tiny particles. Never taste lab mixtures."}},{prompt:"We stir salt into water and cannot see it. Tiny particles can be too small to see. Use the table: what happened?",options:[{id:"spread",label:"Salt particles spread through the water."},{id:"destroyed",label:"The water destroyed the salt."},{id:"sand",label:"The salt changed into sand."},{id:"escaped",label:"All the salt escaped into the air."}],answer:"spread",explanation:"The salt dissolved. Its tiny particles are too small to see and spread through the water. Salt crystals remain when the water dries up.",diagram:{label:"Particle Observatory salt evidence",columns:["Check","Observation"],rows:[["Before stirring","Salt crystals can be seen"],["After stirring with the lid on","No crystals seen; same total mass"],["Lid off; water dries up","Salt crystals remain"]],controls:"No spills. Compare the whole cup's mass with the lid on. Then remove the lid to let water dry up.",limitation:"This made-up test does not show tiny particles. Never taste lab mixtures."}}]),Rt("grove","life-sciences","grove-plant-parts","Match plant parts to their jobs","Find the job in the question. Look for a plant part that does that job in the table.","That part has a different job here. Check what each part takes in or makes.",[{prompt:"Which part of this plant uses sunlight to make food called sugars?",options:[{id:"leaves",label:"Leaves"},{id:"roots",label:"Roots"},{id:"flower",label:"Flower petals"},{id:"seed-coat",label:"Seed coat"}],answer:"leaves",explanation:"Green leaves use light energy, water and carbon dioxide from the air to make sugars. This is called photosynthesis.",diagram:{label:"Seed Lab plant-part observations",columns:["Plant part","Main job here"],rows:[["Leaves","Use light to make sugars"],["Roots","Take in water and minerals"],["Flower petals","Attract insects that carry pollen"],["Seed coat","Protect the seed"]],controls:"Use the jobs listed for this flowering plant.",limitation:"Other green parts, such as some stems, can make sugars too."}},{prompt:"Which plant part takes in most of the water needed by this seedling?",options:[{id:"roots",label:"Roots"},{id:"leaves",label:"Leaves"},{id:"petals",label:"Petals"},{id:"fruit",label:"Fruit"}],answer:"roots",explanation:"The seedling's roots absorb most of its water from the soil.",diagram:{label:"Seed Lab seedling observations",columns:["Plant part","Where it is or what it does"],rows:[["Roots","In moist soil; take in water"],["Leaves","In light; make sugars"],["Petals","Not present on this seedling"],["Fruit","Not present on this seedling"]],controls:"This young plant is healthy and growing in damp soil.",limitation:"Some plants take in water through other parts too."}}]),Rt("grove","life-sciences","grove-habitat-needs","Find a place with everything an animal needs","A habitat is a place to live. Check that it gives this animal everything listed in the table.","That place is missing something this animal needs. Check every row, not just food or water.",[{prompt:"This pond frog needs the things in the table. Which place has them all?",options:[{id:"pond-edge",label:"A shaded pond edge with insects and plants"},{id:"dry-rock",label:"A dry bare rock with no nearby water"},{id:"sealed-box",label:"A sealed empty box"},{id:"salt-flat",label:"An open salt flat with no shelter"}],answer:"pond-edge",explanation:"The pond edge has fresh water, insects to eat and plants for shelter. It is damp and shaded too.",diagram:{label:"Habitat Dome frog needs",columns:["Need","What this frog needs"],rows:[["Water","Fresh pond water"],["Food","Small insects"],["Shelter","Pond plants and shade"],["Place","Damp areas"]],controls:"Compare each option with all four needs of this frog.",limitation:"Other kinds of frogs may need different places to live."}},{prompt:"This small bird needs the things in the table. Which place has them all?",options:[{id:"woodland",label:"Woodland with shrubs, seeds, insects and water"},{id:"empty-yard",label:"A paved yard with no plants or water"},{id:"deep-ocean",label:"Deep ocean far from land"},{id:"sealed-room",label:"A sealed room with no food"}],answer:"woodland",explanation:"The woodland provides food, water, nesting places and cover from danger.",diagram:{label:"Habitat Dome bird needs",columns:["Need","What this bird needs"],rows:[["Water","Fresh water nearby"],["Food","Seeds and insects"],["Shelter","Shrubs and trees"],["Nesting","Branches and plant material"]],controls:"Compare each option with all four needs of this woodland bird.",limitation:"Other kinds of birds may have different needs."}}]),Rt("grove","life-sciences","grove-life-cycle","Find the next stage in an animal's life","Find Egg in the table. Read the next row to see what hatches from it.","That is not the next stage for this animal. Start at Egg and move down one row.",[{prompt:"Which stage comes directly after a butterfly egg hatches?",options:[{id:"larva",label:"Larva (caterpillar)"},{id:"adult",label:"Adult butterfly"},{id:"pupa",label:"Pupa"},{id:"seedling",label:"Seedling"}],answer:"larva",explanation:"A caterpillar hatches from the egg. It later becomes a pupa, then an adult butterfly. Larva is another name for the caterpillar stage.",diagram:{label:"Life-Cycle Nursery butterfly record",columns:["Stage number","Stage"],rows:[["1","Egg"],["2","Larva (caterpillar)"],["3","Pupa (chrysalis)"],["4","Adult butterfly"]],controls:"Use the stage order shown for a butterfly.",limitation:"Different butterflies spend different amounts of time at each stage."}},{prompt:"In this frog's life cycle, what hatches from the egg?",options:[{id:"tadpole",label:"Tadpole"},{id:"adult",label:"Adult frog"},{id:"froglet",label:"Froglet"},{id:"caterpillar",label:"Caterpillar"}],answer:"tadpole",explanation:"This frog's egg hatches into a tadpole. The tadpole later grows legs and becomes a froglet, a young frog.",diagram:{label:"Life-Cycle Nursery frog record",columns:["Stage number","Stage"],rows:[["1","Egg"],["2","Tadpole"],["3","Tadpole with legs"],["4","Froglet"],["5","Adult frog"]],controls:"Use the stage order shown for this frog life cycle.",limitation:"Some frogs skip a free-swimming tadpole stage. Use this frog's record."}}]),Rt("grove","life-sciences","grove-food-chain","Find what makes its own food in a food chain","In these chains, the producer uses sunlight to make its own food. The animals get food by eating other living things.","That animal eats another living thing. Look for the living thing that makes its own food using light.",[{prompt:"Which living thing in this food chain makes its own food using sunlight? We call it a producer.",options:[{id:"grass",label:"Grass"},{id:"grasshopper",label:"Grasshopper"},{id:"frog",label:"Frog"},{id:"snake",label:"Snake"}],answer:"grass",explanation:"Grass uses sunlight, water and carbon dioxide from the air to make sugars. It is the producer in this chain.",diagram:{label:"Food-Web Field energy path",columns:["From","To","Meaning"],rows:[["Grass","Grasshopper","Grasshopper eats grass"],["Grasshopper","Frog","Frog eats grasshopper"],["Frog","Snake","Snake eats frog"]],controls:"From is the food. To is the animal that eats it.",limitation:"This is one food chain. These animals can have other foods too."}},{prompt:"Which living thing in this pond food chain makes its own food using sunlight? We call it a producer.",hint:"Algae are living things in the water that can use sunlight. Which choice does not need to eat another living thing?",options:[{id:"algae",label:"Algae"},{id:"snail",label:"Snail"},{id:"fish",label:"Fish"},{id:"heron",label:"Heron"}],answer:"algae",explanation:"These algae use sunlight, water and carbon dioxide to make sugars. They are producers in this pond food chain.",diagram:{label:"Food-Web Field pond path",columns:["From","To","Meaning"],rows:[["Algae","Snail","Snail eats algae"],["Snail","Fish","Fish eats snail"],["Fish","Heron","Heron eats fish"]],controls:"From is the food. To is the animal that eats it.",limitation:"This is one pond food chain. These animals can have other foods too."}}]),Rt("grove","life-sciences","grove-adaptation-function","Find how a body part helps an animal","Think about the body part in the question. How could it help the animal where it lives?","Look at what this body part does in the table. Does that match the job you chose?",[{prompt:"How do a duck's webbed feet help it in water?",options:[{id:"paddle",label:"They push against water while swimming."},{id:"breathe",label:"They let the duck breathe underwater."},{id:"dry-feathers",label:"They keep every feather dry."},{id:"chew",label:"They help the duck chew food."}],answer:"paddle",explanation:"The skin between the toes creates a broad surface that pushes against water like a paddle.",diagram:{label:"Adaptation Clinic duck observations",columns:["Body part","What happens"],rows:[["Toes spread out","Skin makes a wide paddle"],["Foot pushes back","Water moves backwards"],["Duck's body","Moves forwards"]],controls:"Watch the same duck swimming in calm water.",limitation:"Feet have other jobs too. Here we are looking at swimming."}},{prompt:"How does thick fur help a polar bear stay warm in a cold place?",hint:"A smaller temperature drop means less cooling. Compare the thick covering with no covering.",options:[{id:"slow-heat-loss",label:"It slows heat loss from the body."},{id:"make-food",label:"It makes food from sunlight."},{id:"breathe-water",label:"It allows the bear to breathe underwater."},{id:"hear-distance",label:"It makes distant sounds louder."}],answer:"slow-heat-loss",explanation:"Thick fur traps air and slows heat leaving the bear's warm body. The fur does not make heat itself.",diagram:{label:"Adaptation Clinic insulation evidence",columns:["Model covering","Cooling after 10 minutes"],rows:[["Thick fur-like covering","3 C"],["Thin covering","8 C"],["No covering","12 C"]],controls:"Same warm model, starting temperature, room and time. C means degrees Celsius.",limitation:"This is a model, not a test on a bear. Body fat also helps polar bears stay warm."}}])]);function zh(i){for(let e of Object.values(i))e&&typeof e=="object"&&zh(e);return Object.freeze(i)}var bo=4;var Hh=4,So=wo({2:{parts:12,cores:12},3:{parts:24,cores:24}}),At=wo([{id:"harbour",name:"Maths Operations",subject:"maths",resource:"parts",icon:"calculator",minHqLevel:1,description:"Run the number-powered logistics district and recover building parts.",stationNames:["Multiplication Depot","Addition Dispatch","Division Workshop","Subtraction Yard","Place Value Tower"]},{id:"english",name:"English Communications",subject:"english",resource:"parts",icon:"book-open",minHqLevel:1,description:"Decode words, sentences and stories inside the communications archive.",stationNames:["Word Archive","Sentence Studio","Spelling Signal","Reading Room","Story Press"]},{id:"physics",name:"Physics Research",subject:"physics",resource:"cores",icon:"orbit",minHqLevel:1,description:"Test forces, light, sound, circuits and energy at the research complex.",stationNames:["Force Track","Light Observatory","Sound Lab","Circuit Station","Energy Workshop"]},{id:"chemistry",name:"Chemistry Laboratory",subject:"chemistry",resource:"cores",icon:"flask-conical",minHqLevel:1,description:"Investigate matter, mixtures, changes, materials and particle models.",stationNames:["Matter Hall","Mixture Lab","Changes Chamber","Properties Bay","Particle Observatory"]},{id:"grove",name:"Life Sciences BioDome",subject:"life-sciences",resource:"cores",icon:"sprout",minHqLevel:1,description:"Study plants, habitats, life cycles, food webs and adaptations.",stationNames:["Seed Lab","Habitat Dome","Life-Cycle Nursery","Food-Web Field","Adaptation Clinic"]}]),Vh={status:"reviewed",reviewer:"Codex authored-answer and executable consistency review",reviewedAt:"2026-09-05",humanCurriculumReview:"pending",source:"Original Beacon Brigade content; science observations are curated virtual datasets."};function jr(i,e,t,n,r,s){return{id:i,version:1,regionId:"harbour",subject:"maths",skill:e,yearBand:"Age 8 / Year 3 with supported stretch (provisional)",prerequisites:t,parameterPolicy:"Only the two checked authored variants are used.",review:Vh,instances:r.map(a=>({hint:n,wrongFeedback:n,...s(a),parameters:a,type:"number"}))}}function Jr(i,e,t,n){return{id:i,version:1,regionId:"legacy-grove",subject:"science",skill:e,yearBand:"Age 8 / Year 3 with supported stretch (provisional)",prerequisites:["Read a short observation table","Compare evidence with a requirement"],parameterPolicy:"Only the two checked curated datasets are used.",review:Vh,instances:n.map(r=>({...r,hint:t,wrongFeedback:t,type:"choice",diagram:{...r.diagram,source:"Curated virtual observations",simulation:!1}}))}}var eu=wo([jr("harbour-crate-reserve","Multiply equal groups, then subtract",["Multiplication facts","Subtraction"],"Count the pieces in all crates. Then take away the pieces for the other base.",[{crates:4,each:6,reserved:9},{crates:5,each:4,reserved:7}],({crates:i,each:e,reserved:t})=>({prompt:`${i} boxes each hold ${e} pieces. Another base needs ${t} of these pieces. How many are left for us?`,hint:`Add ${e} for each of the ${i} boxes, or work out ${i} x ${e}. Then take away ${t}.`,wrongFeedback:"There are two steps: count all the pieces, then take away the other base's share.",answer:i*e-t,explanation:`${i} x ${e} = ${i*e} pieces. ${i*e} - ${t} = ${i*e-t} pieces remain.`,diagram:{kind:"groups",label:"Boxes of pieces",groups:i,itemsPerGroup:e,reserved:t}})),jr("harbour-delivery-total","Add two three-digit quantities",["Place value","Addition with regrouping"],"Start with the first delivery. Add the hundreds, then the tens, then the ones from the second delivery.",[{first:136,second:247},{first:258,second:164}],({first:i,second:e})=>{let t=Math.floor(e/100)*100,n=Math.floor(e/10)%10*10,r=e%10;return{prompt:`The morning delivery brings ${i} bolts. The afternoon delivery brings ${e} bolts. How many bolts arrive altogether?`,answer:i+e,explanation:`${i} + ${t} = ${i+t}. Add ${n} to get ${i+t+n}. Add ${r} to get ${i+e} bolts altogether.`,hint:`Start at ${i}. Add ${t}, then ${n}, then ${r}.`,wrongFeedback:"Both deliveries add to the total. Keep the hundreds, tens and ones in their places.",diagram:{kind:"quantities",label:"Bolt delivery log",rows:[["Morning",i],["Afternoon",e]]}}}),jr("harbour-equal-packs","Divide into equal groups",["Equal sharing","Multiplication facts"],"Give each kit the same number. Count in groups to reach the total.",[{total:36,kits:6},{total:48,kits:8}],({total:i,kits:e})=>({prompt:`Share ${i} metal rings equally between ${e} repair kits. How many rings go in each kit?`,hint:`Imagine giving one ring to each of ${e} kits at a time. How many rounds use all ${i} rings?`,wrongFeedback:"Each kit needs the same number. Check that all the kits together use every ring.",answer:i/e,explanation:`${i} divided by ${e} = ${i/e}. Check: ${e} x ${i/e} = ${i}. Each kit gets ${i/e} rings.`,diagram:{kind:"sharing",label:"Repair kits",total:i,groups:e}})),jr("harbour-stock-left","Subtract with regrouping",["Three-digit place value","Subtraction"],"You can find what is left by counting up from the number used to the starting number.",[{stock:302,used:178},{stock:410,used:235}],({stock:i,used:e})=>{let t=Math.ceil(e/100)*100,n=t-e,r=i-t;return{prompt:`The workshop has ${i} spare parts. It uses ${e} for repairs. How many parts are left?`,hint:`Count up from ${e} to ${t}, then to ${i}. Add the two jumps.`,wrongFeedback:"We need the parts left, not the parts used. Try counting up from the used number to the starting number.",answer:i-e,explanation:`From ${e} to ${t} is ${n}. Then to ${i} is ${r}. Add the jumps: ${n} + ${r} = ${i-e} parts left.`,diagram:{kind:"quantities",label:"Spare parts",rows:[["At the start",i],["Used",e]]}}}),jr("harbour-place-value","Compose hundreds, tens and ones",["Base-ten grouping"],"Each full box stands for 100, each bundle for 10, and each loose pin for 1.",[{hundreds:3,tens:4,ones:8},{hundreds:5,tens:2,ones:6}],({hundreds:i,tens:e,ones:t})=>({prompt:`There are ${i} boxes of 100 pins, ${e} bundles of 10 pins and ${t} loose pins. How many pins are there?`,answer:i*100+e*10+t,explanation:`${i} x 100 + ${e} x 10 + ${t} = ${i*100+e*10+t} pins.`,wrongFeedback:"A box is worth 100 pins and a bundle is worth 10. Count their values, not just the boxes and bundles.",diagram:{kind:"place-value",label:"Pin count",hundreds:i,tens:e,ones:t}})),jr("harbour-missing-supply","Find a missing addend",["Addition and subtraction are inverse"],"Count up from the number packed to the number needed. How many more does that take?",[{target:150,packed:86},{target:200,packed:127}],({target:i,packed:e})=>{let t=Math.ceil(e/10)*10,n=t-e,r=i-t;return{prompt:`We need ${i} bolts. We have packed ${e}. How many more bolts do we need?`,hint:`Start at ${e}. Jump to ${t}, then to ${i}. Add the jumps.`,wrongFeedback:"Some bolts are already packed. Find only the extra bolts needed to reach the total.",answer:i-e,explanation:`From ${e} to ${t} is ${n}. Then to ${i} is ${r}. Add the jumps: ${n} + ${r} = ${i-e} more bolts.`,diagram:{kind:"quantities",label:"Bolts to pack",rows:[["Needed",i],["Packed",e]]}}}),Jr("grove-flexible-cover","Choose a material using two properties","Find a row with Yes for bending and No for water getting through. Both must match.",[{prompt:"A cover must bend around a box and keep water out. Which sample does both?",options:[{id:"foil",label:"Sample A: flexible sheet"},{id:"card",label:"Sample B: card"},{id:"tile",label:"Sample C: tile"}],answer:"foil",explanation:"Sample A bends and lets no water through in the displayed tests. B lets water through; C does not bend. Only A meets both needs.",diagram:{kind:"table",label:"Cover tests",columns:["Sample","Bends around box","Water through"],rows:[["A: flexible sheet","Yes","No"],["B: card","Yes","Yes"],["C: tile","No","No"]],controls:"Same water volume and test time.",limitation:"These results describe only the tested samples."}},{prompt:"A new cover must bend around a box and keep water out. Which sample does both?",options:[{id:"board",label:"Sample D: board"},{id:"film",label:"Sample E: film"},{id:"cloth",label:"Sample F: cloth"}],answer:"film",explanation:"E bends and keeps water out in this test. D cannot bend. F lets water through.",diagram:{kind:"table",label:"New cover tests",columns:["Sample","Bends around box","Water through"],rows:[["D: board","No","No"],["E: film","Yes","No"],["F: cloth","Yes","Yes"]],controls:"Same amount of water and test time.",limitation:"Other samples may give different results."}}]),Jr("grove-magnet-evidence","Use observations about magnetic attraction","Attracted means pulled towards the magnet. Find Yes in that column. Shiny objects are not always magnetic.",[{prompt:"Which object was pulled towards the magnet in this test?",options:[{id:"steel",label:"Steel washer"},{id:"aluminium",label:"Aluminium tab"},{id:"wood",label:"Wooden peg"}],answer:"steel",explanation:"The magnet pulled the steel washer, but not the aluminium tab or wooden peg. Not all metals are attracted to a magnet.",diagram:{kind:"table",label:"Magnet observations",columns:["Object","Attracted"],rows:[["Steel washer","Yes"],["Aluminium tab","No"],["Wooden peg","No"]],controls:"Same magnet and starting distance.",limitation:"Results apply to these objects and this magnet."}},{prompt:"Which object was pulled towards the magnet in this new test?",options:[{id:"plastic",label:"Plastic spacer"},{id:"copper",label:"Copper strip"},{id:"iron",label:"Iron nail"}],answer:"iron",explanation:"Only the iron nail was attracted in this test. The copper strip is metal but was not attracted.",diagram:{kind:"table",label:"Pickup observations",columns:["Object","Attracted"],rows:[["Plastic spacer","No"],["Copper strip","No"],["Iron nail","Yes"]],controls:"Same magnet and starting distance.",limitation:"Not every metal is attracted to this magnet."}}]),Jr("grove-fair-ramp","Identify a fair comparison","Change only the surface. Keep the trolley, ramp height and release method the same.",[{prompt:"Does the surface change how far a trolley rolls? Which two tests change only the surface?",options:[{id:"a-b",label:"Tests A and B"},{id:"a-c",label:"Tests A and C"},{id:"b-c",label:"Tests B and C"}],answer:"a-b",explanation:"A and B use the same trolley, ramp height and no push. Only the surface changes. C uses a higher ramp.",diagram:{kind:"table",label:"Ramp test plans",columns:["Test","Trolley","Ramp height","Surface","Release"],rows:[["A","1","10 cm","Smooth","No push"],["B","1","10 cm","Rough","No push"],["C","1","20 cm","Rough","No push"]],controls:"Keep the trolley, ramp height and start the same.",limitation:"Repeat the tests to check the results."}},{prompt:"We want to test two surfaces. Which pair keeps the trolley, ramp height and start the same?",options:[{id:"d-e",label:"Tests D and E"},{id:"d-f",label:"Tests D and F"},{id:"e-f",label:"Tests E and F"}],answer:"d-f",explanation:"D and F use the same trolley, 15 cm ramp and release; only the surface changes. E changes the trolley too.",diagram:{kind:"table",label:"New ramp test plans",columns:["Test","Trolley","Ramp height","Surface","Release"],rows:[["D","1","15 cm","Smooth","No push"],["E","2","15 cm","Rough","No push"],["F","1","15 cm","Rough","No push"]],controls:"Keep the trolley, ramp height and start the same.",limitation:"Change only the surface for this fair test."}}]),Jr("grove-absorbent-pad","Compare measured material properties","Absorbs means soaks up. Find the biggest amount of water in the table. mL measures the amount of water.",[{prompt:"Each pad gets 20 mL of water. Which pad soaks up the most in this test?",options:[{id:"a",label:"Pad A"},{id:"b",label:"Pad B"},{id:"c",label:"Pad C"}],answer:"b",explanation:"B soaks up 14 mL. That is more than A's 5 mL and C's 9 mL.",diagram:{kind:"table",label:"Absorbency test",columns:["Pad","Water absorbed"],rows:[["A","5 mL"],["B","14 mL"],["C","9 mL"]],controls:"Same pad size, water amount and 30-second test.",limitation:"Other tests may give different results."}},{prompt:"Each pad gets 20 mL of water. Which pad soaks up the most in this new test?",options:[{id:"d",label:"Pad D"},{id:"e",label:"Pad E"},{id:"f",label:"Pad F"}],answer:"f",explanation:"F soaks up 16 mL. That is more than D's 8 mL and E's 11 mL.",diagram:{kind:"table",label:"New absorbency test",columns:["Pad","Water absorbed"],rows:[["D","8 mL"],["E","11 mL"],["F","16 mL"]],controls:"Same pad size, water amount and 30-second test.",limitation:"Choose using these results, not the pad's name."}}]),Jr("grove-push-observation","Link a push to observed motion","Compare the two distances. The larger number means the cart went further in this test.",[{prompt:"The cart starts still each time on the same track. Which sentence matches the results?",options:[{id:"further",label:"The stronger push moved this cart further."},{id:"same",label:"Both pushes moved it the same distance."},{id:"less",label:"The stronger push moved it less far."}],answer:"further",explanation:"In this test, the stronger push moves the cart 70 cm and the gentle push 30 cm. Since 70 is greater than 30, the stronger push moves it further.",diagram:{kind:"table",label:"Cart push observations",columns:["Push","Distance travelled"],rows:[["Gentle","30 cm"],["Stronger","70 cm"]],controls:"Same cart, track and starting point. Start with the cart still.",limitation:"These are made-up test results, not a live experiment."}},{prompt:"The cart starts still each time on the same track. Which sentence matches these new results?",options:[{id:"none",label:"Neither push moved the cart."},{id:"gentle",label:"The gentle push moved this cart less far."},{id:"equal",label:"The two distances are equal."}],answer:"gentle",explanation:"25 cm is less than 60 cm. The gentle push moved this cart less far in this test.",diagram:{kind:"table",label:"New cart observations",columns:["Push","Distance travelled"],rows:[["Gentle","25 cm"],["Stronger","60 cm"]],controls:"Same cart, track and starting point. Start with the cart still.",limitation:"These results describe only these tests."}}]),Jr("grove-load-support","Use test evidence to choose a support","Find a support that holds the number needed or more. Exactly that number is enough.",[{prompt:"We need a support that holds 6 blocks without bending. Which one can do this?",options:[{id:"a",label:"Support A"},{id:"b",label:"Support B"},{id:"c",label:"Support C"}],answer:"c",explanation:"C holds 8 blocks without bending, which is at least 6. A holds only 3 and B only 5, so neither meets the requirement.",diagram:{kind:"table",label:"Support tests",columns:["Support","Most blocks without bending"],rows:[["A",3],["B",5],["C",8]],controls:"Same gap, same kind of blocks, same block position.",limitation:"Made-up test results. Do not use them to build real supports."}},{prompt:"We need a support that holds 7 blocks without bending. Which one can do this?",options:[{id:"d",label:"Support D"},{id:"e",label:"Support E"},{id:"f",label:"Support F"}],answer:"d",explanation:"D holds 7 blocks without bending and meets the requirement exactly. E holds 4 and F holds 6, which are both fewer than 7.",diagram:{kind:"table",label:"New support tests",columns:["Support","Most blocks without bending"],rows:[["D",7],["E",4],["F",6]],controls:"Same gap, same kind of blocks, same block position.",limitation:"These results describe only these supports."}}]),...Bh]);function Gh(i,e=0){let t=eu.find(s=>s.id===i);if(!t||!Number.isInteger(e)||e<0||e>=t.instances.length)throw new RangeError("Unknown Beacon Brigade question instance");let{instances:n,...r}=t;return structuredClone({...r,...n[e],contentVersion:bo,id:`${t.id}:v${t.version}:${e}`,templateId:i,templateVersion:t.version,variant:e})}function wo(i){for(let e of Object.values(i))e&&typeof e=="object"&&wo(e);return Object.freeze(i)}var Kr=tu([{id:"balanced",name:"Balanced",description:"Standard travel and cargo.",travelSpeedMultiplier:1,cargoBonus:0},{id:"survey",name:"Survey",description:"Faster travel with a smaller cargo hold.",travelSpeedMultiplier:1.2,cargoBonus:-1},{id:"hauler",name:"Hauler",description:"Extra cargo with slower travel.",travelSpeedMultiplier:.85,cargoBonus:1}]),Mo=tu([{id:"bridge",name:"District Bridge",cost:{parts:16,cores:0},requiredDistricts:["harbour"],abilities:{travelSpeedBonus:.08,cargoBonus:0}},{id:"observatory",name:"Observatory",cost:{parts:24,cores:16},requiredDistricts:["harbour","physics"],abilities:{travelSpeedBonus:0,cargoBonus:1}},{id:"greenhouse",name:"Greenhouse",cost:{parts:16,cores:24},requiredDistricts:["chemistry","grove"],abilities:{travelSpeedBonus:.07,cargoBonus:0}}]);function Qr(i){let e=i.stations??[],t=e.filter(l=>l.resolved),n=t.filter(l=>l.resolution==="independent").length,r=t.filter(l=>l.resolution==="corrected").length,s=t.filter(l=>["hinted","assisted"].includes(l.resolution)).length,a=i.status==="completed"&&e.length>0&&t.length===e.length,o=a?n===e.length?3:n+r===e.length?2:1:0;return{expeditionId:i.id,regionId:i.regionId,completed:a,stars:o,total:e.length,resolved:t.length,independent:n,corrected:r,supported:s}}function un(i){let e=Kr.find(f=>f.id===i.campaign?.loadoutId)??Kr[0],t=Mo.filter(f=>i.campaign?.projects?.some(g=>g.projectId===f.id)).map(f=>f.id),n=(i.history??[]).map(Qr),r=At.map(f=>{let g=n.filter(x=>x.regionId===f.id&&x.completed);return{id:f.id,name:f.name,completed:g.length>0,progress:Math.min(1,g.length),target:1,completions:g.length,bestStars:Math.max(0,...g.map(x=>x.stars))}}),s=r.filter(f=>f.completed).map(f=>f.id),a={travelSpeedBonus:0,cargoBonus:0},o=Mo.map(f=>{let g=t.includes(f.id);g&&(a.travelSpeedBonus+=f.abilities.travelSpeedBonus,a.cargoBonus+=f.abilities.cargoBonus);let x=f.requiredDistricts.filter(m=>!s.includes(m)),p=["parts","cores"].every(m=>(i.wallet?.[m]??0)>=f.cost[m]);return{...f,built:g,missingDistricts:x,affordable:p,unlocked:x.length===0,canBuild:!g&&p&&x.length===0}}),l=n.filter(f=>f.completed).length,c=n.reduce((f,g)=>f+g.resolved,0),u=c+(i.activeExpedition?Qr(i.activeExpedition).resolved:0);a.travelSpeedBonus=Math.round(a.travelSpeedBonus*100)/100;let d=[{id:"first-expedition",name:"First Expedition",progress:l,target:1},{id:"district-explorer",name:"District Explorer",progress:s.length,target:At.length},{id:"steady-crew",name:"Steady Crew",progress:l,target:10},{id:"fieldwork",name:"Fieldwork",progress:c,target:25}].map(f=>({...f,progress:Math.min(f.progress,f.target),unlocked:f.progress>=f.target})),h={travelSpeedMultiplier:e.travelSpeedMultiplier*(1+a.travelSpeedBonus),cargoBonus:e.cargoBonus+a.cargoBonus};return structuredClone({loadoutId:e.id,loadout:e,canEquip:!i.activeExpedition,projectsBuilt:t,projects:o,bonuses:a,expeditionModifiers:h,stationRewardAmount:Hh+h.cargoBonus,completedDistricts:s,objectives:r,achievements:d,completions:n,totalResolved:u,resolvedStations:u,totalStars:r.reduce((f,g)=>f+g.bestStars,0),maxStars:At.length*3})}function tu(i){for(let e of Object.values(i))e&&typeof e=="object"&&tu(e);return Object.freeze(i)}var nu=100,iu=12,wy=[["harbour-crate-reserve"],["harbour-delivery-total","harbour-missing-supply"],["harbour-equal-packs"],["harbour-stock-left"],["harbour-place-value"]],ru=class extends Error{constructor(e,t,n=409){super(t),this.name="BeaconError",this.code=e,this.status=n}};function su({profileId:i="local-preview"}={}){return{schemaVersion:1,contentVersion:bo,profileId:i,version:0,hqLevel:1,wallet:{parts:0,cores:0},nextExpeditionNumber:1,activeExpedition:null,history:[],upgrades:[],campaign:{loadoutId:"balanced",projects:[]}}}function qh(i,e){My(e);let t=structuredClone(i),n=e.at??null,r=i.version+1;switch(e.type){case"start":{t.activeExpedition&&ft("EXPEDITION_ACTIVE","Resume or end the current expedition first."),t.history.length>=nu&&ft("HISTORY_FULL","All 100 expedition records are retained. New expeditions are paused until expanded storage is available.");let s=At.find(u=>u.id===e.regionId);s||ft("INVALID_REGION","Unknown region.",400),t.hqLevel<s.minHqLevel&&ft("REGION_LOCKED","Upgrade HQ before visiting this region.");let a=eu.filter(u=>u.regionId===s.id),o=t.history.filter(u=>u.regionId===s.id).length,l=`${t.profileId}:exp-${t.nextExpeditionNumber++}-${s.id}`,c=un(t);t.activeExpedition={id:l,regionId:s.id,resource:s.resource,loadoutId:c.loadoutId,loadout:c.loadout,campaignBonuses:c.bonuses,modifiers:c.expeditionModifiers,startedAt:n,startedVersion:r,status:"active",earned:{parts:0,cores:0},stations:Array.from({length:s.stationNames.length},(u,d)=>{let h=s.id==="harbour"?wy[d]:null,f=h?a.find(p=>p.id===h[o%h.length]):a[d],x=(h?Math.floor(o/h.length):o)%f.instances.length;return{id:`${l}:station-${d+1}`,name:s.stationNames[d],question:Gh(f.id,x),attempts:[],resolved:!1,helpUsed:!1,support:{stage:0,hintAtAttempt:null,events:[],message:null},resolution:null,firstAttemptCorrect:null,lastFeedback:null,reward:{resource:s.resource,amount:c.stationRewardAmount},rewardGranted:!1}})};break}case"answer":{let s=Wh(t,e.stationId);if(s.resolved)return t;let a=Ey(s.question,e.answer);!a&&s.attempts.filter(o=>!o.correct).length>=iu&&ft("ATTEMPT_LIMIT","Your attempts are preserved. Use worked guidance, then submit the corrected answer, or end the expedition."),s.attempts.push({answer:e.answer,correct:a,at:n,version:r,helpStage:s.support.stage}),s.firstAttemptCorrect=s.attempts[0].correct,s.lastFeedback={correct:a,explanation:a?s.question.explanation:s.question.wrongFeedback},a&&(s.resolved=!0,s.resolvedAt=n,s.resolvedVersion=r,s.resolution=s.support.stage===2?"assisted":s.helpUsed?"hinted":s.attempts.length===1?"independent":"corrected",s.rewardGranted||(s.rewardGranted=!0,t.wallet[s.reward.resource]+=s.reward.amount,t.activeExpedition.earned[s.reward.resource]+=s.reward.amount));break}case"hint":{let s=Wh(t,e.stationId);if(s.resolved||s.support.stage===2)return t;let a=s.attempts.at(-1);(!a||a.correct)&&ft("ATTEMPT_REQUIRED","Try an answer first; your resources are safe."),s.support.stage===1&&s.attempts.length<=s.support.hintAtAttempt&&s.attempts.length<iu&&ft("RETRY_REQUIRED","Try again with the hint before opening worked guidance."),s.helpUsed=!0,s.support.stage+=1,s.support.hintAtAttempt=s.attempts.length,s.support.message=s.support.stage===1?s.question.hint:s.question.explanation,s.support.events.push({stage:s.support.stage,afterAttempt:s.attempts.length,at:n,version:r}),s.lastFeedback={correct:!1,explanation:s.support.message,kind:s.support.stage===1?"hint":"worked"};break}case"finish":case"end":{let s=$h(t);e.type==="finish"&&s.stations.some(a=>!a.resolved)&&ft("STATIONS_UNRESOLVED","Resolve every station, or end the expedition with the rewards already earned."),s.status=e.type==="finish"?"completed":"ended",s.finishedAt=n,s.finishedVersion=r,s.completion=Qr(s),t.history.push(s),t.activeExpedition=null;break}case"equip":{Kr.some(s=>s.id===e.loadoutId)||ft("INVALID_LOADOUT","Unknown expedition loadout.",400),t.activeExpedition&&ft("EXPEDITION_ACTIVE","End or finish the current expedition before changing loadout."),t.campaign??={loadoutId:"balanced",projects:[]},t.campaign.loadoutId=e.loadoutId;break}case"project":{let s=Mo.find(o=>o.id===e.projectId);s||ft("INVALID_PROJECT","Unknown restoration project.",400);let a=un(t).projects.find(o=>o.id===s.id);a.built&&ft("PROJECT_BUILT","This restoration project is already built."),a.unlocked||ft("PROJECT_LOCKED","Complete the required district expeditions before building this project."),a.affordable||ft("INSUFFICIENT_RESOURCES",`This project needs ${s.cost.parts} parts and ${s.cost.cores} cores.`),t.wallet.parts-=s.cost.parts,t.wallet.cores-=s.cost.cores,t.campaign??={loadoutId:"balanced",projects:[]},t.campaign.projects.push({projectId:s.id,cost:{...s.cost},at:n,version:r});break}case"upgrade":{let s=So[t.hqLevel+1];s||ft("MAX_HQ_LEVEL","HQ is at the highest level in this first playable."),(t.wallet.parts<s.parts||t.wallet.cores<s.cores)&&ft("INSUFFICIENT_RESOURCES",`This upgrade needs ${s.parts} parts and ${s.cores} cores.`),t.wallet.parts-=s.parts,t.wallet.cores-=s.cores,t.hqLevel+=1,t.upgrades.push({hqLevel:t.hqLevel,cost:{...s},at:n,version:r});break}case"reset":{let s=su({profileId:t.profileId});Object.assign(t,s),t.contentVersion=bo;break}}return t.version=r,t}function au(i,{review:e=!1}={}){let t=structuredClone(i),n=[...t.history,...t.activeExpedition?[t.activeExpedition]:[]];for(let r of n)for(let s of r.stations)delete s.question.hint,delete s.question.wrongFeedback,!e&&r.status==="active"&&!s.resolved&&s.support.stage<2&&(delete s.question.answer,delete s.question.explanation);return t.limits={maxExpeditions:nu,expeditionsRemaining:nu-t.history.length-(t.activeExpedition?1:0),maxWrongAttemptsPerStation:iu,historyRetention:"No automatic deletion"},t.nextUpgrade=So[i.hqLevel+1]?{level:i.hqLevel+1,cost:{...So[i.hqLevel+1]}}:null,t.campaignProgress=un(i),t}function My(i){(!i||typeof i!="object"||Array.isArray(i))&&ft("INVALID_ACTION","An action object is required.",400);let e={start:["regionId"],answer:["stationId","answer"],hint:["stationId"],finish:[],upgrade:[],end:[],reset:[],equip:["loadoutId"],project:["projectId"]};(typeof i.type!="string"||!Object.hasOwn(e,i.type))&&ft("INVALID_ACTION","Unknown action type.",400);let t=["type","at",...e[i.type]];Object.keys(i).some(n=>!t.includes(n))&&ft("INVALID_ACTION","Unexpected action fields.",400),e[i.type].some(n=>!Object.hasOwn(i,n))&&ft("INVALID_ACTION","Required action fields are missing.",400),["stationId","regionId","loadoutId","projectId"].some(n=>n in i&&typeof i[n]!="string")&&ft("INVALID_ACTION","Action IDs must be strings.",400),"at"in i&&(typeof i.at!="string"||!Number.isFinite(Date.parse(i.at)))&&ft("INVALID_ACTION","Invalid timestamp.",400),i.type==="answer"&&!(typeof i.answer=="string"&&i.answer.length<=120&&i.answer.trim()||typeof i.answer=="number"&&Number.isFinite(i.answer))&&ft("INVALID_ANSWER","Enter a number or choose an option.",400)}function Ey(i,e){return i.type==="choice"?((typeof e!="string"||!i.options.some(t=>t.id===e))&&ft("INVALID_ANSWER","Choose one of this question's options.",400),e===i.answer):(typeof e=="string"&&!/^[+-]?\d+(?:\.\d+)?$/.test(e.trim())&&ft("INVALID_ANSWER","Enter a number without units or symbols.",400),Number(e)===i.answer)}function $h(i){return i.activeExpedition||ft("NO_ACTIVE_EXPEDITION","Start an expedition first."),i.activeExpedition}function Wh(i,e){let t=$h(i).stations.find(n=>n.id===e);return t||ft("INVALID_STATION","This station does not belong to the active expedition.",400),t}function ft(i,e,t=409){throw new ru(i,e,t)}var wn=i=>`<i data-lucide="${i}" aria-hidden="true"></i>`,ou={bridge:{title:"Reconnect the valley",description:"Rebuild the river crossing and help every expedition travel faster.",icon:"route",name:"River bridge"},observatory:{title:"Reach for the stars",description:"Restore the telescope. Its survey team finds extra cargo at every new mission.",icon:"telescope",name:"Hilltop observatory"},greenhouse:{title:"Bring the gardens back",description:"Restore the glasshouse and its supply trails to help the whole valley thrive.",icon:"sprout",name:"Valley greenhouse"}},Xh={balanced:{name:"Atlas Explorer",tag:"All-rounder",icon:"compass",description:"Steady travel. A reliable cargo hold."},survey:{name:"Atlas Scout",tag:"Quick journeys",icon:"radar",description:"Travel faster. Carry a little less cargo."},hauler:{name:"Atlas Hauler",tag:"Extra cargo",icon:"truck",description:"Carry more home. Take a little longer."}};function Yh(i,e,t){let n=un(i);return`<section class="panel campaign-board" aria-label="Valley restoration"><div class="panel-head campaign-heading"><div><span class="eyebrow">Operation / Restore the valley</span><h1>${n.projectsBuilt.length===n.projects.length?"A valley brought to life":"Build something that lasts"}</h1><p>${n.completedDistricts.length} of 5 districts explored <span aria-hidden="true">/</span> ${n.projectsBuilt.length} of 3 landmarks restored</p></div><button class="icon-btn" data-action="map" title="Return to world map" aria-label="Return to world map">${wn("x")}</button></div>
  <div class="panel-body"><div class="district-track" aria-label="Subject progress">${n.objectives.map(s=>{let a=At.find(o=>o.id===s.id);return`<button class="district-step ${s.completed?"done":""}" data-action="destination" data-region="${s.id}">${wn(s.completed?"check":a.icon)}<span>${a.subject==="life-sciences"?"Life science":a.subject==="maths"?"Maths":a.subject[0].toUpperCase()+a.subject.slice(1)}</span></button>`}).join("")}</div>
  <div class="restoration-grid">${n.projects.map((s,a)=>{let o=ou[s.id];return`<article class="restoration-project ${s.built?"built":""}" data-project="${s.id}"><div class="project-art project-${s.id}"><img src="./assets/project-${s.id}.jpg" alt="${o.name}" width="640" height="360"><span class="project-number">0${a+1}</span><span class="project-seal">${wn(s.built?"check":o.icon)}</span></div><div class="project-content"><span class="eyebrow">${s.built?"Restored":o.name}</span><h2>${o.title}</h2><p>${o.description}</p><div class="project-cost"><span class="${i.wallet.parts>=s.cost.parts?"enough":""}">${wn("package")}${s.cost.parts} parts</span><span class="${i.wallet.cores>=s.cost.cores?"enough":""}">${wn("flask-conical")}${s.cost.cores} cores</span></div>${s.missingDistricts.length?`<div class="project-prerequisites">${s.missingDistricts.map(l=>`<button data-action="destination" data-region="${l}">${wn("map-pin")}Explore ${At.find(c=>c.id===l)?.subject==="life-sciences"?"life science":At.find(c=>c.id===l)?.subject}${wn("arrow-right")}</button>`).join("")}</div>`:`<p class="project-ready">${s.built?"Your expeditions now use this upgrade.":s.affordable?"Your team has everything ready.":"Gather the remaining cargo to start."}</p>`}<button class="button ${s.canBuild?"primary":""} full" data-action="restore-project" data-project="${s.id}" ${s.built||!s.canBuild||e||t?"disabled":""}>${wn(s.built?"check":"hard-hat")}${s.built?"Restored":s.canBuild?"Build landmark":"Supplies needed"}</button></div></article>`}).join("")}</div>
  <div class="campaign-badges" aria-label="Expedition achievements">${n.achievements.map(s=>`<div class="campaign-badge ${s.unlocked?"earned":""}">${wn(s.unlocked?"award":"flag")}<span><strong>${s.name}</strong><small>${s.progress} / ${s.target}</small></span></div>`).join("")}</div></div></section>`}function Zh(i,e,t){let n=un(i);return`<section class="panel garage-board"><div class="panel-head campaign-heading"><div><span class="eyebrow">Atlas workshop</span><h1>Ready for the next journey</h1><p>${n.canEquip?"Choose your expedition vehicle.":"Your vehicle is equipped for the active expedition."}</p></div><button class="icon-btn" data-action="hq" title="Return to HQ" aria-label="Return to HQ">${wn("x")}</button></div><div class="panel-body"><div class="loadout-grid">${Kr.map(r=>{let s=Xh[r.id],a=n.loadoutId===r.id;return`<article class="loadout-item ${a?"equipped":""}"><div class="loadout-art"><img src="./assets/atlas-${r.id}.jpg" width="640" height="360" alt="${s.name}"><span>${wn(s.icon)}</span></div><div class="loadout-content"><span class="eyebrow">${s.tag}</span><h2>${s.name}</h2><p>${s.description}</p><div class="loadout-stat"><span>Cargo per mission</span><strong>${4+r.cargoBonus+n.bonuses.cargoBonus}</strong></div><button class="button ${a?"":"primary"} full" data-action="equip-loadout" data-loadout="${r.id}" ${a||!n.canEquip||e||t?"disabled":""}>${wn(a?"check":"wrench")}${a?"Equipped":n.canEquip?"Equip vehicle":"Expedition active"}</button></div></article>`}).join("")}</div><p class="garage-note">Every vehicle can visit every district. Hints and corrections keep the same cargo reward.</p></div></section>`}function lu(i){let e=un(i),t=e.projects.find(n=>!n.built);return t?{title:t.canBuild?`${ou[t.id].name} ready to build`:ou[t.id].title,detail:`${e.projectsBuilt.length} / 3 landmarks restored`,action:"campaign"}:{title:"Valley restored",detail:"Explore again and build your field journal.",action:"map"}}function jh(i){return Xh[i]?.name||"Atlas Explorer"}var es=new Map;function Jh(){es.clear()}var vn=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ui=(i,e,t)=>Number.isInteger(i)&&Number(i)>=e&&Number(i)<=t,Ty=i=>typeof i=="string"||typeof i=="number"&&Number.isFinite(i);function Ay(i){if(!i||typeof i.id!="string"||!i.id)return null;let e=i.diagram;if(!e||typeof e!="object")return null;let t=typeof e.label=="string"?e.label:"Field lab";return e.kind==="sharing"&&ui(e.total,1,120)&&ui(e.groups,2,12)?{kind:"sharing",label:t,total:e.total,groups:e.groups}:e.kind==="groups"&&ui(e.groups,1,12)&&ui(e.itemsPerGroup,1,12)&&e.groups*e.itemsPerGroup<=120&&ui(e.reserved,0,e.groups*e.itemsPerGroup)?{kind:"groups",label:t,groups:e.groups,itemsPerGroup:e.itemsPerGroup,reserved:e.reserved}:e.kind==="table"&&i.subject!=="english"&&Array.isArray(e.columns)&&e.columns.length>=2&&e.columns.length<=10&&e.columns.every(n=>typeof n=="string")&&Array.isArray(e.rows)&&e.rows.length>=2&&e.rows.length<=20&&e.rows.every(n=>Array.isArray(n)&&n.length===e.columns.length&&n.every(Ty))?{kind:"table",label:t,columns:[...e.columns],rows:e.rows.map(n=>[...n]),controls:typeof e.controls=="string"?e.controls:"",limitation:typeof e.limitation=="string"?e.limitation:"",source:typeof e.source=="string"?e.source:""}:null}function Kh(i){return{diagram:i,fingerprint:JSON.stringify(i),open:!1,kits:i.kind==="sharing"?Array(i.groups).fill(0):[],history:[],counted:[],reserved:new Set,mode:"count",rows:[],columns:new Set(i.kind==="table"?i.columns.slice(1).map((e,t)=>t+1):[])}}function Bs(i){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i.map(([e,t])=>`<${e} ${Object.entries(t).map(([n,r])=>`${n}="${vn(r)}"`).join(" ")}></${e}>`).join("")}</svg>`}function zs(i,e,t,n=!1,r){return`<button type="button" class="fl-command" data-action="field-lab-${i}" ${r===void 0?"":`data-fl-index="${r}"`} aria-label="${vn(e)}" title="${vn(e)}" ${n?"disabled":""}>${t}</button>`}var ts=(i,e)=>`<span class="fl-metric"><span>${i}</span><strong>${e}</strong></span>`;function Cy(i,e){let t=e.total-i.kits.reduce((r,s)=>r+s,0),n=i.kits.every(r=>r===i.kits[0]);return`<div class="fl-readout">${ts("Washers left",t)}${ts("Kits",e.groups)}${ts("Started with",e.total)}</div>
    <div class="fl-toolbar">${zs("round","Give one washer to every kit",`${Bs(ar)}<span>One to each</span>`,t<e.groups)}${zs("undo","Undo last move",Bs(or),!i.history.length)}</div>
    <div class="fl-kits">${i.kits.map((r,s)=>`<section class="fl-kit" aria-label="Kit ${s+1}">
      <h4>Kit ${s+1} <strong>${r}</strong></h4>
      <div class="fl-washers" role="img" aria-label="${r} washers in kit ${s+1}">${Array.from({length:r},()=>'<span class="fl-washer" aria-hidden="true"></span>').join("")}</div>
      <div class="fl-kit-actions">${zs("take",`Return one washer from kit ${s+1}`,Bs(ls),r===0,s)}${zs("give",`Give one washer to kit ${s+1}`,Bs(ar),t===0,s)}</div>
    </section>`).join("")}</div>
    <p class="fl-status">${t===e.total?"All washers are in the supply tray.":`${n?"Kits have equal amounts.":"Kits have different amounts."} ${t?`${t} still in the supply tray.`:"The supply tray is empty."}`}</p>`}function Ry(i,e){return`<div class="fl-readout">${ts("Counted",i.counted.length)}${ts("Set aside",`${i.reserved.size} / ${e.reserved}`)}${ts("Counted, not set aside",i.counted.filter(t=>!i.reserved.has(t)).length)}</div>
    <div class="fl-modes" role="group" aria-label="Piece action">${["count","reserve"].map(t=>`<button type="button" data-action="field-lab-${t}" aria-pressed="${i.mode===t}">${t==="count"?"Count pieces":"Set aside"}</button>`).join("")}</div>
    <div class="fl-crates">${Array.from({length:e.groups},(t,n)=>`<fieldset class="fl-crate"><legend>Crate ${n+1}</legend><div class="fl-pieces">${Array.from({length:e.itemsPerGroup},(r,s)=>{let a=n*e.itemsPerGroup+s,o=i.counted.indexOf(a),l=i.reserved.has(a),c=`Crate ${n+1}, piece ${s+1}: ${o<0?"not counted":`counted ${o+1}`}, ${l?"set aside":"available"}`;return`<button type="button" class="fl-piece ${l?"fl-reserved":""} ${o>=0?"fl-counted":""}" data-action="field-lab-piece" data-fl-index="${a}" aria-label="${c}" title="${c}" aria-pressed="${i.mode==="count"?o>=0:l}"><span class="fl-piece-shape" aria-hidden="true">${o<0?"":o+1}</span>${l?'<span class="fl-piece-mark" aria-hidden="true">/</span>':""}</button>`}).join("")}</div></fieldset>`).join("")}</div>`}function Py(i,e){let t=i.rows,n=[...i.columns].sort((r,s)=>r-s);return`<fieldset class="fl-choices"><legend>Compare two: ${vn(e.columns[0])}</legend>${e.rows.map((r,s)=>`<label class="fl-choice"><input type="checkbox" data-fl-input="row" data-fl-index="${s}" ${t.includes(s)?"checked":""} ${t.length===2&&!t.includes(s)?"disabled":""}><span>${vn(r[0])}</span></label>`).join("")}</fieldset>
    <fieldset class="fl-choices fl-columns"><legend>Evidence to compare</legend>${e.columns.slice(1).map((r,s)=>`<label class="fl-choice"><input type="checkbox" data-fl-input="column" data-fl-index="${s+1}" ${i.columns.has(s+1)?"checked":""}><span>${vn(r)}</span></label>`).join("")}</fieldset>
    <div class="fl-comparison">${t.length<2?`<p class="fl-status">${t.length?"One chosen. Choose one more.":"No rows chosen yet."}</p>`:n.length?`<table><caption>${vn(e.label)}</caption><thead><tr><th scope="col">Evidence</th>${t.map(r=>`<th scope="col">${vn(e.rows[r][0])}</th>`).join("")}</tr></thead><tbody>${n.map(r=>`<tr><th scope="row">${vn(e.columns[r])}<small>${String(e.rows[t[0]][r])===String(e.rows[t[1]][r])?"Same entry":"Different entries"}</small></th>${t.map(s=>`<td>${vn(e.rows[s][r])}</td>`).join("")}</tr>`).join("")}</tbody></table>`:'<p class="fl-status">No evidence columns selected.</p>'}</div>
    ${e.controls||e.limitation||e.source?`<details class="fl-notes"><summary>Test notes</summary>${[e.source,e.controls,e.limitation].filter(Boolean).map(r=>`<p>${vn(r)}</p>`).join("")}</details>`:""}`}function Qh(i){let e=i.diagram;return`<div class="fl-top"><span>${vn(e.label)}</span>${zs("reset","Reset field lab",Bs(or))}</div>${e.kind==="sharing"?Cy(i,e):e.kind==="groups"?Ry(i,e):Py(i,e)}`}function ef(i){let e=Ay(i);if(!e)return"";typeof document<"u"&&document.querySelectorAll("details[data-field-lab]").forEach(r=>{let s=es.get(r.dataset.fieldLab);s&&(s.open=r.open)});let t=es.get(i.id);(!t||t.fingerprint!==JSON.stringify(e))&&(t=Kh(e),es.set(i.id,t));let n=e.kind==="sharing"?"Share the washers":e.kind==="groups"?"Count and set aside":"Compare the evidence";return`<details class="field-lab" data-field-lab="${vn(i.id)}" ${t.open?"open":""}><summary>${n}<span class="fl-optional">Optional</span></summary><div class="fl-body">${Qh(t)}</div></details>`}function tf(i,e){let t=i.closest("details[data-field-lab]");if(!t||!(e===t||e.contains(t)))return null;let n=es.get(t.dataset.fieldLab);return n?{lab:t,state:n}:null}function cu(i,e,t){e.open=i.open;let n=i.querySelector(".fl-body"),r=i.ownerDocument.activeElement===t,s=!!n.querySelector(".fl-notes")?.open,a=[...n.querySelectorAll(".fl-washers")].map(l=>l.scrollTop);n.innerHTML=Qh(e);let o=n.querySelector(".fl-notes");if(o&&(o.open=s),n.querySelectorAll(".fl-washers").forEach((l,c)=>{l.scrollTop=a[c]||0}),r){let l=[...n.querySelectorAll("button,input")].find(u=>u.dataset.action===t.dataset.action&&u.dataset.flInput===t.dataset.flInput&&u.dataset.flIndex===t.dataset.flIndex);(l&&!l.disabled?l:n.querySelector('[data-action="field-lab-reset"]'))?.focus({preventScroll:!0})}}function nf(i,e){let t=i.closest('[data-action^="field-lab-"]');if(!t)return!1;let n=tf(t,e);if(!n)return!1;if(t.disabled)return!0;let{lab:r,state:s}=n,a=s.diagram,o=t.dataset.action.slice(10),l=Number(t.dataset.flIndex);if(o==="reset"){let c=Kh(a);return es.set(r.dataset.fieldLab,c),cu(r,c,t),!0}if(a.kind==="sharing"){let c=a.total-s.kits.reduce((u,d)=>u+d,0);if(o==="undo"){let u=s.history.pop();u&&(s.kits=u)}else(o==="round"&&c>=a.groups||ui(l,0,a.groups-1)&&(o==="give"&&c>0||o==="take"&&s.kits[l]>0))&&(s.history.push([...s.kits]),o==="round"?s.kits=s.kits.map(u=>u+1):s.kits[l]+=o==="give"?1:-1)}else a.kind==="groups"&&(o==="count"||o==="reserve"?s.mode=o:o==="piece"&&ui(l,0,a.groups*a.itemsPerGroup-1)&&(s.mode==="reserve"?s.reserved.has(l)?s.reserved.delete(l):s.reserved.add(l):s.counted.includes(l)?s.counted=s.counted.filter(c=>c!==l):s.counted.push(l)));return cu(r,s,t),!0}function rf(i,e){if(!i.matches("input[data-fl-input]"))return!1;let t=tf(i,e);if(!t||t.state.diagram.kind!=="table")return!1;if(i.disabled)return!0;let{lab:n,state:r}=t,s=r.diagram,a=Number(i.dataset.flIndex),o=i.checked;return i.dataset.flInput==="row"&&ui(a,0,s.rows.length-1)?o?!r.rows.includes(a)&&r.rows.length<2&&r.rows.push(a):r.rows=r.rows.filter(l=>l!==a):i.dataset.flInput==="column"&&ui(a,1,s.columns.length-1)&&(o?r.columns.add(a):r.columns.delete(a)),cu(n,r,i),!0}var Iy={Shield:il,House:Zs,Map:$o,BookOpen:Fo,Settings:nl,ArrowLeft:Do,ArrowRight:Uo,Plus:ar,Minus:ls,RotateCcw:or,Volume2:ll,VolumeX:cl,Pause:jo,Play:Jo,FlaskConical:Go,Package:Zo,Check:Oo,X:dl,ChevronRight:Bo,Radio:Qo,Flag:Vo,Wrench:ul,HardHat:Wo,RefreshCw:el,HelpCircle:os,Eye:Ho,Navigation:Xo,MapPin:qo,Calculator:ko,Orbit:Yo,Sprout:rl,Route:tl,Telescope:al,Compass:zo,Radar:Ko,Truck:ol,Award:No,Star:sl},st=i=>document.getElementById(i),Le=i=>String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ot=i=>`<i data-lucide="${i}" aria-hidden="true"></i>`,Oe=(i,e,t="",n="",r=!1,s="")=>`<button type="button" class="button ${n}" data-action="${i}" ${r?"disabled":""} ${s}>${t?ot(t):""}${e}</button>`,hi=(i,e,t)=>`<button class="icon-btn" type="button" data-action="${i}" title="${e}" aria-label="${e}">${ot(t)}</button>`,Ly=new URLSearchParams(location.search),sr=["localhost","127.0.0.1","[::1]"].includes(location.hostname)&&Ly.get("preview")==="1",an={get(i,e=null){try{return JSON.parse(localStorage.getItem(i)||"null")??e}catch{return e}},set(i,e){try{localStorage.setItem(i,JSON.stringify(e))}catch{Qt("Device storage is unavailable. Keep this page open until your save is confirmed.")}},remove(i){localStorage.removeItem(i)}},ce,rr,ns,_e,et="hq",gt="harbour",hn="",En="",qt="",$t="",at=!1,Wt=!1,Eo=null,ss="",sf,Kt=null,as="bridge",$n=an.get("bqBeaconSettings",{sound:!1,reduced:matchMedia("(prefers-reduced-motion: reduce)").matches}),of="bqBeaconPreviewV1",Ni=st("dialog"),lf=null,Ao=()=>At.find(i=>i.id===gt),Hs=i=>ce?.history?.some(e=>e.regionId===i&&e.status==="completed"),pu=i=>`${i.subject==="life-sciences"?"Life Sciences":i.subject[0].toUpperCase()+i.subject.slice(1)} / ${i.resource==="parts"?"Building parts":"Research cores"}`,ir=()=>ce?.activeExpedition?.stations.find(i=>i.id===En),Dy=()=>ce?.activeExpedition?.stations.find(i=>i.id===qt),To=i=>ce?.activeExpedition?.stations.findIndex(e=>e.id===i)??-1,is=()=>`bqBeaconPending:${rr?.id}`,Vs=()=>`bqBeaconDraft:${rr?.id}:${En}`,mu=i=>ce.activeExpedition?.regionId===i?ce.activeExpedition.stations.reduce((e,t)=>e+t.reward.amount,0):At.find(e=>e.id===i).stationNames.length*un(ce).stationRewardAmount;function cf(){if(!_e.travel)return;let i=ce.activeExpedition?ce.activeExpedition.modifiers?.travelSpeedMultiplier??1:un(ce).expeditionModifiers.travelSpeedMultiplier;_e.travel.duration/=i}var Un=null;function Qt(i){st("toast").textContent=i,st("toast").classList.add("visible"),clearTimeout(sf),sf=setTimeout(()=>st("toast").classList.remove("visible"),5500)}function uf(){hl({icons:Iy,attrs:{"stroke-width":1.8}})}function rs(i=!1){if(!(!$n.sound||document.hidden))try{Un||=new AudioContext,Un.resume();let e=Un.createGain();e.gain.setValueAtTime(.025,Un.currentTime),e.gain.exponentialRampToValueAtTime(1e-4,Un.currentTime+.3),e.connect(Un.destination);let t=Un.createOscillator();t.type="sine",t.frequency.setValueAtTime(i?620:380,Un.currentTime),t.frequency.exponentialRampToValueAtTime(i?920:290,Un.currentTime+.22),t.connect(e),t.start(),t.stop(Un.currentTime+.3)}catch{}}function Ws(){speechSynthesis.cancel(),Un?.suspend()}function Uy(){if(!$n.sound){Qt("Turn on sound in Settings to hear the question.");return}speechSynthesis.cancel();let i=ir();if(!i)return;let e=new SpeechSynthesisUtterance(i.question.prompt);e.lang="en-AU",e.rate=.92,speechSynthesis.speak(e)}async function Gs(i){let e=await fetch("/api/beacon-brigade",{method:i?"POST":"GET",credentials:"same-origin",cache:"no-store",headers:{accept:"application/json",...sessionStorage.getItem("brightQuestChildCapability")?{"x-bq-child-capability":sessionStorage.getItem("brightQuestChildCapability")}:{},...i?{"content-type":"application/json","x-bq-child-id":rr.id}:{}},...i?{body:JSON.stringify(i)}:{}}),t=await e.json().catch(()=>({}));if(!e.ok){let n=new Error(t.error||`Connection error (${e.status})`);throw n.code=t.code,n.status=e.status,n}return t}async function di(i){if(at)return!1;if(Kt)return Qt("Reconnect your pending save before starting another action."),!1;at=!0,dn();let e={operationId:crypto.randomUUID(),version:ce.version,action:i};try{return sr?(ns=qh(ns,{...e.action,at:new Date().toISOString()}),an.set(of,ns),ce=au(ns)):(an.set(is(),e),ce=(await Gs(e)).state,an.remove(is())),_e.hqLevel!==ce.hqLevel&&_e.createBase(ce.hqLevel),!0}catch(t){if(!sr&&(!t.status||t.status>=500))Kt=e,Qt("Connection interrupted. Your answer is kept here. Reconnect to confirm the save.");else{if(an.remove(is()),t.status===409)try{ce=(await Gs()).state}catch{}Qt(t.message)}return!1}finally{at=!1,dn()}}async function df(){if(!(!Kt||at)){at=!0,dn();try{ce=(await Gs(Kt)).state,Kt=null,an.remove(is()),_e.hqLevel!==ce.hqLevel&&_e.createBase(ce.hqLevel),Qt("Saved. Your progress is up to date.")}catch(i){i.status&&i.status<500&&(Kt=null,an.remove(is()),i.status===409&&(ce=(await Gs()).state)),Qt(i.message||"Still offline. Your pending response is kept on this device.")}finally{at=!1,dn()}}}function Gt(i,e={},t=!1){Ws(),et=i,e.regionId&&(gt=e.regionId),e.stationId&&(En=e.stationId),e.reviewId&&(ss=e.reviewId),e.projectId&&(as=e.projectId);let n={view:et,regionId:gt,selectedRegionId:hn,stationId:En,targetStationId:qt,reviewId:ss,projectId:as};history[t?"replaceState":"pushState"](n,"",`${location.pathname}${location.search}#${i}${i==="station"?`/${encodeURIComponent(En)}`:""}`),dn()}function hf(){if(!_e||et==="travel")return;_e.paused=Wt||Ni.open,_e.reduced=$n.reduced;let i=un(ce);_e.syncCampaign(i),_e.setLoadout(ce.activeExpedition?ce.activeExpedition.loadoutId??ce.activeExpedition.loadout?.id??"balanced":i.loadoutId),et==="map"||et==="region-info"?(_e.selectStation(gt,null),_e.setView("map")):et==="region"?(_e.setView("region",gt),_e.selectStation(gt,qt?To(qt):null)):et==="station"?(_e.setView("station",gt),_e.selectStation(gt,To(En)),_e.setView("station",gt)):et==="results"?_e.setView("region",Eo?.regionId||gt):et==="landmark"?_e.focusProject(as):_e.setView("hq"),_e.syncMarkers({view:et,region:gt,selectedRegion:hn,completedRegions:At.filter(e=>Hs(e.id)).map(e=>e.id),activeRegion:ce.activeExpedition?.regionId||"",selectedStation:qt,stations:ce.activeExpedition?.regionId===gt?ce.activeExpedition.stations:[]})}function Ny(){st("topbar").innerHTML=`<div class="brand"><span class="brand-mark">${ot("shield")}</span><div><strong>BEACON BRIGADE</strong><span class="overline">${sr?"Local preview / saved on this device":"Bright Quest / Expedition command"}</span></div></div>
    <div class="wallet"><div class="resource">${ot("package")}<div><strong>${ce.wallet.parts}</strong><small>BUILDING PARTS</small></div></div><div class="resource cores">${ot("flask-conical")}<div><strong>${ce.wallet.cores}</strong><small>RESEARCH CORES</small></div></div></div>
    <div class="profile-chip">${Le(rr.name)}<small>${Kt?"Save pending":sr?"Preview commander":"Progress connected"}</small></div>
    ${hi("reset-game","Reset game progress","rotate-ccw")}
    <a class="icon-btn portal-home" href="/" title="Return to Bright Quest" aria-label="Return to Bright Quest">${ot("arrow-left")}</a>`}function Fy(){let i=[["hq","house","HQ"],["map","map","World map"],["campaign","flag","Valley"],["journal","book-open","Journal"],["settings","settings","Settings"]];st("navigation").innerHTML=i.map(([e,t,n])=>`<button class="nav-btn ${et===e?"active":""}" data-action="${e}" type="button" ${et==="travel"&&e!=="settings"||at?"disabled":""} ${et===e?'aria-current="page"':""}>${ot(t)}<span>${n}</span></button>`).join(""),st("world-controls").innerHTML=hi("zoom-in","Zoom in","plus")+hi("zoom-out","Zoom out","minus")+hi("reset-camera","Reset camera","rotate-ccw"),st("world-controls").hidden=["station","travel"].includes(et)}function Xn(i,e,t="",n=""){return`<div class="scene-caption ${n}"><div class="eyebrow">${i}</div><h1>${e}</h1>${t?`<p>${t}</p>`:""}<span class="coordinate">SECTOR 07 / BEACON OPERATIONS</span></div>`}function ky(){return'<div class="vehicle-id"><strong>ATLAS / M-07</strong><small>ARMOURED EXPEDITION VEHICLE</small></div>'}function Oy(){let i=ce.nextUpgrade?.cost;return i?`<div class="requirements">${[["parts","Building parts","package","harbour"],["cores","Research cores","flask-conical","grove"]].map(([e,t,n,r])=>`<div class="requirement ${ce.wallet[e]>=i[e]?"ready":""}"><span>${ot(n)}${t}</span><strong>${ce.wallet[e]} <small>/ ${i[e]}</small></strong>${ce.wallet[e]<i[e]?`<button data-action="destination" data-region="${r}">Find ${i[e]-ce.wallet[e]} more</button>`:"<small>Ready to build</small>"}</div>`).join("")}</div>`:""}function hu(){let i=ce.nextUpgrade,e=lu(ce),t=ce.activeExpedition?Oe("resume","Resume expedition","play","primary hq-primary",at):Oe("map","Choose expedition","map","primary hq-primary",at);return Xn("Your home base",["","Forward operating base","Expedition headquarters","Beacon command centre"][ce.hqLevel],"Build the base. Equip the expedition.")+`<button class="hq-objective" data-action="${e.action}">${ot("flag")}<span><strong>${e.title}</strong><small>${e.detail}</small></span>${ot("chevron-right")}</button><div class="hq-quick-actions" aria-label="Headquarters actions">${hi("garage","Equip Atlas","wrench")}${i?hi("construction","View construction","hard-hat"):""}${t}</div>`}function ff(){let i=At.find(s=>s.id===hn),e=i&&Hs(i.id),t=i?ce.history.filter(s=>s.regionId===i.id&&s.status==="completed").length:0,n=i&&ce.activeExpedition?.regionId===i.id,r=i?`<aside class="panel field-command world-command selected"><div class="panel-head destination-panel-head"><div><div class="eyebrow">${e?"District completed":"Destination selected"}</div><h2>${Le(i.name)}</h2><div class="mission-count">${Le(pu(i))}</div></div>${hi("clear-region","Close destination","x")}</div><div class="panel-body"><div class="destination-status"><span class="status ${e?"complete-glow":"pending"}">${e?`${ot("check")} Complete`:n?"In progress":"Ready"}</span><span class="node-code">${t?`${t} CLEAR${t===1?"":"S"}`:"NEW ROUTE"}</span></div><p class="destination-skill">${Le(i.description)}</p><div class="summary-resource"><span>${ot(i.resource==="parts"?"package":"flask-conical")}${i.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${mu(i.id)}</strong></div><div class="destination-actions">${Oe("explore-region","Explore","eye")}${Oe("march-region",n?"Resume":e?"March again":"March","navigation","primary",at)}</div></div></aside>`:"";return Xn("Beacon Valley","Where will you explore?")+r}function By(){let i=Ao();return Xn("Destination selected",Le(i.name))+`<aside class="panel"><div class="panel-head"><div class="eyebrow">${Le(pu(i))}</div><h2>${Le(i.name)}</h2></div><div class="panel-body"><p>${Le(i.description)}</p><div class="summary-resource"><span>${ot(i.resource==="parts"?"package":"flask-conical")}${i.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${mu(i.id)}</strong></div><p class="subtle">${i.stationNames.length} destinations / untimed questions</p>${Oe("deploy","Deploy Atlas","arrow-right","primary full",at)}${Oe("map","Back to world map","arrow-left","quiet full")}</div></aside>`}function pf(){let i=ce.activeExpedition;if(!i)return et="map",ff();gt=i.regionId;let e=i.stations.filter(o=>o.resolved).length,t=i.stations.length,n=e===t,r=Dy(),s=r?`<aside class="panel field-command selected"><div class="panel-head destination-panel-head"><div><div class="eyebrow">Destination selected</div><h2>${Le(r.name)}</h2><div class="mission-count">${e} of ${t} resolved</div></div>${hi("clear-station","Close destination","x")}</div><div class="panel-body"><div class="destination-status"><span class="status ${r.resolved?"":"pending"}">${r.resolved?"Resolved":"Ready"}</span><span class="node-code">SITE ${String(To(r.id)+1).padStart(2,"0")}</span></div><p class="destination-skill">${Le(r.question.skill)}</p><div class="summary-resource"><span>${ot(i.resource==="parts"?"package":"flask-conical")}${i.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${r.reward.amount}</strong></div><div class="destination-actions">${Oe("explore-station","Explore","eye","",!1,`data-station="${Le(r.id)}"`)}${Oe("march-station",r.resolved?"Revisit":"March","navigation","primary",at,`data-station="${Le(r.id)}"`)}</div></div></aside>`:"",a=!r&&n?`<aside class="panel field-command complete"><div class="panel-head"><div class="eyebrow">Expedition ready</div><h2>All ${t} sites complete</h2><div class="mission-count">+${i.earned[i.resource]} ${i.resource==="parts"?"parts":"cores"} secured</div></div><div class="panel-foot">${Oe("finish","Complete expedition","check","primary full",at)}</div></aside>`:"";return Xn("Aerial expedition view",Le(Ao().name),`${e} of ${t} missions complete`)+s+a+ky()}function mf(i,e=!1){if(!i)return"";let t="";return i.kind==="groups"?t=`<div class="crate-grid">${Array.from({length:i.groups},(n,r)=>`<div class="supply-crate" role="img" aria-label="Crate ${r+1}: ${i.itemsPerGroup} pieces">${"<i></i>".repeat(i.itemsPerGroup)}</div>`).join("")}</div><p class="diagram-note">Reserved for another base: <strong>${i.reserved}</strong></p>`:i.kind==="sharing"?t=`<div class="log-row"><span>Washers available</span><strong>${i.total}</strong></div><div class="crate-grid" style="margin-top:12px">${Array.from({length:i.groups},(n,r)=>`<div class="place-value"><strong>?</strong><small>KIT ${r+1}</small></div>`).join("")}</div>`:i.kind==="place-value"?t=`<div class="place-values">${[["hundreds","BOXES OF 100"],["tens","BUNDLES OF 10"],["ones","LOOSE PINS"]].map(([n,r])=>`<div class="place-value"><strong>${i[n]}</strong><small>${r}</small></div>`).join("")}</div>`:i.kind==="quantities"?t=i.rows.map(([n,r])=>`<div class="log-row"><span>${Le(n)}</span><strong>${r}</strong></div>`).join(""):i.kind==="table"&&(t=`${e?`<div class="test-control">${Oe("observe","Inspect evidence","flask-conical","",at)}<small>Recorded field observations</small></div>`:""}<table><thead><tr>${i.columns.map(n=>`<th scope="col">${Le(n)}</th>`).join("")}</tr></thead><tbody>${i.rows.map((n,r)=>`<tr data-evidence-row="${r}">${n.map(s=>`<td>${Le(s)}</td>`).join("")}</tr>`).join("")}</tbody></table><p class="diagram-note">${Le(i.controls)}</p>`),`<figure class="diagram"><figcaption>${Le(i.label)}</figcaption>${t}</figure>`}function zy(){let i=ir();if(!i)return et="region",pf();let e=i.question,t=an.get(Vs(),"");$t=$t||String(t??"");let n=i.lastFeedback,r=ce.activeExpedition.stations.filter(s=>!s.resolved).length;return Xn(Ao().name,Le(i.name),"","station-caption")+`<section class="panel challenge"><div class="panel-head"><div class="challenge-top"><span class="eyebrow">Arrived / ${Le(i.name)}</span><span class="status ${i.resolved?"":"plain"}">${i.resolved?"Reward saved":` +${i.reward.amount} ${i.reward.resource==="parts"?"parts":"cores"}`}</span></div><h2 tabindex="-1">${Le(e.prompt)}</h2></div><div class="panel-body">${mf(e.diagram,!0)}
    ${i.resolved?"":ef(e)}
    <form id="answer-form">${e.type==="number"?`<label class="answer-field" for="answer-input">Your answer<input id="answer-input" name="answer" inputmode="numeric" autocomplete="off" type="text" maxlength="12" value="${Le($t)}" ${i.resolved||at?"disabled":""}></label>`:`<div class="answer-options" role="group" aria-label="Answer choices">${e.options.map((s,a)=>`<button class="answer-option ${$t===s.id?"selected":""}" type="button" data-action="option" data-option="${Le(s.id)}" aria-pressed="${$t===s.id}" ${i.resolved||at?"disabled":""}><span class="option-mark">${String.fromCharCode(65+a)}</span><span>${Le(s.label)}</span></button>`).join("")}</div>`}
    ${n?`<div class="feedback ${n.correct?"correct":""}" role="status"><strong>${n.correct?"Contract resolved":n.kind==="worked"?"Worked explanation":n.kind==="hint"?"Field guidance":"Take another look"}</strong>${Le(n.explanation)}${i.resolved?`<p class="subtle"> +${i.reward.amount} ${i.reward.resource==="parts"?"building parts":"research cores"} saved${i.helpUsed?" / completed with support":""}</p>`:""}</div>`:""}
    <div class="actions">${i.resolved?Oe("region","Return to expedition","arrow-right","primary",at):`<button class="button primary" type="submit" ${at||Kt?"disabled":""}>${at?'<span class="spinner"></span>':ot("check")}Check answer</button>${Oe("hint",i.support.stage?"Worked example":"Hint","help-circle","",at||!i.attempts.length||i.support.stage>=2)}`}</div></form>
    ${i.resolved?`<div class="mission-next">${Oe(r?"next-mission":"finish",r?"March to the next mission":"Complete expedition",r?"navigation":"flag","gold full",at)}</div>`:""}
    <div class="actions">${Oe("region","Back to base","arrow-left","quiet",at)}${Oe("read","Read aloud","volume-2","quiet",!1)}</div></div></section>`}function Hy(){let i=ce.nextUpgrade,e=i&&ce.wallet.parts>=i.cost.parts&&ce.wallet.cores>=i.cost.cores;return Xn("Engineering command","Build your headquarters")+`<aside class="panel"><div class="panel-head"><div class="eyebrow">${i?`HQ Level ${ce.hqLevel} to Level ${i.level}`:"Final build complete"}</div><h2>${i?.level===2?"Expedition headquarters":"Beacon command centre"}</h2></div><div class="panel-body"><p>${i?"Raise the command building, expand its roof systems and establish your next permanent base upgrade.":"The command centre is complete. Your saved progress and expeditions are available in the journal."}</p>${Oy()}${i?Oe("confirm-build",e?"Construct headquarters":"Resources required","hard-hat","primary full",!e||at||!!Kt):""}<div style="margin-top:10px">${Oe("hq","Return to HQ","arrow-left","full")}</div></div></aside>`}function Vy(){let i=Eo||ce.history.at(-1);if(!i)return hu();let e=Qr(i),t=lu(ce);return Xn("Mission accomplished","You made a difference")+`<aside class="panel"><div class="panel-head"><span class="rank">${ot("check")}EXPEDITION COMPLETE</span><h2>${Le(At.find(n=>n.id===i.regionId)?.name)}</h2><div class="reward-flash">${ot("award")}<span>${e.resolved} missions solved</span></div></div><div class="panel-body"><div class="summary-resource"><span>${ot("package")}Building parts</span><strong>+${i.earned.parts}</strong></div><div class="summary-resource"><span>${ot("flask-conical")}Research cores</span><strong>+${i.earned.cores}</strong></div><p>${t.title}. Your cargo is ready to put to work.</p>${Oe("campaign","Restore the valley","flag","gold full")}<div class="actions mission-next">${Oe("return-hq","Drive to HQ","house","primary")}${Oe("review","Review answers","book-open","",!1,`data-review="${Le(i.id)}"`)}</div></div></aside>`}function af(i,e){return i.options?.find(t=>t.id===e)?.label??e??"No answer"}function gf(){let i=[...ce.history].reverse();return Xn("Expedition record","Field journal")+`<section class="panel journal"><div class="panel-head"><div class="eyebrow">Your learning and expeditions</div><h2>Field journal</h2></div><div class="panel-body">${ce.activeExpedition?`<div class="history-item"><span class="status pending">In progress</span><h3 style="margin-top:8px">${Le(At.find(e=>e.id===ce.activeExpedition.regionId)?.name)}</h3><div class="actions">${Oe("resume","Resume","play","primary")}${Oe("end-expedition","End expedition","flag")}</div></div>`:""}${i.length?i.map(e=>`<article class="history-item"><span class="status ${e.status==="ended"?"plain":""}">${e.status==="ended"?"Ended early":"Completed"}</span><h3 style="margin-top:8px">${Le(At.find(t=>t.id===e.regionId)?.name)}</h3><p class="subtle">${e.stations.filter(t=>t.resolved).length} of ${e.stations.length} stations / +${e.earned.parts} parts / +${e.earned.cores} cores</p><div class="actions">${Oe("review","Review answers","book-open","",!1,`data-review="${Le(e.id)}"`)}</div></article>`).join(""):'<p class="empty">Your completed expeditions will appear here.</p>'}</div></section>`}function Gy(){let i=ce.history.find(t=>t.id===ss);if(!i)return gf();let e=[...i.stations].sort((t,n)=>+(t.firstAttemptCorrect!==!1)-+(n.firstAttemptCorrect!==!1));return Xn("Expedition evidence","Answer review")+`<section class="panel journal"><div class="panel-head"><div class="eyebrow">Original missed answers first</div><h2>${Le(At.find(t=>t.id===i.regionId)?.name)}</h2></div><div class="panel-body">${e.map(t=>`<article class="review-station"><span class="status ${t.firstAttemptCorrect===!1?"missed":t.resolved?"":"plain"}">${t.firstAttemptCorrect===!1?"First answer missed":t.resolved?"Correct first time":"Not completed"}</span><h3>${Le(t.question.prompt)}</h3>${mf(t.question.diagram)}<p><strong>First answer:</strong> ${Le(af(t.question,t.attempts[0]?.answer))}</p><p><strong>Correct answer:</strong> ${Le(af(t.question,t.question.answer))}</p><p>${Le(t.question.explanation)}</p><p class="subtle">${t.resolution?Le(t.resolution):"Unresolved"} / ${t.attempts.length} response${t.attempts.length===1?"":"s"}${t.helpUsed?" / support used":""}</p></article>`).join("")}<div class="actions">${Oe("journal","Back to journal","arrow-left","full")}</div></div></section>`}function dn(){if(!ce||!_e)return;Ny(),Fy();let i={hq:hu,map:ff,"region-info":By,region:pf,station:zy,construction:Hy,campaign:()=>Yh(ce,at,!!Kt),garage:()=>Zh(ce,at,!!Kt),results:Vy,journal:gf,review:Gy};i.landmark=()=>Xn("Built by your team",Le(un(ce).projects.find(e=>e.id===as)?.name||"Valley restored"))+`<div class="hq-quick-actions">${Oe("map","Explore the valley","map","primary")}${Oe("campaign","Next restoration","flag")}</div>`,et==="travel"?st("interface").innerHTML=`<section class="travel-panel ${Wt?"paused":""}"><div class="eyebrow">Atlas M-07 / ${_e.travel?.kind==="station"?"Field march":"Convoy in transit"}</div><h2>${_e.travel?.label?`En route to ${Le(_e.travel.label)}`:"Route in progress"}</h2><div class="travel-progress"><span></span></div><div class="travel-readout"><span>ROUTE ACTIVE</span><strong>${Math.max(0,Math.ceil((_e.travel?.duration||0)-(_e.travel?.elapsed||0)))}s</strong></div><div class="actions">${Oe("pause-travel",Wt?"Continue journey":"Pause journey",Wt?"play":"pause")}${Oe("cancel-travel",_e.travel?.kind==="station"?"Cancel march":"Stop journey","flag")}</div></section>`:st("interface").innerHTML=(i[et]||hu)(),["map","region-info"].includes(et)?st("location-pins").innerHTML=`<button class="location-pin hq-location" type="button" data-pin="hq" data-action="hq">${ot("house")}<span><strong>Headquarters</strong><small>Home base</small></span></button><span class="strategic-anchor atlas-anchor atlas-world" data-pin="atlas" aria-label="Atlas expedition vehicle">${ot("navigation")}<b>ATLAS</b></span>`+At.map(e=>{let t=Hs(e.id),n=ce.activeExpedition?.regionId===e.id;return`<button class="location-pin subject-pin ${hn===e.id?"selected":""} ${t?"completed":""} ${n?"active":""}" type="button" data-pin="${e.id}" data-action="destination" data-region="${e.id}" aria-pressed="${hn===e.id}" aria-label="${Le(e.name)}, ${t?"completed":n?"in progress":"ready"}">${t?`<span class="completion-beacon">${ot("check")}</span>`:ot(e.icon)}<span><strong>${Le(e.name)}</strong><small>${Le(pu(e))}</small></span></button>`}).join(""):et==="region"&&ce.activeExpedition?st("location-pins").innerHTML=`<span class="strategic-anchor hq-anchor" data-pin="hq" aria-label="Headquarters">${ot("house")}<b>HQ</b></span><span class="strategic-anchor atlas-anchor" data-pin="atlas" aria-label="Atlas expedition vehicle">${ot("navigation")}<b>ATLAS</b></span>`+ce.activeExpedition.stations.map((e,t)=>`<button class="field-location-pin ${e.id===qt?"selected":""} ${e.resolved?"resolved":""}" type="button" data-pin="station-${t}" data-action="select-station" data-station="${Le(e.id)}" aria-label="${Le(e.name)}, ${e.resolved?"resolved":"available"}" aria-pressed="${e.id===qt}"><span class="field-pin-index">${e.resolved?ot("check"):t+1}</span></button>`).join(""):st("location-pins").innerHTML="",Kt&&st("interface").insertAdjacentHTML("beforeend",`<div style="position:absolute;top:0;left:50%;transform:translateX(-50%);pointer-events:auto">${Oe("retry-save","Reconnect pending save","refresh-cw","gold",at)}</div>`),hf(),uf(),st("game").dataset.view=et,st("game").dataset.hqLevel=ce.hqLevel,st("game").setAttribute("aria-busy",String(at))}function Ui(i,e){lf=document.activeElement,Ni.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">${i}</h2>${hi("close-dialog","Close","x")}</div><div class="dialog-body">${e}</div>`,Ni.setAttribute("aria-labelledby","dialog-title"),Ni.showModal(),_e.paused=!0,Ws(),uf()}function Mn(){Ni.close(),_e.paused=Wt,lf?.focus()}function Wy(){Ui("Expedition settings",`<label class="setting">Sound and read-aloud<input id="sound-setting" type="checkbox" ${$n.sound?"checked":""}></label><label class="setting">Reduced motion<input id="motion-setting" type="checkbox" ${$n.reduced?"checked":""}></label><p class="subtle" style="margin-top:15px">${sr?"Local preview. Progress is stored on this device only.":"Progress is saved to the current Bright Quest child profile."}</p><div class="dialog-actions">${Oe("save-settings","Done","check","primary")}</div><a class="button full" style="margin-top:10px" href="/">${ot("arrow-left")}Return to Bright Quest</a>`)}function qy(){let i=Ao();Ui(i.name,`<div class="recon-card"><span class="status ${Hs(i.id)?"complete-glow":"pending"}">${Hs(i.id)?`${ot("check")} District completed`:"Ready to explore"}</span><p><strong>${Le(i.stationNames.length)} subject missions</strong><br>${Le(i.stationNames.join(" / "))}</p><p>${Le(i.description)}</p><div class="summary-resource"><span>${ot(i.resource==="parts"?"package":"flask-conical")}${i.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${mu(i.id)}</strong></div></div><div class="dialog-actions">${Oe("close-dialog","Back to map","arrow-left")}${Oe("march-region-dialog",ce.activeExpedition?.regionId===i.id?"Resume":"March","navigation","primary")}</div>`)}async function uu(){if(ce.activeExpedition){if(ce.activeExpedition.regionId===gt)return fu();Ui("An expedition is already active",`<p>Resume it, or end it in the journal before starting another. Your earned cargo stays safe.</p><div class="dialog-actions">${Oe("resume-dialog","Resume expedition","play","primary")}${Oe("journal-dialog","Open journal","book-open")}</div>`);return}await di({type:"start",regionId:gt})&&(qt="",gu(gt,"region"))}function gu(i,e){Wt=!1,_e.paused=!1,_e.drive(i,()=>{Gt(e,{},!0),rs(!0)}),cf(),et="travel",dn()}function fu(){gt=ce.activeExpedition.regionId,gu(gt,"region")}function du(i){let e=To(i);e<0||(qt=i,En=i,$t="",Wt=!1,_e.paused=!1,_e.driveToStation(gt,e,()=>{Gt("station",{stationId:i},!0),rs(!0),requestAnimationFrame(()=>document.querySelector(".challenge h2")?.focus())}),cf(),et="travel",dn())}function $y(i){let e=ce.activeExpedition?.stations.find(n=>n.id===i);if(!e)return;let t={maths:"Maths",english:"English",physics:"Physics",chemistry:"Chemistry","life-sciences":"Life sciences"}[ce.activeExpedition.subject]||"Mission";Ui(e.name,`<div class="recon-card"><span class="status ${e.resolved?"":"pending"}">${e.resolved?"Resolved":"Ready to explore"}</span><p><strong>${t} objective</strong><br>${Le(e.question.skill)}</p><div class="summary-resource"><span>${ot(e.reward.resource==="parts"?"package":"flask-conical")}${e.reward.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${e.reward.amount}</strong></div></div><div class="dialog-actions">${Oe("close-dialog","Back to map","arrow-left")}${Oe("march-dialog",e.resolved?"Revisit site":"March to site","navigation","primary",!1,`data-station="${Le(e.id)}"`)}</div>`)}async function Xy(){if(at||!ir()||ir().resolved)return;let i=ir().question,e=i.type==="number"?st("answer-input")?.value.trim():$t;if(!e&&e!=="0"){Qt("Choose or enter an answer first.");return}if(i.type==="number"&&!/^\d{1,8}$/.test(e)){Qt("Enter a whole number.");return}$t=String(e),an.set(Vs(),$t),await di({type:"answer",stationId:En,answer:i.type==="number"?Number(e):e})&&(rs(ir()?.resolved),ir()?.resolved&&an.remove(Vs()))}st("game").addEventListener("submit",i=>{i.target.id==="answer-form"&&(i.preventDefault(),Xy())});st("game").addEventListener("input",i=>{let e=i.target;rf(e,st("interface"))||e.id==="answer-input"&&($t=e.value,an.set(Vs(),$t))});st("game").addEventListener("click",async i=>{let e=i.target.closest('[data-action^="field-lab-"]');if(e&&nf(e,st("interface")))return;let t=i.target.closest("[data-action]");if(!t||t.disabled)return;let n=t.dataset.action;if(n==="zoom-in")return _e.zoom(-2);if(n==="zoom-out")return _e.zoom(2);if(n==="reset-camera")return _e.resetCamera(),hf();if(n==="close-dialog")return Mn();if(n==="retry-save")return df();if(n==="read")return Uy();if(n==="option"){$t=t.dataset.option,an.set(Vs(),$t),document.querySelectorAll("[data-option]").forEach(r=>{r.classList.toggle("selected",r.dataset.option===$t),r.setAttribute("aria-pressed",String(r.dataset.option===$t))});return}if(n==="observe"){let r=[...document.querySelectorAll("[data-evidence-row]")];for(let s=0;s<r.length;s++)r.forEach(a=>a.classList.remove("selected")),r[s].classList.add("selected"),await new Promise(a=>setTimeout(a,$n.reduced?1:500));r.forEach(s=>s.classList.remove("selected"));return}if(n==="settings")return Wy();if(n==="reset-game")return Ui("Reset Beacon Brigade?",`<div class="reset-warning"><strong>This erases this child's Beacon Brigade progress.</strong><p>HQ levels, resources, completed districts, answers and journal records will all be permanently cleared. Other Bright Quest modules are not affected.</p></div><div class="dialog-actions">${Oe("close-dialog","Keep progress","arrow-left","primary")}${Oe("reset-now","Reset all progress","rotate-ccw","danger")}</div>`);if(n==="reset-now"){let r=Wt;Mn(),Wt=!0,_e.paused=!0,await di({type:"reset"})?(_e.travel=null,_e.onTravelEnd=null,Wt=!1,_e.paused=!1,_e.dustPuffs.forEach(s=>{s.visible=!1}),hn="",qt="",En="",$t="",ss="",Eo=null,Jh(),_e.selectStation(gt,null),_e.clearRoute(),Gt("hq",{},!0),Qt("Beacon Brigade has been reset for this child.")):(Wt=r,_e.paused=Wt,dn());return}if(n==="save-settings"){$n={sound:st("sound-setting").checked,reduced:st("motion-setting").checked},an.set("bqBeaconSettings",$n),$n.sound||Ws(),Mn(),dn();return}if(n==="pause-travel"){Wt=!Wt,_e.paused=Wt,dn();return}if(n==="cancel-travel"){let r=_e.travel?.kind==="station";_e.travel=null,_e.onTravelEnd=null,_e.clearRoute(),_e.dustPuffs.forEach(s=>{s.visible=!1}),Wt=!1,_e.paused=!1,Gt(r?"region":"hq");return}if(!(at||et==="travel")){if(n==="equip-loadout"){await di({type:"equip",loadoutId:t.dataset.loadout})&&Qt(`${jh(t.dataset.loadout)} equipped.`);return}if(n==="restore-project"){let r=un(ce).projects.find(s=>s.id===t.dataset.project);return r?.canBuild?Ui(`Restore ${Le(r.name)}?`,`<p>Your team will use <strong>${r.cost.parts} parts</strong> and <strong>${r.cost.cores} cores</strong> to permanently restore this landmark.</p><div class="dialog-actions">${Oe("close-dialog","Keep exploring","arrow-left")}${Oe("restore-now","Build landmark","hard-hat","primary",!1,`data-project="${r.id}"`)}</div>`):void 0}if(n==="restore-now"){let r=t.dataset.project;Mn(),await di({type:"project",projectId:r})&&(Gt("landmark",{projectId:r}),Qt("Landmark restored. Your valley is growing!"),rs(!0));return}if(n==="next-mission"){let r=ce.activeExpedition?.stations.find(s=>!s.resolved);if(r)return du(r.id);Gt("region");return}if(n==="hq"||n==="return-hq"){if(["region","station","results"].includes(et))return gu("hq","hq");Gt("hq");return}if(["map","construction","campaign","garage","journal","region"].includes(n)){n==="map"&&(hn=""),(n!=="region"||ce.activeExpedition?.stations.every(r=>r.resolved))&&(qt=""),Gt(n);return}if(n==="destination"){qt="",hn=t.dataset.region,gt=hn,Gt("map");return}if(n==="clear-region"){hn="",dn();return}if(n==="explore-region")return qy();if(n==="march-region")return uu();if(n==="march-region-dialog")return Mn(),uu();if(n==="deploy")return uu();if(n==="resume")return fu();if(n==="resume-dialog")return Mn(),fu();if(n==="journal-dialog"){Mn(),Gt("journal");return}if(n==="select-station"){qt=t.dataset.station,dn();return}if(n==="clear-station"){qt="",dn();return}if(n==="explore-station")return $y(t.dataset.station);if(n==="march-station")return du(t.dataset.station);if(n==="march-dialog"){let r=t.dataset.station;return Mn(),du(r)}if(n==="hint"){await di({type:"hint",stationId:En});return}if(n==="finish"){await di({type:"finish"})&&(Eo=ce.history.at(-1),Gt("results"),rs(!0));return}if(n==="review"){Gt("review",{reviewId:t.dataset.review});return}if(n==="confirm-build")return Ui("Confirm construction",`<p>Build HQ Level ${ce.nextUpgrade.level} using ${ce.nextUpgrade.cost.parts} building parts and ${ce.nextUpgrade.cost.cores} research cores?</p><div class="dialog-actions">${Oe("build-now","Construct HQ","hard-hat","primary")}${Oe("close-dialog","Cancel","x")}</div>`);if(n==="build-now"){Mn(),await di({type:"upgrade"})&&(Gt("hq"),Qt(`HQ Level ${ce.hqLevel} constructed and saved.`),rs(!0));return}if(n==="end-expedition")return Ui("End this expedition?",`<p>Earned resources and answer records stay saved. Unresolved stations will be closed.</p><div class="dialog-actions">${Oe("end-now","End expedition","flag")}${Oe("close-dialog","Keep exploring","arrow-left","primary")}</div>`);n==="end-now"&&(Mn(),await di({type:"end"}),Gt("journal"))}});Ni.addEventListener("cancel",i=>{i.preventDefault(),Mn()});document.addEventListener("visibilitychange",()=>{document.hidden&&Ws()});window.addEventListener("online",()=>{Kt&&df()});window.addEventListener("popstate",i=>{as=i.state?.projectId||"bridge",Ws(),Ni.open&&Mn(),_e?.travel&&(_e.travel=null,_e.onTravelEnd=null),Wt=!1,et=i.state?.view||"hq",gt=i.state?.regionId||gt,hn=i.state?.selectedRegionId||"",En=i.state?.stationId||"",qt=i.state?.targetStationId||"",ss=i.state?.reviewId||"",$t="",et==="travel"&&(et="hq"),dn()});async function Yy(){try{if(sr)rr={id:"local-preview",name:"Preview commander"},ns=an.get(of)||su({profileId:rr.id}),ce=au(ns);else{let e=await Gs();ce=e.state,rr=e.profile,Kt=an.get(is())}_e=new _o(st("scene")),_e.createBase(ce.hqLevel),_e.reduced=$n.reduced,_e.onDestinationPick=e=>{if(!(et!=="map"||Ni.open||at||Kt)){if(e==="hq"){hn="",Gt("hq");return}At.some(t=>t.id===e)&&(qt="",hn=e,gt=e,Gt("map"))}},_e.onFrame=e=>{let t=document.querySelector("#topbar")?.getBoundingClientRect().bottom||0,n=document.querySelector(".field-command")?.getBoundingClientRect(),r=document.querySelector("#navigation")?.getBoundingClientRect().top||innerHeight,s=innerWidth<=650&&n?.top||r;for(let o of e){let l=document.querySelector(`[data-pin="${o.id}"]`);if(l){let c=Math.max(l.offsetWidth,l.offsetHeight)/2+4,u=t+c,d=s-c,h=innerWidth>650&&n?n.left-12:innerWidth;l.style.left=`${o.x}px`,l.style.top=`${o.y}px`,l.hidden=!o.visible||o.x<c||o.x>h-c||o.y<u||o.y>d||d<=u}}let a=document.querySelector(".travel-progress span");a&&_e.travel&&(a.style.width=`${Math.min(100,_e.travel.elapsed/_e.travel.duration*100)}%`)},st("scene").addEventListener("world-error",e=>Qt(e.detail)),st("boot").remove();let i=history.state;as=i?.projectId||"bridge",i?.view&&!["travel","results"].includes(i.view)&&(et=i.view,gt=i.regionId||gt,hn=i.selectedRegionId||"",En=i.stationId||"",qt=i.targetStationId||"",ss=i.reviewId||""),Gt(et,{},!0),await _e.ready,_e.textureErrors.length&&Qt("Some terrain textures did not load. Refresh when your connection is ready."),Kt&&Qt("A pending save is ready to reconnect."),["localhost","127.0.0.1","[::1]"].includes(location.hostname)&&(window.__BEACON_QA__={get view(){return et},get frame(){return _e.frame},get state(){return ce},get world(){return _e},get preview(){return sr}})}catch(i){let e=[401,403,409].includes(i.status);st("boot").innerHTML=`<span class="boot-mark">B</span><h1>Beacon Brigade</h1><p>${e?"Open Bright Quest and select your child profile to begin.":Le(i.message||"The expedition could not load. Your saved progress has not changed.")}</p><a class="button primary" href="/">${e?"Open Bright Quest":"Return to Bright Quest"}</a><button class="button" id="reload">Try again</button>`,st("reload").addEventListener("click",()=>location.reload())}}Yy();
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
/*! Bundled license information:

lucide/dist/esm/defaultAttributes.js:
lucide/dist/esm/createElement.js:
lucide/dist/esm/shared/src/utils/hasA11yProp.js:
lucide/dist/esm/shared/src/utils/mergeClasses.js:
lucide/dist/esm/shared/src/utils/toCamelCase.js:
lucide/dist/esm/shared/src/utils/toPascalCase.js:
lucide/dist/esm/replaceElement.js:
lucide/dist/esm/icons/arrow-left.js:
lucide/dist/esm/icons/arrow-right.js:
lucide/dist/esm/icons/award.js:
lucide/dist/esm/icons/book-open.js:
lucide/dist/esm/icons/calculator.js:
lucide/dist/esm/icons/check.js:
lucide/dist/esm/icons/chevron-right.js:
lucide/dist/esm/icons/circle-question-mark.js:
lucide/dist/esm/icons/compass.js:
lucide/dist/esm/icons/eye.js:
lucide/dist/esm/icons/flag.js:
lucide/dist/esm/icons/flask-conical.js:
lucide/dist/esm/icons/hard-hat.js:
lucide/dist/esm/icons/house.js:
lucide/dist/esm/icons/map-pin.js:
lucide/dist/esm/icons/map.js:
lucide/dist/esm/icons/minus.js:
lucide/dist/esm/icons/navigation.js:
lucide/dist/esm/icons/orbit.js:
lucide/dist/esm/icons/package.js:
lucide/dist/esm/icons/pause.js:
lucide/dist/esm/icons/play.js:
lucide/dist/esm/icons/plus.js:
lucide/dist/esm/icons/radar.js:
lucide/dist/esm/icons/radio.js:
lucide/dist/esm/icons/refresh-cw.js:
lucide/dist/esm/icons/rotate-ccw.js:
lucide/dist/esm/icons/route.js:
lucide/dist/esm/icons/settings.js:
lucide/dist/esm/icons/shield.js:
lucide/dist/esm/icons/sprout.js:
lucide/dist/esm/icons/star.js:
lucide/dist/esm/icons/telescope.js:
lucide/dist/esm/icons/truck.js:
lucide/dist/esm/icons/volume-2.js:
lucide/dist/esm/icons/volume-x.js:
lucide/dist/esm/icons/wrench.js:
lucide/dist/esm/icons/x.js:
lucide/dist/esm/lucide.js:
  (**
   * @license lucide v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
