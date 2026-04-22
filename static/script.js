let chart = null;

const categorias = {
    matematica: [
        { id: "calc_basica",           label: "🔢 Calculadora Básica" },
        { id: "funcao_1grau",          label: "📈 Função do 1º grau" },
        { id: "funcao_2grau",          label: "📈 Função do 2º grau (Bhaskara)" },
        { id: "funcao_exponencial",    label: "📈 Função Exponencial" },
        { id: "funcao_logaritmica",    label: "📈 Função Logarítmica" },
        { id: "area_quadrado",         label: "📐 Área do Quadrado" },
        { id: "area_retangulo",        label: "📐 Área do Retângulo" },
        { id: "area_triangulo",        label: "📐 Área do Triângulo" },
        { id: "area_circulo",          label: "📐 Área do Círculo" },
        { id: "volume_cilindro",       label: "📐 Volume do Cilindro" },
        { id: "volume_esfera",         label: "📐 Volume da Esfera" },
        { id: "pitagoras",             label: "📐 Teorema de Pitágoras" },
        { id: "pa",                    label: "📊 Progressão Aritmética (PA)" },
        { id: "pg",                    label: "📊 Progressão Geométrica (PG)" },
        { id: "trigonometria",         label: "📐 Trigonometria" },
        { id: "media_aritmetica",      label: "🧮 Média Aritmética" },
        { id: "media_ponderada",       label: "🧮 Média Ponderada" },
        { id: "probabilidade_simples", label: "🧮 Probabilidade Simples" },
        { id: "probabilidade_composta",label: "🧮 Probabilidade Composta" },
    ],
    fisica: [
        { id: "velocidade_media",      label: "🚗 Velocidade Média" },
        { id: "movimento_uniforme",    label: "🚗 Movimento Uniforme (MU)" },
        { id: "muv",                   label: "🚗 Movimento Unif. Variado (MUV)" },
        { id: "torricelli",            label: "🚗 Equação de Torricelli" },
        { id: "segunda_lei_newton",    label: "💥 2ª Lei de Newton (F=ma)" },
        { id: "peso",                  label: "💥 Peso" },
        { id: "forca_atrito",          label: "💥 Força de Atrito" },
        { id: "trabalho",              label: "⚡ Trabalho de uma Força" },
        { id: "energia_cinetica",      label: "⚡ Energia Cinética" },
        { id: "energia_potencial",     label: "⚡ Energia Potencial" },
        { id: "conservacao_energia",   label: "⚡ Conservação de Energia" },
        { id: "lei_ohm",               label: "🔌 Lei de Ohm" },
        { id: "potencia_eletrica",     label: "🔌 Potência Elétrica" },
        { id: "resistores_serie",      label: "🔌 Resistores em Série" },
        { id: "resistores_paralelo",   label: "🔌 Resistores em Paralelo" },
        { id: "calor_sensivel",        label: "🌡️ Calor Sensível" },
        { id: "calor_latente",         label: "🌡️ Calor Latente" },
        { id: "dilatacao_termica",     label: "🌡️ Dilatação Térmica" },
        { id: "velocidade_onda",       label: "🌊 Velocidade da Onda" },
        { id: "equacao_ondulatoria",   label: "🌊 Equação Ondulatória" },
        { id: "refracao_snell",        label: "🌊 Refração (Lei de Snell)" },
    ],
    financeiro: [
        { id: "juros_simples",         label: "💰 Juros Simples" },
        { id: "juros_compostos",       label: "💰 Juros Compostos" },
        { id: "desconto_simples",      label: "💰 Desconto Simples" },
        { id: "desconto_composto",     label: "💰 Desconto Composto" },
        { id: "valor_presente",        label: "💰 Valor Presente" },
        { id: "valor_futuro",          label: "💰 Valor Futuro" },
        { id: "amortizacao_price",     label: "💰 Amortização (Tabela Price)" },
        { id: "regra_72",              label: "💰 Regra de 72" },
    ]
};

