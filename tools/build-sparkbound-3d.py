"""Original Sparkbound rigid armour library; Blender 4.5 LTS, no third-party assets.

blender --background --python tools/build-sparkbound-3d.py -- --preview
python tools/build-sparkbound-3d.py --self-test

All design coordinates are THREE metres: X right, Y up, Z forward. Only mesh
vertices are converted to Blender (x, -z, y). Sockets are identity; muzzle child
empties have the sole intentional translation offsets.
"""

from __future__ import annotations

import argparse
from collections import defaultdict
from dataclasses import dataclass, field
import hashlib
import gzip
import json
import math
from pathlib import Path
import struct
import sys


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "sparkbound/assets/mechs/guardian-library.glb"
BODY = ("Head", "Chest", "Torso", "UpperArmL", "UpperArmR", "LowerArmL",
        "LowerArmR", "UpperLegL", "UpperLegR", "LowerLegL", "LowerLegR",
        "FootL", "FootR", "HandL", "HandR")
SLOTS = BODY + tuple(f"Weapon{i}" for i in range(1, 6)) + ("Back3", "Back4", "Back5", "Shield")
MATERIALS = {
    "Main": ((.30, .40, .47, 1), .65, .31),
    "Accent": ((.93, .52, .12, 1), .5, .27),
    "Grey": ((.13, .17, .20, 1), .78, .36),
    "LightGrey": ((.65, .72, .75, 1), .72, .27),
    "Black": ((.022, .032, .041, 1), .3, .49),
    "Eye": ((.18, .90, 1, 1), .18, .22),
    "Glass": ((.06, .29, .38, 1), .6, .17),
}


@dataclass(frozen=True)
class Design:
    id: str
    family: str
    width: float
    power: float
    shoulders: str
    face: str
    weapon: str
    description: str


DESIGNS = (
    Design("relay", "vanguard", 1.0, .65, "layered", "brow", "pulse",
           "Layered chevron cuirass, split brow, three-lobe pauldrons, twin pulse bores."),
    Design("helio", "optical", .90, .9, "petal", "lens", "lens",
           "Solar lens breastplate, petal mantles, central optic and open focusing rails."),
    Design("volt", "electrical", .91, .8, "coil", "split", "fork",
           "Forked antennae, exposed insulated coils, split chest and electrode prongs."),
    Design("bastion", "fortress", 1.17, .43, "bulwark", "slit", "mortar",
           "Broad fortress gorget, low recessed visor, deep layered shields and recoil mortar."),
    Design("zephyr", "aerodynamic", .79, 1.1, "wing", "swept", "repeater",
           "Swept winglets, narrow teardrop torso, swept visor, three-barrel ion turbine."),
    Design("glacier", "cryogenic", 1.03, .58, "crystal", "split", "cryo",
           "Faceted icebreaker armour, crown cooling fins, hexagonal cryogenic jackets."),
    Design("ember", "thermal", .97, .85, "chimney", "brow", "flame",
           "Flared heat shields, chimney pauldrons, respirator face and perforated twin jets."),
    Design("tidal", "hydraulic", 1.02, 1.0, "tank", "port", "hydro",
           "Rounded pressure carapace, circular porthole face, reservoirs and tapered hydrojet."),
    Design("atlas", "seismic", 1.22, .46, "piston", "slit", "ram",
           "Low wedge helmet, load-bearing piston shoulders, tracked sabatons, impact ram."),
    Design("nova", "reactor", .94, .95, "orbit", "lens", "plasma",
           "Circular reactor heart, orbital pauldrons, halo crown and magnetic accelerator."),
    Design("echo", "acoustic", .90, .9, "dish", "split", "sonic",
           "Resonator ears, concentric chest diaphragm, sound dishes and flared acoustic horn."),
    Design("prism", "rival", 1.07, .48, "prism", "diamond", "prism",
           "Diamond-cut mask, split crystal crest, angular mantles and evolving training arsenal."),
)


def add(a, b):
    return tuple(x + y for x, y in zip(a, b))


def mul(v, f):
    return tuple(x * f for x in v)


def cross(a, b):
    return (a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0])


def unit(v):
    length = math.sqrt(sum(x*x for x in v))
    if length < 1e-10:
        raise ValueError("Zero-length mechanical axis")
    return mul(v, 1 / length)


def frame(axis):
    w = unit(axis)
    u = unit(cross((0, 1, 0) if abs(w[1]) < .95 else (0, 0, 1), w))
    return u, cross(w, u), w


@dataclass
class Geometry:
    vertices: list = field(default_factory=list)
    faces: list = field(default_factory=list)
    smooth: list = field(default_factory=list)

    def append(self, vertices, faces, smooth=False):
        offset = len(self.vertices)
        self.vertices.extend(vertices)
        self.faces.extend(tuple(offset + i for i in face) for face in faces)
        self.smooth.extend([smooth] * len(faces))

    @property
    def triangles(self):
        return sum(len(face)-2 for face in self.faces)


class Slot:
    def __init__(self, name):
        self.name = name
        self.bins = defaultdict(Geometry)
        self.markers = {}

    def mesh(self, material, vertices, faces, smooth=False):
        assert material in MATERIALS
        self.bins[material].append(vertices, faces, smooth)

    def rings(self, material, rings, cap=True, smooth=False):
        count = len(rings[0])
        assert all(len(r) == count for r in rings)
        vertices = [p for ring in rings for p in ring]
        faces = []
        for j in range(len(rings)-1):
            for i in range(count):
                k = (i+1) % count
                faces.append((j*count+i, j*count+k, (j+1)*count+k, (j+1)*count+i))
        if cap:
            faces.extend((tuple(reversed(range(count))),
                          tuple((len(rings)-1)*count+i for i in range(count))))
        self.mesh(material, vertices, faces, smooth)

    def loft(self, material, sections, center=(0, 0, 0), axis="y", n=16, power=.75):
        """(station, half-width, half-depth, transverse offset) shell sections."""
        rings = []
        for section in sections:
            distance, rx, rz = section[:3]
            shift = section[3] if len(section) > 3 else 0
            ring = []
            for i in range(n):
                a = 2*math.pi*i/n
                x = rx*math.copysign(abs(math.cos(a))**power, math.cos(a))
                z = rz*math.copysign(abs(math.sin(a))**power, math.sin(a))
                p = (x, distance, z+shift) if axis == "y" else (x, z+shift, distance)
                ring.append(add(center, p))
            rings.append(ring)
        self.rings(material, rings)

    def panel(self, material, outline, z, depth=.075, bevel=.025):
        """Closed inset-bevel polygon, drawn in the THREE XY plane."""
        cx = sum(p[0] for p in outline)/len(outline)
        cy = sum(p[1] for p in outline)/len(outline)
        radius = max(math.hypot(x-cx, y-cy) for x, y in outline)
        factor = max(.55, 1-bevel/max(radius, .001))
        inner = [(cx+(x-cx)*factor, cy+(y-cy)*factor) for x, y in outline]
        self.rings(material, [[(x, y, zz) for x, y in points] for points, zz in (
            (inner, z-depth/2), (outline, z-depth/2+bevel/2),
            (outline, z+depth/2-bevel/2), (inner, z+depth/2))])

    def rod(self, material, a, b, radius, end=None, n=10):
        u, v, w = frame(tuple(b[i]-a[i] for i in range(3)))
        length = math.dist(a, b)
        end = radius if end is None else end
        edge = min(.018, length*.12, radius*.2)
        rings = []
        for distance, r in ((0, radius*.86), (edge, radius),
                            (length-edge, end), (length, end*.86)):
            c = add(a, mul(w, distance))
            rings.append([add(c, add(mul(u, r*math.cos(i*math.tau/n)),
                                     mul(v, r*math.sin(i*math.tau/n)))) for i in range(n)])
        self.rings(material, rings, smooth=False)

    def tube(self, material, a, b, radius, wall=.035, end=None, n=12):
        """Real open bore with wall thickness and an annular muzzle, never a painted disc."""
        u, v, w = frame(tuple(b[i]-a[i] for i in range(3)))
        end = radius if end is None else end
        rings = []
        for c, r in ((a, radius), (b, end), (b, max(.01, end-wall)),
                     (a, max(.01, radius-wall)), (a, radius)):
            rings.append([add(c, add(mul(u, r*math.cos(i*math.tau/n)),
                                     mul(v, r*math.sin(i*math.tau/n)))) for i in range(n)])
        self.rings(material, rings, cap=False)

    def torus(self, material, center, radius, minor=.025, axis=(0, 0, 1), n=14, m=5):
        u, v, w = frame(axis)
        vertices = []
        for i in range(n):
            radial = add(mul(u, math.cos(math.tau*i/n)), mul(v, math.sin(math.tau*i/n)))
            for j in range(m):
                angle = math.tau*j/m
                vertices.append(add(center, add(mul(radial, radius+minor*math.cos(angle)),
                                                mul(w, minor*math.sin(angle)))))
        self.mesh(material, vertices, [(i*m+j, ((i+1)%n)*m+j,
                                       ((i+1)%n)*m+(j+1)%m, i*m+(j+1)%m)
                                      for i in range(n) for j in range(m)], True)

    def oval(self, material, center, scale, n=12):
        sections = [(y*scale[1], r*scale[0], r*scale[2]) for y, r in (
            (-1, .12), (-.80, .59), (-.35, .94), (.35, .94), (.8, .59), (1, .12))]
        self.loft(material, sections, center, n=n, power=1)

    def vent(self, center, width=.20, height=.16, count=4):
        x, y, z = center
        self.panel("Black", [(x-width/2,y-height/2), (x+width/2,y-height/2),
                              (x+width/2,y+height/2), (x-width/2,y+height/2)], z, .025, .006)
        for i in range(count):
            yy = y-height*.38 + height*.76*i/max(1, count-1)
            self.rod("LightGrey", (x-width*.43, yy, z+.018),
                     (x+width*.43, yy, z+.018), .009, n=6)

    def piston(self, a, b, radius=.055):
        mid = tuple(a[i]+(b[i]-a[i])*.60 for i in range(3))
        self.rod("Grey", a, mid, radius, n=8)
        self.rod("LightGrey", mid, b, radius*.53, n=8)
        for p in (a, b):
            self.rod("Accent", add(p, (-.04,0,0)), add(p, (.04,0,0)), radius*1.3, n=8)


