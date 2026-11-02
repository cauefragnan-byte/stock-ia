const businessCards=[
  ['alerts','◉','Alertas','Veja produtos sem estoque, com estoque baixo ou em excesso.'],
  ['insights','✦','Análise Inteligente','Interprete o cenário do estoque com recomendações baseadas nos dados.'],
  ['risk','⌁','Análise de Risco','Estime a probabilidade de falta antes da próxima reposição.'],
  ['replenishment','↻','Reposição Inteligente','Planeje compras usando consumo, prazo e estoque de segurança.'],
  ['promotions','◇','Promoções Dinâmicas','Encontre produtos parados e avalie ofertas sem alterar preços automaticamente.'],
  ['graph','⌘','Mapa de Dependências','Consulte fornecedores, rotas e relações logísticas no mapa do Brasil.']
];
function renderBusinessHub(){
  const el=$('#view-business');
  if(!el)return;
  const cards=businessCards.map(c=>'<button class="business-card panel" data-view="'+c[0]+'"><span class="business-icon">'+c[1]+'</span><span><strong>'+c[2]+'</strong><small>'+c[3]+'</small></span><b>→</b></button>').join('');
  el.innerHTML=heading('CENTRAL DE DECISÕES','Escolha uma área de inteligência para analisar seu estoque.')+
    '<div class="business-intro panel"><span class="business-intro-icon">✦</span><div><h2>Inteligência de negócios</h2><p>Reunimos as ferramentas analíticas em um único espaço. Cada card abre a funcionalidade completa, mantendo seus dados e filtros.</p></div></div>'+
    '<div class="business-grid">'+cards+'</div>';
}
const renderAllBeforeBusiness=renderAll;
renderAll=function(){renderAllBeforeBusiness();renderBusinessHub()};
renderAll();

/* Delegação em fase de captura: cards e itens de navegação continuam ativos
   mesmo quando uma tela é reconstruída dinamicamente. */
document.addEventListener('click',function(event){
  const target=event.target.closest('[data-view]');
  if(!target)return;
  event.preventDefault();
  event.stopImmediatePropagation();
  app.view=target.dataset.view;
  renderAll();
  $('#sidebar')?.classList.remove('open');
  $('#scrim')?.classList.remove('visible');
},true);
