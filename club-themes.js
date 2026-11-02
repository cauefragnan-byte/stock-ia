/* Temas de clubes: identidade local, persistente e sem dependência de imagens externas. */
const clubThemes=[
  {id:'light',name:'Padrão',short:'ST',primary:'#2563eb',soft:'#eff6ff',sidebar:'#101827',description:'Interface neutra'},
  {id:'flu',name:'Fluminense',short:'FLU',logo:'assets/fluminense-logo.png',primary:'#006b42',soft:'#e5f2ec',sidebar:'#5d1729',description:'Verde, grená e branco'},
  {id:'flamengo',name:'Flamengo',short:'FLA',logo:'assets/club-logos/flamengo.png',primary:'#c8102e',soft:'#fff0f2',sidebar:'#1d1d1f',description:'Rubro-negro'},
  {id:'palmeiras',name:'Palmeiras',short:'PAL',logo:'assets/club-logos/palmeiras.png',primary:'#006437',soft:'#e7f5ed',sidebar:'#123b2a',description:'Verde e branco'},
  {id:'corinthians',name:'Corinthians',short:'COR',logo:'assets/club-logos/corinthians.png',primary:'#262626',soft:'#f1f3f5',sidebar:'#171717',description:'Preto e branco'},
  {id:'saopaulo',name:'São Paulo',short:'SPFC',logo:'assets/club-logos/sao-paulo.png',primary:'#d71920',soft:'#fff0f1',sidebar:'#20242b',description:'Tricolor paulista'},
  {id:'santos',name:'Santos',short:'SAN',logo:'assets/club-logos/santos.svg',primary:'#4b5563',soft:'#f1f3f5',sidebar:'#1f2937',description:'Alvinegro praiano'},
  {id:'botafogo',name:'Botafogo',short:'BOT',logo:'assets/club-logos/botafogo.png',primary:'#111827',soft:'#eef1f4',sidebar:'#090d13',description:'Preto e branco'},
  {id:'vasco',name:'Vasco',short:'VAS',logo:'assets/club-logos/vasco.png',primary:'#b91c1c',soft:'#fff1f2',sidebar:'#171717',description:'Alvinegro carioca'},
  {id:'atletico',name:'Atlético-MG',short:'CAM',logo:'assets/club-logos/atletico-mg.png',primary:'#b59b46',soft:'#fbf7e8',sidebar:'#171717',description:'Preto e dourado'},
  {id:'cruzeiro',name:'Cruzeiro',short:'CRU',logo:'assets/club-logos/cruzeiro.png',primary:'#174ea6',soft:'#edf4ff',sidebar:'#102a5c',description:'Azul e branco'},
  {id:'gremio',name:'Grêmio',short:'GRE',logo:'assets/club-logos/gremio.png',primary:'#1683c5',soft:'#eaf6fd',sidebar:'#122b42',description:'Azul, preto e branco'},
  {id:'inter',name:'Internacional',short:'SCI',logo:'assets/club-logos/internacional.png',primary:'#c8102e',soft:'#fff0f2',sidebar:'#4a1117',description:'Vermelho e branco'},
  {id:'bahia',name:'Bahia',short:'BAH',logo:'assets/club-logos/bahia.png',primary:'#1769aa',soft:'#edf5fc',sidebar:'#123a62',description:'Azul, vermelho e branco'}
];
const clubById=id=>clubThemes.find(c=>c.id===id)||clubThemes[0];
function renderClubSettings(){
  const current=clubById(app.theme), view=$('#view-settings');if(!view)return;
  const panel=`<section class="panel club-theme-panel"><div class="panel-head"><div><h3>Identidade do clube</h3><p>Escolha uma paleta para personalizar o STOCK IA. A seleção fica salva neste navegador.</p></div><span class="club-active-label"><i></i>${current.name}</span></div><div class="club-theme-grid">${clubThemes.map(c=>`<button class="club-theme-card ${current.id===c.id?'active':''}" data-club-theme="${c.id}" aria-pressed="${current.id===c.id}">${c.logo?`<img class="club-crest-img" src="${c.logo}" alt="Escudo do ${c.name}">`:`<span class="club-crest" style="--crest:${c.primary};--crest-soft:${c.soft}">${c.short}</span>`}<span><strong>${c.name}</strong><small>${c.description}</small></span>${current.id===c.id?'<b class="club-check">✓</b>':''}</button>`).join('')}</div><small class="club-source-note">Escudos locais em PNG/SVG; Fluminense preserva o arquivo já existente no projeto.</small></section>`;
  view.insertAdjacentHTML('afterbegin',panel);
}
function applyClubTheme(id,notify=true){
  const club=clubById(id);app.theme=club.id;StockStorage.saveTheme(club.id);document.body.dataset.theme=club.id;renderSettings();renderClubSettings();if(notify)toast(`${club.name} ativado.`);
}
const setThemeBeforeClubs=setTheme;
setTheme=function(id){applyClubTheme(id)};
const renderSettingsBeforeClubs=renderSettings;
renderSettings=function(){renderSettingsBeforeClubs();renderClubSettings()};
document.addEventListener('click',e=>{const card=e.target.closest('[data-club-theme]');if(card)applyClubTheme(card.dataset.clubTheme)});
const renderAllBeforeClubs=renderAll;
renderAll=function(){renderAllBeforeClubs()};
renderAll();
