"""Optimise licensed European Dragon textures and losslessly pack its glTF rig into GLB.

Run with Blender's Python. Geometry, animation samples, skin weights and names
remain unchanged. Download originals into the documented planning asset folder.
"""
import bpy, json, struct, hashlib, gzip
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT.parent/'outputs/dragon-evolution-planning-2026-10-09/assets/european-dragon'
OUT=ROOT/'dragon-grove/assets/models'
OUT.mkdir(parents=True,exist_ok=True)
gltf=json.loads((SOURCE/'scene.gltf').read_text())
binary=bytearray((SOURCE/'scene.bin').read_bytes())
changes=[]
for image in gltf['images']:
    uri=image['uri']
    img=bpy.data.images.load(str(SOURCE/uri),check_existing=False)
    is_body='Low_Poly_Bake' in uri
    is_normal='normal' in uri
    is_rough='metallicRoughness' in uri
    width=2048 if is_body and not is_rough else 1024 if is_rough else 512
    img.scale(width,width)
    fmt='PNG' if is_normal or is_rough else 'JPEG'
    path=OUT/(Path(uri).stem+('.png' if fmt=='PNG' else '.jpg'))
    img.filepath_raw=str(path);img.file_format=fmt;img.save()
    payload=path.read_bytes()
    while len(binary)%4:binary.append(0)
    view=len(gltf['bufferViews'])
    gltf['bufferViews'].append({'buffer':0,'byteOffset':len(binary),'byteLength':len(payload)})
    binary.extend(payload)
    image.pop('uri',None);image['bufferView']=view;image['mimeType']='image/png' if fmt=='PNG' else 'image/jpeg'
    changes.append({'source':uri,'width':width,'height':width,'format':fmt,'bytes':len(payload)})
    path.unlink()
    bpy.data.images.remove(img)
gltf['buffers']=[{'byteLength':len(binary)}]
gltf['asset']['generator']='Bright Quest texture optimisation and GLB packaging; original European Dragon by Regina Cachoa / Nonexistent 101'
gltf['asset']['copyright']='European Dragon by Regina Cachoa / Nonexistent 101, CC BY 4.0. See LICENSE-European-Dragon.txt and model-provenance.json.'
json_bytes=json.dumps(gltf,separators=(',',':'),ensure_ascii=False).encode()
json_bytes+=b' '*((-len(json_bytes))%4)
binary+=b'\0'*((-len(binary))%4)
payload=struct.pack('<4sII',b'glTF',2,12+8+len(json_bytes)+8+len(binary))+struct.pack('<I4s',len(json_bytes),b'JSON')+json_bytes+struct.pack('<I4s',len(binary),b'BIN\0')+binary
(OUT/'european-dragon.glb').write_bytes(payload)
packed=gzip.compress(payload,compresslevel=9,mtime=0)
(OUT/'european-dragon.glb.gz').write_bytes(packed)
(OUT/'LICENSE-European-Dragon.txt').write_bytes((SOURCE/'license.txt').read_bytes())
report={'name':'European Dragon','author':'Regina Cachoa','originalPackagedAuthor':'Nonexistent 101','source':'https://sketchfab.com/3d-models/european-dragon-82f393a2e6c048ad80c171ce3b3a7b87','downloadMirror':'https://huggingface.co/datasets/fernandotonon/QtMeshEditor-motion-corpus/tree/main/raw/sketchfab/European_Dragon_82f393a2','license':'CC-BY-4.0','licenseUrl':'https://creativecommons.org/licenses/by/4.0/','verifiedOn':'2026-10-09','modifications':'Original geometry, skeleton and animation samples preserved. Body colour and normal maps resized to 2K; packed roughness to 1K; eye and teeth maps to 512; colour maps encoded JPEG. Original glTF bundled to GLB and gzip. Runtime adds growth proportions, elemental material appearance, lighting and ability animation.','bytes':len(payload),'gzipBytes':len(packed),'sha256':hashlib.sha256(payload).hexdigest(),'gzipSha256':hashlib.sha256(packed).hexdigest(),'clips':[a['name'] for a in gltf['animations']],'joints':len(gltf['skins'][0]['joints']),'meshes':len(gltf['meshes']),'textures':changes}
(OUT/'model-provenance.json').write_text(json.dumps(report,indent=2),encoding='utf8')
print(json.dumps(report,indent=2))
