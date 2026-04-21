from flask import Flask, request, jsonify, render_template, session
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId
from formulas import *

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'calculadora_secret_key_2024')
bcrypt = Bcrypt(app)

import os
MONGO_URI = os.environ.get("MONGO_URI", "mongodb+srv://Andre:Andre123@cluster0.ox6wtsx.mongodb.net/?appName=Cluster0")
SECRET_KEY = os.environ.get("SECRET_KEY", "calculadora_secret_key_2024")
client    = MongoClient(MONGO_URI)
db        = client['calculadora']
usuarios  = db['usuarios']
historico = db['historico']


@app.route('/cadastro', methods=['POST'])
def cadastro():
    data  = request.json
    nome  = data.get('nome', '').strip()
    email = data.get('email', '').strip().lower()
    senha = data.get('senha', '')

    if not nome or not email or not senha:
        return jsonify({"erro": "Preencha todos os campos."}), 400
    if len(senha) < 6:
        return jsonify({"erro": "Senha deve ter ao menos 6 caracteres."}), 400
    if usuarios.find_one({"email": email}):
        return jsonify({"erro": "E-mail já cadastrado."}), 400

    hash_senha = bcrypt.generate_password_hash(senha).decode('utf-8')
    usuarios.insert_one({"nome": nome, "email": email, "senha": hash_senha})
    return jsonify({"ok": True})


@app.route('/login', methods=['POST'])
def login():
    data    = request.json
    email   = data.get('email', '').strip().lower()
    senha   = data.get('senha', '')
    usuario = usuarios.find_one({"email": email})

    if not usuario or not bcrypt.check_password_hash(usuario['senha'], senha):
        return jsonify({"erro": "E-mail ou senha incorretos."}), 401

    session['usuario_id']   = str(usuario['_id'])
    session['usuario_nome'] = usuario['nome']
    return jsonify({"ok": True, "nome": usuario['nome']})


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"ok": True})


@app.route('/sessao')
def sessao():
    if 'usuario_id' in session:
        return jsonify({"logado": True, "nome": session['usuario_nome']})
    return jsonify({"logado": False})


@app.route('/historico')
def get_historico():
    if 'usuario_id' not in session:
        return jsonify({"erro": "Não autenticado."}), 401

    registros = list(historico.find(
        {"usuario_id": session['usuario_id']},
        {"_id": 1, "formula": 1, "entrada": 1, "resultado": 1, "data": 1}
    ).sort("data", -1).limit(50))

    for r in registros:
        r['_id']  = str(r['_id'])
        r['data'] = r['data'].strftime('%d/%m/%Y %H:%M')

    return jsonify(registros)


@app.route('/historico', methods=['DELETE'])
def limpar_historico():
    if 'usuario_id' not in session:
        return jsonify({"erro": "Não autenticado."}), 401
    historico.delete_many({"usuario_id": session['usuario_id']})
    return jsonify({"ok": True})


@app.route('/historico/<id>', methods=['DELETE'])
def deletar_registro(id):
    if 'usuario_id' not in session:
        return jsonify({"erro": "Não autenticado."}), 401
    historico.delete_one({"_id": ObjectId(id), "usuario_id": session['usuario_id']})
    return jsonify({"ok": True})


