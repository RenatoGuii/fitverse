import requests

url = 'http://127.0.0.1:5000/api/user/senha/3'  # Substitua pelo URL correto da sua aplicação Flask e pelo ID do usuário que deseja editar

data = {
    'senha': 'pass2'
}

response = requests.put(url, json=data)

if response.status_code == 200:
    print('Senha atualizado com sucesso!')
else:
    print('Falha ao atualizar senha.')