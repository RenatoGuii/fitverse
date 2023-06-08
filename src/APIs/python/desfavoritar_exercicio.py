import requests

url = 'http://127.0.0.1:5000/api/exercicio'  # Substitua pelo URL correto da sua aplicação Flask

data = {
    'id': 'id do exercicio'
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print('exercicio deletado')
else:
    print('Falha')


