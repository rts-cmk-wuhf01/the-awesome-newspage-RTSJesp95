module.exports = (app) => {

   app.get('/', (req, res, next) => {
      res.render('home', {
         title: "The News Paper - News & Lifestyle Magazine Template"
      });
   });

   app.get('/categories-post', (req, res, next) => {
      res.render('categories-post', {
         title: "The News Paper - News & Lifestyle Magazine Template"
      });
   });

   app.get('/single-post', (req, res, next) => {
      res.render('single-post', {
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