# Sparkbound Guardian Armour Library

## Provenance

Original rigid mechanical armour and weapon geometry authored specifically for
Sparkbound by OpenAI Codex at the user's request, 11 September 2026. Exact source:
`tools/build-sparkbound-3d.py` in this repository. The script creates every vertex
from mathematical loft sections, inset-bevel polygon profiles, annular tubes,
torus sections and articulated mechanical components, then constructs Blender
meshes and exports them with Blender's official glTF 2.0 exporter. No downloaded
models, traced artwork, generative-image meshes, textures or paid services are
used. No third-party geometry is included in this library.

These assets are supplied for unrestricted use, modification and redistribution
in Sparkbound or other projects without an attribution requirement or asset fee.
No exclusive copyright or trademark clearance is asserted for AI-assisted work.
The only design references are Sparkbound's own role and equipment descriptions
in `sparkbound/roster.js`, not the geometry of any external character.

The existing Quaternius models, skeletons and their licence remain separate,
unchanged and subject to their existing provenance. This library contains no
skeleton, animation, skin, texture or borrowed model data. Blender is a build
tool, not an embedded runtime dependency.

## Build

Requires the official Blender 4.5 LTS Python API; targeted version is 4.5.3.
Run from the repository root, substituting the supplied Blender executable:

```powershell
& $Blender --background --python-exit-code 1 --python tools/build-sparkbound-3d.py --
```

Without Blender, check all procedural geometry and triangle budgets:

```powershell
python tools/build-sparkbound-3d.py --self-test
```

Inspect the exported node/material contract without Blender:

```powershell
python tools/build-sparkbound-3d.py --validate sparkbound/assets/mechs/guardian-library.glb
```

Outputs are `guardian-library.glb`, `guardian-library.glb.gz`,
`guardian-library.report.json`, and optional `guardian-preview.png` (add
`--preview` after the argument separator) in this directory. The report records exact Blender
version, generator SHA-256, GLB SHA-256, byte size, material names, slot-local
bounds, draw calls and triangles per slot and per visible equipment stage.
Generated output is not a source asset and is reproducible from the script.

The gzip payload is generated using Python `gzip.compress(raw, compresslevel=9,
mtime=0)`, then decompressed and byte-compared against the raw GLB. Both payload
sizes and SHA-256 values are recorded. Runtime may use native browser
`DecompressionStream('gzip')`, with the raw GLB as its fallback; no decoder
library is required. The `.gz` payload is compressed bytes, not a second model.

## Mount Contract

There are exactly 12 top-level groups: `relay`, `helio`, `volt`, `bastion`,
`zephyr`, `glacier`, `ember`, `tidal`, `atlas`, `nova`, `echo`, and `prism`.
Each has exactly 24 direct child socket groups named `${id}__${slot}`:

- `Head`, `Chest`, `Torso`
- `UpperArmL`, `UpperArmR`, `LowerArmL`, `LowerArmR`
- `UpperLegL`, `UpperLegR`, `LowerLegL`, `LowerLegR`
- `FootL`, `FootR`, `HandL`, `HandR`
- `Weapon1`, `Weapon2`, `Weapon3`, `Weapon4`, `Weapon5`
- `Back3`, `Back4`, `Back5`, `Shield`

Every root, socket and mesh has identity position, orientation and scale. Each
WeaponN additionally contains a child empty `${id}__MuzzleN`, with identity
orientation/scale and a position at the forward firing point. Its local position
is in exported THREE coordinates: use its world position for projectile effects.
For multi-barrel weapons the marker is centred between the bores. These 60 muzzle
markers are the only translated objects, and their coordinates are in the report.
Mesh vertices are authored in THREE coordinates and converted to Blender `(x,-z,y)`;
Blender's Y-up exporter converts them back to THREE `(x,y,z)`. Do not rotate the
groups to correct Blender axes. Local units suit the 4.4-high normalised rig.
Armour extends downward from limb origins. Feet extend forward. Weapon grips
cross the origin, receivers sit above the grip, and all weapons aim along +Z.
Back upgrades mount at the Chest bone, with rear hardware at negative Z.

Runtime must clone and mount individual socket groups at the authored bone
world positions with identity orientation before attaching to bones. Do not
display the library root as an assembled character: all socket origins overlap.
Show only one Weapon stage and one matching Back stage at a time. The optional
Shield is designed for the left forearm. It uses a local forward offset for the
armour face and may need a small lateral runtime adjustment for the animated pose.
The preview uses approximate inspection-only joint positions, not a supplied rig.

Materials are exactly `Main`, `Accent`, `Grey`, `LightGrey`, `Black`, `Eye`,
`Glass`, shared globally. Default colours are neutral preview colours, not the
hero's final runtime palette. `Eye` is emissive; `Glass` is opaque polished
optical material to avoid transparency sorting. Every socket has at most one
mesh per material. No texture requests, Draco or external decoder is required.