def plate_shape(cx, cy, w, h, taper=.65):
    return [(cx-w*.5,cy+h*.22), (cx-w*.32,cy+h*.5), (cx+w*.32,cy+h*.5),
            (cx+w*.5,cy+h*.22), (cx+w*taper*.5,cy-h*.40),
            (cx,cy-h*.5), (cx-w*taper*.5,cy-h*.40)]


def helmet(s, d):
    w = .32 * (1.08 if d.id in ("bastion", "atlas") else .94 if d.id == "zephyr" else 1)
    s.loft("Main", [(-.12,w*.62,.19), (-.035,w,.26), (.26,w,.28,.018),
                    (.40,w*.78,.22), (.45,w*.40,.12)], (0,0,.075),
           n=12 if d.id == "prism" else 20, power=d.power)
    s.panel("Black", [(-w*.88,.27), (w*.88,.27), (w*.77,.045),
                       (0,-.015), (-w*.77,.045)], .344, .045)
    # Brow, cheekbones, jaw and inset optics make a readable mechanical face.
    for sign in (-1, 1):
        s.panel("LightGrey", [(sign*.05,.0), (sign*w*.77,.08),
                              (sign*w*.90,-.055), (sign*.08,-.12)], .33, .072)
        s.rod("Grey", (sign*w,.06,.13), (sign*w,.06,.27), .072, n=10)
        s.rod("Black",(sign*w*.78,.31,.27),(sign*w*.77,.405,.19),.009,n=6)
        s.rod("LightGrey",(sign*w*.78,.31,.283),(sign*w*.78,.31,.302),.022,n=8)
    s.panel("Grey", [(-.08,.05), (0,.19), (.08,.05), (.06,-.07),(-.06,-.07)], .375, .04)
    if d.face in ("lens", "port"):
        r = .125 if d.face == "port" else .105
        s.torus("LightGrey", (0,.19,.385), r, .032)
        s.rod("Glass", (0,.19,.36), (0,.19,.396), r*.81, n=16)
        s.rod("Eye", (0,.19,.395), (0,.19,.407), r*.45, n=12)
    elif d.face == "diamond":
        s.panel("Eye", [(0,.32),(.13,.19),(0,.06),(-.13,.19)], .383, .022, .008)
    else:
        for sign in (-1, 1):
            inner, outer = (.025, w*.78)
            yy = .21 if d.face == "swept" else .18
            s.panel("Eye", [(sign*inner,.155),(sign*outer,yy),
                             (sign*outer,.125),(sign*inner,.12)], .383, .022, .006)
        s.panel("Accent", [(-w*.90,.31),(0,.25),(w*.9,.31),
                            (w*.82,.255),(0,.207),(-w*.82,.255)], .389, .040, .01)
    if d.id in ("volt", "prism", "glacier"):
        for sign in (-1, 1):
            s.panel("Accent", [(sign*.12,.37),(sign*.19,.65),
                                (sign*.29,.46),(sign*.23,.23)], .02, .13)
    elif d.id == "zephyr":
        for sign in (-1, 1):
            s.panel("Accent", [(sign*.20,.29),(sign*.40,.49),
                                (sign*.36,.08),(sign*.23,.03)], -.04, .13)
    elif d.id == "echo":
        for sign in (-1, 1):
            s.tube("Grey", (sign*.29,.18,.10),(sign*.41,.18,.10),.16,.045,n=12)
            s.torus("Accent", (sign*.415,.18,.10),.11,.018,axis=(1,0,0))
    elif d.id == "nova":
        s.torus("Accent", (0,.24,-.12), .37, .029, n=18)
    elif d.id in ("ember", "relay"):
        s.vent((0,-.038,.401), .12, .09, 3)
        s.panel("Accent", [(-.075,.32),(0,.53),(.075,.32),(0,.27)], -.01, .22)
    elif d.id == "atlas":
        s.panel("LightGrey", [(-.30,.36),(.30,.36),(.25,.27),(-.25,.27)], .35, .08)


