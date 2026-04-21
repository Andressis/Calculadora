import math

def funcao_1grau(a, b, x=None):
    if a == 0:
        return {"erro": "Coeficiente 'a' não pode ser zero."}
    raiz = -b / a
    pontos = [{"x": i, "y": round(a*i + b, 4)} for i in range(-10, 11)]
    res = {"raiz": round(raiz, 4), "coef_angular": a, "coef_linear": b, "pontos": pontos}
    if x is not None:
        res["y_para_x"] = round(a*x + b, 4)
    return res

def funcao_2grau(a, b, c, x=None):
    if a == 0:
        return {"erro": "Coeficiente 'a' não pode ser zero."}
    delta = b**2 - 4*a*c
    vertice_x = round(-b / (2*a), 4)
    vertice_y = round(-delta / (4*a), 4)
    pontos = [{"x": i, "y": round(a*i**2 + b*i + c, 4)} for i in range(-10, 11)]
    res = {
        "delta": round(delta, 4),
        "vertice_x": vertice_x,
        "vertice_y": vertice_y,
        "concavidade": "Para cima (a > 0)" if a > 0 else "Para baixo (a < 0)",
        "pontos": pontos
    }
    if delta > 0:
        r = math.sqrt(delta)
        res["x1"] = round((-b + r) / (2*a), 4)
        res["x2"] = round((-b - r) / (2*a), 4)
    elif delta == 0:
        res["x1"] = res["x2"] = vertice_x
    else:
        res["raizes"] = "Complexas (delta < 0)"
    if x is not None:
        res["y_para_x"] = round(a*x**2 + b*x + c, 4)
    return res

def funcao_exponencial(a, b, x=None):
    if a <= 0:
        return {"erro": "Base 'a' deve ser positiva."}
    if a == 1:
        return {"erro": "Base 'a' não pode ser 1."}
    pontos = [{"x": i, "y": round(b * (a**i), 4)} for i in range(-5, 11)]
    res = {
        "tipo": "Crescente" if a > 1 else "Decrescente",
        "base": a,
        "coeficiente": b,
        "pontos": pontos
    }
    if x is not None:
        res["y_para_x"] = round(b * (a**x), 4)
    return res

def funcao_logaritmica(base, x=None):
    if base <= 0 or base == 1:
        return {"erro": "Base deve ser positiva e diferente de 1."}
    pontos = [{"x": round(i*0.5, 1), "y": round(math.log(i*0.5, base), 4)} for i in range(1, 22)]
    res = {
        "tipo": "Crescente" if base > 1 else "Decrescente",
        "base": base,
        "pontos": pontos
    }
    if x is not None:
        if x <= 0:
            return {"erro": "x deve ser positivo para logaritmo."}
        res["log_x"] = round(math.log(x, base), 6)
    return res

def area_quadrado(lado):
    return {"area": round(lado**2, 4), "perimetro": round(4*lado, 4)}

def area_retangulo(base, altura):
    return {"area": round(base*altura, 4), "perimetro": round(2*(base+altura), 4)}

def area_triangulo(base, altura):
    return {"area": round((base*altura)/2, 4)}

def area_circulo(raio):
    return {
        "area": round(math.pi * raio**2, 4),
        "circunferencia": round(2 * math.pi * raio, 4)
    }

def volume_cilindro(raio, altura):
    return {
        "volume": round(math.pi * raio**2 * altura, 4),
        "area_lateral": round(2 * math.pi * raio * altura, 4),
        "area_total": round(2 * math.pi * raio * (raio + altura), 4)
    }

def volume_esfera(raio):
    return {
        "volume": round((4/3) * math.pi * raio**3, 4),
        "area_superficie": round(4 * math.pi * raio**2, 4)
    }

def pitagoras(a=None, b=None, c=None):
    dados = [a, b, c]
    if dados.count(None) != 1:
        return {"erro": "Informe exatamente dois lados."}
    if a is None:
        val = c**2 - b**2
        if val < 0: return {"erro": "Valores impossíveis para um triângulo retângulo."}
        return {"cateto_a": round(math.sqrt(val), 4)}
    if b is None:
        val = c**2 - a**2
        if val < 0: return {"erro": "Valores impossíveis para um triângulo retângulo."}
        return {"cateto_b": round(math.sqrt(val), 4)}
    return {"hipotenusa": round(math.sqrt(a**2 + b**2), 4)}

def pa(a1, r, n, termo_especifico=None):
    an = a1 + (n - 1) * r
    soma = (n * (a1 + an)) / 2
    tipo = "Crescente" if r > 0 else "Decrescente" if r < 0 else "Constante"
    limite = min(n, 20)
    sequencia = [round(a1 + (i * r), 4) for i in range(limite)]
    resultado = {"an": round(an, 4), "soma": round(soma, 4), "tipo": tipo, "sequencia": sequencia}
    if termo_especifico is not None:
        if termo_especifico <= 0:
            resultado["termo_especifico_erro"] = "O termo deve ser maior que zero."
        else:
            resultado["termo_especifico_pos"] = termo_especifico
            resultado["termo_especifico_val"] = round(a1 + (termo_especifico - 1) * r, 4)
    return resultado

