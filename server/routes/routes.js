module.exports = (app) => {

   app.get('/', (req, res, next) => {
      res.render('home', {
         title: "The News Paper - News & Lifestyle Magazine Template"
      });
   });

   app.get('/about', (req, res, next) => {
      res.render('about', {
         title: "The News Paper - News & Lifestyle Magazine Template"
      });
   });

   app.get('/contact', (req, res, next) => {
      res.render('contact', {
         title: "The News Paper - News & Lifestyle Magazine Template"
      });
   });

};