const formulasLatex = {
    calc_basica:           "a + b, \\quad a - b, \\quad a \\times b, \\quad a \\div b",
    funcao_1grau:          "f(x) = ax + b",
    funcao_2grau:          "f(x) = ax^2 + bx + c",
    funcao_exponencial:    "f(x) = b \\cdot a^x",
    funcao_logaritmica:    "f(x) = \\log_a(x)",
    area_quadrado:         "A = l^2",
    area_retangulo:        "A = b \\times h",
    area_triangulo:        "A = \\dfrac{b \\times h}{2}",
    area_circulo:          "A = \\pi r^2",
    volume_cilindro:       "V = \\pi r^2 h",
    volume_esfera:         "V = \\dfrac{4}{3}\\pi r^3",
    pitagoras:             "a^2 + b^2 = c^2",
    pa:                    "a_n = a_1 + (n-1)r",
    pg:                    "a_n = a_1 \\cdot q^{(n-1)}",
    trigonometria:         "\\sin^2\\theta + \\cos^2\\theta = 1",
    media_aritmetica:      "\\bar{x} = \\dfrac{\\sum x_i}{n}",
    media_ponderada:       "\\bar{x}_p = \\dfrac{\\sum x_i p_i}{\\sum p_i}",
    probabilidade_simples: "P(A) = \\dfrac{n(A)}{n(\\Omega)}",
    probabilidade_composta:"P(A \\cap B) = P(A) \\cdot P(B)",
    velocidade_media:      "v_m = \\dfrac{\\Delta s}{\\Delta t}",
    movimento_uniforme:    "s = s_0 + vt",
    muv:                   "s = s_0 + v_0 t + \\dfrac{at^2}{2}",
    torricelli:            "v^2 = v_0^2 + 2a\\Delta s",
    segunda_lei_newton:    "F = ma",
    peso:                  "P = mg",
    forca_atrito:          "f = \\mu N",
    trabalho:              "W = F \\cdot d \\cdot \\cos\\theta",
    energia_cinetica:      "E_c = \\dfrac{mv^2}{2}",
    energia_potencial:     "E_p = mgh",
    conservacao_energia:   "E_m = E_c + E_p",
    lei_ohm:               "V = R \\cdot I",
    potencia_eletrica:     "P = V \\cdot I",
    resistores_serie:      "R_T = R_1 + R_2 + \\cdots",
    resistores_paralelo:   "\\dfrac{1}{R_T} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\cdots",
    calor_sensivel:        "Q = mc\\Delta T",
    calor_latente:         "Q = mL",
    dilatacao_termica:     "\\Delta L = L_0 \\alpha \\Delta T",
    velocidade_onda:       "v = f \\cdot \\lambda",
    equacao_ondulatoria:   "v = f \\cdot \\lambda",
    refracao_snell:        "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2",
    juros_simples:         "M = C(1 + it)",
    juros_compostos:       "M = C(1 + i)^t",
    desconto_simples:      "D = N \\cdot i \\cdot t",
    desconto_composto:     "VA = \\dfrac{N}{(1+i)^t}",
    valor_presente:        "VP = \\dfrac{VF}{(1+i)^t}",
    valor_futuro:          "VF = VP \\cdot (1+i)^t",
    amortizacao_price:     "PMT = PV \\cdot \\dfrac{i(1+i)^n}{(1+i)^n - 1}",
    regra_72:              "t \\approx \\dfrac{72}{i}",
};