def pg(a1, q, n, termo_especifico=None):
    an = a1 * (q ** (n - 1))
    soma = a1 * (q**n - 1) / (q - 1) if q != 1 else a1 * n
    if q > 1: tipo = "Crescente"
    elif 0 < q < 1: tipo = "Decrescente"
    elif q == 1: tipo = "Constante"
    else: tipo = "Oscilante/Alternada"
    soma_infinita = round(a1 / (1 - q), 4) if -1 < q < 1 else "Não converge"
    limite = min(n, 20)
    sequencia = [round(a1 * (q ** i), 4) for i in range(limite)]
    resultado = {"an": round(an, 4), "soma": round(soma, 4), "soma_infinita": soma_infinita, "tipo": tipo, "sequencia": sequencia}
    if termo_especifico is not None:
        if termo_especifico <= 0:
            resultado["termo_especifico_erro"] = "O termo deve ser maior que zero."
        else:
            resultado["termo_especifico_pos"] = termo_especifico
            resultado["termo_especifico_val"] = round(a1 * (q ** (termo_especifico - 1)), 4)
    return resultado

def trigonometria(angulo_graus):
    rad = math.radians(angulo_graus)
    return {
        "seno": round(math.sin(rad), 6),
        "cosseno": round(math.cos(rad), 6),
        "tangente": round(math.tan(rad), 6) if abs(math.cos(rad)) > 1e-10 else "Indefinido",
        "relacao_fundamental": round(math.sin(rad)**2 + math.cos(rad)**2, 6)
    }

