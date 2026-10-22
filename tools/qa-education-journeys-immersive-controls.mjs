// Focused presentation checks; called by the fixture-backed journey browser harness.
export async function verifyImmersiveControls({page,context,origin,navigate,imageReady,layout,discover,closePanel,loadedModel,modelShot,ok,eq}){
 const settle=()=>page.waitForTimeout(350);
 await navigate();
 await page.getByRole('button',{name:'Start with Origins'}).click();
 await page.waitForFunction(()=>Boolean(document.fullscreenElement));
 eq(await page.evaluate(()=>document.fullscreenElement.tagName),'HTML','Entry expands whole document so HUD and dialogs remain inside fullscreen');
 eq(await page.locator('#fullScreen').getAttribute('aria-pressed'),'true','Fullscreen label tracks real browser state');
 eq(await page.locator('#fullScreen').textContent(),'Window view','Active fullscreen has a clear return control');
 await page.locator('#fullScreen').click();await page.waitForFunction(()=>!document.fullscreenElement);
 eq(await page.locator('#fullScreen').getAttribute('aria-pressed'),'false','Window control exits real fullscreen');
 await page.locator('#fullScreen').click();await page.waitForFunction(()=>Boolean(document.fullscreenElement));
 // Browser-initiated exits also produce fullscreenchange, without using the app toggle.
 await page.evaluate(()=>document.exitFullscreen());await page.waitForFunction(()=>document.querySelector('#fullScreen').getAttribute('aria-pressed')==='false');
 ok(true,'Browser fullscreenchange restores the window label');
 await navigate('#whales/1');await imageReady();
 await page.getByRole('button',{name:'Zoom in',exact:true}).click();await page.locator('#scene').focus();await page.keyboard.press('ArrowRight');
 const transform=await page.locator('#imagePlane').evaluate(e=>e.style.transform);
 const pinAligned=()=>page.evaluate(()=>{const plane=document.querySelector('#imagePlane').getBoundingClientRect();return Math.abs(plane.width/plane.height-1.5)<.001&&[...document.querySelectorAll('.pin')].every(pin=>{const r=pin.getBoundingClientRect();return Math.abs((r.x+r.width/2-plane.x)/plane.width*100-parseFloat(pin.style.left))<.1&&Math.abs((r.y+r.height/2-plane.y)/plane.height*100-parseFloat(pin.style.top))<.1;});});
 ok(await pinAligned(),'Image pins align with the original 3:2 image coordinates');
 await discover();await settle();eq(await page.locator('#imagePlane').evaluate(e=>e.style.transform),transform,'Opening notes retains zoom and pan');ok(await pinAligned(),'Pins remain aligned beside the desktop drawer');
 await closePanel();await settle();eq(await page.locator('#imagePlane').evaluate(e=>e.style.transform),transform,'Closing notes retains zoom and pan');
 eq(await page.evaluate(()=>document.activeElement.classList.contains('discover-button')),true,'Closing notes restores focus to Discover');
 await navigate('#fossil/mammoth');await loadedModel();await settle();
 for(let i=0;i<3;i++)await page.locator('[data-action="3d-right"]').click();await page.locator('[data-action="3d-zoom-in"]').click();
 await page.evaluate(()=>{window.__qaCanvas=document.querySelector('#specimenCanvas');});
 const cameraShot=await modelShot('mammoth','camera-before-notes');
 await discover();await settle();await closePanel();await settle();
 eq(await page.evaluate(()=>window.__qaCanvas===document.querySelector('#specimenCanvas')),true,'Notes retain the same live 3D renderer');
 eq(await modelShot('mammoth','camera-after-notes'),cameraShot,'Notes preserve the exact 3D camera view');
 await page.setViewportSize({width:390,height:844});await navigate('#fossil/mammoth');await loadedModel();
 await page.locator('[data-action="3d-activate"]').click();
 const touchBefore=await modelShot('mammoth','touch-before'),box=await page.locator('#specimenCanvas').boundingBox();
 const cdp=await context.newCDPSession(page),start={x:box.x+box.width*.4,y:box.y+box.height*.5};
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[start]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:start.x+60,y:start.y+15}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await cdp.detach();
 ok(await modelShot('mammoth','touch-after')!==touchBefore,'A real touch drag rotates the 3D specimen');
 for(const [label,viewport]of [['desktop',{width:1440,height:900}],['phone',{width:390,height:844}],['small-phone',{width:320,height:568}],['landscape',{width:844,height:390}]]){
  await page.setViewportSize(viewport);await navigate('#horses/1');await imageReady();await discover();await settle();
  ok(await page.locator('.artwork-note').textContent(),'Artwork limitations remain accessible inside Discover');
  eq(await page.locator('#brightQuestBack').evaluate(e=>e.inert||Boolean(e.closest('[inert]'))),false,`${label}: Exit remains active with notes open`);
  const obscured=await page.evaluate(()=>{const d=document.querySelector('#experiencePanel').getBoundingClientRect();return [...document.querySelectorAll('.experience-controls,.experience-dock,.pin')].filter(e=>{const r=e.getBoundingClientRect();return r.right>d.left+1&&r.left<d.right-1&&r.bottom>d.top+1&&r.top<d.bottom-1;}).every(e=>e.inert);});
  ok(obscured,`${label}: controls covered by notes are removed from keyboard focus`);
  const scroller=page.locator('.panel-scroll');await scroller.evaluate(e=>e.scrollTop=e.scrollHeight);ok(await scroller.evaluate(e=>e.scrollTop>0),`${label}: all details remain reachable by internal scroll`);
  await layout('focused-discover-'+label);
  if(label==='phone'){ok(await page.locator('#imagePlane').evaluate(e=>{const r=e.getBoundingClientRect(),d=document.querySelector('#experiencePanel').getBoundingClientRect();return r.height>100&&r.bottom<=d.top;}),'Phone notes leave a visible animal scene above the sheet');}
  await page.locator('[data-experience-close]').focus();await page.keyboard.press('Escape');eq(await page.locator('#experiencePanel').evaluate(e=>e.hidden),true,`${label}: Escape closes notes`);
  eq(await page.locator('.experience-controls').evaluate(e=>e.inert),false,`${label}: scene controls restore on close`);
 }
 await page.setViewportSize({width:390,height:844});await navigate();await page.locator('[data-experience=library]').filter({hasText:'Choose an animal'}).click();await settle();
 eq(await page.locator('.experience-cover .actions').evaluate(e=>e.inert),true,'Phone family library removes covered cover actions from focus');
 await page.locator('[data-experience-close]').click();
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');await settle();await layout('focused-phone-text-200');
 ok(await page.locator('.hero-copy').evaluate(e=>e.getBoundingClientRect().top>=document.querySelector('.topbar').getBoundingClientRect().bottom-1),'Large-text cover starts below the HUD');
 await page.locator('.hero-copy').evaluate(e=>e.scrollTop=e.scrollHeight);ok(await page.locator('.hero-copy').evaluate(e=>e.scrollTop>0),'Large-text cover keeps all content reachable with internal scroll');
 eq(await page.locator('main').evaluate(e=>e.scrollTop),0,'Large-text fallback does not scroll the main scene');
 await page.evaluate(()=>document.documentElement.style.fontSize='');
 await navigate('#horses/1');await page.evaluate(()=>document.documentElement.style.fontSize='200%');await settle();await discover();await layout('focused-phone-discover-text-200');
 ok(await page.locator('[data-experience-close]').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;}),'Large-text phone notes retain the Close control');
 await closePanel();await page.evaluate(()=>document.documentElement.style.fontSize='');
 const denied=await context.newPage();await denied.addInitScript(()=>{Element.prototype.requestFullscreen=()=>Promise.reject(new DOMException('Denied','NotAllowedError'));});
 await denied.goto(origin+'/education-journeys/#whales/1');await denied.locator('#fullScreen').click();await denied.locator('#experienceToast').waitFor();
 ok((await denied.locator('#experienceToast').textContent()).includes('kept this windowed'),'Denied fullscreen explains the usable window fallback');
 eq(await denied.evaluate(()=>!document.fullscreenElement&&document.documentElement.scrollHeight<=innerHeight+1),true,'Denied fullscreen retains a full viewport scene');await denied.close();
 const unsupported=await context.newPage();await unsupported.addInitScript(()=>{Element.prototype.requestFullscreen=undefined;});
 await unsupported.goto(origin+'/education-journeys/#birds/1');eq(await unsupported.locator('#fullScreen').isVisible(),false,'Unsupported browsers hide the unusable native toggle');
 await unsupported.locator('.discover-button').click();ok(await unsupported.locator('#experiencePanel').isVisible(),'Unsupported browsers retain interactive discovery');await unsupported.close();
 await page.setViewportSize({width:1440,height:900});await navigate('#whales/2');await page.locator('#fullScreen').click();await page.waitForFunction(()=>Boolean(document.fullscreenElement));
 const profile=new URL(page.url()).searchParams.get('profileId');await page.locator('#brightQuestBack').click();await page.waitForURL(url=>url.hash==='#child/learn');
 eq(new URL(page.url()).searchParams.get('profileId'),profile,'Exit preserves the learner identity');eq(await page.evaluate(()=>Boolean(document.fullscreenElement)),false,'Exit leaves real fullscreen');
 eq(new URL(page.url()).hash,'#child/learn','Exit returns to Bright Quest Learn');
}