const explicacoes = {
    calc_basica:           "Digite os dois números e clique em uma operação ou em <b>Calcular Tudo</b>.<br><small>💡 Suporta decimais — use ponto (ex: 3.14)</small>",
    funcao_1grau:          "<b>a:</b> inclinação, <b>b:</b> intercepto no eixo y.<br><small>💡 Teste: a=2, b=-1 → f(x)=2x-1, raiz=0.5</small>",
    funcao_2grau:          "<b>a:</b> coef. x², <b>b:</b> coef. x, <b>c:</b> constante.<br><small>💡 Teste: a=1, b=-5, c=6 → raízes 3 e 2</small>",
    funcao_exponencial:    "<b>a:</b> base (>0, ≠1), <b>b:</b> coeficiente.<br><small>💡 Teste: a=2, b=1 → dobra a cada unidade</small>",
    funcao_logaritmica:    "<b>base:</b> base do log (>0, ≠1), <b>x:</b> calcular log(x).<br><small>💡 Teste: base=10, x=100 → log=2</small>",
    area_quadrado:         "<b>lado:</b> comprimento do lado.<br><small>💡 Teste: lado=5 → A=25</small>",
    area_retangulo:        "<b>base</b> e <b>altura</b> em qualquer unidade.<br><small>💡 Teste: base=4, altura=6 → A=24</small>",
    area_triangulo:        "<b>base</b> e <b>altura</b> perpendicular à base.<br><small>💡 Teste: base=6, altura=4 → A=12</small>",
    area_circulo:          "<b>raio:</b> distância do centro à borda.<br><small>💡 Teste: raio=5 → A≈78.54</small>",
    volume_cilindro:       "<b>raio</b> da base e <b>altura</b> do cilindro.<br><small>💡 Teste: raio=3, altura=10 → V≈282.74</small>",
    volume_esfera:         "<b>raio:</b> raio da esfera.<br><small>💡 Teste: raio=4 → V≈268.08</small>",
    pitagoras:             "Deixe <b>um campo vazio</b> para calcular aquele lado.<br><small>💡 Teste: a=3, b=4 → hipotenusa=5</small>",
    pa:                    "<b>a1:</b> 1º termo, <b>r:</b> razão, <b>n:</b> posição.<br><small>💡 Teste: a1=2, r=3, n=10 → an=29</small>",
    pg:                    "<b>a1:</b> 1º termo, <b>q:</b> razão, <b>n:</b> posição.<br><small>💡 Teste: a1=100, q=0.5, n=5</small>",
    trigonometria:         "<b>ângulo:</b> em graus (0° a 360°).<br><small>💡 Teste: 30° → sen=0.5, cos≈0.866, tan≈0.577</small>",
    media_aritmetica:      "Digite os <b>valores separados por vírgula</b>.<br><small>💡 Teste: 5, 7, 9, 11 → média=8</small>",
    media_ponderada:       "Digite <b>valores</b> e seus <b>pesos</b> separados por vírgula.<br><small>💡 Teste: valores=8,6,9 / pesos=2,3,5</small>",
    probabilidade_simples: "<b>favoráveis:</b> casos do evento, <b>possíveis:</b> total de casos.<br><small>💡 Teste: fav=3, pos=6 → P=50%</small>",
    probabilidade_composta:"<b>P(A)</b> e <b>P(B)</b> entre 0 e 1 (eventos independentes).<br><small>💡 Teste: P(A)=0.3, P(B)=0.5</small>",
    velocidade_media:      "<b>Δs:</b> deslocamento (m), <b>Δt:</b> tempo (s).<br><small>💡 Teste: ds=100, dt=10 → v=10 m/s</small>",
    movimento_uniforme:    "<b>s0:</b> pos. inicial, <b>v:</b> velocidade, <b>t:</b> tempo final.<br><small>💡 Teste: s0=0, v=5, t=10 → s=50m</small>",
    muv:                   "<b>s0, v0, a, t</b> — posição, velocidade inicial, aceleração e tempo.<br><small>💡 Teste: s0=0, v0=0, a=2, t=5 → s=25m</small>",
    torricelli:            "<b>v0:</b> vel. inicial, <b>a:</b> aceleração, <b>Δs:</b> deslocamento.<br><small>💡 Teste: v0=0, a=2, ds=25 → v=10 m/s</small>",
    segunda_lei_newton:    "<b>m:</b> massa (kg), <b>a:</b> aceleração (m/s²).<br><small>💡 Teste: m=70, a=2 → F=140 N</small>",
    peso:                  "<b>m:</b> massa (kg), <b>g:</b> gravidade (padrão 9.8 m/s²).<br><small>💡 Teste: m=70 → P=686 N</small>",
    forca_atrito:          "<b>μ:</b> coef. de atrito, <b>N:</b> força normal (N).<br><small>💡 Teste: μ=0.4, N=100 → fat=40 N</small>",
    trabalho:              "<b>F:</b> força (N), <b>d:</b> distância (m), <b>θ:</b> ângulo (padrão 0°).<br><small>💡 Teste: F=50, d=10 → W=500 J</small>",
    energia_cinetica:      "<b>m:</b> massa (kg), <b>v:</b> velocidade (m/s).<br><small>💡 Teste: m=80, v=10 → Ec=4000 J</small>",
    energia_potencial:     "<b>m:</b> massa (kg), <b>h:</b> altura (m).<br><small>💡 Teste: m=10, h=5 → Ep=490 J</small>",
    conservacao_energia:   "<b>m:</b> massa, <b>h:</b> altura, <b>v0:</b> velocidade inicial (padrão 0).<br><small>💡 Teste: m=2, h=10 → Etotal=196 J</small>",
    lei_ohm:               "Preencha <b>dois dos três campos</b> para calcular o terceiro.<br><small>💡 Teste: V=12, R=4 → I=3 A</small>",
    potencia_eletrica:     "Preencha <b>dois dos três campos</b>.<br><small>💡 Teste: V=220, I=5 → P=1100 W</small>",
    resistores_serie:      "Digite as <b>resistências separadas por vírgula</b>.<br><small>💡 Teste: 10, 20, 30 → RT=60 Ω</small>",
    resistores_paralelo:   "Digite as <b>resistências separadas por vírgula</b>.<br><small>💡 Teste: 10, 20 → RT≈6.67 Ω</small>",
    calor_sensivel:        "<b>m:</b> massa (kg), <b>c:</b> calor específico, <b>ΔT:</b> variação de temperatura.<br><small>💡 Teste: m=2, c=4186, dT=10 → Q=83720 J</small>",
    calor_latente:         "<b>m:</b> massa (kg), <b>L:</b> calor latente (J/kg).<br><small>💡 Teste: m=0.5, L=334000 → Q=167000 J</small>",
    dilatacao_termica:     "<b>L0:</b> comp. inicial, <b>α:</b> coef. dilatação, <b>ΔT:</b> variação de temp.<br><small>💡 Teste: L0=10, α=0.000012, dT=100 → ΔL=0.012 m</small>",
    velocidade_onda:       "<b>f:</b> frequência (Hz), <b>λ:</b> comprimento de onda (m).<br><small>💡 Teste: f=440, λ=0.77 → v≈339 m/s</small>",
    equacao_ondulatoria:   "<b>v:</b> velocidade, deixe <b>f ou λ vazio</b> para calcular.<br><small>💡 Teste: v=340, f=170 → λ=2 m</small>",
    refracao_snell:        "<b>n1, θ1:</b> meio e ângulo de incidência, <b>n2:</b> meio de refração.<br><small>💡 Teste: n1=1, θ1=30, n2=1.5 → θ2≈19.47°</small>",
    juros_simples:         "<b>C:</b> capital, <b>i:</b> taxa (ex: 0.05=5%), <b>t:</b> períodos.<br><small>💡 Teste: C=1000, i=0.05, t=12 → M=1600</small>",
    juros_compostos:       "<b>C:</b> capital, <b>i:</b> taxa (ex: 0.05=5%), <b>t:</b> períodos.<br><small>💡 Teste: C=1000, i=0.05, t=12 → M≈1795.86</small>",
    desconto_simples:      "<b>N:</b> valor nominal, <b>i:</b> taxa, <b>t:</b> tempo.<br><small>💡 Teste: N=1000, i=0.03, t=3 → VA=910</small>",
    desconto_composto:     "<b>N:</b> valor nominal, <b>i:</b> taxa, <b>t:</b> tempo.<br><small>💡 Teste: N=1000, i=0.03, t=3 → VA≈915.14</small>",
    valor_presente:        "<b>VF:</b> valor futuro, <b>i:</b> taxa, <b>t:</b> períodos.<br><small>💡 Teste: VF=1000, i=0.05, t=5 → VP≈783.53</small>",
    valor_futuro:          "<b>VP:</b> valor presente, <b>i:</b> taxa, <b>t:</b> períodos.<br><small>💡 Teste: VP=1000, i=0.05, t=5 → VF≈1276.28</small>",
    amortizacao_price:     "<b>PV:</b> valor do empréstimo, <b>i:</b> taxa mensal, <b>n:</b> parcelas.<br><small>💡 Teste: PV=10000, i=0.02, n=12 → parcela≈948.79</small>",
    regra_72:              "<b>i:</b> taxa anual em % (ex: 6 = 6% ao ano).<br><small>💡 Teste: i=6 → tempo≈12 anos para dobrar</small>",
};