def salvar_historico(formula, entrada, resultado):
    if 'usuario_id' not in session:
        return
    if isinstance(resultado, dict) and 'erro' in resultado:
        return
    safe = {k: v for k, v in resultado.items() if k not in ('pontos', 'sequencia', 'tabela')}
    historico.insert_one({
        "usuario_id": session['usuario_id'],
        "formula":    formula,
        "entrada":    entrada,
        "resultado":  safe,
        "data":       datetime.utcnow()
    })


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/calc/<tipo>', methods=['POST'])
def calc(tipo):
    d = request.json
    if not d:
        return jsonify({"erro": "Nenhum dado recebido."}), 400

    def req(*campos):
        for c in campos:
            if c not in d or str(d[c]).strip() == '':
                raise ValueError(f"Campo '{c}' é obrigatório.")

    def f(campo): return float(d[campo])
    def i(campo): return int(d[campo])

    try:
        if tipo == 'calc_basica':
            req('a', 'b')
            res    = calc_basica(f('a'), f('b'))
            entrada = {'a': d['a'], 'b': d['b']}

        elif tipo == 'funcao_1grau':
            req('a', 'b')
            x       = f('x') if d.get('x', '') != '' else None
            res     = funcao_1grau(f('a'), f('b'), x)
            entrada = {"a": d['a'], "b": d['b']}

        elif tipo == 'funcao_2grau':
            req('a', 'b', 'c')
            x       = f('x') if d.get('x', '') != '' else None
            res     = funcao_2grau(f('a'), f('b'), f('c'), x)
            entrada = {"a": d['a'], "b": d['b'], "c": d['c']}

        elif tipo == 'funcao_exponencial':
            req('a', 'b')
            x       = f('x') if d.get('x', '') != '' else None
            res     = funcao_exponencial(f('a'), f('b'), x)
            entrada = {"a": d['a'], "b": d['b']}

        elif tipo == 'funcao_logaritmica':
            req('base')
            x       = f('x') if d.get('x', '') != '' else None
            res     = funcao_logaritmica(f('base'), x)
            entrada = {"base": d['base']}

        elif tipo == 'area_quadrado':
            req('lado')
            res     = area_quadrado(f('lado'))
            entrada = {"lado": d['lado']}

        elif tipo == 'area_retangulo':
            req('base', 'altura')
            res     = area_retangulo(f('base'), f('altura'))
            entrada = {"base": d['base'], "altura": d['altura']}

        elif tipo == 'area_triangulo':
            req('base', 'altura')
            res     = area_triangulo(f('base'), f('altura'))
            entrada = {"base": d['base'], "altura": d['altura']}

        elif tipo == 'area_circulo':
            req('raio')
            res     = area_circulo(f('raio'))
            entrada = {"raio": d['raio']}

        elif tipo == 'volume_cilindro':
            req('raio', 'altura')
            res     = volume_cilindro(f('raio'), f('altura'))
            entrada = {"raio": d['raio'], "altura": d['altura']}

        elif tipo == 'volume_esfera':
            req('raio')
            res     = volume_esfera(f('raio'))
            entrada = {"raio": d['raio']}

        elif tipo == 'pitagoras':
            a       = f('a') if d.get('a', '') != '' else None
            b       = f('b') if d.get('b', '') != '' else None
            c       = f('c') if d.get('c', '') != '' else None
            res     = pitagoras(a, b, c)
            entrada = {"a": d.get('a', '?'), "b": d.get('b', '?'), "c": d.get('c', '?')}

        elif tipo == 'pa':
            req('a1', 'r', 'n')
            te      = i('termo_especifico') if d.get('termo_especifico', '') != '' else None
            res     = pa(f('a1'), f('r'), i('n'), te)
            entrada = {"a1": d['a1'], "r": d['r'], "n": d['n']}

        elif tipo == 'pg':
            req('a1', 'q', 'n')
            if f('q') == 0:
                raise ValueError("Razão 'q' não pode ser zero.")
            te      = i('termo_especifico') if d.get('termo_especifico', '') != '' else None
            res     = pg(f('a1'), f('q'), i('n'), te)
            entrada = {"a1": d['a1'], "q": d['q'], "n": d['n']}

        elif tipo == 'trigonometria':
            req('angulo')
            res     = trigonometria(f('angulo'))
            entrada = {"angulo": d['angulo']}

        elif tipo == 'media_aritmetica':
            req('valores')
            vals    = [float(v.strip()) for v in str(d['valores']).split(',')]
            res     = media_aritmetica(vals)
            entrada = {"valores": d['valores']}

        elif tipo == 'media_ponderada':
            req('valores', 'pesos')
            vals    = [float(v.strip()) for v in str(d['valores']).split(',')]
            pesos   = [float(p.strip()) for p in str(d['pesos']).split(',')]
            res     = media_ponderada(vals, pesos)
            entrada = {"valores": d['valores'], "pesos": d['pesos']}

        elif tipo == 'probabilidade_simples':
            req('favoraveis', 'possiveis')
            res     = probabilidade_simples(f('favoraveis'), f('possiveis'))
            entrada = {"favoraveis": d['favoraveis'], "possiveis": d['possiveis']}

        elif tipo == 'probabilidade_composta':
            req('p_a', 'p_b')
            res     = probabilidade_composta(f('p_a'), f('p_b'))
            entrada = {"p_a": d['p_a'], "p_b": d['p_b']}

        elif tipo == 'velocidade_media':
            req('ds', 'dt')
            res     = velocidade_media(f('ds'), f('dt'))
            entrada = {"ds": d['ds'], "dt": d['dt']}

        elif tipo == 'movimento_uniforme':
            req('s0', 'v', 't')
            res     = movimento_uniforme(f('s0'), f('v'), f('t'))
            entrada = {"s0": d['s0'], "v": d['v'], "t": d['t']}

        elif tipo == 'muv':
            req('s0', 'v0', 'a', 't')
            res     = muv(f('s0'), f('v0'), f('a'), f('t'))
            entrada = {"s0": d['s0'], "v0": d['v0'], "a": d['a'], "t": d['t']}

        elif tipo == 'torricelli':
            req('v0', 'a', 'ds')
            res     = torricelli(f('v0'), f('a'), f('ds'))
            entrada = {"v0": d['v0'], "a": d['a'], "ds": d['ds']}

        elif tipo == 'segunda_lei_newton':
            req('m', 'a')
            res     = segunda_lei_newton(f('m'), f('a'))
            entrada = {"m": d['m'], "a": d['a']}

        elif tipo == 'peso':
            req('m')
            g       = f('g') if d.get('g', '') != '' else 9.8
            res     = peso(f('m'), g)
            entrada = {"m": d['m'], "g": g}

        elif tipo == 'forca_atrito':
            req('mi', 'normal')
            res     = forca_atrito(f('mi'), f('normal'))
            entrada = {"mi": d['mi'], "normal": d['normal']}

        elif tipo == 'trabalho':
            req('F', 'dist')
            ang     = f('angulo') if d.get('angulo', '') != '' else 0
            res     = trabalho(f('F'), f('dist'), ang)
            entrada = {"F": d['F'], "dist": d['dist'], "angulo": ang}

        elif tipo == 'energia_cinetica':
            req('m', 'v')
            res     = energia_cinetica(f('m'), f('v'))
            entrada = {"m": d['m'], "v": d['v']}

        elif tipo == 'energia_potencial':
            req('m', 'h')
            g       = f('g') if d.get('g', '') != '' else 9.8
            res     = energia_potencial(f('m'), f('h'), g)
            entrada = {"m": d['m'], "h": d['h']}

        elif tipo == 'conservacao_energia':
            req('m', 'h')
            v0      = f('v0') if d.get('v0', '') != '' else 0
            res     = conservacao_energia(f('m'), f('h'), v0)
            entrada = {"m": d['m'], "h": d['h'], "v0": v0}

        elif tipo == 'lei_ohm':
            V       = f('V') if d.get('V', '') != '' else None
            I       = f('I') if d.get('I', '') != '' else None
            R       = f('R') if d.get('R', '') != '' else None
            res     = lei_ohm(V, I, R)
            entrada = {"V": d.get('V', '?'), "I": d.get('I', '?'), "R": d.get('R', '?')}

        elif tipo == 'potencia_eletrica':
            V       = f('V') if d.get('V', '') != '' else None
            I       = f('I') if d.get('I', '') != '' else None
            R       = f('R') if d.get('R', '') != '' else None
            res     = potencia_eletrica(V, I, R)
            entrada = {"V": d.get('V', '?'), "I": d.get('I', '?'), "R": d.get('R', '?')}

        elif tipo == 'resistores_serie':
            req('resistores')
            rs      = [float(v.strip()) for v in str(d['resistores']).split(',')]
            res     = resistores_serie(rs)
            entrada = {"resistores": d['resistores']}

        elif tipo == 'resistores_paralelo':
            req('resistores')
            rs      = [float(v.strip()) for v in str(d['resistores']).split(',')]
            res     = resistores_paralelo(rs)
            entrada = {"resistores": d['resistores']}

        elif tipo == 'calor_sensivel':
            req('m', 'c', 'dT')
            res     = calor_sensivel(f('m'), f('c'), f('dT'))
            entrada = {"m": d['m'], "c": d['c'], "dT": d['dT']}

        elif tipo == 'calor_latente':
            req('m', 'L')
            res     = calor_latente(f('m'), f('L'))
            entrada = {"m": d['m'], "L": d['L']}

        elif tipo == 'dilatacao_termica':
            req('L0', 'alpha', 'dT')
            res     = dilatacao_termica(f('L0'), f('alpha'), f('dT'))
            entrada = {"L0": d['L0'], "alpha": d['alpha'], "dT": d['dT']}

        elif tipo == 'velocidade_onda':
            req('f', 'lam')
            res     = velocidade_onda(f('f'), f('lam'))
            entrada = {"f": d['f'], "lam": d['lam']}

        elif tipo == 'equacao_ondulatoria':
            req('v')
            freq    = f('f')   if d.get('f',   '') != '' else None
            lam     = f('lam') if d.get('lam', '') != '' else None
            res     = equacao_ondulatoria(f('v'), freq, lam)
            entrada = {"v": d['v']}

        elif tipo == 'refracao_snell':
            req('n1', 'angulo1', 'n2')
            res     = refracao_snell(f('n1'), f('angulo1'), f('n2'))
            entrada = {"n1": d['n1'], "angulo1": d['angulo1'], "n2": d['n2']}

        elif tipo == 'juros_simples':
            req('C', 'i', 't')
            res     = juros_simples(f('C'), f('i'), f('t'))
            entrada = {"C": d['C'], "i": d['i'], "t": d['t']}

        elif tipo == 'juros_compostos':
            req('C', 'i', 't')
            res     = juros_compostos(f('C'), f('i'), f('t'))
            entrada = {"C": d['C'], "i": d['i'], "t": d['t']}

        elif tipo == 'desconto_simples':
            req('N', 'i', 't')
            res     = desconto_simples(f('N'), f('i'), f('t'))
            entrada = {"N": d['N'], "i": d['i'], "t": d['t']}

        elif tipo == 'desconto_composto':
            req('N', 'i', 't')
            res     = desconto_composto(f('N'), f('i'), f('t'))
            entrada = {"N": d['N'], "i": d['i'], "t": d['t']}

        elif tipo == 'valor_presente':
            req('VF', 'i', 't')
            res     = valor_presente(f('VF'), f('i'), f('t'))
            entrada = {"VF": d['VF'], "i": d['i'], "t": d['t']}

        elif tipo == 'valor_futuro':
            req('VP', 'i', 't')
            res     = valor_futuro(f('VP'), f('i'), f('t'))
            entrada = {"VP": d['VP'], "i": d['i'], "t": d['t']}

        elif tipo == 'amortizacao_price':
            req('PV', 'i', 'n')
            res     = amortizacao_price(f('PV'), f('i'), i('n'))
            entrada = {"PV": d['PV'], "i": d['i'], "n": d['n']}

        elif tipo == 'regra_72':
            req('i')
            res     = regra_72(f('i'))
            entrada = {"i": d['i']}

        else:
            return jsonify({"erro": "Fórmula não implementada."}), 404

        salvar_historico(tipo, entrada, res)
        return jsonify(res)

    except ValueError as e:
        return jsonify({"erro": str(e)}), 400
    except Exception as e:
        return jsonify({"erro": f"Erro interno: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
