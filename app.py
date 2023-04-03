from flask import Flask, jsonify, request, render_template
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/cep')
def cep():
    return render_template('cep.html')

@app.route('/pesquisa_end', methods=['POST'])
def get_address():
    cep = request.form['cep']
    url = f'https://viacep.com.br/ws/{cep}/json/'
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return render_template('address.html', data=data)
        else:
            return jsonify({'erro': 'CEP não encontrado'})
    except requests.exceptions.RequestException:
        return jsonify({'erro': 'Erro de conexão com a API ViaCEP'})
    
@app.route('/endereco')
def endereco():
    return render_template('endereco.html')

@app.route('/pesquisa_cep', methods=['POST'])
def get_cep():
    estado = request.form.get("select")
    municipio = request.form.get("select2")
    logradouro = request.form['logradouro']
    logradouro = logradouro.replace(" ", "+")
    print(estado, municipio, logradouro)
    url = f'https://viacep.com.br/ws/{estado}/{municipio}/{logradouro}/json/'
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            print(data)
            return render_template('address.html', data=data)
        else:
            return jsonify({'erro': 'CEP não encontrado'})
    except requests.exceptions.RequestException:
        return jsonify({'erro': 'Erro de conexão com a API ViaCEP'})

if __name__ == '__main__':
    app.run(debug=True)
