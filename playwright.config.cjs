const {defineConfig,devices}=require('@playwright/test');
module.exports=defineConfig({
 testDir:'./tests/browser',fullyParallel:true,retries:process.env.CI?1:0,
 reporter:[['list'],['html',{open:'never'}]],
 use:{baseURL:'http://127.0.0.1:4173',trace:'retain-on-failure',screenshot:'only-on-failure'},
 projects:[{name:'desktop',use:{...devices['Desktop Chrome']}},{name:'mobile',use:{...devices['Pixel 7']}},{name:'small-mobile',use:{viewport:{width:320,height:640},isMobile:true,hasTouch:true}}],
 webServer:{command:'python3 -m http.server 4173 --bind 127.0.0.1 --directory dist',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI}
});
