import requests

url = 'http://127.0.0.1:5000/api/user/3'  # Substitua pelo URL correto da sua aplicação Flask e pelo ID do usuário que deseja editar

data = {
    'nome': 'Braz'
}

response = requests.put(url, json=data)

if response.status_code == 200:
    print('Usuário atualizado com sucesso!')
else:
    print('Falha ao atualizar usuário.')