def core(s, d, torso=False):
    w = d.width
    if torso:
        s.loft("Black", [(-.27,.24,.21),(-.19,.34,.28),(.18,.32,.28),(.25,.24,.23)])
        for y in (-.15,-.015,.12):
            s.panel("Grey", plate_shape(0,y,.63*w,.18), .29, .085)
            s.panel("Main", plate_shape(0,y,.42*w,.14), .349, .043)
        for sign in (-1,1):
            s.piston((sign*.26,-.2,.13),(sign*.31,.2,.16),.046)
        return
    s.loft("Grey", [(-.43,.31*w,.25),(-.25,.49*w,.34),(.15,.57*w,.36),
                    (.37,.46*w,.29),(.43,.26*w,.23)], n=16, power=d.power)
    if d.id in ("tidal","nova","echo","helio"):
        s.loft("Main", [(-.36,.27*w,.19),(-.18,.50*w,.25),(.16,.55*w,.25),
                        (.32,.40*w,.20)], (0,0,.16), n=20, power=d.power)
        r = .235 if d.id in ("nova","echo") else .20
        s.torus("LightGrey", (0,.035,.449),r,.042,n=16)
        s.rod("Black", (0,.035,.404),(0,.035,.457),r*.81,n=16)
        s.torus("Accent",(0,.035,.467),r*.67,.019,n=14)
        s.rod("Eye" if d.id != "echo" else "Glass",(0,.035,.456),(0,.035,.473),r*.46,n=12)
        if d.id == "echo":
            s.torus("Grey",(0,.035,.48),r*.36,.018,n=12)
    else:
        for sign in (-1,1):
            # Separate armour leaves expose an actual narrow gasket channel.
            s.panel("Main", [(sign*.025,.25),(sign*.38*w,.35),(sign*.60*w,.16),
                              (sign*.552*w,.015),(sign*.048,-.073)], .34, .18, .035)
            s.panel("Main", [(sign*.049,-.092),(sign*.545*w,-.005),
                              (sign*.47*w,-.21),(sign*.05,-.32)], .332, .17, .025)
            s.rod("Black",(sign*.075,-.092,.357),(sign*.515*w,-.011,.357),.012,n=6)
            s.panel("Accent", [(sign*.075,.22),(sign*.40*w,.28),(sign*.48*w,.17),
                                (sign*.11,.08)], .451, .042, .015)
            for x,y in ((.48*w,.12),(.12,-.22)):
                s.rod("Grey",(sign*x,y,.423),(sign*x,y,.444),.024,n=8)
                s.rod("Black",(sign*x,y,.444),(sign*x,y,.448),.009,n=6)
        s.panel("LightGrey", [(0,.28),(.12,.09),(0,-.17),(-.12,.09)], .476,.05)
        s.panel("Eye", [(0,.19),(.054,.08),(0,-.065),(-.054,.08)], .511,.018,.005)
    for sign in (-1,1):
        s.vent((sign*.37*w,-.23,.37), .16, .14,3)
        s.piston((sign*.37*w,-.32,-.22),(sign*.46*w,.17,-.23))
        s.rod("Grey",(sign*.19,.33,-.06),(sign*.19,.43,-.06),.10,n=10)
    if d.id in ("bastion","atlas"):
        s.panel("LightGrey",[(-.62*w,.23),(-.42*w,.44),(.42*w,.44),(.62*w,.23),
                              (.4*w,.17),(-.4*w,.17)],.28,.20,.035)
    elif d.id == "glacier":
        for x in (-.35,0,.35):
            s.panel("LightGrey",[(x-.075,.29),(x,.54),(x+.075,.29),(x,.17)],-.21,.18)
    elif d.id == "volt":
        for sign in (-1,1):
            for y in (-.18,-.07,.04,.15):
                s.torus("Accent",(sign*.46,y,.10),.13,.023,axis=(0,1,0),n=10)
    elif d.id == "zephyr":
        for sign in (-1,1):
            s.panel("Accent",[(sign*.15,.29),(sign*.66,.28),
                                (sign*.37,-.04),(sign*.19,.01)],.21,.085)


def shoulder(s, d, sign):
    w = .28*d.width
    s.rod("Black",(-.19,0,0),(.19,0,0),.185,n=12)
    s.loft("Main", [(-.43,w*.62,.18),(-.24,w*.85,.24),(.02,w*1.16,.30),
                    (.20,w*.94,.22),(.24,w*.50,.13)], (sign*.06,0,0), n=20,power=d.power)
    s.rod("Grey",(sign*w*.95,-.01,0),(sign*(w+.065),-.01,0),.16,n=12)
    s.rod("Accent",(sign*(w+.062),-.01,0),(sign*(w+.073),-.01,0),.09,n=10)
    style = d.shoulders
    if style in ("layered","bulwark","prism","crystal"):
        for i in range(3):
            x = sign*(.035+i*.045)
            y = .10-i*.125
            s.panel("Accent" if i == 0 else "Main",plate_shape(x,y,w*1.95,.24,
                    .28 if style in ("prism","crystal") else .8),.255+i*.018,.08)
        if style == "bulwark":
            s.panel("LightGrey",plate_shape(sign*.10,-.07,.55,.61,.85),.30,.10)
        if style == "crystal":
            s.panel("LightGrey",[(sign*.12,.1),(sign*.23,.47),
                                 (sign*.40,.24),(sign*.28,-.04)],-.04,.18)
    elif style in ("petal","wing"):
        for i in range(2):
            extent = .68 if style == "wing" else .49
            s.panel("Main" if i else "Accent",[(sign*.08,.13-i*.10),
                     (sign*extent,.40-i*.13),(sign*(extent-.08),.11-i*.12),
                     (sign*.17,-.24-i*.08)], .07-i*.19,.095)
    elif style == "coil":
        s.rod("Black",(sign*.22,-.25,-.07),(sign*.22,.27,-.07),.13)
        for y in (-.18,-.07,.04,.15,.25):
            s.torus("Accent",(sign*.22,y,-.07),.15,.025,axis=(0,1,0),n=12)
        s.rod("LightGrey",(sign*.22,.25,-.07),(sign*.31,.47,-.07),.04)
    elif style in ("chimney","tank"):
        x = sign*.24
        s.loft("Grey",[(-.30,.12,.13),(-.22,.17,.16),(.22,.17,.16),(.33,.11,.10)],(x,0,-.19))
        if style == "chimney":
            s.tube("LightGrey",(x,.23,-.19),(x,.44,-.19),.105,.025,n=10)
            s.vent((x,-.04,.005),.15,.25,4)
        else:
            for y in (-.18,.14):
                s.torus("Accent",(x,y,-.19),.168,.018,axis=(0,1,0),n=12)
    elif style == "piston":
        for z in (-.19,.20):
            s.piston((sign*.29,-.27,z),(sign*.39,.32,z),.080)
        s.panel("LightGrey",plate_shape(sign*.17,.14,.56,.27),.29,.14)
    elif style == "orbit":
        s.torus("Accent",(sign*.18,.09,.01),.33,.033,axis=(sign*.25,.5,1),n=16)
        s.oval("Main",(sign*.16,.05,.04),(.29,.27,.24))
    elif style == "dish":
        s.tube("Main",(sign*.2,.05,.16),(sign*.2,.05,.34),.12,.035,end=.23,n=14)
        s.rod("Black",(sign*.2,.05,.19),(sign*.2,.05,.22),.105)
        s.torus("Accent",(sign*.2,.05,.34),.20,.018,n=14)


def limb(s, d, slot, sign):
    upper = slot.startswith("Upper")
    leg = "Leg" in slot
    length = .66 if leg and not upper else .55 if leg else .48
    width = (.235 if leg else .205) * d.width
    cy = -length*.49
    s.rod("Black",(-width*.70,0,0),(width*.70,0,0),width*.73,n=12)
    s.loft("Grey",[(-length,width*.59,.145),(-length+.06,width*.82,.185),
                    (-.16,width,.20),(-.035,width*.65,.15)],power=d.power)
    s.panel("Main",plate_shape(0,cy,width*1.9,length*.91,.52),.18,.14,.032)
    for edge in (-1,1):
        s.rod("Grey",(edge*width*.58,cy+.12,.251),(edge*width*.42,cy-.14,.251),.007,n=6)
        s.rod("LightGrey",(edge*width*.59,cy+.115,.252),(edge*width*.59,cy+.115,.266),.017,n=8)
    s.panel("Accent",plate_shape(sign*width*.28,cy+.035,width*.31,length*.59,.55),.269,.035,.008)
    s.piston((sign*width*.80,-.09,-.115),(sign*width*.68,-length+.035,-.12),.04)
    s.rod("LightGrey",(-width*.7,-length,0),(width*.7,-length,0),.09,n=10)
    if leg and not upper:
        s.panel("LightGrey",plate_shape(0,-.065,width*1.6,.24),.255,.095,.025)
        s.vent((0,-length+.17,.270),width*1.0,.125,3)
    elif not leg:
        s.vent((0,cy-.045,.268),width*.9,.12,3)
    if d.id in ("bastion","atlas"):
        for y in (cy-.11,cy+.065):
            s.panel("LightGrey",plate_shape(0,y,width*1.9,.115),.286,.045,.015)
    elif d.id in ("zephyr","glacier","prism"):
        s.panel("Main",[(sign*width*.65,-.1),(sign*(width+.14),.04),
                         (sign*(width+.06),-length*.67),(sign*width*.60,-length*.75)],-.05,.10)
    elif d.id in ("tidal","ember"):
        s.rod("Accent",(sign*width,-.09,.04),(sign*width,-length+.10,.04),.041,n=8)


