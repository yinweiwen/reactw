'use strict';

 const request = require('superagent');
const buildUrl = (url,token) => {
    let connector = url.indexOf('?') === -1 ? '?' : '&';
    return `${url}${connector}token=${token}`;
};
 
 function factory(app, router, opts) {
     return async function (ctx, next) {
         
         const token = ctx.fs.api.token;
         
         //console.log(username,password)
         const req = {
             get: (url, query) => {
                 return request
                     .get(buildUrl(url,token))
                     .query(query)
             },
             post: (url, data, query) => {
                 return request
                     .post(buildUrl(url,token))
                     .query(query)
                     //.set('Content-Type', 'application/json')
                     .send(data);
             },
 
             put: (url, data) => {
                 return request
                     .put(buildUrl(url,token))
                     //.set('Content-Type', 'application/json')
                     .send(data);
             },
 
             delete: (url) => {
                 return request
                     .del(buildUrl(url,token))
             },
         };
 
         app.business = app.business || {};
         app.business.request = req;
 
         await next();
     };
 }
 
 module.exports = factory;
 