/* Configure uma URL do Render sem quebrar o uso local. */
window.STOCK_IA_API_BASE = window.STOCK_IA_API_BASE || '';
window.stockApiUrl = path => `${String(window.STOCK_IA_API_BASE).replace(/\/$/,'')}${path}`;