def foot(s, d):
    w = .23*(1.16 if d.id in ("atlas","bastion") else .85 if d.id == "zephyr" else 1)
    s.loft("Black",[(-.19,w*.73,.10),(-.10,w,.13),(.47,w,.13),(.60,w*.75,.09)],
           (0,-.06,0),axis="z",power=.5)
    s.loft("Main",[(-.16,w*.68,.085),(-.06,w*.94,.14),(.31,w*.96,.13),
                    (.55,w*.65,.065)],(0,.08,0),axis="z",power=d.power)
    s.rod("Grey",(-.12,.12,-.045),(.12,.12,-.045),.09,n=10)
    for z in (.22,.36,.48):
        s.loft("LightGrey",[(z,w*.93,.037),(z+.035,w*.86,.03)],(0,.17,0),axis="z",n=8,power=.5)
    for sign in (-1,1):
        for z in (-.06,.07,.2,.33,.46):
            s.rod("Grey",(sign*w,-.07,z),(sign*(w+.024),-.07,z),.047,n=6)
    if d.id == "atlas":
        for sign in (-1,1):
            for z in (-.09,.04,.17,.30,.43,.55):
                s.rod("LightGrey",(sign*w,-.10,z),(sign*(w+.067),-.10,z),.055,n=6)


def hand(s, d, sign):
    w = .18*d.width
    s.loft("Black",[(-.18,w*.76,.10),(-.10,w,.14),(.12,w*.87,.11),(.17,w*.66,.08)])
    s.panel("Main",plate_shape(0,.025,w*1.9,.27,.85),.135,.08)
    for i in range(4):
        x = (i-1.5)*w*.46
        s.rod("LightGrey",(x-.034,-.10,.13),(x+.034,-.10,.13),.059,n=8)
        s.loft("Main",[(-.235,.033,.032),(-.21,.043,.059),(-.11,.044,.060),(-.07,.03,.034)],(x,0,.13),n=8,power=.5)
        s.rod("Grey",(x-.026,-.20,.09),(x+.026,-.20,.09),.044,n=8)
        s.panel("Accent",plate_shape(x,-.103,.050,.055),.2,.018,.004)
    s.rod("Grey",(sign*w,.04,.035),(sign*(w+.04),-.08,.15),.065,n=8)
    s.rod("Main",(sign*(w+.04),-.08,.15),(sign*(w-.025),-.16,.19),.068,n=8)


def shield(s, d):
    w = .73 * (1.10 if d.id in ("bastion","atlas") else .86 if d.id == "zephyr" else 1)
    outline = plate_shape(0,-.21,w,.92,.54 if d.id not in ("tidal","nova") else .82)
    s.panel("Grey",outline,.04,.17,.045)
    s.panel("Main",plate_shape(0,-.20,w*.86,.80,.51),.15,.09,.035)
    s.panel("Accent",[(0,.10),(.065,-.06),(.04,-.49),(0,-.59),(-.04,-.49),(-.065,-.06)],.22,.035,.01)
    for sign in (-1,1):
        s.panel("LightGrey",[(sign*.19,.02),(sign*w*.43,-.07),
                              (sign*w*.27,-.40),(sign*.14,-.38)],.209,.045)
        s.rod("Grey",(sign*.12,-.12,-.06),(sign*.12,-.33,-.06),.055,n=8)
    if d.id in ("helio","nova","echo","tidal"):
        s.torus("LightGrey",(0,-.18,.24),.16,.02,n=12)
        s.rod("Glass",(0,-.18,.22),(0,-.18,.242),.12,n=12)


def barrel(s, x, y, start, length, radius, material="Grey", flare=1):
    end = start+length
    s.tube(material,(x,y,start),(x,y,end),radius,.028,end=radius*flare,n=12)
    s.tube("LightGrey",(x,y,end-.075),(x,y,end+.015),radius*flare+.025,.034,n=12)
    s.rod("Black",(x,y,start+.005),(x,y,start+.025),max(.025,radius-.035),n=12)
    s.torus("Accent",(x,y,start+length*.33),radius+.01,.015,n=12)


def muzzle(s, d, stage, y=.27):
    tip = max(v[2] for geometry in s.bins.values() for v in geometry.vertices)
    s.markers[f"{d.id}__Muzzle{stage}"] = (0,y,tip)


def battery_gun(s, d):
    """Stage 3 is a triangular three-cell battery, with three discrete launch mouths."""
    cells = ((-.22,.24),(.22,.24),(0,.62))
    length = 1.44
    # Tri-lobe bulkhead, not a rectangular receiver with barrels stuck on it.
    outline = [(-.40,.13),(-.38,.38),(-.16,.78),(.16,.78),(.38,.38),(.40,.13),
               (.24,.02),(-.24,.02)]
    s.panel("Grey",outline,.02,.30,.06)
    s.panel("Main",[(x*.94,.38+(y-.38)*.94) for x,y in outline],.25,.18,.04)
    for index,(x,y) in enumerate(cells):
        front = length + (.04 if index == 2 else 0)
        s.loft("Main",[(.22,.14,.14),(.34,.20,.20),(.99,.195,.195),
                        (front-.12,.166,.166)],(x,y,0),axis="z",n=16,power=d.power)
        s.tube("LightGrey",(x,y,front-.15),(x,y,front),.174,.034,n=16)
        s.tube("Black",(x,y,front-.33),(x,y,front-.02),.137,.016,n=16)
        s.rod("Black",(x,y,front-.36),(x,y,front-.34),.125,n=12)
        if d.id == "helio":
            s.rod("Glass",(x,y,front-.08),(x,y,front-.055),.12,n=16)
            s.torus("Eye",(x,y,front-.055),.070,.012,n=14)
        elif d.id in ("volt","nova"):
            for z in (.50,.70,.90):
                s.torus("Accent",(x,y,z),.20,.019,n=12)
            s.rod("Eye",(x,y,front-.18),(x,y,front-.07),.044,n=10)
        elif d.id == "echo":
            s.tube("Grey",(x,y,front-.28),(x,y,front-.005),.064,.02,end=.132,n=14)
            s.torus("Accent",(x,y,front),.145,.017,n=14)
        elif d.id == "tidal":
            s.rod("Glass",(x,y,front-.23),(x,y,front-.10),.090,end=.04,n=12)
            s.torus("Accent",(x,y,.66),.205,.02,n=12)
        else:
            s.rod("Grey",(x,y,front-.29),(x,y,front-.13),.087,n=12)
            s.rod("Accent",(x,y,front-.13),(x,y,front-.025),.087,end=.013,n=12)
        s.rod("Grey",(x-.08,y+.151,.46),(x-.08,y+.151,.88),.014,n=6)
        s.rod("LightGrey",(x+.08,y+.151,.46),(x+.08,y+.151,.88),.014,n=6)
    for sign in (-1,1):
        s.panel("Accent",[(sign*.20,.29),(sign*.47,.39),(sign*.44,.10),
                            (sign*.24,.07)],.52,.30,.025)
        s.piston((sign*.30,.07,.13),(sign*.30,.07,.75),.049)
    s.rod("Grey",(0,-.12,.15),(0,-.12,.44),.025,n=8)
    s.rod("Grey",(0,-.12,.44),(0,.13,.44),.025,n=8)
    muzzle(s,d,3,.34)


