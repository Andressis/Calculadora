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
    ],
    informatica: [
        { id: "conv_base",             label: "💻 Conversão de Bases (Bin/Hex/Oct/Dec)" },
        { id: "conv_armazenamento",    label: "💾 Conversão de Armazenamento" },
        { id: "logica_booleana",       label: "🔲 Lógica Booleana (AND/OR/XOR...)" },
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
    conv_base:             "N_{10} \\rightarrow N_{2} / N_{8} / N_{16}",
    conv_armazenamento:    "1 \\text{ byte} = 8 \\text{ bits}, \\quad 1 \\text{ KB} = 1024 \\text{ bytes}",
    logica_booleana:       "A \\land B, \\quad A \\lor B, \\quad A \\oplus B",
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
    conv_base:             "<b>Valor</b> na base de origem e selecione as bases. Mostra decimal, binário, octal e hexadecimal.<br><small>💡 Teste: 255 dec → FF hex → 11111111 bin</small>",
    conv_armazenamento:    "Digite o <b>valor</b> e selecione a unidade de origem e destino.<br><small>💡 Teste: 1 GB → 1024 MB → 1073741824 bytes</small>",
    logica_booleana:       "<b>A</b> e <b>B</b> devem ser 0 ou 1. Calcula AND, OR, XOR, NAND, NOR, XNOR e NOT.<br><small>💡 Teste: A=1, B=0 → AND=0, OR=1, XOR=1</small>",
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
    conv_base:             { valor:'cb_valor', base_origem:'cb_origem', base_destino:'cb_destino' },
    conv_armazenamento:    { valor:'ca_valor', unidade_origem:'ca_origem', unidade_destino:'ca_destino' },
    logica_booleana:       { a:'lb_a', b:'lb_b' },
};

const temGrafico = new Set([
    'funcao_1grau','funcao_2grau','funcao_exponencial','funcao_logaritmica',
    'pa','pg','movimento_uniforme','muv','juros_simples','juros_compostos'
]);

let formulaAtual = null;

