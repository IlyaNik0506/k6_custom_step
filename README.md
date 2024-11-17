from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
import base64

def post_request():
    # RSA-ключ должен быть 1024-битным
    rsa_public_key_pem = """-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFSm3PD11oXUWi/BLhsshl72r7
YgzuSIulIQ0TzEPSnyR9lIX1NnWuYIWsTbZ6BB13aKf9Jx5nXZG178g3s8PFH1ai
0B4af58bCzyXkJvWwp9ZaF0HdfJyzuyEY7dqE9Aqn6ARbyFF9cJGTQN/d8zXpsjy
KIElRrr8j+enaosZyQIDAQAB
-----END PUBLIC KEY-----"""

#!/usr/bin/env bash

VSCODE_SERVER_ROOT="$(dirname "$0")"

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <args>"
    exit 1
fi

exec "$VSCODE_SERVER_ROOT/node" "$VSCODE_SERVER_ROOT/out/vs/server/main.js" "$@"

def pin_block(pin):
    pin_length = len(pin)
    pin_block_hex = f'0{pin_length}{pin}'
    pin_block_hex += 'F' * (16 - len(pin_block_hex))
    return pin_block_hex


def pan_block(pan):
    pan_length = len(pan)
    pan_block_hex = f'0000{pan[-13:-1]}'
    return pan_block_hex


def create_clean_pin_block(pin, pan):
    pin_block_hex = pin_block(pin)
    pan_block_hex = pan_block(pan)
    big_int_pin = int(pin_block_hex, 16)
    big_int_pan = int(pan_block_hex, 16)
    xor_result = big_int_pin ^ big_int_pan
    # Приведение к 16-значному HEX
    return f'{xor_result:016X}'

post_request()
