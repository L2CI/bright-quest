var ra={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var xh=([r,e,t])=>{let n=document.createElementNS("http://www.w3.org/2000/svg",r);return Object.keys(e).forEach(i=>{n.setAttribute(i,String(e[i]))}),t?.length&&t.forEach(i=>{let s=xh(i);n.appendChild(s)}),n},yh=(r,e={})=>{let n={...ra,...e};return xh(["svg",n,r])};var vh=r=>{for(let e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};var _h=(...r)=>r.filter((e,t,n)=>!!e&&e.trim()!==""&&n.indexOf(e)===t).join(" ").trim();var Mh=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase());var Sh=r=>{let e=Mh(r);return e.charAt(0).toUpperCase()+e.slice(1)};var Mp=r=>Array.from(r.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),bh=r=>typeof r=="string"?r:!r||!r.class?"":r.class&&typeof r.class=="string"?r.class.split(" "):r.class&&Array.isArray(r.class)?r.class:"",$o=(r,{nameAttr:e,icons:t,attrs:n})=>{let i=r.getAttribute(e);if(i==null)return;let s=Sh(i),a=t[s];if(!a)return console.warn(`${r.outerHTML} icon name was not found in the provided icons object.`);let o=Mp(r),l=vh(o)?{}:{"aria-hidden":"true"},c={...ra,"data-lucide":i,...l,...n,...o},u=bh(o),h=bh(n),d=_h("lucide",`lucide-${i}`,...u,...h);d&&Object.assign(c,{class:d});let f=yh(a,c);return r.parentNode?.replaceChild(f,r)};var Yo=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var Ko=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var Zo=[["path",{d:"M2 10v3"}],["path",{d:"M6 6v11"}],["path",{d:"M10 3v18"}],["path",{d:"M14 8v7"}],["path",{d:"M18 5v13"}],["path",{d:"M22 10v3"}]];var Jo=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];var jo=[["path",{d:"M20 6 9 17l-5-5"}]];var Qo=[["path",{d:"m9 18 6-6-6-6"}]];var zi=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],["path",{d:"M12 17h.01"}]];var el=[["path",{d:"M12 20v2"}],["path",{d:"M12 2v2"}],["path",{d:"M17 20v2"}],["path",{d:"M17 2v2"}],["path",{d:"M2 12h2"}],["path",{d:"M2 17h2"}],["path",{d:"M2 7h2"}],["path",{d:"M20 12h2"}],["path",{d:"M20 17h2"}],["path",{d:"M20 7h2"}],["path",{d:"M7 20v2"}],["path",{d:"M7 2v2"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1"}]];var tl=[["path",{d:"M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"}],["path",{d:"m12 9 6 6"}],["path",{d:"m18 9-6 6"}]];var nl=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]];var il=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"}]];var rl=[["path",{d:"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"}],["path",{d:"m18 15 4-4"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"}]];var sl=[["path",{d:"M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"}]];var al=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var ol=[["path",{d:"m8 3 4 8 5-5 5 15H2L8 3z"}]];var ll=[["path",{d:"M20.341 6.484A10 10 0 0 1 10.266 21.85"}],["path",{d:"M3.659 17.516A10 10 0 0 1 13.74 2.152"}],["circle",{cx:"12",cy:"12",r:"3"}],["circle",{cx:"19",cy:"5",r:"2"}],["circle",{cx:"5",cy:"19",r:"2"}]];var cl=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];var ul=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];var hl=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478"}],["circle",{cx:"12",cy:"12",r:"2"}]];var dl=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var fl=[["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"}],["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"}],["path",{d:"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"}]];var pl=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];var ml=[["circle",{cx:"6",cy:"19",r:"3"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"}],["circle",{cx:"18",cy:"5",r:"3"}]];var gl=[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M7 12h10"}]];var xl=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var yl=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];var vl=[["path",{d:"m10 20-1.25-2.5L6 18"}],["path",{d:"M10 4 8.75 6.5 6 6"}],["path",{d:"m14 20 1.25-2.5L18 18"}],["path",{d:"m14 4 1.25 2.5L18 6"}],["path",{d:"m17 21-3-6h-4"}],["path",{d:"m17 3-3 6 1.5 3"}],["path",{d:"M2 12h6.5L10 9"}],["path",{d:"m20 10-1.5 2 1.5 2"}],["path",{d:"M22 12h-6.5L14 15"}],["path",{d:"m4 10 1.5 2L4 14"}],["path",{d:"m7 21 3-6-1.5-3"}],["path",{d:"m7 3 3 6h4"}]];var sa=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];var _l=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];var Ml=[["polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5"}],["line",{x1:"13",x2:"19",y1:"19",y2:"13"}],["line",{x1:"16",x2:"20",y1:"16",y2:"20"}],["line",{x1:"19",x2:"21",y1:"21",y2:"19"}],["polyline",{points:"14.5 6.5 18 3 21 3 21 6 17.5 9.5"}],["line",{x1:"5",x2:"9",y1:"14",y2:"18"}],["line",{x1:"7",x2:"4",y1:"17",y2:"20"}],["line",{x1:"3",x2:"5",y1:"19",y2:"21"}]];var Sl=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];var bl=[["path",{d:"M21 4H3"}],["path",{d:"M18 8H6"}],["path",{d:"M19 12H9"}],["path",{d:"M16 16h-6"}],["path",{d:"M11 20H9"}]];var wl=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18"}],["path",{d:"M4 22h16"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6"}]];var El=[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"}]];var Tl=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];var Al=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];var Rl=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15"}]];var Cl=[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}]];var Pl=[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2"}]];var Il=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var Ll=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];var Dl=({icons:r={},nameAttr:e="data-lucide",attrs:t={},root:n=document,inTemplates:i}={})=>{if(!Object.values(r).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof n>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(n.querySelectorAll(`[${e}]`)).forEach(a=>$o(a,{nameAttr:e,icons:r,attrs:t})),i&&Array.from(n.querySelectorAll("template")).forEach(o=>Dl({icons:r,nameAttr:e,attrs:t,root:o.content,inTemplates:i})),e==="data-lucide"){let a=n.querySelectorAll("[icon-name]");a.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(a).forEach(o=>$o(o,{nameAttr:"icon-name",icons:r,attrs:t})))}};var Sp=0,wh=1,bp=2;var mf=1,cu=2,Kn=3,On=0,Vt=1,Nt=2,Mi=0,Ur=1,Cs=2,Eh=3,Th=4,wp=5,Ki=100,Ep=101,Tp=102,Ap=103,Rp=104,Cp=200,Pp=201,Ip=202,Lp=203,_c=204,Mc=205,Dp=206,Up=207,Np=208,kp=209,Fp=210,Bp=211,Op=212,Hp=213,zp=214,Vp=0,Gp=1,Wp=2,Ga=3,qp=4,Xp=5,$p=6,Yp=7,gf=0,Kp=1,Zp=2,Si=0,Jp=1,jp=2,Qp=3,uu=4,em=5,tm=6,nm=7,Ah="attached",im="detached",xf=300,Or=301,Hr=302,Sc=303,bc=304,Ro=306,jn=1e3,Cn=1001,Ps=1002,Kt=1003,hu=1004;var Cr=1005;var Yt=1006,bs=1007;var Fn=1008;var bi=1009,rm=1010,sm=1011,Wa=1012,yf=1013,zr=1014,Bn=1015,Co=1016,vf=1017,_f=1018,Vr=1020,am=35902,om=1021,lm=1022,Pn=1023,cm=1024,um=1025,Nr=1026,Gr=1027,Mf=1028,Sf=1029,hm=1030,bf=1031,wf=1033,Ul=33776,Nl=33777,kl=33778,Fl=33779,Rh=35840,Ch=35841,Ph=35842,Ih=35843,Lh=36196,Dh=37492,Uh=37496,Nh=37808,kh=37809,Fh=37810,Bh=37811,Oh=37812,Hh=37813,zh=37814,Vh=37815,Gh=37816,Wh=37817,qh=37818,Xh=37819,$h=37820,Yh=37821,Bl=36492,Kh=36494,Zh=36495,dm=36283,Jh=36284,jh=36285,Qh=36286,du=2200,fu=2201,fm=2202,Wr=2300,qr=2301,Ol=2302,Pr=2400,Ir=2401,qa=2402,pu=2500,pm=2501,Ef=0,Po=1,qs=2,mm=3200,gm=3201,Tf=0,xm=1,yi="",wt="srgb",Wt="srgb-linear",mu="display-p3",Io="display-p3-linear",Xa="linear",mt="srgb",$a="rec709",Ya="p3";var or=7680;var ed=519,ym=512,vm=513,_m=514,Af=515,Mm=516,Sm=517,bm=518,wm=519,wc=35044,Rf=35048;var td="300 es",Jn=2e3,Ka=2001,Qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],nd=1234567,kr=Math.PI/180,Xr=180/Math.PI;function xn(){let r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[r&255]+Xt[r>>8&255]+Xt[r>>16&255]+Xt[r>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function Dt(r,e,t){return Math.max(e,Math.min(t,r))}function gu(r,e){return(r%e+e)%e}function Em(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Tm(r,e,t){return r!==e?(t-r)/(e-r):0}function ws(r,e,t){return(1-t)*r+t*e}function Am(r,e,t,n){return ws(r,e,1-Math.exp(-t*n))}function Rm(r,e=1){return e-Math.abs(gu(r,e*2)-e)}function Cm(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Pm(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Im(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Lm(r,e){return r+Math.random()*(e-r)}function Dm(r){return r*(.5-Math.random())}function Um(r){r!==void 0&&(nd=r);let e=nd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Nm(r){return r*kr}function km(r){return r*Xr}function Fm(r){return(r&r-1)===0&&r!==0}function Bm(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Om(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Hm(r,e,t,n,i){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":r.set(o*u,l*h,l*d,o*c);break;case"YZY":r.set(l*d,o*u,l*h,o*c);break;case"ZXZ":r.set(l*h,l*d,o*u,o*c);break;case"XZX":r.set(o*u,l*g,l*f,o*c);break;case"YXY":r.set(l*f,o*u,l*g,o*c);break;case"ZYZ":r.set(l*g,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Rn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function rt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var ai={DEG2RAD:kr,RAD2DEG:Xr,generateUUID:xn,clamp:Dt,euclideanModulo:gu,mapLinear:Em,inverseLerp:Tm,lerp:ws,damp:Am,pingpong:Rm,smoothstep:Cm,smootherstep:Pm,randInt:Im,randFloat:Lm,randFloatSpread:Dm,seededRandom:Um,degToRad:Nm,radToDeg:km,isPowerOfTwo:Fm,ceilPowerOfTwo:Bm,floorPowerOfTwo:Om,setQuaternionFromProperEuler:Hm,normalize:rt,denormalize:Rn},J=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},De=class r{constructor(e,t,n,i,s,a,o,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],x=i[0],p=i[3],m=i[6],v=i[1],y=i[4],_=i[7],I=i[2],E=i[5],R=i[8];return s[0]=a*x+o*v+l*I,s[3]=a*p+o*y+l*E,s[6]=a*m+o*_+l*R,s[1]=c*x+u*v+h*I,s[4]=c*p+u*y+h*E,s[7]=c*m+u*_+h*R,s[2]=d*x+f*v+g*I,s[5]=d*p+f*y+g*E,s[8]=d*m+f*_+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,f=c*s-a*l,g=t*h+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=h*x,e[1]=(i*c-u*n)*x,e[2]=(o*n-i*a)*x,e[3]=d*x,e[4]=(u*t-i*l)*x,e[5]=(i*s-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Hl.makeScale(e,t)),this}rotate(e){return this.premultiply(Hl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Hl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Hl=new De;function Cf(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Is(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function zm(){let r=Is("canvas");return r.style.display="block",r}var id={};function xu(r){r in id||(id[r]=!0,console.warn(r))}function Vm(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var rd=new De().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),sd=new De().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),aa={[Wt]:{transfer:Xa,primaries:$a,toReference:r=>r,fromReference:r=>r},[wt]:{transfer:mt,primaries:$a,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Io]:{transfer:Xa,primaries:Ya,toReference:r=>r.applyMatrix3(sd),fromReference:r=>r.applyMatrix3(rd)},[mu]:{transfer:mt,primaries:Ya,toReference:r=>r.convertSRGBToLinear().applyMatrix3(sd),fromReference:r=>r.applyMatrix3(rd).convertLinearToSRGB()}},Gm=new Set([Wt,Io]),Ze={enabled:!0,_workingColorSpace:Wt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Gm.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;let n=aa[e].toReference,i=aa[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return aa[r].primaries},getTransfer:function(r){return r===yi?Xa:aa[r].transfer}};function Fr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function zl(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var lr,Ec=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{lr===void 0&&(lr=Is("canvas")),lr.width=e.width,lr.height=e.height;let n=lr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=lr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Is("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Fr(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Fr(t[n]/255)*255):t[n]=Fr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Wm=0,Za=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wm++}),this.uuid=xn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Vl(i[a].image)):s.push(Vl(i[a]))}else s=Vl(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function Vl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ec.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var qm=0,Gt=class r extends Qn{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=Cn,i=Cn,s=Yt,a=Fn,o=Pn,l=bi,c=r.DEFAULT_ANISOTROPY,u=yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qm++}),this.uuid=xn(),this.name="",this.source=new Za(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new De,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jn:e.x=e.x-Math.floor(e.x);break;case Cn:e.x=e.x<0?0:1;break;case Ps:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jn:e.y=e.y-Math.floor(e.y);break;case Cn:e.y=e.y<0?0:1;break;case Ps:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=xf;Gt.DEFAULT_ANISOTROPY=1;var ht=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],g=l[9],x=l[2],p=l[6],m=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(c+1)/2,_=(f+1)/2,I=(m+1)/2,E=(u+d)/4,R=(h+x)/4,P=(g+p)/4;return y>_&&y>I?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=E/n,s=R/n):_>I?_<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(_),n=E/i,s=P/i):I<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(I),n=R/s,i=P/s),this.set(n,i,s,t),this}let v=Math.sqrt((p-g)*(p-g)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(p-g)/v,this.y=(h-x)/v,this.z=(d-u)/v,this.w=Math.acos((c+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Tc=class extends Qn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t);let i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new Gt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Za(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ei=class extends Tc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ja=class extends Gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ac=class extends Gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var It=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=s[a+0],f=s[a+1],g=s[a+2],x=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(h!==x||l!==d||c!==f||u!==g){let p=1-o,m=l*d+c*f+u*g+h*x,v=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){let I=Math.sqrt(y),E=Math.atan2(I,m*v);p=Math.sin(p*E)/I,o=Math.sin(o*E)/I}let _=o*v;if(l=l*p+d*_,c=c*p+f*_,u=u*p+g*_,h=h*p+x*_,p===1-o){let I=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=I,c*=I,u*=I,h*=I}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[a],d=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+u*h+l*f-c*d,e[t+1]=l*g+u*d+c*h-o*f,e[t+2]=c*g+u*f+o*d-l*h,e[t+3]=u*g-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),h=o(s/2),d=l(n/2),f=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"YZX":this._x=d*u*h+c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h-d*f*g;break;case"XZY":this._x=d*u*h-c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>h){let f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>h){let f=2*Math.sqrt(1+o-n-h);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+h-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Dt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},A=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ad.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ad.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-s*i),h=2*(s*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=i+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Gl.copy(this).projectOnVector(e),this.sub(Gl)}reflect(e){return this.sub(Gl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Gl=new A,ad=new It,kt=class{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,En):En.fromBufferAttribute(s,a),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),oa.copy(n.boundingBox)),oa.applyMatrix4(e.matrixWorld),this.union(oa)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hs),la.subVectors(this.max,hs),cr.subVectors(e.a,hs),ur.subVectors(e.b,hs),hr.subVectors(e.c,hs),di.subVectors(ur,cr),fi.subVectors(hr,ur),Vi.subVectors(cr,hr);let t=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Vi.z,Vi.y,di.z,0,-di.x,fi.z,0,-fi.x,Vi.z,0,-Vi.x,-di.y,di.x,0,-fi.y,fi.x,0,-Vi.y,Vi.x,0];return!Wl(t,cr,ur,hr,la)||(t=[1,0,0,0,1,0,0,0,1],!Wl(t,cr,ur,hr,la))?!1:(ca.crossVectors(di,fi),t=[ca.x,ca.y,ca.z],Wl(t,cr,ur,hr,la))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Gn=[new A,new A,new A,new A,new A,new A,new A,new A],En=new A,oa=new kt,cr=new A,ur=new A,hr=new A,di=new A,fi=new A,Vi=new A,hs=new A,la=new A,ca=new A,Gi=new A;function Wl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Gi.fromArray(r,s);let o=i.x*Math.abs(Gi.x)+i.y*Math.abs(Gi.y)+i.z*Math.abs(Gi.z),l=e.dot(Gi),c=t.dot(Gi),u=n.dot(Gi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Xm=new kt,ds=new A,ql=new A,cn=class{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Xm.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ds.subVectors(e,this.center);let t=ds.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ds,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ql.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ds.copy(e.center).add(ql)),this.expandByPoint(ds.copy(e.center).sub(ql))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Wn=new A,Xl=new A,ua=new A,pi=new A,$l=new A,ha=new A,Yl=new A,$r=class{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wn.copy(this.origin).addScaledVector(this.direction,t),Wn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Xl.copy(e).add(t).multiplyScalar(.5),ua.copy(t).sub(e).normalize(),pi.copy(this.origin).sub(Xl);let s=e.distanceTo(t)*.5,a=-this.direction.dot(ua),o=pi.dot(this.direction),l=-pi.dot(ua),c=pi.lengthSq(),u=Math.abs(1-a*a),h,d,f,g;if(u>0)if(h=a*l-o,d=a*o-l,g=s*u,h>=0)if(d>=-g)if(d<=g){let x=1/u;h*=x,d*=x,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Xl).addScaledVector(ua,d),f}intersectSphere(e,t){Wn.subVectors(e.center,this.origin);let n=Wn.dot(this.direction),i=Wn.dot(Wn)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Wn)!==null}intersectTriangle(e,t,n,i,s){$l.subVectors(t,e),ha.subVectors(n,e),Yl.crossVectors($l,ha);let a=this.direction.dot(Yl),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;pi.subVectors(this.origin,e);let l=o*this.direction.dot(ha.crossVectors(pi,ha));if(l<0)return null;let c=o*this.direction.dot($l.cross(pi));if(c<0||l+c>a)return null;let u=-o*pi.dot(Yl);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ce=class r{constructor(e,t,n,i,s,a,o,l,c,u,h,d,f,g,x,p){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,u,h,d,f,g,x,p)}set(e,t,n,i,s,a,o,l,c,u,h,d,f,g,x,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=g,m[11]=x,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/dr.setFromMatrixColumn(e,0).length(),s=1/dr.setFromMatrixColumn(e,1).length(),a=1/dr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let d=a*u,f=a*h,g=o*u,x=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*u,f=l*h,g=c*u,x=c*h;t[0]=d+x*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*u,f=l*h,g=c*u,x=c*h;t[0]=d-x*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*u,f=a*h,g=o*u,x=o*h;t[0]=l*u,t[4]=g*c-f,t[8]=d*c+x,t[1]=l*h,t[5]=x*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=x-d*h,t[8]=g*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+g,t[10]=d-x*h}else if(e.order==="XZY"){let d=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=a*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($m,e,Ym)}lookAt(e,t,n){let i=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),mi.crossVectors(n,on),mi.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),mi.crossVectors(n,on)),mi.normalize(),da.crossVectors(on,mi),i[0]=mi.x,i[4]=da.x,i[8]=on.x,i[1]=mi.y,i[5]=da.y,i[9]=on.y,i[2]=mi.z,i[6]=da.z,i[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],x=n[6],p=n[10],m=n[14],v=n[3],y=n[7],_=n[11],I=n[15],E=i[0],R=i[4],P=i[8],S=i[12],M=i[1],T=i[5],U=i[9],k=i[13],H=i[2],V=i[6],G=i[10],Q=i[14],W=i[3],ue=i[7],fe=i[11],me=i[15];return s[0]=a*E+o*M+l*H+c*W,s[4]=a*R+o*T+l*V+c*ue,s[8]=a*P+o*U+l*G+c*fe,s[12]=a*S+o*k+l*Q+c*me,s[1]=u*E+h*M+d*H+f*W,s[5]=u*R+h*T+d*V+f*ue,s[9]=u*P+h*U+d*G+f*fe,s[13]=u*S+h*k+d*Q+f*me,s[2]=g*E+x*M+p*H+m*W,s[6]=g*R+x*T+p*V+m*ue,s[10]=g*P+x*U+p*G+m*fe,s[14]=g*S+x*k+p*Q+m*me,s[3]=v*E+y*M+_*H+I*W,s[7]=v*R+y*T+_*V+I*ue,s[11]=v*P+y*U+_*G+I*fe,s[15]=v*S+y*k+_*Q+I*me,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],x=e[7],p=e[11],m=e[15];return g*(+s*l*h-i*c*h-s*o*d+n*c*d+i*o*f-n*l*f)+x*(+t*l*f-t*c*d+s*a*d-i*a*f+i*c*u-s*l*u)+p*(+t*c*h-t*o*f-s*a*h+n*a*f+s*o*u-n*c*u)+m*(-i*o*u-t*l*h+t*o*d+i*a*h-n*a*d+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],x=e[13],p=e[14],m=e[15],v=h*p*c-x*d*c+x*l*f-o*p*f-h*l*m+o*d*m,y=g*d*c-u*p*c-g*l*f+a*p*f+u*l*m-a*d*m,_=u*x*c-g*h*c+g*o*f-a*x*f-u*o*m+a*h*m,I=g*h*l-u*x*l-g*o*d+a*x*d+u*o*p-a*h*p,E=t*v+n*y+i*_+s*I;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/E;return e[0]=v*R,e[1]=(x*d*s-h*p*s-x*i*f+n*p*f+h*i*m-n*d*m)*R,e[2]=(o*p*s-x*l*s+x*i*c-n*p*c-o*i*m+n*l*m)*R,e[3]=(h*l*s-o*d*s-h*i*c+n*d*c+o*i*f-n*l*f)*R,e[4]=y*R,e[5]=(u*p*s-g*d*s+g*i*f-t*p*f-u*i*m+t*d*m)*R,e[6]=(g*l*s-a*p*s-g*i*c+t*p*c+a*i*m-t*l*m)*R,e[7]=(a*d*s-u*l*s+u*i*c-t*d*c-a*i*f+t*l*f)*R,e[8]=_*R,e[9]=(g*h*s-u*x*s-g*n*f+t*x*f+u*n*m-t*h*m)*R,e[10]=(a*x*s-g*o*s+g*n*c-t*x*c-a*n*m+t*o*m)*R,e[11]=(u*o*s-a*h*s-u*n*c+t*h*c+a*n*f-t*o*f)*R,e[12]=I*R,e[13]=(u*x*i-g*h*i+g*n*d-t*x*d-u*n*p+t*h*p)*R,e[14]=(g*o*i-a*x*i-g*n*l+t*x*l+a*n*p-t*o*p)*R,e[15]=(a*h*i-u*o*i+u*n*l-t*h*l-a*n*d+t*o*d)*R,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,f=s*u,g=s*h,x=a*u,p=a*h,m=o*h,v=l*c,y=l*u,_=l*h,I=n.x,E=n.y,R=n.z;return i[0]=(1-(x+m))*I,i[1]=(f+_)*I,i[2]=(g-y)*I,i[3]=0,i[4]=(f-_)*E,i[5]=(1-(d+m))*E,i[6]=(p+v)*E,i[7]=0,i[8]=(g+y)*R,i[9]=(p-v)*R,i[10]=(1-(d+x))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=dr.set(i[0],i[1],i[2]).length(),a=dr.set(i[4],i[5],i[6]).length(),o=dr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Tn.copy(this);let c=1/s,u=1/a,h=1/o;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=u,Tn.elements[5]*=u,Tn.elements[6]*=u,Tn.elements[8]*=h,Tn.elements[9]*=h,Tn.elements[10]*=h,t.setFromRotationMatrix(Tn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=Jn){let l=this.elements,c=2*s/(t-e),u=2*s/(n-i),h=(t+e)/(t-e),d=(n+i)/(n-i),f,g;if(o===Jn)f=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===Ka)f=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Jn){let l=this.elements,c=1/(t-e),u=1/(n-i),h=1/(a-s),d=(t+e)*c,f=(n+i)*u,g,x;if(o===Jn)g=(a+s)*h,x=-2*h;else if(o===Ka)g=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},dr=new A,Tn=new Ce,$m=new A(0,0,0),Ym=new A(1,1,1),mi=new A,da=new A,on=new A,od=new Ce,ld=new It,yn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Dt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Dt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Dt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return od.makeRotationFromQuaternion(e),this.setFromRotationMatrix(od,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ld.setFromEuler(this),this.setFromQuaternion(ld,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};yn.DEFAULT_ORDER="XYZ";var ja=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Km=0,cd=new A,fr=new It,qn=new Ce,fa=new A,fs=new A,Zm=new A,Jm=new It,ud=new A(1,0,0),hd=new A(0,1,0),dd=new A(0,0,1),fd={type:"added"},jm={type:"removed"},pr={type:"childadded",child:null},Kl={type:"childremoved",child:null},Je=class r extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new A,t=new yn,n=new It,i=new A(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ce},normalMatrix:{value:new De}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ja,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fr.setFromAxisAngle(e,t),this.quaternion.multiply(fr),this}rotateOnWorldAxis(e,t){return fr.setFromAxisAngle(e,t),this.quaternion.premultiply(fr),this}rotateX(e){return this.rotateOnAxis(ud,e)}rotateY(e){return this.rotateOnAxis(hd,e)}rotateZ(e){return this.rotateOnAxis(dd,e)}translateOnAxis(e,t){return cd.copy(e).applyQuaternion(this.quaternion),this.position.add(cd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ud,e)}translateY(e){return this.translateOnAxis(hd,e)}translateZ(e){return this.translateOnAxis(dd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?fa.copy(e):fa.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),fs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(fs,fa,this.up):qn.lookAt(fa,fs,this.up),this.quaternion.setFromRotationMatrix(qn),i&&(qn.extractRotation(i.matrixWorld),fr.setFromRotationMatrix(qn),this.quaternion.premultiply(fr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fd),pr.child=e,this.dispatchEvent(pr),pr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jm),Kl.child=e,this.dispatchEvent(Kl),Kl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fd),pr.child=e,this.dispatchEvent(pr),pr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fs,e,Zm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fs,Jm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++){let o=i[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Je.DEFAULT_UP=new A(0,1,0);Je.DEFAULT_MATRIX_AUTO_UPDATE=!0;Je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var An=new A,Xn=new A,Zl=new A,$n=new A,mr=new A,gr=new A,pd=new A,Jl=new A,jl=new A,Ql=new A,vi=class r{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),An.subVectors(e,t),i.cross(An);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){An.subVectors(i,t),Xn.subVectors(n,t),Zl.subVectors(e,t);let a=An.dot(An),o=An.dot(Xn),l=An.dot(Zl),c=Xn.dot(Xn),u=Xn.dot(Zl),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;let d=1/h,f=(c*l-o*u)*d,g=(a*u-o*l)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,$n.x),l.addScaledVector(a,$n.y),l.addScaledVector(o,$n.z),l)}static isFrontFacing(e,t,n,i){return An.subVectors(n,t),Xn.subVectors(e,t),An.cross(Xn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),An.cross(Xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;mr.subVectors(i,n),gr.subVectors(s,n),Jl.subVectors(e,n);let l=mr.dot(Jl),c=gr.dot(Jl);if(l<=0&&c<=0)return t.copy(n);jl.subVectors(e,i);let u=mr.dot(jl),h=gr.dot(jl);if(u>=0&&h<=u)return t.copy(i);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(mr,a);Ql.subVectors(e,s);let f=mr.dot(Ql),g=gr.dot(Ql);if(g>=0&&f<=g)return t.copy(s);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(gr,o);let p=u*g-f*h;if(p<=0&&h-u>=0&&f-g>=0)return pd.subVectors(s,i),o=(h-u)/(h-u+(f-g)),t.copy(i).addScaledVector(pd,o);let m=1/(p+x+d);return a=x*m,o=d*m,t.copy(n).addScaledVector(mr,a).addScaledVector(gr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Pf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},pa={h:0,s:0,l:0};function ec(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}var xe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ze.workingColorSpace){if(e=gu(e,1),t=Dt(t,0,1),n=Dt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ec(a,s,e+1/3),this.g=ec(a,s,e),this.b=ec(a,s,e-1/3)}return Ze.toWorkingColorSpace(this,i),this}setStyle(e,t=wt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){let n=Pf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fr(e.r),this.g=Fr(e.g),this.b=Fr(e.b),this}copyLinearToSRGB(e){return this.r=zl(e.r),this.g=zl(e.g),this.b=zl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return Ze.fromWorkingColorSpace($t.copy(this),e),Math.round(Dt($t.r*255,0,255))*65536+Math.round(Dt($t.g*255,0,255))*256+Math.round(Dt($t.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.fromWorkingColorSpace($t.copy(this),t);let n=$t.r,i=$t.g,s=$t.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ze.workingColorSpace){return Ze.fromWorkingColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=wt){Ze.fromWorkingColorSpace($t.copy(this),e);let t=$t.r,n=$t.g,i=$t.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(pa);let n=ws(gi.h,pa.h,t),i=ws(gi.s,pa.s,t),s=ws(gi.l,pa.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new xe;xe.NAMES=Pf;var Qm=0,nn=class extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=xn(),this.name="",this.type="Material",this.blending=Ur,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_c,this.blendDst=Mc,this.blendEquation=Ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=Ga,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ed,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=or,this.stencilZFail=or,this.stencilZPass=or,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ur&&(n.blending=this.blending),this.side!==On&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==_c&&(n.blendSrc=this.blendSrc),this.blendDst!==Mc&&(n.blendDst=this.blendDst),this.blendEquation!==Ki&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ga&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ed&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==or&&(n.stencilFail=this.stencilFail),this.stencilZFail!==or&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==or&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},dt=class extends nn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=gf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Pt=new A,ma=new J,Lt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=wc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return xu("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ma.fromBufferAttribute(this,t),ma.applyMatrix3(e),this.setXY(t,ma.x,ma.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Rn(t,this.array)),t}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Rn(t,this.array)),t}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Rn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Rn(t,this.array)),t}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),i=rt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),i=rt(i,this.array),s=rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wc&&(e.usage=this.usage),e}};var Qa=class extends Lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var eo=class extends Lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Oe=class extends Lt{constructor(e,t,n){super(new Float32Array(e),t,n)}},eg=0,gn=new Ce,tc=new Je,xr=new A,ln=new kt,ps=new kt,zt=new A,gt=class r extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:eg++}),this.uuid=xn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cf(e)?eo:Qa)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new De().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,n){return gn.makeTranslation(e,t,n),this.applyMatrix4(gn),this}scale(e,t,n){return gn.makeScale(e,t,n),this.applyMatrix4(gn),this}lookAt(e){return tc.lookAt(e),tc.updateMatrix(),this.applyMatrix4(tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xr).negate(),this.translate(xr.x,xr.y,xr.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Oe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];ln.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){let n=this.boundingSphere.center;if(ln.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];ps.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(ln.min,ps.min),ln.expandByPoint(zt),zt.addVectors(ln.max,ps.max),ln.expandByPoint(zt)):(ln.expandByPoint(ps.min),ln.expandByPoint(ps.max))}ln.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)zt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(zt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)zt.fromBufferAttribute(o,c),l&&(xr.fromBufferAttribute(e,c),zt.add(xr)),i=Math.max(i,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Lt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<n.count;P++)o[P]=new A,l[P]=new A;let c=new A,u=new A,h=new A,d=new J,f=new J,g=new J,x=new A,p=new A;function m(P,S,M){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,M),d.fromBufferAttribute(s,P),f.fromBufferAttribute(s,S),g.fromBufferAttribute(s,M),u.sub(c),h.sub(c),f.sub(d),g.sub(d);let T=1/(f.x*g.y-g.x*f.y);isFinite(T)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(T),p.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(T),o[P].add(x),o[S].add(x),o[M].add(x),l[P].add(p),l[S].add(p),l[M].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let P=0,S=v.length;P<S;++P){let M=v[P],T=M.start,U=M.count;for(let k=T,H=T+U;k<H;k+=3)m(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let y=new A,_=new A,I=new A,E=new A;function R(P){I.fromBufferAttribute(i,P),E.copy(I);let S=o[P];y.copy(S),y.sub(I.multiplyScalar(I.dot(S))).normalize(),_.crossVectors(E,S);let T=_.dot(l[P])<0?-1:1;a.setXYZW(P,y.x,y.y,y.z,T)}for(let P=0,S=v.length;P<S;++P){let M=v[P],T=M.start,U=M.count;for(let k=T,H=T+U;k<H;k+=3)R(e.getX(k+0)),R(e.getX(k+1)),R(e.getX(k+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new A,s=new A,a=new A,o=new A,l=new A,c=new A,u=new A,h=new A;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),x=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,p),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u),f=0,g=0;for(let x=0,p=l.length;x<p;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*u;for(let m=0;m<u;m++)d[g++]=c[f++]}return new Lt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let c in i){let u=i[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},md=new Ce,Wi=new $r,ga=new cn,gd=new A,yr=new A,vr=new A,_r=new A,nc=new A,xa=new A,ya=new J,va=new J,_a=new J,xd=new A,yd=new A,vd=new A,Ma=new A,Sa=new A,Re=class extends Je{constructor(e=new gt,t=new dt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){xa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],h=s[l];u!==0&&(nc.fromBufferAttribute(h,e),a?xa.addScaledVector(nc,u):xa.addScaledVector(nc.sub(t),u))}t.add(xa)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ga.copy(n.boundingSphere),ga.applyMatrix4(s),Wi.copy(e.ray).recast(e.near),!(ga.containsPoint(Wi.origin)===!1&&(Wi.intersectSphere(ga,gd)===null||Wi.origin.distanceToSquared(gd)>(e.far-e.near)**2))&&(md.copy(s).invert(),Wi.copy(e.ray).applyMatrix4(md),!(n.boundingBox!==null&&Wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wi)))}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let p=d[g],m=a[p.materialIndex],v=Math.max(p.start,f.start),y=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let _=v,I=y;_<I;_+=3){let E=o.getX(_),R=o.getX(_+1),P=o.getX(_+2);i=ba(this,m,e,n,c,u,h,E,R,P),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let v=o.getX(p),y=o.getX(p+1),_=o.getX(p+2);i=ba(this,a,e,n,c,u,h,v,y,_),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let p=d[g],m=a[p.materialIndex],v=Math.max(p.start,f.start),y=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let _=v,I=y;_<I;_+=3){let E=_,R=_+1,P=_+2;i=ba(this,m,e,n,c,u,h,E,R,P),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let v=p,y=p+1,_=p+2;i=ba(this,a,e,n,c,u,h,v,y,_),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}};function tg(r,e,t,n,i,s,a,o){let l;if(e.side===Vt?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===On,o),l===null)return null;Sa.copy(o),Sa.applyMatrix4(r.matrixWorld);let c=t.ray.origin.distanceTo(Sa);return c<t.near||c>t.far?null:{distance:c,point:Sa.clone(),object:r}}function ba(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,yr),r.getVertexPosition(l,vr),r.getVertexPosition(c,_r);let u=tg(r,e,t,n,yr,vr,_r,Ma);if(u){i&&(ya.fromBufferAttribute(i,o),va.fromBufferAttribute(i,l),_a.fromBufferAttribute(i,c),u.uv=vi.getInterpolation(Ma,yr,vr,_r,ya,va,_a,new J)),s&&(ya.fromBufferAttribute(s,o),va.fromBufferAttribute(s,l),_a.fromBufferAttribute(s,c),u.uv1=vi.getInterpolation(Ma,yr,vr,_r,ya,va,_a,new J)),a&&(xd.fromBufferAttribute(a,o),yd.fromBufferAttribute(a,l),vd.fromBufferAttribute(a,c),u.normal=vi.getInterpolation(Ma,yr,vr,_r,xd,yd,vd,new A),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new A,materialIndex:0};vi.getNormal(yr,vr,_r,h.normal),u.face=h}return u}var In=class r extends gt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],u=[],h=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Oe(c,3)),this.setAttribute("normal",new Oe(u,3)),this.setAttribute("uv",new Oe(h,2));function g(x,p,m,v,y,_,I,E,R,P,S){let M=_/R,T=I/P,U=_/2,k=I/2,H=E/2,V=R+1,G=P+1,Q=0,W=0,ue=new A;for(let fe=0;fe<G;fe++){let me=fe*T-k;for(let qe=0;qe<V;qe++){let at=qe*M-U;ue[x]=at*v,ue[p]=me*y,ue[m]=H,c.push(ue.x,ue.y,ue.z),ue[x]=0,ue[p]=0,ue[m]=E>0?1:-1,u.push(ue.x,ue.y,ue.z),h.push(qe/R),h.push(1-fe/P),Q+=1}}for(let fe=0;fe<P;fe++)for(let me=0;me<R;me++){let qe=d+me+V*fe,at=d+me+V*(fe+1),X=d+(me+1)+V*(fe+1),j=d+(me+1)+V*fe;l.push(qe,at,j),l.push(at,X,j),W+=6}o.addGroup(f,W,S),f+=W,d+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Yr(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function en(r){let e={};for(let t=0;t<r.length;t++){let n=Yr(r[t]);for(let i in n)e[i]=n[i]}return e}function ng(r){let e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function If(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}var ig={clone:Yr,merge:en},rg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,rn=class extends nn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rg,this.fragmentShader=sg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yr(e.uniforms),this.uniformsGroups=ng(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},to=class extends Je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce,this.coordinateSystem=Jn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},xi=new A,_d=new J,Md=new J,Ut=class extends to{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Xr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(kr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xr*2*Math.atan(Math.tan(kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xi.x,xi.y).multiplyScalar(-e/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xi.x,xi.y).multiplyScalar(-e/xi.z)}getViewSize(e,t){return this.getViewBounds(e,_d,Md),t.subVectors(Md,_d)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(kr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Mr=-90,Sr=1,Rc=class extends Je{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Ut(Mr,Sr,e,t);i.layers=this.layers,this.add(i);let s=new Ut(Mr,Sr,e,t);s.layers=this.layers,this.add(s);let a=new Ut(Mr,Sr,e,t);a.layers=this.layers,this.add(a);let o=new Ut(Mr,Sr,e,t);o.layers=this.layers,this.add(o);let l=new Ut(Mr,Sr,e,t);l.layers=this.layers,this.add(l);let c=new Ut(Mr,Sr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===Jn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ka)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},no=class extends Gt{constructor(e,t,n,i,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Or,super(e,t,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Cc=class extends ei{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new no(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Yt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new In(5,5,5),s=new rn({name:"CubemapFromEquirect",uniforms:Yr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:Mi});s.uniforms.tEquirect.value=t;let a=new Re(i,s),o=t.minFilter;return t.minFilter===Fn&&(t.minFilter=Yt),new Rc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},ic=new A,ag=new A,og=new De,Zn=class{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=ic.subVectors(n,t).cross(ag.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(ic),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||og.getNormalMatrix(e),i=this.coplanarPoint(ic).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},qi=new cn,wa=new A,Ls=class{constructor(e=new Zn,t=new Zn,n=new Zn,i=new Zn,s=new Zn,a=new Zn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Jn){let n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],u=i[5],h=i[6],d=i[7],f=i[8],g=i[9],x=i[10],p=i[11],m=i[12],v=i[13],y=i[14],_=i[15];if(n[0].setComponents(l-s,d-c,p-f,_-m).normalize(),n[1].setComponents(l+s,d+c,p+f,_+m).normalize(),n[2].setComponents(l+a,d+u,p+g,_+v).normalize(),n[3].setComponents(l-a,d-u,p-g,_-v).normalize(),n[4].setComponents(l-o,d-h,p-x,_-y).normalize(),t===Jn)n[5].setComponents(l+o,d+h,p+x,_+y).normalize();else if(t===Ka)n[5].setComponents(o,h,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(e){return qi.center.set(0,0,0),qi.radius=.7071067811865476,qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(wa.x=i.normal.x>0?e.max.x:e.min.x,wa.y=i.normal.y>0?e.max.y:e.min.y,wa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(wa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Lf(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function lg(r){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,h=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){let u=l.array,h=l._updateRange,d=l.updateRanges;if(r.bindBuffer(c,o),h.count===-1&&d.length===0&&r.bufferSubData(c,0,u),d.length!==0){for(let f=0,g=d.length;f<g;f++){let x=d[f];r.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}h.count!==-1&&(r.bufferSubData(c,h.offset*u.BYTES_PER_ELEMENT,u,h.offset,h.count),h.count=-1),l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var un=class r extends gt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,h=e/o,d=t/l,f=[],g=[],x=[],p=[];for(let m=0;m<u;m++){let v=m*d-a;for(let y=0;y<c;y++){let _=y*h-s;g.push(_,-v,0),x.push(0,0,1),p.push(y/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<o;v++){let y=v+c*m,_=v+c*(m+1),I=v+1+c*(m+1),E=v+1+c*m;f.push(y,_,E),f.push(_,I,E)}this.setIndex(f),this.setAttribute("position",new Oe(g,3)),this.setAttribute("normal",new Oe(x,3)),this.setAttribute("uv",new Oe(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},cg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ug=`#ifdef USE_ALPHAHASH
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
#endif`,hg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mg=`#ifdef USE_AOMAP
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
#endif`,gg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xg=`#ifdef USE_BATCHING
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
#endif`,yg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,vg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_g=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Mg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Sg=`#ifdef USE_IRIDESCENCE
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
#endif`,bg=`#ifdef USE_BUMPMAP
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
#endif`,wg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ag=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Pg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ig=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Lg=`#define PI 3.141592653589793
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
} // validated`,Dg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ug=`vec3 transformedNormal = objectNormal;
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
#endif`,Ng=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Fg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Og="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hg=`
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
}`,zg=`#ifdef USE_ENVMAP
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
#endif`,Vg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif

#endif`,Gg=`#ifdef USE_ENVMAP
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
#endif`,Wg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qg=`#ifdef USE_ENVMAP
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
#endif`,Xg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$g=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zg=`#ifdef USE_GRADIENTMAP
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
}`,Jg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ex=`uniform bool receiveShadow;
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
#endif`,tx=`#ifdef USE_ENVMAP
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
#endif`,nx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ix=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ax=`PhysicalMaterial material;
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
#endif`,ox=`struct PhysicalMaterial {
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
}`,lx=`
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
#endif`,cx=`#if defined( RE_IndirectDiffuse )
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
#endif`,ux=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dx=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,px=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );

	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,yx=`#if defined( USE_POINTS_UV )
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
#endif`,vx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_x=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wx=`#ifdef USE_MORPHTARGETS
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
#endif`,Ex=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ax=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Rx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Px=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ix=`#ifdef USE_NORMALMAP
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
#endif`,Lx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ux=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Nx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Fx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Bx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ox=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$x=`float getShadowMask() {
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
}`,Yx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kx=`#ifdef USE_SKINNING
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
#endif`,Zx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jx=`#ifdef USE_SKINNING
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
#endif`,jx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,e0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,t0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,n0=`#ifdef USE_TRANSMISSION
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
#endif`,i0=`#ifdef USE_TRANSMISSION
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
#endif`,r0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,s0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,a0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,o0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,l0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,c0=`uniform sampler2D t2D;
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
}`,u0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,d0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,f0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p0=`#include <common>
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
}`,m0=`#if DEPTH_PACKING == 3200
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
}`,g0=`#define DISTANCE
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
}`,x0=`#define DISTANCE
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
}`,y0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,v0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_0=`uniform float scale;
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
}`,M0=`uniform vec3 diffuse;
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
}`,S0=`#include <common>
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
}`,b0=`uniform vec3 diffuse;
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
}`,w0=`#define LAMBERT
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
}`,E0=`#define LAMBERT
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
}`,T0=`#define MATCAP
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
}`,A0=`#define MATCAP
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
}`,R0=`#define NORMAL
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
}`,C0=`#define NORMAL
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
}`,P0=`#define PHONG
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
}`,I0=`#define PHONG
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
}`,L0=`#define STANDARD
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
}`,D0=`#define STANDARD
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
}`,U0=`#define TOON
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
}`,N0=`#define TOON
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
}`,k0=`uniform float size;
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
}`,F0=`uniform vec3 diffuse;
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
}`,B0=`#include <common>
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
}`,O0=`uniform vec3 color;
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
}`,H0=`uniform float rotation;
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
}`,z0=`uniform vec3 diffuse;
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
}`,Le={alphahash_fragment:cg,alphahash_pars_fragment:ug,alphamap_fragment:hg,alphamap_pars_fragment:dg,alphatest_fragment:fg,alphatest_pars_fragment:pg,aomap_fragment:mg,aomap_pars_fragment:gg,batching_pars_vertex:xg,batching_vertex:yg,begin_vertex:vg,beginnormal_vertex:_g,bsdfs:Mg,iridescence_fragment:Sg,bumpmap_pars_fragment:bg,clipping_planes_fragment:wg,clipping_planes_pars_fragment:Eg,clipping_planes_pars_vertex:Tg,clipping_planes_vertex:Ag,color_fragment:Rg,color_pars_fragment:Cg,color_pars_vertex:Pg,color_vertex:Ig,common:Lg,cube_uv_reflection_fragment:Dg,defaultnormal_vertex:Ug,displacementmap_pars_vertex:Ng,displacementmap_vertex:kg,emissivemap_fragment:Fg,emissivemap_pars_fragment:Bg,colorspace_fragment:Og,colorspace_pars_fragment:Hg,envmap_fragment:zg,envmap_common_pars_fragment:Vg,envmap_pars_fragment:Gg,envmap_pars_vertex:Wg,envmap_physical_pars_fragment:tx,envmap_vertex:qg,fog_vertex:Xg,fog_pars_vertex:$g,fog_fragment:Yg,fog_pars_fragment:Kg,gradientmap_pars_fragment:Zg,lightmap_pars_fragment:Jg,lights_lambert_fragment:jg,lights_lambert_pars_fragment:Qg,lights_pars_begin:ex,lights_toon_fragment:nx,lights_toon_pars_fragment:ix,lights_phong_fragment:rx,lights_phong_pars_fragment:sx,lights_physical_fragment:ax,lights_physical_pars_fragment:ox,lights_fragment_begin:lx,lights_fragment_maps:cx,lights_fragment_end:ux,logdepthbuf_fragment:hx,logdepthbuf_pars_fragment:dx,logdepthbuf_pars_vertex:fx,logdepthbuf_vertex:px,map_fragment:mx,map_pars_fragment:gx,map_particle_fragment:xx,map_particle_pars_fragment:yx,metalnessmap_fragment:vx,metalnessmap_pars_fragment:_x,morphinstance_vertex:Mx,morphcolor_vertex:Sx,morphnormal_vertex:bx,morphtarget_pars_vertex:wx,morphtarget_vertex:Ex,normal_fragment_begin:Tx,normal_fragment_maps:Ax,normal_pars_fragment:Rx,normal_pars_vertex:Cx,normal_vertex:Px,normalmap_pars_fragment:Ix,clearcoat_normal_fragment_begin:Lx,clearcoat_normal_fragment_maps:Dx,clearcoat_pars_fragment:Ux,iridescence_pars_fragment:Nx,opaque_fragment:kx,packing:Fx,premultiplied_alpha_fragment:Bx,project_vertex:Ox,dithering_fragment:Hx,dithering_pars_fragment:zx,roughnessmap_fragment:Vx,roughnessmap_pars_fragment:Gx,shadowmap_pars_fragment:Wx,shadowmap_pars_vertex:qx,shadowmap_vertex:Xx,shadowmask_pars_fragment:$x,skinbase_vertex:Yx,skinning_pars_vertex:Kx,skinning_vertex:Zx,skinnormal_vertex:Jx,specularmap_fragment:jx,specularmap_pars_fragment:Qx,tonemapping_fragment:e0,tonemapping_pars_fragment:t0,transmission_fragment:n0,transmission_pars_fragment:i0,uv_pars_fragment:r0,uv_pars_vertex:s0,uv_vertex:a0,worldpos_vertex:o0,background_vert:l0,background_frag:c0,backgroundCube_vert:u0,backgroundCube_frag:h0,cube_vert:d0,cube_frag:f0,depth_vert:p0,depth_frag:m0,distanceRGBA_vert:g0,distanceRGBA_frag:x0,equirect_vert:y0,equirect_frag:v0,linedashed_vert:_0,linedashed_frag:M0,meshbasic_vert:S0,meshbasic_frag:b0,meshlambert_vert:w0,meshlambert_frag:E0,meshmatcap_vert:T0,meshmatcap_frag:A0,meshnormal_vert:R0,meshnormal_frag:C0,meshphong_vert:P0,meshphong_frag:I0,meshphysical_vert:L0,meshphysical_frag:D0,meshtoon_vert:U0,meshtoon_frag:N0,points_vert:k0,points_frag:F0,shadow_vert:B0,shadow_frag:O0,sprite_vert:H0,sprite_frag:z0},ie={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new De}},envmap:{envMap:{value:null},envMapRotation:{value:new De},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new De}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new De}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new De},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new De},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new De},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new De}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new De}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new De}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0},uvTransform:{value:new De}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}}},kn={basic:{uniforms:en([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Le.meshbasic_vert,fragmentShader:Le.meshbasic_frag},lambert:{uniforms:en([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new xe(0)}}]),vertexShader:Le.meshlambert_vert,fragmentShader:Le.meshlambert_frag},phong:{uniforms:en([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:Le.meshphong_vert,fragmentShader:Le.meshphong_frag},standard:{uniforms:en([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Le.meshphysical_vert,fragmentShader:Le.meshphysical_frag},toon:{uniforms:en([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new xe(0)}}]),vertexShader:Le.meshtoon_vert,fragmentShader:Le.meshtoon_frag},matcap:{uniforms:en([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Le.meshmatcap_vert,fragmentShader:Le.meshmatcap_frag},points:{uniforms:en([ie.points,ie.fog]),vertexShader:Le.points_vert,fragmentShader:Le.points_frag},dashed:{uniforms:en([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Le.linedashed_vert,fragmentShader:Le.linedashed_frag},depth:{uniforms:en([ie.common,ie.displacementmap]),vertexShader:Le.depth_vert,fragmentShader:Le.depth_frag},normal:{uniforms:en([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Le.meshnormal_vert,fragmentShader:Le.meshnormal_frag},sprite:{uniforms:en([ie.sprite,ie.fog]),vertexShader:Le.sprite_vert,fragmentShader:Le.sprite_frag},background:{uniforms:{uvTransform:{value:new De},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Le.background_vert,fragmentShader:Le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new De}},vertexShader:Le.backgroundCube_vert,fragmentShader:Le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Le.cube_vert,fragmentShader:Le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Le.equirect_vert,fragmentShader:Le.equirect_frag},distanceRGBA:{uniforms:en([ie.common,ie.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Le.distanceRGBA_vert,fragmentShader:Le.distanceRGBA_frag},shadow:{uniforms:en([ie.lights,ie.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:Le.shadow_vert,fragmentShader:Le.shadow_frag}};kn.physical={uniforms:en([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new De},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new De},clearcoatNormalScale:{value:new J(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new De},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new De},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new De},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new De},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new De},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new De},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new De},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new De},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new De},anisotropyVector:{value:new J},anisotropyMap:{value:null},anisotropyMapTransform:{value:new De}}]),vertexShader:Le.meshphysical_vert,fragmentShader:Le.meshphysical_frag};var Ea={r:0,b:0,g:0},Xi=new yn,V0=new Ce;function G0(r,e,t,n,i,s,a){let o=new xe(0),l=s===!0?0:1,c,u,h=null,d=0,f=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?t:e).get(y)),y}function x(v){let y=!1,_=g(v);_===null?m(o,l):_&&_.isColor&&(m(_,1),y=!0);let I=r.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(v,y){let _=g(y);_&&(_.isCubeTexture||_.mapping===Ro)?(u===void 0&&(u=new Re(new In(1,1,1),new rn({name:"BackgroundCubeMaterial",uniforms:Yr(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(I,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Xi.copy(y.backgroundRotation),Xi.x*=-1,Xi.y*=-1,Xi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Xi.y*=-1,Xi.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(V0.makeRotationFromEuler(Xi)),u.material.toneMapped=Ze.getTransfer(_.colorSpace)!==mt,(h!==_||d!==_.version||f!==r.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=r.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Re(new un(2,2),new rn({name:"BackgroundMaterial",uniforms:Yr(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(_.colorSpace)!==mt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,f=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,y){v.getRGB(Ea,If(r)),n.buffers.color.setClear(Ea.r,Ea.g,Ea.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(v,y=1){o.set(v),l=y,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,m(o,l)},render:x,addToRenderList:p}}function W0(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null),s=i,a=!1;function o(M,T,U,k,H){let V=!1,G=h(k,U,T);s!==G&&(s=G,c(s.object)),V=f(M,k,U,H),V&&g(M,k,U,H),H!==null&&e.update(H,r.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,_(M,T,U,k),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function u(M){return r.deleteVertexArray(M)}function h(M,T,U){let k=U.wireframe===!0,H=n[M.id];H===void 0&&(H={},n[M.id]=H);let V=H[T.id];V===void 0&&(V={},H[T.id]=V);let G=V[k];return G===void 0&&(G=d(l()),V[k]=G),G}function d(M){let T=[],U=[],k=[];for(let H=0;H<t;H++)T[H]=0,U[H]=0,k[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:U,attributeDivisors:k,object:M,attributes:{},index:null}}function f(M,T,U,k){let H=s.attributes,V=T.attributes,G=0,Q=U.getAttributes();for(let W in Q)if(Q[W].location>=0){let fe=H[W],me=V[W];if(me===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(me=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(me=M.instanceColor)),fe===void 0||fe.attribute!==me||me&&fe.data!==me.data)return!0;G++}return s.attributesNum!==G||s.index!==k}function g(M,T,U,k){let H={},V=T.attributes,G=0,Q=U.getAttributes();for(let W in Q)if(Q[W].location>=0){let fe=V[W];fe===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(fe=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(fe=M.instanceColor));let me={};me.attribute=fe,fe&&fe.data&&(me.data=fe.data),H[W]=me,G++}s.attributes=H,s.attributesNum=G,s.index=k}function x(){let M=s.newAttributes;for(let T=0,U=M.length;T<U;T++)M[T]=0}function p(M){m(M,0)}function m(M,T){let U=s.newAttributes,k=s.enabledAttributes,H=s.attributeDivisors;U[M]=1,k[M]===0&&(r.enableVertexAttribArray(M),k[M]=1),H[M]!==T&&(r.vertexAttribDivisor(M,T),H[M]=T)}function v(){let M=s.newAttributes,T=s.enabledAttributes;for(let U=0,k=T.length;U<k;U++)T[U]!==M[U]&&(r.disableVertexAttribArray(U),T[U]=0)}function y(M,T,U,k,H,V,G){G===!0?r.vertexAttribIPointer(M,T,U,H,V):r.vertexAttribPointer(M,T,U,k,H,V)}function _(M,T,U,k){x();let H=k.attributes,V=U.getAttributes(),G=T.defaultAttributeValues;for(let Q in V){let W=V[Q];if(W.location>=0){let ue=H[Q];if(ue===void 0&&(Q==="instanceMatrix"&&M.instanceMatrix&&(ue=M.instanceMatrix),Q==="instanceColor"&&M.instanceColor&&(ue=M.instanceColor)),ue!==void 0){let fe=ue.normalized,me=ue.itemSize,qe=e.get(ue);if(qe===void 0)continue;let at=qe.buffer,X=qe.type,j=qe.bytesPerElement,de=X===r.INT||X===r.UNSIGNED_INT||ue.gpuType===yf;if(ue.isInterleavedBufferAttribute){let ae=ue.data,Fe=ae.stride,Ue=ue.offset;if(ae.isInstancedInterleavedBuffer){for(let $e=0;$e<W.locationSize;$e++)m(W.location+$e,ae.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let $e=0;$e<W.locationSize;$e++)p(W.location+$e);r.bindBuffer(r.ARRAY_BUFFER,at);for(let $e=0;$e<W.locationSize;$e++)y(W.location+$e,me/W.locationSize,X,fe,Fe*j,(Ue+me/W.locationSize*$e)*j,de)}else{if(ue.isInstancedBufferAttribute){for(let ae=0;ae<W.locationSize;ae++)m(W.location+ae,ue.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let ae=0;ae<W.locationSize;ae++)p(W.location+ae);r.bindBuffer(r.ARRAY_BUFFER,at);for(let ae=0;ae<W.locationSize;ae++)y(W.location+ae,me/W.locationSize,X,fe,me*j,me/W.locationSize*ae*j,de)}}else if(G!==void 0){let fe=G[Q];if(fe!==void 0)switch(fe.length){case 2:r.vertexAttrib2fv(W.location,fe);break;case 3:r.vertexAttrib3fv(W.location,fe);break;case 4:r.vertexAttrib4fv(W.location,fe);break;default:r.vertexAttrib1fv(W.location,fe)}}}}v()}function I(){P();for(let M in n){let T=n[M];for(let U in T){let k=T[U];for(let H in k)u(k[H].object),delete k[H];delete T[U]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;let T=n[M.id];for(let U in T){let k=T[U];for(let H in k)u(k[H].object),delete k[H];delete T[U]}delete n[M.id]}function R(M){for(let T in n){let U=n[T];if(U[M.id]===void 0)continue;let k=U[M.id];for(let H in k)u(k[H].object),delete k[H];delete U[M.id]}}function P(){S(),a=!0,s!==i&&(s=i,c(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:P,resetDefaultState:S,dispose:I,releaseStatesOfGeometry:E,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:p,disableUnusedAttributes:v}}function q0(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(r.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<h;f++)this.render(c[f],u[f]);else{d.multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];t.update(f,n,1)}}function l(c,u,h,d){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x];for(let x=0;x<d.length;x++)t.update(g,n,d[x])}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function X0(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(E){return!(E!==Pn&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let R=E===Co&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==bi&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Bn&&!R)}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),x=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),_=f>0,I=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:x,maxAttributes:p,maxVertexUniforms:m,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:_,maxSamples:I}}function $0(r){let e=this,t=null,n=0,i=!1,s=!1,a=new Zn,o=new De,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){let g=h.clippingPlanes,x=h.clipIntersection,p=h.clipShadows,m=r.get(h);if(!i||g===null||g.length===0||s&&!p)s?u(null):c();else{let v=s?0:n,y=v*4,_=m.clippingState||null;l.value=_,_=u(g,d,y,f);for(let I=0;I!==y;++I)_[I]=t[I];m.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){let x=h!==null?h.length:0,p=null;if(x!==0){if(p=l.value,g!==!0||p===null){let m=f+x*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<m)&&(p=new Float32Array(m));for(let y=0,_=f;y!==x;++y,_+=4)a.copy(h[y]).applyMatrix4(v,o),a.normal.toArray(p,_),p[_+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}function Y0(r){let e=new WeakMap;function t(a,o){return o===Sc?a.mapping=Or:o===bc&&(a.mapping=Hr),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Sc||o===bc)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Cc(l.height);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var Kr=class extends to{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Lr=4,Sd=[.125,.215,.35,.446,.526,.582],Zi=20,rc=new Kr,bd=new xe,sc=null,ac=0,oc=0,lc=!1,Yi=(1+Math.sqrt(5))/2,br=1/Yi,wd=[new A(-Yi,br,0),new A(Yi,br,0),new A(-br,0,Yi),new A(br,0,Yi),new A(0,Yi,-br),new A(0,Yi,br),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],Zr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){sc=this._renderer.getRenderTarget(),ac=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),lc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ad(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Td(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(sc,ac,oc),this._renderer.xr.enabled=lc,e.scissorTest=!1,Ta(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Or||e.mapping===Hr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),sc=this._renderer.getRenderTarget(),ac=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),lc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:Co,format:Pn,colorSpace:Wt,depthBuffer:!1},i=Ed(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ed(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=K0(s)),this._blurMaterial=Z0(s,e,t)}return i}_compileMaterial(e){let t=new Re(this._lodPlanes[0],e);this._renderer.compile(t,rc)}_sceneToCubeUV(e,t,n,i){let o=new Ut(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(bd),u.toneMapping=Si,u.autoClear=!1;let f=new dt({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),g=new Re(new In,f),x=!1,p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,x=!0):(f.color.copy(bd),x=!0);for(let m=0;m<6;m++){let v=m%3;v===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):v===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));let y=this._cubeSize;Ta(i,v*y,m>2?y:0,y,y),u.setRenderTarget(i),x&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Or||e.mapping===Hr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ad()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Td());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new Re(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;Ta(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,rc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=wd[(i-s-1)%wd.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Re(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Zi-1),x=s/g,p=isFinite(s)?1+Math.floor(u*x):Zi;p>Zi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Zi}`);let m=[],v=0;for(let R=0;R<Zi;++R){let P=R/x,S=Math.exp(-P*P/2);m.push(S),R===0?v+=S:R<p&&(v+=2*S)}for(let R=0;R<m.length;R++)m[R]=m[R]/v;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let _=this._sizeLods[i],I=3*_*(i>y-Lr?i-y+Lr:0),E=4*(this._cubeSize-_);Ta(t,I,E,3*_,2*_),l.setRenderTarget(t),l.render(h,rc)}};function K0(r){let e=[],t=[],n=[],i=r,s=r-Lr+1+Sd.length;for(let a=0;a<s;a++){let o=Math.pow(2,i);t.push(o);let l=1/o;a>r-Lr?l=Sd[a-r+Lr-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,x=3,p=2,m=1,v=new Float32Array(x*g*f),y=new Float32Array(p*g*f),_=new Float32Array(m*g*f);for(let E=0;E<f;E++){let R=E%3*2/3-1,P=E>2?0:-1,S=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];v.set(S,x*g*E),y.set(d,p*g*E);let M=[E,E,E,E,E,E];_.set(M,m*g*E)}let I=new gt;I.setAttribute("position",new Lt(v,x)),I.setAttribute("uv",new Lt(y,p)),I.setAttribute("faceIndex",new Lt(_,m)),e.push(I),i>Lr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ed(r,e,t){let n=new ei(r,e,t);return n.texture.mapping=Ro,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ta(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Z0(r,e,t){let n=new Float32Array(Zi),i=new A(0,1,0);return new rn({name:"SphericalGaussianBlur",defines:{n:Zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:yu(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Td(){return new rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yu(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Ad(){return new rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function yu(){return`

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
	`}function J0(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Sc||l===bc,u=l===Or||l===Hr;if(c||u){let h=e.get(o),d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Zr(r)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{let f=o.image;return c&&f&&f.height>0||u&&f&&i(f)?(t===null&&(t=new Zr(r)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function i(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function j0(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&xu("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Q0(r,e,t,n){let i={},s=new WeakMap;function a(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let p=0,m=x.length;p<m;p++)e.remove(x[p])}d.removeEventListener("dispose",a),delete i[d.id];let f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(h){let d=h.attributes;for(let g in d)e.update(d[g],r.ARRAY_BUFFER);let f=h.morphAttributes;for(let g in f){let x=f[g];for(let p=0,m=x.length;p<m;p++)e.update(x[p],r.ARRAY_BUFFER)}}function c(h){let d=[],f=h.index,g=h.attributes.position,x=0;if(f!==null){let v=f.array;x=f.version;for(let y=0,_=v.length;y<_;y+=3){let I=v[y+0],E=v[y+1],R=v[y+2];d.push(I,E,E,R,R,I)}}else if(g!==void 0){let v=g.array;x=g.version;for(let y=0,_=v.length/3-1;y<_;y+=3){let I=y+0,E=y+1,R=y+2;d.push(I,E,E,R,R,I)}}else return;let p=new(Cf(d)?eo:Qa)(d,1);p.version=x;let m=s.get(h);m&&e.remove(m),s.set(h,p)}function u(h){let d=s.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function ey(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*a),t.update(f,n,1)}function c(d,f,g){g!==0&&(r.drawElementsInstanced(n,f,s,d*a,g),t.update(f,n,g))}function u(d,f,g){if(g===0)return;let x=e.get("WEBGL_multi_draw");if(x===null)for(let p=0;p<g;p++)this.render(d[p]/a,f[p]);else{x.multiDrawElementsWEBGL(n,f,0,s,d,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];t.update(p,n,1)}}function h(d,f,g,x){if(g===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/a,f[m],x[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,x,0,g);let m=0;for(let v=0;v<g;v++)m+=f[v];for(let v=0;v<x.length;v++)t.update(m,n,x[v])}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function ty(r){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function ny(r,e,t){let n=new WeakMap,i=new ht;function s(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(o);if(d===void 0||d.count!==h){let S=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let _=o.attributes.position.count*y,I=1;_>e.maxTextureSize&&(I=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let E=new Float32Array(_*I*4*h),R=new Ja(E,_,I,h);R.type=Bn,R.needsUpdate=!0;let P=y*4;for(let M=0;M<h;M++){let T=p[M],U=m[M],k=v[M],H=_*I*4*M;for(let V=0;V<T.count;V++){let G=V*P;f===!0&&(i.fromBufferAttribute(T,V),E[H+G+0]=i.x,E[H+G+1]=i.y,E[H+G+2]=i.z,E[H+G+3]=0),g===!0&&(i.fromBufferAttribute(U,V),E[H+G+4]=i.x,E[H+G+5]=i.y,E[H+G+6]=i.z,E[H+G+7]=0),x===!0&&(i.fromBufferAttribute(k,V),E[H+G+8]=i.x,E[H+G+9]=i.y,E[H+G+10]=i.z,E[H+G+11]=k.itemSize===4?i.w:1)}}d={count:h,texture:R,size:new J(_,I)},n.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function iy(r,e,t,n){let i=new WeakMap;function s(l){let c=n.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return h}function a(){i=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}var io=class extends Gt{constructor(e,t,n,i,s,a,o,l,c,u=Nr){if(u!==Nr&&u!==Gr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Nr&&(n=zr),n===void 0&&u===Gr&&(n=Vr),super(null,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Kt,this.minFilter=l!==void 0?l:Kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Df=new Gt,Uf=new io(1,1);Uf.compareFunction=Af;var Nf=new Ja,kf=new Ac,Ff=new no,Rd=[],Cd=[],Pd=new Float32Array(16),Id=new Float32Array(9),Ld=new Float32Array(4);function os(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=Rd[i];if(s===void 0&&(s=new Float32Array(i),Rd[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Ft(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Bt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Lo(r,e){let t=Cd[e];t===void 0&&(t=new Int32Array(e),Cd[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function ry(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function sy(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;r.uniform2fv(this.addr,e),Bt(t,e)}}function ay(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;r.uniform3fv(this.addr,e),Bt(t,e)}}function oy(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;r.uniform4fv(this.addr,e),Bt(t,e)}}function ly(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(Ft(t,n))return;Ld.set(n),r.uniformMatrix2fv(this.addr,!1,Ld),Bt(t,n)}}function cy(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(Ft(t,n))return;Id.set(n),r.uniformMatrix3fv(this.addr,!1,Id),Bt(t,n)}}function uy(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(Ft(t,n))return;Pd.set(n),r.uniformMatrix4fv(this.addr,!1,Pd),Bt(t,n)}}function hy(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function dy(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;r.uniform2iv(this.addr,e),Bt(t,e)}}function fy(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;r.uniform3iv(this.addr,e),Bt(t,e)}}function py(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;r.uniform4iv(this.addr,e),Bt(t,e)}}function my(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function gy(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;r.uniform2uiv(this.addr,e),Bt(t,e)}}function xy(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;r.uniform3uiv(this.addr,e),Bt(t,e)}}function yy(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;r.uniform4uiv(this.addr,e),Bt(t,e)}}function vy(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s=this.type===r.SAMPLER_2D_SHADOW?Uf:Df;t.setTexture2D(e||s,i)}function _y(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||kf,i)}function My(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Ff,i)}function Sy(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Nf,i)}function by(r){switch(r){case 5126:return ry;case 35664:return sy;case 35665:return ay;case 35666:return oy;case 35674:return ly;case 35675:return cy;case 35676:return uy;case 5124:case 35670:return hy;case 35667:case 35671:return dy;case 35668:case 35672:return fy;case 35669:case 35673:return py;case 5125:return my;case 36294:return gy;case 36295:return xy;case 36296:return yy;case 35678:case 36198:case 36298:case 36306:case 35682:return vy;case 35679:case 36299:case 36307:return _y;case 35680:case 36300:case 36308:case 36293:return My;case 36289:case 36303:case 36311:case 36292:return Sy}}function wy(r,e){r.uniform1fv(this.addr,e)}function Ey(r,e){let t=os(e,this.size,2);r.uniform2fv(this.addr,t)}function Ty(r,e){let t=os(e,this.size,3);r.uniform3fv(this.addr,t)}function Ay(r,e){let t=os(e,this.size,4);r.uniform4fv(this.addr,t)}function Ry(r,e){let t=os(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Cy(r,e){let t=os(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Py(r,e){let t=os(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Iy(r,e){r.uniform1iv(this.addr,e)}function Ly(r,e){r.uniform2iv(this.addr,e)}function Dy(r,e){r.uniform3iv(this.addr,e)}function Uy(r,e){r.uniform4iv(this.addr,e)}function Ny(r,e){r.uniform1uiv(this.addr,e)}function ky(r,e){r.uniform2uiv(this.addr,e)}function Fy(r,e){r.uniform3uiv(this.addr,e)}function By(r,e){r.uniform4uiv(this.addr,e)}function Oy(r,e,t){let n=this.cache,i=e.length,s=Lo(t,i);Ft(n,s)||(r.uniform1iv(this.addr,s),Bt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Df,s[a])}function Hy(r,e,t){let n=this.cache,i=e.length,s=Lo(t,i);Ft(n,s)||(r.uniform1iv(this.addr,s),Bt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||kf,s[a])}function zy(r,e,t){let n=this.cache,i=e.length,s=Lo(t,i);Ft(n,s)||(r.uniform1iv(this.addr,s),Bt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Ff,s[a])}function Vy(r,e,t){let n=this.cache,i=e.length,s=Lo(t,i);Ft(n,s)||(r.uniform1iv(this.addr,s),Bt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Nf,s[a])}function Gy(r){switch(r){case 5126:return wy;case 35664:return Ey;case 35665:return Ty;case 35666:return Ay;case 35674:return Ry;case 35675:return Cy;case 35676:return Py;case 5124:case 35670:return Iy;case 35667:case 35671:return Ly;case 35668:case 35672:return Dy;case 35669:case 35673:return Uy;case 5125:return Ny;case 36294:return ky;case 36295:return Fy;case 36296:return By;case 35678:case 36198:case 36298:case 36306:case 35682:return Oy;case 35679:case 36299:case 36307:return Hy;case 35680:case 36300:case 36308:case 36293:return zy;case 36289:case 36303:case 36311:case 36292:return Vy}}var Pc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=by(t.type)}},Ic=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Gy(t.type)}},Lc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},cc=/(\w+)(\])?(\[|\.)?/g;function Dd(r,e){r.seq.push(e),r.map[e.id]=e}function Wy(r,e,t){let n=r.name,i=n.length;for(cc.lastIndex=0;;){let s=cc.exec(n),a=cc.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Dd(t,c===void 0?new Pc(o,r,e):new Ic(o,r,e));break}else{let h=t.map[o];h===void 0&&(h=new Lc(o),Dd(t,h)),t=h}}}var Br=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);Wy(s,a,this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Ud(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var qy=37297,Xy=0;function $y(r,e){let t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Yy(r){let e=Ze.getPrimaries(Ze.workingColorSpace),t=Ze.getPrimaries(r),n;switch(e===t?n="":e===Ya&&t===$a?n="LinearDisplayP3ToLinearSRGB":e===$a&&t===Ya&&(n="LinearSRGBToLinearDisplayP3"),r){case Wt:case Io:return[n,"LinearTransferOETF"];case wt:case mu:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Nd(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+$y(r.getShaderSource(e),a)}else return i}function Ky(r,e){let t=Yy(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Zy(r,e){let t;switch(e){case Jp:t="Linear";break;case jp:t="Reinhard";break;case Qp:t="OptimizedCineon";break;case uu:t="ACESFilmic";break;case tm:t="AgX";break;case nm:t="Neutral";break;case em:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Jy(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ss).join(`
`)}function jy(r){let e=[];for(let t in r){let n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Qy(r,e){let t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(e,i),a=s.name,o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Ss(r){return r!==""}function kd(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fd(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var ev=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dc(r){return r.replace(ev,nv)}var tv=new Map;function nv(r,e){let t=Le[e];if(t===void 0){let n=tv.get(e);if(n!==void 0)t=Le[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Dc(t)}var iv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bd(r){return r.replace(iv,rv)}function rv(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Od(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function sv(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===mf?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===cu?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Kn&&(e="SHADOWMAP_TYPE_VSM"),e}function av(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Or:case Hr:e="ENVMAP_TYPE_CUBE";break;case Ro:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ov(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===Hr&&(e="ENVMAP_MODE_REFRACTION"),e}function lv(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case gf:e="ENVMAP_BLENDING_MULTIPLY";break;case Kp:e="ENVMAP_BLENDING_MIX";break;case Zp:e="ENVMAP_BLENDING_ADD";break}return e}function cv(r){let e=r.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function uv(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=sv(t),c=av(t),u=ov(t),h=lv(t),d=cv(t),f=Jy(t),g=jy(s),x=i.createProgram(),p,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ss).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ss).join(`
`),m.length>0&&(m+=`
`)):(p=[Od(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ss).join(`
`),m=[Od(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Si?"#define TONE_MAPPING":"",t.toneMapping!==Si?Le.tonemapping_pars_fragment:"",t.toneMapping!==Si?Zy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Le.colorspace_pars_fragment,Ky("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ss).join(`
`)),a=Dc(a),a=kd(a,t),a=Fd(a,t),o=Dc(o),o=kd(o,t),o=Fd(o,t),a=Bd(a),o=Bd(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===td?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===td?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let y=v+p+a,_=v+m+o,I=Ud(i,i.VERTEX_SHADER,y),E=Ud(i,i.FRAGMENT_SHADER,_);i.attachShader(x,I),i.attachShader(x,E),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function R(T){if(r.debug.checkShaderErrors){let U=i.getProgramInfoLog(x).trim(),k=i.getShaderInfoLog(I).trim(),H=i.getShaderInfoLog(E).trim(),V=!0,G=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(V=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,x,I,E);else{let Q=Nd(i,I,"vertex"),W=Nd(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+U+`
`+Q+`
`+W)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(k===""||H==="")&&(G=!1);G&&(T.diagnostics={runnable:V,programLog:U,vertexShader:{log:k,prefix:p},fragmentShader:{log:H,prefix:m}})}i.deleteShader(I),i.deleteShader(E),P=new Br(i,x),S=Qy(i,x)}let P;this.getUniforms=function(){return P===void 0&&R(this),P};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(x,qy)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Xy++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=I,this.fragmentShader=E,this}var hv=0,Uc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Nc(e),t.set(e,n)),n}},Nc=class{constructor(e){this.id=hv++,this.code=e,this.usedTimes=0}};function dv(r,e,t,n,i,s,a){let o=new ja,l=new Uc,c=new Set,u=[],h=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return c.add(S),S===0?"uv":`uv${S}`}function p(S,M,T,U,k){let H=U.fog,V=k.geometry,G=S.isMeshStandardMaterial?U.environment:null,Q=(S.isMeshStandardMaterial?t:e).get(S.envMap||G),W=Q&&Q.mapping===Ro?Q.image.height:null,ue=g[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let fe=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,me=fe!==void 0?fe.length:0,qe=0;V.morphAttributes.position!==void 0&&(qe=1),V.morphAttributes.normal!==void 0&&(qe=2),V.morphAttributes.color!==void 0&&(qe=3);let at,X,j,de;if(ue){let ot=kn[ue];at=ot.vertexShader,X=ot.fragmentShader}else at=S.vertexShader,X=S.fragmentShader,l.update(S),j=l.getVertexShaderID(S),de=l.getFragmentShaderID(S);let ae=r.getRenderTarget(),Fe=k.isInstancedMesh===!0,Ue=k.isBatchedMesh===!0,$e=!!S.map,D=!!S.matcap,Xe=!!Q,Ge=!!S.aoMap,_t=!!S.lightMap,Se=!!S.bumpMap,Ke=!!S.normalMap,Be=!!S.displacementMap,Ie=!!S.emissiveMap,Ct=!!S.metalnessMap,C=!!S.roughnessMap,b=S.anisotropy>0,z=S.clearcoat>0,Y=S.dispersion>0,K=S.iridescence>0,Z=S.sheen>0,_e=S.transmission>0,re=b&&!!S.anisotropyMap,se=z&&!!S.clearcoatMap,Ne=z&&!!S.clearcoatNormalMap,ee=z&&!!S.clearcoatRoughnessMap,ge=K&&!!S.iridescenceMap,Ve=K&&!!S.iridescenceThicknessMap,Ee=Z&&!!S.sheenColorMap,oe=Z&&!!S.sheenRoughnessMap,ke=!!S.specularMap,We=!!S.specularColorMap,Et=!!S.specularIntensityMap,L=_e&&!!S.transmissionMap,le=_e&&!!S.thicknessMap,q=!!S.gradientMap,$=!!S.alphaMap,ne=S.alphaTest>0,Te=!!S.alphaHash,Qe=!!S.extensions,Tt=Si;S.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Tt=r.toneMapping);let Ot={shaderID:ue,shaderType:S.type,shaderName:S.name,vertexShader:at,fragmentShader:X,defines:S.defines,customVertexShaderID:j,customFragmentShaderID:de,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ue,batchingColor:Ue&&k._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&k.instanceColor!==null,instancingMorph:Fe&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ae===null?r.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Wt,alphaToCoverage:!!S.alphaToCoverage,map:$e,matcap:D,envMap:Xe,envMapMode:Xe&&Q.mapping,envMapCubeUVHeight:W,aoMap:Ge,lightMap:_t,bumpMap:Se,normalMap:Ke,displacementMap:d&&Be,emissiveMap:Ie,normalMapObjectSpace:Ke&&S.normalMapType===xm,normalMapTangentSpace:Ke&&S.normalMapType===Tf,metalnessMap:Ct,roughnessMap:C,anisotropy:b,anisotropyMap:re,clearcoat:z,clearcoatMap:se,clearcoatNormalMap:Ne,clearcoatRoughnessMap:ee,dispersion:Y,iridescence:K,iridescenceMap:ge,iridescenceThicknessMap:Ve,sheen:Z,sheenColorMap:Ee,sheenRoughnessMap:oe,specularMap:ke,specularColorMap:We,specularIntensityMap:Et,transmission:_e,transmissionMap:L,thicknessMap:le,gradientMap:q,opaque:S.transparent===!1&&S.blending===Ur&&S.alphaToCoverage===!1,alphaMap:$,alphaTest:ne,alphaHash:Te,combine:S.combine,mapUv:$e&&x(S.map.channel),aoMapUv:Ge&&x(S.aoMap.channel),lightMapUv:_t&&x(S.lightMap.channel),bumpMapUv:Se&&x(S.bumpMap.channel),normalMapUv:Ke&&x(S.normalMap.channel),displacementMapUv:Be&&x(S.displacementMap.channel),emissiveMapUv:Ie&&x(S.emissiveMap.channel),metalnessMapUv:Ct&&x(S.metalnessMap.channel),roughnessMapUv:C&&x(S.roughnessMap.channel),anisotropyMapUv:re&&x(S.anisotropyMap.channel),clearcoatMapUv:se&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:Ne&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ve&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:oe&&x(S.sheenRoughnessMap.channel),specularMapUv:ke&&x(S.specularMap.channel),specularColorMapUv:We&&x(S.specularColorMap.channel),specularIntensityMapUv:Et&&x(S.specularIntensityMap.channel),transmissionMapUv:L&&x(S.transmissionMap.channel),thicknessMapUv:le&&x(S.thicknessMap.channel),alphaMapUv:$&&x(S.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Ke||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!V.attributes.uv&&($e||$),fog:!!H,useFog:S.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:k.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:qe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&T.length>0,shadowMapType:r.shadowMap.type,toneMapping:Tt,decodeVideoTexture:$e&&S.map.isVideoTexture===!0&&Ze.getTransfer(S.map.colorSpace)===mt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Nt,flipSided:S.side===Vt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Qe&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Qe&&S.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ot.vertexUv1s=c.has(1),Ot.vertexUv2s=c.has(2),Ot.vertexUv3s=c.has(3),c.clear(),Ot}function m(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let T in S.defines)M.push(T),M.push(S.defines[T]);return S.isRawShaderMaterial===!1&&(v(M,S),y(M,S),M.push(r.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function v(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function y(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.doubleSided&&o.enable(10),M.flipSided&&o.enable(11),M.useDepthPacking&&o.enable(12),M.dithering&&o.enable(13),M.transmission&&o.enable(14),M.sheen&&o.enable(15),M.opaque&&o.enable(16),M.pointsUvs&&o.enable(17),M.decodeVideoTexture&&o.enable(18),M.alphaToCoverage&&o.enable(19),S.push(o.mask)}function _(S){let M=g[S.type],T;if(M){let U=kn[M];T=ig.clone(U.uniforms)}else T=S.uniforms;return T}function I(S,M){let T;for(let U=0,k=u.length;U<k;U++){let H=u[U];if(H.cacheKey===M){T=H,++T.usedTimes;break}}return T===void 0&&(T=new uv(r,M,S,s),u.push(T)),T}function E(S){if(--S.usedTimes===0){let M=u.indexOf(S);u[M]=u[u.length-1],u.pop(),S.destroy()}}function R(S){l.remove(S)}function P(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:_,acquireProgram:I,releaseProgram:E,releaseShaderCache:R,programs:u,dispose:P}}function fv(){let r=new WeakMap;function e(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function t(s){r.delete(s)}function n(s,a,o){r.get(s)[a]=o}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function pv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Hd(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function zd(){let r=[],e=0,t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(h,d,f,g,x,p){let m=r[e];return m===void 0?(m={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:x,group:p},r[e]=m):(m.id=h.id,m.object=h,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=x,m.group=p),e++,m}function o(h,d,f,g,x,p){let m=a(h,d,f,g,x,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(h,d,f,g,x,p){let m=a(h,d,f,g,x,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(h,d){t.length>1&&t.sort(h||pv),n.length>1&&n.sort(d||Hd),i.length>1&&i.sort(d||Hd)}function u(){for(let h=e,d=r.length;h<d;h++){let f=r[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:u,sort:c}}function mv(){let r=new WeakMap;function e(n,i){let s=r.get(n),a;return s===void 0?(a=new zd,r.set(n,[a])):i>=s.length?(a=new zd,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function gv(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new xe};break;case"SpotLight":t={position:new A,direction:new A,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":t={color:new xe,position:new A,halfWidth:new A,halfHeight:new A};break}return r[e.id]=t,t}}}function xv(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}var yv=0;function vv(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function _v(r){let e=new gv,t=xv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);let i=new A,s=new Ce,a=new Ce;function o(c){let u=0,h=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,x=0,p=0,m=0,v=0,y=0,_=0,I=0,E=0,R=0;c.sort(vv);for(let S=0,M=c.length;S<M;S++){let T=c[S],U=T.color,k=T.intensity,H=T.distance,V=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)u+=U.r*k,h+=U.g*k,d+=U.b*k;else if(T.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(T.sh.coefficients[G],k);R++}else if(T.isDirectionalLight){let G=e.get(T);if(G.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let Q=T.shadow,W=t.get(T);W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=V,n.directionalShadowMatrix[f]=T.shadow.matrix,v++}n.directional[f]=G,f++}else if(T.isSpotLight){let G=e.get(T);G.position.setFromMatrixPosition(T.matrixWorld),G.color.copy(U).multiplyScalar(k),G.distance=H,G.coneCos=Math.cos(T.angle),G.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),G.decay=T.decay,n.spot[x]=G;let Q=T.shadow;if(T.map&&(n.spotLightMap[I]=T.map,I++,Q.updateMatrices(T),T.castShadow&&E++),n.spotLightMatrix[x]=Q.matrix,T.castShadow){let W=t.get(T);W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.spotShadow[x]=W,n.spotShadowMap[x]=V,_++}x++}else if(T.isRectAreaLight){let G=e.get(T);G.color.copy(U).multiplyScalar(k),G.halfWidth.set(T.width*.5,0,0),G.halfHeight.set(0,T.height*.5,0),n.rectArea[p]=G,p++}else if(T.isPointLight){let G=e.get(T);if(G.color.copy(T.color).multiplyScalar(T.intensity),G.distance=T.distance,G.decay=T.decay,T.castShadow){let Q=T.shadow,W=t.get(T);W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,W.shadowCameraNear=Q.camera.near,W.shadowCameraFar=Q.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=V,n.pointShadowMatrix[g]=T.shadow.matrix,y++}n.point[g]=G,g++}else if(T.isHemisphereLight){let G=e.get(T);G.skyColor.copy(T.color).multiplyScalar(k),G.groundColor.copy(T.groundColor).multiplyScalar(k),n.hemi[m]=G,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ie.LTC_FLOAT_1,n.rectAreaLTC2=ie.LTC_FLOAT_2):(n.rectAreaLTC1=ie.LTC_HALF_1,n.rectAreaLTC2=ie.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==x||P.rectAreaLength!==p||P.hemiLength!==m||P.numDirectionalShadows!==v||P.numPointShadows!==y||P.numSpotShadows!==_||P.numSpotMaps!==I||P.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+I-E,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,P.directionalLength=f,P.pointLength=g,P.spotLength=x,P.rectAreaLength=p,P.hemiLength=m,P.numDirectionalShadows=v,P.numPointShadows=y,P.numSpotShadows=_,P.numSpotMaps=I,P.numLightProbes=R,n.version=yv++)}function l(c,u){let h=0,d=0,f=0,g=0,x=0,p=u.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){let y=c[m];if(y.isDirectionalLight){let _=n.directional[h];_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(p),h++}else if(y.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(p),f++}else if(y.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(p),a.identity(),s.copy(y.matrixWorld),s.premultiply(p),a.extractRotation(s),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){let _=n.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(p),d++}else if(y.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(p),x++}}}return{setup:o,setupView:l,state:n}}function Vd(r){let e=new _v(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function Mv(r){let e=new WeakMap;function t(i,s=0){let a=e.get(i),o;return a===void 0?(o=new Vd(r),e.set(i,[o])):s>=a.length?(o=new Vd(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var kc=class extends nn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Fc=class extends nn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Sv=`void main() {
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
}`;function wv(r,e,t){let n=new Ls,i=new J,s=new J,a=new ht,o=new kc({depthPacking:gm}),l=new Fc,c={},u=t.maxTextureSize,h={[On]:Vt,[Vt]:On,[Nt]:Nt},d=new rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:Sv,fragmentShader:bv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new gt;g.setAttribute("position",new Lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Re(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mf;let m=this.type;this.render=function(E,R,P){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;let S=r.getRenderTarget(),M=r.getActiveCubeFace(),T=r.getActiveMipmapLevel(),U=r.state;U.setBlending(Mi),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let k=m!==Kn&&this.type===Kn,H=m===Kn&&this.type!==Kn;for(let V=0,G=E.length;V<G;V++){let Q=E[V],W=Q.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);let ue=W.getFrameExtents();if(i.multiply(ue),s.copy(W.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/ue.x),i.x=s.x*ue.x,W.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/ue.y),i.y=s.y*ue.y,W.mapSize.y=s.y)),W.map===null||k===!0||H===!0){let me=this.type!==Kn?{minFilter:Kt,magFilter:Kt}:{};W.map!==null&&W.map.dispose(),W.map=new ei(i.x,i.y,me),W.map.texture.name=Q.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();let fe=W.getViewportCount();for(let me=0;me<fe;me++){let qe=W.getViewport(me);a.set(s.x*qe.x,s.y*qe.y,s.x*qe.z,s.y*qe.w),U.viewport(a),W.updateMatrices(Q,me),n=W.getFrustum(),_(R,P,W.camera,Q,this.type)}W.isPointLightShadow!==!0&&this.type===Kn&&v(W,P),W.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(S,M,T)};function v(E,R){let P=e.update(x);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ei(i.x,i.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(R,null,P,d,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(R,null,P,f,x,null)}function y(E,R,P,S){let M=null,T=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(T!==void 0)M=T;else if(M=P.isPointLight===!0?l:o,r.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let U=M.uuid,k=R.uuid,H=c[U];H===void 0&&(H={},c[U]=H);let V=H[k];V===void 0&&(V=M.clone(),H[k]=V,R.addEventListener("dispose",I)),M=V}if(M.visible=R.visible,M.wireframe=R.wireframe,S===Kn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:h[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let U=r.properties.get(M);U.light=P}return M}function _(E,R,P,S,M){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===Kn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);let k=e.update(E),H=E.material;if(Array.isArray(H)){let V=k.groups;for(let G=0,Q=V.length;G<Q;G++){let W=V[G],ue=H[W.materialIndex];if(ue&&ue.visible){let fe=y(E,ue,S,M);E.onBeforeShadow(r,E,R,P,k,fe,W),r.renderBufferDirect(P,null,k,fe,E,W),E.onAfterShadow(r,E,R,P,k,fe,W)}}}else if(H.visible){let V=y(E,H,S,M);E.onBeforeShadow(r,E,R,P,k,V,null),r.renderBufferDirect(P,null,k,V,E,null),E.onAfterShadow(r,E,R,P,k,V,null)}}let U=E.children;for(let k=0,H=U.length;k<H;k++)_(U[k],R,P,S,M)}function I(E){E.target.removeEventListener("dispose",I);for(let P in c){let S=c[P],M=E.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}function Ev(r){function e(){let L=!1,le=new ht,q=null,$=new ht(0,0,0,0);return{setMask:function(ne){q!==ne&&!L&&(r.colorMask(ne,ne,ne,ne),q=ne)},setLocked:function(ne){L=ne},setClear:function(ne,Te,Qe,Tt,Ot){Ot===!0&&(ne*=Tt,Te*=Tt,Qe*=Tt),le.set(ne,Te,Qe,Tt),$.equals(le)===!1&&(r.clearColor(ne,Te,Qe,Tt),$.copy(le))},reset:function(){L=!1,q=null,$.set(-1,0,0,0)}}}function t(){let L=!1,le=null,q=null,$=null;return{setTest:function(ne){ne?de(r.DEPTH_TEST):ae(r.DEPTH_TEST)},setMask:function(ne){le!==ne&&!L&&(r.depthMask(ne),le=ne)},setFunc:function(ne){if(q!==ne){switch(ne){case Vp:r.depthFunc(r.NEVER);break;case Gp:r.depthFunc(r.ALWAYS);break;case Wp:r.depthFunc(r.LESS);break;case Ga:r.depthFunc(r.LEQUAL);break;case qp:r.depthFunc(r.EQUAL);break;case Xp:r.depthFunc(r.GEQUAL);break;case $p:r.depthFunc(r.GREATER);break;case Yp:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}q=ne}},setLocked:function(ne){L=ne},setClear:function(ne){$!==ne&&(r.clearDepth(ne),$=ne)},reset:function(){L=!1,le=null,q=null,$=null}}}function n(){let L=!1,le=null,q=null,$=null,ne=null,Te=null,Qe=null,Tt=null,Ot=null;return{setTest:function(ot){L||(ot?de(r.STENCIL_TEST):ae(r.STENCIL_TEST))},setMask:function(ot){le!==ot&&!L&&(r.stencilMask(ot),le=ot)},setFunc:function(ot,Un,Nn){(q!==ot||$!==Un||ne!==Nn)&&(r.stencilFunc(ot,Un,Nn),q=ot,$=Un,ne=Nn)},setOp:function(ot,Un,Nn){(Te!==ot||Qe!==Un||Tt!==Nn)&&(r.stencilOp(ot,Un,Nn),Te=ot,Qe=Un,Tt=Nn)},setLocked:function(ot){L=ot},setClear:function(ot){Ot!==ot&&(r.clearStencil(ot),Ot=ot)},reset:function(){L=!1,le=null,q=null,$=null,ne=null,Te=null,Qe=null,Tt=null,Ot=null}}}let i=new e,s=new t,a=new n,o=new WeakMap,l=new WeakMap,c={},u={},h=new WeakMap,d=[],f=null,g=!1,x=null,p=null,m=null,v=null,y=null,_=null,I=null,E=new xe(0,0,0),R=0,P=!1,S=null,M=null,T=null,U=null,k=null,H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,G=0,Q=r.getParameter(r.VERSION);Q.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(Q)[1]),V=G>=1):Q.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),V=G>=2);let W=null,ue={},fe=r.getParameter(r.SCISSOR_BOX),me=r.getParameter(r.VIEWPORT),qe=new ht().fromArray(fe),at=new ht().fromArray(me);function X(L,le,q,$){let ne=new Uint8Array(4),Te=r.createTexture();r.bindTexture(L,Te),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Qe=0;Qe<q;Qe++)L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?r.texImage3D(le,0,r.RGBA,1,1,$,0,r.RGBA,r.UNSIGNED_BYTE,ne):r.texImage2D(le+Qe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ne);return Te}let j={};j[r.TEXTURE_2D]=X(r.TEXTURE_2D,r.TEXTURE_2D,1),j[r.TEXTURE_CUBE_MAP]=X(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[r.TEXTURE_2D_ARRAY]=X(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),j[r.TEXTURE_3D]=X(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),a.setClear(0),de(r.DEPTH_TEST),s.setFunc(Ga),Se(!1),Ke(wh),de(r.CULL_FACE),Ge(Mi);function de(L){c[L]!==!0&&(r.enable(L),c[L]=!0)}function ae(L){c[L]!==!1&&(r.disable(L),c[L]=!1)}function Fe(L,le){return u[L]!==le?(r.bindFramebuffer(L,le),u[L]=le,L===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=le),L===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=le),!0):!1}function Ue(L,le){let q=d,$=!1;if(L){q=h.get(le),q===void 0&&(q=[],h.set(le,q));let ne=L.textures;if(q.length!==ne.length||q[0]!==r.COLOR_ATTACHMENT0){for(let Te=0,Qe=ne.length;Te<Qe;Te++)q[Te]=r.COLOR_ATTACHMENT0+Te;q.length=ne.length,$=!0}}else q[0]!==r.BACK&&(q[0]=r.BACK,$=!0);$&&r.drawBuffers(q)}function $e(L){return f!==L?(r.useProgram(L),f=L,!0):!1}let D={[Ki]:r.FUNC_ADD,[Ep]:r.FUNC_SUBTRACT,[Tp]:r.FUNC_REVERSE_SUBTRACT};D[Ap]=r.MIN,D[Rp]=r.MAX;let Xe={[Cp]:r.ZERO,[Pp]:r.ONE,[Ip]:r.SRC_COLOR,[_c]:r.SRC_ALPHA,[Fp]:r.SRC_ALPHA_SATURATE,[Np]:r.DST_COLOR,[Dp]:r.DST_ALPHA,[Lp]:r.ONE_MINUS_SRC_COLOR,[Mc]:r.ONE_MINUS_SRC_ALPHA,[kp]:r.ONE_MINUS_DST_COLOR,[Up]:r.ONE_MINUS_DST_ALPHA,[Bp]:r.CONSTANT_COLOR,[Op]:r.ONE_MINUS_CONSTANT_COLOR,[Hp]:r.CONSTANT_ALPHA,[zp]:r.ONE_MINUS_CONSTANT_ALPHA};function Ge(L,le,q,$,ne,Te,Qe,Tt,Ot,ot){if(L===Mi){g===!0&&(ae(r.BLEND),g=!1);return}if(g===!1&&(de(r.BLEND),g=!0),L!==wp){if(L!==x||ot!==P){if((p!==Ki||y!==Ki)&&(r.blendEquation(r.FUNC_ADD),p=Ki,y=Ki),ot)switch(L){case Ur:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Cs:r.blendFunc(r.ONE,r.ONE);break;case Eh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Th:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ur:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Cs:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Eh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Th:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}m=null,v=null,_=null,I=null,E.set(0,0,0),R=0,x=L,P=ot}return}ne=ne||le,Te=Te||q,Qe=Qe||$,(le!==p||ne!==y)&&(r.blendEquationSeparate(D[le],D[ne]),p=le,y=ne),(q!==m||$!==v||Te!==_||Qe!==I)&&(r.blendFuncSeparate(Xe[q],Xe[$],Xe[Te],Xe[Qe]),m=q,v=$,_=Te,I=Qe),(Tt.equals(E)===!1||Ot!==R)&&(r.blendColor(Tt.r,Tt.g,Tt.b,Ot),E.copy(Tt),R=Ot),x=L,P=!1}function _t(L,le){L.side===Nt?ae(r.CULL_FACE):de(r.CULL_FACE);let q=L.side===Vt;le&&(q=!q),Se(q),L.blending===Ur&&L.transparent===!1?Ge(Mi):Ge(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),s.setFunc(L.depthFunc),s.setTest(L.depthTest),s.setMask(L.depthWrite),i.setMask(L.colorWrite);let $=L.stencilWrite;a.setTest($),$&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ie(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?de(r.SAMPLE_ALPHA_TO_COVERAGE):ae(r.SAMPLE_ALPHA_TO_COVERAGE)}function Se(L){S!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),S=L)}function Ke(L){L!==Sp?(de(r.CULL_FACE),L!==M&&(L===wh?r.cullFace(r.BACK):L===bp?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ae(r.CULL_FACE),M=L}function Be(L){L!==T&&(V&&r.lineWidth(L),T=L)}function Ie(L,le,q){L?(de(r.POLYGON_OFFSET_FILL),(U!==le||k!==q)&&(r.polygonOffset(le,q),U=le,k=q)):ae(r.POLYGON_OFFSET_FILL)}function Ct(L){L?de(r.SCISSOR_TEST):ae(r.SCISSOR_TEST)}function C(L){L===void 0&&(L=r.TEXTURE0+H-1),W!==L&&(r.activeTexture(L),W=L)}function b(L,le,q){q===void 0&&(W===null?q=r.TEXTURE0+H-1:q=W);let $=ue[q];$===void 0&&($={type:void 0,texture:void 0},ue[q]=$),($.type!==L||$.texture!==le)&&(W!==q&&(r.activeTexture(q),W=q),r.bindTexture(L,le||j[L]),$.type=L,$.texture=le)}function z(){let L=ue[W];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Y(){try{r.compressedTexImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{r.compressedTexImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{r.texSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _e(){try{r.texSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function re(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function se(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ne(){try{r.texStorage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ee(){try{r.texStorage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ge(){try{r.texImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ve(){try{r.texImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(L){qe.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),qe.copy(L))}function oe(L){at.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),at.copy(L))}function ke(L,le){let q=l.get(le);q===void 0&&(q=new WeakMap,l.set(le,q));let $=q.get(L);$===void 0&&($=r.getUniformBlockIndex(le,L.name),q.set(L,$))}function We(L,le){let $=l.get(le).get(L);o.get(le)!==$&&(r.uniformBlockBinding(le,$,L.__bindingPointIndex),o.set(le,$))}function Et(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},W=null,ue={},u={},h=new WeakMap,d=[],f=null,g=!1,x=null,p=null,m=null,v=null,y=null,_=null,I=null,E=new xe(0,0,0),R=0,P=!1,S=null,M=null,T=null,U=null,k=null,qe.set(0,0,r.canvas.width,r.canvas.height),at.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),a.reset()}return{buffers:{color:i,depth:s,stencil:a},enable:de,disable:ae,bindFramebuffer:Fe,drawBuffers:Ue,useProgram:$e,setBlending:Ge,setMaterial:_t,setFlipSided:Se,setCullFace:Ke,setLineWidth:Be,setPolygonOffset:Ie,setScissorTest:Ct,activeTexture:C,bindTexture:b,unbindTexture:z,compressedTexImage2D:Y,compressedTexImage3D:K,texImage2D:ge,texImage3D:Ve,updateUBOMapping:ke,uniformBlockBinding:We,texStorage2D:Ne,texStorage3D:ee,texSubImage2D:Z,texSubImage3D:_e,compressedTexSubImage2D:re,compressedTexSubImage3D:se,scissor:Ee,viewport:oe,reset:Et}}function Tv(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new J,u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,b){return f?new OffscreenCanvas(C,b):Is("canvas")}function x(C,b,z){let Y=1,K=Ct(C);if((K.width>z||K.height>z)&&(Y=z/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let Z=Math.floor(Y*K.width),_e=Math.floor(Y*K.height);h===void 0&&(h=g(Z,_e));let re=b?g(Z,_e):h;return re.width=Z,re.height=_e,re.getContext("2d").drawImage(C,0,0,Z,_e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+Z+"x"+_e+")."),re}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),C;return C}function p(C){return C.generateMipmaps&&C.minFilter!==Kt&&C.minFilter!==Yt}function m(C){r.generateMipmap(C)}function v(C,b,z,Y,K=!1){if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Z=b;if(b===r.RED&&(z===r.FLOAT&&(Z=r.R32F),z===r.HALF_FLOAT&&(Z=r.R16F),z===r.UNSIGNED_BYTE&&(Z=r.R8)),b===r.RED_INTEGER&&(z===r.UNSIGNED_BYTE&&(Z=r.R8UI),z===r.UNSIGNED_SHORT&&(Z=r.R16UI),z===r.UNSIGNED_INT&&(Z=r.R32UI),z===r.BYTE&&(Z=r.R8I),z===r.SHORT&&(Z=r.R16I),z===r.INT&&(Z=r.R32I)),b===r.RG&&(z===r.FLOAT&&(Z=r.RG32F),z===r.HALF_FLOAT&&(Z=r.RG16F),z===r.UNSIGNED_BYTE&&(Z=r.RG8)),b===r.RG_INTEGER&&(z===r.UNSIGNED_BYTE&&(Z=r.RG8UI),z===r.UNSIGNED_SHORT&&(Z=r.RG16UI),z===r.UNSIGNED_INT&&(Z=r.RG32UI),z===r.BYTE&&(Z=r.RG8I),z===r.SHORT&&(Z=r.RG16I),z===r.INT&&(Z=r.RG32I)),b===r.RGB&&z===r.UNSIGNED_INT_5_9_9_9_REV&&(Z=r.RGB9_E5),b===r.RGBA){let _e=K?Xa:Ze.getTransfer(Y);z===r.FLOAT&&(Z=r.RGBA32F),z===r.HALF_FLOAT&&(Z=r.RGBA16F),z===r.UNSIGNED_BYTE&&(Z=_e===mt?r.SRGB8_ALPHA8:r.RGBA8),z===r.UNSIGNED_SHORT_4_4_4_4&&(Z=r.RGBA4),z===r.UNSIGNED_SHORT_5_5_5_1&&(Z=r.RGB5_A1)}return(Z===r.R16F||Z===r.R32F||Z===r.RG16F||Z===r.RG32F||Z===r.RGBA16F||Z===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(C,b){let z;return C?b===null||b===zr||b===Vr?z=r.DEPTH24_STENCIL8:b===Bn?z=r.DEPTH32F_STENCIL8:b===Wa&&(z=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===zr||b===Vr?z=r.DEPTH_COMPONENT24:b===Bn?z=r.DEPTH_COMPONENT32F:b===Wa&&(z=r.DEPTH_COMPONENT16),z}function _(C,b){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Kt&&C.minFilter!==Yt?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function I(C){let b=C.target;b.removeEventListener("dispose",I),R(b),b.isVideoTexture&&u.delete(b)}function E(C){let b=C.target;b.removeEventListener("dispose",E),S(b)}function R(C){let b=n.get(C);if(b.__webglInit===void 0)return;let z=C.source,Y=d.get(z);if(Y){let K=Y[b.__cacheKey];K.usedTimes--,K.usedTimes===0&&P(C),Object.keys(Y).length===0&&d.delete(z)}n.remove(C)}function P(C){let b=n.get(C);r.deleteTexture(b.__webglTexture);let z=C.source,Y=d.get(z);delete Y[b.__cacheKey],a.memory.textures--}function S(C){let b=n.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(b.__webglFramebuffer[Y]))for(let K=0;K<b.__webglFramebuffer[Y].length;K++)r.deleteFramebuffer(b.__webglFramebuffer[Y][K]);else r.deleteFramebuffer(b.__webglFramebuffer[Y]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[Y])}else{if(Array.isArray(b.__webglFramebuffer))for(let Y=0;Y<b.__webglFramebuffer.length;Y++)r.deleteFramebuffer(b.__webglFramebuffer[Y]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Y=0;Y<b.__webglColorRenderbuffer.length;Y++)b.__webglColorRenderbuffer[Y]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[Y]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let z=C.textures;for(let Y=0,K=z.length;Y<K;Y++){let Z=n.get(z[Y]);Z.__webglTexture&&(r.deleteTexture(Z.__webglTexture),a.memory.textures--),n.remove(z[Y])}n.remove(C)}let M=0;function T(){M=0}function U(){let C=M;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),M+=1,C}function k(C){let b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function H(C,b){let z=n.get(C);if(C.isVideoTexture&&Be(C),C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){let Y=C.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(z,C,b);return}}t.bindTexture(r.TEXTURE_2D,z.__webglTexture,r.TEXTURE0+b)}function V(C,b){let z=n.get(C);if(C.version>0&&z.__version!==C.version){at(z,C,b);return}t.bindTexture(r.TEXTURE_2D_ARRAY,z.__webglTexture,r.TEXTURE0+b)}function G(C,b){let z=n.get(C);if(C.version>0&&z.__version!==C.version){at(z,C,b);return}t.bindTexture(r.TEXTURE_3D,z.__webglTexture,r.TEXTURE0+b)}function Q(C,b){let z=n.get(C);if(C.version>0&&z.__version!==C.version){X(z,C,b);return}t.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+b)}let W={[jn]:r.REPEAT,[Cn]:r.CLAMP_TO_EDGE,[Ps]:r.MIRRORED_REPEAT},ue={[Kt]:r.NEAREST,[hu]:r.NEAREST_MIPMAP_NEAREST,[Cr]:r.NEAREST_MIPMAP_LINEAR,[Yt]:r.LINEAR,[bs]:r.LINEAR_MIPMAP_NEAREST,[Fn]:r.LINEAR_MIPMAP_LINEAR},fe={[ym]:r.NEVER,[wm]:r.ALWAYS,[vm]:r.LESS,[Af]:r.LEQUAL,[_m]:r.EQUAL,[bm]:r.GEQUAL,[Mm]:r.GREATER,[Sm]:r.NOTEQUAL};function me(C,b){if(b.type===Bn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Yt||b.magFilter===bs||b.magFilter===Cr||b.magFilter===Fn||b.minFilter===Yt||b.minFilter===bs||b.minFilter===Cr||b.minFilter===Fn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,W[b.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,W[b.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,W[b.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,ue[b.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,ue[b.minFilter]),b.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,fe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Kt||b.minFilter!==Cr&&b.minFilter!==Fn||b.type===Bn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function qe(C,b){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",I));let Y=b.source,K=d.get(Y);K===void 0&&(K={},d.set(Y,K));let Z=k(b);if(Z!==C.__cacheKey){K[Z]===void 0&&(K[Z]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,z=!0),K[Z].usedTimes++;let _e=K[C.__cacheKey];_e!==void 0&&(K[C.__cacheKey].usedTimes--,_e.usedTimes===0&&P(b)),C.__cacheKey=Z,C.__webglTexture=K[Z].texture}return z}function at(C,b,z){let Y=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Y=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Y=r.TEXTURE_3D);let K=qe(C,b),Z=b.source;t.bindTexture(Y,C.__webglTexture,r.TEXTURE0+z);let _e=n.get(Z);if(Z.version!==_e.__version||K===!0){t.activeTexture(r.TEXTURE0+z);let re=Ze.getPrimaries(Ze.workingColorSpace),se=b.colorSpace===yi?null:Ze.getPrimaries(b.colorSpace),Ne=b.colorSpace===yi||re===se?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let ee=x(b.image,!1,i.maxTextureSize);ee=Ie(b,ee);let ge=s.convert(b.format,b.colorSpace),Ve=s.convert(b.type),Ee=v(b.internalFormat,ge,Ve,b.colorSpace,b.isVideoTexture);me(Y,b);let oe,ke=b.mipmaps,We=b.isVideoTexture!==!0,Et=_e.__version===void 0||K===!0,L=Z.dataReady,le=_(b,ee);if(b.isDepthTexture)Ee=y(b.format===Gr,b.type),Et&&(We?t.texStorage2D(r.TEXTURE_2D,1,Ee,ee.width,ee.height):t.texImage2D(r.TEXTURE_2D,0,Ee,ee.width,ee.height,0,ge,Ve,null));else if(b.isDataTexture)if(ke.length>0){We&&Et&&t.texStorage2D(r.TEXTURE_2D,le,Ee,ke[0].width,ke[0].height);for(let q=0,$=ke.length;q<$;q++)oe=ke[q],We?L&&t.texSubImage2D(r.TEXTURE_2D,q,0,0,oe.width,oe.height,ge,Ve,oe.data):t.texImage2D(r.TEXTURE_2D,q,Ee,oe.width,oe.height,0,ge,Ve,oe.data);b.generateMipmaps=!1}else We?(Et&&t.texStorage2D(r.TEXTURE_2D,le,Ee,ee.width,ee.height),L&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ee.width,ee.height,ge,Ve,ee.data)):t.texImage2D(r.TEXTURE_2D,0,Ee,ee.width,ee.height,0,ge,Ve,ee.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){We&&Et&&t.texStorage3D(r.TEXTURE_2D_ARRAY,le,Ee,ke[0].width,ke[0].height,ee.depth);for(let q=0,$=ke.length;q<$;q++)if(oe=ke[q],b.format!==Pn)if(ge!==null)if(We){if(L)if(b.layerUpdates.size>0){for(let ne of b.layerUpdates){let Te=oe.width*oe.height;t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,ne,oe.width,oe.height,1,ge,oe.data.slice(Te*ne,Te*(ne+1)),0,0)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,0,oe.width,oe.height,ee.depth,ge,oe.data,0,0)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,q,Ee,oe.width,oe.height,ee.depth,0,oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?L&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,0,oe.width,oe.height,ee.depth,ge,Ve,oe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,q,Ee,oe.width,oe.height,ee.depth,0,ge,Ve,oe.data)}else{We&&Et&&t.texStorage2D(r.TEXTURE_2D,le,Ee,ke[0].width,ke[0].height);for(let q=0,$=ke.length;q<$;q++)oe=ke[q],b.format!==Pn?ge!==null?We?L&&t.compressedTexSubImage2D(r.TEXTURE_2D,q,0,0,oe.width,oe.height,ge,oe.data):t.compressedTexImage2D(r.TEXTURE_2D,q,Ee,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?L&&t.texSubImage2D(r.TEXTURE_2D,q,0,0,oe.width,oe.height,ge,Ve,oe.data):t.texImage2D(r.TEXTURE_2D,q,Ee,oe.width,oe.height,0,ge,Ve,oe.data)}else if(b.isDataArrayTexture)if(We){if(Et&&t.texStorage3D(r.TEXTURE_2D_ARRAY,le,Ee,ee.width,ee.height,ee.depth),L)if(b.layerUpdates.size>0){let q;switch(Ve){case r.UNSIGNED_BYTE:switch(ge){case r.ALPHA:q=1;break;case r.LUMINANCE:q=1;break;case r.LUMINANCE_ALPHA:q=2;break;case r.RGB:q=3;break;case r.RGBA:q=4;break;default:throw new Error(`Unknown texel size for format ${ge}.`)}break;case r.UNSIGNED_SHORT_4_4_4_4:case r.UNSIGNED_SHORT_5_5_5_1:case r.UNSIGNED_SHORT_5_6_5:q=1;break;default:throw new Error(`Unknown texel size for type ${Ve}.`)}let $=ee.width*ee.height*q;for(let ne of b.layerUpdates)t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ne,ee.width,ee.height,1,ge,Ve,ee.data.slice($*ne,$*(ne+1)));b.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ge,Ve,ee.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ee,ee.width,ee.height,ee.depth,0,ge,Ve,ee.data);else if(b.isData3DTexture)We?(Et&&t.texStorage3D(r.TEXTURE_3D,le,Ee,ee.width,ee.height,ee.depth),L&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ge,Ve,ee.data)):t.texImage3D(r.TEXTURE_3D,0,Ee,ee.width,ee.height,ee.depth,0,ge,Ve,ee.data);else if(b.isFramebufferTexture){if(Et)if(We)t.texStorage2D(r.TEXTURE_2D,le,Ee,ee.width,ee.height);else{let q=ee.width,$=ee.height;for(let ne=0;ne<le;ne++)t.texImage2D(r.TEXTURE_2D,ne,Ee,q,$,0,ge,Ve,null),q>>=1,$>>=1}}else if(ke.length>0){if(We&&Et){let q=Ct(ke[0]);t.texStorage2D(r.TEXTURE_2D,le,Ee,q.width,q.height)}for(let q=0,$=ke.length;q<$;q++)oe=ke[q],We?L&&t.texSubImage2D(r.TEXTURE_2D,q,0,0,ge,Ve,oe):t.texImage2D(r.TEXTURE_2D,q,Ee,ge,Ve,oe);b.generateMipmaps=!1}else if(We){if(Et){let q=Ct(ee);t.texStorage2D(r.TEXTURE_2D,le,Ee,q.width,q.height)}L&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ge,Ve,ee)}else t.texImage2D(r.TEXTURE_2D,0,Ee,ge,Ve,ee);p(b)&&m(Y),_e.__version=Z.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function X(C,b,z){if(b.image.length!==6)return;let Y=qe(C,b),K=b.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+z);let Z=n.get(K);if(K.version!==Z.__version||Y===!0){t.activeTexture(r.TEXTURE0+z);let _e=Ze.getPrimaries(Ze.workingColorSpace),re=b.colorSpace===yi?null:Ze.getPrimaries(b.colorSpace),se=b.colorSpace===yi||_e===re?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let Ne=b.isCompressedTexture||b.image[0].isCompressedTexture,ee=b.image[0]&&b.image[0].isDataTexture,ge=[];for(let $=0;$<6;$++)!Ne&&!ee?ge[$]=x(b.image[$],!0,i.maxCubemapSize):ge[$]=ee?b.image[$].image:b.image[$],ge[$]=Ie(b,ge[$]);let Ve=ge[0],Ee=s.convert(b.format,b.colorSpace),oe=s.convert(b.type),ke=v(b.internalFormat,Ee,oe,b.colorSpace),We=b.isVideoTexture!==!0,Et=Z.__version===void 0||Y===!0,L=K.dataReady,le=_(b,Ve);me(r.TEXTURE_CUBE_MAP,b);let q;if(Ne){We&&Et&&t.texStorage2D(r.TEXTURE_CUBE_MAP,le,ke,Ve.width,Ve.height);for(let $=0;$<6;$++){q=ge[$].mipmaps;for(let ne=0;ne<q.length;ne++){let Te=q[ne];b.format!==Pn?Ee!==null?We?L&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne,0,0,Te.width,Te.height,Ee,Te.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne,ke,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne,0,0,Te.width,Te.height,Ee,oe,Te.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne,ke,Te.width,Te.height,0,Ee,oe,Te.data)}}}else{if(q=b.mipmaps,We&&Et){q.length>0&&le++;let $=Ct(ge[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,le,ke,$.width,$.height)}for(let $=0;$<6;$++)if(ee){We?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ge[$].width,ge[$].height,Ee,oe,ge[$].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ke,ge[$].width,ge[$].height,0,Ee,oe,ge[$].data);for(let ne=0;ne<q.length;ne++){let Qe=q[ne].image[$].image;We?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne+1,0,0,Qe.width,Qe.height,Ee,oe,Qe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne+1,ke,Qe.width,Qe.height,0,Ee,oe,Qe.data)}}else{We?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Ee,oe,ge[$]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ke,Ee,oe,ge[$]);for(let ne=0;ne<q.length;ne++){let Te=q[ne];We?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne+1,0,0,Ee,oe,Te.image[$]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne+1,ke,Ee,oe,Te.image[$])}}}p(b)&&m(r.TEXTURE_CUBE_MAP),Z.__version=K.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function j(C,b,z,Y,K,Z){let _e=s.convert(z.format,z.colorSpace),re=s.convert(z.type),se=v(z.internalFormat,_e,re,z.colorSpace);if(!n.get(b).__hasExternalTextures){let ee=Math.max(1,b.width>>Z),ge=Math.max(1,b.height>>Z);K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?t.texImage3D(K,Z,se,ee,ge,b.depth,0,_e,re,null):t.texImage2D(K,Z,se,ee,ge,0,_e,re,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),Ke(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Y,K,n.get(z).__webglTexture,0,Se(b)):(K===r.TEXTURE_2D||K>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Y,K,n.get(z).__webglTexture,Z),t.bindFramebuffer(r.FRAMEBUFFER,null)}function de(C,b,z){if(r.bindRenderbuffer(r.RENDERBUFFER,C),b.depthBuffer){let Y=b.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,Z=y(b.stencilBuffer,K),_e=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,re=Se(b);Ke(b)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,re,Z,b.width,b.height):z?r.renderbufferStorageMultisample(r.RENDERBUFFER,re,Z,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,Z,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,_e,r.RENDERBUFFER,C)}else{let Y=b.textures;for(let K=0;K<Y.length;K++){let Z=Y[K],_e=s.convert(Z.format,Z.colorSpace),re=s.convert(Z.type),se=v(Z.internalFormat,_e,re,Z.colorSpace),Ne=Se(b);z&&Ke(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ne,se,b.width,b.height):Ke(b)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ne,se,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,se,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ae(C,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),H(b.depthTexture,0);let Y=n.get(b.depthTexture).__webglTexture,K=Se(b);if(b.depthTexture.format===Nr)Ke(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Y,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Y,0);else if(b.depthTexture.format===Gr)Ke(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Y,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function Fe(C){let b=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");ae(b.__webglFramebuffer,C)}else if(z){b.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[Y]),b.__webglDepthbuffer[Y]=r.createRenderbuffer(),de(b.__webglDepthbuffer[Y],C,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=r.createRenderbuffer(),de(b.__webglDepthbuffer,C,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ue(C,b,z){let Y=n.get(C);b!==void 0&&j(Y.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),z!==void 0&&Fe(C)}function $e(C){let b=C.texture,z=n.get(C),Y=n.get(b);C.addEventListener("dispose",E);let K=C.textures,Z=C.isWebGLCubeRenderTarget===!0,_e=K.length>1;if(_e||(Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture()),Y.__version=b.version,a.memory.textures++),Z){z.__webglFramebuffer=[];for(let re=0;re<6;re++)if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer[re]=[];for(let se=0;se<b.mipmaps.length;se++)z.__webglFramebuffer[re][se]=r.createFramebuffer()}else z.__webglFramebuffer[re]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer=[];for(let re=0;re<b.mipmaps.length;re++)z.__webglFramebuffer[re]=r.createFramebuffer()}else z.__webglFramebuffer=r.createFramebuffer();if(_e)for(let re=0,se=K.length;re<se;re++){let Ne=n.get(K[re]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=r.createTexture(),a.memory.textures++)}if(C.samples>0&&Ke(C)===!1){z.__webglMultisampledFramebuffer=r.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let re=0;re<K.length;re++){let se=K[re];z.__webglColorRenderbuffer[re]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,z.__webglColorRenderbuffer[re]);let Ne=s.convert(se.format,se.colorSpace),ee=s.convert(se.type),ge=v(se.internalFormat,Ne,ee,se.colorSpace,C.isXRRenderTarget===!0),Ve=Se(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ve,ge,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.RENDERBUFFER,z.__webglColorRenderbuffer[re])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=r.createRenderbuffer(),de(z.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Z){t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),me(r.TEXTURE_CUBE_MAP,b);for(let re=0;re<6;re++)if(b.mipmaps&&b.mipmaps.length>0)for(let se=0;se<b.mipmaps.length;se++)j(z.__webglFramebuffer[re][se],C,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+re,se);else j(z.__webglFramebuffer[re],C,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);p(b)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let re=0,se=K.length;re<se;re++){let Ne=K[re],ee=n.get(Ne);t.bindTexture(r.TEXTURE_2D,ee.__webglTexture),me(r.TEXTURE_2D,Ne),j(z.__webglFramebuffer,C,Ne,r.COLOR_ATTACHMENT0+re,r.TEXTURE_2D,0),p(Ne)&&m(r.TEXTURE_2D)}t.unbindTexture()}else{let re=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(re=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(re,Y.__webglTexture),me(re,b),b.mipmaps&&b.mipmaps.length>0)for(let se=0;se<b.mipmaps.length;se++)j(z.__webglFramebuffer[se],C,b,r.COLOR_ATTACHMENT0,re,se);else j(z.__webglFramebuffer,C,b,r.COLOR_ATTACHMENT0,re,0);p(b)&&m(re),t.unbindTexture()}C.depthBuffer&&Fe(C)}function D(C){let b=C.textures;for(let z=0,Y=b.length;z<Y;z++){let K=b[z];if(p(K)){let Z=C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,_e=n.get(K).__webglTexture;t.bindTexture(Z,_e),m(Z),t.unbindTexture()}}}let Xe=[],Ge=[];function _t(C){if(C.samples>0){if(Ke(C)===!1){let b=C.textures,z=C.width,Y=C.height,K=r.COLOR_BUFFER_BIT,Z=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,_e=n.get(C),re=b.length>1;if(re)for(let se=0;se<b.length;se++)t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+se,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+se,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let se=0;se<b.length;se++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(K|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(K|=r.STENCIL_BUFFER_BIT)),re){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,_e.__webglColorRenderbuffer[se]);let Ne=n.get(b[se]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ne,0)}r.blitFramebuffer(0,0,z,Y,0,0,z,Y,K,r.NEAREST),l===!0&&(Xe.length=0,Ge.length=0,Xe.push(r.COLOR_ATTACHMENT0+se),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Xe.push(Z),Ge.push(Z),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ge)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Xe))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),re)for(let se=0;se<b.length;se++){t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+se,r.RENDERBUFFER,_e.__webglColorRenderbuffer[se]);let Ne=n.get(b[se]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+se,r.TEXTURE_2D,Ne,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let b=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function Se(C){return Math.min(i.maxSamples,C.samples)}function Ke(C){let b=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Be(C){let b=a.render.frame;u.get(C)!==b&&(u.set(C,b),C.update())}function Ie(C,b){let z=C.colorSpace,Y=C.format,K=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==Wt&&z!==yi&&(Ze.getTransfer(z)===mt?(Y!==Pn||K!==bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),b}function Ct(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=T,this.setTexture2D=H,this.setTexture2DArray=V,this.setTexture3D=G,this.setTextureCube=Q,this.rebindTextures=Ue,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=j,this.useMultisampledRTT=Ke}function Av(r,e){function t(n,i=yi){let s,a=Ze.getTransfer(i);if(n===bi)return r.UNSIGNED_BYTE;if(n===vf)return r.UNSIGNED_SHORT_4_4_4_4;if(n===_f)return r.UNSIGNED_SHORT_5_5_5_1;if(n===am)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===rm)return r.BYTE;if(n===sm)return r.SHORT;if(n===Wa)return r.UNSIGNED_SHORT;if(n===yf)return r.INT;if(n===zr)return r.UNSIGNED_INT;if(n===Bn)return r.FLOAT;if(n===Co)return r.HALF_FLOAT;if(n===om)return r.ALPHA;if(n===lm)return r.RGB;if(n===Pn)return r.RGBA;if(n===cm)return r.LUMINANCE;if(n===um)return r.LUMINANCE_ALPHA;if(n===Nr)return r.DEPTH_COMPONENT;if(n===Gr)return r.DEPTH_STENCIL;if(n===Mf)return r.RED;if(n===Sf)return r.RED_INTEGER;if(n===hm)return r.RG;if(n===bf)return r.RG_INTEGER;if(n===wf)return r.RGBA_INTEGER;if(n===Ul||n===Nl||n===kl||n===Fl)if(a===mt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ul)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Nl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===kl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ul)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Nl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===kl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Rh||n===Ch||n===Ph||n===Ih)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Rh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ch)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ph)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ih)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Lh||n===Dh||n===Uh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Lh||n===Dh)return a===mt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Uh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Nh||n===kh||n===Fh||n===Bh||n===Oh||n===Hh||n===zh||n===Vh||n===Gh||n===Wh||n===qh||n===Xh||n===$h||n===Yh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Nh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===kh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Bh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Oh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Hh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===zh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Vh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Gh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Wh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$h)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Yh)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bl||n===Kh||n===Zh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Bl)return a===mt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Kh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Zh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===dm||n===Jh||n===jh||n===Qh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Bl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Jh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===jh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Qh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vr?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}var Bc=class extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},st=class extends Je{constructor(){super(),this.isGroup=!0,this.type="Group"}},Rv={type:"move"},Es=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new st,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new st,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new st,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let p=t.getJointPose(x,n),m=this._getHandJoint(c,x);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Rv)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new st;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Cv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pv=`
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

}`,Oc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let i=new Gt,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new rn({vertexShader:Cv,fragmentShader:Pv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Re(new un(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}},Hc=class extends Qn{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,g=null,x=new Oc,p=t.getContextAttributes(),m=null,v=null,y=[],_=[],I=new J,E=null,R=new Ut;R.layers.enable(1),R.viewport=new ht;let P=new Ut;P.layers.enable(2),P.viewport=new ht;let S=[R,P],M=new Bc;M.layers.enable(1),M.layers.enable(2);let T=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let j=y[X];return j===void 0&&(j=new Es,y[X]=j),j.getTargetRaySpace()},this.getControllerGrip=function(X){let j=y[X];return j===void 0&&(j=new Es,y[X]=j),j.getGripSpace()},this.getHand=function(X){let j=y[X];return j===void 0&&(j=new Es,y[X]=j),j.getHandSpace()};function k(X){let j=_.indexOf(X.inputSource);if(j===-1)return;let de=y[j];de!==void 0&&(de.update(X.inputSource,X.frame,c||a),de.dispatchEvent({type:X.type,data:X.inputSource}))}function H(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",V);for(let X=0;X<y.length;X++){let j=_[X];j!==null&&(_[X]=null,y[X].disconnect(j))}T=null,U=null,x.reset(),e.setRenderTarget(m),f=null,d=null,h=null,i=null,v=null,at.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",H),i.addEventListener("inputsourceschange",V),p.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(I),i.renderState.layers===void 0){let j={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,j),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new ei(f.framebufferWidth,f.framebufferHeight,{format:Pn,type:bi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let j=null,de=null,ae=null;p.depth&&(ae=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=p.stencil?Gr:Nr,de=p.stencil?Vr:zr);let Fe={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:s};h=new XRWebGLBinding(i,t),d=h.createProjectionLayer(Fe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new ei(d.textureWidth,d.textureHeight,{format:Pn,type:bi,depthTexture:new io(d.textureWidth,d.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),at.setContext(i),at.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function V(X){for(let j=0;j<X.removed.length;j++){let de=X.removed[j],ae=_.indexOf(de);ae>=0&&(_[ae]=null,y[ae].disconnect(de))}for(let j=0;j<X.added.length;j++){let de=X.added[j],ae=_.indexOf(de);if(ae===-1){for(let Ue=0;Ue<y.length;Ue++)if(Ue>=_.length){_.push(de),ae=Ue;break}else if(_[Ue]===null){_[Ue]=de,ae=Ue;break}if(ae===-1)break}let Fe=y[ae];Fe&&Fe.connect(de)}}let G=new A,Q=new A;function W(X,j,de){G.setFromMatrixPosition(j.matrixWorld),Q.setFromMatrixPosition(de.matrixWorld);let ae=G.distanceTo(Q),Fe=j.projectionMatrix.elements,Ue=de.projectionMatrix.elements,$e=Fe[14]/(Fe[10]-1),D=Fe[14]/(Fe[10]+1),Xe=(Fe[9]+1)/Fe[5],Ge=(Fe[9]-1)/Fe[5],_t=(Fe[8]-1)/Fe[0],Se=(Ue[8]+1)/Ue[0],Ke=$e*_t,Be=$e*Se,Ie=ae/(-_t+Se),Ct=Ie*-_t;j.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ct),X.translateZ(Ie),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();let C=$e+Ie,b=D+Ie,z=Ke-Ct,Y=Be+(ae-Ct),K=Xe*D/b*C,Z=Ge*D/b*C;X.projectionMatrix.makePerspective(z,Y,K,Z,C,b),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function ue(X,j){j===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(j.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;x.texture!==null&&(X.near=x.depthNear,X.far=x.depthFar),M.near=P.near=R.near=X.near,M.far=P.far=R.far=X.far,(T!==M.near||U!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),T=M.near,U=M.far,R.near=T,R.far=U,P.near=T,P.far=U,R.updateProjectionMatrix(),P.updateProjectionMatrix(),X.updateProjectionMatrix());let j=X.parent,de=M.cameras;ue(M,j);for(let ae=0;ae<de.length;ae++)ue(de[ae],j);de.length===2?W(M,R,P):M.projectionMatrix.copy(R.projectionMatrix),fe(X,M,j)};function fe(X,j,de){de===null?X.matrix.copy(j.matrixWorld):(X.matrix.copy(de.matrixWorld),X.matrix.invert(),X.matrix.multiply(j.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(j.projectionMatrix),X.projectionMatrixInverse.copy(j.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Xr*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let me=null;function qe(X,j){if(u=j.getViewerPose(c||a),g=j,u!==null){let de=u.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let ae=!1;de.length!==M.cameras.length&&(M.cameras.length=0,ae=!0);for(let Ue=0;Ue<de.length;Ue++){let $e=de[Ue],D=null;if(f!==null)D=f.getViewport($e);else{let Ge=h.getViewSubImage(d,$e);D=Ge.viewport,Ue===0&&(e.setRenderTargetTextures(v,Ge.colorTexture,d.ignoreDepthValues?void 0:Ge.depthStencilTexture),e.setRenderTarget(v))}let Xe=S[Ue];Xe===void 0&&(Xe=new Ut,Xe.layers.enable(Ue),Xe.viewport=new ht,S[Ue]=Xe),Xe.matrix.fromArray($e.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray($e.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(D.x,D.y,D.width,D.height),Ue===0&&(M.matrix.copy(Xe.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ae===!0&&M.cameras.push(Xe)}let Fe=i.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")){let Ue=h.getDepthInformation(de[0]);Ue&&Ue.isValid&&Ue.texture&&x.init(e,Ue,i.renderState)}}for(let de=0;de<y.length;de++){let ae=_[de],Fe=y[de];ae!==null&&Fe!==void 0&&Fe.update(ae,j,c||a)}me&&me(X,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}let at=new Lf;at.setAnimationLoop(qe),this.setAnimationLoop=function(X){me=X},this.dispose=function(){}}},$i=new yn,Iv=new Ce;function Lv(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,If(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,v,y,_){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),h(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,_)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),x(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,v,y):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Vt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Vt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let v=e.get(m),y=v.envMap,_=v.envMapRotation;y&&(p.envMap.value=y,$i.copy(_),$i.x*=-1,$i.y*=-1,$i.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&($i.y*=-1,$i.z*=-1),p.envMapRotation.value.setFromMatrix4(Iv.makeRotationFromEuler($i)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,v,y){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*v,p.scale.value=y*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,v){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Vt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function x(p,m){let v=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Dv(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){let _=y.program;n.uniformBlockBinding(v,_)}function c(v,y){let _=i[v.id];_===void 0&&(g(v),_=u(v),i[v.id]=_,v.addEventListener("dispose",p));let I=y.program;n.updateUBOMapping(v,I);let E=e.render.frame;s[v.id]!==E&&(d(v),s[v.id]=E)}function u(v){let y=h();v.__bindingPointIndex=y;let _=r.createBuffer(),I=v.__size,E=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,_),r.bufferData(r.UNIFORM_BUFFER,I,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,_),_}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let y=i[v.id],_=v.uniforms,I=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let E=0,R=_.length;E<R;E++){let P=Array.isArray(_[E])?_[E]:[_[E]];for(let S=0,M=P.length;S<M;S++){let T=P[S];if(f(T,E,S,I)===!0){let U=T.__offset,k=Array.isArray(T.value)?T.value:[T.value],H=0;for(let V=0;V<k.length;V++){let G=k[V],Q=x(G);typeof G=="number"||typeof G=="boolean"?(T.__data[0]=G,r.bufferSubData(r.UNIFORM_BUFFER,U+H,T.__data)):G.isMatrix3?(T.__data[0]=G.elements[0],T.__data[1]=G.elements[1],T.__data[2]=G.elements[2],T.__data[3]=0,T.__data[4]=G.elements[3],T.__data[5]=G.elements[4],T.__data[6]=G.elements[5],T.__data[7]=0,T.__data[8]=G.elements[6],T.__data[9]=G.elements[7],T.__data[10]=G.elements[8],T.__data[11]=0):(G.toArray(T.__data,H),H+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,T.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,y,_,I){let E=v.value,R=y+"_"+_;if(I[R]===void 0)return typeof E=="number"||typeof E=="boolean"?I[R]=E:I[R]=E.clone(),!0;{let P=I[R];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return I[R]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function g(v){let y=v.uniforms,_=0,I=16;for(let R=0,P=y.length;R<P;R++){let S=Array.isArray(y[R])?y[R]:[y[R]];for(let M=0,T=S.length;M<T;M++){let U=S[M],k=Array.isArray(U.value)?U.value:[U.value];for(let H=0,V=k.length;H<V;H++){let G=k[H],Q=x(G),W=_%I;W!==0&&I-W<Q.boundary&&(_+=I-W),U.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=_,_+=Q.storage}}}let E=_%I;return E>0&&(_+=I-E),v.__size=_,v.__cache={},this}function x(v){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function p(v){let y=v.target;y.removeEventListener("dispose",p);let _=a.indexOf(y.__bindingPointIndex);a.splice(_,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function m(){for(let v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}var ro=class{constructor(e={}){let{canvas:t=zm(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let f=new Uint32Array(4),g=new Int32Array(4),x=null,p=null,m=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=wt,this.toneMapping=Si,this.toneMappingExposure=1;let y=this,_=!1,I=0,E=0,R=null,P=-1,S=null,M=new ht,T=new ht,U=null,k=new xe(0),H=0,V=t.width,G=t.height,Q=1,W=null,ue=null,fe=new ht(0,0,V,G),me=new ht(0,0,V,G),qe=!1,at=new Ls,X=!1,j=!1,de=new Ce,ae=new A,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ue=!1;function $e(){return R===null?Q:1}let D=n;function Xe(w,N){return t.getContext(w,N)}try{let w={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r165"),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",q,!1),t.addEventListener("webglcontextcreationerror",$,!1),D===null){let N="webgl2";if(D=Xe(N,w),D===null)throw Xe(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Ge,_t,Se,Ke,Be,Ie,Ct,C,b,z,Y,K,Z,_e,re,se,Ne,ee,ge,Ve,Ee,oe,ke,We;function Et(){Ge=new j0(D),Ge.init(),oe=new Av(D,Ge),_t=new X0(D,Ge,e,oe),Se=new Ev(D),Ke=new ty(D),Be=new fv,Ie=new Tv(D,Ge,Se,Be,_t,oe,Ke),Ct=new Y0(y),C=new J0(y),b=new lg(D),ke=new W0(D,b),z=new Q0(D,b,Ke,ke),Y=new iy(D,z,b,Ke),ge=new ny(D,_t,Ie),se=new $0(Be),K=new dv(y,Ct,C,Ge,_t,ke,se),Z=new Lv(y,Be),_e=new mv,re=new Mv(Ge),ee=new G0(y,Ct,C,Se,Y,d,l),Ne=new wv(y,Y,_t),We=new Dv(D,Ke,_t,Se),Ve=new q0(D,Ge,Ke),Ee=new ey(D,Ge,Ke),Ke.programs=K.programs,y.capabilities=_t,y.extensions=Ge,y.properties=Be,y.renderLists=_e,y.shadowMap=Ne,y.state=Se,y.info=Ke}Et();let L=new Hc(y,D);this.xr=L,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let w=Ge.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=Ge.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(w){w!==void 0&&(Q=w,this.setSize(V,G,!1))},this.getSize=function(w){return w.set(V,G)},this.setSize=function(w,N,B=!0){if(L.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=w,G=N,t.width=Math.floor(w*Q),t.height=Math.floor(N*Q),B===!0&&(t.style.width=w+"px",t.style.height=N+"px"),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(V*Q,G*Q).floor()},this.setDrawingBufferSize=function(w,N,B){V=w,G=N,Q=B,t.width=Math.floor(w*B),t.height=Math.floor(N*B),this.setViewport(0,0,w,N)},this.getCurrentViewport=function(w){return w.copy(M)},this.getViewport=function(w){return w.copy(fe)},this.setViewport=function(w,N,B,O){w.isVector4?fe.set(w.x,w.y,w.z,w.w):fe.set(w,N,B,O),Se.viewport(M.copy(fe).multiplyScalar(Q).round())},this.getScissor=function(w){return w.copy(me)},this.setScissor=function(w,N,B,O){w.isVector4?me.set(w.x,w.y,w.z,w.w):me.set(w,N,B,O),Se.scissor(T.copy(me).multiplyScalar(Q).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(w){Se.setScissorTest(qe=w)},this.setOpaqueSort=function(w){W=w},this.setTransparentSort=function(w){ue=w},this.getClearColor=function(w){return w.copy(ee.getClearColor())},this.setClearColor=function(){ee.setClearColor.apply(ee,arguments)},this.getClearAlpha=function(){return ee.getClearAlpha()},this.setClearAlpha=function(){ee.setClearAlpha.apply(ee,arguments)},this.clear=function(w=!0,N=!0,B=!0){let O=0;if(w){let F=!1;if(R!==null){let te=R.texture.format;F=te===wf||te===bf||te===Sf}if(F){let te=R.texture.type,ce=te===bi||te===zr||te===Wa||te===Vr||te===vf||te===_f,he=ee.getClearColor(),pe=ee.getClearAlpha(),be=he.r,we=he.g,Me=he.b;ce?(f[0]=be,f[1]=we,f[2]=Me,f[3]=pe,D.clearBufferuiv(D.COLOR,0,f)):(g[0]=be,g[1]=we,g[2]=Me,g[3]=pe,D.clearBufferiv(D.COLOR,0,g))}else O|=D.COLOR_BUFFER_BIT}N&&(O|=D.DEPTH_BUFFER_BIT),B&&(O|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",q,!1),t.removeEventListener("webglcontextcreationerror",$,!1),_e.dispose(),re.dispose(),Be.dispose(),Ct.dispose(),C.dispose(),Y.dispose(),ke.dispose(),We.dispose(),K.dispose(),L.dispose(),L.removeEventListener("sessionstart",Un),L.removeEventListener("sessionend",Nn),Oi.stop()};function le(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function q(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1;let w=Ke.autoReset,N=Ne.enabled,B=Ne.autoUpdate,O=Ne.needsUpdate,F=Ne.type;Et(),Ke.autoReset=w,Ne.enabled=N,Ne.autoUpdate=B,Ne.needsUpdate=O,Ne.type=F}function $(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ne(w){let N=w.target;N.removeEventListener("dispose",ne),Te(N)}function Te(w){Qe(w),Be.remove(w)}function Qe(w){let N=Be.get(w).programs;N!==void 0&&(N.forEach(function(B){K.releaseProgram(B)}),w.isShaderMaterial&&K.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,B,O,F,te){N===null&&(N=Fe);let ce=F.isMesh&&F.matrixWorld.determinant()<0,he=xp(w,N,B,O,F);Se.setMaterial(O,ce);let pe=B.index,be=1;if(O.wireframe===!0){if(pe=z.getWireframeAttribute(B),pe===void 0)return;be=2}let we=B.drawRange,Me=B.attributes.position,tt=we.start*be,St=(we.start+we.count)*be;te!==null&&(tt=Math.max(tt,te.start*be),St=Math.min(St,(te.start+te.count)*be)),pe!==null?(tt=Math.max(tt,0),St=Math.min(St,pe.count)):Me!=null&&(tt=Math.max(tt,0),St=Math.min(St,Me.count));let bt=St-tt;if(bt<0||bt===1/0)return;ke.setup(F,O,he,B,pe);let an,it=Ve;if(pe!==null&&(an=b.get(pe),it=Ee,it.setIndex(an)),F.isMesh)O.wireframe===!0?(Se.setLineWidth(O.wireframeLinewidth*$e()),it.setMode(D.LINES)):it.setMode(D.TRIANGLES);else if(F.isLine){let ve=O.linewidth;ve===void 0&&(ve=1),Se.setLineWidth(ve*$e()),F.isLineSegments?it.setMode(D.LINES):F.isLineLoop?it.setMode(D.LINE_LOOP):it.setMode(D.LINE_STRIP)}else F.isPoints?it.setMode(D.POINTS):F.isSprite&&it.setMode(D.TRIANGLES);if(F.isBatchedMesh)F._multiDrawInstances!==null?it.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances):it.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)it.renderInstances(tt,bt,F.count);else if(B.isInstancedBufferGeometry){let ve=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,jt=Math.min(B.instanceCount,ve);it.renderInstances(tt,bt,jt)}else it.render(tt,bt)};function Tt(w,N,B){w.transparent===!0&&w.side===Nt&&w.forceSinglePass===!1?(w.side=Vt,w.needsUpdate=!0,na(w,N,B),w.side=On,w.needsUpdate=!0,na(w,N,B),w.side=Nt):na(w,N,B)}this.compile=function(w,N,B=null){B===null&&(B=w),p=re.get(B),p.init(N),v.push(p),B.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),w!==B&&w.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();let O=new Set;return w.traverse(function(F){let te=F.material;if(te)if(Array.isArray(te))for(let ce=0;ce<te.length;ce++){let he=te[ce];Tt(he,B,F),O.add(he)}else Tt(te,B,F),O.add(te)}),v.pop(),p=null,O},this.compileAsync=function(w,N,B=null){let O=this.compile(w,N,B);return new Promise(F=>{function te(){if(O.forEach(function(ce){Be.get(ce).currentProgram.isReady()&&O.delete(ce)}),O.size===0){F(w);return}setTimeout(te,10)}Ge.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Ot=null;function ot(w){Ot&&Ot(w)}function Un(){Oi.stop()}function Nn(){Oi.start()}let Oi=new Lf;Oi.setAnimationLoop(ot),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(w){Ot=w,L.setAnimationLoop(w),w===null?Oi.stop():Oi.start()},L.addEventListener("sessionstart",Un),L.addEventListener("sessionend",Nn),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),L.enabled===!0&&L.isPresenting===!0&&(L.cameraAutoUpdate===!0&&L.updateCamera(N),N=L.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,N,R),p=re.get(w,v.length),p.init(N),v.push(p),de.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),at.setFromProjectionMatrix(de),j=this.localClippingEnabled,X=se.init(this.clippingPlanes,j),x=_e.get(w,m.length),x.init(),m.push(x),L.enabled===!0&&L.isPresenting===!0){let te=y.xr.getDepthSensingMesh();te!==null&&Go(te,N,-1/0,y.sortObjects)}Go(w,N,0,y.sortObjects),x.finish(),y.sortObjects===!0&&x.sort(W,ue),Ue=L.enabled===!1||L.isPresenting===!1||L.hasDepthSensing()===!1,Ue&&ee.addToRenderList(x,w),this.info.render.frame++,X===!0&&se.beginShadows();let B=p.state.shadowsArray;Ne.render(B,w,N),X===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset();let O=x.opaque,F=x.transmissive;if(p.setupLights(),N.isArrayCamera){let te=N.cameras;if(F.length>0)for(let ce=0,he=te.length;ce<he;ce++){let pe=te[ce];dh(O,F,w,pe)}Ue&&ee.render(w);for(let ce=0,he=te.length;ce<he;ce++){let pe=te[ce];hh(x,w,pe,pe.viewport)}}else F.length>0&&dh(O,F,w,N),Ue&&ee.render(w),hh(x,w,N);R!==null&&(Ie.updateMultisampleRenderTarget(R),Ie.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(y,w,N),ke.resetDefaultState(),P=-1,S=null,v.pop(),v.length>0?(p=v[v.length-1],X===!0&&se.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?x=m[m.length-1]:x=null};function Go(w,N,B,O){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)B=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||at.intersectsSprite(w)){O&&ae.setFromMatrixPosition(w.matrixWorld).applyMatrix4(de);let ce=Y.update(w),he=w.material;he.visible&&x.push(w,ce,he,B,ae.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||at.intersectsObject(w))){let ce=Y.update(w),he=w.material;if(O&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ae.copy(w.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),ae.copy(ce.boundingSphere.center)),ae.applyMatrix4(w.matrixWorld).applyMatrix4(de)),Array.isArray(he)){let pe=ce.groups;for(let be=0,we=pe.length;be<we;be++){let Me=pe[be],tt=he[Me.materialIndex];tt&&tt.visible&&x.push(w,ce,tt,B,ae.z,Me)}}else he.visible&&x.push(w,ce,he,B,ae.z,null)}}let te=w.children;for(let ce=0,he=te.length;ce<he;ce++)Go(te[ce],N,B,O)}function hh(w,N,B,O){let F=w.opaque,te=w.transmissive,ce=w.transparent;p.setupLightsView(B),X===!0&&se.setGlobalState(y.clippingPlanes,B),O&&Se.viewport(M.copy(O)),F.length>0&&ta(F,N,B),te.length>0&&ta(te,N,B),ce.length>0&&ta(ce,N,B),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function dh(w,N,B,O){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[O.id]===void 0&&(p.state.transmissionRenderTarget[O.id]=new ei(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?Co:bi,minFilter:Fn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));let te=p.state.transmissionRenderTarget[O.id],ce=O.viewport||M;te.setSize(ce.z,ce.w);let he=y.getRenderTarget();y.setRenderTarget(te),y.getClearColor(k),H=y.getClearAlpha(),H<1&&y.setClearColor(16777215,.5),Ue?ee.render(B):y.clear();let pe=y.toneMapping;y.toneMapping=Si;let be=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),p.setupLightsView(O),X===!0&&se.setGlobalState(y.clippingPlanes,O),ta(w,B,O),Ie.updateMultisampleRenderTarget(te),Ie.updateRenderTargetMipmap(te),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let Me=0,tt=N.length;Me<tt;Me++){let St=N[Me],bt=St.object,an=St.geometry,it=St.material,ve=St.group;if(it.side===Nt&&bt.layers.test(O.layers)){let jt=it.side;it.side=Vt,it.needsUpdate=!0,fh(bt,B,O,an,it,ve),it.side=jt,it.needsUpdate=!0,we=!0}}we===!0&&(Ie.updateMultisampleRenderTarget(te),Ie.updateRenderTargetMipmap(te))}y.setRenderTarget(he),y.setClearColor(k,H),be!==void 0&&(O.viewport=be),y.toneMapping=pe}function ta(w,N,B){let O=N.isScene===!0?N.overrideMaterial:null;for(let F=0,te=w.length;F<te;F++){let ce=w[F],he=ce.object,pe=ce.geometry,be=O===null?ce.material:O,we=ce.group;he.layers.test(B.layers)&&fh(he,N,B,pe,be,we)}}function fh(w,N,B,O,F,te){w.onBeforeRender(y,N,B,O,F,te),w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(y,N,B,O,w,te),F.transparent===!0&&F.side===Nt&&F.forceSinglePass===!1?(F.side=Vt,F.needsUpdate=!0,y.renderBufferDirect(B,N,O,F,w,te),F.side=On,F.needsUpdate=!0,y.renderBufferDirect(B,N,O,F,w,te),F.side=Nt):y.renderBufferDirect(B,N,O,F,w,te),w.onAfterRender(y,N,B,O,F,te)}function na(w,N,B){N.isScene!==!0&&(N=Fe);let O=Be.get(w),F=p.state.lights,te=p.state.shadowsArray,ce=F.state.version,he=K.getParameters(w,F.state,te,N,B),pe=K.getProgramCacheKey(he),be=O.programs;O.environment=w.isMeshStandardMaterial?N.environment:null,O.fog=N.fog,O.envMap=(w.isMeshStandardMaterial?C:Ct).get(w.envMap||O.environment),O.envMapRotation=O.environment!==null&&w.envMap===null?N.environmentRotation:w.envMapRotation,be===void 0&&(w.addEventListener("dispose",ne),be=new Map,O.programs=be);let we=be.get(pe);if(we!==void 0){if(O.currentProgram===we&&O.lightsStateVersion===ce)return mh(w,he),we}else he.uniforms=K.getUniforms(w),w.onBuild(B,he,y),w.onBeforeCompile(he,y),we=K.acquireProgram(he,pe),be.set(pe,we),O.uniforms=he.uniforms;let Me=O.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Me.clippingPlanes=se.uniform),mh(w,he),O.needsLights=vp(w),O.lightsStateVersion=ce,O.needsLights&&(Me.ambientLightColor.value=F.state.ambient,Me.lightProbe.value=F.state.probe,Me.directionalLights.value=F.state.directional,Me.directionalLightShadows.value=F.state.directionalShadow,Me.spotLights.value=F.state.spot,Me.spotLightShadows.value=F.state.spotShadow,Me.rectAreaLights.value=F.state.rectArea,Me.ltc_1.value=F.state.rectAreaLTC1,Me.ltc_2.value=F.state.rectAreaLTC2,Me.pointLights.value=F.state.point,Me.pointLightShadows.value=F.state.pointShadow,Me.hemisphereLights.value=F.state.hemi,Me.directionalShadowMap.value=F.state.directionalShadowMap,Me.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Me.spotShadowMap.value=F.state.spotShadowMap,Me.spotLightMatrix.value=F.state.spotLightMatrix,Me.spotLightMap.value=F.state.spotLightMap,Me.pointShadowMap.value=F.state.pointShadowMap,Me.pointShadowMatrix.value=F.state.pointShadowMatrix),O.currentProgram=we,O.uniformsList=null,we}function ph(w){if(w.uniformsList===null){let N=w.currentProgram.getUniforms();w.uniformsList=Br.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function mh(w,N){let B=Be.get(w);B.outputColorSpace=N.outputColorSpace,B.batching=N.batching,B.batchingColor=N.batchingColor,B.instancing=N.instancing,B.instancingColor=N.instancingColor,B.instancingMorph=N.instancingMorph,B.skinning=N.skinning,B.morphTargets=N.morphTargets,B.morphNormals=N.morphNormals,B.morphColors=N.morphColors,B.morphTargetsCount=N.morphTargetsCount,B.numClippingPlanes=N.numClippingPlanes,B.numIntersection=N.numClipIntersection,B.vertexAlphas=N.vertexAlphas,B.vertexTangents=N.vertexTangents,B.toneMapping=N.toneMapping}function xp(w,N,B,O,F){N.isScene!==!0&&(N=Fe),Ie.resetTextureUnits();let te=N.fog,ce=O.isMeshStandardMaterial?N.environment:null,he=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Wt,pe=(O.isMeshStandardMaterial?C:Ct).get(O.envMap||ce),be=O.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,we=!!B.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Me=!!B.morphAttributes.position,tt=!!B.morphAttributes.normal,St=!!B.morphAttributes.color,bt=Si;O.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(bt=y.toneMapping);let an=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,it=an!==void 0?an.length:0,ve=Be.get(O),jt=p.state.lights;if(X===!0&&(j===!0||w!==S)){let mn=w===S&&O.id===P;se.setState(O,w,mn)}let lt=!1;O.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==jt.state.version||ve.outputColorSpace!==he||F.isBatchedMesh&&ve.batching===!1||!F.isBatchedMesh&&ve.batching===!0||F.isBatchedMesh&&ve.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&ve.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&ve.instancing===!1||!F.isInstancedMesh&&ve.instancing===!0||F.isSkinnedMesh&&ve.skinning===!1||!F.isSkinnedMesh&&ve.skinning===!0||F.isInstancedMesh&&ve.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&ve.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&ve.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&ve.instancingMorph===!1&&F.morphTexture!==null||ve.envMap!==pe||O.fog===!0&&ve.fog!==te||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==se.numPlanes||ve.numIntersection!==se.numIntersection)||ve.vertexAlphas!==be||ve.vertexTangents!==we||ve.morphTargets!==Me||ve.morphNormals!==tt||ve.morphColors!==St||ve.toneMapping!==bt||ve.morphTargetsCount!==it)&&(lt=!0):(lt=!0,ve.__version=O.version);let Vn=ve.currentProgram;lt===!0&&(Vn=na(O,N,F));let ia=!1,Hi=!1,Wo=!1,Ht=Vn.getUniforms(),hi=ve.uniforms;if(Se.useProgram(Vn.program)&&(ia=!0,Hi=!0,Wo=!0),O.id!==P&&(P=O.id,Hi=!0),ia||S!==w){Ht.setValue(D,"projectionMatrix",w.projectionMatrix),Ht.setValue(D,"viewMatrix",w.matrixWorldInverse);let mn=Ht.map.cameraPosition;mn!==void 0&&mn.setValue(D,ae.setFromMatrixPosition(w.matrixWorld)),_t.logarithmicDepthBuffer&&Ht.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Ht.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,Hi=!0,Wo=!0)}if(F.isSkinnedMesh){Ht.setOptional(D,F,"bindMatrix"),Ht.setOptional(D,F,"bindMatrixInverse");let mn=F.skeleton;mn&&(mn.boneTexture===null&&mn.computeBoneTexture(),Ht.setValue(D,"boneTexture",mn.boneTexture,Ie))}F.isBatchedMesh&&(Ht.setOptional(D,F,"batchingTexture"),Ht.setValue(D,"batchingTexture",F._matricesTexture,Ie),Ht.setOptional(D,F,"batchingColorTexture"),F._colorsTexture!==null&&Ht.setValue(D,"batchingColorTexture",F._colorsTexture,Ie));let qo=B.morphAttributes;if((qo.position!==void 0||qo.normal!==void 0||qo.color!==void 0)&&ge.update(F,B,Vn),(Hi||ve.receiveShadow!==F.receiveShadow)&&(ve.receiveShadow=F.receiveShadow,Ht.setValue(D,"receiveShadow",F.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(hi.envMap.value=pe,hi.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&N.environment!==null&&(hi.envMapIntensity.value=N.environmentIntensity),Hi&&(Ht.setValue(D,"toneMappingExposure",y.toneMappingExposure),ve.needsLights&&yp(hi,Wo),te&&O.fog===!0&&Z.refreshFogUniforms(hi,te),Z.refreshMaterialUniforms(hi,O,Q,G,p.state.transmissionRenderTarget[w.id]),Br.upload(D,ph(ve),hi,Ie)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Br.upload(D,ph(ve),hi,Ie),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Ht.setValue(D,"center",F.center),Ht.setValue(D,"modelViewMatrix",F.modelViewMatrix),Ht.setValue(D,"normalMatrix",F.normalMatrix),Ht.setValue(D,"modelMatrix",F.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){let mn=O.uniformsGroups;for(let Xo=0,_p=mn.length;Xo<_p;Xo++){let gh=mn[Xo];We.update(gh,Vn),We.bind(gh,Vn)}}return Vn}function yp(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function vp(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,N,B){Be.get(w.texture).__webglTexture=N,Be.get(w.depthTexture).__webglTexture=B;let O=Be.get(w);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=B===void 0,O.__autoAllocateDepthBuffer||Ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,N){let B=Be.get(w);B.__webglFramebuffer=N,B.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(w,N=0,B=0){R=w,I=N,E=B;let O=!0,F=null,te=!1,ce=!1;if(w){let pe=Be.get(w);pe.__useDefaultFramebuffer!==void 0?(Se.bindFramebuffer(D.FRAMEBUFFER,null),O=!1):pe.__webglFramebuffer===void 0?Ie.setupRenderTarget(w):pe.__hasExternalTextures&&Ie.rebindTextures(w,Be.get(w.texture).__webglTexture,Be.get(w.depthTexture).__webglTexture);let be=w.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(ce=!0);let we=Be.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(we[N])?F=we[N][B]:F=we[N],te=!0):w.samples>0&&Ie.useMultisampledRTT(w)===!1?F=Be.get(w).__webglMultisampledFramebuffer:Array.isArray(we)?F=we[B]:F=we,M.copy(w.viewport),T.copy(w.scissor),U=w.scissorTest}else M.copy(fe).multiplyScalar(Q).floor(),T.copy(me).multiplyScalar(Q).floor(),U=qe;if(Se.bindFramebuffer(D.FRAMEBUFFER,F)&&O&&Se.drawBuffers(w,F),Se.viewport(M),Se.scissor(T),Se.setScissorTest(U),te){let pe=Be.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+N,pe.__webglTexture,B)}else if(ce){let pe=Be.get(w.texture),be=N||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,pe.__webglTexture,B||0,be)}P=-1},this.readRenderTargetPixels=function(w,N,B,O,F,te,ce){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let he=Be.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ce!==void 0&&(he=he[ce]),he){Se.bindFramebuffer(D.FRAMEBUFFER,he);try{let pe=w.texture,be=pe.format,we=pe.type;if(!_t.textureFormatReadable(be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(we)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-O&&B>=0&&B<=w.height-F&&D.readPixels(N,B,O,F,oe.convert(be),oe.convert(we),te)}finally{let pe=R!==null?Be.get(R).__webglFramebuffer:null;Se.bindFramebuffer(D.FRAMEBUFFER,pe)}}},this.readRenderTargetPixelsAsync=async function(w,N,B,O,F,te,ce){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let he=Be.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ce!==void 0&&(he=he[ce]),he){Se.bindFramebuffer(D.FRAMEBUFFER,he);try{let pe=w.texture,be=pe.format,we=pe.type;if(!_t.textureFormatReadable(be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=w.width-O&&B>=0&&B<=w.height-F){let Me=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Me),D.bufferData(D.PIXEL_PACK_BUFFER,te.byteLength,D.STREAM_READ),D.readPixels(N,B,O,F,oe.convert(be),oe.convert(we),0),D.flush();let tt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);await Vm(D,tt,4);try{D.bindBuffer(D.PIXEL_PACK_BUFFER,Me),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,te)}finally{D.deleteBuffer(Me),D.deleteSync(tt)}return te}}finally{let pe=R!==null?Be.get(R).__webglFramebuffer:null;Se.bindFramebuffer(D.FRAMEBUFFER,pe)}}},this.copyFramebufferToTexture=function(w,N=null,B=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,w=arguments[1]);let O=Math.pow(2,-B),F=Math.floor(w.image.width*O),te=Math.floor(w.image.height*O),ce=N!==null?N.x:0,he=N!==null?N.y:0;Ie.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,B,0,0,ce,he,F,te),Se.unbindTexture()},this.copyTextureToTexture=function(w,N,B=null,O=null,F=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,w=arguments[1],N=arguments[2],F=arguments[3]||0,B=null);let te,ce,he,pe,be,we;B!==null?(te=B.max.x-B.min.x,ce=B.max.y-B.min.y,he=B.min.x,pe=B.min.y):(te=w.image.width,ce=w.image.height,he=0,pe=0),O!==null?(be=O.x,we=O.y):(be=0,we=0);let Me=oe.convert(N.format),tt=oe.convert(N.type);Ie.setTexture2D(N,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);let St=D.getParameter(D.UNPACK_ROW_LENGTH),bt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),an=D.getParameter(D.UNPACK_SKIP_PIXELS),it=D.getParameter(D.UNPACK_SKIP_ROWS),ve=D.getParameter(D.UNPACK_SKIP_IMAGES),jt=w.isCompressedTexture?w.mipmaps[F]:w.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,jt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,jt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,he),D.pixelStorei(D.UNPACK_SKIP_ROWS,pe),w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,F,be,we,te,ce,Me,tt,jt.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,F,be,we,jt.width,jt.height,Me,jt.data):D.texSubImage2D(D.TEXTURE_2D,F,be,we,Me,tt,jt),D.pixelStorei(D.UNPACK_ROW_LENGTH,St),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,bt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,an),D.pixelStorei(D.UNPACK_SKIP_ROWS,it),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ve),F===0&&N.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),Se.unbindTexture()},this.copyTextureToTexture3D=function(w,N,B=null,O=null,F=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,O=arguments[1]||null,w=arguments[2],N=arguments[3],F=arguments[4]||0);let te,ce,he,pe,be,we,Me,tt,St,bt=w.isCompressedTexture?w.mipmaps[F]:w.image;B!==null?(te=B.max.x-B.min.x,ce=B.max.y-B.min.y,he=B.max.z-B.min.z,pe=B.min.x,be=B.min.y,we=B.min.z):(te=bt.width,ce=bt.height,he=bt.depth,pe=0,be=0,we=0),O!==null?(Me=O.x,tt=O.y,St=O.z):(Me=0,tt=0,St=0);let an=oe.convert(N.format),it=oe.convert(N.type),ve;if(N.isData3DTexture)Ie.setTexture3D(N,0),ve=D.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)Ie.setTexture2DArray(N,0),ve=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);let jt=D.getParameter(D.UNPACK_ROW_LENGTH),lt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Vn=D.getParameter(D.UNPACK_SKIP_PIXELS),ia=D.getParameter(D.UNPACK_SKIP_ROWS),Hi=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,bt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,bt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,pe),D.pixelStorei(D.UNPACK_SKIP_ROWS,be),D.pixelStorei(D.UNPACK_SKIP_IMAGES,we),w.isDataTexture||w.isData3DTexture?D.texSubImage3D(ve,F,Me,tt,St,te,ce,he,an,it,bt.data):N.isCompressedArrayTexture?D.compressedTexSubImage3D(ve,F,Me,tt,St,te,ce,he,an,bt.data):D.texSubImage3D(ve,F,Me,tt,St,te,ce,he,an,it,bt),D.pixelStorei(D.UNPACK_ROW_LENGTH,jt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,lt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Vn),D.pixelStorei(D.UNPACK_SKIP_ROWS,ia),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Hi),F===0&&N.generateMipmaps&&D.generateMipmap(ve),Se.unbindTexture()},this.initRenderTarget=function(w){Be.get(w).__webglFramebuffer===void 0&&Ie.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Ie.setTextureCube(w,0):w.isData3DTexture?Ie.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Ie.setTexture2DArray(w,0):Ie.setTexture2D(w,0),Se.unbindTexture()},this.resetState=function(){I=0,E=0,R=null,Se.reset(),ke.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===mu?"display-p3":"srgb",t.unpackColorSpace=Ze.workingColorSpace===Io?"display-p3":"srgb"}},so=class r{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new xe(e),this.density=t}clone(){return new r(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Jr=class extends Je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},jr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=wc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return xu("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Qt=new A,Ji=class r{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Rn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Rn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Rn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Rn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),i=rt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),i=rt(i,this.array),s=rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Lt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new r(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ds=class extends nn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},wr,ms=new A,Er=new A,Tr=new A,Ar=new J,gs=new J,Bf=new Ce,Aa=new A,xs=new A,Ra=new A,Gd=new J,uc=new J,Wd=new J,Qr=class extends Je{constructor(e=new Ds){if(super(),this.isSprite=!0,this.type="Sprite",wr===void 0){wr=new gt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new jr(t,5);wr.setIndex([0,1,2,0,2,3]),wr.setAttribute("position",new Ji(n,3,0,!1)),wr.setAttribute("uv",new Ji(n,2,3,!1))}this.geometry=wr,this.material=e,this.center=new J(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Er.setFromMatrixScale(this.matrixWorld),Bf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Tr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Er.multiplyScalar(-Tr.z);let n=this.material.rotation,i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));let a=this.center;Ca(Aa.set(-.5,-.5,0),Tr,a,Er,i,s),Ca(xs.set(.5,-.5,0),Tr,a,Er,i,s),Ca(Ra.set(.5,.5,0),Tr,a,Er,i,s),Gd.set(0,0),uc.set(1,0),Wd.set(1,1);let o=e.ray.intersectTriangle(Aa,xs,Ra,!1,ms);if(o===null&&(Ca(xs.set(-.5,.5,0),Tr,a,Er,i,s),uc.set(0,1),o=e.ray.intersectTriangle(Aa,Ra,xs,!1,ms),o===null))return;let l=e.ray.origin.distanceTo(ms);l<e.near||l>e.far||t.push({distance:l,point:ms.clone(),uv:vi.getInterpolation(ms,Aa,xs,Ra,Gd,uc,Wd,new J),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Ca(r,e,t,n,i,s){Ar.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(gs.x=s*Ar.x-i*Ar.y,gs.y=i*Ar.x+s*Ar.y):gs.copy(Ar),r.copy(e),r.x+=gs.x,r.y+=gs.y,r.applyMatrix4(Bf)}var qd=new A,Xd=new ht,$d=new ht,Uv=new A,Yd=new Ce,Pa=new A,hc=new cn,Kd=new Ce,dc=new $r,ao=class extends Re{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ah,this.bindMatrix=new Ce,this.bindMatrixInverse=new Ce,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new kt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Pa),this.boundingBox.expandByPoint(Pa)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new cn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Pa),this.boundingSphere.expandByPoint(Pa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hc.copy(this.boundingSphere),hc.applyMatrix4(i),e.ray.intersectsSphere(hc)!==!1&&(Kd.copy(i).invert(),dc.copy(e.ray).applyMatrix4(Kd),!(this.boundingBox!==null&&dc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,dc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new ht,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ah?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===im?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Xd.fromBufferAttribute(i.attributes.skinIndex,e),$d.fromBufferAttribute(i.attributes.skinWeight,e),qd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=$d.getComponent(s);if(a!==0){let o=Xd.getComponent(s);Yd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Uv.copy(qd).applyMatrix4(Yd),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Us=class extends Je{constructor(){super(),this.isBone=!0,this.type="Bone"}},oo=class extends Gt{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Kt,u=Kt,h,d){super(null,a,o,l,c,u,i,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Zd=new Ce,Nv=new Ce,lo=class r{constructor(e=[],t=[]){this.uuid=xn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ce)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ce;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:Nv;Zd.multiplyMatrices(o,t[s]),Zd.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new oo(t,e,e,Pn,Bn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Us),this.bones.push(a),this.boneInverses.push(new Ce().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},ji=class extends Lt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Rr=new Ce,Jd=new Ce,Ia=[],jd=new kt,kv=new Ce,ys=new Re,vs=new cn,wi=class extends Re{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ji(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,kv)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new kt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rr),jd.copy(e.boundingBox).applyMatrix4(Rr),this.boundingBox.union(jd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new cn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rr),vs.copy(e.boundingSphere).applyMatrix4(Rr),this.boundingSphere.union(vs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(ys.geometry=this.geometry,ys.material=this.material,ys.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vs.copy(this.boundingSphere),vs.applyMatrix4(n),e.ray.intersectsSphere(vs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Rr),Jd.multiplyMatrices(n,Rr),ys.matrixWorld=Jd,ys.raycast(e,Ia);for(let a=0,o=Ia.length;a<o;a++){let l=Ia[a];l.instanceId=s,l.object=this,t.push(l)}Ia.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ji(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new oo(new Float32Array(i*this.count),i,this.count,Mf,Bn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Ei=class extends nn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},co=new A,uo=new A,Qd=new Ce,_s=new $r,La=new cn,fc=new A,ef=new A,Ti=class extends Je{constructor(e=new gt,t=new Ei){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)co.fromBufferAttribute(t,i-1),uo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=co.distanceTo(uo);e.setAttribute("lineDistance",new Oe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),La.copy(n.boundingSphere),La.applyMatrix4(i),La.radius+=s,e.ray.intersectsSphere(La)===!1)return;Qd.copy(i).invert(),_s.copy(e.ray).applyMatrix4(Qd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=f,p=g-1;x<p;x+=c){let m=u.getX(x),v=u.getX(x+1),y=Da(this,e,_s,l,m,v);y&&t.push(y)}if(this.isLineLoop){let x=u.getX(g-1),p=u.getX(f),m=Da(this,e,_s,l,x,p);m&&t.push(m)}}else{let f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let x=f,p=g-1;x<p;x+=c){let m=Da(this,e,_s,l,x,x+1);m&&t.push(m)}if(this.isLineLoop){let x=Da(this,e,_s,l,g-1,f);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Da(r,e,t,n,i,s){let a=r.geometry.attributes.position;if(co.fromBufferAttribute(a,i),uo.fromBufferAttribute(a,s),t.distanceSqToSegment(co,uo,fc,ef)>n)return;fc.applyMatrix4(r.matrixWorld);let l=e.ray.origin.distanceTo(fc);if(!(l<e.near||l>e.far))return{distance:l,point:ef.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,object:r}}var tf=new A,nf=new A,es=class extends Ti{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)tf.fromBufferAttribute(t,i),nf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+tf.distanceTo(nf);e.setAttribute("lineDistance",new Oe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ho=class extends Ti{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Ns=class extends nn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},rf=new Ce,zc=new $r,Ua=new cn,Na=new A,fo=class extends Je{constructor(e=new gt,t=new Ns){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ua.copy(n.boundingSphere),Ua.applyMatrix4(i),Ua.radius+=s,e.ray.intersectsSphere(Ua)===!1)return;rf.copy(i).invert(),zc.copy(e.ray).applyMatrix4(rf);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,x=f;g<x;g++){let p=c.getX(g);Na.fromBufferAttribute(h,p),sf(Na,p,l,i,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,x=f;g<x;g++)Na.fromBufferAttribute(h,g),sf(Na,g,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function sf(r,e,t,n,i,s,a){let o=zc.distanceSqToPoint(r);if(o<t){let l=new A;zc.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}var ts=class extends Gt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},vn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);let u=n[i],d=n[i+1]-u,f=(a-u)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new J:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new A,i=[],s=[],a=[],o=new A,l=new Ce;for(let f=0;f<=e;f++){let g=f/e;i[f]=this.getTangentAt(g,new A)}s[0]=new A,a[0]=new A;let c=Number.MAX_VALUE,u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Dt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(Dt(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ks=class extends vn{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new J){let n=t,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Vc=class extends ks{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function vu(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,h){let d=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+h)+(l-o)/h;d*=u,f*=u,i(a,o,d,f)},calc:function(s){let a=s*s,o=a*s;return r+e*s+t*a+n*o}}}var ka=new A,pc=new vu,mc=new vu,gc=new vu,Gc=class extends vn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new A){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=i[(o-1)%s]:(ka.subVectors(i[0],i[1]).add(i[0]),c=ka);let h=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?u=i[(o+2)%s]:(ka.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=ka),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),p<1e-4&&(p=x),pc.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,g,x,p),mc.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,g,x,p),gc.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,g,x,p)}else this.curveType==="catmullrom"&&(pc.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),mc.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),gc.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(pc.calc(l),mc.calc(l),gc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new A().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function af(r,e,t,n,i){let s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function Fv(r,e){let t=1-r;return t*t*e}function Bv(r,e){return 2*(1-r)*r*e}function Ov(r,e){return r*r*e}function Ts(r,e,t,n){return Fv(r,e)+Bv(r,t)+Ov(r,n)}function Hv(r,e){let t=1-r;return t*t*t*e}function zv(r,e){let t=1-r;return 3*t*t*r*e}function Vv(r,e){return 3*(1-r)*r*r*e}function Gv(r,e){return r*r*r*e}function As(r,e,t,n,i){return Hv(r,e)+zv(r,t)+Vv(r,n)+Gv(r,i)}var po=class extends vn{constructor(e=new J,t=new J,n=new J,i=new J){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new J){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(As(e,i.x,s.x,a.x,o.x),As(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Wc=class extends vn{constructor(e=new A,t=new A,n=new A,i=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new A){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(As(e,i.x,s.x,a.x,o.x),As(e,i.y,s.y,a.y,o.y),As(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},mo=class extends vn{constructor(e=new J,t=new J){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new J){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new J){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},qc=class extends vn{constructor(e=new A,t=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new A){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new A){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},go=class extends vn{constructor(e=new J,t=new J,n=new J){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new J){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Ts(e,i.x,s.x,a.x),Ts(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xc=class extends vn{constructor(e=new A,t=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new A){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Ts(e,i.x,s.x,a.x),Ts(e,i.y,s.y,a.y),Ts(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xo=class extends vn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new J){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(af(o,l.x,c.x,u.x,h.x),af(o,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new J().fromArray(i))}return this}},of=Object.freeze({__proto__:null,ArcCurve:Vc,CatmullRomCurve3:Gc,CubicBezierCurve:po,CubicBezierCurve3:Wc,EllipseCurve:ks,LineCurve:mo,LineCurve3:qc,QuadraticBezierCurve:go,QuadraticBezierCurve3:Xc,SplineCurve:xo}),$c=class extends vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new of[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new of[i.type]().fromJSON(i))}return this}},Fs=class extends $c{constructor(e){super(),this.type="Path",this.currentPoint=new J,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new mo(this.currentPoint.clone(),new J(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new go(this.currentPoint.clone(),new J(e,t),new J(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new po(this.currentPoint.clone(),new J(e,t),new J(n,i),new J(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new xo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){let c=new ks(e,t,n,i,s,a,o,l);if(this.curves.length>0){let h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Yc=class r extends gt{constructor(e=[new J(0,-.5),new J(.5,0),new J(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Dt(i,0,Math.PI*2);let s=[],a=[],o=[],l=[],c=[],u=1/t,h=new A,d=new J,f=new A,g=new A,x=new A,p=0,m=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:p=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,f.x=m*1,f.y=-p,f.z=m*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:p=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,f.x=m*1,f.y=-p,f.z=m*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(g)}for(let v=0;v<=t;v++){let y=n+v*u*i,_=Math.sin(y),I=Math.cos(y);for(let E=0;E<=e.length-1;E++){h.x=e[E].x*_,h.y=e[E].y,h.z=e[E].x*I,a.push(h.x,h.y,h.z),d.x=v/t,d.y=E/(e.length-1),o.push(d.x,d.y);let R=l[3*E+0]*_,P=l[3*E+1],S=l[3*E+0]*I;c.push(R,P,S)}}for(let v=0;v<t;v++)for(let y=0;y<e.length-1;y++){let _=y+v*e.length,I=_,E=_+e.length,R=_+e.length+1,P=_+1;s.push(I,E,P),s.push(R,P,E)}this.setIndex(s),this.setAttribute("position",new Oe(a,3)),this.setAttribute("uv",new Oe(o,2)),this.setAttribute("normal",new Oe(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},Bs=class r extends Yc{constructor(e=1,t=1,n=4,i=8){let s=new Fs;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new r(e.radius,e.length,e.capSegments,e.radialSegments)}},ns=class r extends gt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new A,u=new J;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){let f=n+h/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Oe(a,3)),this.setAttribute("normal",new Oe(o,3)),this.setAttribute("uv",new Oe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},_n=class r extends gt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let u=[],h=[],d=[],f=[],g=0,x=[],p=n/2,m=0;v(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new Oe(h,3)),this.setAttribute("normal",new Oe(d,3)),this.setAttribute("uv",new Oe(f,2));function v(){let _=new A,I=new A,E=0,R=(t-e)/n;for(let P=0;P<=s;P++){let S=[],M=P/s,T=M*(t-e)+e;for(let U=0;U<=i;U++){let k=U/i,H=k*l+o,V=Math.sin(H),G=Math.cos(H);I.x=T*V,I.y=-M*n+p,I.z=T*G,h.push(I.x,I.y,I.z),_.set(V,R,G).normalize(),d.push(_.x,_.y,_.z),f.push(k,1-M),S.push(g++)}x.push(S)}for(let P=0;P<i;P++)for(let S=0;S<s;S++){let M=x[S][P],T=x[S+1][P],U=x[S+1][P+1],k=x[S][P+1];u.push(M,T,k),u.push(T,U,k),E+=6}c.addGroup(m,E,0),m+=E}function y(_){let I=g,E=new J,R=new A,P=0,S=_===!0?e:t,M=_===!0?1:-1;for(let U=1;U<=i;U++)h.push(0,p*M,0),d.push(0,M,0),f.push(.5,.5),g++;let T=g;for(let U=0;U<=i;U++){let H=U/i*l+o,V=Math.cos(H),G=Math.sin(H);R.x=S*G,R.y=p*M,R.z=S*V,h.push(R.x,R.y,R.z),d.push(0,M,0),E.x=V*.5+.5,E.y=G*.5*M+.5,f.push(E.x,E.y),g++}for(let U=0;U<i;U++){let k=I+U,H=T+U;_===!0?u.push(H,H+1,k):u.push(H+1,H,k),P+=3}c.addGroup(m,P,_===!0?1:2),m+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var yo=class r extends gt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];o(i),c(n),u(),this.setAttribute("position",new Oe(s,3)),this.setAttribute("normal",new Oe(s.slice(),3)),this.setAttribute("uv",new Oe(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let y=new A,_=new A,I=new A;for(let E=0;E<t.length;E+=3)f(t[E+0],y),f(t[E+1],_),f(t[E+2],I),l(y,_,I,v)}function l(v,y,_,I){let E=I+1,R=[];for(let P=0;P<=E;P++){R[P]=[];let S=v.clone().lerp(_,P/E),M=y.clone().lerp(_,P/E),T=E-P;for(let U=0;U<=T;U++)U===0&&P===E?R[P][U]=S:R[P][U]=S.clone().lerp(M,U/T)}for(let P=0;P<E;P++)for(let S=0;S<2*(E-P)-1;S++){let M=Math.floor(S/2);S%2===0?(d(R[P][M+1]),d(R[P+1][M]),d(R[P][M])):(d(R[P][M+1]),d(R[P+1][M+1]),d(R[P+1][M]))}}function c(v){let y=new A;for(let _=0;_<s.length;_+=3)y.x=s[_+0],y.y=s[_+1],y.z=s[_+2],y.normalize().multiplyScalar(v),s[_+0]=y.x,s[_+1]=y.y,s[_+2]=y.z}function u(){let v=new A;for(let y=0;y<s.length;y+=3){v.x=s[y+0],v.y=s[y+1],v.z=s[y+2];let _=p(v)/2/Math.PI+.5,I=m(v)/Math.PI+.5;a.push(_,1-I)}g(),h()}function h(){for(let v=0;v<a.length;v+=6){let y=a[v+0],_=a[v+2],I=a[v+4],E=Math.max(y,_,I),R=Math.min(y,_,I);E>.9&&R<.1&&(y<.2&&(a[v+0]+=1),_<.2&&(a[v+2]+=1),I<.2&&(a[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function f(v,y){let _=v*3;y.x=e[_+0],y.y=e[_+1],y.z=e[_+2]}function g(){let v=new A,y=new A,_=new A,I=new A,E=new J,R=new J,P=new J;for(let S=0,M=0;S<s.length;S+=9,M+=6){v.set(s[S+0],s[S+1],s[S+2]),y.set(s[S+3],s[S+4],s[S+5]),_.set(s[S+6],s[S+7],s[S+8]),E.set(a[M+0],a[M+1]),R.set(a[M+2],a[M+3]),P.set(a[M+4],a[M+5]),I.copy(v).add(y).add(_).divideScalar(3);let T=p(I);x(E,M+0,v,T),x(R,M+2,y,T),x(P,M+4,_,T)}}function x(v,y,_,I){I<0&&v.x===1&&(a[y]=v.x-1),_.x===0&&_.z===0&&(a[y]=I/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}};var Fa=new A,Ba=new A,xc=new A,Oa=new vi,vo=class extends gt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(kr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:x,b:p,c:m}=Oa;if(x.fromBufferAttribute(o,c[0]),p.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),Oa.getNormal(xc),h[0]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,h[1]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,h[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){let y=(v+1)%3,_=h[v],I=h[y],E=Oa[u[v]],R=Oa[u[y]],P=`${_}_${I}`,S=`${I}_${_}`;S in d&&d[S]?(xc.dot(d[S].normal)<=s&&(f.push(E.x,E.y,E.z),f.push(R.x,R.y,R.z)),d[S]=null):P in d||(d[P]={index0:c[v],index1:c[y],normal:xc.clone()})}}for(let g in d)if(d[g]){let{index0:x,index1:p}=d[g];Fa.fromBufferAttribute(o,x),Ba.fromBufferAttribute(o,p),f.push(Fa.x,Fa.y,Fa.z),f.push(Ba.x,Ba.y,Ba.z)}this.setAttribute("position",new Oe(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Os=class extends Fs{constructor(e){super(e),this.uuid=xn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Fs().fromJSON(i))}return this}},Wv={triangulate:function(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Of(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c,u,h,d,f;if(n&&(s=Kv(r,e,s,t)),r.length>80*t){o=c=r[0],l=u=r[1];for(let g=t;g<i;g+=t)h=r[g],d=r[g+1],h<o&&(o=h),d<l&&(l=d),h>c&&(c=h),d>u&&(u=d);f=Math.max(c-o,u-l),f=f!==0?32767/f:0}return Hs(s,a,t,o,l,f,0),a}};function Of(r,e,t,n,i){let s,a;if(i===a_(r,e,t,n)>0)for(s=e;s<t;s+=n)a=lf(s,r[s],r[s+1],a);else for(s=t-n;s>=e;s-=n)a=lf(s,r[s],r[s+1],a);return a&&Do(a,a.next)&&(Vs(a),a=a.next),a}function Qi(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(Do(t,t.next)||Mt(t.prev,t,t.next)===0)){if(Vs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Hs(r,e,t,n,i,s,a){if(!r)return;!a&&s&&e_(r,n,i,s);let o=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?Xv(r,n,i,s):qv(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(c.i/t|0),Vs(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=$v(Qi(r),e,t),Hs(r,e,t,n,i,s,2)):a===2&&Yv(r,e,t,n,i,s):Hs(Qi(r),e,t,n,i,s,1);break}}}function qv(r){let e=r.prev,t=r,n=r.next;if(Mt(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=i<s?i<a?i:a:s<a?s:a,h=o<l?o<c?o:c:l<c?l:c,d=i>s?i>a?i:a:s>a?s:a,f=o>l?o>c?o:c:l>c?l:c,g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=d&&g.y>=h&&g.y<=f&&Dr(i,o,s,l,a,c,g.x,g.y)&&Mt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Xv(r,e,t,n){let i=r.prev,s=r,a=r.next;if(Mt(i,s,a)>=0)return!1;let o=i.x,l=s.x,c=a.x,u=i.y,h=s.y,d=a.y,f=o<l?o<c?o:c:l<c?l:c,g=u<h?u<d?u:d:h<d?h:d,x=o>l?o>c?o:c:l>c?l:c,p=u>h?u>d?u:d:h>d?h:d,m=Kc(f,g,e,t,n),v=Kc(x,p,e,t,n),y=r.prevZ,_=r.nextZ;for(;y&&y.z>=m&&_&&_.z<=v;){if(y.x>=f&&y.x<=x&&y.y>=g&&y.y<=p&&y!==i&&y!==a&&Dr(o,u,l,h,c,d,y.x,y.y)&&Mt(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=f&&_.x<=x&&_.y>=g&&_.y<=p&&_!==i&&_!==a&&Dr(o,u,l,h,c,d,_.x,_.y)&&Mt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=m;){if(y.x>=f&&y.x<=x&&y.y>=g&&y.y<=p&&y!==i&&y!==a&&Dr(o,u,l,h,c,d,y.x,y.y)&&Mt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=v;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=p&&_!==i&&_!==a&&Dr(o,u,l,h,c,d,_.x,_.y)&&Mt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function $v(r,e,t){let n=r;do{let i=n.prev,s=n.next.next;!Do(i,s)&&Hf(i,n,n.next,s)&&zs(i,s)&&zs(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Vs(n),Vs(n.next),n=r=s),n=n.next}while(n!==r);return Qi(n)}function Yv(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&i_(a,o)){let l=zf(a,o);a=Qi(a,a.next),l=Qi(l,l.next),Hs(a,e,t,n,i,s,0),Hs(l,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function Kv(r,e,t,n){let i=[],s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*n,l=s<a-1?e[s+1]*n:r.length,c=Of(r,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(n_(c));for(i.sort(Zv),s=0;s<i.length;s++)t=Jv(i[s],t);return t}function Zv(r,e){return r.x-e.x}function Jv(r,e){let t=jv(r,e);if(!t)return e;let n=zf(t,r);return Qi(n,n.next),Qi(t,t.next)}function jv(r,e){let t=e,n=-1/0,i,s=r.x,a=r.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){let d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===s))return i}t=t.next}while(t!==e);if(!i)return null;let o=i,l=i.x,c=i.y,u=1/0,h;t=i;do s>=t.x&&t.x>=l&&s!==t.x&&Dr(a<c?s:n,a,l,c,a<c?n:s,a,t.x,t.y)&&(h=Math.abs(a-t.y)/(s-t.x),zs(t,r)&&(h<u||h===u&&(t.x>i.x||t.x===i.x&&Qv(i,t)))&&(i=t,u=h)),t=t.next;while(t!==o);return i}function Qv(r,e){return Mt(r.prev,r,e.prev)<0&&Mt(e.next,r,r.next)<0}function e_(r,e,t,n){let i=r;do i.z===0&&(i.z=Kc(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,t_(i)}function t_(r){let e,t,n,i,s,a,o,l,c=1;do{for(t=r,r=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,o--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,c*=2}while(a>1);return r}function Kc(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function n_(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Dr(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function i_(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!r_(r,e)&&(zs(r,e)&&zs(e,r)&&s_(r,e)&&(Mt(r.prev,r,e.prev)||Mt(r,e.prev,e))||Do(r,e)&&Mt(r.prev,r,r.next)>0&&Mt(e.prev,e,e.next)>0)}function Mt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Do(r,e){return r.x===e.x&&r.y===e.y}function Hf(r,e,t,n){let i=za(Mt(r,e,t)),s=za(Mt(r,e,n)),a=za(Mt(t,n,r)),o=za(Mt(t,n,e));return!!(i!==s&&a!==o||i===0&&Ha(r,t,e)||s===0&&Ha(r,n,e)||a===0&&Ha(t,r,n)||o===0&&Ha(t,e,n))}function Ha(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function za(r){return r>0?1:r<0?-1:0}function r_(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Hf(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function zs(r,e){return Mt(r.prev,r,r.next)<0?Mt(r,e,r.next)>=0&&Mt(r,r.prev,e)>=0:Mt(r,e,r.prev)<0||Mt(r,r.next,e)<0}function s_(r,e){let t=r,n=!1,i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function zf(r,e){let t=new Zc(r.i,r.x,r.y),n=new Zc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function lf(r,e,t,n){let i=new Zc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Vs(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Zc(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function a_(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}var Rs=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];cf(e),uf(n,e);let a=e.length;t.forEach(cf);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,uf(n,t[l]);let o=Wv.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function cf(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function uf(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var _o=class r extends yo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},is=class r extends yo{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},rs=class r extends gt{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],u=[],h=e,d=(t-e)/i,f=new A,g=new J;for(let x=0;x<=i;x++){for(let p=0;p<=n;p++){let m=s+p/n*a;f.x=h*Math.cos(m),f.y=h*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}h+=d}for(let x=0;x<i;x++){let p=x*(n+1);for(let m=0;m<n;m++){let v=m+p,y=v,_=v+n+1,I=v+n+2,E=v+1;o.push(y,_,E),o.push(_,I,E)}}this.setIndex(o),this.setAttribute("position",new Oe(l,3)),this.setAttribute("normal",new Oe(c,3)),this.setAttribute("uv",new Oe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Mo=class r extends gt{constructor(e=new Os([new J(0,.5),new J(-.5,-.5),new J(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Oe(i,3)),this.setAttribute("normal",new Oe(s,3)),this.setAttribute("uv",new Oe(a,2));function c(u){let h=i.length/3,d=u.extractPoints(t),f=d.shape,g=d.holes;Rs.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,m=g.length;p<m;p++){let v=g[p];Rs.isClockWise(v)===!0&&(g[p]=v.reverse())}let x=Rs.triangulateShape(f,g);for(let p=0,m=g.length;p<m;p++){let v=g[p];f=f.concat(v)}for(let p=0,m=f.length;p<m;p++){let v=f[p];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let p=0,m=x.length;p<m;p++){let v=x[p],y=v[0]+h,_=v[1]+h,I=v[2]+h;n.push(y,_,I),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return o_(t,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}};function o_(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){let i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}var Ln=class r extends gt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],h=new A,d=new A,f=[],g=[],x=[],p=[];for(let m=0;m<=n;m++){let v=[],y=m/n,_=0;m===0&&a===0?_=.5/t:m===n&&l===Math.PI&&(_=-.5/t);for(let I=0;I<=t;I++){let E=I/t;h.x=-e*Math.cos(i+E*s)*Math.sin(a+y*o),h.y=e*Math.cos(a+y*o),h.z=e*Math.sin(i+E*s)*Math.sin(a+y*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),p.push(E+_,1-y),v.push(c++)}u.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){let y=u[m][v+1],_=u[m][v],I=u[m+1][v],E=u[m+1][v+1];(m!==0||a>0)&&f.push(y,_,E),(m!==n-1||l<Math.PI)&&f.push(_,I,E)}this.setIndex(f),this.setAttribute("position",new Oe(g,3)),this.setAttribute("normal",new Oe(x,3)),this.setAttribute("uv",new Oe(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var er=class r extends gt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],u=new A,h=new A,d=new A;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){let x=g/i*s,p=f/n*Math.PI*2;h.x=(e+t*Math.cos(p))*Math.cos(x),h.y=(e+t*Math.cos(p))*Math.sin(x),h.z=t*Math.sin(p),o.push(h.x,h.y,h.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){let x=(i+1)*f+g-1,p=(i+1)*(f-1)+g-1,m=(i+1)*(f-1)+g,v=(i+1)*f+g;a.push(x,p,v),a.push(p,m,v)}this.setIndex(a),this.setAttribute("position",new Oe(o,3)),this.setAttribute("normal",new Oe(l,3)),this.setAttribute("uv",new Oe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var hn=class extends nn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tf,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},qt=class extends hn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new J(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Dt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function Va(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function l_(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function c_(r){function e(i,s){return r[i]-r[s]}let t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function hf(r,e,t){let n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function Vf(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}var Ai=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Jc=class extends Ai{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pr,endingEnd:Pr}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ir:s=e,o=2*t-n;break;case qa:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ir:a=e,l=2*n-t;break;case qa:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),x=g*g,p=x*g,m=-d*p+2*d*x-d*g,v=(1+d)*p+(-1.5-2*d)*x+(-.5+d)*g+1,y=(-1-f)*p+(1.5+f)*x+.5*g,_=f*p-f*x;for(let I=0;I!==o;++I)s[I]=m*a[u+I]+v*a[c+I]+y*a[l+I]+_*a[h+I];return s}},So=class extends Ai{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==o;++d)s[d]=a[c+d]*h+a[l+d]*u;return s}},jc=class extends Ai{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Mn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Va(t,this.TimeBufferType),this.values=Va(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Va(e.times,Array),values:Va(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new jc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new So(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Wr:t=this.InterpolantFactoryMethodDiscrete;break;case qr:t=this.InterpolantFactoryMethodLinear;break;case Ol:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Wr;case this.InterpolantFactoryMethodLinear:return qr;case this.InterpolantFactoryMethodSmooth:return Ol}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&l_(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ol,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(i)l=!0;else{let h=o*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){let x=t[h+g];if(x!==t[d+g]||x!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=qr;var Ri=class extends Mn{constructor(e,t,n){super(e,t,n)}};Ri.prototype.ValueTypeName="bool";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=Wr;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var bo=class extends Mn{};bo.prototype.ValueTypeName="color";var ti=class extends Mn{};ti.prototype.ValueTypeName="number";var Qc=class extends Ai{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let u=c+o;c!==u;c+=4)It.slerpFlat(s,0,a,c-o,a,c,l);return s}},ni=class extends Mn{InterpolantFactoryMethodLinear(e){return new Qc(this.times,this.values,this.getValueSize(),e)}};ni.prototype.ValueTypeName="quaternion";ni.prototype.InterpolantFactoryMethodSmooth=void 0;var Ci=class extends Mn{constructor(e,t,n){super(e,t,n)}};Ci.prototype.ValueTypeName="string";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=Wr;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var ii=class extends Mn{};ii.prototype.ValueTypeName="vector";var ss=class{constructor(e="",t=-1,n=[],i=pu){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=xn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(h_(n[a]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(Mn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);let u=c_(l);l=hf(l,1,u),c=hf(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new ti(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],u=c.name.match(s);if(u&&u.length>1){let h=u[1],d=i[h];d||(i[h]=d=[]),d.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,d,f,g,x){if(f.length!==0){let p=[],m=[];Vf(f,p,m,g),p.length!==0&&x.push(new h(d,p,m))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let x=0;x<d[g].morphTargets.length;x++)f[d[g].morphTargets[x]]=-1;for(let x in f){let p=[],m=[];for(let v=0;v!==d[g].morphTargets.length;++v){let y=d[g];p.push(y.time),m.push(y.morphTarget===x?1:0)}i.push(new ti(".morphTargetInfluence["+x+"]",p,m))}l=f.length*a}else{let f=".bones["+t[h].name+"]";n(ii,f+".position",d,"pos",i),n(ni,f+".quaternion",d,"rot",i),n(ii,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function u_(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ti;case"vector":case"vector2":case"vector3":case"vector4":return ii;case"color":return bo;case"quaternion":return ni;case"bool":case"boolean":return Ri;case"string":return Ci}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function h_(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=u_(r.type);if(r.times===void 0){let t=[],n=[];Vf(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}var _i={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},eu=class{constructor(e,t,n){let i=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],g=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},d_=new eu,ri=class{constructor(e){this.manager=e!==void 0?e:d_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};ri.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yn={},tu=class extends Error{constructor(e,t){super(e),this.response=t}},Gs=class extends ri{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=_i.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Yn[e]!==void 0){Yn[e].push({onLoad:t,onProgress:n,onError:i});return}Yn[e]=[],Yn[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Yn[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,x=0,p=new ReadableStream({start(m){v();function v(){h.read().then(({done:y,value:_})=>{if(y)m.close();else{x+=_.byteLength;let I=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let E=0,R=u.length;E<R;E++){let P=u[E];P.onProgress&&P.onProgress(I)}m.enqueue(_),v()}},y=>{m.error(y)})}}});return new Response(p)}else throw new tu(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o===void 0)return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{_i.add(e,c);let u=Yn[e];delete Yn[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=Yn[e];if(u===void 0)throw this.manager.itemError(e),c;delete Yn[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var nu=class extends ri{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=_i.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;let o=Is("img");function l(){u(),_i.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}};var Pi=class extends ri{constructor(e){super(e)}load(e,t,n,i){let s=new Gt,a=new nu(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},as=class extends Je{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},wo=class extends as{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},yc=new Ce,df=new A,ff=new A,Ws=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ls,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;df.setFromMatrixPosition(e.matrixWorld),t.position.copy(df),ff.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ff),t.updateMatrixWorld(),yc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(yc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},iu=class extends Ws{constructor(){super(new Ut(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Xr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Eo=class extends as{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.target=new Je,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new iu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},pf=new Ce,Ms=new A,vc=new A,ru=class extends Ws{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new J(4,2),this._viewportCount=6,this._viewports=[new ht(2,1,1,1),new ht(0,1,1,1),new ht(3,1,1,1),new ht(1,1,1,1),new ht(3,0,1,1),new ht(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ms.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ms),vc.copy(n.position),vc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(vc),n.updateMatrixWorld(),i.makeTranslation(-Ms.x,-Ms.y,-Ms.z),pf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pf)}},si=class extends as{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ru}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},su=class extends Ws{constructor(){super(new Kr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},tr=class extends as{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.target=new Je,this.shadow=new su}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ii=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var To=class extends ri{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=_i.get(e);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return _i.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),_i.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});_i.add(e,l),s.manager.itemStart(e)}};var au=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,s=e*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){It.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){let a=this._workIndex*s;It.multiplyQuaternionsFlat(e,a,e,t,e,n),It.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){let a=1-i;for(let o=0;o!==s;++o){let l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){let o=t+a;e[o]=e[o]+e[n+a]*i}}},_u="\\[\\]\\.:\\/",f_=new RegExp("["+_u+"]","g"),Mu="[^"+_u+"]",p_="[^"+_u.replace("\\.","")+"]",m_=/((?:WC+[\/:])*)/.source.replace("WC",Mu),g_=/(WCOD+)?/.source.replace("WCOD",p_),x_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mu),y_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mu),v_=new RegExp("^"+m_+g_+x_+y_+"$"),__=["material","materials","bones","map"],ou=class{constructor(e,t,n){let i=n||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ut=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(f_,"")}static parseTrackName(e){let t=v_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);__.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ut.Composite=ou;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var lu=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let s=t.tracks,a=s.length,o=new Array(a),l={endingStart:Pr,endingEnd:Pr};for(let c=0;c!==a;++c){let u=s[c].createInterpolant(null);o[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=fu,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,s=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let s=this._startTime;if(s!==null){let l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case pm:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case pu:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,s=this._loopCount,a=n===fm;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===du){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){let o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);let l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=Ir,i.endingEnd=Ir):(e?i.endingStart=this.zeroSlopeAtStart?Ir:Pr:i.endingStart=qa,t?i.endingEnd=this.zeroSlopeAtEnd?Ir:Pr:i.endingEnd=qa)}_scheduleFading(e,t,n){let i=this._mixer,s=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}},M_=new Float32Array(1),Ao=class extends Qn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==s;++h){let d=i[h],f=d.name,g=u[f];if(g!==void 0)++g.referenceCount,a[h]=g;else{if(g=a[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}let x=t&&t._propertyBindings[h].binding.parsedPath;g=new au(ut.create(n,f,x),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),a[h]=g}o[h].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,s=this._actionsByClip,a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let h=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,s=this._bindings,a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new So(new Float32Array(2),new Float32Array(2),1,M_),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){let i=t||this._root,s=i.uuid,a=typeof e=="string"?ss.findByName(i,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=pu),l!==void 0){let h=l.actionByRoot[s];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let u=new lu(this,a,t,n);return this._bindAction(u,c),this._addInactiveAction(u,o,s),u}existingAction(e,t){let n=t||this._root,i=n.uuid,s=typeof e=="string"?ss.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){let a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(let a in s){let o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"165"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="165");function Wf(r,e=!1){let t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},a={},o=r[0].morphTargetsRelative,l=new gt,c=0;for(let u=0;u<r.length;++u){let h=r[u],d=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in h.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(h.morphAttributes[f])}if(e){let f;if(t)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,u),c+=f}}if(t){let u=0,h=[];for(let d=0;d<r.length;++d){let f=r[d].index;for(let g=0;g<f.count;++g)h.push(f.getX(g)+u);u+=r[d].attributes.position.count}l.setIndex(h)}for(let u in s){let h=Gf(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(let u in a){let h=a[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let d=0;d<h;++d){let f=[];for(let x=0;x<a[u].length;++x)f.push(a[u][x][d]);let g=Gf(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function Gf(r){let e,t,n,i=-1,s=0;for(let c=0;c<r.length;++c){let u=r[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}let a=new e(s),o=new Lt(a,t,n),l=0;for(let c=0;c<r.length;++c){let u=r[c];if(u.isInterleavedBufferAttribute){let h=l/t;for(let d=0,f=u.count;d<f;d++)for(let g=0;g<t;g++){let x=u.getComponent(d,g);o.setComponent(d+h,g,x)}}else a.set(u.array,l);l+=u.count*t}return i!==void 0&&(o.gpuType=i),o}function Su(r,e){if(e===Ef)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===qs||e===Po){let t=r.getIndex();if(t===null){let a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}let n=t.count-2,i=[];if(e===qs)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}var No=class extends ri{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Cu(t)}),this.register(function(t){return new Pu(t)}),this.register(function(t){return new Ou(t)}),this.register(function(t){return new Hu(t)}),this.register(function(t){return new zu(t)}),this.register(function(t){return new Lu(t)}),this.register(function(t){return new Du(t)}),this.register(function(t){return new Uu(t)}),this.register(function(t){return new Nu(t)}),this.register(function(t){return new Ru(t)}),this.register(function(t){return new ku(t)}),this.register(function(t){return new Iu(t)}),this.register(function(t){return new Bu(t)}),this.register(function(t){return new Fu(t)}),this.register(function(t){return new Tu(t)}),this.register(function(t){return new Vu(t)}),this.register(function(t){return new Gu(t)})}load(e,t,n,i){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=Ii.extractUrlBase(e);a=Ii.resolveURL(c,this.path)}else a=Ii.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Gs(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(u){t(u),s.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Kf){try{a[He.KHR_BINARY_GLTF]=new Wu(e)}catch(h){i&&i(h);return}s=JSON.parse(a[He.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Ju(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){let h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case He.KHR_MATERIALS_UNLIT:a[h]=new Au;break;case He.KHR_DRACO_MESH_COMPRESSION:a[h]=new qu(s,this.dracoLoader);break;case He.KHR_TEXTURE_TRANSFORM:a[h]=new Xu;break;case He.KHR_MESH_QUANTIZATION:a[h]=new $u;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function S_(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}var He={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Tu=class{constructor(e){this.parser=e,this.name=He.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,u=new xe(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Wt);let h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new tr(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new si(u),c.distance=h;break;case"spot":c=new Eo(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,oi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},Au=class{constructor(){this.name=He.KHR_MATERIALS_UNLIT}getMaterialType(){return dt}extendParams(e,t,n){let i=[];e.color=new xe(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Wt),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,wt))}return Promise.all(i)}},Ru=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},Cu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new J(o,o)}return Promise.all(s)}},Pu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},Iu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}},Lu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new xe(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Wt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,wt)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}},Du=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}},Uu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new xe().setRGB(o[0],o[1],o[2],Wt),Promise.all(s)}},Nu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},ku=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new xe().setRGB(o[0],o[1],o[2],Wt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,wt)),Promise.all(s)}},Fu=class{constructor(e){this.parser=e,this.name=He.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}},Bu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}},Ou=class{constructor(e){this.parser=e,this.name=He.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},Hu=class{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},zu=class{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Vu=class{constructor(e){this.name=He.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,i.mode,i.filter),f})})}else return null}},Gu=class{constructor(e){this.name=He.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==Sn.TRIANGLES&&c.mode!==Sn.TRIANGLE_STRIP&&c.mode!==Sn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(let g of h){let x=new Ce,p=new A,m=new It,v=new A(1,1,1),y=new wi(g.geometry,g.material,d);for(let _=0;_<d;_++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,_),l.SCALE&&v.fromBufferAttribute(l.SCALE,_),y.setMatrixAt(_,x.compose(p,m,v));for(let _ in l)if(_==="_COLOR_0"){let I=l[_];y.instanceColor=new ji(I.array,I.itemSize,I.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,l[_]);Je.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},Kf="glTF",Xs=12,qf={JSON:1313821514,BIN:5130562},Wu=class{constructor(e){this.name=He.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Xs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Kf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Xs,s=new DataView(e,Xs),a=0;for(;a<i;){let o=s.getUint32(a,!0);a+=4;let l=s.getUint32(a,!0);if(a+=4,l===qf.JSON){let c=new Uint8Array(e,Xs+a,o);this.content=n.decode(c)}else if(l===qf.BIN){let c=Xs+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},qu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=He.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let u in a){let h=Ku[u]||u.toLowerCase();o[h]=a[u]}for(let u in e.attributes){let h=Ku[u]||u.toLowerCase();if(a[u]!==void 0){let d=n.accessors[e.attributes[u]],f=ls[d.componentType];c[h]=f.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(f){for(let g in f.attributes){let x=f.attributes[g],p=l[g];p!==void 0&&(x.normalized=p)}h(f)},o,c,Wt,d)})})}},Xu=class{constructor(){this.name=He.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},$u=class{constructor(){this.name=He.KHR_MESH_QUANTIZATION}},ko=class extends Ai{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=i-t,h=(n-t)/u,d=h*h,f=d*h,g=e*c,x=g-c,p=-2*f+3*d,m=f-d,v=1-p,y=m-d+h;for(let _=0;_!==o;_++){let I=a[x+_+o],E=a[x+_+l]*u,R=a[g+_+o],P=a[g+_]*u;s[_]=v*I+y*E+p*R+m*P}return s}},b_=new It,Yu=class extends ko{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return b_.fromArray(s).normalize().toArray(s),s}},Sn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ls={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Xf={9728:Kt,9729:Yt,9984:hu,9985:bs,9986:Cr,9987:Fn},$f={33071:Cn,33648:Ps,10497:jn},bu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ku={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Li={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},w_={CUBICSPLINE:void 0,LINEAR:qr,STEP:Wr},wu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function E_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new hn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:On})),r.DefaultMaterial}function nr(r,e,t){for(let n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function oi(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function T_(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){let h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);let a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){let h=e[c];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):r.attributes.position;a.push(d)}if(i){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):r.attributes.normal;o.push(d)}if(s){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let u=c[0],h=c[1],d=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=h),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function A_(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function R_(r){let e,t=r.extensions&&r.extensions[He.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Eu(t.attributes):e=r.indices+":"+Eu(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Eu(r.targets[n]);return e}function Eu(r){let e="",t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Zu(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function C_(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var P_=new Ce,Ju=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new S_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new Pi(this.options.manager):this.textureLoader=new To(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Gs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return nr(s,o,i),oi(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,u]of a.children.entries())s(u,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[He.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,a){n.load(Ii.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=bu[i.type],o=ls[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new Lt(c,a,l))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],l=bu[i.type],c=ls[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,x,p;if(f&&f!==h){let m=Math.floor(d/f),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count,y=t.cache.get(v);y||(x=new c(o,m*f,i.count*f/u),y=new jr(x,f/u),t.cache.add(v,y)),p=new Ji(y,l,d%f/u,g)}else o===null?x=new c(i.count*l):x=new c(o,d,i.count*l),p=new Lt(x,l,g);if(i.sparse!==void 0){let m=bu.SCALAR,v=ls[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,I=new v(a[1],y,i.sparse.count*m),E=new c(a[2],_,i.sparse.count*l);o!==null&&(p=new Lt(p.array.slice(),p.itemSize,p.normalized));for(let R=0,P=I.length;R<P;R++){let S=I[R];if(p.setX(S,E[R*l]),l>=2&&p.setY(S,E[R*l+1]),l>=3&&p.setZ(S,E[R*l+2]),l>=4&&p.setW(S,E[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let d=(s.samplers||{})[a.sampler]||{};return u.magFilter=Xf[d.magFilter]||Yt,u.minFilter=Xf[d.minFilter]||Fn,u.wrapS=$f[d.wrapS]||jn,u.wrapT=$f[d.wrapT]||jn,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let a=i.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(h){c=!0;let d=new Blob([h],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(h){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(x){let p=new Gt(x);p.needsUpdate=!0,d(p)}),t.load(Ii.resolveURL(h,s.path),g,void 0,f)})}).then(function(h){return c===!0&&o.revokeObjectURL(l),oi(h,a),h.userData.mimeType=a.mimeType||C_(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[He.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[He.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=s.associations.get(a);a=s.extensions[He.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Ns,nn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Ei,nn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return hn}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],a,o={},l=s.extensions||{},c=[];if(l[He.KHR_MATERIALS_UNLIT]){let h=i[He.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),c.push(h.extendParams(o,s,t))}else{let h=s.pbrMetallicRoughness||{};if(o.color=new xe(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Wt),o.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",h.baseColorTexture,wt)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Nt);let u=s.alphaMode||wu.OPAQUE;if(u===wu.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===wu.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==dt&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new J(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;o.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&a!==dt&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==dt){let h=s.emissiveFactor;o.emissive=new xe().setRGB(h[0],h[1],h[2],Wt)}return s.emissiveTexture!==void 0&&a!==dt&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,wt)),Promise.all(c).then(function(){let h=new a(o);return s.name&&(h.name=s.name),oi(h,s),t.associations.set(h,{materials:e}),s.extensions&&nr(i,h,s),h})}createUniqueName(e){let t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[He.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Yf(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],u=R_(c),h=i[u];if(h)a.push(h.promise);else{let d;c.extensions&&c.extensions[He.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Yf(new gt,c,t),i[u]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let u=a[l].material===void 0?E_(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let f=0,g=u.length;f<g;f++){let x=u[f],p=a[f],m,v=c[f];if(p.mode===Sn.TRIANGLES||p.mode===Sn.TRIANGLE_STRIP||p.mode===Sn.TRIANGLE_FAN||p.mode===void 0)m=s.isSkinnedMesh===!0?new ao(x,v):new Re(x,v),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===Sn.TRIANGLE_STRIP?m.geometry=Su(m.geometry,Po):p.mode===Sn.TRIANGLE_FAN&&(m.geometry=Su(m.geometry,qs));else if(p.mode===Sn.LINES)m=new es(x,v);else if(p.mode===Sn.LINE_STRIP)m=new Ti(x,v);else if(p.mode===Sn.LINE_LOOP)m=new ho(x,v);else if(p.mode===Sn.POINTS)m=new fo(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&A_(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),oi(m,s),p.extensions&&nr(i,m,p),t.assignFinalMaterial(m),h.push(m)}for(let f=0,g=h.length;f<g;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return s.extensions&&nr(i,h[0],s),h[0];let d=new st;s.extensions&&nr(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ut(ai.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Kr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),oi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),a=i,o=[],l=[];for(let c=0,u=a.length;c<u;c++){let h=a[c];if(h){o.push(h);let d=new Ce;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new lo(o,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){let f=i.channels[h],g=i.samplers[f.sampler],x=f.target,p=x.node,m=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;x.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",v)),c.push(g),u.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){let d=h[0],f=h[1],g=h[2],x=h[3],p=h[4],m=[];for(let v=0,y=d.length;v<y;v++){let _=d[v],I=f[v],E=g[v],R=x[v],P=p[v];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();let S=n._createAnimationTracks(_,I,E,R,P);if(S)for(let M=0;M<S.length;M++)m.push(S[M])}return new ss(s,void 0,m)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,u=o.length;c<u;c++)a.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){let u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,P_)});for(let f=0,g=h.length;f<g;f++)u.add(h[f]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(s.isBone===!0?u=new Us:c.length>1?u=new st:c.length===1?u=c[0]:u=new Je,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(s.name&&(u.userData.name=s.name,u.name=a),oi(u,s),s.extensions&&nr(n,u,s),s.matrix!==void 0){let h=new Ce;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new st;n.name&&(s.name=i.createUniqueName(n.name)),oi(s,n),n.extensions&&nr(t,s,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let u=0,h=l.length;u<h;u++)s.add(l[u]);let c=u=>{let h=new Map;for(let[d,f]of i.associations)(d instanceof nn||d instanceof Gt)&&h.set(d,f);return u.traverse(d=>{let f=i.associations.get(d);f!=null&&h.set(d,f)}),h};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){let a=[],o=e.name?e.name:e.uuid,l=[];Li[s.path]===Li.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(Li[s.path]){case Li.weights:c=ti;break;case Li.rotation:c=ni;break;case Li.position:case Li.scale:c=ii;break;default:n.itemSize===1?c=ti:c=ii;break}let u=i.interpolation!==void 0?w_[i.interpolation]:qr,h=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){let g=new c(l[d]+"."+Li[s.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Zu(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof ni?Yu:ko;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function I_(r,e,t){let n=e.attributes,i=new kt;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new A(l[0],l[1],l[2]),new A(c[0],c[1],c[2])),o.normalized){let u=Zu(ls[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new A,l=new A;for(let c=0,u=s.length;c<u;c++){let h=s[c];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let x=Zu(ls[d.componentType]);l.multiplyScalar(x)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;let a=new cn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function Yf(r,e,t){let n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(let a in n){let o=Ku[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){let a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return Ze.workingColorSpace!==Wt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),oi(r,e),I_(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?T_(r,e.targets,t):r})}var $s=r=>(r&&typeof r=="object"&&(Object.values(r).forEach($s),Object.freeze(r)),r),L_=[{id:"relay",name:"Relay",role:"Vanguard",colour:"#edb345",effect:"pulse",trait:{name:"Steady Power",description:"Reliable attacks. Pierce breaks through a raised shield.",id:"steady"},weapons:[{name:"Kinetic Gauntlets",shortName:"Attack",icon:"swords",detail:"Close-range impact. Adds 1 energy."},{name:"Breach Launcher",shortName:"Pierce",icon:"target",detail:"A heavy pulse bolt. Especially strong against shields."},{name:"Siege Twin Cannon",shortName:"Overdrive",icon:"zap",detail:"Twin power cells drive a shield-piercing blast."}]},{id:"helio",name:"Helio",role:"Laser Specialist",colour:"#f0dfb0",effect:"laser",trait:{name:"Perfect Focus",description:"Attacks deal 2 extra damage when Prism is open.",id:"focus"},weapons:[{name:"Light Gauntlets",shortName:"Attack",icon:"swords",detail:"Focused impact. Stronger during an opening."},{name:"Prism Rail Laser",shortName:"Laser",icon:"scan-line",detail:"A precise light beam cuts through the rival shield."},{name:"Solar Lens Cannon",shortName:"Solar Flare",icon:"sun",detail:"An enlarged focusing lens releases a brilliant beam."}]},{id:"volt",name:"Volt",role:"Energy Specialist",colour:"#69d8b3",effect:"arc",trait:{name:"Supercharger",description:"Blocking an incoming hit builds 3 energy instead of 2.",id:"charge"},weapons:[{name:"Shock Gauntlets",shortName:"Attack",icon:"swords",detail:"Charged knuckles add 1 energy with each attack."},{name:"Arc Coil Caster",shortName:"Arc Bolt",icon:"zap",detail:"Twin coils send a crackling arc into the shield."},{name:"Tesla Fork Array",shortName:"Thunder",icon:"zap",detail:"A forked power array releases a larger electrical arc."}]},{id:"bastion",name:"Bastion",role:"Heavy Defender",colour:"#a9bec8",effect:"gravity",trait:{name:"Reinforced Hull",description:"Armour removes 1 point from every incoming hit.",id:"armour"},weapons:[{name:"Piston Fists",shortName:"Attack",icon:"swords",detail:"Heavy mechanical fists. Built for close combat."},{name:"Gravity Mortar",shortName:"Grav Shot",icon:"orbit",detail:"A dense energy sphere strikes the rival shield."},{name:"Bulwark Bombard",shortName:"Quake",icon:"shield",detail:"Expanded armour braces a huge gravity cannon."}]},{id:"zephyr",name:"Zephyr",role:"Agile Striker",colour:"#63bdec",effect:"burst",trait:{name:"Quickstep",description:"An Attack takes 2 less damage from Prism's quick strike.",id:"evade"},weapons:[{name:"Swift Gauntlets",shortName:"Attack",icon:"swords",detail:"Quick attacks evade part of a quick incoming strike."},{name:"Ion Repeater",shortName:"Ion Burst",icon:"wind",detail:"A light barrel sends a tight burst of ion bolts."},{name:"Cyclone Tri-Barrel",shortName:"Cyclone",icon:"tornado",detail:"Three barrels fire one powerful coordinated burst."}]},{id:"glacier",name:"Glacier",role:"Frost Controller",colour:"#c4dcf5",effect:"frost",trait:{name:"Cold Front",description:"Avalanche halves the incoming hit on that exchange.",id:"chill"},weapons:[{name:"Frost Gauntlets",shortName:"Attack",icon:"swords",detail:"A chilled impact against the rival shield."},{name:"Cryo Projector",shortName:"Cryo Bolt",icon:"snowflake",detail:"A chilled energy capsule bursts into ice-like light."},{name:"Avalanche Cannon",shortName:"Avalanche",icon:"snowflake",detail:"A larger cooling rig weakens the incoming counter."}]},{id:"ember",name:"Ember",role:"Thermal Breacher",colour:"#f49b68",effect:"flame",trait:{name:"Heat Breach",description:"Piercing a raised shield deals 2 extra damage.",id:"heat"},weapons:[{name:"Thermal Gauntlets",shortName:"Attack",icon:"flame",detail:"Heat-shielded fists deliver a bright thermal impact."},{name:"Flare Projector",shortName:"Flare",icon:"flame",detail:"A controlled flame jet pushes through a raised shield."},{name:"Inferno Twin Jets",shortName:"Inferno",icon:"flame",detail:"Paired thermal nozzles unleash a wider burst of heat."}]},{id:"tidal",name:"Tidal",role:"Hydro Defender",colour:"#68cbd1",effect:"water",trait:{name:"Cooling Recovery",description:"Blocking an incoming hit restores 1 shield, up to full strength.",id:"recovery"},weapons:[{name:"Hydraulic Fists",shortName:"Attack",icon:"droplets",detail:"Pressure-driven gauntlets land a solid mechanical blow."},{name:"Hydrojet Lance",shortName:"Hydrojet",icon:"droplets",detail:"A focused water jet drives against the rival shield."},{name:"Undertow Cannon",shortName:"Undertow",icon:"waves",detail:"Twin pressure tanks feed a heavy water pulse."}]},{id:"atlas",name:"Atlas",role:"Seismic Heavyweight",colour:"#d6c395",effect:"seismic",trait:{name:"Aftershock",description:"Every four-energy special deals 2 extra shield damage.",id:"aftershock"},weapons:[{name:"Impact Hammers",shortName:"Attack",icon:"hammer",detail:"Braced piston fists deliver a weighty impact."},{name:"Seismic Driver",shortName:"Tremor",icon:"mountain",detail:"A piston cannon sends a compact shock pulse."},{name:"Faultline Ram",shortName:"Faultline",icon:"mountain",detail:"A reinforced ram releases a powerful pressure wave."}]},{id:"nova",name:"Nova",role:"Plasma Vanguard",colour:"#e8a6b8",effect:"plasma",trait:{name:"Hot Core",description:"Basic attacks deal 1 extra damage unless Prism is guarding.",id:"reactor"},weapons:[{name:"Reactor Gauntlets",shortName:"Attack",icon:"orbit",detail:"Charged fists strike with a compact plasma flash."},{name:"Plasma Accelerator",shortName:"Plasma",icon:"orbit",detail:"Magnetic rings launch a contained plasma bolt."},{name:"Starburst Cannon",shortName:"Starburst",icon:"sparkles",detail:"A larger reactor powers a bright shield-breaking pulse."}]},{id:"echo",name:"Echo",role:"Sonic Tactician",colour:"#b5adc9",effect:"sonic",trait:{name:"Efficient Resonance",description:"The piercing weapon uses only 1 energy instead of 2.",id:"resonance"},weapons:[{name:"Resonance Fists",shortName:"Attack",icon:"radio",detail:"Tuned gauntlets produce a sharp pressure impact."},{name:"Sonic Disruptor",shortName:"Sonic",icon:"radio",detail:"A focused sound pulse disrupts a raised shield."},{name:"Resonator Array",shortName:"Resonate",icon:"audio-lines",detail:"Paired resonators combine into a larger pressure wave."}]}],D_={relay:[["Rocket Battery","Rockets","rocket"],["Rail Siege Driver","Rail Shot","target"],["Guardian Arsenal","Arsenal","zap"]],helio:[["Photon Battery","Photon","sun"],["Eclipse Rail Array","Eclipse","scan-line"],["Dawnstar Siege Lens","Dawnstar","sun"]],volt:[["Storm Capacitors","Storm","zap"],["Lightning Rail Crown","Lightning","zap"],["Thunderhead Array","Tempest","zap"]],bastion:[["Fortress Battery","Fortress","shield"],["Tectonic Rail Driver","Tectonic","orbit"],["Citadel Siege Rig","Citadel","shield"]],zephyr:[["Gale Rocket Wings","Gale","wind"],["Jetstream Rail Array","Jetstream","wind"],["Hurricane Arsenal","Hurricane","tornado"]],glacier:[["Frostbite Battery","Frostbite","snowflake"],["Polar Rail Projector","Polar","snowflake"],["Iceberg Siege Array","Iceberg","snowflake"]],ember:[["Firestorm Battery","Firestorm","flame"],["Magma Rail Projector","Magma","flame"],["Phoenix Siege Array","Phoenix","flame"]],tidal:[["Monsoon Battery","Monsoon","droplets"],["Pressure Rail Array","Pressure","waves"],["Tsunami Siege Rig","Surge","waves"]],atlas:[["Bedrock Battery","Bedrock","mountain"],["Continental Rail Ram","Continental","hammer"],["Mountain Siege Rig","Mountain","mountain"]],nova:[["Nebula Battery","Nebula","orbit"],["Pulsar Rail Array","Pulsar","sparkles"],["Supernova Siege Rig","Supernova","sparkles"]],echo:[["Reverb Battery","Reverb","radio"],["Harmonic Rail Array","Harmonic","audio-lines"],["Symphony Siege Rig","Symphony","audio-lines"]]},Zf=["Shoulder batteries and reinforced armour support a stronger piercing shot.","A dorsal rail assembly and stabilisers channel a more powerful shot.","The complete siege rig combines its shoulder battery, rail and arm cannon."],ju=$s([{id:"base",description:"Attack builds 1 energy. Shield blocks most of an incoming hit."},{id:"pierce",description:"Unlock a piercing shot. It is strongest against a raised shield."},{id:"blast",description:"Spend 4 energy on a heavy blast that pierces shields. Incoming hits still hurt."},{id:"salvo",specialCost:3,specialShots:2,description:"Fire two shots together. The special uses 3 energy, so a full charge leaves 1 energy."},{id:"rail",openingBonus:4,description:"Keep your two-shot salvo. Spend 4 energy on a rail shot: 4 extra damage when Prism is open, and no return hit from a raised shield."},{id:"arsenal",specialShots:3,openingBonus:4,incomingDivisor:2,guardCounter:2,description:"Keep your salvo. The 4-energy arsenal fires three shots, gains 4 damage when Prism is open, stops shield return hits and halves other incoming hits. Shield also hits back for 2 when blocking."}].map(r=>({specialCost:4,specialShots:1,openingBonus:0,incomingDivisor:1,guardCounter:0,...r}))),ir=$s(L_.map(r=>({...r,weapons:[...r.weapons,...D_[r.id].map(([e,t,n],i)=>({name:e,shortName:t,icon:n,detail:ju[i+3].description}))]}))),Qu=$s(["Base suit","Specialist","Advanced","Elite","Master","Guardian"]),li=$s([{name:"Training Gauntlets",effect:"pulse",cue:"Prism is charging a BIG hit",detail:"Watch the raised arm. Block the charge, then attack an opening."},{name:"Breach Blaster",effect:"pulse",cue:"Prism is charging a breach shot",detail:"The arm cannon is charging. Your shield absorbs most of the hit."},{name:"Flame Projector",effect:"flame",cue:"Prism is heating a flame burst",detail:"The nozzle glows before the fire jet. Raise your shield."},{name:"Rocket Battery",effect:"rocket",cue:"Prism is locking its rockets",detail:"The shoulder pods are opening. Block the incoming volley."},{name:"Arc Rail Cannon",effect:"arc",cue:"Prism is charging an arc cannon",detail:"Energy is gathering along the rail. Prepare your shield."},{name:"Solar Siege Array",effect:"plasma",cue:"Prism is powering its siege array",detail:"The full array is charging. Block now; strike when it cools."}]),eh=r=>typeof r=="string"&&ir.some(e=>e.id===r),nt=r=>ir.find(e=>e.id===r)||ir[0],th=r=>r?.rulesVersion===4&&r.heroId==="glacier"?{...nt("glacier").trait,description:"Every special halves the incoming hit on that exchange."}:nt(r?.heroId).trait,ci=r=>r?.rulesVersion===3||r?.rulesVersion===4,Di=r=>ci(r)||r?.questions?.length===6?3:2,Zt=r=>ci(r)?Math.max(0,Math.min(5,r.upgradeStage||0)):r?.pad?2:r?.staff?1:0,Hn=r=>ci(r)?6:3,Ys=r=>r?.rulesVersion===4?ju[Zt(r)]:null,nh=(r,e)=>e==="break"?r?.heroId==="echo"?1:2:e==="special"?Ys(r)?.specialCost??4:0,ih=r=>Ys(r)?.description??(Zt(r)>=3?Zf[Zt(r)-3]:nt(r?.heroId).weapons[Zt(r)].detail),tn=r=>Math.max(0,Math.min(Hn(r)-1,(r?.round||1)-1+(r?.phase==="rival_upgrade"||r?.phase==="training"||r?.phase==="player_upgrade"?1:0))),rr=r=>r%2?"maths":"science",Ks=(r,e=!1)=>{let t=Zt(r),n=nt(r?.heroId);if(r?.rulesVersion===4&&t>=3)return{...n.weapons[e?t:3],shortName:e?t===3?"Full Salvo":t===4?"Rail Shot":"Arsenal":"Salvo",detail:e?ju[t].description:`Spend ${nh(r,"break")} energy on two shots. Strongest against a raised shield.`};let i=n.weapons[t>=3?t:e?2:1];return t>=3?{...i,detail:Zf[t-3],...e?{shortName:`${i.shortName} +`}:{}}:i};var dn={idle:{clip:"Idle",nativeDuration:4.166666507720947,duration:4.8,impactFraction:null},walk:{clip:"Walk",nativeDuration:1.0416666269302368,duration:1.2,impactFraction:null},strike:{clip:"Punch",nativeDuration:.7083333134651184,duration:1.02,impactFraction:15/24},guard:{clip:"Shoot",nativeDuration:.625,duration:.625,impactFraction:null},charge:{clip:"Shoot",nativeDuration:.625,duration:1.8,impactFraction:null},break:{clip:"Shoot",nativeDuration:.625,duration:1.15,impactFraction:.32},hit:{clip:"HitRecieve_1",nativeDuration:.5833333134651184,duration:.72,impactFraction:null},special:{clip:"Shoot",nativeDuration:.625,duration:1.45,impactFraction:.32},upgrade:{clip:"Pickup",nativeDuration:1.75,duration:2.1,impactFraction:null},victory:{clip:"Hello",nativeDuration:1.875,duration:2.3,impactFraction:null}},Jf={relay:{main:15509036,accent:15133670,metal:6582648,dark:1514528,light:10927557,glow:5432310},prism:{main:7875136,accent:2830389,metal:7897478,dark:1185304,light:13876128,glow:16759912},helio:{main:15785904,accent:16776433,metal:9601889,dark:2436144,light:14605254,glow:16773514},volt:{main:3378027,accent:12511947,metal:7374208,dark:1648676,light:12444366,glow:7602106},bastion:{main:7901854,accent:13160652,metal:6845563,dark:2369580,light:14476511,glow:13867775},zephyr:{main:2531278,accent:14937585,metal:6651527,dark:1321008,light:12838637,glow:7986687},glacier:{main:11653869,accent:16120831,metal:7509928,dark:1914176,light:14021631,glow:10222335},ember:{main:13058096,accent:16764786,metal:8550513,dark:2434340,light:15325630,glow:16753724},tidal:{main:1477802,accent:13893617,metal:7838109,dark:1388595,light:12119528,glow:6485247},atlas:{main:6386254,accent:15780962,metal:8751742,dark:2369568,light:14015941,glow:15267483},nova:{main:11548529,accent:15848175,metal:9603483,dark:2629933,light:15325421,glow:16749023},echo:{main:6509996,accent:12579530,metal:9278108,dark:2368303,light:14540266,glow:10092489}},Fo=null;async function jf(r){let e=new URL("./assets/mechs/",new URL(".",document.baseURI)),t=r==="guardian-library.glb"&&typeof DecompressionStream<"u",n=new URL(t?r+".gz":r,e),i=await fetch(n);if(!i.ok)throw new Error(`Failed to load 3D asset ${r}: HTTP ${i.status}`);let s=await i.arrayBuffer(),a=new Uint8Array(s,0,Math.min(2,s.byteLength));return t&&a[0]===31&&a[1]===139&&(s=await new Response(new Blob([s]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()),new No().parseAsync(s,e.href)}function U_(){return Fo||(Fo=jf("guardian-library.glb").then(r=>r.scene).catch(r=>{throw Fo=null,r})),Fo}var Zs=class{constructor(e){this.kind=e;this.root.name=`sparkbound-${e}`,this.root.add(this.body),this.readyPromise=this.load().catch(t=>{throw this.error=t instanceof Error?t:new Error(String(t)),this.root.userData.loadError=this.error.message,this.error})}root=new st;readyPromise;height=4.4;animations=dn;heroId="relay";ready=!1;reduced=!1;error=null;motion="idle";mixer=null;body=new st;model=null;clips=new Map;action=null;kit={staff:!1,pad:!1,tier:1,stage:0};materials={};parts=new Map;mounts=[];joints=[];jointGeometry=new Set;staff=new st;launcherSlide=new st;launcherBind=new It;tip=new Je;fist=new Je;shieldSocket=new Je;chargeLight=new si(7268863,0,2.5);chargeAmount=0;recoilTime=10;aimTarget=null;elapsed=0;duration=1/0;startTime=0;impactFired=!1;completeFired=!1;options={};looping=!0;disposed=!1;pending=null;gripPose=[];contactProfiles=new Map;revealTime=1;lastStage=-1;groundOffsets=new Map;async load(){let[e,t]=await Promise.all([jf(this.kind==="relay"?"stan.glb":"mike.glb"),U_()]);this.body.removeFromParent(),this.model=e.scene,this.body.add(this.model);for(let f of e.animations)this.clips.set(f.name,f);for(let f of Object.values(dn))if(!this.clips.has(f.clip))throw new Error(`Missing clip ${f.clip}`);this.mixer=new Ao(this.model),this.mixer.clipAction(this.clips.get("Idle")).play(),this.mixer.update(0),this.body.updateMatrixWorld(!0);let n=new kt().setFromObject(this.model),i=this.height/(n.max.y-n.min.y);this.model.scale.setScalar(i),this.model.position.y=-n.min.y*i,this.body.updateMatrixWorld(!0),this.model.traverse(f=>{f.isMesh&&(f.visible=!1)});let s=(f,g,x,p={})=>new qt({color:f,metalness:g,roughness:x,...p});this.materials={Main:s(15509036,.65,.32,{clearcoat:.45}),Accent:s(15133670,.45,.29,{clearcoat:.35}),Grey:s(6582648,.85,.3),LightGrey:s(10927557,.8,.25),Black:s(1514528,.25,.62),Eye:s(5432310,.4,.22,{emissive:5432310,emissiveIntensity:1.1}),Glass:s(1060664,.65,.16,{clearcoat:1})};let a={HandL:"Index1L",HandR:"Index1R"},o=this.kind==="prism"?["prism"]:ir.map(f=>f.id);for(let f of o){let g=new Map;this.parts.set(f,g);for(let x of["Head","Chest","Torso","UpperArmL","UpperArmR","LowerArmL","LowerArmR","UpperLegL","UpperLegR","LowerLegL","LowerLegR","FootL","FootR","HandL","HandR","Shield","Back3","Back4","Back5","Weapon1","Weapon2","Weapon3","Weapon4","Weapon5"]){let p=t.getObjectByName(`${f}__${x}`);if(!p){if(x==="Shield")continue;throw new Error(`Missing 3D assembly ${f}__${x}`)}let m=p.clone(!0);if(m.traverse(v=>{let y=v;if(!y.isMesh)return;let _=I=>this.materials[I.name.replace(/\.\d+$/,"")]||this.materials.Grey;y.material=Array.isArray(y.material)?y.material.map(_):_(y.material),y.castShadow=!0,y.receiveShadow=!0,y.frustumCulled=!1}),g.set(x,m),x.startsWith("Weapon"))this.launcherSlide.add(m);else{let v=x.startsWith("Back")?"Chest":x==="Shield"?"LowerArmL":a[x]||x,y=this.mount(v),_=/^(UpperArm|LowerArm|UpperLeg|LowerLeg)(L|R)$/.exec(x);if(_){let I={UpperArm:"LowerArm",LowerArm:"Index1",UpperLeg:"LowerLeg",LowerLeg:"Foot"}[_[1]]+_[2],E=this.bone(v).getWorldPosition(new A),P=this.bone(I).getWorldPosition(new A).sub(E),S=P.length();m.quaternion.setFromUnitVectors(new A(0,-1,0),P.normalize());let M={UpperArm:.5,LowerArm:.64,UpperLeg:.71,LowerLeg:.8}[_[1]];m.scale.y=S/M}x==="Shield"&&m.position.add(new A(.1,-.3,.25)),y.add(m),this.mounts.push(y)}m.visible=!1}}this.mount("Index1R").add(this.fist),this.fist.position.z=.13,this.mount("LowerArmL").add(this.shieldSocket),this.shieldSocket.position.set(0,-.2,.35),this.buildJoints(),this.mixer.stopAllAction();let u=this.mixer.clipAction(this.clips.get("Shoot"));u.reset().play(),u.time=.13,this.mixer.update(0),this.body.updateMatrixWorld(!0);let h=new A;for(let f of["Index2R","Ring2R","Thumb2R"])h.add(this.bone(f).getWorldPosition(new A));h.multiplyScalar(1/3),this.model.traverse(f=>{f.isBone&&/^(Palm|Index|Ring|Pinky|Thumb).*R$/.test(f.name)&&this.gripPose.push({bone:f,position:f.position.clone(),quaternion:f.quaternion.clone()})}),this.staff.position.copy(h).add(new A(0,.05,-.12)),this.body.add(this.staff),this.staff.updateMatrixWorld(!0),this.bone("LowerArmR").attach(this.staff),this.launcherBind.copy(this.staff.quaternion),this.staff.name="articulated-weapon-socket",this.staff.add(this.launcherSlide),this.launcherSlide.add(this.tip),this.tip.add(this.chargeLight),this.root.add(this.body),this.ready=!0,this.root.userData.model="Blender articulated guardian",this.root.userData.authoredClips=e.animations.map(f=>({name:f.name,duration:f.duration})),this.root.userData.height=this.height,this.setHero(this.heroId),this.setKit(this.kit),this.mixer.stopAllAction();let d=this.pending;this.pending=null;for(let f of["strike","break","special"]){this.play(f,{fade:0,restart:!0}),this.action.time=this.clips.get(dn[f].clip).duration*dn[f].impactFraction,this.mixer.update(0),this.applyGrip(),this.root.updateWorldMatrix(!0,!0);let g=f==="strike"?this.fist:this.tip;this.contactProfiles.set(f,this.root.worldToLocal(g.getWorldPosition(new A)))}this.play(d?.name||"idle",d?.options||{fade:0}),this.play("idle",{fade:0,restart:!0}),this.mixer.update(0),this.root.updateWorldMatrix(!0,!0);for(let[f,g]of this.parts){let x=new kt;for(let p of["FootL","FootR"])g.get(p).traverse(m=>{let v=m;v.isMesh&&(v.geometry.boundingBox||v.geometry.computeBoundingBox(),x.union(v.geometry.boundingBox.clone().applyMatrix4(v.matrixWorld)))});this.groundOffsets.set(f,this.root.position.y-x.min.y+.008)}return this.play(d?.name||"idle",d?.options||{fade:0,restart:!0}),this.applyIdentity(),this.updateJoints(),this.disposed&&this.dispose(),this}bone(e){let t=this.model.getObjectByName(e);if(!t)throw new Error(`Missing animation bone: ${e}`);return t}mount(e){let t=this.bone(e),n=new st;return this.body.updateMatrixWorld(!0),n.position.copy(t.getWorldPosition(new A)),this.body.add(n),n.updateMatrixWorld(!0),t.attach(n),n}buildJoints(){let e=[["Torso","Chest",.21],["Chest","Neck",.19],["Neck","Head",.12]];for(let t of["L","R"])e.push(["Chest",`UpperArm${t}`,.15],["Torso",`UpperLeg${t}`,.18],[`UpperArm${t}`,`LowerArm${t}`,.14],[`LowerArm${t}`,`Index1${t}`,.12],[`UpperLeg${t}`,`LowerLeg${t}`,.17],[`LowerLeg${t}`,`Foot${t}`,.14]);for(let[t,n,i]of e){let s=new st;s.name=`mechanical-link-${t}-${n}`;let a=new Map,o=(l,c,u,h)=>{let d=new _n(l,l,c,16);d.translate(0,u,0),a.has(h)||a.set(h,[]),a.get(h).push(d)};o(i,.94,0,"Black"),o(i*.76,.6,.16,"LightGrey"),o(i*1.12,.4,-.22,"Grey");for(let l of[-.4,-.3,-.2,.34,.44])o(i*1.18,.04,l,"Black");for(let[l,c]of a){let u=Wf(c);this.jointGeometry.add(u);for(let d of c)d.dispose();let h=new Re(u,this.materials[l]);h.receiveShadow=!0,s.add(h)}this.body.add(s),this.joints.push({a:this.bone(t),b:this.bone(n),group:s})}}updateJoints(){this.body.updateWorldMatrix(!0,!0);for(let{a:e,b:t,group:n}of this.joints){let i=this.body.worldToLocal(e.getWorldPosition(new A)),s=this.body.worldToLocal(t.getWorldPosition(new A)),a=s.clone().sub(i);n.position.copy(i).add(s).multiplyScalar(.5),n.quaternion.setFromUnitVectors(new A(0,1,0),a.clone().normalize()),n.scale.y=a.length()}}setHero(e){this.kind!=="relay"||this.disposed||(this.heroId=nt(e).id,this.root.userData.heroId=this.heroId,this.applyIdentity())}applyIdentity(){if(!this.ready)return;let e=this.kind==="prism"?"prism":this.heroId;this.body.position.y=this.groundOffsets.get(e)||0;let t=Jf[e]||Jf.relay;for(let[o,l]of Object.entries({Main:t.main,Accent:t.accent,Grey:t.metal,LightGrey:t.light,Black:t.dark,Eye:t.glow}))this.materials[o].color.setHex(l);this.materials.Eye.emissive.setHex(t.glow),this.chargeLight.color.setHex(t.glow);let n=this.kit.stage,i=this.kit.staff||this.motion==="break"||this.motion==="special";for(let[o,l]of this.parts)for(let[c,u]of l){let h=o===e;c.startsWith("Weapon")&&(h&&=Number(c.slice(6))===Math.max(1,n)),c.startsWith("Back")&&(h&&=Number(c.slice(4))===n),c==="Shield"&&(h&&=this.motion==="guard"||n>=2),u.visible=h}this.staff.visible=i;let s=this.parts.get(e)?.get(`Weapon${Math.max(1,n)}`),a=s?.getObjectByName(`${e}__Muzzle${Math.max(1,n)}`);a&&s?(s.updateWorldMatrix(!0,!0),this.tip.position.copy(this.launcherSlide.worldToLocal(a.getWorldPosition(new A)))):this.tip.position.set(0,0,n>=4?1.95:n>=2?1.7:1.4),this.root.userData.heroId=e,this.root.userData.equipmentStage=n,this.root.userData.weapon=this.kind==="prism"?["Training Gauntlets","Breach Blaster","Flame Projector","Rocket Battery","Arc Rail Cannon","Solar Siege Array"][n]:nt(e).weapons[n].name}setKit(e){typeof e.staff=="boolean"&&(this.kit.staff=e.staff),typeof e.pad=="boolean"&&(this.kit.pad=e.pad),this.kit.stage=Number.isFinite(e.stage)?Math.max(0,Math.min(5,Math.floor(e.stage))):this.kit.pad?2:this.kit.staff?1:0,Number.isFinite(e.stage)&&(this.kit.staff=this.kit.stage>=1,this.kit.pad=this.kit.stage>=2),Number.isFinite(e.tier)&&(this.kit.tier=Math.max(1,Math.min(3,Math.floor(e.tier)))),this.lastStage!==this.kit.stage&&(this.revealTime=this.motion==="upgrade"&&!this.reduced?0:1,this.lastStage=this.kit.stage),this.root.userData.kit={...this.kit},this.applyIdentity(),this.applyGrip()}applyGrip(){if(this.kit.staff&&this.motion!=="strike")for(let e of this.gripPose)e.bone.position.copy(e.position),e.bone.quaternion.copy(e.quaternion)}setAim(e){this.aimTarget=e?.clone()??null}setCharge(e){this.chargeAmount=Math.max(0,Math.min(1,e))}firePulse(){this.recoilTime=0}setCamera(e){}get imageActive(){return!1}play(e,t={}){if(!dn[e])throw new Error(`Unknown hero motion: ${e}`);if(!this.ready)return this.pending={name:e,options:t},{...dn[e]};if(this.disposed)return{...dn[e]};if(this.motion===e&&!t.restart&&(e==="idle"||e==="walk"||e==="guard")&&this.action)return this.currentTiming;let n=dn[e],i=e==="walk"&&this.kit.staff?"Walk_Holding":n.clip,s=this.clips.get(i),a=this.mixer.clipAction(s),o=this.action,l=Math.max(0,t.fade??.12);l===0&&this.mixer.stopAllAction(),this.motion=e,this.options=t,this.elapsed=0,this.impactFired=!1,this.completeFired=!1,this.looping=t.loop??(e==="idle"||e==="walk"||e==="guard"),this.duration=Number.isFinite(t.duration)&&t.duration>0?t.duration:n.duration;let c=Number.isFinite(t.timeScale)&&t.timeScale>0?t.timeScale:s.duration/this.duration;this.duration=s.duration/c;let u=Math.max(0,Math.min(.95,t.startFraction??0));return this.startTime=this.duration*u,this.elapsed=this.startTime,a.reset().setEffectiveWeight(1).setEffectiveTimeScale(c),a.time=s.duration*u,a.setLoop(this.looping?fu:du,this.looping?1/0:1),a.clampWhenFinished=!0,a.play(),o&&o!==a&&(o.fadeOut(l),a.fadeIn(l)),e==="guard"&&(a.time=.13,a.paused=!0),e==="charge"&&(a.paused=!0),t.hold&&(a.paused=!0),this.action=a,e!=="charge"&&(this.chargeAmount=0),this.mixer.update(0),this.applyGrip(),this.updateJoints(),this.applyIdentity(),this.currentTiming}get currentTiming(){let e=dn[this.motion],t=this.duration-this.startTime,n=e.impactFraction===null?null:Math.max(0,this.duration*e.impactFraction-this.startTime);return{clip:e.clip,nativeDuration:e.nativeDuration,duration:t,impactFraction:n===null?null:n/t,impactTime:n}}update(e,t){if(!this.ready||this.disposed||!Number.isFinite(e)||e<=0)return;this.options.hold||(this.elapsed+=e),this.mixer.update(e),this.motion==="charge"&&(this.action.time=.13*Math.min(1,this.elapsed/.55),this.mixer.update(0)),(this.motion==="break"||this.motion==="special")&&(this.action.time=Math.min(.13,this.elapsed/this.duration*.625),this.action.paused=!0,this.mixer.update(0)),this.applyGrip(),this.recoilTime+=e,this.revealTime=Math.min(1,this.revealTime+e/.8),this.updateJoints();let n=this.motion==="break"||this.motion==="special";if(this.staff.visible=this.kit.staff||n,this.staff.quaternion.copy(this.launcherBind),this.aimTarget&&(n||this.motion==="charge"))for(let o=0;o<3;o++){this.root.updateWorldMatrix(!0,!0);let l=this.staff.localToWorld(new A(this.tip.position.x,this.tip.position.y,0)),c=this.aimTarget.clone().sub(l).normalize(),u=new It().setFromUnitVectors(new A(0,0,1),c);this.staff.quaternion.copy(this.staff.parent.getWorldQuaternion(new It).invert().multiply(u))}this.launcherSlide.position.z=this.reduced?0:-.18*Math.exp(-this.recoilTime*13)*Math.sin(Math.min(1,this.recoilTime/.08)*Math.PI/2),this.chargeLight.intensity=this.reduced?0:this.chargeAmount*2+(this.recoilTime<.12?5*(1-this.recoilTime/.12):0),this.materials.Eye.emissiveIntensity=1.1+this.chargeAmount*1.5;let i=this.parts.get(this.kind==="prism"?"prism":this.heroId);if(i){for(let[o,l]of i)if(o.startsWith("Back")||o.startsWith("Weapon")){let c=this.reduced?1:this.revealTime,u=c*c*(3-2*c);l.scale.setScalar(.1+.9*u)}}if(this.root.userData.charge=this.chargeAmount,this.root.updateWorldMatrix(!0,!0),this.options.hold)return;let s=dn[this.motion],a=this.action;!this.impactFired&&s.impactFraction!==null&&this.elapsed>=this.duration*s.impactFraction&&(this.impactFired=!0,this.options.onImpact?.()),this.action===a&&!this.looping&&!this.completeFired&&this.elapsed>=this.duration&&(this.completeFired=!0,this.options.onComplete?.())}get weaponTip(){return this.root.updateWorldMatrix(!0,!0),(this.kit.staff||this.motion==="break"||this.motion==="special"?this.tip:this.fist).getWorldPosition(new A)}get contactPoint(){return this.root.updateWorldMatrix(!0,!0),this.motion==="strike"?this.fist.getWorldPosition(new A):this.weaponTip}contactLocal(e){let t=this.contactProfiles.get(e);if(!t)throw new Error("Await HeroRig.readyPromise before querying contact reach");let n=t.clone();return n.y+=this.groundOffsets.get(this.kind==="prism"?"prism":this.heroId)||0,n}visualBounds(){this.root.updateWorldMatrix(!0,!0);let e=new kt;return this.root.traverseVisible(t=>{let n=t;n.isMesh&&(n.geometry.boundingBox||n.geometry.computeBoundingBox(),e.union(n.geometry.boundingBox.clone().applyMatrix4(n.matrixWorld)))}),e}setFacing(e){Number.isFinite(e)&&(this.root.rotation.y=e)}get shieldPoint(){return this.root.localToWorld(new A(0,2.35,.58))}dispose(){if(this.disposed=!0,this.mixer?.stopAllAction(),this.model){this.mixer?.uncacheRoot(this.model);let e=new Set,t=new Set,n=new Set;this.model.traverse(i=>{let s=i;if(s.isSkinnedMesh){e.add(s.skeleton),t.add(s.geometry);for(let a of Array.isArray(s.material)?s.material:[s.material])n.add(a)}});for(let i of e)i.dispose();for(let i of t)i.dispose();for(let i of n)i.dispose()}for(let e of Object.values(this.materials))e.dispose();for(let e of this.jointGeometry)e.dispose();this.root.removeFromParent()}};var Bo=class{forge=new st;root=new st;materials=new Set;textures=new Set;geometries=new Set;batches=new Map;rotors=[];progressBar;forgeGlow;water;disposed=!1;progress=0;constructor(e){this.root.name="Sparkbound harbour arena",this.root.userData={arenaRadius:12,groundY:0,clearCombatBounds:[-6,6,-2.8,9]},e.add(this.root);let t=(T,U=.65,k=.35)=>this.mat(new hn({color:T,roughness:U,metalness:k})),n=this.loadTexture("concrete-colour.jpg",!0,5),i=this.loadTexture("concrete-normal.jpg",!1,5),s=this.mat(new hn({color:11778231,map:n,normalMap:i,normalScale:new J(.35,.35),roughness:.88,metalness:.08})),a=t(7174268,.6,.65),o=t(3423810,.51,.72),l=t(12832203,.38,.68),c=t(2107949,.8,.38),u=t(13948879,.76,.18),h=t(12362603,.6,.25),d=this.mat(new hn({color:7846336,emissive:4099995,emissiveIntensity:.3,roughness:.4,metalness:.5})),f=this.geo(new In(1,1,1)),g=this.geo(new _n(1,1,1,32)),x=(T,U,k,H,V,G=!0)=>this.instance(T,f,U,{p:k,s:H,r:V},G);this.mesh(this.geo(new _n(12,11.65,.8,96)),o,[0,-.43,0]),this.mesh(this.geo(new _n(11.9,11.9,.12,96)),a,[0,-.06,0]);let p=this.geo(new ns(9.5,96));p.rotateX(-Math.PI/2),this.mesh(p,s,[0,.004,0]),this.ring(9.5,9.57,.009,c),this.ring(9.65,9.71,.012,l),this.ring(11.69,11.77,.012,l),this.ring(11.91,12,-.3,c),this.ring(7.25,7.28,.013,l);let m=this.mat(new hn({color:5660771,roughness:.85,metalness:.2}));this.ring(4.85,4.875,.014,m);for(let T=0;T<32;T++){let U=T*Math.PI/16,k=Math.sin(U),H=Math.cos(U);x("deck-joints",c,[k*10.6,.006,H*10.6],[.026,.014,2.12],[0,U,0],!1),x("deck-fasteners",l,[k*11.45,.024,H*11.45],[.075,.022,.075],[0,U,0],!1),T%4===0&&x("edge-markers",T%8===0?h:l,[k*11.78,.024,H*11.78],[.4,.015,.1],[0,U,0],!1),x("fascia-ribs",l,[k*11.86,-.48,H*11.86],[.13,.46,.16],[0,U,0])}for(let T of[-6.2,3.2,6.3]){let U=Math.sqrt(89.30249999999998-T*T)*2;x("floor-joints",m,[0,.012,T],[U,.008,.018],void 0,!1)}for(let T of[-6.3,0,6.3]){let U=Math.sqrt(89.30249999999998-T*T)*2;x("floor-joints",m,[T,.012,0],[.018,.008,U],void 0,!1)}for(let T of[-3.8,3.8])for(let U of[-1,1]){x("home-markings",l,[T+U*1.08,.023,0],[.065,.013,1.3],void 0,!1);for(let k of[-.65,.65])x("home-markings",l,[T+U*.87,.023,k],[.45,.013,.065],void 0,!1)}for(let T=0;T<11;T++)x("warning-ticks",h,[-2.4+T*.48,.021,8.35],[.22,.012,.38],[0,-.45,0],!1);this.label("SPARKBOUND   /   SPARRING DECK 07",[0,.035,7.5],5.4,.3,"floor"),this.label("NO STEP   //   SERVICE CHANNEL",[6.8,.035,-5.9],2.8,.22,"floor"),this.label("01   RELAY",[-3.8,.035,1.4],1.7,.23,"floor"),this.label("02   PRISM",[3.8,.035,1.4],1.7,.23,"floor");for(let T=0;T<=14;T++){let U=-Math.PI/2+T*Math.PI/14,k=Math.sin(U)*11.8,H=-Math.cos(U)*11.8;if(!(Math.abs(k)>10.8)&&(x("rear-posts",o,[k,.47,H],[.12,.95,.12]),T<14)){let V=U+Math.PI/14;this.beam([k,.88,H],[Math.sin(V)*11.8,.88,-Math.cos(V)*11.8],.065,l,"rear-rails")}}for(let T of[-9.6,9.6]){x("service-housings",u,[T,.45,-7.4],[1.4,.9,1.1]),x("service-caps",o,[T,.96,-7.4],[1.5,.12,1.2]);for(let U=0;U<7;U++)x("service-vents",c,[T-.48+U*.16,.53,-6.842],[.07,.38,.014],void 0,!1);x("service-status",d,[T+.48,.79,-6.83],[.12,.04,.015],void 0,!1)}this.forge.name="Forge - rear left",this.forge.position.set(-7,0,-5),this.root.add(this.forge);let v=new st;v.position.set(-1.65,0,.65),this.forge.userData.machineOffset=[-1.65,0,.65],this.forge.add(v);let y=(T,U,k,H=f)=>{let V=this.mesh(H,T,U,v);return V.scale.set(...k),V};y(o,[0,.12,0],[2.8,.24,2.4]),y(l,[0,.26,0],[2.6,.06,2.2]),y(c,[0,.72,-.4],[2.1,.87,1.2]),y(u,[0,1.17,-.25],[2.55,.16,1.65]),y(o,[0,1.28,-.25],[1.85,.075,1]);for(let T of[-1.06,1.06])y(o,[T,1.56,-.84],[.2,2.55,.22]),y(l,[T,1.75,-.68],[.08,1.55,.06]),y(h,[T,2.72,-.84],[.27,.16,.28]);y(u,[0,2.88,-.84],[2.7,.3,.55]),y(c,[0,2.69,-.7],[2.08,.09,.28]),y(l,[.4,2.38,-.69],[.17,.57,.18]),y(o,[.4,2.11,-.58],[.4,.16,.48]),this.forgeGlow=this.mat(new hn({color:8439240,emissive:5617854,emissiveIntensity:.4,roughness:.4,metalness:.5})),y(this.forgeGlow,[.4,2.005,-.4],[.13,.08,.16]),y(o,[-.72,1.4,.46],[.48,.1,.39]);let _=y(this.forgeGlow,[-.72,1.47,.46],[.4,.035,.29]);_.rotation.x=.35,y(c,[0,.83,.213],[1.4,.15,.035]),this.progressBar=y(this.forgeGlow,[-.67,.83,.237],[1.34,.075,.018]),this.label("FORGE   /   07",[-8.65,2.91,-4.9],1.8,.2,"vertical"),this.setForgeProgress(0);for(let T of[-.65,0,.65])y(l,[T,1.35,-.3],[.33,.09,.49]);for(let T of[-8,8])x("foundation-piers",s,[T,-3.1,-4],[1.8,5.2,3]),this.beam([T,-4.8,-4],[T*.4,-.8,1],.45,o,"foundation-braces");let I=this.loadTexture("harbour-panorama.png",!0,1);I.wrapS=I.wrapT=Cn;let E=this.makeWaterMaterial(I),R=this.geo(new un(650,650));R.rotateX(-Math.PI/2),this.water=this.mesh(R,E,[0,-6.25,-100]),this.water.receiveShadow=!1;let P=n.clone();P.repeat.set(18,45),this.textures.add(P);let S=this.mat(new hn({color:11251880,map:P,roughness:.94,metalness:.05}));x("distant-quays",S,[-34,-5.5,-18],[18,1.5,100]),x("distant-quays",S,[40,-5.5,-18],[24,1.5,100]);let M=this.mesh(this.geo(new _n(180,180,120,96,1,!0,Math.PI/2,Math.PI)),this.mat(new dt({map:I,side:Vt,fog:!1,toneMapped:!1})),[0,26,0]);M.name="Original harbour skyline matte",M.castShadow=M.receiveShadow=!1;for(let T of[-24.96,27.96]){let U=Math.sign(T);x("quay-coping",l,[T,-4.72,-18],[.25,.12,100]),x("quay-service-lane",a,[T+U*2.2,-4.739,-18],[2.2,.025,98],void 0,!1);for(let k=0;k<13;k++){let H=25-k*7.5;x("quay-joints",c,[T+U*5,-4.73,H],[9,.02,.04],void 0,!1),x("quay-fenders",c,[T-U*.12,-5.35,H],[.26,1.15,.68]),this.instance("quay-bollards",g,o,{p:[T+U*.65,-4.55,H],s:[.18,.4,.18]},!1),this.instance("bollard-caps",g,h,{p:[T+U*.65,-4.33,H],s:[.26,.08,.26]},!1)}}for(let[T,U]of[[-29,-26],[32,-31],[-36,-2],[42,-4]]){x("industry-footings",S,[T,-4.6,U],[6.4,.4,7.4]),x("industry-bases",u,[T,-1.4,U],[6,6.2,7]),x("industry-roofs",o,[T,1.82,U],[6.3,.3,7.3]),x("industry-bands",a,[T,-.2,U+3.51],[5.8,.85,.07]);for(let V of[-1.1,1.1])this.instance("industry-conduit",g,o,{p:[T+3.13,-1,U+V],s:[.13,5.1,.13]},!1),x("industry-conduit-brackets",l,[T+3.13,-.8,U+V],[.34,.1,.34]);x("industry-plant",a,[T+1.85,2.32,U+1.2],[1.3,.8,1.8]);for(let V=0;V<6;V++)x("plant-fins",c,[T+1.85,2.75,U+.48+V*.29],[1.2,.05,.09],void 0,!1);for(let V=0;V<5;V++)x("industry-fins",l,[T-2.5+V*1.25,-1.4,U+3.6],[.12,5.8,.23]),x("industry-door",c,[T-2.35+V*1.16,-3.35,U+3.53],[.88,2.5,.07]);for(let V of[-1.6,1.6])this.instance("exhausts",g,l,{p:[T+V,2.65,U-1],s:[.66,1.5,.66]},!1),this.instance("exhaust-lips",g,c,{p:[T+V,3.4,U-1],s:[.73,.13,.73]},!1);let k=new st;k.position.set(T,2.04,U+1.7),this.root.add(k),this.mesh(g,c,[0,0,0],k).scale.set(.27,.15,.27);for(let V=0;V<4;V++){let G=this.mesh(f,o,[Math.sin(V*Math.PI/2)*.55,0,Math.cos(V*Math.PI/2)*.55],k);G.scale.set(.25,.06,.9),G.rotation.y=V*Math.PI/2+.23}this.rotors.push(k)}for(let T of[-37,37]){for(let U of[-2,2])x("gantry",o,[T+U,.5,-43],[.4,10,.5]);x("gantry",o,[T,5.35,-43],[4.6,.5,.7]),x("gantry-arm",h,[T+2.5,5.4,-43],[8,.28,.36]),this.beam([T-1.9,2.2,-43],[T+1.9,4.95,-43],.16,l,"gantry-braces")}this.flushBatches()}update(e,t){if(this.disposed)return;let n=Number.isFinite(e)?ai.clamp(e,0,.1):0,i=Number.isFinite(t)?t:0;this.rotors.forEach((s,a)=>{s.rotation.y+=n*(.34+a*.035)}),this.water.material.uniforms.uTime.value+=n,this.forgeGlow.emissiveIntensity=.28+this.progress*.32+Math.sin(i*1.2)*.025}setForgeProgress(e){this.progress=Number.isFinite(e)?ai.clamp(e,0,1):0,this.progressBar.scale.x=Math.max(.001,this.progress*1.34),this.progressBar.position.x=-.67+this.progress*.67,this.progressBar.visible=this.progress>0}dispose(){this.disposed||(this.disposed=!0,this.root.removeFromParent(),this.root.traverse(e=>{e.isInstancedMesh&&e.dispose()}),this.geometries.forEach(e=>e.dispose()),this.materials.forEach(e=>e.dispose()),this.textures.forEach(e=>e.dispose()),this.root.clear(),this.rotors.length=0,this.geometries.clear(),this.materials.clear(),this.textures.clear())}mat(e){return this.materials.add(e),e}geo(e){return this.geometries.add(e),e}loadTexture(e,t,n){let i=new Pi().load("/sparkbound/assets/environment/"+e,s=>{this.disposed&&s.dispose()});return t&&(i.colorSpace=wt),i.wrapS=i.wrapT=jn,i.repeat.set(n,n),i.anisotropy=4,this.textures.add(i),i}mesh(e,t,n,i=this.root){let s=new Re(e,t);return s.position.set(...n),s.castShadow=!0,s.receiveShadow=!0,i.add(s),s}instance(e,t,n,i,s){let a=e+":"+n.uuid;this.batches.has(a)||this.batches.set(a,{geometry:t,material:n,items:[],shadow:s}),this.batches.get(a).items.push(i)}flushBatches(){let e=new Je;this.batches.forEach(({geometry:t,material:n,items:i,shadow:s},a)=>{let o=new wi(t,n,i.length);o.name=a.split(":")[0],i.forEach((l,c)=>{e.position.set(...l.p),e.scale.set(...l.s),e.rotation.set(...l.r||[0,0,0]),e.updateMatrix(),o.setMatrixAt(c,e.matrix)}),o.castShadow=s,o.receiveShadow=!0,o.computeBoundingSphere(),this.root.add(o)}),this.batches.clear()}beam(e,t,n,i,s){let a=new A(...e),o=new A(...t),l=a.clone().add(o).multiplyScalar(.5),c=o.clone().sub(a),u=new It().setFromUnitVectors(new A(0,1,0),c.clone().normalize()),h=new yn().setFromQuaternion(u),d=this.batches.get(s+":"+i.uuid);this.instance(s,d?.geometry||this.geo(new In(1,1,1)),i,{p:l.toArray(),s:[n,c.length(),n],r:[h.x,h.y,h.z]},!0)}ring(e,t,n,i){let s=this.geo(new rs(e,t,128));s.rotateX(-Math.PI/2);let a=this.mesh(s,i,[0,n,0]);return a.castShadow=!1,a}label(e,t,n,i,s){let a=document.createElement("canvas");a.width=1024,a.height=96;let o=a.getContext("2d");if(!o)return;o.clearRect(0,0,1024,96),o.fillStyle="#d2d8d2",o.font="600 48px monospace",o.textAlign="center",o.textBaseline="middle",o.fillText(e,512,48,1e3);let l=new ts(a);l.colorSpace=wt,this.textures.add(l);let c=this.mat(new dt({map:l,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,toneMapped:!1})),u=this.mesh(this.geo(new un(n,i)),c,t);s==="floor"&&(u.rotation.x=-Math.PI/2),u.castShadow=!1,u.receiveShadow=!1}makeWaterMaterial(e){return this.mat(new rn({uniforms:{uTime:{value:0},uPanorama:{value:e},uDeep:{value:new xe(5467248)}},vertexShader:`varying vec3 vWorld;
        void main(){vec4 world=modelMatrix*vec4(position,1.0);vWorld=world.xyz;gl_Position=projectionMatrix*viewMatrix*world;}`,fragmentShader:`precision highp float;
        uniform float uTime;uniform sampler2D uPanorama;uniform vec3 uDeep;varying vec3 vWorld;
        void main(){
          vec2 p=vWorld.xz;float t=uTime;
          float a=dot(p,vec2(.65,.76))*.85+sin(p.x*.12)*1.1-t*.32;
          float b=dot(p,vec2(-.8,.35))*1.7+sin(p.y*.17)*.8+t*.26;
          float c=dot(p,vec2(.22,.97))*3.7-t*.48;
          float distanceToEye=length(cameraPosition-vWorld);
          float fine=1.0-smoothstep(45.0,170.0,distanceToEye);
          vec2 slope=vec2(.65,.76)*cos(a)*.028+vec2(-.8,.35)*cos(b)*.012+vec2(.22,.97)*cos(c)*.005*fine;
          vec3 n=normalize(vec3(-slope.x,1.0,-slope.y));
          vec3 v=normalize(cameraPosition-vWorld);vec3 r=reflect(-v,n);
          float reach=180.0/max(length(r.xz),.01);
          vec3 reflectedPoint=vWorld+r*reach;
          float u=.5-atan(reflectedPoint.x,-reflectedPoint.z)/3.14159265;
          float y=clamp((reflectedPoint.y+34.0)/120.0,.26,.98);
          vec2 uv=vec2(clamp(u,0.0,1.0),y);
          vec3 blurred=(texture2D(uPanorama,uv,4.0).rgb+texture2D(uPanorama,uv+vec2(.006,.03),4.0).rgb+texture2D(uPanorama,uv-vec2(.006,.03),4.0).rgb)/3.0;
          vec3 reflection=pow(blurred,vec3(2.2));
          float fresnel=.18+.22*pow(1.0-max(dot(n,v),0.0),3.0);
          vec3 colour=mix(uDeep,reflection*.8,fresnel);
          float swell=sin(a)*.04+sin(b)*.023;
          colour*=1.0+swell;
          vec3 halfLight=normalize(normalize(vec3(-.43,.83,.36))+v);
          float glint=pow(max(dot(n,halfLight),0.0),120.0)*.008*fine;
          colour+=vec3(1.0,.95,.8)*glint;
          gl_FragColor=vec4(colour,1.0);
          #include <colorspace_fragment>
        }`,toneMapped:!1}))}};function Qf(r){let e=new Jr,t=new Re(new Ln(30,24,12),new dt({color:10464945,side:Vt}));e.add(t);for(let[a,o,l,c,u,h]of[[-9,9,8,9,15,2.5],[8,5,-7,6,13,1.8],[0,18,0,16,12,1.4]]){let d=new Re(new un(c,u),new dt({color:new xe().setScalar(h),side:Nt}));d.position.set(a,o,l),d.lookAt(0,0,0),e.add(d)}let n=new Re(new un(60,60),new dt({color:4805970,side:Nt}));n.rotation.x=-Math.PI/2,n.position.y=-12,e.add(n);let i=new Zr(r),s=i.fromScene(e,.02,.1,100);return i.dispose(),e.traverse(a=>{let o=a;o.isMesh&&(o.geometry.dispose(),o.material.dispose())}),s}var ze=(r=0,e=0,t=0)=>new A(r,e,t),rh=r=>(r=Math.max(0,Math.min(1,r)),r*r*(3-2*r)),Oo=class{constructor(e){this.canvas=e;this.scene.background=new xe(10203830),this.scene.fog=new so(11256001,.0035),this.camera=new Ut(38,1,.1,350),this.camera.position.copy(this.cameraGoal),this.renderer=new ro({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.7)),this.renderer.outputColorSpace=wt,this.renderer.toneMapping=uu,this.renderer.toneMappingExposure=1.15,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=cu,this.environment=Qf(this.renderer),this.scene.environment=this.environment.texture,this.scene.add(new wo(14282228,5529686,2.3));let t=new tr(16773070,3.5);t.position.set(-12,24,14),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-16,right:16,top:15,bottom:-15,near:1,far:60}),t.shadow.bias=-4e-4,t.shadow.normalBias=.045,this.scene.add(t);let n=new tr(10804458,2.1);n.position.set(4,10,-10),this.scene.add(n),this.hitLight=new si(16767386,0,10),this.hitLight.position.set(0,2.5,0),this.scene.add(this.hitLight),this.stage=new Bo(this.scene),this.relay=new Zs("relay"),this.prism=new Zs("prism"),this.scene.add(this.relay.root,this.prism.root),this.relay.root.position.set(this.heroHome,0,0),this.prism.root.position.set(this.rivalHome,0,0),this.relay.setCamera(this.camera),this.prism.setCamera(this.camera),this.relay.root.rotation.y=Math.PI/2,this.prism.root.rotation.y=-Math.PI/2;let i=new Os;for(let u=0;u<6;u++){let h=u/6*Math.PI*2+Math.PI/6;u?i.lineTo(Math.cos(h)*1.2,Math.sin(h)*1.5):i.moveTo(Math.cos(h)*1.2,Math.sin(h)*1.5)}i.closePath(),this.shield=new Re(new Mo(i),new qt({color:7136225,emissive:2193281,emissiveIntensity:.7,transparent:!0,opacity:.24,roughness:.2,metalness:.35,side:Nt,depthWrite:!1})),this.shield.rotation.y=Math.PI/2,this.scene.add(this.shield),this.shieldLines=new es(new vo(this.shield.geometry),new Ei({color:11730943,transparent:!0,opacity:.8})),this.shield.add(this.shieldLines),this.shield.visible=!1,this.particles=new wi(new In(.07,.045,.16),new dt({color:16766603,transparent:!0}),110),this.particles.instanceMatrix.setUsage(Rf),this.particles.frustumCulled=!1,this.scene.add(this.particles);for(let u=0;u<110;u++)this.particleDummy.scale.setScalar(0),this.particleDummy.updateMatrix(),this.particles.setMatrixAt(u,this.particleDummy.matrix);this.previewMarker.rotation.x=-Math.PI/2,this.previewMarker.visible=!1,this.scene.add(this.previewMarker,this.previewLight,this.bolt),this.bolt.name="travelling-pulse",this.bolt.visible=!1;let s=new dt({color:9631487}),a=new Re(new Ln(.17,12,8),s);a.scale.z=2.7,this.bolt.add(a);let o=new Re(new er(.25,.035,6,20),s);this.bolt.add(o);let l=new Re(new _n(.035,.13,.9,8),s);l.rotation.x=Math.PI/2,l.position.z=-.55,this.bolt.add(l);let c=new st;c.name="effect-pulse",c.add(...this.bolt.children.slice()),this.bolt.add(c),this.effects.set("pulse",c),this.addEffects();for(let u=0;u<2;u++){let h=new st;h.name=`salvo-shot-${u+2}`,h.visible=!1;for(let[d,f]of this.effects){let g=f.clone(!0);g.name=d,h.add(g)}this.scene.add(h),this.salvo.push(h)}this.addShieldImpact(),this.ready=Promise.all([this.relay.readyPromise||this.relay.ready,this.prism.readyPromise||this.prism.ready,this.loadGeneratedEffects()]).then(async()=>{if(!this.disposed)if(await this.renderer.compileAsync(this.scene,this.camera),this.assetsReady=!0,this.relay.play("idle"),this.prism.play("idle"),this.resize(),this.rosterPreview){let u=this.rosterPreview;this.previewHero(u.id,u.stage)}else if(this.previewStep){let u=this.previewStep;this.previewStep=null,this.trainingPreview(u)}else this.syncKey="",this.sync(this.match,this.currentTier)}),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize(),e.addEventListener("webglcontextlost",this.contextLost),e.addEventListener("webglcontextrestored",this.contextRestored),e.style.touchAction="none",e.addEventListener("pointerdown",this.orbitStart),e.addEventListener("pointermove",this.orbitMove),e.addEventListener("pointerup",this.orbitEnd),e.addEventListener("pointercancel",this.orbitEnd),this.raf=requestAnimationFrame(u=>this.tick(u))}scene=new Jr;camera;renderer;stage;relay;prism;ready;paused=!1;reduced=!1;frame=0;elapsed=0;errors=[];onCue=()=>{};onImpact=()=>{};onBeat=()=>{};phase="welcome";match;animation=null;lastTime=0;raf=0;width=1;height=1;target=ze(0,2,0);cameraGoal=ze(8,6.5,15);look=ze(0,2,0);shield;shieldLines;particles;particleData=[];particleDummy=new Je;hitLight;clock=0;heroHome=-3.4;rivalHome=3.4;disposed=!1;resizeObserver;shake=0;lastIntent="";syncKey="";demoTime=0;currentTier=1;upgradeReveal=!1;battleEnvelope=new kt;battleFitKey="";battleBandKey="";battleReservation=null;previewStep=null;previewTime=0;previewLight=new si(12450303,0,9);previewMarker=new Re(new rs(.95,1.08,48),new dt({color:12450303,side:Nt,transparent:!0,opacity:.85,depthWrite:!1}));bolt=new st;rosterPreview=null;effects=new Map;salvo=[];impactShell=new st;impactAge=10;effectTexture;contextLost=e=>{e.preventDefault(),this.paused=!0,this.errors.push("WebGL context lost"),this.onBeat("Graphics paused. Reload to resume your saved match.")};contextRestored=()=>location.reload();generatedJet=null;generatedImpact=null;generatedEffectTexture=null;assetsReady=!1;environment;previewYaw=.12;orbitDrag=null;orbitStart=e=>{this.canvas.closest("#game")?.getAttribute("data-view")!=="hangar"||e.button!==0||(this.orbitDrag={pointer:e.pointerId,x:e.clientX,yaw:this.previewYaw},this.canvas.setPointerCapture(e.pointerId))};orbitMove=e=>{this.orbitDrag?.pointer===e.pointerId&&(this.previewYaw=this.orbitDrag.yaw+(e.clientX-this.orbitDrag.x)*.009,this.relay.root.rotation.y=this.previewYaw,this.fitHangar())};orbitEnd=e=>{this.orbitDrag?.pointer===e.pointerId&&(this.orbitDrag=null,this.canvas.hasPointerCapture(e.pointerId)&&this.canvas.releasePointerCapture(e.pointerId))};resize(){this.width=Math.max(1,this.canvas.clientWidth),this.height=Math.max(1,this.canvas.clientHeight),this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height,!1),this.setCamera(),!this.animation&&this.phase!=="training"?(this.relay.root.position.set(this.heroHome,0,0),this.prism.root.position.set(this.rivalHome,0,0)):this.animation?.phase==="retreat"&&(this.animation.source=[this.relay.root.position.clone(),this.prism.root.position.clone()],this.animation.destination=[ze(this.heroHome,0,0),ze(this.rivalHome,0,0)],this.animation.phaseTime=0),this.fitHeroes(),this.camera.position.copy(this.cameraGoal),this.look.copy(this.target),this.camera.lookAt(this.look)}battleBand(){if(this.phase!=="battle")return null;let e=this.canvas.closest("#game"),t=e?.querySelector(".battle-console");if(!t||!t.getClientRects().length)return null;let n=this.canvas.getBoundingClientRect(),i=0,s=`${this.width}:${this.height}:${this.match?.id}:${this.match?.round}:${this.match?.staff}:${this.match?.pad}`;for(let o of e.querySelectorAll("#topbar,.hero-hud,.round-chip,#scene-caption")){let l=o.getBoundingClientRect();l.width&&l.height&&getComputedStyle(o).visibility!=="hidden"&&(i=Math.max(i,l.bottom-n.top))}this.battleReservation?.key!==s&&(this.battleReservation={key:s,top:Math.ceil(i+6),bottom:this.height}),i=Math.max(this.battleReservation.top,Math.ceil(i+6));let a=Math.min(this.battleReservation.bottom,Math.floor(Math.min(this.height,t.getBoundingClientRect().top-n.top)-6));return a<=i?null:(this.battleReservation={key:s,top:i,bottom:a},{top:i,bottom:a,key:`${this.width}:${this.height}:${i}:${a}`})}fitHeroes(e=this.battleBand()){if(this.relay.setCamera(this.camera),this.prism.setCamera(this.camera),this.prism.imageActive&&(this.shield.visible=!1),!this.relay.ready||!this.prism.ready)return;if(this.rosterPreview&&this.canvas.closest("#game")?.getAttribute("data-view")==="hangar"){this.fitHangar();return}if(this.phase==="training"&&!this.previewStep){this.fitForge();return}let t=this.relay.visualBounds().union(this.prism.visualBounds());if(t.isEmpty())return;let n=this.cameraGoal.clone().sub(this.target).normalize(),i=ze().crossVectors(ze(0,1,0),n).normalize(),s=ze().crossVectors(n,i).normalize(),a=Math.tan(ai.degToRad(this.camera.fov/2)),o=this.width/this.height<.85;if(e){let d=`${this.width}:${this.height}:${this.match?.id}:${this.match?.round}:${this.match?.staff}:${this.match?.pad}`,f=d!==this.battleFitKey;f&&(this.battleFitKey=d,this.battleEnvelope.makeEmpty()),this.animation?this.battleEnvelope.union(t.clone().expandByScalar(.15)):this.battleEnvelope.copy(t).expandByScalar(.15);let g=ze(0,2.2,0),x=1-2*e.bottom/this.height,p=1-2*e.top/this.height,m=(x+p)/2,v=15,y=this.battleEnvelope;for(let _ of[y.min.x,y.max.x])for(let I of[y.min.y,y.max.y])for(let E of[y.min.z,y.max.z]){let R=ze(_,I,E).sub(g),P=R.dot(n),S=R.dot(s);v=Math.max(v,P+Math.abs(R.dot(i))/(a*this.camera.aspect*.84),(S/a+p*P)/(p-m),(-S/a-x*P)/(m-x))}this.target.copy(g).addScaledVector(s,-m*a*v),this.cameraGoal.copy(this.target).addScaledVector(n,v),this.battleBandKey=e.key,f&&(this.camera.position.copy(this.cameraGoal),this.look.copy(this.target),this.camera.lookAt(this.look));return}let l=this.phase==="welcome"?this.canvas.closest("#game")?.querySelector(".welcome"):null;if(l){let d=this.canvas.getBoundingClientRect(),g=(this.canvas.closest("#game")?.querySelector("#topbar")?.getBoundingClientRect().bottom||80)-d.top+10,x=l.getBoundingClientRect().top-d.top-14;if(x<=g+40)return;let p=ze(0,2.2,0),m=1-2*x/this.height,v=1-2*g/this.height,y=(m+v)/2,_=15;for(let I of[t.min.x,t.max.x])for(let E of[t.min.y,t.max.y])for(let R of[t.min.z,t.max.z]){let P=ze(I,E,R).sub(p),S=P.dot(n),M=P.dot(s);_=Math.max(_,S+Math.abs(P.dot(i))/(a*this.camera.aspect*.84),(M/a+v*S)/(v-y),(-M/a-m*S)/(y-m))}this.target.copy(p).addScaledVector(s,-y*a*_),this.cameraGoal.copy(this.target).addScaledVector(n,_);return}let c=.84,u=o?.44:.65,h=15;for(let d of[t.min.x,t.max.x])for(let f of[t.min.y,t.max.y])for(let g of[t.min.z,t.max.z]){let x=ze(d,f,g).sub(this.target),p=x.dot(n);h=Math.max(h,p+Math.abs(x.dot(i))/(a*this.camera.aspect*c),p+Math.abs(x.dot(s))/(a*u))}this.cameraGoal.copy(this.target).addScaledVector(n,h)}fitHangar(){let e=this.canvas.closest("#game")?.querySelector(".hangar-panel");if(!e||!this.relay.ready)return;let t=this.canvas.getBoundingClientRect(),n=e.getBoundingClientRect(),i=this.width<=600,s=i?12:24,a=i?this.width-12:Math.min(this.width*.55,n.left-t.left-18),o=i?66:80,l=i?n.top-t.top-12:this.height-30;if(a<=s||l<=o)return;let c=this.relay.visualBounds(),u=c.getCenter(ze()),h=ze(5,2.2,13).normalize(),d=ze().crossVectors(ze(0,1,0),h).normalize(),f=ze().crossVectors(h,d).normalize(),g=Math.tan(ai.degToRad(this.camera.fov/2)),x=2*s/this.width-1,p=2*a/this.width-1,m=1-2*l/this.height,v=1-2*o/this.height,y=(x+p)/2,_=(m+v)/2,I=5;for(let E of[c.min.x,c.max.x])for(let R of[c.min.y,c.max.y])for(let P of[c.min.z,c.max.z]){let S=ze(E,R,P).sub(u),M=S.dot(h),T=S.dot(d)/(g*this.camera.aspect),U=S.dot(f)/g;I=Math.max(I,(T+p*M)/(p-y),(-T-x*M)/(y-x),(U+v*M)/(v-_),(-U-m*M)/(_-m))}I*=1.045,this.target.copy(u).addScaledVector(d,-y*g*this.camera.aspect*I).addScaledVector(f,-_*g*I),this.cameraGoal.copy(this.target).addScaledVector(h,I),this.camera.position.copy(this.cameraGoal),this.look.copy(this.target),this.camera.lookAt(this.target)}turnPreview(e){this.canvas.closest("#game")?.getAttribute("data-view")==="hangar"&&(this.previewYaw=e===null?.12:this.previewYaw+e,this.relay.root.rotation.y=this.previewYaw,this.fitHangar(),this.renderer.render(this.scene,this.camera))}previewHero(e,t=0){let n=this.canvas.closest("#game")?.getAttribute("data-view")==="hangar";if(this.animation||this.previewStep||!n&&this.phase!=="welcome")return;let i=nt(e).id,s=Number.isFinite(t)?Math.max(0,Math.min(5,Math.floor(t))):0;this.rosterPreview={id:i,stage:s},this.relay.heroId!==i&&this.relay.setHero(i),this.prism.root.visible=!n,this.shield.visible=!1,this.relay.setAim(null),this.relay.setCharge(0),this.relay.reduced=this.reduced,this.relay.play("idle",{restart:!0,fade:0}),this.relay.setKit({staff:s>=1,pad:s>=2,tier:1,stage:s}),this.relay.root.position.set(n?0:this.heroHome,0,0),this.relay.root.rotation.set(0,n?this.previewYaw:Math.PI/2,0),this.relay.ready&&(this.relay.update(.001),this.fitHeroes(),this.renderer.render(this.scene,this.camera))}fitForge(){if(this.width/this.height>=.85)return;this.stage.forge.updateWorldMatrix(!0,!0);let e=new kt().setFromObject(this.stage.forge).union(this.relay.visualBounds()),t=e.getCenter(ze()),n=ze(3.3,8.1,21.5).normalize(),i=ze().crossVectors(ze(0,1,0),n).normalize(),s=ze().crossVectors(n,i).normalize(),a=Math.tan(ai.degToRad(this.camera.fov/2)),o=.36,l=.72,c=.54,u=15;for(let h of[e.min.x,e.max.x])for(let d of[e.min.y,e.max.y])for(let f of[e.min.z,e.max.z]){let g=ze(h,d,f).sub(t),x=g.dot(n),p=g.dot(s);u=Math.max(u,x+Math.abs(g.dot(i))/(a*this.camera.aspect*.85),(p/a+l*x)/(l-c),(-p/a-o*x)/(c-o))}this.target.copy(t).addScaledVector(s,-c*a*u),this.cameraGoal.copy(this.target).addScaledVector(n,u)}setCamera(){let e=this.width/this.height<.85;if(this.heroHome=e?-2.25:-3.4,this.rivalHome=-this.heroHome,this.phase==="battle"&&this.relay.ready&&this.prism.ready){let t=[Zt(this.match),tn({...this.match,phase:"battle"})];if(t.some(n=>n>0)){let n=[this.relay,this.prism].map((s,a)=>s.contactLocal(t[a]>0?"special":"strike").z+(s.imageActive?0:t[a]>=5?.5:t[a]>=2?.32:0)),i=Math.max(this.rivalHome,(n[0]+n[1]+.9)/2);this.heroHome=-i,this.rivalHome=i}}this.phase==="training"&&!this.previewStep?(this.target.set(e?-5.3:-4.3,1.9,-1.5),this.cameraGoal.set(e?-2:2,e?7:5.3,e?20:12.5),e&&(this.target.y=-1.1)):(this.target.set(0,e?1.8:2.1,0),this.cameraGoal.set(e?2.5:6.2,e?7:5.8,e?22.2:15.3),this.width/this.height>2&&(this.cameraGoal.set(4.5,5.3,17),this.target.y=2.2),this.phase==="welcome"&&(this.target.set(0,2.2,0),this.cameraGoal.set(e?2:5.5,5.4,e?22:14.5)))}trainingPreview(e){if(this.animation||(e&&(this.rosterPreview=null,this.prism.root.visible=!0,this.relay.heroId!=="relay"&&this.relay.setHero("relay")),e===this.previewStep)||(this.previewStep=e,this.previewTime=0,this.previewMarker.visible=!!e,this.previewLight.intensity=e?8:0,!this.relay.ready||!this.prism.ready))return;if(this.relay.setCharge(0),this.prism.setCharge(0),this.relay.setAim(null),this.prism.setAim(null),!e){this.syncKey="",this.lastIntent="",this.sync(this.match,this.currentTier);return}this.setCamera(),this.neutralRoots(),this.relay.root.position.set(this.heroHome,0,0),this.prism.root.position.set(this.rivalHome,0,0),this.relay.play(e==="relay"?"victory":"idle",{restart:!0}),this.prism.play(e==="charge"?"charge":e==="prism"?"guard":"idle",{restart:!0}),e==="relay"&&this.relay.setFacing(.35),(e==="prism"||e==="opening"||e==="charge")&&this.prism.setFacing(-.35),this.shield.visible=e==="prism",this.shield.position.set(this.prism.root.position.x-.58,2.2,0);let t=e==="relay"?this.relay:this.prism;this.previewMarker.position.copy(t.root.position).y=.035,this.previewLight.position.copy(t.root.position).add(ze(0,3.5,2)),this.fitHeroes()}sync(e,t=1){if(this.match=e,this.currentTier=t,this.phase=e?.phase||"welcome",this.setCamera(),this.relay.reduced=this.reduced,this.prism.reduced=this.reduced,this.rosterPreview&&(this.rosterPreview=null,this.syncKey=""),this.prism.root.visible=!0,this.previewStep)return;this.phase!=="battle"&&(this.battleFitKey="",this.battleBandKey="",this.battleReservation=null);let n=nt(e?.heroId).id,i=`${e?.id}:${n}:${e?.round}:${e?.phase}:${e?.staff}:${e?.pad}:${Zt(e)}:${t}`;if(this.animation)return;if(this.relay.heroId!==n&&(this.relay.setHero(n),this.battleFitKey=""),i!==this.syncKey&&(this.syncKey=i,this.onBeat(""),this.lastIntent="",this.neutralRoots(),this.relay.setKit({staff:!!e?.staff,pad:!!e?.pad,tier:t,stage:Zt(e)}),this.prism.setKit({stage:tn(this.phase==="rival_upgrade"?{...e,phase:"battle"}:e),tier:Math.max(t,e?.round||1)}),this.phase==="training"?(this.relay.root.position.set(-4.1,0,-2),this.relay.root.rotation.y=-.3,this.prism.root.position.set(4.2,0,0),this.prism.root.rotation.y=-.75):(this.relay.root.position.set(this.heroHome,0,0),this.prism.root.position.set(this.rivalHome,0,0),this.relay.root.rotation.y=Math.PI/2,this.prism.root.rotation.y=-Math.PI/2),this.relay.play(this.phase==="victory"?"victory":"idle"),this.prism.play(this.phase==="victory"?"victory":"idle"),this.demoTime=0,this.upgradeReveal=this.phase==="rival_upgrade",this.prism.root.userData.revealApplied=!1,this.upgradeReveal&&(this.prism.play("upgrade",{restart:!0,fade:.12}),this.onBeat("Prism is reinforcing its armour"))),this.shield.visible=this.phase==="rival_upgrade"&&this.demoTime>=.9||this.phase==="battle"&&e?.intent==="guard",this.shield.position.set(this.prism.root.position.x-1.25,2.2,0),this.shield.scale.setScalar(1),this.phase==="battle"&&(this.lastIntent!==e?.intent||this.prism.motion==="upgrade")){let a=e.intent==="strike"||e.intent==="heavy";this.prism.play(e.intent==="heavy"?"charge":e.intent==="guard"?"guard":a?"strike":"idle",{startFraction:e.intent==="strike"?.15:0,hold:e.intent==="strike",restart:!0}),this.lastIntent=e.intent,this.onBeat(e.intent==="guard"?"Prism is shielding":e.intent==="heavy"?"Prism is loading a heavy strike":e.intent==="open"?"Prism is open":"Prism is ready to strike")}let s=Di(e);this.stage.setForgeProgress(this.phase==="training"?e.questionIndex%s/s:e?.staff?1:0),(this.phase==="welcome"||this.phase==="battle")&&this.fitHeroes()}playEvent(e,t){if(!e)return Promise.resolve();this.rosterPreview&&this.sync(this.match,this.currentTier),this.previewStep&&this.trainingPreview(null),this.animation&&this.finishAnimation();let n=e.move||"upgrade",i=e.kind==="move"||!!e.move;return this.animation={event:e,after:t,move:n,duration:2.2,elapsed:0,isMove:i,phase:"approach",phaseTime:0,hit:!1,reply:!1,resolve:null,source:[],destination:[],attackMotion:n},i?(this.relay.root.position.set(this.heroHome,0,0),this.prism.root.position.set(this.rivalHome,0,0),this.relay.root.rotation.y=Math.PI/2,this.prism.root.rotation.y=-Math.PI/2,this.neutralRoots(),this.shield.visible=e.intent==="guard",n==="guard"&&e.intent==="open"?(this.animation.phase="holdGuard",this.relay.play("guard"),this.prism.play("idle",{restart:!0})):n==="break"||n==="special"?this.startRanged(n):n==="guard"&&tn(this.match)>0?this.startRanged("special","rival"):this.setApproach(n==="guard"?"rival":"player",n==="guard"?"strike":n),this.onBeat(n==="guard"?e.intent==="open"?"You hold guard. Prism holds back.":"Brace for the strike":n==="break"||n==="special"?`Charging ${this.relay.root.userData.weapon}`:e.intent==="open"?"Take the opening":"Step in and strike")):(this.animation.duration=this.relay.play("upgrade",{restart:!0}).duration,this.onCue(t?.pad?"upgrade-stage2":"upgrade-assembly"),this.onBeat(`Assembling ${nt(t?.heroId||this.relay.heroId).weapons[Zt(t)].name}`)),new Promise(s=>{this.animation.resolve=s})}finishAnimation(){let e=this.animation;if(e){this.bolt.visible=!1;for(let t of this.salvo)t.visible=!1;this.generatedJet&&(this.generatedJet.visible=!1),this.relay.setAim(null),this.prism.setAim(null),this.relay.setCharge(0),this.prism.setCharge(0),this.animation=null,this.syncKey="",this.lastIntent="",this.onBeat(""),this.disposed||this.sync(e.after,this.currentTier),e.resolve?.()}}stopAnimation(){this.finishAnimation()}startRanged(e,t="player"){let n=this.animation,i=t==="player"?this.relay:this.prism,s=t==="player"?this.prism:this.relay;n.part=t,n.attackMotion=e,n.phase="charge",n.phaseTime=0,n.launched=!1,n.reaction=null,n.chargeDuration=n.event.technique?.id==="counter"&&t==="player"?.2:e==="special"?1.05:.65,n.destination=[this.relay.root.position.clone(),this.prism.root.position.clone()],n.target=s.shieldPoint,i.play("charge",{restart:!0,fade:.08}),i.setAim(n.target),s.play((t==="player"?n.event.intent==="guard":n.move==="guard")?"guard":"idle",{restart:!0}),t==="rival"&&this.onBeat(`Prism is charging ${li[tn(this.match)].name}`),this.onCue("charge")}emitPulse(e){if(this.animation!==e||e.launched)return;e.launched=!0,e.phase="flight",e.phaseTime=0;let t=e.part==="rival"?this.prism:this.relay;e.target=(e.part==="rival"?this.relay:this.prism).shieldPoint,e.origin=t.weaponTip.clone(),e.flightDuration=Math.max(.32,Math.min(.62,e.origin.distanceTo(e.target)/9));let n=Zt(this.match),i=nt(this.relay.heroId),s=e.event.technique?.id==="counter"?"pulse":e.event.technique?.id==="rail"?"laser":n>=3&&(i.id==="relay"||i.id==="zephyr")?"rocket":i.effect;e.effect=e.part==="rival"?li[tn(this.match)].effect:s;for(let[a,o]of this.effects)o.visible=a===e.effect&&!["flame","water","arc"].includes(e.effect);this.bolt.name=`travelling-${e.effect}`,this.bolt.userData.effect=e.effect,this.bolt.position.copy(e.origin),this.bolt.lookAt(e.target),this.bolt.visible=!0,this.bolt.scale.setScalar(e.attackMotion==="special"?1.35:1),e.shotCount=e.part==="player"?Math.max(1,e.event.technique?.shots?.length||1):tn(this.match)===3?3:1,this.bolt.userData.shotCount=e.shotCount;for(let[a,o]of this.salvo.entries()){o.visible=a<e.shotCount-1,o.scale.copy(this.bolt.scale),o.position.copy(e.origin),o.lookAt(e.target);for(let l of o.children)l.visible=l.name===e.effect}this.updateEffect(e,0),t.firePulse(),this.onCue(e.effect==="pulse"?"launch":`weapon-${e.effect}`),t.setCharge(0)}addEffects(){for(let[a,o]of[["laser",16772759],["arc",7929785],["gravity",13673215],["burst",7790335],["frost",13105919]]){let l=new st;l.name=`effect-${a}`,l.visible=!1,this.effects.set(a,l),this.bolt.add(l);let c=new dt({color:o}),u=(h,d=0,f=0,g=0)=>{let x=new Re(h,c);return x.position.set(d,f,g),l.add(x),x};if(a==="laser")u(new _n(.075,.075,1,12)).rotation.x=Math.PI/2,u(new Ln(.16,12,8));else if(a==="arc"){let h=Array.from({length:13},(f,g)=>ze(g===0||g===12?0:(g%2?1:-1)*(.14+g%3*.07),g===0||g===12?0:Math.sin(g*2.4)*.15,g/12)),d=new Ti(new gt().setFromPoints(h),new Ei({color:o}));l.add(d);for(let f=0;f<3;f++){let g=d.clone();g.rotation.z=f*Math.PI*2/3,l.add(g)}u(new is(.2))}else if(a==="gravity"){u(new Ln(.48,20,12));let h=u(new Ln(.32,16,12));h.material=new dt({color:3747670}),h.position.z=.25;for(let d of[-.7,.7])u(new er(.62,.045,8,32)).rotation.x=d}else if(a==="burst")for(let h=0;h<3;h++){let d=h*Math.PI*2/3;u(new Ln(.1,10,6),Math.cos(d)*.23,Math.sin(d)*.23).scale.z=3.2}else{u(new Bs(.19,.56,4,8)).rotation.x=Math.PI/2;for(let h=0;h<9;h++){let d=h*2.4;u(new is(.07+h%2*.035),Math.cos(d)*.3,Math.sin(d)*.3,-.15-h%3*.2)}}}let e=document.createElement("canvas");e.width=64,e.height=64;let t=e.getContext("2d"),n=t.createRadialGradient(32,32,1,32,32,30);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,.85)"),n.addColorStop(.65,"rgba(255,255,255,.22)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64),this.effectTexture=new ts(e);let i=new Ln(.2,12,8),s=new er(.35,.035,6,24);for(let[a,o]of Object.entries({flame:16746300,water:6415103,seismic:14938010,plasma:16747487,sonic:11272148,rocket:16762251})){let l=new st;l.name=`effect-${a}`,l.visible=!1,this.bolt.add(l),this.effects.set(a,l);let c=new dt({color:o,transparent:!0,opacity:.85,depthWrite:!1}),u=new Ds({map:this.effectTexture,color:o,transparent:!0,opacity:.72,depthWrite:!1,blending:Cs});if(a==="flame"){for(let d=0;d<16;d++){let f=new Qr(u);f.userData.index=d,l.add(f)}let h=new Re(i,c);h.scale.set(.3,.3,.5),l.add(h)}else if(a==="water")for(let h=0;h<12;h++){let d=new Re(i,c);d.scale.setScalar(.3+h%3*.12),l.add(d)}else if(a==="sonic"||a==="seismic"){for(let h=0;h<5;h++){let d=new Re(s,c);d.position.z=-h*.22,d.scale.setScalar(1+h*.32),a==="seismic"&&(d.rotation.z=h*.3),l.add(d)}a==="seismic"&&l.add(new Re(new is(.3),c))}else if(a==="plasma"){let h=new Re(i,c);h.scale.setScalar(1.5),l.add(h);for(let f of[-.7,.7]){let g=new Re(s,c);g.scale.setScalar(1.5),g.rotation.x=f,l.add(g)}let d=new Qr(u);d.scale.set(1.4,1.4,1),l.add(d)}else{let h=new Re(new Bs(.13,.48,4,10),c);h.rotation.x=Math.PI/2,l.add(h);for(let d=0;d<4;d++){let f=new Re(new In(.08,.26,.22),c);f.rotation.z=d*Math.PI/2,f.position.set(Math.sin(d*Math.PI/2)*.17,Math.cos(d*Math.PI/2)*.17,-.19),l.add(f)}for(let d=0;d<7;d++){let f=new Qr(u);f.position.z=-.4-d*.15,f.scale.setScalar(.4-d*.035),l.add(f)}}}}addShieldImpact(){this.impactShell.name="shield-contact-wave",this.impactShell.visible=!1,this.scene.add(this.impactShell);let e=new dt({color:10155759,transparent:!0,opacity:0,side:Nt,depthWrite:!1});this.impactShell.add(new Re(new ns(.65,6),e)),this.impactShell.add(new Re(new _o(.72,1),new dt({color:11927551,wireframe:!0,transparent:!0,opacity:.2,depthWrite:!1})));for(let t=0;t<3;t++){let n=new Re(new er(.45+t*.23,.025,6,32),e);n.position.z=.02*t,this.impactShell.add(n)}}async loadGeneratedEffects(){let e=new URLSearchParams(location.search).has("prepareArt")?"combat-effects.png":"packed/combat-effects.webp",t=await new Pi().loadAsync(new URL(`./assets/heroes/generated/${e}`,new URL(".",document.baseURI)).href);if(this.disposed){t.dispose();return}t.colorSpace=wt,t.minFilter=Yt,t.generateMipmaps=!1,this.generatedEffectTexture=t;let n=()=>new rn({transparent:!0,depthWrite:!1,side:Nt,blending:Cs,toneMapped:!1,uniforms:{atlas:{value:t},cell:{value:new J(1,1)},opacity:{value:.8}},vertexShader:"varying vec2 artUv; void main(){artUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`uniform sampler2D atlas; uniform vec2 cell; uniform float opacity; varying vec2 artUv; void main(){vec4 art=texture2D(atlas,(cell+artUv)/vec2(3.,2.));vec2 edge=smoothstep(vec2(0.),vec2(.09),artUv)*(1.-smoothstep(vec2(.91),vec2(1.),artUv));gl_FragColor=vec4(art.rgb,art.a*edge.x*edge.y*opacity);
#include <colorspace_fragment>
}`});this.generatedJet=new Re(new un(1,1),n()),this.generatedJet.name="generated-muzzle-jet",this.generatedJet.visible=!1,this.generatedJet.renderOrder=7,this.generatedImpact=new Re(new un(1,1),n()),this.generatedImpact.name="generated-shield-impact",this.generatedImpact.visible=!1,this.generatedImpact.renderOrder=8,this.scene.add(this.generatedJet,this.generatedImpact)}updateImpact(e){this.impactAge+=e;let t=this.impactAge/.7;this.impactShell.visible=t<1,this.generatedImpact&&(this.generatedImpact.visible=t<1,this.generatedImpact.quaternion.copy(this.camera.quaternion),this.generatedImpact.scale.setScalar(this.reduced?.8:.65+rh(t)*.95),this.generatedImpact.material.uniforms.opacity.value=(1-Math.min(1,t))*(this.reduced?.4:.7)),!(t>=1)&&(this.impactShell.scale.setScalar(this.reduced?1:.65+rh(t)*1.25),this.impactShell.children[0].material.opacity=(1-t)*.48,this.impactShell.children[1].material.opacity=(1-t)*.3)}updateEffect(e,t){if(this.generatedJet&&(this.generatedJet.visible=["flame","water","arc"].includes(e.effect),this.generatedJet.visible)){let s=e.target.clone().sub(e.origin).normalize(),a=e.origin.clone().lerp(this.bolt.position,.5),o=this.camera.position.clone().sub(a);o.addScaledVector(s,-o.dot(s)).normalize();let l=ze().crossVectors(o,s).normalize();this.generatedJet.position.copy(a),this.generatedJet.quaternion.setFromRotationMatrix(new Ce().makeBasis(s,l,o));let c=Math.max(.025,e.origin.distanceTo(this.bolt.position));this.generatedJet.scale.set(c,this.reduced?.55:.65+c*.15,1);let u=this.generatedJet.material.uniforms;u.cell.value.set(e.effect==="water"?0:1,e.effect==="flame"?1:0),u.opacity.value=this.reduced?.5:.9}let n=this.effects.get(e.effect);if(!n)return;let i=e.origin.distanceTo(e.target)*t/this.bolt.scale.z;if(e.effect==="laser")n.children[0].scale.y=Math.max(.001,i),n.children[0].position.z=-i/2;else if(e.effect==="arc"){for(let s of n.children)s.isLine&&(s.scale.z=Math.max(.001,i),s.position.z=-i);n.rotation.z=this.reduced?0:Math.sin(t*18)*.12}else if(e.effect==="burst")for(let s=0;s<3;s++){let a=s*Math.PI*2/3;n.children[s].position.set(Math.cos(a)*.23*(1-t),Math.sin(a)*.23*(1-t),0)}else if(e.effect==="gravity")n.rotation.z=this.reduced?0:t*2;else if(e.effect==="frost")for(let s=1;s<n.children.length;s++){let a=n.children[s],o=(s-1)*2.4;a.position.x=Math.cos(o)*(.15+t*.2),a.position.y=Math.sin(o)*(.15+t*.2),a.visible=!this.reduced||s<4}else if(e.effect==="flame")for(let s=0;s<16;s++){let a=n.children[s],o=s/15,l=.05+o*.22;a.position.set(Math.sin(s*2.4+t*3)*l,Math.cos(s*1.7+t*3)*l,-i*o),a.scale.setScalar((.22+o*.52)*(1-.25*t)),a.visible=!this.reduced||s%3===0}else if(e.effect==="water")for(let s=0;s<12;s++){let a=s/12;n.children[s].position.set(Math.sin(s*2.4)*.1,Math.cos(s*2.4)*.1-a*a*t*.18,-i*a),n.children[s].scale.z=1+i*.35,n.children[s].visible=!this.reduced||s<5}else if(e.effect==="sonic"||e.effect==="seismic")for(let s=0;s<5;s++)n.children[s].position.z=-Math.min(i,1.7)*s/5,n.children[s].scale.setScalar(.65+s*.25+t*.55);else e.effect==="plasma"&&(n.rotation.z=this.reduced?0:t*2.2)}burst(e,t=16765058,n=50){this.particles.material.color.setHex(t),this.hitLight.color.setHex(t),this.hitLight.position.copy(e),this.hitLight.intensity=this.reduced?0:11,this.shake=this.reduced?0:.07;let i=this.reduced?9:n;for(let s=0;s<i;s++)this.particleData.push({p:e.clone(),v:ze(Math.sin(s*2.399)*(2+s%4),.5+s%5,Math.cos(s*2.399)*(2+s%3)),life:0,max:.45+s%5*.09,spin:s*1.17});this.particleData=this.particleData.slice(-110)}setApproach(e,t){let n=this.animation,i=e==="player"?this.relay:this.prism;this.neutralRoots();let s=i.contactLocal(t),a=s.z+.58;n.part=e,n.attackMotion=t,n.phase="approach",n.phaseTime=0,n.source=[this.relay.root.position.clone(),this.prism.root.position.clone()],n.destination=[ze(-a/2,0,e==="player"?s.x:0),ze(a/2,0,e==="rival"?-s.x:0)];let o=Math.max(n.source[0].distanceTo(n.destination[0]),n.source[1].distanceTo(n.destination[1]));n.travelDuration=this.reduced?.32:Math.max(.18,Math.min(.52,o*.14+.16)),n.anticipation=this.reduced?0:n.hit?.035:t==="strike"?.09:.14,n.travelStarted=!1,n.planted=[!1,!1],n.reaction=null,i.play(t,{startFraction:t==="strike"?.12:.16,hold:!0,restart:!0,fade:.08}),(e==="player"?this.prism:this.relay).play((e==="player"?n.event.intent==="guard":n.move==="guard")?"guard":"idle",{fade:.08})}neutralRoots(){this.relay.root.rotation.set(0,Math.PI/2,0),this.prism.root.rotation.set(0,-Math.PI/2,0),this.relay.root.position.y=0,this.prism.root.position.y=0}startWindup(){let e=this.animation;e.phase="windup",e.phaseTime=0;let t=e.part==="player"?this.relay:this.prism,n=e.part==="player"?this.prism:this.relay,i=e.part==="player"?e.event.intent==="guard":e.move==="guard";e.startFraction=e.attackMotion==="break"?.2:e.attackMotion==="special"?.18:e.part==="rival"&&e.event.intent==="heavy"?.3:.15,t.play(e.attackMotion,{startFraction:e.startFraction,hold:!0,restart:!0,fade:.1}),n.play(i?"guard":"idle",{restart:!0,fade:.1}),e.part==="rival"&&this.onBeat(e.event.intent==="heavy"?"Prism commits to a heavy strike":e.move==="guard"?"Keep your guard up":"Prism strikes back")}startStrike(){let e=this.animation;e.phase="strike",e.phaseTime=0,this.neutralRoots(),this.relay.root.position.copy(e.destination[0]),this.prism.root.position.copy(e.destination[1]);let t=e.part==="player"?this.relay:this.prism,n=dn[e.attackMotion].duration*(e.part==="rival"&&e.event.intent==="heavy"?1.08:e.attackMotion==="strike"?.82:.9),i=t.play(e.attackMotion,{duration:n,startFraction:e.startFraction,restart:!0,fade:0,onImpact:()=>this.makeContact(e,e.part)});e.strikeDuration=i.duration,e.contactTime=i.impactTime,this.onCue(e.attackMotion==="special"?"charge":"strike")}makeContact(e,t,n){if(this.animation!==e||(t==="player"?e.hit:e.reply))return;t==="player"?e.hit=!0:e.reply=!0;let i=t==="player"?this.relay:this.prism,s=t==="player"?this.prism:this.relay,a=t==="player"?e.event.intent==="guard"&&!e.event.guardBroken:e.move==="guard",o=n||i.contactPoint,l={laser:16772759,arc:7929785,gravity:13673215,burst:7790335,frost:13105919,flame:16752980,water:6415103,seismic:14938010,plasma:16747487,sonic:11272148,rocket:16762251}[e.effect];this.burst(o,a?9365990:l||16765058,e.attackMotion==="special"?70:40),this.impactAge=0,this.impactShell.position.copy(o),this.impactShell.lookAt(i.root.position.clone().add(ze(0,2.35,0))),this.generatedImpact&&(this.generatedImpact.position.copy(o),this.generatedImpact.material.uniforms.cell.value.set(2,e.effect==="flame"||e.effect==="rocket"?1:0)),this.impactShell.children[0].material.color.setHex(a?9365990:l||16765058),this.updateImpact(0),s.play(a?"guard":"hit",{restart:!0,fade:.035}),this.onCue(a?"guard":e.attackMotion==="break"||e.attackMotion==="special"?"break":"impact"),e.contactAt=e.phaseTime,e.reaction={part:t==="player"?"rival":"player",origin:s.root.position.clone(),blocked:a},t==="player"&&e.event.guardBroken?(this.shield.visible=!1,this.onBeat("Shield broken")):a?this.onBeat(t==="player"?"Prism absorbs the strike":e.event.rivalDamage>0?"Your guard softens the hit":"Your guard holds"):this.onBeat(t==="player"?`${this.match?.heroName||nt(this.relay.heroId).name}'s strike lands`:e.event.intent==="heavy"?"Prism lands the heavy strike":"Prism strikes back"),this.onImpact(e.event,t)}retreat(){let e=this.animation;e.phase="retreat",e.phaseTime=0,e.source=[this.relay.root.position.clone(),this.prism.root.position.clone()],e.destination=[ze(this.heroHome,0,0),ze(this.rivalHome,0,0)],e.travelDuration=this.reduced?.32:e.move==="special"?.5:.42,e.planted=[!1,!1],e.reaction=null,this.neutralRoots(),this.relay.play("walk",{duration:.85,startFraction:.48,restart:!0,fade:.08}),this.prism.play("walk",{duration:.95,startFraction:.08,restart:!0,fade:.1}),this.onCue("servo")}animateAction(e){let t=this.animation;if(!t){if(this.previewStep){if(this.previewTime+=e,this.previewStep==="charge"){let n=this.previewTime%2.3;!this.reduced&&n<e&&this.prism.play("charge",{restart:!0,fade:.15}),this.prism.setCharge(this.reduced?1:Math.min(1,n/1.7))}return}this.phase==="battle"&&(this.neutralRoots(),this.prism.setCharge(this.match?.intent==="heavy"?this.reduced?1:.65+.35*(.5+.5*Math.sin(this.elapsed*2)):0),this.reduced||(this.relay.root.rotation.z=Math.sin(this.elapsed*1.7)*.008,this.prism.root.rotation.z=this.match?.intent==="heavy"?-.035:this.match?.intent==="guard"?.018:this.match?.intent==="open"?-.014:0)),this.upgradeReveal&&this.phase==="rival_upgrade"&&(this.demoTime+=e,this.demoTime>=.9&&!this.prism.root.userData.revealApplied&&(this.prism.root.userData.revealApplied=!0,this.prism.setKit({stage:tn(this.match),tier:Math.max(this.currentTier,(this.match?.round||1)+1)}),this.burst(this.prism.root.position.clone().add(ze(0,2.6,0)),10348003,65),this.shield.visible=!0,this.onBeat(`Prism equipped ${li[tn(this.match)].name}`)),this.demoTime>=dn.upgrade.duration&&(this.prism.play("guard"),this.upgradeReveal=!1));return}if(t.elapsed+=e,t.phaseTime+=e,!t.isMove){!t.hit&&t.elapsed>=t.duration*.43&&(t.hit=!0,this.burst(this.relay.root.position.clone().add(ze(0,2.5,0)),15716506,70),this.relay.setKit({staff:!!t.after?.staff,pad:!!t.after?.pad,tier:this.currentTier,stage:Zt(t.after)})),t.hit&&!t.revealed&&t.elapsed>=t.duration*.43+.65&&(t.revealed=!0,this.onBeat(`${nt(this.relay.heroId).weapons[Zt(t.after)].name} ready`)),t.elapsed>=t.duration&&this.finishAnimation();return}if(this.shield.position.set(this.prism.root.position.x-.58,2.2,this.prism.root.position.z),t.phase==="charge"){let n=t.part==="rival"?this.prism:this.relay;n.setCharge(Math.min(1,t.phaseTime/t.chargeDuration)),t.phaseTime>=t.chargeDuration&&(t.phase="emit",t.phaseTime=0,n.play(t.attackMotion,{restart:!0,fade:0,onImpact:()=>this.emitPulse(t)}))}else if(t.phase==="flight"){let n=Math.min(1,t.phaseTime/t.flightDuration);this.bolt.position.lerpVectors(t.origin,t.target,n);for(let[i,s]of this.salvo.entries())if(s.visible){s.position.lerpVectors(t.origin,t.target,n);let a=Math.sin(n*Math.PI)*(i===0?.48:-.48);s.position.y+=a,s.position.z+=Math.sin(n*Math.PI)*.25,s.lookAt(t.target)}if(this.updateEffect(t,n),n===1){this.bolt.position.copy(t.target),this.makeContact(t,t.part,this.bolt.position.clone()),this.bolt.visible=!1,t.phase="strike",t.phaseTime=0,t.contactAt=0,t.strikeDuration=.38;for(let i of this.salvo)i.visible=!1;this.generatedJet&&(this.generatedJet.visible=!1)}}else if(t.phase==="holdGuard")t.phaseTime>=.7&&this.finishAnimation();else if(t.phase==="approach"||t.phase==="retreat"){let n=t.phase==="approach",i=n?t.anticipation:0;if(t.phaseTime<i){let a=this.reduced?0:Math.sin(t.phaseTime/i*Math.PI),o=t.part==="player"?this.relay:this.prism;o.root.rotation.z=(t.part==="player"?1:-1)*.025*a;return}n&&!t.travelStarted&&(t.travelStarted=!0,this.neutralRoots(),this.onCue("servo"),this.relay.play("walk",{duration:.78,startFraction:t.part==="player"?.05:.4,restart:!0,fade:.07}),this.prism.play("walk",{duration:.88,startFraction:t.part==="rival"?.05:.4,restart:!0,fade:.07}));let s=Math.min(1,(t.phaseTime-i)/t.travelDuration);for(let[a,o]of[this.relay,this.prism].entries()){let l=n?t.part==="player"?a===0:a===1:t.part==="player"?a===1:a===0,c=this.reduced?s:Math.max(0,Math.min(1,(s-(l?0:.09))/(l?.88:.91))),u=n?rh(c):1-Math.pow(1-c,3);if(o.root.position.lerpVectors(t.source[a],t.destination[a],u),o.root.rotation.z=this.reduced?0:(a===0?-1:1)*(n?1:-1)*Math.sin(c*Math.PI)*.024,c>=1&&!t.planted[a]){t.planted[a]=!0;let h=a===0?t.move==="guard":t.event.intent==="guard"&&!t.event.guardBroken;o.play(h?"guard":"idle",{fade:.09})}}s>=1&&(this.neutralRoots(),n?this.startWindup():this.finishAnimation())}else if(t.phase==="windup"){let n=this.reduced?.09:t.part==="rival"&&t.event.intent==="heavy"?.32:t.attackMotion==="strike"?.1:.23;if(this.neutralRoots(),!this.reduced){let i=Math.sin(Math.min(1,t.phaseTime/n)*Math.PI),s=t.part==="player"?this.relay:this.prism;s.root.rotation.z=(t.part==="player"?1:-1)*i*.025}t.phaseTime>=n&&this.startStrike()}else if(t.phase==="strike"){if(t.reaction){let n=t.reaction,i=n.part==="player"?this.relay:this.prism,s=Math.min(1,(t.phaseTime-t.contactAt)/.32),a=this.reduced?0:Math.sin(s*Math.PI)*(1-s);i.root.position.copy(n.origin),i.root.position.x+=(n.part==="player"?-1:1)*a*(n.blocked?.09:.2),i.root.rotation.z=(n.part==="player"?1:-1)*a*(n.blocked?.018:.045)}(t.part==="player"?t.hit:t.reply)&&t.phaseTime>=Math.max(t.strikeDuration,t.contactAt+.28)&&(t.part==="rival"&&t.event.technique?.id==="counter"&&!t.hit?(this.startRanged("break","player"),this.onBeat("Shield counter: return pulse")):t.part==="player"&&t.event.rivalDamage>0&&!t.reply?tn(this.match)>0?this.startRanged("special","rival"):this.setApproach("rival","strike"):this.retreat())}}tick(e){if(this.disposed)return;let t=Math.min(.045,Math.max(0,(e-(this.lastTime||e))/1e3));if(this.lastTime=e,!this.paused&&!document.hidden&&this.assetsReady){this.relay.reduced=this.reduced,this.prism.reduced=this.reduced,this.elapsed+=t,this.clock+=t,this.animateAction(t),this.relay.update(t,this.elapsed),this.prism.update(t,this.elapsed),this.stage.update(t,this.elapsed),this.updateImpact(t),this.animation?.isMove&&this.shield.position.set(this.prism.root.position.x-.58,2.2,this.prism.root.position.z);let n=this.battleBand();(this.rosterPreview||this.frame%6===0||n&&n.key!==this.battleBandKey)&&this.fitHeroes(n),this.particleData=this.particleData.filter(s=>s.life<s.max);for(let s=0;s<110;s++){let a=this.particleData[s];a?(a.life+=t,a.v.y-=t*9,a.p.addScaledVector(a.v,t),this.particleDummy.position.copy(a.p),this.particleDummy.rotation.set(a.spin+a.life*7,a.life*9,a.spin),this.particleDummy.scale.setScalar(Math.max(0,1-a.life/a.max)*1.1)):this.particleDummy.scale.setScalar(0),this.particleDummy.updateMatrix(),this.particles.setMatrixAt(s,this.particleDummy.matrix)}this.particles.instanceMatrix.needsUpdate=!0,this.hitLight.intensity*=Math.exp(-t*12),this.shake*=Math.exp(-t*15);let i=this.reduced?1:1-Math.exp(-t*5);this.camera.position.lerp(this.cameraGoal,i),this.look.lerp(this.target,i),this.camera.lookAt(this.look.clone().add(ze(Math.sin(this.clock*80)*this.shake,Math.cos(this.clock*95)*this.shake,0))),this.relay.setCamera(this.camera),this.prism.setCamera(this.camera),this.prism.imageActive&&(this.shield.visible=!1),this.renderer.render(this.scene,this.camera),this.frame++}this.raf=requestAnimationFrame(n=>this.tick(n))}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),this.stopAnimation(),this.resizeObserver.disconnect(),this.stage.dispose(),this.relay.dispose?.(),this.prism.dispose?.(),this.environment.dispose(),this.canvas.removeEventListener("webglcontextlost",this.contextLost),this.canvas.removeEventListener("webglcontextrestored",this.contextRestored),this.canvas.removeEventListener("pointerdown",this.orbitStart),this.canvas.removeEventListener("pointermove",this.orbitMove),this.canvas.removeEventListener("pointerup",this.orbitEnd),this.canvas.removeEventListener("pointercancel",this.orbitEnd);let e=new Set,t=new Set;this.scene.traverse(n=>{let i=n;if(i.geometry&&e.add(i.geometry),i.material)for(let s of Array.isArray(i.material)?i.material:[i.material])t.add(s);n.shadow&&n.shadow.dispose()});for(let n of e)n.dispose();for(let n of t)n.dispose();this.effectTexture.dispose(),this.generatedEffectTexture?.dispose(),this.particleData=[],this.effects.clear(),this.scene.clear(),this.renderer.renderLists.dispose(),this.renderer.dispose()}};var fn=r=>440*2**((r-69)/12),N_={battle:[[40,3],[36,4],[43,4],[38,4],[45,3],[40,3],[36,4],[47,4],[40,3],[43,4],[38,4],[45,3],[36,4],[45,3],[47,5],[47,4]],forge:[[48,4],[53,4],[45,3],[55,4],[48,4],[52,3],[53,4],[55,5],[48,4],[45,3],[53,4],[52,3],[50,3],[55,4],[48,4],[48,4]],victory:[[40,4],[45,4],[47,4],[40,4],[49,3],[45,4],[47,5],[47,4],[40,4],[44,3],[45,4],[40,4],[45,4],[47,4],[40,4],[40,4]]},ep={relay:{warmth:1,shimmer:.16,pluck:1,spread:.5},helio:{warmth:.92,shimmer:.42,pluck:.9,spread:.55},volt:{warmth:.96,shimmer:.23,pluck:1.22,spread:.48},bastion:{warmth:.72,shimmer:.08,pluck:.82,spread:.38},zephyr:{warmth:1.12,shimmer:.22,pluck:1.08,spread:.68},glacier:{warmth:.85,shimmer:.36,pluck:.84,spread:.72},ember:{warmth:1.08,shimmer:.18,pluck:.96,spread:.46},tidal:{warmth:.9,shimmer:.3,pluck:.86,spread:.7},atlas:{warmth:.76,shimmer:.1,pluck:.92,spread:.4},nova:{warmth:.95,shimmer:.38,pluck:1.12,spread:.6},echo:{warmth:1,shimmer:.26,pluck:1.04,spread:.74},prism:{warmth:.98,shimmer:.4,pluck:1.06,spread:.62}},tp={flame:"weapon-flame",fire:"weapon-flame","weapon-fire":"weapon-flame",water:"weapon-water",seismic:"weapon-seismic",plasma:"weapon-plasma",sonic:"weapon-sonic",rocket:"weapon-rocket",arc:"weapon-arc",solar:"weapon-solar"},Ho=class{context=null;master=null;limiter=null;output=null;impulse=null;musicImpulse=null;spaces=new Map;noiseBuffer=null;voices=new Set;enabled=!1;musicEnabled=!0;effectsEnabled=!0;hero="relay";unlocked=!1;volume=.55;disposed=!1;timer=null;mode=null;requestedMode=null;nextBeat=0;beat=0;generation=0;schedulingMusic=!1;intensity=.35;tension=.35;foot=1;variants=new Map;lastEvent=new Map;visibility=()=>{document.hidden&&(this.stop(),this.context?.suspend().catch(()=>{}))};pageHide=()=>{this.stop(),this.context?.suspend().catch(()=>{})};constructor(){document.addEventListener("visibilitychange",this.visibility),window.addEventListener("pagehide",this.pageHide)}async unlock(){if(!(this.disposed||document.hidden)&&!(navigator.userActivation&&!navigator.userActivation.isActive)){if(!this.context){let e=window.AudioContext||window.webkitAudioContext;if(!e)return;try{this.context=new e,this.master=this.context.createGain(),this.master.gain.value=0,this.ensureGraph(),this.noiseBuffer=this.context.createBuffer(1,this.context.sampleRate*2,this.context.sampleRate);let t=this.noiseBuffer.getChannelData(0);for(let n=0;n<t.length;n++)t[n]=Math.random()*2-1;this.context.onstatechange=()=>{this.context?.state!=="running"&&this.stop()}}catch{this.dispose();return}}try{let e=this.generation;if(await this.context.resume(),this.disposed||document.hidden||e!==this.generation)return;this.unlocked=this.context.state==="running",this.applyVolume()}catch{this.unlocked=!1}}}setEnabled(e){this.enabled=!!e,this.enabled||this.stop(),this.applyVolume()}setMusicEnabled(e){let t=!!e;this.musicEnabled!==t&&(this.musicEnabled=t,t?this.requestedMode&&this.startMusic(this.requestedMode):this.stopMusic())}setEffectsEnabled(e){let t=!!e;this.effectsEnabled!==t&&(this.effectsEnabled=t,t||(this.stopVoices(!1),this.clearSpace(!1),this.lastEvent.clear()))}setHero(e){this.hero=Object.prototype.hasOwnProperty.call(ep,e)?e:"relay"}setVolume(e){Number.isFinite(e)&&(this.volume=Math.max(0,Math.min(1,e)),this.volume===0&&this.stop(),this.applyVolume())}setIntensity(e){Number.isFinite(e)&&(this.intensity=Math.max(0,Math.min(1,e)))}play(e){if(!this.ready()||!this.effectsEnabled)return;Object.prototype.hasOwnProperty.call(tp,e)&&(e=tp[e]);let t=this.context.currentTime;if(t-(this.lastEvent.get(e)??-1/0)<(e==="step"?.09:.045))return;this.lastEvent.set(e,t);let n=(this.variants.get(e)??0)+1;this.variants.set(e,n);let i=1+Math.sin(n*2.39996)*.045,s=Math.sin(n*2.39996)*.42;switch(["launch","strike","impact","break","special","round","victory","weapon-laser","weapon-arc","weapon-gravity","weapon-burst","weapon-frost","weapon-flame","weapon-water","weapon-seismic","weapon-plasma","weapon-sonic","weapon-rocket","weapon-solar","upgrade-assembly","upgrade-stage2"].includes(e)&&this.duck(t),e){case"select":this.tone(t,.065,740*i,630,.032,"sine",.003,s,.04),this.noise(t,.032,.038,3200,1700,"bandpass",.002,-s,.03),this.tone(t+.024,.09,1110*i,1080,.014,"sine",.003,-s,.1);break;case"round":[0,7,12].forEach((a,o)=>{this.tone(t+o*.14,.65,fn(52+a),fn(52+a),.075,"triangle",.035,(o-1)*.4,.3),this.metal(t+o*.14,.48,fn(64+a),.028,(1-o)*.3)}),this.tone(t,.34,116,46,.19,"sine"),this.noise(t,.32,.1,450,2100,"bandpass",.07,-.25,.25,.25);break;case"servo":this.tone(t,.24,155*i,340,.055,"sawtooth",.025,-.3,.08,.3),this.tone(t+.045,.21,420,170,.025,"triangle",.02,.25,.12,-.2),this.noise(t,.22,.055,1700,650,"bandpass",.025,s,.12),this.metal(t+.2,.09,530*i,.022,.2);break;case"strike":this.noise(t,.115,.22,850,3600,"bandpass",.012,-.65,.1,.45),this.tone(t,.16,240*i,470,.025,"sawtooth",.025,-.4,.08,.4),this.tone(t+.03,.16,580*i,320,.014,"sine",.025,.35,.12,-.2),this.noise(t+.065,.16,.065,2400,700,"bandpass",.025,.4,.18,-.15);break;case"launch":this.tone(t,.24,280*i,65,.13,"triangle",.007,-.4,.12,.35),this.noise(t,.18,.19,2200,450,"bandpass",.004,-.5,.12,.55),this.tone(t+.02,.3,720,260,.035,"sine",.015,-.35,.2,.45),this.metal(t+.035,.15,410,.025,-.35);break;case"weapon-flame":this.noise(t,.23,.075,620,1400,"bandpass",.025,-.3,.08,.25),this.tone(t,.24,260*i,390,.045,"triangle",.025,-.2,.1,.2),this.tone(t+.025,.19,520*i,585,.016,"sine",.02,.25,.1);break;case"weapon-water":this.noise(t,.22,.05,1700,650,"bandpass",.025,-.35,.1,.35),[0,.035,.07].forEach((a,o)=>this.tone(t+a,.17-o*.025,(560+o*140)*i,340+o*100,.035/(1+o*.4),"sine",.014,(o-1)*.3,.12));break;case"weapon-seismic":this.tone(t,.25,220*i,275,.065,"sine",.025,-.18,.08,.18),this.tone(t+.035,.2,330*i,412.5,.028,"triangle",.024,.2,.1),this.noise(t,.18,.05,450,850,"bandpass",.022,-.2,.06,.2);break;case"weapon-plasma":this.tone(t,.21,880*i,440,.05,"sine",.012,-.3,.1,.25),this.tone(t+.015,.22,1320*i,660,.024,"triangle",.018,.3,.1,-.2),this.noise(t,.12,.035,2400,1200,"bandpass",.015,s,.06);break;case"weapon-sonic":[0,.04,.08].forEach((a,o)=>{let l=440*i;this.tone(t+a,.18,l,l*1.125,.046/(1+o*.65),"sine",.018,(o-1)*.35,.09),this.tone(t+a,.14,l*1.5,l*1.6875,.012/(1+o),"sine",.02,(1-o)*.25,.1)});break;case"weapon-rocket":this.noise(t,.25,.085,700,1900,"bandpass",.018,-.35,.06,.4),this.tone(t,.24,240*i,480,.052,"triangle",.018,-.3,.08,.35),this.tone(t+.035,.21,600*i,900,.018,"sine",.025,-.2,.1,.4);break;case"weapon-solar":[1,1.5,2].forEach((a,o)=>this.tone(t+o*.02,.23-o*.025,392*a*i,440*a,.045/(1+o*.8),"sine",.025,(o-1)*.3,.12)),this.noise(t,.17,.028,1200,2200,"bandpass",.03,-.2,.07,.2);break;case"weapon-laser":this.tone(t,.19,1550*i,580,.065,"sine",.008,-.35,.08,.45),this.tone(t+.012,.16,2325*i,870,.02,"triangle",.009,.3,.1,-.1),this.noise(t,.085,.055,4800,2100,"bandpass",.006,-.2,.05,.3);break;case"weapon-arc":[0,.028,.063].forEach((a,o)=>{this.noise(t+a,.052,.065/(1+o*.3),3600+o*450,1700,"bandpass",.003,(o-1)*.42,.07),this.tone(t+a,.075,(820+o*310)*i,510+o*160,.028,"triangle",.005,(1-o)*.3,.09)});break;case"weapon-gravity":this.tone(t,.26,220*i,340,.07,"sine",.035,-.25,.1,.25),this.tone(t,.23,331*i,510,.025,"triangle",.03,.3,.12,-.3),this.noise(t,.21,.09,650,1600,"bandpass",.025,-.45,.08,.4);break;case"weapon-burst":[0,.043,.086].forEach((a,o)=>{this.tone(t+a,.07,(620+o*75)*i,310+o*35,.045,"triangle",.004,-.25+o*.25,.05),this.noise(t+a,.055,.075,2800,1100,"bandpass",.004,-.4+o*.4,.05)});break;case"weapon-frost":this.noise(t,.22,.085,3800,6800,"highpass",.018,-.45,.13,.4),[1,1.5,2].forEach((a,o)=>this.tone(t+o*.012,.2-o*.025,1250*a*i,1500*a,.024/(1+o),"sine",.012,(o-1)*.45,.15));break;case"impact":this.tone(t,.34,102*i,34,.29,"sine"),this.tone(t,.16,195*i,48,.13,"triangle",.003,.12,.08),this.noise(t,.095,.3,2200,380,"lowpass"),this.noise(t,.045,.15,3600,850,"lowpass",.002,.3,.13),this.metal(t+.008,.28,280*i,.07,s),this.noise(t+.065,.22,.07,1900,500,"bandpass",.012,-s,.32);break;case"guard":[1,1.5,2,3].forEach((a,o)=>this.tone(t+o*.009,.6-o*.09,392*a*i,392*a*i,.068/(1+o),"sine",.005,(o%2?1:-1)*.55,.38)),this.noise(t,.075,.11,4600,2200,"highpass",.002,s,.25),this.tone(t,.24,125,110,.11,"sine",.007),this.noise(t+.07,.32,.038,1800,3100,"bandpass",.08,-.5,.3,.5);break;case"break":this.tone(t,.55,150,30,.3,"sine"),this.noise(t,.14,.32,3800,300,"lowpass"),this.metal(t+.025,.5,215,.11),this.noise(t+.12,.4,.09,900,180,"bandpass",.004,-.4,.3),[0,1,2].forEach(a=>this.metal(t+.08+a*.055,.2,(680+a*230)*i,.03,(a-1)*.65));break;case"special":this.noise(t,.7,.17,500,4300,"bandpass",.2,-.7,.25,.7),this.tone(t,.5,70,210,.11,"triangle",.12),this.tone(t+.34,.8,125,29,.3,"sine"),this.metal(t+.35,.8,330,.09,-.45),this.metal(t+.4,.65,495,.045,.55),this.noise(t+.35,.6,.2,3e3,200,"lowpass");break;case"charge":this.tone(t,.65,52,155,.1,"triangle",.18),this.tone(t,.7,105,315,.035,"sawtooth",.2),this.noise(t,.65,.11,400,2300,"bandpass",.18,-.5,.22,.5),[0,1,2].forEach(a=>this.tone(t+a*.14,.25,220+a*80,340+a*110,.025,"sine",.045,(a-1)*.5,.24));break;case"upgrade":this.noise(t,.3,.13,1900,350,"bandpass"),[164.81,220,329.63].forEach((a,o)=>{this.metal(t+o*.13,.6,a,.045,(o-1)*.4)}),this.tone(t,.55,80,55,.14,"sine");break;case"upgrade-assembly":this.noise(t,.24,.065,1450,520,"bandpass",.025,-.3,.12,.25),this.tone(t,.22,210,360,.025,"triangle",.025,-.25,.1,.2),[0,.11].forEach((a,o)=>this.metal(t+a,.16,480+o*160,.019,o?.3:-.3)),[52,59,64].forEach((a,o)=>this.tone(t+.2+o*.08,.48,fn(a),fn(a),.035/(1+o*.2),"triangle",.028,(o-1)*.3,.28));break;case"upgrade-stage2":this.noise(t,.32,.055,1100,2600,"bandpass",.08,-.4,.2,.4),[52,59,64,68,73,76].forEach((a,o)=>{this.tone(t+o*.075,.85-o*.045,fn(a),fn(a),.034/(1+o*.25),"triangle",.04,(o%2?1:-1)*.35,.32),this.tone(t+.015+o*.075,.45,fn(a+12),fn(a+12),.006,"sine",.018,(o%2?-1:1)*.45,.38)});break;case"correct":this.noise(t,.075,.06,1900,800,"bandpass"),this.metal(t,.36,329.63,.04,-.25),this.metal(t+.1,.4,440,.04,.25);break;case"wrong":this.tone(t,.23,180,125,.055,"triangle",.025),this.noise(t,.2,.06,650,300,"bandpass");break;case"victory":[164.81,220,277.18,329.63].forEach((a,o)=>{this.tone(t+o*.17,1.2,a,a*.998,.06,"triangle",.12,(o-1.5)*.3,.32),this.metal(t+o*.17,.8,a*2,.027,(1.5-o)*.35)}),this.noise(t,1.1,.08,800,2200,"bandpass",.2);break;case"step":this.foot*=-1,this.noise(t,.075,.105,750*i,160,"lowpass",.003,this.foot*.3,.07),this.tone(t,.095,88*i,42,.095,"sine",.004,this.foot*.2,.04),this.metal(t+.02,.07,260*i,.018,this.foot*.35);break}}startMusic(e){!this.ready()||!["battle","forge","victory"].includes(e)||(this.requestedMode=e,this.musicEnabled&&(this.mode===e&&this.timer!==null||(this.stopMusic(),this.mode=e,this.beat=0,this.tension=this.intensity,this.nextBeat=this.context.currentTime+.04,this.scheduleMusic())))}stop(){this.generation++,this.requestedMode=null,this.output&&this.context&&(this.output.gain.cancelScheduledValues(this.context.currentTime),this.output.gain.setValueAtTime(0,this.context.currentTime)),this.stopMusic(),this.lastEvent.clear();for(let e of[...this.voices]){try{e.source.stop()}catch{}this.release(e)}for(let e of[...this.spaces.keys()])this.clearSpace(e);this.master?.disconnect(),this.limiter?.disconnect(),this.output?.disconnect(),this.limiter=null,this.output=null}dispose(){this.disposed||(this.disposed=!0,this.stop(),document.removeEventListener("visibilitychange",this.visibility),window.removeEventListener("pagehide",this.pageHide),this.master?.disconnect(),this.limiter?.disconnect(),this.context&&(this.context.onstatechange=null,this.context.close().catch(()=>{})),this.context=null,this.master=null,this.limiter=null,this.noiseBuffer=null,this.impulse=null,this.musicImpulse=null,this.variants.clear(),this.unlocked=!1)}ready(){return!this.disposed&&this.enabled&&this.volume>0&&this.unlocked&&!document.hidden&&this.context?.state==="running"}applyVolume(){if(!this.master||!this.context||this.disposed)return;let e=this.context.currentTime;this.master.gain.cancelScheduledValues(e),!this.enabled||!this.unlocked||document.hidden?this.master.gain.setValueAtTime(0,e):this.master.gain.setTargetAtTime(this.volume*.42,e,.025)}ensureGraph(){if(this.output)return;let e=this.context;this.master.disconnect(),this.limiter=e.createDynamicsCompressor(),this.limiter.threshold.value=-14,this.limiter.knee.value=12,this.limiter.ratio.value=5,this.limiter.attack.value=.004,this.limiter.release.value=.17,this.output=e.createGain(),this.master.connect(this.limiter),this.limiter.connect(this.output),this.output.connect(e.destination)}space(e){this.ensureGraph();let t=this.spaces.get(e);if(t)return t;let n=this.context;if(!this.impulse){this.impulse=n.createBuffer(2,Math.ceil(n.sampleRate*.34),n.sampleRate);let l=719;for(let c=0;c<2;c++){let u=this.impulse.getChannelData(c);for(let h=0;h<u.length;h++){l=Math.imul(l,1664525)+1013904223>>>0;let d=h/n.sampleRate;u[h]=d<.012?0:(l/2147483648-1)*.012*Math.exp(-d*22)*(1-h/u.length)}[.017,.031,.053,.079].forEach((h,d)=>{u[Math.round((h+c*(.003+d*.001))*n.sampleRate)]+=.42/(d+1)})}}if(e&&!this.musicImpulse){this.musicImpulse=n.createBuffer(2,Math.ceil(n.sampleRate*1.1),n.sampleRate);let l=1709;for(let c=0;c<2;c++){let u=this.musicImpulse.getChannelData(c),h=0;for(let d=0;d<u.length;d++){l=Math.imul(l,1664525)+1013904223>>>0,h=h*.75+(l/2147483648-1)*.25;let f=d/n.sampleRate;u[d]=f<.025?0:h*.045*Math.exp(-f*6)*(1-d/u.length)}[.029,.047,.083,.131].forEach((d,f)=>{u[Math.round((d+c*.007)*n.sampleRate)]+=.3/(f+1)})}}let i=n.createGain(),s=n.createConvolver(),a=n.createGain();s.normalize=!1,s.buffer=e?this.musicImpulse:this.impulse,a.gain.value=.65,s.connect(a),a.connect(i),i.connect(this.master);let o={output:i,room:s,wet:a};return this.spaces.set(e,o),o}clearSpace(e){let t=this.spaces.get(e);t&&(t.room.disconnect(),t.wet.disconnect(),t.output.disconnect(),this.spaces.delete(e))}spatial(e,t,n,i,s,a){let o=this.context,l=this.space(this.schedulingMusic),c=o.createStereoPanner(),u=o.createGain();return c.pan.setValueAtTime(i,t),c.pan.linearRampToValueAtTime(a,t+n),u.gain.value=s,e.connect(c),c.connect(l.output),c.connect(u),u.connect(l.room),[c,u]}duck(e){let t=this.spaces.get(!0)?.output.gain;t&&(t.cancelScheduledValues(e),t.setValueAtTime(t.value,e),t.linearRampToValueAtTime(.58,e+.018),t.setTargetAtTime(1,e+.12,.16))}envelope(e,t,n,i,s){e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(Math.max(1e-4,i),t+Math.min(s,n*.4)),e.gain.exponentialRampToValueAtTime(1e-4,t+n)}track(e,t,n,i){this.voices.size>=96&&this.releaseOldest();let s={source:e,nodes:t,end:n+i+.015,music:this.schedulingMusic};this.voices.add(s),e.onended=()=>this.release(s),e.start(n),e.stop(s.end)}release(e){e.source.onended=null,e.source.disconnect(),e.nodes.forEach(t=>t.disconnect()),this.voices.delete(e)}releaseOldest(){let e=[...this.voices].find(t=>t.music)??this.voices.values().next().value;if(e){try{e.source.stop()}catch{}this.release(e)}}tone(e,t,n,i,s,a,o=.006,l=0,c=.14,u=l){let h=this.context,d=h.createOscillator(),f=h.createGain(),g=h.createBiquadFilter();d.type=a,d.frequency.setValueAtTime(n,e),d.frequency.exponentialRampToValueAtTime(Math.max(20,i),e+t),g.type="lowpass",g.frequency.value=a==="sawtooth"?950:5e3,g.Q.value=.5,this.envelope(f,e,t,s,o),d.connect(g),g.connect(f),this.track(d,[g,f,...this.spatial(f,e,t,l,c,u)],e,t)}noise(e,t,n,i,s,a,o=.004,l=0,c=.14,u=l){let h=this.context,d=h.createBufferSource(),f=h.createBiquadFilter(),g=h.createGain();d.buffer=this.noiseBuffer,d.loop=!0,f.type=a,f.Q.value=.8,f.frequency.setValueAtTime(i,e),f.frequency.exponentialRampToValueAtTime(s,e+t),this.envelope(g,e,t,n,o),d.connect(f),f.connect(g),this.track(d,[f,g,...this.spatial(g,e,t,l,c,u)],e,t)}metal(e,t,n,i,s=0){[1,1.483,2.137,3.19].forEach((a,o)=>this.tone(e+o*.0015,t/(1+o*.4),n*a,n*a*.97,i/(1+o*1.5),"sine",.003,Math.max(-1,Math.min(1,s+(o%2?.12:-.12))),.26))}pad(e,t,n,i,s,a){let o=this.context,l=fn(n);[-1,1].forEach(c=>{let u=o.createOscillator(),h=o.createBiquadFilter(),d=o.createGain();u.type="sawtooth",u.frequency.value=l,u.detune.setValueAtTime(c*4,e),u.detune.linearRampToValueAtTime(c*7,e+t),h.type="lowpass",h.Q.value=.4,h.frequency.setValueAtTime(l*1.4,e),h.frequency.linearRampToValueAtTime(l*(2.2+a),e+t*.35),h.frequency.exponentialRampToValueAtTime(l*1.2,e+t),d.gain.setValueAtTime(1e-4,e),d.gain.linearRampToValueAtTime(i*.5,e+Math.min(.55,t*.2)),d.gain.linearRampToValueAtTime(i*.38,e+t*.68),d.gain.exponentialRampToValueAtTime(1e-4,e+t),u.connect(h),h.connect(d),this.track(u,[h,d,...this.spatial(d,e,t,s+c*.09,.48,s)],e,t)})}pluck(e,t,n,i,s=.48){let a=fn(t);this.tone(e,s,a*1.003,a,n,"triangle",.006,i,.28),this.tone(e,s*.32,a*2,a*2,n*.23,"sine",.004,i,.32)}stopMusic(){this.timer!==null&&clearTimeout(this.timer),this.timer=null,this.mode=null,this.stopVoices(!0),this.clearSpace(!0)}stopVoices(e){for(let t of[...this.voices])if(t.music===e){try{t.source.stop()}catch{}this.release(t)}}scheduleMusic=()=>{if(!this.ready()||!this.mode){this.stop();return}if(!this.musicEnabled){this.stopMusic();return}let e=this.context,t=this.mode,n=t==="battle"?.19:t==="forge"?.28:.235;this.nextBeat<e.currentTime&&(this.nextBeat=e.currentTime+.025),this.schedulingMusic=!0;try{for(;this.nextBeat<e.currentTime+.16;)this.tension+=(this.intensity-this.tension)*.18,this.musicStep(this.nextBeat,this.beat,n,t),this.beat++,this.nextBeat+=n}finally{this.schedulingMusic=!1}this.timer=setTimeout(this.scheduleMusic,70)};musicStep(e,t,n,i){let s=Math.floor(t/16),a=t%16,o=s%16,l=Math.floor(s/16),[c,u]=N_[i][o],h=fn(c),d=i==="battle"?this.tension:i==="forge"?.15:.55,f=ep[this.hero],g=o>=8&&o<14,x=i!=="battle"&&o>=14,p=o%8===7||x;a===0&&([12,u+12,19,x?24:l%2?26:24].forEach((R,P)=>{let S=[-1,1,-.5,.5][P]*f.spread;this.pad(e+P*.012,n*(x?16:18),c+R,(i==="forge"?.022:.026)/(1+P*.3),S,f.warmth)}),this.tone(e,n*(x?13:7),h,h,.03+d*.012,"sine",.055,0,.12));let m=[[0,6,8,14],[0,8,12],[2,6,10],[0,8]],v=[[0,7,12,7],[u,2,0],[7,12,u+12],[2,0]],y=o%4,_=m[y].indexOf(a);if(_>=0&&!(p&&a>0)&&(i!=="forge"||y%2===0||_===0)){let E=x?0:v[y][_],R=c+24+E,P=fn(R),S=n*(x?12:_===m[y].length-1?4.5:3.2),M=(i==="forge"?.017:.029+d*.01)*(g?1.08:1);this.tone(e,S,P*.999,P,M,"triangle",.035,-.12,.4),i!=="forge"&&this.tone(e+.009,S*.9,P/2,P/2,M*.25,"sawtooth",.06,.12,.35),this.tone(e+.014,S*.8,P*2.001,P*2,M*f.shimmer,"sine",.025,f.spread,.48),g&&d>.5&&this.pluck(e+n,R-12,.009,-.45)}let I=i==="forge"?[2,10]:g?[0,3,6,8,11,14]:[0,6,8,14];if(I.includes(a)&&!(p&&a>6)&&!x){let E=[12,19,u+12,19];this.pluck(e+.008,c+E[(I.indexOf(a)+l)%4],(.014+d*.014)*f.pluck,-.36,i==="forge"?.7:.4)}if(!p&&(i==="victory"||i==="battle"&&d>.4)&&a%2===1){let E=[24,19,u+24,19,26,24,u+24,31],R=c+E[(Math.floor(a/2)+(g?2:0)+l)%8];this.pluck(e+.012,R,.008+d*.008,a%4===1?.48:-.48,n*1.8)}if(i!=="battle"){i==="victory"&&!p&&[0,8].includes(a)&&(this.tone(e,.25,100,55,.05,"sine",.008,0,.2),this.noise(e,.09,.012,2600,900,"bandpass",.008,.3,.22));return}if((a===0||a===8||!p&&d>.55&&[6,14].includes(a))&&(this.tone(e,.22,110,39,.065+d*.065,"sine",.004,0,.08),this.noise(e,.035,.025+d*.02,1700,350,"lowpass",.002,0,.08)),[0,6,8,14].includes(a)&&!(p&&a>8)){let E=a===14&&l%2?h*1.5:h;this.tone(e,n*1.6,E,E,.03+d*.025,"triangle",.012,-.08,.08)}[4,12].includes(a)&&d>.18&&(this.noise(e+.008,.12,.022+d*.033,2300,650,"bandpass",.003,.18,.27),this.tone(e,.1,210,140,.025,"triangle",.003,.15,.18)),d>.4&&a%2===s%2&&!(p&&a>8)&&this.noise(e,a===14?.12:.04,.008+d*.013,6500,3100,"highpass",.002,a%4?-.55:.55,.15),d>.7&&s%4===3&&[13,15].includes(a)&&(this.metal(e,.13,185+a*11,.009,a===13?-.5:.5),this.tone(e,.15,165,70,.045,"sine",.004,a===13?-.3:.3,.2))}};function sh(r){let{intent:e,staff:t,pad:n,energy:i}=r,s=Ks(r),a=ci(r)&&r.heroId==="echo"?1:2,o=Ys(r),l=o?.specialCost??4;if(o&&e==="guard"&&n&&i>=l&&o.openingBonus)return{title:"Prism has raised a shield",detail:"Your charged shot pierces it with no return hit.",icon:"target",tone:"shield",suggested:"special",badge:Ks(r,!0).shortName};if(ci(r)&&e==="heavy"){let c=li[tn(r)];return{title:c.cue,detail:o?.guardCounter?`${c.detail} Your Shield also hits back for 2.`:c.detail,icon:"shield",tone:"danger",suggested:"guard",badge:"Protect"}}return e==="heavy"?{title:"Prism is charging a BIG hit",detail:"Your shield can absorb most of it.",icon:"shield",tone:"danger",suggested:"guard",badge:"Protect"}:e==="strike"?{title:"Prism is about to attack",detail:i<4?"A shield block also builds energy.":"Your shield can block the incoming hit.",icon:"swords",tone:"warning",suggested:"guard",badge:i<4?"Block":"Protect"}:e==="guard"?{title:"Prism has raised a shield",detail:t&&i>=a?nt(r.heroId).id==="relay"&&!ci(r)?"Your pulse launcher can fire through it.":`Your ${s.name} can fire through it.`:i<4?"Build energy while the shield is up.":"Keep your shield safe until an opening.",icon:"shield",tone:"shield",suggested:t&&i>=a?"break":"guard",badge:t&&i>=a?s.shortName:i<4?"Charge":"Protect"}:{title:"Prism is wide open",detail:o?.openingBonus&&n&&i>=l?"No incoming hit. Your charged shot deals 4 extra damage now.":"No incoming hit. This is your opening.",icon:"target",tone:"opening",suggested:n&&i>=l?"special":t&&i>=a?"break":"strike",badge:"Opening"}}function np(r){let e=nt(r.heroId),t=e.id==="volt"?3:2,n=Ks(r),i=Ks(r,!0),s=ci(r)&&e.id==="echo"?1:2,a=Ys(r),o=a?nh(r,"special"):4;return[{id:"strike",name:"Attack",icon:"swords",hint:r.energy<4?"Hit +1 energy":"Energy full",disabled:!1},{id:"guard",name:"Shield",icon:"shield",hint:r.energy<4?`Block +${Math.min(t,4-r.energy)} energy`:"Energy full",disabled:!1},...r.staff?[{id:"break",name:n.shortName,icon:n.icon,hint:r.energy>=s?`Use ${s} energy`:`Needs ${s} energy`,disabled:r.energy<s}]:[],...r.pad?[{id:"special",name:i.shortName,icon:i.icon,hint:r.energy>=o?`Use ${o} energy`:`Needs ${o} energy`,disabled:r.energy<o}]:[]].map(l=>{let c=l.id==="guard"&&r.intent==="open"?"No hit to block":l.hint;return a&&!l.disabled&&(l.id==="guard"&&r.intent!=="open"&&a.guardCounter&&(c+=" / Counter 2"),(l.id==="break"&&r.upgradeStage>=3||l.id==="special"&&a.specialShots===2)&&(c+=" / 2 shots"),l.id==="special"&&a.openingBonus&&(c+=r.intent==="open"?" / +4 damage":r.intent==="guard"?" / No return hit":a.incomingDivisor===2?" / Half incoming hit":"")),{...l,hint:c}})}function ip(r){if(r?.kind!=="exchange")return null;let e=r.damage,t=r.rivalDamage,n=r.guardBroken?"Shield pierced!":r.technique?.id==="counter"?"Blocked and hit back!":r.move==="guard"?r.intent==="open"?"Prism was resting":"Hit absorbed!":e===0?"Prism blocked your attack":r.intent==="open"?"Opening taken!":"Attack landed",i=r.move==="guard"&&r.intent==="open"?"No incoming hit. Neither shield changed.":`Prism lost ${e} shield. You lost ${t}.${r.healing?` Recovered ${r.healing} shield.`:""}${r.technique?.shots.length>1?` ${r.technique.shots.length===2?"Two":"Three"} shots: ${r.technique.shots.join(" + ")} damage.`:""}`;return{title:n,detail:i,...r.ability?{ability:r.ability.name,abilityDescription:r.ability.description}:{},positive:r.guardBroken||t===0||r.move==="guard"}}function rp(r){if(ci(r))return r.round<Hn(r)?`Next: ${rr(r.round)} + ${nt(r.heroId).weapons[r.round].name}`:"Win this round to become a City Guardian";if(r.heroId&&r.heroId!=="relay"){let e=nt(r.heroId);return r.round===1?`Next: maths + ${e.weapons[1].name}`:r.round===2?`Next: science + ${e.weapons[2].name}`:"Win this round to become a City Guardian"}return r.round===1?"Next: maths forge + pulse launcher":r.round===2?"Next: science workshop + bigger armour, twin power cells and Overdrive":"Win this round to become a City Guardian"}var k_={Shield:yl,Swords:Ml,Zap:Ll,ArrowLeft:Yo,ArrowRight:Ko,Volume2:Al,VolumeX:Rl,Settings:xl,Pause:cl,Play:ul,X:Il,Check:jo,Lock:al,RotateCcw:pl,Sparkles:sa,ChevronRight:Qo,HelpCircle:zi,Delete:tl,Undo2:El,BookOpen:Jo,Cpu:el,Trophy:wl,Hammer:rl,Hand:sl,CircleHelp:zi,RefreshCw:dl,Target:Sl,ScanLine:gl,Sun:_l,Orbit:ll,Wind:Pl,Tornado:bl,Snowflake:vl,Users:Tl,Route:ml,Flame:il,Droplets:nl,Waves:Cl,Mountain:ol,Radio:hl,AudioLines:Zo,Rocket:fl},et=r=>document.getElementById(r),Pe=r=>String(r??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),pt=r=>`<i data-lucide="${r}" aria-hidden="true"></i>`,je=(r,e,t="",n="",i=!1,s="")=>`<button type="button" class="button ${n}" data-action="${r}" ${i?"disabled":""} ${s}>${t?pt(t):""}${Pe(e)}</button>`,Dn=(r,e,t)=>`<button type="button" class="icon-button" data-action="${r}" aria-label="${Pe(e)}" title="${Pe(e)}">${pt(t)}</button>`,Jt={get(r,e=null){try{return JSON.parse(localStorage.getItem(r)||"null")??e}catch{return e}},set(r,e){try{localStorage.setItem(r,JSON.stringify(e))}catch{Qs("Device storage is unavailable. Keep this page open while saving.")}},remove(r){try{localStorage.removeItem(r)}catch{}}},ah=["localhost","127.0.0.1","[::1]"].includes(location.hostname),ye,ar,Rt,At=new Ho,wn=!1,ct=!1,bn=null,us=!1,vt="arena",zn=null,Ye=Jt.get("bqSparkSettings",{sound:!1,volume:.55,reduced:matchMedia("(prefers-reduced-motion: reduce)").matches}),yt="",zo="",sp,up=null,Ni=null,ap=-1,pn="relay",Fi=0,op="hangar",hp=()=>`bqSparkHero:${ar.id}`,dp=r=>["Foundation","Applied","Stretch","Challenge","Master"][r-1]||"Foundation",oh=()=>Math.min(3,2+Math.floor(ye.wins/2)),F_=()=>[["Applied","Link two steps and check the result"],["Stretch","Compare evidence and solve missing values"],["Challenge","Plan a strategy across several steps"],["Master","Test explanations and solve unfamiliar problems"]].map(([r,e],t)=>`<li class="${oh()===t+2?"current":""}"><strong>${r}</strong><span>${e}</span>${oh()===t+2?"<b>Next duel starts here</b>":""}</li>`).join(""),ch=()=>!Ae&&(vt==="hangar"||vt==="path"||vt==="review"||!ye.match),Ae=null,uh=()=>`bqSparkGuide:launcher-v1:${ar.id}`,sn=et("dialog"),cs=()=>`bqSparkPending:${ar.id}`,fp=()=>`bqSparkDraft:${ar.id}:${ye.match?.id}:${ye.match?.questions?.[ye.match?.questionIndex]?.id}`,Bi=()=>ye?.match?.questions?.[ye.match?.questionIndex],Vo=()=>Dl({icons:k_,attrs:{"stroke-width":1.9}}),xt=()=>wn||ct||!!bn||!!Ni||!!Ae,pp=()=>!us&&!sn.open&&!document.hidden&&!bn,ki=r=>{pp()&&At.play(r)};function lh(){xt()||(Ae={step:"relay",match:{id:"guided-demo",round:1,phase:"battle",playerHP:24,rivalHP:16,energy:2,staff:!1,pad:!1,intent:"open",exchange:0}},vt="arena",ft())}async function B_(){!Ae||ct||(Jt.set(uh(),!0),Ae=null,Rt.trainingPreview(null),ft(),ye.match||await Ui({type:"start",heroId:pn}))}async function O_(r){if(!Ae||ct)return;if(r==="guide-skip"||r==="guide-finish")return B_();let e={relay:"prism",prism:"charge",blocked:"opening"};if(r==="guide-next"&&e[Ae.step]){Ae.step=e[Ae.step],Ae.match.intent=Ae.step==="charge"?"heavy":"open",ft();return}let t=r==="guide-guard"&&Ae.step==="charge",n=r==="guide-attack"&&Ae.step==="opening";if(!t&&!n)return;Ye.sound&&await At.unlock();let i={id:crypto.randomUUID(),kind:"exchange",move:t?"guard":"strike",intent:t?"heavy":"open",damage:t?0:4,rivalDamage:t?2:0,guardBroken:!1,phase:"battle",exchange:t?1:2},s={...Ae.match,playerHP:t?22:Ae.match.playerHP,rivalHP:t?16:12,energy:4,intent:"open",lastEvent:i};Ae.after=s,ct=!0,zn=structuredClone(Ae.match),ft();try{await Rt.playEvent(i,s)}finally{Ae&&(Ae.match=s,Ae.step=t?"blocked":"complete",Ae.after=null),ct=!1,zn=null,ft()}}function H_(){let r=Ae.step,e={relay:["YOU ARE RELAY","Your amber-and-ivory mech. Keep its shield above zero.","Meet Prism","guide-next"],prism:["THIS IS PRISM","Your training rival. Win a round by emptying its shield.","Watch Prism","guide-next"],charge:["PRISM IS CHARGING","That raised arm and growing light mean a big hit is coming.","Raise shield","guide-guard"],blocked:["YOU BLOCKED THE BIG HIT","Your shield absorbed 8 of 10 damage. The block filled your energy.","Look for an opening","guide-next"],opening:["NOW PRISM IS OPEN","The charge is gone. Prism is recovering and cannot hit back this turn.","Attack the opening","guide-attack"],complete:["OPENING TAKEN","Watch Prism each turn. Block a charge; attack an opening.",ye.match?"Return to my match":"Start my duel","guide-finish"]},[t,n,i,s]=e[r];return`<section class="battle-console guide-console" aria-label="Practice duel"><div class="guide-heading"><span class="eyebrow">PRACTICE / ${["relay","prism","charge","blocked","opening","complete"].indexOf(r)+1} OF 6</span>${je("guide-skip","Skip practice","","quiet",ct)}</div><h2>${Pe(t)}</h2><p>${Pe(n)}</p><div class="guide-actions">${je(s,ct?"Watch the exchange":i,r==="charge"?"shield":r==="opening"?"swords":"arrow-right",`primary full ${["charge","opening"].includes(r)?"guide-counter":""}`,ct)}</div><span class="save-state">${ct?" ":"Practice only. Your saved match is unchanged."}</span></section>`}function Qs(r){et("toast").textContent=r,et("toast").classList.add("visible"),clearTimeout(sp),sp=setTimeout(()=>et("toast").classList.remove("visible"),4800)}async function ea(r){let e=sessionStorage.getItem("brightQuestChildCapability"),t=await fetch("/api/sparkbound",{method:r?"POST":"GET",credentials:"same-origin",cache:"no-store",headers:{accept:"application/json",...e?{"x-bq-child-capability":e}:{},...r?{"content-type":"application/json","x-bq-child-id":ar.id}:{}},...r?{body:JSON.stringify(r)}:{}}),n=await t.json().catch(()=>({}));if(!t.ok){let i=new Error(n.error||`Connection error (${t.status})`);throw i.status=t.status,i.code=n.code,i}return n}function z_(){let r=Bi();r&&zo!==r.id&&(zo=r.id,yt=Jt.get(fp(),r.type==="order"?[]:""))}function sr(){Jt.set(fp(),yt)}async function Ui(r){if(xt())return;let e=structuredClone(ye);wn=!0,ft(),r.type==="move"&&ki("select");let t={operationId:crypto.randomUUID(),version:ye.version,action:r};Jt.set(cs(),t);try{if(ye=(await ea(t)).state,Jt.remove(cs()),r.type==="answer"&&ye.match?.lastEvent?.kind){let i=ye.match.questions.find(s=>s.id===r.questionId);ki(i?.resolved?"correct":"wrong"),i?.resolved&&(Ni=i)}r.type==="move"||e.match?.phase==="training"&&ye.match?.phase==="player_upgrade"?(ct=!0,zn=e.match,wn=!1,ft(),await Rt.playEvent(ye.match.lastEvent,ye.match),ct=!1,zn=null):ye.match?.phase==="rival_upgrade"&&e.match?.phase!=="rival_upgrade"?ki("charge"):ye.match?.phase==="victory"&&e.match?.phase!=="victory"&&(ki("victory"),pp()&&At.startMusic("victory")),ye.match?.phase==="battle"&&e.match?.phase!=="battle"&&ki("round"),r.type==="answer"&&Bi()?.id!==r.questionId&&(zo=""),(r.type==="reset"||r.type==="start")&&(zo="",vt="arena",history.replaceState({view:vt},"",`${location.pathname}${location.search}#arena`))}catch(n){if(!n.status||n.status>=500)bn=t,At.stop(),Qs("Your action is kept on this device. Reconnect to confirm the save.");else{if(Jt.remove(cs()),n.status===409)try{ye=(await ea()).state}catch{}Qs(n.message)}}finally{wn=!1,ct=!1,zn=null,ft()}}async function V_(){if(!(!bn||wn)){wn=!0,ft();try{ye=(await ea(bn)).state,Jt.remove(cs()),bn=null,Qs("Saved. Your match is ready.")}catch(r){if(r.status&&r.status<500&&(Jt.remove(cs()),bn=null,r.status===409))try{ye=(await ea()).state}catch{}Qs(r.message)}finally{wn=!1,ft()}}}function mp(r){if(!r||ch())return"";let e=ye.configuration?.battle?.rounds?.[r.round-1]||[{playerHP:24,rivalHP:16},{playerHP:26,rivalHP:28},{playerHP:24,rivalHP:50}][r.round-1],t=r.maxPlayerHP||e.playerHP,n=r.maxRivalHP||e.rivalHP,i=(s,a,o,l=!1)=>`<div class="hero-hud ${l?"rival":""} ${a<=o*.3?"low-shield":""}"><div class="hero-title"><strong>${s}</strong><small>${l?"YOUR RIVAL":"YOUR HERO"}</small></div><div class="shield-readout"><span>${pt("shield")}${l?"Rival shield":"Your shield"}</span><b>${a}<small> / ${o}</small></b></div><div class="shield-track" role="progressbar" aria-label="${Pe(s)} shield" aria-valuemin="0" aria-valuemax="${o}" aria-valuenow="${a}"><span style="width:${Math.max(0,Math.min(100,a/o*100))}%"></span></div></div>`;return i(nt(r.heroId).name.toUpperCase(),r.playerHP,t)+`<div class="round-chip"><div class="round-dots">${Array.from({length:Hn(r)},(s,a)=>a+1).map(s=>`<i class="${s<=r.round?"done":""}"></i>`).join("")}</div><span>ROUND ${r.round} / ${Hn(r)}</span><strong>Empty Prism's shield</strong></div>`+i("PRISM",r.rivalHP,n,!0)}function G_(r){if(!ct){if(!r||ch()){et("scene-caption").innerHTML="";return}if(r.phase==="battle"){let e=sh(r);et("scene-caption").innerHTML=`<div class="intent intent-${e.tone}">${pt(e.icon)}<div class="intent-detail"><strong>${Pe(e.title)}</strong>${Ye.cues!==!1?`<small>${Pe(e.detail)}</small>`:""}</div></div>`}else r.phase==="training"?et("scene-caption").innerHTML=`<h2 class="scene-title">${rr(r.trainingStage).toUpperCase()} FORGE</h2><p class="scene-subtitle">Upgrade ${r.trainingStage} / ${Hn(r)-1}</p>`:et("scene-caption").innerHTML=""}}function W_(r){let e=np(r),t=sh(r),n=!ct&&!wn?ip(r.lastEvent):null;return`<section class="battle-console"><div class="exchange-recap ${n?.positive?"positive":""}" role="status">${n?`<strong>${Pe(n.title)}</strong><span>${Pe(n.detail)}${n.ability?` <b class="ability-trigger" title="${Pe(n.abilityDescription)}">${Pe(n.ability)}: ${Pe(n.abilityDescription)}</b>`:""}</span>`:`<strong>${ct?"Duel in motion":"Win this round. Keep your shield above zero."}</strong><span>${ct?" ":Pe(rp(r))}</span>`}</div><div class="turn-status"><span>${ct?"Resolving your move":"Your move"} ${ct?"":pt("chevron-right")}</span><div class="energy-meter" aria-label="Energy ${r.energy} of 4"><span>Energy</span><div class="energy-cells">${[1,2,3,4].map(i=>`<i class="${i<=r.energy?"charged":""}"></i>`).join("")}</div><b>${r.energy}/4</b></div></div><div class="moves" style="--move-count:${e.length}">${e.map(i=>`<button type="button" class="move ${!xt()&&Ye.cues!==!1&&i.id===t.suggested?"suggested":""}" data-action="move" data-move="${i.id}" ${i.disabled||xt()?"disabled":""} title="${Pe(i.name+": "+i.hint)}" aria-label="${Pe(i.name+", "+i.hint)}">${pt(i.icon)}<b>${i.name}</b><small>${i.hint}</small><span class="move-cue">${Ye.cues!==!1&&i.id===t.suggested&&!xt()?Pe(t.badge):""}</span></button>`).join("")}</div><p class="save-state">${wn?"Saving move":ct?" ":"Progress saved"}</p></section>`}function q_(r){let e=r.evidence;if(!e||e.kind==="observation"&&e.description&&r.prompt.startsWith(e.description))return"";let t="";return e.kind==="groups"?t=`<div class="cell-packs">${Array.from({length:e.groups},(n,i)=>`<div class="cell-pack" aria-label="Pack ${i+1}, ${e.each} cells">${Array.from({length:e.each},()=>"<i></i>").join("")}<small>${e.each} cells</small></div>`).join("")}</div>`:e.kind==="capacity"?t=`<div class="cartridge" aria-label="${e.filled} of ${e.capacity} spaces fitted">${Array.from({length:e.capacity},(n,i)=>`<i class="${i<e.filled?"fitted":""}"></i>`).join("")}</div><p><strong>${e.filled}</strong> fitted / <strong>${e.capacity}</strong> spaces</p>`:e.kind==="sharing"?t=`<p>${e.total} cells / ${e.groups} equal trays</p>`:e.readings?t=`<table><thead><tr><th>Pad</th><th>Sensor reading</th></tr></thead><tbody>${e.readings.map(n=>`<tr><td>${Pe(n.pad)}</td><td>${Pe((n.values||[]).join(", "))}</td></tr>`).join("")}</tbody></table><p>${Pe(e.lowerIs||"")}</p>`:e.kind==="sequence"?t=`<p>Each step: +${e.step}</p>`:e.kind==="measurement"?t=`<p>All lengths are measured in ${Pe(e.unit)}.</p>`:e.kind==="place-value"?t=`<p>Smallest ${pt("arrow-right")} largest</p>`:e.kind==="circuit-cards"?t=`<div class="wiring-cards">${Object.entries(e.cards).map(([n,i])=>`<div><strong>Card ${n.toUpperCase()}</strong>${lp({wires:i,bulb:e.bulb},`Wiring card ${n.toUpperCase()}`)}</div>`).join("")}</div>`:e.kind.startsWith("circuit-")?t=lp(e,"Battery and bulb wiring diagram"):t=`<p>${Pe(e.description||e.note||e.fact||"")}</p>`,t&&t!=="<p></p>"?`<div class="evidence">${t}${e.note?`<p class="evidence-note">${Pe(e.note)}</p>`:""}</div>`:""}function lp(r,e){let t=r.kind==="circuit-switch",n=t&&r.wires.some(a=>a[0]==="+"&&a[1]==="S"),i={"+":[45,120],"-":[205,120],X:[65,38],Y:[185,38],S:n?[45,92]:[205,62],T:n?[45,62]:[205,92]},s=(a,o)=>{let l=i[a],c=i[o];return`<path d="M${l[0]} ${l[1]} L${l[0]} ${c[1]} L${c[0]} ${c[1]}"/>`};return`<svg class="circuit-diagram" viewBox="0 0 250 157" role="img" aria-label="${Pe(e)}"><g fill="none" stroke="#50747b" stroke-width="3">${r.wires.map(a=>s(a[0],a[1])).join("")}<path d="M65 38 H98 M152 38 H185"/><circle cx="125" cy="38" r="27" fill="#fff9d4"/><path d="M107 20 L143 56 M143 20 L107 56" stroke="#ba9041"/><path d="M45 120 H112 M138 120 H205 M112 103 V137 M122 110 V130 M128 103 V137 M138 110 V130" stroke="#344852"/>${t?`<path d="M${i.S[0]} ${i.S[1]} l${n?17:-17} ${n?-23:23}" stroke="#ac7940"/>`:""}</g>${Object.entries(i).filter(([a])=>t||!["S","T"].includes(a)).map(([a,o])=>`<circle cx="${o[0]}" cy="${o[1]}" r="4" fill="#204d56"/><text x="${o[0]+(o[0]<125?-18:10)}" y="${o[1]+5}" fill="#233e48" font-size="14" font-family="Arial" font-weight="700">${Pe(a)}</text>`).join("")}<text x="125" y="155" text-anchor="middle" fill="#506671" font-size="12" font-family="Arial">Battery</text></svg>`}function X_(r){z_();let e=Bi();if(!e?.prompt)return`<div class="result-panel"><p>Loading the next forge task.</p>${je("reload","Reload saved match","refresh-cw")}</div>`;let t=e.feedback,n=typeof t=="string"?t:t?.text||t?.message||t?.explanation||t?.hint||"",i=e.type==="numeric"?`<div class="numeric-value" role="textbox" aria-label="Your answer" aria-readonly="true" tabindex="0" id="numeric-answer">${Pe(yt)||'<span style="opacity:.4">?</span>'}</div><div class="keypad">${[1,2,3,4,5,6,7,8,9,"clear",0,"backspace"].map(a=>`<button type="button" data-action="key" data-key="${a}" aria-label="${a==="clear"?"Clear answer":a==="backspace"?"Delete last digit":a}" ${xt()?"disabled":""}>${a==="clear"?pt("x"):a==="backspace"?pt("delete"):a}</button>`).join("")}</div>`:e.type==="order"?`<div class="order-slots" aria-label="Your order">${e.choices.map((a,o)=>`<span>${Pe(e.choices.find(l=>l.id===yt[o])?.label||"")}</span>`).join("")}</div><div class="order-options">${e.choices.map(a=>`<button type="button" data-action="order" data-choice="${Pe(a.id)}" ${yt.includes(a.id)||xt()?"disabled":""}>${Pe(a.label)}</button>`).join("")}</div><div class="order-controls">${Dn("undo-order","Undo last choice","undo-2")}${Dn("clear-order","Clear order","rotate-ccw")}</div>`:`<div class="answer-options">${e.choices.map(a=>`<button type="button" class="answer-option ${yt===a.id?"selected":""}" data-action="choose" data-choice="${Pe(a.id)}" aria-pressed="${yt===a.id}" ${xt()?"disabled":""}>${Pe(a.label)}</button>`).join("")}</div>`,s=e.type==="order"?yt.length===e.choices.length:String(yt).length>0;return`<section class="forge-panel" data-question="${Pe(e.id)}"><div class="forge-top"><span class="eyebrow">${Pe(e.title||"Forge task")} / ${dp(e.learningLevel||r.learningLevel||1)}</span><span class="forge-count">${r.questionIndex%Di(r)+1} / ${Di(r)}</span></div><div class="forge-brief"><h2 tabindex="-1">${Pe(e.prompt)}</h2>${q_(e)}${n?`<div class="feedback ${e.resolved?"":"wrong"}" role="status"><strong>${e.resolved?"Ready":e.hintsUsed>=2?"Worked support":"A useful clue"}</strong>${Pe(n)}</div>`:""}</div><div class="forge-response">${i}<div class="forge-actions">${je("answer","Confirm","check","primary",xt()||!s)}${je("hint",e.hintsUsed>=1?"Show steps":"Clue","circle-help","quiet",xt()||e.hintsUsed>=2)}</div><p class="save-state">${wn?"Saving your answer":"Take your time. The battle is paused."}</p></div></section>`}function $_(r){let e=nt(r.heroId),t=Di(r),n=r.round===Hn(r),i=Zt(r),s=e.weapons[i];if(r.phase==="round_won")return`<section class="result-panel"><span class="eyebrow">${n?"Final round":"Round "+r.round}</span><h1>${n?"TRIAL COMPLETE!":"YOU WON THIS ROUND!"}</h1><p>${n?`${Hn(r)} rounds won. Your City Guardian badge is ready.`:`Next mission: solve ${t} ${rr(r.round)} challenges to build your ${e.weapons[r.round].name}.`}</p>${je("continue",n?"Claim guardian badge":"Build my next upgrade","arrow-right","primary",xt())}</section>`;if(r.phase==="rival_upgrade"){let a=li[tn(r)];return`<section class="result-panel"><span class="eyebrow">Prism evolves / Round ${r.round+1}</span><h1>${a.name.toUpperCase()}</h1><p>${a.detail}</p><p>Build your ${e.weapons[r.round].name} in the ${rr(r.round)} forge to meet the challenge.</p>${je("continue","Enter the forge","hammer","primary",xt())}</section>`}return r.phase==="player_upgrade"?`<section class="result-panel"><div class="result-tag">${pt(s.icon)}${Qu[i]} unlocked</div><h1>${s.name.toUpperCase()}</h1><p>${ih(r)} ${i===1?`Choose ${s.shortName} with ${e.id==="echo"&&r.rulesVersion>=3?1:2} energy.`:i===2?"Fill 4 energy for your heavy blast.":""}</p>${je("continue",`Ready for round ${r.round+1}`,"arrow-right","primary",xt())}</section>`:r.phase==="defeat"?`<section class="result-panel"><span class="eyebrow">Suit shield depleted</span><h1>RESET. RISE AGAIN.</h1><p>Your equipment and forge progress are safe. Try a different move when Prism winds up.</p><div class="actions">${je("retry","Try this round again","rotate-ccw","primary",xt())}${je("retry-supported","Try with support","shield","",xt())}</div></section>`:`<section class="result-panel"><div class="tier-medal">${pt("trophy")}CITY GUARDIAN / TIER ${ye.tier}</div><h1>STRONGER TOGETHER</h1><p>${e.name} and Prism rise together. Your Guardian rank is saved.</p><div class="actions">${je("start","Rematch","swords","primary",xt())}${je("review","Review training","book-open")}${je("hangar","Choose hero","users")}</div><div style="margin-top:13px"><a class="button quiet" href="/">${pt("arrow-left")}Bright Quest</a></div></section>`}function Y_(){let r=(ye.match?.questions||[]).filter(e=>e.prompt&&e.resolved);return`<section class="review-panel"><div class="dialog-head"><h1>Your forge work</h1>${je("arena","Back to arena","arrow-left")}</div><p>Completed equipment tasks in this match.</p>${r.length?r.map(e=>`<article class="review-item"><span class="status ${e.completion==="independent"?"":"supported"}">${Pe(e.completion==="independent"?"Independent":"Completed with support or retry")}</span><h3>${Pe(e.prompt)}</h3><p>${Pe(typeof e.feedback=="string"?e.feedback:e.feedback?.text||e.feedback?.message||e.outcome||"")}</p></article>`).join(""):"<p>Your completed forge tasks will appear here.</p>"}<p>Parents can see original responses in the Bright Quest Parent review.</p><a class="button" href="/">${pt("arrow-left")}Return to Bright Quest</a></section>`}function gp(r=!1){return`<div class="hero-roster ${r?"compact":""}" aria-label="Choose hero">${ir.map(e=>`<button type="button" data-action="select-hero" data-hero="${e.id}" class="hero-tile ${pn===e.id?"selected":""}" aria-pressed="${pn===e.id}" style="--hero-accent:${e.colour}">${r?pt(e.weapons[1].icon):`<img src="/sparkbound/assets/heroes/${e.id}-0.jpg" alt="" width="160" height="160">`}<span>${e.name}</span></button>`).join("")}</div>`}function K_(){let r=nt(pn),e=ye.match&&ye.match.phase!=="victory";return`<section class="hangar-panel" aria-label="Hero hangar"><div class="hangar-heading"><span class="eyebrow">HERO HANGAR</span><span class="hangar-rank">${pt("trophy")}Rank ${ye.tier}</span></div><h1>${r.name.toUpperCase()}</h1><p class="hero-role">${r.role}</p>${gp()}<div class="hero-trait">${pt(r.weapons[1].icon)}<div><strong>${r.trait.name}</strong><p>${th({heroId:r.id,rulesVersion:4}).description}</p></div></div><div class="kit-preview" aria-label="Preview equipment">${r.weapons.map((t,n)=>`<button type="button" data-action="preview-kit" data-stage="${n}" aria-pressed="${Fi===n}" class="${Fi===n?"selected":""}">${n===0?"Base":`Mk ${n+1}`}</button>`).join("")}</div><p class="preview-name">${Fi?"Preview: ":""}${r.weapons[Fi].name}</p><div class="inspection-controls" role="group" aria-label="Rotate hero">${Dn("rotate-left","Rotate hero left","arrow-left")}${Dn("rotate-reset","Reset hero view","rotate-ccw")}${Dn("rotate-right","Rotate hero right","arrow-right")}</div><div class="hangar-actions">${je(e?"arena":"start",e?`Resume ${nt(ye.match.heroId).name}`:`Play as ${r.name}`,"play","primary full",xt())}${je("path","Upgrade path","route","",xt())}${Dn("how","Guardian mission","circle-help")}</div>${e?`<p class="hangar-note">Your current match stays with ${nt(ye.match.heroId).name}. Choose a new hero for your next duel.</p>`:`<p class="hangar-note">Six rounds. Five earned upgrades. ${dp(oh())} challenges.</p>`}</section>`}function Z_(){let r=nt(pn),e=ye.match,t=e&&nt(e.heroId).id===r.id,n=t?Zt(e):-1,i=t?Di(e):3,s=t&&(!e.rulesVersion||e.rulesVersion<3);return`<section class="path-panel" aria-label="Upgrade path"><header class="path-heading"><div><span class="eyebrow">HERO DEVELOPMENT</span><h1>Build your guardian</h1></div>${je("path-back","Back","arrow-left")}</header>${gp(!0)}${s?'<p class="legacy-note">Your saved three-round duel keeps its original equipment. Start your next duel for all five upgrades.</p>':""}<div class="path-intro"><div><h2>${r.name}</h2><p>${r.trait.name}: ${th({heroId:r.id,rulesVersion:4}).description}</p></div><span class="path-rank">${pt("trophy")}Guardian rank ${ye.tier}</span></div><div class="upgrade-stages">${r.weapons.map((a,o)=>{let l=n===o?"Equipped":n>o?"Completed":o===0?"Ready at start":s&&o>=3?"Next duel":"Locked";return`<article class="upgrade-stage ${n===o?"equipped":""}"><div class="stage-image"><img src="/sparkbound/assets/heroes/${r.id}-${o}.jpg" alt="${Pe(r.name+" with "+a.name)}" width="320" height="320"><span class="stage-status ${n>=o?"earned":""}">${pt(n>=o?"check":o?"lock":"play")}${l}</span></div><div class="stage-copy"><span class="eyebrow">${String(o+1).padStart(2,"0")} / ${Qu[o].toUpperCase()}</span><h3>${a.name}</h3><p>${ih(t&&e.rulesVersion===3?{...e,upgradeStage:o}:{heroId:r.id,rulesVersion:4,upgradeStage:o})}</p><div class="stage-requirement">${pt(o?"hammer":"swords")}${o===0?"Start your duel":`Win round ${o} + solve ${i} ${rr(o)} challenges`}</div></div></article>`}).join("")}</div><section class="prism-path" aria-label="Prism equipment"><div><span class="eyebrow">YOUR RIVAL EVOLVES TOO</span><h2>Prism's arsenal</h2></div><ol>${li.map((a,o)=>`<li class="${e&&tn(e)===o?"current":""}"><span>ROUND ${o+1}</span><strong>${a.name}</strong><p>${a.detail}</p></li>`).join("")}</ol></section><section class="learning-path"><div><span class="eyebrow">CHALLENGE PROGRESSION</span><h2>Grow through victories</h2><p>Earn all five upgrades in order. Later forges add more reasoning, with clues available throughout. Your Guardian rank and completed training remain saved.</p></div><ol>${F_()}</ol></section></section>`}function ft(){if(!ye||!Rt)return;let r=zn||Ae?.match||ye.match,e=document.querySelector(".forge-panel[data-question]"),t=e?.dataset.question===Bi()?.id&&e?.scrollTop||0,n=document.querySelector(".hangar-panel")?.scrollTop||0,i=!Ae&&(vt==="hangar"||!r&&vt!=="path"&&vt!=="review");et("game").dataset.view=i?"hangar":vt,et("game").dataset.guide=Ae?.step||"",ct||(Rt.sync(i?null:Ae?.match||ye.match,ye.tier),Rt.trainingPreview(Ae?Ae.step==="charge"?"charge":Ae.step==="relay"?"relay":Ae.step==="prism"?"prism":"opening":null),i&&Rt.previewHero(pn,Fi)),et("game").dataset.phase=r?.phase||"welcome",et("game").setAttribute("aria-busy",String(wn||ct)),et("topbar").innerHTML=`<div class="wordmark"><span class="brand-icon">${pt("zap")}</span><div>SPARKBOUND<small>BRIGHT QUEST / HERO TRIALS</small></div></div><nav class="top-actions" aria-label="Game menu"><span class="profile-name">${Pe(ar.name)}</span>${ah?'<span class="preview-tag">LOCAL QA</span>':""}${Dn("sound",Ye.sound?"Mute sound":"Enable sound",Ye.sound?"volume-2":"volume-x")}${Dn("settings","Settings","settings")}${Dn("pause","Pause game","pause")}${Dn("exit","Return to Bright Quest","arrow-left")}</nav>`,et("hud").innerHTML=mp(r),G_(r),Ae&&!ct&&(et("scene-caption").innerHTML=`<div class="guide-signal ${Ae.step==="charge"?"charging":""}">${pt(Ae.step==="charge"?"zap":Ae.step==="relay"?"shield":"target")}<strong>${Ae.step==="relay"?"RELAY / YOUR HERO":Ae.step==="prism"?"PRISM / YOUR RIVAL":Ae.step==="charge"?"CHARGING A BIG HIT":Ae.step==="blocked"?"BLOCK SUCCESSFUL":"CHARGE GONE / OPENING"}</strong></div>`),et("interface").innerHTML=Ae?H_():Ni&&!ct?`<section class="forge-panel earned-panel"><span class="result-tag">${pt("check")}COMPONENT READY</span><h2>${Pe(Ni.outcome)}</h2><div class="feedback"><strong>${Ni.completion==="independent"?"Solved independently":"Solved with practice"}</strong>${Pe(Ni.feedback?.message||"")}</div>${je("acknowledge",ye.match.phase==="player_upgrade"?"See your upgrade":"Next component","arrow-right","primary full")}</section>`:vt==="review"?Y_():vt==="path"?Z_():i?K_():r.phase==="battle"?W_(r):ct?`<section class="result-panel"><span class="result-tag">${pt("cpu")}ASSEMBLING YOUR EQUIPMENT</span></section>`:r.phase==="training"?X_(r):$_(r),et("connection").innerHTML=bn?`<div class="connection-banner">Save pending ${je("reconnect","Reconnect","refresh-cw","",wn)}</div>`:"";let s=document.querySelector(".forge-panel[data-question]");s&&(s.scrollTop=t);let a=document.querySelector(".hangar-panel");if(a&&(a.scrollTop=n),Rt.reduced=Ye.reduced,Rt.paused=us||sn.open||document.hidden||vt==="path"||vt==="review",et("game").dataset.reduced=String(Ye.reduced),At.setIntensity(r?.phase==="battle"?r.intent==="heavy"||r.playerHP<=8?.85:r.round>=3?.65:.35:.15),At.setHero(i?pn:nt(r?.heroId).id),At.setMusicEnabled(Ye.music!==!1),At.setEffectsEnabled(Ye.effects!==!1),At.setEnabled(Ye.sound),At.setVolume(Ye.volume),!us&&!sn.open&&!document.hidden&&!bn&&At.startMusic(ch()||r?.phase==="training"?"forge":r?.phase==="victory"?"victory":"battle"),Vo(),Bi()?.feedback&&!Ni&&!Ae&&ap!==ye.version){let o=document.querySelector(".forge-brief .feedback");o&&(o.scrollIntoView({block:"nearest"}),ap=ye.version)}}function Js(r){vt=r,history.pushState({view:vt},"",`${location.pathname}${location.search}#${vt}`),ft()}function js(r,e){up=document.activeElement,sn.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">${Pe(r)}</h2>${Dn("close-dialog","Close dialog","x")}</div><div class="dialog-body">${e}</div>`,sn.setAttribute("aria-labelledby","dialog-title"),sn.showModal(),Rt.paused=!0,At.stop(),Vo()}function ui(){sn.close(),us=!1,Rt.paused=document.hidden,up?.focus(),ft()}function J_(){js("Arena settings",`<label class="setting">Sound<input type="checkbox" id="sound-setting" ${Ye.sound?"checked":""}></label><label class="setting">Background music<input type="checkbox" id="music-setting" ${Ye.music!==!1?"checked":""}></label><label class="setting">Sound effects<input type="checkbox" id="effects-setting" ${Ye.effects!==!1?"checked":""}></label><label class="setting">Volume<input type="range" id="volume-setting" min="0" max="1" step=".05" value="${Ye.volume}"></label><label class="setting">Tactical cues<input type="checkbox" id="cues-setting" ${Ye.cues!==!1?"checked":""}></label><label class="setting">Reduced motion<input type="checkbox" id="motion-setting" ${Ye.reduced?"checked":""}></label><div class="dialog-actions">${je("hangar","Heroes","users","",xt())}${je("path","Upgrade path","route","",xt())}${je("mission","Guardian mission","target")}${je("save-settings","Done","check","primary")}${je("restart","Restart match","rotate-ccw","",xt()||!ye.match)}</div>`)}function cp(){let r=ye.match?Hn(ye.match):6;js("The Guardian Trial",`<p><strong>Mission: win ${r} rounds.</strong> Empty Prism's shield while keeping your own above zero.</p><p>Watch Prism's charge. Raise your shield before a big hit; attack when Prism is open.</p><p>Between rounds, solve ${ye.match?Di(ye.match):3} maths or science challenges to build the next weapon. Your piercing shot breaks through a raised shield. A full four-energy charge powers your special.</p><p>${r===6?"Five earned upgrades take you from a base suit to a complete Guardian arsenal. Prism adds flame jets, rockets and heavier energy weapons as you advance.":"This saved duel keeps its original three-round progression. Your next duel includes all five upgrades."}</p><div class="dialog-actions">`+je("practice","Practise with Prism","play","primary",xt())+je("close-dialog","Return to arena","arrow-left")+"</div>")}document.addEventListener("click",async r=>{let e=r.target.closest("[data-action]");if(!e||e.disabled)return;let t=e.dataset.action;if(!Rt){t==="reload"&&location.reload();return}if(t?.startsWith("guide-"))return O_(t);if(t==="practice"){ui(),lh();return}if(t==="acknowledge"){Ni=null,ft();return}if(t==="sound"){Ye.sound=!Ye.sound,Jt.set("bqSparkSettings",Ye),Ye.sound?await At.unlock():At.stop(),ft();return}if(t==="settings")return J_();if(t==="how")return cp();if(t==="mission")return sn.close(),cp();if(t==="close-dialog")return ui();if(t==="save-settings"){Ye.sound=et("sound-setting").checked,Ye.music=et("music-setting").checked,Ye.effects=et("effects-setting").checked,Ye.volume=Number(et("volume-setting").value),Ye.cues=et("cues-setting").checked,Ye.reduced=et("motion-setting").checked,Jt.set("bqSparkSettings",Ye),Ye.sound&&await At.unlock(),ui();return}if(t==="pause")return us=!0,js("Match paused",`<p>Your current round and equipment are safe.</p><div class="dialog-actions">${je("close-dialog","Resume","play","primary")}${je("review-dialog","Review training","book-open","",!!Ae||ct)}</div><p><a class="button full" href="/">${pt("arrow-left")}Return to Bright Quest</a></p>`);if(t==="exit")return js("Leave the arena?",`<p>${bn?"A save is waiting to reconnect. Reconnect before leaving.":"Your confirmed progress is saved. You can resume this match later."}</p><div class="dialog-actions">${je("close-dialog","Keep playing","play","primary")}<a class="button" href="/">${pt("arrow-left")}Bright Quest</a></div>`);if(t==="restart")return js("Restart this match?",`<p>This starts over at round 1. Your completed learning evidence and previous wins stay in Parent review.</p><div class="dialog-actions">${je("close-dialog","Keep playing","arrow-left","primary")}${je("confirm-restart","Restart match","rotate-ccw","danger",xt())}</div>`);if(t==="confirm-restart"){ui(),await Ui({type:"reset"});return}if(t==="review-dialog"){if(Ae)return;ui(),Js("review");return}if(t==="arena"||t==="review"){ct||Js(t);return}if(t==="reload")return location.reload();if(t==="reconnect")return V_();if(xt())return;if(t==="rotate-left"||t==="rotate-right"||t==="rotate-reset"){Rt.turnPreview(t==="rotate-reset"?null:t==="rotate-left"?-.5:.5);return}if(t==="hangar"){sn.open&&ui(),Fi=0,Js("hangar");return}if(t==="path"){op=vt==="hangar"||!ye.match?"hangar":"arena",sn.open&&ui(),Js("path");return}if(t==="path-back"){Js(op);return}if(t==="select-hero"&&eh(e.dataset.hero)&&(vt==="path"||vt==="hangar"||!ye.match)){Ye.sound&&await At.unlock(),pn=e.dataset.hero,Fi=0,Jt.set(hp(),pn),At.setHero(pn),ki("select"),ft();return}if(t==="preview-kit"&&(vt==="hangar"||!ye.match)){let i=Number(e.dataset.stage);Number.isInteger(i)&&i>=0&&i<nt(pn).weapons.length&&(Ye.sound&&await At.unlock(),Fi=i,ki("select"),ft());return}if(Ye.sound&&await At.unlock(),t==="start"&&!ye.match&&!Jt.get(uh()))return lh();if(["start","continue","retry"].includes(t))return Ui({type:t,...t==="start"?{heroId:pn}:{}});if(t==="retry-supported")return Ui({type:"retry",support:!0});if(t==="move")return Ui({type:"move",move:e.dataset.move});let n=Bi();if(t==="choose"&&(yt=e.dataset.choice,sr(),ft()),t==="order"&&n?.type==="order"&&!yt.includes(e.dataset.choice)&&(yt.push(e.dataset.choice),sr(),ft()),t==="undo-order"&&(yt.pop(),sr(),ft()),t==="clear-order"&&(yt=[],sr(),ft()),t==="key"){let i=e.dataset.key;yt=i==="clear"?"":i==="backspace"?String(yt).slice(0,-1):(String(yt)+i).replace(/^0+(?=\d)/,"").slice(0,6),sr(),ft()}t==="hint"&&n&&await Ui({type:"hint",questionId:n.id}),t==="answer"&&n&&await Ui({type:"answer",questionId:n.id,answer:yt})});document.addEventListener("keydown",r=>{sn.open||xt()||vt!=="arena"||Bi()?.type!=="numeric"||ye.match.phase!=="training"||r.target.tagName==="BUTTON"&&["Enter"," "].includes(r.key)||(/^\d$/.test(r.key)?(r.preventDefault(),yt=(String(yt)+r.key).replace(/^0+(?=\d)/,"").slice(0,6),sr(),ft()):r.key==="Backspace"?(r.preventDefault(),yt=String(yt).slice(0,-1),sr(),ft()):r.key==="Enter"&&String(yt)&&(r.preventDefault(),Ui({type:"answer",questionId:Bi().id,answer:yt})))});sn.addEventListener("cancel",r=>{r.preventDefault(),ui()});window.addEventListener("popstate",r=>{sn.open&&ui(),vt=!Ae&&!ct&&["review","hangar","path"].includes(r.state?.view)?r.state.view:"arena",ft()});document.addEventListener("visibilitychange",()=>{Rt&&(Rt.paused=document.hidden||us||sn.open,document.hidden?(At.stop(),speechSynthesis.cancel()):ft())});async function j_(){try{let r=await ea();ye=r.state,ar=r.profile,bn=Jt.get(cs());let e=Jt.get(hp());pn=nt(eh(e)?e:ye.match?.heroId).id,et("loading-message").textContent="Bringing the heroes online",Rt=new Oo(et("scene")),Rt.onCue=t=>ki(t),Rt.onBeat=t=>{et("scene-caption").innerHTML=t?`<h2 class="scene-title">${Pe(t)}</h2>`:""},Rt.onImpact=(t,n)=>{let i=Ae?.after||ye.match;!zn||!i||(zn={...zn,energy:i.energy,...n==="player"?{rivalHP:i.rivalHP}:{playerHP:i.playerHP}},et("hud").innerHTML=mp(zn),Vo())},await Rt.ready,et("loading").style.display="none",ah&&(window.__SPARK_QA__={get state(){return ye},get world(){return Rt},get audio(){return At},get acting(){return ct},get guide(){return Ae}}),history.replaceState({view:vt},"",`${location.pathname}${location.search}#arena`),ft(),ye.match?.phase==="battle"&&!Jt.get(uh())&&!bn&&lh()}catch(r){ah&&console.error("Sparkbound boot failed",r),et("loading").innerHTML=`<div class="missing-assets"><span class="eyebrow">Bright Quest</span><h1>SPARKBOUND</h1><p>${[401,403,409].includes(r.status)?"Open Bright Quest and select your child profile to begin.":"The arena could not load. Your saved progress is safe."}</p><div class="actions">${je("reload","Try again","refresh-cw","primary")}<a class="button" href="/">${pt("arrow-left")}Open Bright Quest</a></div></div>`,Vo(),et("game").setAttribute("aria-busy","false")}}j_();
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
lucide/dist/esm/icons/audio-lines.js:
lucide/dist/esm/icons/book-open.js:
lucide/dist/esm/icons/check.js:
lucide/dist/esm/icons/chevron-right.js:
lucide/dist/esm/icons/circle-question-mark.js:
lucide/dist/esm/icons/cpu.js:
lucide/dist/esm/icons/delete.js:
lucide/dist/esm/icons/droplets.js:
lucide/dist/esm/icons/flame.js:
lucide/dist/esm/icons/hammer.js:
lucide/dist/esm/icons/hand.js:
lucide/dist/esm/icons/lock.js:
lucide/dist/esm/icons/mountain.js:
lucide/dist/esm/icons/orbit.js:
lucide/dist/esm/icons/pause.js:
lucide/dist/esm/icons/play.js:
lucide/dist/esm/icons/radio.js:
lucide/dist/esm/icons/refresh-cw.js:
lucide/dist/esm/icons/rocket.js:
lucide/dist/esm/icons/rotate-ccw.js:
lucide/dist/esm/icons/route.js:
lucide/dist/esm/icons/scan-line.js:
lucide/dist/esm/icons/settings.js:
lucide/dist/esm/icons/shield.js:
lucide/dist/esm/icons/snowflake.js:
lucide/dist/esm/icons/sparkles.js:
lucide/dist/esm/icons/sun.js:
lucide/dist/esm/icons/swords.js:
lucide/dist/esm/icons/target.js:
lucide/dist/esm/icons/tornado.js:
lucide/dist/esm/icons/trophy.js:
lucide/dist/esm/icons/undo-2.js:
lucide/dist/esm/icons/users.js:
lucide/dist/esm/icons/volume-2.js:
lucide/dist/esm/icons/volume-x.js:
lucide/dist/esm/icons/waves.js:
lucide/dist/esm/icons/wind.js:
lucide/dist/esm/icons/x.js:
lucide/dist/esm/icons/zap.js:
lucide/dist/esm/lucide.js:
  (**
   * @license lucide v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
