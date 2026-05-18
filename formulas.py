import math

def funcao_1grau(a, b, x=None):
    if a == 0:
        return {"erro": "Coeficiente 'a' não pode ser zero."}
    raiz = -b / a
    pontos = [{"x": i, "y": round(a*i + b, 2)} for i in range(-10, 11)]
    res = {"raiz": round(raiz, 2), "coef_angular": a, "coef_linear": b, "pontos": pontos}
    if x is not None:
        res["y_para_x"] = round(a*x + b, 2)
    return res

def funcao_2grau(a, b, c, x=None):
    if a == 0:
        return {"erro": "Coeficiente 'a' não pode ser zero."}
    delta = b**2 - 4*a*c
    vertice_x = round(-b / (2*a), 2)
    vertice_y = round(-delta / (4*a), 2)
    pontos = [{"x": i, "y": round(a*i**2 + b*i + c, 2)} for i in range(-10, 11)]
    res = {
        "delta": round(delta, 2),
        "vertice_x": vertice_x,
        "vertice_y": vertice_y,
        "concavidade": "Para cima (a > 0)" if a > 0 else "Para baixo (a < 0)",
        "pontos": pontos
    }
    if delta > 0:
        r = math.sqrt(delta)
        res["x1"] = round((-b + r) / (2*a), 2)
        res["x2"] = round((-b - r) / (2*a), 2)
    elif delta == 0:
        res["x1"] = res["x2"] = vertice_x
    else:
        res["raizes"] = "Complexas (delta < 0)"
    if x is not None:
        res["y_para_x"] = round(a*x**2 + b*x + c, 2)
    return res

def funcao_exponencial(a, b, x=None):
    if a <= 0:
        return {"erro": "Base 'a' deve ser positiva."}
    if a == 1:
        return {"erro": "Base 'a' não pode ser 1."}
    pontos = [{"x": i, "y": round(b * (a**i), 2)} for i in range(-5, 11)]
    res = {
        "tipo": "Crescente" if a > 1 else "Decrescente",
        "base": a,
        "coeficiente": b,
        "pontos": pontos
    }
    if x is not None:
        res["y_para_x"] = round(b * (a**x), 2)
    return res

def funcao_logaritmica(base, x=None):
    if base <= 0 or base == 1:
        return {"erro": "Base deve ser positiva e diferente de 1."}
    pontos = [{"x": round(i*0.5, 1), "y": round(math.log(i*0.5, base), 2)} for i in range(1, 22)]
    res = {
        "tipo": "Crescente" if base > 1 else "Decrescente",
        "base": base,
        "pontos": pontos
    }
    if x is not None:
        if x <= 0:
            return {"erro": "x deve ser positivo para logaritmo."}
        res["log_x"] = round(math.log(x, base), 2)
    return res

def area_quadrado(lado):
    return {"area": round(lado**2, 2), "perimetro": round(4*lado, 2)}

def area_retangulo(base, altura):
    return {"area": round(base*altura, 2), "perimetro": round(2*(base+altura), 2)}

def area_triangulo(base, altura):
    return {"area": round((base*altura)/2, 2)}

def area_circulo(raio):
    return {
        "area": round(math.pi * raio**2, 2),
        "circunferencia": round(2 * math.pi * raio, 2)
    }

def volume_cilindro(raio, altura):
    return {
        "volume": round(math.pi * raio**2 * altura, 2),
        "area_lateral": round(2 * math.pi * raio * altura, 2),
        "area_total": round(2 * math.pi * raio * (raio + altura), 2)
    }

def volume_esfera(raio):
    return {
        "volume": round((4/3) * math.pi * raio**3, 2),
        "area_superficie": round(4 * math.pi * raio**2, 2)
    }

def pitagoras(a=None, b=None, c=None):
    dados = [a, b, c]
    if dados.count(None) != 1:
        return {"erro": "Informe exatamente dois lados."}
    if a is None:
        val = c**2 - b**2
        if val < 0: return {"erro": "Valores impossíveis para um triângulo retângulo."}
        return {"cateto_a": round(math.sqrt(val), 2)}
    if b is None:
        val = c**2 - a**2
        if val < 0: return {"erro": "Valores impossíveis para um triângulo retângulo."}
        return {"cateto_b": round(math.sqrt(val), 2)}
    return {"hipotenusa": round(math.sqrt(a**2 + b**2), 2)}

def pa(a1, r, n, termo_especifico=None):
    an = a1 + (n - 1) * r
    soma = (n * (a1 + an)) / 2
    tipo = "Crescente" if r > 0 else "Decrescente" if r < 0 else "Constante"
    limite = min(n, 20)
    sequencia = [round(a1 + (i * r), 2) for i in range(limite)]
    resultado = {"an": round(an, 2), "soma": round(soma, 2), "tipo": tipo, "sequencia": sequencia}
    if termo_especifico is not None:
        if termo_especifico <= 0:
            resultado["termo_especifico_erro"] = "O termo deve ser maior que zero."
        else:
            resultado["termo_especifico_pos"] = termo_especifico
            resultado["termo_especifico_val"] = round(a1 + (termo_especifico - 1) * r, 2)
    return resultado