// ═══════════════════════════════════════════════════════════════
//  FAVORITOS (localStorage)
// ═══════════════════════════════════════════════════════════════
function getFavs() {
    try { return JSON.parse(localStorage.getItem('nexum_favs') || '[]'); } catch { return []; }
}
function saveFavs(arr) { localStorage.setItem('nexum_favs', JSON.stringify(arr)); }
function isFav(id) { return getFavs().includes(id); }
function toggleFav(id) {
    let favs = getFavs();
    if (favs.includes(id)) { favs = favs.filter(f => f !== id); }
    else { favs.push(id); }
    saveFavs(favs);
    atualizarBtnFav(id);
    renderizarFavBar();
}
function atualizarBtnFav(id) {
    const btn = document.getElementById('btn-fav');
    if (!btn) return;
    btn.textContent = isFav(id) ? '★' : '☆';
    btn.title = isFav(id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
    btn.classList.toggle('fav-ativo', isFav(id));
}
function renderizarFavBar() {
    const bar = document.getElementById('fav-bar');
    if (!bar) return;
    const favs = getFavs();
    if (!favs.length) { bar.innerHTML = '<span class="fav-vazio">Nenhum favorito ainda — clique ☆ para salvar</span>'; return; }
    bar.innerHTML = favs.map(id => {
        const label = nomeFormula[id] || id;
        const cat   = Object.entries(categorias).find(([,arr]) => arr.some(f => f.id === id))?.[0] || '';
        return `<button class="fav-chip" onclick="irParaFormulaFav('${id}','${cat}')" title="${label}">${label}</button>`;
    }).join('');
}
function irParaFormulaFav(id, cat) {
    mudarAba('calculadora');
    const selCat = document.getElementById('sel-categoria');
    selCat.value = cat; trocarCategoria(cat);
    const selFor = document.getElementById('sel-formula');
    selFor.value = id; trocarFormula(id);
    window.scrollTo({ top:0, behavior:'smooth' });
}

// ═══════════════════════════════════════════════════════════════
//  BUSCA DE FÓRMULAS
// ═══════════════════════════════════════════════════════════════
function buscarFormula(q) {
    const res = document.getElementById('busca-resultados');
    if (!q || q.length < 2) { res.innerHTML = ''; res.style.display = 'none'; return; }
    const lower = q.toLowerCase();
    const matches = [];
    Object.entries(categorias).forEach(([cat, arr]) => {
        arr.forEach(f => {
            if (f.label.toLowerCase().includes(lower) || f.id.includes(lower)) {
                matches.push({ ...f, cat });
            }
        });
    });
    if (!matches.length) {
        res.innerHTML = '<div class="busca-item busca-vazio">Nenhuma fórmula encontrada</div>';
    } else {
        res.innerHTML = matches.map(m =>
            `<div class="busca-item" onclick="selecionarBusca('${m.id}','${m.cat}')">${m.label}</div>`
        ).join('');
    }
    res.style.display = 'block';
}
function selecionarBusca(id, cat) {
    document.getElementById('busca-input').value = '';
    document.getElementById('busca-resultados').style.display = 'none';
    mudarAba('calculadora');
    const selCat = document.getElementById('sel-categoria');
    selCat.value = cat; trocarCategoria(cat);
    const selFor = document.getElementById('sel-formula');
    selFor.value = id; trocarFormula(id);
    window.scrollTo({ top:0, behavior:'smooth' });
}

// ═══════════════════════════════════════════════════════════════
//  COMPARTILHAR — gerar card imagem
// ═══════════════════════════════════════════════════════════════
async function compartilharResultado() {
    const resDiv = document.getElementById('resultado');
    if (!resDiv || !resDiv.querySelector('.card-res')) {
        alert('Calcule algo primeiro!'); return;
    }
    const nomeF = nomeFormula[formulaAtual] || formulaAtual || 'Resultado';

    // Coletar linhas de resultado
    const linhas = [];
    resDiv.querySelectorAll('.card-res p').forEach(p => {
        linhas.push(p.textContent.trim());
    });

    const canvas = document.createElement('canvas');
    const W = 600, H = Math.max(320, 120 + linhas.length * 38 + 60);
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#1e293b');
    ctx.fillStyle = grad;
    ctx.roundRect(0, 0, W, H, 20);
    ctx.fill();

    // Accent stripe
    const stripe = ctx.createLinearGradient(0, 0, W, 0);
    stripe.addColorStop(0, '#38bdf8');
    stripe.addColorStop(1, '#818cf8');
    ctx.fillStyle = stripe;
    ctx.fillRect(0, 0, W, 5);

    // Logo
    ctx.font = 'bold 22px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('NΣXUM', 28, 44);

    // Formula name
    ctx.font = 'bold 17px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(nomeF.replace(/^[^\w]*/, ''), 28, 80);

    // Divider
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(28, 96); ctx.lineTo(W - 28, 96); ctx.stroke();

    // Results
    ctx.font = '15px "Space Grotesk", sans-serif';
    let y = 124;
    linhas.forEach(linha => {
        const parts = linha.split(':');
        if (parts.length >= 2) {
            ctx.fillStyle = '#64748b';
            ctx.fillText(parts[0] + ':', 28, y);
            ctx.fillStyle = '#38bdf8';
            const labelW = ctx.measureText(parts[0] + ':').width;
            ctx.font = 'bold 15px "Space Grotesk", sans-serif';
            ctx.fillText(parts.slice(1).join(':').trim(), 36 + labelW, y);
            ctx.font = '15px "Space Grotesk", sans-serif';
        } else {
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(linha, 28, y);
        }
        y += 38;
    });

    // Footer
    ctx.font = '12px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText('nexum.app', W - 28 - ctx.measureText('nexum.app').width, H - 18);

    // Download
    const link = document.createElement('a');
    link.download = `nexum-${formulaAtual || 'resultado'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// ═══════════════════════════════════════════════════════════════
//  CONVERSOR DE UNIDADES (aba dedicada)
// ═══════════════════════════════════════════════════════════════
const conversores = {
    comprimento: {
        label: '📏 Comprimento',
        unidades: { mm:0.001, cm:0.01, m:1, km:1000, pol:0.0254, pé:0.3048, milha:1609.34, 'naut.':1852 }
    },
    massa: {
        label: '⚖️ Massa',
        unidades: { mg:0.000001, g:0.001, kg:1, t:1000, lb:0.453592, oz:0.0283495 }
    },
    temperatura: {
        label: '🌡️ Temperatura',
        unidades: { '°C':null, '°F':null, K:null } // tratamento especial
    },
    tempo: {
        label: '⏱️ Tempo',
        unidades: { ms:0.001, s:1, min:60, h:3600, dia:86400, semana:604800, mês:2592000, ano:31536000 }
    },
    velocidade: {
        label: '🚀 Velocidade',
        unidades: { 'm/s':1, 'km/h':1/3.6, 'mph':0.44704, nó:0.514444 }
    },
    area: {
        label: '📐 Área',
        unidades: { 'mm²':0.000001, 'cm²':0.0001, 'm²':1, 'km²':1e6, hectare:10000, acre:4046.86 }
    },
    volume: {
        label: '🪣 Volume',
        unidades: { 'mL':0.001, 'L':1, 'm³':1000, 'cm³':0.001, galão:3.78541, 'fl oz':0.0295735 }
    },
    dados: {
        label: '💾 Dados',
        unidades: { bit:0.125, byte:1, KB:1024, MB:1048576, GB:1073741824, TB:1099511627776 }
    },
    energia: {
        label: '⚡ Energia',
        unidades: { J:1, kJ:1000, cal:4.184, kcal:4184, Wh:3600, kWh:3600000 }
    },
    pressao: {
        label: '🌬️ Pressão',
        unidades: { Pa:1, kPa:1000, MPa:1e6, bar:100000, atm:101325, psi:6894.76, mmHg:133.322 }
    },
};

function converterUnidade(cat, valor, orig, dest) {
    const c = conversores[cat];
    if (!c) return null;
    if (cat === 'temperatura') {
        // Converter orig → Celsius → dest
        let celsius;
        if (orig === '°C') celsius = valor;
        else if (orig === '°F') celsius = (valor - 32) * 5/9;
        else celsius = valor - 273.15;
        if (dest === '°C') return parseFloat(celsius.toFixed(4));
        if (dest === '°F') return parseFloat((celsius * 9/5 + 32).toFixed(4));
        return parseFloat((celsius + 273.15).toFixed(4));
    }
    const fOrig = c.unidades[orig], fDest = c.unidades[dest];
    if (!fOrig || !fDest) return null;
    return parseFloat(((valor * fOrig) / fDest).toFixed(6));
}

function renderizarConversor(forceCat) {
    const el  = document.getElementById('conv-cat');
    if (!el) return;
    const cat = forceCat || el.value || 'comprimento';
    // Garantir que o select mostre o valor correto
    el.value = cat;
    const c = conversores[cat];
    if (!c) return;
    const unidades = Object.keys(c.unidades);
    const sel = (id, defIdx) => `<select id="${id}" class="unit-select" onchange="calcularConversor()" style="min-width:90px">${
        unidades.map((u,i) => `<option value="${u}"${i===defIdx?' selected':''}>${u}</option>`).join('')
    }</select>`;
    document.getElementById('conv-inputs').innerHTML = `
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            <input type="number" id="conv-valor" placeholder="Valor" step="any" style="flex:1;min-width:120px" oninput="calcularConversor()">
            ${sel('conv-orig',0)}
            <span style="color:var(--muted,#64748b);font-size:1.2rem">→</span>
            ${sel('conv-dest',1)}
        </div>
        <div id="conv-resultado" style="margin-top:14px;font-size:1.1rem;color:#38bdf8;font-weight:700;min-height:32px"></div>
        <div id="conv-tabela" style="margin-top:10px"></div>
    `;
}

function calcularConversor() {
    const cat  = document.getElementById('conv-cat').value;
    const val  = parseFloat(document.getElementById('conv-valor').value);
    const orig = document.getElementById('conv-orig').value;
    const dest = document.getElementById('conv-dest').value;
    const resEl= document.getElementById('conv-resultado');
    const tabEl= document.getElementById('conv-tabela');
    if (isNaN(val)) { resEl.textContent=''; tabEl.innerHTML=''; return; }
    const res = converterUnidade(cat, val, orig, dest);
    if (res === null) { resEl.textContent='Conversão indisponível'; return; }
    resEl.innerHTML = `${val} <span style="color:#64748b">${orig}</span> = <span style="color:#38bdf8">${res}</span> <span style="color:#64748b">${dest}</span>`;
    // Tabela completa
    const c = conversores[cat];
    const unidades = Object.keys(c.unidades);
    let rows = unidades.map(u => {
        const v = converterUnidade(cat, val, orig, u);
        return v !== null ? `<tr${u===dest?' style="color:#38bdf8;font-weight:700"':''}><td>${u}</td><td>${v}</td></tr>` : '';
    }).join('');
    tabEl.innerHTML = `<table style="width:100%;font-size:.85rem;border-collapse:collapse"><thead><tr style="color:#475569"><th style="text-align:left;padding:4px 8px">Unidade</th><th style="text-align:right;padding:4px 8px">Valor</th></tr></thead><tbody>${rows}</tbody></table>`;
}

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

    const favWrap = document.getElementById('fav-btn-wrap');
    if (favWrap) favWrap.style.display = tipo ? 'flex' : 'none';
    if (tipo) atualizarBtnFav(tipo);

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

// ═══════════════════════════════════════════════════════════════
//  CONVERSORES DE UNIDADE
// ═══════════════════════════════════════════════════════════════
const convLen = { m:1, cm:0.01, mm:0.001, km:1000 };  // → metros
const convMas = { kg:1, g:0.001, t:1000 };             // → kg
const convTem = { s:1, min:60, h:3600 };               // → segundos
const convVel = { ms:1, kmh:1/3.6 };                   // → m/s
// Temperatura: ΔF = ΔC * 5/9
const convDeltaT = { C:1, F:5/9 };
// Tempo financeiro: tudo em meses (base do usuário)
// não convertemos para base — apenas mostramos "t meses/anos/dias" no label

function gv(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}
function gs(id) {
    const el = document.getElementById(id);
    return el ? el.value : null;
}
function toSI(val, unit, table) {
    const v = parseFloat(val);
    if (isNaN(v)) return val; // keep as string for blank detection
    return v * (table[unit] || 1);
}

// Formata número com 2 casas decimais
function fmt(v) {
    if (typeof v !== 'number') return v;
    if (!isFinite(v)) return v;
    return parseFloat(v.toFixed(2));
}

// Unidade de comprimento escolhida → rótulo de área/volume
function areaLabel(un) { return `${un}²`; }
function volLabel(un)  { return `${un}³`; }

// Converte resultado de área (sempre m²) para unidade solicitada
function fromAreaSI(val, un) {
    const f = convLen[un] || 1;
    return fmt(val / (f * f));
}
function fromVolSI(val, un) {
    const f = convLen[un] || 1;
    return fmt(val / (f * f * f));
}
function fromLenSI(val, un) {
    const f = convLen[un] || 1;
    return fmt(val / f);
}

// Tempo financeiro: converte para meses se necessário
function finTime(val, un) {
    const v = parseFloat(val);
    if (isNaN(v)) return val;
    if (un === 'ano') return v * 12;
    if (un === 'dia') return v / 30;
    return v; // meses
}
function finTimeLabel(un) {
    return un === 'ano' ? 'anos' : un === 'dia' ? 'dias' : 'meses';
}

async function calc(tipo) {
    const btn = document.querySelector(`#${tipo} .btn-calc`);
    const map = inputMap[tipo] || {};
    const rawData = {};
    Object.entries(map).forEach(([key, elId]) => {
        const el = document.getElementById(elId);
        rawData[key] = el ? el.value : '';
    });

    // — Unit conversion: build SI data + capture chosen units for display —
    const data = { ...rawData };
    let unitCtx = {}; // context for resultado rendering

    // GEOMETRIA — comprimento
    if (['area_quadrado','area_retangulo','area_triangulo','area_circulo',
         'volume_cilindro','volume_esfera','pitagoras'].includes(tipo)) {
        const unMap = {
            area_quadrado:'aq_un', area_retangulo:'ar_un', area_triangulo:'at_un',
            area_circulo:'ac_un', volume_cilindro:'vc_un', volume_esfera:'ve_un',
            pitagoras:'pit_un'
        };
        const un = gs(unMap[tipo]) || 'm';
        const f  = convLen[un] || 1;
        unitCtx.lenUnit = un;
        // convert all length inputs to meters
        ['lado','base','altura','raio','a','b','c'].forEach(k => {
            if (rawData[k] !== undefined && rawData[k] !== '') {
                data[k] = String(parseFloat(rawData[k]) * f);
            }
        });
    }

    // VELOCIDADE MÉDIA
    if (tipo === 'velocidade_media') {
        const dsUn = gs('vm_ds_un') || 'm';
        const dtUn = gs('vm_dt_un') || 's';
        if (rawData.ds !== '') data.ds = String(parseFloat(rawData.ds) * (convLen[dsUn]||1));
        if (rawData.dt !== '') data.dt = String(parseFloat(rawData.dt) * (convTem[dtUn]||1));
        unitCtx.velInputDs = dsUn;
        unitCtx.velInputDt = dtUn;
    }

    // MOVIMENTO UNIFORME
    if (tipo === 'movimento_uniforme') {
        const vUn = gs('mu_v_un') || 'ms';
        const tUn = gs('mu_t_un') || 's';
        if (rawData.v !== '') data.v = String(parseFloat(rawData.v) * (convVel[vUn]||1));
        if (rawData.t !== '') data.t = String(parseFloat(rawData.t) * (convTem[tUn]||1));
        unitCtx.velUnit = vUn; unitCtx.timeUnit = tUn;
    }

    // MUV
    if (tipo === 'muv') {
        const tUn = gs('muv_t_un') || 's';
        if (rawData.t !== '') data.t = String(parseFloat(rawData.t) * (convTem[tUn]||1));
        unitCtx.timeUnit = tUn;
    }

    // TORRICELLI
    if (tipo === 'torricelli') {
        const vUn = gs('tor_v_un') || 'ms';
        if (rawData.v0 !== '') data.v0 = String(parseFloat(rawData.v0) * (convVel[vUn]||1));
        unitCtx.velUnit = vUn;
    }

    // 2ª LEI NEWTON / PESO
    if (['segunda_lei_newton','peso'].includes(tipo)) {
        const mUn = gs(tipo === 'peso' ? 'pe_m_un' : 'sln_m_un') || 'kg';
        if (rawData.m !== '') data.m = String(parseFloat(rawData.m) * (convMas[mUn]||1));
        unitCtx.massUnit = mUn;
    }

    // TRABALHO
    if (tipo === 'trabalho') {
        const dUn = gs('tr_dist_un') || 'm';
        if (rawData.dist !== '') data.dist = String(parseFloat(rawData.dist) * (convLen[dUn]||1));
        unitCtx.distUnit = dUn;
    }

    // ENERGIA CINÉTICA
    if (tipo === 'energia_cinetica') {
        const mUn = gs('ec_m_un') || 'kg';
        const vUn = gs('ec_v_un') || 'ms';
        if (rawData.m !== '') data.m = String(parseFloat(rawData.m) * (convMas[mUn]||1));
        if (rawData.v !== '') data.v = String(parseFloat(rawData.v) * (convVel[vUn]||1));
        unitCtx.massUnit = mUn; unitCtx.velUnit = vUn;
    }

    // ENERGIA POTENCIAL
    if (tipo === 'energia_potencial') {
        const mUn = gs('ep_m_un') || 'kg';
        const hUn = gs('ep_h_un') || 'm';
        if (rawData.m !== '') data.m = String(parseFloat(rawData.m) * (convMas[mUn]||1));
        if (rawData.h !== '') data.h = String(parseFloat(rawData.h) * (convLen[hUn]||1));
        unitCtx.massUnit = mUn; unitCtx.heightUnit = hUn;
    }

    // CONSERVAÇÃO DE ENERGIA
    if (tipo === 'conservacao_energia') {
        const mUn = gs('ce_m_un') || 'kg';
        const hUn = gs('ce_h_un') || 'm';
        if (rawData.m !== '') data.m = String(parseFloat(rawData.m) * (convMas[mUn]||1));
        if (rawData.h !== '') data.h = String(parseFloat(rawData.h) * (convLen[hUn]||1));
        unitCtx.massUnit = mUn; unitCtx.heightUnit = hUn;
    }

    // CALOR SENSÍVEL
    if (tipo === 'calor_sensivel') {
        const mUn = gs('cs_m_un') || 'kg';
        const tUn = gs('cs_t_un') || 'C';
        if (rawData.m !== '') data.m = String(parseFloat(rawData.m) * (convMas[mUn]||1));
        if (rawData.dT !== '') data.dT = String(parseFloat(rawData.dT) * (convDeltaT[tUn]||1));
        unitCtx.massUnit = mUn; unitCtx.tempUnit = tUn;
    }

    // CALOR LATENTE
    if (tipo === 'calor_latente') {
        const mUn = gs('cl_m_un') || 'kg';
        if (rawData.m !== '') data.m = String(parseFloat(rawData.m) * (convMas[mUn]||1));
        unitCtx.massUnit = mUn;
    }

    // DILATAÇÃO TÉRMICA
    if (tipo === 'dilatacao_termica') {
        const lUn = gs('dt_L_un') || 'm';
        const tUn = gs('dt_t_un') || 'C';
        if (rawData.L0 !== '') data.L0 = String(parseFloat(rawData.L0) * (convLen[lUn]||1));
        if (rawData.dT !== '') data.dT = String(parseFloat(rawData.dT) * (convDeltaT[tUn]||1));
        unitCtx.lenUnit = lUn; unitCtx.tempUnit = tUn;
    }

    // FINANCEIRO — tempo
    const finMap = {
        juros_simples:'js_t_un', juros_compostos:'jc_t_un',
        desconto_simples:'ds_t_un', desconto_composto:'dc_t_un',
        valor_presente:'vp_t_un', valor_futuro:'vf_t_un'
    };
    if (finMap[tipo]) {
        const tUn = gs(finMap[tipo]) || 'mes';
        if (rawData.t !== '') data.t = String(finTime(rawData.t, tUn));
        unitCtx.finTimeUnit = tUn;
    }
    if (tipo === 'amortizacao_price') {
        const nUn = gs('ap_n_un') || 'mes';
        if (rawData.n !== '') data.n = String(nUn === 'ano' ? parseFloat(rawData.n)*12 : rawData.n);
        unitCtx.finTimeUnit = nUn;
    }

    if (btn) { btn.disabled = true; btn.classList.add('btn-loading'); }

    try {
        const res  = await fetch(`/calc/${tipo}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        mostrarResultado(tipo, json, unitCtx);
        if (!json.erro) desenharGrafico(tipo, json, data);

        const sessao = await fetch('/sessao').then(r => r.json());
        if (sessao.logado) carregarHistorico();

    } catch (err) {
        document.getElementById('resultado').innerHTML =
            `<div class="erro">❌ Erro de conexão.</div>`;
    } finally {
        if (btn) { btn.disabled = false; btn.classList.remove('btn-loading'); }
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

function mostrarResultado(tipo, json, unitCtx = {}) {
    const resDiv = document.getElementById('resultado');
    if (json.erro) {
        resDiv.innerHTML = `<div class="erro">❌ ${json.erro}</div>`;
        return;
    }

    // ── INFORMÁTICA: renderizações especiais ──
    if (tipo === 'conv_base') {
        resDiv.innerHTML = `<div class="card-res"><h3>✅ Conversão de Bases</h3>
            <table class="bool-table">
                <tr><th>Base</th><th>Valor</th></tr>
                <tr><td>Decimal (10)</td><td><span class="bool-1">${json.decimal}</span></td></tr>
                <tr><td>Binário (2)</td><td><span class="bool-1">${json.binario}</span></td></tr>
                <tr><td>Octal (8)</td><td><span class="bool-1">${json.octal}</span></td></tr>
                <tr><td>Hexadecimal (16)</td><td><span class="bool-1">${json.hexadecimal}</span></td></tr>
            </table>
            <p style="margin-top:12px;color:#64748b;font-size:.85rem">Resultado em ${json.base_destino}: <span style="color:#38bdf8;font-size:1.05rem;font-weight:700">${json.resultado}</span></p>
        </div>`;
        return;
    }
    if (tipo === 'conv_armazenamento') {
        const tab = json.tabela || {};
        let rows = Object.entries(tab).map(([u,v]) =>
            `<tr${u===json.unidade_destino?' style="color:#38bdf8;font-weight:700"':''}><td>${u}</td><td>${v}</td></tr>`
        ).join('');
        resDiv.innerHTML = `<div class="card-res"><h3>✅ Conversão de Armazenamento</h3>
            <p style="margin-bottom:12px">${json.valor_entrada} <span style="color:#64748b">${json.unidade_origem}</span> = <span style="color:#38bdf8;font-size:1.1rem;font-weight:700">${json.resultado}</span> <span style="color:#64748b">${json.unidade_destino}</span></p>
            <table class="bool-table"><thead><tr><th>Unidade</th><th>Equivalente</th></tr></thead><tbody>${rows}</tbody></table>
        </div>`;
        return;
    }
    if (tipo === 'logica_booleana') {
        const ops = ['AND','OR','XOR','NAND','NOR','XNOR','NOT_A','NOT_B'];
        const desc = { AND:'A E B', OR:'A OU B', XOR:'A OU exclusivo B', NAND:'NÃO (A E B)', NOR:'NÃO (A OU B)', XNOR:'NÃO XOR', NOT_A:'NÃO A', NOT_B:'NÃO B' };
        let rows = ops.map(op => {
            const v = json[op];
            return `<tr><td>${op}</td><td style="color:#64748b;font-size:.8rem">${desc[op]}</td><td class="${v?'bool-1':'bool-0'}">${v}</td></tr>`;
        }).join('');
        resDiv.innerHTML = `<div class="card-res"><h3>✅ Lógica Booleana</h3>
            <p style="margin-bottom:10px;color:#64748b">A = <span class="${json.A?'bool-1':'bool-0'}">${json.A}</span> &nbsp; B = <span class="${json.B?'bool-1':'bool-0'}">${json.B}</span></p>
            <table class="bool-table"><thead><tr><th>Operação</th><th>Descrição</th><th>Resultado</th></tr></thead><tbody>${rows}</tbody></table>
        </div>`;
        return;
    }
    const dynLabel = {};
    const un = unitCtx.lenUnit || 'm';
    const vUn = unitCtx.velUnit || 'ms';
    const velLabel = vUn === 'kmh' ? 'km/h' : 'm/s';

    // Geometry: override area/volume/perimeter labels with chosen unit
    if (['area_quadrado','area_retangulo','area_triangulo','area_circulo',
         'volume_cilindro','volume_esfera','pitagoras'].includes(tipo)) {
        dynLabel['area']             = `Área (${areaLabel(un)})`;
        dynLabel['perimetro']        = `Perímetro (${un})`;
        dynLabel['circunferencia']   = `Circunferência (${un})`;
        dynLabel['volume']           = `Volume (${volLabel(un)})`;
        dynLabel['area_lateral']     = `Área lateral (${areaLabel(un)})`;
        dynLabel['area_total']       = `Área total (${areaLabel(un)})`;
        dynLabel['area_superficie']  = `Área sup. (${areaLabel(un)})`;
        dynLabel['hipotenusa']       = `Hipotenusa (${un})`;
        dynLabel['cateto_a']         = `Cateto a (${un})`;
        dynLabel['cateto_b']         = `Cateto b (${un})`;
    }

    // Convert back geometry results to user's unit
    const geoConvArea  = k => { if (json[k] !== undefined && typeof json[k]==='number') json[k] = fromAreaSI(json[k], un); };
    const geoConvVol   = k => { if (json[k] !== undefined && typeof json[k]==='number') json[k] = fromVolSI(json[k], un); };
    const geoConvLen   = k => { if (json[k] !== undefined && typeof json[k]==='number') json[k] = fromLenSI(json[k], un); };
    if (['area_quadrado','area_retangulo','area_triangulo','area_circulo'].includes(tipo)) {
        geoConvArea('area'); geoConvLen('perimetro'); geoConvLen('circunferencia');
    }
    if (['volume_cilindro','volume_esfera'].includes(tipo)) {
        geoConvVol('volume'); geoConvArea('area_lateral'); geoConvArea('area_total'); geoConvArea('area_superficie');
    }
    if (tipo === 'pitagoras') {
        geoConvLen('hipotenusa'); geoConvLen('cateto_a'); geoConvLen('cateto_b');
    }

    // Velocity results
    if (tipo === 'velocidade_media') {
        const dsUn = unitCtx.velInputDs || 'm';
        const dtUn = unitCtx.velInputDt || 's';
        const vms = json.velocidade_ms;
        const vkm = json.velocidade_kmh;
        if (typeof vms === 'number') {
            // Show in both units always, label reflects input
            dynLabel['velocidade_ms']  = 'm/s';
            dynLabel['velocidade_kmh'] = 'km/h';
            json.velocidade_ms  = fmt(vms);
            json.velocidade_kmh = fmt(vkm);
        }
    }
    if (['movimento_uniforme','muv'].includes(tipo)) {
        const vUn2 = unitCtx.velUnit || 'ms';
        if (vUn2 === 'kmh') {
            if (typeof json.velocidade === 'number') { json.velocidade = fmt(json.velocidade * 3.6); dynLabel['velocidade'] = 'Velocidade (km/h)'; }
            if (typeof json.velocidade_final === 'number') { json.velocidade_final = fmt(json.velocidade_final * 3.6); dynLabel['velocidade_final'] = 'Vel. final (km/h)'; }
        } else {
            dynLabel['velocidade'] = 'Velocidade (m/s)';
            dynLabel['velocidade_final'] = 'Vel. final (m/s)';
        }
        if (typeof json.posicao_final === 'number') json.posicao_final = fmt(json.posicao_final);
        if (typeof json.posicao === 'number') json.posicao = fmt(json.posicao);
    }
    if (tipo === 'torricelli') {
        const vUn2 = unitCtx.velUnit || 'ms';
        if (typeof json.v === 'number') {
            if (vUn2 === 'kmh') { json.v = fmt(json.v * 3.6); json.kmh = fmt(json.v); dynLabel['v'] = 'Velocidade (km/h)'; delete json.kmh; }
            else { dynLabel['v'] = 'Velocidade (m/s)'; json.kmh = fmt(json.kmh); dynLabel['kmh'] = 'Velocidade (km/h)'; }
        }
    }
    if (tipo === 'conservacao_energia') {
        if (typeof json.velocidade_final_ms === 'number') {
            json['vel. final (m/s)'] = fmt(json.velocidade_final_ms);
            json['vel. final (km/h)'] = fmt(json.velocidade_final_ms * 3.6);
            delete json.velocidade_final_ms;
            dynLabel['vel. final (m/s)']  = 'Vel. final (m/s)';
            dynLabel['vel. final (km/h)'] = 'Vel. final (km/h)';
        }
    }

    // Financial time unit label
    if (unitCtx.finTimeUnit) {
        const tl = finTimeLabel(unitCtx.finTimeUnit);
        dynLabel['tempo_anos'] = `Tempo (${tl})`;
    }

    // Dilatação térmica: convert back to user length unit
    if (tipo === 'dilatacao_termica') {
        const lUn = unitCtx.lenUnit || 'm';
        if (typeof json.variacao_m === 'number') { json[`variacao_${lUn}`] = fromLenSI(json.variacao_m, lUn); delete json.variacao_m; dynLabel[`variacao_${lUn}`] = `ΔL (${lUn})`; }
        if (typeof json.comprimento_final_m === 'number') { json[`comp_final_${lUn}`] = fromLenSI(json.comprimento_final_m, lUn); delete json.comprimento_final_m; dynLabel[`comp_final_${lUn}`] = `L final (${lUn})`; }
    }

    let html = `<div class="card-res"><h3>✅ Resultado</h3>`;

    const omitir = new Set(['pontos','sequencia','tabela','termo_especifico_pos',
                            'termo_especifico_val','termo_especifico_erro','raizes']);

    Object.entries(json).forEach(([k, v]) => {
        if (omitir.has(k)) return;
        const label = dynLabel[k] || labelMap[k] || k;
        let val = typeof v === 'number' ? fmt(v) : v;
        html += `<p>${label}: <span>${val}</span></p>`;
    });

    if (json.termo_especifico_erro) {
        html += `<div class="termo-especifico-box"><p class="termo-especifico-erro">❌ ${json.termo_especifico_erro}</p></div>`;
    } else if (json.termo_especifico_pos !== undefined) {
        html += `<div class="termo-especifico-box"><p>🔍 Termo a<sub>${json.termo_especifico_pos}</sub> = <span>${fmt(json.termo_especifico_val)}</span></p></div>`;
    }

    if (json.sequencia?.length) {
        const tags = json.sequencia.map((v,i) => `<span>a${i+1}=${fmt(v)}</span>`).join('');
        html += `<div class="sequencia-box"><p>Primeiros ${json.sequencia.length} termos</p><div class="sequencia-tags">${tags}</div></div>`;
    }

    if (json.tabela?.length) {
        html += `<div class="tabela-price">
            <table><thead><tr><th>Parc.</th><th>Juros</th><th>Amort.</th><th>Saldo</th></tr></thead><tbody>`;
        json.tabela.forEach(r => {
            html += `<tr><td>${r.parcela}</td><td>R$ ${fmt(r.juros)}</td><td>R$ ${fmt(r.amortizacao)}</td><td>R$ ${fmt(r.saldo)}</td></tr>`;
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
    document.getElementById('login-email').value = email;
    document.getElementById('login-senha').value = senha;
    trocarTab('login');
    await fazerLogin();
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
    renderizarFavBar();
    // Conversor só é inicializado quando o usuário abre a aba
});

// ═══════════════════════════════════════════════════════════════
//  ATALHOS DE TECLADO
// ═══════════════════════════════════════════════════════════════
document.addEventListener('keydown', e => {
    // Ignorar quando focado em input/select/textarea
    const tag = document.activeElement?.tagName;
    if (['INPUT','SELECT','TEXTAREA'].includes(tag)) {
        // Dentro de input: Enter para calcular
        if (e.key === 'Enter' && tag === 'INPUT' && formulaAtual) {
            e.preventDefault();
            calc(formulaAtual);
        }
        return;
    }
    // Atalhos globais
    if (e.key === '/' || (e.key === 'f' && !e.ctrlKey && !e.metaKey)) {
        e.preventDefault();
        const buscaEl = document.getElementById('busca-input');
        if (buscaEl) { buscaEl.focus(); }
    }
    if (e.key === 'Escape') {
        document.getElementById('busca-resultados').style.display = 'none';
        document.getElementById('busca-input').blur();
    }
    if (e.key === 'Enter' && formulaAtual) {
        e.preventDefault();
        calc(formulaAtual);
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        limparTudo();
    }
    // Ctrl+S = compartilhar
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        compartilharResultado();
    }
    // Ctrl+B = favoritar
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        if (formulaAtual) toggleFav(formulaAtual);
    }
});

// Fechar busca ao clicar fora
document.addEventListener('click', e => {
    const busca = document.getElementById('busca-wrapper');
    if (busca && !busca.contains(e.target)) {
        document.getElementById('busca-resultados').style.display = 'none';
    }
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