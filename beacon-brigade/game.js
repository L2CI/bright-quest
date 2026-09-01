var Ms={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Oc=([i,e,t])=>{let n=document.createElementNS("http://www.w3.org/2000/svg",i);return Object.keys(e).forEach(r=>{n.setAttribute(r,String(e[r]))}),t?.length&&t.forEach(r=>{let s=Oc(r);n.appendChild(s)}),n},Bc=(i,e={})=>{let n={...Ms,...e};return Oc(["svg",n,i])};var kc=i=>{for(let e in i)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};var zc=(...i)=>i.filter((e,t,n)=>!!e&&e.trim()!==""&&n.indexOf(e)===t).join(" ").trim();var Hc=i=>i.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase());var Vc=i=>{let e=Hc(i);return e.charAt(0).toUpperCase()+e.slice(1)};var vh=i=>Array.from(i.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),Gc=i=>typeof i=="string"?i:!i||!i.class?"":i.class&&typeof i.class=="string"?i.class.split(" "):i.class&&Array.isArray(i.class)?i.class:"",eo=(i,{nameAttr:e,icons:t,attrs:n})=>{let r=i.getAttribute(e);if(r==null)return;let s=Vc(r),a=t[s];if(!a)return console.warn(`${i.outerHTML} icon name was not found in the provided icons object.`);let o=vh(i),l=kc(o)?{}:{"aria-hidden":"true"},c={...Ms,"data-lucide":r,...l,...n,...o},u=Gc(o),d=Gc(n),h=zc("lucide",`lucide-${r}`,...u,...d);h&&Object.assign(c,{class:h});let f=Bc(a,c);return i.parentNode?.replaceChild(f,i)};var to=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var no=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var io=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];var ro=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18"}],["path",{d:"M16 10h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M8 10h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M8 18h.01"}]];var so=[["path",{d:"M20 6 9 17l-5-5"}]];var ao=[["path",{d:"m9 18 6-6-6-6"}]];var kr=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];var oo=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];var lo=[["path",{d:"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"}]];var co=[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"}],["path",{d:"M6.453 15h11.094"}],["path",{d:"M8.5 2h7"}]];var uo=[["path",{d:"M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"}],["path",{d:"M14 6a6 6 0 0 1 6 6v3"}],["path",{d:"M4 15v-3a6 6 0 0 1 6-6"}],["rect",{x:"2",y:"15",width:"20",height:"4",rx:"1"}]];var ws=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];var ho=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{cx:"12",cy:"10",r:"3"}]];var fo=[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"}],["path",{d:"M15 5.764v15"}],["path",{d:"M9 3.236v15"}]];var po=[["path",{d:"M5 12h14"}]];var mo=[["polygon",{points:"3 11 22 2 13 21 11 13 3 11"}]];var go=[["path",{d:"M20.341 6.484A10 10 0 0 1 10.266 21.85"}],["path",{d:"M3.659 17.516A10 10 0 0 1 13.74 2.152"}],["circle",{cx:"12",cy:"12",r:"3"}],["circle",{cx:"19",cy:"5",r:"2"}],["circle",{cx:"5",cy:"19",r:"2"}]];var xo=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{d:"M12 22V12"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["path",{d:"m7.5 4.27 9 5.15"}]];var vo=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];var yo=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];var _o=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];var bo=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478"}],["circle",{cx:"12",cy:"12",r:"2"}]];var So=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var Mo=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];var wo=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var Eo=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];var To=[["path",{d:"M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"}],["path",{d:"M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"}],["path",{d:"M5 21h14"}]];var Ao=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];var Co=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15"}]];var Ro=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]];var Po=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var Io=({icons:i={},nameAttr:e="data-lucide",attrs:t={},root:n=document,inTemplates:r}={})=>{if(!Object.values(i).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof n>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(n.querySelectorAll(`[${e}]`)).forEach(a=>eo(a,{nameAttr:e,icons:i,attrs:t})),r&&Array.from(n.querySelectorAll("template")).forEach(o=>Io({icons:i,nameAttr:e,attrs:t,root:o.content,inTemplates:r})),e==="data-lucide"){let a=n.querySelectorAll("[icon-name]");a.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(a).forEach(o=>eo(o,{nameAttr:"icon-name",icons:i,attrs:t})))}};var yh=0,Wc=1,_h=2;var Sd=1,lc=2,Wn=3,ui=0,jt=1,yn=2,oi=0,vr=1,ts=2,qc=3,Xc=4,bh=5,Pi=100,Sh=101,Mh=102,wh=103,Eh=104,Th=200,Ah=201,Ch=202,Rh=203,pl=204,ml=205,Ph=206,Ih=207,Lh=208,Dh=209,Uh=210,Nh=211,Fh=212,Oh=213,Bh=214,kh=0,zh=1,Hh=2,ta=3,Vh=4,Gh=5,Wh=6,qh=7,Md=0,Xh=1,$h=2,li=0,Yh=1,Zh=2,Jh=3,cc=4,Kh=5,jh=6,Qh=7;var wd=300,Sr=301,Mr=302,gl=303,xl=304,Fa=306,Ni=1e3,Li=1001,vl=1002,Kt=1003,ef=1004;var Es=1005;var _n=1006,Lo=1007;var Di=1008;var di=1009,tf=1010,nf=1011,na=1012,Ed=1013,wr=1014,Xn=1015,Oa=1016,Td=1017,Ad=1018,Er=1020,rf=35902,sf=1021,af=1022,In=1023,of=1024,lf=1025,yr=1026,Tr=1027,Cd=1028,Rd=1029,cf=1030,Pd=1031,Id=1033,Do=33776,Uo=33777,No=33778,Fo=33779,$c=35840,Yc=35841,Zc=35842,Jc=35843,Kc=36196,jc=37492,Qc=37496,eu=37808,tu=37809,nu=37810,iu=37811,ru=37812,su=37813,au=37814,ou=37815,lu=37816,cu=37817,uu=37818,du=37819,hu=37820,fu=37821,Oo=36492,pu=36494,mu=36495,uf=36283,gu=36284,xu=36285,vu=36286;var ia=2300,yl=2301,Bo=2302,yu=2400,_u=2401,bu=2402;var df=3200,hf=3201,Ld=0,ff=1,ai="",Nt="srgb",gi="srgb-linear",uc="display-p3",Ba="display-p3-linear",ra="linear",gt="srgb",sa="rec709",aa="p3";var Yi=7680;var Su=519,pf=512,mf=513,gf=514,Dd=515,xf=516,vf=517,yf=518,_f=519,_l=35044;var Mu="300 es",$n=2e3,oa=2001,hi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],wu=1234567,Jr=Math.PI/180,ns=180/Math.PI;function Ln(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function Ft(i,e,t){return Math.max(e,Math.min(t,i))}function dc(i,e){return(i%e+e)%e}function bf(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Sf(i,e,t){return i!==e?(t-i)/(e-i):0}function Kr(i,e,t){return(1-t)*i+t*e}function Mf(i,e,t,n){return Kr(i,e,1-Math.exp(-t*n))}function wf(i,e=1){return e-Math.abs(dc(i,e*2)-e)}function Ef(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Tf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Af(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Cf(i,e){return i+Math.random()*(e-i)}function Rf(i){return i*(.5-Math.random())}function Pf(i){i!==void 0&&(wu=i);let e=wu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function If(i){return i*Jr}function Lf(i){return i*ns}function Df(i){return(i&i-1)===0&&i!==0}function Uf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Nf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ff(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),d=s((e-n)/2),h=a((e-n)/2),f=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*d,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function bn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function st(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var hc={DEG2RAD:Jr,RAD2DEG:ns,generateUUID:Ln,clamp:Ft,euclideanModulo:dc,mapLinear:bf,inverseLerp:Sf,lerp:Kr,damp:Mf,pingpong:wf,smoothstep:Ef,smootherstep:Tf,randInt:Af,randFloat:Cf,randFloatSpread:Rf,seededRandom:Pf,degToRad:If,radToDeg:Lf,isPowerOfTwo:Df,ceilPowerOfTwo:Uf,floorPowerOfTwo:Nf,setQuaternionFromProperEuler:Ff,normalize:st,denormalize:bn},ne=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Xe=class i{constructor(e,t,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],g=n[8],x=r[0],p=r[3],m=r[6],M=r[1],v=r[4],b=r[7],L=r[2],E=r[5],A=r[8];return s[0]=a*x+o*M+l*L,s[3]=a*p+o*v+l*E,s[6]=a*m+o*b+l*A,s[1]=c*x+u*M+d*L,s[4]=c*p+u*v+d*E,s[7]=c*m+u*b+d*A,s[2]=h*x+f*M+g*L,s[5]=h*p+f*v+g*E,s[8]=h*m+f*b+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*s,f=c*s-a*l,g=t*d+n*h+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=d*x,e[1]=(r*c-u*n)*x,e[2]=(o*n-r*a)*x,e[3]=h*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ko.makeScale(e,t)),this}rotate(e){return this.premultiply(ko.makeRotation(-e)),this}translate(e,t){return this.premultiply(ko.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ko=new Xe;function Ud(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function is(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Of(){let i=is("canvas");return i.style.display="block",i}var Eu={};function fc(i){i in Eu||(Eu[i]=!0,console.warn(i))}function Bf(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var Tu=new Xe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Au=new Xe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ts={[gi]:{transfer:ra,primaries:sa,toReference:i=>i,fromReference:i=>i},[Nt]:{transfer:gt,primaries:sa,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ba]:{transfer:ra,primaries:aa,toReference:i=>i.applyMatrix3(Au),fromReference:i=>i.applyMatrix3(Tu)},[uc]:{transfer:gt,primaries:aa,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Au),fromReference:i=>i.applyMatrix3(Tu).convertLinearToSRGB()}},kf=new Set([gi,Ba]),at={enabled:!0,_workingColorSpace:gi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!kf.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=Ts[e].toReference,r=Ts[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Ts[i].primaries},getTransfer:function(i){return i===ai?ra:Ts[i].transfer}};function _r(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Zi,bl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Zi===void 0&&(Zi=is("canvas")),Zi.width=e.width,Zi.height=e.height;let n=Zi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Zi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=is("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=_r(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(_r(t[n]/255)*255):t[n]=_r(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},zf=0,la=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Ln(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ho(r[a].image)):s.push(Ho(r[a]))}else s=Ho(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Ho(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?bl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Hf=0,Yt=class i extends hi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Li,r=Li,s=_n,a=Di,o=In,l=di,c=i.DEFAULT_ANISOTROPY,u=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=Ln(),this.name="",this.source=new la(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ni:e.x=e.x-Math.floor(e.x);break;case Li:e.x=e.x<0?0:1;break;case vl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ni:e.y=e.y-Math.floor(e.y);break;case Li:e.y=e.y<0?0:1;break;case vl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=wd;Yt.DEFAULT_ANISOTROPY=1;var Ut=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],g=l[9],x=l[2],p=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(c+1)/2,b=(f+1)/2,L=(m+1)/2,E=(u+h)/4,A=(d+x)/4,D=(g+p)/4;return v>b&&v>L?v<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(v),r=E/n,s=A/n):b>L?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=E/r,s=D/r):L<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(L),n=A/s,r=D/s),this.set(n,r,s,t),this}let M=Math.sqrt((p-g)*(p-g)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(d-x)/M,this.z=(h-u)/M,this.w=Math.acos((c+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Sl=class extends hi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ut(0,0,e,t),this.scissorTest=!1,this.viewport=new Ut(0,0,e,t);let r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new Yt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new la(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yn=class extends Sl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ca=class extends Yt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ml=class extends Yt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var fi=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],d=n[r+3],h=s[a+0],f=s[a+1],g=s[a+2],x=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(d!==x||l!==h||c!==f||u!==g){let p=1-o,m=l*h+c*f+u*g+d*x,M=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){let L=Math.sqrt(v),E=Math.atan2(L,m*M);p=Math.sin(p*E)/L,o=Math.sin(o*E)/L}let b=o*M;if(l=l*p+h*b,c=c*p+f*b,u=u*p+g*b,d=d*p+x*b,p===1-o){let L=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=L,c*=L,u*=L,d*=L}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],d=s[a],h=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+u*d+l*f-c*h,e[t+1]=l*g+u*h+c*d-o*f,e[t+2]=c*g+u*f+o*h-l*d,e[t+3]=u*g-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),d=o(s/2),h=l(n/2),f=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"YZX":this._x=h*u*d+c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d-h*f*g;break;case"XZY":this._x=h*u*d-c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=a*d+this._w*h,this._x=n*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-s*d,this.z=r+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Vo.copy(this).projectOnVector(e),this.sub(Vo)}reflect(e){return this.sub(Vo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Vo=new I,Cu=new fi,Zn=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,gn):gn.fromBufferAttribute(s,a),gn.applyMatrix4(e.matrixWorld),this.expandByPoint(gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),As.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),As.copy(n.boundingBox)),As.applyMatrix4(e.matrixWorld),this.union(As)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,gn),gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zr),Cs.subVectors(this.max,zr),Ji.subVectors(e.a,zr),Ki.subVectors(e.b,zr),ji.subVectors(e.c,zr),ei.subVectors(Ki,Ji),ti.subVectors(ji,Ki),Mi.subVectors(Ji,ji);let t=[0,-ei.z,ei.y,0,-ti.z,ti.y,0,-Mi.z,Mi.y,ei.z,0,-ei.x,ti.z,0,-ti.x,Mi.z,0,-Mi.x,-ei.y,ei.x,0,-ti.y,ti.x,0,-Mi.y,Mi.x,0];return!Go(t,Ji,Ki,ji,Cs)||(t=[1,0,0,0,1,0,0,0,1],!Go(t,Ji,Ki,ji,Cs))?!1:(Rs.crossVectors(ei,ti),t=[Rs.x,Rs.y,Rs.z],Go(t,Ji,Ki,ji,Cs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},kn=[new I,new I,new I,new I,new I,new I,new I,new I],gn=new I,As=new Zn,Ji=new I,Ki=new I,ji=new I,ei=new I,ti=new I,Mi=new I,zr=new I,Cs=new I,Rs=new I,wi=new I;function Go(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){wi.fromArray(i,s);let o=r.x*Math.abs(wi.x)+r.y*Math.abs(wi.y)+r.z*Math.abs(wi.z),l=e.dot(wi),c=t.dot(wi),u=n.dot(wi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Vf=new Zn,Hr=new I,Wo=new I,Fi=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Vf.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hr.subVectors(e,this.center);let t=Hr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Hr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hr.copy(e.center).add(Wo)),this.expandByPoint(Hr.copy(e.center).sub(Wo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},zn=new I,qo=new I,Ps=new I,ni=new I,Xo=new I,Is=new I,$o=new I,wl=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zn.copy(this.origin).addScaledVector(this.direction,t),zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){qo.copy(e).add(t).multiplyScalar(.5),Ps.copy(t).sub(e).normalize(),ni.copy(this.origin).sub(qo);let s=e.distanceTo(t)*.5,a=-this.direction.dot(Ps),o=ni.dot(this.direction),l=-ni.dot(Ps),c=ni.lengthSq(),u=Math.abs(1-a*a),d,h,f,g;if(u>0)if(d=a*l-o,h=a*o-l,g=s*u,d>=0)if(h>=-g)if(h<=g){let x=1/u;d*=x,h*=x,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(qo).addScaledVector(Ps,h),f}intersectSphere(e,t){zn.subVectors(e.center,this.origin);let n=zn.dot(this.direction),r=zn.dot(zn)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,zn)!==null}intersectTriangle(e,t,n,r,s){Xo.subVectors(t,e),Is.subVectors(n,e),$o.crossVectors(Xo,Is);let a=this.direction.dot($o),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ni.subVectors(this.origin,e);let l=o*this.direction.dot(Is.crossVectors(ni,Is));if(l<0)return null;let c=o*this.direction.dot(Xo.cross(ni));if(c<0||l+c>a)return null;let u=-o*ni.dot($o);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},xt=class i{constructor(e,t,n,r,s,a,o,l,c,u,d,h,f,g,x,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,d,h,f,g,x,p)}set(e,t,n,r,s,a,o,l,c,u,d,h,f,g,x,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=g,m[11]=x,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/Qi.setFromMatrixColumn(e,0).length(),s=1/Qi.setFromMatrixColumn(e,1).length(),a=1/Qi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let h=a*u,f=a*d,g=o*u,x=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=h-x*c,t[9]=-o*l,t[2]=x-h*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,f=l*d,g=c*u,x=c*d;t[0]=h+x*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=x+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,f=l*d,g=c*u,x=c*d;t[0]=h-x*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,f=a*d,g=o*u,x=o*d;t[0]=l*u,t[4]=g*c-f,t[8]=h*c+x,t[1]=l*d,t[5]=x*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=x-h*d,t[8]=g*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+g,t[10]=h-x*d}else if(e.order==="XZY"){let h=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+x,t[5]=a*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Gf,e,Wf)}lookAt(e,t,n){let r=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ii.crossVectors(n,rn),ii.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ii.crossVectors(n,rn)),ii.normalize(),Ls.crossVectors(rn,ii),r[0]=ii.x,r[4]=Ls.x,r[8]=rn.x,r[1]=ii.y,r[5]=Ls.y,r[9]=rn.y,r[2]=ii.z,r[6]=Ls.z,r[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],g=n[2],x=n[6],p=n[10],m=n[14],M=n[3],v=n[7],b=n[11],L=n[15],E=r[0],A=r[4],D=r[8],w=r[12],y=r[1],C=r[5],z=r[9],O=r[13],H=r[2],X=r[6],V=r[10],te=r[14],G=r[3],me=r[7],be=r[11],ye=r[15];return s[0]=a*E+o*y+l*H+c*G,s[4]=a*A+o*C+l*X+c*me,s[8]=a*D+o*z+l*V+c*be,s[12]=a*w+o*O+l*te+c*ye,s[1]=u*E+d*y+h*H+f*G,s[5]=u*A+d*C+h*X+f*me,s[9]=u*D+d*z+h*V+f*be,s[13]=u*w+d*O+h*te+f*ye,s[2]=g*E+x*y+p*H+m*G,s[6]=g*A+x*C+p*X+m*me,s[10]=g*D+x*z+p*V+m*be,s[14]=g*w+x*O+p*te+m*ye,s[3]=M*E+v*y+b*H+L*G,s[7]=M*A+v*C+b*X+L*me,s[11]=M*D+v*z+b*V+L*be,s[15]=M*w+v*O+b*te+L*ye,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],x=e[7],p=e[11],m=e[15];return g*(+s*l*d-r*c*d-s*o*h+n*c*h+r*o*f-n*l*f)+x*(+t*l*f-t*c*h+s*a*h-r*a*f+r*c*u-s*l*u)+p*(+t*c*d-t*o*f-s*a*d+n*a*f+s*o*u-n*c*u)+m*(-r*o*u-t*l*d+t*o*h+r*a*d-n*a*h+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],x=e[13],p=e[14],m=e[15],M=d*p*c-x*h*c+x*l*f-o*p*f-d*l*m+o*h*m,v=g*h*c-u*p*c-g*l*f+a*p*f+u*l*m-a*h*m,b=u*x*c-g*d*c+g*o*f-a*x*f-u*o*m+a*d*m,L=g*d*l-u*x*l-g*o*h+a*x*h+u*o*p-a*d*p,E=t*M+n*v+r*b+s*L;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/E;return e[0]=M*A,e[1]=(x*h*s-d*p*s-x*r*f+n*p*f+d*r*m-n*h*m)*A,e[2]=(o*p*s-x*l*s+x*r*c-n*p*c-o*r*m+n*l*m)*A,e[3]=(d*l*s-o*h*s-d*r*c+n*h*c+o*r*f-n*l*f)*A,e[4]=v*A,e[5]=(u*p*s-g*h*s+g*r*f-t*p*f-u*r*m+t*h*m)*A,e[6]=(g*l*s-a*p*s-g*r*c+t*p*c+a*r*m-t*l*m)*A,e[7]=(a*h*s-u*l*s+u*r*c-t*h*c-a*r*f+t*l*f)*A,e[8]=b*A,e[9]=(g*d*s-u*x*s-g*n*f+t*x*f+u*n*m-t*d*m)*A,e[10]=(a*x*s-g*o*s+g*n*c-t*x*c-a*n*m+t*o*m)*A,e[11]=(u*o*s-a*d*s-u*n*c+t*d*c+a*n*f-t*o*f)*A,e[12]=L*A,e[13]=(u*x*r-g*d*r+g*n*h-t*x*h-u*n*p+t*d*p)*A,e[14]=(g*o*r-a*x*r-g*n*l+t*x*l+a*n*p-t*o*p)*A,e[15]=(a*d*r-u*o*r+u*n*l-t*d*l-a*n*h+t*o*h)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,h=s*c,f=s*u,g=s*d,x=a*u,p=a*d,m=o*d,M=l*c,v=l*u,b=l*d,L=n.x,E=n.y,A=n.z;return r[0]=(1-(x+m))*L,r[1]=(f+b)*L,r[2]=(g-v)*L,r[3]=0,r[4]=(f-b)*E,r[5]=(1-(h+m))*E,r[6]=(p+M)*E,r[7]=0,r[8]=(g+v)*A,r[9]=(p-M)*A,r[10]=(1-(h+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=Qi.set(r[0],r[1],r[2]).length(),a=Qi.set(r[4],r[5],r[6]).length(),o=Qi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],xn.copy(this);let c=1/s,u=1/a,d=1/o;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=u,xn.elements[5]*=u,xn.elements[6]*=u,xn.elements[8]*=d,xn.elements[9]*=d,xn.elements[10]*=d,t.setFromRotationMatrix(xn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=$n){let l=this.elements,c=2*s/(t-e),u=2*s/(n-r),d=(t+e)/(t-e),h=(n+r)/(n-r),f,g;if(o===$n)f=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===oa)f=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=$n){let l=this.elements,c=1/(t-e),u=1/(n-r),d=1/(a-s),h=(t+e)*c,f=(n+r)*u,g,x;if(o===$n)g=(a+s)*d,x=-2*d;else if(o===oa)g=s*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Qi=new I,xn=new xt,Gf=new I(0,0,0),Wf=new I(1,1,1),ii=new I,Ls=new I,rn=new I,Ru=new xt,Pu=new fi,Dn=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ft(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ru.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ru,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pu.setFromEuler(this),this.setFromQuaternion(Pu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Dn.DEFAULT_ORDER="XYZ";var ua=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},qf=0,Iu=new I,er=new fi,Hn=new xt,Ds=new I,Vr=new I,Xf=new I,$f=new fi,Lu=new I(1,0,0),Du=new I(0,1,0),Uu=new I(0,0,1),Nu={type:"added"},Yf={type:"removed"},tr={type:"childadded",child:null},Yo={type:"childremoved",child:null},At=class i extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qf++}),this.uuid=Ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new I,t=new Dn,n=new fi,r=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new xt},normalMatrix:{value:new Xe}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ua,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return er.setFromAxisAngle(e,t),this.quaternion.multiply(er),this}rotateOnWorldAxis(e,t){return er.setFromAxisAngle(e,t),this.quaternion.premultiply(er),this}rotateX(e){return this.rotateOnAxis(Lu,e)}rotateY(e){return this.rotateOnAxis(Du,e)}rotateZ(e){return this.rotateOnAxis(Uu,e)}translateOnAxis(e,t){return Iu.copy(e).applyQuaternion(this.quaternion),this.position.add(Iu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Lu,e)}translateY(e){return this.translateOnAxis(Du,e)}translateZ(e){return this.translateOnAxis(Uu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ds.copy(e):Ds.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(Vr,Ds,this.up):Hn.lookAt(Ds,Vr,this.up),this.quaternion.setFromRotationMatrix(Hn),r&&(Hn.extractRotation(r.matrixWorld),er.setFromRotationMatrix(Hn),this.quaternion.premultiply(er.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Nu),tr.child=e,this.dispatchEvent(tr),tr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Yf),Yo.child=e,this.dispatchEvent(Yo),Yo.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Nu),tr.child=e,this.dispatchEvent(tr),tr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,e,Xf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,$f,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++){let o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};At.DEFAULT_UP=new I(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var vn=new I,Vn=new I,Zo=new I,Gn=new I,nr=new I,ir=new I,Fu=new I,Jo=new I,Ko=new I,jo=new I,Ui=class i{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),vn.subVectors(e,t),r.cross(vn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){vn.subVectors(r,t),Vn.subVectors(n,t),Zo.subVectors(e,t);let a=vn.dot(vn),o=vn.dot(Vn),l=vn.dot(Zo),c=Vn.dot(Vn),u=Vn.dot(Zo),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let h=1/d,f=(c*l-o*u)*h,g=(a*u-o*l)*h;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Gn.x),l.addScaledVector(a,Gn.y),l.addScaledVector(o,Gn.z),l)}static isFrontFacing(e,t,n,r){return vn.subVectors(n,t),Vn.subVectors(e,t),vn.cross(Vn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),vn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;nr.subVectors(r,n),ir.subVectors(s,n),Jo.subVectors(e,n);let l=nr.dot(Jo),c=ir.dot(Jo);if(l<=0&&c<=0)return t.copy(n);Ko.subVectors(e,r);let u=nr.dot(Ko),d=ir.dot(Ko);if(u>=0&&d<=u)return t.copy(r);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(nr,a);jo.subVectors(e,s);let f=nr.dot(jo),g=ir.dot(jo);if(g>=0&&f<=g)return t.copy(s);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(ir,o);let p=u*g-f*d;if(p<=0&&d-u>=0&&f-g>=0)return Fu.subVectors(s,r),o=(d-u)/(d-u+(f-g)),t.copy(r).addScaledVector(Fu,o);let m=1/(p+x+h);return a=x*m,o=h*m,t.copy(n).addScaledVector(nr,a).addScaledVector(ir,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Nd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},Us={h:0,s:0,l:0};function Qo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var $e=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=at.workingColorSpace){if(e=dc(e,1),t=Ft(t,0,1),n=Ft(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Qo(a,s,e+1/3),this.g=Qo(a,s,e),this.b=Qo(a,s,e-1/3)}return at.toWorkingColorSpace(this,r),this}setStyle(e,t=Nt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){let n=Nd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_r(e.r),this.g=_r(e.g),this.b=_r(e.b),this}copyLinearToSRGB(e){return this.r=zo(e.r),this.g=zo(e.g),this.b=zo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return at.fromWorkingColorSpace(kt.copy(this),e),Math.round(Ft(kt.r*255,0,255))*65536+Math.round(Ft(kt.g*255,0,255))*256+Math.round(Ft(kt.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.fromWorkingColorSpace(kt.copy(this),t);let n=kt.r,r=kt.g,s=kt.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=at.workingColorSpace){return at.fromWorkingColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=Nt){at.fromWorkingColorSpace(kt.copy(this),e);let t=kt.r,n=kt.g,r=kt.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ri),this.setHSL(ri.h+e,ri.s+t,ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ri),e.getHSL(Us);let n=Kr(ri.h,Us.h,t),r=Kr(ri.s,Us.s,t),s=Kr(ri.l,Us.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},kt=new $e;$e.NAMES=Nd;var Zf=0,pi=class extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=Ln(),this.name="",this.type="Material",this.blending=vr,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pl,this.blendDst=ml,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=ta,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Su,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yi,this.stencilZFail=Yi,this.stencilZPass=Yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==vr&&(n.blending=this.blending),this.side!==ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==pl&&(n.blendSrc=this.blendSrc),this.blendDst!==ml&&(n.blendDst=this.blendDst),this.blendEquation!==Pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ta&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Su&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Yi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Yi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Un=class extends pi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=Md,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Tt=new I,Ns=new ne,Qt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=_l,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return fc("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ns.fromBufferAttribute(this,t),Ns.applyMatrix3(e),this.setXY(t,Ns.x,Ns.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),r=st(r,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==_l&&(e.usage=this.usage),e}};var da=class extends Qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ha=class extends Qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ot=class extends Qt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Jf=0,un=new xt,el=new At,rr=new I,sn=new Zn,Gr=new Zn,Dt=new I,Zt=class i extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Ln(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ud(e)?ha:da)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Xe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return un.makeRotationFromQuaternion(e),this.applyMatrix4(un),this}rotateX(e){return un.makeRotationX(e),this.applyMatrix4(un),this}rotateY(e){return un.makeRotationY(e),this.applyMatrix4(un),this}rotateZ(e){return un.makeRotationZ(e),this.applyMatrix4(un),this}translate(e,t,n){return un.makeTranslation(e,t,n),this.applyMatrix4(un),this}scale(e,t,n){return un.makeScale(e,t,n),this.applyMatrix4(un),this}lookAt(e){return el.lookAt(e),el.updateMatrix(),this.applyMatrix4(el.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rr).negate(),this.translate(rr.x,rr.y,rr.z),this}setFromPoints(e){let t=[];for(let n=0,r=e.length;n<r;n++){let s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ot(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Gr.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(sn.min,Gr.min),sn.expandByPoint(Dt),Dt.addVectors(sn.max,Gr.max),sn.expandByPoint(Dt)):(sn.expandByPoint(Gr.min),sn.expandByPoint(Gr.max))}sn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Dt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Dt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Dt.fromBufferAttribute(o,c),l&&(rr.fromBufferAttribute(e,c),Dt.add(rr)),r=Math.max(r,n.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<n.count;D++)o[D]=new I,l[D]=new I;let c=new I,u=new I,d=new I,h=new ne,f=new ne,g=new ne,x=new I,p=new I;function m(D,w,y){c.fromBufferAttribute(n,D),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,y),h.fromBufferAttribute(s,D),f.fromBufferAttribute(s,w),g.fromBufferAttribute(s,y),u.sub(c),d.sub(c),f.sub(h),g.sub(h);let C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(C),p.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(C),o[D].add(x),o[w].add(x),o[y].add(x),l[D].add(p),l[w].add(p),l[y].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let D=0,w=M.length;D<w;++D){let y=M[D],C=y.start,z=y.count;for(let O=C,H=C+z;O<H;O+=3)m(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let v=new I,b=new I,L=new I,E=new I;function A(D){L.fromBufferAttribute(r,D),E.copy(L);let w=o[D];v.copy(w),v.sub(L.multiplyScalar(L.dot(w))).normalize(),b.crossVectors(E,w);let C=b.dot(l[D])<0?-1:1;a.setXYZW(D,v.x,v.y,v.z,C)}for(let D=0,w=M.length;D<w;++D){let y=M[D],C=y.start,z=y.count;for(let O=C,H=C+z;O<H;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let r=new I,s=new I,a=new I,o=new I,l=new I,c=new I,u=new I,d=new I;if(e)for(let h=0,f=e.count;h<f;h+=3){let g=e.getX(h+0),x=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,p),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),f=0,g=0;for(let x=0,p=l.length;x<p;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*u;for(let m=0;m<u;m++)h[g++]=c[f++]}return new Qt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ou=new xt,Ei=new wl,Fs=new Fi,Bu=new I,sr=new I,ar=new I,or=new I,tl=new I,Os=new I,Bs=new ne,ks=new ne,zs=new ne,ku=new I,zu=new I,Hu=new I,Hs=new I,Vs=new I,$t=class extends At{constructor(e=new Zt,t=new Un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Os.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],d=s[l];u!==0&&(tl.fromBufferAttribute(d,e),a?Os.addScaledVector(tl,u):Os.addScaledVector(tl.sub(t),u))}t.add(Os)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Fs.copy(n.boundingSphere),Fs.applyMatrix4(s),Ei.copy(e.ray).recast(e.near),!(Fs.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(Fs,Bu)===null||Ei.origin.distanceToSquared(Bu)>(e.far-e.near)**2))&&(Ou.copy(s).invert(),Ei.copy(e.ray).applyMatrix4(Ou),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ei)))}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){let p=h[g],m=a[p.materialIndex],M=Math.max(p.start,f.start),v=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let b=M,L=v;b<L;b+=3){let E=o.getX(b),A=o.getX(b+1),D=o.getX(b+2);r=Gs(this,m,e,n,c,u,d,E,A,D),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let M=o.getX(p),v=o.getX(p+1),b=o.getX(p+2);r=Gs(this,a,e,n,c,u,d,M,v,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){let p=h[g],m=a[p.materialIndex],M=Math.max(p.start,f.start),v=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let b=M,L=v;b<L;b+=3){let E=b,A=b+1,D=b+2;r=Gs(this,m,e,n,c,u,d,E,A,D),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let M=p,v=p+1,b=p+2;r=Gs(this,a,e,n,c,u,d,M,v,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}};function Kf(i,e,t,n,r,s,a,o){let l;if(e.side===jt?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===ui,o),l===null)return null;Vs.copy(o),Vs.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Vs);return c<t.near||c>t.far?null:{distance:c,point:Vs.clone(),object:i}}function Gs(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,sr),i.getVertexPosition(l,ar),i.getVertexPosition(c,or);let u=Kf(i,e,t,n,sr,ar,or,Hs);if(u){r&&(Bs.fromBufferAttribute(r,o),ks.fromBufferAttribute(r,l),zs.fromBufferAttribute(r,c),u.uv=Ui.getInterpolation(Hs,sr,ar,or,Bs,ks,zs,new ne)),s&&(Bs.fromBufferAttribute(s,o),ks.fromBufferAttribute(s,l),zs.fromBufferAttribute(s,c),u.uv1=Ui.getInterpolation(Hs,sr,ar,or,Bs,ks,zs,new ne)),a&&(ku.fromBufferAttribute(a,o),zu.fromBufferAttribute(a,l),Hu.fromBufferAttribute(a,c),u.normal=Ui.getInterpolation(Hs,sr,ar,or,ku,zu,Hu,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new I,materialIndex:0};Ui.getNormal(sr,ar,or,d.normal),u.face=d}return u}var Jn=class i extends Zt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new ot(c,3)),this.setAttribute("normal",new ot(u,3)),this.setAttribute("uv",new ot(d,2));function g(x,p,m,M,v,b,L,E,A,D,w){let y=b/A,C=L/D,z=b/2,O=L/2,H=E/2,X=A+1,V=D+1,te=0,G=0,me=new I;for(let be=0;be<V;be++){let ye=be*C-O;for(let Ye=0;Ye<X;Ye++){let et=Ye*y-z;me[x]=et*M,me[p]=ye*v,me[m]=H,c.push(me.x,me.y,me.z),me[x]=0,me[p]=0,me[m]=E>0?1:-1,u.push(me.x,me.y,me.z),d.push(Ye/A),d.push(1-be/D),te+=1}}for(let be=0;be<D;be++)for(let ye=0;ye<A;ye++){let Ye=h+ye+X*be,et=h+ye+X*(be+1),W=h+(ye+1)+X*(be+1),re=h+(ye+1)+X*be;l.push(Ye,et,re),l.push(et,W,re),G+=6}o.addGroup(f,G,w),f+=G,h+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ar(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function qt(i){let e={};for(let t=0;t<i.length;t++){let n=Ar(i[t]);for(let r in n)e[r]=n[r]}return e}function jf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Fd(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}var Qf={clone:Ar,merge:qt},ep=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nn=class extends pi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ep,this.fragmentShader=tp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ar(e.uniforms),this.uniformsGroups=jf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},fa=class extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=$n}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},si=new I,Vu=new ne,Gu=new ne,Xt=class extends fa{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ns*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ns*2*Math.atan(Math.tan(Jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(si.x,si.y).multiplyScalar(-e/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(si.x,si.y).multiplyScalar(-e/si.z)}getViewSize(e,t){return this.getViewBounds(e,Vu,Gu),t.subVectors(Gu,Vu)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Jr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},lr=-90,cr=1,El=class extends At{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Xt(lr,cr,e,t);r.layers=this.layers,this.add(r);let s=new Xt(lr,cr,e,t);s.layers=this.layers,this.add(s);let a=new Xt(lr,cr,e,t);a.layers=this.layers,this.add(a);let o=new Xt(lr,cr,e,t);o.layers=this.layers,this.add(o);let l=new Xt(lr,cr,e,t);l.layers=this.layers,this.add(l);let c=new Xt(lr,cr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===$n)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===oa)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},pa=class extends Yt{constructor(e,t,n,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Sr,super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Tl=class extends Yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new pa(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:_n}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Jn(5,5,5),s=new Nn({name:"CubemapFromEquirect",uniforms:Ar(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:oi});s.uniforms.tEquirect.value=t;let a=new $t(r,s),o=t.minFilter;return t.minFilter===Di&&(t.minFilter=_n),new El(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}},nl=new I,np=new I,ip=new Xe,qn=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=nl.subVectors(n,t).cross(np.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(nl),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ip.getNormalMatrix(e),r=this.coplanarPoint(nl).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ti=new Fi,Ws=new I,rs=class{constructor(e=new qn,t=new qn,n=new qn,r=new qn,s=new qn,a=new qn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=$n){let n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],d=r[6],h=r[7],f=r[8],g=r[9],x=r[10],p=r[11],m=r[12],M=r[13],v=r[14],b=r[15];if(n[0].setComponents(l-s,h-c,p-f,b-m).normalize(),n[1].setComponents(l+s,h+c,p+f,b+m).normalize(),n[2].setComponents(l+a,h+u,p+g,b+M).normalize(),n[3].setComponents(l-a,h-u,p-g,b-M).normalize(),n[4].setComponents(l-o,h-d,p-x,b-v).normalize(),t===$n)n[5].setComponents(l+o,h+d,p+x,b+v).normalize();else if(t===oa)n[5].setComponents(o,d,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(e){return Ti.center.set(0,0,0),Ti.radius=.7071067811865476,Ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ws.x=r.normal.x>0?e.max.x:e.min.x,Ws.y=r.normal.y>0?e.max.y:e.min.y,Ws.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ws)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Od(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function rp(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let u=l.array,d=l._updateRange,h=l.updateRanges;if(i.bindBuffer(c,o),d.count===-1&&h.length===0&&i.bufferSubData(c,0,u),h.length!==0){for(let f=0,g=h.length;f<g;f++){let x=h[f];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}d.count!==-1&&(i.bufferSubData(c,d.offset*u.BYTES_PER_ELEMENT,u,d.offset,d.count),d.count=-1),l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Kn=class i extends Zt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,d=e/o,h=t/l,f=[],g=[],x=[],p=[];for(let m=0;m<u;m++){let M=m*h-a;for(let v=0;v<c;v++){let b=v*d-s;g.push(b,-M,0),x.push(0,0,1),p.push(v/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){let v=M+c*m,b=M+c*(m+1),L=M+1+c*(m+1),E=M+1+c*m;f.push(v,b,E),f.push(b,L,E)}this.setIndex(f),this.setAttribute("position",new ot(g,3)),this.setAttribute("normal",new ot(x,3)),this.setAttribute("uv",new ot(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},sp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ap=`#ifdef USE_ALPHAHASH
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
#endif`,op=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,up=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dp=`#ifdef USE_AOMAP
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
#endif`,hp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fp=`#ifdef USE_BATCHING
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
#endif`,pp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,mp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,vp=`#ifdef USE_IRIDESCENCE
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
#endif`,yp=`#ifdef USE_BUMPMAP
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
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ep=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Tp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ap=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Cp=`#define PI 3.141592653589793
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
} // validated`,Rp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Pp=`vec3 transformedNormal = objectNormal;
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
#endif`,Ip=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Np="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fp=`
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
}`,Op=`#ifdef USE_ENVMAP
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
#endif`,Bp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kp=`#ifdef USE_ENVMAP
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
#endif`,zp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
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
#endif`,Vp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xp=`#ifdef USE_GRADIENTMAP
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
}`,$p=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jp=`uniform bool receiveShadow;
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
#endif`,Kp=`#ifdef USE_ENVMAP
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
#endif`,jp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,em=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nm=`PhysicalMaterial material;
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
#endif`,im=`struct PhysicalMaterial {
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
}`,rm=`
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
#endif`,sm=`#if defined( RE_IndirectDiffuse )
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
#endif`,am=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,om=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,um=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,pm=`#if defined( USE_POINTS_UV )
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
#endif`,mm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ym=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_m=`#ifdef USE_MORPHTARGETS
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
#endif`,bm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,wm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Em=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Am=`#ifdef USE_NORMALMAP
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
#endif`,Cm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Im=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Um=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Nm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Om=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,km=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Gm=`float getShadowMask() {
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
}`,Wm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qm=`#ifdef USE_SKINNING
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
#endif`,Xm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$m=`#ifdef USE_SKINNING
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
#endif`,Ym=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Km=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jm=`#ifdef USE_TRANSMISSION
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
#endif`,Qm=`#ifdef USE_TRANSMISSION
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
#endif`,eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ig=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,rg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sg=`uniform sampler2D t2D;
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
}`,ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,og=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ug=`#include <common>
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
}`,dg=`#if DEPTH_PACKING == 3200
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
}`,hg=`#define DISTANCE
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
}`,fg=`#define DISTANCE
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
}`,pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gg=`uniform float scale;
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
}`,xg=`uniform vec3 diffuse;
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
}`,vg=`#include <common>
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
}`,yg=`uniform vec3 diffuse;
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
}`,_g=`#define LAMBERT
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
}`,bg=`#define LAMBERT
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
}`,Sg=`#define MATCAP
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
}`,Mg=`#define MATCAP
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
}`,wg=`#define NORMAL
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
}`,Eg=`#define NORMAL
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
}`,Tg=`#define PHONG
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
}`,Ag=`#define PHONG
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
}`,Cg=`#define STANDARD
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
}`,Rg=`#define STANDARD
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
}`,Pg=`#define TOON
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
}`,Ig=`#define TOON
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
}`,Lg=`uniform float size;
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
}`,Dg=`uniform vec3 diffuse;
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
}`,Ug=`#include <common>
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
}`,Ng=`uniform vec3 color;
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
}`,Fg=`uniform float rotation;
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
}`,Og=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:sp,alphahash_pars_fragment:ap,alphamap_fragment:op,alphamap_pars_fragment:lp,alphatest_fragment:cp,alphatest_pars_fragment:up,aomap_fragment:dp,aomap_pars_fragment:hp,batching_pars_vertex:fp,batching_vertex:pp,begin_vertex:mp,beginnormal_vertex:gp,bsdfs:xp,iridescence_fragment:vp,bumpmap_pars_fragment:yp,clipping_planes_fragment:_p,clipping_planes_pars_fragment:bp,clipping_planes_pars_vertex:Sp,clipping_planes_vertex:Mp,color_fragment:wp,color_pars_fragment:Ep,color_pars_vertex:Tp,color_vertex:Ap,common:Cp,cube_uv_reflection_fragment:Rp,defaultnormal_vertex:Pp,displacementmap_pars_vertex:Ip,displacementmap_vertex:Lp,emissivemap_fragment:Dp,emissivemap_pars_fragment:Up,colorspace_fragment:Np,colorspace_pars_fragment:Fp,envmap_fragment:Op,envmap_common_pars_fragment:Bp,envmap_pars_fragment:kp,envmap_pars_vertex:zp,envmap_physical_pars_fragment:Kp,envmap_vertex:Hp,fog_vertex:Vp,fog_pars_vertex:Gp,fog_fragment:Wp,fog_pars_fragment:qp,gradientmap_pars_fragment:Xp,lightmap_pars_fragment:$p,lights_lambert_fragment:Yp,lights_lambert_pars_fragment:Zp,lights_pars_begin:Jp,lights_toon_fragment:jp,lights_toon_pars_fragment:Qp,lights_phong_fragment:em,lights_phong_pars_fragment:tm,lights_physical_fragment:nm,lights_physical_pars_fragment:im,lights_fragment_begin:rm,lights_fragment_maps:sm,lights_fragment_end:am,logdepthbuf_fragment:om,logdepthbuf_pars_fragment:lm,logdepthbuf_pars_vertex:cm,logdepthbuf_vertex:um,map_fragment:dm,map_pars_fragment:hm,map_particle_fragment:fm,map_particle_pars_fragment:pm,metalnessmap_fragment:mm,metalnessmap_pars_fragment:gm,morphinstance_vertex:xm,morphcolor_vertex:vm,morphnormal_vertex:ym,morphtarget_pars_vertex:_m,morphtarget_vertex:bm,normal_fragment_begin:Sm,normal_fragment_maps:Mm,normal_pars_fragment:wm,normal_pars_vertex:Em,normal_vertex:Tm,normalmap_pars_fragment:Am,clearcoat_normal_fragment_begin:Cm,clearcoat_normal_fragment_maps:Rm,clearcoat_pars_fragment:Pm,iridescence_pars_fragment:Im,opaque_fragment:Lm,packing:Dm,premultiplied_alpha_fragment:Um,project_vertex:Nm,dithering_fragment:Fm,dithering_pars_fragment:Om,roughnessmap_fragment:Bm,roughnessmap_pars_fragment:km,shadowmap_pars_fragment:zm,shadowmap_pars_vertex:Hm,shadowmap_vertex:Vm,shadowmask_pars_fragment:Gm,skinbase_vertex:Wm,skinning_pars_vertex:qm,skinning_vertex:Xm,skinnormal_vertex:$m,specularmap_fragment:Ym,specularmap_pars_fragment:Zm,tonemapping_fragment:Jm,tonemapping_pars_fragment:Km,transmission_fragment:jm,transmission_pars_fragment:Qm,uv_pars_fragment:eg,uv_pars_vertex:tg,uv_vertex:ng,worldpos_vertex:ig,background_vert:rg,background_frag:sg,backgroundCube_vert:ag,backgroundCube_frag:og,cube_vert:lg,cube_frag:cg,depth_vert:ug,depth_frag:dg,distanceRGBA_vert:hg,distanceRGBA_frag:fg,equirect_vert:pg,equirect_frag:mg,linedashed_vert:gg,linedashed_frag:xg,meshbasic_vert:vg,meshbasic_frag:yg,meshlambert_vert:_g,meshlambert_frag:bg,meshmatcap_vert:Sg,meshmatcap_frag:Mg,meshnormal_vert:wg,meshnormal_frag:Eg,meshphong_vert:Tg,meshphong_frag:Ag,meshphysical_vert:Cg,meshphysical_frag:Rg,meshtoon_vert:Pg,meshtoon_frag:Ig,points_vert:Lg,points_frag:Dg,shadow_vert:Ug,shadow_frag:Ng,sprite_vert:Fg,sprite_frag:Og},de={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},Pn={basic:{uniforms:qt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:qt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new $e(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:qt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:qt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:qt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new $e(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:qt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:qt([de.points,de.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:qt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:qt([de.common,de.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:qt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:qt([de.sprite,de.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:qt([de.common,de.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:qt([de.lights,de.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};Pn.physical={uniforms:qt([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};var qs={r:0,b:0,g:0},Ai=new Dn,Bg=new xt;function kg(i,e,t,n,r,s,a){let o=new $e(0),l=s===!0?0:1,c,u,d=null,h=0,f=null;function g(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?t:e).get(v)),v}function x(M){let v=!1,b=g(M);b===null?m(o,l):b&&b.isColor&&(m(b,1),v=!0);let L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(M,v){let b=g(v);b&&(b.isCubeTexture||b.mapping===Fa)?(u===void 0&&(u=new $t(new Jn(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:Ar(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ai.copy(v.backgroundRotation),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Bg.makeRotationFromEuler(Ai)),u.material.toneMapped=at.getTransfer(b.colorSpace)!==gt,(d!==b||h!==b.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,d=b,h=b.version,f=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new $t(new Kn(2,2),new Nn({name:"BackgroundMaterial",uniforms:Ar(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=at.getTransfer(b.colorSpace)!==gt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||h!==b.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=b,h=b.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,v){M.getRGB(qs,Fd(i)),n.buffers.color.setClear(qs.r,qs.g,qs.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(M,v=1){o.set(M),l=v,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,m(o,l)},render:x,addToRenderList:p}}function zg(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null),s=r,a=!1;function o(y,C,z,O,H){let X=!1,V=d(O,z,C);s!==V&&(s=V,c(s.object)),X=f(y,O,z,H),X&&g(y,O,z,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,b(y,C,z,O),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function d(y,C,z){let O=z.wireframe===!0,H=n[y.id];H===void 0&&(H={},n[y.id]=H);let X=H[C.id];X===void 0&&(X={},H[C.id]=X);let V=X[O];return V===void 0&&(V=h(l()),X[O]=V),V}function h(y){let C=[],z=[],O=[];for(let H=0;H<t;H++)C[H]=0,z[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:z,attributeDivisors:O,object:y,attributes:{},index:null}}function f(y,C,z,O){let H=s.attributes,X=C.attributes,V=0,te=z.getAttributes();for(let G in te)if(te[G].location>=0){let be=H[G],ye=X[G];if(ye===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(ye=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(ye=y.instanceColor)),be===void 0||be.attribute!==ye||ye&&be.data!==ye.data)return!0;V++}return s.attributesNum!==V||s.index!==O}function g(y,C,z,O){let H={},X=C.attributes,V=0,te=z.getAttributes();for(let G in te)if(te[G].location>=0){let be=X[G];be===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(be=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(be=y.instanceColor));let ye={};ye.attribute=be,be&&be.data&&(ye.data=be.data),H[G]=ye,V++}s.attributes=H,s.attributesNum=V,s.index=O}function x(){let y=s.newAttributes;for(let C=0,z=y.length;C<z;C++)y[C]=0}function p(y){m(y,0)}function m(y,C){let z=s.newAttributes,O=s.enabledAttributes,H=s.attributeDivisors;z[y]=1,O[y]===0&&(i.enableVertexAttribArray(y),O[y]=1),H[y]!==C&&(i.vertexAttribDivisor(y,C),H[y]=C)}function M(){let y=s.newAttributes,C=s.enabledAttributes;for(let z=0,O=C.length;z<O;z++)C[z]!==y[z]&&(i.disableVertexAttribArray(z),C[z]=0)}function v(y,C,z,O,H,X,V){V===!0?i.vertexAttribIPointer(y,C,z,H,X):i.vertexAttribPointer(y,C,z,O,H,X)}function b(y,C,z,O){x();let H=O.attributes,X=z.getAttributes(),V=C.defaultAttributeValues;for(let te in X){let G=X[te];if(G.location>=0){let me=H[te];if(me===void 0&&(te==="instanceMatrix"&&y.instanceMatrix&&(me=y.instanceMatrix),te==="instanceColor"&&y.instanceColor&&(me=y.instanceColor)),me!==void 0){let be=me.normalized,ye=me.itemSize,Ye=e.get(me);if(Ye===void 0)continue;let et=Ye.buffer,W=Ye.type,re=Ye.bytesPerElement,_e=W===i.INT||W===i.UNSIGNED_INT||me.gpuType===Ed;if(me.isInterleavedBufferAttribute){let ce=me.data,Ve=ce.stride,Ge=me.offset;if(ce.isInstancedInterleavedBuffer){for(let ze=0;ze<G.locationSize;ze++)m(G.location+ze,ce.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let ze=0;ze<G.locationSize;ze++)p(G.location+ze);i.bindBuffer(i.ARRAY_BUFFER,et);for(let ze=0;ze<G.locationSize;ze++)v(G.location+ze,ye/G.locationSize,W,be,Ve*re,(Ge+ye/G.locationSize*ze)*re,_e)}else{if(me.isInstancedBufferAttribute){for(let ce=0;ce<G.locationSize;ce++)m(G.location+ce,me.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let ce=0;ce<G.locationSize;ce++)p(G.location+ce);i.bindBuffer(i.ARRAY_BUFFER,et);for(let ce=0;ce<G.locationSize;ce++)v(G.location+ce,ye/G.locationSize,W,be,ye*re,ye/G.locationSize*ce*re,_e)}}else if(V!==void 0){let be=V[te];if(be!==void 0)switch(be.length){case 2:i.vertexAttrib2fv(G.location,be);break;case 3:i.vertexAttrib3fv(G.location,be);break;case 4:i.vertexAttrib4fv(G.location,be);break;default:i.vertexAttrib1fv(G.location,be)}}}}M()}function L(){D();for(let y in n){let C=n[y];for(let z in C){let O=C[z];for(let H in O)u(O[H].object),delete O[H];delete C[z]}delete n[y]}}function E(y){if(n[y.id]===void 0)return;let C=n[y.id];for(let z in C){let O=C[z];for(let H in O)u(O[H].object),delete O[H];delete C[z]}delete n[y.id]}function A(y){for(let C in n){let z=n[C];if(z[y.id]===void 0)continue;let O=z[y.id];for(let H in O)u(O[H].object),delete O[H];delete z[y.id]}}function D(){w(),a=!0,s!==r&&(s=r,c(s.object))}function w(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:D,resetDefaultState:w,dispose:L,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:p,disableUnusedAttributes:M}}function Hg(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function o(c,u,d){if(d===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let f=0;f<d;f++)this.render(c[f],u[f]);else{h.multiDrawArraysWEBGL(n,c,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];t.update(f,n,1)}}function l(c,u,d,h){if(d===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],u[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x];for(let x=0;x<h.length;x++)t.update(g,n,h[x])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Vg(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(E){return!(E!==In&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let A=E===Oa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==di&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Xn&&!A)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=f>0,L=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:x,maxAttributes:p,maxVertexUniforms:m,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:b,maxSamples:L}}function Gg(i){let e=this,t=null,n=0,r=!1,s=!1,a=new qn,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||r;return r=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let g=d.clippingPlanes,x=d.clipIntersection,p=d.clipShadows,m=i.get(d);if(!r||g===null||g.length===0||s&&!p)s?u(null):c();else{let M=s?0:n,v=M*4,b=m.clippingState||null;l.value=b,b=u(g,h,v,f);for(let L=0;L!==v;++L)b[L]=t[L];m.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,g){let x=d!==null?d.length:0,p=null;if(x!==0){if(p=l.value,g!==!0||p===null){let m=f+x*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,b=f;v!==x;++v,b+=4)a.copy(d[v]).applyMatrix4(M,o),a.normal.toArray(p,b),p[b+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}function Wg(i){let e=new WeakMap;function t(a,o){return o===gl?a.mapping=Sr:o===xl&&(a.mapping=Mr),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===gl||o===xl)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Tl(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){let o=a.target;o.removeEventListener("dispose",r);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var ma=class extends fa{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},gr=4,Wu=[.125,.215,.35,.446,.526,.582],Ii=20,il=new ma,qu=new $e,rl=null,sl=0,al=0,ol=!1,Ri=(1+Math.sqrt(5))/2,ur=1/Ri,Xu=[new I(-Ri,ur,0),new I(Ri,ur,0),new I(-ur,0,Ri),new I(ur,0,Ri),new I(0,Ri,-ur),new I(0,Ri,ur),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],ga=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){rl=this._renderer.getRenderTarget(),sl=this._renderer.getActiveCubeFace(),al=this._renderer.getActiveMipmapLevel(),ol=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(rl,sl,al),this._renderer.xr.enabled=ol,e.scissorTest=!1,Xs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Sr||e.mapping===Mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rl=this._renderer.getRenderTarget(),sl=this._renderer.getActiveCubeFace(),al=this._renderer.getActiveMipmapLevel(),ol=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Oa,format:In,colorSpace:gi,depthBuffer:!1},r=$u(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$u(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qg(s)),this._blurMaterial=Xg(s,e,t)}return r}_compileMaterial(e){let t=new $t(this._lodPlanes[0],e);this._renderer.compile(t,il)}_sceneToCubeUV(e,t,n,r){let o=new Xt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(qu),u.toneMapping=li,u.autoClear=!1;let f=new Un({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1}),g=new $t(new Jn,f),x=!1,p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,x=!0):(f.color.copy(qu),x=!0);for(let m=0;m<6;m++){let M=m%3;M===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):M===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));let v=this._cubeSize;Xs(r,M*v,m>2?v:0,v,v),u.setRenderTarget(r),x&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Sr||e.mapping===Mr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yu());let s=r?this._cubemapMaterial:this._equirectMaterial,a=new $t(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;Xs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,il)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Xu[(r-s-1)%Xu.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new $t(this._lodPlanes[r],c),h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ii-1),x=s/g,p=isFinite(s)?1+Math.floor(u*x):Ii;p>Ii&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ii}`);let m=[],M=0;for(let A=0;A<Ii;++A){let D=A/x,w=Math.exp(-D*D/2);m.push(w),A===0?M+=w:A<p&&(M+=2*w)}for(let A=0;A<m.length;A++)m[A]=m[A]/M;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:v}=this;h.dTheta.value=g,h.mipInt.value=v-n;let b=this._sizeLods[r],L=3*b*(r>v-gr?r-v+gr:0),E=4*(this._cubeSize-b);Xs(t,L,E,3*b,2*b),l.setRenderTarget(t),l.render(d,il)}};function qg(i){let e=[],t=[],n=[],r=i,s=i-gr+1+Wu.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);t.push(o);let l=1/o;a>i-gr?l=Wu[a-i+gr-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,x=3,p=2,m=1,M=new Float32Array(x*g*f),v=new Float32Array(p*g*f),b=new Float32Array(m*g*f);for(let E=0;E<f;E++){let A=E%3*2/3-1,D=E>2?0:-1,w=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];M.set(w,x*g*E),v.set(h,p*g*E);let y=[E,E,E,E,E,E];b.set(y,m*g*E)}let L=new Zt;L.setAttribute("position",new Qt(M,x)),L.setAttribute("uv",new Qt(v,p)),L.setAttribute("faceIndex",new Qt(b,m)),e.push(L),r>gr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function $u(i,e,t){let n=new Yn(i,e,t);return n.texture.mapping=Fa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xs(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Xg(i,e,t){let n=new Float32Array(Ii),r=new I(0,1,0);return new Nn({name:"SphericalGaussianBlur",defines:{n:Ii,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:pc(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Yu(){return new Nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pc(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Zu(){return new Nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function pc(){return`

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
	`}function $g(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===gl||l===xl,u=l===Sr||l===Mr;if(c||u){let d=e.get(o),h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new ga(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{let f=o.image;return c&&f&&f.height>0||u&&f&&r(f)?(t===null&&(t=new ga(i)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Yg(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&fc("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Zg(i,e,t,n){let r={},s=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let g in h.attributes)e.remove(h.attributes[g]);for(let g in h.morphAttributes){let x=h.morphAttributes[g];for(let p=0,m=x.length;p<m;p++)e.remove(x[p])}h.removeEventListener("dispose",a),delete r[h.id];let f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let g in h)e.update(h[g],i.ARRAY_BUFFER);let f=d.morphAttributes;for(let g in f){let x=f[g];for(let p=0,m=x.length;p<m;p++)e.update(x[p],i.ARRAY_BUFFER)}}function c(d){let h=[],f=d.index,g=d.attributes.position,x=0;if(f!==null){let M=f.array;x=f.version;for(let v=0,b=M.length;v<b;v+=3){let L=M[v+0],E=M[v+1],A=M[v+2];h.push(L,E,E,A,A,L)}}else if(g!==void 0){let M=g.array;x=g.version;for(let v=0,b=M.length/3-1;v<b;v+=3){let L=v+0,E=v+1,A=v+2;h.push(L,E,E,A,A,L)}}else return;let p=new(Ud(h)?ha:da)(h,1);p.version=x;let m=s.get(d);m&&e.remove(m),s.set(d,p)}function u(d){let h=s.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Jg(i,e,t){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,s,h*a),t.update(f,n,1)}function c(h,f,g){g!==0&&(i.drawElementsInstanced(n,f,s,h*a,g),t.update(f,n,g))}function u(h,f,g){if(g===0)return;let x=e.get("WEBGL_multi_draw");if(x===null)for(let p=0;p<g;p++)this.render(h[p]/a,f[p]);else{x.multiDrawElementsWEBGL(n,f,0,s,h,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];t.update(p,n,1)}}function d(h,f,g,x){if(g===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<h.length;m++)c(h[m]/a,f[m],x[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,s,h,0,x,0,g);let m=0;for(let M=0;M<g;M++)m+=f[M];for(let M=0;M<x.length;M++)t.update(m,n,x[M])}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Kg(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function jg(i,e,t){let n=new WeakMap,r=new Ut;function s(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==d){let w=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],v=0;f===!0&&(v=1),g===!0&&(v=2),x===!0&&(v=3);let b=o.attributes.position.count*v,L=1;b>e.maxTextureSize&&(L=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let E=new Float32Array(b*L*4*d),A=new ca(E,b,L,d);A.type=Xn,A.needsUpdate=!0;let D=v*4;for(let y=0;y<d;y++){let C=p[y],z=m[y],O=M[y],H=b*L*4*y;for(let X=0;X<C.count;X++){let V=X*D;f===!0&&(r.fromBufferAttribute(C,X),E[H+V+0]=r.x,E[H+V+1]=r.y,E[H+V+2]=r.z,E[H+V+3]=0),g===!0&&(r.fromBufferAttribute(z,X),E[H+V+4]=r.x,E[H+V+5]=r.y,E[H+V+6]=r.z,E[H+V+7]=0),x===!0&&(r.fromBufferAttribute(O,X),E[H+V+8]=r.x,E[H+V+9]=r.y,E[H+V+10]=r.z,E[H+V+11]=O.itemSize===4?r.w:1)}}h={count:d,texture:A,size:new ne(b,L)},n.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function Qg(i,e,t,n){let r=new WeakMap;function s(l){let c=n.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return d}function a(){r=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}var xa=class extends Yt{constructor(e,t,n,r,s,a,o,l,c,u=yr){if(u!==yr&&u!==Tr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===yr&&(n=wr),n===void 0&&u===Tr&&(n=Er),super(null,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Kt,this.minFilter=l!==void 0?l:Kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Bd=new Yt,kd=new xa(1,1);kd.compareFunction=Dd;var zd=new ca,Hd=new Ml,Vd=new pa,Ju=[],Ku=[],ju=new Float32Array(16),Qu=new Float32Array(9),ed=new Float32Array(4);function Lr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=Ju[r];if(s===void 0&&(s=new Float32Array(r),Ju[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Rt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ka(i,e){let t=Ku[e];t===void 0&&(t=new Int32Array(e),Ku[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function ex(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function tx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2fv(this.addr,e),Pt(t,e)}}function nx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;i.uniform3fv(this.addr,e),Pt(t,e)}}function ix(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4fv(this.addr,e),Pt(t,e)}}function rx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;ed.set(n),i.uniformMatrix2fv(this.addr,!1,ed),Pt(t,n)}}function sx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;Qu.set(n),i.uniformMatrix3fv(this.addr,!1,Qu),Pt(t,n)}}function ax(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;ju.set(n),i.uniformMatrix4fv(this.addr,!1,ju),Pt(t,n)}}function ox(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function lx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2iv(this.addr,e),Pt(t,e)}}function cx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3iv(this.addr,e),Pt(t,e)}}function ux(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4iv(this.addr,e),Pt(t,e)}}function dx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function hx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2uiv(this.addr,e),Pt(t,e)}}function fx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3uiv(this.addr,e),Pt(t,e)}}function px(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4uiv(this.addr,e),Pt(t,e)}}function mx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s=this.type===i.SAMPLER_2D_SHADOW?kd:Bd;t.setTexture2D(e||s,r)}function gx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Hd,r)}function xx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Vd,r)}function vx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||zd,r)}function yx(i){switch(i){case 5126:return ex;case 35664:return tx;case 35665:return nx;case 35666:return ix;case 35674:return rx;case 35675:return sx;case 35676:return ax;case 5124:case 35670:return ox;case 35667:case 35671:return lx;case 35668:case 35672:return cx;case 35669:case 35673:return ux;case 5125:return dx;case 36294:return hx;case 36295:return fx;case 36296:return px;case 35678:case 36198:case 36298:case 36306:case 35682:return mx;case 35679:case 36299:case 36307:return gx;case 35680:case 36300:case 36308:case 36293:return xx;case 36289:case 36303:case 36311:case 36292:return vx}}function _x(i,e){i.uniform1fv(this.addr,e)}function bx(i,e){let t=Lr(e,this.size,2);i.uniform2fv(this.addr,t)}function Sx(i,e){let t=Lr(e,this.size,3);i.uniform3fv(this.addr,t)}function Mx(i,e){let t=Lr(e,this.size,4);i.uniform4fv(this.addr,t)}function wx(i,e){let t=Lr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ex(i,e){let t=Lr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Tx(i,e){let t=Lr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ax(i,e){i.uniform1iv(this.addr,e)}function Cx(i,e){i.uniform2iv(this.addr,e)}function Rx(i,e){i.uniform3iv(this.addr,e)}function Px(i,e){i.uniform4iv(this.addr,e)}function Ix(i,e){i.uniform1uiv(this.addr,e)}function Lx(i,e){i.uniform2uiv(this.addr,e)}function Dx(i,e){i.uniform3uiv(this.addr,e)}function Ux(i,e){i.uniform4uiv(this.addr,e)}function Nx(i,e,t){let n=this.cache,r=e.length,s=ka(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Bd,s[a])}function Fx(i,e,t){let n=this.cache,r=e.length,s=ka(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Hd,s[a])}function Ox(i,e,t){let n=this.cache,r=e.length,s=ka(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Vd,s[a])}function Bx(i,e,t){let n=this.cache,r=e.length,s=ka(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||zd,s[a])}function kx(i){switch(i){case 5126:return _x;case 35664:return bx;case 35665:return Sx;case 35666:return Mx;case 35674:return wx;case 35675:return Ex;case 35676:return Tx;case 5124:case 35670:return Ax;case 35667:case 35671:return Cx;case 35668:case 35672:return Rx;case 35669:case 35673:return Px;case 5125:return Ix;case 36294:return Lx;case 36295:return Dx;case 36296:return Ux;case 35678:case 36198:case 36298:case 36306:case 35682:return Nx;case 35679:case 36299:case 36307:return Fx;case 35680:case 36300:case 36308:case 36293:return Ox;case 36289:case 36303:case 36311:case 36292:return Bx}}var Al=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=yx(t.type)}},Cl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=kx(t.type)}},Rl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},ll=/(\w+)(\])?(\[|\.)?/g;function td(i,e){i.seq.push(e),i.map[e.id]=e}function zx(i,e,t){let n=i.name,r=n.length;for(ll.lastIndex=0;;){let s=ll.exec(n),a=ll.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){td(t,c===void 0?new Al(o,i,e):new Cl(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Rl(o),td(t,d)),t=d}}}var br=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);zx(s,a,this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function nd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Hx=37297,Vx=0;function Gx(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Wx(i){let e=at.getPrimaries(at.workingColorSpace),t=at.getPrimaries(i),n;switch(e===t?n="":e===aa&&t===sa?n="LinearDisplayP3ToLinearSRGB":e===sa&&t===aa&&(n="LinearSRGBToLinearDisplayP3"),i){case gi:case Ba:return[n,"LinearTransferOETF"];case Nt:case uc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function id(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Gx(i.getShaderSource(e),a)}else return r}function qx(i,e){let t=Wx(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Xx(i,e){let t;switch(e){case Yh:t="Linear";break;case Zh:t="Reinhard";break;case Jh:t="OptimizedCineon";break;case cc:t="ACESFilmic";break;case jh:t="AgX";break;case Qh:t="Neutral";break;case Kh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function $x(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zr).join(`
`)}function Yx(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Zx(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Zr(i){return i!==""}function rd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Jx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pl(i){return i.replace(Jx,jx)}var Kx=new Map;function jx(i,e){let t=qe[e];if(t===void 0){let n=Kx.get(e);if(n!==void 0)t=qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Pl(t)}var Qx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ad(i){return i.replace(Qx,e0)}function e0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function od(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function t0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Sd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===lc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Wn&&(e="SHADOWMAP_TYPE_VSM"),e}function n0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Sr:case Mr:e="ENVMAP_TYPE_CUBE";break;case Fa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function i0(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Mr&&(e="ENVMAP_MODE_REFRACTION"),e}function r0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Md:e="ENVMAP_BLENDING_MULTIPLY";break;case Xh:e="ENVMAP_BLENDING_MIX";break;case $h:e="ENVMAP_BLENDING_ADD";break}return e}function s0(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function a0(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=t0(t),c=n0(t),u=i0(t),d=r0(t),h=s0(t),f=$x(t),g=Yx(s),x=r.createProgram(),p,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zr).join(`
`),m.length>0&&(m+=`
`)):(p=[od(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zr).join(`
`),m=[od(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==li?"#define TONE_MAPPING":"",t.toneMapping!==li?qe.tonemapping_pars_fragment:"",t.toneMapping!==li?Xx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,qx("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zr).join(`
`)),a=Pl(a),a=rd(a,t),a=sd(a,t),o=Pl(o),o=rd(o,t),o=sd(o,t),a=ad(a),o=ad(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Mu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let v=M+p+a,b=M+m+o,L=nd(r,r.VERTEX_SHADER,v),E=nd(r,r.FRAGMENT_SHADER,b);r.attachShader(x,L),r.attachShader(x,E),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(C){if(i.debug.checkShaderErrors){let z=r.getProgramInfoLog(x).trim(),O=r.getShaderInfoLog(L).trim(),H=r.getShaderInfoLog(E).trim(),X=!0,V=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,L,E);else{let te=id(r,L,"vertex"),G=id(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+z+`
`+te+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(O===""||H==="")&&(V=!1);V&&(C.diagnostics={runnable:X,programLog:z,vertexShader:{log:O,prefix:p},fragmentShader:{log:H,prefix:m}})}r.deleteShader(L),r.deleteShader(E),D=new br(r,x),w=Zx(r,x)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(x,Hx)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vx++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=L,this.fragmentShader=E,this}var o0=0,Il=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ll(e),t.set(e,n)),n}},Ll=class{constructor(e){this.id=o0++,this.code=e,this.usedTimes=0}};function l0(i,e,t,n,r,s,a){let o=new ua,l=new Il,c=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures,f=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return c.add(w),w===0?"uv":`uv${w}`}function p(w,y,C,z,O){let H=z.fog,X=O.geometry,V=w.isMeshStandardMaterial?z.environment:null,te=(w.isMeshStandardMaterial?t:e).get(w.envMap||V),G=te&&te.mapping===Fa?te.image.height:null,me=g[w.type];w.precision!==null&&(f=r.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));let be=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ye=be!==void 0?be.length:0,Ye=0;X.morphAttributes.position!==void 0&&(Ye=1),X.morphAttributes.normal!==void 0&&(Ye=2),X.morphAttributes.color!==void 0&&(Ye=3);let et,W,re,_e;if(me){let lt=Pn[me];et=lt.vertexShader,W=lt.fragmentShader}else et=w.vertexShader,W=w.fragmentShader,l.update(w),re=l.getVertexShaderID(w),_e=l.getFragmentShaderID(w);let ce=i.getRenderTarget(),Ve=O.isInstancedMesh===!0,Ge=O.isBatchedMesh===!0,ze=!!w.map,R=!!w.matcap,$=!!te,K=!!w.aoMap,se=!!w.lightMap,Q=!!w.bumpMap,ee=!!w.normalMap,ge=!!w.displacementMap,fe=!!w.emissiveMap,He=!!w.metalnessMap,T=!!w.roughnessMap,_=w.anisotropy>0,k=w.clearcoat>0,J=w.dispersion>0,Z=w.iridescence>0,j=w.sheen>0,Re=w.transmission>0,ue=_&&!!w.anisotropyMap,he=k&&!!w.clearcoatMap,We=k&&!!w.clearcoatNormalMap,ae=k&&!!w.clearcoatRoughnessMap,Ee=Z&&!!w.iridescenceMap,Ke=Z&&!!w.iridescenceThicknessMap,Oe=j&&!!w.sheenColorMap,pe=j&&!!w.sheenRoughnessMap,Ze=!!w.specularMap,je=!!w.specularColorMap,Mt=!!w.specularIntensityMap,P=Re&&!!w.transmissionMap,xe=Re&&!!w.thicknessMap,q=!!w.gradientMap,Y=!!w.alphaMap,le=w.alphaTest>0,Be=!!w.alphaHash,tt=!!w.extensions,wt=li;w.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(wt=i.toneMapping);let It={shaderID:me,shaderType:w.type,shaderName:w.name,vertexShader:et,fragmentShader:W,defines:w.defines,customVertexShaderID:re,customFragmentShaderID:_e,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Ge,batchingColor:Ge&&O._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&O.instanceColor!==null,instancingMorph:Ve&&O.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:gi,alphaToCoverage:!!w.alphaToCoverage,map:ze,matcap:R,envMap:$,envMapMode:$&&te.mapping,envMapCubeUVHeight:G,aoMap:K,lightMap:se,bumpMap:Q,normalMap:ee,displacementMap:h&&ge,emissiveMap:fe,normalMapObjectSpace:ee&&w.normalMapType===ff,normalMapTangentSpace:ee&&w.normalMapType===Ld,metalnessMap:He,roughnessMap:T,anisotropy:_,anisotropyMap:ue,clearcoat:k,clearcoatMap:he,clearcoatNormalMap:We,clearcoatRoughnessMap:ae,dispersion:J,iridescence:Z,iridescenceMap:Ee,iridescenceThicknessMap:Ke,sheen:j,sheenColorMap:Oe,sheenRoughnessMap:pe,specularMap:Ze,specularColorMap:je,specularIntensityMap:Mt,transmission:Re,transmissionMap:P,thicknessMap:xe,gradientMap:q,opaque:w.transparent===!1&&w.blending===vr&&w.alphaToCoverage===!1,alphaMap:Y,alphaTest:le,alphaHash:Be,combine:w.combine,mapUv:ze&&x(w.map.channel),aoMapUv:K&&x(w.aoMap.channel),lightMapUv:se&&x(w.lightMap.channel),bumpMapUv:Q&&x(w.bumpMap.channel),normalMapUv:ee&&x(w.normalMap.channel),displacementMapUv:ge&&x(w.displacementMap.channel),emissiveMapUv:fe&&x(w.emissiveMap.channel),metalnessMapUv:He&&x(w.metalnessMap.channel),roughnessMapUv:T&&x(w.roughnessMap.channel),anisotropyMapUv:ue&&x(w.anisotropyMap.channel),clearcoatMapUv:he&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:We&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ke&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:pe&&x(w.sheenRoughnessMap.channel),specularMapUv:Ze&&x(w.specularMap.channel),specularColorMapUv:je&&x(w.specularColorMap.channel),specularIntensityMapUv:Mt&&x(w.specularIntensityMap.channel),transmissionMapUv:P&&x(w.transmissionMap.channel),thicknessMapUv:xe&&x(w.thicknessMap.channel),alphaMapUv:Y&&x(w.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(ee||_),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!X.attributes.uv&&(ze||Y),fog:!!H,useFog:w.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:O.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Ye,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:wt,decodeVideoTexture:ze&&w.map.isVideoTexture===!0&&at.getTransfer(w.map.colorSpace)===gt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===yn,flipSided:w.side===jt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:tt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:tt&&w.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return It.vertexUv1s=c.has(1),It.vertexUv2s=c.has(2),It.vertexUv3s=c.has(3),c.clear(),It}function m(w){let y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(let C in w.defines)y.push(C),y.push(w.defines[C]);return w.isRawShaderMaterial===!1&&(M(y,w),v(y,w),y.push(i.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function M(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function v(w,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.skinning&&o.enable(4),y.morphTargets&&o.enable(5),y.morphNormals&&o.enable(6),y.morphColors&&o.enable(7),y.premultipliedAlpha&&o.enable(8),y.shadowMapEnabled&&o.enable(9),y.doubleSided&&o.enable(10),y.flipSided&&o.enable(11),y.useDepthPacking&&o.enable(12),y.dithering&&o.enable(13),y.transmission&&o.enable(14),y.sheen&&o.enable(15),y.opaque&&o.enable(16),y.pointsUvs&&o.enable(17),y.decodeVideoTexture&&o.enable(18),y.alphaToCoverage&&o.enable(19),w.push(o.mask)}function b(w){let y=g[w.type],C;if(y){let z=Pn[y];C=Qf.clone(z.uniforms)}else C=w.uniforms;return C}function L(w,y){let C;for(let z=0,O=u.length;z<O;z++){let H=u[z];if(H.cacheKey===y){C=H,++C.usedTimes;break}}return C===void 0&&(C=new a0(i,y,w,s),u.push(C)),C}function E(w){if(--w.usedTimes===0){let y=u.indexOf(w);u[y]=u[u.length-1],u.pop(),w.destroy()}}function A(w){l.remove(w)}function D(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:b,acquireProgram:L,releaseProgram:E,releaseShaderCache:A,programs:u,dispose:D}}function c0(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function u0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ld(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function cd(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d,h,f,g,x,p){let m=i[e];return m===void 0?(m={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:x,group:p},i[e]=m):(m.id=d.id,m.object=d,m.geometry=h,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=x,m.group=p),e++,m}function o(d,h,f,g,x,p){let m=a(d,h,f,g,x,p);f.transmission>0?n.push(m):f.transparent===!0?r.push(m):t.push(m)}function l(d,h,f,g,x,p){let m=a(d,h,f,g,x,p);f.transmission>0?n.unshift(m):f.transparent===!0?r.unshift(m):t.unshift(m)}function c(d,h){t.length>1&&t.sort(d||u0),n.length>1&&n.sort(h||ld),r.length>1&&r.sort(h||ld)}function u(){for(let d=e,h=i.length;d<h;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function d0(){let i=new WeakMap;function e(n,r){let s=i.get(n),a;return s===void 0?(a=new cd,i.set(n,[a])):r>=s.length?(a=new cd,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function h0(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new $e};break;case"SpotLight":t={position:new I,direction:new I,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function f0(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var p0=0;function m0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function g0(i){let e=new h0,t=f0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let r=new I,s=new xt,a=new xt;function o(c){let u=0,d=0,h=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,g=0,x=0,p=0,m=0,M=0,v=0,b=0,L=0,E=0,A=0;c.sort(m0);for(let w=0,y=c.length;w<y;w++){let C=c[w],z=C.color,O=C.intensity,H=C.distance,X=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=z.r*O,d+=z.g*O,h+=z.b*O;else if(C.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(C.sh.coefficients[V],O);A++}else if(C.isDirectionalLight){let V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let te=C.shadow,G=t.get(C);G.shadowBias=te.bias,G.shadowNormalBias=te.normalBias,G.shadowRadius=te.radius,G.shadowMapSize=te.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=C.shadow.matrix,M++}n.directional[f]=V,f++}else if(C.isSpotLight){let V=e.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(z).multiplyScalar(O),V.distance=H,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,n.spot[x]=V;let te=C.shadow;if(C.map&&(n.spotLightMap[L]=C.map,L++,te.updateMatrices(C),C.castShadow&&E++),n.spotLightMatrix[x]=te.matrix,C.castShadow){let G=t.get(C);G.shadowBias=te.bias,G.shadowNormalBias=te.normalBias,G.shadowRadius=te.radius,G.shadowMapSize=te.mapSize,n.spotShadow[x]=G,n.spotShadowMap[x]=X,b++}x++}else if(C.isRectAreaLight){let V=e.get(C);V.color.copy(z).multiplyScalar(O),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),n.rectArea[p]=V,p++}else if(C.isPointLight){let V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){let te=C.shadow,G=t.get(C);G.shadowBias=te.bias,G.shadowNormalBias=te.normalBias,G.shadowRadius=te.radius,G.shadowMapSize=te.mapSize,G.shadowCameraNear=te.camera.near,G.shadowCameraFar=te.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=C.shadow.matrix,v++}n.point[g]=V,g++}else if(C.isHemisphereLight){let V=e.get(C);V.skyColor.copy(C.color).multiplyScalar(O),V.groundColor.copy(C.groundColor).multiplyScalar(O),n.hemi[m]=V,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let D=n.hash;(D.directionalLength!==f||D.pointLength!==g||D.spotLength!==x||D.rectAreaLength!==p||D.hemiLength!==m||D.numDirectionalShadows!==M||D.numPointShadows!==v||D.numSpotShadows!==b||D.numSpotMaps!==L||D.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=b+L-E,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,D.directionalLength=f,D.pointLength=g,D.spotLength=x,D.rectAreaLength=p,D.hemiLength=m,D.numDirectionalShadows=M,D.numPointShadows=v,D.numSpotShadows=b,D.numSpotMaps=L,D.numLightProbes=A,n.version=p0++)}function l(c,u){let d=0,h=0,f=0,g=0,x=0,p=u.matrixWorldInverse;for(let m=0,M=c.length;m<M;m++){let v=c[m];if(v.isDirectionalLight){let b=n.directional[d];b.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),d++}else if(v.isSpotLight){let b=n.spot[f];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),f++}else if(v.isRectAreaLight){let b=n.rectArea[g];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),a.identity(),s.copy(v.matrixWorld),s.premultiply(p),a.extractRotation(s),b.halfWidth.set(v.width*.5,0,0),b.halfHeight.set(0,v.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){let b=n.point[h];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),h++}else if(v.isHemisphereLight){let b=n.hemi[x];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(p),x++}}}return{setup:o,setupView:l,state:n}}function ud(i){let e=new g0(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function x0(i){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new ud(i),e.set(r,[o])):s>=a.length?(o=new ud(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Dl=class extends pi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=df,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ul=class extends pi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},v0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,y0=`uniform sampler2D shadow_pass;
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
}`;function _0(i,e,t){let n=new rs,r=new ne,s=new ne,a=new Ut,o=new Dl({depthPacking:hf}),l=new Ul,c={},u=t.maxTextureSize,d={[ui]:jt,[jt]:ui,[yn]:yn},h=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:v0,fragmentShader:y0}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let g=new Zt;g.setAttribute("position",new Qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new $t(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sd;let m=this.type;this.render=function(E,A,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;let w=i.getRenderTarget(),y=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),z=i.state;z.setBlending(oi),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let O=m!==Wn&&this.type===Wn,H=m===Wn&&this.type!==Wn;for(let X=0,V=E.length;X<V;X++){let te=E[X],G=te.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);let me=G.getFrameExtents();if(r.multiply(me),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/me.x),r.x=s.x*me.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/me.y),r.y=s.y*me.y,G.mapSize.y=s.y)),G.map===null||O===!0||H===!0){let ye=this.type!==Wn?{minFilter:Kt,magFilter:Kt}:{};G.map!==null&&G.map.dispose(),G.map=new Yn(r.x,r.y,ye),G.map.texture.name=te.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();let be=G.getViewportCount();for(let ye=0;ye<be;ye++){let Ye=G.getViewport(ye);a.set(s.x*Ye.x,s.y*Ye.y,s.x*Ye.z,s.y*Ye.w),z.viewport(a),G.updateMatrices(te,ye),n=G.getFrustum(),b(A,D,G.camera,te,this.type)}G.isPointLightShadow!==!0&&this.type===Wn&&M(G,D),G.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(w,y,C)};function M(E,A){let D=e.update(x);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Yn(r.x,r.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,D,h,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,D,f,x,null)}function v(E,A,D,w){let y=null,C=D.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)y=C;else if(y=D.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let z=y.uuid,O=A.uuid,H=c[z];H===void 0&&(H={},c[z]=H);let X=H[O];X===void 0&&(X=y.clone(),H[O]=X,A.addEventListener("dispose",L)),y=X}if(y.visible=A.visible,y.wireframe=A.wireframe,w===Wn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:d[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let z=i.properties.get(y);z.light=D}return y}function b(E,A,D,w,y){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&y===Wn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,E.matrixWorld);let O=e.update(E),H=E.material;if(Array.isArray(H)){let X=O.groups;for(let V=0,te=X.length;V<te;V++){let G=X[V],me=H[G.materialIndex];if(me&&me.visible){let be=v(E,me,w,y);E.onBeforeShadow(i,E,A,D,O,be,G),i.renderBufferDirect(D,null,O,be,E,G),E.onAfterShadow(i,E,A,D,O,be,G)}}}else if(H.visible){let X=v(E,H,w,y);E.onBeforeShadow(i,E,A,D,O,X,null),i.renderBufferDirect(D,null,O,X,E,null),E.onAfterShadow(i,E,A,D,O,X,null)}}let z=E.children;for(let O=0,H=z.length;O<H;O++)b(z[O],A,D,w,y)}function L(E){E.target.removeEventListener("dispose",L);for(let D in c){let w=c[D],y=E.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}function b0(i){function e(){let P=!1,xe=new Ut,q=null,Y=new Ut(0,0,0,0);return{setMask:function(le){q!==le&&!P&&(i.colorMask(le,le,le,le),q=le)},setLocked:function(le){P=le},setClear:function(le,Be,tt,wt,It){It===!0&&(le*=wt,Be*=wt,tt*=wt),xe.set(le,Be,tt,wt),Y.equals(xe)===!1&&(i.clearColor(le,Be,tt,wt),Y.copy(xe))},reset:function(){P=!1,q=null,Y.set(-1,0,0,0)}}}function t(){let P=!1,xe=null,q=null,Y=null;return{setTest:function(le){le?_e(i.DEPTH_TEST):ce(i.DEPTH_TEST)},setMask:function(le){xe!==le&&!P&&(i.depthMask(le),xe=le)},setFunc:function(le){if(q!==le){switch(le){case kh:i.depthFunc(i.NEVER);break;case zh:i.depthFunc(i.ALWAYS);break;case Hh:i.depthFunc(i.LESS);break;case ta:i.depthFunc(i.LEQUAL);break;case Vh:i.depthFunc(i.EQUAL);break;case Gh:i.depthFunc(i.GEQUAL);break;case Wh:i.depthFunc(i.GREATER);break;case qh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}q=le}},setLocked:function(le){P=le},setClear:function(le){Y!==le&&(i.clearDepth(le),Y=le)},reset:function(){P=!1,xe=null,q=null,Y=null}}}function n(){let P=!1,xe=null,q=null,Y=null,le=null,Be=null,tt=null,wt=null,It=null;return{setTest:function(lt){P||(lt?_e(i.STENCIL_TEST):ce(i.STENCIL_TEST))},setMask:function(lt){xe!==lt&&!P&&(i.stencilMask(lt),xe=lt)},setFunc:function(lt,Cn,Rn){(q!==lt||Y!==Cn||le!==Rn)&&(i.stencilFunc(lt,Cn,Rn),q=lt,Y=Cn,le=Rn)},setOp:function(lt,Cn,Rn){(Be!==lt||tt!==Cn||wt!==Rn)&&(i.stencilOp(lt,Cn,Rn),Be=lt,tt=Cn,wt=Rn)},setLocked:function(lt){P=lt},setClear:function(lt){It!==lt&&(i.clearStencil(lt),It=lt)},reset:function(){P=!1,xe=null,q=null,Y=null,le=null,Be=null,tt=null,wt=null,It=null}}}let r=new e,s=new t,a=new n,o=new WeakMap,l=new WeakMap,c={},u={},d=new WeakMap,h=[],f=null,g=!1,x=null,p=null,m=null,M=null,v=null,b=null,L=null,E=new $e(0,0,0),A=0,D=!1,w=null,y=null,C=null,z=null,O=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,V=0,te=i.getParameter(i.VERSION);te.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(te)[1]),X=V>=1):te.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),X=V>=2);let G=null,me={},be=i.getParameter(i.SCISSOR_BOX),ye=i.getParameter(i.VIEWPORT),Ye=new Ut().fromArray(be),et=new Ut().fromArray(ye);function W(P,xe,q,Y){let le=new Uint8Array(4),Be=i.createTexture();i.bindTexture(P,Be),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let tt=0;tt<q;tt++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(xe,0,i.RGBA,1,1,Y,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(xe+tt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return Be}let re={};re[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),re[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),re[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),_e(i.DEPTH_TEST),s.setFunc(ta),Q(!1),ee(Wc),_e(i.CULL_FACE),K(oi);function _e(P){c[P]!==!0&&(i.enable(P),c[P]=!0)}function ce(P){c[P]!==!1&&(i.disable(P),c[P]=!1)}function Ve(P,xe){return u[P]!==xe?(i.bindFramebuffer(P,xe),u[P]=xe,P===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=xe),P===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=xe),!0):!1}function Ge(P,xe){let q=h,Y=!1;if(P){q=d.get(xe),q===void 0&&(q=[],d.set(xe,q));let le=P.textures;if(q.length!==le.length||q[0]!==i.COLOR_ATTACHMENT0){for(let Be=0,tt=le.length;Be<tt;Be++)q[Be]=i.COLOR_ATTACHMENT0+Be;q.length=le.length,Y=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,Y=!0);Y&&i.drawBuffers(q)}function ze(P){return f!==P?(i.useProgram(P),f=P,!0):!1}let R={[Pi]:i.FUNC_ADD,[Sh]:i.FUNC_SUBTRACT,[Mh]:i.FUNC_REVERSE_SUBTRACT};R[wh]=i.MIN,R[Eh]=i.MAX;let $={[Th]:i.ZERO,[Ah]:i.ONE,[Ch]:i.SRC_COLOR,[pl]:i.SRC_ALPHA,[Uh]:i.SRC_ALPHA_SATURATE,[Lh]:i.DST_COLOR,[Ph]:i.DST_ALPHA,[Rh]:i.ONE_MINUS_SRC_COLOR,[ml]:i.ONE_MINUS_SRC_ALPHA,[Dh]:i.ONE_MINUS_DST_COLOR,[Ih]:i.ONE_MINUS_DST_ALPHA,[Nh]:i.CONSTANT_COLOR,[Fh]:i.ONE_MINUS_CONSTANT_COLOR,[Oh]:i.CONSTANT_ALPHA,[Bh]:i.ONE_MINUS_CONSTANT_ALPHA};function K(P,xe,q,Y,le,Be,tt,wt,It,lt){if(P===oi){g===!0&&(ce(i.BLEND),g=!1);return}if(g===!1&&(_e(i.BLEND),g=!0),P!==bh){if(P!==x||lt!==D){if((p!==Pi||v!==Pi)&&(i.blendEquation(i.FUNC_ADD),p=Pi,v=Pi),lt)switch(P){case vr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ts:i.blendFunc(i.ONE,i.ONE);break;case qc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case vr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ts:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case qc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}m=null,M=null,b=null,L=null,E.set(0,0,0),A=0,x=P,D=lt}return}le=le||xe,Be=Be||q,tt=tt||Y,(xe!==p||le!==v)&&(i.blendEquationSeparate(R[xe],R[le]),p=xe,v=le),(q!==m||Y!==M||Be!==b||tt!==L)&&(i.blendFuncSeparate($[q],$[Y],$[Be],$[tt]),m=q,M=Y,b=Be,L=tt),(wt.equals(E)===!1||It!==A)&&(i.blendColor(wt.r,wt.g,wt.b,It),E.copy(wt),A=It),x=P,D=!1}function se(P,xe){P.side===yn?ce(i.CULL_FACE):_e(i.CULL_FACE);let q=P.side===jt;xe&&(q=!q),Q(q),P.blending===vr&&P.transparent===!1?K(oi):K(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),s.setFunc(P.depthFunc),s.setTest(P.depthTest),s.setMask(P.depthWrite),r.setMask(P.colorWrite);let Y=P.stencilWrite;a.setTest(Y),Y&&(a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),fe(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?_e(i.SAMPLE_ALPHA_TO_COVERAGE):ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function Q(P){w!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),w=P)}function ee(P){P!==yh?(_e(i.CULL_FACE),P!==y&&(P===Wc?i.cullFace(i.BACK):P===_h?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ce(i.CULL_FACE),y=P}function ge(P){P!==C&&(X&&i.lineWidth(P),C=P)}function fe(P,xe,q){P?(_e(i.POLYGON_OFFSET_FILL),(z!==xe||O!==q)&&(i.polygonOffset(xe,q),z=xe,O=q)):ce(i.POLYGON_OFFSET_FILL)}function He(P){P?_e(i.SCISSOR_TEST):ce(i.SCISSOR_TEST)}function T(P){P===void 0&&(P=i.TEXTURE0+H-1),G!==P&&(i.activeTexture(P),G=P)}function _(P,xe,q){q===void 0&&(G===null?q=i.TEXTURE0+H-1:q=G);let Y=me[q];Y===void 0&&(Y={type:void 0,texture:void 0},me[q]=Y),(Y.type!==P||Y.texture!==xe)&&(G!==q&&(i.activeTexture(q),G=q),i.bindTexture(P,xe||re[P]),Y.type=P,Y.texture=xe)}function k(){let P=me[G];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function J(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Re(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ue(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function he(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function We(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ae(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ee(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ke(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Oe(P){Ye.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Ye.copy(P))}function pe(P){et.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),et.copy(P))}function Ze(P,xe){let q=l.get(xe);q===void 0&&(q=new WeakMap,l.set(xe,q));let Y=q.get(P);Y===void 0&&(Y=i.getUniformBlockIndex(xe,P.name),q.set(P,Y))}function je(P,xe){let Y=l.get(xe).get(P);o.get(xe)!==Y&&(i.uniformBlockBinding(xe,Y,P.__bindingPointIndex),o.set(xe,Y))}function Mt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},G=null,me={},u={},d=new WeakMap,h=[],f=null,g=!1,x=null,p=null,m=null,M=null,v=null,b=null,L=null,E=new $e(0,0,0),A=0,D=!1,w=null,y=null,C=null,z=null,O=null,Ye.set(0,0,i.canvas.width,i.canvas.height),et.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:_e,disable:ce,bindFramebuffer:Ve,drawBuffers:Ge,useProgram:ze,setBlending:K,setMaterial:se,setFlipSided:Q,setCullFace:ee,setLineWidth:ge,setPolygonOffset:fe,setScissorTest:He,activeTexture:T,bindTexture:_,unbindTexture:k,compressedTexImage2D:J,compressedTexImage3D:Z,texImage2D:Ee,texImage3D:Ke,updateUBOMapping:Ze,uniformBlockBinding:je,texStorage2D:We,texStorage3D:ae,texSubImage2D:j,texSubImage3D:Re,compressedTexSubImage2D:ue,compressedTexSubImage3D:he,scissor:Oe,viewport:pe,reset:Mt}}function S0(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ne,u=new WeakMap,d,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,_){return f?new OffscreenCanvas(T,_):is("canvas")}function x(T,_,k){let J=1,Z=He(T);if((Z.width>k||Z.height>k)&&(J=k/Math.max(Z.width,Z.height)),J<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let j=Math.floor(J*Z.width),Re=Math.floor(J*Z.height);d===void 0&&(d=g(j,Re));let ue=_?g(j,Re):d;return ue.width=j,ue.height=Re,ue.getContext("2d").drawImage(T,0,0,j,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+j+"x"+Re+")."),ue}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),T;return T}function p(T){return T.generateMipmaps&&T.minFilter!==Kt&&T.minFilter!==_n}function m(T){i.generateMipmap(T)}function M(T,_,k,J,Z=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let j=_;if(_===i.RED&&(k===i.FLOAT&&(j=i.R32F),k===i.HALF_FLOAT&&(j=i.R16F),k===i.UNSIGNED_BYTE&&(j=i.R8)),_===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(j=i.R8UI),k===i.UNSIGNED_SHORT&&(j=i.R16UI),k===i.UNSIGNED_INT&&(j=i.R32UI),k===i.BYTE&&(j=i.R8I),k===i.SHORT&&(j=i.R16I),k===i.INT&&(j=i.R32I)),_===i.RG&&(k===i.FLOAT&&(j=i.RG32F),k===i.HALF_FLOAT&&(j=i.RG16F),k===i.UNSIGNED_BYTE&&(j=i.RG8)),_===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(j=i.RG8UI),k===i.UNSIGNED_SHORT&&(j=i.RG16UI),k===i.UNSIGNED_INT&&(j=i.RG32UI),k===i.BYTE&&(j=i.RG8I),k===i.SHORT&&(j=i.RG16I),k===i.INT&&(j=i.RG32I)),_===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),_===i.RGBA){let Re=Z?ra:at.getTransfer(J);k===i.FLOAT&&(j=i.RGBA32F),k===i.HALF_FLOAT&&(j=i.RGBA16F),k===i.UNSIGNED_BYTE&&(j=Re===gt?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function v(T,_){let k;return T?_===null||_===wr||_===Er?k=i.DEPTH24_STENCIL8:_===Xn?k=i.DEPTH32F_STENCIL8:_===na&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===wr||_===Er?k=i.DEPTH_COMPONENT24:_===Xn?k=i.DEPTH_COMPONENT32F:_===na&&(k=i.DEPTH_COMPONENT16),k}function b(T,_){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==Kt&&T.minFilter!==_n?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function L(T){let _=T.target;_.removeEventListener("dispose",L),A(_),_.isVideoTexture&&u.delete(_)}function E(T){let _=T.target;_.removeEventListener("dispose",E),w(_)}function A(T){let _=n.get(T);if(_.__webglInit===void 0)return;let k=T.source,J=h.get(k);if(J){let Z=J[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&D(T),Object.keys(J).length===0&&h.delete(k)}n.remove(T)}function D(T){let _=n.get(T);i.deleteTexture(_.__webglTexture);let k=T.source,J=h.get(k);delete J[_.__cacheKey],a.memory.textures--}function w(T){let _=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(_.__webglFramebuffer[J]))for(let Z=0;Z<_.__webglFramebuffer[J].length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[J][Z]);else i.deleteFramebuffer(_.__webglFramebuffer[J]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[J])}else{if(Array.isArray(_.__webglFramebuffer))for(let J=0;J<_.__webglFramebuffer.length;J++)i.deleteFramebuffer(_.__webglFramebuffer[J]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let J=0;J<_.__webglColorRenderbuffer.length;J++)_.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[J]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let k=T.textures;for(let J=0,Z=k.length;J<Z;J++){let j=n.get(k[J]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(k[J])}n.remove(T)}let y=0;function C(){y=0}function z(){let T=y;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),y+=1,T}function O(T){let _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function H(T,_){let k=n.get(T);if(T.isVideoTexture&&ge(T),T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){let J=T.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{et(k,T,_);return}}t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+_)}function X(T,_){let k=n.get(T);if(T.version>0&&k.__version!==T.version){et(k,T,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+_)}function V(T,_){let k=n.get(T);if(T.version>0&&k.__version!==T.version){et(k,T,_);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+_)}function te(T,_){let k=n.get(T);if(T.version>0&&k.__version!==T.version){W(k,T,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+_)}let G={[Ni]:i.REPEAT,[Li]:i.CLAMP_TO_EDGE,[vl]:i.MIRRORED_REPEAT},me={[Kt]:i.NEAREST,[ef]:i.NEAREST_MIPMAP_NEAREST,[Es]:i.NEAREST_MIPMAP_LINEAR,[_n]:i.LINEAR,[Lo]:i.LINEAR_MIPMAP_NEAREST,[Di]:i.LINEAR_MIPMAP_LINEAR},be={[pf]:i.NEVER,[_f]:i.ALWAYS,[mf]:i.LESS,[Dd]:i.LEQUAL,[gf]:i.EQUAL,[yf]:i.GEQUAL,[xf]:i.GREATER,[vf]:i.NOTEQUAL};function ye(T,_){if(_.type===Xn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===_n||_.magFilter===Lo||_.magFilter===Es||_.magFilter===Di||_.minFilter===_n||_.minFilter===Lo||_.minFilter===Es||_.minFilter===Di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,G[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,G[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,G[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,me[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,me[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,be[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Kt||_.minFilter!==Es&&_.minFilter!==Di||_.type===Xn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Ye(T,_){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",L));let J=_.source,Z=h.get(J);Z===void 0&&(Z={},h.set(J,Z));let j=O(_);if(j!==T.__cacheKey){Z[j]===void 0&&(Z[j]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),Z[j].usedTimes++;let Re=Z[T.__cacheKey];Re!==void 0&&(Z[T.__cacheKey].usedTimes--,Re.usedTimes===0&&D(_)),T.__cacheKey=j,T.__webglTexture=Z[j].texture}return k}function et(T,_,k){let J=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(J=i.TEXTURE_3D);let Z=Ye(T,_),j=_.source;t.bindTexture(J,T.__webglTexture,i.TEXTURE0+k);let Re=n.get(j);if(j.version!==Re.__version||Z===!0){t.activeTexture(i.TEXTURE0+k);let ue=at.getPrimaries(at.workingColorSpace),he=_.colorSpace===ai?null:at.getPrimaries(_.colorSpace),We=_.colorSpace===ai||ue===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let ae=x(_.image,!1,r.maxTextureSize);ae=fe(_,ae);let Ee=s.convert(_.format,_.colorSpace),Ke=s.convert(_.type),Oe=M(_.internalFormat,Ee,Ke,_.colorSpace,_.isVideoTexture);ye(J,_);let pe,Ze=_.mipmaps,je=_.isVideoTexture!==!0,Mt=Re.__version===void 0||Z===!0,P=j.dataReady,xe=b(_,ae);if(_.isDepthTexture)Oe=v(_.format===Tr,_.type),Mt&&(je?t.texStorage2D(i.TEXTURE_2D,1,Oe,ae.width,ae.height):t.texImage2D(i.TEXTURE_2D,0,Oe,ae.width,ae.height,0,Ee,Ke,null));else if(_.isDataTexture)if(Ze.length>0){je&&Mt&&t.texStorage2D(i.TEXTURE_2D,xe,Oe,Ze[0].width,Ze[0].height);for(let q=0,Y=Ze.length;q<Y;q++)pe=Ze[q],je?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,pe.width,pe.height,Ee,Ke,pe.data):t.texImage2D(i.TEXTURE_2D,q,Oe,pe.width,pe.height,0,Ee,Ke,pe.data);_.generateMipmaps=!1}else je?(Mt&&t.texStorage2D(i.TEXTURE_2D,xe,Oe,ae.width,ae.height),P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ae.width,ae.height,Ee,Ke,ae.data)):t.texImage2D(i.TEXTURE_2D,0,Oe,ae.width,ae.height,0,Ee,Ke,ae.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){je&&Mt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,Oe,Ze[0].width,Ze[0].height,ae.depth);for(let q=0,Y=Ze.length;q<Y;q++)if(pe=Ze[q],_.format!==In)if(Ee!==null)if(je){if(P)if(_.layerUpdates.size>0){for(let le of _.layerUpdates){let Be=pe.width*pe.height;t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,le,pe.width,pe.height,1,Ee,pe.data.slice(Be*le,Be*(le+1)),0,0)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,pe.width,pe.height,ae.depth,Ee,pe.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Oe,pe.width,pe.height,ae.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?P&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,pe.width,pe.height,ae.depth,Ee,Ke,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,Oe,pe.width,pe.height,ae.depth,0,Ee,Ke,pe.data)}else{je&&Mt&&t.texStorage2D(i.TEXTURE_2D,xe,Oe,Ze[0].width,Ze[0].height);for(let q=0,Y=Ze.length;q<Y;q++)pe=Ze[q],_.format!==In?Ee!==null?je?P&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,pe.width,pe.height,Ee,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,q,Oe,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,pe.width,pe.height,Ee,Ke,pe.data):t.texImage2D(i.TEXTURE_2D,q,Oe,pe.width,pe.height,0,Ee,Ke,pe.data)}else if(_.isDataArrayTexture)if(je){if(Mt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,Oe,ae.width,ae.height,ae.depth),P)if(_.layerUpdates.size>0){let q;switch(Ke){case i.UNSIGNED_BYTE:switch(Ee){case i.ALPHA:q=1;break;case i.LUMINANCE:q=1;break;case i.LUMINANCE_ALPHA:q=2;break;case i.RGB:q=3;break;case i.RGBA:q=4;break;default:throw new Error(`Unknown texel size for format ${Ee}.`)}break;case i.UNSIGNED_SHORT_4_4_4_4:case i.UNSIGNED_SHORT_5_5_5_1:case i.UNSIGNED_SHORT_5_6_5:q=1;break;default:throw new Error(`Unknown texel size for type ${Ke}.`)}let Y=ae.width*ae.height*q;for(let le of _.layerUpdates)t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,le,ae.width,ae.height,1,Ee,Ke,ae.data.slice(Y*le,Y*(le+1)));_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,Ee,Ke,ae.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Oe,ae.width,ae.height,ae.depth,0,Ee,Ke,ae.data);else if(_.isData3DTexture)je?(Mt&&t.texStorage3D(i.TEXTURE_3D,xe,Oe,ae.width,ae.height,ae.depth),P&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,Ee,Ke,ae.data)):t.texImage3D(i.TEXTURE_3D,0,Oe,ae.width,ae.height,ae.depth,0,Ee,Ke,ae.data);else if(_.isFramebufferTexture){if(Mt)if(je)t.texStorage2D(i.TEXTURE_2D,xe,Oe,ae.width,ae.height);else{let q=ae.width,Y=ae.height;for(let le=0;le<xe;le++)t.texImage2D(i.TEXTURE_2D,le,Oe,q,Y,0,Ee,Ke,null),q>>=1,Y>>=1}}else if(Ze.length>0){if(je&&Mt){let q=He(Ze[0]);t.texStorage2D(i.TEXTURE_2D,xe,Oe,q.width,q.height)}for(let q=0,Y=Ze.length;q<Y;q++)pe=Ze[q],je?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,Ee,Ke,pe):t.texImage2D(i.TEXTURE_2D,q,Oe,Ee,Ke,pe);_.generateMipmaps=!1}else if(je){if(Mt){let q=He(ae);t.texStorage2D(i.TEXTURE_2D,xe,Oe,q.width,q.height)}P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ee,Ke,ae)}else t.texImage2D(i.TEXTURE_2D,0,Oe,Ee,Ke,ae);p(_)&&m(J),Re.__version=j.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function W(T,_,k){if(_.image.length!==6)return;let J=Ye(T,_),Z=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+k);let j=n.get(Z);if(Z.version!==j.__version||J===!0){t.activeTexture(i.TEXTURE0+k);let Re=at.getPrimaries(at.workingColorSpace),ue=_.colorSpace===ai?null:at.getPrimaries(_.colorSpace),he=_.colorSpace===ai||Re===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);let We=_.isCompressedTexture||_.image[0].isCompressedTexture,ae=_.image[0]&&_.image[0].isDataTexture,Ee=[];for(let Y=0;Y<6;Y++)!We&&!ae?Ee[Y]=x(_.image[Y],!0,r.maxCubemapSize):Ee[Y]=ae?_.image[Y].image:_.image[Y],Ee[Y]=fe(_,Ee[Y]);let Ke=Ee[0],Oe=s.convert(_.format,_.colorSpace),pe=s.convert(_.type),Ze=M(_.internalFormat,Oe,pe,_.colorSpace),je=_.isVideoTexture!==!0,Mt=j.__version===void 0||J===!0,P=Z.dataReady,xe=b(_,Ke);ye(i.TEXTURE_CUBE_MAP,_);let q;if(We){je&&Mt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,Ze,Ke.width,Ke.height);for(let Y=0;Y<6;Y++){q=Ee[Y].mipmaps;for(let le=0;le<q.length;le++){let Be=q[le];_.format!==In?Oe!==null?je?P&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le,0,0,Be.width,Be.height,Oe,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le,Ze,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):je?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le,0,0,Be.width,Be.height,Oe,pe,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le,Ze,Be.width,Be.height,0,Oe,pe,Be.data)}}}else{if(q=_.mipmaps,je&&Mt){q.length>0&&xe++;let Y=He(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,Ze,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(ae){je?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ee[Y].width,Ee[Y].height,Oe,pe,Ee[Y].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ze,Ee[Y].width,Ee[Y].height,0,Oe,pe,Ee[Y].data);for(let le=0;le<q.length;le++){let tt=q[le].image[Y].image;je?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le+1,0,0,tt.width,tt.height,Oe,pe,tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le+1,Ze,tt.width,tt.height,0,Oe,pe,tt.data)}}else{je?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Oe,pe,Ee[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ze,Oe,pe,Ee[Y]);for(let le=0;le<q.length;le++){let Be=q[le];je?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le+1,0,0,Oe,pe,Be.image[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le+1,Ze,Oe,pe,Be.image[Y])}}}p(_)&&m(i.TEXTURE_CUBE_MAP),j.__version=Z.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function re(T,_,k,J,Z,j){let Re=s.convert(k.format,k.colorSpace),ue=s.convert(k.type),he=M(k.internalFormat,Re,ue,k.colorSpace);if(!n.get(_).__hasExternalTextures){let ae=Math.max(1,_.width>>j),Ee=Math.max(1,_.height>>j);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,j,he,ae,Ee,_.depth,0,Re,ue,null):t.texImage2D(Z,j,he,ae,Ee,0,Re,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),ee(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,Z,n.get(k).__webglTexture,0,Q(_)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,Z,n.get(k).__webglTexture,j),t.bindFramebuffer(i.FRAMEBUFFER,null)}function _e(T,_,k){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){let J=_.depthTexture,Z=J&&J.isDepthTexture?J.type:null,j=v(_.stencilBuffer,Z),Re=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=Q(_);ee(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ue,j,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,j,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,j,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Re,i.RENDERBUFFER,T)}else{let J=_.textures;for(let Z=0;Z<J.length;Z++){let j=J[Z],Re=s.convert(j.format,j.colorSpace),ue=s.convert(j.type),he=M(j.internalFormat,Re,ue,j.colorSpace),We=Q(_);k&&ee(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,We,he,_.width,_.height):ee(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,We,he,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,he,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ce(T,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),H(_.depthTexture,0);let J=n.get(_.depthTexture).__webglTexture,Z=Q(_);if(_.depthTexture.format===yr)ee(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(_.depthTexture.format===Tr)ee(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Ve(T){let _=n.get(T),k=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!_.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");ce(_.__webglFramebuffer,T)}else if(k){_.__webglDepthbuffer=[];for(let J=0;J<6;J++)t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[J]),_.__webglDepthbuffer[J]=i.createRenderbuffer(),_e(_.__webglDepthbuffer[J],T,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=i.createRenderbuffer(),_e(_.__webglDepthbuffer,T,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(T,_,k){let J=n.get(T);_!==void 0&&re(J.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Ve(T)}function ze(T){let _=T.texture,k=n.get(T),J=n.get(_);T.addEventListener("dispose",E);let Z=T.textures,j=T.isWebGLCubeRenderTarget===!0,Re=Z.length>1;if(Re||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=_.version,a.memory.textures++),j){k.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[ue]=[];for(let he=0;he<_.mipmaps.length;he++)k.__webglFramebuffer[ue][he]=i.createFramebuffer()}else k.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let ue=0;ue<_.mipmaps.length;ue++)k.__webglFramebuffer[ue]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Re)for(let ue=0,he=Z.length;ue<he;ue++){let We=n.get(Z[ue]);We.__webglTexture===void 0&&(We.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&ee(T)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ue=0;ue<Z.length;ue++){let he=Z[ue];k.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[ue]);let We=s.convert(he.format,he.colorSpace),ae=s.convert(he.type),Ee=M(he.internalFormat,We,ae,he.colorSpace,T.isXRRenderTarget===!0),Ke=Q(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ke,Ee,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,k.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),_e(k.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),ye(i.TEXTURE_CUBE_MAP,_);for(let ue=0;ue<6;ue++)if(_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)re(k.__webglFramebuffer[ue][he],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,he);else re(k.__webglFramebuffer[ue],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);p(_)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let ue=0,he=Z.length;ue<he;ue++){let We=Z[ue],ae=n.get(We);t.bindTexture(i.TEXTURE_2D,ae.__webglTexture),ye(i.TEXTURE_2D,We),re(k.__webglFramebuffer,T,We,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,0),p(We)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ue=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,J.__webglTexture),ye(ue,_),_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)re(k.__webglFramebuffer[he],T,_,i.COLOR_ATTACHMENT0,ue,he);else re(k.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,ue,0);p(_)&&m(ue),t.unbindTexture()}T.depthBuffer&&Ve(T)}function R(T){let _=T.textures;for(let k=0,J=_.length;k<J;k++){let Z=_[k];if(p(Z)){let j=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Re=n.get(Z).__webglTexture;t.bindTexture(j,Re),m(j),t.unbindTexture()}}}let $=[],K=[];function se(T){if(T.samples>0){if(ee(T)===!1){let _=T.textures,k=T.width,J=T.height,Z=i.COLOR_BUFFER_BIT,j=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=n.get(T),ue=_.length>1;if(ue)for(let he=0;he<_.length;he++)t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let he=0;he<_.length;he++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Re.__webglColorRenderbuffer[he]);let We=n.get(_[he]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,We,0)}i.blitFramebuffer(0,0,k,J,0,0,k,J,Z,i.NEAREST),l===!0&&($.length=0,K.length=0,$.push(i.COLOR_ATTACHMENT0+he),T.depthBuffer&&T.resolveDepthBuffer===!1&&($.push(j),K.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,K)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,$))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let he=0;he<_.length;he++){t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,Re.__webglColorRenderbuffer[he]);let We=n.get(_[he]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,We,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Q(T){return Math.min(r.maxSamples,T.samples)}function ee(T){let _=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ge(T){let _=a.render.frame;u.get(T)!==_&&(u.set(T,_),T.update())}function fe(T,_){let k=T.colorSpace,J=T.format,Z=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||k!==gi&&k!==ai&&(at.getTransfer(k)===gt?(J!==In||Z!==di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),_}function He(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=C,this.setTexture2D=H,this.setTexture2DArray=X,this.setTexture3D=V,this.setTextureCube=te,this.rebindTextures=Ge,this.setupRenderTarget=ze,this.updateRenderTargetMipmap=R,this.updateMultisampleRenderTarget=se,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=re,this.useMultisampledRTT=ee}function M0(i,e){function t(n,r=ai){let s,a=at.getTransfer(r);if(n===di)return i.UNSIGNED_BYTE;if(n===Td)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ad)return i.UNSIGNED_SHORT_5_5_5_1;if(n===rf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===tf)return i.BYTE;if(n===nf)return i.SHORT;if(n===na)return i.UNSIGNED_SHORT;if(n===Ed)return i.INT;if(n===wr)return i.UNSIGNED_INT;if(n===Xn)return i.FLOAT;if(n===Oa)return i.HALF_FLOAT;if(n===sf)return i.ALPHA;if(n===af)return i.RGB;if(n===In)return i.RGBA;if(n===of)return i.LUMINANCE;if(n===lf)return i.LUMINANCE_ALPHA;if(n===yr)return i.DEPTH_COMPONENT;if(n===Tr)return i.DEPTH_STENCIL;if(n===Cd)return i.RED;if(n===Rd)return i.RED_INTEGER;if(n===cf)return i.RG;if(n===Pd)return i.RG_INTEGER;if(n===Id)return i.RGBA_INTEGER;if(n===Do||n===Uo||n===No||n===Fo)if(a===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Do)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Uo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===No)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Do)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Uo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===No)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$c||n===Yc||n===Zc||n===Jc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===$c)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Yc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Jc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Kc||n===jc||n===Qc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Kc||n===jc)return a===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Qc)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===eu||n===tu||n===nu||n===iu||n===ru||n===su||n===au||n===ou||n===lu||n===cu||n===uu||n===du||n===hu||n===fu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===eu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===tu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===nu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===iu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ru)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===su)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===au)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ou)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===lu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===cu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===uu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===du)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===hu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===fu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Oo||n===pu||n===mu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Oo)return a===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===pu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===mu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===uf||n===gu||n===xu||n===vu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Oo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===gu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===xu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===vu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Er?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Nl=class extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},ke=class extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}},w0={type:"move"},jr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let p=t.getJointPose(x,n),m=this._getHandJoint(c,x);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(w0)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},E0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T0=`
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

}`,Fl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let r=new Yt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Nn({vertexShader:E0,fragmentShader:T0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $t(new Kn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}},Ol=class extends hi{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,g=null,x=new Fl,p=t.getContextAttributes(),m=null,M=null,v=[],b=[],L=new ne,E=null,A=new Xt;A.layers.enable(1),A.viewport=new Ut;let D=new Xt;D.layers.enable(2),D.viewport=new Ut;let w=[A,D],y=new Nl;y.layers.enable(1),y.layers.enable(2);let C=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let re=v[W];return re===void 0&&(re=new jr,v[W]=re),re.getTargetRaySpace()},this.getControllerGrip=function(W){let re=v[W];return re===void 0&&(re=new jr,v[W]=re),re.getGripSpace()},this.getHand=function(W){let re=v[W];return re===void 0&&(re=new jr,v[W]=re),re.getHandSpace()};function O(W){let re=b.indexOf(W.inputSource);if(re===-1)return;let _e=v[re];_e!==void 0&&(_e.update(W.inputSource,W.frame,c||a),_e.dispatchEvent({type:W.type,data:W.inputSource}))}function H(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",X);for(let W=0;W<v.length;W++){let re=b[W];re!==null&&(b[W]=null,v[W].disconnect(re))}C=null,z=null,x.reset(),e.setRenderTarget(m),f=null,h=null,d=null,r=null,M=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",H),r.addEventListener("inputsourceschange",X),p.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(L),r.renderState.layers===void 0){let re={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,re),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Yn(f.framebufferWidth,f.framebufferHeight,{format:In,type:di,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let re=null,_e=null,ce=null;p.depth&&(ce=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=p.stencil?Tr:yr,_e=p.stencil?Er:wr);let Ve={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};d=new XRWebGLBinding(r,t),h=d.createProjectionLayer(Ve),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new Yn(h.textureWidth,h.textureHeight,{format:In,type:di,depthTexture:new xa(h.textureWidth,h.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),et.setContext(r),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function X(W){for(let re=0;re<W.removed.length;re++){let _e=W.removed[re],ce=b.indexOf(_e);ce>=0&&(b[ce]=null,v[ce].disconnect(_e))}for(let re=0;re<W.added.length;re++){let _e=W.added[re],ce=b.indexOf(_e);if(ce===-1){for(let Ge=0;Ge<v.length;Ge++)if(Ge>=b.length){b.push(_e),ce=Ge;break}else if(b[Ge]===null){b[Ge]=_e,ce=Ge;break}if(ce===-1)break}let Ve=v[ce];Ve&&Ve.connect(_e)}}let V=new I,te=new I;function G(W,re,_e){V.setFromMatrixPosition(re.matrixWorld),te.setFromMatrixPosition(_e.matrixWorld);let ce=V.distanceTo(te),Ve=re.projectionMatrix.elements,Ge=_e.projectionMatrix.elements,ze=Ve[14]/(Ve[10]-1),R=Ve[14]/(Ve[10]+1),$=(Ve[9]+1)/Ve[5],K=(Ve[9]-1)/Ve[5],se=(Ve[8]-1)/Ve[0],Q=(Ge[8]+1)/Ge[0],ee=ze*se,ge=ze*Q,fe=ce/(-se+Q),He=fe*-se;re.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(He),W.translateZ(fe),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();let T=ze+fe,_=R+fe,k=ee-He,J=ge+(ce-He),Z=$*R/_*T,j=K*R/_*T;W.projectionMatrix.makePerspective(k,J,Z,j,T,_),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function me(W,re){re===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(re.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;x.texture!==null&&(W.near=x.depthNear,W.far=x.depthFar),y.near=D.near=A.near=W.near,y.far=D.far=A.far=W.far,(C!==y.near||z!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,z=y.far,A.near=C,A.far=z,D.near=C,D.far=z,A.updateProjectionMatrix(),D.updateProjectionMatrix(),W.updateProjectionMatrix());let re=W.parent,_e=y.cameras;me(y,re);for(let ce=0;ce<_e.length;ce++)me(_e[ce],re);_e.length===2?G(y,A,D):y.projectionMatrix.copy(A.projectionMatrix),be(W,y,re)};function be(W,re,_e){_e===null?W.matrix.copy(re.matrixWorld):(W.matrix.copy(_e.matrixWorld),W.matrix.invert(),W.matrix.multiply(re.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(re.projectionMatrix),W.projectionMatrixInverse.copy(re.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=ns*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(W){l=W,h!==null&&(h.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let ye=null;function Ye(W,re){if(u=re.getViewerPose(c||a),g=re,u!==null){let _e=u.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let ce=!1;_e.length!==y.cameras.length&&(y.cameras.length=0,ce=!0);for(let Ge=0;Ge<_e.length;Ge++){let ze=_e[Ge],R=null;if(f!==null)R=f.getViewport(ze);else{let K=d.getViewSubImage(h,ze);R=K.viewport,Ge===0&&(e.setRenderTargetTextures(M,K.colorTexture,h.ignoreDepthValues?void 0:K.depthStencilTexture),e.setRenderTarget(M))}let $=w[Ge];$===void 0&&($=new Xt,$.layers.enable(Ge),$.viewport=new Ut,w[Ge]=$),$.matrix.fromArray(ze.transform.matrix),$.matrix.decompose($.position,$.quaternion,$.scale),$.projectionMatrix.fromArray(ze.projectionMatrix),$.projectionMatrixInverse.copy($.projectionMatrix).invert(),$.viewport.set(R.x,R.y,R.width,R.height),Ge===0&&(y.matrix.copy($.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ce===!0&&y.cameras.push($)}let Ve=r.enabledFeatures;if(Ve&&Ve.includes("depth-sensing")){let Ge=d.getDepthInformation(_e[0]);Ge&&Ge.isValid&&Ge.texture&&x.init(e,Ge,r.renderState)}}for(let _e=0;_e<v.length;_e++){let ce=b[_e],Ve=v[_e];ce!==null&&Ve!==void 0&&Ve.update(ce,re,c||a)}ye&&ye(W,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),g=null}let et=new Od;et.setAnimationLoop(Ye),this.setAnimationLoop=function(W){ye=W},this.dispose=function(){}}},Ci=new Dn,A0=new xt;function C0(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Fd(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,M,v,b){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),h(p,m),m.isMeshPhysicalMaterial&&f(p,m,b)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),x(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,M,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===jt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===jt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let M=e.get(m),v=M.envMap,b=M.envMapRotation;v&&(p.envMap.value=v,Ci.copy(b),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),p.envMapRotation.value.setFromMatrix4(A0.makeRotationFromEuler(Ci)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=v*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===jt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function x(p,m){let M=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function R0(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,v){let b=v.program;n.uniformBlockBinding(M,b)}function c(M,v){let b=r[M.id];b===void 0&&(g(M),b=u(M),r[M.id]=b,M.addEventListener("dispose",p));let L=v.program;n.updateUBOMapping(M,L);let E=e.render.frame;s[M.id]!==E&&(h(M),s[M.id]=E)}function u(M){let v=d();M.__bindingPointIndex=v;let b=i.createBuffer(),L=M.__size,E=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,L,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,b),b}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let v=r[M.id],b=M.uniforms,L=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let E=0,A=b.length;E<A;E++){let D=Array.isArray(b[E])?b[E]:[b[E]];for(let w=0,y=D.length;w<y;w++){let C=D[w];if(f(C,E,w,L)===!0){let z=C.__offset,O=Array.isArray(C.value)?C.value:[C.value],H=0;for(let X=0;X<O.length;X++){let V=O[X],te=x(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,z+H,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,H),H+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,v,b,L){let E=M.value,A=v+"_"+b;if(L[A]===void 0)return typeof E=="number"||typeof E=="boolean"?L[A]=E:L[A]=E.clone(),!0;{let D=L[A];if(typeof E=="number"||typeof E=="boolean"){if(D!==E)return L[A]=E,!0}else if(D.equals(E)===!1)return D.copy(E),!0}return!1}function g(M){let v=M.uniforms,b=0,L=16;for(let A=0,D=v.length;A<D;A++){let w=Array.isArray(v[A])?v[A]:[v[A]];for(let y=0,C=w.length;y<C;y++){let z=w[y],O=Array.isArray(z.value)?z.value:[z.value];for(let H=0,X=O.length;H<X;H++){let V=O[H],te=x(V),G=b%L;G!==0&&L-G<te.boundary&&(b+=L-G),z.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=b,b+=te.storage}}}let E=b%L;return E>0&&(b+=L-E),M.__size=b,M.__cache={},this}function x(M){let v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function p(M){let v=M.target;v.removeEventListener("dispose",p);let b=a.indexOf(v.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function m(){for(let M in r)i.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:c,dispose:m}}var va=class{constructor(e={}){let{canvas:t=Of(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=a;let f=new Uint32Array(4),g=new Int32Array(4),x=null,p=null,m=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Nt,this.toneMapping=li,this.toneMappingExposure=1;let v=this,b=!1,L=0,E=0,A=null,D=-1,w=null,y=new Ut,C=new Ut,z=null,O=new $e(0),H=0,X=t.width,V=t.height,te=1,G=null,me=null,be=new Ut(0,0,X,V),ye=new Ut(0,0,X,V),Ye=!1,et=new rs,W=!1,re=!1,_e=new xt,ce=new I,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ge=!1;function ze(){return A===null?te:1}let R=n;function $(S,U){return t.getContext(S,U)}try{let S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r165"),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",q,!1),t.addEventListener("webglcontextcreationerror",Y,!1),R===null){let U="webgl2";if(R=$(U,S),R===null)throw $(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let K,se,Q,ee,ge,fe,He,T,_,k,J,Z,j,Re,ue,he,We,ae,Ee,Ke,Oe,pe,Ze,je;function Mt(){K=new Yg(R),K.init(),pe=new M0(R,K),se=new Vg(R,K,e,pe),Q=new b0(R),ee=new Kg(R),ge=new c0,fe=new S0(R,K,Q,ge,se,pe,ee),He=new Wg(v),T=new $g(v),_=new rp(R),Ze=new zg(R,_),k=new Zg(R,_,ee,Ze),J=new Qg(R,k,_,ee),Ee=new jg(R,se,fe),he=new Gg(ge),Z=new l0(v,He,T,K,se,Ze,he),j=new C0(v,ge),Re=new d0,ue=new x0(K),ae=new kg(v,He,T,Q,J,h,l),We=new _0(v,J,se),je=new R0(R,ee,se,Q),Ke=new Hg(R,K,ee),Oe=new Jg(R,K,ee),ee.programs=Z.programs,v.capabilities=se,v.extensions=K,v.properties=ge,v.renderLists=Re,v.shadowMap=We,v.state=Q,v.info=ee}Mt();let P=new Ol(v,R);this.xr=P,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let S=K.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=K.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(S){S!==void 0&&(te=S,this.setSize(X,V,!1))},this.getSize=function(S){return S.set(X,V)},this.setSize=function(S,U,F=!0){if(P.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=S,V=U,t.width=Math.floor(S*te),t.height=Math.floor(U*te),F===!0&&(t.style.width=S+"px",t.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(X*te,V*te).floor()},this.setDrawingBufferSize=function(S,U,F){X=S,V=U,te=F,t.width=Math.floor(S*F),t.height=Math.floor(U*F),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(y)},this.getViewport=function(S){return S.copy(be)},this.setViewport=function(S,U,F,B){S.isVector4?be.set(S.x,S.y,S.z,S.w):be.set(S,U,F,B),Q.viewport(y.copy(be).multiplyScalar(te).round())},this.getScissor=function(S){return S.copy(ye)},this.setScissor=function(S,U,F,B){S.isVector4?ye.set(S.x,S.y,S.z,S.w):ye.set(S,U,F,B),Q.scissor(C.copy(ye).multiplyScalar(te).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(S){Q.setScissorTest(Ye=S)},this.setOpaqueSort=function(S){G=S},this.setTransparentSort=function(S){me=S},this.getClearColor=function(S){return S.copy(ae.getClearColor())},this.setClearColor=function(){ae.setClearColor.apply(ae,arguments)},this.getClearAlpha=function(){return ae.getClearAlpha()},this.setClearAlpha=function(){ae.setClearAlpha.apply(ae,arguments)},this.clear=function(S=!0,U=!0,F=!0){let B=0;if(S){let N=!1;if(A!==null){let oe=A.texture.format;N=oe===Id||oe===Pd||oe===Rd}if(N){let oe=A.texture.type,ve=oe===di||oe===wr||oe===na||oe===Er||oe===Td||oe===Ad,Me=ae.getClearColor(),Te=ae.getClearAlpha(),Ne=Me.r,Fe=Me.g,Le=Me.b;ve?(f[0]=Ne,f[1]=Fe,f[2]=Le,f[3]=Te,R.clearBufferuiv(R.COLOR,0,f)):(g[0]=Ne,g[1]=Fe,g[2]=Le,g[3]=Te,R.clearBufferiv(R.COLOR,0,g))}else B|=R.COLOR_BUFFER_BIT}U&&(B|=R.DEPTH_BUFFER_BIT),F&&(B|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",q,!1),t.removeEventListener("webglcontextcreationerror",Y,!1),Re.dispose(),ue.dispose(),ge.dispose(),He.dispose(),T.dispose(),J.dispose(),Ze.dispose(),je.dispose(),Z.dispose(),P.dispose(),P.removeEventListener("sessionstart",Cn),P.removeEventListener("sessionend",Rn),bi.stop()};function xe(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function q(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let S=ee.autoReset,U=We.enabled,F=We.autoUpdate,B=We.needsUpdate,N=We.type;Mt(),ee.autoReset=S,We.enabled=U,We.autoUpdate=F,We.needsUpdate=B,We.type=N}function Y(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function le(S){let U=S.target;U.removeEventListener("dispose",le),Be(U)}function Be(S){tt(S),ge.remove(S)}function tt(S){let U=ge.get(S).programs;U!==void 0&&(U.forEach(function(F){Z.releaseProgram(F)}),S.isShaderMaterial&&Z.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,F,B,N,oe){U===null&&(U=Ve);let ve=N.isMesh&&N.matrixWorld.determinant()<0,Me=ph(S,U,F,B,N);Q.setMaterial(B,ve);let Te=F.index,Ne=1;if(B.wireframe===!0){if(Te=k.getWireframeAttribute(F),Te===void 0)return;Ne=2}let Fe=F.drawRange,Le=F.attributes.position,nt=Fe.start*Ne,bt=(Fe.start+Fe.count)*Ne;oe!==null&&(nt=Math.max(nt,oe.start*Ne),bt=Math.min(bt,(oe.start+oe.count)*Ne)),Te!==null?(nt=Math.max(nt,0),bt=Math.min(bt,Te.count)):Le!=null&&(nt=Math.max(nt,0),bt=Math.min(bt,Le.count));let St=bt-nt;if(St<0||St===1/0)return;Ze.setup(N,B,Me,F,Te);let nn,rt=Ke;if(Te!==null&&(nn=_.get(Te),rt=Oe,rt.setIndex(nn)),N.isMesh)B.wireframe===!0?(Q.setLineWidth(B.wireframeLinewidth*ze()),rt.setMode(R.LINES)):rt.setMode(R.TRIANGLES);else if(N.isLine){let Pe=B.linewidth;Pe===void 0&&(Pe=1),Q.setLineWidth(Pe*ze()),N.isLineSegments?rt.setMode(R.LINES):N.isLineLoop?rt.setMode(R.LINE_LOOP):rt.setMode(R.LINE_STRIP)}else N.isPoints?rt.setMode(R.POINTS):N.isSprite&&rt.setMode(R.TRIANGLES);if(N.isBatchedMesh)N._multiDrawInstances!==null?rt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances):rt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else if(N.isInstancedMesh)rt.renderInstances(nt,St,N.count);else if(F.isInstancedBufferGeometry){let Pe=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Gt=Math.min(F.instanceCount,Pe);rt.renderInstances(nt,St,Gt)}else rt.render(nt,St)};function wt(S,U,F){S.transparent===!0&&S.side===yn&&S.forceSinglePass===!1?(S.side=jt,S.needsUpdate=!0,bs(S,U,F),S.side=ui,S.needsUpdate=!0,bs(S,U,F),S.side=yn):bs(S,U,F)}this.compile=function(S,U,F=null){F===null&&(F=S),p=ue.get(F),p.init(U),M.push(p),F.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),S!==F&&S.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();let B=new Set;return S.traverse(function(N){let oe=N.material;if(oe)if(Array.isArray(oe))for(let ve=0;ve<oe.length;ve++){let Me=oe[ve];wt(Me,F,N),B.add(Me)}else wt(oe,F,N),B.add(oe)}),M.pop(),p=null,B},this.compileAsync=function(S,U,F=null){let B=this.compile(S,U,F);return new Promise(N=>{function oe(){if(B.forEach(function(ve){ge.get(ve).currentProgram.isReady()&&B.delete(ve)}),B.size===0){N(S);return}setTimeout(oe,10)}K.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let It=null;function lt(S){It&&It(S)}function Cn(){bi.stop()}function Rn(){bi.start()}let bi=new Od;bi.setAnimationLoop(lt),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(S){It=S,P.setAnimationLoop(S),S===null?bi.stop():bi.start()},P.addEventListener("sessionstart",Cn),P.addEventListener("sessionend",Rn),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),P.enabled===!0&&P.isPresenting===!0&&(P.cameraAutoUpdate===!0&&P.updateCamera(U),U=P.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,U,A),p=ue.get(S,M.length),p.init(U),M.push(p),_e.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),et.setFromProjectionMatrix(_e),re=this.localClippingEnabled,W=he.init(this.clippingPlanes,re),x=Re.get(S,m.length),x.init(),m.push(x),P.enabled===!0&&P.isPresenting===!0){let oe=v.xr.getDepthSensingMesh();oe!==null&&Ja(oe,U,-1/0,v.sortObjects)}Ja(S,U,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(G,me),Ge=P.enabled===!1||P.isPresenting===!1||P.hasDepthSensing()===!1,Ge&&ae.addToRenderList(x,S),this.info.render.frame++,W===!0&&he.beginShadows();let F=p.state.shadowsArray;We.render(F,S,U),W===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();let B=x.opaque,N=x.transmissive;if(p.setupLights(),U.isArrayCamera){let oe=U.cameras;if(N.length>0)for(let ve=0,Me=oe.length;ve<Me;ve++){let Te=oe[ve];Lc(B,N,S,Te)}Ge&&ae.render(S);for(let ve=0,Me=oe.length;ve<Me;ve++){let Te=oe[ve];Ic(x,S,Te,Te.viewport)}}else N.length>0&&Lc(B,N,S,U),Ge&&ae.render(S),Ic(x,S,U);A!==null&&(fe.updateMultisampleRenderTarget(A),fe.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(v,S,U),Ze.resetDefaultState(),D=-1,w=null,M.pop(),M.length>0?(p=M[M.length-1],W===!0&&he.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?x=m[m.length-1]:x=null};function Ja(S,U,F,B){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)F=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||et.intersectsSprite(S)){B&&ce.setFromMatrixPosition(S.matrixWorld).applyMatrix4(_e);let ve=J.update(S),Me=S.material;Me.visible&&x.push(S,ve,Me,F,ce.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||et.intersectsObject(S))){let ve=J.update(S),Me=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),ce.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),ce.copy(ve.boundingSphere.center)),ce.applyMatrix4(S.matrixWorld).applyMatrix4(_e)),Array.isArray(Me)){let Te=ve.groups;for(let Ne=0,Fe=Te.length;Ne<Fe;Ne++){let Le=Te[Ne],nt=Me[Le.materialIndex];nt&&nt.visible&&x.push(S,ve,nt,F,ce.z,Le)}}else Me.visible&&x.push(S,ve,Me,F,ce.z,null)}}let oe=S.children;for(let ve=0,Me=oe.length;ve<Me;ve++)Ja(oe[ve],U,F,B)}function Ic(S,U,F,B){let N=S.opaque,oe=S.transmissive,ve=S.transparent;p.setupLightsView(F),W===!0&&he.setGlobalState(v.clippingPlanes,F),B&&Q.viewport(y.copy(B)),N.length>0&&_s(N,U,F),oe.length>0&&_s(oe,U,F),ve.length>0&&_s(ve,U,F),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function Lc(S,U,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[B.id]===void 0&&(p.state.transmissionRenderTarget[B.id]=new Yn(1,1,{generateMipmaps:!0,type:K.has("EXT_color_buffer_half_float")||K.has("EXT_color_buffer_float")?Oa:di,minFilter:Di,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));let oe=p.state.transmissionRenderTarget[B.id],ve=B.viewport||y;oe.setSize(ve.z,ve.w);let Me=v.getRenderTarget();v.setRenderTarget(oe),v.getClearColor(O),H=v.getClearAlpha(),H<1&&v.setClearColor(16777215,.5),Ge?ae.render(F):v.clear();let Te=v.toneMapping;v.toneMapping=li;let Ne=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),p.setupLightsView(B),W===!0&&he.setGlobalState(v.clippingPlanes,B),_s(S,F,B),fe.updateMultisampleRenderTarget(oe),fe.updateRenderTargetMipmap(oe),K.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let Le=0,nt=U.length;Le<nt;Le++){let bt=U[Le],St=bt.object,nn=bt.geometry,rt=bt.material,Pe=bt.group;if(rt.side===yn&&St.layers.test(B.layers)){let Gt=rt.side;rt.side=jt,rt.needsUpdate=!0,Dc(St,F,B,nn,rt,Pe),rt.side=Gt,rt.needsUpdate=!0,Fe=!0}}Fe===!0&&(fe.updateMultisampleRenderTarget(oe),fe.updateRenderTargetMipmap(oe))}v.setRenderTarget(Me),v.setClearColor(O,H),Ne!==void 0&&(B.viewport=Ne),v.toneMapping=Te}function _s(S,U,F){let B=U.isScene===!0?U.overrideMaterial:null;for(let N=0,oe=S.length;N<oe;N++){let ve=S[N],Me=ve.object,Te=ve.geometry,Ne=B===null?ve.material:B,Fe=ve.group;Me.layers.test(F.layers)&&Dc(Me,U,F,Te,Ne,Fe)}}function Dc(S,U,F,B,N,oe){S.onBeforeRender(v,U,F,B,N,oe),S.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),N.onBeforeRender(v,U,F,B,S,oe),N.transparent===!0&&N.side===yn&&N.forceSinglePass===!1?(N.side=jt,N.needsUpdate=!0,v.renderBufferDirect(F,U,B,N,S,oe),N.side=ui,N.needsUpdate=!0,v.renderBufferDirect(F,U,B,N,S,oe),N.side=yn):v.renderBufferDirect(F,U,B,N,S,oe),S.onAfterRender(v,U,F,B,N,oe)}function bs(S,U,F){U.isScene!==!0&&(U=Ve);let B=ge.get(S),N=p.state.lights,oe=p.state.shadowsArray,ve=N.state.version,Me=Z.getParameters(S,N.state,oe,U,F),Te=Z.getProgramCacheKey(Me),Ne=B.programs;B.environment=S.isMeshStandardMaterial?U.environment:null,B.fog=U.fog,B.envMap=(S.isMeshStandardMaterial?T:He).get(S.envMap||B.environment),B.envMapRotation=B.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Ne===void 0&&(S.addEventListener("dispose",le),Ne=new Map,B.programs=Ne);let Fe=Ne.get(Te);if(Fe!==void 0){if(B.currentProgram===Fe&&B.lightsStateVersion===ve)return Nc(S,Me),Fe}else Me.uniforms=Z.getUniforms(S),S.onBuild(F,Me,v),S.onBeforeCompile(Me,v),Fe=Z.acquireProgram(Me,Te),Ne.set(Te,Fe),B.uniforms=Me.uniforms;let Le=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Le.clippingPlanes=he.uniform),Nc(S,Me),B.needsLights=gh(S),B.lightsStateVersion=ve,B.needsLights&&(Le.ambientLightColor.value=N.state.ambient,Le.lightProbe.value=N.state.probe,Le.directionalLights.value=N.state.directional,Le.directionalLightShadows.value=N.state.directionalShadow,Le.spotLights.value=N.state.spot,Le.spotLightShadows.value=N.state.spotShadow,Le.rectAreaLights.value=N.state.rectArea,Le.ltc_1.value=N.state.rectAreaLTC1,Le.ltc_2.value=N.state.rectAreaLTC2,Le.pointLights.value=N.state.point,Le.pointLightShadows.value=N.state.pointShadow,Le.hemisphereLights.value=N.state.hemi,Le.directionalShadowMap.value=N.state.directionalShadowMap,Le.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Le.spotShadowMap.value=N.state.spotShadowMap,Le.spotLightMatrix.value=N.state.spotLightMatrix,Le.spotLightMap.value=N.state.spotLightMap,Le.pointShadowMap.value=N.state.pointShadowMap,Le.pointShadowMatrix.value=N.state.pointShadowMatrix),B.currentProgram=Fe,B.uniformsList=null,Fe}function Uc(S){if(S.uniformsList===null){let U=S.currentProgram.getUniforms();S.uniformsList=br.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function Nc(S,U){let F=ge.get(S);F.outputColorSpace=U.outputColorSpace,F.batching=U.batching,F.batchingColor=U.batchingColor,F.instancing=U.instancing,F.instancingColor=U.instancingColor,F.instancingMorph=U.instancingMorph,F.skinning=U.skinning,F.morphTargets=U.morphTargets,F.morphNormals=U.morphNormals,F.morphColors=U.morphColors,F.morphTargetsCount=U.morphTargetsCount,F.numClippingPlanes=U.numClippingPlanes,F.numIntersection=U.numClipIntersection,F.vertexAlphas=U.vertexAlphas,F.vertexTangents=U.vertexTangents,F.toneMapping=U.toneMapping}function ph(S,U,F,B,N){U.isScene!==!0&&(U=Ve),fe.resetTextureUnits();let oe=U.fog,ve=B.isMeshStandardMaterial?U.environment:null,Me=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:gi,Te=(B.isMeshStandardMaterial?T:He).get(B.envMap||ve),Ne=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Fe=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Le=!!F.morphAttributes.position,nt=!!F.morphAttributes.normal,bt=!!F.morphAttributes.color,St=li;B.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(St=v.toneMapping);let nn=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,rt=nn!==void 0?nn.length:0,Pe=ge.get(B),Gt=p.state.lights;if(W===!0&&(re===!0||S!==w)){let cn=S===w&&B.id===D;he.setState(B,S,cn)}let ct=!1;B.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==Gt.state.version||Pe.outputColorSpace!==Me||N.isBatchedMesh&&Pe.batching===!1||!N.isBatchedMesh&&Pe.batching===!0||N.isBatchedMesh&&Pe.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Pe.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Pe.instancing===!1||!N.isInstancedMesh&&Pe.instancing===!0||N.isSkinnedMesh&&Pe.skinning===!1||!N.isSkinnedMesh&&Pe.skinning===!0||N.isInstancedMesh&&Pe.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Pe.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Pe.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Pe.instancingMorph===!1&&N.morphTexture!==null||Pe.envMap!==Te||B.fog===!0&&Pe.fog!==oe||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==he.numPlanes||Pe.numIntersection!==he.numIntersection)||Pe.vertexAlphas!==Ne||Pe.vertexTangents!==Fe||Pe.morphTargets!==Le||Pe.morphNormals!==nt||Pe.morphColors!==bt||Pe.toneMapping!==St||Pe.morphTargetsCount!==rt)&&(ct=!0):(ct=!0,Pe.__version=B.version);let Bn=Pe.currentProgram;ct===!0&&(Bn=bs(B,U,N));let Ss=!1,Si=!1,Ka=!1,Lt=Bn.getUniforms(),Qn=Pe.uniforms;if(Q.useProgram(Bn.program)&&(Ss=!0,Si=!0,Ka=!0),B.id!==D&&(D=B.id,Si=!0),Ss||w!==S){Lt.setValue(R,"projectionMatrix",S.projectionMatrix),Lt.setValue(R,"viewMatrix",S.matrixWorldInverse);let cn=Lt.map.cameraPosition;cn!==void 0&&cn.setValue(R,ce.setFromMatrixPosition(S.matrixWorld)),se.logarithmicDepthBuffer&&Lt.setValue(R,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&Lt.setValue(R,"isOrthographic",S.isOrthographicCamera===!0),w!==S&&(w=S,Si=!0,Ka=!0)}if(N.isSkinnedMesh){Lt.setOptional(R,N,"bindMatrix"),Lt.setOptional(R,N,"bindMatrixInverse");let cn=N.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),Lt.setValue(R,"boneTexture",cn.boneTexture,fe))}N.isBatchedMesh&&(Lt.setOptional(R,N,"batchingTexture"),Lt.setValue(R,"batchingTexture",N._matricesTexture,fe),Lt.setOptional(R,N,"batchingColorTexture"),N._colorsTexture!==null&&Lt.setValue(R,"batchingColorTexture",N._colorsTexture,fe));let ja=F.morphAttributes;if((ja.position!==void 0||ja.normal!==void 0||ja.color!==void 0)&&Ee.update(N,F,Bn),(Si||Pe.receiveShadow!==N.receiveShadow)&&(Pe.receiveShadow=N.receiveShadow,Lt.setValue(R,"receiveShadow",N.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Qn.envMap.value=Te,Qn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&U.environment!==null&&(Qn.envMapIntensity.value=U.environmentIntensity),Si&&(Lt.setValue(R,"toneMappingExposure",v.toneMappingExposure),Pe.needsLights&&mh(Qn,Ka),oe&&B.fog===!0&&j.refreshFogUniforms(Qn,oe),j.refreshMaterialUniforms(Qn,B,te,V,p.state.transmissionRenderTarget[S.id]),br.upload(R,Uc(Pe),Qn,fe)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(br.upload(R,Uc(Pe),Qn,fe),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&Lt.setValue(R,"center",N.center),Lt.setValue(R,"modelViewMatrix",N.modelViewMatrix),Lt.setValue(R,"normalMatrix",N.normalMatrix),Lt.setValue(R,"modelMatrix",N.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){let cn=B.uniformsGroups;for(let Qa=0,xh=cn.length;Qa<xh;Qa++){let Fc=cn[Qa];je.update(Fc,Bn),je.bind(Fc,Bn)}}return Bn}function mh(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function gh(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,U,F){ge.get(S.texture).__webglTexture=U,ge.get(S.depthTexture).__webglTexture=F;let B=ge.get(S);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=F===void 0,B.__autoAllocateDepthBuffer||K.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,U){let F=ge.get(S);F.__webglFramebuffer=U,F.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,F=0){A=S,L=U,E=F;let B=!0,N=null,oe=!1,ve=!1;if(S){let Te=ge.get(S);Te.__useDefaultFramebuffer!==void 0?(Q.bindFramebuffer(R.FRAMEBUFFER,null),B=!1):Te.__webglFramebuffer===void 0?fe.setupRenderTarget(S):Te.__hasExternalTextures&&fe.rebindTextures(S,ge.get(S.texture).__webglTexture,ge.get(S.depthTexture).__webglTexture);let Ne=S.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(ve=!0);let Fe=ge.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Fe[U])?N=Fe[U][F]:N=Fe[U],oe=!0):S.samples>0&&fe.useMultisampledRTT(S)===!1?N=ge.get(S).__webglMultisampledFramebuffer:Array.isArray(Fe)?N=Fe[F]:N=Fe,y.copy(S.viewport),C.copy(S.scissor),z=S.scissorTest}else y.copy(be).multiplyScalar(te).floor(),C.copy(ye).multiplyScalar(te).floor(),z=Ye;if(Q.bindFramebuffer(R.FRAMEBUFFER,N)&&B&&Q.drawBuffers(S,N),Q.viewport(y),Q.scissor(C),Q.setScissorTest(z),oe){let Te=ge.get(S.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,Te.__webglTexture,F)}else if(ve){let Te=ge.get(S.texture),Ne=U||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,Te.__webglTexture,F||0,Ne)}D=-1},this.readRenderTargetPixels=function(S,U,F,B,N,oe,ve){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=ge.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(Me=Me[ve]),Me){Q.bindFramebuffer(R.FRAMEBUFFER,Me);try{let Te=S.texture,Ne=Te.format,Fe=Te.type;if(!se.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!se.textureTypeReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-B&&F>=0&&F<=S.height-N&&R.readPixels(U,F,B,N,pe.convert(Ne),pe.convert(Fe),oe)}finally{let Te=A!==null?ge.get(A).__webglFramebuffer:null;Q.bindFramebuffer(R.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(S,U,F,B,N,oe,ve){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=ge.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(Me=Me[ve]),Me){Q.bindFramebuffer(R.FRAMEBUFFER,Me);try{let Te=S.texture,Ne=Te.format,Fe=Te.type;if(!se.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!se.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=S.width-B&&F>=0&&F<=S.height-N){let Le=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Le),R.bufferData(R.PIXEL_PACK_BUFFER,oe.byteLength,R.STREAM_READ),R.readPixels(U,F,B,N,pe.convert(Ne),pe.convert(Fe),0),R.flush();let nt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);await Bf(R,nt,4);try{R.bindBuffer(R.PIXEL_PACK_BUFFER,Le),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,oe)}finally{R.deleteBuffer(Le),R.deleteSync(nt)}return oe}}finally{let Te=A!==null?ge.get(A).__webglFramebuffer:null;Q.bindFramebuffer(R.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(S,U=null,F=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,S=arguments[1]);let B=Math.pow(2,-F),N=Math.floor(S.image.width*B),oe=Math.floor(S.image.height*B),ve=U!==null?U.x:0,Me=U!==null?U.y:0;fe.setTexture2D(S,0),R.copyTexSubImage2D(R.TEXTURE_2D,F,0,0,ve,Me,N,oe),Q.unbindTexture()},this.copyTextureToTexture=function(S,U,F=null,B=null,N=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,S=arguments[1],U=arguments[2],N=arguments[3]||0,F=null);let oe,ve,Me,Te,Ne,Fe;F!==null?(oe=F.max.x-F.min.x,ve=F.max.y-F.min.y,Me=F.min.x,Te=F.min.y):(oe=S.image.width,ve=S.image.height,Me=0,Te=0),B!==null?(Ne=B.x,Fe=B.y):(Ne=0,Fe=0);let Le=pe.convert(U.format),nt=pe.convert(U.type);fe.setTexture2D(U,0),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);let bt=R.getParameter(R.UNPACK_ROW_LENGTH),St=R.getParameter(R.UNPACK_IMAGE_HEIGHT),nn=R.getParameter(R.UNPACK_SKIP_PIXELS),rt=R.getParameter(R.UNPACK_SKIP_ROWS),Pe=R.getParameter(R.UNPACK_SKIP_IMAGES),Gt=S.isCompressedTexture?S.mipmaps[N]:S.image;R.pixelStorei(R.UNPACK_ROW_LENGTH,Gt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Gt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Me),R.pixelStorei(R.UNPACK_SKIP_ROWS,Te),S.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,N,Ne,Fe,oe,ve,Le,nt,Gt.data):S.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,N,Ne,Fe,Gt.width,Gt.height,Le,Gt.data):R.texSubImage2D(R.TEXTURE_2D,N,Ne,Fe,Le,nt,Gt),R.pixelStorei(R.UNPACK_ROW_LENGTH,bt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,St),R.pixelStorei(R.UNPACK_SKIP_PIXELS,nn),R.pixelStorei(R.UNPACK_SKIP_ROWS,rt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Pe),N===0&&U.generateMipmaps&&R.generateMipmap(R.TEXTURE_2D),Q.unbindTexture()},this.copyTextureToTexture3D=function(S,U,F=null,B=null,N=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,B=arguments[1]||null,S=arguments[2],U=arguments[3],N=arguments[4]||0);let oe,ve,Me,Te,Ne,Fe,Le,nt,bt,St=S.isCompressedTexture?S.mipmaps[N]:S.image;F!==null?(oe=F.max.x-F.min.x,ve=F.max.y-F.min.y,Me=F.max.z-F.min.z,Te=F.min.x,Ne=F.min.y,Fe=F.min.z):(oe=St.width,ve=St.height,Me=St.depth,Te=0,Ne=0,Fe=0),B!==null?(Le=B.x,nt=B.y,bt=B.z):(Le=0,nt=0,bt=0);let nn=pe.convert(U.format),rt=pe.convert(U.type),Pe;if(U.isData3DTexture)fe.setTexture3D(U,0),Pe=R.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)fe.setTexture2DArray(U,0),Pe=R.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);let Gt=R.getParameter(R.UNPACK_ROW_LENGTH),ct=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Bn=R.getParameter(R.UNPACK_SKIP_PIXELS),Ss=R.getParameter(R.UNPACK_SKIP_ROWS),Si=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,St.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,St.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Te),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ne),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Fe),S.isDataTexture||S.isData3DTexture?R.texSubImage3D(Pe,N,Le,nt,bt,oe,ve,Me,nn,rt,St.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(Pe,N,Le,nt,bt,oe,ve,Me,nn,St.data):R.texSubImage3D(Pe,N,Le,nt,bt,oe,ve,Me,nn,rt,St),R.pixelStorei(R.UNPACK_ROW_LENGTH,Gt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ct),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Bn),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ss),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Si),N===0&&U.generateMipmaps&&R.generateMipmap(Pe),Q.unbindTexture()},this.initRenderTarget=function(S){ge.get(S).__webglFramebuffer===void 0&&fe.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?fe.setTextureCube(S,0):S.isData3DTexture?fe.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?fe.setTexture2DArray(S,0):fe.setTexture2D(S,0),Q.unbindTexture()},this.resetState=function(){L=0,E=0,A=null,Q.reset(),Ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===uc?"display-p3":"srgb",t.unpackColorSpace=at.workingColorSpace===Ba?"display-p3":"srgb"}},ya=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new $e(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var _a=class extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Bl=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=_l,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Ln()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return fc("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Wt=new I,ba=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=bn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),r=st(r,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ss=class extends pi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},dr,Wr=new I,hr=new I,fr=new I,pr=new ne,qr=new ne,Gd=new xt,$s=new I,Xr=new I,Ys=new I,dd=new ne,cl=new ne,hd=new ne,Sa=class extends At{constructor(e=new ss){if(super(),this.isSprite=!0,this.type="Sprite",dr===void 0){dr=new Zt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Bl(t,5);dr.setIndex([0,1,2,0,2,3]),dr.setAttribute("position",new ba(n,3,0,!1)),dr.setAttribute("uv",new ba(n,2,3,!1))}this.geometry=dr,this.material=e,this.center=new ne(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),hr.setFromMatrixScale(this.matrixWorld),Gd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),fr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hr.multiplyScalar(-fr.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;Zs($s.set(-.5,-.5,0),fr,a,hr,r,s),Zs(Xr.set(.5,-.5,0),fr,a,hr,r,s),Zs(Ys.set(.5,.5,0),fr,a,hr,r,s),dd.set(0,0),cl.set(1,0),hd.set(1,1);let o=e.ray.intersectTriangle($s,Xr,Ys,!1,Wr);if(o===null&&(Zs(Xr.set(-.5,.5,0),fr,a,hr,r,s),cl.set(0,1),o=e.ray.intersectTriangle($s,Ys,Xr,!1,Wr),o===null))return;let l=e.ray.origin.distanceTo(Wr);l<e.near||l>e.far||t.push({distance:l,point:Wr.clone(),uv:Ui.getInterpolation(Wr,$s,Xr,Ys,dd,cl,hd,new ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Zs(i,e,t,n,r,s){pr.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(qr.x=s*pr.x-r*pr.y,qr.y=r*pr.x+s*pr.y):qr.copy(pr),i.copy(e),i.x+=qr.x,i.y+=qr.y,i.applyMatrix4(Gd)}var kl=class extends Yt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Kt,u=Kt,d,h){super(null,a,o,l,c,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ma=class extends Qt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},mr=new xt,fd=new xt,Js=[],pd=new Zn,P0=new xt,$r=new $t,Yr=new Fi,Oi=class extends $t{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ma(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,P0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,mr),pd.copy(e.boundingBox).applyMatrix4(mr),this.boundingBox.union(pd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,mr),Yr.copy(e.boundingSphere).applyMatrix4(mr),this.boundingSphere.union(Yr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){let n=this.matrixWorld,r=this.count;if($r.geometry=this.geometry,$r.material=this.material,$r.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yr.copy(this.boundingSphere),Yr.applyMatrix4(n),e.ray.intersectsSphere(Yr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,mr),fd.multiplyMatrices(n,mr),$r.matrixWorld=fd,$r.raycast(e,Js);for(let a=0,o=Js.length;a<o;a++){let l=Js[a];l.instanceId=s,l.object=this,t.push(l)}Js.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ma(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new kl(new Float32Array(r*this.count),r,this.count,Cd,Xn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Cr=class extends Yt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),r=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);let u=n[r],h=n[r+1]-u,f=(a-u)/h;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new ne:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new I,r=[],s=[],a=[],o=new I,l=new xt;for(let f=0;f<=e;f++){let g=f/e;r[f]=this.getTangentAt(g,new I)}s[0]=new I,a[0]=new I;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Ft(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(Ft(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],f*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},as=class extends dn{constructor(e=0,t=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ne){let n=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},zl=class extends as{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function mc(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,d){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;h*=u,f*=u,r(a,o,h,f)},calc:function(s){let a=s*s,o=a*s;return i+e*s+t*a+n*o}}}var Ks=new I,ul=new mc,dl=new mc,hl=new mc,Hl=class extends dn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new I){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Ks.subVectors(r[0],r[1]).add(r[0]),c=Ks);let d=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Ks.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Ks),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(h),f),p=Math.pow(h.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),p<1e-4&&(p=x),ul.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,g,x,p),dl.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,g,x,p),hl.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,g,x,p)}else this.curveType==="catmullrom"&&(ul.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),dl.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),hl.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return n.set(ul.calc(l),dl.calc(l),hl.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new I().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function md(i,e,t,n,r){let s=(n-e)*.5,a=(r-t)*.5,o=i*i,l=i*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*i+t}function I0(i,e){let t=1-i;return t*t*e}function L0(i,e){return 2*(1-i)*i*e}function D0(i,e){return i*i*e}function Qr(i,e,t,n){return I0(i,e)+L0(i,t)+D0(i,n)}function U0(i,e){let t=1-i;return t*t*t*e}function N0(i,e){let t=1-i;return 3*t*t*i*e}function F0(i,e){return 3*(1-i)*i*i*e}function O0(i,e){return i*i*i*e}function es(i,e,t,n,r){return U0(i,e)+N0(i,t)+F0(i,n)+O0(i,r)}var wa=class extends dn{constructor(e=new ne,t=new ne,n=new ne,r=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ne){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(es(e,r.x,s.x,a.x,o.x),es(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Vl=class extends dn{constructor(e=new I,t=new I,n=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new I){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(es(e,r.x,s.x,a.x,o.x),es(e,r.y,s.y,a.y,o.y),es(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ea=class extends dn{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Gl=class extends dn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ta=class extends dn{constructor(e=new ne,t=new ne,n=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ne){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Qr(e,r.x,s.x,a.x),Qr(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Wl=class extends dn{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Qr(e,r.x,s.x,a.x),Qr(e,r.y,s.y,a.y),Qr(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Aa=class extends dn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return n.set(md(o,l.x,c.x,u.x,d.x),md(o,l.y,c.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new ne().fromArray(r))}return this}},ql=Object.freeze({__proto__:null,ArcCurve:zl,CatmullRomCurve3:Hl,CubicBezierCurve:wa,CubicBezierCurve3:Vl,EllipseCurve:as,LineCurve:Ea,LineCurve3:Gl,QuadraticBezierCurve:Ta,QuadraticBezierCurve3:Wl,SplineCurve:Aa}),Xl=class extends dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ql[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new ql[r.type]().fromJSON(r))}return this}},Ca=class extends Xl{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ea(this.currentPoint.clone(),new ne(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Ta(this.currentPoint.clone(),new ne(e,t),new ne(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new wa(this.currentPoint.clone(),new ne(e,t),new ne(n,r),new ne(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Aa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){let c=new as(e,t,n,r,s,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};var Rr=class i extends Zt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],h=[],f=[],g=0,x=[],p=n/2,m=0;M(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new ot(d,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(f,2));function M(){let b=new I,L=new I,E=0,A=(t-e)/n;for(let D=0;D<=s;D++){let w=[],y=D/s,C=y*(t-e)+e;for(let z=0;z<=r;z++){let O=z/r,H=O*l+o,X=Math.sin(H),V=Math.cos(H);L.x=C*X,L.y=-y*n+p,L.z=C*V,d.push(L.x,L.y,L.z),b.set(X,A,V).normalize(),h.push(b.x,b.y,b.z),f.push(O,1-y),w.push(g++)}x.push(w)}for(let D=0;D<r;D++)for(let w=0;w<s;w++){let y=x[w][D],C=x[w+1][D],z=x[w+1][D+1],O=x[w][D+1];u.push(y,C,O),u.push(C,z,O),E+=6}c.addGroup(m,E,0),m+=E}function v(b){let L=g,E=new ne,A=new I,D=0,w=b===!0?e:t,y=b===!0?1:-1;for(let z=1;z<=r;z++)d.push(0,p*y,0),h.push(0,y,0),f.push(.5,.5),g++;let C=g;for(let z=0;z<=r;z++){let H=z/r*l+o,X=Math.cos(H),V=Math.sin(H);A.x=w*V,A.y=p*y,A.z=w*X,d.push(A.x,A.y,A.z),h.push(0,y,0),E.x=X*.5+.5,E.y=V*.5*y+.5,f.push(E.x,E.y),g++}for(let z=0;z<r;z++){let O=L+z,H=C+z;b===!0?u.push(H,H+1,O):u.push(H+1,H,O),D+=3}c.addGroup(m,D,b===!0?1:2),m+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Pr=class i extends Rr{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},$l=class i extends Zt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];o(r),c(n),u(),this.setAttribute("position",new ot(s,3)),this.setAttribute("normal",new ot(s.slice(),3)),this.setAttribute("uv",new ot(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let v=new I,b=new I,L=new I;for(let E=0;E<t.length;E+=3)f(t[E+0],v),f(t[E+1],b),f(t[E+2],L),l(v,b,L,M)}function l(M,v,b,L){let E=L+1,A=[];for(let D=0;D<=E;D++){A[D]=[];let w=M.clone().lerp(b,D/E),y=v.clone().lerp(b,D/E),C=E-D;for(let z=0;z<=C;z++)z===0&&D===E?A[D][z]=w:A[D][z]=w.clone().lerp(y,z/C)}for(let D=0;D<E;D++)for(let w=0;w<2*(E-D)-1;w++){let y=Math.floor(w/2);w%2===0?(h(A[D][y+1]),h(A[D+1][y]),h(A[D][y])):(h(A[D][y+1]),h(A[D+1][y+1]),h(A[D+1][y]))}}function c(M){let v=new I;for(let b=0;b<s.length;b+=3)v.x=s[b+0],v.y=s[b+1],v.z=s[b+2],v.normalize().multiplyScalar(M),s[b+0]=v.x,s[b+1]=v.y,s[b+2]=v.z}function u(){let M=new I;for(let v=0;v<s.length;v+=3){M.x=s[v+0],M.y=s[v+1],M.z=s[v+2];let b=p(M)/2/Math.PI+.5,L=m(M)/Math.PI+.5;a.push(b,1-L)}g(),d()}function d(){for(let M=0;M<a.length;M+=6){let v=a[M+0],b=a[M+2],L=a[M+4],E=Math.max(v,b,L),A=Math.min(v,b,L);E>.9&&A<.1&&(v<.2&&(a[M+0]+=1),b<.2&&(a[M+2]+=1),L<.2&&(a[M+4]+=1))}}function h(M){s.push(M.x,M.y,M.z)}function f(M,v){let b=M*3;v.x=e[b+0],v.y=e[b+1],v.z=e[b+2]}function g(){let M=new I,v=new I,b=new I,L=new I,E=new ne,A=new ne,D=new ne;for(let w=0,y=0;w<s.length;w+=9,y+=6){M.set(s[w+0],s[w+1],s[w+2]),v.set(s[w+3],s[w+4],s[w+5]),b.set(s[w+6],s[w+7],s[w+8]),E.set(a[y+0],a[y+1]),A.set(a[y+2],a[y+3]),D.set(a[y+4],a[y+5]),L.copy(M).add(v).add(b).divideScalar(3);let C=p(L);x(E,y+0,M,C),x(A,y+2,v,C),x(D,y+4,b,C)}}function x(M,v,b,L){L<0&&M.x===1&&(a[v]=M.x-1),b.x===0&&b.z===0&&(a[v]=L/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}},os=class i extends $l{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var mi=class extends Ca{constructor(e){super(e),this.uuid=Ln(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new Ca().fromJSON(r))}return this}},B0={triangulate:function(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=Wd(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c,u,d,h,f;if(n&&(s=G0(i,e,s,t)),i.length>80*t){o=c=i[0],l=u=i[1];for(let g=t;g<r;g+=t)d=i[g],h=i[g+1],d<o&&(o=d),h<l&&(l=h),d>c&&(c=d),h>u&&(u=h);f=Math.max(c-o,u-l),f=f!==0?32767/f:0}return ls(s,a,t,o,l,f,0),a}};function Wd(i,e,t,n,r){let s,a;if(r===ev(i,e,t,n)>0)for(s=e;s<t;s+=n)a=gd(s,i[s],i[s+1],a);else for(s=t-n;s>=e;s-=n)a=gd(s,i[s],i[s+1],a);return a&&za(a,a.next)&&(us(a),a=a.next),a}function Bi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(za(t,t.next)||_t(t.prev,t,t.next)===0)){if(us(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ls(i,e,t,n,r,s,a){if(!i)return;!a&&s&&Y0(i,n,r,s);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,s?z0(i,n,r,s):k0(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),us(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=H0(Bi(i),e,t),ls(i,e,t,n,r,s,2)):a===2&&V0(i,e,t,n,r,s):ls(Bi(i),e,t,n,r,s,1);break}}}function k0(i){let e=i.prev,t=i,n=i.next;if(_t(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=r<s?r<a?r:a:s<a?s:a,d=o<l?o<c?o:c:l<c?l:c,h=r>s?r>a?r:a:s>a?s:a,f=o>l?o>c?o:c:l>c?l:c,g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=f&&xr(r,o,s,l,a,c,g.x,g.y)&&_t(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function z0(i,e,t,n){let r=i.prev,s=i,a=i.next;if(_t(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,u=r.y,d=s.y,h=a.y,f=o<l?o<c?o:c:l<c?l:c,g=u<d?u<h?u:h:d<h?d:h,x=o>l?o>c?o:c:l>c?l:c,p=u>d?u>h?u:h:d>h?d:h,m=Yl(f,g,e,t,n),M=Yl(x,p,e,t,n),v=i.prevZ,b=i.nextZ;for(;v&&v.z>=m&&b&&b.z<=M;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=p&&v!==r&&v!==a&&xr(o,u,l,d,c,h,v.x,v.y)&&_t(v.prev,v,v.next)>=0||(v=v.prevZ,b.x>=f&&b.x<=x&&b.y>=g&&b.y<=p&&b!==r&&b!==a&&xr(o,u,l,d,c,h,b.x,b.y)&&_t(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;v&&v.z>=m;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=p&&v!==r&&v!==a&&xr(o,u,l,d,c,h,v.x,v.y)&&_t(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;b&&b.z<=M;){if(b.x>=f&&b.x<=x&&b.y>=g&&b.y<=p&&b!==r&&b!==a&&xr(o,u,l,d,c,h,b.x,b.y)&&_t(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function H0(i,e,t){let n=i;do{let r=n.prev,s=n.next.next;!za(r,s)&&qd(r,n,n.next,s)&&cs(r,s)&&cs(s,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),us(n),us(n.next),n=i=s),n=n.next}while(n!==i);return Bi(n)}function V0(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&K0(a,o)){let l=Xd(a,o);a=Bi(a,a.next),l=Bi(l,l.next),ls(a,e,t,n,r,s,0),ls(l,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function G0(i,e,t,n){let r=[],s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*n,l=s<a-1?e[s+1]*n:i.length,c=Wd(i,o,l,n,!1),c===c.next&&(c.steiner=!0),r.push(J0(c));for(r.sort(W0),s=0;s<r.length;s++)t=q0(r[s],t);return t}function W0(i,e){return i.x-e.x}function q0(i,e){let t=X0(i,e);if(!t)return e;let n=Xd(t,i);return Bi(n,n.next),Bi(t,t.next)}function X0(i,e){let t=e,n=-1/0,r,s=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){let h=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=s&&h>n&&(n=h,r=t.x<t.next.x?t:t.next,h===s))return r}t=t.next}while(t!==e);if(!r)return null;let o=r,l=r.x,c=r.y,u=1/0,d;t=r;do s>=t.x&&t.x>=l&&s!==t.x&&xr(a<c?s:n,a,l,c,a<c?n:s,a,t.x,t.y)&&(d=Math.abs(a-t.y)/(s-t.x),cs(t,i)&&(d<u||d===u&&(t.x>r.x||t.x===r.x&&$0(r,t)))&&(r=t,u=d)),t=t.next;while(t!==o);return r}function $0(i,e){return _t(i.prev,i,e.prev)<0&&_t(e.next,i,i.next)<0}function Y0(i,e,t,n){let r=i;do r.z===0&&(r.z=Yl(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Z0(r)}function Z0(i){let e,t,n,r,s,a,o,l,c=1;do{for(t=i,i=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(r=t,t=t.nextZ,o--):(r=n,n=n.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;t=n}s.nextZ=null,c*=2}while(a>1);return i}function Yl(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function J0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function xr(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function K0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!j0(i,e)&&(cs(i,e)&&cs(e,i)&&Q0(i,e)&&(_t(i.prev,i,e.prev)||_t(i,e.prev,e))||za(i,e)&&_t(i.prev,i,i.next)>0&&_t(e.prev,e,e.next)>0)}function _t(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function za(i,e){return i.x===e.x&&i.y===e.y}function qd(i,e,t,n){let r=Qs(_t(i,e,t)),s=Qs(_t(i,e,n)),a=Qs(_t(t,n,i)),o=Qs(_t(t,n,e));return!!(r!==s&&a!==o||r===0&&js(i,t,e)||s===0&&js(i,n,e)||a===0&&js(t,i,n)||o===0&&js(t,e,n))}function js(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Qs(i){return i>0?1:i<0?-1:0}function j0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&qd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function cs(i,e){return _t(i.prev,i,i.next)<0?_t(i,e,i.next)>=0&&_t(i,i.prev,e)>=0:_t(i,e,i.prev)<0||_t(i,i.next,e)<0}function Q0(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Xd(i,e){let t=new Zl(i.i,i.x,i.y),n=new Zl(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function gd(i,e,t,n){let r=new Zl(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function us(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Zl(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ev(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var ci=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];xd(e),vd(n,e);let a=e.length;t.forEach(xd);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,vd(n,t[l]);let o=B0.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function xd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function vd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Ra=class i extends Zt{constructor(e=new mi([new ne(.5,.5),new ne(-.5,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new ot(r,3)),this.setAttribute("uv",new ot(s,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:tv,v,b=!1,L,E,A,D;m&&(v=m.getSpacedPoints(u),b=!0,h=!1,L=m.computeFrenetFrames(u,!1),E=new I,A=new I,D=new I),h||(p=0,f=0,g=0,x=0);let w=o.extractPoints(c),y=w.shape,C=w.holes;if(!ci.isClockWise(y)){y=y.reverse();for(let $=0,K=C.length;$<K;$++){let se=C[$];ci.isClockWise(se)&&(C[$]=se.reverse())}}let O=ci.triangulateShape(y,C),H=y;for(let $=0,K=C.length;$<K;$++){let se=C[$];y=y.concat(se)}function X($,K,se){return K||console.error("THREE.ExtrudeGeometry: vec does not exist"),$.clone().addScaledVector(K,se)}let V=y.length,te=O.length;function G($,K,se){let Q,ee,ge,fe=$.x-K.x,He=$.y-K.y,T=se.x-$.x,_=se.y-$.y,k=fe*fe+He*He,J=fe*_-He*T;if(Math.abs(J)>Number.EPSILON){let Z=Math.sqrt(k),j=Math.sqrt(T*T+_*_),Re=K.x-He/Z,ue=K.y+fe/Z,he=se.x-_/j,We=se.y+T/j,ae=((he-Re)*_-(We-ue)*T)/(fe*_-He*T);Q=Re+fe*ae-$.x,ee=ue+He*ae-$.y;let Ee=Q*Q+ee*ee;if(Ee<=2)return new ne(Q,ee);ge=Math.sqrt(Ee/2)}else{let Z=!1;fe>Number.EPSILON?T>Number.EPSILON&&(Z=!0):fe<-Number.EPSILON?T<-Number.EPSILON&&(Z=!0):Math.sign(He)===Math.sign(_)&&(Z=!0),Z?(Q=-He,ee=fe,ge=Math.sqrt(k)):(Q=fe,ee=He,ge=Math.sqrt(k/2))}return new ne(Q/ge,ee/ge)}let me=[];for(let $=0,K=H.length,se=K-1,Q=$+1;$<K;$++,se++,Q++)se===K&&(se=0),Q===K&&(Q=0),me[$]=G(H[$],H[se],H[Q]);let be=[],ye,Ye=me.concat();for(let $=0,K=C.length;$<K;$++){let se=C[$];ye=[];for(let Q=0,ee=se.length,ge=ee-1,fe=Q+1;Q<ee;Q++,ge++,fe++)ge===ee&&(ge=0),fe===ee&&(fe=0),ye[Q]=G(se[Q],se[ge],se[fe]);be.push(ye),Ye=Ye.concat(ye)}for(let $=0;$<p;$++){let K=$/p,se=f*Math.cos(K*Math.PI/2),Q=g*Math.sin(K*Math.PI/2)+x;for(let ee=0,ge=H.length;ee<ge;ee++){let fe=X(H[ee],me[ee],Q);ce(fe.x,fe.y,-se)}for(let ee=0,ge=C.length;ee<ge;ee++){let fe=C[ee];ye=be[ee];for(let He=0,T=fe.length;He<T;He++){let _=X(fe[He],ye[He],Q);ce(_.x,_.y,-se)}}}let et=g+x;for(let $=0;$<V;$++){let K=h?X(y[$],Ye[$],et):y[$];b?(A.copy(L.normals[0]).multiplyScalar(K.x),E.copy(L.binormals[0]).multiplyScalar(K.y),D.copy(v[0]).add(A).add(E),ce(D.x,D.y,D.z)):ce(K.x,K.y,0)}for(let $=1;$<=u;$++)for(let K=0;K<V;K++){let se=h?X(y[K],Ye[K],et):y[K];b?(A.copy(L.normals[$]).multiplyScalar(se.x),E.copy(L.binormals[$]).multiplyScalar(se.y),D.copy(v[$]).add(A).add(E),ce(D.x,D.y,D.z)):ce(se.x,se.y,d/u*$)}for(let $=p-1;$>=0;$--){let K=$/p,se=f*Math.cos(K*Math.PI/2),Q=g*Math.sin(K*Math.PI/2)+x;for(let ee=0,ge=H.length;ee<ge;ee++){let fe=X(H[ee],me[ee],Q);ce(fe.x,fe.y,d+se)}for(let ee=0,ge=C.length;ee<ge;ee++){let fe=C[ee];ye=be[ee];for(let He=0,T=fe.length;He<T;He++){let _=X(fe[He],ye[He],Q);b?ce(_.x,_.y+v[u-1].y,v[u-1].x+se):ce(_.x,_.y,d+se)}}}W(),re();function W(){let $=r.length/3;if(h){let K=0,se=V*K;for(let Q=0;Q<te;Q++){let ee=O[Q];Ve(ee[2]+se,ee[1]+se,ee[0]+se)}K=u+p*2,se=V*K;for(let Q=0;Q<te;Q++){let ee=O[Q];Ve(ee[0]+se,ee[1]+se,ee[2]+se)}}else{for(let K=0;K<te;K++){let se=O[K];Ve(se[2],se[1],se[0])}for(let K=0;K<te;K++){let se=O[K];Ve(se[0]+V*u,se[1]+V*u,se[2]+V*u)}}n.addGroup($,r.length/3-$,0)}function re(){let $=r.length/3,K=0;_e(H,K),K+=H.length;for(let se=0,Q=C.length;se<Q;se++){let ee=C[se];_e(ee,K),K+=ee.length}n.addGroup($,r.length/3-$,1)}function _e($,K){let se=$.length;for(;--se>=0;){let Q=se,ee=se-1;ee<0&&(ee=$.length-1);for(let ge=0,fe=u+p*2;ge<fe;ge++){let He=V*ge,T=V*(ge+1),_=K+Q+He,k=K+ee+He,J=K+ee+T,Z=K+Q+T;Ge(_,k,J,Z)}}}function ce($,K,se){l.push($),l.push(K),l.push(se)}function Ve($,K,se){ze($),ze(K),ze(se);let Q=r.length/3,ee=M.generateTopUV(n,r,Q-3,Q-2,Q-1);R(ee[0]),R(ee[1]),R(ee[2])}function Ge($,K,se,Q){ze($),ze(K),ze(Q),ze(K),ze(se),ze(Q);let ee=r.length/3,ge=M.generateSideWallUV(n,r,ee-6,ee-3,ee-2,ee-1);R(ge[0]),R(ge[1]),R(ge[3]),R(ge[1]),R(ge[2]),R(ge[3])}function ze($){r.push(l[$*3+0]),r.push(l[$*3+1]),r.push(l[$*3+2])}function R($){s.push($.x),s.push($.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return nv(t,n,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new ql[r.type]().fromJSON(r)),new i(n,e.options)}},tv={generateTopUV:function(i,e,t,n,r){let s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[r*3],u=e[r*3+1];return[new ne(s,a),new ne(o,l),new ne(c,u)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],d=e[n*3+2],h=e[r*3],f=e[r*3+1],g=e[r*3+2],x=e[s*3],p=e[s*3+1],m=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new ne(a,1-l),new ne(c,1-d),new ne(h,1-g),new ne(x,1-m)]:[new ne(o,1-l),new ne(u,1-d),new ne(f,1-g),new ne(p,1-m)]}};function nv(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Pa=class i extends Zt{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],l=[],c=[],u=[],d=e,h=(t-e)/r,f=new I,g=new ne;for(let x=0;x<=r;x++){for(let p=0;p<=n;p++){let m=s+p/n*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let x=0;x<r;x++){let p=x*(n+1);for(let m=0;m<n;m++){let M=m+p,v=M,b=M+n+1,L=M+n+2,E=M+1;o.push(v,b,E),o.push(b,L,E)}}this.setIndex(o),this.setAttribute("position",new ot(l,3)),this.setAttribute("normal",new ot(c,3)),this.setAttribute("uv",new ot(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},ds=class i extends Zt{constructor(e=new mi([new ne(0,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new ot(r,3)),this.setAttribute("normal",new ot(s,3)),this.setAttribute("uv",new ot(a,2));function c(u){let d=r.length/3,h=u.extractPoints(t),f=h.shape,g=h.holes;ci.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,m=g.length;p<m;p++){let M=g[p];ci.isClockWise(M)===!0&&(g[p]=M.reverse())}let x=ci.triangulateShape(f,g);for(let p=0,m=g.length;p<m;p++){let M=g[p];f=f.concat(M)}for(let p=0,m=f.length;p<m;p++){let M=f[p];r.push(M.x,M.y,0),s.push(0,0,1),a.push(M.x,M.y)}for(let p=0,m=x.length;p<m;p++){let M=x[p],v=M[0]+d,b=M[1]+d,L=M[2]+d;n.push(v,b,L),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return iv(t,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}};function iv(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}var Qe=class i extends Zt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],d=new I,h=new I,f=[],g=[],x=[],p=[];for(let m=0;m<=n;m++){let M=[],v=m/n,b=0;m===0&&a===0?b=.5/t:m===n&&l===Math.PI&&(b=-.5/t);for(let L=0;L<=t;L++){let E=L/t;d.x=-e*Math.cos(r+E*s)*Math.sin(a+v*o),d.y=e*Math.cos(a+v*o),d.z=e*Math.sin(r+E*s)*Math.sin(a+v*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),p.push(E+b,1-v),M.push(c++)}u.push(M)}for(let m=0;m<n;m++)for(let M=0;M<t;M++){let v=u[m][M+1],b=u[m][M],L=u[m+1][M],E=u[m+1][M+1];(m!==0||a>0)&&f.push(v,b,E),(m!==n-1||l<Math.PI)&&f.push(b,L,E)}this.setIndex(f),this.setAttribute("position",new ot(g,3)),this.setAttribute("normal",new ot(x,3)),this.setAttribute("uv",new ot(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var hn=class i extends Zt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],l=[],c=[],u=new I,d=new I,h=new I;for(let f=0;f<=n;f++)for(let g=0;g<=r;g++){let x=g/r*s,p=f/n*Math.PI*2;d.x=(e+t*Math.cos(p))*Math.cos(x),d.y=(e+t*Math.cos(p))*Math.sin(x),d.z=t*Math.sin(p),o.push(d.x,d.y,d.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/r),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=r;g++){let x=(r+1)*f+g-1,p=(r+1)*(f-1)+g-1,m=(r+1)*(f-1)+g,M=(r+1)*f+g;a.push(x,p,M),a.push(p,m,M)}this.setIndex(a),this.setAttribute("position",new ot(o,3)),this.setAttribute("normal",new ot(l,3)),this.setAttribute("uv",new ot(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var zt=class extends pi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new $e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ld,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function ea(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function rv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ir=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Jl=class extends Ir{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:yu,endingEnd:yu}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case _u:s=e,o=2*t-n;break;case bu:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case _u:a=e,l=2*n-t;break;case bu:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(r-t),x=g*g,p=x*g,m=-h*p+2*h*x-h*g,M=(1+h)*p+(-1.5-2*h)*x+(-.5+h)*g+1,v=(-1-f)*p+(1.5+f)*x+.5*g,b=f*p-f*x;for(let L=0;L!==o;++L)s[L]=m*a[u+L]+M*a[c+L]+v*a[l+L]+b*a[d+L];return s}},Kl=class extends Ir{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(r-t),d=1-u;for(let h=0;h!==o;++h)s[h]=a[c+h]*d+a[l+h]*u;return s}},jl=class extends Ir{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Sn=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ea(t,this.TimeBufferType),this.values=ea(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ea(e.times,Array),values:ea(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new jl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Kl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ia:t=this.InterpolantFactoryMethodDiscrete;break;case yl:t=this.InterpolantFactoryMethodLinear;break;case Bo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ia;case this.InterpolantFactoryMethodLinear:return yl;case this.InterpolantFactoryMethodSmooth:return Bo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&rv(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Bo,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{let d=o*n,h=d-n,f=d+n;for(let g=0;g!==n;++g){let x=t[d+g];if(x!==t[h+g]||x!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Sn.prototype.TimeBufferType=Float32Array;Sn.prototype.ValueBufferType=Float32Array;Sn.prototype.DefaultInterpolation=yl;var ki=class extends Sn{constructor(e,t,n){super(e,t,n)}};ki.prototype.ValueTypeName="bool";ki.prototype.ValueBufferType=Array;ki.prototype.DefaultInterpolation=ia;ki.prototype.InterpolantFactoryMethodLinear=void 0;ki.prototype.InterpolantFactoryMethodSmooth=void 0;var Ql=class extends Sn{};Ql.prototype.ValueTypeName="color";var ec=class extends Sn{};ec.prototype.ValueTypeName="number";var tc=class extends Ir{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let u=c+o;c!==u;c+=4)fi.slerpFlat(s,0,a,c-o,a,c,l);return s}},Ia=class extends Sn{InterpolantFactoryMethodLinear(e){return new tc(this.times,this.values,this.getValueSize(),e)}};Ia.prototype.ValueTypeName="quaternion";Ia.prototype.InterpolantFactoryMethodSmooth=void 0;var zi=class extends Sn{constructor(e,t,n){super(e,t,n)}};zi.prototype.ValueTypeName="string";zi.prototype.ValueBufferType=Array;zi.prototype.DefaultInterpolation=ia;zi.prototype.InterpolantFactoryMethodLinear=void 0;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var nc=class extends Sn{};nc.prototype.ValueTypeName="vector";var yd={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},ic=class{constructor(e,t,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},sv=new ic,hs=class{constructor(e){this.manager=e!==void 0?e:sv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};hs.DEFAULT_MATERIAL_NAME="__DEFAULT";var rc=class extends hs{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=yd.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;let o=is("img");function l(){u(),yd.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){u(),r&&r(d),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}};var La=class extends hs{constructor(e){super(e)}load(e,t,n,r){let s=new Yt,a=new rc(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}},Da=class extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Ua=class extends Da{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $e(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},fl=new xt,_d=new I,bd=new I,sc=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.map=null,this.mapPass=null,this.matrix=new xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rs,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new Ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;_d.setFromMatrixPosition(e.matrixWorld),t.position.copy(_d),bd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bd),t.updateMatrixWorld(),fl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var ac=class extends sc{constructor(){super(new ma(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Na=class extends Da{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new ac}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var gc="\\[\\]\\.:\\/",av=new RegExp("["+gc+"]","g"),xc="[^"+gc+"]",ov="[^"+gc.replace("\\.","")+"]",lv=/((?:WC+[\/:])*)/.source.replace("WC",xc),cv=/(WCOD+)?/.source.replace("WCOD",ov),uv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xc),dv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xc),hv=new RegExp("^"+lv+cv+uv+dv+"$"),fv=["material","materials","bones","map"],oc=class{constructor(e,t,n){let r=n||yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},yt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(av,"")}static parseTrackName(e){let t=hv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);fv.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};yt.Composite=oc;yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};yt.prototype.GetterByBindingType=[yt.prototype._getValue_direct,yt.prototype._getValue_array,yt.prototype._getValue_arrayElement,yt.prototype._getValue_toArray];yt.prototype.SetterByBindingTypeAndVersioning=[[yt.prototype._setValue_direct,yt.prototype._setValue_direct_setNeedsUpdate,yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_array,yt.prototype._setValue_array_setNeedsUpdate,yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_arrayElement,yt.prototype._setValue_arrayElement_setNeedsUpdate,yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_fromArray,yt.prototype._setValue_fromArray_setNeedsUpdate,yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var c_=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"165"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="165");var ie=(i=0,e=0,t=0)=>new I(i,e,t),dt={hq:ie(0,0,5),harbour:ie(-31,0,-7),english:ie(-19,0,-30),physics:ie(4,0,-38),chemistry:ie(30,0,-25),grove:ie(33,0,3)},fs=(i,e)=>[ie(-7.7,0,-4.5),ie(7.4,0,-4),ie(-9.9,0,6.9),ie(9.3,0,7.5),ie(0,0,12.3)].map((t,n)=>({id:`station-${n}`,label:e[n],position:i.clone().add(t)})),xi={harbour:fs(dt.harbour,["Multiplication Depot","Addition Dispatch","Division Workshop","Subtraction Yard","Place Value Tower"]),english:fs(dt.english,["Word Archive","Sentence Studio","Spelling Signal","Reading Room","Story Press"]),physics:fs(dt.physics,["Force Track","Light Observatory","Sound Lab","Circuit Station","Energy Workshop"]),chemistry:fs(dt.chemistry,["Matter Hall","Mixture Lab","Changes Chamber","Properties Bay","Particle Observatory"]),grove:fs(dt.grove,["Seed Lab","Habitat Dome","Life-Cycle Nursery","Food-Web Field","Adaptation Clinic"])},mv={hq:"Headquarters",harbour:"Maths Operations",english:"English Communications",physics:"Physics Research",chemistry:"Chemistry Laboratory",grove:"Life Sciences BioDome"},Ha={hq:{colour:3647626,symbol:"HQ"},harbour:{colour:1292209,symbol:"x"},english:{colour:15757171,symbol:"Aa"},physics:{colour:7891176,symbol:"atom"},chemistry:{colour:2409637,symbol:"flask"},grove:{colour:11063107,symbol:"leaf"}},vc=hc.clamp,u_=hc.lerp,gv={};function Ae(i,e,t=0,n=.8){return gv[i]||=new zt({color:e,metalness:t,roughness:n})}var Mn=Ae("armour",6844762,.5,.54),Ht=Ae("edge",4541760,.65,.6),ut=Ae("steel",6911355,.8,.35),en=Ae("rubber",2238506,.1,.96),wn=Ae("concrete",11382951,.04,.94),vi=Ae("blue",3038055,.4,.6),Fn=Ae("safety",14267735,.35,.6),Hi=Ae("glass",2180694,.65,.19),Va=new zt({color:15333358,emissive:12049868,emissiveIntensity:1.2}),xv=new zt({color:15783032,emissive:8018454,emissiveIntensity:.85,roughness:.5,transparent:!0,opacity:.94}),$d=new zt({color:15726287,emissive:10471260,emissiveIntensity:1.4,roughness:.35,transparent:!0,opacity:.9});function vv(){let i=document.createElement("canvas");i.width=i.height=256;let e=i.getContext("2d"),t=e.createImageData(256,256),n=71;for(let s=0;s<t.data.length;s+=4){n=n*1664525+1013904223>>>0;let a=191+n%38;t.data.set([a,a,a-3,255],s)}e.putImageData(t,0,0),e.strokeStyle="#9b9d9230",e.lineWidth=.5;for(let s=0;s<256;s+=6)e.beginPath(),e.moveTo(0,s),e.lineTo(256,s+2),e.stroke();let r=new Cr(i);return r.wrapS=r.wrapT=Ni,r.repeat.set(3,3),r.colorSpace=Nt,r}function Ie(i,e,t,n=0,r=0,s=0){let a=new $t(e,t);return a.position.set(n,r,s),a.castShadow=!0,a.receiveShadow=!0,i.add(a),a}function De(i,e,t,n,r,s=0,a=0,o=0){return Ie(i,new Jn(e,t,n),r,s,a,o)}function Se(i,e,t,n,r,s=0,a=0,o=0,l=16){return Ie(i,new Rr(e,t,n,l),r,s,a,o)}function ft(i,e,t,n,r){let s=e.clone().add(t).multiplyScalar(.5),a=Se(i,n,n,e.distanceTo(t),r,s.x,s.y,s.z,8);return a.quaternion.setFromUnitVectors(ie(0,1,0),t.clone().sub(e).normalize()),a}function Dr(i,e,t,n,r,s=0,a=0,o=0,l=.12){let c=new mi;c.moveTo(-e/2+l,-n/2),c.lineTo(e/2-l,-n/2),c.lineTo(e/2,-n/2+l),c.lineTo(e/2,n/2-l),c.lineTo(e/2-l,n/2),c.lineTo(-e/2+l,n/2),c.lineTo(-e/2,n/2-l),c.lineTo(-e/2,-n/2+l),c.closePath();let u=new Ra(c,{depth:t,bevelEnabled:!0,bevelThickness:l/2,bevelSize:l/2,bevelSegments:2,steps:1});return u.rotateX(-Math.PI/2),u.translate(0,-t/2,0),Ie(i,u,r,s,a,o)}function Ga(i,e,t,n,r,s,a="#eef3ed"){let o=document.createElement("canvas");o.width=512,o.height=128;let l=o.getContext("2d");l.font="bold 65px Arial",l.textAlign="center",l.textBaseline="middle",l.fillStyle=a,l.fillText(e,256,64);let c=new Cr(o);c.colorSpace=Nt;let u=Ie(i,new Kn(s,s/4),new Un({map:c,transparent:!0,depthWrite:!1}),t,n,r);return u.castShadow=!1,u}function ps(i,e,t=!1){let n=document.createElement("canvas");n.width=n.height=256;let r=n.getContext("2d"),s=`#${e.toString(16).padStart(6,"0")}`,a=r.createRadialGradient(128,128,12,128,128,116);if(a.addColorStop(0,t?"#d9ff8d":"#ffffff"),a.addColorStop(.38,t?"#54ef9b":s),a.addColorStop(.7,`${t?"#2fe48d":s}a8`),a.addColorStop(1,`${t?"#2fe48d":s}00`),r.fillStyle=a,r.beginPath(),r.arc(128,128,116,0,Math.PI*2),r.fill(),r.fillStyle=t?"#176844":"#fff",r.strokeStyle=t?"#edffd8":"#ffffff",r.lineWidth=11,r.lineCap="round",r.lineJoin="round",t)r.beginPath(),r.moveTo(78,129),r.lineTo(112,161),r.lineTo(181,88),r.stroke();else if(i==="atom"){r.lineWidth=7;for(let l of[0,Math.PI/3,-Math.PI/3])r.save(),r.translate(128,128),r.rotate(l),r.beginPath(),r.ellipse(0,0,63,25,0,0,Math.PI*2),r.stroke(),r.restore();r.beginPath(),r.arc(128,128,10,0,Math.PI*2),r.fill()}else i==="flask"?(r.beginPath(),r.moveTo(108,70),r.lineTo(148,70),r.moveTo(117,70),r.lineTo(117,111),r.lineTo(82,169),r.quadraticCurveTo(78,185,98,187),r.lineTo(158,187),r.quadraticCurveTo(178,185,174,169),r.lineTo(139,111),r.lineTo(139,70),r.stroke(),r.fillStyle="#fff9",r.beginPath(),r.moveTo(99,159),r.lineTo(157,159),r.lineTo(170,181),r.lineTo(86,181),r.closePath(),r.fill()):i==="leaf"?(r.beginPath(),r.moveTo(83,165),r.bezierCurveTo(72,97,118,63,181,73),r.bezierCurveTo(185,137,146,177,83,165),r.fill(),r.strokeStyle=s,r.lineWidth=7,r.beginPath(),r.moveTo(91,158),r.lineTo(166,89),r.stroke()):(r.font=i==="Aa"?"800 74px Arial":"900 96px Arial",r.textAlign="center",r.textBaseline="middle",r.fillText(i,128,130));let o=new Cr(n);return o.colorSpace=Nt,o.needsUpdate=!0,o}var Wa=class{renderer;scene;camera;tank;tracks=[];wheels=[];group;hq;dish;rig;water;canvas;routeLayer=new ke;waypoint=new ke;waypointRing;dustPuffs=[];view="hq";destination="hq";yaw=.72;radius=17;elevation=10;target=ie(0,1,0);cameraGoal=ie();lookGoal=ie();travel=null;paused=!1;reduced=!1;running=!0;frame=0;last=0;clock=0;onTravelEnd=null;onFrame=null;width=0;height=0;hqLevel=0;ready;textureErrors=[];currentArea="hq";framingKey="";selectedNodeKey="";markerLayer=new ke;mapMarkers=new Map;stationMarkers=new Map;animatedProps=[];completedMarkerTexture=ps("check",5566363,!0);resizeObserver;constructor(e){this.canvas=e,this.renderer=new va({canvas:e,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=lc,this.renderer.outputColorSpace=Nt,this.renderer.toneMapping=cc,this.renderer.toneMappingExposure=.96,this.scene=new _a,this.scene.background=new $e(13430001),Mn.map=vv(),Ht.map=Mn.map,vi.map=Mn.map,this.scene.fog=new ya(13430001,.007),this.camera=new Xt(42,1,.1,300),this.camera.position.set(15,10,18),this.scene.add(new Ua(15924223,5536601,1.75));let t=new Na(16772547,2.75);t.position.set(-20,35,15),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-50,right:50,top:50,bottom:-50,near:.5,far:110}),t.shadow.normalBias=.045,this.scene.add(t),this.group=new ke,this.scene.add(this.group),this.group.add(this.routeLayer,this.waypoint,this.markerLayer),this.waypoint.visible=!1,this.waypointRing=Ie(this.waypoint,new hn(1.05,.11,12,40),$d,0,.18,0),this.waypointRing.rotation.x=Math.PI/2;let n=Se(this.waypoint,.045,.11,3.7,$d,0,1.95,0,14);n.castShadow=!1,this.ready=this.createLandscape(),this.hq=new ke,this.group.add(this.hq),this.createBase(1),this.createHarbour(),this.createEnglishDistrict(),this.createPhysicsDistrict(),this.createChemistryDistrict(),this.createScienceBase(),this.tank=this.createTank(),this.createWorldMarkers(),this.tank.position.set(2.4,.02,4.5),this.tank.rotation.y=.3,this.group.add(this.tank),this.createDust(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e.parentElement);let r=!1,s=0;e.addEventListener("pointerdown",a=>{this.travel||(r=!0,s=a.clientX,e.setPointerCapture(a.pointerId))}),e.addEventListener("pointermove",a=>{r&&(this.yaw+=(s-a.clientX)*.005,s=a.clientX)});for(let a of["pointerup","pointercancel"])e.addEventListener(a,()=>{r=!1});e.addEventListener("webglcontextlost",a=>{a.preventDefault(),this.running=!1,e.dispatchEvent(new CustomEvent("world-error",{detail:"Graphics paused. Reload to restore the scene; your saved progress is safe."}))}),this.resize(),this.setView("hq"),this.animate(0)}createDust(){let e=new Qe(.48,8,5);for(let t=0;t<9;t++){let n=new Un({color:12036747,transparent:!0,opacity:0,depthWrite:!1}),r=Ie(this.group,e,n);r.castShadow=!1,r.visible=!1,this.dustPuffs.push(r)}}createBeacon(e,t,n=!1,r=e){let s=Ha[r]||Ha.hq,a=new ke;a.position.copy(t),a.position.y=n?3.25:5.5,a.visible=!1;let o=new Sa(new ss({map:ps(n?"":s.symbol,s.colour),transparent:!0,depthTest:!1,depthWrite:!1}));o.scale.setScalar(n?2.8:4.35),o.renderOrder=20,a.add(o);let l=new Un({color:s.colour,transparent:!0,opacity:.48,blending:ts,depthWrite:!1}),c=Ie(a,new Pa(n?.58:.9,n?.76:1.18,40),l,0,-a.position.y+.19,0);c.rotation.x=-Math.PI/2,c.castShadow=!1,c.renderOrder=3;let u=new Un({color:s.colour,transparent:!0,opacity:.16,blending:ts,depthWrite:!1,side:yn}),d=Se(a,n?.18:.3,n?.48:.72,n?2.5:4.4,u,0,-a.position.y/2+.28,0,32);d.castShadow=!1,d.renderOrder=2;let h={id:e,root:a,sprite:o,halo:c,beam:d,style:s,station:n,selected:!1,completed:!1,baseY:a.position.y};return this.markerLayer.add(a),h}createWorldMarkers(){for(let[e,t]of Object.entries(dt))this.mapMarkers.set(e,this.createBeacon(e,t));for(let[e,t]of Object.entries(xi))for(let n of t){let r=this.createBeacon(n.id,n.position,!0,e);r.region=e,r.index=Number(n.id.split("-")[1]),r.sprite.material.map=ps(String(r.index+1),Ha[e].colour),r.sprite.material.needsUpdate=!0,this.stationMarkers.set(`${e}:${n.id}`,r)}}syncMarkers(e){let t=e.view==="map"||e.view==="region-info";for(let[n,r]of this.mapMarkers){r.root.visible=t||e.view==="region"&&n==="hq";let s=e.completedRegions?.includes(n)||!1,a=e.selectedRegion===n;r.completed!==s&&(r.completed=s,r.sprite.material.map=s?this.completedMarkerTexture:ps(r.style.symbol,r.style.colour),r.sprite.material.needsUpdate=!0),r.selected=a,r.halo.material.opacity=a?.64:s?.5:.18,r.beam.material.opacity=a?.19:s?.13:.04,r.halo.userData.baseOpacity=r.halo.material.opacity,r.beam.userData.baseOpacity=r.beam.material.opacity}for(let n of this.stationMarkers.values()){let r=e.view==="region"&&n.region===e.region;if(n.root.visible=r,!r)continue;let s=e.stations?.[n.index],a=!!s?.resolved,o=e.selectedStation===s?.id;n.completed!==a&&(n.completed=a,n.sprite.material.map=a?this.completedMarkerTexture:ps(String(n.index+1),Ha[n.region].colour),n.sprite.material.needsUpdate=!0),n.selected=o,n.halo.material.opacity=o?.66:a?.48:.18,n.beam.material.opacity=o?.18:.04,n.halo.userData.baseOpacity=n.halo.material.opacity,n.beam.userData.baseOpacity=n.beam.material.opacity}}async createLandscape(){let e=new La,t=async v=>{try{return await e.loadAsync(new URL(`./assets/${v}`,document.baseURI).href)}catch{return this.textureErrors.push(v),null}},n=new Kn(360,360);n.rotateX(-Math.PI/2);let r=Ie(this.group,n,new zt({color:7518575,roughness:1}),0,-.42,0);r.castShadow=!1,r.receiveShadow=!0;let s=new Kn(180,180,120,120);s.rotateX(-Math.PI/2);let a=s.attributes.position;for(let v=0;v<a.count;v++){let b=a.getX(v),L=a.getZ(v),E=Math.max(Math.abs(b)-39,Math.abs(L)-38,0);a.setY(v,E*.17*(1.1+Math.sin(b*.13)*Math.cos(L*.1))-.08)}s.computeVertexNormals();let o=new zt({color:16777215,roughness:.92});Ie(this.group,s,o).castShadow=!1;let l=Ae("road",14931373,.03,.94);for(let v of Object.entries(dt).filter(([b])=>b!=="hq").map(([,b])=>b)){let b=v.clone().multiplyScalar(.5),L=v.length(),E=De(this.group,4.3,.07,L+8,l,b.x,.02,b.z);E.rotation.y=Math.atan2(v.x,v.z);for(let A=1;A<14;A++){let D=A/14,w=De(this.group,.09,.01,.68,Ae("line",16774871),v.x*D,.067,v.z*D);w.rotation.y=E.rotation.y}}let c=Ae("rock",8228218,0,.97),u=new os(1,1),d=new Oi(u,c,140),h=new At,f=18,g=()=>(f=f*1664525+1013904223>>>0,f/4294967296);for(let v=0;v<140;v++){let b=g()*Math.PI*2,L=39+g()*27,E=.3+g()*1.15;h.position.set(Math.cos(b)*L,.1,Math.sin(b)*L),h.scale.set(E*1.65,E*.72,E*1.15),h.rotation.set(g()*.25,g()*6,g()*.18),h.updateMatrix(),d.setMatrixAt(v,h.matrix)}d.castShadow=!0,d.receiveShadow=!0,this.group.add(d);for(let v=0;v<32;v++){let b=g()*6.28,L=36+g()*20,E=Math.cos(b)*L,A=Math.sin(b)*L;this.tree(E,A,.7+g()*.8)}let x=await t("world-biomes.jpg"),p=await t("ground-normal.jpg");x&&(x.colorSpace=Nt,x.anisotropy=8,o.map=x,o.color.set(16777215)),p&&(p.wrapS=p.wrapT=Ni,p.repeat.set(24,24),p.anisotropy=8),p&&(o.normalMap=p,o.normalScale.set(.6,.6)),o.needsUpdate=!0;let m=await t("concrete-colour.jpg"),M=await t("concrete-normal.jpg");for(let v of[m,M])v&&(v.wrapS=v.wrapT=Ni,v.repeat.set(6,6),v.anisotropy=8);m&&(m.colorSpace=Nt,wn.map=m,wn.color.set(13882570)),M&&(wn.normalMap=M,wn.normalScale.set(.4,.4)),wn.needsUpdate=!0}tree(e,t,n){let r=new ke;r.position.set(e,0,t),r.scale.setScalar(n),this.group.add(r),Se(r,.1,.25,5.3,Ae("bark",5327677),0,2.65,0,9);let s=[Ae("pine0",3098937),Ae("pine1",4020289),Ae("pine2",5335627)];for(let o=0;o<7;o++){let l=2.1+o*.55,c=1.55-o*.13,u=new os(1,1),d=Ie(r,u,s[o%s.length],o%2?.18:-.12,l,(o%3-1)*.14);d.scale.set(c,.72,c*.9),d.rotation.set(o*.17,o*.83,o*.08)}let a=Ie(r,new Pr(.62,1.5,12),s[0],0,5.55,0);a.rotation.y=.4}fieldNode(e,t,n,r,s){Se(e,.58,.66,.08,Ae("node-pad",5593941,.08,.94),t,.1,n,20);let a=Ie(e,new hn(.48,.045,8,24),s,t,.17,n);a.rotation.x=Math.PI/2;let o=Se(e,.09,.09,.09,Va,t,.25,n,12);o.castShadow=!1}sitePad(e,t,n=7.2,r=5.6,s=null){let a=new ke;a.position.set(t.x,0,t.z),a.scale.setScalar(.54),e.add(a);let o=new mi;for(let d=0;d<18;d++){let h=d/18*Math.PI*2,f=1+Math.sin(d*2.7)*.07+Math.cos(d*1.9)*.04,g=Math.cos(h)*n*.5*f,x=Math.sin(h)*r*.5*f;d?o.lineTo(g,x):o.moveTo(g,x)}o.closePath();let l=s?.color?.clone?.().lerp(new $e(13428396),.64)||new $e(9548663),c=new zt({color:l,roughness:.92}),u=Ie(a,new ds(o),c,0,.045,0);return u.rotation.x=-Math.PI/2,u.receiveShadow=!0,u.castShadow=!1,a}missionOutpost(e,t,n,r,s){let a=this.sitePad(e,t,6.8,5.2,r),o=Ae(`mission-cream-${s}`,16773073,.03,.82),l=Ae(`mission-window-${s}`,6272706,.22,.3);if(s==="M"){let u=Se(a,1.75,2.05,1.35,o,0,.78,0,24);for(let h=0;h<=n+2;h++)De(a,.58,.42,.58,h%2?r:l,-1.35+h*.62,1.65+h%2*.24,0);let d=Ie(a,new hn(1.35,.11,10,32,Math.PI),r,0,2.15,0);d.rotation.z=Math.PI,d.rotation.y=Math.PI/2}else if(s==="E"){Se(a,1.85,2.1,1.2,o,0,.7,0,24);for(let h of[-1,1]){let f=De(a,2.25,.12,2.4,o,h*1.02,1.55,0);f.rotation.z=h*-.26}let u=Se(a,.18,.18,3.1,r,2.2,1.55,.4,12),d=Ie(a,new Pr(.18,.5,12),en,2.2,3.35,.4);u.rotation.z=d.rotation.z=-.08}else if(s==="P"){Se(a,1.8,2.05,1.15,o,0,.66,0,24);let u=Ie(a,new Qe(.72,20,12),l,0,2.15,0),d=new ke;d.position.set(0,2.15,0),a.add(d);for(let h of[0,Math.PI/3])Ie(d,new hn(1.2,.06,8,36),r).rotation.set(Math.PI/2,h,h);this.animatedProps.push({kind:"spin",object:d,speed:.25+n*.03,phase:n})}else if(s==="C"){Se(a,1.75,2.1,1.2,o,0,.7,0,24);let u=new ke;u.position.set(0,1.4,0),a.add(u),Ie(u,new Qe(.9,20,13),l,0,.65,0),Se(u,.34,.42,1.35,o,0,1.65,0,18);for(let d=0;d<4;d++){let h=Ie(u,new Qe(.13+d*.035,12,8),r,-.35+d*.22,1.9+d*.28,0);this.animatedProps.push({kind:"bubble",object:h,baseY:h.position.y,range:1.15,speed:.34+d*.05,phase:n+d*.24})}}else{Se(a,1.8,2.1,1.05,o,0,.62,0,24);let u=Ie(a,new Qe(1.7,22,12,0,Math.PI*2,0,Math.PI/2),new zt({color:7788194,transparent:!0,opacity:.78,roughness:.25}),0,1.35,0);for(let d of[-.9,0,.9]){Se(a,.1,.18,1.2,Ae("bio-stem",4619090),d,1.2,.25,10);let h=Ie(a,new Qe(.38,12,8),r,d+.22,1.7,.25);h.scale.set(1.35,.48,.8),h.rotation.z=-.45}u.castShadow=!1}let c=Ie(a,new Qe(.17,12,8),new zt({color:16777215,emissive:r.color,emissiveIntensity:1.6}),0,3.45,0);this.animatedProps.push({kind:"bob",object:c,baseY:c.position.y,speed:1.4,phase:n*.7,amp:.12})}gableRoof(e,t,n,r,s){for(let a of[-1,1]){let o=De(e,t*.58,.16,n+.3,s,a*t*.235,r,0);o.rotation.z=a*-.43}}supplyDepot(e,t){let n=this.sitePad(e,t,8,6);De(n,5.2,2.25,3.5,vi,-.65,1.24,-.35),this.gableRoof(n,5.5,3.7,2.65,ut);for(let r of[-1.75,-.25])De(n,1.15,1.35,.08,en,r,.86,1.43);for(let r of[2.1,3.25])this.crate(n,r,.75,r>3?Ht:vi)}repairWorkshop(e,t){let n=this.sitePad(e,t,8,6);De(n,5.8,2.2,3.7,Ht,0,1.22,-.35),De(n,6.1,.16,4,ut,0,2.4,-.35);for(let s of[-1.65,0,1.65])De(n,1.35,1.45,.08,s===0?vi:en,s,.9,1.54);for(let s of[-2.5,2.5]){let a=Se(n,.48,.48,.28,en,s,.36,2,18);a.rotation.z=Math.PI/2}let r=new ke;r.position.set(0,0,-2.1),n.add(r);for(let s of[-.8,.8])ft(r,ie(s,0,0),ie(s,2.8,0),.07,Fn);ft(r,ie(-.9,2.8,0),ie(.9,2.8,0),.08,Fn)}railYard(e,t){let n=this.sitePad(e,t,9,6.5);for(let a of[-1.2,1.2])ft(n,ie(a,.14,-3),ie(a,.14,3),.06,ut);for(let a=-2.8;a<=2.8;a+=.65)De(n,3.2,.09,.13,en,0,.09,a);let r=new ke;r.position.set(0,.28,-.5),n.add(r),De(r,3.2,.75,1.55,vi,0,.58,0),De(r,3.45,.12,1.75,ut,0,.14,0);for(let a of[-1.15,1.15])for(let o of[-.68,.68]){let l=Se(r,.28,.28,.16,en,a,.08,o,14);l.rotation.x=Math.PI/2}let s=new ke;s.position.set(0,0,1.7),n.add(s);for(let a of[-2.4,2.4])ft(s,ie(a,0,0),ie(a,3.2,0),.09,Fn);ft(s,ie(-2.6,3.2,0),ie(2.6,3.2,0),.11,Fn)}powerSubstation(e,t){let n=this.sitePad(e,t,7.8,6.2);for(let r of[-2,0,2]){De(n,1.15,1.35,1.45,ut,r,.8,0);for(let s of[-.35,.35])Se(n,.09,.15,.7,Ae("insulator",7308926,.25,.5),r+s,1.85,0,12)}for(let r of[-3,3])ft(n,ie(r,0,-2),ie(r,3.4,-2),.08,Ht),ft(n,ie(r,0,2),ie(r,3.4,2),.08,Ht);ft(n,ie(-3,3.4,-2),ie(3,3.4,-2),.08,Ht),ft(n,ie(-3,3.4,2),ie(3,3.4,2),.08,Ht);for(let r of[-2,2])for(let s of[-2,0,2])Se(n,.07,.12,.5,Fn,s,3.7,r,10)}materialsLab(e,t){let n=this.sitePad(e,t,8,6);De(n,5.5,2.35,3.8,Ae("lab",12041392,.24,.74),-.45,1.28,-.2),De(n,5.8,.16,4.1,ut,-.45,2.53,-.2);for(let s of[-2,-.7,.6,1.9])De(n,.95,.85,.07,Hi,s,1.45,1.74);for(let s of[-1.6,.2,2])Se(n,.24,.33,1.1+(s===.2?.35:0),ut,s,3.1,-.6,14);let r=new ke;r.position.set(2.8,0,1.75),n.add(r),De(r,1.3,.1,.8,wn,0,.85,0);for(let s of[-.5,.5])Se(r,.04,.04,.85,Ht,s,.43,0,8)}fieldTestRig(e,t){let n=this.sitePad(e,t,8,6),r=De(n,4.7,.16,1.5,ut,-.6,1.05,0);r.rotation.z=-.25,De(n,1.2,.65,1.25,vi,-2.45,.46,0);let s=new ke;s.position.set(2.1,0,0),n.add(s),ft(s,ie(-1.1,0,0),ie(0,3.6,0),.09,Fn),ft(s,ie(1.1,0,0),ie(0,3.6,0),.09,Fn),ft(s,ie(-1.2,2.4,0),ie(1.2,2.4,0),.08,Fn),ft(s,ie(0,3.55,0),ie(0,1.25,0),.035,en),De(s,.65,.65,.65,Mn,0,.95,0)}researchOutpost(e,t){let n=this.sitePad(e,t,7.5,6);for(let o of[-2,2])for(let l of[-1.3,1.3])Se(n,.08,.11,1.2,ut,o,.62,l,8);De(n,5.1,1.85,3.5,vi,0,2.05,0),this.gableRoof(n,5.3,3.7,3.15,ut),De(n,1.2,1.05,.08,Hi,0,2.15,1.78);let r=Se(n,.07,.1,4.4,ut,2.8,2.2,-.9,10),s=new ke;s.position.set(2.8,4.05,-.9),n.add(s);let a=Ie(s,new Qe(.72,16,8,0,Math.PI*2,0,Math.PI/2),wn);a.rotation.x=1.05}weatherStation(e,t){let n=this.sitePad(e,t,7.2,6),r=De(n,2.8,1.65,2.45,wn,-1.45,.95,.5);this.gableRoof(n,3,2.65,1.9,ut);let s=Se(n,.06,.1,4.7,ut,1.45,2.35,0,10);ft(n,ie(.6,3.4,0),ie(2.3,3.4,0),.04,ut);for(let[o,l]of[[.6,0],[2.3,0],[1.45,.85]])Se(n,.22,.22,.1,Fn,o,3.55,l,12);let a=Ie(n,new Qe(.72,18,9,0,Math.PI*2,0,Math.PI/2),Ae("weather-dome",13096914,.15,.5),1.45,4.85,0);a.scale.y=.7}waterAnalysis(e,t){let n=this.sitePad(e,t,8,6.3);for(let r of[-1.8,.2,2.2])Se(n,.82,.82,1.75,r===.2?vi:ut,r,.96,-.35,22),Se(n,.84,.84,.1,wn,r,1.86,-.35,22);ft(n,ie(-2.6,.75,-.35),ie(3,.75,-.35),.1,Ae("water-pipe",5145999,.35,.45)),De(n,4.8,.16,1.5,ut,.2,1.95,1.65);for(let r of[-1.7,2.1])Se(n,.07,.08,2,ut,r,1,1.65,8);for(let r of[-1.2,.2,1.6])Se(n,.22,.15,.55,Hi,r,2.35,1.65,16)}createTank(){let e=new ke;Dr(e,2.45,.52,4.6,Ht,0,.96,0),Dr(e,2.58,.48,3.9,Mn,0,1.37,-.08,.32);let t=De(e,2.36,.11,.91,Mn,0,1.28,1.91);t.rotation.x=-.38;for(let c of[-1,1]){let u=new Oi(new Jn(.59,.095,.21),en,64);u.castShadow=!0,u.receiveShadow=!0;let d=new Oi(new Jn(.63,.045,.11),ut,64);d.castShadow=!0,e.add(u,d),this.tracks.push({track:u,shoe:d,side:c});for(let h=0;h<7;h++){let f=Se(e,.39,.39,.42,en,c*1.39,.58,-1.62+h*.54,20);f.rotation.z=Math.PI/2,this.wheels.push(f);let g=Se(e,.27,.27,.045,Mn,c*1.62,.58,-1.62+h*.54);g.rotation.z=Math.PI/2;let x=Se(e,.09,.09,.055,ut,c*1.66,.58,-1.62+h*.54,6);x.rotation.z=Math.PI/2}for(let h=0;h<5;h++)Dr(e,.12,.45,.65,Mn,c*1.64,1.24,-1.58+h*.76,.035);ft(e,ie(c*1.05,1.63,-1.3),ie(c*1.05,1.63,1.35),.025,ut),De(e,.5,.06,4.45,Ht,c*1.36,1.54,0),Ie(e,new hn(.12,.027,6,12),ut,c*.8,1.07,2.44),De(e,.2,.12,.08,Va,c*1.08,1.49,1.84),De(e,.17,.08,.05,Ae("rear-lamp",9845801,.1),c*1.1,1.46,-2)}let n=new ke;e.add(n),n.position.set(0,1.64,.03),Se(n,.78,.85,.17,en,0,.05,0,32),Dr(n,1.82,.6,1.92,Mn,0,.44,-.2,.3);let r=Dr(n,.7,.49,.38,Ht,0,.41,.91,.11),s=Se(n,.092,.14,2.35,Mn,0,.44,2.08,20);s.rotation.x=Math.PI/2;for(let c of[1.1,1.43,2.64,3.1]){let u=Se(n,.145,.145,.09,ut,0,.44,c,20);u.rotation.x=Math.PI/2}let a=Se(n,.091,.091,.03,en,0,.44,3.26,20);a.rotation.x=Math.PI/2,Se(n,.32,.35,.08,Ht,.4,.81,-.24,24),Se(n,.23,.25,.1,Mn,-.4,.79,-.45,24),De(n,.38,.16,.24,Ht,-.45,.9,.25),De(n,.3,.07,.025,Hi,-.45,.93,.385),ft(n,ie(.73,.7,-.85),ie(.76,2.9,-.93),.012,en);for(let c=0;c<8;c++)De(e,1.3,.035,.035,en,0,1.644,-1.55+c*.055);for(let c of[-.75,.75])Dr(e,.46,.38,.75,Ht,c,1.77,-1.56,.055);Ga(n,"07",-.91,.46,-.15,.64).rotation.y=-Math.PI/2,Ga(n,"07",.91,.46,-.15,.64).rotation.y=Math.PI/2,Ga(e,"ATLAS",0,1.35,2.07,.9);let o=new Oi(new Rr(.026,.026,.025,6),ut,48),l=new At;for(let c=0;c<48;c++){let u=c<24?-1:1;l.position.set(u*1.13,1.64,-1.8+c%24*.153),l.updateMatrix(),o.setMatrixAt(c,l.matrix)}return e.add(o),this.updateTracks(0),e}updateTracks(e){let t=new At;for(let{track:n,shoe:r,side:s}of this.tracks)for(let a=0;a<64;a++){let o=6.6+Math.PI*.96,l=((a/64*o+e)%o+o)%o,c,u,d;if(l<3.3)c=-1.65+l,u=1.06,d=0;else if(l<3.3+Math.PI*.48)d=(l-3.3)/.48,c=1.65+Math.sin(d)*.48,u=.58+Math.cos(d)*.48;else if(l<6.6+Math.PI*.48)c=1.65-(l-3.3-Math.PI*.48),u=.1,d=Math.PI;else{let h=(l-6.6-Math.PI*.48)/.48;d=Math.PI+h,c=-1.65-Math.sin(h)*.48,u=.58-Math.cos(h)*.48}t.position.set(s*1.4,u,c),t.rotation.set(d,0,0),t.updateMatrix(),n.setMatrixAt(a,t.matrix),t.position.y+=Math.cos(d)*.06,t.position.z+=Math.sin(d)*.06,t.updateMatrix(),r.setMatrixAt(a,t.matrix)}for(let{track:n,shoe:r}of this.tracks)n.instanceMatrix.needsUpdate=!0,r.instanceMatrix.needsUpdate=!0}createBase(e){for(this.hqLevel=e;this.hq.children.length;)this.hq.remove(this.hq.children[0]);let t=Ae("hq-teal",2924433,.08,.55),n=Ae("hq-roof",2383720,.12,.56),r=Ae("hq-warm",16762967,.06,.56),s=Ae("hq-cream",16182735,.02,.82),a=Ae("hq-coral",15692911,.05,.58);this.districtGarden(this.hq,5621152);let o=e===1?1.65:e===2?2.65:3.25;Se(this.hq,3.4,3.9,o,s,-3.2,o/2+.16,-3.1,32);let l=Ie(this.hq,new Qe(3.5,28,14,0,Math.PI*2,0,Math.PI/2),t,-3.2,o+.14,-3.1);l.scale.y=.48,l.castShadow=!0;for(let g=0;g<7;g++){let x=-.9+g*.3,p=Ie(this.hq,new Kn(.72,.82),Hi,-3.2+Math.sin(x)*3.42,o*.62,-3.1+Math.cos(x)*3.42);p.rotation.y=x,p.castShadow=!1}Se(this.hq,2.45,2.8,1.7,t,4.4,1.02,-3.5,28);let c=Ie(this.hq,new Qe(2.55,24,12,0,Math.PI*2,0,Math.PI/2),n,4.4,1.86,-3.5);c.scale.y=.38;let u=new ke;u.position.set(4.4,2.55,-3.5),this.hq.add(u);let d=Ie(u,new hn(.63,.15,10,24,Math.PI*1.45),r);d.rotation.z=.7,ft(u,ie(-.5,-.45,0),ie(.65,.62,0),.16,r);for(let g=0;g<4;g++){let x=Se(this.hq,.55,.66,.58,g%2?a:r,-6.5+g*1.38,.34,3.8,16);x.rotation.y=g*.3}for(let g=0;g<6;g++){let x=Se(this.hq,.055,.08,1.2,n,-7+g*2.4,.65,6,10),p=Ie(this.hq,new Qe(.18,12,8),g%2?r:a,-7+g*2.4,1.35,6);this.animatedProps.push({kind:"bob",object:p,baseY:p.position.y,speed:1.1,phase:g*.6,amp:.07})}let h=new ke;h.position.set(-6.4,0,-5.5),this.hq.add(h),Se(h,.12,.22,5.7,n,0,2.85,0,12),this.dish=new ke,h.add(this.dish),this.dish.position.set(0,5.1,0);let f=Ie(this.dish,new Qe(1.05,20,10,0,Math.PI*2,0,Math.PI/2),s);if(f.rotation.x=1.1,ft(this.dish,ie(0,0,0),ie(0,.4,1.15),.035,n),e>1)for(let g=0;g<5;g++){let x=g/5*Math.PI*2,p=De(this.hq,2.25,.08,1.25,Hi,Math.cos(x)*5.5,.72,Math.sin(x)*4.7-1.2);p.rotation.x=.28,p.rotation.y=-x}if(e>2){let g=new ke;g.position.set(-3.2,o+1.2,-3.1),this.hq.add(g),Se(g,.42,.68,2.4,r,0,1.2,0,18);let x=Ie(g,new Qe(.48,16,10),Va,0,2.55,0),p=Ie(g,new hn(.9,.08,10,36),a,0,2.55,0);p.rotation.x=Math.PI/2,this.animatedProps.push({kind:"spin",object:p,speed:.35,phase:0}),x.castShadow=!1}}building(e,t,n,r,s,a,o,l){let c=new ke;c.position.set(t,0,n),e.add(c),De(c,r+.4,.28,s+.4,wn,0,.2,0),De(c,r,a,s,l,0,a/2+.3,0),De(c,r+.3,.18,s+.3,ut,0,a+.4,0);for(let u=0;u<Math.floor(r);u++)De(c,.63,.67,.06,Hi,-r/2+.65+u,a*.68,s/2+.035),De(c,.66,.03,.09,ut,-r/2+.65+u,a*.68-.34,s/2+.06);De(c,1.2,1.75,.07,en,r*.27,1.17,s/2+.06);for(let u=0;u<12;u++)De(c,.015,a-.2,.035,Ht,-r/2+u*r/12,a/2+.3,s/2+.08);Ga(c,o,-r*.12,a-.04,s/2+.12,Math.min(r-.7,3.8)),De(c,1.2,.5,1.15,wn,-r/3,a+.73,-.6)}crate(e,t,n,r=Ht){De(e,1,.8,.85,r,t,.54,n);for(let s of[-.32,.32])De(e,.06,.87,.9,ut,t+s,.54,n);De(e,.3,.12,.03,Fn,t,.57,n+.44)}lightPole(e,t,n){Se(e,.055,.09,4.3,ut,t,2.15,n,8),ft(e,ie(t,4.1,n),ie(t+.65,4.1,n),.045,ut),De(e,.4,.1,.25,Va,t+.65,4.06,n)}districtGarden(e,t){let n=new mi;for(let o=0;o<28;o++){let l=o/28*Math.PI*2,c=7.1+Math.sin(o*1.9)*.55+Math.cos(o*3.1)*.28;o?n.lineTo(Math.cos(l)*c,Math.sin(l)*c*.82+1):n.moveTo(Math.cos(l)*c,Math.sin(l)*c*.82+1)}n.closePath();let r=new Un({color:t,transparent:!0,opacity:.27,depthWrite:!1}),s=Ie(e,new ds(n),r,0,.085,0);s.rotation.x=-Math.PI/2,s.castShadow=!1;let a=new zt({color:t,emissive:t,emissiveIntensity:.18,roughness:.7});for(let o=0;o<22;o++){let l=o/22*Math.PI*2+Math.sin(o)*.16,c=6+o%3*.5,u=Ie(e,new Qe(.11+o%2*.04,9,6),a,Math.cos(l)*c,.19,Math.sin(l)*c*.82+1);u.castShadow=!1}}createHarbour(){let e=new ke;e.position.copy(dt.harbour),this.group.add(e);let t=Ae("math-aqua",1226929,.08,.55),n=Ae("math-gold",16762967,.08,.55),r=Ae("math-ink",2186090,.12,.6);this.districtGarden(e,3397064),Se(e,3.3,3.8,1.3,Ae("math-cream",16773318,.02,.86),0,.72,-1.1,32);for(let l=0;l<4;l++)Se(e,2.8-l*.45,3.12-l*.45,.55,l%2?t:n,-1.5+l*1.02,1.45+l*.53,-1.1,24);let s=new ke;s.position.set(3.9,0,2),e.add(s);for(let l of[-2,2]){let c=Se(s,.15,.2,4,n,l,2,0,16);c.rotation.z=-.06*l}for(let l=.85;l<3.7;l+=.66){ft(s,ie(-2.05,l,0),ie(2.05,l,0),.055,r);for(let c=0;c<5;c++){let u=Ie(s,new Qe(.24,14,8),c%2?t:n,-1.25+c*.62,l,0);u.scale.x=1.35,this.animatedProps.push({kind:"slide",object:u,baseX:u.position.x,speed:.35+l*.05,phase:c+l})}}Ie(e,new hn(2.1,.18,12,48,Math.PI),r,-4.2,2.1,2.2).rotation.set(0,Math.PI/2,Math.PI);for(let l=0;l<7;l++)Se(e,.14,.2,.22+l*.08,n,-5.8+l*.52,.2+l*.04,2.2,12);xi.harbour.map(l=>l.position.clone().sub(dt.harbour)).forEach((l,c)=>{this.fieldNode(e,l.x,l.z,c+1,t),this.missionOutpost(e,l,c,t,"M")})}createEnglishDistrict(){let e=new ke;e.position.copy(dt.english),this.group.add(e);let t=Ae("paper-stone",16773071,.02,.86),n=Ae("english-coral",15822707,.05,.58),r=Ae("english-plum",9260174,.08,.58),s=Ae("english-ink",3693181,.08,.62),a=Ae("english-gold",16762967,.04,.56);this.districtGarden(e,16745864),Se(e,3.45,3.9,1.35,t,0,.75,-1.3,32);for(let u of[-1,1]){let d=De(e,4.35,.18,4.4,t,u*1.85,2.15,-1.3);d.rotation.z=u*-.28;for(let h=-2.9;h<.5;h+=.55){let f=De(e,2.8,.035,.05,s,u*1.8,2.26,h);f.rotation.z=u*-.28}}let o=new ke;o.position.set(4.6,0,2),o.rotation.z=-.09,e.add(o),Se(o,.38,.38,5.2,n,0,2.6,0,12),Ie(o,new Pr(.38,1.1,12),Ae("pencil-wood",15780239),0,5.75,0),Se(o,.39,.39,.5,r,0,.25,0,12);let l=new ke;l.position.set(-4.6,1,2.1),l.rotation.z=-.3,e.add(l),ft(l,ie(0,0,0),ie(0,3.9,0),.08,a);for(let u=0;u<7;u++){let d=Ie(l,new Qe(.32,12,7),u%2?n:r,u%2?.32:-.32,1.2+u*.38,0);d.scale.set(1.15,.38,.42),d.rotation.z=u%2?-.55:.55}xi.english.map(u=>u.position.clone().sub(dt.english)).forEach((u,d)=>{this.fieldNode(e,u.x,u.z,d+1,n),this.missionOutpost(e,u,d,n,"E")})}createPhysicsDistrict(){let e=new ke;e.position.copy(dt.physics),this.group.add(e);let t=Ae("physics-violet",7693800,.12,.48),n=Ae("physics-electric",3589864,.05,.42),r=Ae("physics-copper",16757582,.2,.48),s=Ae("physics-white",15660287,.02,.75);this.districtGarden(e,8615156),Se(e,3.45,4,1.3,s,-1,.72,-1.3,32);let a=Ie(e,new Qe(1.7,28,18),new zt({color:3887527,emissive:2438266,emissiveIntensity:.5,roughness:.25}),-1,3.1,-1.3),o=new ke;o.position.copy(a.position),e.add(o);for(let d of[0,Math.PI/3,-Math.PI/3])Ie(o,new hn(2.45,.095,10,56),d?n:r).rotation.set(Math.PI/2,d,d*.7);for(let d=0;d<3;d++){let h=Ie(o,new Qe(.22,14,8),d===1?r:n,Math.cos(d*2.1)*2.4,Math.sin(d*1.7)*1.2,Math.sin(d*2.1)*2.4);h.castShadow=!1}this.animatedProps.push({kind:"spin",object:o,speed:.28,phase:0});let l=new ke;l.position.set(4.5,0,2.2),e.add(l);for(let d of[-1.35,1.35])ft(l,ie(d,0,0),ie(d,4.5,0),.12,t);ft(l,ie(-1.55,4.5,0),ie(1.55,4.5,0),.13,t);let c=new ke;c.position.set(0,4.4,0),l.add(c),ft(c,ie(),ie(0,-3.2,0),.045,s),Ie(c,new Qe(.52,18,12),r,0,-3.25,0),this.animatedProps.push({kind:"swing",object:c,speed:1.15,phase:0,amp:.45});for(let d=0;d<5;d++){let h=De(e,.45,.03,2.3,[Ae("rainbow-r",15883874),Ae("rainbow-o",16756299),Ae("rainbow-y",16768867),Ae("rainbow-g",5885834),Ae("rainbow-b",5353192)][d],-5+d*.42,.18,2.9);h.rotation.y=-.28}xi.physics.map(d=>d.position.clone().sub(dt.physics)).forEach((d,h)=>{this.fieldNode(e,d.x,d.z,h+1,t),this.missionOutpost(e,d,h,t,"P")})}createChemistryDistrict(){let e=new ke;e.position.copy(dt.chemistry),this.group.add(e);let t=Ae("chemistry-teal",1621925,.05,.45),n=Ae("chemistry-lime",12576839,.03,.45),r=Ae("chemistry-orange",16747349,.05,.5),s=Ae("chemistry-cream",16250332,.02,.78);this.districtGarden(e,2676925),Se(e,3.5,4,1.3,s,-1,.72,-1.2,32);let a=new ke;a.position.set(-1,1.25,-1.2),e.add(a);let o=new zt({color:8974824,emissive:1805698,emissiveIntensity:.35,transparent:!0,opacity:.76,roughness:.2});Ie(a,new Qe(2.05,28,18),o,0,1.45,0),Se(a,.65,.85,2.55,s,0,3.2,0,22),Se(a,.82,.82,.16,r,0,4.5,0,22);let l=Ie(a,new Qe(1.83,26,14,0,Math.PI*2,Math.PI*.49,Math.PI*.5),n,0,1.38,0);l.castShadow=!1;for(let h=0;h<11;h++){let f=Ie(a,new Qe(.11+h%3*.04,12,8),h%2?r:n,-.9+h%5*.42,1.3+h%4*.48,-.35+h%3*.32);f.castShadow=!1,this.animatedProps.push({kind:"bubble",object:f,baseY:f.position.y,range:2.1,speed:.3+h%4*.07,phase:h*.17})}for(let h of[3.3,5])Se(e,.58,.78,2.5+(h-3.3)*.45,h>4?r:t,h,1.35,2.2,22),Se(e,.18,.28,1.1,s,h,3.1+(h-3.3)*.22,2.2,16);let c=new ke;c.position.set(-4.8,2.6,2.8),e.add(c);let u=[ie(0,0,0),ie(1.2,.7,0),ie(-.9,1,.25),ie(.15,1.8,-.2)];u.slice(1).forEach(h=>ft(c,ie(),h,.1,s)),u.forEach((h,f)=>Ie(c,new Qe(f?.34:.5,16,10),[t,r,n][f%3],h.x,h.y,h.z)),this.animatedProps.push({kind:"spin",object:c,speed:.18,phase:0}),xi.chemistry.map(h=>h.position.clone().sub(dt.chemistry)).forEach((h,f)=>{this.fieldNode(e,h.x,h.z,f+1,t),this.missionOutpost(e,h,f,t,"C")})}createScienceBase(){let e=new ke;e.position.copy(dt.grove),this.group.add(e);let t=Ae("bio-leaf",6732109,.03,.6),n=Ae("bio-lime",12180552,.03,.56),r=Ae("bio-bark",9201480,.03,.76),s=Ae("bio-flower",16766287,.02,.55),a=Ae("bio-white",15987929,.02,.78);this.districtGarden(e,10410834),Se(e,3.7,4.15,1.2,a,-1.4,.67,-1.4,32);let o=new ke;o.position.set(-1.4,.8,-1.4),e.add(o),Se(o,.72,1.12,4.5,r,0,2.25,0,18);for(let[f,g,x,p]of[[0,4.7,0,2.25],[-1.4,4.1,.2,1.45],[1.3,4.2,-.3,1.55],[-.4,5.4,-.8,1.4],[.7,5.2,.8,1.3]])Ie(o,new Qe(1,18,12),f+x>0?n:t,f,g,x).scale.set(p,p*.72,p);let l=Se(o,1.2,1.45,1.25,Ae("treehouse",16766602,.02,.72),0,3.2,0,18);for(let f=0;f<7;f++)Se(o,.07,.07,1.1,r,-1.3+f*.42,2.1+f*.1,1.1,8).rotation.z=-.18;let c=new zt({color:7725507,emissive:2325861,emissiveIntensity:.18,transparent:!0,opacity:.68,roughness:.22}),u=Ie(e,new Qe(2.35,28,14,0,Math.PI*2,0,Math.PI/2),c,4.2,.35,-1.8);u.scale.y=.72,u.castShadow=!1;for(let f of[3.4,4.2,5]){Se(e,.09,.14,1.5,r,f,.9,-1.8,10);let g=Ie(e,new Qe(.38,12,8),f===4.2?s:t,f+.2,1.75,-1.8);g.scale.set(1.25,.45,.7),g.rotation.z=-.45}let d=new ke;d.position.set(4.5,.3,2.8),e.add(d);for(let f=0;f<12;f++){let g=f*.7,x=f*.32,p=ie(Math.sin(g)*.72,x,Math.cos(g)*.72),m=ie(-p.x,x,-p.z);Ie(d,new Qe(.13,10,6),f%2?n:t,p.x,p.y,p.z),Ie(d,new Qe(.13,10,6),f%2?t:n,m.x,m.y,m.z),ft(d,p,m,.035,a)}this.animatedProps.push({kind:"spin",object:d,speed:.16,phase:0}),xi.grove.map(f=>f.position.clone().sub(dt.grove)).forEach((f,g)=>{this.fieldNode(e,f.x,f.z,g+1,t),this.missionOutpost(e,f,g,t,"L")});for(let[f,g,x]of[[8,-7,.65],[8.5,1,.7],[-8,-1,.6],[-7,6,.7]])this.tree(dt.grove.x+f,dt.grove.z+g,x)}stationNode(e,t){return xi[e]?.[t]||null}clearRoute(){for(;this.routeLayer.children.length;)this.routeLayer.remove(this.routeLayer.children[0])}stationRoute(e,t){let n=this.tank.position.clone(),r=(dt[e]||dt.hq).clone().add(ie(2.4,.02,4.5)),s=[n];return n.distanceTo(r)>1.2&&t.distanceTo(r)>1.2&&s.push(r),s.push(t.clone()),s}showRoutePath(e){this.clearRoute();for(let t=0;t<e.length-1;t++){let n=e[t],r=e[t+1],s=n.distanceTo(r),a=Math.max(4,Math.floor(s/1.05));for(let o=t?0:1;o<a;o++){if(o%2===0)continue;let l=n.clone().lerp(r,o/a),c=Se(this.routeLayer,.15,.2,.07,xv,l.x,.24,l.z,10);c.castShadow=!1}}}selectStation(e,t){let n=t===null?"":`${e}:${t}`;if(n===this.selectedNodeKey)return;if(this.selectedNodeKey=n,t===null){this.waypoint.visible=!1,this.clearRoute();return}let r=this.stationNode(e,t);r&&(this.waypoint.position.copy(r.position),this.waypoint.visible=!0,this.showRoutePath(this.stationRoute(e,r.position)))}setView(e,t="hq"){if(this.view=e,this.destination=t,e==="travel")return;let n=`${e}:${t}`,r=n!==this.framingKey;if(this.framingKey=n,e==="map"){this.target.set(0,0,-10),this.radius=63,this.elevation=55,r&&(this.yaw=.1);return}let s=dt[t]||dt.hq;!this.travel&&this.currentArea!==t&&(this.tank.position.copy(s).add(ie(2.4,.02,4.5)),this.tank.rotation.y=.3,this.currentArea=t);let a=this.selectedNodeKey.startsWith(`${t}:`)?this.stationNode(t,Number(this.selectedNodeKey.split(":")[1]))?.position:null;this.target.copy(e==="region"?s:e==="station"&&a?a:s).add(ie(0,1,0)),e==="region"&&this.width<650&&this.target.lerp(dt.hq.clone().add(ie(0,1,0)),.5),e==="region"?(this.radius=38,this.elevation=31):e==="station"?(this.radius=23,this.elevation=17):(this.radius=18,this.elevation=11),r&&(this.yaw=e==="region"?.1:e==="station"?.28:.73)}drive(e,t){let n=(dt[e]||dt.hq).clone().add(ie(2.4,.02,4.5));this.beginTravel([this.tank.position.clone(),n],t,{kind:"region",region:e,label:mv[e]||"Destination"})}driveToStation(e,t,n){let r=this.stationNode(e,t);r&&(this.selectStation(e,t),this.beginTravel(this.stationRoute(e,r.position.clone().add(ie(0,.02,0))),n,{kind:"station",region:e,index:t,label:r.label}))}beginTravel(e,t,n){let r=e.slice(1).map((o,l)=>e[l].distanceTo(o)),s=r.reduce((o,l)=>o+l,0),a=e.at(-1);this.showRoutePath(e),this.travel={...n,path:e,lengths:r,totalLength:s,start:e[0],end:a,elapsed:0,duration:this.reduced?1:n.kind==="station"?5.2:6.5},this.onTravelEnd=t,this.view="travel",this.destination=n.region}zoom(e){let t=this.view==="map"||this.view==="region";this.radius=vc(this.radius+e,t?34:12,t?68:44)}resetCamera(){this.framingKey="",this.setView(this.view,this.destination)}resize(){let e=this.canvas.parentElement.getBoundingClientRect();this.width=e.width,this.height=e.height,this.camera.aspect=e.width/e.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(e.width,e.height,!1)}animate=e=>{if(!this.running)return;requestAnimationFrame(this.animate);let t=Math.min((e-this.last)/1e3||0,.05);if(this.last=e,!this.paused&&!document.hidden){if(this.clock+=t,this.frame++,this.dish&&!this.reduced&&(this.dish.rotation.y=Math.sin(this.clock*.18)*.7),this.rig&&!this.reduced&&(this.rig.position.y=1+Math.sin(this.clock*.45)*.06),!this.reduced){for(let a of this.animatedProps)if(a.kind==="spin")a.object.rotation.y=this.clock*a.speed+a.phase;else if(a.kind==="swing")a.object.rotation.z=Math.sin(this.clock*a.speed+a.phase)*a.amp;else if(a.kind==="bob")a.object.position.y=a.baseY+Math.sin(this.clock*a.speed+a.phase)*a.amp;else if(a.kind==="slide")a.object.position.x=a.baseX+Math.sin(this.clock*a.speed+a.phase)*.22;else if(a.kind==="bubble"){let o=(this.clock*a.speed+a.phase)%1;a.object.position.y=a.baseY+o*a.range,a.object.scale.setScalar(.72+Math.sin(o*Math.PI)*.38)}}if(this.travel){let a=this.travel;a.elapsed+=t;let o=vc(a.elapsed/a.duration,0,1),c=o*o*(3-2*o)*a.totalLength,u=0;for(;u<a.lengths.length-1&&c>a.lengths[u];)c-=a.lengths[u],u++;let d=a.path[u],h=a.path[u+1]||a.end,f=a.lengths[u]?vc(c/a.lengths[u],0,1):1;this.tank.position.lerpVectors(d,h,f),this.tank.rotation.y=Math.atan2(h.x-d.x,h.z-d.z),this.tank.position.y=.02+(this.reduced?0:Math.sin(this.clock*22)*.013),this.updateTracks(this.clock*2.7),this.target.copy(this.tank.position).lerp(a.end,.16).add(ie(0,1,0)),this.radius=42,this.elevation=34,this.yaw=.22;let g=h.clone().sub(d).normalize();if(this.dustPuffs.forEach((x,p)=>{let m=(this.clock*.72+p/this.dustPuffs.length)%1,M=p%2?1:-1;x.visible=!this.reduced,x.position.copy(this.tank.position).addScaledVector(g,-1.7-m*4.3).add(ie(g.z*M*(.3+m),.18+m*.8,-g.x*M*(.3+m))),x.scale.setScalar(.35+m*1.25),x.material.opacity=(1-m)*.24}),o>=1){this.currentArea=a.region,this.travel=null,this.clearRoute(),this.dustPuffs.forEach(p=>{p.visible=!1,p.material.opacity=0});let x=this.onTravelEnd;this.onTravelEnd=null,x?.()}}}if(this.waypoint.visible&&!this.reduced){let a=1+Math.sin(this.clock*3.8)*.12;this.waypointRing.scale.setScalar(a),this.waypoint.rotation.y=this.clock*.18}for(let a of[...this.mapMarkers.values(),...this.stationMarkers.values()])if(a.root.visible){let o=this.reduced?1:1+Math.sin(this.clock*2.4+a.root.position.x*.11)*(a.selected?.11:.045),l=this.width<650?this.view==="map"?2.7:this.view==="region"?2.05:1.2:1,c=a.station?2.8:4.35;a.sprite.scale.setScalar(c*o*l),a.halo.scale.setScalar((a.selected?1.15:1)*o);let u=a.halo.userData.baseOpacity??a.halo.material.opacity,d=a.beam.userData.baseOpacity??a.beam.material.opacity;a.halo.material.opacity=u*(.86+(o-1)*1.7),a.beam.material.opacity=d*(.82+(o-1)*1.4)}this.water&&!this.reduced&&(this.water.position.y=-.12+Math.sin(this.clock*.55)*.035);let n=this.width<650,r=this.view==="map"||this.view==="region",s=n?this.view==="map"||this.view==="region"?3:this.view==="travel"?1.8:1.32:1;if(this.scene.fog.density=r||this.view==="travel"?.0015:.009,this.cameraGoal.copy(this.target).add(ie(Math.sin(this.yaw)*this.radius*s,this.elevation*s,Math.cos(this.yaw)*this.radius*s)),this.lookGoal.copy(this.target),!r&&this.view!=="travel"&&(n?this.lookGoal.y-=7:this.lookGoal.add(ie(3.4,0,-2.8))),r&&this.lookGoal.add(n?this.view==="map"?ie(0,-28,0):ie(0,-8,0):this.view==="map"?ie(0,0,0):ie(2,0,0)),r?this.camera.position.copy(this.cameraGoal):this.camera.position.lerp(this.cameraGoal,this.reduced?1:1-Math.exp(-t*4)),this.camera.lookAt(this.lookGoal),this.renderer.render(this.scene,this.camera),this.onFrame){let a=this.view==="region"||this.view==="station"?[["hq",dt.hq],["atlas",this.tank.position],...(xi[this.destination]||[]).map(o=>[o.id,o.position])]:[...Object.entries(dt),["atlas",this.tank.position]];this.onFrame(a.map(([o,l])=>{let c=o.startsWith("station-")?this.stationMarkers.get(`${this.destination}:${o}`):this.mapMarkers.get(o),d=(o==="atlas"?l.clone().add(ie(0,2.7,0)):c?.root.position.clone()||l.clone().add(ie(0,3.5,0))).project(this.camera),h=this.view==="region"&&(o==="hq"||o==="atlas");return{id:o,x:(d.x+1)/2*this.width,y:(-d.y+1)/2*this.height,visible:d.z>-1&&d.z<1&&(h||d.x>-1.12&&d.x<1.12&&d.y>-1.12&&d.y<1.12)}}))}}};var yv={status:"reviewed",reviewer:"Codex educational content and ambiguity review",reviewedAt:"2026-09-01",humanCurriculumReview:"pending",source:"Original Beacon Brigade content; all evidence tables are authored datasets."};function Ct(i,e,t,n,r,s,a){return{id:t,version:1,regionId:i,subject:e,skill:n,yearBand:"Year 3 core / Year 4 stretch (provisional)",prerequisites:["Read a short evidence table","Choose the best-supported answer"],parameterPolicy:"Only the two checked authored instances are used.",review:yv,instances:a.map(o=>({...o,hint:r,wrongFeedback:s,type:"choice",diagram:{kind:"table",source:"Authored mission evidence",simulation:!1,...o.diagram}}))}}var Yd=Zd([Ct("english","english","english-context-meaning","Use context to infer word meaning","Read the whole sentence and look for words that explain the bold word.","That meaning does not fit the clue in the sentence. Read what the team does next.",[{prompt:"The path was narrow, so the team walked in single file. What does narrow mean?",options:[{id:"not-wide",label:"Not wide"},{id:"very-noisy",label:"Very noisy"},{id:"steep",label:"Steep and rocky"},{id:"bright",label:"Brightly lit"}],answer:"not-wide",explanation:"A narrow path is not wide, so the team has room to walk only one behind another.",diagram:{label:"Word Archive clue",columns:["Sentence clue","What it tells us"],rows:[["The team walked in single file","There was little room side by side"]],controls:"Use the meaning that fits this sentence.",limitation:"The word narrow can describe other things, but this question is about the path."}},{prompt:"The glass lens was fragile, so Noor carried it with both hands. What does fragile mean?",options:[{id:"easily-broken",label:"Easily broken"},{id:"very-heavy",label:"Very heavy"},{id:"brightly-coloured",label:"Brightly coloured"},{id:"difficult-to-find",label:"Difficult to find"}],answer:"easily-broken",explanation:"Fragile means easily broken, which explains why Noor carries the lens carefully.",diagram:{label:"Word Archive clue",columns:["Sentence clue","What it tells us"],rows:[["Noor carried it with both hands","The lens needed careful handling"]],controls:"Use the meaning that explains Noor's careful action.",limitation:"The table gives a context clue, not a full dictionary definition."}}]),Ct("english","english","english-complete-sentence","Recognise a complete sentence","Find the option with a subject, a verb and a complete idea.","That group of words does not express a complete idea by itself. Check who or what acts and what happens.",[{prompt:"Which option is a complete sentence?",options:[{id:"bridge",label:"Under the old bridge"},{id:"lantern",label:"The lantern glowed brightly."},{id:"because",label:"Because it was dark"},{id:"running",label:"Running towards the gate"}],answer:"lantern",explanation:"The lantern glowed brightly names the subject, tells what it did and expresses a complete idea.",diagram:{label:"Sentence Studio check",columns:["Option","Has a named subject","Expresses a complete idea by itself"],rows:[["Under the old bridge","No","No"],["The lantern glowed brightly.","Yes","Yes"],["Because it was dark","No","No"],["Running towards the gate","No","No"]],controls:"Judge each option as written, without adding missing words.",limitation:"These checks cover the sentence patterns shown here."}},{prompt:"Which option is a complete sentence?",options:[{id:"beacon",label:"The beacon flashed twice."},{id:"beside",label:"Beside the tall tower"},{id:"when",label:"When the bell rang"},{id:"carrying",label:"Carrying the silver key"}],answer:"beacon",explanation:"The beacon flashed twice names the subject, gives its action and completes the idea.",diagram:{label:"Sentence Studio check",columns:["Option","Has a named subject","Expresses a complete idea by itself"],rows:[["The beacon flashed twice.","Yes","Yes"],["Beside the tall tower","No","No"],["When the bell rang","Yes","No"],["Carrying the silver key","No","No"]],controls:"Judge each option as written, without adding missing words.",limitation:"When the bell rang has a subject and verb but leaves the main idea unfinished."}}]),Ct("english","english","english-possessive-apostrophe","Use apostrophes to show ownership","First decide whether one person or several people own the object, then place the apostrophe.","Check the number of owners in the mission note. One engineer and several engineers need different apostrophe positions.",[{prompt:"The toolkit belongs to one engineer. Which sentence is correct?",options:[{id:"one-owner",label:"The engineer's toolkit is open."},{id:"many-owners",label:"The engineers' toolkit is open."},{id:"no-apostrophe",label:"The engineers toolkit is open."},{id:"toolkit-owner",label:"The engineer toolkits' is open."}],answer:"one-owner",explanation:"Engineer is singular, so engineer's shows that the toolkit belongs to one engineer.",diagram:{label:"Spelling Signal ownership note",columns:["Owners","Object owned"],rows:[["One engineer","One toolkit"]],controls:"Use the exact number of owners shown.",limitation:"The sentence is testing possession, not a shortened word such as it's."}},{prompt:"The maps belong to several captains. Which sentence is correct?",options:[{id:"plural-owner",label:"The captains' maps are ready."},{id:"single-owner",label:"The captain's maps are ready."},{id:"plain-plural",label:"The captains maps are ready."},{id:"map-owner",label:"The captains map's are ready."}],answer:"plural-owner",explanation:"Captains is a plural ending in s, so the apostrophe goes after the s to show ownership.",diagram:{label:"Spelling Signal ownership note",columns:["Owners","Objects owned"],rows:[["Several captains","Several maps"]],controls:"Use the exact number of owners shown.",limitation:"This rule applies to regular plurals that already end in s."}}]),Ct("english","english","english-linking-ideas","Choose a conjunction that matches the meaning","Decide whether the second idea gives a reason, a result, a contrast or a choice.","That joining word shows the wrong relationship. Compare the two ideas in the evidence table.",[{prompt:"Choose the best word: Mia carried an umbrella ___ rain was forecast.",options:[{id:"because",label:"because"},{id:"but",label:"but"},{id:"or",label:"or"},{id:"until",label:"until"}],answer:"because",explanation:"Because introduces the reason Mia carried an umbrella.",diagram:{label:"Reading Room idea link",columns:["First idea","Second idea","Relationship"],rows:[["Mia carried an umbrella","Rain was forecast","Reason"]],controls:"Choose the word that preserves the stated relationship.",limitation:"The question asks for the clearest meaning in this sentence."}},{prompt:"Choose the best word: The warning bell rang, ___ the team closed the gate.",options:[{id:"so",label:"so"},{id:"because",label:"because"},{id:"although",label:"although"},{id:"unless",label:"unless"}],answer:"so",explanation:"So introduces the result of the warning bell ringing.",diagram:{label:"Reading Room idea link",columns:["First idea","Second idea","Relationship"],rows:[["The warning bell rang","The team closed the gate","Result"]],controls:"Choose the word that preserves the stated relationship.",limitation:"The comma and joining word are part of one complete sentence."}}]),Ct("english","english","english-story-sequence","Order causes and results in a story","Find the problem or starting action that must happen before the other events.","That event depends on something else happening first. Trace the cause-and-result chain.",[{prompt:"Which event must happen first in this beacon-repair sequence?",options:[{id:"discover",label:"The team discovers the broken lamp."},{id:"replace",label:"The team replaces the lamp."},{id:"shine",label:"The beacon shines again."},{id:"ships",label:"Ships see the restored light."}],answer:"discover",explanation:"The team must discover the broken lamp before replacing it, restoring the beacon and helping the ships.",diagram:{label:"Story Press event clues",columns:["Event","Depends on"],rows:[["Discover broken lamp","Nothing else listed"],["Replace lamp","Broken lamp is discovered"],["Beacon shines","Lamp is replaced"],["Ships see light","Beacon shines"]],controls:"Use only the cause-and-result links shown.",limitation:"This is one planned story sequence, not every possible repair story."}},{prompt:"Which event must happen first in this locked-storehouse sequence?",options:[{id:"notice",label:"The team notices that the key is missing."},{id:"search",label:"The team searches the map room."},{id:"find",label:"The team finds the key."},{id:"unlock",label:"The team unlocks the storehouse."}],answer:"notice",explanation:"The team must notice the missing key before searching for it, finding it and unlocking the storehouse.",diagram:{label:"Story Press event clues",columns:["Event","Depends on"],rows:[["Notice missing key","Nothing else listed"],["Search map room","Missing key is noticed"],["Find key","Search begins"],["Unlock storehouse","Key is found"]],controls:"Use only the cause-and-result links shown.",limitation:"This is one planned story sequence, not every possible search story."}}]),Ct("physics","physics","physics-force-motion","Use force direction to predict motion","Look at the direction and size of each force, and check whether the object starts at rest.","Recheck the force directions. Equal opposite forces on an object at rest are balanced; gravity pulls towards Earth.",[{prompt:"A builder releases a wooden block. Which force pulls it towards the ground?",options:[{id:"gravity",label:"Gravity"},{id:"magnetism",label:"Magnetism"},{id:"friction",label:"Friction"},{id:"hand-push",label:"A push from the builder's hand"}],answer:"gravity",explanation:"Gravity pulls the released block towards Earth even after the builder is no longer touching it.",diagram:{label:"Force Track release evidence",columns:["Observation","Mission detail"],rows:[["Object","Wooden block"],["Builder touching it after release","No"],["Nearby magnet","No"],["Direction of fall","Towards the ground"]],controls:"The block is released from rest and is not touching another surface.",limitation:"Air resistance is not measured; the question asks which force pulls downwards."}},{prompt:"Two teams pull a rope equally hard in opposite directions. The rope starts at rest. What happens?",options:[{id:"stays",label:"It stays in place."},{id:"left",label:"It moves left."},{id:"right",label:"It moves right."},{id:"up",label:"It moves upwards."}],answer:"stays",explanation:"The equal forces act in opposite directions, so they are balanced and the rope remains at rest.",diagram:{label:"Force Track pull test",columns:["Side","Pull","Direction"],rows:[["Left team","20 N","Left"],["Right team","20 N","Right"]],controls:"The rope starts at rest; both pulls act at the same time along one straight line.",limitation:"The table treats the rope and teams as one simple force model."}}]),Ct("physics","physics","physics-reflection","Use observations of reflected light","Choose the surface that produced the clearest image in the displayed test.","That surface did not produce the clearest image in this test. Compare the observation words in the table.",[{prompt:"Which tested surface reflected the clearest image of the signal card?",options:[{id:"mirror",label:"Smooth mirror"},{id:"brick",label:"Rough brick"},{id:"cloth",label:"Crumpled cloth"},{id:"cardboard",label:"Unpainted cardboard"}],answer:"mirror",explanation:"The smooth mirror reflected a clear image because its even surface reflected the light in an organised way.",diagram:{label:"Light Observatory reflection test",columns:["Surface","Observed image"],rows:[["Smooth mirror","Clear"],["Rough brick","No recognisable image"],["Crumpled cloth","No recognisable image"],["Unpainted cardboard","No recognisable image"]],controls:"Same signal card, light, distance and viewing position.",limitation:"The result describes image clarity, not how much total light each surface reflects."}},{prompt:"Which tested water surface reflected the clearest image of the tower?",options:[{id:"still",label:"Still water"},{id:"small-ripples",label:"Water with small ripples"},{id:"large-waves",label:"Water with large waves"},{id:"foam",label:"Foamy water"}],answer:"still",explanation:"The still water had the smoothest surface and produced the clearest reflected image in the test.",diagram:{label:"Light Observatory water test",columns:["Water surface","Observed tower image"],rows:[["Still","Clear"],["Small ripples","Slightly distorted"],["Large waves","Very distorted"],["Foam","Not recognisable"]],controls:"Same tower model, light, container and viewing position.",limitation:"The observations apply to these tested surface conditions."}}]),Ct("physics","physics","physics-sound-vibration","Connect vibrations with sound","Look for the object that was moving back and forth when the sound was heard.","Sound was linked to a vibration in this test. Find the part that moved back and forth.",[{prompt:"What was the tuning fork doing when the team heard its sound?",options:[{id:"vibrating",label:"Vibrating rapidly"},{id:"glowing",label:"Glowing brightly"},{id:"melting",label:"Melting slowly"},{id:"becoming-magnetic",label:"Becoming magnetic"}],answer:"vibrating",explanation:"The tuning fork's rapid vibrations made the surrounding air vibrate, allowing the sound to travel.",diagram:{label:"Sound Lab tuning-fork test",columns:["Tuning-fork state","Sound heard"],rows:[["Still","No"],["Moving rapidly back and forth","Yes"]],controls:"Same tuning fork, room and listening distance.",limitation:"The table records visible motion and sound; it does not show every air vibration."}},{prompt:"Which part of a drum vibrates to begin producing its sound when struck?",options:[{id:"skin",label:"The stretched drum skin"},{id:"stand",label:"The floor under the stand"},{id:"paint",label:"The painted symbol"},{id:"shadow",label:"The drum's shadow"}],answer:"skin",explanation:"The stretched drum skin moves back and forth after it is struck, beginning the sound vibrations.",diagram:{label:"Sound Lab drum test",columns:["Part observed","Moved back and forth after strike"],rows:[["Stretched drum skin","Yes"],["Floor under stand","No visible movement"],["Painted symbol","Moves only with the skin"],["Shadow","Not a material part"]],controls:"The same drum is struck once in the centre with the same beater.",limitation:"Other drum parts can also vibrate, but the question asks which part begins the tested sound."}}]),Ct("physics","physics","physics-complete-circuit","Identify a complete electrical circuit","A working circuit needs an energy source and an unbroken conducting loop through the bulb.","That plan is missing either the battery or a complete path. Trace the loop from one battery terminal to the other.",[{prompt:"Which circuit plan will light the working bulb?",options:[{id:"closed",label:"Plan A: battery, wires and bulb in an unbroken loop"},{id:"beside",label:"Plan B: bulb placed beside a battery"},{id:"one-terminal",label:"Plan C: one wire from one battery terminal to the bulb"},{id:"no-battery",label:"Plan D: bulb and wires in a loop with no battery"}],answer:"closed",explanation:"Plan A has a battery and a complete conducting path through the bulb, so current can flow.",diagram:{label:"Circuit Station plans",columns:["Plan","Battery present","Unbroken loop through bulb"],rows:[["A","Yes","Yes"],["B","Yes","No wires"],["C","Yes","No"],["D","No","Yes"]],controls:"All bulbs, batteries and wires are working; connections touch conducting metal parts.",limitation:"This is a simple low-voltage circuit model, not instructions for mains electricity."}},{prompt:"Which switch position will make the working signal lamp light?",options:[{id:"switch-closed",label:"Closed, completing the loop"},{id:"switch-open",label:"Open, leaving a gap"},{id:"switch-removed",label:"Removed, leaving two gaps"},{id:"battery-removed",label:"Closed after the battery is removed"}],answer:"switch-closed",explanation:"Closing the switch completes the conducting loop, allowing current to flow through the lamp.",diagram:{label:"Circuit Station switch test",columns:["Setup","Battery present","Path through lamp"],rows:[["Switch closed","Yes","Complete"],["Switch open","Yes","Gap"],["Switch removed","Yes","Two gaps"],["Battery removed","No","Incomplete energy source"]],controls:"The same working lamp, battery and wires are used in every setup.",limitation:"The table models only open and closed states in a simple circuit."}}]),Ct("physics","physics","physics-thermal-insulation","Compare thermal energy transfer","The container with the smallest temperature drop slowed thermal energy transfer the most.","Compare the starting and final temperatures, not just the material name. A smaller drop means less energy left the water.",[{prompt:"Which tested wrap kept the warm water warmest after 10 minutes?",options:[{id:"felt",label:"Felt wrap"},{id:"paper",label:"Paper wrap"},{id:"foil",label:"Single foil wrap"},{id:"none",label:"No wrap"}],answer:"felt",explanation:"The felt-wrapped cup finished at 54 degrees C, the highest temperature, so it slowed thermal energy transfer the most in this test.",diagram:{label:"Energy Workshop insulation test",columns:["Cup wrap","Start","After 10 minutes"],rows:[["Felt","60 degrees C","54 degrees C"],["Paper","60 degrees C","50 degrees C"],["Single foil","60 degrees C","48 degrees C"],["None","60 degrees C","45 degrees C"]],controls:"Same cups, water volume, starting temperature, room and test time.",limitation:"The result ranks only these tested wraps under these conditions."}},{prompt:"Which tested lid kept the warm water warmest after 15 minutes?",options:[{id:"foam",label:"Foam lid"},{id:"card",label:"Card lid"},{id:"metal",label:"Thin metal lid"},{id:"open",label:"No lid"}],answer:"foam",explanation:"The cup with the foam lid finished at 51 degrees C, the highest temperature, so it lost the least thermal energy in this test.",diagram:{label:"Energy Workshop lid test",columns:["Cup lid","Start","After 15 minutes"],rows:[["Foam","58 degrees C","51 degrees C"],["Card","58 degrees C","48 degrees C"],["Thin metal","58 degrees C","46 degrees C"],["None","58 degrees C","42 degrees C"]],controls:"Same cups, water volume, starting temperature, room and test time.",limitation:"The test compares heat loss from the whole cup setup, not one transfer process alone."}}]),Ct("chemistry","chemistry","chemistry-states-of-matter","Identify states of matter from observations","Compare shape, volume and whether the sample spreads to fill its container.","That state does not match all the observations. Check both shape and volume before choosing.",[{prompt:"Sample A changes shape when poured but keeps the same volume. What state is it?",options:[{id:"liquid",label:"Liquid"},{id:"solid",label:"Solid"},{id:"gas",label:"Gas"},{id:"light",label:"Light"}],answer:"liquid",explanation:"A liquid flows to take its container's shape while keeping approximately the same volume.",diagram:{label:"Matter Hall sample test",columns:["Observation","Sample A"],rows:[["Keeps its own shape","No"],["Volume after pouring","Same within measurement"],["Fills all available space","No"]],controls:"The same sample is poured between two sealed measuring containers at the same temperature.",limitation:"The table uses the simple particle model for ordinary classroom conditions."}},{prompt:"Sample B spreads out to fill every part of a sealed container. What state is it?",options:[{id:"gas",label:"Gas"},{id:"liquid",label:"Liquid"},{id:"solid",label:"Solid"},{id:"sound",label:"Sound"}],answer:"gas",explanation:"A gas spreads out to fill the available space in its sealed container.",diagram:{label:"Matter Hall sample test",columns:["Observation","Sample B"],rows:[["Keeps its own shape","No"],["Keeps a fixed surface level","No"],["Fills all available space","Yes"]],controls:"The sample remains sealed at the same temperature while container shape changes.",limitation:"The table identifies the state from large-scale observations, not individual particles."}}]),Ct("chemistry","chemistry","chemistry-separate-mixture","Choose a separation method from material properties","Find a property that differs between the mixed materials and choose a method that uses it.","That method does not use the useful difference shown in the table. Compare attraction or particle size.",[{prompt:"What is the best way to separate dry iron filings from sand?",options:[{id:"magnet",label:"Move a magnet over the mixture"},{id:"more-sand",label:"Add more sand"},{id:"crush",label:"Crush the mixture"},{id:"stir",label:"Stir it with a wooden stick"}],answer:"magnet",explanation:"A magnet attracts the iron filings but not the sand, so it can lift one material away from the other.",diagram:{label:"Mixture Lab property check",columns:["Material","Attracted to test magnet","Dry"],rows:[["Iron filings","Yes","Yes"],["Sand","No","Yes"]],controls:"Use the same covered magnet and keep the mixture dry.",limitation:"The result applies to the tested iron filings, sand and magnet."}},{prompt:"What is the best way to separate large gravel pieces from fine sand?",options:[{id:"sieve",label:"Shake the mixture through a sieve"},{id:"magnet",label:"Use a magnet"},{id:"dissolve",label:"Try to dissolve both in water"},{id:"paint",label:"Paint the gravel"}],answer:"sieve",explanation:"The fine sand passes through the sieve holes while the larger gravel pieces remain behind.",diagram:{label:"Mixture Lab size check",columns:["Material","Typical particle width","Passes 3 mm holes"],rows:[["Gravel","8-15 mm","No"],["Sand","Less than 2 mm","Yes"]],controls:"The mixture is dry and the same 3 mm sieve is used throughout.",limitation:"Very small gravel or clumped wet sand could need a different method."}}]),Ct("chemistry","chemistry","chemistry-observe-change","Distinguish reversible changes from reaction clues","Use the after-change evidence: cooling can reverse some state changes, while an unexpected new gas may suggest a reaction.","Check whether the original material can be recovered by cooling or whether the observation suggests a new substance.",[{prompt:"Which change in the mission log can be reversed by cooling?",options:[{id:"melting-ice",label:"Ice melting into liquid water"},{id:"burning-paper",label:"Paper burning into ash and gases"},{id:"frying-egg",label:"An egg cooking in a pan"},{id:"rusting",label:"Iron slowly forming rust"}],answer:"melting-ice",explanation:"Cooling liquid water below its freezing point can turn it back into solid ice.",diagram:{label:"Changes Chamber log",columns:["Change","Original material recovered by cooling"],rows:[["Melting ice","Yes, as ice"],["Burning paper","No"],["Cooking egg","No"],["Rusting iron","No"]],controls:"Compare only whether ordinary cooling reverses each listed change.",limitation:"The table does not claim that every physical change is easy to reverse."}},{prompt:"Two room-temperature liquids are mixed without stirring. Which new observation is the strongest clue that a chemical reaction may have produced a gas?",options:[{id:"new-bubbles",label:"Bubbles keep forming throughout the liquid"},{id:"taller-cup",label:"The mixture is poured into a taller cup"},{id:"new-shape",label:"The cup has a different shape"},{id:"label",label:"A new label is placed on the cup"}],answer:"new-bubbles",explanation:"New bubbles forming throughout two non-boiling liquids can be evidence that a reaction is producing a gas.",diagram:{label:"Changes Chamber reaction check",columns:["Condition","Observation"],rows:[["Before mixing","Both liquids still; no bubbles"],["After mixing","Bubbles continue forming throughout"],["Temperature","Remains well below boiling"]],controls:"Clean container; liquids begin bubble-free at room temperature; no shaking or boiling.",limitation:"Bubbles are a clue, not proof by themselves; trapped air and boiling have been controlled here."}}]),Ct("chemistry","chemistry","chemistry-material-properties","Select a material using tested properties","The chosen material must meet every mission requirement, not just one.","That sample misses at least one requirement. Check every property column for the same sample.",[{prompt:"A cover must bend around a curved box and keep water out. Which tested sample meets both needs?",options:[{id:"film",label:"Sample A: flexible film"},{id:"card",label:"Sample B: card"},{id:"tile",label:"Sample C: tile"},{id:"cloth",label:"Sample D: open-weave cloth"}],answer:"film",explanation:"Sample A bends around the box and lets no water through, so it meets both requirements.",diagram:{label:"Properties Bay cover tests",columns:["Sample","Bends around box","Water through after 1 minute"],rows:[["A: flexible film","Yes","No"],["B: card","Yes","Yes"],["C: tile","No","No"],["D: open-weave cloth","Yes","Yes"]],controls:"Same sample area, water volume, curved box and one-minute test.",limitation:"Results describe only these samples and do not prove long-term durability."}},{prompt:"A window panel must let light through and resist water. Which tested sample meets both needs?",options:[{id:"clear-plastic",label:"Sample E: clear plastic"},{id:"paper",label:"Sample F: thin paper"},{id:"metal",label:"Sample G: metal sheet"},{id:"mesh",label:"Sample H: plastic mesh"}],answer:"clear-plastic",explanation:"Sample E lets light through and lets no water through, so it meets both window-panel needs.",diagram:{label:"Properties Bay panel tests",columns:["Sample","Light through","Water through after 1 minute"],rows:[["E: clear plastic","Yes","No"],["F: thin paper","Some","Yes"],["G: metal sheet","No","No"],["H: plastic mesh","Yes","Yes"]],controls:"Same sample area, lamp position, water volume and one-minute test.",limitation:"The test checks only light passage and short-term water resistance."}}]),Ct("chemistry","chemistry","chemistry-dissolving-particles","Explain dissolving with a particle model","The dissolved material is still present even when its particles are too spread out to see.","The solute did not vanish or become a different element. Use the before-and-after evidence.",[{prompt:"Sugar seems to disappear after it is stirred into water. What happened?",options:[{id:"dissolved",label:"It dissolved and spread through the water."},{id:"stopped-existing",label:"It stopped existing."},{id:"oxygen",label:"It changed into oxygen."},{id:"left-cup",label:"It passed through the solid cup."}],answer:"dissolved",explanation:"The sugar particles remain in the water but are spread too widely to see; evaporating the water can recover sugar.",diagram:{label:"Particle Observatory sugar evidence",columns:["Check","Observation"],rows:[["Before stirring","Sugar crystals visible"],["After stirring in a sealed cup","No crystals visible; total mass unchanged"],["After water evaporates","Sugar crystals remain"]],controls:"Same sugar-water sample; no liquid is spilled; gentle evaporation by an adult-run virtual process.",limitation:"The table is evidence for dissolving and does not show individual sugar particles."}},{prompt:"Salt is no longer visible after it is stirred into water. Which explanation best fits the evidence?",options:[{id:"spread",label:"Salt particles spread through the water."},{id:"destroyed",label:"The water destroyed the salt."},{id:"sand",label:"The salt changed into sand."},{id:"escaped",label:"All the salt escaped into the air."}],answer:"spread",explanation:"The salt dissolved, so its particles are still present and spread throughout the water.",diagram:{label:"Particle Observatory salt evidence",columns:["Check","Observation"],rows:[["Before stirring","Salt crystals visible"],["After stirring in a sealed cup","No crystals visible; total mass unchanged"],["After water evaporates","Salt crystals remain"]],controls:"Same salt-water sample; no liquid is spilled; gentle evaporation by an adult-run virtual process.",limitation:"The table shows large-scale evidence, not the size or exact arrangement of particles."}}]),Ct("grove","life-sciences","grove-plant-parts","Connect plant parts with their functions","Match the job in the question with the plant-part observations in the table.","That plant part has a different main job in this mission. Compare what each part takes in or makes.",[{prompt:"Which plant part uses light energy to make sugars for the plant?",options:[{id:"leaves",label:"Leaves"},{id:"roots",label:"Roots"},{id:"flower",label:"Flower petals"},{id:"seed-coat",label:"Seed coat"}],answer:"leaves",explanation:"Leaves contain structures that capture light energy and use it to help make sugars by photosynthesis.",diagram:{label:"Seed Lab plant-part observations",columns:["Plant part","Observed main job"],rows:[["Leaves","Receive light and exchange gases"],["Roots","Take in water and minerals"],["Flower petals","Help attract some pollinators"],["Seed coat","Protects the seed"]],controls:"Use the main functions listed for this flowering plant.",limitation:"Plant parts can have more than one function; the question asks about making sugars with light."}},{prompt:"Which plant part takes in most of the water needed by this seedling?",options:[{id:"roots",label:"Roots"},{id:"leaves",label:"Leaves"},{id:"petals",label:"Petals"},{id:"fruit",label:"Fruit"}],answer:"roots",explanation:"The seedling's roots absorb most of its water from the soil.",diagram:{label:"Seed Lab seedling observations",columns:["Plant part","Observed contact or job"],rows:[["Roots","In moist soil; take in water"],["Leaves","In light; make sugars"],["Petals","Not present on this seedling"],["Fruit","Not present on this seedling"]],controls:"The seedling is healthy, rooted in moist soil and observed under ordinary conditions.",limitation:"Small amounts of water can contact other parts, but roots are the main uptake structures here."}}]),Ct("grove","life-sciences","grove-habitat-needs","Use habitat evidence to meet an animal's needs","Choose the habitat that supplies all the needs named in the mission table.","That habitat is missing at least one listed need. Check water, food, shelter and suitable conditions.",[{prompt:"Which habitat best meets all the displayed needs of this pond frog?",options:[{id:"pond-edge",label:"A shaded pond edge with insects and plants"},{id:"dry-rock",label:"A dry bare rock with no nearby water"},{id:"sealed-box",label:"A sealed empty box"},{id:"salt-flat",label:"An open salt flat with no shelter"}],answer:"pond-edge",explanation:"The shaded pond edge provides fresh water, insect food, plant shelter and moist conditions for the frog.",diagram:{label:"Habitat Dome frog needs",columns:["Need","Mission evidence"],rows:[["Water","Fresh pond water"],["Food","Small insects"],["Shelter","Pond plants and shade"],["Conditions","Moist areas"]],controls:"Compare each option with all four needs of this frog.",limitation:"Different frog species can have different habitat needs."}},{prompt:"Which habitat best meets all the displayed needs of this small woodland bird?",options:[{id:"woodland",label:"Woodland with shrubs, seeds, insects and water"},{id:"empty-yard",label:"A paved yard with no plants or water"},{id:"deep-ocean",label:"Deep ocean far from land"},{id:"sealed-room",label:"A sealed room with no food"}],answer:"woodland",explanation:"The woodland provides food, water, nesting places and cover from danger.",diagram:{label:"Habitat Dome bird needs",columns:["Need","Mission evidence"],rows:[["Water","Fresh water nearby"],["Food","Seeds and insects"],["Shelter","Shrubs and trees"],["Nesting","Branches and plant material"]],controls:"Compare each option with all four needs of this woodland bird.",limitation:"The question concerns the described bird, not every bird species."}}]),Ct("grove","life-sciences","grove-life-cycle","Order stages in an animal life cycle","Find the stage shown directly after the egg in the displayed life cycle.","That stage occurs later or belongs to a different organism. Follow the arrows from the egg.",[{prompt:"Which stage comes directly after a butterfly egg hatches?",options:[{id:"larva",label:"Larva (caterpillar)"},{id:"adult",label:"Adult butterfly"},{id:"pupa",label:"Pupa"},{id:"seedling",label:"Seedling"}],answer:"larva",explanation:"A butterfly develops from egg to larva, then pupa and then adult.",diagram:{label:"Life-Cycle Nursery butterfly record",columns:["Stage number","Stage"],rows:[["1","Egg"],["2","Larva"],["3","Pupa"],["4","Adult butterfly"]],controls:"Use the stage order shown for a butterfly.",limitation:"Timing and appearance vary between butterfly species, but this stage order is consistent."}},{prompt:"Which stage comes directly after a frog egg hatches?",options:[{id:"tadpole",label:"Tadpole"},{id:"adult",label:"Adult frog"},{id:"froglet",label:"Froglet"},{id:"caterpillar",label:"Caterpillar"}],answer:"tadpole",explanation:"In the displayed frog life cycle, the egg hatches into a tadpole before developing legs and becoming a froglet.",diagram:{label:"Life-Cycle Nursery frog record",columns:["Stage number","Stage"],rows:[["1","Egg"],["2","Tadpole"],["3","Tadpole with legs"],["4","Froglet"],["5","Adult frog"]],controls:"Use the stage order shown for this frog life cycle.",limitation:"Development details vary among frog species, but the answer follows the displayed record."}}]),Ct("grove","life-sciences","grove-food-chain","Identify producers in food chains","A producer uses light energy to make its own sugars; start at the first organism in the chain.","That organism gets energy by eating another organism. Find the plant or alga that begins the chain.",[{prompt:"In grass -> grasshopper -> frog -> snake, which organism is the producer?",options:[{id:"grass",label:"Grass"},{id:"grasshopper",label:"Grasshopper"},{id:"frog",label:"Frog"},{id:"snake",label:"Snake"}],answer:"grass",explanation:"Grass is the producer because it uses light energy to make sugars instead of eating another organism.",diagram:{label:"Food-Web Field energy path",columns:["From","To","Meaning"],rows:[["Grass","Grasshopper","Grasshopper eats grass"],["Grasshopper","Frog","Frog eats grasshopper"],["Frog","Snake","Snake eats frog"]],controls:"Arrows point from the food to the organism that receives its energy.",limitation:"This simplified chain shows one energy path, not the full food web."}},{prompt:"In algae -> snail -> fish -> heron, which organism is the producer?",options:[{id:"algae",label:"Algae"},{id:"snail",label:"Snail"},{id:"fish",label:"Fish"},{id:"heron",label:"Heron"}],answer:"algae",explanation:"The algae are producers because they use light energy to make sugars and begin this energy path.",diagram:{label:"Food-Web Field pond path",columns:["From","To","Meaning"],rows:[["Algae","Snail","Snail eats algae"],["Snail","Fish","Fish eats snail"],["Fish","Heron","Heron eats fish"]],controls:"Arrows point from the food to the organism that receives its energy.",limitation:"This simplified chain shows one energy path; each organism may have other food links."}}]),Ct("grove","life-sciences","grove-adaptation-function","Link an adaptation with its helpful function","Choose the function that directly matches the body feature and habitat shown.","That function is not supported by the feature in the table. Think about how the shape or covering helps survival.",[{prompt:"How do a duck's webbed feet help it in water?",options:[{id:"paddle",label:"They push against water while swimming."},{id:"breathe",label:"They let the duck breathe underwater."},{id:"dry-feathers",label:"They keep every feather dry."},{id:"chew",label:"They help the duck chew food."}],answer:"paddle",explanation:"The skin between the toes creates a broad surface that pushes against water like a paddle.",diagram:{label:"Adaptation Clinic duck observations",columns:["Feature","Observed effect"],rows:[["Toes spread in water","Skin forms a broad surface"],["Foot sweeps backwards","Water is pushed backwards"],["Duck's movement","Body moves forwards"]],controls:"Observe the same duck swimming at a steady pace in calm water.",limitation:"Webbed feet also assist with other movements; the question asks about swimming."}},{prompt:"How does thick fur help a polar bear in its cold habitat?",options:[{id:"slow-heat-loss",label:"It slows heat loss from the body."},{id:"make-food",label:"It makes food from sunlight."},{id:"breathe-water",label:"It allows the bear to breathe underwater."},{id:"hear-distance",label:"It makes distant sounds louder."}],answer:"slow-heat-loss",explanation:"Thick fur traps air and slows thermal energy transfer from the bear's warm body to the cold surroundings.",diagram:{label:"Adaptation Clinic insulation evidence",columns:["Model covering","Temperature drop in 10 minutes"],rows:[["Thick fur-like covering","3 C"],["Thin covering","8 C"],["No covering","12 C"]],controls:"Same warm model, starting temperature, size, room and test time.",limitation:"This model tests insulation only; polar bears have several adaptations for cold conditions."}}])]);function Zd(i){for(let e of Object.values(i))e&&typeof e=="object"&&Zd(e);return Object.freeze(i)}var yc=3;var yi=4,qa=Xa({2:{parts:12,cores:12},3:{parts:24,cores:24}}),En=Xa([{id:"harbour",name:"Maths Operations",subject:"maths",resource:"parts",icon:"calculator",minHqLevel:1,description:"Run the number-powered logistics district and recover building parts.",stationNames:["Multiplication Depot","Addition Dispatch","Division Workshop","Subtraction Yard","Place Value Tower"]},{id:"english",name:"English Communications",subject:"english",resource:"parts",icon:"book-open",minHqLevel:1,description:"Decode words, sentences and stories inside the communications archive.",stationNames:["Word Archive","Sentence Studio","Spelling Signal","Reading Room","Story Press"]},{id:"physics",name:"Physics Research",subject:"physics",resource:"cores",icon:"orbit",minHqLevel:1,description:"Test forces, light, sound, circuits and energy at the research complex.",stationNames:["Force Track","Light Observatory","Sound Lab","Circuit Station","Energy Workshop"]},{id:"chemistry",name:"Chemistry Laboratory",subject:"chemistry",resource:"cores",icon:"flask-conical",minHqLevel:1,description:"Investigate matter, mixtures, changes, materials and particle models.",stationNames:["Matter Hall","Mixture Lab","Changes Chamber","Properties Bay","Particle Observatory"]},{id:"grove",name:"Life Sciences BioDome",subject:"life-sciences",resource:"cores",icon:"sprout",minHqLevel:1,description:"Study plants, habitats, life cycles, food webs and adaptations.",stationNames:["Seed Lab","Habitat Dome","Life-Cycle Nursery","Food-Web Field","Adaptation Clinic"]}]),Jd={status:"reviewed",reviewer:"Codex authored-answer and executable consistency review",reviewedAt:"2026-08-31",humanCurriculumReview:"pending",source:"Original Beacon Brigade content; science observations are curated virtual datasets."};function Ur(i,e,t,n,r,s){return{id:i,version:1,regionId:"harbour",subject:"maths",skill:e,yearBand:"Year 3 core / Year 4 stretch (provisional)",prerequisites:t,parameterPolicy:"Only the two checked authored variants are used.",review:Jd,instances:r.map(a=>({...s(a),parameters:a,hint:n,wrongFeedback:n,type:"number"}))}}function Nr(i,e,t,n){return{id:i,version:1,regionId:"legacy-grove",subject:"science",skill:e,yearBand:"Year 3 core / Year 4 stretch (provisional)",prerequisites:["Read a short observation table","Compare evidence with a requirement"],parameterPolicy:"Only the two checked curated datasets are used.",review:Jd,instances:n.map(r=>({...r,hint:t,wrongFeedback:t,type:"choice",diagram:{...r.diagram,source:"Curated virtual observations",simulation:!1}}))}}var _c=Xa([Ur("harbour-crate-reserve","Multiply equal groups, then subtract",["Multiplication facts","Subtraction"],"Find the pieces in all crates first. Then subtract the pieces reserved for the other repair.",[{crates:4,each:6,reserved:9},{crates:5,each:4,reserved:7}],({crates:i,each:e,reserved:t})=>({prompt:`${i} crates each hold ${e} repair pieces. ${t} pieces are reserved for another base. How many pieces remain for our tank base?`,answer:i*e-t,explanation:`${i} x ${e} = ${i*e} pieces. ${i*e} - ${t} = ${i*e-t} pieces remain.`,diagram:{kind:"groups",label:"Repair-piece crates",groups:i,itemsPerGroup:e,reserved:t}})),Ur("harbour-delivery-total","Add two three-digit quantities",["Place value","Addition with regrouping"],"Add hundreds, tens and ones. Regroup ten ones as one ten when needed.",[{first:136,second:247},{first:258,second:164}],({first:i,second:e})=>({prompt:`The morning delivery brings ${i} bolts. The afternoon delivery brings ${e} bolts. How many bolts arrive altogether?`,answer:i+e,explanation:`${i} + ${e} = ${i+e} bolts altogether.`,diagram:{kind:"quantities",label:"Bolt delivery log",rows:[["Morning",i],["Afternoon",e]]}})),Ur("harbour-equal-packs","Divide into equal groups",["Equal sharing","Multiplication facts"],"Share the total equally. Check by multiplying the number of kits by the amount in one kit.",[{total:36,kits:6},{total:48,kits:8}],({total:i,kits:e})=>({prompt:`${i} washers are shared equally between ${e} repair kits. How many washers go into each kit?`,answer:i/e,explanation:`${i} divided by ${e} = ${i/e}. Check: ${e} x ${i/e} = ${i}. Each kit gets ${i/e} washers.`,diagram:{kind:"sharing",label:"Repair kits",total:i,groups:e}})),Ur("harbour-stock-left","Subtract with regrouping",["Three-digit place value","Subtraction"],"Start with the stock count and subtract the used count. You can count up from the used count to check.",[{stock:302,used:178},{stock:410,used:235}],({stock:i,used:e})=>({prompt:`The workshop has ${i} track pads. It uses ${e} for repairs. How many track pads are left?`,answer:i-e,explanation:`${i} - ${e} = ${i-e}. Check: ${e} + ${i-e} = ${i}.`,diagram:{kind:"quantities",label:"Track-pad stock",rows:[["In stock",i],["Used",e]]}})),Ur("harbour-place-value","Compose hundreds, tens and ones",["Base-ten grouping"],"Each full box stands for 100, each bundle for 10, and each loose pin for 1.",[{hundreds:3,tens:4,ones:8},{hundreds:5,tens:2,ones:6}],({hundreds:i,tens:e,ones:t})=>({prompt:`There are ${i} boxes of 100 pins, ${e} bundles of 10 pins and ${t} loose pins. How many pins are there?`,answer:i*100+e*10+t,explanation:`${i} x 100 + ${e} x 10 + ${t} = ${i*100+e*10+t} pins.`,diagram:{kind:"place-value",label:"Pin inventory",hundreds:i,tens:e,ones:t}})),Ur("harbour-missing-supply","Find a missing addend",["Addition and subtraction are inverse"],"Subtract the amount already packed from the total needed. Add your result to the packed amount to check.",[{target:150,packed:86},{target:200,packed:127}],({target:i,packed:e})=>({prompt:`A repair order needs ${i} connectors. ${e} are already packed. How many more connectors are needed?`,answer:i-e,explanation:`${i} - ${e} = ${i-e}. ${e} + ${i-e} = ${i}, so pack ${i-e} more.`,diagram:{kind:"quantities",label:"Connector order",rows:[["Needed",i],["Packed",e]]}})),Nr("grove-flexible-cover","Choose a material using two properties","The cover must pass BOTH tests: no water through and able to bend. A sample that passes only one is not enough.",[{prompt:"The base needs a cover that bends around a curved box AND keeps water out. Which tested sample meets both needs?",options:[{id:"foil",label:"Sample A: flexible sheet"},{id:"card",label:"Sample B: card"},{id:"tile",label:"Sample C: tile"}],answer:"foil",explanation:"Sample A bends and lets no water through in the displayed tests. B lets water through; C does not bend. Only A meets both needs.",diagram:{kind:"table",label:"Cover tests",columns:["Sample","Bends around box","Water through"],rows:[["A: flexible sheet","Yes","No"],["B: card","Yes","Yes"],["C: tile","No","No"]],controls:"Same water volume and test time.",limitation:"These results describe only the tested samples."}},{prompt:"A new cover must bend around a curved box AND keep water out. Which sample passes both displayed tests?",options:[{id:"board",label:"Sample D: board"},{id:"film",label:"Sample E: film"},{id:"cloth",label:"Sample F: cloth"}],answer:"film",explanation:"E bends and lets no water through. D does not bend and F lets water through, so E is the supported choice.",diagram:{kind:"table",label:"New cover tests",columns:["Sample","Bends around box","Water through"],rows:[["D: board","No","No"],["E: film","Yes","No"],["F: cloth","Yes","Yes"]],controls:"Same water volume and test time.",limitation:"Do not generalise from these samples to every material."}}]),Nr("grove-magnet-evidence","Use observations about magnetic attraction","Use the attraction column, not whether an object looks shiny or is called a metal.",[{prompt:"The magnetic pickup must lift an object attracted in this test. Which object should it collect?",options:[{id:"steel",label:"Steel washer"},{id:"aluminium",label:"Aluminium tab"},{id:"wood",label:"Wooden peg"}],answer:"steel",explanation:"The steel washer was attracted. The aluminium tab and wooden peg were not. Being a metal does not guarantee attraction to this magnet.",diagram:{kind:"table",label:"Magnet observations",columns:["Object","Attracted"],rows:[["Steel washer","Yes"],["Aluminium tab","No"],["Wooden peg","No"]],controls:"Same magnet and starting distance.",limitation:"Results apply to these objects and this magnet."}},{prompt:"Which object has evidence that this magnetic pickup can attract it?",options:[{id:"plastic",label:"Plastic spacer"},{id:"copper",label:"Copper strip"},{id:"iron",label:"Iron nail"}],answer:"iron",explanation:"Only the iron nail was attracted in this test. The copper strip is metal but was not attracted.",diagram:{kind:"table",label:"Pickup observations",columns:["Object","Attracted"],rows:[["Plastic spacer","No"],["Copper strip","No"],["Iron nail","Yes"]],controls:"Same magnet and starting distance.",limitation:"Not every metal is attracted to this magnet."}}]),Nr("grove-fair-ramp","Identify a fair comparison","Change only the surface. Keep the trolley, ramp height and release method the same.",[{prompt:"The team is testing whether a surface changes how far a trolley rolls. Which pair changes only the surface?",options:[{id:"a-b",label:"Tests A and B"},{id:"a-c",label:"Tests A and C"},{id:"b-c",label:"Tests B and C"}],answer:"a-b",explanation:"A and B use trolley 1, a 10 cm ramp and no push; only their surfaces differ. C also changes ramp height, so comparisons with C cannot isolate the surface.",diagram:{kind:"table",label:"Ramp test plans",columns:["Test","Trolley","Ramp height","Surface","Release"],rows:[["A","1","10 cm","Smooth","No push"],["B","1","10 cm","Rough","No push"],["C","1","20 cm","Rough","No push"]],controls:"Compare trolley, ramp height and release method.",limitation:"Repeat a fair comparison before making a broad claim."}},{prompt:"Which pair fairly tests the effect of surface alone on how far the trolley rolls?",options:[{id:"d-e",label:"Tests D and E"},{id:"d-f",label:"Tests D and F"},{id:"e-f",label:"Tests E and F"}],answer:"d-f",explanation:"D and F use the same trolley, 15 cm ramp and release; only the surface changes. E changes the trolley too.",diagram:{kind:"table",label:"New ramp test plans",columns:["Test","Trolley","Ramp height","Surface","Release"],rows:[["D","1","15 cm","Smooth","No push"],["E","2","15 cm","Rough","No push"],["F","1","15 cm","Rough","No push"]],controls:"Compare trolley, ramp height and release method.",limitation:"A fair comparison tests one changed variable."}}]),Nr("grove-absorbent-pad","Compare measured material properties","Choose the greatest measured water uptake. Compare the amounts, not the sample names.",[{prompt:"Equal-size pads each receive 20 mL of water. Which pad absorbs the most in the displayed test?",options:[{id:"a",label:"Pad A"},{id:"b",label:"Pad B"},{id:"c",label:"Pad C"}],answer:"b",explanation:"Pad B absorbs 14 mL, more than A's 5 mL or C's 9 mL. It is the best-supported choice for water uptake in this test.",diagram:{kind:"table",label:"Absorbency test",columns:["Pad","Water absorbed"],rows:[["A","5 mL"],["B","14 mL"],["C","9 mL"]],controls:"Same pad area, 20 mL water, 30-second test.",limitation:"One test does not establish performance under every condition."}},{prompt:"Equal-size pads each receive 20 mL of water. Which absorbs the most in this new test?",options:[{id:"d",label:"Pad D"},{id:"e",label:"Pad E"},{id:"f",label:"Pad F"}],answer:"f",explanation:"F absorbs 16 mL, more than D's 8 mL and E's 11 mL. The measurements support F for this test.",diagram:{kind:"table",label:"New absorbency test",columns:["Pad","Water absorbed"],rows:[["D","8 mL"],["E","11 mL"],["F","16 mL"]],controls:"Same pad area, 20 mL water, 30-second test.",limitation:"Use the measured result, not an assumption about the material."}}]),Nr("grove-push-observation","Link a push to observed motion","Look at the distance after each push. Make a claim about this test, not about every possible situation.",[{prompt:"The same cart starts at rest on the same track. Which statement matches the observations?",options:[{id:"further",label:"The stronger push moved this cart further."},{id:"same",label:"Both pushes moved it the same distance."},{id:"less",label:"The stronger push moved it less far."}],answer:"further",explanation:"In this test, the stronger push moves the cart 70 cm and the gentle push 30 cm. Since 70 is greater than 30, the stronger push moves it further.",diagram:{kind:"table",label:"Cart push observations",columns:["Push","Distance travelled"],rows:[["Gentle","30 cm"],["Stronger","70 cm"]],controls:"Same cart, track and start position; cart initially at rest.",limitation:"Curated observations, not a general force simulator."}},{prompt:"The same cart starts at rest on the same track. Which statement is supported by these observations?",options:[{id:"none",label:"Neither push moved the cart."},{id:"gentle",label:"The gentle push moved this cart less far."},{id:"equal",label:"The two distances are equal."}],answer:"gentle",explanation:"The gentle push moves this cart 25 cm, less than the stronger push's 60 cm. That supports the statement about the gentle push.",diagram:{kind:"table",label:"New cart observations",columns:["Push","Distance travelled"],rows:[["Gentle","25 cm"],["Stronger","60 cm"]],controls:"Same cart, track and start position; cart initially at rest.",limitation:"The claim is limited to the displayed tests."}}]),Nr("grove-load-support","Use test evidence to choose a support","The support must hold at least the required number of blocks without bending. Equal to the requirement is enough.",[{prompt:"A small platform needs to hold 6 identical blocks without bending. Which tested support meets that requirement?",options:[{id:"a",label:"Support A"},{id:"b",label:"Support B"},{id:"c",label:"Support C"}],answer:"c",explanation:"C holds 8 blocks without bending, which is at least 6. A holds only 3 and B only 5, so neither meets the requirement.",diagram:{kind:"table",label:"Support tests",columns:["Support","Most blocks held without bending"],rows:[["A",3],["B",5],["C",8]],controls:"Same span and identical blocks, added in the same position.",limitation:"Virtual model only; not instructions for a real load-bearing structure."}},{prompt:"A small platform needs to hold 7 identical blocks without bending. Which tested support meets that requirement?",options:[{id:"d",label:"Support D"},{id:"e",label:"Support E"},{id:"f",label:"Support F"}],answer:"d",explanation:"D holds 7 blocks without bending and meets the requirement exactly. E holds 4 and F holds 6, which are both fewer than 7.",diagram:{kind:"table",label:"New support tests",columns:["Support","Most blocks held without bending"],rows:[["D",7],["E",4],["F",6]],controls:"Same span and identical blocks, added in the same position.",limitation:"These results concern only the displayed supports."}}]),...Yd]);function Kd(i,e=0){let t=_c.find(s=>s.id===i);if(!t||!Number.isInteger(e)||e<0||e>=t.instances.length)throw new RangeError("Unknown Beacon Brigade question instance");let{instances:n,...r}=t;return structuredClone({...r,...n[e],id:`${t.id}:v${t.version}:${e}`,templateId:i,templateVersion:t.version,variant:e})}function Xa(i){for(let e of Object.values(i))e&&typeof e=="object"&&Xa(e);return Object.freeze(i)}var bc=100,Sc=12,Mc=class extends Error{constructor(e,t,n=409){super(t),this.name="BeaconError",this.code=e,this.status=n}};function wc({profileId:i="local-preview"}={}){return{schemaVersion:1,contentVersion:yc,profileId:i,version:0,hqLevel:1,wallet:{parts:0,cores:0},nextExpeditionNumber:1,activeExpedition:null,history:[],upgrades:[]}}function Qd(i,e){_v(e);let t=structuredClone(i),n=e.at??null,r=i.version+1;switch(e.type){case"start":{t.activeExpedition&&Et("EXPEDITION_ACTIVE","Resume or end the current expedition first."),t.history.length>=bc&&Et("HISTORY_FULL","All 100 expedition records are retained. New expeditions are paused until expanded storage is available.");let s=En.find(c=>c.id===e.regionId);s||Et("INVALID_REGION","Unknown region.",400),t.hqLevel<s.minHqLevel&&Et("REGION_LOCKED","Upgrade HQ before visiting this region.");let a=_c.filter(c=>c.regionId===s.id),o=t.history.filter(c=>c.regionId===s.id).length,l=`${t.profileId}:exp-${t.nextExpeditionNumber++}-${s.id}`;t.activeExpedition={id:l,regionId:s.id,resource:s.resource,startedAt:n,startedVersion:r,status:"active",earned:{parts:0,cores:0},stations:Array.from({length:s.stationNames.length},(c,u)=>{let d=a[(o*s.stationNames.length+u)%a.length],h=Math.floor(o*s.stationNames.length/a.length)%d.instances.length;return{id:`${l}:station-${u+1}`,name:s.stationNames[u],question:Kd(d.id,h),attempts:[],resolved:!1,helpUsed:!1,support:{stage:0,hintAtAttempt:null,events:[],message:null},resolution:null,firstAttemptCorrect:null,lastFeedback:null,reward:{resource:s.resource,amount:yi},rewardGranted:!1}})};break}case"answer":{let s=jd(t,e.stationId);if(s.resolved)return t;let a=bv(s.question,e.answer);!a&&s.attempts.filter(o=>!o.correct).length>=Sc&&Et("ATTEMPT_LIMIT","Your attempts are preserved. Use worked guidance, then submit the corrected answer, or end the expedition."),s.attempts.push({answer:e.answer,correct:a,at:n,version:r,helpStage:s.support.stage}),s.firstAttemptCorrect=s.attempts[0].correct,s.lastFeedback={correct:a,explanation:a?s.question.explanation:s.question.wrongFeedback},a&&(s.resolved=!0,s.resolvedAt=n,s.resolvedVersion=r,s.resolution=s.support.stage===2?"assisted":s.helpUsed?"hinted":s.attempts.length===1?"independent":"corrected",s.rewardGranted||(s.rewardGranted=!0,t.wallet[s.reward.resource]+=s.reward.amount,t.activeExpedition.earned[s.reward.resource]+=s.reward.amount));break}case"hint":{let s=jd(t,e.stationId);if(s.resolved||s.support.stage===2)return t;let a=s.attempts.at(-1);(!a||a.correct)&&Et("ATTEMPT_REQUIRED","Try an answer first; your resources are safe."),s.support.stage===1&&s.attempts.length<=s.support.hintAtAttempt&&s.attempts.length<Sc&&Et("RETRY_REQUIRED","Try again with the hint before opening worked guidance."),s.helpUsed=!0,s.support.stage+=1,s.support.hintAtAttempt=s.attempts.length,s.support.message=s.support.stage===1?s.question.hint:s.question.explanation,s.support.events.push({stage:s.support.stage,afterAttempt:s.attempts.length,at:n,version:r}),s.lastFeedback={correct:!1,explanation:s.support.message,kind:s.support.stage===1?"hint":"worked"};break}case"finish":case"end":{let s=eh(t);e.type==="finish"&&s.stations.some(a=>!a.resolved)&&Et("STATIONS_UNRESOLVED","Resolve every station, or end the expedition with the rewards already earned."),s.status=e.type==="finish"?"completed":"ended",s.finishedAt=n,s.finishedVersion=r,t.history.push(s),t.activeExpedition=null;break}case"upgrade":{let s=qa[t.hqLevel+1];s||Et("MAX_HQ_LEVEL","HQ is at the highest level in this first playable."),(t.wallet.parts<s.parts||t.wallet.cores<s.cores)&&Et("INSUFFICIENT_RESOURCES",`This upgrade needs ${s.parts} parts and ${s.cores} cores.`),t.wallet.parts-=s.parts,t.wallet.cores-=s.cores,t.hqLevel+=1,t.upgrades.push({hqLevel:t.hqLevel,cost:{...s},at:n,version:r});break}case"reset":{let s=wc({profileId:t.profileId});Object.assign(t,s),t.contentVersion=yc;break}}return t.version=r,t}function Ec(i,{review:e=!1}={}){let t=structuredClone(i),n=[...t.history,...t.activeExpedition?[t.activeExpedition]:[]];for(let r of n)for(let s of r.stations)delete s.question.hint,delete s.question.wrongFeedback,!e&&r.status==="active"&&!s.resolved&&s.support.stage<2&&(delete s.question.answer,delete s.question.explanation);return t.limits={maxExpeditions:bc,expeditionsRemaining:bc-t.history.length-(t.activeExpedition?1:0),maxWrongAttemptsPerStation:Sc,historyRetention:"No automatic deletion"},t.nextUpgrade=qa[i.hqLevel+1]?{level:i.hqLevel+1,cost:{...qa[i.hqLevel+1]}}:null,t}function _v(i){(!i||typeof i!="object"||Array.isArray(i))&&Et("INVALID_ACTION","An action object is required.",400);let e={start:["regionId"],answer:["stationId","answer"],hint:["stationId"],finish:[],upgrade:[],end:[],reset:[]};(typeof i.type!="string"||!Object.hasOwn(e,i.type))&&Et("INVALID_ACTION","Unknown action type.",400);let t=["type","at",...e[i.type]];Object.keys(i).some(n=>!t.includes(n))&&Et("INVALID_ACTION","Unexpected action fields.",400),e[i.type].some(n=>!Object.hasOwn(i,n))&&Et("INVALID_ACTION","Required action fields are missing.",400),("stationId"in i&&typeof i.stationId!="string"||"regionId"in i&&typeof i.regionId!="string")&&Et("INVALID_ACTION","Station and region IDs must be strings.",400),"at"in i&&(typeof i.at!="string"||!Number.isFinite(Date.parse(i.at)))&&Et("INVALID_ACTION","Invalid timestamp.",400),i.type==="answer"&&!(typeof i.answer=="string"&&i.answer.length<=120&&i.answer.trim()||typeof i.answer=="number"&&Number.isFinite(i.answer))&&Et("INVALID_ANSWER","Enter a number or choose an option.",400)}function bv(i,e){return i.type==="choice"?((typeof e!="string"||!i.options.some(t=>t.id===e))&&Et("INVALID_ANSWER","Choose one of this question's options.",400),e===i.answer):(typeof e=="string"&&!/^[+-]?\d+(?:\.\d+)?$/.test(e.trim())&&Et("INVALID_ANSWER","Enter a number without units or symbols.",400),Number(e)===i.answer)}function eh(i){return i.activeExpedition||Et("NO_ACTIVE_EXPEDITION","Start an expedition first."),i.activeExpedition}function jd(i,e){let t=eh(i).stations.find(n=>n.id===e);return t||Et("INVALID_STATION","This station does not belong to the active expedition.",400),t}function Et(i,e,t=409){throw new Mc(i,e,t)}var Sv={Shield:Eo,House:ws,Map:fo,BookOpen:io,Settings:wo,ArrowLeft:to,ArrowRight:no,Plus:_o,Minus:po,RotateCcw:Mo,Volume2:Ao,VolumeX:Co,Pause:vo,Play:yo,FlaskConical:co,Package:xo,Check:so,X:Po,ChevronRight:ao,Radio:bo,Flag:lo,Wrench:Ro,HardHat:uo,RefreshCw:So,HelpCircle:kr,Eye:oo,Navigation:mo,MapPin:ho,Calculator:ro,Orbit:go,Sprout:To},ht=i=>document.getElementById(i),Ue=i=>String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),pt=i=>`<i data-lucide="${i}" aria-hidden="true"></i>`,Je=(i,e,t="",n="",r=!1,s="")=>`<button type="button" class="button ${n}" data-action="${i}" ${r?"disabled":""} ${s}>${t?pt(t):""}${e}</button>`,_i=(i,e,t)=>`<button class="icon-btn" type="button" data-action="${i}" title="${e}" aria-label="${e}">${pt(t)}</button>`,Mv=new URLSearchParams(location.search),$i=["localhost","127.0.0.1","[::1]"].includes(location.hostname)&&Mv.get("preview")==="1",Jt={get(i,e=null){try{return JSON.parse(localStorage.getItem(i)||"null")??e}catch{return e}},set(i,e){try{localStorage.setItem(i,JSON.stringify(e))}catch{tn("Device storage is unavailable. Keep this page open until your save is confirmed.")}},remove(i){localStorage.removeItem(i)}},we,Wi,Fr,Ce,it="hq",vt="harbour",fn="",mn="",Vt="",Ot="",mt=!1,pn=!1,$a=null,Br="",th,ln=null,On=Jt.get("bqBeaconSettings",{sound:!1,reduced:matchMedia("(prefers-reduced-motion: reduce)").matches}),rh="bqBeaconPreviewV1",qi=ht("dialog"),sh=null,Za=()=>En.find(i=>i.id===vt),ms=i=>we?.history?.some(e=>e.regionId===i&&e.status==="completed"),Rc=i=>`${i.subject==="life-sciences"?"Life Sciences":i.subject[0].toUpperCase()+i.subject.slice(1)} / ${i.resource==="parts"?"Building parts":"Research cores"}`,Vi=()=>we?.activeExpedition?.stations.find(i=>i.id===mn),wv=()=>we?.activeExpedition?.stations.find(i=>i.id===Vt),Ya=i=>we?.activeExpedition?.stations.findIndex(e=>e.id===i)??-1,Or=()=>`bqBeaconPending:${Wi?.id}`,gs=()=>`bqBeaconDraft:${Wi?.id}:${mn}`,Tn=null;function tn(i){ht("toast").textContent=i,ht("toast").classList.add("visible"),clearTimeout(th),th=setTimeout(()=>ht("toast").classList.remove("visible"),5500)}function ah(){Io({icons:Sv,attrs:{"stroke-width":1.8}})}function xs(i=!1){if(!(!On.sound||document.hidden))try{Tn||=new AudioContext,Tn.resume();let e=Tn.createGain();e.gain.setValueAtTime(.025,Tn.currentTime),e.gain.exponentialRampToValueAtTime(1e-4,Tn.currentTime+.3),e.connect(Tn.destination);let t=Tn.createOscillator();t.type="sine",t.frequency.setValueAtTime(i?620:380,Tn.currentTime),t.frequency.exponentialRampToValueAtTime(i?920:290,Tn.currentTime+.22),t.connect(e),t.start(),t.stop(Tn.currentTime+.3)}catch{}}function ys(){speechSynthesis.cancel(),Tn?.suspend()}function Ev(){if(!On.sound){tn("Turn on sound in Settings to hear the question.");return}speechSynthesis.cancel();let i=Vi();if(!i)return;let e=new SpeechSynthesisUtterance(i.question.prompt);e.lang="en-AU",e.rate=.92,speechSynthesis.speak(e)}async function vs(i){let e=await fetch("/api/beacon-brigade",{method:i?"POST":"GET",credentials:"same-origin",cache:"no-store",headers:{accept:"application/json",...sessionStorage.getItem("brightQuestChildCapability")?{"x-bq-child-capability":sessionStorage.getItem("brightQuestChildCapability")}:{},...i?{"content-type":"application/json","x-bq-child-id":Wi.id}:{}},...i?{body:JSON.stringify(i)}:{}}),t=await e.json().catch(()=>({}));if(!e.ok){let n=new Error(t.error||`Connection error (${e.status})`);throw n.code=t.code,n.status=e.status,n}return t}async function Gi(i){if(mt)return!1;if(ln)return tn("Reconnect your pending save before starting another action."),!1;mt=!0,on();let e={operationId:crypto.randomUUID(),version:we.version,action:i};try{return $i?(Fr=Qd(Fr,{...e.action,at:new Date().toISOString()}),Jt.set(rh,Fr),we=Ec(Fr)):(Jt.set(Or(),e),we=(await vs(e)).state,Jt.remove(Or())),Ce.hqLevel!==we.hqLevel&&Ce.createBase(we.hqLevel),!0}catch(t){if(!$i&&(!t.status||t.status>=500))ln=e,tn("Connection interrupted. Your answer is kept here. Reconnect to confirm the save.");else{if(Jt.remove(Or()),t.status===409)try{we=(await vs()).state}catch{}tn(t.message)}return!1}finally{mt=!1,on()}}async function oh(){if(!(!ln||mt)){mt=!0,on();try{we=(await vs(ln)).state,ln=null,Jt.remove(Or()),Ce.hqLevel!==we.hqLevel&&Ce.createBase(we.hqLevel),tn("Saved. Your progress is up to date.")}catch(i){i.status&&i.status<500&&(ln=null,Jt.remove(Or()),i.status===409&&(we=(await vs()).state)),tn(i.message||"Still offline. Your pending response is kept on this device.")}finally{mt=!1,on()}}}function an(i,e={},t=!1){ys(),it=i,e.regionId&&(vt=e.regionId),e.stationId&&(mn=e.stationId),e.reviewId&&(Br=e.reviewId);let n={view:it,regionId:vt,selectedRegionId:fn,stationId:mn,targetStationId:Vt,reviewId:Br};history[t?"replaceState":"pushState"](n,"",`${location.pathname}${location.search}#${i}${i==="station"?`/${encodeURIComponent(mn)}`:""}`),on()}function lh(){!Ce||it==="travel"||(Ce.paused=pn||qi.open,Ce.reduced=On.reduced,it==="map"||it==="region-info"?(Ce.selectStation(vt,null),Ce.setView("map")):it==="region"?(Ce.setView("region",vt),Ce.selectStation(vt,Vt?Ya(Vt):null)):it==="station"?(Ce.setView("station",vt),Ce.selectStation(vt,Ya(mn)),Ce.setView("station",vt)):it==="results"?Ce.setView("region",$a?.regionId||vt):Ce.setView("hq"),Ce.syncMarkers({view:it,region:vt,selectedRegion:fn,completedRegions:En.filter(i=>ms(i.id)).map(i=>i.id),activeRegion:we.activeExpedition?.regionId||"",selectedStation:Vt,stations:we.activeExpedition?.regionId===vt?we.activeExpedition.stations:[]}))}function Tv(){ht("topbar").innerHTML=`<div class="brand"><span class="brand-mark">${pt("shield")}</span><div><strong>BEACON BRIGADE</strong><span class="overline">${$i?"Local preview / saved on this device":"Bright Quest / Expedition command"}</span></div></div>
    <div class="wallet"><div class="resource">${pt("package")}<div><strong>${we.wallet.parts}</strong><small>BUILDING PARTS</small></div></div><div class="resource cores">${pt("flask-conical")}<div><strong>${we.wallet.cores}</strong><small>RESEARCH CORES</small></div></div></div>
    <div class="profile-chip">${Ue(Wi.name)}<small>${ln?"Save pending":$i?"Preview commander":"Progress connected"}</small></div>
    ${_i("reset-game","Reset game progress","rotate-ccw")}
    <a class="icon-btn portal-home" href="/" title="Return to Bright Quest" aria-label="Return to Bright Quest">${pt("arrow-left")}</a>`}function Av(){let i=[["hq","house","HQ"],["map","map","World map"],["journal","book-open","Journal"],["settings","settings","Settings"]];ht("navigation").innerHTML=i.map(([e,t,n])=>`<button class="nav-btn ${it===e?"active":""}" data-action="${e}" type="button" ${it==="travel"&&e!=="settings"||mt?"disabled":""} ${it===e?'aria-current="page"':""}>${pt(t)}<span>${n}</span></button>`).join(""),ht("world-controls").innerHTML=_i("zoom-in","Zoom in","plus")+_i("zoom-out","Zoom out","minus")+_i("reset-camera","Reset camera","rotate-ccw"),ht("world-controls").hidden=["station","travel"].includes(it)}function jn(i,e,t="",n=""){return`<div class="scene-caption ${n}"><div class="eyebrow">${i}</div><h1>${e}</h1>${t?`<p>${t}</p>`:""}<span class="coordinate">SECTOR 07 / BEACON OPERATIONS</span></div>`}function ch(){return'<div class="vehicle-id"><strong>ATLAS / M-07</strong><small>ARMOURED EXPEDITION VEHICLE</small></div>'}function Cv(){let i=we.nextUpgrade?.cost;return i?`<div class="requirements">${[["parts","Building parts","package","harbour"],["cores","Research cores","flask-conical","grove"]].map(([e,t,n,r])=>`<div class="requirement ${we.wallet[e]>=i[e]?"ready":""}"><span>${pt(n)}${t}</span><strong>${we.wallet[e]} <small>/ ${i[e]}</small></strong>${we.wallet[e]<i[e]?`<button data-action="destination" data-region="${r}">Find ${i[e]-we.wallet[e]} more</button>`:"<small>Ready to build</small>"}</div>`).join("")}</div>`:""}function Ac(){let i=we.nextUpgrade,e=we.activeExpedition?Je("resume","Resume expedition","play","primary hq-primary",mt):Je("map","Choose expedition","map","primary hq-primary",mt);return jn("Your home base",["","Forward operating base","Expedition headquarters","Beacon command centre"][we.hqLevel],"Build the base. Equip the expedition.")+`<div class="hq-quick-actions" aria-label="Headquarters actions">${i?_i("construction","View construction","hard-hat"):""}${e}</div>`+ch()}function uh(){let i=En.find(s=>s.id===fn),e=i&&ms(i.id),t=i?we.history.filter(s=>s.regionId===i.id&&s.status==="completed").length:0,n=i&&we.activeExpedition?.regionId===i.id,r=i?`<aside class="panel field-command world-command selected"><div class="panel-head destination-panel-head"><div><div class="eyebrow">${e?"District completed":"Destination selected"}</div><h2>${Ue(i.name)}</h2><div class="mission-count">${Ue(Rc(i))}</div></div>${_i("clear-region","Close destination","x")}</div><div class="panel-body"><div class="destination-status"><span class="status ${e?"complete-glow":"pending"}">${e?`${pt("check")} Complete`:n?"In progress":"Ready"}</span><span class="node-code">${t?`${t} CLEAR${t===1?"":"S"}`:"NEW ROUTE"}</span></div><p class="destination-skill">${Ue(i.description)}</p><div class="summary-resource"><span>${pt(i.resource==="parts"?"package":"flask-conical")}${i.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${i.stationNames.length*yi}</strong></div><div class="destination-actions">${Je("explore-region","Explore","eye")}${Je("march-region",n?"Resume":e?"March again":"March","navigation","primary",mt)}</div></div></aside>`:"";return jn("Expedition theatre","Choose a subject district","Five specialist districts. Tap a building to inspect it.")+r}function Rv(){let i=Za();return jn("Destination selected",Ue(i.name))+`<aside class="panel"><div class="panel-head"><div class="eyebrow">${Ue(Rc(i))}</div><h2>${Ue(i.name)}</h2></div><div class="panel-body"><p>${Ue(i.description)}</p><div class="summary-resource"><span>${pt(i.resource==="parts"?"package":"flask-conical")}${i.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${i.stationNames.length*yi}</strong></div><p class="subtle">${i.stationNames.length} destinations / untimed questions</p>${Je("deploy","Deploy Atlas","arrow-right","primary full",mt)}${Je("map","Back to world map","arrow-left","quiet full")}</div></aside>`}function dh(){let i=we.activeExpedition;if(!i)return it="map",uh();vt=i.regionId;let e=i.stations.filter(o=>o.resolved).length,t=i.stations.length,n=e===t,r=wv(),s=r?`<aside class="panel field-command selected"><div class="panel-head destination-panel-head"><div><div class="eyebrow">Destination selected</div><h2>${Ue(r.name)}</h2><div class="mission-count">${e} of ${t} resolved</div></div>${_i("clear-station","Close destination","x")}</div><div class="panel-body"><div class="destination-status"><span class="status ${r.resolved?"":"pending"}">${r.resolved?"Resolved":"Ready"}</span><span class="node-code">SITE ${String(Ya(r.id)+1).padStart(2,"0")}</span></div><p class="destination-skill">${Ue(r.question.skill)}</p><div class="summary-resource"><span>${pt(i.resource==="parts"?"package":"flask-conical")}${i.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${yi}</strong></div><div class="destination-actions">${Je("explore-station","Explore","eye","",!1,`data-station="${Ue(r.id)}"`)}${Je("march-station",r.resolved?"Revisit":"March","navigation","primary",mt,`data-station="${Ue(r.id)}"`)}</div></div></aside>`:"",a=!r&&n?`<aside class="panel field-command complete"><div class="panel-head"><div class="eyebrow">Expedition ready</div><h2>All ${t} sites complete</h2><div class="mission-count">+${e*yi} ${i.resource==="parts"?"parts":"cores"} secured</div></div><div class="panel-foot">${Je("finish","Complete expedition","check","primary full",mt)}</div></aside>`:"";return jn("Aerial expedition view",Ue(Za().name),`${e} of ${t} missions complete`)+s+a+ch()}function hh(i,e=!1){if(!i)return"";let t="";return i.kind==="groups"?t=`<div class="crate-grid">${Array.from({length:i.groups},(n,r)=>`<div class="supply-crate" role="img" aria-label="Crate ${r+1}: ${i.itemsPerGroup} pieces">${"<i></i>".repeat(i.itemsPerGroup)}</div>`).join("")}</div><p class="diagram-note">Reserved for another base: <strong>${i.reserved}</strong></p>`:i.kind==="sharing"?t=`<div class="log-row"><span>Washers available</span><strong>${i.total}</strong></div><div class="crate-grid" style="margin-top:12px">${Array.from({length:i.groups},(n,r)=>`<div class="place-value"><strong>?</strong><small>KIT ${r+1}</small></div>`).join("")}</div>`:i.kind==="place-value"?t=`<div class="place-values">${[["hundreds","BOXES OF 100"],["tens","BUNDLES OF 10"],["ones","LOOSE PINS"]].map(([n,r])=>`<div class="place-value"><strong>${i[n]}</strong><small>${r}</small></div>`).join("")}</div>`:i.kind==="quantities"?t=i.rows.map(([n,r])=>`<div class="log-row"><span>${Ue(n)}</span><strong>${r}</strong></div>`).join(""):i.kind==="table"&&(t=`${e?`<div class="test-control">${Je("observe","Inspect evidence","flask-conical","",mt)}<small>Recorded field observations</small></div>`:""}<table><thead><tr>${i.columns.map(n=>`<th scope="col">${Ue(n)}</th>`).join("")}</tr></thead><tbody>${i.rows.map((n,r)=>`<tr data-evidence-row="${r}">${n.map(s=>`<td>${Ue(s)}</td>`).join("")}</tr>`).join("")}</tbody></table><p class="diagram-note">${Ue(i.controls)}</p>`),`<figure class="diagram"><figcaption>${Ue(i.label)}</figcaption>${t}</figure>`}function Pv(){let i=Vi();if(!i)return it="region",dh();let e=i.question,t=Jt.get(gs(),"");Ot=Ot||String(t??"");let n=i.lastFeedback;return jn(Za().name,Ue(i.name),"","station-caption")+`<section class="panel challenge"><div class="panel-head"><div class="challenge-top"><span class="eyebrow">Arrived / ${Ue(i.name)}</span><span class="status ${i.resolved?"":"plain"}">${i.resolved?"Reward saved":`+4 ${i.reward.resource==="parts"?"parts":"cores"}`}</span></div><h2 tabindex="-1">${Ue(e.prompt)}</h2></div><div class="panel-body">${hh(e.diagram,!0)}
    <form id="answer-form">${e.type==="number"?`<label class="answer-field" for="answer-input">Your answer<input id="answer-input" name="answer" inputmode="numeric" autocomplete="off" type="text" maxlength="12" value="${Ue(Ot)}" ${i.resolved||mt?"disabled":""}></label>`:`<div class="answer-options" role="group" aria-label="Answer choices">${e.options.map((r,s)=>`<button class="answer-option ${Ot===r.id?"selected":""}" type="button" data-action="option" data-option="${Ue(r.id)}" aria-pressed="${Ot===r.id}" ${i.resolved||mt?"disabled":""}><span class="option-mark">${String.fromCharCode(65+s)}</span><span>${Ue(r.label)}</span></button>`).join("")}</div>`}
    ${n?`<div class="feedback ${n.correct?"correct":""}" role="status"><strong>${n.correct?"Contract resolved":n.kind==="worked"?"Worked explanation":n.kind==="hint"?"Field guidance":"Take another look"}</strong>${Ue(n.explanation)}${i.resolved?`<p class="subtle">+4 ${i.reward.resource==="parts"?"building parts":"research cores"} saved${i.helpUsed?" / completed with support":""}</p>`:""}</div>`:""}
    <div class="actions">${i.resolved?Je("region","Return to expedition","arrow-right","primary",mt):`<button class="button primary" type="submit" ${mt||ln?"disabled":""}>${mt?'<span class="spinner"></span>':pt("check")}Check answer</button>${Je("hint",i.support.stage?"Worked example":"Hint","help-circle","",mt||!i.attempts.length||i.support.stage>=2)}`}</div></form>
    <div class="actions">${Je("region","Back to base","arrow-left","quiet",mt)}${Je("read","Read aloud","volume-2","quiet",!1)}</div></div></section>`}function Iv(){let i=we.nextUpgrade,e=i&&we.wallet.parts>=i.cost.parts&&we.wallet.cores>=i.cost.cores;return jn("Engineering command","Build your headquarters")+`<aside class="panel"><div class="panel-head"><div class="eyebrow">${i?`HQ Level ${we.hqLevel} to Level ${i.level}`:"Final build complete"}</div><h2>${i?.level===2?"Expedition headquarters":"Beacon command centre"}</h2></div><div class="panel-body"><p>${i?"Raise the command building, expand its roof systems and establish your next permanent base upgrade.":"The command centre is complete. Your saved progress and expeditions are available in the journal."}</p>${Cv()}${i?Je("confirm-build",e?"Construct headquarters":"Resources required","hard-hat","primary full",!e||mt||!!ln):""}<div style="margin-top:10px">${Je("hq","Return to HQ","arrow-left","full")}</div></div></aside>`}function Lv(){let i=$a||we.history.at(-1);return i?jn("Mission accomplished","Cargo secured")+`<aside class="panel"><div class="panel-head"><span class="rank">${pt("check")}EXPEDITION COMPLETE</span><h2>${Ue(En.find(e=>e.id===i.regionId)?.name)}</h2></div><div class="panel-body"><div class="summary-resource"><span>${pt("package")}Building parts</span><strong>+${i.earned.parts}</strong></div><div class="summary-resource"><span>${pt("flask-conical")}Research cores</span><strong>+${i.earned.cores}</strong></div><p>Your cargo is saved. Return to headquarters to put it to work.</p>${Je("return-hq","Drive back to HQ","house","primary full")}<div style="margin-top:10px">${Je("review","Review expedition","book-open","full",!1,`data-review="${Ue(i.id)}"`)}</div></div></aside>`:Ac()}function nh(i,e){return i.options?.find(t=>t.id===e)?.label??e??"No answer"}function fh(){let i=[...we.history].reverse();return jn("Expedition record","Field journal")+`<section class="panel journal"><div class="panel-head"><div class="eyebrow">Your learning and expeditions</div><h2>Field journal</h2></div><div class="panel-body">${we.activeExpedition?`<div class="history-item"><span class="status pending">In progress</span><h3 style="margin-top:8px">${Ue(En.find(e=>e.id===we.activeExpedition.regionId)?.name)}</h3><div class="actions">${Je("resume","Resume","play","primary")}${Je("end-expedition","End expedition","flag")}</div></div>`:""}${i.length?i.map(e=>`<article class="history-item"><span class="status ${e.status==="ended"?"plain":""}">${e.status==="ended"?"Ended early":"Completed"}</span><h3 style="margin-top:8px">${Ue(En.find(t=>t.id===e.regionId)?.name)}</h3><p class="subtle">${e.stations.filter(t=>t.resolved).length} of ${e.stations.length} stations / +${e.earned.parts} parts / +${e.earned.cores} cores</p><div class="actions">${Je("review","Review answers","book-open","",!1,`data-review="${Ue(e.id)}"`)}</div></article>`).join(""):'<p class="empty">Your completed expeditions will appear here.</p>'}</div></section>`}function Dv(){let i=we.history.find(t=>t.id===Br);if(!i)return fh();let e=[...i.stations].sort((t,n)=>+(t.firstAttemptCorrect!==!1)-+(n.firstAttemptCorrect!==!1));return jn("Expedition evidence","Answer review")+`<section class="panel journal"><div class="panel-head"><div class="eyebrow">Original missed answers first</div><h2>${Ue(En.find(t=>t.id===i.regionId)?.name)}</h2></div><div class="panel-body">${e.map(t=>`<article class="review-station"><span class="status ${t.firstAttemptCorrect===!1?"missed":t.resolved?"":"plain"}">${t.firstAttemptCorrect===!1?"First answer missed":t.resolved?"Correct first time":"Not completed"}</span><h3>${Ue(t.question.prompt)}</h3>${hh(t.question.diagram)}<p><strong>First answer:</strong> ${Ue(nh(t.question,t.attempts[0]?.answer))}</p><p><strong>Correct answer:</strong> ${Ue(nh(t.question,t.question.answer))}</p><p>${Ue(t.question.explanation)}</p><p class="subtle">${t.resolution?Ue(t.resolution):"Unresolved"} / ${t.attempts.length} response${t.attempts.length===1?"":"s"}${t.helpUsed?" / support used":""}</p></article>`).join("")}<div class="actions">${Je("journal","Back to journal","arrow-left","full")}</div></div></section>`}function on(){if(!we||!Ce)return;Tv(),Av();let i={hq:Ac,map:uh,"region-info":Rv,region:dh,station:Pv,construction:Iv,results:Lv,journal:fh,review:Dv};it==="travel"?ht("interface").innerHTML=`<section class="travel-panel ${pn?"paused":""}"><div class="eyebrow">Atlas M-07 / ${Ce.travel?.kind==="station"?"Field march":"Convoy in transit"}</div><h2>${Ce.travel?.label?`En route to ${Ue(Ce.travel.label)}`:"Route in progress"}</h2><div class="travel-progress"><span></span></div><div class="travel-readout"><span>ROUTE ACTIVE</span><strong>${Math.max(0,Math.ceil((Ce.travel?.duration||0)-(Ce.travel?.elapsed||0)))}s</strong></div><div class="actions">${Je("pause-travel",pn?"Continue journey":"Pause journey",pn?"play":"pause")}${Je("cancel-travel",Ce.travel?.kind==="station"?"Cancel march":"Stop journey","flag")}</div></section>`:ht("interface").innerHTML=(i[it]||Ac)(),["map","region-info"].includes(it)?ht("location-pins").innerHTML=`<button class="location-pin hq-location" type="button" data-pin="hq" data-action="hq">${pt("house")}<span><strong>Headquarters</strong><small>Home base</small></span></button><span class="strategic-anchor atlas-anchor atlas-world" data-pin="atlas" aria-label="Atlas expedition vehicle">${pt("navigation")}<b>ATLAS</b></span>`+En.map(e=>{let t=ms(e.id),n=we.activeExpedition?.regionId===e.id;return`<button class="location-pin subject-pin ${fn===e.id?"selected":""} ${t?"completed":""} ${n?"active":""}" type="button" data-pin="${e.id}" data-action="destination" data-region="${e.id}" aria-pressed="${fn===e.id}" aria-label="${Ue(e.name)}, ${t?"completed":n?"in progress":"ready"}">${t?`<span class="completion-beacon">${pt("check")}</span>`:pt(e.icon)}<span><strong>${Ue(e.name)}</strong><small>${Ue(Rc(e))}</small></span></button>`}).join(""):it==="region"&&we.activeExpedition?ht("location-pins").innerHTML=`<span class="strategic-anchor hq-anchor" data-pin="hq" aria-label="Headquarters">${pt("house")}<b>HQ</b></span><span class="strategic-anchor atlas-anchor" data-pin="atlas" aria-label="Atlas expedition vehicle">${pt("navigation")}<b>ATLAS</b></span>`+we.activeExpedition.stations.map((e,t)=>`<button class="field-location-pin ${e.id===Vt?"selected":""} ${e.resolved?"resolved":""}" type="button" data-pin="station-${t}" data-action="select-station" data-station="${Ue(e.id)}" aria-label="${Ue(e.name)}, ${e.resolved?"resolved":"available"}" aria-pressed="${e.id===Vt}"><span class="field-pin-index">${e.resolved?pt("check"):t+1}</span></button>`).join(""):ht("location-pins").innerHTML="",ln&&ht("interface").insertAdjacentHTML("beforeend",`<div style="position:absolute;top:0;left:50%;transform:translateX(-50%);pointer-events:auto">${Je("retry-save","Reconnect pending save","refresh-cw","gold",mt)}</div>`),lh(),ah(),ht("game").dataset.view=it,ht("game").dataset.hqLevel=we.hqLevel,ht("game").setAttribute("aria-busy",String(mt))}function Xi(i,e){sh=document.activeElement,qi.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">${i}</h2>${_i("close-dialog","Close","x")}</div><div class="dialog-body">${e}</div>`,qi.setAttribute("aria-labelledby","dialog-title"),qi.showModal(),Ce.paused=!0,ys(),ah()}function An(){qi.close(),Ce.paused=pn,sh?.focus()}function Uv(){Xi("Expedition settings",`<label class="setting">Sound and read-aloud<input id="sound-setting" type="checkbox" ${On.sound?"checked":""}></label><label class="setting">Reduced motion<input id="motion-setting" type="checkbox" ${On.reduced?"checked":""}></label><p class="subtle" style="margin-top:15px">${$i?"Local preview. Progress is stored on this device only.":"Progress is saved to the current Bright Quest child profile."}</p><div class="dialog-actions">${Je("save-settings","Done","check","primary")}</div><a class="button full" style="margin-top:10px" href="/">${pt("arrow-left")}Return to Bright Quest</a>`)}function Nv(){let i=Za();Xi(i.name,`<div class="recon-card"><span class="status ${ms(i.id)?"complete-glow":"pending"}">${ms(i.id)?`${pt("check")} District completed`:"Ready to explore"}</span><p><strong>${Ue(i.stationNames.length)} subject missions</strong><br>${Ue(i.stationNames.join(" / "))}</p><p>${Ue(i.description)}</p><div class="summary-resource"><span>${pt(i.resource==="parts"?"package":"flask-conical")}${i.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${i.stationNames.length*yi}</strong></div></div><div class="dialog-actions">${Je("close-dialog","Back to map","arrow-left")}${Je("march-region-dialog",we.activeExpedition?.regionId===i.id?"Resume":"March","navigation","primary")}</div>`)}async function Tc(){if(we.activeExpedition){if(we.activeExpedition.regionId===vt)return Cc();Xi("An expedition is already active",`<p>Resume it, or end it in the journal before starting another. Your earned cargo stays safe.</p><div class="dialog-actions">${Je("resume-dialog","Resume expedition","play","primary")}${Je("journal-dialog","Open journal","book-open")}</div>`);return}await Gi({type:"start",regionId:vt})&&(Vt="",Pc(vt,"region"))}function Pc(i,e){pn=!1,Ce.paused=!1,Ce.drive(i,()=>{an(e,{},!0),xs(!0)}),it="travel",on()}function Cc(){vt=we.activeExpedition.regionId,Pc(vt,"region")}function ih(i){let e=Ya(i);e<0||(Vt=i,mn=i,Ot="",pn=!1,Ce.paused=!1,Ce.driveToStation(vt,e,()=>{an("station",{stationId:i},!0),xs(!0),requestAnimationFrame(()=>document.querySelector(".challenge h2")?.focus())}),it="travel",on())}function Fv(i){let e=we.activeExpedition?.stations.find(n=>n.id===i);if(!e)return;let t=we.activeExpedition.subject==="maths"?"Logistics":"Field science";Xi(e.name,`<div class="recon-card"><span class="status ${e.resolved?"":"pending"}">${e.resolved?"Resolved":"Ready to explore"}</span><p><strong>${t} objective</strong><br>${Ue(e.question.skill)}</p><div class="summary-resource"><span>${pt(e.reward.resource==="parts"?"package":"flask-conical")}${e.reward.resource==="parts"?"Building parts":"Research cores"}</span><strong>+4</strong></div></div><div class="dialog-actions">${Je("close-dialog","Back to map","arrow-left")}${Je("march-dialog",e.resolved?"Revisit site":"March to site","navigation","primary",!1,`data-station="${Ue(e.id)}"`)}</div>`)}async function Ov(){if(mt||!Vi()||Vi().resolved)return;let i=Vi().question,e=i.type==="number"?ht("answer-input")?.value.trim():Ot;if(!e&&e!=="0"){tn("Choose or enter an answer first.");return}if(i.type==="number"&&!/^\d{1,8}$/.test(e)){tn("Enter a whole number.");return}Ot=String(e),Jt.set(gs(),Ot),await Gi({type:"answer",stationId:mn,answer:i.type==="number"?Number(e):e})&&(xs(Vi()?.resolved),Vi()?.resolved&&Jt.remove(gs()))}ht("game").addEventListener("submit",i=>{i.target.id==="answer-form"&&(i.preventDefault(),Ov())});ht("game").addEventListener("input",i=>{let e=i.target;e.id==="answer-input"&&(Ot=e.value,Jt.set(gs(),Ot))});ht("game").addEventListener("click",async i=>{let e=i.target.closest("[data-action]");if(!e||e.disabled)return;let t=e.dataset.action;if(t==="zoom-in")return Ce.zoom(-2);if(t==="zoom-out")return Ce.zoom(2);if(t==="reset-camera")return Ce.resetCamera(),lh();if(t==="close-dialog")return An();if(t==="retry-save")return oh();if(t==="read")return Ev();if(t==="option"){Ot=e.dataset.option,Jt.set(gs(),Ot),document.querySelectorAll("[data-option]").forEach(n=>{n.classList.toggle("selected",n.dataset.option===Ot),n.setAttribute("aria-pressed",String(n.dataset.option===Ot))});return}if(t==="observe"){let n=[...document.querySelectorAll("[data-evidence-row]")];for(let r=0;r<n.length;r++)n.forEach(s=>s.classList.remove("selected")),n[r].classList.add("selected"),await new Promise(s=>setTimeout(s,On.reduced?1:500));n.forEach(r=>r.classList.remove("selected"));return}if(t==="settings")return Uv();if(t==="reset-game")return Xi("Reset Beacon Brigade?",`<div class="reset-warning"><strong>This erases this child's Beacon Brigade progress.</strong><p>HQ levels, resources, completed districts, answers and journal records will all be permanently cleared. Other Bright Quest modules are not affected.</p></div><div class="dialog-actions">${Je("close-dialog","Keep progress","arrow-left","primary")}${Je("reset-now","Reset all progress","rotate-ccw","danger")}</div>`);if(t==="reset-now"){An(),await Gi({type:"reset"})&&(fn="",Vt="",mn="",Ot="",Br="",$a=null,Ce.selectStation(vt,null),Ce.clearRoute(),an("hq",{},!0),tn("Beacon Brigade has been reset for this child."));return}if(t==="save-settings"){On={sound:ht("sound-setting").checked,reduced:ht("motion-setting").checked},Jt.set("bqBeaconSettings",On),On.sound||ys(),An(),on();return}if(t==="pause-travel"){pn=!pn,Ce.paused=pn,on();return}if(t==="cancel-travel"){let n=Ce.travel?.kind==="station";Ce.travel=null,Ce.onTravelEnd=null,Ce.clearRoute(),Ce.dustPuffs.forEach(r=>{r.visible=!1}),pn=!1,Ce.paused=!1,an(n?"region":"hq");return}if(!(mt||it==="travel")){if(t==="hq"||t==="return-hq"){if(["region","station","results"].includes(it))return Pc("hq","hq");an("hq");return}if(["map","construction","journal","region"].includes(t)){t==="map"&&(fn=""),(t!=="region"||we.activeExpedition?.stations.every(n=>n.resolved))&&(Vt=""),an(t);return}if(t==="destination"){Vt="",fn=e.dataset.region,vt=fn,an("map");return}if(t==="clear-region"){fn="",on();return}if(t==="explore-region")return Nv();if(t==="march-region")return Tc();if(t==="march-region-dialog")return An(),Tc();if(t==="deploy")return Tc();if(t==="resume")return Cc();if(t==="resume-dialog")return An(),Cc();if(t==="journal-dialog"){An(),an("journal");return}if(t==="select-station"){Vt=e.dataset.station,on();return}if(t==="clear-station"){Vt="",on();return}if(t==="explore-station")return Fv(e.dataset.station);if(t==="march-station")return ih(e.dataset.station);if(t==="march-dialog"){let n=e.dataset.station;return An(),ih(n)}if(t==="hint"){await Gi({type:"hint",stationId:mn});return}if(t==="finish"){await Gi({type:"finish"})&&($a=we.history.at(-1),an("results"),xs(!0));return}if(t==="review"){an("review",{reviewId:e.dataset.review});return}if(t==="confirm-build")return Xi("Confirm construction",`<p>Build HQ Level ${we.nextUpgrade.level} using ${we.nextUpgrade.cost.parts} building parts and ${we.nextUpgrade.cost.cores} research cores?</p><div class="dialog-actions">${Je("build-now","Construct HQ","hard-hat","primary")}${Je("close-dialog","Cancel","x")}</div>`);if(t==="build-now"){An(),await Gi({type:"upgrade"})&&(an("hq"),tn(`HQ Level ${we.hqLevel} constructed and saved.`),xs(!0));return}if(t==="end-expedition")return Xi("End this expedition?",`<p>Earned resources and answer records stay saved. Unresolved stations will be closed.</p><div class="dialog-actions">${Je("end-now","End expedition","flag")}${Je("close-dialog","Keep exploring","arrow-left","primary")}</div>`);t==="end-now"&&(An(),await Gi({type:"end"}),an("journal"))}});qi.addEventListener("cancel",i=>{i.preventDefault(),An()});document.addEventListener("visibilitychange",()=>{document.hidden&&ys()});window.addEventListener("online",()=>{ln&&oh()});window.addEventListener("popstate",i=>{ys(),qi.open&&An(),Ce?.travel&&(Ce.travel=null,Ce.onTravelEnd=null),pn=!1,it=i.state?.view||"hq",vt=i.state?.regionId||vt,fn=i.state?.selectedRegionId||"",mn=i.state?.stationId||"",Vt=i.state?.targetStationId||"",Br=i.state?.reviewId||"",Ot="",it==="travel"&&(it="hq"),on()});async function Bv(){try{if($i)Wi={id:"local-preview",name:"Preview commander"},Fr=Jt.get(rh)||wc({profileId:Wi.id}),we=Ec(Fr);else{let e=await vs();we=e.state,Wi=e.profile,ln=Jt.get(Or())}Ce=new Wa(ht("scene")),Ce.createBase(we.hqLevel),Ce.reduced=On.reduced,Ce.onFrame=e=>{let t=document.querySelector("#topbar")?.getBoundingClientRect().bottom||0,n=document.querySelector(".field-command")?.getBoundingClientRect(),r=document.querySelector("#navigation")?.getBoundingClientRect().top||innerHeight,s=innerWidth<=650&&n?.top||r;for(let o of e){let l=document.querySelector(`[data-pin="${o.id}"]`);if(l){let c=Math.max(l.offsetWidth,l.offsetHeight)/2+4,u=t+c,d=s-c,h=innerWidth>650&&n?n.left-12:innerWidth;l.style.left=`${o.x}px`,l.style.top=`${o.y}px`,l.hidden=!o.visible||o.x<c||o.x>h-c||o.y<u||o.y>d||d<=u}}let a=document.querySelector(".travel-progress span");a&&Ce.travel&&(a.style.width=`${Math.min(100,Ce.travel.elapsed/Ce.travel.duration*100)}%`)},ht("scene").addEventListener("world-error",e=>tn(e.detail)),ht("boot").remove();let i=history.state;i?.view&&!["travel","results"].includes(i.view)&&(it=i.view,vt=i.regionId||vt,fn=i.selectedRegionId||"",mn=i.stationId||"",Vt=i.targetStationId||"",Br=i.reviewId||""),an(it,{},!0),await Ce.ready,Ce.textureErrors.length&&tn("Some terrain textures did not load. Refresh when your connection is ready."),ln&&tn("A pending save is ready to reconnect."),["localhost","127.0.0.1","[::1]"].includes(location.hostname)&&(window.__BEACON_QA__={get view(){return it},get frame(){return Ce.frame},get state(){return we},get world(){return Ce},get preview(){return $i}})}catch(i){let e=[401,403,409].includes(i.status);ht("boot").innerHTML=`<span class="boot-mark">B</span><h1>Beacon Brigade</h1><p>${e?"Open Bright Quest and select your child profile to begin.":Ue(i.message||"The expedition could not load. Your saved progress has not changed.")}</p><a class="button primary" href="/">${e?"Open Bright Quest":"Return to Bright Quest"}</a><button class="button" id="reload">Try again</button>`,ht("reload").addEventListener("click",()=>location.reload())}}Bv();
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
lucide/dist/esm/icons/book-open.js:
lucide/dist/esm/icons/calculator.js:
lucide/dist/esm/icons/check.js:
lucide/dist/esm/icons/chevron-right.js:
lucide/dist/esm/icons/circle-question-mark.js:
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
lucide/dist/esm/icons/radio.js:
lucide/dist/esm/icons/refresh-cw.js:
lucide/dist/esm/icons/rotate-ccw.js:
lucide/dist/esm/icons/settings.js:
lucide/dist/esm/icons/shield.js:
lucide/dist/esm/icons/sprout.js:
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
