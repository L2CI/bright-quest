var pa={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var nu=([i,e,t])=>{let n=document.createElementNS("http://www.w3.org/2000/svg",i);return Object.keys(e).forEach(r=>{n.setAttribute(r,String(e[r]))}),t?.length&&t.forEach(r=>{let s=nu(r);n.appendChild(s)}),n},iu=(i,e={})=>{let n={...pa,...e};return nu(["svg",n,i])};var ru=i=>{for(let e in i)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};var su=(...i)=>i.filter((e,t,n)=>!!e&&e.trim()!==""&&n.indexOf(e)===t).join(" ").trim();var au=i=>i.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase());var ou=i=>{let e=au(i);return e.charAt(0).toUpperCase()+e.slice(1)};var np=i=>Array.from(i.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),lu=i=>typeof i=="string"?i:!i||!i.class?"":i.class&&typeof i.class=="string"?i.class.split(" "):i.class&&Array.isArray(i.class)?i.class:"",al=(i,{nameAttr:e,icons:t,attrs:n})=>{let r=i.getAttribute(e);if(r==null)return;let s=ou(r),a=t[s];if(!a)return console.warn(`${i.outerHTML} icon name was not found in the provided icons object.`);let o=np(i),l=ru(o)?{}:{"aria-hidden":"true"},c={...pa,"data-lucide":r,...l,...n,...o},d=lu(o),u=lu(n),h=su("lucide",`lucide-${r}`,...d,...u);h&&Object.assign(c,{class:h});let f=iu(a,c);return i.parentNode?.replaceChild(f,i)};var ol=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var ll=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var cl=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]];var dl=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];var ul=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18"}],["path",{d:"M16 10h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M8 10h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M8 18h.01"}]];var hl=[["path",{d:"M20 6 9 17l-5-5"}]];var fl=[["path",{d:"m9 18 6-6-6-6"}]];var _s=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];var pl=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"}]];var ml=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];var gl=[["path",{d:"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"}]];var xl=[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"}],["path",{d:"M6.453 15h11.094"}],["path",{d:"M8.5 2h7"}]];var yl=[["path",{d:"M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"}],["path",{d:"M14 6a6 6 0 0 1 6 6v3"}],["path",{d:"M4 15v-3a6 6 0 0 1 6-6"}],["rect",{x:"2",y:"15",width:"20",height:"4",rx:"1"}]];var ma=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];var vl=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{cx:"12",cy:"10",r:"3"}]];var bl=[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"}],["path",{d:"M15 5.764v15"}],["path",{d:"M9 3.236v15"}]];var ws=[["path",{d:"M5 12h14"}]];var _l=[["polygon",{points:"3 11 22 2 13 21 11 13 3 11"}]];var wl=[["path",{d:"M20.341 6.484A10 10 0 0 1 10.266 21.85"}],["path",{d:"M3.659 17.516A10 10 0 0 1 13.74 2.152"}],["circle",{cx:"12",cy:"12",r:"3"}],["circle",{cx:"19",cy:"5",r:"2"}],["circle",{cx:"5",cy:"19",r:"2"}]];var Sl=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{d:"M12 22V12"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["path",{d:"m7.5 4.27 9 5.15"}]];var Ml=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];var El=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];var Sr=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];var Tl=[["path",{d:"M19.07 4.93A10 10 0 0 0 6.99 3.34"}],["path",{d:"M4 6h.01"}],["path",{d:"M2.29 9.62A10 10 0 1 0 21.31 8.35"}],["path",{d:"M16.24 7.76A6 6 0 1 0 8.23 16.67"}],["path",{d:"M12 18h.01"}],["path",{d:"M17.99 11.66A6 6 0 0 1 15.77 16.67"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"m13.41 10.59 5.66-5.66"}]];var Al=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478"}],["circle",{cx:"12",cy:"12",r:"2"}]];var Cl=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var Mr=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];var Rl=[["circle",{cx:"6",cy:"19",r:"3"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"}],["circle",{cx:"18",cy:"5",r:"3"}]];var Pl=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var Il=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];var Ll=[["path",{d:"M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"}],["path",{d:"M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"}],["path",{d:"M5 21h14"}]];var Dl=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];var Ul=[["path",{d:"m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"}],["path",{d:"m13.56 11.747 4.332-.924"}],["path",{d:"m16 21-3.105-6.21"}],["path",{d:"M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"}],["path",{d:"m6.158 8.633 1.114 4.456"}],["path",{d:"m8 21 3.105-6.21"}],["circle",{cx:"12",cy:"13",r:"2"}]];var kl=[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],["path",{d:"M15 18H9"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"}],["circle",{cx:"17",cy:"18",r:"2"}],["circle",{cx:"7",cy:"18",r:"2"}]];var Nl=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];var Fl=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15"}]];var Ol=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]];var Bl=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var zl=({icons:i={},nameAttr:e="data-lucide",attrs:t={},root:n=document,inTemplates:r}={})=>{if(!Object.values(i).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof n>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(n.querySelectorAll(`[${e}]`)).forEach(a=>al(a,{nameAttr:e,icons:i,attrs:t})),r&&Array.from(n.querySelectorAll("template")).forEach(o=>zl({icons:i,nameAttr:e,attrs:t,root:o.content,inTemplates:r})),e==="data-lucide"){let a=n.querySelectorAll("[icon-name]");a.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(a).forEach(o=>al(o,{nameAttr:"icon-name",icons:i,attrs:t})))}};var ip=0,cu=1,rp=2;var Gh=1,hd=2,mi=3,Bi=0,xn=1,Bn=2,Ni=0,jr=1,Os=2,du=3,uu=4,sp=5,or=100,ap=101,op=102,lp=103,cp=104,dp=200,up=201,hp=202,fp=203,Sc=204,Mc=205,pp=206,mp=207,gp=208,xp=209,yp=210,vp=211,bp=212,_p=213,wp=214,Sp=0,Mp=1,Ep=2,qa=3,Tp=4,Ap=5,Cp=6,Rp=7,Wh=0,Pp=1,Ip=2,Fi=0,Lp=1,Dp=2,Up=3,fd=4,kp=5,Np=6,Fp=7;var $h=300,Qr=301,es=302,Bs=303,Ec=304,Lo=306,Vn=1e3,cr=1001,Tc=1002,gn=1003,Op=1004;var ga=1005;var zn=1006,Hl=1007;var dr=1008;var zi=1009,Bp=1010,zp=1011,Xa=1012,qh=1013,ts=1014,xi=1015,Do=1016,Xh=1017,Yh=1018,ns=1020,Hp=35902,Vp=1021,Gp=1022,Zn=1023,Wp=1024,$p=1025,Zr=1026,is=1027,jh=1028,Zh=1029,qp=1030,Jh=1031,Kh=1033,Vl=33776,Gl=33777,Wl=33778,$l=33779,hu=35840,fu=35841,pu=35842,mu=35843,gu=36196,xu=37492,yu=37496,vu=37808,bu=37809,_u=37810,wu=37811,Su=37812,Mu=37813,Eu=37814,Tu=37815,Au=37816,Cu=37817,Ru=37818,Pu=37819,Iu=37820,Lu=37821,ql=36492,Du=36494,Uu=36495,Xp=36283,ku=36284,Nu=36285,Fu=36286;var Ya=2300,Ac=2301,Xl=2302,Ou=2400,Bu=2401,zu=2402;var Yp=3200,jp=3201,Qh=0,Zp=1,ki="",Lt="srgb",Wi="srgb-linear",pd="display-p3",Uo="display-p3-linear",ja="linear",gt="srgb",Za="rec709",Ja="p3";var Er=7680;var Hu=519,Jp=512,Kp=513,Qp=514,ef=515,em=516,tm=517,nm=518,im=519,Cc=35044,md=35048;var Vu="300 es",yi=2e3,Ka=2001,Hi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gu=1234567,Ds=Math.PI/180,zs=180/Math.PI;function Jn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]).toLowerCase()}function Yt(i,e,t){return Math.max(e,Math.min(t,i))}function gd(i,e){return(i%e+e)%e}function rm(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function sm(i,e,t){return i!==e?(t-i)/(e-i):0}function Us(i,e,t){return(1-t)*i+t*e}function am(i,e,t,n){return Us(i,e,1-Math.exp(-t*n))}function om(i,e=1){return e-Math.abs(gd(i,e*2)-e)}function lm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function cm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function dm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function um(i,e){return i+Math.random()*(e-i)}function hm(i){return i*(.5-Math.random())}function fm(i){i!==void 0&&(Gu=i);let e=Gu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function pm(i){return i*Ds}function mm(i){return i*zs}function gm(i){return(i&i-1)===0&&i!==0}function xm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ym(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function vm(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),d=a((e+n)/2),u=s((e-n)/2),h=a((e-n)/2),f=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*d,l*u,l*h,o*c);break;case"YZY":i.set(l*h,o*d,l*u,o*c);break;case"ZXZ":i.set(l*u,l*h,o*d,o*c);break;case"XZX":i.set(o*d,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*d,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Hn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var gr={DEG2RAD:Ds,RAD2DEG:zs,generateUUID:Jn,clamp:Yt,euclideanModulo:gd,mapLinear:rm,inverseLerp:sm,lerp:Us,damp:am,pingpong:om,smoothstep:lm,smootherstep:cm,randInt:dm,randFloat:um,randFloatSpread:hm,seededRandom:fm,degToRad:pm,radToDeg:mm,isPowerOfTwo:gm,ceilPowerOfTwo:xm,floorPowerOfTwo:ym,setQuaternionFromProperEuler:vm,normalize:ct,denormalize:Hn},K=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ye=class i{constructor(e,t,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],f=n[5],g=n[8],y=r[0],p=r[3],m=r[6],_=r[1],x=r[4],b=r[7],P=r[2],E=r[5],A=r[8];return s[0]=a*y+o*_+l*P,s[3]=a*p+o*x+l*E,s[6]=a*m+o*b+l*A,s[1]=c*y+d*_+u*P,s[4]=c*p+d*x+u*E,s[7]=c*m+d*b+u*A,s[2]=h*y+f*_+g*P,s[5]=h*p+f*x+g*E,s[8]=h*m+f*b+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*s*d+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*s,f=c*s-a*l,g=t*u+n*h+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=u*y,e[1]=(r*c-d*n)*y,e[2]=(o*n-r*a)*y,e[3]=h*y,e[4]=(d*t-r*l)*y,e[5]=(r*s-o*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Yl.makeScale(e,t)),this}rotate(e){return this.premultiply(Yl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Yl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Yl=new Ye;function tf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Hs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function bm(){let i=Hs("canvas");return i.style.display="block",i}var Wu={};function xd(i){i in Wu||(Wu[i]=!0,console.warn(i))}function _m(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var $u=new Ye().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),qu=new Ye().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),xa={[Wi]:{transfer:ja,primaries:Za,toReference:i=>i,fromReference:i=>i},[Lt]:{transfer:gt,primaries:Za,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Uo]:{transfer:ja,primaries:Ja,toReference:i=>i.applyMatrix3(qu),fromReference:i=>i.applyMatrix3($u)},[pd]:{transfer:gt,primaries:Ja,toReference:i=>i.convertSRGBToLinear().applyMatrix3(qu),fromReference:i=>i.applyMatrix3($u).convertLinearToSRGB()}},wm=new Set([Wi,Uo]),dt={enabled:!0,_workingColorSpace:Wi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!wm.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=xa[e].toReference,r=xa[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return xa[i].primaries},getTransfer:function(i){return i===ki?ja:xa[i].transfer}};function Jr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function jl(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Tr,Rc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Tr===void 0&&(Tr=Hs("canvas")),Tr.width=e.width,Tr.height=e.height;let n=Tr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Tr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Hs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Jr(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Jr(t[n]/255)*255):t[n]=Jr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Sm=0,Qa=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=Jn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Zl(r[a].image)):s.push(Zl(r[a]))}else s=Zl(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Zl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Rc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Mm=0,fn=class i extends Hi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=cr,r=cr,s=zn,a=dr,o=Zn,l=zi,c=i.DEFAULT_ANISOTROPY,d=ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=Jn(),this.name="",this.source=new Qa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$h)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vn:e.x=e.x-Math.floor(e.x);break;case cr:e.x=e.x<0?0:1;break;case Tc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vn:e.y=e.y-Math.floor(e.y);break;case cr:e.y=e.y<0?0:1;break;case Tc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=$h;fn.DEFAULT_ANISOTROPY=1;var jt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],g=l[9],y=l[2],p=l[6],m=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-y)<.01&&Math.abs(g-p)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+y)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(c+1)/2,b=(f+1)/2,P=(m+1)/2,E=(d+h)/4,A=(u+y)/4,I=(g+p)/4;return x>b&&x>P?x<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(x),r=E/n,s=A/n):b>P?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=E/r,s=I/r):P<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),n=A/s,r=I/s),this.set(n,r,s,t),this}let _=Math.sqrt((p-g)*(p-g)+(u-y)*(u-y)+(h-d)*(h-d));return Math.abs(_)<.001&&(_=1),this.x=(p-g)/_,this.y=(u-y)/_,this.z=(h-d)/_,this.w=Math.acos((c+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Pc=class extends Hi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new jt(0,0,e,t),this.scissorTest=!1,this.viewport=new jt(0,0,e,t);let r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new fn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Qa(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},vi=class extends Pc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},eo=class extends fn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=gn,this.minFilter=gn,this.wrapR=cr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ic=class extends fn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=gn,this.minFilter=gn,this.wrapR=cr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Kn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],d=n[r+2],u=n[r+3],h=s[a+0],f=s[a+1],g=s[a+2],y=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=y;return}if(u!==y||l!==h||c!==f||d!==g){let p=1-o,m=l*h+c*f+d*g+u*y,_=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){let P=Math.sqrt(x),E=Math.atan2(P,m*_);p=Math.sin(p*E)/P,o=Math.sin(o*E)/P}let b=o*_;if(l=l*p+h*b,c=c*p+f*b,d=d*p+g*b,u=u*p+y*b,p===1-o){let P=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=P,c*=P,d*=P,u*=P}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],d=n[r+3],u=s[a],h=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+d*u+l*f-c*h,e[t+1]=l*g+d*h+c*u-o*f,e[t+2]=c*g+d*f+o*h-l*u,e[t+3]=d*g-o*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(r/2),u=o(s/2),h=l(n/2),f=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"YZX":this._x=h*d*u+c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u-h*f*g;break;case"XZY":this._x=h*d*u-c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=n+o+u;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(d-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+d)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Yt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-n*c,this._z=s*d+a*c+n*l-r*o,this._w=a*d-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,h=Math.sin(t*d)/c;return this._w=a*u+this._w*h,this._x=n*u+this._x*h,this._y=r*u+this._y*h,this._z=s*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),d=2*(o*t-s*r),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*d,this.y=n+l*d+o*c-s*u,this.z=r+l*u+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Jl.copy(this).projectOnVector(e),this.sub(Jl)}reflect(e){return this.sub(Jl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jl=new C,Xu=new Kn,Cn=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Nn):Nn.fromBufferAttribute(s,a),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ya.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ya.copy(n.boundingBox)),ya.applyMatrix4(e.matrixWorld),this.union(ya)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ss),va.subVectors(this.max,Ss),Ar.subVectors(e.a,Ss),Cr.subVectors(e.b,Ss),Rr.subVectors(e.c,Ss),Ri.subVectors(Cr,Ar),Pi.subVectors(Rr,Cr),er.subVectors(Ar,Rr);let t=[0,-Ri.z,Ri.y,0,-Pi.z,Pi.y,0,-er.z,er.y,Ri.z,0,-Ri.x,Pi.z,0,-Pi.x,er.z,0,-er.x,-Ri.y,Ri.x,0,-Pi.y,Pi.x,0,-er.y,er.x,0];return!Kl(t,Ar,Cr,Rr,va)||(t=[1,0,0,0,1,0,0,0,1],!Kl(t,Ar,Cr,Rr,va))?!1:(ba.crossVectors(Ri,Pi),t=[ba.x,ba.y,ba.z],Kl(t,Ar,Cr,Rr,va))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},di=[new C,new C,new C,new C,new C,new C,new C,new C],Nn=new C,ya=new Cn,Ar=new C,Cr=new C,Rr=new C,Ri=new C,Pi=new C,er=new C,Ss=new C,va=new C,ba=new C,tr=new C;function Kl(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){tr.fromArray(i,s);let o=r.x*Math.abs(tr.x)+r.y*Math.abs(tr.y)+r.z*Math.abs(tr.z),l=e.dot(tr),c=t.dot(tr),d=n.dot(tr);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var Em=new Cn,Ms=new C,Ql=new C,Qn=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Em.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ms.subVectors(e,this.center);let t=Ms.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ms,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ql.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ms.copy(e.center).add(Ql)),this.expandByPoint(Ms.copy(e.center).sub(Ql))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},ui=new C,ec=new C,_a=new C,Ii=new C,tc=new C,wa=new C,nc=new C,to=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ui)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ui.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ui.copy(this.origin).addScaledVector(this.direction,t),ui.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ec.copy(e).add(t).multiplyScalar(.5),_a.copy(t).sub(e).normalize(),Ii.copy(this.origin).sub(ec);let s=e.distanceTo(t)*.5,a=-this.direction.dot(_a),o=Ii.dot(this.direction),l=-Ii.dot(_a),c=Ii.lengthSq(),d=Math.abs(1-a*a),u,h,f,g;if(d>0)if(u=a*l-o,h=a*o-l,g=s*d,u>=0)if(h>=-g)if(h<=g){let y=1/d;u*=y,h*=y,f=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=s,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h=-s,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-a*s+o)),h=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(u=Math.max(0,-(a*s+o)),h=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+h*(h+2*l)+c);else h=a>0?-s:s,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ec).addScaledVector(_a,h),f}intersectSphere(e,t){ui.subVectors(e.center,this.origin);let n=ui.dot(this.direction),r=ui.dot(ui)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),d>=0?(s=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(s=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ui)!==null}intersectTriangle(e,t,n,r,s){tc.subVectors(t,e),wa.subVectors(n,e),nc.crossVectors(tc,wa);let a=this.direction.dot(nc),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ii.subVectors(this.origin,e);let l=o*this.direction.dot(wa.crossVectors(Ii,wa));if(l<0)return null;let c=o*this.direction.dot(tc.cross(Ii));if(c<0||l+c>a)return null;let d=-o*Ii.dot(nc);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},pt=class i{constructor(e,t,n,r,s,a,o,l,c,d,u,h,f,g,y,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,d,u,h,f,g,y,p)}set(e,t,n,r,s,a,o,l,c,d,u,h,f,g,y,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=d,m[10]=u,m[14]=h,m[3]=f,m[7]=g,m[11]=y,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/Pr.setFromMatrixColumn(e,0).length(),s=1/Pr.setFromMatrixColumn(e,1).length(),a=1/Pr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let h=a*d,f=a*u,g=o*d,y=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=h-y*c,t[9]=-o*l,t[2]=y-h*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*d,f=l*u,g=c*d,y=c*u;t[0]=h+y*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=f*o-g,t[6]=y+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*d,f=l*u,g=c*d,y=c*u;t[0]=h-y*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*d,t[9]=y-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*d,f=a*u,g=o*d,y=o*u;t[0]=l*d,t[4]=g*c-f,t[8]=h*c+y,t[1]=l*u,t[5]=y*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,f=a*c,g=o*l,y=o*c;t[0]=l*d,t[4]=y-h*u,t[8]=g*u+f,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*u+g,t[10]=h-y*u}else if(e.order==="XZY"){let h=a*l,f=a*c,g=o*l,y=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+y,t[5]=a*d,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*d,t[10]=y*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tm,e,Am)}lookAt(e,t,n){let r=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Li.crossVectors(n,bn),Li.lengthSq()===0&&(Math.abs(n.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Li.crossVectors(n,bn)),Li.normalize(),Sa.crossVectors(bn,Li),r[0]=Li.x,r[4]=Sa.x,r[8]=bn.x,r[1]=Li.y,r[5]=Sa.y,r[9]=bn.y,r[2]=Li.z,r[6]=Sa.z,r[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],f=n[13],g=n[2],y=n[6],p=n[10],m=n[14],_=n[3],x=n[7],b=n[11],P=n[15],E=r[0],A=r[4],I=r[8],M=r[12],v=r[1],R=r[5],z=r[9],F=r[13],H=r[2],q=r[6],V=r[10],ne=r[14],G=r[3],ve=r[7],Ee=r[11],Se=r[15];return s[0]=a*E+o*v+l*H+c*G,s[4]=a*A+o*R+l*q+c*ve,s[8]=a*I+o*z+l*V+c*Ee,s[12]=a*M+o*F+l*ne+c*Se,s[1]=d*E+u*v+h*H+f*G,s[5]=d*A+u*R+h*q+f*ve,s[9]=d*I+u*z+h*V+f*Ee,s[13]=d*M+u*F+h*ne+f*Se,s[2]=g*E+y*v+p*H+m*G,s[6]=g*A+y*R+p*q+m*ve,s[10]=g*I+y*z+p*V+m*Ee,s[14]=g*M+y*F+p*ne+m*Se,s[3]=_*E+x*v+b*H+P*G,s[7]=_*A+x*R+b*q+P*ve,s[11]=_*I+x*z+b*V+P*Ee,s[15]=_*M+x*F+b*ne+P*Se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],g=e[3],y=e[7],p=e[11],m=e[15];return g*(+s*l*u-r*c*u-s*o*h+n*c*h+r*o*f-n*l*f)+y*(+t*l*f-t*c*h+s*a*h-r*a*f+r*c*d-s*l*d)+p*(+t*c*u-t*o*f-s*a*u+n*a*f+s*o*d-n*c*d)+m*(-r*o*d-t*l*u+t*o*h+r*a*u-n*a*h+n*l*d)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],g=e[12],y=e[13],p=e[14],m=e[15],_=u*p*c-y*h*c+y*l*f-o*p*f-u*l*m+o*h*m,x=g*h*c-d*p*c-g*l*f+a*p*f+d*l*m-a*h*m,b=d*y*c-g*u*c+g*o*f-a*y*f-d*o*m+a*u*m,P=g*u*l-d*y*l-g*o*h+a*y*h+d*o*p-a*u*p,E=t*_+n*x+r*b+s*P;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/E;return e[0]=_*A,e[1]=(y*h*s-u*p*s-y*r*f+n*p*f+u*r*m-n*h*m)*A,e[2]=(o*p*s-y*l*s+y*r*c-n*p*c-o*r*m+n*l*m)*A,e[3]=(u*l*s-o*h*s-u*r*c+n*h*c+o*r*f-n*l*f)*A,e[4]=x*A,e[5]=(d*p*s-g*h*s+g*r*f-t*p*f-d*r*m+t*h*m)*A,e[6]=(g*l*s-a*p*s-g*r*c+t*p*c+a*r*m-t*l*m)*A,e[7]=(a*h*s-d*l*s+d*r*c-t*h*c-a*r*f+t*l*f)*A,e[8]=b*A,e[9]=(g*u*s-d*y*s-g*n*f+t*y*f+d*n*m-t*u*m)*A,e[10]=(a*y*s-g*o*s+g*n*c-t*y*c-a*n*m+t*o*m)*A,e[11]=(d*o*s-a*u*s-d*n*c+t*u*c+a*n*f-t*o*f)*A,e[12]=P*A,e[13]=(d*y*r-g*u*r+g*n*h-t*y*h-d*n*p+t*u*p)*A,e[14]=(g*o*r-a*y*r-g*n*l+t*y*l+a*n*p-t*o*p)*A,e[15]=(a*u*r-d*o*r+d*n*l-t*u*l-a*n*h+t*o*h)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,d=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+n,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,d=a+a,u=o+o,h=s*c,f=s*d,g=s*u,y=a*d,p=a*u,m=o*u,_=l*c,x=l*d,b=l*u,P=n.x,E=n.y,A=n.z;return r[0]=(1-(y+m))*P,r[1]=(f+b)*P,r[2]=(g-x)*P,r[3]=0,r[4]=(f-b)*E,r[5]=(1-(h+m))*E,r[6]=(p+_)*E,r[7]=0,r[8]=(g+x)*A,r[9]=(p-_)*A,r[10]=(1-(h+y))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=Pr.set(r[0],r[1],r[2]).length(),a=Pr.set(r[4],r[5],r[6]).length(),o=Pr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Fn.copy(this);let c=1/s,d=1/a,u=1/o;return Fn.elements[0]*=c,Fn.elements[1]*=c,Fn.elements[2]*=c,Fn.elements[4]*=d,Fn.elements[5]*=d,Fn.elements[6]*=d,Fn.elements[8]*=u,Fn.elements[9]*=u,Fn.elements[10]*=u,t.setFromRotationMatrix(Fn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=yi){let l=this.elements,c=2*s/(t-e),d=2*s/(n-r),u=(t+e)/(t-e),h=(n+r)/(n-r),f,g;if(o===yi)f=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===Ka)f=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=yi){let l=this.elements,c=1/(t-e),d=1/(n-r),u=1/(a-s),h=(t+e)*c,f=(n+r)*d,g,y;if(o===yi)g=(a+s)*u,y=-2*u;else if(o===Ka)g=s*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Pr=new C,Fn=new pt,Tm=new C(0,0,0),Am=new C(1,1,1),Li=new C,Sa=new C,bn=new C,Yu=new pt,ju=new Kn,Rn=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],u=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ju.setFromEuler(this),this.setFromQuaternion(ju,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Rn.DEFAULT_ORDER="XYZ";var Vs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Cm=0,Zu=new C,Ir=new Kn,hi=new pt,Ma=new C,Es=new C,Rm=new C,Pm=new Kn,Ju=new C(1,0,0),Ku=new C(0,1,0),Qu=new C(0,0,1),eh={type:"added"},Im={type:"removed"},Lr={type:"childadded",child:null},ic={type:"childremoved",child:null},Ct=class i extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=Jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new C,t=new Rn,n=new Kn,r=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pt},normalMatrix:{value:new Ye}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ir.setFromAxisAngle(e,t),this.quaternion.multiply(Ir),this}rotateOnWorldAxis(e,t){return Ir.setFromAxisAngle(e,t),this.quaternion.premultiply(Ir),this}rotateX(e){return this.rotateOnAxis(Ju,e)}rotateY(e){return this.rotateOnAxis(Ku,e)}rotateZ(e){return this.rotateOnAxis(Qu,e)}translateOnAxis(e,t){return Zu.copy(e).applyQuaternion(this.quaternion),this.position.add(Zu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ju,e)}translateY(e){return this.translateOnAxis(Ku,e)}translateZ(e){return this.translateOnAxis(Qu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ma.copy(e):Ma.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(Es,Ma,this.up):hi.lookAt(Ma,Es,this.up),this.quaternion.setFromRotationMatrix(hi),r&&(hi.extractRotation(r.matrixWorld),Ir.setFromRotationMatrix(hi),this.quaternion.premultiply(Ir.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(eh),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Im),ic.child=e,this.dispatchEvent(ic),ic.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(eh),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Es,e,Rm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Es,Pm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++){let o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){let l=[];for(let c in o){let d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};Ct.DEFAULT_UP=new C(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var On=new C,fi=new C,rc=new C,pi=new C,Dr=new C,Ur=new C,th=new C,sc=new C,ac=new C,oc=new C,ur=class i{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),On.subVectors(e,t),r.cross(On);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){On.subVectors(r,t),fi.subVectors(n,t),rc.subVectors(e,t);let a=On.dot(On),o=On.dot(fi),l=On.dot(rc),c=fi.dot(fi),d=fi.dot(rc),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;let h=1/u,f=(c*l-o*d)*h,g=(a*d-o*l)*h;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,pi.x),l.addScaledVector(a,pi.y),l.addScaledVector(o,pi.z),l)}static isFrontFacing(e,t,n,r){return On.subVectors(n,t),fi.subVectors(e,t),On.cross(fi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return On.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),On.cross(fi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;Dr.subVectors(r,n),Ur.subVectors(s,n),sc.subVectors(e,n);let l=Dr.dot(sc),c=Ur.dot(sc);if(l<=0&&c<=0)return t.copy(n);ac.subVectors(e,r);let d=Dr.dot(ac),u=Ur.dot(ac);if(d>=0&&u<=d)return t.copy(r);let h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(Dr,a);oc.subVectors(e,s);let f=Dr.dot(oc),g=Ur.dot(oc);if(g>=0&&f<=g)return t.copy(s);let y=f*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Ur,o);let p=d*g-f*u;if(p<=0&&u-d>=0&&f-g>=0)return th.subVectors(s,r),o=(u-d)/(u-d+(f-g)),t.copy(r).addScaledVector(th,o);let m=1/(p+y+h);return a=y*m,o=h*m,t.copy(n).addScaledVector(Dr,a).addScaledVector(Ur,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},nf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},Ea={h:0,s:0,l:0};function lc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Fe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=dt.workingColorSpace){if(e=gd(e,1),t=Yt(t,0,1),n=Yt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=lc(a,s,e+1/3),this.g=lc(a,s,e),this.b=lc(a,s,e-1/3)}return dt.toWorkingColorSpace(this,r),this}setStyle(e,t=Lt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Lt){let n=nf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Jr(e.r),this.g=Jr(e.g),this.b=Jr(e.b),this}copyLinearToSRGB(e){return this.r=jl(e.r),this.g=jl(e.g),this.b=jl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Lt){return dt.fromWorkingColorSpace(an.copy(this),e),Math.round(Yt(an.r*255,0,255))*65536+Math.round(Yt(an.g*255,0,255))*256+Math.round(Yt(an.b*255,0,255))}getHexString(e=Lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(an.copy(this),t);let n=an.r,r=an.g,s=an.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,d=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=Lt){dt.fromWorkingColorSpace(an.copy(this),e);let t=an.r,n=an.g,r=an.b;return e!==Lt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Di),this.setHSL(Di.h+e,Di.s+t,Di.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Di),e.getHSL(Ea);let n=Us(Di.h,Ea.h,t),r=Us(Di.s,Ea.s,t),s=Us(Di.l,Ea.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},an=new Fe;Fe.NAMES=nf;var Lm=0,Vi=class extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lm++}),this.uuid=Jn(),this.name="",this.type="Material",this.blending=jr,this.side=Bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sc,this.blendDst=Mc,this.blendEquation=or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=qa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Er,this.stencilZFail=Er,this.stencilZPass=Er,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==jr&&(n.blending=this.blending),this.side!==Bi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Sc&&(n.blendSrc=this.blendSrc),this.blendDst!==Mc&&(n.blendDst=this.blendDst),this.blendEquation!==or&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==qa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Er&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Er&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Er&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ei=class extends Vi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Wh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Nt=new C,Ta=new K,Ht=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Cc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=xi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return xd("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ta.fromBufferAttribute(this,t),Ta.applyMatrix3(e),this.setXY(t,Ta.x,Ta.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Hn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Hn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Hn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Hn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Hn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array),s=ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Cc&&(e.usage=this.usage),e}};var no=class extends Ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var io=class extends Ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var We=class extends Ht{constructor(e,t,n){super(new Float32Array(e),t,n)}},Dm=0,An=new pt,cc=new Ct,kr=new C,_n=new Cn,Ts=new Cn,Xt=new C,Mt=class i extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=Jn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(tf(e)?io:no)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ye().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return An.makeRotationFromQuaternion(e),this.applyMatrix4(An),this}rotateX(e){return An.makeRotationX(e),this.applyMatrix4(An),this}rotateY(e){return An.makeRotationY(e),this.applyMatrix4(An),this}rotateZ(e){return An.makeRotationZ(e),this.applyMatrix4(An),this}translate(e,t,n){return An.makeTranslation(e,t,n),this.applyMatrix4(An),this}scale(e,t,n){return An.makeScale(e,t,n),this.applyMatrix4(An),this}lookAt(e){return cc.lookAt(e),cc.updateMatrix(),this.applyMatrix4(cc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(kr).negate(),this.translate(kr.x,kr.y,kr.z),this}setFromPoints(e){let t=[];for(let n=0,r=e.length;n<r;n++){let s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new We(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];_n.setFromBufferAttribute(s),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Ts.setFromBufferAttribute(o),this.morphTargetsRelative?(Xt.addVectors(_n.min,Ts.min),_n.expandByPoint(Xt),Xt.addVectors(_n.max,Ts.max),_n.expandByPoint(Xt)):(_n.expandByPoint(Ts.min),_n.expandByPoint(Ts.max))}_n.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Xt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Xt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Xt.fromBufferAttribute(o,c),l&&(kr.fromBufferAttribute(e,c),Xt.add(kr)),r=Math.max(r,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ht(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new C,l[I]=new C;let c=new C,d=new C,u=new C,h=new K,f=new K,g=new K,y=new C,p=new C;function m(I,M,v){c.fromBufferAttribute(n,I),d.fromBufferAttribute(n,M),u.fromBufferAttribute(n,v),h.fromBufferAttribute(s,I),f.fromBufferAttribute(s,M),g.fromBufferAttribute(s,v),d.sub(c),u.sub(c),f.sub(h),g.sub(h);let R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(y.copy(d).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(R),p.copy(u).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(R),o[I].add(y),o[M].add(y),o[v].add(y),l[I].add(p),l[M].add(p),l[v].add(p))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let I=0,M=_.length;I<M;++I){let v=_[I],R=v.start,z=v.count;for(let F=R,H=R+z;F<H;F+=3)m(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let x=new C,b=new C,P=new C,E=new C;function A(I){P.fromBufferAttribute(r,I),E.copy(P);let M=o[I];x.copy(M),x.sub(P.multiplyScalar(P.dot(M))).normalize(),b.crossVectors(E,M);let R=b.dot(l[I])<0?-1:1;a.setXYZW(I,x.x,x.y,x.z,R)}for(let I=0,M=_.length;I<M;++I){let v=_[I],R=v.start,z=v.count;for(let F=R,H=R+z;F<H;F+=3)A(e.getX(F+0)),A(e.getX(F+1)),A(e.getX(F+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let r=new C,s=new C,a=new C,o=new C,l=new C,c=new C,d=new C,u=new C;if(e)for(let h=0,f=e.count;h<f;h+=3){let g=e.getX(h+0),y=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,p),d.subVectors(a,s),u.subVectors(r,s),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,p),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,s),u.subVectors(r,s),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(o,l){let c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d),f=0,g=0;for(let y=0,p=l.length;y<p;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*d;for(let m=0;m<d;m++)h[g++]=c[f++]}return new Ht(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let d=0,u=c.length;d<u;d++){let h=c[d],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){let f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let c in r){let d=r[c];this.setAttribute(c,d.clone(t))}let s=e.morphAttributes;for(let c in s){let d=[],u=s[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,d=a.length;c<d;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},nh=new pt,nr=new to,Aa=new Qn,ih=new C,Nr=new C,Fr=new C,Or=new C,dc=new C,Ca=new C,Ra=new K,Pa=new K,Ia=new K,rh=new C,sh=new C,ah=new C,La=new C,Da=new C,vt=class extends Ct{constructor(e=new Mt,t=new ei){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Ca.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let d=o[l],u=s[l];d!==0&&(dc.fromBufferAttribute(u,e),a?Ca.addScaledVector(dc,d):Ca.addScaledVector(dc.sub(t),d))}t.add(Ca)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Aa.copy(n.boundingSphere),Aa.applyMatrix4(s),nr.copy(e.ray).recast(e.near),!(Aa.containsPoint(nr.origin)===!1&&(nr.intersectSphere(Aa,ih)===null||nr.origin.distanceToSquared(ih)>(e.far-e.near)**2))&&(nh.copy(s).invert(),nr.copy(e.ray).applyMatrix4(nh),!(n.boundingBox!==null&&nr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,nr)))}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,u=s.attributes.normal,h=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=h.length;g<y;g++){let p=h[g],m=a[p.materialIndex],_=Math.max(p.start,f.start),x=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let b=_,P=x;b<P;b+=3){let E=o.getX(b),A=o.getX(b+1),I=o.getX(b+2);r=Ua(this,m,e,n,c,d,u,E,A,I),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let p=g,m=y;p<m;p+=3){let _=o.getX(p),x=o.getX(p+1),b=o.getX(p+2);r=Ua(this,a,e,n,c,d,u,_,x,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=h.length;g<y;g++){let p=h[g],m=a[p.materialIndex],_=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let b=_,P=x;b<P;b+=3){let E=b,A=b+1,I=b+2;r=Ua(this,m,e,n,c,d,u,E,A,I),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let p=g,m=y;p<m;p+=3){let _=p,x=p+1,b=p+2;r=Ua(this,a,e,n,c,d,u,_,x,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}};function Um(i,e,t,n,r,s,a,o){let l;if(e.side===xn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Bi,o),l===null)return null;Da.copy(o),Da.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Da);return c<t.near||c>t.far?null:{distance:c,point:Da.clone(),object:i}}function Ua(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Nr),i.getVertexPosition(l,Fr),i.getVertexPosition(c,Or);let d=Um(i,e,t,n,Nr,Fr,Or,La);if(d){r&&(Ra.fromBufferAttribute(r,o),Pa.fromBufferAttribute(r,l),Ia.fromBufferAttribute(r,c),d.uv=ur.getInterpolation(La,Nr,Fr,Or,Ra,Pa,Ia,new K)),s&&(Ra.fromBufferAttribute(s,o),Pa.fromBufferAttribute(s,l),Ia.fromBufferAttribute(s,c),d.uv1=ur.getInterpolation(La,Nr,Fr,Or,Ra,Pa,Ia,new K)),a&&(rh.fromBufferAttribute(a,o),sh.fromBufferAttribute(a,l),ah.fromBufferAttribute(a,c),d.normal=ur.getInterpolation(La,Nr,Fr,Or,rh,sh,ah,new C),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new C,materialIndex:0};ur.getNormal(Nr,Fr,Or,u.normal),d.face=u}return d}var yn=class i extends Mt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],d=[],u=[],h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new We(c,3)),this.setAttribute("normal",new We(d,3)),this.setAttribute("uv",new We(u,2));function g(y,p,m,_,x,b,P,E,A,I,M){let v=b/A,R=P/I,z=b/2,F=P/2,H=E/2,q=A+1,V=I+1,ne=0,G=0,ve=new C;for(let Ee=0;Ee<V;Ee++){let Se=Ee*R-F;for(let Ze=0;Ze<q;Ze++){let it=Ze*v-z;ve[y]=it*_,ve[p]=Se*x,ve[m]=H,c.push(ve.x,ve.y,ve.z),ve[y]=0,ve[p]=0,ve[m]=E>0?1:-1,d.push(ve.x,ve.y,ve.z),u.push(Ze/A),u.push(1-Ee/I),ne+=1}}for(let Ee=0;Ee<I;Ee++)for(let Se=0;Se<A;Se++){let Ze=h+Se+q*Ee,it=h+Se+q*(Ee+1),W=h+(Se+1)+q*(Ee+1),ie=h+(Se+1)+q*Ee;l.push(Ze,it,ie),l.push(it,W,ie),G+=6}o.addGroup(f,G,M),f+=G,h+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function rs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function un(i){let e={};for(let t=0;t<i.length;t++){let n=rs(i[t]);for(let r in n)e[r]=n[r]}return e}function km(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function rf(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}var Nm={clone:rs,merge:un},Fm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Om=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ti=class extends Vi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fm,this.fragmentShader=Om,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rs(e.uniforms),this.uniformsGroups=km(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},ro=class extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=yi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ui=new C,oh=new K,lh=new K,hn=class extends ro{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ds*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zs*2*Math.atan(Math.tan(Ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,t){return this.getViewBounds(e,oh,lh),t.subVectors(lh,oh)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ds*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Br=-90,zr=1,Lc=class extends Ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new hn(Br,zr,e,t);r.layers=this.layers,this.add(r);let s=new hn(Br,zr,e,t);s.layers=this.layers,this.add(s);let a=new hn(Br,zr,e,t);a.layers=this.layers,this.add(a);let o=new hn(Br,zr,e,t);o.layers=this.layers,this.add(o);let l=new hn(Br,zr,e,t);l.layers=this.layers,this.add(l);let c=new hn(Br,zr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===yi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ka)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,r),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},so=class extends fn{constructor(e,t,n,r,s,a,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Qr,super(e,t,n,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Dc=class extends vi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new so(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:zn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new yn(5,5,5),s=new ti({name:"CubemapFromEquirect",uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:xn,blending:Ni});s.uniforms.tEquirect.value=t;let a=new vt(r,s),o=t.minFilter;return t.minFilter===dr&&(t.minFilter=zn),new Lc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}},uc=new C,Bm=new C,zm=new Ye,gi=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=uc.subVectors(n,t).cross(Bm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(uc),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||zm.getNormalMatrix(e),r=this.coplanarPoint(uc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ir=new Qn,ka=new C,Gs=class{constructor(e=new gi,t=new gi,n=new gi,r=new gi,s=new gi,a=new gi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=yi){let n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],d=r[5],u=r[6],h=r[7],f=r[8],g=r[9],y=r[10],p=r[11],m=r[12],_=r[13],x=r[14],b=r[15];if(n[0].setComponents(l-s,h-c,p-f,b-m).normalize(),n[1].setComponents(l+s,h+c,p+f,b+m).normalize(),n[2].setComponents(l+a,h+d,p+g,b+_).normalize(),n[3].setComponents(l-a,h-d,p-g,b-_).normalize(),n[4].setComponents(l-o,h-u,p-y,b-x).normalize(),t===yi)n[5].setComponents(l+o,h+u,p+y,b+x).normalize();else if(t===Ka)n[5].setComponents(o,u,y,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ir.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ir.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ir)}intersectsSprite(e){return ir.center.set(0,0,0),ir.radius=.7071067811865476,ir.applyMatrix4(e.matrixWorld),this.intersectsSphere(ir)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ka.x=r.normal.x>0?e.max.x:e.min.x,ka.y=r.normal.y>0?e.max.y:e.min.y,ka.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ka)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function sf(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Hm(i){let e=new WeakMap;function t(o,l){let c=o.array,d=o.usage,u=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let d=l.array,u=l._updateRange,h=l.updateRanges;if(i.bindBuffer(c,o),u.count===-1&&h.length===0&&i.bufferSubData(c,0,d),h.length!==0){for(let f=0,g=h.length;f<g;f++){let y=h[f];i.bufferSubData(c,y.start*d.BYTES_PER_ELEMENT,d,y.start,y.count)}l.clearUpdateRanges()}u.count!==-1&&(i.bufferSubData(c,u.offset*d.BYTES_PER_ELEMENT,d,u.offset,u.count),u.count=-1),l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var bi=class i extends Mt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,d=l+1,u=e/o,h=t/l,f=[],g=[],y=[],p=[];for(let m=0;m<d;m++){let _=m*h-a;for(let x=0;x<c;x++){let b=x*u-s;g.push(b,-_,0),y.push(0,0,1),p.push(x/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let _=0;_<o;_++){let x=_+c*m,b=_+c*(m+1),P=_+1+c*(m+1),E=_+1+c*m;f.push(x,b,E),f.push(b,P,E)}this.setIndex(f),this.setAttribute("position",new We(g,3)),this.setAttribute("normal",new We(y,3)),this.setAttribute("uv",new We(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Vm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gm=`#ifdef USE_ALPHAHASH
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
#endif`,Wm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$m=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ym=`#ifdef USE_AOMAP
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
#endif`,jm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zm=`#ifdef USE_BATCHING
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
#endif`,Jm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Km=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Qm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,eg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tg=`#ifdef USE_IRIDESCENCE
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
#endif`,ng=`#ifdef USE_BUMPMAP
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
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,rg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ag=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,og=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,lg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,cg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,dg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ug=`#define PI 3.141592653589793
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
} // validated`,hg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,fg=`vec3 transformedNormal = objectNormal;
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
#endif`,pg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yg="gl_FragColor = linearToOutputTexel( gl_FragColor );",vg=`
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
}`,bg=`#ifdef USE_ENVMAP
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
#endif`,_g=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,wg=`#ifdef USE_ENVMAP
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
#endif`,Sg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mg=`#ifdef USE_ENVMAP
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
#endif`,Eg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ag=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rg=`#ifdef USE_GRADIENTMAP
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
}`,Pg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ig=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dg=`uniform bool receiveShadow;
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
#endif`,Ug=`#ifdef USE_ENVMAP
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
#endif`,kg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ng=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Og=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bg=`PhysicalMaterial material;
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
#endif`,zg=`struct PhysicalMaterial {
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
}`,Hg=`
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
#endif`,Vg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Gg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$g=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Jg=`#if defined( USE_POINTS_UV )
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
#endif`,Kg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ex=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ix=`#ifdef USE_MORPHTARGETS
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
#endif`,rx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ax=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ox=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,dx=`#ifdef USE_NORMALMAP
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
#endif`,ux=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,px=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,xx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_x=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ex=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Tx=`float getShadowMask() {
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
}`,Ax=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Cx=`#ifdef USE_SKINNING
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
#endif`,Rx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Px=`#ifdef USE_SKINNING
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
#endif`,Ix=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ux=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,kx=`#ifdef USE_TRANSMISSION
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
#endif`,Nx=`#ifdef USE_TRANSMISSION
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
#endif`,Fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Hx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vx=`uniform sampler2D t2D;
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
}`,Gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,$x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xx=`#include <common>
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
}`,Yx=`#if DEPTH_PACKING == 3200
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
}`,jx=`#define DISTANCE
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
}`,Zx=`#define DISTANCE
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
}`,Jx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qx=`uniform float scale;
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
}`,e0=`uniform vec3 diffuse;
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
}`,t0=`#include <common>
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
}`,n0=`uniform vec3 diffuse;
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
}`,i0=`#define LAMBERT
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
}`,r0=`#define LAMBERT
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
}`,s0=`#define MATCAP
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
}`,a0=`#define MATCAP
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
}`,o0=`#define NORMAL
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
}`,l0=`#define NORMAL
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
}`,c0=`#define PHONG
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
}`,d0=`#define PHONG
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
}`,u0=`#define STANDARD
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
}`,h0=`#define STANDARD
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
}`,f0=`#define TOON
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
}`,p0=`#define TOON
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
}`,m0=`uniform float size;
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
}`,g0=`uniform vec3 diffuse;
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
}`,x0=`#include <common>
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
}`,y0=`uniform vec3 color;
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
}`,v0=`uniform float rotation;
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
}`,b0=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:Vm,alphahash_pars_fragment:Gm,alphamap_fragment:Wm,alphamap_pars_fragment:$m,alphatest_fragment:qm,alphatest_pars_fragment:Xm,aomap_fragment:Ym,aomap_pars_fragment:jm,batching_pars_vertex:Zm,batching_vertex:Jm,begin_vertex:Km,beginnormal_vertex:Qm,bsdfs:eg,iridescence_fragment:tg,bumpmap_pars_fragment:ng,clipping_planes_fragment:ig,clipping_planes_pars_fragment:rg,clipping_planes_pars_vertex:sg,clipping_planes_vertex:ag,color_fragment:og,color_pars_fragment:lg,color_pars_vertex:cg,color_vertex:dg,common:ug,cube_uv_reflection_fragment:hg,defaultnormal_vertex:fg,displacementmap_pars_vertex:pg,displacementmap_vertex:mg,emissivemap_fragment:gg,emissivemap_pars_fragment:xg,colorspace_fragment:yg,colorspace_pars_fragment:vg,envmap_fragment:bg,envmap_common_pars_fragment:_g,envmap_pars_fragment:wg,envmap_pars_vertex:Sg,envmap_physical_pars_fragment:Ug,envmap_vertex:Mg,fog_vertex:Eg,fog_pars_vertex:Tg,fog_fragment:Ag,fog_pars_fragment:Cg,gradientmap_pars_fragment:Rg,lightmap_pars_fragment:Pg,lights_lambert_fragment:Ig,lights_lambert_pars_fragment:Lg,lights_pars_begin:Dg,lights_toon_fragment:kg,lights_toon_pars_fragment:Ng,lights_phong_fragment:Fg,lights_phong_pars_fragment:Og,lights_physical_fragment:Bg,lights_physical_pars_fragment:zg,lights_fragment_begin:Hg,lights_fragment_maps:Vg,lights_fragment_end:Gg,logdepthbuf_fragment:Wg,logdepthbuf_pars_fragment:$g,logdepthbuf_pars_vertex:qg,logdepthbuf_vertex:Xg,map_fragment:Yg,map_pars_fragment:jg,map_particle_fragment:Zg,map_particle_pars_fragment:Jg,metalnessmap_fragment:Kg,metalnessmap_pars_fragment:Qg,morphinstance_vertex:ex,morphcolor_vertex:tx,morphnormal_vertex:nx,morphtarget_pars_vertex:ix,morphtarget_vertex:rx,normal_fragment_begin:sx,normal_fragment_maps:ax,normal_pars_fragment:ox,normal_pars_vertex:lx,normal_vertex:cx,normalmap_pars_fragment:dx,clearcoat_normal_fragment_begin:ux,clearcoat_normal_fragment_maps:hx,clearcoat_pars_fragment:fx,iridescence_pars_fragment:px,opaque_fragment:mx,packing:gx,premultiplied_alpha_fragment:xx,project_vertex:yx,dithering_fragment:vx,dithering_pars_fragment:bx,roughnessmap_fragment:_x,roughnessmap_pars_fragment:wx,shadowmap_pars_fragment:Sx,shadowmap_pars_vertex:Mx,shadowmap_vertex:Ex,shadowmask_pars_fragment:Tx,skinbase_vertex:Ax,skinning_pars_vertex:Cx,skinning_vertex:Rx,skinnormal_vertex:Px,specularmap_fragment:Ix,specularmap_pars_fragment:Lx,tonemapping_fragment:Dx,tonemapping_pars_fragment:Ux,transmission_fragment:kx,transmission_pars_fragment:Nx,uv_pars_fragment:Fx,uv_pars_vertex:Ox,uv_vertex:Bx,worldpos_vertex:zx,background_vert:Hx,background_frag:Vx,backgroundCube_vert:Gx,backgroundCube_frag:Wx,cube_vert:$x,cube_frag:qx,depth_vert:Xx,depth_frag:Yx,distanceRGBA_vert:jx,distanceRGBA_frag:Zx,equirect_vert:Jx,equirect_frag:Kx,linedashed_vert:Qx,linedashed_frag:e0,meshbasic_vert:t0,meshbasic_frag:n0,meshlambert_vert:i0,meshlambert_frag:r0,meshmatcap_vert:s0,meshmatcap_frag:a0,meshnormal_vert:o0,meshnormal_frag:l0,meshphong_vert:c0,meshphong_frag:d0,meshphysical_vert:u0,meshphysical_frag:h0,meshtoon_vert:f0,meshtoon_frag:p0,points_vert:m0,points_frag:g0,shadow_vert:x0,shadow_frag:y0,sprite_vert:v0,sprite_frag:b0},he={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},jn={basic:{uniforms:un([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:un([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:un([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:un([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:un([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:un([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:un([he.points,he.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:un([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:un([he.common,he.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:un([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:un([he.sprite,he.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:un([he.common,he.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:un([he.lights,he.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};jn.physical={uniforms:un([jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var Na={r:0,b:0,g:0},rr=new Rn,_0=new pt;function w0(i,e,t,n,r,s,a){let o=new Fe(0),l=s===!0?0:1,c,d,u=null,h=0,f=null;function g(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?t:e).get(x)),x}function y(_){let x=!1,b=g(_);b===null?m(o,l):b&&b.isColor&&(m(b,1),x=!0);let P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(_,x){let b=g(x);b&&(b.isCubeTexture||b.mapping===Lo)?(d===void 0&&(d=new vt(new yn(1,1,1),new ti({name:"BackgroundCubeMaterial",uniforms:rs(jn.backgroundCube.uniforms),vertexShader:jn.backgroundCube.vertexShader,fragmentShader:jn.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(P,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),rr.copy(x.backgroundRotation),rr.x*=-1,rr.y*=-1,rr.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(rr.y*=-1,rr.z*=-1),d.material.uniforms.envMap.value=b,d.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(_0.makeRotationFromEuler(rr)),d.material.toneMapped=dt.getTransfer(b.colorSpace)!==gt,(u!==b||h!==b.version||f!==i.toneMapping)&&(d.material.needsUpdate=!0,u=b,h=b.version,f=i.toneMapping),d.layers.enableAll(),_.unshift(d,d.geometry,d.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new vt(new bi(2,2),new ti({name:"BackgroundMaterial",uniforms:rs(jn.background.uniforms),vertexShader:jn.background.vertexShader,fragmentShader:jn.background.fragmentShader,side:Bi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=dt.getTransfer(b.colorSpace)!==gt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||h!==b.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=b,h=b.version,f=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function m(_,x){_.getRGB(Na,rf(i)),n.buffers.color.setClear(Na.r,Na.g,Na.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(_,x=1){o.set(_),l=x,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,m(o,l)},render:y,addToRenderList:p}}function S0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null),s=r,a=!1;function o(v,R,z,F,H){let q=!1,V=u(F,z,R);s!==V&&(s=V,c(s.object)),q=f(v,F,z,H),q&&g(v,F,z,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,b(v,R,z,F),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return i.createVertexArray()}function c(v){return i.bindVertexArray(v)}function d(v){return i.deleteVertexArray(v)}function u(v,R,z){let F=z.wireframe===!0,H=n[v.id];H===void 0&&(H={},n[v.id]=H);let q=H[R.id];q===void 0&&(q={},H[R.id]=q);let V=q[F];return V===void 0&&(V=h(l()),q[F]=V),V}function h(v){let R=[],z=[],F=[];for(let H=0;H<t;H++)R[H]=0,z[H]=0,F[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:z,attributeDivisors:F,object:v,attributes:{},index:null}}function f(v,R,z,F){let H=s.attributes,q=R.attributes,V=0,ne=z.getAttributes();for(let G in ne)if(ne[G].location>=0){let Ee=H[G],Se=q[G];if(Se===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(Se=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(Se=v.instanceColor)),Ee===void 0||Ee.attribute!==Se||Se&&Ee.data!==Se.data)return!0;V++}return s.attributesNum!==V||s.index!==F}function g(v,R,z,F){let H={},q=R.attributes,V=0,ne=z.getAttributes();for(let G in ne)if(ne[G].location>=0){let Ee=q[G];Ee===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(Ee=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(Ee=v.instanceColor));let Se={};Se.attribute=Ee,Ee&&Ee.data&&(Se.data=Ee.data),H[G]=Se,V++}s.attributes=H,s.attributesNum=V,s.index=F}function y(){let v=s.newAttributes;for(let R=0,z=v.length;R<z;R++)v[R]=0}function p(v){m(v,0)}function m(v,R){let z=s.newAttributes,F=s.enabledAttributes,H=s.attributeDivisors;z[v]=1,F[v]===0&&(i.enableVertexAttribArray(v),F[v]=1),H[v]!==R&&(i.vertexAttribDivisor(v,R),H[v]=R)}function _(){let v=s.newAttributes,R=s.enabledAttributes;for(let z=0,F=R.length;z<F;z++)R[z]!==v[z]&&(i.disableVertexAttribArray(z),R[z]=0)}function x(v,R,z,F,H,q,V){V===!0?i.vertexAttribIPointer(v,R,z,H,q):i.vertexAttribPointer(v,R,z,F,H,q)}function b(v,R,z,F){y();let H=F.attributes,q=z.getAttributes(),V=R.defaultAttributeValues;for(let ne in q){let G=q[ne];if(G.location>=0){let ve=H[ne];if(ve===void 0&&(ne==="instanceMatrix"&&v.instanceMatrix&&(ve=v.instanceMatrix),ne==="instanceColor"&&v.instanceColor&&(ve=v.instanceColor)),ve!==void 0){let Ee=ve.normalized,Se=ve.itemSize,Ze=e.get(ve);if(Ze===void 0)continue;let it=Ze.buffer,W=Ze.type,ie=Ze.bytesPerElement,Me=W===i.INT||W===i.UNSIGNED_INT||ve.gpuType===qh;if(ve.isInterleavedBufferAttribute){let ce=ve.data,Ge=ce.stride,$e=ve.offset;if(ce.isInstancedInterleavedBuffer){for(let He=0;He<G.locationSize;He++)m(G.location+He,ce.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let He=0;He<G.locationSize;He++)p(G.location+He);i.bindBuffer(i.ARRAY_BUFFER,it);for(let He=0;He<G.locationSize;He++)x(G.location+He,Se/G.locationSize,W,Ee,Ge*ie,($e+Se/G.locationSize*He)*ie,Me)}else{if(ve.isInstancedBufferAttribute){for(let ce=0;ce<G.locationSize;ce++)m(G.location+ce,ve.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let ce=0;ce<G.locationSize;ce++)p(G.location+ce);i.bindBuffer(i.ARRAY_BUFFER,it);for(let ce=0;ce<G.locationSize;ce++)x(G.location+ce,Se/G.locationSize,W,Ee,Se*ie,Se/G.locationSize*ce*ie,Me)}}else if(V!==void 0){let Ee=V[ne];if(Ee!==void 0)switch(Ee.length){case 2:i.vertexAttrib2fv(G.location,Ee);break;case 3:i.vertexAttrib3fv(G.location,Ee);break;case 4:i.vertexAttrib4fv(G.location,Ee);break;default:i.vertexAttrib1fv(G.location,Ee)}}}}_()}function P(){I();for(let v in n){let R=n[v];for(let z in R){let F=R[z];for(let H in F)d(F[H].object),delete F[H];delete R[z]}delete n[v]}}function E(v){if(n[v.id]===void 0)return;let R=n[v.id];for(let z in R){let F=R[z];for(let H in F)d(F[H].object),delete F[H];delete R[z]}delete n[v.id]}function A(v){for(let R in n){let z=n[R];if(z[v.id]===void 0)continue;let F=z[v.id];for(let H in F)d(F[H].object),delete F[H];delete z[v.id]}}function I(){M(),a=!0,s!==r&&(s=r,c(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:M,dispose:P,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:p,disableUnusedAttributes:_}}function M0(i,e,t){let n;function r(c){n=c}function s(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function a(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),t.update(d,n,u))}function o(c,d,u){if(u===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let f=0;f<u;f++)this.render(c[f],d[f]);else{h.multiDrawArraysWEBGL(n,c,0,d,0,u);let f=0;for(let g=0;g<u;g++)f+=d[g];t.update(f,n,1)}}function l(c,d,u,h){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],d[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,d,0,h,0,u);let g=0;for(let y=0;y<u;y++)g+=d[y];for(let y=0;y<h.length;y++)t.update(g,n,h[y])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function E0(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(E){return!(E!==Zn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let A=E===Do&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==zi&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==xi&&!A)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let u=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),y=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=f>0,P=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:y,maxAttributes:p,maxVertexUniforms:m,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:b,maxSamples:P}}function T0(i){let e=this,t=null,n=0,r=!1,s=!1,a=new gi,o=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){let f=u.length!==0||h||n!==0||r;return r=h,n=u.length,f},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){let g=u.clippingPlanes,y=u.clipIntersection,p=u.clipShadows,m=i.get(u);if(!r||g===null||g.length===0||s&&!p)s?d(null):c();else{let _=s?0:n,x=_*4,b=m.clippingState||null;l.value=b,b=d(g,h,x,f);for(let P=0;P!==x;++P)b[P]=t[P];m.clippingState=b,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,h,f,g){let y=u!==null?u.length:0,p=null;if(y!==0){if(p=l.value,g!==!0||p===null){let m=f+y*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,b=f;x!==y;++x,b+=4)a.copy(u[x]).applyMatrix4(_,o),a.normal.toArray(p,b),p[b+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,p}}function A0(i){let e=new WeakMap;function t(a,o){return o===Bs?a.mapping=Qr:o===Ec&&(a.mapping=es),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Bs||o===Ec)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Dc(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){let o=a.target;o.removeEventListener("dispose",r);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var ao=class extends ro{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Xr=4,ch=[.125,.215,.35,.446,.526,.582],lr=20,hc=new ao,dh=new Fe,fc=null,pc=0,mc=0,gc=!1,ar=(1+Math.sqrt(5))/2,Hr=1/ar,uh=[new C(-ar,Hr,0),new C(ar,Hr,0),new C(-Hr,0,ar),new C(Hr,0,ar),new C(0,ar,-Hr),new C(0,ar,Hr),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],oo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){fc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ph(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fc,pc,mc),this._renderer.xr.enabled=gc,e.scissorTest=!1,Fa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Qr||e.mapping===es?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:zn,minFilter:zn,generateMipmaps:!1,type:Do,format:Zn,colorSpace:Wi,depthBuffer:!1},r=hh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hh(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=C0(s)),this._blurMaterial=R0(s,e,t)}return r}_compileMaterial(e){let t=new vt(this._lodPlanes[0],e);this._renderer.compile(t,hc)}_sceneToCubeUV(e,t,n,r){let o=new hn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(dh),d.toneMapping=Fi,d.autoClear=!1;let f=new ei({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1}),g=new vt(new yn,f),y=!1,p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,y=!0):(f.color.copy(dh),y=!0);for(let m=0;m<6;m++){let _=m%3;_===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):_===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));let x=this._cubeSize;Fa(r,_*x,m>2?x:0,x,x),d.setRenderTarget(r),y&&d.render(g,o),d.render(e,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=u,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Qr||e.mapping===es;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ph()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fh());let s=r?this._cubemapMaterial:this._equirectMaterial,a=new vt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;Fa(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,hc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=uh[(r-s-1)%uh.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let d=3,u=new vt(this._lodPlanes[r],c),h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*lr-1),y=s/g,p=isFinite(s)?1+Math.floor(d*y):lr;p>lr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${lr}`);let m=[],_=0;for(let A=0;A<lr;++A){let I=A/y,M=Math.exp(-I*I/2);m.push(M),A===0?_+=M:A<p&&(_+=2*M)}for(let A=0;A<m.length;A++)m[A]=m[A]/_;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-n;let b=this._sizeLods[r],P=3*b*(r>x-Xr?r-x+Xr:0),E=4*(this._cubeSize-b);Fa(t,P,E,3*b,2*b),l.setRenderTarget(t),l.render(u,hc)}};function C0(i){let e=[],t=[],n=[],r=i,s=i-Xr+1+ch.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);t.push(o);let l=1/o;a>i-Xr?l=ch[a-i+Xr-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,g=6,y=3,p=2,m=1,_=new Float32Array(y*g*f),x=new Float32Array(p*g*f),b=new Float32Array(m*g*f);for(let E=0;E<f;E++){let A=E%3*2/3-1,I=E>2?0:-1,M=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];_.set(M,y*g*E),x.set(h,p*g*E);let v=[E,E,E,E,E,E];b.set(v,m*g*E)}let P=new Mt;P.setAttribute("position",new Ht(_,y)),P.setAttribute("uv",new Ht(x,p)),P.setAttribute("faceIndex",new Ht(b,m)),e.push(P),r>Xr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function hh(i,e,t){let n=new vi(i,e,t);return n.texture.mapping=Lo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fa(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function R0(i,e,t){let n=new Float32Array(lr),r=new C(0,1,0);return new ti({name:"SphericalGaussianBlur",defines:{n:lr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:yd(),fragmentShader:`

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
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function fh(){return new ti({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yd(),fragmentShader:`

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
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function ph(){return new ti({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function yd(){return`

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
	`}function P0(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Bs||l===Ec,d=l===Qr||l===es;if(c||d){let u=e.get(o),h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new oo(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{let f=o.image;return c&&f&&f.height>0||d&&f&&r(f)?(t===null&&(t=new oo(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function r(o){let l=0,c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function I0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&xd("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function L0(i,e,t,n){let r={},s=new WeakMap;function a(u){let h=u.target;h.index!==null&&e.remove(h.index);for(let g in h.attributes)e.remove(h.attributes[g]);for(let g in h.morphAttributes){let y=h.morphAttributes[g];for(let p=0,m=y.length;p<m;p++)e.remove(y[p])}h.removeEventListener("dispose",a),delete r[h.id];let f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(u){let h=u.attributes;for(let g in h)e.update(h[g],i.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let y=f[g];for(let p=0,m=y.length;p<m;p++)e.update(y[p],i.ARRAY_BUFFER)}}function c(u){let h=[],f=u.index,g=u.attributes.position,y=0;if(f!==null){let _=f.array;y=f.version;for(let x=0,b=_.length;x<b;x+=3){let P=_[x+0],E=_[x+1],A=_[x+2];h.push(P,E,E,A,A,P)}}else if(g!==void 0){let _=g.array;y=g.version;for(let x=0,b=_.length/3-1;x<b;x+=3){let P=x+0,E=x+1,A=x+2;h.push(P,E,E,A,A,P)}}else return;let p=new(tf(h)?io:no)(h,1);p.version=y;let m=s.get(u);m&&e.remove(m),s.set(u,p)}function d(u){let h=s.get(u);if(h){let f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function D0(i,e,t){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,s,h*a),t.update(f,n,1)}function c(h,f,g){g!==0&&(i.drawElementsInstanced(n,f,s,h*a,g),t.update(f,n,g))}function d(h,f,g){if(g===0)return;let y=e.get("WEBGL_multi_draw");if(y===null)for(let p=0;p<g;p++)this.render(h[p]/a,f[p]);else{y.multiDrawElementsWEBGL(n,f,0,s,h,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];t.update(p,n,1)}}function u(h,f,g,y){if(g===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<h.length;m++)c(h[m]/a,f[m],y[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,s,h,0,y,0,g);let m=0;for(let _=0;_<g;_++)m+=f[_];for(let _=0;_<y.length;_++)t.update(m,n,y[_])}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function U0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function k0(i,e,t){let n=new WeakMap,r=new jt;function s(a,o,l){let c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0,h=n.get(o);if(h===void 0||h.count!==u){let M=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",M)};h!==void 0&&h.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],x=0;f===!0&&(x=1),g===!0&&(x=2),y===!0&&(x=3);let b=o.attributes.position.count*x,P=1;b>e.maxTextureSize&&(P=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let E=new Float32Array(b*P*4*u),A=new eo(E,b,P,u);A.type=xi,A.needsUpdate=!0;let I=x*4;for(let v=0;v<u;v++){let R=p[v],z=m[v],F=_[v],H=b*P*4*v;for(let q=0;q<R.count;q++){let V=q*I;f===!0&&(r.fromBufferAttribute(R,q),E[H+V+0]=r.x,E[H+V+1]=r.y,E[H+V+2]=r.z,E[H+V+3]=0),g===!0&&(r.fromBufferAttribute(z,q),E[H+V+4]=r.x,E[H+V+5]=r.y,E[H+V+6]=r.z,E[H+V+7]=0),y===!0&&(r.fromBufferAttribute(F,q),E[H+V+8]=r.x,E[H+V+9]=r.y,E[H+V+10]=r.z,E[H+V+11]=F.itemSize===4?r.w:1)}}h={count:u,texture:A,size:new K(b,P)},n.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function N0(i,e,t,n){let r=new WeakMap;function s(l){let c=n.render.frame,d=l.geometry,u=e.get(l,d);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return u}function a(){r=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}var lo=class extends fn{constructor(e,t,n,r,s,a,o,l,c,d=Zr){if(d!==Zr&&d!==is)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Zr&&(n=ts),n===void 0&&d===is&&(n=ns),super(null,r,s,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:gn,this.minFilter=l!==void 0?l:gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},af=new fn,of=new lo(1,1);of.compareFunction=ef;var lf=new eo,cf=new Ic,df=new so,mh=[],gh=[],xh=new Float32Array(16),yh=new Float32Array(9),vh=new Float32Array(4);function os(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=mh[r];if(s===void 0&&(s=new Float32Array(r),mh[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ko(i,e){let t=gh[e];t===void 0&&(t=new Int32Array(e),gh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function F0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function O0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2fv(this.addr,e),Gt(t,e)}}function B0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;i.uniform3fv(this.addr,e),Gt(t,e)}}function z0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4fv(this.addr,e),Gt(t,e)}}function H0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;vh.set(n),i.uniformMatrix2fv(this.addr,!1,vh),Gt(t,n)}}function V0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;yh.set(n),i.uniformMatrix3fv(this.addr,!1,yh),Gt(t,n)}}function G0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;xh.set(n),i.uniformMatrix4fv(this.addr,!1,xh),Gt(t,n)}}function W0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function $0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2iv(this.addr,e),Gt(t,e)}}function q0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3iv(this.addr,e),Gt(t,e)}}function X0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4iv(this.addr,e),Gt(t,e)}}function Y0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function j0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2uiv(this.addr,e),Gt(t,e)}}function Z0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3uiv(this.addr,e),Gt(t,e)}}function J0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4uiv(this.addr,e),Gt(t,e)}}function K0(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s=this.type===i.SAMPLER_2D_SHADOW?of:af;t.setTexture2D(e||s,r)}function Q0(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||cf,r)}function ey(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||df,r)}function ty(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||lf,r)}function ny(i){switch(i){case 5126:return F0;case 35664:return O0;case 35665:return B0;case 35666:return z0;case 35674:return H0;case 35675:return V0;case 35676:return G0;case 5124:case 35670:return W0;case 35667:case 35671:return $0;case 35668:case 35672:return q0;case 35669:case 35673:return X0;case 5125:return Y0;case 36294:return j0;case 36295:return Z0;case 36296:return J0;case 35678:case 36198:case 36298:case 36306:case 35682:return K0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return ey;case 36289:case 36303:case 36311:case 36292:return ty}}function iy(i,e){i.uniform1fv(this.addr,e)}function ry(i,e){let t=os(e,this.size,2);i.uniform2fv(this.addr,t)}function sy(i,e){let t=os(e,this.size,3);i.uniform3fv(this.addr,t)}function ay(i,e){let t=os(e,this.size,4);i.uniform4fv(this.addr,t)}function oy(i,e){let t=os(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ly(i,e){let t=os(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function cy(i,e){let t=os(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function dy(i,e){i.uniform1iv(this.addr,e)}function uy(i,e){i.uniform2iv(this.addr,e)}function hy(i,e){i.uniform3iv(this.addr,e)}function fy(i,e){i.uniform4iv(this.addr,e)}function py(i,e){i.uniform1uiv(this.addr,e)}function my(i,e){i.uniform2uiv(this.addr,e)}function gy(i,e){i.uniform3uiv(this.addr,e)}function xy(i,e){i.uniform4uiv(this.addr,e)}function yy(i,e,t){let n=this.cache,r=e.length,s=ko(t,r);Vt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||af,s[a])}function vy(i,e,t){let n=this.cache,r=e.length,s=ko(t,r);Vt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||cf,s[a])}function by(i,e,t){let n=this.cache,r=e.length,s=ko(t,r);Vt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||df,s[a])}function _y(i,e,t){let n=this.cache,r=e.length,s=ko(t,r);Vt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||lf,s[a])}function wy(i){switch(i){case 5126:return iy;case 35664:return ry;case 35665:return sy;case 35666:return ay;case 35674:return oy;case 35675:return ly;case 35676:return cy;case 5124:case 35670:return dy;case 35667:case 35671:return uy;case 35668:case 35672:return hy;case 35669:case 35673:return fy;case 5125:return py;case 36294:return my;case 36295:return gy;case 36296:return xy;case 35678:case 36198:case 36298:case 36306:case 35682:return yy;case 35679:case 36299:case 36307:return vy;case 35680:case 36300:case 36308:case 36293:return by;case 36289:case 36303:case 36311:case 36292:return _y}}var Uc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ny(t.type)}},kc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wy(t.type)}},Nc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},xc=/(\w+)(\])?(\[|\.)?/g;function bh(i,e){i.seq.push(e),i.map[e.id]=e}function Sy(i,e,t){let n=i.name,r=n.length;for(xc.lastIndex=0;;){let s=xc.exec(n),a=xc.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){bh(t,c===void 0?new Uc(o,i,e):new kc(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Nc(o),bh(t,u)),t=u}}}var Kr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Sy(s,a,this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function _h(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var My=37297,Ey=0;function Ty(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Ay(i){let e=dt.getPrimaries(dt.workingColorSpace),t=dt.getPrimaries(i),n;switch(e===t?n="":e===Ja&&t===Za?n="LinearDisplayP3ToLinearSRGB":e===Za&&t===Ja&&(n="LinearSRGBToLinearDisplayP3"),i){case Wi:case Uo:return[n,"LinearTransferOETF"];case Lt:case pd:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function wh(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Ty(i.getShaderSource(e),a)}else return r}function Cy(i,e){let t=Ay(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Ry(i,e){let t;switch(e){case Lp:t="Linear";break;case Dp:t="Reinhard";break;case Up:t="OptimizedCineon";break;case fd:t="ACESFilmic";break;case Np:t="AgX";break;case Fp:t="Neutral";break;case kp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Py(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ls).join(`
`)}function Iy(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ly(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ls(i){return i!==""}function Sh(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Dy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fc(i){return i.replace(Dy,ky)}var Uy=new Map;function ky(i,e){let t=Xe[e];if(t===void 0){let n=Uy.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Fc(t)}var Ny=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eh(i){return i.replace(Ny,Fy)}function Fy(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Th(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Oy(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Gh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===hd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===mi&&(e="SHADOWMAP_TYPE_VSM"),e}function By(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Qr:case es:e="ENVMAP_TYPE_CUBE";break;case Lo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function zy(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===es&&(e="ENVMAP_MODE_REFRACTION"),e}function Hy(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Wh:e="ENVMAP_BLENDING_MULTIPLY";break;case Pp:e="ENVMAP_BLENDING_MIX";break;case Ip:e="ENVMAP_BLENDING_ADD";break}return e}function Vy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Gy(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Oy(t),c=By(t),d=zy(t),u=Hy(t),h=Vy(t),f=Py(t),g=Iy(s),y=r.createProgram(),p,m,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ls).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ls).join(`
`),m.length>0&&(m+=`
`)):(p=[Th(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ls).join(`
`),m=[Th(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Fi?"#define TONE_MAPPING":"",t.toneMapping!==Fi?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Fi?Ry("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,Cy("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ls).join(`
`)),a=Fc(a),a=Sh(a,t),a=Mh(a,t),o=Fc(o),o=Sh(o,t),o=Mh(o,t),a=Eh(a),o=Eh(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Vu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let x=_+p+a,b=_+m+o,P=_h(r,r.VERTEX_SHADER,x),E=_h(r,r.FRAGMENT_SHADER,b);r.attachShader(y,P),r.attachShader(y,E),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function A(R){if(i.debug.checkShaderErrors){let z=r.getProgramInfoLog(y).trim(),F=r.getShaderInfoLog(P).trim(),H=r.getShaderInfoLog(E).trim(),q=!0,V=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,P,E);else{let ne=wh(r,P,"vertex"),G=wh(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+z+`
`+ne+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(F===""||H==="")&&(V=!1);V&&(R.diagnostics={runnable:q,programLog:z,vertexShader:{log:F,prefix:p},fragmentShader:{log:H,prefix:m}})}r.deleteShader(P),r.deleteShader(E),I=new Kr(r,y),M=Ly(r,y)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=r.getProgramParameter(y,My)),v},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ey++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=P,this.fragmentShader=E,this}var Wy=0,Oc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Bc(e),t.set(e,n)),n}},Bc=class{constructor(e){this.id=Wy++,this.code=e,this.usedTimes=0}};function $y(i,e,t,n,r,s,a){let o=new Vs,l=new Oc,c=new Set,d=[],u=r.logarithmicDepthBuffer,h=r.vertexTextures,f=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(M){return c.add(M),M===0?"uv":`uv${M}`}function p(M,v,R,z,F){let H=z.fog,q=F.geometry,V=M.isMeshStandardMaterial?z.environment:null,ne=(M.isMeshStandardMaterial?t:e).get(M.envMap||V),G=ne&&ne.mapping===Lo?ne.image.height:null,ve=g[M.type];M.precision!==null&&(f=r.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let Ee=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Se=Ee!==void 0?Ee.length:0,Ze=0;q.morphAttributes.position!==void 0&&(Ze=1),q.morphAttributes.normal!==void 0&&(Ze=2),q.morphAttributes.color!==void 0&&(Ze=3);let it,W,ie,Me;if(ve){let ut=jn[ve];it=ut.vertexShader,W=ut.fragmentShader}else it=M.vertexShader,W=M.fragmentShader,l.update(M),ie=l.getVertexShaderID(M),Me=l.getFragmentShaderID(M);let ce=i.getRenderTarget(),Ge=F.isInstancedMesh===!0,$e=F.isBatchedMesh===!0,He=!!M.map,L=!!M.matcap,X=!!ne,J=!!M.aoMap,re=!!M.lightMap,ee=!!M.bumpMap,te=!!M.normalMap,be=!!M.displacementMap,xe=!!M.emissiveMap,Ve=!!M.metalnessMap,T=!!M.roughnessMap,w=M.anisotropy>0,B=M.clearcoat>0,Z=M.dispersion>0,j=M.iridescence>0,Q=M.sheen>0,Pe=M.transmission>0,ue=w&&!!M.anisotropyMap,pe=B&&!!M.clearcoatMap,qe=B&&!!M.clearcoatNormalMap,se=B&&!!M.clearcoatRoughnessMap,Ce=j&&!!M.iridescenceMap,Ke=j&&!!M.iridescenceThicknessMap,Oe=Q&&!!M.sheenColorMap,ye=Q&&!!M.sheenRoughnessMap,Je=!!M.specularMap,Qe=!!M.specularColorMap,Pt=!!M.specularIntensityMap,D=Pe&&!!M.transmissionMap,_e=Pe&&!!M.thicknessMap,$=!!M.gradientMap,Y=!!M.alphaMap,le=M.alphaTest>0,Be=!!M.alphaHash,rt=!!M.extensions,It=Fi;M.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(It=i.toneMapping);let $t={shaderID:ve,shaderType:M.type,shaderName:M.name,vertexShader:it,fragmentShader:W,defines:M.defines,customVertexShaderID:ie,customFragmentShaderID:Me,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:$e,batchingColor:$e&&F._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&F.instanceColor!==null,instancingMorph:Ge&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Wi,alphaToCoverage:!!M.alphaToCoverage,map:He,matcap:L,envMap:X,envMapMode:X&&ne.mapping,envMapCubeUVHeight:G,aoMap:J,lightMap:re,bumpMap:ee,normalMap:te,displacementMap:h&&be,emissiveMap:xe,normalMapObjectSpace:te&&M.normalMapType===Zp,normalMapTangentSpace:te&&M.normalMapType===Qh,metalnessMap:Ve,roughnessMap:T,anisotropy:w,anisotropyMap:ue,clearcoat:B,clearcoatMap:pe,clearcoatNormalMap:qe,clearcoatRoughnessMap:se,dispersion:Z,iridescence:j,iridescenceMap:Ce,iridescenceThicknessMap:Ke,sheen:Q,sheenColorMap:Oe,sheenRoughnessMap:ye,specularMap:Je,specularColorMap:Qe,specularIntensityMap:Pt,transmission:Pe,transmissionMap:D,thicknessMap:_e,gradientMap:$,opaque:M.transparent===!1&&M.blending===jr&&M.alphaToCoverage===!1,alphaMap:Y,alphaTest:le,alphaHash:Be,combine:M.combine,mapUv:He&&y(M.map.channel),aoMapUv:J&&y(M.aoMap.channel),lightMapUv:re&&y(M.lightMap.channel),bumpMapUv:ee&&y(M.bumpMap.channel),normalMapUv:te&&y(M.normalMap.channel),displacementMapUv:be&&y(M.displacementMap.channel),emissiveMapUv:xe&&y(M.emissiveMap.channel),metalnessMapUv:Ve&&y(M.metalnessMap.channel),roughnessMapUv:T&&y(M.roughnessMap.channel),anisotropyMapUv:ue&&y(M.anisotropyMap.channel),clearcoatMapUv:pe&&y(M.clearcoatMap.channel),clearcoatNormalMapUv:qe&&y(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&y(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&y(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ke&&y(M.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&y(M.sheenColorMap.channel),sheenRoughnessMapUv:ye&&y(M.sheenRoughnessMap.channel),specularMapUv:Je&&y(M.specularMap.channel),specularColorMapUv:Qe&&y(M.specularColorMap.channel),specularIntensityMapUv:Pt&&y(M.specularIntensityMap.channel),transmissionMapUv:D&&y(M.transmissionMap.channel),thicknessMapUv:_e&&y(M.thicknessMap.channel),alphaMapUv:Y&&y(M.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(te||w),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!q.attributes.uv&&(He||Y),fog:!!H,useFog:M.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:F.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:Ze,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:It,decodeVideoTexture:He&&M.map.isVideoTexture===!0&&dt.getTransfer(M.map.colorSpace)===gt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Bn,flipSided:M.side===xn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:rt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:rt&&M.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return $t.vertexUv1s=c.has(1),$t.vertexUv2s=c.has(2),$t.vertexUv3s=c.has(3),c.clear(),$t}function m(M){let v=[];if(M.shaderID?v.push(M.shaderID):(v.push(M.customVertexShaderID),v.push(M.customFragmentShaderID)),M.defines!==void 0)for(let R in M.defines)v.push(R),v.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(_(v,M),x(v,M),v.push(i.outputColorSpace)),v.push(M.customProgramCacheKey),v.join()}function _(M,v){M.push(v.precision),M.push(v.outputColorSpace),M.push(v.envMapMode),M.push(v.envMapCubeUVHeight),M.push(v.mapUv),M.push(v.alphaMapUv),M.push(v.lightMapUv),M.push(v.aoMapUv),M.push(v.bumpMapUv),M.push(v.normalMapUv),M.push(v.displacementMapUv),M.push(v.emissiveMapUv),M.push(v.metalnessMapUv),M.push(v.roughnessMapUv),M.push(v.anisotropyMapUv),M.push(v.clearcoatMapUv),M.push(v.clearcoatNormalMapUv),M.push(v.clearcoatRoughnessMapUv),M.push(v.iridescenceMapUv),M.push(v.iridescenceThicknessMapUv),M.push(v.sheenColorMapUv),M.push(v.sheenRoughnessMapUv),M.push(v.specularMapUv),M.push(v.specularColorMapUv),M.push(v.specularIntensityMapUv),M.push(v.transmissionMapUv),M.push(v.thicknessMapUv),M.push(v.combine),M.push(v.fogExp2),M.push(v.sizeAttenuation),M.push(v.morphTargetsCount),M.push(v.morphAttributeCount),M.push(v.numDirLights),M.push(v.numPointLights),M.push(v.numSpotLights),M.push(v.numSpotLightMaps),M.push(v.numHemiLights),M.push(v.numRectAreaLights),M.push(v.numDirLightShadows),M.push(v.numPointLightShadows),M.push(v.numSpotLightShadows),M.push(v.numSpotLightShadowsWithMaps),M.push(v.numLightProbes),M.push(v.shadowMapType),M.push(v.toneMapping),M.push(v.numClippingPlanes),M.push(v.numClipIntersection),M.push(v.depthPacking)}function x(M,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.skinning&&o.enable(4),v.morphTargets&&o.enable(5),v.morphNormals&&o.enable(6),v.morphColors&&o.enable(7),v.premultipliedAlpha&&o.enable(8),v.shadowMapEnabled&&o.enable(9),v.doubleSided&&o.enable(10),v.flipSided&&o.enable(11),v.useDepthPacking&&o.enable(12),v.dithering&&o.enable(13),v.transmission&&o.enable(14),v.sheen&&o.enable(15),v.opaque&&o.enable(16),v.pointsUvs&&o.enable(17),v.decodeVideoTexture&&o.enable(18),v.alphaToCoverage&&o.enable(19),M.push(o.mask)}function b(M){let v=g[M.type],R;if(v){let z=jn[v];R=Nm.clone(z.uniforms)}else R=M.uniforms;return R}function P(M,v){let R;for(let z=0,F=d.length;z<F;z++){let H=d[z];if(H.cacheKey===v){R=H,++R.usedTimes;break}}return R===void 0&&(R=new Gy(i,v,M,s),d.push(R)),R}function E(M){if(--M.usedTimes===0){let v=d.indexOf(M);d[v]=d[d.length-1],d.pop(),M.destroy()}}function A(M){l.remove(M)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:b,acquireProgram:P,releaseProgram:E,releaseShaderCache:A,programs:d,dispose:I}}function qy(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function Xy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ah(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ch(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u,h,f,g,y,p){let m=i[e];return m===void 0?(m={id:u.id,object:u,geometry:h,material:f,groupOrder:g,renderOrder:u.renderOrder,z:y,group:p},i[e]=m):(m.id=u.id,m.object=u,m.geometry=h,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=y,m.group=p),e++,m}function o(u,h,f,g,y,p){let m=a(u,h,f,g,y,p);f.transmission>0?n.push(m):f.transparent===!0?r.push(m):t.push(m)}function l(u,h,f,g,y,p){let m=a(u,h,f,g,y,p);f.transmission>0?n.unshift(m):f.transparent===!0?r.unshift(m):t.unshift(m)}function c(u,h){t.length>1&&t.sort(u||Xy),n.length>1&&n.sort(h||Ah),r.length>1&&r.sort(h||Ah)}function d(){for(let u=e,h=i.length;u<h;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:d,sort:c}}function Yy(){let i=new WeakMap;function e(n,r){let s=i.get(n),a;return s===void 0?(a=new Ch,i.set(n,[a])):r>=s.length?(a=new Ch,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function jy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Fe};break;case"SpotLight":t={position:new C,direction:new C,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function Zy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Jy=0;function Ky(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Qy(i){let e=new jy,t=Zy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);let r=new C,s=new pt,a=new pt;function o(c){let d=0,u=0,h=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,y=0,p=0,m=0,_=0,x=0,b=0,P=0,E=0,A=0;c.sort(Ky);for(let M=0,v=c.length;M<v;M++){let R=c[M],z=R.color,F=R.intensity,H=R.distance,q=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=z.r*F,u+=z.g*F,h+=z.b*F;else if(R.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(R.sh.coefficients[V],F);A++}else if(R.isDirectionalLight){let V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let ne=R.shadow,G=t.get(R);G.shadowBias=ne.bias,G.shadowNormalBias=ne.normalBias,G.shadowRadius=ne.radius,G.shadowMapSize=ne.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=q,n.directionalShadowMatrix[f]=R.shadow.matrix,_++}n.directional[f]=V,f++}else if(R.isSpotLight){let V=e.get(R);V.position.setFromMatrixPosition(R.matrixWorld),V.color.copy(z).multiplyScalar(F),V.distance=H,V.coneCos=Math.cos(R.angle),V.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),V.decay=R.decay,n.spot[y]=V;let ne=R.shadow;if(R.map&&(n.spotLightMap[P]=R.map,P++,ne.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[y]=ne.matrix,R.castShadow){let G=t.get(R);G.shadowBias=ne.bias,G.shadowNormalBias=ne.normalBias,G.shadowRadius=ne.radius,G.shadowMapSize=ne.mapSize,n.spotShadow[y]=G,n.spotShadowMap[y]=q,b++}y++}else if(R.isRectAreaLight){let V=e.get(R);V.color.copy(z).multiplyScalar(F),V.halfWidth.set(R.width*.5,0,0),V.halfHeight.set(0,R.height*.5,0),n.rectArea[p]=V,p++}else if(R.isPointLight){let V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),V.distance=R.distance,V.decay=R.decay,R.castShadow){let ne=R.shadow,G=t.get(R);G.shadowBias=ne.bias,G.shadowNormalBias=ne.normalBias,G.shadowRadius=ne.radius,G.shadowMapSize=ne.mapSize,G.shadowCameraNear=ne.camera.near,G.shadowCameraFar=ne.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=R.shadow.matrix,x++}n.point[g]=V,g++}else if(R.isHemisphereLight){let V=e.get(R);V.skyColor.copy(R.color).multiplyScalar(F),V.groundColor.copy(R.groundColor).multiplyScalar(F),n.hemi[m]=V,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;let I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==y||I.rectAreaLength!==p||I.hemiLength!==m||I.numDirectionalShadows!==_||I.numPointShadows!==x||I.numSpotShadows!==b||I.numSpotMaps!==P||I.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=b+P-E,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,I.directionalLength=f,I.pointLength=g,I.spotLength=y,I.rectAreaLength=p,I.hemiLength=m,I.numDirectionalShadows=_,I.numPointShadows=x,I.numSpotShadows=b,I.numSpotMaps=P,I.numLightProbes=A,n.version=Jy++)}function l(c,d){let u=0,h=0,f=0,g=0,y=0,p=d.matrixWorldInverse;for(let m=0,_=c.length;m<_;m++){let x=c[m];if(x.isDirectionalLight){let b=n.directional[u];b.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),u++}else if(x.isSpotLight){let b=n.spot[f];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),f++}else if(x.isRectAreaLight){let b=n.rectArea[g];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(p),a.identity(),s.copy(x.matrixWorld),s.premultiply(p),a.extractRotation(s),b.halfWidth.set(x.width*.5,0,0),b.halfHeight.set(0,x.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(x.isPointLight){let b=n.point[h];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(p),h++}else if(x.isHemisphereLight){let b=n.hemi[y];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(p),y++}}}return{setup:o,setupView:l,state:n}}function Rh(i){let e=new Qy(i),t=[],n=[];function r(d){c.camera=d,t.length=0,n.length=0}function s(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function ev(i){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new Rh(i),e.set(r,[o])):s>=a.length?(o=new Rh(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var zc=class extends Vi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Hc=class extends Vi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},tv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nv=`uniform sampler2D shadow_pass;
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
}`;function iv(i,e,t){let n=new Gs,r=new K,s=new K,a=new jt,o=new zc({depthPacking:jp}),l=new Hc,c={},d=t.maxTextureSize,u={[Bi]:xn,[xn]:Bi,[Bn]:Bn},h=new ti({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:tv,fragmentShader:nv}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let g=new Mt;g.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new vt(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gh;let m=this.type;this.render=function(E,A,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;let M=i.getRenderTarget(),v=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Ni),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let F=m!==mi&&this.type===mi,H=m===mi&&this.type!==mi;for(let q=0,V=E.length;q<V;q++){let ne=E[q],G=ne.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);let ve=G.getFrameExtents();if(r.multiply(ve),s.copy(G.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/ve.x),r.x=s.x*ve.x,G.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/ve.y),r.y=s.y*ve.y,G.mapSize.y=s.y)),G.map===null||F===!0||H===!0){let Se=this.type!==mi?{minFilter:gn,magFilter:gn}:{};G.map!==null&&G.map.dispose(),G.map=new vi(r.x,r.y,Se),G.map.texture.name=ne.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();let Ee=G.getViewportCount();for(let Se=0;Se<Ee;Se++){let Ze=G.getViewport(Se);a.set(s.x*Ze.x,s.y*Ze.y,s.x*Ze.z,s.y*Ze.w),z.viewport(a),G.updateMatrices(ne,Se),n=G.getFrustum(),b(A,I,G.camera,ne,this.type)}G.isPointLightShadow!==!0&&this.type===mi&&_(G,I),G.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(M,v,R)};function _(E,A){let I=e.update(y);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new vi(r.x,r.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,I,h,y,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,I,f,y,null)}function x(E,A,I,M){let v=null,R=I.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)v=R;else if(v=I.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let z=v.uuid,F=A.uuid,H=c[z];H===void 0&&(H={},c[z]=H);let q=H[F];q===void 0&&(q=v.clone(),H[F]=q,A.addEventListener("dispose",P)),v=q}if(v.visible=A.visible,v.wireframe=A.wireframe,M===mi?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:u[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,I.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let z=i.properties.get(v);z.light=I}return v}function b(E,A,I,M,v){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&v===mi)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,E.matrixWorld);let F=e.update(E),H=E.material;if(Array.isArray(H)){let q=F.groups;for(let V=0,ne=q.length;V<ne;V++){let G=q[V],ve=H[G.materialIndex];if(ve&&ve.visible){let Ee=x(E,ve,M,v);E.onBeforeShadow(i,E,A,I,F,Ee,G),i.renderBufferDirect(I,null,F,Ee,E,G),E.onAfterShadow(i,E,A,I,F,Ee,G)}}}else if(H.visible){let q=x(E,H,M,v);E.onBeforeShadow(i,E,A,I,F,q,null),i.renderBufferDirect(I,null,F,q,E,null),E.onAfterShadow(i,E,A,I,F,q,null)}}let z=E.children;for(let F=0,H=z.length;F<H;F++)b(z[F],A,I,M,v)}function P(E){E.target.removeEventListener("dispose",P);for(let I in c){let M=c[I],v=E.target.uuid;v in M&&(M[v].dispose(),delete M[v])}}}function rv(i){function e(){let D=!1,_e=new jt,$=null,Y=new jt(0,0,0,0);return{setMask:function(le){$!==le&&!D&&(i.colorMask(le,le,le,le),$=le)},setLocked:function(le){D=le},setClear:function(le,Be,rt,It,$t){$t===!0&&(le*=It,Be*=It,rt*=It),_e.set(le,Be,rt,It),Y.equals(_e)===!1&&(i.clearColor(le,Be,rt,It),Y.copy(_e))},reset:function(){D=!1,$=null,Y.set(-1,0,0,0)}}}function t(){let D=!1,_e=null,$=null,Y=null;return{setTest:function(le){le?Me(i.DEPTH_TEST):ce(i.DEPTH_TEST)},setMask:function(le){_e!==le&&!D&&(i.depthMask(le),_e=le)},setFunc:function(le){if($!==le){switch(le){case Sp:i.depthFunc(i.NEVER);break;case Mp:i.depthFunc(i.ALWAYS);break;case Ep:i.depthFunc(i.LESS);break;case qa:i.depthFunc(i.LEQUAL);break;case Tp:i.depthFunc(i.EQUAL);break;case Ap:i.depthFunc(i.GEQUAL);break;case Cp:i.depthFunc(i.GREATER);break;case Rp:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}$=le}},setLocked:function(le){D=le},setClear:function(le){Y!==le&&(i.clearDepth(le),Y=le)},reset:function(){D=!1,_e=null,$=null,Y=null}}}function n(){let D=!1,_e=null,$=null,Y=null,le=null,Be=null,rt=null,It=null,$t=null;return{setTest:function(ut){D||(ut?Me(i.STENCIL_TEST):ce(i.STENCIL_TEST))},setMask:function(ut){_e!==ut&&!D&&(i.stencilMask(ut),_e=ut)},setFunc:function(ut,Xn,Yn){($!==ut||Y!==Xn||le!==Yn)&&(i.stencilFunc(ut,Xn,Yn),$=ut,Y=Xn,le=Yn)},setOp:function(ut,Xn,Yn){(Be!==ut||rt!==Xn||It!==Yn)&&(i.stencilOp(ut,Xn,Yn),Be=ut,rt=Xn,It=Yn)},setLocked:function(ut){D=ut},setClear:function(ut){$t!==ut&&(i.clearStencil(ut),$t=ut)},reset:function(){D=!1,_e=null,$=null,Y=null,le=null,Be=null,rt=null,It=null,$t=null}}}let r=new e,s=new t,a=new n,o=new WeakMap,l=new WeakMap,c={},d={},u=new WeakMap,h=[],f=null,g=!1,y=null,p=null,m=null,_=null,x=null,b=null,P=null,E=new Fe(0,0,0),A=0,I=!1,M=null,v=null,R=null,z=null,F=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,V=0,ne=i.getParameter(i.VERSION);ne.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(ne)[1]),q=V>=1):ne.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),q=V>=2);let G=null,ve={},Ee=i.getParameter(i.SCISSOR_BOX),Se=i.getParameter(i.VIEWPORT),Ze=new jt().fromArray(Ee),it=new jt().fromArray(Se);function W(D,_e,$,Y){let le=new Uint8Array(4),Be=i.createTexture();i.bindTexture(D,Be),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let rt=0;rt<$;rt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(_e,0,i.RGBA,1,1,Y,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(_e+rt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return Be}let ie={};ie[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),ie[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ie[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),Me(i.DEPTH_TEST),s.setFunc(qa),ee(!1),te(cu),Me(i.CULL_FACE),J(Ni);function Me(D){c[D]!==!0&&(i.enable(D),c[D]=!0)}function ce(D){c[D]!==!1&&(i.disable(D),c[D]=!1)}function Ge(D,_e){return d[D]!==_e?(i.bindFramebuffer(D,_e),d[D]=_e,D===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=_e),D===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=_e),!0):!1}function $e(D,_e){let $=h,Y=!1;if(D){$=u.get(_e),$===void 0&&($=[],u.set(_e,$));let le=D.textures;if($.length!==le.length||$[0]!==i.COLOR_ATTACHMENT0){for(let Be=0,rt=le.length;Be<rt;Be++)$[Be]=i.COLOR_ATTACHMENT0+Be;$.length=le.length,Y=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,Y=!0);Y&&i.drawBuffers($)}function He(D){return f!==D?(i.useProgram(D),f=D,!0):!1}let L={[or]:i.FUNC_ADD,[ap]:i.FUNC_SUBTRACT,[op]:i.FUNC_REVERSE_SUBTRACT};L[lp]=i.MIN,L[cp]=i.MAX;let X={[dp]:i.ZERO,[up]:i.ONE,[hp]:i.SRC_COLOR,[Sc]:i.SRC_ALPHA,[yp]:i.SRC_ALPHA_SATURATE,[gp]:i.DST_COLOR,[pp]:i.DST_ALPHA,[fp]:i.ONE_MINUS_SRC_COLOR,[Mc]:i.ONE_MINUS_SRC_ALPHA,[xp]:i.ONE_MINUS_DST_COLOR,[mp]:i.ONE_MINUS_DST_ALPHA,[vp]:i.CONSTANT_COLOR,[bp]:i.ONE_MINUS_CONSTANT_COLOR,[_p]:i.CONSTANT_ALPHA,[wp]:i.ONE_MINUS_CONSTANT_ALPHA};function J(D,_e,$,Y,le,Be,rt,It,$t,ut){if(D===Ni){g===!0&&(ce(i.BLEND),g=!1);return}if(g===!1&&(Me(i.BLEND),g=!0),D!==sp){if(D!==y||ut!==I){if((p!==or||x!==or)&&(i.blendEquation(i.FUNC_ADD),p=or,x=or),ut)switch(D){case jr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Os:i.blendFunc(i.ONE,i.ONE);break;case du:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case uu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case jr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Os:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case du:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case uu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}m=null,_=null,b=null,P=null,E.set(0,0,0),A=0,y=D,I=ut}return}le=le||_e,Be=Be||$,rt=rt||Y,(_e!==p||le!==x)&&(i.blendEquationSeparate(L[_e],L[le]),p=_e,x=le),($!==m||Y!==_||Be!==b||rt!==P)&&(i.blendFuncSeparate(X[$],X[Y],X[Be],X[rt]),m=$,_=Y,b=Be,P=rt),(It.equals(E)===!1||$t!==A)&&(i.blendColor(It.r,It.g,It.b,$t),E.copy(It),A=$t),y=D,I=!1}function re(D,_e){D.side===Bn?ce(i.CULL_FACE):Me(i.CULL_FACE);let $=D.side===xn;_e&&($=!$),ee($),D.blending===jr&&D.transparent===!1?J(Ni):J(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),s.setFunc(D.depthFunc),s.setTest(D.depthTest),s.setMask(D.depthWrite),r.setMask(D.colorWrite);let Y=D.stencilWrite;a.setTest(Y),Y&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),xe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Me(i.SAMPLE_ALPHA_TO_COVERAGE):ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function ee(D){M!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),M=D)}function te(D){D!==ip?(Me(i.CULL_FACE),D!==v&&(D===cu?i.cullFace(i.BACK):D===rp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ce(i.CULL_FACE),v=D}function be(D){D!==R&&(q&&i.lineWidth(D),R=D)}function xe(D,_e,$){D?(Me(i.POLYGON_OFFSET_FILL),(z!==_e||F!==$)&&(i.polygonOffset(_e,$),z=_e,F=$)):ce(i.POLYGON_OFFSET_FILL)}function Ve(D){D?Me(i.SCISSOR_TEST):ce(i.SCISSOR_TEST)}function T(D){D===void 0&&(D=i.TEXTURE0+H-1),G!==D&&(i.activeTexture(D),G=D)}function w(D,_e,$){$===void 0&&(G===null?$=i.TEXTURE0+H-1:$=G);let Y=ve[$];Y===void 0&&(Y={type:void 0,texture:void 0},ve[$]=Y),(Y.type!==D||Y.texture!==_e)&&(G!==$&&(i.activeTexture($),G=$),i.bindTexture(D,_e||ie[D]),Y.type=D,Y.texture=_e)}function B(){let D=ve[G];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pe(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ue(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function qe(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function se(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ke(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Oe(D){Ze.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Ze.copy(D))}function ye(D){it.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),it.copy(D))}function Je(D,_e){let $=l.get(_e);$===void 0&&($=new WeakMap,l.set(_e,$));let Y=$.get(D);Y===void 0&&(Y=i.getUniformBlockIndex(_e,D.name),$.set(D,Y))}function Qe(D,_e){let Y=l.get(_e).get(D);o.get(_e)!==Y&&(i.uniformBlockBinding(_e,Y,D.__bindingPointIndex),o.set(_e,Y))}function Pt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},G=null,ve={},d={},u=new WeakMap,h=[],f=null,g=!1,y=null,p=null,m=null,_=null,x=null,b=null,P=null,E=new Fe(0,0,0),A=0,I=!1,M=null,v=null,R=null,z=null,F=null,Ze.set(0,0,i.canvas.width,i.canvas.height),it.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:Me,disable:ce,bindFramebuffer:Ge,drawBuffers:$e,useProgram:He,setBlending:J,setMaterial:re,setFlipSided:ee,setCullFace:te,setLineWidth:be,setPolygonOffset:xe,setScissorTest:Ve,activeTexture:T,bindTexture:w,unbindTexture:B,compressedTexImage2D:Z,compressedTexImage3D:j,texImage2D:Ce,texImage3D:Ke,updateUBOMapping:Je,uniformBlockBinding:Qe,texStorage2D:qe,texStorage3D:se,texSubImage2D:Q,texSubImage3D:Pe,compressedTexSubImage2D:ue,compressedTexSubImage3D:pe,scissor:Oe,viewport:ye,reset:Pt}}function sv(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new K,d=new WeakMap,u,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,w){return f?new OffscreenCanvas(T,w):Hs("canvas")}function y(T,w,B){let Z=1,j=Ve(T);if((j.width>B||j.height>B)&&(Z=B/Math.max(j.width,j.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let Q=Math.floor(Z*j.width),Pe=Math.floor(Z*j.height);u===void 0&&(u=g(Q,Pe));let ue=w?g(Q,Pe):u;return ue.width=Q,ue.height=Pe,ue.getContext("2d").drawImage(T,0,0,Q,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+Q+"x"+Pe+")."),ue}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),T;return T}function p(T){return T.generateMipmaps&&T.minFilter!==gn&&T.minFilter!==zn}function m(T){i.generateMipmap(T)}function _(T,w,B,Z,j=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Q=w;if(w===i.RED&&(B===i.FLOAT&&(Q=i.R32F),B===i.HALF_FLOAT&&(Q=i.R16F),B===i.UNSIGNED_BYTE&&(Q=i.R8)),w===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Q=i.R8UI),B===i.UNSIGNED_SHORT&&(Q=i.R16UI),B===i.UNSIGNED_INT&&(Q=i.R32UI),B===i.BYTE&&(Q=i.R8I),B===i.SHORT&&(Q=i.R16I),B===i.INT&&(Q=i.R32I)),w===i.RG&&(B===i.FLOAT&&(Q=i.RG32F),B===i.HALF_FLOAT&&(Q=i.RG16F),B===i.UNSIGNED_BYTE&&(Q=i.RG8)),w===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Q=i.RG8UI),B===i.UNSIGNED_SHORT&&(Q=i.RG16UI),B===i.UNSIGNED_INT&&(Q=i.RG32UI),B===i.BYTE&&(Q=i.RG8I),B===i.SHORT&&(Q=i.RG16I),B===i.INT&&(Q=i.RG32I)),w===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),w===i.RGBA){let Pe=j?ja:dt.getTransfer(Z);B===i.FLOAT&&(Q=i.RGBA32F),B===i.HALF_FLOAT&&(Q=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Q=Pe===gt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function x(T,w){let B;return T?w===null||w===ts||w===ns?B=i.DEPTH24_STENCIL8:w===xi?B=i.DEPTH32F_STENCIL8:w===Xa&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===ts||w===ns?B=i.DEPTH_COMPONENT24:w===xi?B=i.DEPTH_COMPONENT32F:w===Xa&&(B=i.DEPTH_COMPONENT16),B}function b(T,w){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==gn&&T.minFilter!==zn?Math.log2(Math.max(w.width,w.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?w.mipmaps.length:1}function P(T){let w=T.target;w.removeEventListener("dispose",P),A(w),w.isVideoTexture&&d.delete(w)}function E(T){let w=T.target;w.removeEventListener("dispose",E),M(w)}function A(T){let w=n.get(T);if(w.__webglInit===void 0)return;let B=T.source,Z=h.get(B);if(Z){let j=Z[w.__cacheKey];j.usedTimes--,j.usedTimes===0&&I(T),Object.keys(Z).length===0&&h.delete(B)}n.remove(T)}function I(T){let w=n.get(T);i.deleteTexture(w.__webglTexture);let B=T.source,Z=h.get(B);delete Z[w.__cacheKey],a.memory.textures--}function M(T){let w=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(w.__webglFramebuffer[Z]))for(let j=0;j<w.__webglFramebuffer[Z].length;j++)i.deleteFramebuffer(w.__webglFramebuffer[Z][j]);else i.deleteFramebuffer(w.__webglFramebuffer[Z]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[Z])}else{if(Array.isArray(w.__webglFramebuffer))for(let Z=0;Z<w.__webglFramebuffer.length;Z++)i.deleteFramebuffer(w.__webglFramebuffer[Z]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Z=0;Z<w.__webglColorRenderbuffer.length;Z++)w.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[Z]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let B=T.textures;for(let Z=0,j=B.length;Z<j;Z++){let Q=n.get(B[Z]);Q.__webglTexture&&(i.deleteTexture(Q.__webglTexture),a.memory.textures--),n.remove(B[Z])}n.remove(T)}let v=0;function R(){v=0}function z(){let T=v;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),v+=1,T}function F(T){let w=[];return w.push(T.wrapS),w.push(T.wrapT),w.push(T.wrapR||0),w.push(T.magFilter),w.push(T.minFilter),w.push(T.anisotropy),w.push(T.internalFormat),w.push(T.format),w.push(T.type),w.push(T.generateMipmaps),w.push(T.premultiplyAlpha),w.push(T.flipY),w.push(T.unpackAlignment),w.push(T.colorSpace),w.join()}function H(T,w){let B=n.get(T);if(T.isVideoTexture&&be(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){let Z=T.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{it(B,T,w);return}}t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+w)}function q(T,w){let B=n.get(T);if(T.version>0&&B.__version!==T.version){it(B,T,w);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+w)}function V(T,w){let B=n.get(T);if(T.version>0&&B.__version!==T.version){it(B,T,w);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+w)}function ne(T,w){let B=n.get(T);if(T.version>0&&B.__version!==T.version){W(B,T,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+w)}let G={[Vn]:i.REPEAT,[cr]:i.CLAMP_TO_EDGE,[Tc]:i.MIRRORED_REPEAT},ve={[gn]:i.NEAREST,[Op]:i.NEAREST_MIPMAP_NEAREST,[ga]:i.NEAREST_MIPMAP_LINEAR,[zn]:i.LINEAR,[Hl]:i.LINEAR_MIPMAP_NEAREST,[dr]:i.LINEAR_MIPMAP_LINEAR},Ee={[Jp]:i.NEVER,[im]:i.ALWAYS,[Kp]:i.LESS,[ef]:i.LEQUAL,[Qp]:i.EQUAL,[nm]:i.GEQUAL,[em]:i.GREATER,[tm]:i.NOTEQUAL};function Se(T,w){if(w.type===xi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===zn||w.magFilter===Hl||w.magFilter===ga||w.magFilter===dr||w.minFilter===zn||w.minFilter===Hl||w.minFilter===ga||w.minFilter===dr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,G[w.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,G[w.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,G[w.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ve[w.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ve[w.minFilter]),w.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Ee[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===gn||w.minFilter!==ga&&w.minFilter!==dr||w.type===xi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Ze(T,w){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,w.addEventListener("dispose",P));let Z=w.source,j=h.get(Z);j===void 0&&(j={},h.set(Z,j));let Q=F(w);if(Q!==T.__cacheKey){j[Q]===void 0&&(j[Q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),j[Q].usedTimes++;let Pe=j[T.__cacheKey];Pe!==void 0&&(j[T.__cacheKey].usedTimes--,Pe.usedTimes===0&&I(w)),T.__cacheKey=Q,T.__webglTexture=j[Q].texture}return B}function it(T,w,B){let Z=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Z=i.TEXTURE_3D);let j=Ze(T,w),Q=w.source;t.bindTexture(Z,T.__webglTexture,i.TEXTURE0+B);let Pe=n.get(Q);if(Q.version!==Pe.__version||j===!0){t.activeTexture(i.TEXTURE0+B);let ue=dt.getPrimaries(dt.workingColorSpace),pe=w.colorSpace===ki?null:dt.getPrimaries(w.colorSpace),qe=w.colorSpace===ki||ue===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe);let se=y(w.image,!1,r.maxTextureSize);se=xe(w,se);let Ce=s.convert(w.format,w.colorSpace),Ke=s.convert(w.type),Oe=_(w.internalFormat,Ce,Ke,w.colorSpace,w.isVideoTexture);Se(Z,w);let ye,Je=w.mipmaps,Qe=w.isVideoTexture!==!0,Pt=Pe.__version===void 0||j===!0,D=Q.dataReady,_e=b(w,se);if(w.isDepthTexture)Oe=x(w.format===is,w.type),Pt&&(Qe?t.texStorage2D(i.TEXTURE_2D,1,Oe,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,Oe,se.width,se.height,0,Ce,Ke,null));else if(w.isDataTexture)if(Je.length>0){Qe&&Pt&&t.texStorage2D(i.TEXTURE_2D,_e,Oe,Je[0].width,Je[0].height);for(let $=0,Y=Je.length;$<Y;$++)ye=Je[$],Qe?D&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,ye.width,ye.height,Ce,Ke,ye.data):t.texImage2D(i.TEXTURE_2D,$,Oe,ye.width,ye.height,0,Ce,Ke,ye.data);w.generateMipmaps=!1}else Qe?(Pt&&t.texStorage2D(i.TEXTURE_2D,_e,Oe,se.width,se.height),D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,se.width,se.height,Ce,Ke,se.data)):t.texImage2D(i.TEXTURE_2D,0,Oe,se.width,se.height,0,Ce,Ke,se.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Qe&&Pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Oe,Je[0].width,Je[0].height,se.depth);for(let $=0,Y=Je.length;$<Y;$++)if(ye=Je[$],w.format!==Zn)if(Ce!==null)if(Qe){if(D)if(w.layerUpdates.size>0){for(let le of w.layerUpdates){let Be=ye.width*ye.height;t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,le,ye.width,ye.height,1,Ce,ye.data.slice(Be*le,Be*(le+1)),0,0)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ye.width,ye.height,se.depth,Ce,ye.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,Oe,ye.width,ye.height,se.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qe?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ye.width,ye.height,se.depth,Ce,Ke,ye.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,Oe,ye.width,ye.height,se.depth,0,Ce,Ke,ye.data)}else{Qe&&Pt&&t.texStorage2D(i.TEXTURE_2D,_e,Oe,Je[0].width,Je[0].height);for(let $=0,Y=Je.length;$<Y;$++)ye=Je[$],w.format!==Zn?Ce!==null?Qe?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,ye.width,ye.height,Ce,ye.data):t.compressedTexImage2D(i.TEXTURE_2D,$,Oe,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qe?D&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,ye.width,ye.height,Ce,Ke,ye.data):t.texImage2D(i.TEXTURE_2D,$,Oe,ye.width,ye.height,0,Ce,Ke,ye.data)}else if(w.isDataArrayTexture)if(Qe){if(Pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Oe,se.width,se.height,se.depth),D)if(w.layerUpdates.size>0){let $;switch(Ke){case i.UNSIGNED_BYTE:switch(Ce){case i.ALPHA:$=1;break;case i.LUMINANCE:$=1;break;case i.LUMINANCE_ALPHA:$=2;break;case i.RGB:$=3;break;case i.RGBA:$=4;break;default:throw new Error(`Unknown texel size for format ${Ce}.`)}break;case i.UNSIGNED_SHORT_4_4_4_4:case i.UNSIGNED_SHORT_5_5_5_1:case i.UNSIGNED_SHORT_5_6_5:$=1;break;default:throw new Error(`Unknown texel size for type ${Ke}.`)}let Y=se.width*se.height*$;for(let le of w.layerUpdates)t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,le,se.width,se.height,1,Ce,Ke,se.data.slice(Y*le,Y*(le+1)));w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,Ce,Ke,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Oe,se.width,se.height,se.depth,0,Ce,Ke,se.data);else if(w.isData3DTexture)Qe?(Pt&&t.texStorage3D(i.TEXTURE_3D,_e,Oe,se.width,se.height,se.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,Ce,Ke,se.data)):t.texImage3D(i.TEXTURE_3D,0,Oe,se.width,se.height,se.depth,0,Ce,Ke,se.data);else if(w.isFramebufferTexture){if(Pt)if(Qe)t.texStorage2D(i.TEXTURE_2D,_e,Oe,se.width,se.height);else{let $=se.width,Y=se.height;for(let le=0;le<_e;le++)t.texImage2D(i.TEXTURE_2D,le,Oe,$,Y,0,Ce,Ke,null),$>>=1,Y>>=1}}else if(Je.length>0){if(Qe&&Pt){let $=Ve(Je[0]);t.texStorage2D(i.TEXTURE_2D,_e,Oe,$.width,$.height)}for(let $=0,Y=Je.length;$<Y;$++)ye=Je[$],Qe?D&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,Ce,Ke,ye):t.texImage2D(i.TEXTURE_2D,$,Oe,Ce,Ke,ye);w.generateMipmaps=!1}else if(Qe){if(Pt){let $=Ve(se);t.texStorage2D(i.TEXTURE_2D,_e,Oe,$.width,$.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ce,Ke,se)}else t.texImage2D(i.TEXTURE_2D,0,Oe,Ce,Ke,se);p(w)&&m(Z),Pe.__version=Q.version,w.onUpdate&&w.onUpdate(w)}T.__version=w.version}function W(T,w,B){if(w.image.length!==6)return;let Z=Ze(T,w),j=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);let Q=n.get(j);if(j.version!==Q.__version||Z===!0){t.activeTexture(i.TEXTURE0+B);let Pe=dt.getPrimaries(dt.workingColorSpace),ue=w.colorSpace===ki?null:dt.getPrimaries(w.colorSpace),pe=w.colorSpace===ki||Pe===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);let qe=w.isCompressedTexture||w.image[0].isCompressedTexture,se=w.image[0]&&w.image[0].isDataTexture,Ce=[];for(let Y=0;Y<6;Y++)!qe&&!se?Ce[Y]=y(w.image[Y],!0,r.maxCubemapSize):Ce[Y]=se?w.image[Y].image:w.image[Y],Ce[Y]=xe(w,Ce[Y]);let Ke=Ce[0],Oe=s.convert(w.format,w.colorSpace),ye=s.convert(w.type),Je=_(w.internalFormat,Oe,ye,w.colorSpace),Qe=w.isVideoTexture!==!0,Pt=Q.__version===void 0||Z===!0,D=j.dataReady,_e=b(w,Ke);Se(i.TEXTURE_CUBE_MAP,w);let $;if(qe){Qe&&Pt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,Je,Ke.width,Ke.height);for(let Y=0;Y<6;Y++){$=Ce[Y].mipmaps;for(let le=0;le<$.length;le++){let Be=$[le];w.format!==Zn?Oe!==null?Qe?D&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le,0,0,Be.width,Be.height,Oe,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le,Je,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Qe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le,0,0,Be.width,Be.height,Oe,ye,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le,Je,Be.width,Be.height,0,Oe,ye,Be.data)}}}else{if($=w.mipmaps,Qe&&Pt){$.length>0&&_e++;let Y=Ve(Ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,Je,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(se){Qe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ce[Y].width,Ce[Y].height,Oe,ye,Ce[Y].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Je,Ce[Y].width,Ce[Y].height,0,Oe,ye,Ce[Y].data);for(let le=0;le<$.length;le++){let rt=$[le].image[Y].image;Qe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le+1,0,0,rt.width,rt.height,Oe,ye,rt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le+1,Je,rt.width,rt.height,0,Oe,ye,rt.data)}}else{Qe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Oe,ye,Ce[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Je,Oe,ye,Ce[Y]);for(let le=0;le<$.length;le++){let Be=$[le];Qe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le+1,0,0,Oe,ye,Be.image[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,le+1,Je,Oe,ye,Be.image[Y])}}}p(w)&&m(i.TEXTURE_CUBE_MAP),Q.__version=j.version,w.onUpdate&&w.onUpdate(w)}T.__version=w.version}function ie(T,w,B,Z,j,Q){let Pe=s.convert(B.format,B.colorSpace),ue=s.convert(B.type),pe=_(B.internalFormat,Pe,ue,B.colorSpace);if(!n.get(w).__hasExternalTextures){let se=Math.max(1,w.width>>Q),Ce=Math.max(1,w.height>>Q);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,Q,pe,se,Ce,w.depth,0,Pe,ue,null):t.texImage2D(j,Q,pe,se,Ce,0,Pe,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),te(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,j,n.get(B).__webglTexture,0,ee(w)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,j,n.get(B).__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Me(T,w,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),w.depthBuffer){let Z=w.depthTexture,j=Z&&Z.isDepthTexture?Z.type:null,Q=x(w.stencilBuffer,j),Pe=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=ee(w);te(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ue,Q,w.width,w.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,Q,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,Q,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pe,i.RENDERBUFFER,T)}else{let Z=w.textures;for(let j=0;j<Z.length;j++){let Q=Z[j],Pe=s.convert(Q.format,Q.colorSpace),ue=s.convert(Q.type),pe=_(Q.internalFormat,Pe,ue,Q.colorSpace),qe=ee(w);B&&te(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,qe,pe,w.width,w.height):te(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qe,pe,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,pe,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ce(T,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),H(w.depthTexture,0);let Z=n.get(w.depthTexture).__webglTexture,j=ee(w);if(w.depthTexture.format===Zr)te(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(w.depthTexture.format===is)te(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Ge(T){let w=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!w.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");ce(w.__webglFramebuffer,T)}else if(B){w.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[Z]),w.__webglDepthbuffer[Z]=i.createRenderbuffer(),Me(w.__webglDepthbuffer[Z],T,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=i.createRenderbuffer(),Me(w.__webglDepthbuffer,T,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function $e(T,w,B){let Z=n.get(T);w!==void 0&&ie(Z.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Ge(T)}function He(T){let w=T.texture,B=n.get(T),Z=n.get(w);T.addEventListener("dispose",E);let j=T.textures,Q=T.isWebGLCubeRenderTarget===!0,Pe=j.length>1;if(Pe||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=w.version,a.memory.textures++),Q){B.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer[ue]=[];for(let pe=0;pe<w.mipmaps.length;pe++)B.__webglFramebuffer[ue][pe]=i.createFramebuffer()}else B.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer=[];for(let ue=0;ue<w.mipmaps.length;ue++)B.__webglFramebuffer[ue]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Pe)for(let ue=0,pe=j.length;ue<pe;ue++){let qe=n.get(j[ue]);qe.__webglTexture===void 0&&(qe.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&te(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ue=0;ue<j.length;ue++){let pe=j[ue];B.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ue]);let qe=s.convert(pe.format,pe.colorSpace),se=s.convert(pe.type),Ce=_(pe.internalFormat,qe,se,pe.colorSpace,T.isXRRenderTarget===!0),Ke=ee(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ke,Ce,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,B.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Me(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Q){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Se(i.TEXTURE_CUBE_MAP,w);for(let ue=0;ue<6;ue++)if(w.mipmaps&&w.mipmaps.length>0)for(let pe=0;pe<w.mipmaps.length;pe++)ie(B.__webglFramebuffer[ue][pe],T,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,pe);else ie(B.__webglFramebuffer[ue],T,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);p(w)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let ue=0,pe=j.length;ue<pe;ue++){let qe=j[ue],se=n.get(qe);t.bindTexture(i.TEXTURE_2D,se.__webglTexture),Se(i.TEXTURE_2D,qe),ie(B.__webglFramebuffer,T,qe,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,0),p(qe)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ue=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,Z.__webglTexture),Se(ue,w),w.mipmaps&&w.mipmaps.length>0)for(let pe=0;pe<w.mipmaps.length;pe++)ie(B.__webglFramebuffer[pe],T,w,i.COLOR_ATTACHMENT0,ue,pe);else ie(B.__webglFramebuffer,T,w,i.COLOR_ATTACHMENT0,ue,0);p(w)&&m(ue),t.unbindTexture()}T.depthBuffer&&Ge(T)}function L(T){let w=T.textures;for(let B=0,Z=w.length;B<Z;B++){let j=w[B];if(p(j)){let Q=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Pe=n.get(j).__webglTexture;t.bindTexture(Q,Pe),m(Q),t.unbindTexture()}}}let X=[],J=[];function re(T){if(T.samples>0){if(te(T)===!1){let w=T.textures,B=T.width,Z=T.height,j=i.COLOR_BUFFER_BIT,Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pe=n.get(T),ue=w.length>1;if(ue)for(let pe=0;pe<w.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let pe=0;pe<w.length;pe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[pe]);let qe=n.get(w[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,qe,0)}i.blitFramebuffer(0,0,B,Z,0,0,B,Z,j,i.NEAREST),l===!0&&(X.length=0,J.length=0,X.push(i.COLOR_ATTACHMENT0+pe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(X.push(Q),J.push(Q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,J)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,X))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let pe=0;pe<w.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[pe]);let qe=n.get(w[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,qe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let w=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function ee(T){return Math.min(r.maxSamples,T.samples)}function te(T){let w=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function be(T){let w=a.render.frame;d.get(T)!==w&&(d.set(T,w),T.update())}function xe(T,w){let B=T.colorSpace,Z=T.format,j=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Wi&&B!==ki&&(dt.getTransfer(B)===gt?(Z!==Zn||j!==zi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),w}function Ve(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=R,this.setTexture2D=H,this.setTexture2DArray=q,this.setTexture3D=V,this.setTextureCube=ne,this.rebindTextures=$e,this.setupRenderTarget=He,this.updateRenderTargetMipmap=L,this.updateMultisampleRenderTarget=re,this.setupDepthRenderbuffer=Ge,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=te}function av(i,e){function t(n,r=ki){let s,a=dt.getTransfer(r);if(n===zi)return i.UNSIGNED_BYTE;if(n===Xh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Hp)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Bp)return i.BYTE;if(n===zp)return i.SHORT;if(n===Xa)return i.UNSIGNED_SHORT;if(n===qh)return i.INT;if(n===ts)return i.UNSIGNED_INT;if(n===xi)return i.FLOAT;if(n===Do)return i.HALF_FLOAT;if(n===Vp)return i.ALPHA;if(n===Gp)return i.RGB;if(n===Zn)return i.RGBA;if(n===Wp)return i.LUMINANCE;if(n===$p)return i.LUMINANCE_ALPHA;if(n===Zr)return i.DEPTH_COMPONENT;if(n===is)return i.DEPTH_STENCIL;if(n===jh)return i.RED;if(n===Zh)return i.RED_INTEGER;if(n===qp)return i.RG;if(n===Jh)return i.RG_INTEGER;if(n===Kh)return i.RGBA_INTEGER;if(n===Vl||n===Gl||n===Wl||n===$l)if(a===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Vl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Gl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Wl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$l)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Vl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Gl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Wl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$l)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===hu||n===fu||n===pu||n===mu)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===hu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===mu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===gu||n===xu||n===yu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===gu||n===xu)return a===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===yu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===vu||n===bu||n===_u||n===wu||n===Su||n===Mu||n===Eu||n===Tu||n===Au||n===Cu||n===Ru||n===Pu||n===Iu||n===Lu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===vu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_u)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Su)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Mu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Eu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Tu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Au)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Cu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ru)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Pu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Iu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Lu)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ql||n===Du||n===Uu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ql)return a===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Du)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Uu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xp||n===ku||n===Nu||n===Fu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===ql)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ku)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Nu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Fu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ns?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Vc=class extends hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},ke=class extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}},ov={type:"move"},ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let p=t.getJointPose(y,n),m=this._getHandJoint(c,y);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ov)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},lv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cv=`
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

}`,Gc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let r=new fn,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ti({vertexShader:lv,fragmentShader:cv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new vt(new bi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}},Wc=class extends Hi{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,g=null,y=new Gc,p=t.getContextAttributes(),m=null,_=null,x=[],b=[],P=new K,E=null,A=new hn;A.layers.enable(1),A.viewport=new jt;let I=new hn;I.layers.enable(2),I.viewport=new jt;let M=[A,I],v=new Vc;v.layers.enable(1),v.layers.enable(2);let R=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ie=x[W];return ie===void 0&&(ie=new ks,x[W]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(W){let ie=x[W];return ie===void 0&&(ie=new ks,x[W]=ie),ie.getGripSpace()},this.getHand=function(W){let ie=x[W];return ie===void 0&&(ie=new ks,x[W]=ie),ie.getHandSpace()};function F(W){let ie=b.indexOf(W.inputSource);if(ie===-1)return;let Me=x[ie];Me!==void 0&&(Me.update(W.inputSource,W.frame,c||a),Me.dispatchEvent({type:W.type,data:W.inputSource}))}function H(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",q);for(let W=0;W<x.length;W++){let ie=b[W];ie!==null&&(b[W]=null,x[W].disconnect(ie))}R=null,z=null,y.reset(),e.setRenderTarget(m),f=null,h=null,u=null,r=null,_=null,it.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",H),r.addEventListener("inputsourceschange",q),p.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(P),r.renderState.layers===void 0){let ie={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new vi(f.framebufferWidth,f.framebufferHeight,{format:Zn,type:zi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ie=null,Me=null,ce=null;p.depth&&(ce=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=p.stencil?is:Zr,Me=p.stencil?ns:ts);let Ge={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};u=new XRWebGLBinding(r,t),h=u.createProjectionLayer(Ge),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new vi(h.textureWidth,h.textureHeight,{format:Zn,type:zi,depthTexture:new lo(h.textureWidth,h.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),it.setContext(r),it.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function q(W){for(let ie=0;ie<W.removed.length;ie++){let Me=W.removed[ie],ce=b.indexOf(Me);ce>=0&&(b[ce]=null,x[ce].disconnect(Me))}for(let ie=0;ie<W.added.length;ie++){let Me=W.added[ie],ce=b.indexOf(Me);if(ce===-1){for(let $e=0;$e<x.length;$e++)if($e>=b.length){b.push(Me),ce=$e;break}else if(b[$e]===null){b[$e]=Me,ce=$e;break}if(ce===-1)break}let Ge=x[ce];Ge&&Ge.connect(Me)}}let V=new C,ne=new C;function G(W,ie,Me){V.setFromMatrixPosition(ie.matrixWorld),ne.setFromMatrixPosition(Me.matrixWorld);let ce=V.distanceTo(ne),Ge=ie.projectionMatrix.elements,$e=Me.projectionMatrix.elements,He=Ge[14]/(Ge[10]-1),L=Ge[14]/(Ge[10]+1),X=(Ge[9]+1)/Ge[5],J=(Ge[9]-1)/Ge[5],re=(Ge[8]-1)/Ge[0],ee=($e[8]+1)/$e[0],te=He*re,be=He*ee,xe=ce/(-re+ee),Ve=xe*-re;ie.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Ve),W.translateZ(xe),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();let T=He+xe,w=L+xe,B=te-Ve,Z=be+(ce-Ve),j=X*L/w*T,Q=J*L/w*T;W.projectionMatrix.makePerspective(B,Z,j,Q,T,w),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function ve(W,ie){ie===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ie.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;y.texture!==null&&(W.near=y.depthNear,W.far=y.depthFar),v.near=I.near=A.near=W.near,v.far=I.far=A.far=W.far,(R!==v.near||z!==v.far)&&(r.updateRenderState({depthNear:v.near,depthFar:v.far}),R=v.near,z=v.far,A.near=R,A.far=z,I.near=R,I.far=z,A.updateProjectionMatrix(),I.updateProjectionMatrix(),W.updateProjectionMatrix());let ie=W.parent,Me=v.cameras;ve(v,ie);for(let ce=0;ce<Me.length;ce++)ve(Me[ce],ie);Me.length===2?G(v,A,I):v.projectionMatrix.copy(A.projectionMatrix),Ee(W,v,ie)};function Ee(W,ie,Me){Me===null?W.matrix.copy(ie.matrixWorld):(W.matrix.copy(Me.matrixWorld),W.matrix.invert(),W.matrix.multiply(ie.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ie.projectionMatrix),W.projectionMatrixInverse.copy(ie.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=zs*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(W){l=W,h!==null&&(h.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(v)};let Se=null;function Ze(W,ie){if(d=ie.getViewerPose(c||a),g=ie,d!==null){let Me=d.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let ce=!1;Me.length!==v.cameras.length&&(v.cameras.length=0,ce=!0);for(let $e=0;$e<Me.length;$e++){let He=Me[$e],L=null;if(f!==null)L=f.getViewport(He);else{let J=u.getViewSubImage(h,He);L=J.viewport,$e===0&&(e.setRenderTargetTextures(_,J.colorTexture,h.ignoreDepthValues?void 0:J.depthStencilTexture),e.setRenderTarget(_))}let X=M[$e];X===void 0&&(X=new hn,X.layers.enable($e),X.viewport=new jt,M[$e]=X),X.matrix.fromArray(He.transform.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale),X.projectionMatrix.fromArray(He.projectionMatrix),X.projectionMatrixInverse.copy(X.projectionMatrix).invert(),X.viewport.set(L.x,L.y,L.width,L.height),$e===0&&(v.matrix.copy(X.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ce===!0&&v.cameras.push(X)}let Ge=r.enabledFeatures;if(Ge&&Ge.includes("depth-sensing")){let $e=u.getDepthInformation(Me[0]);$e&&$e.isValid&&$e.texture&&y.init(e,$e,r.renderState)}}for(let Me=0;Me<x.length;Me++){let ce=b[Me],Ge=x[Me];ce!==null&&Ge!==void 0&&Ge.update(ce,ie,c||a)}Se&&Se(W,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),g=null}let it=new sf;it.setAnimationLoop(Ze),this.setAnimationLoop=function(W){Se=W},this.dispose=function(){}}},sr=new Rn,dv=new pt;function uv(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,rf(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,_,x,b){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),u(p,m)):m.isMeshPhongMaterial?(s(p,m),d(p,m)):m.isMeshStandardMaterial?(s(p,m),h(p,m),m.isMeshPhysicalMaterial&&f(p,m,b)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),y(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,_,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===xn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===xn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let _=e.get(m),x=_.envMap,b=_.envMapRotation;x&&(p.envMap.value=x,sr.copy(b),sr.x*=-1,sr.y*=-1,sr.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(sr.y*=-1,sr.z*=-1),p.envMapRotation.value.setFromMatrix4(dv.makeRotationFromEuler(sr)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,_,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*_,p.scale.value=x*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function d(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,_){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===xn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function y(p,m){let _=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function hv(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,x){let b=x.program;n.uniformBlockBinding(_,b)}function c(_,x){let b=r[_.id];b===void 0&&(g(_),b=d(_),r[_.id]=b,_.addEventListener("dispose",p));let P=x.program;n.updateUBOMapping(_,P);let E=e.render.frame;s[_.id]!==E&&(h(_),s[_.id]=E)}function d(_){let x=u();_.__bindingPointIndex=x;let b=i.createBuffer(),P=_.__size,E=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,P,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,b),b}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){let x=r[_.id],b=_.uniforms,P=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let E=0,A=b.length;E<A;E++){let I=Array.isArray(b[E])?b[E]:[b[E]];for(let M=0,v=I.length;M<v;M++){let R=I[M];if(f(R,E,M,P)===!0){let z=R.__offset,F=Array.isArray(R.value)?R.value:[R.value],H=0;for(let q=0;q<F.length;q++){let V=F[q],ne=y(V);typeof V=="number"||typeof V=="boolean"?(R.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,z+H,R.__data)):V.isMatrix3?(R.__data[0]=V.elements[0],R.__data[1]=V.elements[1],R.__data[2]=V.elements[2],R.__data[3]=0,R.__data[4]=V.elements[3],R.__data[5]=V.elements[4],R.__data[6]=V.elements[5],R.__data[7]=0,R.__data[8]=V.elements[6],R.__data[9]=V.elements[7],R.__data[10]=V.elements[8],R.__data[11]=0):(V.toArray(R.__data,H),H+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,x,b,P){let E=_.value,A=x+"_"+b;if(P[A]===void 0)return typeof E=="number"||typeof E=="boolean"?P[A]=E:P[A]=E.clone(),!0;{let I=P[A];if(typeof E=="number"||typeof E=="boolean"){if(I!==E)return P[A]=E,!0}else if(I.equals(E)===!1)return I.copy(E),!0}return!1}function g(_){let x=_.uniforms,b=0,P=16;for(let A=0,I=x.length;A<I;A++){let M=Array.isArray(x[A])?x[A]:[x[A]];for(let v=0,R=M.length;v<R;v++){let z=M[v],F=Array.isArray(z.value)?z.value:[z.value];for(let H=0,q=F.length;H<q;H++){let V=F[H],ne=y(V),G=b%P;G!==0&&P-G<ne.boundary&&(b+=P-G),z.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=b,b+=ne.storage}}}let E=b%P;return E>0&&(b+=P-E),_.__size=b,_.__cache={},this}function y(_){let x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function p(_){let x=_.target;x.removeEventListener("dispose",p);let b=a.indexOf(x.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function m(){for(let _ in r)i.deleteBuffer(r[_]);a=[],r={},s={}}return{bind:l,update:c,dispose:m}}var co=class{constructor(e={}){let{canvas:t=bm(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=a;let f=new Uint32Array(4),g=new Int32Array(4),y=null,p=null,m=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Lt,this.toneMapping=Fi,this.toneMappingExposure=1;let x=this,b=!1,P=0,E=0,A=null,I=-1,M=null,v=new jt,R=new jt,z=null,F=new Fe(0),H=0,q=t.width,V=t.height,ne=1,G=null,ve=null,Ee=new jt(0,0,q,V),Se=new jt(0,0,q,V),Ze=!1,it=new Gs,W=!1,ie=!1,Me=new pt,ce=new C,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},$e=!1;function He(){return A===null?ne:1}let L=n;function X(S,U){return t.getContext(S,U)}try{let S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r165"),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",$,!1),t.addEventListener("webglcontextcreationerror",Y,!1),L===null){let U="webgl2";if(L=X(U,S),L===null)throw X(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let J,re,ee,te,be,xe,Ve,T,w,B,Z,j,Q,Pe,ue,pe,qe,se,Ce,Ke,Oe,ye,Je,Qe;function Pt(){J=new I0(L),J.init(),ye=new av(L,J),re=new E0(L,J,e,ye),ee=new rv(L),te=new U0(L),be=new qy,xe=new sv(L,J,ee,be,re,ye,te),Ve=new A0(x),T=new P0(x),w=new Hm(L),Je=new S0(L,w),B=new L0(L,w,te,Je),Z=new N0(L,B,w,te),Ce=new k0(L,re,xe),pe=new T0(be),j=new $y(x,Ve,T,J,re,Je,pe),Q=new uv(x,be),Pe=new Yy,ue=new ev(J),se=new w0(x,Ve,T,ee,Z,h,l),qe=new iv(x,Z,re),Qe=new hv(L,te,re,ee),Ke=new M0(L,J,te),Oe=new D0(L,J,te),te.programs=j.programs,x.capabilities=re,x.extensions=J,x.properties=be,x.renderLists=Pe,x.shadowMap=qe,x.state=ee,x.info=te}Pt();let D=new Wc(x,L);this.xr=D,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let S=J.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=J.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(S){S!==void 0&&(ne=S,this.setSize(q,V,!1))},this.getSize=function(S){return S.set(q,V)},this.setSize=function(S,U,N=!0){if(D.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=S,V=U,t.width=Math.floor(S*ne),t.height=Math.floor(U*ne),N===!0&&(t.style.width=S+"px",t.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(q*ne,V*ne).floor()},this.setDrawingBufferSize=function(S,U,N){q=S,V=U,ne=N,t.width=Math.floor(S*N),t.height=Math.floor(U*N),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(v)},this.getViewport=function(S){return S.copy(Ee)},this.setViewport=function(S,U,N,O){S.isVector4?Ee.set(S.x,S.y,S.z,S.w):Ee.set(S,U,N,O),ee.viewport(v.copy(Ee).multiplyScalar(ne).round())},this.getScissor=function(S){return S.copy(Se)},this.setScissor=function(S,U,N,O){S.isVector4?Se.set(S.x,S.y,S.z,S.w):Se.set(S,U,N,O),ee.scissor(R.copy(Se).multiplyScalar(ne).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(S){ee.setScissorTest(Ze=S)},this.setOpaqueSort=function(S){G=S},this.setTransparentSort=function(S){ve=S},this.getClearColor=function(S){return S.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor.apply(se,arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha.apply(se,arguments)},this.clear=function(S=!0,U=!0,N=!0){let O=0;if(S){let k=!1;if(A!==null){let oe=A.texture.format;k=oe===Kh||oe===Jh||oe===Zh}if(k){let oe=A.texture.type,we=oe===zi||oe===ts||oe===Xa||oe===ns||oe===Xh||oe===Yh,Ae=se.getClearColor(),Re=se.getClearAlpha(),Ue=Ae.r,Ne=Ae.g,De=Ae.b;we?(f[0]=Ue,f[1]=Ne,f[2]=De,f[3]=Re,L.clearBufferuiv(L.COLOR,0,f)):(g[0]=Ue,g[1]=Ne,g[2]=De,g[3]=Re,L.clearBufferiv(L.COLOR,0,g))}else O|=L.COLOR_BUFFER_BIT}U&&(O|=L.DEPTH_BUFFER_BIT),N&&(O|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",$,!1),t.removeEventListener("webglcontextcreationerror",Y,!1),Pe.dispose(),ue.dispose(),be.dispose(),Ve.dispose(),T.dispose(),Z.dispose(),Je.dispose(),Qe.dispose(),j.dispose(),D.dispose(),D.removeEventListener("sessionstart",Xn),D.removeEventListener("sessionend",Yn),Ki.stop()};function _e(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function $(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let S=te.autoReset,U=qe.enabled,N=qe.autoUpdate,O=qe.needsUpdate,k=qe.type;Pt(),te.autoReset=S,qe.enabled=U,qe.autoUpdate=N,qe.needsUpdate=O,qe.type=k}function Y(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function le(S){let U=S.target;U.removeEventListener("dispose",le),Be(U)}function Be(S){rt(S),be.remove(S)}function rt(S){let U=be.get(S).programs;U!==void 0&&(U.forEach(function(N){j.releaseProgram(N)}),S.isShaderMaterial&&j.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,N,O,k,oe){U===null&&(U=Ge);let we=k.isMesh&&k.matrixWorld.determinant()<0,Ae=Kf(S,U,N,O,k);ee.setMaterial(O,we);let Re=N.index,Ue=1;if(O.wireframe===!0){if(Re=B.getWireframeAttribute(N),Re===void 0)return;Ue=2}let Ne=N.drawRange,De=N.attributes.position,at=Ne.start*Ue,Tt=(Ne.start+Ne.count)*Ue;oe!==null&&(at=Math.max(at,oe.start*Ue),Tt=Math.min(Tt,(oe.start+oe.count)*Ue)),Re!==null?(at=Math.max(at,0),Tt=Math.min(Tt,Re.count)):De!=null&&(at=Math.max(at,0),Tt=Math.min(Tt,De.count));let At=Tt-at;if(At<0||At===1/0)return;Je.setup(k,O,Ae,N,Re);let vn,lt=Ke;if(Re!==null&&(vn=w.get(Re),lt=Oe,lt.setIndex(vn)),k.isMesh)O.wireframe===!0?(ee.setLineWidth(O.wireframeLinewidth*He()),lt.setMode(L.LINES)):lt.setMode(L.TRIANGLES);else if(k.isLine){let Ie=O.linewidth;Ie===void 0&&(Ie=1),ee.setLineWidth(Ie*He()),k.isLineSegments?lt.setMode(L.LINES):k.isLineLoop?lt.setMode(L.LINE_LOOP):lt.setMode(L.LINE_STRIP)}else k.isPoints?lt.setMode(L.POINTS):k.isSprite&&lt.setMode(L.TRIANGLES);if(k.isBatchedMesh)k._multiDrawInstances!==null?lt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances):lt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else if(k.isInstancedMesh)lt.renderInstances(at,At,k.count);else if(N.isInstancedBufferGeometry){let Ie=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,cn=Math.min(N.instanceCount,Ie);lt.renderInstances(at,At,cn)}else lt.render(at,At)};function It(S,U,N){S.transparent===!0&&S.side===Bn&&S.forceSinglePass===!1?(S.side=xn,S.needsUpdate=!0,ha(S,U,N),S.side=Bi,S.needsUpdate=!0,ha(S,U,N),S.side=Bn):ha(S,U,N)}this.compile=function(S,U,N=null){N===null&&(N=S),p=ue.get(N),p.init(U),_.push(p),N.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),S!==N&&S.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let O=new Set;return S.traverse(function(k){let oe=k.material;if(oe)if(Array.isArray(oe))for(let we=0;we<oe.length;we++){let Ae=oe[we];It(Ae,N,k),O.add(Ae)}else It(oe,N,k),O.add(oe)}),_.pop(),p=null,O},this.compileAsync=function(S,U,N=null){let O=this.compile(S,U,N);return new Promise(k=>{function oe(){if(O.forEach(function(we){be.get(we).currentProgram.isReady()&&O.delete(we)}),O.size===0){k(S);return}setTimeout(oe,10)}J.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let $t=null;function ut(S){$t&&$t(S)}function Xn(){Ki.stop()}function Yn(){Ki.start()}let Ki=new sf;Ki.setAnimationLoop(ut),typeof self<"u"&&Ki.setContext(self),this.setAnimationLoop=function(S){$t=S,D.setAnimationLoop(S),S===null?Ki.stop():Ki.start()},D.addEventListener("sessionstart",Xn),D.addEventListener("sessionend",Yn),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),D.enabled===!0&&D.isPresenting===!0&&(D.cameraAutoUpdate===!0&&D.updateCamera(U),U=D.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,U,A),p=ue.get(S,_.length),p.init(U),_.push(p),Me.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),it.setFromProjectionMatrix(Me),ie=this.localClippingEnabled,W=pe.init(this.clippingPlanes,ie),y=Pe.get(S,m.length),y.init(),m.push(y),D.enabled===!0&&D.isPresenting===!0){let oe=x.xr.getDepthSensingMesh();oe!==null&&nl(oe,U,-1/0,x.sortObjects)}nl(S,U,0,x.sortObjects),y.finish(),x.sortObjects===!0&&y.sort(G,ve),$e=D.enabled===!1||D.isPresenting===!1||D.hasDepthSensing()===!1,$e&&se.addToRenderList(y,S),this.info.render.frame++,W===!0&&pe.beginShadows();let N=p.state.shadowsArray;qe.render(N,S,U),W===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset();let O=y.opaque,k=y.transmissive;if(p.setupLights(),U.isArrayCamera){let oe=U.cameras;if(k.length>0)for(let we=0,Ae=oe.length;we<Ae;we++){let Re=oe[we];Jd(O,k,S,Re)}$e&&se.render(S);for(let we=0,Ae=oe.length;we<Ae;we++){let Re=oe[we];Zd(y,S,Re,Re.viewport)}}else k.length>0&&Jd(O,k,S,U),$e&&se.render(S),Zd(y,S,U);A!==null&&(xe.updateMultisampleRenderTarget(A),xe.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(x,S,U),Je.resetDefaultState(),I=-1,M=null,_.pop(),_.length>0?(p=_[_.length-1],W===!0&&pe.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?y=m[m.length-1]:y=null};function nl(S,U,N,O){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)N=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||it.intersectsSprite(S)){O&&ce.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Me);let we=Z.update(S),Ae=S.material;Ae.visible&&y.push(S,we,Ae,N,ce.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||it.intersectsObject(S))){let we=Z.update(S),Ae=S.material;if(O&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),ce.copy(S.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),ce.copy(we.boundingSphere.center)),ce.applyMatrix4(S.matrixWorld).applyMatrix4(Me)),Array.isArray(Ae)){let Re=we.groups;for(let Ue=0,Ne=Re.length;Ue<Ne;Ue++){let De=Re[Ue],at=Ae[De.materialIndex];at&&at.visible&&y.push(S,we,at,N,ce.z,De)}}else Ae.visible&&y.push(S,we,Ae,N,ce.z,null)}}let oe=S.children;for(let we=0,Ae=oe.length;we<Ae;we++)nl(oe[we],U,N,O)}function Zd(S,U,N,O){let k=S.opaque,oe=S.transmissive,we=S.transparent;p.setupLightsView(N),W===!0&&pe.setGlobalState(x.clippingPlanes,N),O&&ee.viewport(v.copy(O)),k.length>0&&ua(k,U,N),oe.length>0&&ua(oe,U,N),we.length>0&&ua(we,U,N),ee.buffers.depth.setTest(!0),ee.buffers.depth.setMask(!0),ee.buffers.color.setMask(!0),ee.setPolygonOffset(!1)}function Jd(S,U,N,O){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[O.id]===void 0&&(p.state.transmissionRenderTarget[O.id]=new vi(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?Do:zi,minFilter:dr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));let oe=p.state.transmissionRenderTarget[O.id],we=O.viewport||v;oe.setSize(we.z,we.w);let Ae=x.getRenderTarget();x.setRenderTarget(oe),x.getClearColor(F),H=x.getClearAlpha(),H<1&&x.setClearColor(16777215,.5),$e?se.render(N):x.clear();let Re=x.toneMapping;x.toneMapping=Fi;let Ue=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),p.setupLightsView(O),W===!0&&pe.setGlobalState(x.clippingPlanes,O),ua(S,N,O),xe.updateMultisampleRenderTarget(oe),xe.updateRenderTargetMipmap(oe),J.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let De=0,at=U.length;De<at;De++){let Tt=U[De],At=Tt.object,vn=Tt.geometry,lt=Tt.material,Ie=Tt.group;if(lt.side===Bn&&At.layers.test(O.layers)){let cn=lt.side;lt.side=xn,lt.needsUpdate=!0,Kd(At,N,O,vn,lt,Ie),lt.side=cn,lt.needsUpdate=!0,Ne=!0}}Ne===!0&&(xe.updateMultisampleRenderTarget(oe),xe.updateRenderTargetMipmap(oe))}x.setRenderTarget(Ae),x.setClearColor(F,H),Ue!==void 0&&(O.viewport=Ue),x.toneMapping=Re}function ua(S,U,N){let O=U.isScene===!0?U.overrideMaterial:null;for(let k=0,oe=S.length;k<oe;k++){let we=S[k],Ae=we.object,Re=we.geometry,Ue=O===null?we.material:O,Ne=we.group;Ae.layers.test(N.layers)&&Kd(Ae,U,N,Re,Ue,Ne)}}function Kd(S,U,N,O,k,oe){S.onBeforeRender(x,U,N,O,k,oe),S.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(x,U,N,O,S,oe),k.transparent===!0&&k.side===Bn&&k.forceSinglePass===!1?(k.side=xn,k.needsUpdate=!0,x.renderBufferDirect(N,U,O,k,S,oe),k.side=Bi,k.needsUpdate=!0,x.renderBufferDirect(N,U,O,k,S,oe),k.side=Bn):x.renderBufferDirect(N,U,O,k,S,oe),S.onAfterRender(x,U,N,O,k,oe)}function ha(S,U,N){U.isScene!==!0&&(U=Ge);let O=be.get(S),k=p.state.lights,oe=p.state.shadowsArray,we=k.state.version,Ae=j.getParameters(S,k.state,oe,U,N),Re=j.getProgramCacheKey(Ae),Ue=O.programs;O.environment=S.isMeshStandardMaterial?U.environment:null,O.fog=U.fog,O.envMap=(S.isMeshStandardMaterial?T:Ve).get(S.envMap||O.environment),O.envMapRotation=O.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Ue===void 0&&(S.addEventListener("dispose",le),Ue=new Map,O.programs=Ue);let Ne=Ue.get(Re);if(Ne!==void 0){if(O.currentProgram===Ne&&O.lightsStateVersion===we)return eu(S,Ae),Ne}else Ae.uniforms=j.getUniforms(S),S.onBuild(N,Ae,x),S.onBeforeCompile(Ae,x),Ne=j.acquireProgram(Ae,Re),Ue.set(Re,Ne),O.uniforms=Ae.uniforms;let De=O.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(De.clippingPlanes=pe.uniform),eu(S,Ae),O.needsLights=ep(S),O.lightsStateVersion=we,O.needsLights&&(De.ambientLightColor.value=k.state.ambient,De.lightProbe.value=k.state.probe,De.directionalLights.value=k.state.directional,De.directionalLightShadows.value=k.state.directionalShadow,De.spotLights.value=k.state.spot,De.spotLightShadows.value=k.state.spotShadow,De.rectAreaLights.value=k.state.rectArea,De.ltc_1.value=k.state.rectAreaLTC1,De.ltc_2.value=k.state.rectAreaLTC2,De.pointLights.value=k.state.point,De.pointLightShadows.value=k.state.pointShadow,De.hemisphereLights.value=k.state.hemi,De.directionalShadowMap.value=k.state.directionalShadowMap,De.directionalShadowMatrix.value=k.state.directionalShadowMatrix,De.spotShadowMap.value=k.state.spotShadowMap,De.spotLightMatrix.value=k.state.spotLightMatrix,De.spotLightMap.value=k.state.spotLightMap,De.pointShadowMap.value=k.state.pointShadowMap,De.pointShadowMatrix.value=k.state.pointShadowMatrix),O.currentProgram=Ne,O.uniformsList=null,Ne}function Qd(S){if(S.uniformsList===null){let U=S.currentProgram.getUniforms();S.uniformsList=Kr.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function eu(S,U){let N=be.get(S);N.outputColorSpace=U.outputColorSpace,N.batching=U.batching,N.batchingColor=U.batchingColor,N.instancing=U.instancing,N.instancingColor=U.instancingColor,N.instancingMorph=U.instancingMorph,N.skinning=U.skinning,N.morphTargets=U.morphTargets,N.morphNormals=U.morphNormals,N.morphColors=U.morphColors,N.morphTargetsCount=U.morphTargetsCount,N.numClippingPlanes=U.numClippingPlanes,N.numIntersection=U.numClipIntersection,N.vertexAlphas=U.vertexAlphas,N.vertexTangents=U.vertexTangents,N.toneMapping=U.toneMapping}function Kf(S,U,N,O,k){U.isScene!==!0&&(U=Ge),xe.resetTextureUnits();let oe=U.fog,we=O.isMeshStandardMaterial?U.environment:null,Ae=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Wi,Re=(O.isMeshStandardMaterial?T:Ve).get(O.envMap||we),Ue=O.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,Ne=!!N.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),De=!!N.morphAttributes.position,at=!!N.morphAttributes.normal,Tt=!!N.morphAttributes.color,At=Fi;O.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(At=x.toneMapping);let vn=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,lt=vn!==void 0?vn.length:0,Ie=be.get(O),cn=p.state.lights;if(W===!0&&(ie===!0||S!==M)){let Tn=S===M&&O.id===I;pe.setState(O,S,Tn)}let ht=!1;O.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==cn.state.version||Ie.outputColorSpace!==Ae||k.isBatchedMesh&&Ie.batching===!1||!k.isBatchedMesh&&Ie.batching===!0||k.isBatchedMesh&&Ie.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ie.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ie.instancing===!1||!k.isInstancedMesh&&Ie.instancing===!0||k.isSkinnedMesh&&Ie.skinning===!1||!k.isSkinnedMesh&&Ie.skinning===!0||k.isInstancedMesh&&Ie.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ie.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ie.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ie.instancingMorph===!1&&k.morphTexture!==null||Ie.envMap!==Re||O.fog===!0&&Ie.fog!==oe||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==pe.numPlanes||Ie.numIntersection!==pe.numIntersection)||Ie.vertexAlphas!==Ue||Ie.vertexTangents!==Ne||Ie.morphTargets!==De||Ie.morphNormals!==at||Ie.morphColors!==Tt||Ie.toneMapping!==At||Ie.morphTargetsCount!==lt)&&(ht=!0):(ht=!0,Ie.__version=O.version);let ci=Ie.currentProgram;ht===!0&&(ci=ha(O,U,k));let fa=!1,Qi=!1,il=!1,qt=ci.getUniforms(),Ci=Ie.uniforms;if(ee.useProgram(ci.program)&&(fa=!0,Qi=!0,il=!0),O.id!==I&&(I=O.id,Qi=!0),fa||M!==S){qt.setValue(L,"projectionMatrix",S.projectionMatrix),qt.setValue(L,"viewMatrix",S.matrixWorldInverse);let Tn=qt.map.cameraPosition;Tn!==void 0&&Tn.setValue(L,ce.setFromMatrixPosition(S.matrixWorld)),re.logarithmicDepthBuffer&&qt.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&qt.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,Qi=!0,il=!0)}if(k.isSkinnedMesh){qt.setOptional(L,k,"bindMatrix"),qt.setOptional(L,k,"bindMatrixInverse");let Tn=k.skeleton;Tn&&(Tn.boneTexture===null&&Tn.computeBoneTexture(),qt.setValue(L,"boneTexture",Tn.boneTexture,xe))}k.isBatchedMesh&&(qt.setOptional(L,k,"batchingTexture"),qt.setValue(L,"batchingTexture",k._matricesTexture,xe),qt.setOptional(L,k,"batchingColorTexture"),k._colorsTexture!==null&&qt.setValue(L,"batchingColorTexture",k._colorsTexture,xe));let rl=N.morphAttributes;if((rl.position!==void 0||rl.normal!==void 0||rl.color!==void 0)&&Ce.update(k,N,ci),(Qi||Ie.receiveShadow!==k.receiveShadow)&&(Ie.receiveShadow=k.receiveShadow,qt.setValue(L,"receiveShadow",k.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Ci.envMap.value=Re,Ci.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&U.environment!==null&&(Ci.envMapIntensity.value=U.environmentIntensity),Qi&&(qt.setValue(L,"toneMappingExposure",x.toneMappingExposure),Ie.needsLights&&Qf(Ci,il),oe&&O.fog===!0&&Q.refreshFogUniforms(Ci,oe),Q.refreshMaterialUniforms(Ci,O,ne,V,p.state.transmissionRenderTarget[S.id]),Kr.upload(L,Qd(Ie),Ci,xe)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Kr.upload(L,Qd(Ie),Ci,xe),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&qt.setValue(L,"center",k.center),qt.setValue(L,"modelViewMatrix",k.modelViewMatrix),qt.setValue(L,"normalMatrix",k.normalMatrix),qt.setValue(L,"modelMatrix",k.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){let Tn=O.uniformsGroups;for(let sl=0,tp=Tn.length;sl<tp;sl++){let tu=Tn[sl];Qe.update(tu,ci),Qe.bind(tu,ci)}}return ci}function Qf(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function ep(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,U,N){be.get(S.texture).__webglTexture=U,be.get(S.depthTexture).__webglTexture=N;let O=be.get(S);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=N===void 0,O.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,U){let N=be.get(S);N.__webglFramebuffer=U,N.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,N=0){A=S,P=U,E=N;let O=!0,k=null,oe=!1,we=!1;if(S){let Re=be.get(S);Re.__useDefaultFramebuffer!==void 0?(ee.bindFramebuffer(L.FRAMEBUFFER,null),O=!1):Re.__webglFramebuffer===void 0?xe.setupRenderTarget(S):Re.__hasExternalTextures&&xe.rebindTextures(S,be.get(S.texture).__webglTexture,be.get(S.depthTexture).__webglTexture);let Ue=S.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(we=!0);let Ne=be.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ne[U])?k=Ne[U][N]:k=Ne[U],oe=!0):S.samples>0&&xe.useMultisampledRTT(S)===!1?k=be.get(S).__webglMultisampledFramebuffer:Array.isArray(Ne)?k=Ne[N]:k=Ne,v.copy(S.viewport),R.copy(S.scissor),z=S.scissorTest}else v.copy(Ee).multiplyScalar(ne).floor(),R.copy(Se).multiplyScalar(ne).floor(),z=Ze;if(ee.bindFramebuffer(L.FRAMEBUFFER,k)&&O&&ee.drawBuffers(S,k),ee.viewport(v),ee.scissor(R),ee.setScissorTest(z),oe){let Re=be.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,Re.__webglTexture,N)}else if(we){let Re=be.get(S.texture),Ue=U||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Re.__webglTexture,N||0,Ue)}I=-1},this.readRenderTargetPixels=function(S,U,N,O,k,oe,we){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=be.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&we!==void 0&&(Ae=Ae[we]),Ae){ee.bindFramebuffer(L.FRAMEBUFFER,Ae);try{let Re=S.texture,Ue=Re.format,Ne=Re.type;if(!re.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-O&&N>=0&&N<=S.height-k&&L.readPixels(U,N,O,k,ye.convert(Ue),ye.convert(Ne),oe)}finally{let Re=A!==null?be.get(A).__webglFramebuffer:null;ee.bindFramebuffer(L.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(S,U,N,O,k,oe,we){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=be.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&we!==void 0&&(Ae=Ae[we]),Ae){ee.bindFramebuffer(L.FRAMEBUFFER,Ae);try{let Re=S.texture,Ue=Re.format,Ne=Re.type;if(!re.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=S.width-O&&N>=0&&N<=S.height-k){let De=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,De),L.bufferData(L.PIXEL_PACK_BUFFER,oe.byteLength,L.STREAM_READ),L.readPixels(U,N,O,k,ye.convert(Ue),ye.convert(Ne),0),L.flush();let at=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);await _m(L,at,4);try{L.bindBuffer(L.PIXEL_PACK_BUFFER,De),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,oe)}finally{L.deleteBuffer(De),L.deleteSync(at)}return oe}}finally{let Re=A!==null?be.get(A).__webglFramebuffer:null;ee.bindFramebuffer(L.FRAMEBUFFER,Re)}}},this.copyFramebufferToTexture=function(S,U=null,N=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,S=arguments[1]);let O=Math.pow(2,-N),k=Math.floor(S.image.width*O),oe=Math.floor(S.image.height*O),we=U!==null?U.x:0,Ae=U!==null?U.y:0;xe.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,N,0,0,we,Ae,k,oe),ee.unbindTexture()},this.copyTextureToTexture=function(S,U,N=null,O=null,k=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,S=arguments[1],U=arguments[2],k=arguments[3]||0,N=null);let oe,we,Ae,Re,Ue,Ne;N!==null?(oe=N.max.x-N.min.x,we=N.max.y-N.min.y,Ae=N.min.x,Re=N.min.y):(oe=S.image.width,we=S.image.height,Ae=0,Re=0),O!==null?(Ue=O.x,Ne=O.y):(Ue=0,Ne=0);let De=ye.convert(U.format),at=ye.convert(U.type);xe.setTexture2D(U,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);let Tt=L.getParameter(L.UNPACK_ROW_LENGTH),At=L.getParameter(L.UNPACK_IMAGE_HEIGHT),vn=L.getParameter(L.UNPACK_SKIP_PIXELS),lt=L.getParameter(L.UNPACK_SKIP_ROWS),Ie=L.getParameter(L.UNPACK_SKIP_IMAGES),cn=S.isCompressedTexture?S.mipmaps[k]:S.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,cn.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,cn.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ae),L.pixelStorei(L.UNPACK_SKIP_ROWS,Re),S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,k,Ue,Ne,oe,we,De,at,cn.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,k,Ue,Ne,cn.width,cn.height,De,cn.data):L.texSubImage2D(L.TEXTURE_2D,k,Ue,Ne,De,at,cn),L.pixelStorei(L.UNPACK_ROW_LENGTH,Tt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,At),L.pixelStorei(L.UNPACK_SKIP_PIXELS,vn),L.pixelStorei(L.UNPACK_SKIP_ROWS,lt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ie),k===0&&U.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),ee.unbindTexture()},this.copyTextureToTexture3D=function(S,U,N=null,O=null,k=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),N=arguments[0]||null,O=arguments[1]||null,S=arguments[2],U=arguments[3],k=arguments[4]||0);let oe,we,Ae,Re,Ue,Ne,De,at,Tt,At=S.isCompressedTexture?S.mipmaps[k]:S.image;N!==null?(oe=N.max.x-N.min.x,we=N.max.y-N.min.y,Ae=N.max.z-N.min.z,Re=N.min.x,Ue=N.min.y,Ne=N.min.z):(oe=At.width,we=At.height,Ae=At.depth,Re=0,Ue=0,Ne=0),O!==null?(De=O.x,at=O.y,Tt=O.z):(De=0,at=0,Tt=0);let vn=ye.convert(U.format),lt=ye.convert(U.type),Ie;if(U.isData3DTexture)xe.setTexture3D(U,0),Ie=L.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)xe.setTexture2DArray(U,0),Ie=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);let cn=L.getParameter(L.UNPACK_ROW_LENGTH),ht=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ci=L.getParameter(L.UNPACK_SKIP_PIXELS),fa=L.getParameter(L.UNPACK_SKIP_ROWS),Qi=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,At.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,At.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Re),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ue),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ne),S.isDataTexture||S.isData3DTexture?L.texSubImage3D(Ie,k,De,at,Tt,oe,we,Ae,vn,lt,At.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Ie,k,De,at,Tt,oe,we,Ae,vn,At.data):L.texSubImage3D(Ie,k,De,at,Tt,oe,we,Ae,vn,lt,At),L.pixelStorei(L.UNPACK_ROW_LENGTH,cn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ht),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ci),L.pixelStorei(L.UNPACK_SKIP_ROWS,fa),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Qi),k===0&&U.generateMipmaps&&L.generateMipmap(Ie),ee.unbindTexture()},this.initRenderTarget=function(S){be.get(S).__webglFramebuffer===void 0&&xe.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?xe.setTextureCube(S,0):S.isData3DTexture?xe.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?xe.setTexture2DArray(S,0):xe.setTexture2D(S,0),ee.unbindTexture()},this.resetState=function(){P=0,E=0,A=null,ee.reset(),Je.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===pd?"display-p3":"srgb",t.unpackColorSpace=dt.workingColorSpace===Uo?"display-p3":"srgb"}},uo=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Fe(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var ho=class extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},$c=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Cc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Jn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return xd("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},dn=new C,fo=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.applyMatrix4(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.applyNormalMatrix(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.transformDirection(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Hn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Hn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Hn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Hn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Hn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array),s=ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ws=class extends Vi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Vr,As=new C,Gr=new C,Wr=new C,$r=new K,Cs=new K,uf=new pt,Oa=new C,Rs=new C,Ba=new C,Ph=new K,yc=new K,Ih=new K,po=class extends Ct{constructor(e=new Ws){if(super(),this.isSprite=!0,this.type="Sprite",Vr===void 0){Vr=new Mt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new $c(t,5);Vr.setIndex([0,1,2,0,2,3]),Vr.setAttribute("position",new fo(n,3,0,!1)),Vr.setAttribute("uv",new fo(n,2,3,!1))}this.geometry=Vr,this.material=e,this.center=new K(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gr.setFromMatrixScale(this.matrixWorld),uf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Wr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gr.multiplyScalar(-Wr.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;za(Oa.set(-.5,-.5,0),Wr,a,Gr,r,s),za(Rs.set(.5,-.5,0),Wr,a,Gr,r,s),za(Ba.set(.5,.5,0),Wr,a,Gr,r,s),Ph.set(0,0),yc.set(1,0),Ih.set(1,1);let o=e.ray.intersectTriangle(Oa,Rs,Ba,!1,As);if(o===null&&(za(Rs.set(-.5,.5,0),Wr,a,Gr,r,s),yc.set(0,1),o=e.ray.intersectTriangle(Oa,Ba,Rs,!1,As),o===null))return;let l=e.ray.origin.distanceTo(As);l<e.near||l>e.far||t.push({distance:l,point:As.clone(),uv:ur.getInterpolation(As,Oa,Rs,Ba,Ph,yc,Ih,new K),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function za(i,e,t,n,r,s){$r.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(Cs.x=s*$r.x-r*$r.y,Cs.y=r*$r.x+s*$r.y):Cs.copy($r),i.copy(e),i.x+=Cs.x,i.y+=Cs.y,i.applyMatrix4(uf)}var qc=class extends fn{constructor(e=null,t=1,n=1,r,s,a,o,l,c=gn,d=gn,u,h){super(null,a,o,l,c,d,r,s,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var mo=class extends Ht{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},qr=new pt,Lh=new pt,Ha=[],Dh=new Cn,fv=new pt,Ps=new vt,Is=new Qn,_i=class extends vt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new mo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,fv)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Cn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qr),Dh.copy(e.boundingBox).applyMatrix4(qr),this.boundingBox.union(Dh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qr),Is.copy(e.boundingSphere).applyMatrix4(qr),this.boundingSphere.union(Is)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Ps.geometry=this.geometry,Ps.material=this.material,Ps.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Is.copy(this.boundingSphere),Is.applyMatrix4(n),e.ray.intersectsSphere(Is)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,qr),Lh.multiplyMatrices(n,qr),Ps.matrixWorld=Lh,Ps.raycast(e,Ha);for(let a=0,o=Ha.length;a<o;a++){let l=Ha[a];l.instanceId=s,l.object=this,t.push(l)}Ha.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new mo(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new qc(new Float32Array(r*this.count),r,this.count,jh,xi));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var wi=class extends fn{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Pn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),r=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);let d=n[r],h=n[r+1]-d,f=(a-d)/h;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new K:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new C,r=[],s=[],a=[],o=new C,l=new pt;for(let f=0;f<=e;f++){let g=f/e;r[f]=this.getTangentAt(g,new C)}s[0]=new C,a[0]=new C;let c=Number.MAX_VALUE,d=Math.abs(r[0].x),u=Math.abs(r[0].y),h=Math.abs(r[0].z);d<=c&&(c=d,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Yt(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(Yt(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],f*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},$s=class extends Pn{constructor(e=0,t=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new K){let n=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let d=Math.cos(this.aRotation),u=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*d-f*u+this.aX,c=h*u+f*d+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Xc=class extends $s{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function vd(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,d,u){let h=(a-s)/c-(o-s)/(c+d)+(o-a)/d,f=(o-a)/d-(l-a)/(d+u)+(l-o)/u;h*=d,f*=d,r(a,o,h,f)},calc:function(s){let a=s*s,o=a*s;return i+e*s+t*a+n*o}}}var Va=new C,vc=new vd,bc=new vd,_c=new vd,Gn=class extends Pn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new C){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,d;this.closed||o>0?c=r[(o-1)%s]:(Va.subVectors(r[0],r[1]).add(r[0]),c=Va);let u=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?d=r[(o+2)%s]:(Va.subVectors(r[s-1],r[s-2]).add(r[s-1]),d=Va),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(h),f),p=Math.pow(h.distanceToSquared(d),f);y<1e-4&&(y=1),g<1e-4&&(g=y),p<1e-4&&(p=y),vc.initNonuniformCatmullRom(c.x,u.x,h.x,d.x,g,y,p),bc.initNonuniformCatmullRom(c.y,u.y,h.y,d.y,g,y,p),_c.initNonuniformCatmullRom(c.z,u.z,h.z,d.z,g,y,p)}else this.curveType==="catmullrom"&&(vc.initCatmullRom(c.x,u.x,h.x,d.x,this.tension),bc.initCatmullRom(c.y,u.y,h.y,d.y,this.tension),_c.initCatmullRom(c.z,u.z,h.z,d.z,this.tension));return n.set(vc.calc(l),bc.calc(l),_c.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new C().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Uh(i,e,t,n,r){let s=(n-e)*.5,a=(r-t)*.5,o=i*i,l=i*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*i+t}function pv(i,e){let t=1-i;return t*t*e}function mv(i,e){return 2*(1-i)*i*e}function gv(i,e){return i*i*e}function Ns(i,e,t,n){return pv(i,e)+mv(i,t)+gv(i,n)}function xv(i,e){let t=1-i;return t*t*t*e}function yv(i,e){let t=1-i;return 3*t*t*i*e}function vv(i,e){return 3*(1-i)*i*i*e}function bv(i,e){return i*i*i*e}function Fs(i,e,t,n,r){return xv(i,e)+yv(i,t)+vv(i,n)+bv(i,r)}var go=class extends Pn{constructor(e=new K,t=new K,n=new K,r=new K){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new K){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Fs(e,r.x,s.x,a.x,o.x),Fs(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Yc=class extends Pn{constructor(e=new C,t=new C,n=new C,r=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new C){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Fs(e,r.x,s.x,a.x,o.x),Fs(e,r.y,s.y,a.y,o.y),Fs(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},xo=class extends Pn{constructor(e=new K,t=new K){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new K){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},jc=class extends Pn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},yo=class extends Pn{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ns(e,r.x,s.x,a.x),Ns(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},vo=class extends Pn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ns(e,r.x,s.x,a.x),Ns(e,r.y,s.y,a.y),Ns(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},bo=class extends Pn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new K){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],d=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Uh(o,l.x,c.x,d.x,u.x),Uh(o,l.y,c.y,d.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new K().fromArray(r))}return this}},_o=Object.freeze({__proto__:null,ArcCurve:Xc,CatmullRomCurve3:Gn,CubicBezierCurve:go,CubicBezierCurve3:Yc,EllipseCurve:$s,LineCurve:xo,LineCurve3:jc,QuadraticBezierCurve:yo,QuadraticBezierCurve3:vo,SplineCurve:bo}),Zc=class extends Pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new _o[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let d=l[c];n&&n.equals(d)||(t.push(d),n=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new _o[r.type]().fromJSON(r))}return this}},wo=class extends Zc{constructor(e){super(),this.type="Path",this.currentPoint=new K,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new xo(this.currentPoint.clone(),new K(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new yo(this.currentPoint.clone(),new K(e,t),new K(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new go(this.currentPoint.clone(),new K(e,t),new K(n,r),new K(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new bo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){let c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,t+d,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){let c=new $s(e,t,n,r,s,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},So=class i extends Mt{constructor(e=[new K(0,-.5),new K(.5,0),new K(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=Yt(r,0,Math.PI*2);let s=[],a=[],o=[],l=[],c=[],d=1/t,u=new C,h=new K,f=new C,g=new C,y=new C,p=0,m=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:p=e[_+1].x-e[_].x,m=e[_+1].y-e[_].y,f.x=m*1,f.y=-p,f.z=m*0,y.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(y.x,y.y,y.z);break;default:p=e[_+1].x-e[_].x,m=e[_+1].y-e[_].y,f.x=m*1,f.y=-p,f.z=m*0,g.copy(f),f.x+=y.x,f.y+=y.y,f.z+=y.z,f.normalize(),l.push(f.x,f.y,f.z),y.copy(g)}for(let _=0;_<=t;_++){let x=n+_*d*r,b=Math.sin(x),P=Math.cos(x);for(let E=0;E<=e.length-1;E++){u.x=e[E].x*b,u.y=e[E].y,u.z=e[E].x*P,a.push(u.x,u.y,u.z),h.x=_/t,h.y=E/(e.length-1),o.push(h.x,h.y);let A=l[3*E+0]*b,I=l[3*E+1],M=l[3*E+0]*P;c.push(A,I,M)}}for(let _=0;_<t;_++)for(let x=0;x<e.length-1;x++){let b=x+_*e.length,P=b,E=b+e.length,A=b+e.length+1,I=b+1;s.push(P,E,I),s.push(A,I,E)}this.setIndex(s),this.setAttribute("position",new We(a,3)),this.setAttribute("uv",new We(o,2)),this.setAttribute("normal",new We(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}};var In=class i extends Mt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let d=[],u=[],h=[],f=[],g=0,y=[],p=n/2,m=0;_(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(d),this.setAttribute("position",new We(u,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(f,2));function _(){let b=new C,P=new C,E=0,A=(t-e)/n;for(let I=0;I<=s;I++){let M=[],v=I/s,R=v*(t-e)+e;for(let z=0;z<=r;z++){let F=z/r,H=F*l+o,q=Math.sin(H),V=Math.cos(H);P.x=R*q,P.y=-v*n+p,P.z=R*V,u.push(P.x,P.y,P.z),b.set(q,A,V).normalize(),h.push(b.x,b.y,b.z),f.push(F,1-v),M.push(g++)}y.push(M)}for(let I=0;I<r;I++)for(let M=0;M<s;M++){let v=y[M][I],R=y[M+1][I],z=y[M+1][I+1],F=y[M][I+1];d.push(v,R,F),d.push(R,z,F),E+=6}c.addGroup(m,E,0),m+=E}function x(b){let P=g,E=new K,A=new C,I=0,M=b===!0?e:t,v=b===!0?1:-1;for(let z=1;z<=r;z++)u.push(0,p*v,0),h.push(0,v,0),f.push(.5,.5),g++;let R=g;for(let z=0;z<=r;z++){let H=z/r*l+o,q=Math.cos(H),V=Math.sin(H);A.x=M*V,A.y=p*v,A.z=M*q,u.push(A.x,A.y,A.z),h.push(0,v,0),E.x=q*.5+.5,E.y=V*.5*v+.5,f.push(E.x,E.y),g++}for(let z=0;z<r;z++){let F=P+z,H=R+z;b===!0?d.push(H,H+1,F):d.push(H+1,H,F),I+=3}c.addGroup(m,I,b===!0?1:2),m+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},hr=class i extends In{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},qs=class i extends Mt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];o(r),c(n),d(),this.setAttribute("position",new We(s,3)),this.setAttribute("normal",new We(s.slice(),3)),this.setAttribute("uv",new We(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(_){let x=new C,b=new C,P=new C;for(let E=0;E<t.length;E+=3)f(t[E+0],x),f(t[E+1],b),f(t[E+2],P),l(x,b,P,_)}function l(_,x,b,P){let E=P+1,A=[];for(let I=0;I<=E;I++){A[I]=[];let M=_.clone().lerp(b,I/E),v=x.clone().lerp(b,I/E),R=E-I;for(let z=0;z<=R;z++)z===0&&I===E?A[I][z]=M:A[I][z]=M.clone().lerp(v,z/R)}for(let I=0;I<E;I++)for(let M=0;M<2*(E-I)-1;M++){let v=Math.floor(M/2);M%2===0?(h(A[I][v+1]),h(A[I+1][v]),h(A[I][v])):(h(A[I][v+1]),h(A[I+1][v+1]),h(A[I+1][v]))}}function c(_){let x=new C;for(let b=0;b<s.length;b+=3)x.x=s[b+0],x.y=s[b+1],x.z=s[b+2],x.normalize().multiplyScalar(_),s[b+0]=x.x,s[b+1]=x.y,s[b+2]=x.z}function d(){let _=new C;for(let x=0;x<s.length;x+=3){_.x=s[x+0],_.y=s[x+1],_.z=s[x+2];let b=p(_)/2/Math.PI+.5,P=m(_)/Math.PI+.5;a.push(b,1-P)}g(),u()}function u(){for(let _=0;_<a.length;_+=6){let x=a[_+0],b=a[_+2],P=a[_+4],E=Math.max(x,b,P),A=Math.min(x,b,P);E>.9&&A<.1&&(x<.2&&(a[_+0]+=1),b<.2&&(a[_+2]+=1),P<.2&&(a[_+4]+=1))}}function h(_){s.push(_.x,_.y,_.z)}function f(_,x){let b=_*3;x.x=e[b+0],x.y=e[b+1],x.z=e[b+2]}function g(){let _=new C,x=new C,b=new C,P=new C,E=new K,A=new K,I=new K;for(let M=0,v=0;M<s.length;M+=9,v+=6){_.set(s[M+0],s[M+1],s[M+2]),x.set(s[M+3],s[M+4],s[M+5]),b.set(s[M+6],s[M+7],s[M+8]),E.set(a[v+0],a[v+1]),A.set(a[v+2],a[v+3]),I.set(a[v+4],a[v+5]),P.copy(_).add(x).add(b).divideScalar(3);let R=p(P);y(E,v+0,_,R),y(A,v+2,x,R),y(I,v+4,b,R)}}function y(_,x,b,P){P<0&&_.x===1&&(a[x]=_.x-1),b.x===0&&b.z===0&&(a[x]=P/2/Math.PI+.5)}function p(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}},Gi=class i extends qs{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Si=class extends wo{constructor(e){super(e),this.uuid=Jn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new wo().fromJSON(r))}return this}},_v={triangulate:function(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=hf(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c,d,u,h,f;if(n&&(s=Tv(i,e,s,t)),i.length>80*t){o=c=i[0],l=d=i[1];for(let g=t;g<r;g+=t)u=i[g],h=i[g+1],u<o&&(o=u),h<l&&(l=h),u>c&&(c=u),h>d&&(d=h);f=Math.max(c-o,d-l),f=f!==0?32767/f:0}return Xs(s,a,t,o,l,f,0),a}};function hf(i,e,t,n,r){let s,a;if(r===Fv(i,e,t,n)>0)for(s=e;s<t;s+=n)a=kh(s,i[s],i[s+1],a);else for(s=t-n;s>=e;s-=n)a=kh(s,i[s],i[s+1],a);return a&&No(a,a.next)&&(js(a),a=a.next),a}function fr(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(No(t,t.next)||St(t.prev,t,t.next)===0)){if(js(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Xs(i,e,t,n,r,s,a){if(!i)return;!a&&s&&Iv(i,n,r,s);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,s?Sv(i,n,r,s):wv(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),js(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Mv(fr(i),e,t),Xs(i,e,t,n,r,s,2)):a===2&&Ev(i,e,t,n,r,s):Xs(fr(i),e,t,n,r,s,1);break}}}function wv(i){let e=i.prev,t=i,n=i.next;if(St(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,d=r<s?r<a?r:a:s<a?s:a,u=o<l?o<c?o:c:l<c?l:c,h=r>s?r>a?r:a:s>a?s:a,f=o>l?o>c?o:c:l>c?l:c,g=n.next;for(;g!==e;){if(g.x>=d&&g.x<=h&&g.y>=u&&g.y<=f&&Yr(r,o,s,l,a,c,g.x,g.y)&&St(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Sv(i,e,t,n){let r=i.prev,s=i,a=i.next;if(St(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,d=r.y,u=s.y,h=a.y,f=o<l?o<c?o:c:l<c?l:c,g=d<u?d<h?d:h:u<h?u:h,y=o>l?o>c?o:c:l>c?l:c,p=d>u?d>h?d:h:u>h?u:h,m=Jc(f,g,e,t,n),_=Jc(y,p,e,t,n),x=i.prevZ,b=i.nextZ;for(;x&&x.z>=m&&b&&b.z<=_;){if(x.x>=f&&x.x<=y&&x.y>=g&&x.y<=p&&x!==r&&x!==a&&Yr(o,d,l,u,c,h,x.x,x.y)&&St(x.prev,x,x.next)>=0||(x=x.prevZ,b.x>=f&&b.x<=y&&b.y>=g&&b.y<=p&&b!==r&&b!==a&&Yr(o,d,l,u,c,h,b.x,b.y)&&St(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;x&&x.z>=m;){if(x.x>=f&&x.x<=y&&x.y>=g&&x.y<=p&&x!==r&&x!==a&&Yr(o,d,l,u,c,h,x.x,x.y)&&St(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;b&&b.z<=_;){if(b.x>=f&&b.x<=y&&b.y>=g&&b.y<=p&&b!==r&&b!==a&&Yr(o,d,l,u,c,h,b.x,b.y)&&St(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Mv(i,e,t){let n=i;do{let r=n.prev,s=n.next.next;!No(r,s)&&ff(r,n,n.next,s)&&Ys(r,s)&&Ys(s,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),js(n),js(n.next),n=i=s),n=n.next}while(n!==i);return fr(n)}function Ev(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Uv(a,o)){let l=pf(a,o);a=fr(a,a.next),l=fr(l,l.next),Xs(a,e,t,n,r,s,0),Xs(l,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function Tv(i,e,t,n){let r=[],s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*n,l=s<a-1?e[s+1]*n:i.length,c=hf(i,o,l,n,!1),c===c.next&&(c.steiner=!0),r.push(Dv(c));for(r.sort(Av),s=0;s<r.length;s++)t=Cv(r[s],t);return t}function Av(i,e){return i.x-e.x}function Cv(i,e){let t=Rv(i,e);if(!t)return e;let n=pf(t,i);return fr(n,n.next),fr(t,t.next)}function Rv(i,e){let t=e,n=-1/0,r,s=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){let h=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=s&&h>n&&(n=h,r=t.x<t.next.x?t:t.next,h===s))return r}t=t.next}while(t!==e);if(!r)return null;let o=r,l=r.x,c=r.y,d=1/0,u;t=r;do s>=t.x&&t.x>=l&&s!==t.x&&Yr(a<c?s:n,a,l,c,a<c?n:s,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(s-t.x),Ys(t,i)&&(u<d||u===d&&(t.x>r.x||t.x===r.x&&Pv(r,t)))&&(r=t,d=u)),t=t.next;while(t!==o);return r}function Pv(i,e){return St(i.prev,i,e.prev)<0&&St(e.next,i,i.next)<0}function Iv(i,e,t,n){let r=i;do r.z===0&&(r.z=Jc(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Lv(r)}function Lv(i){let e,t,n,r,s,a,o,l,c=1;do{for(t=i,i=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(r=t,t=t.nextZ,o--):(r=n,n=n.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;t=n}s.nextZ=null,c*=2}while(a>1);return i}function Jc(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Dv(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Yr(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function Uv(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!kv(i,e)&&(Ys(i,e)&&Ys(e,i)&&Nv(i,e)&&(St(i.prev,i,e.prev)||St(i,e.prev,e))||No(i,e)&&St(i.prev,i,i.next)>0&&St(e.prev,e,e.next)>0)}function St(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function No(i,e){return i.x===e.x&&i.y===e.y}function ff(i,e,t,n){let r=Wa(St(i,e,t)),s=Wa(St(i,e,n)),a=Wa(St(t,n,i)),o=Wa(St(t,n,e));return!!(r!==s&&a!==o||r===0&&Ga(i,t,e)||s===0&&Ga(i,n,e)||a===0&&Ga(t,i,n)||o===0&&Ga(t,e,n))}function Ga(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Wa(i){return i>0?1:i<0?-1:0}function kv(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&ff(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ys(i,e){return St(i.prev,i,i.next)<0?St(i,e,i.next)>=0&&St(i,i.prev,e)>=0:St(i,e,i.prev)<0||St(i,i.next,e)<0}function Nv(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function pf(i,e){let t=new Kc(i.i,i.x,i.y),n=new Kc(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function kh(i,e,t,n){let r=new Kc(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function js(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Kc(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Fv(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var Oi=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];Nh(e),Fh(n,e);let a=e.length;t.forEach(Nh);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Fh(n,t[l]);let o=_v.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function Nh(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Fh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Zs=class i extends Mt{constructor(e=new Si([new K(.5,.5),new K(-.5,.5),new K(-.5,-.5),new K(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new We(r,3)),this.setAttribute("uv",new We(s,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,d=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:Ov,x,b=!1,P,E,A,I;m&&(x=m.getSpacedPoints(d),b=!0,h=!1,P=m.computeFrenetFrames(d,!1),E=new C,A=new C,I=new C),h||(p=0,f=0,g=0,y=0);let M=o.extractPoints(c),v=M.shape,R=M.holes;if(!Oi.isClockWise(v)){v=v.reverse();for(let X=0,J=R.length;X<J;X++){let re=R[X];Oi.isClockWise(re)&&(R[X]=re.reverse())}}let F=Oi.triangulateShape(v,R),H=v;for(let X=0,J=R.length;X<J;X++){let re=R[X];v=v.concat(re)}function q(X,J,re){return J||console.error("THREE.ExtrudeGeometry: vec does not exist"),X.clone().addScaledVector(J,re)}let V=v.length,ne=F.length;function G(X,J,re){let ee,te,be,xe=X.x-J.x,Ve=X.y-J.y,T=re.x-X.x,w=re.y-X.y,B=xe*xe+Ve*Ve,Z=xe*w-Ve*T;if(Math.abs(Z)>Number.EPSILON){let j=Math.sqrt(B),Q=Math.sqrt(T*T+w*w),Pe=J.x-Ve/j,ue=J.y+xe/j,pe=re.x-w/Q,qe=re.y+T/Q,se=((pe-Pe)*w-(qe-ue)*T)/(xe*w-Ve*T);ee=Pe+xe*se-X.x,te=ue+Ve*se-X.y;let Ce=ee*ee+te*te;if(Ce<=2)return new K(ee,te);be=Math.sqrt(Ce/2)}else{let j=!1;xe>Number.EPSILON?T>Number.EPSILON&&(j=!0):xe<-Number.EPSILON?T<-Number.EPSILON&&(j=!0):Math.sign(Ve)===Math.sign(w)&&(j=!0),j?(ee=-Ve,te=xe,be=Math.sqrt(B)):(ee=xe,te=Ve,be=Math.sqrt(B/2))}return new K(ee/be,te/be)}let ve=[];for(let X=0,J=H.length,re=J-1,ee=X+1;X<J;X++,re++,ee++)re===J&&(re=0),ee===J&&(ee=0),ve[X]=G(H[X],H[re],H[ee]);let Ee=[],Se,Ze=ve.concat();for(let X=0,J=R.length;X<J;X++){let re=R[X];Se=[];for(let ee=0,te=re.length,be=te-1,xe=ee+1;ee<te;ee++,be++,xe++)be===te&&(be=0),xe===te&&(xe=0),Se[ee]=G(re[ee],re[be],re[xe]);Ee.push(Se),Ze=Ze.concat(Se)}for(let X=0;X<p;X++){let J=X/p,re=f*Math.cos(J*Math.PI/2),ee=g*Math.sin(J*Math.PI/2)+y;for(let te=0,be=H.length;te<be;te++){let xe=q(H[te],ve[te],ee);ce(xe.x,xe.y,-re)}for(let te=0,be=R.length;te<be;te++){let xe=R[te];Se=Ee[te];for(let Ve=0,T=xe.length;Ve<T;Ve++){let w=q(xe[Ve],Se[Ve],ee);ce(w.x,w.y,-re)}}}let it=g+y;for(let X=0;X<V;X++){let J=h?q(v[X],Ze[X],it):v[X];b?(A.copy(P.normals[0]).multiplyScalar(J.x),E.copy(P.binormals[0]).multiplyScalar(J.y),I.copy(x[0]).add(A).add(E),ce(I.x,I.y,I.z)):ce(J.x,J.y,0)}for(let X=1;X<=d;X++)for(let J=0;J<V;J++){let re=h?q(v[J],Ze[J],it):v[J];b?(A.copy(P.normals[X]).multiplyScalar(re.x),E.copy(P.binormals[X]).multiplyScalar(re.y),I.copy(x[X]).add(A).add(E),ce(I.x,I.y,I.z)):ce(re.x,re.y,u/d*X)}for(let X=p-1;X>=0;X--){let J=X/p,re=f*Math.cos(J*Math.PI/2),ee=g*Math.sin(J*Math.PI/2)+y;for(let te=0,be=H.length;te<be;te++){let xe=q(H[te],ve[te],ee);ce(xe.x,xe.y,u+re)}for(let te=0,be=R.length;te<be;te++){let xe=R[te];Se=Ee[te];for(let Ve=0,T=xe.length;Ve<T;Ve++){let w=q(xe[Ve],Se[Ve],ee);b?ce(w.x,w.y+x[d-1].y,x[d-1].x+re):ce(w.x,w.y,u+re)}}}W(),ie();function W(){let X=r.length/3;if(h){let J=0,re=V*J;for(let ee=0;ee<ne;ee++){let te=F[ee];Ge(te[2]+re,te[1]+re,te[0]+re)}J=d+p*2,re=V*J;for(let ee=0;ee<ne;ee++){let te=F[ee];Ge(te[0]+re,te[1]+re,te[2]+re)}}else{for(let J=0;J<ne;J++){let re=F[J];Ge(re[2],re[1],re[0])}for(let J=0;J<ne;J++){let re=F[J];Ge(re[0]+V*d,re[1]+V*d,re[2]+V*d)}}n.addGroup(X,r.length/3-X,0)}function ie(){let X=r.length/3,J=0;Me(H,J),J+=H.length;for(let re=0,ee=R.length;re<ee;re++){let te=R[re];Me(te,J),J+=te.length}n.addGroup(X,r.length/3-X,1)}function Me(X,J){let re=X.length;for(;--re>=0;){let ee=re,te=re-1;te<0&&(te=X.length-1);for(let be=0,xe=d+p*2;be<xe;be++){let Ve=V*be,T=V*(be+1),w=J+ee+Ve,B=J+te+Ve,Z=J+te+T,j=J+ee+T;$e(w,B,Z,j)}}}function ce(X,J,re){l.push(X),l.push(J),l.push(re)}function Ge(X,J,re){He(X),He(J),He(re);let ee=r.length/3,te=_.generateTopUV(n,r,ee-3,ee-2,ee-1);L(te[0]),L(te[1]),L(te[2])}function $e(X,J,re,ee){He(X),He(J),He(ee),He(J),He(re),He(ee);let te=r.length/3,be=_.generateSideWallUV(n,r,te-6,te-3,te-2,te-1);L(be[0]),L(be[1]),L(be[3]),L(be[1]),L(be[2]),L(be[3])}function He(X){r.push(l[X*3+0]),r.push(l[X*3+1]),r.push(l[X*3+2])}function L(X){s.push(X.x),s.push(X.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Bv(t,n,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new _o[r.type]().fromJSON(r)),new i(n,e.options)}},Ov={generateTopUV:function(i,e,t,n,r){let s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[r*3],d=e[r*3+1];return[new K(s,a),new K(o,l),new K(c,d)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],d=e[n*3+1],u=e[n*3+2],h=e[r*3],f=e[r*3+1],g=e[r*3+2],y=e[s*3],p=e[s*3+1],m=e[s*3+2];return Math.abs(o-d)<Math.abs(a-c)?[new K(a,1-l),new K(c,1-u),new K(h,1-g),new K(y,1-m)]:[new K(o,1-l),new K(d,1-u),new K(f,1-g),new K(p,1-m)]}};function Bv(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Js=class i extends qs{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Mo=class i extends qs{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},ss=class i extends Mt{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],l=[],c=[],d=[],u=e,h=(t-e)/r,f=new C,g=new K;for(let y=0;y<=r;y++){for(let p=0;p<=n;p++){let m=s+p/n*a;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y)}u+=h}for(let y=0;y<r;y++){let p=y*(n+1);for(let m=0;m<n;m++){let _=m+p,x=_,b=_+n+1,P=_+n+2,E=_+1;o.push(x,b,E),o.push(b,P,E)}}this.setIndex(o),this.setAttribute("position",new We(l,3)),this.setAttribute("normal",new We(c,3)),this.setAttribute("uv",new We(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Ks=class i extends Mt{constructor(e=new Si([new K(0,.5),new K(-.5,-.5),new K(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let d=0;d<e.length;d++)c(e[d]),this.addGroup(o,l,d),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new We(r,3)),this.setAttribute("normal",new We(s,3)),this.setAttribute("uv",new We(a,2));function c(d){let u=r.length/3,h=d.extractPoints(t),f=h.shape,g=h.holes;Oi.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,m=g.length;p<m;p++){let _=g[p];Oi.isClockWise(_)===!0&&(g[p]=_.reverse())}let y=Oi.triangulateShape(f,g);for(let p=0,m=g.length;p<m;p++){let _=g[p];f=f.concat(_)}for(let p=0,m=f.length;p<m;p++){let _=f[p];r.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let p=0,m=y.length;p<m;p++){let _=y[p],x=_[0]+u,b=_[1]+u,P=_[2]+u;n.push(x,b,P),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return zv(t,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}};function zv(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}var Dt=class i extends Mt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,d=[],u=new C,h=new C,f=[],g=[],y=[],p=[];for(let m=0;m<=n;m++){let _=[],x=m/n,b=0;m===0&&a===0?b=.5/t:m===n&&l===Math.PI&&(b=-.5/t);for(let P=0;P<=t;P++){let E=P/t;u.x=-e*Math.cos(r+E*s)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(r+E*s)*Math.sin(a+x*o),g.push(u.x,u.y,u.z),h.copy(u).normalize(),y.push(h.x,h.y,h.z),p.push(E+b,1-x),_.push(c++)}d.push(_)}for(let m=0;m<n;m++)for(let _=0;_<t;_++){let x=d[m][_+1],b=d[m][_],P=d[m+1][_],E=d[m+1][_+1];(m!==0||a>0)&&f.push(x,b,E),(m!==n-1||l<Math.PI)&&f.push(b,P,E)}this.setIndex(f),this.setAttribute("position",new We(g,3)),this.setAttribute("normal",new We(y,3)),this.setAttribute("uv",new We(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ln=class i extends Mt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],l=[],c=[],d=new C,u=new C,h=new C;for(let f=0;f<=n;f++)for(let g=0;g<=r;g++){let y=g/r*s,p=f/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(y),u.y=(e+t*Math.cos(p))*Math.sin(y),u.z=t*Math.sin(p),o.push(u.x,u.y,u.z),d.x=e*Math.cos(y),d.y=e*Math.sin(y),h.subVectors(u,d).normalize(),l.push(h.x,h.y,h.z),c.push(g/r),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=r;g++){let y=(r+1)*f+g-1,p=(r+1)*(f-1)+g-1,m=(r+1)*(f-1)+g,_=(r+1)*f+g;a.push(y,p,_),a.push(p,m,_)}this.setIndex(a),this.setAttribute("position",new We(o,3)),this.setAttribute("normal",new We(l,3)),this.setAttribute("uv",new We(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Eo=class i extends Mt{constructor(e=new vo(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new C,l=new C,c=new K,d=new C,u=[],h=[],f=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new We(u,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(f,2));function y(){for(let x=0;x<t;x++)p(x);p(s===!1?t:0),_(),m()}function p(x){d=e.getPointAt(x/t,d);let b=a.normals[x],P=a.binormals[x];for(let E=0;E<=r;E++){let A=E/r*Math.PI*2,I=Math.sin(A),M=-Math.cos(A);l.x=M*b.x+I*P.x,l.y=M*b.y+I*P.y,l.z=M*b.z+I*P.z,l.normalize(),h.push(l.x,l.y,l.z),o.x=d.x+n*l.x,o.y=d.y+n*l.y,o.z=d.z+n*l.z,u.push(o.x,o.y,o.z)}}function m(){for(let x=1;x<=t;x++)for(let b=1;b<=r;b++){let P=(r+1)*(x-1)+(b-1),E=(r+1)*x+(b-1),A=(r+1)*x+b,I=(r+1)*(x-1)+b;g.push(P,E,I),g.push(E,A,I)}}function _(){for(let x=0;x<=t;x++)for(let b=0;b<=r;b++)c.x=x/t,c.y=b/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new _o[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var xt=class extends Vi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qh,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function $a(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Hv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var as=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Qc=class extends as{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ou,endingEnd:Ou}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Bu:s=e,o=2*t-n;break;case zu:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Bu:a=e,l=2*n-t;break;case zu:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=(n-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*d,this._offsetNext=a*d}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,u=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(r-t),y=g*g,p=y*g,m=-h*p+2*h*y-h*g,_=(1+h)*p+(-1.5-2*h)*y+(-.5+h)*g+1,x=(-1-f)*p+(1.5+f)*y+.5*g,b=f*p-f*y;for(let P=0;P!==o;++P)s[P]=m*a[d+P]+_*a[c+P]+x*a[l+P]+b*a[u+P];return s}},ed=class extends as{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(n-t)/(r-t),u=1-d;for(let h=0;h!==o;++h)s[h]=a[c+h]*u+a[l+h]*d;return s}},td=class extends as{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Wn=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=$a(t,this.TimeBufferType),this.values=$a(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:$a(e.times,Array),values:$a(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new td(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ed(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Qc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ya:t=this.InterpolantFactoryMethodDiscrete;break;case Ac:t=this.InterpolantFactoryMethodLinear;break;case Xl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ya;case this.InterpolantFactoryMethodLinear:return Ac;case this.InterpolantFactoryMethodSmooth:return Xl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&Hv(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Xl,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(r)l=!0;else{let u=o*n,h=u-n,f=u+n;for(let g=0;g!==n;++g){let y=t[u+g];if(y!==t[h+g]||y!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[u+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Wn.prototype.TimeBufferType=Float32Array;Wn.prototype.ValueBufferType=Float32Array;Wn.prototype.DefaultInterpolation=Ac;var pr=class extends Wn{constructor(e,t,n){super(e,t,n)}};pr.prototype.ValueTypeName="bool";pr.prototype.ValueBufferType=Array;pr.prototype.DefaultInterpolation=Ya;pr.prototype.InterpolantFactoryMethodLinear=void 0;pr.prototype.InterpolantFactoryMethodSmooth=void 0;var nd=class extends Wn{};nd.prototype.ValueTypeName="color";var id=class extends Wn{};id.prototype.ValueTypeName="number";var rd=class extends as{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let d=c+o;c!==d;c+=4)Kn.slerpFlat(s,0,a,c-o,a,c,l);return s}},To=class extends Wn{InterpolantFactoryMethodLinear(e){return new rd(this.times,this.values,this.getValueSize(),e)}};To.prototype.ValueTypeName="quaternion";To.prototype.InterpolantFactoryMethodSmooth=void 0;var mr=class extends Wn{constructor(e,t,n){super(e,t,n)}};mr.prototype.ValueTypeName="string";mr.prototype.ValueBufferType=Array;mr.prototype.DefaultInterpolation=Ya;mr.prototype.InterpolantFactoryMethodLinear=void 0;mr.prototype.InterpolantFactoryMethodSmooth=void 0;var sd=class extends Wn{};sd.prototype.ValueTypeName="vector";var Oh={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},ad=class{constructor(e,t,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){o++,s===!1&&r.onStart!==void 0&&r.onStart(d,a,o),s=!0},this.itemEnd=function(d){a++,r.onProgress!==void 0&&r.onProgress(d,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){let u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(d))return g}return null}}},Vv=new ad,Qs=class{constructor(e){this.manager=e!==void 0?e:Vv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Qs.DEFAULT_MATERIAL_NAME="__DEFAULT";var od=class extends Qs{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Oh.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;let o=Hs("img");function l(){d(),Oh.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){d(),r&&r(u),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}};var Ao=class extends Qs{constructor(e){super(e)}load(e,t,n,r){let s=new fn,a=new od(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}},Co=class extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Ro=class extends Co{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},wc=new pt,Bh=new C,zh=new C,ld=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gs,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Bh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bh),zh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zh),t.updateMatrixWorld(),wc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var cd=class extends ld{constructor(){super(new ao(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Po=class extends Co{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new cd}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var bd="\\[\\]\\.:\\/",Gv=new RegExp("["+bd+"]","g"),_d="[^"+bd+"]",Wv="[^"+bd.replace("\\.","")+"]",$v=/((?:WC+[\/:])*)/.source.replace("WC",_d),qv=/(WCOD+)?/.source.replace("WCOD",Wv),Xv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",_d),Yv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",_d),jv=new RegExp("^"+$v+qv+Xv+Yv+"$"),Zv=["material","materials","bones","map"],dd=class{constructor(e,t,n){let r=n||yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},yt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Gv,"")}static parseTrackName(e){let t=jv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);Zv.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};yt.Composite=dd;yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};yt.prototype.GetterByBindingType=[yt.prototype._getValue_direct,yt.prototype._getValue_array,yt.prototype._getValue_arrayElement,yt.prototype._getValue_toArray];yt.prototype.SetterByBindingTypeAndVersioning=[[yt.prototype._setValue_direct,yt.prototype._setValue_direct_setNeedsUpdate,yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_array,yt.prototype._setValue_array_setNeedsUpdate,yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_arrayElement,yt.prototype._setValue_arrayElement_setNeedsUpdate,yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_fromArray,yt.prototype._setValue_fromArray_setNeedsUpdate,yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var T1=new Float32Array(1);var Hh=new pt,Io=class{constructor(e,t,n=0,r=1/0){this.ray=new to(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Vs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Hh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hh),this}intersectObject(e,t=!0,n=[]){return ud(e,this,n,t),n.sort(Vh),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)ud(e[r],this,n,t);return n.sort(Vh),n}};function Vh(i,e){return i.distance-e.distance}function ud(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){let s=i.children;for(let a=0,o=s.length;a<o;a++)ud(s[a],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"165"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="165");var ae=(i=0,e=0,t=0)=>new C(i,e,t),ni=(i,e,t)=>gr.smoothstep(t,i,e),Jv={stone:10067083,wall:12764077,roof:5465957,timber:7760724,window:4288120,reflection:9282978,frame:10464678,metal:5661538,soil:7828064,paving:9934985,road:7568235,teal:4619896,red:10315099,violet:7698054,leaf:6586979,gold:11838580,dark:3490624,water:4816521},Kv={},Qv=new xt({vertexColors:!0,roughness:.88,metalness:.03});function ii(i){return Kv[i]||=new xt({color:Jv[i],roughness:i==="window"?.3:.88,metalness:i==="window"?.25:.03})}function pn(i,e,t,n=0,r=0,s=0){let a=new vt(e,ii(t));return a.position.set(n,r,s),a.castShadow=a.receiveShadow=!0,i.add(a),a}function ge(i,e,t,n,r,s=0,a=0,o=0){return pn(i,new yn(e,t,n),r,s,a,o)}function bt(i,e,t,n,r=0,s=0,a=0,o=12){return pn(i,new In(e,e,t,o),n,r,s,a)}function Rt(i,e,t,n,r="frame"){let s=e.clone().add(t).multiplyScalar(.5),a=bt(i,n,e.distanceTo(t),r,s.x,s.y,s.z,6);return a.quaternion.setFromUnitVectors(ae(0,1,0),t.clone().sub(e).normalize()),a}function Mi(i,e=!1){i.updateMatrixWorld(!0);let t=i.matrixWorld.clone().invert(),n=new Map;i.traverse(r=>{if(!r.isMesh||r.isInstancedMesh)return;let s=r.geometry.index?r.geometry.toNonIndexed():r.geometry.clone();s.applyMatrix4(t.clone().multiply(r.matrixWorld));let a=e?Qv:r.material;if(e){let l=new Float32Array(s.attributes.position.count*3),c=r.material.color;for(let d=0;d<l.length;d+=3)l.set([c.r,c.g,c.b],d);s.setAttribute("color",new Ht(l,3))}let o=n.get(a)||[];o.push(s),n.set(a,o)}),i.traverse(r=>{r.isMesh&&r.geometry.dispose()}),i.clear();for(let[r,s]of n){let a=new Mt;for(let l of e?["position","normal","uv","color"]:["position","normal","uv"]){let c=l==="uv"?2:3,d=s.reduce((f,g)=>f+g.attributes.position.count,0),u=new Float32Array(d*c),h=0;for(let f of s){let g=f.attributes[l];g&&u.set(g.array,h),h+=f.attributes.position.count*c}a.setAttribute(l,new Ht(u,c))}s.forEach(l=>l.dispose()),a.computeBoundingSphere();let o=new vt(a,r);o.castShadow=o.receiveShadow=!0,i.add(o)}}function gf(i){i.traverse(e=>{e.isMesh&&e.geometry.dispose()}),i.clear()}function wn(i,e,t,n,r,s,a,o=!1){let l=new ke;if(l.position.set(e,0,t),i.add(l),ge(l,n+.35,.24,r+.4,"stone",0,.05),ge(l,n,s,r,"wall",0,s/2+.16),ge(l,n+.04,.23,r+.04,a,0,s*.76),o){ge(l,n+.35,.16,r+.35,"roof",0,s+.26);for(let c of[-1,1])ge(l,.12,.28,r+.35,"frame",c*(n+.23)/2,s+.46);ge(l,1,.45,.85,"metal",-n*.22,s+.55,-.5)}else{let c=n*.25,d=Math.atan2(c,n/2),u=new Si;u.moveTo(-n/2,0),u.lineTo(n/2,0),u.lineTo(0,c),u.closePath();let h=new Zs(u,{depth:r,bevelEnabled:!1});h.translate(0,0,-r/2),pn(l,h,"wall",0,s+.16);for(let f of[-1,1]){let g=ge(l,Math.hypot(n/2,c)+.25,.14,r+.5,"roof",f*n/4,s+.22+c/2);g.rotation.z=-f*d;for(let y=-r/2;y<=r/2;y+=.7){let p=ge(l,Math.hypot(n/2,c)+.25,.035,.035,"metal",f*n/4,s+.31+c/2,y);p.rotation.z=-f*d}}}for(let c=-n/2+.7;c<n/2-.25;c+=1.05)for(let d of[-1,1])ge(l,.63,.72,.055,"window",c,s*.56+.16,d*(r/2+.03)),ge(l,.58,.12,.018,"reflection",c,s*.56+.4,d*(r/2+.065)),ge(l,.7,.06,.15,"frame",c,s*.56-.23,d*(r/2+.05)),ge(l,.035,.72,.07,"frame",c,s*.56+.16,d*(r/2+.04));ge(l,.8,1.35,.09,"dark",.15,.81,r/2+.04),ge(l,1.45,.1,.8,a,.15,1.6,r/2+.35);for(let c of[-.48,.78])ge(l,.055,1.5,.055,"frame",c,.83,r/2+.65);for(let c=0;c<3;c++)ge(l,1.25,.09,.4+c*.23,"stone",.15,.22-c*.065,r/2+.38);return l}function Fo(i,e,t,n=.75){let r=ge(i,2.4,.1,1.5,"frame",e,n,t);r.rotation.x=-.3;let s=ge(i,2.25,.03,1.36,"window",e,n+.075,t);s.rotation.x=-.3;for(let a of[-.9,.9])ge(i,.06,n,.08,"metal",e+a,n/2,t);for(let a=-2;a<=2;a++){let o=ge(i,.025,.02,1.35,"frame",e+a*.4,n+.1,t);o.rotation.x=-.3}}function Sd(i,e,t,n=1){let r=new ke;r.position.set(e,0,t),r.scale.setScalar(n),i.add(r),ge(r,4,.22,6,"stone",0,.1),ge(r,3.8,1.7,5.8,"window",0,1);for(let s of[-1,1]){let a=ge(r,2.2,.09,5.9,"window",s,2.24);a.rotation.z=-s*.45}for(let s=-2.8;s<=2.9;s+=.72)for(let a of[-1,1])Rt(r,ae(a*1.93,.2,s),ae(a*1.93,1.8,s),.045),Rt(r,ae(a*1.93,1.8,s),ae(0,2.73,s),.045);for(let s of[.45,1.65])for(let a of[-1.95,1.95])Rt(r,ae(a,s,-2.9),ae(a,s,2.9),.035);ge(r,.95,1.55,.07,"teal",0,.98,2.95);for(let s of[-3.3,3.3])for(let a=-2;a<=2;a+=1.35)ge(r,1.5,.22,.9,"timber",s,.15,a),ge(r,1.3,.25,.7,"leaf",s,.36,a)}function mf(i,e,t,n=1){let r=new ke;r.position.set(e,0,t),r.scale.setScalar(n),i.add(r),bt(r,2.4,.3,"stone",0,.12,0,32),bt(r,2.05,2.3,"wall",0,1.3,0,32),bt(r,2.13,.17,"violet",0,2.46,0,32),pn(r,new Dt(2.12,24,12,0,Math.PI*2,0,Math.PI/2),"frame",0,2.52);let s=pn(r,new Dt(2.15,8,12,1.38,.3,0,Math.PI/2),"dark",0,2.52);s.rotation.y=-.35,Rt(r,ae(0,3.2,0),ae(0,4.3,2.4),.22,"metal"),ge(r,.8,1.4,.12,"dark",0,.9,2.08);for(let a of[-1.1,1.1])ge(r,.5,.7,.12,"window",a,1.4,1.76)}function Md(i,e,t,n=12,r=3.4){ge(i,r+.45,.4,n,"stone",e,-.04,t),ge(i,r,.08,n,"timber",e,.21,t);for(let s=-n/2;s<=n/2;s+=.65)ge(i,r,.035,.05,"metal",e,.265,t+s);for(let s of[-1,1]){let a=e+s*(r/2+.12);for(let o=-n/2;o<=n/2;o+=1.5)ge(i,.14,1.05,.14,"frame",a,.66,t+o);for(let o of[.65,1.15])Rt(i,ae(a,o,t-n/2),ae(a,o,t+n/2),.065);for(let o of[-n*.3,n*.3])ge(i,.7,3,1.25,"stone",a,-1.1,t+o)}}var Oo=class{root=new ke;water;ready;projects=new Map;loadouts=new Map;repairs=new Map;campuses=new Map;activitySites=new Map;activityPaths=[];roads=[];locations;nodes;river=new Gn([ae(-86,0,1),ae(-62,0,5),ae(-43,0,18),ae(-24,0,22),ae(-4,0,19),ae(13,0,20),ae(30,0,28),ae(53,0,28),ae(86,0,36)]);riverPoints;brookPoints=new Gn([ae(-67,0,-47),ae(-61,0,-33),ae(-66,0,-20),ae(-59,0,-9),ae(-62,0,5)]).getPoints(100);constructor(e,t,n,r){this.locations=t,this.nodes=n,this.riverPoints=this.river.getPoints(200),e.add(this.root),this.root.name="Expedition valley",this.makeRoads(),this.createActivities(),this.ready=this.landscape(r),this.vegetation(),this.infrastructure(),this.naturalDetails()}riverDistance(e,t){return Math.sqrt(Math.min(...this.riverPoints.map(n=>(n.x-e)**2+(n.z-t)**2)))}height(e,t){let n=this.riverDistance(e,t),r=-2.4+ni(2.3,5.2,n)*2.34;if(n<5.2)return r;let s=ni(47,79,-t),a=ni(47,83,e),o=ni(47,81,-e),l=Math.max(s,a,o)*(5+8*(.5+.5*Math.sin(e*.11+t*.07))),c=2.3*Math.exp(-((e+8)**2/55+(t+23)**2/85))+2.1*Math.exp(-((e-18)**2/44+(t+6)**2/90)),d=1;for(let f of Object.values(this.locations))d*=ni(8,12,Math.hypot(e-f.x,t-f.z));for(let f of Object.values(this.nodes))for(let g of f)d*=ni(2.3,4.3,Math.hypot(e-g.position.x,t-g.position.z));for(let f of this.activitySites.values())d*=ni(4.5,6.5,Math.hypot(e-f.position.x,t-f.position.z));for(let f of[...this.roads,...this.activityPaths])if(f.some(g=>Math.hypot(e-g.x,t-g.z)<2)){d=0;break}let u=-.065+(l+c)*d,h=Math.sqrt(Math.min(...this.brookPoints.map(f=>(f.x-e)**2+(f.z-t)**2)));return gr.lerp(-1.65,u,ni(.6,2.1,h))}createActivities(){for(let[e,t,n]of[["jokes",-13,14],["riddles",16,-18],["lookout",-8,-15],["numbers",19,13]]){let r=new ke;r.position.set(t,0,n),r.name=`Activity: ${e}`,r.userData.activity=e,this.activitySites.set(e,r),this.root.add(r)}for(let[e,t]of this.activitySites){let n=(c,d,u=1.5)=>{ge(t,u,.14,.48,"timber",c,.48,d);for(let h of[-u*.35,u*.35])ge(t,.13,.43,.4,"timber",c+h,.2,d)};if(e==="jokes"){ge(t,3.8,.24,2.2,"timber",0,.12,-.65);for(let c=0;c<10;c++)ge(t,.34,.04,2.16,"gold",-1.66+c*.37,.26,-.65);ge(t,1.3,.12,.48,"timber",0,.06,.65);for(let c of[-1.8,1.8])for(let d of[-1.65,.35])bt(t,.055,2.6,"timber",c,1.3,d,6);for(let c=0;c<8;c++)for(let d of[-1,1]){let u=ge(t,.49,.055,1.22,c%2?"wall":"red",-1.715+c*.49,2.66,-.65+d*.57);u.rotation.x=d*.2,ge(t,.49,.17,.06,c%2?"wall":"red",-1.715+c*.49,2.44,-.65+d*1.18)}bt(t,.24,.05,"metal",0,.3,-.25,10),Rt(t,ae(0,.32,-.25),ae(0,1.5,-.25),.035,"metal"),Rt(t,ae(0,1.5,-.25),ae(.35,1.65,-.05),.065,"dark");for(let c of[-1.1,1.1])n(c,1.8,1.35)}else if(e==="riddles"){for(let c of[-1.15,1.15])for(let d=0;d<4;d++)ge(t,.55,.42,.62,"stone",c,.21+d*.44,-.85);for(let c=0;c<9;c++){let d=c*Math.PI/8,u=ge(t,.43,.55,.66,"stone",Math.cos(d)*1.15,1.76+Math.sin(d)*1.15,-.85);u.rotation.z=d-Math.PI/2}for(let[c,d]of[-1.4,0,1.4].entries()){let u=ge(t,.63,.95+c*.13,.26,"stone",d,.49+c*.065,1.1);u.rotation.z=(c-1)*.08;let h=c===0?new Ln(.18,.032,4,12):new ss(.14,.19,c===1?3:4);pn(t,h,"dark",d,.65,1.242),ge(t,.36,.025,.014,"dark",d,.32,1.242)}for(let c of[-.8,.6]){let d=bt(t,.38,.1,"stone",c,.015,.25,7);d.scale.z=.7}}else if(e==="lookout"){for(let f=0;f<9;f++)ge(t,3.4,.16,.3,"timber",0,.45,-1.45+f*.33);for(let f of[-1.55,1.55])for(let g of[-1.5,.95])bt(t,.085,1.6,"timber",f,.75,g,8);for(let f of[-1.55,1.55])Rt(t,ae(f,1.25,-1.5),ae(f,1.25,.95),.06,"timber");Rt(t,ae(-1.55,1.25,-1.5),ae(1.55,1.25,-1.5),.06,"timber");for(let f=0;f<3;f++)ge(t,1.25,.15,.42,"timber",0,.375-f*.15,1.15+f*.38);for(let f of[0,2.094,4.189])Rt(t,ae(Math.cos(f)*.5,.55,-.3+Math.sin(f)*.5),ae(0,1.5,-.3),.04,"metal");let c=ae(.1,1.5,0),d=ae(-.35,1.94,-.92);Rt(t,c,d,.16,"gold"),bt(t,.18,.07,"window",d.x,d.y,d.z,16).quaternion.setFromUnitVectors(ae(0,1,0),d.clone().sub(c).normalize()),bt(t,1,.035,"water",2.55,.015,-.6,24).scale.set(.65,1,1.25);for(let f=0;f<12;f++){let g=f*Math.PI/6,y=pn(t,new Gi(.17,0),"stone",2.55+Math.cos(g)*.72,.07,-.6+Math.sin(g)*1.3);y.scale.y=.6}}else{let c=["bc","abdeg","abcdg","bcfg","acdfg"],d={a:[0,-.2,.24,.045],b:[.12,-.1,.045,.2],c:[.12,.1,.045,.2],d:[0,.2,.24,.045],e:[-.12,.1,.045,.2],f:[-.12,-.1,.045,.2],g:[0,0,.24,.045]};for(let h=0;h<5;h++){let f=-1.9+h*.91,g=.75+Math.sin(h*1.3)*.38,y=bt(t,.46,.16,"stone",f,.05,g,7);y.scale.z=.84;for(let p of c[h]){let[m,_,x,b]=d[p];ge(t,x,.012,b,"dark",f+m,.137,g+_)}}ge(t,1.9,.14,.8,"timber",.3,.85,-.7);for(let h of[-.35,.95])for(let f of[-1,1])Rt(t,ae(h,.05,-.7+f*.65),ae(h,.8,-.7-f*.2),.065,"timber");n(.3,-1.4,2),n(.3,.05,2),ge(t,.35,.27,.3,"gold",.7,1.05,-.7);let u=pn(t,new Ln(.13,.025,4,10,Math.PI),"timber",.7,1.2,-.7);u.rotation.y=Math.PI/2}if(e==="jokes")for(let c of t.children)c.position.x-=.65;Mi(t,!0),t.traverse(c=>{c.userData.activity=e});let r=t.position.clone().add(ae(e==="jokes"?3:e==="numbers"?-2.7:0,0,e==="jokes"?-3.5:e==="numbers"?.8:2.7)),s=this.roads.flat().reduce((c,d)=>c.distanceToSquared(r)<d.distanceToSquared(r)?c:d),a=s.clone().lerp(r,.5);a.x+=.25;let o=new Gn([s,a,r]).getPoints(16),l=this.activityParking(e);e!=="jokes"&&o.push(ae(r.x,.08,l.z)),o.push(l),this.activityPaths.push(o)}}makeRoads(){let e=this.locations.hq.clone().add(ae(2.4,.02,4.5));for(let[t,n]of Object.entries(this.locations)){if(t==="hq")continue;let r=n.clone().add(ae(2.4,.02,4.5)),s=t==="harbour"||t==="english",a=ae(s?-10:10,.02,9.5),o=t==="grove"?ae(20,.02,8.5):ae(s?-12:12,.02,-5),l=t==="english"||t==="physics"?[n.clone().add(ae(5.8,.02,10)),n.clone().add(ae(5.8,.02,6))]:t==="grove"?[ae(24,.02,12),ae(29,.02,12),ae(29,.02,8)]:[];this.roads.push(new Gn([e,a,o,...l,r]).getPoints(64))}}roadPath(e,t,n="hq"){let r=Object.keys(this.locations).filter(u=>u!=="hq"),s=r.indexOf(t),a=this.locations.hq.clone().add(ae(2.4,.02,4.5)),o=this.roads[r.indexOf(n)];if(n.startsWith("activity-")){let u=this.activityRoadPoints(n.slice(9));if(u.length){let h=0;u.forEach((y,p)=>{y.distanceToSquared(e)<u[h].distanceToSquared(e)&&(h=p)});let f=u.slice(0,h+1).reverse(),g=t==="hq"?[]:this.roads[s]?.slice(1)||[];return[e.clone(),...f,...g]}}if(t==="hq"){let u=o||this.roads.find(h=>e.distanceTo(h.at(-1))<3);return u?[e.clone(),...u.slice().reverse()]:[e.clone(),a]}let l=this.roads[s];if(!l)return[e.clone(),a];if(n===t)return[e.clone(),l.at(-1).clone()];let c=o||this.roads.find(u=>e.distanceTo(u.at(-1))<3),d=c?c.slice().reverse():e.distanceTo(a)>2?[a]:[];return[e.clone(),...d,...l.slice(1)]}activityParking(e){return this.activitySites.get(e)?.position.clone().add(ae(3,.08,e==="jokes"?-2:3))}activityRoadPoints(e){let t=this.activityPaths[[...this.activitySites.keys()].indexOf(e)];if(!t?.length)return[];let n=-1,r=-1,s=1/0;return this.roads.forEach((a,o)=>a.forEach((l,c)=>{let d=l.distanceToSquared(t[0]);d<s&&(s=d,n=o,r=c)})),n<0?[]:[...this.roads[n].slice(0,r+1),...t.slice(1)]}activityRoute(e,t,n="hq"){let r=this.activityRoadPoints(t);if(!r.length)return[e.clone()];let s=u=>{let h=0,f=1/0;return u.forEach((g,y)=>{let p=(g.x-e.x)**2+(g.z-e.z)**2;p<f&&(f=p,h=y)}),h},a=n.replace(/^activity[-:]/,""),l=[...this.activitySites.keys()].find(u=>{let h=this.activityParking(u);return Math.hypot(h.x-e.x,h.z-e.z)<.75})||(this.activitySites.has(a)?a:void 0),c;if(l===t)c=[],r.splice(0,s(r));else if(l){let u=this.activityRoadPoints(l);c=u.slice(0,s(u)+1).reverse()}else{let u=Object.keys(this.locations).filter(f=>f!=="hq"),h=this.roads[u.indexOf(n)]||this.roads.find(f=>f.at(-1).distanceTo(e)<3);c=h?h.slice(0,s(h)+1).reverse():[]}let d=[e.clone()];for(let u of[...c,...r])d.at(-1).distanceToSquared(u)>1e-8&&d.push(u.clone());return d}ribbon(e,t,n,r,s=!1){let a=[],o=[],l=[];e.forEach((u,h)=>{let f=e[Math.min(h+1,e.length-1)].clone().sub(e[Math.max(0,h-1)]).normalize();for(let g of[-1,1]){let y=u.x+f.z*t*g/2,p=u.z-f.x*t*g/2;a.push(y,r+(s?this.height(y,p):0),p),o.push((g+1)/2,h/6)}if(h){let g=(h-1)*2;l.push(g,g+2,g+1,g+1,g+2,g+3)}});let c=new Mt;c.setAttribute("position",new We(a,3)),c.setAttribute("uv",new We(o,2)),c.setIndex(l),c.computeVertexNormals();let d=new vt(c,n);return d.receiveShadow=!0,this.root.add(d),d}async landscape(e){let t=new bi(1500,1500);t.rotateX(-Math.PI/2);let n=new vt(t,new xt({color:9214077,roughness:1}));n.position.y=-3.2,this.root.add(n);let r=new bi(230,210,180,168);r.rotateX(-Math.PI/2),r.translate(0,0,-12);let s=r.attributes.position,a=[],o=new Fe;for(let p=0;p<s.count;p++){let m=s.getX(p),_=s.getZ(p),x=this.height(m,_),b=this.riverDistance(m,_);s.setY(p,x),o.set(9216381),o.lerp(new Fe(11252378),ni(1.5,10,x)*.7),o.lerp(new Fe(10197382),(1-ni(4.6,7.1,b))*.85);let P=.5+.5*Math.sin(m*.095+Math.sin(_*.12))*Math.cos(_*.085);o.lerp(new Fe(7441256),P*.23),o.multiplyScalar(.96+.045*Math.sin(m*.27)*Math.cos(_*.31)),a.push(o.r,o.g,o.b)}r.setAttribute("color",new We(a,3)),r.computeVertexNormals();let l=new xt({vertexColors:!0,roughness:.98}),c=new vt(r,l);c.receiveShadow=!0,c.castShadow=!0,c.name="Sculpted grass and stone valley",this.root.add(c);let d=new xt({color:4750728,metalness:.22,roughness:.28});this.water=this.ribbon(this.riverPoints,6.5,d,-1.02),this.water.name="Winding river",this.ribbon(this.brookPoints,1.5,ii("stone"),.04,!0).name="Tributary pebble bed",this.ribbon(this.brookPoints,1.2,d,-1.02).name="Woodland tributary";let u=new ke;u.name="Activity footpaths",this.root.add(u);for(let p of this.activityPaths)u.add(this.ribbon(p,1.15,ii("soil"),.1,!0));Mi(u,!0);for(let p of this.roads)this.ribbon(p,3.2,ii("soil"),.075,!0),this.ribbon(p,2.65,ii("road"),.092,!0);for(let[p,m]of Object.entries(this.nodes)){let _=this.locations[p].clone().add(ae(2.4,0,4.5));for(let x of m){let b=x.position,P=_.clone().lerp(b,.5);P.z+=1,this.ribbon(new Gn([_,P,b]).getPoints(20),1.35,ii("soil"),.083,!0)}}let h=p=>new Promise(m=>new Ao().load(`./assets/${p}`,m,void 0,()=>{e.push(p),m(null)})),f=await h("valley-ground.jpg"),g=await h("ground-normal.jpg");if(f&&(f.colorSpace=Lt,f.wrapS=f.wrapT=Vn,f.repeat.set(14,14),f.anisotropy=4,l.map=f,l.onBeforeCompile=p=>{p.fragmentShader=p.fragmentShader.replace("#include <map_fragment>",`#ifdef USE_MAP
vec4 grass = texture2D(map, vMapUv);
diffuseColor.rgb *= mix(vec3(1.0), grass.rgb, 0.46);
#endif`)},l.customProgramCacheKey=()=>"valley-grass-46"),g){g.wrapS=g.wrapT=Vn,g.repeat.set(31,28),g.anisotropy=4,l.normalMap=g,l.normalScale.set(.32,.32);let p=g.clone();p.repeat.set(2,7),p.needsUpdate=!0,d.normalMap=p,d.normalScale.set(.14,.07),d.needsUpdate=!0}let y=await h("concrete-colour.jpg");if(y){y.colorSpace=Lt,y.wrapS=y.wrapT=Vn,y.repeat.set(2,2),y.anisotropy=4;for(let p of["wall","stone"]){let m=ii(p);m.map=y,m.onBeforeCompile=_=>{_.fragmentShader=_.fragmentShader.replace("#include <map_fragment>",`#ifdef USE_MAP
diffuseColor.rgb *= mix(vec3(1.0), texture2D(map, vMapUv).rgb, 0.32);
#endif`)},m.customProgramCacheKey=()=>"valley-masonry-32",m.needsUpdate=!0}}l.needsUpdate=!0}vegetation(){let e=12091,t=()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296),n=[],r=[];for(let c=0;c<1700&&n.length<490;c++){let d=t()*158-79,u=t()*120-82,h=this.height(d,u);this.activityClearance(d,u,2)||this.brookPoints.some(g=>Math.hypot(d-g.x,u-g.z)<2.8)||[[10,19.7],[12,-48],[44,6]].some(([g,y])=>Math.hypot(d-g,u-y)<7.5)||this.riverDistance(d,u)<6||Object.values(this.locations).some(g=>Math.hypot(d-g.x,u-g.z)<9)||Object.values(this.nodes).flat().some(g=>Math.hypot(d-g.position.x,u-g.position.z)<3)||Object.entries(this.nodes).some(([g,y])=>{let p=this.locations[g].clone().add(ae(2.4,0,4.5));return y.some(m=>{let _=m.position,x=_.x-p.x,b=_.z-p.z,P=gr.clamp(((d-p.x)*x+(u-p.z)*b)/(x*x+b*b),0,1);return Math.hypot(d-p.x-x*P,u-p.z-b*P)<2.5})})||this.roads.some(g=>g.some(y=>Math.hypot(d-y.x,u-y.z)<3))||u>11&&t()>.25||t()>.62+.24*Math.sin(d*.13+u*.21)||n.push({x:d,y:h,z:u,s:.55+t()*.68,a:t()*6.28})}let s=new Ct,a=(c,d,u)=>{let h=new ke;for(let g=0;g<3;g++){let y=g/3,p=c*(1-y*.68),m=-d*.3+y*d*.68;for(let _=0;_<4;_++){let x=_/4*Math.PI*2+g*1.7+u,b=pn(h,new Js(1,0),"leaf",Math.sin(x)*p*.48,m+Math.sin(x*3)*.08,Math.cos(x)*p*.48);b.scale.set(p*.53,d*.14*(1-y*.45),p*.81),b.rotation.set(.14,x,.08*Math.sin(x))}}let f=pn(h,new hr(c*.25,d*.4,7),"leaf",0,d*.37);return f.rotation.y=u,Mi(h),h.children[0].geometry},o=[{geo:new In(.075,.17,3.8,6),colour:6577999,y:1.9,s:1},{geo:a(1.12,2.65,1),colour:4283725,y:2.2,s:1},{geo:a(.88,2.3,3),colour:5139541,y:3.15,s:1},{geo:a(.59,1.9,5),colour:6059867,y:4.05,s:1}];for(let c of o){let d=new _i(c.geo,new xt({color:c.colour,roughness:1}),n.length);n.forEach((u,h)=>{s.position.set(u.x,u.y+c.y*u.s,u.z),s.scale.setScalar(u.s),s.rotation.set(0,u.a,.025*Math.sin(u.a)),s.updateMatrix(),d.setMatrixAt(h,s.matrix),d.setColorAt(h,new Fe().setScalar(.86+h%7*.035))}),d.castShadow=d.receiveShadow=!0,d.name="Instanced conifer canopy",this.root.add(d)}for(let c=0;c<210;c++){let d=this.riverPoints[Math.floor(t()*this.riverPoints.length)],u=t()>.5?1:-1,h=d.x+(t()-.5)*3,f=d.z+u*(4.5+t()*2.2),g=this.height(h,f);this.activityClearance(h,f,1.2)||this.roads.some(y=>y.some(p=>Math.hypot(h-p.x,f-p.z)<2.6))||r.push({x:h,y:g,z:f,s:.25+t()*.75,a:t()*6})}let l=new _i(new Gi(1,0),ii("stone"),r.length);r.forEach((c,d)=>{s.position.set(c.x,c.y,c.z),s.scale.set(c.s*1.4,c.s*.8,c.s),s.rotation.set(c.a,c.a*.5,0),s.updateMatrix(),l.setMatrixAt(d,s.matrix)}),l.castShadow=l.receiveShadow=!0,this.root.add(l)}activityClearance(e,t,n=0){return[...this.activitySites.values()].some(r=>Math.hypot(e-r.position.x,t-r.position.z)<3.7+n)||[...this.activitySites.keys()].some(r=>{let s=this.activityParking(r);return Math.hypot(e-s.x,t-s.z)<4.2+n})||this.activityPaths.some(r=>r.some(s=>Math.hypot(e-s.x,t-s.z)<.8+n))}naturalDetails(){let e=new ke;e.name="Local wildflowers, reeds and rocky outcrops",this.root.add(e);let t=(s,a)=>!this.roads.some(o=>o.some(l=>Math.hypot(s-l.x,a-l.z)<2.8))&&!this.activityPaths.some(o=>o.some(l=>Math.hypot(s-l.x,a-l.z)<1.3))&&!Object.values(this.locations).some(o=>Math.hypot(s-o.x,a-o.z)<9)&&!Object.values(this.nodes).flat().some(o=>Math.hypot(s-o.position.x,a-o.position.z)<4);for(let[s,a]of this.activitySites)for(let o of[-1,1])for(let l=0;l<10;l++){let c=a.position.x+o*(2.35+l%3*.2),d=a.position.z-1.8+Math.floor(l/3)*.24;if(!t(c,d)||s==="lookout"&&o===1||this.riverDistance(c,d)<5.5)continue;let u=this.height(c,d);Rt(e,ae(c,u,d),ae(c+.035,u+.27,d),.018,"leaf");let h=pn(e,new Js(.095,0),l%4?"wall":"gold",c+.035,u+.29,d);h.scale.y=.45,pn(e,new Mo(.11,0),"leaf",c+.065,u+.12,d).scale.set(1.2,.25,.5)}for(let[s,a]of[[-55,-31],[-47,-51],[47,-47],[64,11],[-65,19]])for(let o=0;o<8;o++){let l=s+Math.sin(o*2.4)*2.7,c=a+Math.cos(o*1.8)*2;if(!t(l,c))continue;let d=pn(e,new Gi(1,0),o%3?"stone":"soil",l,this.height(l,c)+.15,c);d.scale.set(1.1+o%3*.35,.45+o%2*.5,.7+o%4*.2),d.rotation.set(.15,o*1.7,.2)}let n=(s,a,o,l)=>{let c=ae(s+Math.sin(l)*.1,a+.45+l%3*.09,o);Rt(e,ae(s,a,o),c,.018,"leaf"),bt(e,.035,.16,"timber",c.x,c.y,c.z,5)};for(let s=5;s<this.riverPoints.length-5;s+=4){let a=this.riverPoints[s],o=this.riverPoints[s+1],l=o.clone().sub(a).normalize();for(let c of[-1,1]){let d=a.x+l.z*c*4,u=a.z-l.x*c*4;if(!(!t(d,u)||this.activityClearance(d,u,.8)||Math.abs(d-10)<3||Math.abs(d+23)<3||Math.abs(d-53)<3))for(let h=0;h<3;h++)n(d+h*.13,this.height(d+h*.13,u),u,s+h)}}let r=this.activitySites.get("lookout").position;for(let s=0;s<7;s++)n(r.x+2.95+s%2*.12,.03,r.z-1.3+s*.2,s);Mi(e,!0)}infrastructure(){let e=new ke;this.root.add(e),Md(e,-23,22,12),Md(e,53,28,13),this.ribbon([ae(-23,0,16),ae(-23,0,13),ae(-25,0,10),ae(-28.6,0,-2.5)],2.8,ii("soil"),.12,!0),this.ribbon([ae(-23,0,28),ae(-23,0,32),ae(0,0,34),ae(25,0,38),ae(53,0,36)],2.4,ii("soil"),.12,!0),ge(e,7,.27,2.2,"timber",-35,-.2,15.2);for(let n=-38;n<=-32;n+=1.1)bt(e,.12,2.7,"timber",n,-1,16.2,8);pn(e,new In(1,.7,.65,6),"teal",-35,-.65,18).scale.set(1,1,2.7),ge(e,1.1,.75,1.25,"wall",-35,-.03,17.7),ge(e,1.2,.08,1.45,"roof",-35,.38,17.7);for(let n of[-30.8,-29.6])ge(e,.8,.7,.9,"timber",n,.4,13.8);Mi(e);for(let n of["bridge","observatory","greenhouse"]){let r=new ke;r.name=`Restoration: ${n}`,this.root.add(r),n==="bridge"&&Md(r,10,19.7,13,4),n==="observatory"&&mf(r,12,-48,.9),n==="greenhouse"&&Sd(r,44,6,.85),Mi(r),r.visible=!1,this.projects.set(n,r)}for(let n of[2,5]){let r=new ke;if(r.name=`HQ repair after ${n} resolved stations`,this.root.add(r),n===2){let s=new xt({color:16048045,emissive:16765578,emissiveIntensity:1.6,roughness:.5});for(let a of[-5.8,-2.4,1,4.4]){bt(r,.065,1.5,"metal",a,.75,12.2);let o=new vt(new yn(.22,.24,.22),s);o.position.set(a,1.55,12.2),r.add(o),ge(r,.32,.08,.32,"roof",a,1.72,12.2)}}else{for(let s of[-5.2,-2.1])Fo(r,s,12.9,.9);for(let s of[4.8,6])ge(r,.95,.75,.9,"timber",s,.4,9.2)}Mi(r),r.visible=!1,this.repairs.set(n,r)}}campus(e,t,n=1){let r=t||new ke;t||(r.position.copy(this.locations[e]),this.root.add(r)),r.name=`${e} miniature campus`,r.userData.destination=e,this.campuses.set(e,r);let s={hq:"teal",harbour:"teal",english:"red",physics:"violet",chemistry:"teal",grove:"leaf"}[e];if(ge(r,10.7,.08,8.1,"paving",0,-.01,-.8),e==="hq"){wn(r,-3.5,-3.2,4.8,4.5,2+.5*(n-1),s),wn(r,3.3,-3.2,4.3,4.2,2.3,"metal",!0),ge(r,2.7,1.6,.09,"dark",3.3,.95,-1.04);for(let a=0;a<3;a++)ge(r,2.6,.045,.05,"frame",3.3,.5+a*.48,-1);for(let a=0;a<5;a++)ge(r,.85,.7,.9,a%2?"timber":"teal",-6.8+a*1.08,.4,3.3);for(let a of[-6.6,6.7])bt(r,.07,3.4,"metal",a,1.7,1),ge(r,.5,.12,.28,"gold",a,3.45,1);if(n>1)for(let a=0;a<3;a++)Fo(r,-4+a*3,-7.3);n>2&&(wn(r,-7.6,-2,2,2,5.2,"teal",!0),ge(r,2.2,.8,2.2,"window",-7.6,4.7,-2))}else if(e==="harbour"){wn(r,-2.3,-2.4,5.6,4,2.6,s),wn(r,3.8,-.9,2.7,3.1,1.9,"gold",!0);for(let a=0;a<6;a++)ge(r,1.45,.8+a%2*.7,1.1,a%2?"timber":"teal",-4.8+a*1.7,.5+a%2*.35,2.2);for(let a of[-4.5,4.5])Rt(r,ae(a,0,3.7),ae(a,4.7,3.7),.11,"gold");Rt(r,ae(-4.5,4.7,3.7),ae(4.5,4.7,3.7),.14,"gold"),Rt(r,ae(-1,4.7,3.7),ae(-1,2.3,3.7),.035,"metal")}else if(e==="english"){wn(r,-1.8,-2.2,5.6,4.5,2.7,s),wn(r,3.1,-1.1,2.9,3.2,2,s),wn(r,-4.8,1.8,1.6,1.7,4.6,s,!0);let a=bt(r,.5,.06,"wall",-4.8,3.75,2.7,24);a.rotation.x=Math.PI/2,Rt(r,ae(-4.8,3.75,2.75),ae(-4.8,4.1,2.75),.025,"dark"),Rt(r,ae(-4.8,3.75,2.75),ae(-4.52,3.75,2.75),.025,"dark");for(let o of[-1,2]){ge(r,1.8,.13,.55,"timber",o,.55,3);for(let l of[-.65,.65])ge(r,.08,.5,.5,"metal",o+l,.25,3)}}else if(e==="physics"){mf(r,-2.1,-1.7),wn(r,3.3,-.7,3.4,3.8,2.1,s,!0);for(let a of[-4,-.9,2.2])Fo(r,a,3.4);bt(r,.09,5,"frame",5,2.5,-3.4),Rt(r,ae(4,4.6,-3.4),ae(6,4.6,-3.4),.06)}else if(e==="chemistry"){wn(r,-1.9,-1.9,5.7,4.4,2.5,s,!0),wn(r,3.9,-.1,2.5,3.2,1.9,s,!0);for(let a of[-4.2,-2.3,-.4])bt(r,.58,2,"frame",a,1.1,2.4),bt(r,.6,.15,"teal",a,2.16,2.4),Rt(r,ae(a,2.2,2.4),ae(a,3,-.2),.075,"metal");for(let a of[-3.3,-.7])bt(r,.22,1.25,"metal",a,3.3,-2.7),bt(r,.32,.1,"frame",a,3.98,-2.7)}else{Sd(r,-1.4,-1.5,.86),wn(r,4.1,.2,2.7,3.5,1.9,s);for(let a=0;a<4;a++)ge(r,2.8,.16,.6,"timber",-4.7,.1,-2+a*1.3),ge(r,2.6,.26,.44,"leaf",-4.7,.3,-2+a*1.3);bt(r,.75,1.8,"teal",4.3,.98,-3.2)}for(let[a,o]of(this.nodes[e]||[]).entries()){let l=o.position.clone().sub(this.locations[e]),c=l.x+(e==="grove"&&a===3?-3.3:0);ge(r,3.2,.08,3.5,"paving",c,-.005,l.z-1.25),e==="grove"&&a===1?Sd(r,l.x,l.z-2,.45):wn(r,c,l.z-2,2.45+a%2*.4,2.3,1.4+a%3*.15,s,e==="chemistry"),bt(r,.055,1.5,"metal",l.x+1.5,.75,l.z),ge(r,.34,.36,.08,s,l.x+1.5,1.3,l.z),a%2===0&&Fo(r,l.x+2.7,l.z-2,.6)}return Mi(r),r}syncCampaign(e,t){let n=e?.projectsBuilt??e?.builtProjects??e?.projects??[],r=t??e?.totalResolved??(Array.isArray(e?.resolvedStations)?e.resolvedStations.length:Number(e?.resolvedStations)||0);for(let[s,a]of this.repairs)a.visible=r>=s;for(let[s,a]of this.projects)a.visible=Array.isArray(n)?n.some(o=>o===s||o?.id===s&&(o.built===!0||o.status==="built"||o.completed===!0)):n[s]===!0||n[s]?.built===!0||n[s]?.status==="built"}setLoadout(e,t){if(!this.loadouts.size)for(let r of["survey","engineering","ecology"]){let s=new ke;if(s.name=`Atlas ${r} equipment`,e.add(s),r==="survey"&&(bt(s,.04,1.4,"frame",-.8,2.2,-1.5),pn(s,new Dt(.23,12,8),"wall",-.8,2.95,-1.5),ge(s,.52,.38,.55,"window",.75,1.92,-1.5)),r==="engineering"){ge(s,2.1,.35,.45,"gold",0,.53,2.5);for(let a of[-.75,.75])Rt(s,ae(a,.6,1.6),ae(a,.55,2.5),.065,"metal")}if(r==="ecology")for(let a of[-.85,.85])ge(s,.55,.65,.8,"teal",a,1.98,-1.5),ge(s,.59,.08,.84,"frame",a,2.34,-1.5);Mi(s),this.loadouts.set(r,s)}let n={scout:"survey",surveyor:"survey",hauler:"engineering",builder:"engineering",engineer:"engineering",botanist:"ecology",ranger:"ecology"};for(let[r,s]of this.loadouts)s.visible=r===(n[t]||t)}};var Bo=Math.PI*2,Dn=i=>new C(...i),Ed=(i,e)=>(i%e+e)%e;function eb(){if(typeof document>"u")return null;let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d");if(!e)return null;e.fillStyle="#f4f4f4",e.fillRect(0,0,128,128);let t=2317,n=()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296);for(let s=0;s<950;s++)e.fillStyle=`rgba(65,62,54,${.015+n()*.085})`,e.fillRect(n()*128,n()*128,.5+n()*2,.5+n());for(let s=0;s<40;s++)e.fillStyle="#60656330",e.fillRect(n()*128,n()*128,1+n()*8,.6);let r=new wi(i);return r.colorSpace=Lt,r.wrapS=r.wrapT=Vn,r}function tb(){if(typeof document>"u")return null;let i=document.createElement("canvas");i.width=256,i.height=128;let e=i.getContext("2d");if(!e)return null;let t=e.createLinearGradient(0,0,0,128);t.addColorStop(0,"#a6c7da"),t.addColorStop(.42,"#e9eef0"),t.addColorStop(.51,"#a5b5ae"),t.addColorStop(.6,"#68746d"),t.addColorStop(1,"#454f48"),e.fillStyle=t,e.fillRect(0,0,256,128),e.fillStyle="#ffffff",e.fillRect(30,17,39,17);let n=new wi(i);return n.colorSpace=Lt,n.mapping=Bs,n}function nb(){let i=eb(),e=tb(),t=(n,r=.48,s=.43,a=!0)=>new xt({color:n,metalness:r,roughness:s,map:a?i:null,envMap:e,envMapIntensity:.55});return{sage:t(9411448),edge:t(5661521),light:t(12831664),sand:t(14072441),teal:t(3771273),cream:t(15657431,.25),red:t(11355199,.32),yellow:t(15646520),yellowEdge:t(10976293),steel:t(11911364,.83,.29),iron:t(6450544,.7,.4),rubber:t(2369578,.02,.88,!1),inset:t(3555138,.18,.72,!1),seat:t(4541769,.02,.94,!1),cargo:t(10003882,.3,.66),glass:new xt({color:3767182,metalness:.4,roughness:.16,envMap:e,envMapIntensity:1.1}),lamp:new xt({color:16118488,emissive:16770464,emissiveIntensity:.6,roughness:.2}),amber:new xt({color:16759878,emissive:15631885,emissiveIntensity:.35,roughness:.28}),tail:new xt({color:12997698,emissive:8463385,emissiveIntensity:.25,roughness:.3})}}var $i=class{buckets=new Map;transform=new Ct;add(e,t,n=[0,0,0],r=[0,0,0]){this.transform.position.set(...n),this.transform.rotation.set(...r),this.transform.updateMatrix();let s=e.index?e.toNonIndexed():e;s!==e&&e.dispose(),s.applyMatrix4(this.transform.matrix),this.buckets.has(t)||this.buckets.set(t,[]),this.buckets.get(t).push(s)}box(e,t,n,r=[0,0,0]){this.add(new yn(...e),t,n,r)}cylinder(e,t,n,r,s=[0,0,0],a=e,o=16){this.add(new In(a,e,t,o),n,r,s)}rod(e,t,n,r,s=8){let a=Dn(e),o=Dn(t),l=o.clone().sub(a),c=new In(n,n,l.length(),s);c.applyQuaternion(new Kn().setFromUnitVectors(new C(0,1,0),l.normalize())),this.add(c,r,a.add(o).multiplyScalar(.5).toArray())}ring(e,t,n,r,s=[0,0,0]){this.add(new Ln(e,t,6,24),n,r,s)}cable(e,t,n){this.add(new Eo(new Gn(e.map(Dn)),24,t,5,!1),n)}finish(e){for(let[t,n]of this.buckets){let r=n.reduce((o,l)=>o+l.attributes.position.count,0),s=new Mt;for(let[o,l]of[["position",3],["normal",3],["uv",2]]){let c=new Float32Array(r*l),d=0;for(let u of n){let h=u.getAttribute(o);h&&c.set(h.array,d),d+=u.attributes.position.count*l}s.setAttribute(o,new Ht(c,l))}s.computeBoundingSphere(),s.computeBoundingBox();let a=new vt(s,t);a.castShadow=a.receiveShadow=!0,a.name="fleet-static",e.add(a);for(let o of n)o.dispose()}this.buckets.clear()}};function Qt(i,e,t,n,r=0){let s=i/2,a=e/2,o=Math.min(t,s*.8,a*.8);return[[-s+o,n,r-a],[s-o,n,r-a],[s,n,r-a+o],[s,n,r+a-o],[s-o,n,r+a],[-s+o,n,r+a],[-s,n,r+a-o],[-s,n,r-a+o]]}function ls(i,e,t){let n=[],r=(u,h,f)=>n.push(...u,...h,...f),s=e[0].length;for(let u=0;u<e.length-1;u++)for(let h=0;h<s;h++){let f=(h+1)%s;r(e[u][h],e[u+1][h],e[u+1][f]),r(e[u][h],e[u+1][f],e[u][f])}let a=e[0],o=e[e.length-1];for(let u=1;u<s-1;u++)r(a[0],a[u],a[u+1]),r(o[0],o[u+1],o[u]);let l=new Mt;l.setAttribute("position",new We(n,3)),l.computeVertexNormals();let c=[],d=l.attributes.normal.array;for(let u=0;u<n.length;u+=3){let h=Math.abs(d[u]),f=Math.abs(d[u+1]);c.push(h>f&&h>Math.abs(d[u+2])?n[u+2]:n[u],f>.6?n[u+2]:n[u+1])}l.setAttribute("uv",new We(c,2)),i.add(l,t)}function ze(i,e,t,n,r=.06,s=[0,0,0]){let[a,o,l]=e,[c,d,u]=n,h=Math.min(r,o*.3),f=[Qt(a-h,l-h,r,-o/2),Qt(a,l,r,-o/2+h),Qt(a,l,r,o/2-h),Qt(a-h,l-h,r,o/2)],g=new Rn(...s);for(let y of f)for(let p of y){let m=Dn(p).applyEuler(g);p[0]=m.x+c,p[1]=m.y+d,p[2]=m.z+u}ls(i,f,t)}function ea(i,e,t,n,r,s=!1){let[a,o,l]=e;i.box(s?[.045,n,t]:[t,.035,n],r.inset,e);for(let c=0;c<9;c++){let d=(c-4)*n/10;i.box(s?[.065,.026,t*.94]:[t*.94,.04,.028],r.iron,s?[a,o+d,l]:[a,o+.025,l+d])}}function xf(i,e,t,n,r,s=!1){for(let a=0;a<n;a++){let o=Dn(e).lerp(Dn(t),n>1?a/(n-1):0).toArray();i.cylinder(.025,.025,r.steel,o,s?[0,0,Math.PI/2]:[0,0,0],.025,6)}}function cs(i,e,t,n=0,r=e.light){let[s,a,o]=t;i.box(n?[.024,.22,.22]:[.22,.22,.024],r,t,n?[Math.PI/4,0,0]:[0,0,Math.PI/4]);for(let l=0;l<2;l++)i.box(n?[.026,.035,.19-l*.06]:[.19-l*.06,.035,.026],e.steel,[s,a-.21-l*.07,o])}function ta(i,e,t,n,r,s){for(let a of[-1,1])ze(i,[.32,.2,.13],e.iron,[a*t,n,r]),i.box([.23,.11,.035],e.lamp,[a*t,n+.018,r+.077]),i.box([.07,.095,.037],e.amber,[a*(t+.115),n+.02,r+.079]),i.box([.23,.12,.07],e.inset,[a*t,n,s]),i.box([.16,.07,.025],e.tail,[a*t,n+.006,s-.05])}function yf(i,e,t,n,r){let s=new $i,a=[[i*.56,-e*.5],[i*.85,-e*.5],[i*.97,-e*.37],[i,-e*.23],[i,e*.23],[i*.97,e*.37],[i*.85,e*.5],[i*.56,e*.5]];s.add(new So(a.map(([l,c])=>new K(l,c)),24),t.rubber,[0,0,0],[0,0,Math.PI/2]),s.cylinder(i*.61,e*.82,n,[0,0,0],[0,0,Math.PI/2]);for(let l of[-1,1]){s.ring(i*.63,.023,t.iron,[l*e*.47,0,0],[0,Math.PI/2,0]),s.ring(i*.82,.012,t.rubber,[l*e*.505,0,0],[0,Math.PI/2,0]),s.cylinder(i*.22,.055,t.steel,[l*e*.49,0,0],[0,0,Math.PI/2]);for(let c=0;c<8;c++){let d=c/8*Bo;s.cylinder(i*.065,.02,t.inset,[l*e*.421,Math.cos(d)*i*.44,Math.sin(d)*i*.44],[0,0,Math.PI/2],i*.065,8),s.cylinder(.023,.035,t.steel,[l*e*.465,Math.cos(d)*i*.29,Math.sin(d)*i*.29],[0,0,Math.PI/2],.023,6)}}if(r)for(let l=0;l<28;l++)for(let c of[-1,1]){let d=(l+(c===1?.35:0))/28*Bo;s.box([e*.46,.036,i*.17],t.rubber,[c*e*.23,Math.cos(d)*(i-.01),Math.sin(d)*(i-.01)],[d,c*.2,0])}let o=new ke;return s.finish(o),o}function Ho(i,e,t,n,r,s=!0){let o=yf(e[0].radius,t,n,r,s).children.map(d=>{let u=new _i(d.geometry,d.material,e.length);return u.name="fleet-wheels",u.castShadow=u.receiveShadow=!0,u.instanceMatrix.setUsage(md),i.add(u),u}),l=new Ct,c=d=>{for(let u=0;u<e.length;u++){let h=e[u];l.position.set(h.x,h.y,h.z),l.scale.set(1,h.radius/e[0].radius,h.radius/e[0].radius),l.rotation.set(Ed(d,Bo*h.radius)/h.radius,0,0),l.updateMatrix();for(let f of o)f.setMatrixAt(u,l.matrix)}for(let u of o)u.instanceMatrix.needsUpdate=!0};c(0);for(let d of o){let u=new Cn;for(let h of e){let f=h.radius*1.06;u.expandByPoint(new C(h.x-t*.6,h.y-f,h.z-f)),u.expandByPoint(new C(h.x+t*.6,h.y+f,h.z+f))}d.boundingBox=u,d.boundingSphere=u.getBoundingSphere(new Qn)}return c}function vf(i,e,t,n,r=1.63,s=1.38,a=.46,o=.64){let l=a+.069,c=r*2,d=c*2+Bo*a,u=64,h=d/u,f=new _i(new yn(o,.07,h*.94),t.iron,u*2),g=new _i(new yn(o*.8,.046,h*.64),t.rubber,u*2);for(let x of[f,g])x.name="fleet-track-links",x.castShadow=x.receiveShadow=!0,x.instanceMatrix.setUsage(md),i.add(x);let y=[];for(let x of[-1,1]){let b=a-.047,P=r>1.4?4:3,E=(c-b*2-.12)/(P*2);for(let A of[-1,1])y.push({x:x*s,y:l,z:A*r,radius:b});for(let A=0;A<P;A++){let I=(A-(P-1)/2)*(E*2+.03);y.push({x:x*s,y:E+.104,z:I,radius:E}),e.rod([x*(s-.13),.82,I-.15],[x*s,E+.104,I],.047,t.iron)}for(let A of[-r*.47,r*.47])e.cylinder(.095,o*.6,t.rubber,[x*s,l+a-.136,A],[0,0,Math.PI/2]);e.box([.24,.16,c+.3],t.inset,[x*s,l,0])}let p=Ho(i,y,o*.68,t,n,!1),m=new Ct,_=x=>{let b=Ed(x,d);for(let P=0;P<2;P++)for(let E=0;E<u;E++){let A=Ed(E*h+b,d),I,M,v;A<c?(I=-r+A,M=l+a,v=0):A<c+Math.PI*a?(v=(A-c)/a,I=r+Math.sin(v)*a,M=l+Math.cos(v)*a):A<2*c+Math.PI*a?(v=Math.PI,I=r-(A-c-Math.PI*a),M=l-a):(v=Math.PI+(A-2*c-Math.PI*a)/a,I=-r+Math.sin(v)*a,M=l+Math.cos(v)*a),m.position.set((P?1:-1)*s,M,I),m.rotation.set(v,0,0),m.updateMatrix(),f.setMatrixAt(P*u+E,m.matrix),m.position.y+=Math.cos(v)*.041,m.position.z+=Math.sin(v)*.041,m.updateMatrix(),g.setMatrixAt(P*u+E,m.matrix)}f.instanceMatrix.needsUpdate=g.instanceMatrix.needsUpdate=!0,p(x)};_(0);for(let x of[f,g])x.boundingBox=new Cn(new C(-s-o/2-.03,-.02,-r-a-.09),new C(s+o/2+.03,l+a+.09,r+a+.09)),x.boundingSphere=x.boundingBox.getBoundingSphere(new Qn);return _}function ib(i){let e=new ke,t=new $i,n=vf(e,t,i,i.sage);ls(t,[Qt(2.02,3.9,.22,.56,-.12),Qt(2.56,4.48,.25,.94),Qt(2.36,3.52,.4,1.46,-.28)],i.sage),ze(t,[2.36,.12,1.65],i.light,[0,1.42,-.92],.12);for(let r of[-1,1]){ze(t,[.74,.12,4.38],i.edge,[r*1.32,1.16,-.04]);for(let s=0;s<4;s++)ze(t,[.1,.3,.73],s%2?i.sage:i.light,[r*1.66,1.05,-1.37+s*.84],.025),xf(t,[r*1.72,1.14,-1.65+s*.84],[r*1.72,1.14,-1.14+s*.84],3,i,!0);t.cable([[r*1.23,1.3,1.62],[r*1.34,1.29,.6],[r*1.35,1.29,-1.4],[r*1.19,1.3,-1.85]],.023,i.steel);for(let s of[-1.65,.1,1.5])t.box([.17,.045,.08],i.iron,[r*1.3,1.31,s]);t.ring(.11,.032,i.steel,[r*.86,.91,2.22]),ze(t,[.49,.29,.74],i.edge,[r*.82,1.59,-1.49]),t.box([.35,.035,.53],i.light,[r*.82,1.75,-1.49]),xf(t,[r*1.01,1.485,-.95],[r*.9,1.485,.75],9,i),t.rod([r*1.1,1.01,2.08],[r*1,1.44,1.24],.025,i.steel),t.rod([r*1.02,1.47,1.21],[r*.95,1.47,.66],.025,i.light)}ea(t,[0,1.5,-1.39],1,.78,i),t.cylinder(.78,.12,i.iron,[0,1.5,-.1],[0,0,0],.78,32),t.cylinder(.71,.08,i.inset,[0,1.59,-.1],[0,0,0],.71,32),ls(t,[Qt(1.83,1.94,.32,1.59,-.18),Qt(2.03,1.98,.4,1.76,-.2),Qt(1.63,1.56,.37,2.12,-.31),Qt(1.44,1.39,.34,2.19,-.32)],i.sage);for(let r of[-1,1]){ze(t,[.55,.08,.55],i.iron,[r*.53,1.948,.626],.07,[.75,0,0]),ze(t,[.51,.065,.5],i.light,[r*.53,1.982,.66],.06,[.75,0,0]),ze(t,[.43,.035,.4],i.sage,[r*.53,2.013,.69],.055,[.75,0,0]);let s=[[r*.27,1.74,.9],[r*.81,1.74,.62],[r*.91,1.77,.21]];t.rod(s[0],s[1],.045,i.light),t.rod(s[1],s[2],.025,i.steel),cs(t,i,[r*.983,1.86,-.28],r),ze(t,[.2,.24,.62],i.edge,[r*.7,1.88,-.97])}ze(t,[.65,.4,.38],i.edge,[0,1.83,.77],.11);for(let[r,s,a,o]of[[.17,.46,1.07,i.iron],[.125,1.12,1.81,i.sage],[.155,.28,2.09,i.light],[.084,.91,2.76,i.sage],[.12,.16,3.22,i.iron]])t.cylinder(r,s,o,[0,1.87,a],[Math.PI/2,0,0],r*.94,20);t.cylinder(.077,.012,i.glass,[0,1.87,3.308],[Math.PI/2,0,0],.077,20);for(let r of[1.29,1.62,2.34,3.12])t.cylinder(.13,.048,i.steel,[0,1.87,r],[Math.PI/2,0,0],.13,20);for(let r of[-.39,.38])t.cylinder(.26,.065,i.iron,[r,2.215,-.43],[0,0,0],.26,24),t.cylinder(.223,.045,i.light,[r,2.266,-.43],[0,0,0],.223,24),t.rod([r-.08,2.31,-.43],[r+.08,2.31,-.43],.022,i.steel);ze(t,[.29,.17,.23],i.edge,[-.45,2.24,.14]),t.box([.2,.065,.025],i.glass,[-.45,2.263,.266]),t.cylinder(.065,.15,i.iron,[.66,2.13,-.78]),t.rod([.66,2.2,-.78],[.69,2.88,-.87],.012,i.iron),ta(t,i,1.04,1.23,1.85,-2.17);for(let r of[-1,1])t.cylinder(.08,.048,i.iron,[r*1.04,1.247,1.94],[Math.PI/2,0,0],.08,20),t.cylinder(.058,.012,i.lamp,[r*1.04,1.247,1.971],[Math.PI/2,0,0],.058,20),t.ring(.065,.009,i.steel,[r*1.04,1.247,1.978]);return cs(t,i,[0,1.19,1.923]),t.finish(e),{group:e,animate:n}}function Td(i,e,t,n,r){for(let s of t){i.rod([-n,r,s],[n,r,s],.065,e.iron),i.add(new Dt(.17,12,8),e.iron,[0,r,s]);for(let a of[-1,1]){for(let c of[-.23,.23])i.rod([a*.63,r+.22,s+c],[a*n,r,s],.04,e.iron);let o=[a*.86,r+.5,s-.12],l=[a*(n-.12),r+.04,s];i.rod(o,l,.035,e.steel),i.rod(o,Dn(o).lerp(Dn(l),.6).toArray(),.072,e.yellow);for(let c=0;c<6;c++){let d=Dn(o).lerp(Dn(l),.16+c*.09).toArray();i.ring(.085,.014,e.iron,d,[Math.PI/2,0,0])}}}}function ds(i,e,t,n,r){ze(i,[t,.17,.22],e.iron,[0,n,r]);for(let s of[-1,1])i.ring(.095,.026,e.steel,[s*.68,n-.03,r+Math.sign(r)*.13])}function bf(i,e,t,n,r){ze(i,[.52,.16,.54],e.seat,[t,n,r]),ze(i,[.53,.61,.15],e.seat,[t,n+.34,r-.24]),ze(i,[.31,.18,.16],e.inset,[t,n+.76,r-.24]),i.box([.055,.48,.026],e.sand,[t-.15,n+.4,r-.145])}function rb(i){let e=new ke,t=new $i,n=[-1.48,1.45],r=n.flatMap(o=>[-1,1].map(l=>({x:l*1.31,y:.595,z:o,radius:.57}))),s=Ho(e,r,.43,i,i.sand);Td(t,i,n,1.23,.595),ze(t,[1.91,.19,3.69],i.iron,[0,.76,-.04]),ls(t,[Qt(1.55,1.24,.12,.83,1.17),Qt(1.64,1.18,.2,1.13,1.17),Qt(1.42,.99,.22,1.28,1.12)],i.sand),t.box([1.08,.18,.06],i.inset,[0,1.035,1.79]);for(let o=0;o<7;o++)t.box([.035,.15,.025],i.steel,[(o-3)*.135,1.035,1.832]);for(let o of[-1,1]){ze(t,[.15,.31,1.41],i.sand,[o*.88,.97,-.1]),t.rod([o*.91,.96,-.92],[o*.91,1.15,.66],.047,i.iron),t.rod([o*.87,1.17,.69],[o*.79,2.03,.41],.057,i.iron),t.rod([o*.79,2.03,.41],[o*.8,2.03,-.89],.057,i.iron),t.rod([o*.8,2.03,-.89],[o*.88,.95,-1.26],.057,i.iron),t.rod([o*.8,2.03,-.89],[o*.76,1.01,-1.85],.045,i.steel);for(let l of n)ze(t,[.59,.09,.9],i.sand,[o*1.15,1.25,l]),t.rod([o*.86,.9,l],[o*1.25,1.2,l],.027,i.iron);bf(t,i,o*.4,.97,-.28),cs(t,i,[o*.965,1,-.15],o,i.teal)}t.rod([-.79,2.03,.41],[.79,2.03,.41],.057,i.iron),t.rod([-.8,2.03,-.89],[.8,2.03,-.89],.057,i.iron),t.rod([-.8,2.03,-.89],[.83,1.02,-1.22],.04,i.iron),ze(t,[1.62,.055,.79],i.teal,[0,2.06,-.42]),t.box([1.36,.11,.11],i.inset,[0,2.1,.4]);for(let o=0;o<6;o++)t.box([.13,.065,.025],i.lamp,[-.55+o*.22,2.1,.47]);t.box([1.46,.16,.16],i.inset,[0,1.31,.52]),t.rod([-.4,1.28,.49],[-.4,1.49,.16],.035,i.iron),t.ring(.19,.025,i.rubber,[-.4,1.49,.13],[-.55,0,0]),ze(t,[1.43,.19,.63],i.teal,[0,.98,-1.65]);let a=yf(.48,.33,i,i.sand,!0);for(let o of a.children)o.geometry.rotateY(Math.PI/2),t.add(o.geometry,o.material,[0,1.35,-1.96]);return ze(t,[.36,.5,.25],i.teal,[.66,1.3,-1.67]),t.rod([.68,1.57,-1.69],[.71,2.29,-1.76],.013,i.iron),ds(t,i,2.04,.78,2.02),ds(t,i,1.91,.8,-2.23),ta(t,i,.73,1.13,1.75,-2.12),ea(t,[0,1.293,1.12],.61,.54,i),t.finish(e),{group:e,animate:s}}function _f(i,e,t,n,r=2.12){ls(i,[Qt(r,1.35,.1,.91,n),Qt(r,1.36,.12,1.54,n),Qt(r-.25,1.03,.13,2.15,n-.1)],t),ze(i,[r-.09,.085,1.13],t,[0,2.17,n-.08]),i.box([r-.36,.52,.025],e.glass,[0,1.83,n+.569],[-.41,0,0]),i.box([.045,.55,.047],e.iron,[0,1.83,n+.588],[-.41,0,0]);for(let s of[-1,1])i.box([.028,.48,.73],e.glass,[s*(r/2-.069),1.82,n-.03],[0,0,s*.19]),i.box([.033,.038,.22],e.iron,[s*(r/2+.014),1.45,n-.35]),ze(i,[.21,.1,.89],e.steel,[s*(r/2+.06),.9,n]),i.rod([s*(r/2-.03),1.67,n+.44],[s*(r/2+.24),1.83,n+.49],.027,e.iron),ze(i,[.14,.23,.16],e.iron,[s*(r/2+.24),1.86,n+.49]),i.box([.092,.16,.025],e.glass,[s*(r/2+.24),1.86,n+.4]),i.rod([s*.16,1.61,n+.674],[s*.58,1.69,n+.642],.013,e.inset);for(let s=0;s<5;s++)i.box([1.09,.029,.04],e.inset,[0,1.03+s*.069,n+.699])}function sb(i){let e=new ke,t=new $i,n=[-1.85,-.79,.77,1.8],r=Ho(e,n.flatMap(s=>[-1,1].map(a=>({x:a*1.29,y:.505,z:s,radius:.48}))),.4,i,i.steel);Td(t,i,n,1.27,.505);for(let s of[-1,1])t.box([.16,.23,4.63],i.iron,[s*.68,.73,-.05]);_f(t,i,i.teal,1.62),ze(t,[2.42,.15,3.18],i.iron,[0,1.03,-.92]);for(let s of[-1,1]){for(let a of n)ze(t,[.48,.08,.88],i.teal,[s*1.25,1.08,a]);ze(t,[.11,.53,3.07],i.teal,[s*1.17,1.36,-.94]);for(let a=0;a<5;a++)t.box([.045,.57,.065],i.steel,[s*1.239,1.37,-2.32+a*.69]),t.box([.025,.025,.32],i.light,[s*1.244,1.52,-2.04+a*.57]);ze(t,[.26,.34,.76],i.iron,[s*1.02,.76,-.04])}ze(t,[2.36,.52,.12],i.teal,[0,1.36,-2.49]);for(let s of[-.79,.79])t.box([.16,.08,.065],i.steel,[s,1.11,-2.572]);for(let s of[-1.82,-.7,.38]){ze(t,[1.82,.59,.92],i.cargo,[0,1.42,s]),ze(t,[1.87,.07,.94],i.light,[0,1.75,s]);for(let a of[-.64,.64])t.box([.065,.69,.96],i.iron,[a,1.42,s]);for(let a of[-1,1])t.box([.045,.095,.24],i.steel,[a*.94,1.61,s])}for(let s of[-.43,.43])t.rod([s,1.81,-2.29],[s,1.81,.84],.022,i.sand);ds(t,i,2.44,.88,2.41),ds(t,i,2.32,.84,-2.54),ta(t,i,.83,1.17,2.34,-2.58),cs(t,i,[0,1.41,2.317],0,i.sand);for(let s of[-.74,.74])t.cylinder(.07,.12,i.amber,[s,2.276,1.63]);return t.finish(e),{group:e,animate:r}}function ab(i){let e=new ke,t=new $i,n=[-1.57,-.26,1.45],r=Ho(e,n.flatMap(s=>[-1,1].map(a=>({x:a*1.29,y:.565,z:s,radius:.54}))),.45,i,i.cream);Td(t,i,n,1.24,.565),ze(t,[2.17,.22,4.31],i.iron,[0,.77,-.04]),_f(t,i,i.cream,1.24,2.13),ze(t,[2.13,1.24,2.66],i.cream,[0,1.53,-.93],.13),ze(t,[2.19,.09,2.72],i.light,[0,2.17,-.93]);for(let s of[-1,1]){t.box([.032,.13,3.93],i.red,[s*1.087,1.22,-.22]);for(let a of n)ze(t,[.54,.095,1.02],i.red,[s*1.19,1.18,a]);for(let a of[-1.69,-.64]){ze(t,[.055,.7,.86],i.light,[s*1.084,1.64,a]),t.box([.02,.49,.68],i.cream,[s*1.121,1.63,a]),t.box([.025,.045,.18],i.iron,[s*1.139,1.45,a+.2]);for(let o of[1.42,1.87])t.box([.037,.07,.065],i.steel,[s*1.132,o,a-.33])}cs(t,i,[s*1.112,1.75,.08],s,i.red),t.rod([s*.81,2.29,-1.91],[s*.81,2.29,.17],.026,i.steel);for(let a of[-1.87,.1])t.rod([s*.81,2.19,a],[s*.81,2.29,a],.026,i.steel)}ze(t,[1.12,.16,1.1],i.cargo,[0,2.29,-1.05]),ea(t,[0,2.383,-1.05],.76,.76,i),t.box([1.37,.09,.24],i.iron,[0,2.245,1.22]);for(let s of[-1,1])ze(t,[.47,.115,.23],i.amber,[s*.43,2.338,1.22]);t.box([1.73,.86,.025],i.iron,[0,1.53,-2.278]);for(let s of[-1,1])t.box([.82,.81,.035],i.cream,[s*.433,1.53,-2.301]),t.box([.57,.25,.027],i.glass,[s*.433,1.75,-2.335]),t.box([.045,.13,.038],i.iron,[s*.11,1.44,-2.339]);return ds(t,i,2.42,.83,2.09),ds(t,i,2.26,.8,-2.39),t.cylinder(.14,.48,i.iron,[0,.94,2.1],[0,0,Math.PI/2]),t.box([.46,.12,.07],i.steel,[0,.94,2.27]),ta(t,i,.81,1.15,1.968,-2.39),t.finish(e),{group:e,animate:r}}function ob(i){let e=new ke,t=new $i,n=vf(e,t,i,i.yellow,1.25,1.19,.44,.64);ze(t,[1.91,.43,3.35],i.yellowEdge,[0,.88,-.18],.14),ze(t,[1.72,.55,1.4],i.yellow,[0,1.37,.71],.1),ea(t,[0,1.661,.77],1.11,.91,i);for(let s of[-1,1])ze(t,[.68,.12,3.35],i.yellow,[s*1.14,1.09,-.2]),ea(t,[s*.869,1.39,.71],.93,.29,i,!0),ze(t,[.2,.09,.43],i.iron,[s*.85,1.22,-.57]);bf(t,i,0,1.12,-.77);for(let s of[-1,1])t.rod([s*.65,1.1,-.03],[s*.6,2.18,-.09],.056,i.iron),t.rod([s*.65,1.09,-1.44],[s*.6,2.18,-1.33],.056,i.iron),t.box([.022,.72,1.03],i.glass,[s*.618,1.75,-.73]),t.rod([s*.32,1.2,-.51],[s*.36,1.58,-.4],.022,i.iron),t.add(new Dt(.05,8,6),i.rubber,[s*.36,1.58,-.4]);t.box([1.1,.74,.027],i.glass,[0,1.75,-.065]),t.box([1.1,.71,.027],i.glass,[0,1.75,-1.39]),ze(t,[1.55,.115,1.65],i.yellow,[0,2.235,-.72]),t.cylinder(.075,.125,i.amber,[.4,2.355,-.9]),t.cylinder(.05,.46,i.iron,[.66,1.91,.56]),t.cylinder(.084,.04,i.iron,[.66,2.155,.56]),ze(t,[1.65,.4,.45],i.yellow,[0,1.19,-1.64]);let r=[];for(let s=0;s<=8;s++){let a=s/8,o=.1+a*.91,l=2.04+.37*(2*a-1)**2;r.push([[-1.7,o,l],[1.7,o,l],[1.7,o,l-.12],[-1.7,o,l-.12]])}ls(t,r.map(s=>[s[3],s[2],s[1],s[0]]),i.yellow),t.box([3.47,.13,.19],i.steel,[0,.105,2.39],[-.14,0,0]),t.rod([-1.7,1.04,2.4],[1.7,1.04,2.4],.058,i.yellowEdge);for(let s of[-1,1]){t.box([.12,.9,.44],i.yellowEdge,[s*1.65,.57,2.21]),t.rod([s*1.1,.62,-.48],[s*1.14,.4,2.05],.095,i.yellowEdge);let a=[s*.79,1.37,.63],o=[s*1.17,.74,2.09];t.rod(a,o,.047,i.steel),t.rod(a,Dn(a).lerp(Dn(o),.6).toArray(),.105,i.yellow);for(let l of[a,o])t.cylinder(.115,.19,i.iron,l,[0,0,Math.PI/2]);t.cable([[s*.75,1.43,.4],[s*.88,1.49,.82],[s*.98,1.12,1.39]],.022,i.rubber),cs(t,i,[s*.968,.93,-.83],s,i.cream)}for(let s=0;s<11;s++)t.cylinder(.027,.024,i.iron,[-1.49+s*.298,.137,2.491],[Math.PI/2,0,0],.027,6);return ta(t,i,.54,2.15,.091,-1.53),t.finish(e),{group:e,animate:n}}var zo=class{constructor(e){this.root=e;let t=this.build("balanced");e.clear(),this.current=t,e.add(t.group)}models=new Map;materials=nb();current;id="balanced";distance=0;get activeId(){return this.id}setVehicle(e){let t=e==="survey"||e==="hauler"||e==="rescue"||e==="crawler"?e:"balanced";if(t===this.id)return;let n=this.models.get(t)||this.build(t);this.root.remove(this.current.group),this.current.group.visible=!1,this.current=n,this.id=t,n.group.visible=!0,n.animate(this.distance),this.root.add(n.group)}animate(e){!Number.isFinite(e)||e===this.distance||(this.distance=e,this.current.animate(e))}build(e){let n={balanced:ib,survey:rb,hauler:sb,rescue:ab,crawler:ob}[e](this.materials);return n.group.name=`expedition-${e}`,n.group.userData.vehicleId=e,this.models.set(e,n),n}};function Ad(i){return i&&typeof i=="object"&&(Object.values(i).forEach(Ad),Object.freeze(i)),i}var $n=Ad([{id:"jokes",name:"Joke Jetty",icon:"smile",description:"Take a break for a silly joke.",colour:15906116,symbol:"J",position:[-13,0,14]},{id:"riddles",name:"Riddle Nook",icon:"lightbulb",description:"Pick apart a small word puzzle.",colour:14248864,symbol:"?",position:[16,0,-18]},{id:"lookout",name:"Lookout",icon:"binoculars",description:"Read a tiny scene and spot a clue.",colour:4765082,symbol:"O",position:[-8,0,-15]},{id:"numbers",name:"Number Trail",icon:"footprints",description:"Follow a playful number pattern.",colour:6332136,symbol:"#",position:[19,0,13]}]);function qi(i,e,t,n){return{id:i,prompt:e,answer:t,explanation:n}}function Ft(i,e,t,n,r){let s=t.map((a,o)=>({id:`${i}-${o+1}`,text:a}));return{id:i,prompt:e,answer:t[n],explanation:r,options:s,correctOption:s[n].id}}var xr=Ad({jokes:[qi("jokes-boot","Why couldn't the bicycle stand up by itself?","It was two-tired!","Two tyres sounds like too tired. A bicycle has two tyres."),qi("jokes-beacon","What do you call a sleeping dinosaur?","A dino-snore!","Dino-snore sounds like dinosaur, with a snore added for sleep."),qi("jokes-sandwich","Why did the banana go to the doctor?","It wasn't peeling well!","Peeling sounds like feeling. A banana has a peel."),qi("jokes-map","Why was the maths book sad?","It had too many problems!","Problems can mean worries or maths questions. A maths book is full of questions."),qi("jokes-cloud","What did the ocean say to the beach?","Nothing. It just waved!","A wave can be a greeting or moving water in the ocean."),qi("jokes-pebble","What do you call a bear with no teeth?","A gummy bear!","A mouth without teeth has gums. A gummy bear is also a chewy sweet."),qi("jokes-ladder","What do you call a pig that knows karate?","A pork chop!","Pork comes from pigs. A chop is both a cut of meat and a karate move."),qi("jokes-kite","Why did the teddy bear say no to dessert?","It was already stuffed!","Stuffed means very full after eating. A teddy bear is also filled with stuffing.")],riddles:[Ft("riddles-zip","I have two rows of teeth on a coat. Pull my tab and I join them. What am I?",["A comb","A zip","A fork"],1,"A zip has two rows of teeth. Its tab pulls them together to close a coat."),Ft("riddles-soap","I am a bar by the sink. Rub me with water for bubbles and clean hands. What am I?",["Soap","Chalk","A sponge"],0,"A bar of soap makes bubbles with water and helps clean hands."),Ft("riddles-shadow","I copy your shape on the ground when you block sunlight. I have no face or clothes. What am I?",["A footprint","A puddle","A shadow"],2,"Your body blocks the light. The dark shape on the ground is your shadow."),Ft("riddles-envelope","I am a paper pocket. Put a letter in me, seal my flap and add a stamp. What am I?",["A book","An envelope","A cup"],1,"An envelope holds a letter. Its flap seals it shut for the post."),Ft("riddles-ice","I am a cube of frozen water. Leave me in a warm cup and I turn to water. What am I?",["An ice cube","A sugar cube","A glass bead"],0,"An ice cube is frozen water. It melts back into water as it warms."),Ft("riddles-ruler","I have straight edges and marks for centimetres. Lay me by a leaf to find its length. What am I?",["A spoon","A clock","A ruler"],2,"The marks on a ruler measure length in units such as centimetres."),Ft("riddles-key","I am a small metal tool with teeth. Turn me in a lock to open a door. What am I?",["A key","A brush","A coin"],0,"A key has a shape that fits its lock. Turning the right key unlocks it."),Ft("riddles-watering-can","I hold water for plants. Tip my handle and water runs out through my spout. What am I?",["A flowerpot","A watering can","A raincoat"],1,"A watering can holds water and has a spout to pour it onto plants.")],lookout:[Ft("lookout-flags","Three flags hang in a row: red, blue, yellow. Which colour is between the other two?",["Yellow","Red","Blue"],2,"Blue is second in the row. Red is on one side and yellow is on the other."),Ft("lookout-boats","A green boat has a square sail. A white boat has a round sail. Which boat has the round sail?",["The white boat","The green boat","Both boats"],0,"The scene says the white boat has the round sail. The green boat has a square sail."),Ft("lookout-bench","A bench holds a dry hat, a wet scarf and a dry bag. Which item is wet?",["The hat","The scarf","The bag"],1,"Only the scarf is called wet. The hat and bag are both dry."),Ft("lookout-lights","At dusk, the gate lamp is off, the hut lamp is on and the dock lamp is off. Which lamp is on?",["The gate lamp","The dock lamp","The hut lamp"],2,"The hut lamp is on. Both the gate lamp and the dock lamp are off."),Ft("lookout-leaves","On a tray lie a long green leaf, a round green leaf and a long red leaf. Which leaf is round?",["A green leaf","The red leaf","All three leaves"],0,"The round leaf is green. The red leaf and the other green leaf are long."),Ft("lookout-boxes","A blue box is shut. A red box is open. A yellow box is shut. Which box lets you see inside?",["The blue box","The red box","The yellow box"],1,"The red box is open, so you can see inside. The other two boxes are shut.")],numbers:[Ft("numbers-hops","Hop along stones, adding 2 each time: 2, 4, 6, __. What number comes next?",["7","8","10"],1,"Each hop adds 2. After 6, another 2 makes 8."),Ft("numbers-countdown","A launch chant goes down by 3 each time: 12, 9, 6, __. What comes next?",["3","4","0"],0,"Take 3 away from 6 to get 3. The chant goes 12, 9, 6, 3."),Ft("numbers-claps","Repeat this clap code: 1, 2, 2, 1, 2, 2, __. Which number starts the next repeat?",["2","3","1"],2,"The code repeats the group 1, 2, 2. Each new group starts with 1."),Ft("numbers-double","Each new lantern row has twice as many lights: 1, 2, 4, __. How many lights are next?",["6","8","5"],1,"Twice 4 is 4 plus 4, which makes 8 lights."),Ft("numbers-lock","A toy lock needs a whole number greater than 4 and less than 8. It must be even. Which number fits?",["6","5","8"],0,"The whole numbers between 4 and 8 are 5, 6 and 7. Only 6 is even."),Ft("numbers-shells","Two bowls must each hold 5 shells. One bowl is full. The other has 3. How many shells does that bowl need?",["3","5","2"],2,"The bowl has 3 and needs 5. Add 2 shells because 3 plus 2 is 5.")]});function Vo(i,e){if(typeof i!="string"||!Object.hasOwn(xr,i)||!Number.isSafeInteger(e)||e<0)return null;let t=xr[i];return t[e%t.length]}function wf(i,e,t){if(typeof t!="string")return!1;let n=Vo(i,e);return!!(n?.options?.some(r=>r.id===t)&&n.correctOption===t)}var fe=(i=0,e=0,t=0)=>new C(i,e,t),Zt={hq:fe(0,0,5),harbour:fe(-31,0,-7),english:fe(-19,0,-30),physics:fe(4,0,-38),chemistry:fe(30,0,-25),grove:fe(33,0,3)},na=(i,e)=>[fe(-7.7,0,-4.5),fe(7.4,0,-4),fe(-9.9,0,6.9),fe(9.3,0,7.5),fe(0,0,12.3)].map((t,n)=>({id:`station-${n}`,label:e[n],position:i.clone().add(t)})),Go={harbour:na(Zt.harbour,["Multiplication Depot","Addition Dispatch","Division Workshop","Subtraction Yard","Place Value Tower"]),english:na(Zt.english,["Word Archive","Sentence Studio","Spelling Signal","Reading Room","Story Press"]),physics:na(Zt.physics,["Force Track","Light Observatory","Sound Lab","Circuit Station","Energy Workshop"]),chemistry:na(Zt.chemistry,["Matter Hall","Mixture Lab","Changes Chamber","Properties Bay","Particle Observatory"]),grove:na(Zt.grove,["Seed Lab","Habitat Dome","Life-Cycle Nursery","Food-Web Field","Adaptation Clinic"])},lb={hq:"Headquarters",harbour:"Maths Operations",english:"English Communications",physics:"Physics Research",chemistry:"Chemistry Laboratory",grove:"Life Sciences BioDome"},Wo={hq:{colour:3647626,symbol:"HQ"},harbour:{colour:1292209,symbol:"x"},english:{colour:15757171,symbol:"Aa"},physics:{colour:7891176,symbol:"atom"},chemistry:{colour:2409637,symbol:"flask"},grove:{colour:11063107,symbol:"leaf"}},Cd=gr.clamp,D1=gr.lerp,cb={};function Ot(i,e,t=0,n=.8){return cb[i]||=new xt({color:e,metalness:t,roughness:n})}var $o=Ot("armour",6844762,.5,.54),ri=Ot("edge",4541760,.65,.6),_t=Ot("steel",6911355,.8,.35),Xi=Ot("rubber",2238506,.1,.96),yr=Ot("concrete",11382951,.04,.94),Yi=Ot("blue",3038055,.4,.6),si=Ot("safety",14267735,.35,.6),qo=Ot("glass",2180694,.65,.19),Sf=new xt({color:15333358,emissive:12049868,emissiveIntensity:1.2}),db=new xt({color:15783032,emissive:8018454,emissiveIntensity:.85,roughness:.5,transparent:!0,opacity:.94}),Mf=new xt({color:15726287,emissive:10471260,emissiveIntensity:1.4,roughness:.35,transparent:!0,opacity:.9});function ub(){let i=document.createElement("canvas");i.width=i.height=256;let e=i.getContext("2d"),t=e.createImageData(256,256),n=71;for(let s=0;s<t.data.length;s+=4){n=n*1664525+1013904223>>>0;let a=191+n%38;t.data.set([a,a,a-3,255],s)}e.putImageData(t,0,0),e.strokeStyle="#9b9d9230",e.lineWidth=.5;for(let s=0;s<256;s+=6)e.beginPath(),e.moveTo(0,s),e.lineTo(256,s+2),e.stroke();let r=new wi(i);return r.wrapS=r.wrapT=Vn,r.repeat.set(3,3),r.colorSpace=Lt,r}function wt(i,e,t,n=0,r=0,s=0){let a=new vt(e,t);return a.position.set(n,r,s),a.castShadow=!0,a.receiveShadow=!0,i.add(a),a}function et(i,e,t,n,r,s=0,a=0,o=0){return wt(i,new yn(e,t,n),r,s,a,o)}function st(i,e,t,n,r,s=0,a=0,o=0,l=16){return wt(i,new In(e,t,n,l),r,s,a,o)}function en(i,e,t,n,r){let s=e.clone().add(t).multiplyScalar(.5),a=st(i,n,n,e.distanceTo(t),r,s.x,s.y,s.z,8);return a.quaternion.setFromUnitVectors(fe(0,1,0),t.clone().sub(e).normalize()),a}function hb(i,e,t,n,r,s,a="#eef3ed"){let o=document.createElement("canvas");o.width=512,o.height=128;let l=o.getContext("2d");l.font="bold 65px Arial",l.textAlign="center",l.textBaseline="middle",l.fillStyle=a,l.fillText(e,256,64);let c=new wi(o);c.colorSpace=Lt;let d=wt(i,new bi(s,s/4),new ei({map:c,transparent:!0,depthWrite:!1}),t,n,r);return d.castShadow=!1,d}function vr(i,e,t=!1){let n=document.createElement("canvas");n.width=n.height=256;let r=n.getContext("2d"),s=`#${e.toString(16).padStart(6,"0")}`,a=r.createRadialGradient(128,128,12,128,128,116);if(a.addColorStop(0,t?"#d9ff8d":"#ffffff"),a.addColorStop(.38,t?"#54ef9b":s),a.addColorStop(.7,`${t?"#2fe48d":s}a8`),a.addColorStop(1,`${t?"#2fe48d":s}00`),r.fillStyle=a,r.beginPath(),r.arc(128,128,116,0,Math.PI*2),r.fill(),r.fillStyle=t?"#176844":"#fff",r.strokeStyle=t?"#edffd8":"#ffffff",r.lineWidth=11,r.lineCap="round",r.lineJoin="round",t)r.beginPath(),r.moveTo(78,129),r.lineTo(112,161),r.lineTo(181,88),r.stroke();else if(i==="atom"){r.lineWidth=7;for(let l of[0,Math.PI/3,-Math.PI/3])r.save(),r.translate(128,128),r.rotate(l),r.beginPath(),r.ellipse(0,0,63,25,0,0,Math.PI*2),r.stroke(),r.restore();r.beginPath(),r.arc(128,128,10,0,Math.PI*2),r.fill()}else i==="flask"?(r.beginPath(),r.moveTo(108,70),r.lineTo(148,70),r.moveTo(117,70),r.lineTo(117,111),r.lineTo(82,169),r.quadraticCurveTo(78,185,98,187),r.lineTo(158,187),r.quadraticCurveTo(178,185,174,169),r.lineTo(139,111),r.lineTo(139,70),r.stroke(),r.fillStyle="#fff9",r.beginPath(),r.moveTo(99,159),r.lineTo(157,159),r.lineTo(170,181),r.lineTo(86,181),r.closePath(),r.fill()):i==="leaf"?(r.beginPath(),r.moveTo(83,165),r.bezierCurveTo(72,97,118,63,181,73),r.bezierCurveTo(185,137,146,177,83,165),r.fill(),r.strokeStyle=s,r.lineWidth=7,r.beginPath(),r.moveTo(91,158),r.lineTo(166,89),r.stroke()):(r.font=i==="Aa"?"800 74px Arial":"900 96px Arial",r.textAlign="center",r.textBaseline="middle",r.fillText(i,128,130));let o=new wi(n);return o.colorSpace=Lt,o.needsUpdate=!0,o}var Xo=class{renderer;scene;camera;tank;tracks=[];wheels=[];group;hq;dish;rig;water;canvas;routeLayer=new ke;waypoint=new ke;waypointRing;dustPuffs=[];view="hq";destination="hq";yaw=.72;radius=17;elevation=10;target=fe(0,1,0);cameraGoal=fe();lookGoal=fe();travel=null;paused=!1;reduced=!1;running=!0;frame=0;last=0;clock=0;onTravelEnd=null;onFrame=null;onDestinationPick=null;width=0;height=0;hqLevel=0;ready;textureErrors=[];currentArea="hq";framingKey="";selectedNodeKey="";mapSelection=!1;markerLayer=new ke;mapMarkers=new Map;stationMarkers=new Map;animatedProps=[];completedMarkerTexture=vr("check",5566363,!0);resizeObserver;scenery;fleet;activityMarkers=new Map;vehicleDistance=0;constructor(e){this.canvas=e,this.renderer=new co({canvas:e,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=hd,this.renderer.outputColorSpace=Lt,this.renderer.toneMapping=fd,this.renderer.toneMappingExposure=1.06,this.scene=new ho,this.scene.background=new Fe(12964815),$o.map=ub(),ri.map=$o.map,Yi.map=$o.map,this.scene.fog=new uo(12964815,.007),this.camera=new hn(42,1,.1,650),this.camera.position.set(15,10,18),this.scene.add(new Ro(15331309,6581332,1.65));let t=new Po(16771271,2.4);t.position.set(-38,65,25),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-78,right:78,top:78,bottom:-78,near:.5,far:190}),t.shadow.normalBias=.06,t.shadow.bias=-15e-5,t.target.position.set(0,0,-15),this.scene.add(t,t.target),this.group=new ke,this.scene.add(this.group),this.group.add(this.routeLayer,this.waypoint,this.markerLayer),this.waypoint.visible=!1,this.waypointRing=wt(this.waypoint,new Ln(1.05,.11,12,40),Mf,0,.18,0),this.waypointRing.rotation.x=Math.PI/2;let n=st(this.waypoint,.045,.11,3.7,Mf,0,1.95,0,14);n.castShadow=!1,this.ready=this.createLandscape(),this.hq=new ke,this.group.add(this.hq),this.createBase(1),this.createHarbour(),this.createEnglishDistrict(),this.createPhysicsDistrict(),this.createChemistryDistrict(),this.createScienceBase(),this.tank=this.createTank(),this.createWorldMarkers(),this.tank.position.copy(Zt.hq).add(fe(2.4,.02,4.5)),this.tank.rotation.y=.3,this.group.add(this.tank),this.createDust(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e.parentElement);let r=null,s=0,a=0,o=0,l=!1;e.addEventListener("pointerdown",c=>{this.travel||!c.isPrimary||c.button!==0||(r=c.pointerId,a=s=c.clientX,o=c.clientY,l=!1,e.setPointerCapture(c.pointerId))}),e.addEventListener("pointermove",c=>{c.pointerId===r&&(Math.hypot(c.clientX-a,c.clientY-o)>8&&(l=!0),l&&(this.yaw+=(s-c.clientX)*.005),s=c.clientX)}),e.addEventListener("pointerup",c=>{if(c.pointerId!==r)return;let d=!l&&Math.hypot(c.clientX-a,c.clientY-o)<=8;r=null,e.hasPointerCapture(c.pointerId)&&e.releasePointerCapture(c.pointerId),d&&this.view==="map"&&!this.travel&&this.pickDestination(c.clientX,c.clientY)});for(let c of["pointercancel","lostpointercapture"])e.addEventListener(c,()=>{r=null});e.addEventListener("webglcontextlost",c=>{c.preventDefault(),this.running=!1,e.dispatchEvent(new CustomEvent("world-error",{detail:"Graphics paused. Reload to restore the scene; your saved progress is safe."}))}),this.resize(),this.setView("hq"),this.animate(0)}createDust(){let e=new Dt(.48,8,5);for(let t=0;t<9;t++){let n=new ei({color:12036747,transparent:!0,opacity:0,depthWrite:!1}),r=wt(this.group,e,n);r.castShadow=!1,r.visible=!1,this.dustPuffs.push(r)}}createBeacon(e,t,n=!1,r=e){let s=Wo[r]||Wo.hq,a=new ke;a.position.copy(t),a.position.y=n?3.25:5.5,a.visible=!1;let o=new po(new Ws({map:vr(n?"":s.symbol,s.colour),transparent:!0,depthTest:!1,depthWrite:!1}));o.scale.setScalar(n?2.8:4.35),o.renderOrder=20,a.add(o);let l=new ei({color:s.colour,transparent:!0,opacity:.48,blending:Os,depthWrite:!1}),c=wt(a,new ss(n?.58:.9,n?.76:1.18,40),l,0,-a.position.y+.19,0);c.rotation.x=-Math.PI/2,c.castShadow=!1,c.renderOrder=3;let d=new ei({color:s.colour,transparent:!0,opacity:.16,blending:Os,depthWrite:!1,side:Bn}),u=st(a,n?.18:.3,n?.48:.72,n?2.5:4.4,d,0,-a.position.y/2+.28,0,32);u.castShadow=!1,u.renderOrder=2;let h={id:e,root:a,sprite:o,halo:c,beam:u,style:s,station:n,selected:!1,completed:!1,baseY:a.position.y};return this.markerLayer.add(a),h}createWorldMarkers(){for(let[e,t]of Object.entries(Zt))this.mapMarkers.set(e,this.createBeacon(e,t));for(let e of $n){let t=this.createBeacon(`activity-${e.id}`,this.scenery.activitySites.get(e.id)?.position||fe(...e.position));t.sprite.material.map=vr(e.symbol,e.colour),t.root.position.y=2.5,t.activity=!0,t.halo.visible=!1,t.beam.visible=!1,this.activityMarkers.set(e.id,t)}for(let[e,t]of Object.entries(Go))for(let n of t){let r=this.createBeacon(n.id,n.position,!0,e);r.region=e,r.index=Number(n.id.split("-")[1]),r.sprite.material.map=vr(String(r.index+1),Wo[e].colour),r.sprite.material.needsUpdate=!0,this.stationMarkers.set(`${e}:${n.id}`,r)}}syncMarkers(e){this.mapSelection=!!e.selectedRegion||!!e.selectedActivity;for(let[n,r]of this.activityMarkers){r.root.visible=e.view==="map",r.selected=e.selectedActivity===n;let s=e.visitedActivities?.includes(n)||!1;if(s!==r.completed){r.completed=s;let a=$n.find(o=>o.id===n);r.sprite.material.map=vr(a.symbol,a.colour,s)}}let t=e.view==="map"||e.view==="region-info";for(let[n,r]of this.mapMarkers){r.root.visible=t||e.view==="region"&&n==="hq";let s=e.completedRegions?.includes(n)||!1,a=e.selectedRegion===n;r.completed!==s&&(r.completed=s,r.sprite.material.map=s?this.completedMarkerTexture:vr(r.style.symbol,r.style.colour),r.sprite.material.needsUpdate=!0),r.selected=a,r.halo.material.opacity=a?.64:s?.5:.18,r.beam.material.opacity=a?.19:s?.13:.04,r.halo.userData.baseOpacity=r.halo.material.opacity,r.beam.userData.baseOpacity=r.beam.material.opacity}for(let n of this.stationMarkers.values()){let r=e.view==="region"&&n.region===e.region;if(n.root.visible=r,!r)continue;let s=e.stations?.[n.index],a=!!s?.resolved,o=e.selectedStation===s?.id;n.completed!==a&&(n.completed=a,n.sprite.material.map=a?this.completedMarkerTexture:vr(String(n.index+1),Wo[n.region].colour),n.sprite.material.needsUpdate=!0),n.selected=o,n.halo.material.opacity=o?.66:a?.48:.18,n.beam.material.opacity=o?.18:.04,n.halo.userData.baseOpacity=n.halo.material.opacity,n.beam.userData.baseOpacity=n.beam.material.opacity}}async createLandscape(){this.scenery=new Oo(this.group,Zt,Go,this.textureErrors),this.water=this.scenery.water,await this.scenery.ready}syncCampaign(e,t){this.scenery.syncCampaign(e,t)}setLoadout(e){this.fleet.setVehicle(e)}pickDestination(e,t){if(this.view!=="map"||this.travel)return null;let n=this.canvas.getBoundingClientRect(),r=new Io;r.setFromCamera(new K((e-n.left)/n.width*2-1,1-(t-n.top)/n.height*2),this.camera);let a=r.intersectObjects([...this.scenery.campuses.values(),...this.scenery.activitySites.values()],!0)[0]?.object;for(;a&&!a.userData.destination&&!a.userData.activity;)a=a.parent;let o=a?.userData.activity?`activity-${a.userData.activity}`:a?.userData.destination;return o&&this.onDestinationPick?.(o),o||null}focusProject(e){let t={bridge:fe(10,0,19.7),observatory:fe(12,0,-48),greenhouse:fe(44,0,6)};return t[e]?(this.view="project",this.framingKey=`project:${e}`,this.target.copy(t[e]).add(fe(0,1.2,0)),this.radius=e==="bridge"?20:14,this.elevation=e==="bridge"?16:10,this.yaw=.52,!0):!1}focusVehicle(){this.scenery.repairs.forEach(e=>{e.visible=!1}),this.view="vehicle",this.target.copy(this.tank.position).add(fe(0,1.1,.3)),this.radius=7.2,this.elevation=3.5,this.framingKey!=="vehicle"&&(this.yaw=.68),this.framingKey="vehicle"}focusActivity(e){let t=this.scenery.activitySites.get(e);t&&(this.currentArea!==`activity-${e}`&&(this.tank.position.copy(t.position).add(fe(3,.08,e==="jokes"?-2:3)),this.currentArea=`activity-${e}`),this.view="activity",this.target.copy(t.position).lerp(this.tank.position,.35).add(fe(0,1,0)),this.radius=18,this.elevation=11,this.yaw=.35)}driveToActivity(e,t){this.scenery.activitySites.get(e)&&this.beginTravel(this.scenery.activityRoute(this.tank.position,e,this.currentArea),t,{kind:"activity",region:this.currentArea,label:$n.find(r=>r.id===e)?.name})}tree(e,t,n){let r=new ke;r.position.set(e,0,t),r.scale.setScalar(n),this.group.add(r),st(r,.1,.25,5.3,Ot("bark",5327677),0,2.65,0,9);let s=[Ot("pine0",3098937),Ot("pine1",4020289),Ot("pine2",5335627)];for(let o=0;o<7;o++){let l=2.1+o*.55,c=1.55-o*.13,d=new Gi(1,1),u=wt(r,d,s[o%s.length],o%2?.18:-.12,l,(o%3-1)*.14);u.scale.set(c,.72,c*.9),u.rotation.set(o*.17,o*.83,o*.08)}let a=wt(r,new hr(.62,1.5,12),s[0],0,5.55,0);a.rotation.y=.4}fieldNode(e,t,n,r,s){st(e,.58,.66,.08,Ot("node-pad",5593941,.08,.94),t,.1,n,20);let a=wt(e,new Ln(.48,.045,8,24),s,t,.17,n);a.rotation.x=Math.PI/2;let o=st(e,.09,.09,.09,Sf,t,.25,n,12);o.castShadow=!1}sitePad(e,t,n=7.2,r=5.6,s=null){let a=new ke;a.position.set(t.x,0,t.z),a.scale.setScalar(.54),e.add(a);let o=new Si;for(let u=0;u<18;u++){let h=u/18*Math.PI*2,f=1+Math.sin(u*2.7)*.07+Math.cos(u*1.9)*.04,g=Math.cos(h)*n*.5*f,y=Math.sin(h)*r*.5*f;u?o.lineTo(g,y):o.moveTo(g,y)}o.closePath();let l=s?.color?.clone?.().lerp(new Fe(13428396),.64)||new Fe(9548663),c=new xt({color:l,roughness:.92}),d=wt(a,new Ks(o),c,0,.045,0);return d.rotation.x=-Math.PI/2,d.receiveShadow=!0,d.castShadow=!1,a}missionOutpost(e,t,n,r,s){let a=this.sitePad(e,t,6.8,5.2,r),o=Ot(`mission-cream-${s}`,16773073,.03,.82),l=Ot(`mission-window-${s}`,6272706,.22,.3);if(s==="M"){let d=st(a,1.75,2.05,1.35,o,0,.78,0,24);for(let h=0;h<=n+2;h++)et(a,.58,.42,.58,h%2?r:l,-1.35+h*.62,1.65+h%2*.24,0);let u=wt(a,new Ln(1.35,.11,10,32,Math.PI),r,0,2.15,0);u.rotation.z=Math.PI,u.rotation.y=Math.PI/2}else if(s==="E"){st(a,1.85,2.1,1.2,o,0,.7,0,24);for(let h of[-1,1]){let f=et(a,2.25,.12,2.4,o,h*1.02,1.55,0);f.rotation.z=h*-.26}let d=st(a,.18,.18,3.1,r,2.2,1.55,.4,12),u=wt(a,new hr(.18,.5,12),Xi,2.2,3.35,.4);d.rotation.z=u.rotation.z=-.08}else if(s==="P"){st(a,1.8,2.05,1.15,o,0,.66,0,24);let d=wt(a,new Dt(.72,20,12),l,0,2.15,0),u=new ke;u.position.set(0,2.15,0),a.add(u);for(let h of[0,Math.PI/3])wt(u,new Ln(1.2,.06,8,36),r).rotation.set(Math.PI/2,h,h);this.animatedProps.push({kind:"spin",object:u,speed:.25+n*.03,phase:n})}else if(s==="C"){st(a,1.75,2.1,1.2,o,0,.7,0,24);let d=new ke;d.position.set(0,1.4,0),a.add(d),wt(d,new Dt(.9,20,13),l,0,.65,0),st(d,.34,.42,1.35,o,0,1.65,0,18);for(let u=0;u<4;u++){let h=wt(d,new Dt(.13+u*.035,12,8),r,-.35+u*.22,1.9+u*.28,0);this.animatedProps.push({kind:"bubble",object:h,baseY:h.position.y,range:1.15,speed:.34+u*.05,phase:n+u*.24})}}else{st(a,1.8,2.1,1.05,o,0,.62,0,24);let d=wt(a,new Dt(1.7,22,12,0,Math.PI*2,0,Math.PI/2),new xt({color:7788194,transparent:!0,opacity:.78,roughness:.25}),0,1.35,0);for(let u of[-.9,0,.9]){st(a,.1,.18,1.2,Ot("bio-stem",4619090),u,1.2,.25,10);let h=wt(a,new Dt(.38,12,8),r,u+.22,1.7,.25);h.scale.set(1.35,.48,.8),h.rotation.z=-.45}d.castShadow=!1}let c=wt(a,new Dt(.17,12,8),new xt({color:16777215,emissive:r.color,emissiveIntensity:1.6}),0,3.45,0);this.animatedProps.push({kind:"bob",object:c,baseY:c.position.y,speed:1.4,phase:n*.7,amp:.12})}gableRoof(e,t,n,r,s){for(let a of[-1,1]){let o=et(e,t*.58,.16,n+.3,s,a*t*.235,r,0);o.rotation.z=a*-.43}}supplyDepot(e,t){let n=this.sitePad(e,t,8,6);et(n,5.2,2.25,3.5,Yi,-.65,1.24,-.35),this.gableRoof(n,5.5,3.7,2.65,_t);for(let r of[-1.75,-.25])et(n,1.15,1.35,.08,Xi,r,.86,1.43);for(let r of[2.1,3.25])this.crate(n,r,.75,r>3?ri:Yi)}repairWorkshop(e,t){let n=this.sitePad(e,t,8,6);et(n,5.8,2.2,3.7,ri,0,1.22,-.35),et(n,6.1,.16,4,_t,0,2.4,-.35);for(let s of[-1.65,0,1.65])et(n,1.35,1.45,.08,s===0?Yi:Xi,s,.9,1.54);for(let s of[-2.5,2.5]){let a=st(n,.48,.48,.28,Xi,s,.36,2,18);a.rotation.z=Math.PI/2}let r=new ke;r.position.set(0,0,-2.1),n.add(r);for(let s of[-.8,.8])en(r,fe(s,0,0),fe(s,2.8,0),.07,si);en(r,fe(-.9,2.8,0),fe(.9,2.8,0),.08,si)}railYard(e,t){let n=this.sitePad(e,t,9,6.5);for(let a of[-1.2,1.2])en(n,fe(a,.14,-3),fe(a,.14,3),.06,_t);for(let a=-2.8;a<=2.8;a+=.65)et(n,3.2,.09,.13,Xi,0,.09,a);let r=new ke;r.position.set(0,.28,-.5),n.add(r),et(r,3.2,.75,1.55,Yi,0,.58,0),et(r,3.45,.12,1.75,_t,0,.14,0);for(let a of[-1.15,1.15])for(let o of[-.68,.68]){let l=st(r,.28,.28,.16,Xi,a,.08,o,14);l.rotation.x=Math.PI/2}let s=new ke;s.position.set(0,0,1.7),n.add(s);for(let a of[-2.4,2.4])en(s,fe(a,0,0),fe(a,3.2,0),.09,si);en(s,fe(-2.6,3.2,0),fe(2.6,3.2,0),.11,si)}powerSubstation(e,t){let n=this.sitePad(e,t,7.8,6.2);for(let r of[-2,0,2]){et(n,1.15,1.35,1.45,_t,r,.8,0);for(let s of[-.35,.35])st(n,.09,.15,.7,Ot("insulator",7308926,.25,.5),r+s,1.85,0,12)}for(let r of[-3,3])en(n,fe(r,0,-2),fe(r,3.4,-2),.08,ri),en(n,fe(r,0,2),fe(r,3.4,2),.08,ri);en(n,fe(-3,3.4,-2),fe(3,3.4,-2),.08,ri),en(n,fe(-3,3.4,2),fe(3,3.4,2),.08,ri);for(let r of[-2,2])for(let s of[-2,0,2])st(n,.07,.12,.5,si,s,3.7,r,10)}materialsLab(e,t){let n=this.sitePad(e,t,8,6);et(n,5.5,2.35,3.8,Ot("lab",12041392,.24,.74),-.45,1.28,-.2),et(n,5.8,.16,4.1,_t,-.45,2.53,-.2);for(let s of[-2,-.7,.6,1.9])et(n,.95,.85,.07,qo,s,1.45,1.74);for(let s of[-1.6,.2,2])st(n,.24,.33,1.1+(s===.2?.35:0),_t,s,3.1,-.6,14);let r=new ke;r.position.set(2.8,0,1.75),n.add(r),et(r,1.3,.1,.8,yr,0,.85,0);for(let s of[-.5,.5])st(r,.04,.04,.85,ri,s,.43,0,8)}fieldTestRig(e,t){let n=this.sitePad(e,t,8,6),r=et(n,4.7,.16,1.5,_t,-.6,1.05,0);r.rotation.z=-.25,et(n,1.2,.65,1.25,Yi,-2.45,.46,0);let s=new ke;s.position.set(2.1,0,0),n.add(s),en(s,fe(-1.1,0,0),fe(0,3.6,0),.09,si),en(s,fe(1.1,0,0),fe(0,3.6,0),.09,si),en(s,fe(-1.2,2.4,0),fe(1.2,2.4,0),.08,si),en(s,fe(0,3.55,0),fe(0,1.25,0),.035,Xi),et(s,.65,.65,.65,$o,0,.95,0)}researchOutpost(e,t){let n=this.sitePad(e,t,7.5,6);for(let o of[-2,2])for(let l of[-1.3,1.3])st(n,.08,.11,1.2,_t,o,.62,l,8);et(n,5.1,1.85,3.5,Yi,0,2.05,0),this.gableRoof(n,5.3,3.7,3.15,_t),et(n,1.2,1.05,.08,qo,0,2.15,1.78);let r=st(n,.07,.1,4.4,_t,2.8,2.2,-.9,10),s=new ke;s.position.set(2.8,4.05,-.9),n.add(s);let a=wt(s,new Dt(.72,16,8,0,Math.PI*2,0,Math.PI/2),yr);a.rotation.x=1.05}weatherStation(e,t){let n=this.sitePad(e,t,7.2,6),r=et(n,2.8,1.65,2.45,yr,-1.45,.95,.5);this.gableRoof(n,3,2.65,1.9,_t);let s=st(n,.06,.1,4.7,_t,1.45,2.35,0,10);en(n,fe(.6,3.4,0),fe(2.3,3.4,0),.04,_t);for(let[o,l]of[[.6,0],[2.3,0],[1.45,.85]])st(n,.22,.22,.1,si,o,3.55,l,12);let a=wt(n,new Dt(.72,18,9,0,Math.PI*2,0,Math.PI/2),Ot("weather-dome",13096914,.15,.5),1.45,4.85,0);a.scale.y=.7}waterAnalysis(e,t){let n=this.sitePad(e,t,8,6.3);for(let r of[-1.8,.2,2.2])st(n,.82,.82,1.75,r===.2?Yi:_t,r,.96,-.35,22),st(n,.84,.84,.1,yr,r,1.86,-.35,22);en(n,fe(-2.6,.75,-.35),fe(3,.75,-.35),.1,Ot("water-pipe",5145999,.35,.45)),et(n,4.8,.16,1.5,_t,.2,1.95,1.65);for(let r of[-1.7,2.1])st(n,.07,.08,2,_t,r,1,1.65,8);for(let r of[-1.2,.2,1.6])st(n,.22,.15,.55,qo,r,2.35,1.65,16)}createTank(){let e=new ke;return this.fleet=new zo(e),e}updateTracks(e){this.fleet.animate(e)}createBase(e){this.hqLevel=e,gf(this.hq),this.hq.position.copy(Zt.hq),this.scenery.campus("hq",this.hq,e);let t=st(this.hq,.08,.14,5.5,_t,-6.5,2.75,-5.3,10);this.dish=new ke,this.dish.position.set(-6.5,5.1,-5.3),this.hq.add(this.dish);let n=wt(this.dish,new Dt(.85,16,8,0,Math.PI*2,0,Math.PI/2),yr);n.rotation.x=1.1,en(this.dish,fe(),fe(0,.3,1),.025,_t)}building(e,t,n,r,s,a,o,l){let c=new ke;c.position.set(t,0,n),e.add(c),et(c,r+.4,.28,s+.4,yr,0,.2,0),et(c,r,a,s,l,0,a/2+.3,0),et(c,r+.3,.18,s+.3,_t,0,a+.4,0);for(let d=0;d<Math.floor(r);d++)et(c,.63,.67,.06,qo,-r/2+.65+d,a*.68,s/2+.035),et(c,.66,.03,.09,_t,-r/2+.65+d,a*.68-.34,s/2+.06);et(c,1.2,1.75,.07,Xi,r*.27,1.17,s/2+.06);for(let d=0;d<12;d++)et(c,.015,a-.2,.035,ri,-r/2+d*r/12,a/2+.3,s/2+.08);hb(c,o,-r*.12,a-.04,s/2+.12,Math.min(r-.7,3.8)),et(c,1.2,.5,1.15,yr,-r/3,a+.73,-.6)}crate(e,t,n,r=ri){et(e,1,.8,.85,r,t,.54,n);for(let s of[-.32,.32])et(e,.06,.87,.9,_t,t+s,.54,n);et(e,.3,.12,.03,si,t,.57,n+.44)}lightPole(e,t,n){st(e,.055,.09,4.3,_t,t,2.15,n,8),en(e,fe(t,4.1,n),fe(t+.65,4.1,n),.045,_t),et(e,.4,.1,.25,Sf,t+.65,4.06,n)}districtGarden(e,t){let n=new Si;for(let o=0;o<28;o++){let l=o/28*Math.PI*2,c=7.1+Math.sin(o*1.9)*.55+Math.cos(o*3.1)*.28;o?n.lineTo(Math.cos(l)*c,Math.sin(l)*c*.82+1):n.moveTo(Math.cos(l)*c,Math.sin(l)*c*.82+1)}n.closePath();let r=new ei({color:t,transparent:!0,opacity:.27,depthWrite:!1}),s=wt(e,new Ks(n),r,0,.085,0);s.rotation.x=-Math.PI/2,s.castShadow=!1;let a=new xt({color:t,emissive:t,emissiveIntensity:.18,roughness:.7});for(let o=0;o<22;o++){let l=o/22*Math.PI*2+Math.sin(o)*.16,c=6+o%3*.5,d=wt(e,new Dt(.11+o%2*.04,9,6),a,Math.cos(l)*c,.19,Math.sin(l)*c*.82+1);d.castShadow=!1}}createHarbour(){this.scenery.campus("harbour")}createEnglishDistrict(){this.scenery.campus("english")}createPhysicsDistrict(){this.scenery.campus("physics")}createChemistryDistrict(){this.scenery.campus("chemistry")}createScienceBase(){this.scenery.campus("grove")}stationNode(e,t){return Go[e]?.[t]||null}clearRoute(){this.routeLayer.traverse(e=>{e.isMesh&&e.geometry.dispose()}),this.routeLayer.clear()}stationRoute(e,t){let n=this.tank.position.clone(),r=(Zt[e]||Zt.hq).clone().add(fe(2.4,.02,4.5)),s=[n];return n.distanceTo(r)>1.2&&t.distanceTo(r)>1.2&&s.push(r),s.push(t.clone()),s}showRoutePath(e){this.clearRoute();for(let t=0;t<e.length-1;t++){let n=e[t],r=e[t+1],s=n.distanceTo(r),a=Math.max(4,Math.floor(s/1.05));for(let o=t?0:1;o<a;o++){if(o%2===0)continue;let l=n.clone().lerp(r,o/a),c=st(this.routeLayer,.15,.2,.07,db,l.x,this.scenery.height(l.x,l.z)+.24,l.z,10);c.castShadow=!1}}}selectStation(e,t){let n=t===null?"":`${e}:${t}`;if(n===this.selectedNodeKey)return;if(this.selectedNodeKey=n,t===null){this.waypoint.visible=!1,this.clearRoute();return}let r=this.stationNode(e,t);r&&(this.waypoint.position.copy(r.position),this.waypoint.visible=!0,this.showRoutePath(this.stationRoute(e,r.position)))}setView(e,t="hq"){if(this.view=e,this.destination=t,e==="travel")return;let n=`${e}:${t}`,r=n!==this.framingKey;if(this.framingKey=n,e==="map"){this.target.set(0,0,-10),this.radius=63,this.elevation=55,r&&(this.yaw=.1);return}let s=Zt[t]||Zt.hq;!this.travel&&this.currentArea!==t&&(this.tank.position.copy(s).add(fe(2.4,.02,4.5)),this.tank.rotation.y=.3,this.currentArea=t);let a=this.selectedNodeKey.startsWith(`${t}:`)?this.stationNode(t,Number(this.selectedNodeKey.split(":")[1]))?.position:null;this.target.copy(e==="region"?s:e==="station"&&a?a:s).add(fe(0,1,0)),e==="region"&&this.width<650&&this.target.lerp(Zt.hq.clone().add(fe(0,1,0)),.5),e==="region"?(this.radius=38,this.elevation=31):e==="station"?(this.radius=23,this.elevation=17):(this.radius=18,this.elevation=11),r&&(this.yaw=e==="region"?.1:e==="station"?.28:.73)}drive(e,t){let n=(Zt[e]||Zt.hq).clone().add(fe(2.4,.02,4.5));this.beginTravel(this.scenery.roadPath(this.tank.position,e,this.currentArea),t,{kind:"region",region:e,label:lb[e]||"Destination"})}driveToStation(e,t,n){let r=this.stationNode(e,t);r&&(this.selectStation(e,t),this.beginTravel(this.stationRoute(e,r.position.clone().add(fe(0,.02,0))),n,{kind:"station",region:e,index:t,label:r.label}))}beginTravel(e,t,n){let r=e.slice(1).map((o,l)=>e[l].distanceTo(o)),s=r.reduce((o,l)=>o+l,0),a=e.at(-1);this.showRoutePath(e),this.travel={...n,path:e,lengths:r,totalLength:s,start:e[0],end:a,elapsed:0,duration:this.reduced?1:n.kind==="station"?5.2:6.5},this.onTravelEnd=t,this.view="travel",this.destination=n.region}zoom(e){let t=this.view==="map"||this.view==="region";this.radius=Cd(this.radius+e,t?34:12,t?68:44)}resetCamera(){this.framingKey="",this.setView(this.view,this.destination)}resize(){let e=this.canvas.parentElement.getBoundingClientRect();this.width=e.width,this.height=e.height,this.camera.aspect=e.width/e.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(e.width,e.height,!1)}animate=e=>{if(!this.running)return;requestAnimationFrame(this.animate);let t=Math.min((e-this.last)/1e3||0,.05);if(this.last=e,!this.paused&&!document.hidden){if(this.clock+=t,this.frame++,this.dish&&!this.reduced&&(this.dish.rotation.y=Math.sin(this.clock*.18)*.7),this.rig&&!this.reduced&&(this.rig.position.y=1+Math.sin(this.clock*.45)*.06),!this.reduced){for(let o of this.animatedProps)if(o.kind==="spin")o.object.rotation.y=this.clock*o.speed+o.phase;else if(o.kind==="swing")o.object.rotation.z=Math.sin(this.clock*o.speed+o.phase)*o.amp;else if(o.kind==="bob")o.object.position.y=o.baseY+Math.sin(this.clock*o.speed+o.phase)*o.amp;else if(o.kind==="slide")o.object.position.x=o.baseX+Math.sin(this.clock*o.speed+o.phase)*.22;else if(o.kind==="bubble"){let l=(this.clock*o.speed+o.phase)%1;o.object.position.y=o.baseY+l*o.range,o.object.scale.setScalar(.72+Math.sin(l*Math.PI)*.38)}}if(this.travel){let o=this.travel;o.elapsed+=t;let l=Cd(o.elapsed/o.duration,0,1),d=l*l*(3-2*l)*o.totalLength,u=0;for(;u<o.lengths.length-1&&d>o.lengths[u];)d-=o.lengths[u],u++;let h=o.path[u],f=o.path[u+1]||o.end,g=o.lengths[u]?Cd(d/o.lengths[u],0,1):1,y=this.tank.position.clone();this.tank.position.lerpVectors(h,f,g),this.tank.rotation.y=Math.atan2(f.x-h.x,f.z-h.z),this.vehicleDistance+=y.distanceTo(this.tank.position),this.tank.position.y=this.scenery.height(this.tank.position.x,this.tank.position.z)+.085+(this.reduced?0:Math.sin(this.clock*22)*.013),this.updateTracks(this.vehicleDistance),this.target.copy(this.tank.position).lerp(o.end,.16).add(fe(0,1,0)),this.radius=42,this.elevation=34,this.yaw=.22;let p=f.clone().sub(h).normalize();if(this.dustPuffs.forEach((m,_)=>{let x=(this.clock*.72+_/this.dustPuffs.length)%1,b=_%2?1:-1;m.visible=!this.reduced,m.position.copy(this.tank.position).addScaledVector(p,-1.7-x*4.3).add(fe(p.z*b*(.3+x),.18+x*.8,-p.x*b*(.3+x))),m.scale.setScalar(.35+x*1.25),m.material.opacity=(1-x)*.24}),l>=1){this.currentArea=o.region,this.travel=null,this.clearRoute(),this.dustPuffs.forEach(_=>{_.visible=!1,_.material.opacity=0});let m=this.onTravelEnd;this.onTravelEnd=null,m?.()}}}if(this.waypoint.visible&&!this.reduced){let o=1+Math.sin(this.clock*3.8)*.12;this.waypointRing.scale.setScalar(o),this.waypoint.rotation.y=this.clock*.18}for(let o of[...this.mapMarkers.values(),...this.stationMarkers.values(),...this.activityMarkers.values()])if(o.root.visible){let l=this.reduced?1:1+Math.sin(this.clock*2.4+o.root.position.x*.11)*(o.selected?.11:.045),c=this.width<650?this.view==="map"?2.7:this.view==="region"?2.05:1.2:1,d=o.activity?2.4:o.station?2.8:4.35;o.sprite.scale.setScalar(d*l*c),o.halo.scale.setScalar((o.selected?1.15:1)*l);let u=o.halo.userData.baseOpacity??o.halo.material.opacity,h=o.beam.userData.baseOpacity??o.beam.material.opacity;o.halo.material.opacity=u*(.86+(l-1)*1.7),o.beam.material.opacity=h*(.82+(l-1)*1.4)}this.water&&!this.reduced&&(this.water.position.y=Math.sin(this.clock*.55)*.012,this.water.material.normalMap&&(this.water.material.normalMap.offset.y=this.clock*.012));let n=this.width<650,r=this.view==="map"||this.view==="region",s=this.width/this.height,a=this.view==="vehicle"?Math.max(1,1.25/s):r?Math.max(1,(this.view==="map"?1.26:1.38)/s):n?this.view==="travel"?1.8:1.32:1;if(this.scene.fog.density=r||this.view==="travel"?.0015:.009,this.cameraGoal.copy(this.target).add(fe(Math.sin(this.yaw)*this.radius*a,this.elevation*a,Math.cos(this.yaw)*this.radius*a)),this.lookGoal.copy(this.target),!r&&!["travel","project","vehicle"].includes(this.view)&&(n?this.lookGoal.y-=7:this.lookGoal.add(fe(3.4,0,-2.8))),r&&this.lookGoal.add(n?this.view==="map"?fe(0,this.mapSelection?-26:0,0):fe(0,-8,0):this.view==="map"?fe(0,0,0):fe(2,0,0)),r?this.camera.position.copy(this.cameraGoal):this.camera.position.lerp(this.cameraGoal,this.reduced?1:1-Math.exp(-t*4)),this.camera.lookAt(this.lookGoal),this.renderer.render(this.scene,this.camera),this.onFrame){let o=this.view==="region"||this.view==="station"?[["hq",Zt.hq],["atlas",this.tank.position],...(Go[this.destination]||[]).map(l=>[l.id,l.position])]:[...Object.entries(Zt),...$n.map(l=>[`activity-${l.id}`,fe(...l.position)]),["atlas",this.tank.position]];this.onFrame(o.map(([l,c])=>{let d=l.startsWith("activity-")?this.activityMarkers.get(l.slice(9)):l.startsWith("station-")?this.stationMarkers.get(`${this.destination}:${l}`):this.mapMarkers.get(l),h=(l==="atlas"?c.clone().add(fe(0,2.7,0)):d?.root.position.clone()||c.clone().add(fe(0,3.5,0))).project(this.camera),f=this.view==="region"&&(l==="hq"||l==="atlas");return{id:l,x:(h.x+1)/2*this.width,y:(-h.y+1)/2*this.height,visible:h.z>-1&&h.z<1&&(f||h.x>-1.12&&h.x<1.12&&h.y>-1.12&&h.y<1.12)}}))}}};var fb={status:"reviewed",reviewer:"Codex educational content and ambiguity review",reviewedAt:"2026-09-05",humanCurriculumReview:"pending",source:"Original Beacon Brigade content; all evidence tables are authored datasets."};function Bt(i,e,t,n,r,s,a){return{id:t,version:1,regionId:i,subject:e,skill:n,yearBand:t==="chemistry-dissolving-particles"?"Age 8 supported introduction / Year 5 particle concept (provisional)":"Age 8 / Year 3 with supported stretch (provisional)",prerequisites:["Read a short evidence table","Choose the best-supported answer"],parameterPolicy:"Only the two checked authored instances are used.",review:fb,instances:a.map(o=>({hint:r,wrongFeedback:s,...o,type:"choice",diagram:{kind:"table",source:"Authored mission evidence",simulation:!1,...o.diagram}}))}}var Ef=Tf([Bt("english","english","english-context-meaning","Use clues to work out a word's meaning","Read what happens next. What does that tell you about the word's meaning?","That meaning does not fit the clue in the sentence. Read what the team does next.",[{prompt:"The path was narrow, so the team walked one behind another. What does narrow mean?",options:[{id:"not-wide",label:"Not wide"},{id:"very-noisy",label:"Very noisy"},{id:"steep",label:"Steep and rocky"},{id:"bright",label:"Brightly lit"}],answer:"not-wide",explanation:"A narrow path is not wide, so the team has room to walk only one behind another.",diagram:{label:"Word Archive clue",columns:["Sentence clue","What it tells us"],rows:[["One behind another","Little room side by side"]],controls:"Use the meaning that fits this sentence.",limitation:"Here, narrow describes the path."}},{prompt:"The glass cup was fragile, so Noor carried it carefully. What does fragile mean?",options:[{id:"easily-broken",label:"Easily broken"},{id:"very-heavy",label:"Very heavy"},{id:"brightly-coloured",label:"Brightly coloured"},{id:"difficult-to-find",label:"Difficult to find"}],answer:"easily-broken",explanation:"Fragile means easily broken. Noor carries the glass cup carefully to keep it safe.",diagram:{label:"Word Archive clue",columns:["Sentence clue","What it tells us"],rows:[["Noor carried it carefully","The cup could be damaged"]],controls:"Use the meaning that explains Noor's careful action.",limitation:"Here, fragile describes the glass cup."}}]),Bt("english","english","english-complete-sentence","Recognise a complete sentence","Look for who or what the sentence is about, what happens, and an idea that feels finished.","Read those words on their own. Do you still need more words to finish the idea?",[{prompt:"Which option is a complete sentence?",options:[{id:"bridge",label:"Under the old bridge"},{id:"lantern",label:"The lantern glowed brightly."},{id:"because",label:"Because it was dark"},{id:"running",label:"Running towards the gate"}],answer:"lantern",explanation:"The lantern glowed brightly. This tells us what the lantern did and gives a complete idea.",diagram:{label:"Sentence Studio check",columns:["Words","Who or what?","What happens or is true?"],rows:[["Under the old bridge","Not given","Not given"],["The lantern glowed brightly.","The lantern","Glowed brightly"],["Because it was dark","It","Was dark"],["Running towards the gate","Not given","Running"]],controls:"Read each option without adding words.",limitation:"Because it was dark has a subject, it, but needs more words to finish the idea."}},{prompt:"Which option is a complete sentence?",options:[{id:"beacon",label:"The beacon flashed twice."},{id:"beside",label:"Beside the tall tower"},{id:"when",label:"When the bell rang"},{id:"carrying",label:"Carrying the silver key"}],answer:"beacon",explanation:"The beacon flashed twice. This tells us what the beacon did and gives a complete idea.",diagram:{label:"Sentence Studio check",columns:["Words","Who or what?","What happens or is true?"],rows:[["The beacon flashed twice.","The beacon","Flashed twice"],["Beside the tall tower","Not given","Not given"],["When the bell rang","The bell","Rang"],["Carrying the silver key","Not given","Carrying"]],controls:"Read each option without adding words.",limitation:"When the bell rang tells us when, but needs more words to finish the idea."}}]),Bt("english","english","english-possessive-apostrophe","Use apostrophes to show who owns something","Count the owners first. One owner and several owners can need the apostrophe in different places.","Check how many people own the things. Then look closely at the apostrophe.",[{prompt:"The toolkit belongs to one engineer. Which sentence is correct?",hint:"For one owner, add 's to the owner's word. For example: the pilot's hat.",options:[{id:"one-owner",label:"The engineer's toolkit is open."},{id:"many-owners",label:"The engineers' toolkit is open."},{id:"no-apostrophe",label:"The engineers toolkit is open."},{id:"toolkit-owner",label:"The engineer toolkits' is open."}],answer:"one-owner",explanation:"There is one engineer. Add 's: the engineer's toolkit.",diagram:{label:"Spelling Signal ownership note",columns:["Owners","Object owned"],rows:[["One engineer","One toolkit"]],controls:"Use the exact number of owners shown.",limitation:"Here, the apostrophe shows who owns the toolkit."}},{prompt:"The maps belong to several captains. Which sentence is correct?",hint:"For several owners whose word ends in s, put the apostrophe after that s. For example: the pilots' hats.",options:[{id:"plural-owner",label:"The captains' maps are ready."},{id:"single-owner",label:"The captain's maps are ready."},{id:"plain-plural",label:"The captains maps are ready."},{id:"map-owner",label:"The captains map's are ready."}],answer:"plural-owner",explanation:"Several captains own the maps. Captains already ends in s, so add the apostrophe after it: captains' maps.",diagram:{label:"Spelling Signal ownership note",columns:["Owners","Objects owned"],rows:[["Several captains","Several maps"]],controls:"Use the exact number of owners shown.",limitation:"This rule is for words for several owners that end in s."}}]),Bt("english","english","english-linking-ideas","Choose a word to join two ideas","Read both ideas. Does the second tell you why something happened, or what happened next?","Read the sentence with your word in the gap. Check how the two ideas fit together.",[{prompt:"Rain was expected. Choose the word that tells us why: Mia took an umbrella ___ rain was expected.",hint:"The rain is the reason for taking the umbrella. Which word joins an action to its reason?",options:[{id:"because",label:"because"},{id:"but",label:"but"},{id:"or",label:"or"},{id:"until",label:"until"}],answer:"because",explanation:"Because introduces the reason Mia carried an umbrella.",diagram:{label:"Reading Room idea link",columns:["First idea","Second idea","Relationship"],rows:[["Mia took an umbrella","Rain was expected","Why she took it"]],controls:"Choose a word that explains why.",limitation:"The question asks for the clearest meaning in this sentence."}},{prompt:"The team closed the gate after hearing the bell. Choose the best word: The bell rang, ___ the team closed the gate.",hint:"Closing the gate is the result of hearing the bell. Which word joins an event to its result?",options:[{id:"so",label:"so"},{id:"because",label:"because"},{id:"although",label:"although"},{id:"unless",label:"unless"}],answer:"so",explanation:"So introduces the result of the warning bell ringing.",diagram:{label:"Reading Room idea link",columns:["First idea","Second idea","Relationship"],rows:[["The bell rang","The team closed the gate","What happened next"]],controls:"Choose a word that shows the result.",limitation:"The comma and joining word are part of one complete sentence."}}]),Bt("english","english","english-story-sequence","Find what happens first in a story","Read the Before this column. Find the event that needs none of the other events to happen first.","Something in the table happens before that event. Look for the start of this story.",[{prompt:"In this story, which event happens first?",options:[{id:"discover",label:"The team discovers the broken lamp."},{id:"replace",label:"The team replaces the lamp."},{id:"shine",label:"The beacon shines again."},{id:"ships",label:"Ships see the light again."}],answer:"discover",explanation:"In this story, the team finds the broken lamp first. Then they replace it, and ships can see the light again.",diagram:{label:"Story Press event clues",columns:["Event","Before this"],rows:[["Discover broken lamp","Nothing else listed"],["Replace lamp","Broken lamp is discovered"],["Beacon shines","Lamp is replaced"],["Ships see light","Beacon shines"]],controls:"Use the events in this table.",limitation:"Another story could have a different order."}},{prompt:"In this story about a missing key, which event happens first?",options:[{id:"notice",label:"The team notices that the key is missing."},{id:"search",label:"The team searches the map room."},{id:"find",label:"The team finds the key."},{id:"unlock",label:"The team unlocks the storehouse."}],answer:"notice",explanation:"In this story, the team notices the missing key first. Then they search, find it and unlock the storehouse.",diagram:{label:"Story Press event clues",columns:["Event","Before this"],rows:[["Notice missing key","Nothing else listed"],["Search map room","Missing key is noticed"],["Find key","Search begins"],["Unlock storehouse","Key is found"]],controls:"Use the events in this table.",limitation:"Another story could have a different order."}}]),Bt("physics","physics","physics-force-motion","Think about pushes, pulls and movement","A force is a push or a pull. Use the table to find which way each force acts.","Look at what is being pulled and which way the pull acts.",[{prompt:"A builder lets go of a wooden block. Which force pulls it towards the ground?",hint:"The hand is no longer touching the block. Think about the pull from Earth.",wrongFeedback:"The block falls even without a hand or magnet pulling it. What pulls things towards Earth?",options:[{id:"gravity",label:"Gravity"},{id:"magnetism",label:"Magnetism"},{id:"friction",label:"Friction"},{id:"hand-push",label:"A push from the builder's hand"}],answer:"gravity",explanation:"Gravity pulls the released block towards Earth even after the builder is no longer touching it.",diagram:{label:"Force Track release evidence",columns:["What we check","What we see"],rows:[["Object","Wooden block"],["Hand still touching it","No"],["Magnet nearby","No"],["Way it falls","Towards the ground"]],controls:"Let go without a push. Nothing is under the block.",limitation:"Air can slow a fall. This question asks about the downward pull."}},{prompt:"A rope is held still and level. Two teams pull equally hard in opposite directions. What happens while these pulls stay equal?",hint:"Compare the left and right pulls. Is either pull stronger? The rope starts still.",wrongFeedback:"Neither side pulls harder. Think about whether the rope has a stronger pull in either direction.",options:[{id:"stays",label:"It stays in place."},{id:"left",label:"It moves left."},{id:"right",label:"It moves right."},{id:"up",label:"It moves upwards."}],answer:"stays",explanation:"Neither side pulls harder. The sideways pulls balance, so this rope stays still while it is held level.",diagram:{label:"Force Track pull test",columns:["Side","Pull","Direction"],rows:[["Left team","Same strength","Left"],["Right team","Same strength","Right"]],controls:"Hold the rope level. Pull at the same time in one straight line.",limitation:"This model is about sideways pulls on a rope that starts still."}}]),Bt("physics","physics","physics-reflection","Use observations of reflected light","Reflected light bounces back from a surface. Look for the clearest picture in the table.","Compare the pictures seen in each surface. Which was clear, rather than wobbly or not seen?",[{prompt:"Which tested surface reflected the clearest image of the signal card?",options:[{id:"mirror",label:"Smooth mirror"},{id:"brick",label:"Rough brick"},{id:"cloth",label:"Crumpled cloth"},{id:"cardboard",label:"Unpainted cardboard"}],answer:"mirror",explanation:"The smooth mirror bounces light back in a way that keeps the picture clear. Rough surfaces scatter light in different directions.",diagram:{label:"Light Observatory reflection test",columns:["Surface","Picture seen"],rows:[["Smooth mirror","Clear"],["Rough brick","No clear picture"],["Crumpled cloth","No clear picture"],["Unpainted cardboard","No clear picture"]],controls:"Same signal card, light, distance and viewing position.",limitation:"The other surfaces reflect light too, but do not show a clear picture."}},{prompt:"Which tested water surface reflected the clearest image of the tower?",options:[{id:"still",label:"Still water"},{id:"small-ripples",label:"Water with small ripples"},{id:"large-waves",label:"Water with large waves"},{id:"foam",label:"Foamy water"}],answer:"still",explanation:"The still water had the smoothest surface and produced the clearest reflected image in the test.",diagram:{label:"Light Observatory water test",columns:["Water surface","Tower picture"],rows:[["Still","Clear"],["Small ripples","A little wobbly"],["Large waves","Very wobbly"],["Foam","No clear picture"]],controls:"Same tower model, light, container and viewing position.",limitation:"These results describe only the surfaces in this test."}}]),Bt("physics","physics","physics-sound-vibration","Connect vibrations with sound","Look for the object that was moving back and forth when the sound was heard.","Sound was linked to a vibration in this test. Find the part that moved back and forth.",[{prompt:"What was the tuning fork doing when the team heard its sound?",options:[{id:"vibrating",label:"Vibrating (moving quickly back and forth)"},{id:"glowing",label:"Glowing brightly"},{id:"melting",label:"Melting slowly"},{id:"becoming-magnetic",label:"Becoming magnetic"}],answer:"vibrating",explanation:"The fork moves quickly back and forth. This makes the air vibrate too, carrying sound to our ears.",diagram:{label:"Sound Lab tuning-fork test",columns:["What the fork does","Sound heard"],rows:[["Still","No"],["Moving rapidly back and forth","Yes"]],controls:"Same tuning fork, room and listening distance.",limitation:"The table does not show the tiny movements of the air."}},{prompt:"The team taps the drum skin. Which part starts vibrating to make the sound?",options:[{id:"skin",label:"The stretched drum skin"},{id:"stand",label:"The floor under the stand"},{id:"paint",label:"The painted symbol"},{id:"shadow",label:"The drum's shadow"}],answer:"skin",explanation:"The drum skin moves back and forth after the tap. It makes the air vibrate, carrying sound to our ears.",diagram:{label:"Sound Lab drum test",columns:["Part","Movement after the tap"],rows:[["Stretched drum skin","Back and forth"],["Floor under stand","None we can see"],["Painted symbol","Moves with the skin"],["Shadow","Not a part we can touch"]],controls:"Tap the same drum once in the middle.",limitation:"Other drum parts can vibrate too. Here the skin is tapped first."}}]),Bt("physics","physics","physics-complete-circuit","Identify a complete electrical circuit","Look for a battery and a loop with no gaps. The loop must pass through the bulb and join both battery ends.","Check for a battery, then trace the path through the bulb. Is there a gap?",[{prompt:"Which circuit plan will light the working bulb?",options:[{id:"closed",label:"A: battery and bulb joined in a loop"},{id:"beside",label:"B: bulb beside a battery, no wires"},{id:"one-terminal",label:"C: only one battery end wired to the bulb"},{id:"no-battery",label:"D: bulb and wires, no battery"}],answer:"closed",explanation:"A has a battery and a loop with no gaps through the bulb. Electric current can flow around this loop and light the bulb.",diagram:{label:"Circuit Station plans",columns:["Plan","Battery?","Loop through bulb?"],rows:[["A","Yes","Yes"],["B","Yes","No wires"],["C","Yes","No"],["D","No","Yes"]],controls:"All parts work and the bulbs match the small batteries. Wires touch metal contacts where joined.",limitation:"This model uses a small battery. Never experiment with power points."}},{prompt:"Which setup will make the signal lamp light?",options:[{id:"switch-closed",label:"Switch closed: no gap"},{id:"switch-open",label:"Switch open: a gap"},{id:"switch-removed",label:"Switch removed: two gaps"},{id:"battery-removed",label:"Switch closed, but no battery"}],answer:"switch-closed",explanation:"A closed switch joins the gap. With the battery in place, current can flow through the lamp and light it.",diagram:{label:"Circuit Station switch test",columns:["Setup","Battery?","Path through lamp"],rows:[["Switch closed","Yes","Complete"],["Switch open","Yes","Gap"],["Switch removed","Yes","Two gaps"],["Battery removed","No","Gap where battery was"]],controls:"Use matching, working parts. Only the change listed in each row is made.",limitation:"This model uses a small battery. Never experiment with power points."}}]),Bt("physics","physics","physics-thermal-insulation","Find what keeps water warm","All cups start at the same temperature. Find the highest temperature in the last column.","A higher temperature means warmer water. Compare the last column, not the wrap or lid names.",[{prompt:"Which tested wrap kept the warm water warmest after 10 minutes?",options:[{id:"felt",label:"Felt wrap"},{id:"paper",label:"Paper wrap"},{id:"foil",label:"Single foil wrap"},{id:"none",label:"No wrap"}],answer:"felt",explanation:"The felt cup stayed warmest at 54 C. This wrap helped slow heat loss in this test. C means degrees Celsius, a temperature unit.",diagram:{label:"Energy Workshop insulation test",columns:["Cup wrap","Start","After 10 minutes"],rows:[["Felt","60 C","54 C"],["Paper","60 C","50 C"],["Single foil","60 C","48 C"],["None","60 C","45 C"]],controls:"Same cups, water amount, starting temperature and room. C means degrees Celsius.",limitation:"These wraps were tested for 10 minutes. An adult handles hot water."}},{prompt:"Which tested lid kept the warm water warmest after 15 minutes?",options:[{id:"foam",label:"Foam lid"},{id:"card",label:"Card lid"},{id:"metal",label:"Thin metal lid"},{id:"open",label:"No lid"}],answer:"foam",explanation:"The foam-lid cup stayed warmest at 51 C. This lid helped slow heat loss in this test. It did not stop all cooling.",diagram:{label:"Energy Workshop lid test",columns:["Cup lid","Start","After 15 minutes"],rows:[["Foam","58 C","51 C"],["Card","58 C","48 C"],["Thin metal","58 C","46 C"],["None","58 C","42 C"]],controls:"Same cups, water amount, starting temperature and room. C means degrees Celsius.",limitation:"Heat can leave in several ways. An adult handles hot water."}}]),Bt("chemistry","chemistry","chemistry-states-of-matter","Use clues to name a state of matter","Volume means the space something takes up. Check whether the sample keeps its shape or fills the whole container.","Look at all the clues: shape, space taken up, and whether the sample fills the whole container.",[{prompt:"Sample A pours smoothly, with no grains. It changes shape but takes up the same space. What state is it?",hint:"Think about pouring water into a different-shaped cup. Does it fill every space, including the air above it?",options:[{id:"liquid",label:"Liquid"},{id:"solid",label:"Solid"},{id:"gas",label:"Gas"},{id:"light",label:"Light"}],answer:"liquid",explanation:"A liquid takes the shape of the part of the container it fills. Its volume stays about the same when poured.",diagram:{label:"Matter Hall sample test",columns:["Observation","Sample A"],rows:[["Top after settling","Smooth and level; no grains"],["Space taken up after pouring","Same"],["Fills the whole container","No; air above it"]],controls:"Pour the whole sample into another cup. Keep the temperature the same.",limitation:"Sand can pour too, but it is made of solid grains. This sample has no grains."}},{prompt:"Sample B spreads out to fill all the space inside a closed container. What state is it?",hint:"Think about air inside a bottle. Does it sit at the bottom like water, or spread through the space?",options:[{id:"gas",label:"Gas"},{id:"liquid",label:"Liquid"},{id:"solid",label:"Solid"},{id:"sound",label:"Sound"}],answer:"gas",explanation:"A gas spreads out to fill the available space in its sealed container.",diagram:{label:"Matter Hall sample test",columns:["Observation","Sample B"],rows:[["Keeps its own shape","No"],["Has a top like water in a cup","No"],["Fills the whole container","Yes"]],controls:"Keep the container closed and the temperature the same.",limitation:"The table describes the whole sample, not its tiny particles."}}]),Bt("chemistry","chemistry","chemistry-separate-mixture","Choose a tool to separate a mixture","Look for a difference between the two materials. Which tool can use that difference to separate them?","We need to remove one material from the other, not just change how the mixture looks.",[{prompt:"Tiny iron pieces are mixed with dry sand. Which tool can separate them?",hint:"The table shows which material the magnet pulls. Can it pull one material away and leave the other?",options:[{id:"magnet",label:"Move a magnet over the mixture"},{id:"more-sand",label:"Add more sand"},{id:"crush",label:"Crush the mixture"},{id:"stir",label:"Stir it with a wooden stick"}],answer:"magnet",explanation:"The magnet pulls the tiny iron pieces out of this sand. It does not pull the sand used in this test.",diagram:{label:"Mixture Lab property check",columns:["Material","Magnet can pick it up","Dry"],rows:[["Tiny iron pieces","Yes","Yes"],["Sand","No","Yes"]],controls:"Same covered magnet and dry mixture. An adult handles tiny iron pieces.",limitation:"Some sand contains magnetic grains. This tested sand does not."}},{prompt:"Large stones are mixed with fine sand. Which tool can separate them?",hint:"A sieve is a tray with small holes. Which material fits through the holes, and which stays on top?",options:[{id:"sieve",label:"Shake the mixture through a sieve"},{id:"magnet",label:"Use a magnet"},{id:"dissolve",label:"Try to dissolve both in water"},{id:"paint",label:"Paint the stones"}],answer:"sieve",explanation:"The sand falls through the sieve's small holes. The stones are too big, so they stay on top.",diagram:{label:"Mixture Lab size check",columns:["Material","Size compared with holes","Falls through?"],rows:[["Stones","Bigger","No"],["Sand grains","Smaller","Yes"]],controls:"Use the same sieve and keep the mixture dry.",limitation:"Wet sand can stick in lumps and may not fall through."}}]),Bt("chemistry","chemistry","chemistry-observe-change","Use clues about changes in materials","Look at what changed in the material, not just its container.","Use the results in the table to check what happened to the material.",[{prompt:"Which change can we undo by cooling the material?",hint:"Imagine putting melted ice in a freezer. Then think about whether cooling could undo the other changes.",wrongFeedback:"Cooling cannot turn ash back into paper, uncook an egg or remove rust. Look for a change of state.",options:[{id:"melting-ice",label:"Ice melting into liquid water"},{id:"burning-paper",label:"Paper burning into ash and gases"},{id:"frying-egg",label:"An egg cooking in a pan"},{id:"rusting",label:"Iron slowly forming rust"}],answer:"melting-ice",explanation:"Cooling liquid water below its freezing point can turn it back into solid ice.",diagram:{label:"Changes Chamber log",columns:["Change","Cooling turns it back?"],rows:[["Melting ice","Yes, as ice"],["Burning paper","No"],["Cooking egg","No"],["Rusting iron","No"]],controls:"Check whether cooling alone undoes the change.",limitation:"Some changes are hard to undo. Adults handle heat and flames."}},{prompt:"Two liquids are mixed without heating or shaking. Which clue suggests a chemical reaction may be making gas?",hint:"A chemical reaction can make a new material. Look for gas forming inside the liquid, not a change to the cup.",wrongFeedback:"Changing a cup or its label does not show a reaction. Look for a change inside the mixture.",options:[{id:"new-bubbles",label:"Bubbles keep forming in the liquid"},{id:"taller-cup",label:"The mixture is poured into a taller cup"},{id:"new-shape",label:"The cup has a different shape"},{id:"label",label:"A new label is placed on the cup"}],answer:"new-bubbles",explanation:"The new bubbles contain gas. A reaction may be making that gas, but we need more tests to be sure.",diagram:{label:"Changes Chamber reaction check",columns:["Condition","Observation"],rows:[["Before mixing","No bubbles"],["After mixing","Bubbles keep forming"],["Temperature","Room temperature; not boiling"]],controls:"Clean cup, no shaking, no heating. This is a made-up test, not a mixing activity.",limitation:"Bubbles alone are not proof. Gas already dissolved in a liquid can escape too."}}]),Bt("chemistry","chemistry","chemistry-material-properties","Choose a material that does both jobs","Check both needs in the same row. One matching result is not enough.","That sample misses one of the needs. Look across its whole row and check both results.",[{prompt:"A cover must bend around a box and keep water out. Which sample does both?",options:[{id:"film",label:"Sample A: flexible film"},{id:"card",label:"Sample B: card"},{id:"tile",label:"Sample C: tile"},{id:"cloth",label:"Sample D: cloth with small gaps"}],answer:"film",explanation:"Sample A bends around the box and lets no water through, so it meets both requirements.",diagram:{label:"Properties Bay cover tests",columns:["Sample","Bends around box?","Water gets through?"],rows:[["A: flexible film","Yes","No"],["B: card","Yes","Yes"],["C: tile","No","No"],["D: cloth with gaps","Yes","Yes"]],controls:"Same sample size, water amount, box and one-minute test.",limitation:"Other samples or longer tests may give different results."}},{prompt:"A window must let light through and keep water out. Which sample does both?",options:[{id:"clear-plastic",label:"Sample E: clear plastic"},{id:"paper",label:"Sample F: thin paper"},{id:"metal",label:"Sample G: metal sheet"},{id:"mesh",label:"Sample H: plastic mesh"}],answer:"clear-plastic",explanation:"Sample E lets light through and lets no water through, so it meets both window-panel needs.",diagram:{label:"Properties Bay panel tests",columns:["Sample","Light gets through?","Water gets through?"],rows:[["E: clear plastic","Yes","No"],["F: thin paper","Some","Yes"],["G: metal sheet","No","No"],["H: plastic mesh","Yes","Yes"]],controls:"Same sample size, light, water amount and one-minute test.",limitation:"This test does not tell us how strong a window would be."}}]),Bt("chemistry","chemistry","chemistry-dissolving-particles","Use clues to explain dissolving","Look at what is left when the water dries up. Could the material still be in the water, even if you cannot see it?","Look at the last row. The crystals come back when the water dries up, so the material has not vanished.",[{prompt:"Sugar is stirred into water. Tiny particles can be too small to see. Use the table: what happened to the sugar?",options:[{id:"dissolved",label:"It dissolved and spread through the water."},{id:"stopped-existing",label:"It stopped existing."},{id:"oxygen",label:"It changed into oxygen."},{id:"left-cup",label:"It passed through the solid cup."}],answer:"dissolved",explanation:"When sugar dissolves, its tiny particles spread through the water. They are too small to see. The sugar is still there and forms crystals when the water dries up.",diagram:{label:"Particle Observatory sugar evidence",columns:["Check","Observation"],rows:[["Before stirring","Sugar crystals can be seen"],["After stirring with the lid on","No crystals seen; same total mass"],["Lid off; water dries up","Sugar crystals remain"]],controls:"No spills. Compare the whole cup's mass with the lid on. Then remove the lid to let water dry up.",limitation:"This made-up test does not show tiny particles. Never taste lab mixtures."}},{prompt:"We stir salt into water and cannot see it. Tiny particles can be too small to see. Use the table: what happened?",options:[{id:"spread",label:"Salt particles spread through the water."},{id:"destroyed",label:"The water destroyed the salt."},{id:"sand",label:"The salt changed into sand."},{id:"escaped",label:"All the salt escaped into the air."}],answer:"spread",explanation:"The salt dissolved. Its tiny particles are too small to see and spread through the water. Salt crystals remain when the water dries up.",diagram:{label:"Particle Observatory salt evidence",columns:["Check","Observation"],rows:[["Before stirring","Salt crystals can be seen"],["After stirring with the lid on","No crystals seen; same total mass"],["Lid off; water dries up","Salt crystals remain"]],controls:"No spills. Compare the whole cup's mass with the lid on. Then remove the lid to let water dry up.",limitation:"This made-up test does not show tiny particles. Never taste lab mixtures."}}]),Bt("grove","life-sciences","grove-plant-parts","Match plant parts to their jobs","Find the job in the question. Look for a plant part that does that job in the table.","That part has a different job here. Check what each part takes in or makes.",[{prompt:"Which part of this plant uses sunlight to make food called sugars?",options:[{id:"leaves",label:"Leaves"},{id:"roots",label:"Roots"},{id:"flower",label:"Flower petals"},{id:"seed-coat",label:"Seed coat"}],answer:"leaves",explanation:"Green leaves use light energy, water and carbon dioxide from the air to make sugars. This is called photosynthesis.",diagram:{label:"Seed Lab plant-part observations",columns:["Plant part","Main job here"],rows:[["Leaves","Use light to make sugars"],["Roots","Take in water and minerals"],["Flower petals","Attract insects that carry pollen"],["Seed coat","Protect the seed"]],controls:"Use the jobs listed for this flowering plant.",limitation:"Other green parts, such as some stems, can make sugars too."}},{prompt:"Which plant part takes in most of the water needed by this seedling?",options:[{id:"roots",label:"Roots"},{id:"leaves",label:"Leaves"},{id:"petals",label:"Petals"},{id:"fruit",label:"Fruit"}],answer:"roots",explanation:"The seedling's roots absorb most of its water from the soil.",diagram:{label:"Seed Lab seedling observations",columns:["Plant part","Where it is or what it does"],rows:[["Roots","In moist soil; take in water"],["Leaves","In light; make sugars"],["Petals","Not present on this seedling"],["Fruit","Not present on this seedling"]],controls:"This young plant is healthy and growing in damp soil.",limitation:"Some plants take in water through other parts too."}}]),Bt("grove","life-sciences","grove-habitat-needs","Find a place with everything an animal needs","A habitat is a place to live. Check that it gives this animal everything listed in the table.","That place is missing something this animal needs. Check every row, not just food or water.",[{prompt:"This pond frog needs the things in the table. Which place has them all?",options:[{id:"pond-edge",label:"A shaded pond edge with insects and plants"},{id:"dry-rock",label:"A dry bare rock with no nearby water"},{id:"sealed-box",label:"A sealed empty box"},{id:"salt-flat",label:"An open salt flat with no shelter"}],answer:"pond-edge",explanation:"The pond edge has fresh water, insects to eat and plants for shelter. It is damp and shaded too.",diagram:{label:"Habitat Dome frog needs",columns:["Need","What this frog needs"],rows:[["Water","Fresh pond water"],["Food","Small insects"],["Shelter","Pond plants and shade"],["Place","Damp areas"]],controls:"Compare each option with all four needs of this frog.",limitation:"Other kinds of frogs may need different places to live."}},{prompt:"This small bird needs the things in the table. Which place has them all?",options:[{id:"woodland",label:"Woodland with shrubs, seeds, insects and water"},{id:"empty-yard",label:"A paved yard with no plants or water"},{id:"deep-ocean",label:"Deep ocean far from land"},{id:"sealed-room",label:"A sealed room with no food"}],answer:"woodland",explanation:"The woodland provides food, water, nesting places and cover from danger.",diagram:{label:"Habitat Dome bird needs",columns:["Need","What this bird needs"],rows:[["Water","Fresh water nearby"],["Food","Seeds and insects"],["Shelter","Shrubs and trees"],["Nesting","Branches and plant material"]],controls:"Compare each option with all four needs of this woodland bird.",limitation:"Other kinds of birds may have different needs."}}]),Bt("grove","life-sciences","grove-life-cycle","Find the next stage in an animal's life","Find Egg in the table. Read the next row to see what hatches from it.","That is not the next stage for this animal. Start at Egg and move down one row.",[{prompt:"Which stage comes directly after a butterfly egg hatches?",options:[{id:"larva",label:"Larva (caterpillar)"},{id:"adult",label:"Adult butterfly"},{id:"pupa",label:"Pupa"},{id:"seedling",label:"Seedling"}],answer:"larva",explanation:"A caterpillar hatches from the egg. It later becomes a pupa, then an adult butterfly. Larva is another name for the caterpillar stage.",diagram:{label:"Life-Cycle Nursery butterfly record",columns:["Stage number","Stage"],rows:[["1","Egg"],["2","Larva (caterpillar)"],["3","Pupa (chrysalis)"],["4","Adult butterfly"]],controls:"Use the stage order shown for a butterfly.",limitation:"Different butterflies spend different amounts of time at each stage."}},{prompt:"In this frog's life cycle, what hatches from the egg?",options:[{id:"tadpole",label:"Tadpole"},{id:"adult",label:"Adult frog"},{id:"froglet",label:"Froglet"},{id:"caterpillar",label:"Caterpillar"}],answer:"tadpole",explanation:"This frog's egg hatches into a tadpole. The tadpole later grows legs and becomes a froglet, a young frog.",diagram:{label:"Life-Cycle Nursery frog record",columns:["Stage number","Stage"],rows:[["1","Egg"],["2","Tadpole"],["3","Tadpole with legs"],["4","Froglet"],["5","Adult frog"]],controls:"Use the stage order shown for this frog life cycle.",limitation:"Some frogs skip a free-swimming tadpole stage. Use this frog's record."}}]),Bt("grove","life-sciences","grove-food-chain","Find what makes its own food in a food chain","In these chains, the producer uses sunlight to make its own food. The animals get food by eating other living things.","That animal eats another living thing. Look for the living thing that makes its own food using light.",[{prompt:"Which living thing in this food chain makes its own food using sunlight? We call it a producer.",options:[{id:"grass",label:"Grass"},{id:"grasshopper",label:"Grasshopper"},{id:"frog",label:"Frog"},{id:"snake",label:"Snake"}],answer:"grass",explanation:"Grass uses sunlight, water and carbon dioxide from the air to make sugars. It is the producer in this chain.",diagram:{label:"Food-Web Field energy path",columns:["From","To","Meaning"],rows:[["Grass","Grasshopper","Grasshopper eats grass"],["Grasshopper","Frog","Frog eats grasshopper"],["Frog","Snake","Snake eats frog"]],controls:"From is the food. To is the animal that eats it.",limitation:"This is one food chain. These animals can have other foods too."}},{prompt:"Which living thing in this pond food chain makes its own food using sunlight? We call it a producer.",hint:"Algae are living things in the water that can use sunlight. Which choice does not need to eat another living thing?",options:[{id:"algae",label:"Algae"},{id:"snail",label:"Snail"},{id:"fish",label:"Fish"},{id:"heron",label:"Heron"}],answer:"algae",explanation:"These algae use sunlight, water and carbon dioxide to make sugars. They are producers in this pond food chain.",diagram:{label:"Food-Web Field pond path",columns:["From","To","Meaning"],rows:[["Algae","Snail","Snail eats algae"],["Snail","Fish","Fish eats snail"],["Fish","Heron","Heron eats fish"]],controls:"From is the food. To is the animal that eats it.",limitation:"This is one pond food chain. These animals can have other foods too."}}]),Bt("grove","life-sciences","grove-adaptation-function","Find how a body part helps an animal","Think about the body part in the question. How could it help the animal where it lives?","Look at what this body part does in the table. Does that match the job you chose?",[{prompt:"How do a duck's webbed feet help it in water?",options:[{id:"paddle",label:"They push against water while swimming."},{id:"breathe",label:"They let the duck breathe underwater."},{id:"dry-feathers",label:"They keep every feather dry."},{id:"chew",label:"They help the duck chew food."}],answer:"paddle",explanation:"The skin between the toes creates a broad surface that pushes against water like a paddle.",diagram:{label:"Adaptation Clinic duck observations",columns:["Body part","What happens"],rows:[["Toes spread out","Skin makes a wide paddle"],["Foot pushes back","Water moves backwards"],["Duck's body","Moves forwards"]],controls:"Watch the same duck swimming in calm water.",limitation:"Feet have other jobs too. Here we are looking at swimming."}},{prompt:"How does thick fur help a polar bear stay warm in a cold place?",hint:"A smaller temperature drop means less cooling. Compare the thick covering with no covering.",options:[{id:"slow-heat-loss",label:"It slows heat loss from the body."},{id:"make-food",label:"It makes food from sunlight."},{id:"breathe-water",label:"It allows the bear to breathe underwater."},{id:"hear-distance",label:"It makes distant sounds louder."}],answer:"slow-heat-loss",explanation:"Thick fur traps air and slows heat leaving the bear's warm body. The fur does not make heat itself.",diagram:{label:"Adaptation Clinic insulation evidence",columns:["Model covering","Cooling after 10 minutes"],rows:[["Thick fur-like covering","3 C"],["Thin covering","8 C"],["No covering","12 C"]],controls:"Same warm model, starting temperature, room and time. C means degrees Celsius.",limitation:"This is a model, not a test on a bear. Body fat also helps polar bears stay warm."}}])]);function Tf(i){for(let e of Object.values(i))e&&typeof e=="object"&&Tf(e);return Object.freeze(i)}var Yo=4;var Af=4,jo=Zo({2:{parts:12,cores:12},3:{parts:24,cores:24}}),Ut=Zo([{id:"harbour",name:"Maths Operations",subject:"maths",resource:"parts",icon:"calculator",minHqLevel:1,description:"Run the number-powered logistics district and recover building parts.",stationNames:["Multiplication Depot","Addition Dispatch","Division Workshop","Subtraction Yard","Place Value Tower"]},{id:"english",name:"English Communications",subject:"english",resource:"parts",icon:"book-open",minHqLevel:1,description:"Decode words, sentences and stories inside the communications archive.",stationNames:["Word Archive","Sentence Studio","Spelling Signal","Reading Room","Story Press"]},{id:"physics",name:"Physics Research",subject:"physics",resource:"cores",icon:"orbit",minHqLevel:1,description:"Test forces, light, sound, circuits and energy at the research complex.",stationNames:["Force Track","Light Observatory","Sound Lab","Circuit Station","Energy Workshop"]},{id:"chemistry",name:"Chemistry Laboratory",subject:"chemistry",resource:"cores",icon:"flask-conical",minHqLevel:1,description:"Investigate matter, mixtures, changes, materials and particle models.",stationNames:["Matter Hall","Mixture Lab","Changes Chamber","Properties Bay","Particle Observatory"]},{id:"grove",name:"Life Sciences BioDome",subject:"life-sciences",resource:"cores",icon:"sprout",minHqLevel:1,description:"Study plants, habitats, life cycles, food webs and adaptations.",stationNames:["Seed Lab","Habitat Dome","Life-Cycle Nursery","Food-Web Field","Adaptation Clinic"]}]),Cf={status:"reviewed",reviewer:"Codex authored-answer and executable consistency review",reviewedAt:"2026-09-05",humanCurriculumReview:"pending",source:"Original Beacon Brigade content; science observations are curated virtual datasets."};function us(i,e,t,n,r,s){return{id:i,version:1,regionId:"harbour",subject:"maths",skill:e,yearBand:"Age 8 / Year 3 with supported stretch (provisional)",prerequisites:t,parameterPolicy:"Only the two checked authored variants are used.",review:Cf,instances:r.map(a=>({hint:n,wrongFeedback:n,...s(a),parameters:a,type:"number"}))}}function hs(i,e,t,n){return{id:i,version:1,regionId:"legacy-grove",subject:"science",skill:e,yearBand:"Age 8 / Year 3 with supported stretch (provisional)",prerequisites:["Read a short observation table","Compare evidence with a requirement"],parameterPolicy:"Only the two checked curated datasets are used.",review:Cf,instances:n.map(r=>({...r,hint:t,wrongFeedback:t,type:"choice",diagram:{...r.diagram,source:"Curated virtual observations",simulation:!1}}))}}var Rd=Zo([us("harbour-crate-reserve","Multiply equal groups, then subtract",["Multiplication facts","Subtraction"],"Count the pieces in all crates. Then take away the pieces for the other base.",[{crates:4,each:6,reserved:9},{crates:5,each:4,reserved:7}],({crates:i,each:e,reserved:t})=>({prompt:`${i} boxes each hold ${e} pieces. Another base needs ${t} of these pieces. How many are left for us?`,hint:`Add ${e} for each of the ${i} boxes, or work out ${i} x ${e}. Then take away ${t}.`,wrongFeedback:"There are two steps: count all the pieces, then take away the other base's share.",answer:i*e-t,explanation:`${i} x ${e} = ${i*e} pieces. ${i*e} - ${t} = ${i*e-t} pieces remain.`,diagram:{kind:"groups",label:"Boxes of pieces",groups:i,itemsPerGroup:e,reserved:t}})),us("harbour-delivery-total","Add two three-digit quantities",["Place value","Addition with regrouping"],"Start with the first delivery. Add the hundreds, then the tens, then the ones from the second delivery.",[{first:136,second:247},{first:258,second:164}],({first:i,second:e})=>{let t=Math.floor(e/100)*100,n=Math.floor(e/10)%10*10,r=e%10;return{prompt:`The morning delivery brings ${i} bolts. The afternoon delivery brings ${e} bolts. How many bolts arrive altogether?`,answer:i+e,explanation:`${i} + ${t} = ${i+t}. Add ${n} to get ${i+t+n}. Add ${r} to get ${i+e} bolts altogether.`,hint:`Start at ${i}. Add ${t}, then ${n}, then ${r}.`,wrongFeedback:"Both deliveries add to the total. Keep the hundreds, tens and ones in their places.",diagram:{kind:"quantities",label:"Bolt delivery log",rows:[["Morning",i],["Afternoon",e]]}}}),us("harbour-equal-packs","Divide into equal groups",["Equal sharing","Multiplication facts"],"Give each kit the same number. Count in groups to reach the total.",[{total:36,kits:6},{total:48,kits:8}],({total:i,kits:e})=>({prompt:`Share ${i} metal rings equally between ${e} repair kits. How many rings go in each kit?`,hint:`Imagine giving one ring to each of ${e} kits at a time. How many rounds use all ${i} rings?`,wrongFeedback:"Each kit needs the same number. Check that all the kits together use every ring.",answer:i/e,explanation:`${i} divided by ${e} = ${i/e}. Check: ${e} x ${i/e} = ${i}. Each kit gets ${i/e} rings.`,diagram:{kind:"sharing",label:"Repair kits",total:i,groups:e}})),us("harbour-stock-left","Subtract with regrouping",["Three-digit place value","Subtraction"],"You can find what is left by counting up from the number used to the starting number.",[{stock:302,used:178},{stock:410,used:235}],({stock:i,used:e})=>{let t=Math.ceil(e/100)*100,n=t-e,r=i-t;return{prompt:`The workshop has ${i} spare parts. It uses ${e} for repairs. How many parts are left?`,hint:`Count up from ${e} to ${t}, then to ${i}. Add the two jumps.`,wrongFeedback:"We need the parts left, not the parts used. Try counting up from the used number to the starting number.",answer:i-e,explanation:`From ${e} to ${t} is ${n}. Then to ${i} is ${r}. Add the jumps: ${n} + ${r} = ${i-e} parts left.`,diagram:{kind:"quantities",label:"Spare parts",rows:[["At the start",i],["Used",e]]}}}),us("harbour-place-value","Compose hundreds, tens and ones",["Base-ten grouping"],"Each full box stands for 100, each bundle for 10, and each loose pin for 1.",[{hundreds:3,tens:4,ones:8},{hundreds:5,tens:2,ones:6}],({hundreds:i,tens:e,ones:t})=>({prompt:`There are ${i} boxes of 100 pins, ${e} bundles of 10 pins and ${t} loose pins. How many pins are there?`,answer:i*100+e*10+t,explanation:`${i} x 100 + ${e} x 10 + ${t} = ${i*100+e*10+t} pins.`,wrongFeedback:"A box is worth 100 pins and a bundle is worth 10. Count their values, not just the boxes and bundles.",diagram:{kind:"place-value",label:"Pin count",hundreds:i,tens:e,ones:t}})),us("harbour-missing-supply","Find a missing addend",["Addition and subtraction are inverse"],"Count up from the number packed to the number needed. How many more does that take?",[{target:150,packed:86},{target:200,packed:127}],({target:i,packed:e})=>{let t=Math.ceil(e/10)*10,n=t-e,r=i-t;return{prompt:`We need ${i} bolts. We have packed ${e}. How many more bolts do we need?`,hint:`Start at ${e}. Jump to ${t}, then to ${i}. Add the jumps.`,wrongFeedback:"Some bolts are already packed. Find only the extra bolts needed to reach the total.",answer:i-e,explanation:`From ${e} to ${t} is ${n}. Then to ${i} is ${r}. Add the jumps: ${n} + ${r} = ${i-e} more bolts.`,diagram:{kind:"quantities",label:"Bolts to pack",rows:[["Needed",i],["Packed",e]]}}}),hs("grove-flexible-cover","Choose a material using two properties","Find a row with Yes for bending and No for water getting through. Both must match.",[{prompt:"A cover must bend around a box and keep water out. Which sample does both?",options:[{id:"foil",label:"Sample A: flexible sheet"},{id:"card",label:"Sample B: card"},{id:"tile",label:"Sample C: tile"}],answer:"foil",explanation:"Sample A bends and lets no water through in the displayed tests. B lets water through; C does not bend. Only A meets both needs.",diagram:{kind:"table",label:"Cover tests",columns:["Sample","Bends around box","Water through"],rows:[["A: flexible sheet","Yes","No"],["B: card","Yes","Yes"],["C: tile","No","No"]],controls:"Same water volume and test time.",limitation:"These results describe only the tested samples."}},{prompt:"A new cover must bend around a box and keep water out. Which sample does both?",options:[{id:"board",label:"Sample D: board"},{id:"film",label:"Sample E: film"},{id:"cloth",label:"Sample F: cloth"}],answer:"film",explanation:"E bends and keeps water out in this test. D cannot bend. F lets water through.",diagram:{kind:"table",label:"New cover tests",columns:["Sample","Bends around box","Water through"],rows:[["D: board","No","No"],["E: film","Yes","No"],["F: cloth","Yes","Yes"]],controls:"Same amount of water and test time.",limitation:"Other samples may give different results."}}]),hs("grove-magnet-evidence","Use observations about magnetic attraction","Attracted means pulled towards the magnet. Find Yes in that column. Shiny objects are not always magnetic.",[{prompt:"Which object was pulled towards the magnet in this test?",options:[{id:"steel",label:"Steel washer"},{id:"aluminium",label:"Aluminium tab"},{id:"wood",label:"Wooden peg"}],answer:"steel",explanation:"The magnet pulled the steel washer, but not the aluminium tab or wooden peg. Not all metals are attracted to a magnet.",diagram:{kind:"table",label:"Magnet observations",columns:["Object","Attracted"],rows:[["Steel washer","Yes"],["Aluminium tab","No"],["Wooden peg","No"]],controls:"Same magnet and starting distance.",limitation:"Results apply to these objects and this magnet."}},{prompt:"Which object was pulled towards the magnet in this new test?",options:[{id:"plastic",label:"Plastic spacer"},{id:"copper",label:"Copper strip"},{id:"iron",label:"Iron nail"}],answer:"iron",explanation:"Only the iron nail was attracted in this test. The copper strip is metal but was not attracted.",diagram:{kind:"table",label:"Pickup observations",columns:["Object","Attracted"],rows:[["Plastic spacer","No"],["Copper strip","No"],["Iron nail","Yes"]],controls:"Same magnet and starting distance.",limitation:"Not every metal is attracted to this magnet."}}]),hs("grove-fair-ramp","Identify a fair comparison","Change only the surface. Keep the trolley, ramp height and release method the same.",[{prompt:"Does the surface change how far a trolley rolls? Which two tests change only the surface?",options:[{id:"a-b",label:"Tests A and B"},{id:"a-c",label:"Tests A and C"},{id:"b-c",label:"Tests B and C"}],answer:"a-b",explanation:"A and B use the same trolley, ramp height and no push. Only the surface changes. C uses a higher ramp.",diagram:{kind:"table",label:"Ramp test plans",columns:["Test","Trolley","Ramp height","Surface","Release"],rows:[["A","1","10 cm","Smooth","No push"],["B","1","10 cm","Rough","No push"],["C","1","20 cm","Rough","No push"]],controls:"Keep the trolley, ramp height and start the same.",limitation:"Repeat the tests to check the results."}},{prompt:"We want to test two surfaces. Which pair keeps the trolley, ramp height and start the same?",options:[{id:"d-e",label:"Tests D and E"},{id:"d-f",label:"Tests D and F"},{id:"e-f",label:"Tests E and F"}],answer:"d-f",explanation:"D and F use the same trolley, 15 cm ramp and release; only the surface changes. E changes the trolley too.",diagram:{kind:"table",label:"New ramp test plans",columns:["Test","Trolley","Ramp height","Surface","Release"],rows:[["D","1","15 cm","Smooth","No push"],["E","2","15 cm","Rough","No push"],["F","1","15 cm","Rough","No push"]],controls:"Keep the trolley, ramp height and start the same.",limitation:"Change only the surface for this fair test."}}]),hs("grove-absorbent-pad","Compare measured material properties","Absorbs means soaks up. Find the biggest amount of water in the table. mL measures the amount of water.",[{prompt:"Each pad gets 20 mL of water. Which pad soaks up the most in this test?",options:[{id:"a",label:"Pad A"},{id:"b",label:"Pad B"},{id:"c",label:"Pad C"}],answer:"b",explanation:"B soaks up 14 mL. That is more than A's 5 mL and C's 9 mL.",diagram:{kind:"table",label:"Absorbency test",columns:["Pad","Water absorbed"],rows:[["A","5 mL"],["B","14 mL"],["C","9 mL"]],controls:"Same pad size, water amount and 30-second test.",limitation:"Other tests may give different results."}},{prompt:"Each pad gets 20 mL of water. Which pad soaks up the most in this new test?",options:[{id:"d",label:"Pad D"},{id:"e",label:"Pad E"},{id:"f",label:"Pad F"}],answer:"f",explanation:"F soaks up 16 mL. That is more than D's 8 mL and E's 11 mL.",diagram:{kind:"table",label:"New absorbency test",columns:["Pad","Water absorbed"],rows:[["D","8 mL"],["E","11 mL"],["F","16 mL"]],controls:"Same pad size, water amount and 30-second test.",limitation:"Choose using these results, not the pad's name."}}]),hs("grove-push-observation","Link a push to observed motion","Compare the two distances. The larger number means the cart went further in this test.",[{prompt:"The cart starts still each time on the same track. Which sentence matches the results?",options:[{id:"further",label:"The stronger push moved this cart further."},{id:"same",label:"Both pushes moved it the same distance."},{id:"less",label:"The stronger push moved it less far."}],answer:"further",explanation:"In this test, the stronger push moves the cart 70 cm and the gentle push 30 cm. Since 70 is greater than 30, the stronger push moves it further.",diagram:{kind:"table",label:"Cart push observations",columns:["Push","Distance travelled"],rows:[["Gentle","30 cm"],["Stronger","70 cm"]],controls:"Same cart, track and starting point. Start with the cart still.",limitation:"These are made-up test results, not a live experiment."}},{prompt:"The cart starts still each time on the same track. Which sentence matches these new results?",options:[{id:"none",label:"Neither push moved the cart."},{id:"gentle",label:"The gentle push moved this cart less far."},{id:"equal",label:"The two distances are equal."}],answer:"gentle",explanation:"25 cm is less than 60 cm. The gentle push moved this cart less far in this test.",diagram:{kind:"table",label:"New cart observations",columns:["Push","Distance travelled"],rows:[["Gentle","25 cm"],["Stronger","60 cm"]],controls:"Same cart, track and starting point. Start with the cart still.",limitation:"These results describe only these tests."}}]),hs("grove-load-support","Use test evidence to choose a support","Find a support that holds the number needed or more. Exactly that number is enough.",[{prompt:"We need a support that holds 6 blocks without bending. Which one can do this?",options:[{id:"a",label:"Support A"},{id:"b",label:"Support B"},{id:"c",label:"Support C"}],answer:"c",explanation:"C holds 8 blocks without bending, which is at least 6. A holds only 3 and B only 5, so neither meets the requirement.",diagram:{kind:"table",label:"Support tests",columns:["Support","Most blocks without bending"],rows:[["A",3],["B",5],["C",8]],controls:"Same gap, same kind of blocks, same block position.",limitation:"Made-up test results. Do not use them to build real supports."}},{prompt:"We need a support that holds 7 blocks without bending. Which one can do this?",options:[{id:"d",label:"Support D"},{id:"e",label:"Support E"},{id:"f",label:"Support F"}],answer:"d",explanation:"D holds 7 blocks without bending and meets the requirement exactly. E holds 4 and F holds 6, which are both fewer than 7.",diagram:{kind:"table",label:"New support tests",columns:["Support","Most blocks without bending"],rows:[["D",7],["E",4],["F",6]],controls:"Same gap, same kind of blocks, same block position.",limitation:"These results describe only these supports."}}]),...Ef]);function Rf(i,e=0){let t=Rd.find(s=>s.id===i);if(!t||!Number.isInteger(e)||e<0||e>=t.instances.length)throw new RangeError("Unknown Beacon Brigade question instance");let{instances:n,...r}=t;return structuredClone({...r,...n[e],contentVersion:Yo,id:`${t.id}:v${t.version}:${e}`,templateId:i,templateVersion:t.version,variant:e})}function Zo(i){for(let e of Object.values(i))e&&typeof e=="object"&&Zo(e);return Object.freeze(i)}var Ei=Pd([{id:"balanced",name:"Balanced",description:"Standard travel and cargo.",travelSpeedMultiplier:1,cargoBonus:0},{id:"survey",name:"Survey",description:"Faster travel with a smaller cargo hold.",travelSpeedMultiplier:1.2,cargoBonus:-1},{id:"hauler",name:"Hauler",description:"Extra cargo with slower travel.",travelSpeedMultiplier:.85,cargoBonus:1},{id:"rescue",name:"Rescue",description:"A six-wheel expedition support vehicle.",travelSpeedMultiplier:1,cargoBonus:0},{id:"crawler",name:"Crawler",description:"Tracked engineering power and extra cargo.",travelSpeedMultiplier:.85,cargoBonus:1}]),Jo=Pd([{id:"bridge",name:"District Bridge",cost:{parts:16,cores:0},requiredDistricts:["harbour"],abilities:{travelSpeedBonus:.08,cargoBonus:0}},{id:"observatory",name:"Observatory",cost:{parts:24,cores:16},requiredDistricts:["harbour","physics"],abilities:{travelSpeedBonus:0,cargoBonus:1}},{id:"greenhouse",name:"Greenhouse",cost:{parts:16,cores:24},requiredDistricts:["chemistry","grove"],abilities:{travelSpeedBonus:.07,cargoBonus:0}}]);function fs(i){let e=i.stations??[],t=e.filter(l=>l.resolved),n=t.filter(l=>l.resolution==="independent").length,r=t.filter(l=>l.resolution==="corrected").length,s=t.filter(l=>["hinted","assisted"].includes(l.resolution)).length,a=i.status==="completed"&&e.length>0&&t.length===e.length,o=a?n===e.length?3:n+r===e.length?2:1:0;return{expeditionId:i.id,regionId:i.regionId,completed:a,stars:o,total:e.length,resolved:t.length,independent:n,corrected:r,supported:s}}function mn(i){let e=Ei.find(f=>f.id===i.campaign?.loadoutId)??Ei[0],t=Jo.filter(f=>i.campaign?.projects?.some(g=>g.projectId===f.id)).map(f=>f.id),n=(i.history??[]).map(fs),r=Ut.map(f=>{let g=n.filter(y=>y.regionId===f.id&&y.completed);return{id:f.id,name:f.name,completed:g.length>0,progress:Math.min(1,g.length),target:1,completions:g.length,bestStars:Math.max(0,...g.map(y=>y.stars))}}),s=r.filter(f=>f.completed).map(f=>f.id),a={travelSpeedBonus:0,cargoBonus:0},o=Jo.map(f=>{let g=t.includes(f.id);g&&(a.travelSpeedBonus+=f.abilities.travelSpeedBonus,a.cargoBonus+=f.abilities.cargoBonus);let y=f.requiredDistricts.filter(m=>!s.includes(m)),p=["parts","cores"].every(m=>(i.wallet?.[m]??0)>=f.cost[m]);return{...f,built:g,missingDistricts:y,affordable:p,unlocked:y.length===0,canBuild:!g&&p&&y.length===0}}),l=n.filter(f=>f.completed).length,c=n.reduce((f,g)=>f+g.resolved,0),d=c+(i.activeExpedition?fs(i.activeExpedition).resolved:0);a.travelSpeedBonus=Math.round(a.travelSpeedBonus*100)/100;let u=[{id:"first-expedition",name:"First Expedition",progress:l,target:1},{id:"district-explorer",name:"District Explorer",progress:s.length,target:Ut.length},{id:"steady-crew",name:"Steady Crew",progress:l,target:10},{id:"fieldwork",name:"Fieldwork",progress:c,target:25}].map(f=>({...f,progress:Math.min(f.progress,f.target),unlocked:f.progress>=f.target})),h={travelSpeedMultiplier:e.travelSpeedMultiplier*(1+a.travelSpeedBonus),cargoBonus:e.cargoBonus+a.cargoBonus};return structuredClone({loadoutId:e.id,loadout:e,canEquip:!i.activeExpedition,projectsBuilt:t,projects:o,bonuses:a,expeditionModifiers:h,stationRewardAmount:Af+h.cargoBonus,completedDistricts:s,objectives:r,achievements:u,completions:n,totalResolved:d,resolvedStations:d,totalStars:r.reduce((f,g)=>f+g.bestStars,0),maxStars:Ut.length*3})}function Pd(i){for(let e of Object.values(i))e&&typeof e=="object"&&Pd(e);return Object.freeze(i)}var Id=100,Ld=12,pb=[["harbour-crate-reserve"],["harbour-delivery-total","harbour-missing-supply"],["harbour-equal-packs"],["harbour-stock-left"],["harbour-place-value"]],Dd=class extends Error{constructor(e,t,n=409){super(t),this.name="BeaconError",this.code=e,this.status=n}};function Ud({profileId:i="local-preview"}={}){return{schemaVersion:1,contentVersion:Yo,profileId:i,version:0,hqLevel:1,wallet:{parts:0,cores:0},nextExpeditionNumber:1,activeExpedition:null,history:[],upgrades:[],campaign:{loadoutId:"balanced",projects:[]}}}function If(i,e){mb(e);let t=structuredClone(i),n=e.at??null,r=i.version+1;switch(e.type){case"start":{t.activeExpedition&&ft("EXPEDITION_ACTIVE","Resume or end the current expedition first."),t.history.length>=Id&&ft("HISTORY_FULL","All 100 expedition records are retained. New expeditions are paused until expanded storage is available.");let s=Ut.find(d=>d.id===e.regionId);s||ft("INVALID_REGION","Unknown region.",400),t.hqLevel<s.minHqLevel&&ft("REGION_LOCKED","Upgrade HQ before visiting this region.");let a=Rd.filter(d=>d.regionId===s.id),o=t.history.filter(d=>d.regionId===s.id).length,l=`${t.profileId}:exp-${t.nextExpeditionNumber++}-${s.id}`,c=mn(t);t.activeExpedition={id:l,regionId:s.id,resource:s.resource,loadoutId:c.loadoutId,loadout:c.loadout,campaignBonuses:c.bonuses,modifiers:c.expeditionModifiers,startedAt:n,startedVersion:r,status:"active",earned:{parts:0,cores:0},stations:Array.from({length:s.stationNames.length},(d,u)=>{let h=s.id==="harbour"?pb[u]:null,f=h?a.find(p=>p.id===h[o%h.length]):a[u],y=(h?Math.floor(o/h.length):o)%f.instances.length;return{id:`${l}:station-${u+1}`,name:s.stationNames[u],question:Rf(f.id,y),attempts:[],resolved:!1,helpUsed:!1,support:{stage:0,hintAtAttempt:null,events:[],message:null},resolution:null,firstAttemptCorrect:null,lastFeedback:null,reward:{resource:s.resource,amount:c.stationRewardAmount},rewardGranted:!1}})};break}case"answer":{let s=Pf(t,e.stationId);if(s.resolved)return t;let a=gb(s.question,e.answer);!a&&s.attempts.filter(o=>!o.correct).length>=Ld&&ft("ATTEMPT_LIMIT","Your attempts are preserved. Use worked guidance, then submit the corrected answer, or end the expedition."),s.attempts.push({answer:e.answer,correct:a,at:n,version:r,helpStage:s.support.stage}),s.firstAttemptCorrect=s.attempts[0].correct,s.lastFeedback={correct:a,explanation:a?s.question.explanation:s.question.wrongFeedback},a&&(s.resolved=!0,s.resolvedAt=n,s.resolvedVersion=r,s.resolution=s.support.stage===2?"assisted":s.helpUsed?"hinted":s.attempts.length===1?"independent":"corrected",s.rewardGranted||(s.rewardGranted=!0,t.wallet[s.reward.resource]+=s.reward.amount,t.activeExpedition.earned[s.reward.resource]+=s.reward.amount));break}case"hint":{let s=Pf(t,e.stationId);if(s.resolved||s.support.stage===2)return t;let a=s.attempts.at(-1);(!a||a.correct)&&ft("ATTEMPT_REQUIRED","Try an answer first; your resources are safe."),s.support.stage===1&&s.attempts.length<=s.support.hintAtAttempt&&s.attempts.length<Ld&&ft("RETRY_REQUIRED","Try again with the hint before opening worked guidance."),s.helpUsed=!0,s.support.stage+=1,s.support.hintAtAttempt=s.attempts.length,s.support.message=s.support.stage===1?s.question.hint:s.question.explanation,s.support.events.push({stage:s.support.stage,afterAttempt:s.attempts.length,at:n,version:r}),s.lastFeedback={correct:!1,explanation:s.support.message,kind:s.support.stage===1?"hint":"worked"};break}case"finish":case"end":{let s=Lf(t);e.type==="finish"&&s.stations.some(a=>!a.resolved)&&ft("STATIONS_UNRESOLVED","Resolve every station, or end the expedition with the rewards already earned."),s.status=e.type==="finish"?"completed":"ended",s.finishedAt=n,s.finishedVersion=r,s.completion=fs(s),t.history.push(s),t.activeExpedition=null;break}case"equip":{Ei.some(s=>s.id===e.loadoutId)||ft("INVALID_LOADOUT","Unknown expedition loadout.",400),t.activeExpedition&&ft("EXPEDITION_ACTIVE","End or finish the current expedition before changing loadout."),t.campaign??={loadoutId:"balanced",projects:[]},t.campaign.loadoutId=e.loadoutId;break}case"project":{let s=Jo.find(o=>o.id===e.projectId);s||ft("INVALID_PROJECT","Unknown restoration project.",400);let a=mn(t).projects.find(o=>o.id===s.id);a.built&&ft("PROJECT_BUILT","This restoration project is already built."),a.unlocked||ft("PROJECT_LOCKED","Complete the required district expeditions before building this project."),a.affordable||ft("INSUFFICIENT_RESOURCES",`This project needs ${s.cost.parts} parts and ${s.cost.cores} cores.`),t.wallet.parts-=s.cost.parts,t.wallet.cores-=s.cost.cores,t.campaign??={loadoutId:"balanced",projects:[]},t.campaign.projects.push({projectId:s.id,cost:{...s.cost},at:n,version:r});break}case"upgrade":{let s=jo[t.hqLevel+1];s||ft("MAX_HQ_LEVEL","HQ is at the highest level in this first playable."),(t.wallet.parts<s.parts||t.wallet.cores<s.cores)&&ft("INSUFFICIENT_RESOURCES",`This upgrade needs ${s.parts} parts and ${s.cores} cores.`),t.wallet.parts-=s.parts,t.wallet.cores-=s.cores,t.hqLevel+=1,t.upgrades.push({hqLevel:t.hqLevel,cost:{...s},at:n,version:r});break}case"reset":{let s=Ud({profileId:t.profileId});Object.assign(t,s),t.contentVersion=Yo;break}}return t.version=r,t}function kd(i,{review:e=!1}={}){let t=structuredClone(i),n=[...t.history,...t.activeExpedition?[t.activeExpedition]:[]];for(let r of n)for(let s of r.stations)delete s.question.hint,delete s.question.wrongFeedback,!e&&r.status==="active"&&!s.resolved&&s.support.stage<2&&(delete s.question.answer,delete s.question.explanation);return t.limits={maxExpeditions:Id,expeditionsRemaining:Id-t.history.length-(t.activeExpedition?1:0),maxWrongAttemptsPerStation:Ld,historyRetention:"No automatic deletion"},t.nextUpgrade=jo[i.hqLevel+1]?{level:i.hqLevel+1,cost:{...jo[i.hqLevel+1]}}:null,t.campaignProgress=mn(i),t}function mb(i){(!i||typeof i!="object"||Array.isArray(i))&&ft("INVALID_ACTION","An action object is required.",400);let e={start:["regionId"],answer:["stationId","answer"],hint:["stationId"],finish:[],upgrade:[],end:[],reset:[],equip:["loadoutId"],project:["projectId"]};(typeof i.type!="string"||!Object.hasOwn(e,i.type))&&ft("INVALID_ACTION","Unknown action type.",400);let t=["type","at",...e[i.type]];Object.keys(i).some(n=>!t.includes(n))&&ft("INVALID_ACTION","Unexpected action fields.",400),e[i.type].some(n=>!Object.hasOwn(i,n))&&ft("INVALID_ACTION","Required action fields are missing.",400),["stationId","regionId","loadoutId","projectId"].some(n=>n in i&&typeof i[n]!="string")&&ft("INVALID_ACTION","Action IDs must be strings.",400),"at"in i&&(typeof i.at!="string"||!Number.isFinite(Date.parse(i.at)))&&ft("INVALID_ACTION","Invalid timestamp.",400),i.type==="answer"&&!(typeof i.answer=="string"&&i.answer.length<=120&&i.answer.trim()||typeof i.answer=="number"&&Number.isFinite(i.answer))&&ft("INVALID_ANSWER","Enter a number or choose an option.",400)}function gb(i,e){return i.type==="choice"?((typeof e!="string"||!i.options.some(t=>t.id===e))&&ft("INVALID_ANSWER","Choose one of this question's options.",400),e===i.answer):(typeof e=="string"&&!/^[+-]?\d+(?:\.\d+)?$/.test(e.trim())&&ft("INVALID_ANSWER","Enter a number without units or symbols.",400),Number(e)===i.answer)}function Lf(i){return i.activeExpedition||ft("NO_ACTIVE_EXPEDITION","Start an expedition first."),i.activeExpedition}function Pf(i,e){let t=Lf(i).stations.find(n=>n.id===e);return t||ft("INVALID_STATION","This station does not belong to the active expedition.",400),t}function ft(i,e,t=409){throw new Dd(i,e,t)}var Sn=i=>`<i data-lucide="${i}" aria-hidden="true"></i>`,Nd={bridge:{title:"Reconnect the valley",description:"Rebuild the river crossing and help every expedition travel faster.",icon:"route",name:"River bridge"},observatory:{title:"Reach for the stars",description:"Restore the telescope. Its survey team finds extra cargo at every new mission.",icon:"telescope",name:"Hilltop observatory"},greenhouse:{title:"Bring the gardens back",description:"Restore the glasshouse and its supply trails to help the whole valley thrive.",icon:"sprout",name:"Valley greenhouse"}},Df={balanced:{name:"Atlas Expedition Tank",tag:"Tracked explorer",icon:"compass",description:"Armoured hull, steel tracks and a dependable cargo hold."},survey:{name:"Falcon Scout Buggy",tag:"Quick journeys",icon:"radar",description:"Open roll cage and all-terrain tyres. Faster travel, lighter cargo."},hauler:{name:"Titan Cargo Truck",tag:"Eight-wheel hauler",icon:"truck",description:"A heavy-duty cargo bed. Carry more home at a steady pace."},rescue:{name:"Summit Rescue Rover",tag:"Six-wheel support",icon:"shield",description:"Rescue equipment, all-terrain suspension and balanced cargo."},crawler:{name:"Terra Engineering Crawler",tag:"Tracked workhorse",icon:"hard-hat",description:"Hydraulic blade and heavy tracks. Extra cargo, slower travel."}};function Uf(i,e,t){let n=mn(i);return`<section class="panel campaign-board" aria-label="Valley restoration"><div class="panel-head campaign-heading"><div><span class="eyebrow">Operation / Restore the valley</span><h1>${n.projectsBuilt.length===n.projects.length?"A valley brought to life":"Build something that lasts"}</h1><p>${n.completedDistricts.length} of 5 districts explored <span aria-hidden="true">/</span> ${n.projectsBuilt.length} of 3 landmarks restored</p></div><button class="icon-btn" data-action="map" title="Return to world map" aria-label="Return to world map">${Sn("x")}</button></div>
  <div class="panel-body"><div class="district-track" aria-label="Subject progress">${n.objectives.map(s=>{let a=Ut.find(o=>o.id===s.id);return`<button class="district-step ${s.completed?"done":""}" data-action="destination" data-region="${s.id}">${Sn(s.completed?"check":a.icon)}<span>${a.subject==="life-sciences"?"Life science":a.subject==="maths"?"Maths":a.subject[0].toUpperCase()+a.subject.slice(1)}</span></button>`}).join("")}</div>
  <div class="restoration-grid">${n.projects.map((s,a)=>{let o=Nd[s.id];return`<article class="restoration-project ${s.built?"built":""}" data-project="${s.id}"><div class="project-art project-${s.id}"><img src="./assets/project-${s.id}.jpg" alt="${o.name}" width="640" height="360"><span class="project-number">0${a+1}</span><span class="project-seal">${Sn(s.built?"check":o.icon)}</span></div><div class="project-content"><span class="eyebrow">${s.built?"Restored":o.name}</span><h2>${o.title}</h2><p>${o.description}</p><div class="project-cost"><span class="${i.wallet.parts>=s.cost.parts?"enough":""}">${Sn("package")}${s.cost.parts} parts</span><span class="${i.wallet.cores>=s.cost.cores?"enough":""}">${Sn("flask-conical")}${s.cost.cores} cores</span></div>${s.missingDistricts.length?`<div class="project-prerequisites">${s.missingDistricts.map(l=>`<button data-action="destination" data-region="${l}">${Sn("map-pin")}Explore ${Ut.find(c=>c.id===l)?.subject==="life-sciences"?"life science":Ut.find(c=>c.id===l)?.subject}${Sn("arrow-right")}</button>`).join("")}</div>`:`<p class="project-ready">${s.built?"Your expeditions now use this upgrade.":s.affordable?"Your team has everything ready.":"Gather the remaining cargo to start."}</p>`}<button class="button ${s.canBuild?"primary":""} full" data-action="restore-project" data-project="${s.id}" ${s.built||!s.canBuild||e||t?"disabled":""}>${Sn(s.built?"check":"hard-hat")}${s.built?"Restored":s.canBuild?"Build landmark":"Supplies needed"}</button></div></article>`}).join("")}</div>
  <div class="campaign-badges" aria-label="Expedition achievements">${n.achievements.map(s=>`<div class="campaign-badge ${s.unlocked?"earned":""}">${Sn(s.unlocked?"award":"flag")}<span><strong>${s.name}</strong><small>${s.progress} / ${s.target}</small></span></div>`).join("")}</div></div></section>`}function kf(i,e,t){let n=mn(i);return`<section class="panel garage-board"><div class="panel-head campaign-heading"><div><span class="eyebrow">Atlas workshop</span><h1>Ready for the next journey</h1><p>${n.canEquip?"Choose your expedition vehicle.":"Your vehicle is equipped for the active expedition."}</p></div><button class="icon-btn" data-action="hq" title="Return to HQ" aria-label="Return to HQ">${Sn("x")}</button></div><div class="panel-body"><div class="loadout-grid">${Ei.map(r=>{let s=Df[r.id],a=n.loadoutId===r.id;return`<article class="loadout-item ${a?"equipped":""}"><div class="loadout-art"><button class="inspect-vehicle" data-action="inspect-vehicle" data-loadout="${r.id}" aria-label="Inspect ${s.name}" title="Inspect vehicle">${Sn("eye")}</button><img src="./assets/atlas-${r.id}.jpg" width="640" height="360" alt="${s.name}"><span>${Sn(s.icon)}</span></div><div class="loadout-content"><span class="eyebrow">${s.tag}</span><h2>${s.name}</h2><p>${s.description}</p><div class="loadout-stat"><span>Cargo per mission</span><strong>${4+r.cargoBonus+n.bonuses.cargoBonus}</strong></div><button class="button ${a?"":"primary"} full" data-action="equip-loadout" data-loadout="${r.id}" ${a||!n.canEquip||e||t?"disabled":""}>${Sn(a?"check":"wrench")}${a?"Equipped":n.canEquip?"Equip vehicle":"Expedition active"}</button></div></article>`}).join("")}</div><p class="garage-note">Every vehicle can visit every district. Hints and corrections keep the same cargo reward.</p></div></section>`}function Fd(i){let e=mn(i),t=e.projects.find(n=>!n.built);return t?{title:t.canBuild?`${Nd[t.id].name} ready to build`:Nd[t.id].title,detail:`${e.projectsBuilt.length} / 3 landmarks restored`,action:"campaign"}:{title:"Valley restored",detail:"Explore again and build your field journal.",action:"map"}}function Ko(i){return Df[i]?.name||"Atlas Expedition Tank"}var ps=new Map;function Bd(){ps.clear()}var Mn=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Ti=(i,e,t)=>Number.isInteger(i)&&Number(i)>=e&&Number(i)<=t,xb=i=>typeof i=="string"||typeof i=="number"&&Number.isFinite(i);function yb(i){if(!i||typeof i.id!="string"||!i.id)return null;let e=i.diagram;if(!e||typeof e!="object")return null;let t=typeof e.label=="string"?e.label:"Field lab";return e.kind==="sharing"&&Ti(e.total,1,120)&&Ti(e.groups,2,12)?{kind:"sharing",label:t,total:e.total,groups:e.groups}:e.kind==="groups"&&Ti(e.groups,1,12)&&Ti(e.itemsPerGroup,1,12)&&e.groups*e.itemsPerGroup<=120&&Ti(e.reserved,0,e.groups*e.itemsPerGroup)?{kind:"groups",label:t,groups:e.groups,itemsPerGroup:e.itemsPerGroup,reserved:e.reserved}:e.kind==="table"&&i.subject!=="english"&&Array.isArray(e.columns)&&e.columns.length>=2&&e.columns.length<=10&&e.columns.every(n=>typeof n=="string")&&Array.isArray(e.rows)&&e.rows.length>=2&&e.rows.length<=20&&e.rows.every(n=>Array.isArray(n)&&n.length===e.columns.length&&n.every(xb))?{kind:"table",label:t,columns:[...e.columns],rows:e.rows.map(n=>[...n]),controls:typeof e.controls=="string"?e.controls:"",limitation:typeof e.limitation=="string"?e.limitation:"",source:typeof e.source=="string"?e.source:""}:null}function Nf(i){return{diagram:i,fingerprint:JSON.stringify(i),open:!1,kits:i.kind==="sharing"?Array(i.groups).fill(0):[],history:[],counted:[],reserved:new Set,mode:"count",rows:[],columns:new Set(i.kind==="table"?i.columns.slice(1).map((e,t)=>t+1):[])}}function ia(i){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i.map(([e,t])=>`<${e} ${Object.entries(t).map(([n,r])=>`${n}="${Mn(r)}"`).join(" ")}></${e}>`).join("")}</svg>`}function ra(i,e,t,n=!1,r){return`<button type="button" class="fl-command" data-action="field-lab-${i}" ${r===void 0?"":`data-fl-index="${r}"`} aria-label="${Mn(e)}" title="${Mn(e)}" ${n?"disabled":""}>${t}</button>`}var ms=(i,e)=>`<span class="fl-metric"><span>${i}</span><strong>${e}</strong></span>`;function vb(i,e){let t=e.total-i.kits.reduce((r,s)=>r+s,0),n=i.kits.every(r=>r===i.kits[0]);return`<div class="fl-readout">${ms("Washers left",t)}${ms("Kits",e.groups)}${ms("Started with",e.total)}</div>
    <div class="fl-toolbar">${ra("round","Give one washer to every kit",`${ia(Sr)}<span>One to each</span>`,t<e.groups)}${ra("undo","Undo last move",ia(Mr),!i.history.length)}</div>
    <div class="fl-kits">${i.kits.map((r,s)=>`<section class="fl-kit" aria-label="Kit ${s+1}">
      <h4>Kit ${s+1} <strong>${r}</strong></h4>
      <div class="fl-washers" role="img" aria-label="${r} washers in kit ${s+1}">${Array.from({length:r},()=>'<span class="fl-washer" aria-hidden="true"></span>').join("")}</div>
      <div class="fl-kit-actions">${ra("take",`Return one washer from kit ${s+1}`,ia(ws),r===0,s)}${ra("give",`Give one washer to kit ${s+1}`,ia(Sr),t===0,s)}</div>
    </section>`).join("")}</div>
    <p class="fl-status">${t===e.total?"All washers are in the supply tray.":`${n?"Kits have equal amounts.":"Kits have different amounts."} ${t?`${t} still in the supply tray.`:"The supply tray is empty."}`}</p>`}function bb(i,e){return`<div class="fl-readout">${ms("Counted",i.counted.length)}${ms("Set aside",`${i.reserved.size} / ${e.reserved}`)}${ms("Counted, not set aside",i.counted.filter(t=>!i.reserved.has(t)).length)}</div>
    <div class="fl-modes" role="group" aria-label="Piece action">${["count","reserve"].map(t=>`<button type="button" data-action="field-lab-${t}" aria-pressed="${i.mode===t}">${t==="count"?"Count pieces":"Set aside"}</button>`).join("")}</div>
    <div class="fl-crates">${Array.from({length:e.groups},(t,n)=>`<fieldset class="fl-crate"><legend>Crate ${n+1}</legend><div class="fl-pieces">${Array.from({length:e.itemsPerGroup},(r,s)=>{let a=n*e.itemsPerGroup+s,o=i.counted.indexOf(a),l=i.reserved.has(a),c=`Crate ${n+1}, piece ${s+1}: ${o<0?"not counted":`counted ${o+1}`}, ${l?"set aside":"available"}`;return`<button type="button" class="fl-piece ${l?"fl-reserved":""} ${o>=0?"fl-counted":""}" data-action="field-lab-piece" data-fl-index="${a}" aria-label="${c}" title="${c}" aria-pressed="${i.mode==="count"?o>=0:l}"><span class="fl-piece-shape" aria-hidden="true">${o<0?"":o+1}</span>${l?'<span class="fl-piece-mark" aria-hidden="true">/</span>':""}</button>`}).join("")}</div></fieldset>`).join("")}</div>`}function _b(i,e){let t=i.rows,n=[...i.columns].sort((r,s)=>r-s);return`<fieldset class="fl-choices"><legend>Compare two: ${Mn(e.columns[0])}</legend>${e.rows.map((r,s)=>`<label class="fl-choice"><input type="checkbox" data-fl-input="row" data-fl-index="${s}" ${t.includes(s)?"checked":""} ${t.length===2&&!t.includes(s)?"disabled":""}><span>${Mn(r[0])}</span></label>`).join("")}</fieldset>
    <fieldset class="fl-choices fl-columns"><legend>Evidence to compare</legend>${e.columns.slice(1).map((r,s)=>`<label class="fl-choice"><input type="checkbox" data-fl-input="column" data-fl-index="${s+1}" ${i.columns.has(s+1)?"checked":""}><span>${Mn(r)}</span></label>`).join("")}</fieldset>
    <div class="fl-comparison">${t.length<2?`<p class="fl-status">${t.length?"One chosen. Choose one more.":"No rows chosen yet."}</p>`:n.length?`<table><caption>${Mn(e.label)}</caption><thead><tr><th scope="col">Evidence</th>${t.map(r=>`<th scope="col">${Mn(e.rows[r][0])}</th>`).join("")}</tr></thead><tbody>${n.map(r=>`<tr><th scope="row">${Mn(e.columns[r])}<small>${String(e.rows[t[0]][r])===String(e.rows[t[1]][r])?"Same entry":"Different entries"}</small></th>${t.map(s=>`<td>${Mn(e.rows[s][r])}</td>`).join("")}</tr>`).join("")}</tbody></table>`:'<p class="fl-status">No evidence columns selected.</p>'}</div>
    ${e.controls||e.limitation||e.source?`<details class="fl-notes"><summary>Test notes</summary>${[e.source,e.controls,e.limitation].filter(Boolean).map(r=>`<p>${Mn(r)}</p>`).join("")}</details>`:""}`}function Ff(i){let e=i.diagram;return`<div class="fl-top"><span>${Mn(e.label)}</span>${ra("reset","Reset field lab",ia(Mr))}</div>${e.kind==="sharing"?vb(i,e):e.kind==="groups"?bb(i,e):_b(i,e)}`}function Of(i){let e=yb(i);if(!e)return"";typeof document<"u"&&document.querySelectorAll("details[data-field-lab]").forEach(r=>{let s=ps.get(r.dataset.fieldLab);s&&(s.open=r.open)});let t=ps.get(i.id);(!t||t.fingerprint!==JSON.stringify(e))&&(t=Nf(e),ps.set(i.id,t));let n=e.kind==="sharing"?"Share the washers":e.kind==="groups"?"Count and set aside":"Compare the evidence";return`<details class="field-lab" data-field-lab="${Mn(i.id)}" ${t.open?"open":""}><summary>${n}<span class="fl-optional">Optional</span></summary><div class="fl-body">${Ff(t)}</div></details>`}function Bf(i,e){let t=i.closest("details[data-field-lab]");if(!t||!(e===t||e.contains(t)))return null;let n=ps.get(t.dataset.fieldLab);return n?{lab:t,state:n}:null}function Od(i,e,t){e.open=i.open;let n=i.querySelector(".fl-body"),r=i.ownerDocument.activeElement===t,s=!!n.querySelector(".fl-notes")?.open,a=[...n.querySelectorAll(".fl-washers")].map(l=>l.scrollTop);n.innerHTML=Ff(e);let o=n.querySelector(".fl-notes");if(o&&(o.open=s),n.querySelectorAll(".fl-washers").forEach((l,c)=>{l.scrollTop=a[c]||0}),r){let l=[...n.querySelectorAll("button,input")].find(d=>d.dataset.action===t.dataset.action&&d.dataset.flInput===t.dataset.flInput&&d.dataset.flIndex===t.dataset.flIndex);(l&&!l.disabled?l:n.querySelector('[data-action="field-lab-reset"]'))?.focus({preventScroll:!0})}}function zf(i,e){let t=i.closest('[data-action^="field-lab-"]');if(!t)return!1;let n=Bf(t,e);if(!n)return!1;if(t.disabled)return!0;let{lab:r,state:s}=n,a=s.diagram,o=t.dataset.action.slice(10),l=Number(t.dataset.flIndex);if(o==="reset"){let c=Nf(a);return ps.set(r.dataset.fieldLab,c),Od(r,c,t),!0}if(a.kind==="sharing"){let c=a.total-s.kits.reduce((d,u)=>d+u,0);if(o==="undo"){let d=s.history.pop();d&&(s.kits=d)}else(o==="round"&&c>=a.groups||Ti(l,0,a.groups-1)&&(o==="give"&&c>0||o==="take"&&s.kits[l]>0))&&(s.history.push([...s.kits]),o==="round"?s.kits=s.kits.map(d=>d+1):s.kits[l]+=o==="give"?1:-1)}else a.kind==="groups"&&(o==="count"||o==="reserve"?s.mode=o:o==="piece"&&Ti(l,0,a.groups*a.itemsPerGroup-1)&&(s.mode==="reserve"?s.reserved.has(l)?s.reserved.delete(l):s.reserved.add(l):s.counted.includes(l)?s.counted=s.counted.filter(c=>c!==l):s.counted.push(l)));return Od(r,s,t),!0}function Hf(i,e){if(!i.matches("input[data-fl-input]"))return!1;let t=Bf(i,e);if(!t||t.state.diagram.kind!=="table")return!1;if(i.disabled)return!0;let{lab:n,state:r}=t,s=r.diagram,a=Number(i.dataset.flIndex),o=i.checked;return i.dataset.flInput==="row"&&Ti(a,0,s.rows.length-1)?o?!r.rows.includes(a)&&r.rows.length<2&&r.rows.push(a):r.rows=r.rows.filter(l=>l!==a):i.dataset.flInput==="column"&&Ti(a,1,s.columns.length-1)&&(o?r.columns.add(a):r.columns.delete(a)),Od(n,r,i),!0}var wb={Shield:Il,House:ma,Map:bl,BookOpen:dl,Settings:Pl,ArrowLeft:ol,ArrowRight:ll,Plus:Sr,Minus:ws,RotateCcw:Mr,Volume2:Nl,VolumeX:Fl,Pause:Ml,Play:El,FlaskConical:xl,Package:Sl,Check:hl,X:Bl,ChevronRight:fl,Radio:Al,Flag:gl,Wrench:Ol,HardHat:yl,RefreshCw:Cl,HelpCircle:_s,Eye:ml,Navigation:_l,MapPin:vl,Calculator:ul,Orbit:wl,Sprout:Ll,Route:Rl,Telescope:Ul,Compass:pl,Radar:Tl,Truck:kl,Award:cl,Star:Dl},tt=i=>document.getElementById(i),Te=i=>String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ot=i=>`<i data-lucide="${i}" aria-hidden="true"></i>`,Le=(i,e,t="",n="",r=!1,s="")=>`<button type="button" class="button ${n}" data-action="${i}" ${r?"disabled":""} ${s}>${t?ot(t):""}${e}</button>`,li=(i,e,t)=>`<button class="icon-btn" type="button" data-action="${i}" title="${e}" aria-label="${e}">${ot(t)}</button>`,Sb=new URLSearchParams(location.search),wr=["localhost","127.0.0.1","[::1]"].includes(location.hostname)&&Sb.get("preview")==="1",zt={get(i,e=null){try{return JSON.parse(localStorage.getItem(i)||"null")??e}catch{return e}},set(i,e){try{localStorage.setItem(i,JSON.stringify(e))}catch{ln("Device storage is unavailable. Keep this page open until your save is confirmed.")}},remove(i){localStorage.removeItem(i)}},de,Zi,gs,me,je="hq",mt="harbour",on="",kn="",nn="",rn="",nt=!1,Jt=!1,Qo=null,ys="",Vf,Kt=null,vs="bridge",Et="jokes",tn="",ai="",bs="balanced",sa=()=>`bqBeaconDiscovery:${Zi?.id}`;function ca(i=Et){let e=zt.get(sa(),{})?.[i];return{index:Number.isSafeInteger(e?.index)&&e.index>=0?e.index:0,seen:Array.isArray(e?.seen)?e.seen.filter(t=>typeof t=="string"):[]}}function zd(i=!1,e=!1){let t=ca(),n=Vo(Et,t.index);i&&!t.seen.includes(n.id)&&t.seen.push(n.id),e&&(t.index=(t.index+1)%xr[Et].length),zt.set(sa(),{...zt.get(sa(),{}),[Et]:t}),e&&(ai="")}var oi=zt.get("bqBeaconSettings",{sound:!1,reduced:matchMedia("(prefers-reduced-motion: reduce)").matches}),Wf="bqBeaconPreviewV1",Ji=tt("dialog"),$f=null,tl=()=>Ut.find(i=>i.id===mt),aa=i=>de?.history?.some(e=>e.regionId===i&&e.status==="completed"),$d=i=>`${i.subject==="life-sciences"?"Life Sciences":i.subject[0].toUpperCase()+i.subject.slice(1)} / ${i.resource==="parts"?"Building parts":"Research cores"}`,br=()=>de?.activeExpedition?.stations.find(i=>i.id===kn),Mb=()=>de?.activeExpedition?.stations.find(i=>i.id===nn),el=i=>de?.activeExpedition?.stations.findIndex(e=>e.id===i)??-1,xs=()=>`bqBeaconPending:${Zi?.id}`,oa=()=>`bqBeaconDraft:${Zi?.id}:${kn}`,qd=i=>de.activeExpedition?.regionId===i?de.activeExpedition.stations.reduce((e,t)=>e+t.reward.amount,0):Ut.find(e=>e.id===i).stationNames.length*mn(de).stationRewardAmount;function Xd(){if(!me.travel)return;let i=de.activeExpedition?de.activeExpedition.modifiers?.travelSpeedMultiplier??1:mn(de).expeditionModifiers.travelSpeedMultiplier;me.travel.duration/=i}var qn=null;function ln(i){tt("toast").textContent=i,tt("toast").classList.add("visible"),clearTimeout(Vf),Vf=setTimeout(()=>tt("toast").classList.remove("visible"),5500)}function qf(){zl({icons:wb,attrs:{"stroke-width":1.8}})}function _r(i=!1){if(!(!oi.sound||document.hidden))try{qn||=new AudioContext,qn.resume();let e=qn.createGain();e.gain.setValueAtTime(.025,qn.currentTime),e.gain.exponentialRampToValueAtTime(1e-4,qn.currentTime+.3),e.connect(qn.destination);let t=qn.createOscillator();t.type="sine",t.frequency.setValueAtTime(i?620:380,qn.currentTime),t.frequency.exponentialRampToValueAtTime(i?920:290,qn.currentTime+.22),t.connect(e),t.start(),t.stop(qn.currentTime+.3)}catch{}}function da(){speechSynthesis.cancel(),qn?.suspend()}function Eb(){if(!oi.sound){ln("Turn on sound in Settings to hear the question.");return}speechSynthesis.cancel();let i=br();if(!i)return;let e=new SpeechSynthesisUtterance(i.question.prompt);e.lang="en-AU",e.rate=.92,speechSynthesis.speak(e)}async function la(i){let e=await fetch("/api/beacon-brigade",{method:i?"POST":"GET",credentials:"same-origin",cache:"no-store",headers:{accept:"application/json",...sessionStorage.getItem("brightQuestChildCapability")?{"x-bq-child-capability":sessionStorage.getItem("brightQuestChildCapability")}:{},...i?{"content-type":"application/json","x-bq-child-id":Zi.id}:{}},...i?{body:JSON.stringify(i)}:{}}),t=await e.json().catch(()=>({}));if(!e.ok){let n=new Error(t.error||`Connection error (${e.status})`);throw n.code=t.code,n.status=e.status,n}return t}async function Ai(i){if(nt)return!1;if(Kt)return ln("Reconnect your pending save before starting another action."),!1;nt=!0,Wt();let e={operationId:crypto.randomUUID(),version:de.version,action:i};try{return wr?(gs=If(gs,{...e.action,at:new Date().toISOString()}),zt.set(Wf,gs),de=kd(gs)):(zt.set(xs(),e),de=(await la(e)).state,zt.remove(xs())),me.hqLevel!==de.hqLevel&&me.createBase(de.hqLevel),!0}catch(t){if(!wr&&(!t.status||t.status>=500))Kt=e,ln("Connection interrupted. Your answer is kept here. Reconnect to confirm the save.");else{if(zt.remove(xs()),t.status===409)try{de=(await la()).state}catch{}ln(t.message)}return!1}finally{nt=!1,Wt()}}async function Xf(){if(!(!Kt||nt)){nt=!0,Wt();try{let i=Kt.action?.type==="reset";de=(await la(Kt)).state,Kt=null,zt.remove(xs()),i&&(zt.remove(sa()),tn="",ai="",Bd()),me.hqLevel!==de.hqLevel&&me.createBase(de.hqLevel),ln("Saved. Your progress is up to date.")}catch(i){i.status&&i.status<500&&(Kt=null,zt.remove(xs()),i.status===409&&(de=(await la()).state)),ln(i.message||"Still offline. Your pending response is kept on this device.")}finally{nt=!1,Wt()}}}function kt(i,e={},t=!1){da(),je=i,e.regionId&&(mt=e.regionId),e.stationId&&(kn=e.stationId),e.reviewId&&(ys=e.reviewId),e.projectId&&(vs=e.projectId),e.activityId&&(Et=e.activityId),e.inspectedVehicleId&&(bs=e.inspectedVehicleId);let n={view:je,regionId:mt,selectedRegionId:on,stationId:kn,targetStationId:nn,reviewId:ys,projectId:vs,activityId:Et,selectedActivityId:tn,inspectedVehicleId:bs};history[t?"replaceState":"pushState"](n,"",`${location.pathname}${location.search}#${i}${i==="station"?`/${encodeURIComponent(kn)}`:""}`),Wt()}function Yf(){if(!me||je==="travel")return;me.paused=Jt||Ji.open,me.reduced=oi.reduced;let i=mn(de);me.syncCampaign(i),me.setLoadout(je==="vehicle"?bs:de.activeExpedition?de.activeExpedition.loadoutId??de.activeExpedition.loadout?.id??"balanced":i.loadoutId),je==="map"||je==="region-info"?(me.selectStation(mt,null),me.setView("map")):je==="region"?(me.setView("region",mt),me.selectStation(mt,nn?el(nn):null)):je==="station"?(me.setView("station",mt),me.selectStation(mt,el(kn)),me.setView("station",mt)):je==="results"?me.setView("region",Qo?.regionId||mt):je==="landmark"?me.focusProject(vs):je==="activity"?me.focusActivity(Et):je==="vehicle"?me.focusVehicle():me.setView("hq"),me.syncMarkers({view:je,region:mt,selectedRegion:on,selectedActivity:tn,visitedActivities:$n.filter(e=>ca(e.id).seen.length>0).map(e=>e.id),completedRegions:Ut.filter(e=>aa(e.id)).map(e=>e.id),activeRegion:de.activeExpedition?.regionId||"",selectedStation:nn,stations:de.activeExpedition?.regionId===mt?de.activeExpedition.stations:[]})}function Tb(){tt("topbar").innerHTML=`<div class="brand"><span class="brand-mark">${ot("shield")}</span><div><strong>BEACON BRIGADE</strong><span class="overline">${wr?"Local preview / saved on this device":"Bright Quest / Expedition command"}</span></div></div>
    <div class="wallet"><div class="resource">${ot("package")}<div><strong>${de.wallet.parts}</strong><small>BUILDING PARTS</small></div></div><div class="resource cores">${ot("flask-conical")}<div><strong>${de.wallet.cores}</strong><small>RESEARCH CORES</small></div></div></div>
    <div class="profile-chip">${Te(Zi.name)}<small>${Kt?"Save pending":wr?"Preview commander":"Progress connected"}</small></div>
    ${li("reset-game","Reset game progress","rotate-ccw")}
    <a class="icon-btn portal-home" href="/" title="Return to Bright Quest" aria-label="Return to Bright Quest">${ot("arrow-left")}</a>`}function Ab(){let i=[["hq","house","HQ"],["map","map","World map"],["campaign","flag","Valley"],["journal","book-open","Journal"],["settings","settings","Settings"]];tt("navigation").innerHTML=i.map(([e,t,n])=>`<button class="nav-btn ${je===e?"active":""}" data-action="${e}" type="button" ${je==="travel"&&e!=="settings"||nt?"disabled":""} ${je===e?'aria-current="page"':""}>${ot(t)}<span>${n}</span></button>`).join(""),tt("world-controls").innerHTML=li("zoom-in","Zoom in","plus")+li("zoom-out","Zoom out","minus")+li("reset-camera","Reset camera","rotate-ccw"),tt("world-controls").hidden=["station","travel"].includes(je)}function En(i,e,t="",n=""){return`<div class="scene-caption ${n}"><div class="eyebrow">${i}</div><h1>${e}</h1>${t?`<p>${t}</p>`:""}<span class="coordinate">SECTOR 07 / BEACON OPERATIONS</span></div>`}function Cb(){return'<div class="vehicle-id"><strong>ATLAS / M-07</strong><small>ARMOURED EXPEDITION VEHICLE</small></div>'}function Rb(){let i=de.nextUpgrade?.cost;return i?`<div class="requirements">${[["parts","Building parts","package","harbour"],["cores","Research cores","flask-conical","grove"]].map(([e,t,n,r])=>`<div class="requirement ${de.wallet[e]>=i[e]?"ready":""}"><span>${ot(n)}${t}</span><strong>${de.wallet[e]} <small>/ ${i[e]}</small></strong>${de.wallet[e]<i[e]?`<button data-action="destination" data-region="${r}">Find ${i[e]-de.wallet[e]} more</button>`:"<small>Ready to build</small>"}</div>`).join("")}</div>`:""}function Gd(){let i=de.nextUpgrade,e=Fd(de),t=de.activeExpedition?Le("resume","Resume expedition","play","primary hq-primary",nt):Le("map","Choose expedition","map","primary hq-primary",nt);return En("Your home base",["","Forward operating base","Expedition headquarters","Beacon command centre"][de.hqLevel],"Build the base. Equip the expedition.")+`<button class="hq-objective" data-action="${e.action}">${ot("flag")}<span><strong>${e.title}</strong><small>${e.detail}</small></span>${ot("chevron-right")}</button><div class="hq-quick-actions" aria-label="Headquarters actions">${li("garage","Equip Atlas","wrench")}${i?li("construction","View construction","hard-hat"):""}${t}</div>`}function Yd(){if(tn){let s=$n.find(a=>a.id===tn);if(s)return En("Beacon Valley","Take a discovery detour")+`<aside class="panel field-command world-command selected"><div class="panel-head destination-panel-head"><div><span class="eyebrow">Just for fun</span><h2>${Te(s.name)}</h2></div>${li("clear-activity","Close destination","x")}</div><div class="panel-body"><p>${Te(s.description)}</p><div class="activity-count">${ca(s.id).seen.length} / ${xr[s.id].length} discovered on this device</div>${Le("visit-activity","Drive over","navigation","primary full",nt)}</div></aside>`}let i=Ut.find(s=>s.id===on),e=i&&aa(i.id),t=i?de.history.filter(s=>s.regionId===i.id&&s.status==="completed").length:0,n=i&&de.activeExpedition?.regionId===i.id,r=i?`<aside class="panel field-command world-command selected"><div class="panel-head destination-panel-head"><div><div class="eyebrow">${e?"District completed":"Destination selected"}</div><h2>${Te(i.name)}</h2><div class="mission-count">${Te($d(i))}</div></div>${li("clear-region","Close destination","x")}</div><div class="panel-body"><div class="destination-status"><span class="status ${e?"complete-glow":"pending"}">${e?`${ot("check")} Complete`:n?"In progress":"Ready"}</span><span class="node-code">${t?`${t} CLEAR${t===1?"":"S"}`:"NEW ROUTE"}</span></div><p class="destination-skill">${Te(i.description)}</p><div class="summary-resource"><span>${ot(i.resource==="parts"?"package":"flask-conical")}${i.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${qd(i.id)}</strong></div><div class="destination-actions">${Le("explore-region","Explore","eye")}${Le("march-region",n?"Resume":e?"March again":"March","navigation","primary",nt)}</div></div></aside>`:"";return En("Beacon Valley","Where will you explore?")+r}function Pb(){let i=tl();return En("Destination selected",Te(i.name))+`<aside class="panel"><div class="panel-head"><div class="eyebrow">${Te($d(i))}</div><h2>${Te(i.name)}</h2></div><div class="panel-body"><p>${Te(i.description)}</p><div class="summary-resource"><span>${ot(i.resource==="parts"?"package":"flask-conical")}${i.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${qd(i.id)}</strong></div><p class="subtle">${i.stationNames.length} destinations / untimed questions</p>${Le("deploy","Deploy Atlas","arrow-right","primary full",nt)}${Le("map","Back to world map","arrow-left","quiet full")}</div></aside>`}function jf(){let i=de.activeExpedition;if(!i)return je="map",Yd();mt=i.regionId;let e=i.stations.filter(o=>o.resolved).length,t=i.stations.length,n=e===t,r=Mb(),s=r?`<aside class="panel field-command selected"><div class="panel-head destination-panel-head"><div><div class="eyebrow">Destination selected</div><h2>${Te(r.name)}</h2><div class="mission-count">${e} of ${t} resolved</div></div>${li("clear-station","Close destination","x")}</div><div class="panel-body"><div class="destination-status"><span class="status ${r.resolved?"":"pending"}">${r.resolved?"Resolved":"Ready"}</span><span class="node-code">SITE ${String(el(r.id)+1).padStart(2,"0")}</span></div><p class="destination-skill">${Te(r.question.skill)}</p><div class="summary-resource"><span>${ot(i.resource==="parts"?"package":"flask-conical")}${i.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${r.reward.amount}</strong></div><div class="destination-actions">${Le("explore-station","Explore","eye","",!1,`data-station="${Te(r.id)}"`)}${Le("march-station",r.resolved?"Revisit":"March","navigation","primary",nt,`data-station="${Te(r.id)}"`)}</div></div></aside>`:"",a=!r&&n?`<aside class="panel field-command complete"><div class="panel-head"><div class="eyebrow">Expedition ready</div><h2>All ${t} sites complete</h2><div class="mission-count">+${i.earned[i.resource]} ${i.resource==="parts"?"parts":"cores"} secured</div></div><div class="panel-foot">${Le("finish","Complete expedition","check","primary full",nt)}</div></aside>`:"";return En("Aerial expedition view",Te(tl().name),`${e} of ${t} missions complete`)+s+a+Cb()}function Zf(i,e=!1){if(!i)return"";let t="";return i.kind==="groups"?t=`<div class="crate-grid">${Array.from({length:i.groups},(n,r)=>`<div class="supply-crate" role="img" aria-label="Crate ${r+1}: ${i.itemsPerGroup} pieces">${"<i></i>".repeat(i.itemsPerGroup)}</div>`).join("")}</div><p class="diagram-note">Reserved for another base: <strong>${i.reserved}</strong></p>`:i.kind==="sharing"?t=`<div class="log-row"><span>Washers available</span><strong>${i.total}</strong></div><div class="crate-grid" style="margin-top:12px">${Array.from({length:i.groups},(n,r)=>`<div class="place-value"><strong>?</strong><small>KIT ${r+1}</small></div>`).join("")}</div>`:i.kind==="place-value"?t=`<div class="place-values">${[["hundreds","BOXES OF 100"],["tens","BUNDLES OF 10"],["ones","LOOSE PINS"]].map(([n,r])=>`<div class="place-value"><strong>${i[n]}</strong><small>${r}</small></div>`).join("")}</div>`:i.kind==="quantities"?t=i.rows.map(([n,r])=>`<div class="log-row"><span>${Te(n)}</span><strong>${r}</strong></div>`).join(""):i.kind==="table"&&(t=`${e?`<div class="test-control">${Le("observe","Inspect evidence","flask-conical","",nt)}<small>Recorded field observations</small></div>`:""}<table><thead><tr>${i.columns.map(n=>`<th scope="col">${Te(n)}</th>`).join("")}</tr></thead><tbody>${i.rows.map((n,r)=>`<tr data-evidence-row="${r}">${n.map(s=>`<td>${Te(s)}</td>`).join("")}</tr>`).join("")}</tbody></table><p class="diagram-note">${Te(i.controls)}</p>`),`<figure class="diagram"><figcaption>${Te(i.label)}</figcaption>${t}</figure>`}function Ib(){let i=br();if(!i)return je="region",jf();let e=i.question,t=zt.get(oa(),"");rn=i.resolved?String(i.attempts.at(-1)?.answer??""):rn||String(t??"");let n=i.lastFeedback,r=de.activeExpedition.stations.filter(s=>!s.resolved).length;return En(tl().name,Te(i.name),"","station-caption")+`<section class="panel challenge"><div class="panel-head"><div class="challenge-top"><span class="eyebrow">Arrived / ${Te(i.name)}</span><span class="status ${i.resolved?"":"plain"}">${i.resolved?"Reward saved":` +${i.reward.amount} ${i.reward.resource==="parts"?"parts":"cores"}`}</span></div><h2 tabindex="-1">${Te(e.prompt)}</h2></div><div class="panel-body">${Zf(e.diagram,!0)}
    ${i.resolved?"":Of(e)}
    <form id="answer-form">${e.type==="number"?`<label class="answer-field" for="answer-input">Your answer<input id="answer-input" name="answer" inputmode="numeric" autocomplete="off" type="text" maxlength="12" value="${Te(rn)}" ${i.resolved||nt?"disabled":""}></label>`:`<div class="answer-options" role="group" aria-label="Answer choices">${e.options.map((s,a)=>`<button class="answer-option ${rn===s.id?"selected":""}" type="button" data-action="option" data-option="${Te(s.id)}" aria-pressed="${rn===s.id}" ${i.resolved||nt?"disabled":""}><span class="option-mark">${String.fromCharCode(65+a)}</span><span>${Te(s.label)}</span></button>`).join("")}</div>`}
    ${n?`<div class="feedback ${n.correct?"correct":""}" role="status"><strong>${n.correct?"Contract resolved":n.kind==="worked"?"Worked explanation":n.kind==="hint"?"Field guidance":"Take another look"}</strong>${Te(n.explanation)}${i.resolved?`<p class="subtle"> +${i.reward.amount} ${i.reward.resource==="parts"?"building parts":"research cores"} saved${i.helpUsed?" / completed with support":""}</p>`:""}</div>`:""}
    <div class="actions">${i.resolved?Le("region","Return to expedition","arrow-right","primary",nt):`<button class="button primary" type="submit" ${nt||Kt?"disabled":""}>${nt?'<span class="spinner"></span>':ot("check")}Check answer</button>${Le("hint",i.support.stage?"Worked example":"Hint","help-circle","",nt||!i.attempts.length||i.support.stage>=2)}`}</div></form>
    ${i.resolved?`<div class="mission-next">${Le(r?"next-mission":"finish",r?"March to the next mission":"Complete expedition",r?"navigation":"flag","gold full",nt)}</div>`:""}
    <div class="actions">${Le("region","Back to base","arrow-left","quiet",nt)}${Le("read","Read aloud","volume-2","quiet",!1)}</div></div></section>`}function Lb(){let i=de.nextUpgrade,e=i&&de.wallet.parts>=i.cost.parts&&de.wallet.cores>=i.cost.cores;return En("Engineering command","Build your headquarters")+`<aside class="panel"><div class="panel-head"><div class="eyebrow">${i?`HQ Level ${de.hqLevel} to Level ${i.level}`:"Final build complete"}</div><h2>${i?.level===2?"Expedition headquarters":"Beacon command centre"}</h2></div><div class="panel-body"><p>${i?"Raise the command building, expand its roof systems and establish your next permanent base upgrade.":"The command centre is complete. Your saved progress and expeditions are available in the journal."}</p>${Rb()}${i?Le("confirm-build",e?"Construct headquarters":"Resources required","hard-hat","primary full",!e||nt||!!Kt):""}<div style="margin-top:10px">${Le("hq","Return to HQ","arrow-left","full")}</div></div></aside>`}function Db(){let i=Qo||de.history.at(-1);if(!i)return Gd();let e=fs(i),t=Fd(de);return En("Mission accomplished","You made a difference")+`<aside class="panel"><div class="panel-head"><span class="rank">${ot("check")}EXPEDITION COMPLETE</span><h2>${Te(Ut.find(n=>n.id===i.regionId)?.name)}</h2><div class="reward-flash">${ot("award")}<span>${e.resolved} missions solved</span></div></div><div class="panel-body"><div class="summary-resource"><span>${ot("package")}Building parts</span><strong>+${i.earned.parts}</strong></div><div class="summary-resource"><span>${ot("flask-conical")}Research cores</span><strong>+${i.earned.cores}</strong></div><p>${t.title}. Your cargo is ready to put to work.</p>${Le("campaign","Restore the valley","flag","gold full")}<div class="actions mission-next">${Le("return-hq","Drive to HQ","house","primary")}${Le("review","Review answers","book-open","",!1,`data-review="${Te(i.id)}"`)}</div></div></aside>`}function Gf(i,e){return i.options?.find(t=>t.id===e)?.label??e??"No answer"}function Jf(){let i=[...de.history].reverse();return En("Expedition record","Field journal")+`<section class="panel journal"><div class="panel-head"><div class="eyebrow">Your learning and expeditions</div><h2>Field journal</h2></div><div class="panel-body">${de.activeExpedition?`<div class="history-item"><span class="status pending">In progress</span><h3 style="margin-top:8px">${Te(Ut.find(e=>e.id===de.activeExpedition.regionId)?.name)}</h3><div class="actions">${Le("resume","Resume","play","primary")}${Le("end-expedition","End expedition","flag")}</div></div>`:""}${i.length?i.map(e=>`<article class="history-item"><span class="status ${e.status==="ended"?"plain":""}">${e.status==="ended"?"Ended early":"Completed"}</span><h3 style="margin-top:8px">${Te(Ut.find(t=>t.id===e.regionId)?.name)}</h3><p class="subtle">${e.stations.filter(t=>t.resolved).length} of ${e.stations.length} stations / +${e.earned.parts} parts / +${e.earned.cores} cores</p><div class="actions">${Le("review","Review answers","book-open","",!1,`data-review="${Te(e.id)}"`)}</div></article>`).join(""):'<p class="empty">Your completed expeditions will appear here.</p>'}</div></section>`}function Ub(){let i=de.history.find(t=>t.id===ys);if(!i)return Jf();let e=[...i.stations].sort((t,n)=>+(t.firstAttemptCorrect!==!1)-+(n.firstAttemptCorrect!==!1));return En("Expedition evidence","Answer review")+`<section class="panel journal"><div class="panel-head"><div class="eyebrow">Original missed answers first</div><h2>${Te(Ut.find(t=>t.id===i.regionId)?.name)}</h2></div><div class="panel-body">${e.map(t=>`<article class="review-station"><span class="status ${t.firstAttemptCorrect===!1?"missed":t.resolved?"":"plain"}">${t.firstAttemptCorrect===!1?"First answer missed":t.resolved?"Correct first time":"Not completed"}</span><h3>${Te(t.question.prompt)}</h3>${Zf(t.question.diagram)}<p><strong>First answer:</strong> ${Te(Gf(t.question,t.attempts[0]?.answer))}</p><p><strong>Correct answer:</strong> ${Te(Gf(t.question,t.question.answer))}</p><p>${Te(t.question.explanation)}</p><p class="subtle">${t.resolution?Te(t.resolution):"Unresolved"} / ${t.attempts.length} response${t.attempts.length===1?"":"s"}${t.helpUsed?" / support used":""}</p></article>`).join("")}<div class="actions">${Le("journal","Back to journal","arrow-left","full")}</div></div></section>`}function kb(){let i=$n.find(r=>r.id===Et);if(!i)return je="map",Yd();let e=ca(),t=Vo(Et,e.index),n=e.seen.includes(t.id);return En("Discovery stop",Te(i.name))+`<section class="panel activity-panel"><div class="panel-head"><div class="challenge-top"><span class="eyebrow">${Et==="jokes"?"A little laugh":"A little brain break"}</span><span class="status plain">${e.index+1} / ${xr[Et].length}</span></div><h2>${Te(t.prompt)}</h2></div><div class="panel-body">${t.options?`<div class="answer-options">${t.options.map(r=>`<button class="answer-option ${n&&r.id===t.correctOption?"selected":""}" data-action="activity-answer" data-option="${Te(r.id)}" ${n?"disabled":""}>${Te(r.text)}</button>`).join("")}</div>`:""}${n?`<div class="discovery-answer" role="status"><strong>${Te(t.answer)}</strong><p>${Te(t.explanation)}</p></div>`:ai?'<p class="activity-retry" role="status">Not quite. Try another idea.</p>':""}<div class="actions">${n?Le("next-activity",Et==="jokes"?"Another joke":"Next challenge","arrow-right","primary full"):Le("reveal-activity",Et==="jokes"?"Tell me!":"Show the answer","eye",Et==="jokes"?"primary full":"quiet full")}</div><div class="activity-count">${e.seen.length} / ${xr[Et].length} discovered on this device</div><div class="actions">${Le("map","Back to valley","arrow-left","quiet")}${de.activeExpedition?Le("resume","Resume expedition","navigation","quiet"):""}</div></div></section>`}function Nb(){let i=Ei.find(n=>n.id===bs)||Ei[0],e=mn(de),t=e.loadoutId===i.id;return En("Expedition fleet",Te(Ko(i.id)))+`<div class="vehicle-inspect-actions">${Le("garage","Back to workshop","arrow-left")}${Le("equip-loadout",t?"Equipped":e.canEquip?"Equip vehicle":"Expedition active",t?"check":"wrench","primary",t||!e.canEquip||nt||!!Kt,`data-loadout="${i.id}"`)}</div>`}function Wt(){if(!de||!me)return;Tb(),Ab();let i={hq:Gd,map:Yd,"region-info":Pb,region:jf,station:Ib,construction:Lb,campaign:()=>Uf(de,nt,!!Kt),garage:()=>kf(de,nt,!!Kt),results:Db,journal:Jf,review:Ub};i.landmark=()=>En("Built by your team",Te(mn(de).projects.find(e=>e.id===vs)?.name||"Valley restored"))+`<div class="hq-quick-actions">${Le("map","Explore the valley","map","primary")}${Le("campaign","Next restoration","flag")}</div>`,i.activity=kb,i.vehicle=Nb,je==="travel"?tt("interface").innerHTML=`<section class="travel-panel ${Jt?"paused":""}"><div class="eyebrow">${Te(Ko(me.fleet.activeId))} / ${me.travel?.kind==="station"?"Field march":"Convoy in transit"}</div><h2>${me.travel?.label?`En route to ${Te(me.travel.label)}`:"Route in progress"}</h2><div class="travel-progress"><span></span></div><div class="travel-readout"><span>ROUTE ACTIVE</span><strong>${Math.max(0,Math.ceil((me.travel?.duration||0)-(me.travel?.elapsed||0)))}s</strong></div><div class="actions">${Le("pause-travel",Jt?"Continue journey":"Pause journey",Jt?"play":"pause")}${Le("cancel-travel",me.travel?.kind==="station"?"Cancel march":"Stop journey","flag")}</div></section>`:tt("interface").innerHTML=(i[je]||Gd)(),["map","region-info"].includes(je)&&(tt("location-pins").innerHTML=`<button class="location-pin hq-location" type="button" data-pin="hq" data-action="hq">${ot("house")}<span><strong>Headquarters</strong><small>Home base</small></span></button><span class="strategic-anchor atlas-anchor atlas-world" data-pin="atlas" aria-label="Atlas expedition vehicle">${ot("navigation")}<b>ATLAS</b></span>`+Ut.map(e=>{let t=aa(e.id),n=de.activeExpedition?.regionId===e.id;return`<button class="location-pin subject-pin ${on===e.id?"selected":""} ${t?"completed":""} ${n?"active":""}" type="button" data-pin="${e.id}" data-action="destination" data-region="${e.id}" aria-pressed="${on===e.id}" aria-label="${Te(e.name)}, ${t?"completed":n?"in progress":"ready"}">${t?`<span class="completion-beacon">${ot("check")}</span>`:ot(e.icon)}<span><strong>${Te(e.name)}</strong><small>${Te($d(e))}</small></span></button>`}).join("")),je==="map"?tt("location-pins").insertAdjacentHTML("beforeend",$n.map(e=>`<button class="activity-pin" data-pin="activity-${e.id}" data-action="select-activity" data-activity="${e.id}" title="${Te(e.name)}" aria-label="${Te(e.name)}" aria-pressed="${tn===e.id}">${Te(e.symbol)}</button>`).join("")):je==="region"&&de.activeExpedition?tt("location-pins").innerHTML=`<span class="strategic-anchor hq-anchor" data-pin="hq" aria-label="Headquarters">${ot("house")}<b>HQ</b></span><span class="strategic-anchor atlas-anchor" data-pin="atlas" aria-label="Atlas expedition vehicle">${ot("navigation")}<b>ATLAS</b></span>`+de.activeExpedition.stations.map((e,t)=>`<button class="field-location-pin ${e.id===nn?"selected":""} ${e.resolved?"resolved":""}" type="button" data-pin="station-${t}" data-action="select-station" data-station="${Te(e.id)}" aria-label="${Te(e.name)}, ${e.resolved?"resolved":"available"}" aria-pressed="${e.id===nn}"><span class="field-pin-index">${e.resolved?ot("check"):t+1}</span></button>`).join(""):je!=="region-info"&&(tt("location-pins").innerHTML=""),Kt&&tt("interface").insertAdjacentHTML("beforeend",`<div style="position:absolute;top:0;left:50%;transform:translateX(-50%);pointer-events:auto">${Le("retry-save","Reconnect pending save","refresh-cw","gold",nt)}</div>`),Yf(),qf(),tt("game").dataset.view=je,tt("game").dataset.hqLevel=de.hqLevel,tt("game").dataset.activity=je==="activity"?Et:"",tt("game").setAttribute("aria-busy",String(nt))}function ji(i,e){$f=document.activeElement,Ji.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">${i}</h2>${li("close-dialog","Close","x")}</div><div class="dialog-body">${e}</div>`,Ji.setAttribute("aria-labelledby","dialog-title"),Ji.showModal(),me.paused=!0,da(),qf()}function Un(){Ji.close(),me.paused=Jt,$f?.focus()}function Fb(){ji("Expedition settings",`<label class="setting">Sound and read-aloud<input id="sound-setting" type="checkbox" ${oi.sound?"checked":""}></label><label class="setting">Reduced motion<input id="motion-setting" type="checkbox" ${oi.reduced?"checked":""}></label><p class="subtle" style="margin-top:15px">${wr?"Local preview. Progress is stored on this device only.":"Progress is saved to the current Bright Quest child profile."}</p><div class="dialog-actions">${Le("save-settings","Done","check","primary")}</div><a class="button full" style="margin-top:10px" href="/">${ot("arrow-left")}Return to Bright Quest</a>`)}function Ob(){let i=tl();ji(i.name,`<div class="recon-card"><span class="status ${aa(i.id)?"complete-glow":"pending"}">${aa(i.id)?`${ot("check")} District completed`:"Ready to explore"}</span><p><strong>${Te(i.stationNames.length)} subject missions</strong><br>${Te(i.stationNames.join(" / "))}</p><p>${Te(i.description)}</p><div class="summary-resource"><span>${ot(i.resource==="parts"?"package":"flask-conical")}${i.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${qd(i.id)}</strong></div></div><div class="dialog-actions">${Le("close-dialog","Back to map","arrow-left")}${Le("march-region-dialog",de.activeExpedition?.regionId===i.id?"Resume":"March","navigation","primary")}</div>`)}async function Hd(){if(de.activeExpedition){if(de.activeExpedition.regionId===mt)return Wd();ji("An expedition is already active",`<p>Resume it, or end it in the journal before starting another. Your earned cargo stays safe.</p><div class="dialog-actions">${Le("resume-dialog","Resume expedition","play","primary")}${Le("journal-dialog","Open journal","book-open")}</div>`);return}await Ai({type:"start",regionId:mt})&&(nn="",jd(mt,"region"))}function jd(i,e){Jt=!1,me.paused=!1,me.drive(i,()=>{kt(e,{},!0),_r(!0)}),Xd(),je="travel",Wt()}function Wd(){mt=de.activeExpedition.regionId,jd(mt,"region")}function Vd(i){let e=el(i);e<0||(nn=i,kn=i,rn="",Jt=!1,me.paused=!1,me.driveToStation(mt,e,()=>{kt("station",{stationId:i},!0),_r(!0),requestAnimationFrame(()=>document.querySelector(".challenge h2")?.focus())}),Xd(),je="travel",Wt())}function Bb(i){let e=de.activeExpedition?.stations.find(n=>n.id===i);if(!e)return;let t={maths:"Maths",english:"English",physics:"Physics",chemistry:"Chemistry","life-sciences":"Life sciences"}[de.activeExpedition.subject]||"Mission";ji(e.name,`<div class="recon-card"><span class="status ${e.resolved?"":"pending"}">${e.resolved?"Resolved":"Ready to explore"}</span><p><strong>${t} objective</strong><br>${Te(e.question.skill)}</p><div class="summary-resource"><span>${ot(e.reward.resource==="parts"?"package":"flask-conical")}${e.reward.resource==="parts"?"Building parts":"Research cores"}</span><strong>+${e.reward.amount}</strong></div></div><div class="dialog-actions">${Le("close-dialog","Back to map","arrow-left")}${Le("march-dialog",e.resolved?"Revisit site":"March to site","navigation","primary",!1,`data-station="${Te(e.id)}"`)}</div>`)}async function zb(){if(nt||!br()||br().resolved)return;let i=br().question,e=i.type==="number"?tt("answer-input")?.value.trim():rn;if(!e&&e!=="0"){ln("Choose or enter an answer first.");return}if(i.type==="number"&&!/^\d{1,8}$/.test(e)){ln("Enter a whole number.");return}rn=String(e),zt.set(oa(),rn),await Ai({type:"answer",stationId:kn,answer:i.type==="number"?Number(e):e})&&(_r(br()?.resolved),br()?.resolved&&zt.remove(oa()))}tt("game").addEventListener("submit",i=>{i.target.id==="answer-form"&&(i.preventDefault(),zb())});tt("game").addEventListener("input",i=>{let e=i.target;Hf(e,tt("interface"))||e.id==="answer-input"&&(rn=e.value,zt.set(oa(),rn))});tt("game").addEventListener("click",async i=>{let e=i.target.closest('[data-action^="field-lab-"]');if(e&&zf(e,tt("interface")))return;let t=i.target.closest("[data-action]");if(!t||t.disabled)return;let n=t.dataset.action;if(n==="zoom-in")return me.zoom(-2);if(n==="zoom-out")return me.zoom(2);if(n==="reset-camera")return me.resetCamera(),Yf();if(n==="close-dialog")return Un();if(n==="retry-save")return Xf();if(n==="read")return Eb();if(n==="option"){rn=t.dataset.option,zt.set(oa(),rn),document.querySelectorAll("[data-option]").forEach(r=>{r.classList.toggle("selected",r.dataset.option===rn),r.setAttribute("aria-pressed",String(r.dataset.option===rn))});return}if(n==="observe"){let r=[...document.querySelectorAll("[data-evidence-row]")];for(let s=0;s<r.length;s++)r.forEach(a=>a.classList.remove("selected")),r[s].classList.add("selected"),await new Promise(a=>setTimeout(a,oi.reduced?1:500));r.forEach(s=>s.classList.remove("selected"));return}if(n==="settings")return Fb();if(n==="reset-game")return ji("Reset Beacon Brigade?",`<div class="reset-warning"><strong>This erases this child's Beacon Brigade progress.</strong><p>HQ levels, resources, completed districts, answers, journal records and discoveries on this device will all be permanently cleared. Other Bright Quest modules are not affected.</p></div><div class="dialog-actions">${Le("close-dialog","Keep progress","arrow-left","primary")}${Le("reset-now","Reset all progress","rotate-ccw","danger")}</div>`);if(n==="reset-now"){let r=Jt;Un(),Jt=!0,me.paused=!0,await Ai({type:"reset"})?(me.travel=null,me.onTravelEnd=null,Jt=!1,me.paused=!1,me.dustPuffs.forEach(s=>{s.visible=!1}),on="",nn="",kn="",rn="",ys="",Qo=null,Bd(),zt.remove(sa()),tn="",ai="",me.selectStation(mt,null),me.clearRoute(),kt("hq",{},!0),ln("Beacon Brigade has been reset for this child.")):(Jt=r,me.paused=Jt,Wt());return}if(n==="save-settings"){oi={sound:tt("sound-setting").checked,reduced:tt("motion-setting").checked},zt.set("bqBeaconSettings",oi),oi.sound||da(),Un(),Wt();return}if(n==="pause-travel"){Jt=!Jt,me.paused=Jt,Wt();return}if(n==="cancel-travel"){let r=me.travel?.kind==="station";me.travel=null,me.onTravelEnd=null,me.clearRoute(),me.dustPuffs.forEach(s=>{s.visible=!1}),Jt=!1,me.paused=!1,kt(r?"region":"hq");return}if(!(nt||je==="travel")){if(n==="inspect-vehicle"){kt("vehicle",{inspectedVehicleId:t.dataset.loadout});return}if(n==="select-activity"){tn=t.dataset.activity,Et=tn,on="",ai="",kt("map");return}if(n==="clear-activity"){tn="",Wt();return}if(n==="visit-activity"){Et=tn,ai="",Jt=!1,me.paused=!1,me.driveToActivity(Et,()=>kt("activity",{},!0)),Xd(),je="travel",Wt();return}if(n==="activity-answer"){ai=t.dataset.option,wf(Et,ca().index,ai)&&(zd(!0),_r(!0)),Wt();return}if(n==="reveal-activity"){zd(!0),Wt();return}if(n==="next-activity"){zd(!1,!0),Wt();return}if(n==="equip-loadout"){await Ai({type:"equip",loadoutId:t.dataset.loadout})&&ln(`${Ko(t.dataset.loadout)} equipped.`);return}if(n==="restore-project"){let r=mn(de).projects.find(s=>s.id===t.dataset.project);return r?.canBuild?ji(`Restore ${Te(r.name)}?`,`<p>Your team will use <strong>${r.cost.parts} parts</strong> and <strong>${r.cost.cores} cores</strong> to permanently restore this landmark.</p><div class="dialog-actions">${Le("close-dialog","Keep exploring","arrow-left")}${Le("restore-now","Build landmark","hard-hat","primary",!1,`data-project="${r.id}"`)}</div>`):void 0}if(n==="restore-now"){let r=t.dataset.project;Un(),await Ai({type:"project",projectId:r})&&(kt("landmark",{projectId:r}),ln("Landmark restored. Your valley is growing!"),_r(!0));return}if(n==="next-mission"){let r=de.activeExpedition?.stations.find(s=>!s.resolved);if(r)return Vd(r.id);kt("region");return}if(n==="hq"||n==="return-hq"){if(["region","station","results"].includes(je))return jd("hq","hq");kt("hq");return}if(["map","construction","campaign","garage","journal","region"].includes(n)){n==="map"&&(on="",tn=""),(n!=="region"||de.activeExpedition?.stations.every(r=>r.resolved))&&(nn=""),kt(n);return}if(n==="destination"){tn="",nn="",on=t.dataset.region,mt=on,kt("map");return}if(n==="clear-region"){on="",Wt();return}if(n==="explore-region")return Ob();if(n==="march-region")return Hd();if(n==="march-region-dialog")return Un(),Hd();if(n==="deploy")return Hd();if(n==="resume")return Wd();if(n==="resume-dialog")return Un(),Wd();if(n==="journal-dialog"){Un(),kt("journal");return}if(n==="select-station"){nn=t.dataset.station,Wt();return}if(n==="clear-station"){nn="",Wt();return}if(n==="explore-station")return Bb(t.dataset.station);if(n==="march-station")return Vd(t.dataset.station);if(n==="march-dialog"){let r=t.dataset.station;return Un(),Vd(r)}if(n==="hint"){await Ai({type:"hint",stationId:kn});return}if(n==="finish"){await Ai({type:"finish"})&&(Qo=de.history.at(-1),kt("results"),_r(!0));return}if(n==="review"){kt("review",{reviewId:t.dataset.review});return}if(n==="confirm-build")return ji("Confirm construction",`<p>Build HQ Level ${de.nextUpgrade.level} using ${de.nextUpgrade.cost.parts} building parts and ${de.nextUpgrade.cost.cores} research cores?</p><div class="dialog-actions">${Le("build-now","Construct HQ","hard-hat","primary")}${Le("close-dialog","Cancel","x")}</div>`);if(n==="build-now"){Un(),await Ai({type:"upgrade"})&&(kt("hq"),ln(`HQ Level ${de.hqLevel} constructed and saved.`),_r(!0));return}if(n==="end-expedition")return ji("End this expedition?",`<p>Earned resources and answer records stay saved. Unresolved stations will be closed.</p><div class="dialog-actions">${Le("end-now","End expedition","flag")}${Le("close-dialog","Keep exploring","arrow-left","primary")}</div>`);n==="end-now"&&(Un(),await Ai({type:"end"}),kt("journal"))}});Ji.addEventListener("cancel",i=>{i.preventDefault(),Un()});document.addEventListener("visibilitychange",()=>{document.hidden&&da()});window.addEventListener("online",()=>{Kt&&Xf()});window.addEventListener("popstate",i=>{Et=i.state?.activityId||"jokes",tn=i.state?.selectedActivityId||"",ai="",bs=i.state?.inspectedVehicleId||"balanced",vs=i.state?.projectId||"bridge",da(),Ji.open&&Un(),me?.travel&&(me.travel=null,me.onTravelEnd=null),Jt=!1,je=i.state?.view||"hq",mt=i.state?.regionId||mt,on=i.state?.selectedRegionId||"",kn=i.state?.stationId||"",nn=i.state?.targetStationId||"",ys=i.state?.reviewId||"",rn="",je==="travel"&&(je="hq"),Wt()});async function Hb(){try{if(wr)Zi={id:"local-preview",name:"Preview commander"},gs=zt.get(Wf)||Ud({profileId:Zi.id}),de=kd(gs);else{let e=await la();de=e.state,Zi=e.profile,Kt=zt.get(xs())}me=new Xo(tt("scene")),me.createBase(de.hqLevel),me.reduced=oi.reduced,me.onDestinationPick=e=>{if(!(je!=="map"||Ji.open||nt||Kt)){if(e.startsWith("activity-")){let t=$n.find(n=>n.id===e.slice(9));if(!t)return;Et=t.id,tn=t.id,on="",ai="",kt("map");return}if(tn="",e==="hq"){on="",kt("hq");return}Ut.some(t=>t.id===e)&&(nn="",on=e,mt=e,kt("map"))}},me.onFrame=e=>{let t=document.querySelector("#topbar")?.getBoundingClientRect().bottom||0,n=document.querySelector(".field-command")?.getBoundingClientRect(),r=document.querySelector("#navigation")?.getBoundingClientRect().top||innerHeight,s=innerWidth<=650&&n?.top||r;for(let o of e){let l=document.querySelector(`[data-pin="${o.id}"]`);if(l){let c=Math.max(l.offsetWidth,l.offsetHeight)/2+4,d=t+c,u=s-c,h=innerWidth>650&&n?n.left-12:innerWidth;l.style.left=`${o.x}px`,l.style.top=`${o.y}px`,l.hidden=!o.visible||o.x<c||o.x>h-c||o.y<d||o.y>u||u<=d}}let a=document.querySelector(".travel-progress span");a&&me.travel&&(a.style.width=`${Math.min(100,me.travel.elapsed/me.travel.duration*100)}%`)},tt("scene").addEventListener("world-error",e=>ln(e.detail)),tt("boot").remove();let i=history.state;Et=i?.activityId||"jokes",tn=i?.selectedActivityId||"",bs=i?.inspectedVehicleId||"balanced",vs=i?.projectId||"bridge",i?.view&&!["travel","results"].includes(i.view)&&(je=i.view,mt=i.regionId||mt,on=i.selectedRegionId||"",kn=i.stationId||"",nn=i.targetStationId||"",ys=i.reviewId||""),kt(je,{},!0),await me.ready,me.textureErrors.length&&ln("Some terrain textures did not load. Refresh when your connection is ready."),Kt&&ln("A pending save is ready to reconnect."),["localhost","127.0.0.1","[::1]"].includes(location.hostname)&&(window.__BEACON_QA__={get view(){return je},get frame(){return me.frame},get state(){return de},get world(){return me},get preview(){return wr}})}catch(i){let e=[401,403,409].includes(i.status);tt("boot").innerHTML=`<span class="boot-mark">B</span><h1>Beacon Brigade</h1><p>${e?"Open Bright Quest and select your child profile to begin.":Te(i.message||"The expedition could not load. Your saved progress has not changed.")}</p><a class="button primary" href="/">${e?"Open Bright Quest":"Return to Bright Quest"}</a><button class="button" id="reload">Try again</button>`,tt("reload").addEventListener("click",()=>location.reload())}}Hb();
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
