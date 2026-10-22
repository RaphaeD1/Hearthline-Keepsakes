const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
const audit=async(page)=>{const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);};
test('collection, search, personalization, reload and deletion',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.locator('#products article')).toHaveCount(6);
 await expect(page.getByRole('button',{name:'Open saved selections'})).toBeVisible();
 await expect(page.locator('body')).toContainText('Store preview');
 await page.getByRole('button',{name:'Home',exact:true}).click();await expect(page.locator('#products article')).toHaveCount(2);
 await page.getByRole('searchbox').fill('FIRST');await expect(page.locator('#products article')).toHaveCount(1);
 const trigger=page.getByRole('button',{name:'Personalize & explore →'});await trigger.click();
 await page.getByLabel('Street or place name').fill('A <script> test');
 await expect(page.locator('#personalPreview')).toHaveText('A <script> test');
 await page.getByRole('button',{name:'Save this selection'}).click();await expect(trigger).toBeFocused();
 await page.reload();await page.getByRole('button',{name:'Open saved selections'}).click();
 await expect(page.locator('#cartItems')).toContainText('A <script> test');
 await expect(page.locator('#cartTotal')).toHaveText('Illustrative total: $38.00');
 await expect(page.getByRole('link',{name:/verified marketplace|approved listing/})).toHaveCount(0);
 await page.getByRole('button',{name:'Clear saved selections'}).click();await expect(page.locator('#cartItems')).toContainText('empty');
 await page.getByRole('button',{name:'Close cart'}).click();await page.reload();await expect(page.locator('#cartCount')).toHaveText('0');
 await page.getByRole('searchbox').fill('no matches 12345');await expect(page.locator('#products')).toContainText('No designs match');
 expect(errors).toEqual([]);
});
test('keyboard focus is trapped and restored',async({page})=>{
 await page.goto('/');const trigger=page.locator('[data-product="family-name"]');await trigger.click();
 const close=page.getByRole('button',{name:'Close product details'});await expect(close).toBeFocused();
 await close.press('Shift+Tab');await expect(page.getByRole('button',{name:'Save this selection'})).toBeFocused();
 await page.keyboard.press('Tab');await expect(close).toBeFocused();
 await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
});
test('responsive layout and visible images',async({page})=>{
 await page.goto('/');await expect(page.locator('#products article')).toHaveCount(6);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 for(const img of await page.locator('#products img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);}
 await page.locator('[data-product="family-name"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await expect(page.getByRole('button',{name:'Save this selection'})).toBeVisible();
});
test('WCAG automated scan: storefront and open dialogs',async({page})=>{
 await page.goto('/');await audit(page);await page.locator('[data-product="family-name"]').click();await audit(page);
 await page.getByRole('button',{name:'Save this selection'}).click();await page.getByRole('button',{name:'Open saved selections'}).click();await audit(page);
});
test('policy and operations pages are accessible; calculator works',async({page})=>{
 await page.goto('/policies.html');await expect(page.getByRole('heading',{level:1})).toBeVisible();await audit(page);
 await page.goto('/operations.html');await page.getByRole('button',{name:'Calculate scenario'}).click();await expect(page.locator('#result')).toContainText('$9.91');await audit(page);
});
test('malformed saved data cannot break the storefront',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('hearthline_preview_cart_v1',JSON.stringify([null,{}, {id:'family-name',personalization:{}}])));
 await page.goto('/');await expect(page.locator('#products article')).toHaveCount(6);await expect(page.locator('#cartCount')).toHaveText('0');
});