const inputMap = {
    calc_basica:           { a:'bas_a', b:'bas_b' },
    funcao_1grau:          { a:'f1_a', b:'f1_b', x:'f1_x' },
    funcao_2grau:          { a:'f2_a', b:'f2_b', c:'f2_c', x:'f2_x' },
    funcao_exponencial:    { a:'fe_a', b:'fe_b', x:'fe_x' },
    funcao_logaritmica:    { base:'fl_base', x:'fl_x' },
    area_quadrado:         { lado:'aq_lado' },
    area_retangulo:        { base:'ar_base', altura:'ar_altura' },
    area_triangulo:        { base:'at_base', altura:'at_altura' },
    area_circulo:          { raio:'ac_raio' },
    volume_cilindro:       { raio:'vc_raio', altura:'vc_altura' },
    volume_esfera:         { raio:'ve_raio' },
    pitagoras:             { a:'pit_a', b:'pit_b', c:'pit_c' },
    pa:                    { a1:'pa_a1', r:'pa_r', n:'pa_n', termo_especifico:'pa_te' },
    pg:                    { a1:'pg_a1', q:'pg_q', n:'pg_n', termo_especifico:'pg_te' },
    trigonometria:         { angulo:'trig_angulo' },
    media_aritmetica:      { valores:'ma_valores' },
    media_ponderada:       { valores:'mp_valores', pesos:'mp_pesos' },
    probabilidade_simples: { favoraveis:'ps_fav', possiveis:'ps_pos' },
    probabilidade_composta:{ p_a:'pc_pa', p_b:'pc_pb' },
    velocidade_media:      { ds:'vm_ds', dt:'vm_dt' },
    movimento_uniforme:    { s0:'mu_s0', v:'mu_v', t:'mu_t' },
    muv:                   { s0:'muv_s0', v0:'muv_v0', a:'muv_a', t:'muv_t' },
    torricelli:            { v0:'tor_v0', a:'tor_a', ds:'tor_ds' },
    segunda_lei_newton:    { m:'sln_m', a:'sln_a' },
    peso:                  { m:'pe_m', g:'pe_g' },
    forca_atrito:          { mi:'fa_mi', normal:'fa_normal' },
    trabalho:              { F:'tr_F', dist:'tr_dist', angulo:'tr_ang' },
    energia_cinetica:      { m:'ec_m', v:'ec_v' },
    energia_potencial:     { m:'ep_m', h:'ep_h', g:'ep_g' },
    conservacao_energia:   { m:'ce_m', h:'ce_h', v0:'ce_v0' },
    lei_ohm:               { V:'ohm_V', I:'ohm_I', R:'ohm_R' },
    potencia_eletrica:     { V:'pot_V', I:'pot_I', R:'pot_R' },
    resistores_serie:      { resistores:'rs_res' },
    resistores_paralelo:   { resistores:'rp_res' },
    calor_sensivel:        { m:'cs_m', c:'cs_c', dT:'cs_dT' },
    calor_latente:         { m:'cl_m', L:'cl_L' },
    dilatacao_termica:     { L0:'dt_L0', alpha:'dt_alpha', dT:'dt_dT' },
    velocidade_onda:       { f:'vo_f', lam:'vo_lam' },
    equacao_ondulatoria:   { v:'eo_v', f:'eo_f', lam:'eo_lam' },
    refracao_snell:        { n1:'sn_n1', angulo1:'sn_ang', n2:'sn_n2' },
    juros_simples:         { C:'js_C', i:'js_i', t:'js_t' },
    juros_compostos:       { C:'jc_C', i:'jc_i', t:'jc_t' },
    desconto_simples:      { N:'ds_N', i:'ds_i', t:'ds_t' },
    desconto_composto:     { N:'dc_N', i:'dc_i', t:'dc_t' },
    valor_presente:        { VF:'vp_VF', i:'vp_i', t:'vp_t' },
    valor_futuro:          { VP:'vf_VP', i:'vf_i', t:'vf_t' },
    amortizacao_price:     { PV:'ap_PV', i:'ap_i', n:'ap_n' },
    regra_72:              { i:'r72_i' },
};