def rail_gun(s, d):
    """Stage 4 has a long daylight gap between independently braced split rails."""
    length = 1.98
    s.loft("Grey",[(-.17,.14,.17),(-.03,.25,.23),(.40,.26,.24),
                    (.62,.18,.19)],(0,.28,0),axis="z",n=16,power=d.power)
    for sign in (-1,1):
        x = sign*.285
        s.loft("Main",[(.27,.11,.15),(.44,.145,.20),(1.68,.112,.155),
                        (length,.073,.105)],(x,.31,0),axis="z",n=12,power=.62)
        s.loft("LightGrey",[(.53,.033,.05),(.67,.041,.067),(1.88,.035,.05),
                             (2.01,.024,.035)],(sign*.188,.31,0),axis="z",n=8,power=.5)
        s.rod("Eye",(sign*.156,.31,.66),(sign*.156,.31,1.94),.017,n=8)
        s.piston((sign*.33,.16,.15),(sign*.33,.16,1.02),.049)
        for z in (.65,.89,1.13,1.37):
            s.panel("LightGrey",[(x-sign*.07,.40),(x+sign*.15,.49),
                                  (x+sign*.17,.12),(x-sign*.07,.20)],z,.032,.007)
        s.panel("Accent",[(x-sign*.05,.44),(x+sign*.14,.65),
                            (x+sign*.17,.10),(x-sign*.035,.16)],.39,.21,.025)
        if d.id in ("volt","nova"):
            for z in (.73,.97,1.21):
                s.torus("Accent",(x,.31,z),.15,.025,n=12)
        elif d.id in ("ember","tidal"):
            s.rod("Accent",(sign*.36,.29,.48),(sign*.36,.29,1.62),.025,n=8)
        elif d.id in ("zephyr","helio"):
            s.panel("Main",[(x,.32),(sign*.48,.58),(sign*.45,.23),
                              (x,.12)],.61,.16,.025)
    s.torus("Grey",(0,.31,.51),.19,.04,n=16)
    s.rod("Glass",(0,.31,.485),(0,.31,.535),.13,n=14)
    s.rod("Eye",(0,.31,.535),(0,.31,.55),.052,n=12)
    s.rod("Grey",(0,.55,.05),(0,.55,.51),.07,n=10)
    s.rod("Glass",(0,.55,.51),(0,.55,.54),.048,n=12)
    s.rod("Grey",(0,-.12,.12),(0,-.12,.42),.025,n=8)
    s.rod("Grey",(0,-.12,.42),(0,.15,.42),.025,n=8)
    muzzle(s,d,4,.31)


def siege_gun(s, d):
    """Stage 5 is an integrated broad siege chassis, with a hero-specific main array."""
    cy, end = .35, 2.02
    s.loft("Grey",[(-.23,.17,.19),(-.11,.34,.32),(.24,.42,.38),
                    (.86,.43,.36),(1.10,.34,.28)],(0,cy,0),axis="z",n=16,power=.6)
    for sign in (-1,1):
        # Split wraparound carapace leaves a gasket seam over the loaded receiver.
        s.loft("Main",[(.03,.12,.27),(.20,.15,.34),(.99,.14,.30),
                        (1.33,.085,.21)],(sign*.30,cy,0),axis="z",n=16,power=d.power)
        s.panel("LightGrey",[(sign*.20,.56),(sign*.35,.74),(sign*.47,.58),
                              (sign*.40,.21),(sign*.24,.20)],.24,.24,.035)
        s.panel("Accent",[(sign*.29,.59),(sign*.41,.57),(sign*.38,.28),
                            (sign*.30,.30)],.386,.047,.012)
        s.piston((sign*.38,.08,.02),(sign*.38,.08,1.25),.06)
        for z in (.53,.68,.83):
            s.rod("Black",(sign*.448,.25,z),(sign*.448,.51,z),.017,n=6)
        s.rod("LightGrey",(sign*.43,.16,.15),(sign*.43,.16,.88),.021,n=8)
    if d.id in ("relay","ember"):
        for x in (-.195,.195):
            barrel(s,x,cy,.79,end-.795,.173,"Grey",1.03 if d.id == "relay" else 1.13)
            s.tube("Main",(x,cy,1.01),(x,cy,1.42),.216,.035,n=16)
            for z in (1.11,1.27,1.43):
                s.torus("LightGrey",(x,cy,z),.216,.018,n=12)
            if d.id == "ember":
                s.rod("Accent",(x,.12,1.69),(x,.12,2.035),.032,n=10)
    elif d.id in ("bastion","atlas","glacier","tidal"):
        barrel(s,0,cy,.73,end-.745,.292,"Grey",1.04 if d.id != "tidal" else .71)
        for z in (1.13,1.42,1.70):
            s.tube("Main",(0,cy,z),(0,cy,z+.075),.342,.04,n=16 if d.id == "tidal" else 12)
        if d.id == "atlas":
            for sign in (-1,1):
                s.piston((sign*.33,cy,.76),(sign*.33,cy,1.94),.063)
        elif d.id == "glacier":
            for z in (1.13,1.31,1.49,1.67):
                for sign in (-1,1):
                    s.panel("LightGrey",[(sign*.21,.50),(sign*.35,.67),
                                          (sign*.38,.14),(sign*.21,.21)],z,.029,.006)
        elif d.id == "tidal":
            for sign in (-1,1):
                s.rod("Accent",(sign*.36,.46,.61),(sign*.30,.46,1.61),.03,n=10)
    elif d.id == "zephyr":
        for i in range(6):
            a = i*math.tau/6
            barrel(s,.23*math.cos(a),cy+.23*math.sin(a),.73,1.29,.092)
        for z in (.91,1.76):
            s.torus("Main",(0,cy,z),.346,.047,n=18)
        s.torus("Accent",(0,cy,1.8),.35,.015,n=18)
    elif d.id in ("helio","nova","prism"):
        s.tube("Grey",(0,cy,.74),(0,cy,1.64),.21,.028,end=.32,n=20)
        for i,z in enumerate((1.02,1.24,1.46,1.68,1.91)):
            radius = .265+i*.027
            s.torus("Main",(0,cy,z),radius,.037,n=20)
            s.torus("Eye",(0,cy,z+.018),radius-.038,.009,n=20)
        for a in (0,math.tau/3,math.tau*2/3):
            x,y = .30*math.cos(a),cy+.30*math.sin(a)
            s.rod("LightGrey",(x,y,.73),(x*1.14,cy+(y-cy)*1.14,2.005),.034,n=10)
        if d.id == "helio":
            s.rod("Glass",(0,cy,1.83),(0,cy,1.90),.30,n=20)
            s.torus("LightGrey",(0,cy,1.965),.35,.025,n=20)
        else:
            s.rod("Eye",(0,cy,.93),(0,cy,1.25),.09,n=12)
    elif d.id == "volt":
        for i in range(3):
            a = math.tau*i/3
            x,y = .26*math.cos(a),cy+.26*math.sin(a)
            s.rod("Grey",(x,y,.78),(x,y,1.87),.095,n=12)
            for z in (1.03,1.24,1.45,1.66):
                s.torus("Accent",(x,y,z),.14,.026,n=12)
            s.rod("LightGrey",(x,y,1.86),(x*.70,cy+(y-cy)*.70,2.035),.052,n=10)
    elif d.id == "echo":
        for x,y in ((-.205,.22),(.205,.22),(0,.58)):
            s.tube("Grey",(x,y,.88),(x,y,2.015),.071,.029,end=.19,n=16)
            s.torus("LightGrey",(x,y,2.015),.189,.021,n=16)
            for z,r in ((1.16,.10),(1.48,.134),(1.80,.17)):
                s.torus("Accent",(x,y,z),r+.012,.02,n=14)
    # Secondary launch cells are integrated above the chassis, not bolt-on handles.
    for sign in (-1,1):
        x,y = sign*.22,.77
        s.loft("Main",[(.17,.07,.075),(.32,.115,.12),(.80,.115,.12),(.96,.09,.09)],
               (x,y,0),axis="z",n=12,power=d.power)
        s.tube("LightGrey",(x,y,.82),(x,y,1.025),.092,.022,n=12)
        s.rod("Black",(x,y,.78),(x,y,.83),.065,n=10)
        s.rod("Accent",(x,y,.84),(x,y,.995),.052,end=.014,n=10)
    s.rod("Grey",(0,-.13,.11),(0,-.13,.51),.03,n=8)
    s.rod("Grey",(0,-.13,.51),(0,.10,.51),.03,n=8)
    muzzle(s,d,5,.35)