def pg(a1, q, n, termo_especifico=None):
    an = a1 * (q ** (n - 1))
    soma = a1 * (q**n - 1) / (q - 1) if q != 1 else a1 * n
    if q > 1: tipo = "Crescente"
    elif 0 < q < 1: tipo = "Decrescente"
    elif q == 1: tipo = "Constante"
    else: tipo = "Oscilante/Alternada"
    soma_infinita = round(a1 / (1 - q), 2) if -1 < q < 1 else "Não converge"
    limite = min(n, 20)
    sequencia = [round(a1 * (q ** i), 2) for i in range(limite)]
    resultado = {"an": round(an, 2), "soma": round(soma, 2), "soma_infinita": soma_infinita, "tipo": tipo, "sequencia": sequencia}
    if termo_especifico is not None:
        if termo_especifico <= 0:
            resultado["termo_especifico_erro"] = "O termo deve ser maior que zero."
        else:
            resultado["termo_especifico_pos"] = termo_especifico
            resultado["termo_especifico_val"] = round(a1 * (q ** (termo_especifico - 1)), 2)
    return resultado

def trigonometria(angulo_graus):
    rad = math.radians(angulo_graus)
    return {
        "seno": round(math.sin(rad), 2),
        "cosseno": round(math.cos(rad), 2),
        "tangente": round(math.tan(rad), 2) if abs(math.cos(rad)) > 1e-10 else "Indefinido",
        "relacao_fundamental": round(math.sin(rad)**2 + math.cos(rad)**2, 2)
    }

def media_aritmetica(valores):
    if not valores:
        return {"erro": "Lista vazia."}
    return {
        "media": round(sum(valores) / len(valores), 2),
        "quantidade": len(valores),
        "soma": round(sum(valores), 2)
    }

def media_ponderada(valores, pesos):
    if len(valores) != len(pesos):
        return {"erro": "Quantidade de valores e pesos diferente."}
    if not valores:
        return {"erro": "Lista vazia."}
    soma_pesos = sum(pesos)
    if soma_pesos == 0:
        return {"erro": "Soma dos pesos não pode ser zero."}
    media = sum(v * p for v, p in zip(valores, pesos)) / soma_pesos
    return {"media_ponderada": round(media, 2), "soma_pesos": round(soma_pesos, 2)}

def probabilidade_simples(favoraveis, possiveis):
    if possiveis == 0:
        return {"erro": "Total de casos não pode ser zero."}
    p = favoraveis / possiveis
    return {
        "probabilidade": round(p, 2),
        "percentual": round(p * 100, 2),
        "fracao": f"{favoraveis}/{possiveis}"
    }

def probabilidade_composta(p_a, p_b, tipo="independente"):
    if not (0 <= p_a <= 1 and 0 <= p_b <= 1):
        return {"erro": "Probabilidades devem estar entre 0 e 1."}
    p_intersec = round(p_a * p_b, 2)
    p_uniao    = round(p_a + p_b - p_intersec, 2)
    return {
        "P(A∩B)": p_intersec,
        "P(A∪B)": p_uniao,
        "P(A)":   p_a,
        "P(B)":   p_b
    }

def velocidade_media(ds, dt):
    if dt == 0:
        return {"erro": "Tempo não pode ser zero."}
    v = ds / dt
    return {"velocidade_ms": round(v, 2), "velocidade_kmh": round(v * 3.6, 2)}

def movimento_uniforme(s0, v, t_max=10):
    pontos = [{"t": i, "s": round(s0 + v*i, 2)} for i in range(0, int(t_max)+1)]
    return {
        "posicao_final": round(s0 + v*t_max, 2),
        "velocidade": v,
        "pontos": pontos
    }

def muv(s0, v0, a, t):
    s  = s0 + v0*t + 0.5*a*t**2
    vf = v0 + a*t
    pontos = [{"t": round(i*0.5, 1), "s": round(s0 + v0*(i*0.5) + 0.5*a*(i*0.5)**2, 2)} for i in range(0, int(t*2)+2)]
    return {
        "posicao": round(s, 2),
        "velocidade_final": round(vf, 2),
        "pontos": pontos
    }

def torricelli(v0, a, ds):
    v2 = v0**2 + 2*a*ds
    if v2 < 0:
        return {"erro": "Resultado impossível: velocidade² negativa."}
    return {"v": round(math.sqrt(v2), 2), "kmh": round(math.sqrt(v2)*3.6, 2)}