const temGrafico = new Set([
    'funcao_1grau','funcao_2grau','funcao_exponencial','funcao_logaritmica',
    'pa','pg','movimento_uniforme','muv','juros_simples','juros_compostos'
]);

let formulaAtual = null;

function trocarCategoria(cat) {
    const selF = document.getElementById('sel-formula');
    selF.innerHTML = '<option value="">Fórmula</option>';
    trocarFormula('');

    if (!cat) { selF.disabled = true; return; }

    categorias[cat].forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.id;
        opt.textContent = f.label;
        selF.appendChild(opt);
    });
    selF.disabled = false;
}

function trocarFormula(tipo) {
    document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
    document.getElementById('resultado').innerHTML = '';
    esconderGrafico();

    formulaAtual = tipo || null;

    if (!tipo) {
        document.getElementById('formula').innerHTML   = '';
        document.getElementById('explicacao').innerHTML = '';
        return;
    }

    document.getElementById(tipo)?.classList.add('active');

    const latex = formulasLatex[tipo];
    document.getElementById('formula').innerHTML = latex ? `$$${latex}$$` : '';
    if (latex) MathJax.typeset();

    document.getElementById('explicacao').innerHTML = explicacoes[tipo] || '';
}

function limparTudo() {
    document.getElementById('sel-categoria').value = '';
    document.getElementById('sel-formula').innerHTML = '<option value="">Fórmula</option>';
    document.getElementById('sel-formula').disabled = true;
    trocarFormula('');
    document.querySelectorAll('input').forEach(i => i.value = '');
    if (chart) { chart.destroy(); chart = null; }
}

