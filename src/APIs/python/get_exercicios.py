import requests

url = 'http://localhost:5000/api/user/aqui tu vai colocar o user id do usuario logado'  # Substitua pelo URL correto da sua aplicação Flask e pelo ID do usuário que deseja receber

response = requests.get(url)

if response.status_code == 200:
    exercicio = response.json()
else:
    print('Falha ao receber exercicios.')