def segunda_lei_newton(m, a):
    return {"forca_N": round(m * a, 2)}

def peso(m, g=9.8):
    return {"peso_N": round(m * g, 2), "massa_kg": m, "g_usado": g}

def forca_atrito(mi, normal):
    return {"forca_atrito_N": round(mi * normal, 2)}

def trabalho(F, d, angulo_graus=0):
    rad = math.radians(angulo_graus)
    W = F * d * math.cos(rad)
    return {"trabalho_J": round(W, 2)}

def energia_cinetica(m, v):
    return {"Ec": round((m * v**2) / 2, 2)}

def energia_potencial(m, h, g=9.8):
    return {"Ep": round(m * g * h, 2)}

def conservacao_energia(m, h, v0=0, g=9.8):
    Ep = m * g * h
    Ec = 0.5 * m * v0**2
    E_total = Ep + Ec
    v_final = math.sqrt(2 * g * h + v0**2)
    return {
        "energia_total_J": round(E_total, 2),
        "Ep": round(Ep, 2),
        "Ec_inicial": round(Ec, 2),
        "velocidade_final_ms": round(v_final, 2)
    }

def lei_ohm(V=None, I=None, R=None):
    dados = [V, I, R]
    if dados.count(None) != 1:
        return {"erro": "Informe exatamente dois valores."}
    if V is None:
        return {"V": round(I * R, 2)}
    if I is None:
        if R == 0: return {"erro": "Resistência não pode ser zero."}
        return {"I": round(V / R, 2)}
    return {"R": round(V / I, 2)}

def potencia_eletrica(V=None, I=None, R=None):
    if V is not None and I is not None:
        return {"P_W": round(V * I, 2)}
    if V is not None and R is not None:
        return {"P_W": round(V**2 / R, 2)}
    if I is not None and R is not None:
        return {"P_W": round(I**2 * R, 2)}
    return {"erro": "Informe pelo menos dois valores."}

def resistores_serie(resistores):
    return {"R_total": round(sum(resistores), 2)}

def resistores_paralelo(resistores):
    if 0 in resistores:
        return {"erro": "Resistência não pode ser zero."}
    return {"R_total": round(1 / sum(1/r for r in resistores), 2)}

def calor_sensivel(m, c, dT):
    return {"Q_J": round(m * c * dT, 2)}

def calor_latente(m, L):
    return {"Q_J": round(m * L, 2)}

def dilatacao_termica(L0, alpha, dT):
    dL = L0 * alpha * dT
    return {"variacao_m": round(dL, 6), "comprimento_final_m": round(L0 + dL, 2)}

def velocidade_onda(f, lam):
    return {"v_ms": round(f * lam, 2)}

def equacao_ondulatoria(v, f=None, lam=None):
    if f is None and lam is None:
        return {"erro": "Informe frequência ou comprimento de onda."}
    if f is None:
        return {"frequencia_Hz": round(v / lam, 2)}
    return {"comprimento_onda_m": round(v / f, 2)}

def refracao_snell(n1, angulo1_graus, n2):
    rad1 = math.radians(angulo1_graus)
    sen2 = n1 * math.sin(rad1) / n2
    if abs(sen2) > 1:
        return {"erro": "Reflexão total interna — refração impossível."}
    angulo2 = math.degrees(math.asin(sen2))
    return {
        "angulo_refracao_graus": round(angulo2, 2),
        "n1": n1,
        "n2": n2
    }

def juros_simples(C, i, t, aporte=0):
    # Juros simples: juro calculado sempre sobre o capital inicial
    # Aporte mensal: somado ao saldo sem render juros (critério conservador)
    J = C * i * t
    M = C + J + aporte * t
    pontos = [{"t": k, "M": round(C + C*i*k + aporte*k, 2)} for k in range(0, int(t)+1)]
    res = {"juros": round(J, 2), "montante": round(M, 2), "pontos": pontos}
    if aporte > 0:
        res["aporte_total"] = round(aporte * t, 2)
    return res

def juros_compostos(C, i, t, aporte=0):
    # Montante do capital inicial
    M_capital = C * (1 + i)**t
    # Montante dos aportes mensais (série de pagamentos postecipada)
    if aporte > 0:
        if i > 0:
            M_aporte = aporte * ((1 + i)**t - 1) / i
        else:
            M_aporte = aporte * t
    else:
        M_aporte = 0
    M = M_capital + M_aporte
    J = M - C - aporte * t
    # Pontos mês a mês para o gráfico
    saldo = C
    pontos = []
    for k in range(0, int(t) + 1):
        pontos.append({"t": k, "M": round(saldo, 2)})
        saldo = saldo * (1 + i) + aporte
    res = {"juros": round(J, 2), "montante": round(M, 2), "pontos": pontos}
    if aporte > 0:
        res["aporte_total"] = round(aporte * t, 2)
    return res