def gun(s, d, stage):
    length = 1.30 + stage*.115
    size = .26+stage*.012
    kind = d.weapon
    if d.id == "prism":
        kind = {1:"pulse",2:"flame",3:"rocket",4:"fork",5:"plasma"}[stage]
    # The grip crosses the origin; the receiver sits above it, aiming along +Z.
    s.loft("Black",[(-.19,.074,.07),(-.14,.095,.09),(.12,.11,.095),(.20,.08,.07)],(0,0,.06),n=8,power=.5)
    for y in (-.13,-.065,0,.065):
        s.rod("Grey",(-.086,y,.145),(.086,y,.145),.012,n=6)
    if stage >= 3:
        {3:battery_gun,4:rail_gun,5:siege_gun}[stage](s,d)
        return
    s.loft("Main",[(-.16,size*.65,.18),(-.06,size,.24),(.43,size,.23),
                    (.61,size*.73,.17)],(0,.23,0),axis="z",n=12,power=d.power)
    s.panel("Accent",plate_shape(0,.40,.31,.17),.08,.045)
    s.rod("Grey",(0,-.12,.12),(0,-.12,.36),.025,n=8)
    s.rod("Grey",(0,-.12,.36),(0,.15,.37),.025,n=8)
    if kind in ("pulse","mortar","ram"):
        count = 2 if kind == "pulse" and stage >= 2 else 1
        r = .13 if count == 2 else .235 if kind == "mortar" else .195
        for i in range(count):
            x = (i-(count-1)/2)*.33
            barrel(s,x,.25,.45,length-.49,r,flare=1.12 if kind == "mortar" else 1)
        if kind == "ram":
            for sign in (-1,1):
                s.piston((sign*.25,.24,.39),(sign*.25,.24,length-.12),.06)
            s.tube("Main",(0,.25,length-.28),(0,.25,length),.285,.055,n=8)
        else:
            for z in (.58,.77,.96):
                s.torus("Grey",(0,.25,z),.285 if kind == "mortar" else .26,.027,n=12)
    elif kind in ("lens","fork"):
        for sign in (-1,1):
            s.loft("LightGrey",[(.4,.058,.065),(.55,.075,.095),
                    (length-.13,.055,.065),(length,.035,.04)],(sign*.245,.27,0),axis="z",n=8,power=.5)
            s.rod("Eye",(sign*.198,.27,.61),(sign*.198,.27,length-.10),.015,n=6)
        if kind == "lens":
            s.tube("Grey",(0,.27,.55),(0,.27,length-.16),.18,.035,n=16)
            s.torus("Accent",(0,.27,length-.15),.20,.035,n=16)
            s.rod("Glass",(0,.27,length-.15),(0,.27,length-.13),.162,n=16)
            s.rod("Eye",(0,.27,length-.13),(0,.27,length-.115),.066,n=12)
        else:
            for sign in (-1,1):
                for z in (.58,.74,.90,1.06):
                    s.torus("Accent",(sign*.245,.27,z),.105,.024,n=10)
                s.rod("LightGrey",(sign*.245,.27,length-.13),(sign*.17,.27,length+.025),.04,n=8)
    elif kind == "repeater":
        for i in range(3):
            a = i*math.tau/3
            barrel(s,math.cos(a)*.145,.26+math.sin(a)*.145,.44,length-.46,.085)
        for z in (.60,length-.15):
            s.torus("Main",(0,.26,z),.255,.045,n=12)
    elif kind in ("cryo","flame","hydro"):
        count = 2 if kind == "flame" and stage >= 2 else 1
        for i in range(count):
            x = (i-(count-1)/2)*.31
            r = .115 if count == 2 else .17
            barrel(s,x,.26,.44,length-.46,r,flare=1.34 if kind == "flame" else .65 if kind == "hydro" else 1.05)
            for z in (.62,.82,1.02):
                s.tube("Main",(x,.26,z),(x,.26,z+.075),r+.052,.038,n=8 if kind == "cryo" else 12)
            if kind == "flame":
                s.rod("Accent",(x,.08,length-.20),(x,.08,length+.025),.028,n=8)
        for sign in (-1,1):
            s.loft("Grey",[(.05,.085,.10),(.15,.12,.12),(.59,.12,.12),(.68,.08,.075)],
                   (sign*.29,.23,0),axis="z",n=10,power=1)
            s.rod("Accent",(sign*.29,.31,.61),(sign*.15,.34,.93),.03,n=8)
            if kind == "cryo":
                for z in (.55,.70,.85,1):
                    s.panel("LightGrey",[(sign*.20,.18),(sign*.34,.05),
                             (sign*.36,.51),(sign*.20,.39)],z,.035,.008)
    elif kind == "plasma":
        s.rod("Glass",(0,.26,.45),(0,.26,length-.09),.10,n=12)
        for i in range(5):
            z = .53+i*(length-.65)/4
            radius = .19+.075*math.sin(i*math.pi/4)
            s.torus("Main",(0,.26,z),radius,.044,n=14)
            s.torus("Eye",(0,.26,z+.014),radius-.047,.011,n=14)
        for sign in (-1,1):
            s.rod("LightGrey",(sign*.24,.26,.40),(sign*.24,.26,length-.04),.04,n=8)
    elif kind == "sonic":
        s.tube("Grey",(0,.25,.46),(0,.25,length-.05),.10,.035,end=.32,n=16)
        for i in range(4):
            z = .65+i*(length-.72)/3
            r = .1+.22*(z-.46)/(length-.51)
            s.torus("Accent" if i == 3 else "Main",(0,.25,z),r+.017,.025,n=16)
        s.rod("Black",(0,.25,.48),(0,.25,.52),.072,n=12)
        s.rod("Eye",(0,.25,.52),(0,.25,.54),.034,n=10)
    elif kind == "rocket":
        for x in (-.16,.16):
            for y in (.14,.43):
                barrel(s,x,y,.40,length-.43,.12,"Main")
                s.rod("Accent",(x,y,length-.20),(x,y,length-.075),.070,end=.018,n=8)
    muzzle(s,d,stage,.25 if kind in ("pulse","mortar","ram","sonic") else .27 if kind in ("lens","fork") else .26)


