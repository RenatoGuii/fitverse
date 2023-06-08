from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Configurações do banco de dados
db_config = {
    'user': 'rootfitverse',
    'password': 'My@sql15',
    'host': 'db4free.net',
    'database': 'projetofitverse',
    'raise_on_warnings': True
}

# Rota para criar um novo registro
@app.route('/api/user', methods=['POST'])
def criar_usuario():
    data = request.get_json()
    # Variável para inserir o nome
    nome = data['nome']
    # Variável para inserir o email
    email = data['email']

    senha = data['senha']    

    cnx = mysql.connector.connect(**db_config)
    cursor = cnx.cursor()

    query = "INSERT INTO user (nome, email, senha) VALUES (%s, %s, %s)"
    values = (nome, email, senha)
    cursor.execute(query, values)
    cnx.commit()

    cursor.close()
    cnx.close()

    return jsonify({'mensagem': 'Usuário criado com sucesso'})

# Rota para obter todos os registros
@app.route('/api/user', methods=['GET'])
def obter_usuarios():
    cnx = mysql.connector.connect(**db_config)
    cursor = cnx.cursor()

    query = "SELECT * FROM user"
    cursor.execute(query)
    result = cursor.fetchall()

    users = []
    for row in result:
        user = {'id': row[0], 'nome': row[1], 'email': row[2], 'senha': row[3]}
        users.append(user)

    cursor.close()
    cnx.close()

    return jsonify(users)

# Rota para atualizar um registro existente
@app.route('/api/user/<int:id>', methods=['PUT'])
def atualizar_nome(id):
    data = request.get_json()
    nome = data['nome']

    cnx = mysql.connector.connect(**db_config)
    cursor = cnx.cursor()

    query = "UPDATE user SET nome = %s WHERE id = %s"
    values = (nome, id)
    cursor.execute(query, values)
    cnx.commit()

    cursor.close()
    cnx.close()

    return jsonify({'mensagem': 'Usuário atualizado com sucesso'})

@app.route('/api/user/senha/<int:id>', methods=['PUT'])
def atualizar_senha(id):
    data = request.get_json()
    senha = data['senha']

    cnx = mysql.connector.connect(**db_config)
    cursor = cnx.cursor()

    query = "UPDATE user SET senha = %s WHERE id = %s"
    values = (senha, id)
    cursor.execute(query, values)
    cnx.commit()

    cursor.close()
    cnx.close()

    return jsonify({'mensagem': 'Usuário atualizado com sucesso'})

# Rota para excluir um registro existente
@app.route('/api/user/<int:id>', methods=['DELETE'])
def excluir_usuario(id):
    cnx = mysql.connector.connect(**db_config)
    cursor = cnx.cursor()

    query = "DELETE FROM user WHERE id = %s"
    values = (id,)
    cursor.execute(query, values)
    cnx.commit()

    cursor.close()
    cnx.close()

    return jsonify({'mensagem': 'Usuário excluído com sucesso'})


@app.route('/api/exercicio', methods=['POST'])
def favoritar_exercicio():
    data = request.get_json()
    
    level = data['level']
    
    descricao = data['descricao']

    musculo = data['musculo']    

    cnx = mysql.connector.connect(**db_config)
    cursor = cnx.cursor()

    query = "INSERT INTO exercicio (level, descricao, musculo) VALUES (%s, %s, %s)"
    values = (level, descricao, musculo)
    cursor.execute(query, values)
    cnx.commit()

    cursor.close()
    cnx.close()

    return jsonify({'mensagem': 'Exercicio favoritado com sucesso'})

@app.route('/api/exercicio/<int:id>', methods=['DELETE'])
def desfavoritar_exercicio(id):
    cnx = mysql.connector.connect(**db_config)
    cursor = cnx.cursor()

    query = "DELETE FROM exercicio WHERE id = %s"
    values = (id,)
    cursor.execute(query, values)
    cnx.commit()

    cursor.close()
    cnx.close()

    return jsonify({'mensagem': 'exercicio desfavoritado'})

if __name__ == '__main__':
    app.run()