def media_aritmetica(valores):
    if not valores:
        return {"erro": "Lista vazia."}
    return {
        "media": round(sum(valores) / len(valores), 4),
        "quantidade": len(valores),
        "soma": round(sum(valores), 4)
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
    return {"media_ponderada": round(media, 4), "soma_pesos": round(soma_pesos, 4)}

def probabilidade_simples(favoraveis, possiveis):
    if possiveis == 0:
        return {"erro": "Total de casos não pode ser zero."}
    p = favoraveis / possiveis
    return {
        "probabilidade": round(p, 6),
        "percentual": round(p * 100, 4),
        "fracao": f"{favoraveis}/{possiveis}"
    }

def probabilidade_composta(p_a, p_b, tipo="independente"):
    if not (0 <= p_a <= 1 and 0 <= p_b <= 1):
        return {"erro": "Probabilidades devem estar entre 0 e 1."}
    p_intersec = round(p_a * p_b, 6)
    p_uniao    = round(p_a + p_b - p_intersec, 6)
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
    return {"velocidade_ms": round(v, 4), "velocidade_kmh": round(v * 3.6, 4)}

def movimento_uniforme(s0, v, t_max=10):
    pontos = [{"t": i, "s": round(s0 + v*i, 4)} for i in range(0, int(t_max)+1)]
    return {
        "posicao_final": round(s0 + v*t_max, 4),
        "velocidade": v,
        "pontos": pontos
    }

def muv(s0, v0, a, t):
    s  = s0 + v0*t + 0.5*a*t**2
    vf = v0 + a*t
    pontos = [{"t": round(i*0.5, 1), "s": round(s0 + v0*(i*0.5) + 0.5*a*(i*0.5)**2, 4)} for i in range(0, int(t*2)+2)]
    return {
        "posicao": round(s, 4),
        "velocidade_final": round(vf, 4),
        "pontos": pontos
    }

def torricelli(v0, a, ds):
    v2 = v0**2 + 2*a*ds
    if v2 < 0:
        return {"erro": "Resultado impossível: velocidade² negativa."}
    return {"v": round(math.sqrt(v2), 4), "kmh": round(math.sqrt(v2)*3.6, 4)}

def segunda_lei_newton(m, a):
    return {"forca_N": round(m * a, 4)}

def peso(m, g=9.8):
    return {"peso_N": round(m * g, 4), "massa_kg": m, "g_usado": g}

def forca_atrito(mi, normal):
    return {"forca_atrito_N": round(mi * normal, 4)}

def trabalho(F, d, angulo_graus=0):
    rad = math.radians(angulo_graus)
    W = F * d * math.cos(rad)
    return {"trabalho_J": round(W, 4)}

def energia_cinetica(m, v):
    return {"Ec": round((m * v**2) / 2, 4)}

def energia_potencial(m, h, g=9.8):
    return {"Ep": round(m * g * h, 4)}

def conservacao_energia(m, h, v0=0, g=9.8):
    Ep = m * g * h
    Ec = 0.5 * m * v0**2
    E_total = Ep + Ec
    v_final = math.sqrt(2 * g * h + v0**2)
    return {
        "energia_total_J": round(E_total, 4),
        "Ep": round(Ep, 4),
        "Ec_inicial": round(Ec, 4),
        "velocidade_final_ms": round(v_final, 4)
    }

def lei_ohm(V=None, I=None, R=None):
    dados = [V, I, R]
    if dados.count(None) != 1:
        return {"erro": "Informe exatamente dois valores."}
    if V is None:
        return {"V": round(I * R, 4)}
    if I is None:
        if R == 0: return {"erro": "Resistência não pode ser zero."}
        return {"I": round(V / R, 4)}
    return {"R": round(V / I, 4)}

def potencia_eletrica(V=None, I=None, R=None):
    if V is not None and I is not None:
        return {"P_W": round(V * I, 4)}
    if V is not None and R is not None:
        return {"P_W": round(V**2 / R, 4)}
    if I is not None and R is not None:
        return {"P_W": round(I**2 * R, 4)}
    return {"erro": "Informe pelo menos dois valores."}

def resistores_serie(resistores):
    return {"R_total": round(sum(resistores), 4)}

def resistores_paralelo(resistores):
    if 0 in resistores:
        return {"erro": "Resistência não pode ser zero."}
    return {"R_total": round(1 / sum(1/r for r in resistores), 4)}

def calor_sensivel(m, c, dT):
    return {"Q_J": round(m * c * dT, 4)}

def calor_latente(m, L):
    return {"Q_J": round(m * L, 4)}

def dilatacao_termica(L0, alpha, dT):
    dL = L0 * alpha * dT
    return {"variacao_m": round(dL, 6), "comprimento_final_m": round(L0 + dL, 6)}

def velocidade_onda(f, lam):
    return {"v_ms": round(f * lam, 4)}

def equacao_ondulatoria(v, f=None, lam=None):
    if f is None and lam is None:
        return {"erro": "Informe frequência ou comprimento de onda."}
    if f is None:
        return {"frequencia_Hz": round(v / lam, 4)}
    return {"comprimento_onda_m": round(v / f, 4)}

def refracao_snell(n1, angulo1_graus, n2):
    rad1 = math.radians(angulo1_graus)
    sen2 = n1 * math.sin(rad1) / n2
    if abs(sen2) > 1:
        return {"erro": "Reflexão total interna — refração impossível."}
    angulo2 = math.degrees(math.asin(sen2))
    return {
        "angulo_refracao_graus": round(angulo2, 4),
        "n1": n1,
        "n2": n2
    }

def juros_simples(C, i, t):
    J = C * i * t
    M = C + J
    pontos = [{"t": k, "M": round(C + C*i*k, 4)} for k in range(0, int(t)+1)]
    return {"juros": round(J, 4), "montante": round(M, 4), "pontos": pontos}

def juros_compostos(C, i, t):
    M = C * (1 + i)**t
    J = M - C
    pontos = [{"t": k, "M": round(C * (1+i)**k, 4)} for k in range(0, int(t)+1)]
    return {"juros": round(J, 4), "montante": round(M, 4), "pontos": pontos}

def desconto_simples(N, i, t):
    D = N * i * t
    VA = N - D
    return {"desconto": round(D, 4), "valor_atual": round(VA, 4)}

def desconto_composto(N, i, t):
    VA = N / (1 + i)**t
    D  = N - VA
    return {"desconto": round(D, 4), "valor_atual": round(VA, 4)}

def valor_presente(VF, i, t):
    if (1 + i)**t == 0:
        return {"erro": "Divisão por zero."}
    VP = VF / (1 + i)**t
    return {"valor_presente": round(VP, 4)}

def valor_futuro(VP, i, t):
    VF = VP * (1 + i)**t
    return {"valor_futuro": round(VF, 4)}

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
        tabela.append({"parcela": k, "juros": round(juros_k, 4), "amortizacao": round(amort_k, 4), "saldo": round(max(saldo, 0), 4)})
    return {"parcela": round(parcela, 4), "total_pago": round(parcela*n, 4), "total_juros": round(parcela*n - PV, 4), "tabela": tabela}

def regra_72(i_percentual):
    if i_percentual <= 0:
        return {"erro": "Taxa deve ser positiva."}
    t = 72 / i_percentual
    return {"tempo_anos": round(t, 2), "taxa_usada": i_percentual}

def calc_basica(a, b):
    resultado = {
        "adicao":       round(a + b, 6),
        "subtracao":    round(a - b, 6),
        "multiplicacao":round(a * b, 6),
    }
    if b == 0:
        resultado["divisao"] = "Indefinido (divisão por zero)"
    else:
        resultado["divisao"] = round(a / b, 6)
    return resultado
