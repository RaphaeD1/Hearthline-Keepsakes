document.getElementById('marginForm').addEventListener('submit',event=>{
event.preventDefault();const data=new FormData(event.target);const values=Object.fromEntries([...data].map(([k,v])=>[k,Number(v)]));
try{const result=HearthlineCore.margin({...values,extraFeeRate:values.extraFeePercent/100});document.getElementById('result').textContent='Estimated contribution: '+new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(result.profit)+' after entered labor; before tax and overhead';}catch{document.getElementById('result').textContent='Check all input amounts.';}
});
