const openProductModalOriginal=openProductModal;
openProductModal=function(id){openProductModalOriginal(id);const p=id?product(id):null,form=$('#productForm');if(!form)return;const anchor=form.querySelector('[name="price"]')?.closest('.form-group');anchor?.insertAdjacentHTML('afterend',`<div class="form-group"><label>Custo de aquisição</label><input name="cost" type="number" min="0" step="0.01" value="${p?.cost||''}" placeholder="Opcional"></div>`)};
const handleProductFormOriginal=handleProductForm;
handleProductForm=function(form){const fd=new FormData(form),sku=String(fd.get('sku')||'').trim(),cost=Number(fd.get('cost')||0);handleProductFormOriginal(form);const saved=app.data.products.find(p=>p.sku===sku);if(saved){saved.cost=cost;save();renderAll()}};