def back(s, d, stage):
    spread = .69 if stage == 3 else .77 if stage == 4 else 1.00
    s.loft("Grey",[(-.35,.24,.12),(-.2,.34,.18),(.39,.34,.18),(.52,.23,.12)],(0,0,-.49))
    s.panel("Main",plate_shape(0,.09,.48,.71),-.67,.09)
    for sign in (-1,1):
        x = sign*spread
        s.piston((sign*.22,.0,-.56),(x,.57,-.51),.07)
        s.rod("Grey",(sign*.24,.34,-.51),(x,.52,-.51),.10,n=10)
        if stage in (3,5):
            s.loft("Main",[(-.85,.19,.19),(-.75,.25,.26),(-.14,.25,.26),
                            (.04,.20,.22)],(x,.60,0),axis="z",n=12,power=d.power)
            if d.id in ("volt","nova"):
                for y in (.46,.60,.74):
                    s.torus("Accent",(x,y,-.42),.27,.025,axis=(0,1,0),n=12)
                s.rod("Eye",(x,.80,-.42),(x,.98,-.42),.04,n=8)
            elif d.id in ("tidal","glacier"):
                s.loft("LightGrey",[(.17,.10,.10),(.25,.17,.17),(.86,.17,.17),(.97,.10,.10)],(x,0,-.43),n=12,power=1)
                for y in (.33,.77):
                    s.torus("Accent",(x,y,-.43),.18,.023,axis=(0,1,0),n=12)
            elif d.id == "echo":
                s.tube("LightGrey",(x,.59,-.20),(x,.59,.07),.11,.033,end=.25,n=14)
                s.torus("Accent",(x,.59,.07),.235,.025,n=14)
            elif d.id == "helio":
                s.torus("LightGrey",(x,.60,.065),.20,.035,n=14)
                s.rod("Glass",(x,.60,.025),(x,.60,.066),.17,n=14)
                s.rod("Eye",(x,.60,.067),(x,.60,.08),.07,n=10)
            else:
                for dx in (-.105,.105):
                    for dy in (-.11,.11):
                        s.tube("LightGrey",(x+dx,.6+dy,-.08),(x+dx,.6+dy,.09),.082,.018,n=8)
                        s.rod("Black",(x+dx,.6+dy,-.09),(x+dx,.6+dy,-.07),.062,n=8)
                        s.rod("Accent",(x+dx,.6+dy,-.055),(x+dx,.6+dy,.058),.046,end=.012,n=8)
        if stage >= 4:
            xx = sign*(.48 if stage == 5 else .62)
            top = 1.34 if d.id not in ("atlas","bastion") else 1.16
            s.loft("Main",[(.04,.095,.12),(.22,.15,.13),(top-.14,.12,.11),
                           (top,.05,.065)],(xx,0,-.62),n=8,power=.5)
            s.rod("LightGrey",(xx-sign*.08,.28,-.46),(xx-sign*.08,top-.05,-.46),.025,n=8)
            s.rod("Eye",(xx,.35,-.482),(xx,top-.16,-.482),.015,n=6)
            s.piston((sign*.20,-.23,-.57),(xx,.69,-.67),.05)
            if d.id == "volt":
                for y in (.45,.61,.77,.93):
                    s.torus("Accent",(xx,y,-.62),.16,.026,axis=(0,1,0),n=12)
        if d.id in ("zephyr","helio"):
            reach = 1.54 if stage == 5 else 1.16
            s.panel("Accent",[(sign*.43,.30),(sign*reach,.81),
                                (sign*(reach-.19),.21),(sign*.53,.03)],-.67,.10)
            s.panel("Main",[(sign*.50,.20),(sign*(reach-.07),.15),
                              (sign*(reach-.24),-.18),(sign*.53,-.06)],-.67,.10)
        elif d.id == "ember":
            for z in (-.49,-.72):
                s.tube("LightGrey",(x,.77,z),(x,1.05,z),.085,.024,n=10)
        elif d.id == "atlas":
            s.piston((x,-.12,-.65),(x,.85,-.65),.10)
        elif d.id in ("glacier","prism"):
            s.panel("LightGrey",[(x-sign*.13,.56),(x,1.12),
                                  (x+sign*.21,.79),(x+sign*.11,.25)],-.82,.15)
    if stage == 5:
        if d.id in ("nova","helio","echo"):
            s.torus("Accent",(0,.68,-.85),.58,.055,n=20)
            for sign in (-1,1):
                s.rod("Grey",(sign*.18,.18,-.70),(sign*.40,.68,-.85),.055,n=8)
        else:
            s.loft("Main",[(.27,.17,.14),(.45,.23,.18),(.84,.18,.13),(.99,.09,.07)],(0,0,-.71),n=8,power=d.power)
            s.vent((0,.64,-.50),.23,.25,4)


def build_library():
    library = {}
    for d in DESIGNS:
        slots = {name: Slot(f"{d.id}__{name}") for name in SLOTS}
        helmet(slots["Head"],d)
        core(slots["Chest"],d)
        core(slots["Torso"],d,True)
        for side, sign in (("L",1),("R",-1)):
            shoulder(slots["UpperArm"+side],d,sign)
            for name in ("LowerArm","UpperLeg","LowerLeg"):
                limb(slots[name+side],d,name,sign)
            foot(slots["Foot"+side],d)
            hand(slots["Hand"+side],d,sign)
        shield(slots["Shield"],d)
        for stage in range(1,6):
            gun(slots[f"Weapon{stage}"],d,stage)
        for stage in (3,4,5):
            back(slots[f"Back{stage}"],d,stage)
        library[d.id] = slots
    return library


def geometry_report(library):
    report = {"coordinateSystem":"THREE: +X right, +Y up, +Z forward",
              "source":"tools/build-sparkbound-3d.py", "heroes":{}, "totalTriangles":0}
    for hero, slots in library.items():
        assert tuple(slots) == SLOTS
        slot_reports = {}
        for name, slot in slots.items():
            assert slot.bins, slot.name
            vertices = [v for mesh in slot.bins.values() for v in mesh.vertices]
            assert all(math.isfinite(c) for v in vertices for c in v)
            for mesh in slot.bins.values():
                for face in mesh.faces:
                    assert len(set(face)) == len(face) and len(face) >= 3
                    assert all(0 <= i < len(mesh.vertices) for i in face)
            slot_reports[name] = {
                "triangles":sum(m.triangles for m in slot.bins.values()),
                "drawCalls":len(slot.bins),
                "markers":slot.markers,
                "bounds":{"min":[round(min(v[i] for v in vertices),5) for i in range(3)],
                          "max":[round(max(v[i] for v in vertices),5) for i in range(3)]}}
        body = sum(slot_reports[n]["triangles"] for n in BODY)
        stages = [body+slot_reports["Shield"]["triangles"] + (slot_reports[f"Weapon{s}"]["triangles"] if s else 0)
                  + (slot_reports[f"Back{s}"]["triangles"] if s >= 3 else 0) for s in range(6)]
        assert max(stages) < 80000, (hero, stages)
        report["heroes"][hero] = {"slots":slot_reports,"bodyTriangles":body,
                                  "visibleTrianglesByStage":stages,
                                  "preferred40kBudgetPass":max(stages)<40000}
        report["totalTriangles"] += sum(s["triangles"] for s in slot_reports.values())
    return report


def export_blender(library, output):
    import bpy
    import bmesh
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    materials = {}
    for name, (rgba, metallic, roughness) in MATERIALS.items():
        mat = bpy.data.materials.new(name)
        mat.diffuse_color = rgba
        mat.use_nodes = True
        bsdf = mat.node_tree.nodes.get("Principled BSDF")
        bsdf.inputs["Base Color"].default_value = rgba
        bsdf.inputs["Metallic"].default_value = metallic
        bsdf.inputs["Roughness"].default_value = roughness
        if name == "Eye":
            bsdf.inputs["Emission Color"].default_value = rgba
            bsdf.inputs["Emission Strength"].default_value = 2.0
        materials[name] = mat
    for hero, slots in library.items():
        root = bpy.data.objects.new(hero,None)
        bpy.context.collection.objects.link(root)
        for name, slot in slots.items():
            socket = bpy.data.objects.new(slot.name,None)
            socket.parent = root
            bpy.context.collection.objects.link(socket)
            for marker_name, (x,y,z) in slot.markers.items():
                marker = bpy.data.objects.new(marker_name,None)
                marker.parent = socket
                marker.location = (x,-z,y)
                bpy.context.collection.objects.link(marker)
            for mat, geometry in slot.bins.items():
                mesh = bpy.data.meshes.new(f"{slot.name}__{mat}")
                mesh.from_pydata([(x,-z,y) for x,y,z in geometry.vertices],[],geometry.faces)
                mesh.materials.append(materials[mat])
                mesh.update()
                bm = bmesh.new()
                bm.from_mesh(mesh)
                bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
                bm.to_mesh(mesh)
                bm.free()
                for polygon in mesh.polygons:
                    polygon.use_smooth = True
                mesh.set_sharp_from_angle(angle=math.radians(55))
                obj = bpy.data.objects.new(mesh.name,mesh)
                obj.parent = socket
                bpy.context.collection.objects.link(obj)
                normals = obj.modifiers.new("Manufactured weighted normals","WEIGHTED_NORMAL")
                normals.keep_sharp = True
                normals.weight = 50
                normals.mode = "FACE_AREA_WITH_ANGLE"
    output.parent.mkdir(parents=True,exist_ok=True)
    bpy.ops.export_scene.gltf(filepath=str(output),export_format="GLB",export_yup=True,
                              export_animations=False,export_cameras=False,export_lights=False,
                              export_extras=False,export_materials="EXPORT",export_apply=True)
    return bpy.app.version_string