## Silhouette Direction

| Hero | Armour identity | Weapon identity |
| --- | --- | --- |
| Relay | Split brow, layered chevrons, overlapping mantles | Pulse barrel, twin bores and rockets |
| Helio | Central optic, petal shoulders, solar breastplate | Focusing lens between open rails |
| Volt | Fork antennae and exposed insulated shoulder coils | Separate electrodes and induction coils |
| Bastion | Wide gorget, low visor, deep shield pauldrons | Open-bore heavy recoil mortar |
| Zephyr | Slim teardrop torso, swept head and shoulder wings | Three-bore ion turbine |
| Glacier | Faceted crown, cooling fins, icebreaker plates | Hexagonal cryogenic barrel jackets |
| Ember | Respirator, chimney shoulders, thermal shields | Twin flared jets and pilot nozzles |
| Tidal | Porthole helmet, pressure carapace, reservoirs | Tapered hydrojet and pressure feed tanks |
| Atlas | Wedge brow, load pistons, tracked sabatons | External piston ram with impact collar |
| Nova | Halo crown, orbital shoulders, reactor chest | Open magnetic acceleration rings |
| Echo | Resonator ears, shoulder dishes, diaphragm chest | Hollow flared acoustic horn |
| Prism | Diamond mask and split angular crystal crown | Breach, thermal, rocket, arc and plasma stages |

Back3 adds shoulder batteries or hero-specific support reservoirs. Back4 adds
tall rail stabilisers. Back5 combines wider shoulder arrays, rails and a central
siege assembly. Body, weapons and back hardware change geometry, not just colour.

Weapon3 is a dedicated triangular three-cell battery with individually recessed
launch/optical/acoustic mouths. Weapon4 is a long split-rail chassis with visible
daylight between separately braced rails, cooling vanes and a rear injector.
Weapon5 is a broad integrated siege housing with secondary launch cells and a
hero-specific central array: twin jets/bores, recoil mortar, hydraulic nozzle,
six-barrel turbine, magnetic/lens cage, three electrodes or three acoustic horns.
These are separate assemblies, not scaled copies of Weapon1/Weapon2.

Armour uses 16-20-section curved lofts where appropriate, real separated chest
leaves exposing recessed gasket channels, restrained fastener and groove detail,
and Blender area-and-angle weighted split normals. Edges sharper than 55 degrees
remain split; curved carapace and bevel highlights are smooth. Modifiers are
applied during GLB export, so the runtime needs no normal-generation logic.

## Verification Boundary

The script fails on missing sockets, non-identity exported transforms, duplicate
names/material meshes, external image content, incorrect material sets, GLB size
at or above 20 MB, or any visible character at or above 80,000 triangles. It also
reports the preferred 40,000-triangle threshold. All mutually exclusive weapons
are counted in library storage but not simultaneously in visible character cost.

The optional Blender preview uses CPU Cycles, avoiding the OpenGL requirement
of Eevee on headless Windows ARM hosts. It is an inspection aid. Runtime bone alignment,
animation clearance, player/rival aim, stage visibility, palette substitution,
mobile framing and browser performance must be checked by the integrating task
in actual browser renders before release. No application or skeleton changes
are performed by this generator.

## Verified Build: 11 September 2026

- Official Blender 4.5.3 LTS ARM64 export succeeded.
- Refined GLB size: 10,076,856 bytes, below the 20 MB limit.
- Deterministic gzip size: 2,362,915 bytes, with a verified lossless round trip.
- 12 hero roots, 288 socket groups, 60 correctly parented muzzle markers.
- Seven exact material names; one mesh per used material per socket.
- Maximum visible character: Volt, 25,340 triangles including Weapon5, Back5
  and Shield. Every hero stays below the preferred 40,000-triangle limit.
- All stored geometry, including mutually exclusive upgrades: 437,468 triangles.
- GLB SHA-256:
  `97c6eb4c81242153282005915679ef640511a2c013597c8dfd659a69fbbe6c3a`.
- Gzip SHA-256:
  `f70a6a1a22d8f0ebd2012f4075d7c81b1e4eceaa8af5a4c2e7e32da5d8ebbf45`.
- Pure-Python geometry checks and post-export GLB contract checks both passed.
- Repeated refined exports produced identical raw and gzip payloads.
- The stale initial `guardian-preview.png` was removed. No preview PNG is part
  of the canonical delivery. Optional future previews use approximate inspection
  offsets, not the live runtime skeleton or its corrected joint connections.
- The integrating task reported reviewing the latest GLB/gzip and Relay stage
  3/4/5 browser portraits, confirming meaningful weapon silhouette differences.
- Models are frozen for the integrating task's full browser QA. The canonical
  delivery is the generator, GLB, gzip, JSON report and this provenance README.
- Browser integration, animated clearance and palette QA remain with the
  integrating task; no browser release readiness is claimed here.