def desconto_simples(N, i, t):
    D = N * i * t
    VA = N - D
    return {"desconto": round(D, 2), "valor_atual": round(VA, 2)}

def desconto_composto(N, i, t):
    VA = N / (1 + i)**t
    D  = N - VA
    return {"desconto": round(D, 2), "valor_atual": round(VA, 2)}

def valor_presente(VF, i, t):
    if (1 + i)**t == 0:
        return {"erro": "Divisão por zero."}
    VP = VF / (1 + i)**t
    return {"valor_presente": round(VP, 2)}

def valor_futuro(VP, i, t):
    VF = VP * (1 + i)**t
    return {"valor_futuro": round(VF, 2)}

def amortizacao_price(PV, i, n):
    if i == 0:
        parcela = PV / n
    else:
        parcela = PV * (i * (1+i)**n) / ((1+i)**n - 1)
    tabela = []
    saldo = PV
    for k in range(1, min(n+1, 13)):
        juros_k = saldo * i
        amort_k = parcela - juros_k
        saldo   = saldo - amort_k
        tabela.append({"parcela": k, "juros": round(juros_k, 4), "amortizacao": round(amort_k, 2), "saldo": round(max(saldo, 0), 2)})
    return {"parcela": round(parcela, 4), "total_pago": round(parcela*n, 2), "total_juros": round(parcela*n - PV, 2), "tabela": tabela}

def regra_72(i_percentual):
    if i_percentual <= 0:
        return {"erro": "Taxa deve ser positiva."}
    t = 72 / i_percentual
    return {"tempo_anos": round(t, 2), "taxa_usada": i_percentual}

def calc_basica(a, b):
    resultado = {
        "adicao":       round(a + b, 2),
        "subtracao":    round(a - b, 2),
        "multiplicacao":round(a * b, 2),
    }
    if b == 0:
        resultado["divisao"] = "Indefinido (divisão por zero)"
    else:
        resultado["divisao"] = round(a / b, 2)
    return resultado

# ═══════════════════════════════════════════════════════════
#  INFORMÁTICA
# ═══════════════════════════════════════════════════════════

def conv_base(valor_str, base_origem, base_destino):
    """Converte número entre bases: 2, 8, 10, 16"""
    nomes = {2:'Binário', 8:'Octal', 10:'Decimal', 16:'Hexadecimal'}
    try:
        decimal = int(str(valor_str).strip(), base_origem)
    except ValueError:
        return {"erro": f"Valor inválido para base {base_origem}."}

    resultado = {
        "decimal":     str(decimal),
        "binario":     bin(decimal).replace('0b',''),
        "octal":       oct(decimal).replace('0o',''),
        "hexadecimal": hex(decimal).replace('0x','').upper(),
        "base_origem": nomes.get(base_origem, str(base_origem)),
        "base_destino": nomes.get(base_destino, str(base_destino)),
        "resultado":   format(decimal, {2:'b',8:'o',10:'d',16:'X'}.get(base_destino,'d'))
    }
    return resultado

def conv_armazenamento(valor, unidade_origem, unidade_destino):
    """Converte entre unidades de armazenamento"""
    # Fator em bits
    fatores = {
        'bit': 1,
        'byte': 8,
        'KB': 8 * 1024,
        'MB': 8 * 1024**2,
        'GB': 8 * 1024**3,
        'TB': 8 * 1024**4,
        'PB': 8 * 1024**5,
        'Kib': 1024,
        'Mib': 1024**2,
        'Gib': 1024**3,
    }
    if unidade_origem not in fatores:
        return {"erro": f"Unidade '{unidade_origem}' não reconhecida."}
    if unidade_destino not in fatores:
        return {"erro": f"Unidade destino '{unidade_destino}' não reconhecida."}
    bits = valor * fatores[unidade_origem]
    resultado_val = bits / fatores[unidade_destino]
    # Tabela completa
    tabela = {}
    for u, f in fatores.items():
        tabela[u] = round(bits / f, 6)
    return {
        "valor_entrada": valor,
        "unidade_origem": unidade_origem,
        "unidade_destino": unidade_destino,
        "resultado": round(resultado_val, 6),
        "tabela": tabela
    }

def logica_booleana(a, b):
    """Calcula todas as operações lógicas entre dois valores booleanos"""
    a_bool = bool(int(a))
    b_bool = bool(int(b))
    return {
        "A": int(a_bool),
        "B": int(b_bool),
        "AND":  int(a_bool and b_bool),
        "OR":   int(a_bool or b_bool),
        "XOR":  int(a_bool ^ b_bool),
        "NAND": int(not (a_bool and b_bool)),
        "NOR":  int(not (a_bool or b_bool)),
        "XNOR": int(not (a_bool ^ b_bool)),
        "NOT_A": int(not a_bool),
        "NOT_B": int(not b_bool),
    }