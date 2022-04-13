import hashlib
from cbor2 import dumps, loads, shareable_encoder, CBORTag

class Sig:
        def __init__(self, hash, slot):
                self.hash=hash
                self.slot=slot


def default_encoder(encoder,value):
        encoder.encode([1, [[0, bytes.fromhex(value.hash)], [5, value.slot]]])


obj=Sig("d53436e6be4ee8d9c4dce7866a166cf26160f047dd4540437f170742", 68931743)

serialized = bytes.fromhex("00") + dumps(obj, default=default_encoder, value_sharing=False)

m=hashlib.blake2b(digest_size=28)
m.update(serialized)

print(m.hexdigest())