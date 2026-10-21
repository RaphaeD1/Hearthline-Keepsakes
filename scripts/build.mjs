import {mkdir,copyFile,cp,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const file of ['index.html','policies.html','operations.html','styles.css','app.js','products.js','store-core.js','operations.js','robots.txt','sitemap.xml','.nojekyll'])await copyFile(file,'dist/'+file);
await cp('assets','dist/assets',{recursive:true});
