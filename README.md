from locust import HttpUser, task, between
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
import base64

class MyLoadTest(HttpUser):
    # Явно указываем хост
    host = "http://my-site.com"

    # Время ожидания между запросами - 1 запрос в секунду
    wait_time = between(1, 1)  # интервал ожидания между запросами 1 секунда

    # Задание на отправку POST-запроса
    @task
    def post_request(self):
        # Тело запроса
        payload = {"example_key": "example_value"}

        # Заголовки запроса
        headers = {
            "Content-Type": "application/json",  # Устанавливает тип содержимого как JSON
            "Authorization": "Bearer your_token",  # Пример заголовка авторизации (если требуется)
            "Custom-Header": "CustomValue"  # Пример пользовательского заголовка
        }

        # Отправка POST-запроса
        response = self.client.post("/lau", json=payload, headers=headers)

        # Проверяем статус ответа
        if response.status_code == 200:
            try:
                # Парсинг JSON-ответа
                data = response.json()
                rsa_public_key_pem = data.get('rsaPublicValue')
                fake_pan = data.get('fakePan')
                rsa_key_id = data.get('rsaKeyID')

                # Получаем публичный ключ из PEM
                public_key = serialization.load_pem_public_key(
                    rsa_public_key_pem.encode()
                )

                pin = '2323'  # Ваш PIN

                # Создание чистого PIN-блока
                pin_block = create_clean_pin_block(pin, fake_pan)

                # Шифрование данных
                encrypted_data = public_key.encrypt(
                    pin_block.encode(),
                    padding.PKCS1v15()
                )

                # Создаем данные для повторного запроса
                re_encode_data = {
                    "encryptedData": base64.b64encode(encrypted_data).decode(),
                    "rsaKeyID": rsa_key_id,
                    "some_id": "43219876543210987",
                    "fakePan": fake_pan,
                    "correlationID": "xxxcorrid"
                }

                # Отправка второго POST-запроса
                re_encode_response = self.client.post("/reencode", json=re_encode_data, headers=headers)
                print(f"Reencode response: {re_encode_response.text}")

            except ValueError:
                print("Ответ не в формате JSON:", response.text)

        else:
            print(f"Ошибка: {response.status_code} - {response.text}")


def pin_block(pin):
    pin_length = len(pin)
    pin_block_hex = f'0{pin_length}{pin}'
    pin_block_hex += 'F' * (16 - len(pin_block_hex))  # Дополнение до 16 символов 'F'
    return pin_block_hex


def pan_block(pan):
    pan_length = len(pan)
    pan_block_hex = f'0000{pan[-13:-1]}'  # Последние 12 цифр PAN-кода без контрольной цифры
    return pan_block_hex


def create_clean_pin_block(pin, pan):
    pin_block_hex = pin_block(pin)
    pan_block_hex = pan_block(pan)
    big_int_pin = int(pin_block_hex, 16)
    big_int_pan = int(pan_block_hex, 16)
    return f'0{hex(big_int_pin ^ big_int_pan)[2:].upper()}'