def validate_glb(path):
    data = path.read_bytes()
    magic,version,length = struct.unpack_from("<4sII",data)
    assert magic == b"glTF" and version == 2 and length == len(data)
    json_length,chunk_type = struct.unpack_from("<II",data,12)
    assert chunk_type == 0x4E4F534A
    gltf = json.loads(data[20:20+json_length])
    nodes = gltf["nodes"]
    roots = gltf["scenes"][gltf.get("scene",0)]["nodes"]
    assert {nodes[i]["name"] for i in roots} == {d.id for d in DESIGNS}
    assert len(roots) == len(DESIGNS)
    names = [n.get("name") for n in nodes]
    assert len(names) == len(set(names)), "Duplicate GLB node names"
    for node in nodes:
        if "__Muzzle" in node["name"]:
            position = node["translation"]
            assert abs(position[0]) < .0001 and .20 < position[1] < .36 and 1.3 < position[2] < 2.1
        else:
            assert node.get("translation",[0,0,0]) == [0,0,0],node["name"]
        assert node.get("rotation",[0,0,0,1]) == [0,0,0,1],node["name"]
        assert node.get("scale",[1,1,1]) == [1,1,1],node["name"]
        assert "matrix" not in node, node["name"]
    for i in roots:
        root = nodes[i]
        assert {nodes[j]["name"] for j in root["children"]} == {f"{root['name']}__{s}" for s in SLOTS}
        for j in root["children"]:
            seen = set()
            marker_count = 0
            for k in nodes[j]["children"]:
                if "__Muzzle" in nodes[k]["name"]:
                    assert nodes[k]["name"] == nodes[j]["name"].replace("__Weapon","__Muzzle")
                    assert "mesh" not in nodes[k]
                    marker_count += 1
                    continue
                mesh = gltf["meshes"][nodes[k]["mesh"]]
                assert len(mesh["primitives"]) == 1
                mat = mesh["primitives"][0]["material"]
                assert mat not in seen
                seen.add(mat)
            assert marker_count == (1 if "__Weapon" in nodes[j]["name"] else 0)
    assert {m["name"] for m in gltf["materials"]} == set(MATERIALS)
    assert not gltf.get("skins") and not gltf.get("animations") and not gltf.get("images")
    triangles = 0
    for mesh in gltf["meshes"]:
        for primitive in mesh["primitives"]:
            assert {"POSITION","NORMAL"}.issubset(primitive["attributes"])
            assert primitive.get("mode",4) == 4
            indices = gltf["accessors"][primitive["indices"]]["count"]
            assert indices % 3 == 0
            triangles += indices//3
    assert len(data) < 20_000_000, f"Library exceeds 20 MB: {len(data):,} bytes"
    return {"bytes":len(data),"sha256":hashlib.sha256(data).hexdigest(),
            "rootGroups":len(roots),"socketGroups":len(DESIGNS)*len(SLOTS),
            "materials":[m["name"] for m in gltf["materials"]],
            "identitySocketTransforms":True,"muzzleMarkers":60,"oneMeshPerMaterialPerSlot":True,
            "triangles":triangles,"exportedNormals":True}


def preview(output):
    """Optional inspection-only assembled contact sheet; never included in the GLB."""
    import bpy
    from mathutils import Vector
    scene = bpy.context.scene
    originals = list(scene.objects)
    offsets = {"Head":(0,3.80,0),"Chest":(0,3.10,0),"Torso":(0,2.52,0)}
    for side,sign in (("L",1),("R",-1)):
        offsets.update({f"UpperArm{side}":(sign*.82,3.35,0),
                        f"LowerArm{side}":(sign*1.02,2.72,0),
                        f"Hand{side}":(sign*1.02,2.13,0),
                        f"UpperLeg{side}":(sign*.35,2.08,0),
                        f"LowerLeg{side}":(sign*.38,1.25,0),
                        f"Foot{side}":(sign*.38,.32,0)})
    offsets.update({"Weapon5":(-1.02,2.13,.15),"Shield":(1.02,2.58,.20),"Back5":(0,3.10,0)})
    for index,d in enumerate(DESIGNS):
        dx = (index%4-1.5)*3.9
        dy = (2-index//4)*5.25
        for slot,offset in offsets.items():
            source = bpy.data.objects[f"{d.id}__{slot}"]
            for child in source.children:
                obj = child.copy()
                obj.parent = None
                p = add(offset,(dx,dy,0))
                obj.location = (p[0],-p[2],p[1])
                scene.collection.objects.link(obj)
        font = bpy.data.curves.new(d.id+" label","FONT")
        font.body = d.id.upper()
        font.align_x = "CENTER"
        font.size = .25
        obj = bpy.data.objects.new(d.id+" label",font)
        scene.collection.objects.link(obj)
        obj.location = (dx,-.10,dy-.15)
        obj.rotation_euler = (math.pi/2,0,0)
    for obj in originals:
        obj.hide_render = True
    camera = bpy.data.objects.new("Preview Camera",bpy.data.cameras.new("Preview Camera"))
    scene.collection.objects.link(camera)
    camera.location = (7,-32,16)
    target = Vector((0,0,7.2))
    camera.rotation_euler = (target-camera.location).to_track_quat("-Z","Y").to_euler()
    camera.data.type = "ORTHO"
    camera.data.ortho_scale = 19.5
    scene.camera = camera
    for name,position,power,size in (("Key",(2,-10,20),2600,10),("Fill",(-10,-5,10),2000,10),("Rim",(8,5,18),3200,8)):
        lamp = bpy.data.lights.new(name,"AREA")
        lamp.energy = power
        lamp.shape = "DISK"
        lamp.size = size
        obj = bpy.data.objects.new(name,lamp)
        scene.collection.objects.link(obj)
        obj.location = position
        obj.rotation_euler = (target-obj.location).to_track_quat("-Z","Y").to_euler()
    scene.world.color = (.17,.17,.17)
    # CPU Cycles also works on headless Windows ARM hosts without an OpenGL context.
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = 24
    scene.cycles.use_denoising = True
    scene.render.resolution_x = 2400
    scene.render.resolution_y = 2200
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.filepath = str(output.with_name("guardian-preview.png"))
    scene.view_settings.view_transform = "AgX"
    bpy.ops.render.render(write_still=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output",type=Path,default=OUT)
    parser.add_argument("--self-test",action="store_true",help="Pure Python geometry/contract checks; no Blender required")
    parser.add_argument("--validate",type=Path,help="Inspect an existing GLB without loading Blender")
    parser.add_argument("--preview",action="store_true",help="Render an assembled contact sheet after export")
    argv = sys.argv[sys.argv.index("--")+1:] if "--" in sys.argv else ([] if "bpy" in sys.modules else sys.argv[1:])
    args = parser.parse_args(argv)
    if args.validate:
        print(json.dumps(validate_glb(args.validate),indent=2))
        return
    library = build_library()
    report = geometry_report(library)
    for hero,stats in report["heroes"].items():
        print(f"{hero:8s} body={stats['bodyTriangles']:5d} max-visible={max(stats['visibleTrianglesByStage']):5d}")
    print(f"Library triangles (all mutually exclusive upgrades): {report['totalTriangles']:,}")
    if args.self_test:
        print("PASS: 12 heroes, 288 nonempty sockets, finite geometry, all visible triangle budgets.")
        return
    report["blenderVersion"] = export_blender(library,args.output.resolve())
    report["export"] = validate_glb(args.output)
    assert report["export"]["triangles"] == report["totalTriangles"]
    report["shading"] = {"method":"Blender Weighted Normal; FACE_AREA_WITH_ANGLE", "weight":50,
                         "sharpAngleDegrees":55,"appliedOnExport":True}
    raw = args.output.read_bytes()
    compressed = gzip.compress(raw,compresslevel=9,mtime=0)
    assert gzip.decompress(compressed) == raw
    compressed_path = args.output.with_suffix(args.output.suffix+".gz")
    compressed_path.write_bytes(compressed)
    report["gzip"] = {"file":compressed_path.name,"bytes":len(compressed),
                      "sha256":hashlib.sha256(compressed).hexdigest(),
                      "compressionLevel":9,"mtime":0,"roundTripVerified":True}
    report["generatorSha256"] = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    args.output.with_name("guardian-library.report.json").write_text(json.dumps(report,indent=2)+"\n",encoding="utf-8")
    print(json.dumps(report["export"],indent=2))
    print(json.dumps(report["gzip"],indent=2))
    if args.preview:
        preview(args.output)


if __name__ == "__main__":
    main()
