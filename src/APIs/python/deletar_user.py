import requests

url = 'http://127.0.0.1:5000/api/user'  # Substitua pelo URL correto da sua aplicação Flask

data = {
    'id': 'John Doe'
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print('Usuário deletado')
else:
    print('Falha ao deletar usuario')


