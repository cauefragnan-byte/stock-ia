/* Motor único das decisões booleanas do STOCK IA. 1 = verdadeiro; 0 = falso. */
const bool = value => Boolean(value) ? 1 : 0;
window.BooleanRules = {
  and: (a, b) => Number(Boolean(a) && Boolean(b)),
  or: (a, b) => Number(Boolean(a) || Boolean(b)),
  not: a => Number(!Boolean(a)),
  variables(p = {}, overrides = {}) { const stock=Number(overrides.stock ?? p.stock ?? 0), active=overrides.active ?? p.active, supplierActive=overrides.supplierActive ?? p.supplierActive, salesHigh=overrides.salesHigh ?? p.salesHigh; return {A:bool(active),B:bool(stock<=Number(p.minStock??0)),C:bool(supplierActive),D:bool(salesHigh),stock,availableStock:bool(stock>0)}; },
  evaluate(p = {}, overrides = {}) { const v=this.variables(p,overrides), A=Boolean(v.A),B=Boolean(v.B),C=Boolean(v.C),D=Boolean(v.D); return {variables:v,generateAlert:Boolean(this.and(A,B)),recommendPurchase:Boolean(this.and(B,this.and(C,D))),needsReview:Boolean(this.or(this.not(A),B)),productCanBeSold:Boolean(this.and(A,v.stock>0)),allowRestock:Boolean(this.and(B,C)),critical:Boolean(this.and(A,this.or(v.stock===0,B))),excess:v.stock>Number(p.maxStock??0)}; },
  productCanBeSold:p=>Boolean(BooleanRules.evaluate(p).productCanBeSold), stockLow:p=>Number(p.stock||0)<=Number(p.minStock||0), outOfStock:p=>Number(p.stock||0)===0, generateAlert:p=>Boolean(BooleanRules.evaluate(p).generateAlert), allowRestock:p=>Boolean(BooleanRules.evaluate(p).allowRestock), recommendPurchase:p=>Boolean(BooleanRules.evaluate(p).recommendPurchase), needsReview:p=>Boolean(BooleanRules.evaluate(p).needsReview), critical:p=>Boolean(BooleanRules.evaluate(p).critical), excess:p=>Boolean(BooleanRules.evaluate(p).excess), nearMinimum:p=>Number(p.stock||0)>Number(p.minStock||0)&&Number(p.stock||0)<=Number(p.minStock||0)*1.25, normal:p=>Number(p.stock||0)>Number(p.minStock||0)&&Number(p.stock||0)<=Number(p.maxStock||0)
};
window.BooleanRuleCatalog=[
 {key:'generateAlert',title:'Gerar alerta',formula:'A AND B',code:'produtoAtivo && estoqueBaixo',help:'Verdadeiro quando o produto está ativo e o estoque está no mínimo ou abaixo dele.'},
 {key:'recommendPurchase',title:'Recomendar compra',formula:'B AND C AND D',code:'estoqueBaixo && fornecedorAtivo && historicoDeVendasAlto',help:'Verdadeiro quando os três sinais reais indicam prioridade de reposição.'},
 {key:'needsReview',title:'Necessidade de revisão',formula:'NOT A OR B',code:'!produtoAtivo || estoqueBaixo',help:'Verdadeiro quando o produto está inativo ou apresenta estoque baixo.'},
 {key:'productCanBeSold',title:'Produto disponível para venda',formula:'A AND (estoqueAtual > 0)',code:'produtoAtivo && estoqueAtual > 0',help:'Verdadeiro somente com produto ativo e pelo menos uma unidade disponível.'},
 {key:'allowRestock',title:'Permitir reposição',formula:'B ∧ C',code:'estoqueBaixo && fornecedorAtivo',help:'Indica que há estoque baixo e fornecedor ativo para atender a reposição.'},
 {key:'critical',title:'Situação crítica',formula:'A ∧ (semEstoque ∨ estoqueBaixo)',code:'produtoAtivo && (semEstoque || estoqueBaixo)',help:'Sinaliza um produto ativo que precisa de atenção imediata.'},
 {key:'excess',title:'Produto em excesso',formula:'estoqueAtual > estoqueMaximo',code:'estoqueAtual > estoqueMaximo',help:'Identifica estoque acima do limite máximo planejado.'}
];
window.BooleanTruthTables={and:[[0,0,0],[0,1,0],[1,0,0],[1,1,1]],or:[[0,0,0],[0,1,1],[1,0,1],[1,1,1]],not:[[0,1],[1,0]]};
