import requests

url = 'http://127.0.0.1:5000/api/exercicio'  # Substitua pelo URL correto da sua aplicação Flask

data = {
    'level': 'facilidade do exercicio',
    'descricao': 'descricao do exercicio',
    'musculo': 'musculo do exercicio'
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print('exercicio favoritado')
else:
    print('Falha')


