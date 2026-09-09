export type PixelPoint = [number,number];
export type PixelRect = [number,number,number,number];
export interface ActorAtlasRow { file:string; rects:PixelRect[]; hands:PixelPoint[]; }
// Measured from the 1254px originals. Rectangles overlap where an extended hand
// shares X coordinates with the next stance's feet; alpha-component routing isolates them.
export const ACTOR_ATLAS: Record<string,ActorAtlasRow> = {
  relay:{file:'roster-a.png',rects:[[39,12,232,383],[327,25,343,370],[661,25,270,375],[965,27,278,373]],hands:[[248,222],[646,105],[866,114],[1218,159]]},
  helio:{file:'roster-a.png',rects:[[41,407,233,415],[324,416,350,405],[664,420,277,401],[958,437,283,384]],hands:[[249,623],[651,514],[859,532],[1213,554]]},
  volt:{file:'roster-a.png',rects:[[40,845,240,388],[324,855,357,380],[661,851,283,386],[959,855,278,382]],hands:[[249,1038],[655,923],[870,944],[1211,970]]},
  bastion:{file:'roster-b.png',rects:[[24,14,263,384],[340,44,370,355],[683,43,258,354],[970,62,266,343]],hands:[[260,227],[686,128],[900,105],[1217,180]]},
  zephyr:{file:'roster-b.png',rects:[[10,413,253,400],[317,422,361,397],[687,460,247,354],[957,457,276,353]],hands:[[243,597],[651,516],[867,543],[1188,538]]},
  glacier:{file:'roster-b.png',rects:[[32,824,250,416],[330,839,360,400],[693,853,239,386],[953,864,282,373]],hands:[[253,1041],[660,940],[885,960],[1202,904]]},
  ember:{file:'roster-c.png',rects:[[38,17,233,379],[338,48,331,348],[669,48,250,348],[950,34,277,369]],hands:[[248,226],[643,113],[877,139],[1197,146]]},
  tidal:{file:'roster-c.png',rects:[[40,418,246,393],[331,441,341,370],[685,444,258,360],[940,437,291,377]],hands:[[258,644],[647,509],[870,547],[1197,517]]},
  atlas:{file:'roster-c.png',rects:[[16,820,281,409],[331,850,346,377],[677,857,266,376],[936,839,304,388]],hands:[[272,1050],[648,916],[867,952],[1209,907]]},
  nova:{file:'roster-d.png',rects:[[45,6,221,391],[335,14,311,377],[673,8,228,389],[967,24,255,373]],hands:[[237,213],[629,98],[840,74],[1204,134]]},
  echo:{file:'roster-d.png',rects:[[37,406,223,399],[317,412,339,386],[673,411,244,392],[975,422,261,387]],hands:[[235,611],[639,487],[859,487],[1211,511]]},
  prism:{file:'roster-d.png',rects:[[16,804,257,433],[299,814,361,424],[663,817,270,422],[962,832,279,407]],hands:[[243,1017],[642,896],[869,913],[1214,933]]},
};
export const WEAPON_RECTS: Record<string,PixelRect> = {
  relay:[13,115,347,189],helio:[386,126,334,158],volt:[750,152,321,132],bastion:[1102,117,332,180],
  zephyr:[15,440,333,140],glacier:[379,433,332,179],ember:[733,437,331,174],tidal:[1091,419,345,197],
  atlas:[11,761,353,155],nova:[382,747,335,168],echo:[744,712,316,223],prism:[1092,740,341,168],
};
export const UPGRADE_RECTS: Record<string,PixelRect> = {
  cells:[44,192,356,277],rockets:[435,33,372,557],rail:[815,64,423,505],
  shield:[41,570,365,649],reactor:[443,639,340,548],siege:[793,741,445,288],
};
// Source-pixel grip and barrel centres, inspected on the actual weapon sheets.
export const WEAPON_SOCKETS: Record<string,{grip:PixelPoint;muzzle:PixelPoint}> = {
  relay:{grip:[110,254],muzzle:[338,211]},helio:{grip:[460,258],muzzle:[714,198]},
  volt:{grip:[844,263],muzzle:[1059,220]},bastion:{grip:[1219,271],muzzle:[1420,213]},
  zephyr:{grip:[101,550],muzzle:[336,520]},glacier:{grip:[453,563],muzzle:[692,523]},
  ember:{grip:[813,558],muzzle:[1050,512]},tidal:{grip:[1174,558],muzzle:[1420,497]},
  atlas:{grip:[105,875],muzzle:[350,834]},nova:{grip:[464,881],muzzle:[692,829]},
  echo:{grip:[829,879],muzzle:[1028,831]},prism:{grip:[1193,872],muzzle:[1415,806]},
  siege:{grip:[872,947],muzzle:[1208,870]},
};
