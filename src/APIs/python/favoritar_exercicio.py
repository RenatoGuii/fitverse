import requests

url = 'http://127.0.0.1:5000/api/exercicio'  # Substitua pelo URL correto da sua aplicação Flask

data = {
    'musculo': 'musculo do exercicio',
    'user_id': 'id do usuario',
    'nome': 'nome do exercicio',
    'gif_url': 'gif_url',
    'equipamento': 'equipamento',
    'tipo': 'tipo do treino'
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print('exercicio favoritado')
else:
    print('Falha')