async function calc(tipo) {
    const btn = document.querySelector(`#${tipo} button`);
    const map = inputMap[tipo] || {};
    const data = {};

    Object.entries(map).forEach(([key, elId]) => {
        const el = document.getElementById(elId);
        data[key] = el ? el.value : '';
    });

    btn.disabled = true;
    btn.classList.add('btn-loading');

    try {
        const res  = await fetch(`/calc/${tipo}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        mostrarResultado(tipo, json);
        if (!json.erro) desenharGrafico(tipo, json, data);

        const sessao = await fetch('/sessao').then(r => r.json());
        if (sessao.logado) carregarHistorico();

    } catch (err) {
        document.getElementById('resultado').innerHTML =
            `<div class="erro">❌ Erro de conexão.</div>`;
    } finally {
        btn.disabled = false;
        btn.classList.remove('btn-loading');
    }
}

const labelMap = {
    delta:'Δ (delta)', x1:'x₁', x2:'x₂', raiz:'Raiz', y_para_x:'f(x)',
    log_x:'log(x)', coef_angular:'Coef. angular', coef_linear:'Coef. linear',
    concavidade:'Concavidade', vertice_x:'Vértice x', vertice_y:'Vértice y',
    tipo:'Tipo', base:'Base', coeficiente:'Coeficiente',
    area:'Área', perimetro:'Perímetro', circunferencia:'Circunferência',
    volume:'Volume', area_lateral:'Área lateral', area_total:'Área total',
    area_superficie:'Área superfície', hipotenusa:'Hipotenusa',
    cateto_a:'Cateto a', cateto_b:'Cateto b',
    an:'Termo aₙ', soma:'Soma Sₙ', soma_infinita:'Soma infinita',
    seno:'Seno', cosseno:'Cosseno', tangente:'Tangente',
    relacao_fundamental:'sen²+cos²', media:'Média', quantidade:'Qtd',
    media_ponderada:'Média pond.', soma_pesos:'Soma pesos',
    probabilidade:'Probabilidade', percentual:'Percentual', fracao:'Fração',
    'P(A∩B)':'P(A∩B)', 'P(A∪B)':'P(A∪B)', 'P(A)':'P(A)', 'P(B)':'P(B)',
    velocidade_ms:'Velocidade', velocidade_kmh:'Velocidade',
    posicao_final:'Posição final', velocidade:'Velocidade',
    posicao:'Posição', velocidade_final:'Vel. final',
    v:'Velocidade (m/s)', kmh:'Velocidade (km/h)',
    forca_N:'Força (N)', peso_N:'Peso (N)', massa_kg:'Massa (kg)',
    forca_atrito_N:'Força de atrito (N)', trabalho_J:'Trabalho (J)',
    Ec:'Energia cinética (J)', Ep:'Energia potencial (J)',
    energia_total_J:'Energia total (J)', Ec_inicial:'Ec inicial (J)',
    velocidade_final_ms:'Vel. final (m/s)',
    V:'Tensão (V)', I:'Corrente (A)', R:'Resistência (Ω)',
    P_W:'Potência (W)', R_total:'R total (Ω)',
    Q_J:'Calor (J)', variacao_m:'ΔL (m)', comprimento_final_m:'L final (m)',
    v_ms:'Velocidade (m/s)', frequencia_Hz:'Frequência (Hz)',
    comprimento_onda_m:'Comprimento λ (m)',
    angulo_refracao_graus:'Ângulo de refração (°)',
    juros:'Juros (R$)', montante:'Montante (R$)',
    desconto:'Desconto (R$)', valor_atual:'Valor atual (R$)',
    valor_presente:'Valor presente (R$)', valor_futuro:'Valor futuro (R$)',
    parcela:'Parcela (R$)', total_pago:'Total pago (R$)',
    total_juros:'Total juros (R$)', tempo_anos:'Tempo (anos)',
    taxa_usada:'Taxa usada (%)', g_usado:'g usado',
};

function mostrarResultado(tipo, json) {
    const resDiv = document.getElementById('resultado');
    if (json.erro) {
        resDiv.innerHTML = `<div class="erro">❌ ${json.erro}</div>`;
        return;
    }

    let html = `<div class="card-res"><h3>✅ Resultado</h3>`;

    const omitir = new Set(['pontos','sequencia','tabela','termo_especifico_pos',
                            'termo_especifico_val','termo_especifico_erro','raizes']);

    Object.entries(json).forEach(([k, v]) => {
        if (omitir.has(k)) return;
        const label = labelMap[k] || k;
        let val = typeof v === 'number' ? (Math.abs(v) < 0.0001 && v !== 0 ? v.toExponential(4) : v) : v;
        html += `<p>${label}: <span>${val}</span></p>`;
    });

    if (json.termo_especifico_erro) {
        html += `<div class="termo-especifico-box"><p class="termo-especifico-erro">❌ ${json.termo_especifico_erro}</p></div>`;
    } else if (json.termo_especifico_pos !== undefined) {
        html += `<div class="termo-especifico-box"><p>🔍 Termo a<sub>${json.termo_especifico_pos}</sub> = <span>${json.termo_especifico_val}</span></p></div>`;
    }

    if (json.sequencia?.length) {
        const tags = json.sequencia.map((v,i) => `<span>a${i+1}=${v}</span>`).join('');
        html += `<div class="sequencia-box"><p>Primeiros ${json.sequencia.length} termos</p><div class="sequencia-tags">${tags}</div></div>`;
    }

    if (json.tabela?.length) {
        html += `<div class="tabela-price">
            <table><thead><tr><th>Parc.</th><th>Juros</th><th>Amort.</th><th>Saldo</th></tr></thead><tbody>`;
        json.tabela.forEach(r => {
            html += `<tr><td>${r.parcela}</td><td>R$ ${r.juros}</td><td>R$ ${r.amortizacao}</td><td>R$ ${r.saldo}</td></tr>`;
        });
        html += `</tbody></table></div>`;
    }

    html += `</div>`;
    resDiv.innerHTML = html;
}

function esconderGrafico() {
    const ctx = document.getElementById('grafico');
    ctx.classList.remove('visivel');
    setTimeout(() => { ctx.style.display = 'none'; }, 400);
}

function desenharGrafico(tipo, json, data) {
    if (!temGrafico.has(tipo) || !json.pontos) { esconderGrafico(); return; }

    const ctx = document.getElementById('grafico');
    ctx.style.display = 'block';
    requestAnimationFrame(() => ctx.classList.add('visivel'));

    const labels = json.pontos.map(p => p.t ?? p.x);
    const valores = json.pontos.map(p => p.y ?? p.s ?? p.M);

    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: tipo,
                data: valores,
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56,189,248,0.08)',
                pointBackgroundColor: '#818cf8',
                pointRadius: 3,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'Syne' } } } },
            scales: {
                x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}

function abrirModal() {
    document.getElementById('modal-auth').style.display = 'flex';
    trocarTab('login');
}
function fecharModal() {
    document.getElementById('modal-auth').style.display = 'none';
    document.getElementById('login-erro').textContent = '';
    document.getElementById('cad-erro').textContent   = '';
}
function trocarTab(tab) {
    document.getElementById('form-login').classList.toggle('active',    tab==='login');
    document.getElementById('form-cadastro').classList.toggle('active', tab==='cadastro');
    document.getElementById('tab-login').classList.toggle('active',     tab==='login');
    document.getElementById('tab-cadastro').classList.toggle('active',  tab==='cadastro');
}
async function fazerLogin() {
    const email = document.getElementById('login-email').value.trim();
    const senha = document.getElementById('login-senha').value;
    const erro  = document.getElementById('login-erro');
    if (!email || !senha) { erro.textContent = 'Preencha todos os campos.'; return; }
    const json = await fetch('/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,senha})}).then(r=>r.json());
    if (json.erro) { erro.textContent = json.erro; return; }
    fecharModal();
    atualizarAuthUI(json.nome);
    carregarHistorico();
}
async function fazerCadastro() {
    const nome  = document.getElementById('cad-nome').value.trim();
    const email = document.getElementById('cad-email').value.trim();
    const senha = document.getElementById('cad-senha').value;
    const erro  = document.getElementById('cad-erro');
    if (!nome||!email||!senha) { erro.textContent='Preencha todos os campos.'; return; }
    const json = await fetch('/cadastro',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nome,email,senha})}).then(r=>r.json());
    if (json.erro) { erro.textContent=json.erro; return; }
    if (json.aguardando_codigo) {
        window._emailVerificacao = email;
        mostrarFormVerificacao(email);
    }
}

function mostrarFormVerificacao(email) {
    document.getElementById('form-cadastro').classList.remove('active');
    document.getElementById('form-verificacao').classList.add('active');
    document.getElementById('tab-cadastro').classList.remove('active');
    document.getElementById('ver-email-hint').textContent = email;
}

async function verificarCodigo() {
    const codigo = document.getElementById('ver-codigo').value.trim();
    const erro   = document.getElementById('ver-erro');
    if (!codigo) { erro.textContent = 'Digite o código.'; return; }
    const json = await fetch('/verificar_codigo',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email: window._emailVerificacao, codigo})}).then(r=>r.json());
    if (json.erro) { erro.textContent = json.erro; return; }
    fecharModal();
    atualizarAuthUI(json.nome);
    carregarHistorico();
}

async function reenviarCodigo() {
    const erro = document.getElementById('ver-erro');
    const json = await fetch('/reenviar_codigo',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email: window._emailVerificacao})}).then(r=>r.json());
    if (json.erro) { erro.textContent = json.erro; return; }
    erro.style.color = '#22c55e';
    erro.textContent = 'Código reenviado!';
    setTimeout(() => { erro.textContent = ''; erro.style.color = '#f87171'; }, 3000);
}
async function fazerLogout() {
    await fetch('/logout',{method:'POST'});
    atualizarAuthUI(null);
    document.getElementById('secao-historico').style.display = 'none';
}
function atualizarAuthUI(nome) {
    const area = document.getElementById('auth-area');
    if (nome) {
        area.innerHTML = `<span class="usuario-nome">👤 ${nome}</span><button class="btn-sair" onclick="fazerLogout()">Sair</button>`;
        document.getElementById('secao-historico').style.display = 'block';
    } else {
        area.innerHTML = `<button class="btn-auth" onclick="abrirModal()">Entrar</button>`;
        document.getElementById('secao-historico').style.display = 'none';
    }
}

const nomeFormula = {};
Object.values(categorias).flat().forEach(f => { nomeFormula[f.id] = f.label; });

async function carregarHistorico() {
    const lista = document.getElementById('historico-lista');
    lista.innerHTML = '<p class="hist-loading">Carregando...</p>';
    const json = await fetch('/historico').then(r=>r.json());
    if (json.erro || json.length === 0) {
        lista.innerHTML = '<p class="hist-vazio">Nenhum cálculo registrado ainda.</p>';
        return;
    }
    lista.innerHTML = json.map(r => `
        <div class="hist-card" id="hc-${r._id}">
            <div class="hist-card-info">
                <div class="hist-formula">${nomeFormula[r.formula] || r.formula}</div>
                <div class="hist-entrada">${Object.entries(r.entrada).map(([k,v])=>`${k}=${v}`).join(' · ')}</div>
                <div class="hist-resultado">${Object.entries(r.resultado).slice(0,3).map(([k,v])=>`${k}: ${v}`).join(' · ')}</div>
                <div class="hist-data">${r.data}</div>
            </div>
            <button class="hist-del" onclick="deletarRegistro('${r._id}')">✕</button>
        </div>`).join('');
}
async function deletarRegistro(id) {
    await fetch(`/historico/${id}`,{method:'DELETE'});
    document.getElementById(`hc-${id}`)?.remove();
    if (!document.getElementById('historico-lista').children.length)
        document.getElementById('historico-lista').innerHTML='<p class="hist-vazio">Nenhum cálculo registrado ainda.</p>';
}
async function limparHistorico() {
    if (!confirm('Limpar todo o histórico?')) return;
    await fetch('/historico',{method:'DELETE'});
    document.getElementById('historico-lista').innerHTML='<p class="hist-vazio">Nenhum cálculo registrado ainda.</p>';
}

window.addEventListener('load', async () => {
    const json = await fetch('/sessao').then(r=>r.json());
    if (json.logado) { atualizarAuthUI(json.nome); carregarHistorico(); }
});

async function calcBasica(operacao) {
    const a = document.getElementById('bas_a').value;
    const b = document.getElementById('bas_b').value;
    if (a === '' || b === '') {
        document.getElementById('basica-display').textContent = 'Informe A e B';
        return;
    }
    const res = await fetch('/calc/calc_basica', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a, b })
    }).then(r => r.json());

    if (res.erro) {
        document.getElementById('basica-display').textContent = 'Erro';
        return;
    }

    const opMap = { adicao: '+', subtracao: '−', multiplicacao: '×', divisao: '÷' };
    document.getElementById('basica-display').textContent =
        `${a} ${opMap[operacao]} ${b} = ${res[operacao]}`;

    document.getElementById('resultado').innerHTML = '';

    const sessao = await fetch('/sessao').then(r => r.json());
    if (sessao.logado) carregarHistorico();
}
