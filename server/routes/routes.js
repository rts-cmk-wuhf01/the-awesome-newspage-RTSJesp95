const date = require('date-and-time');
module.exports = (app) => {

   app.get('/', (req, res, next) => {
      let latestPosts = [{
         postTitle: "Finance",
         postText: "Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
         postImg: "19.jpg",
         postDate: '2018-04-14 7:00'
      },
      {
         postTitle: "Politics",
         postText: "Sed a elit euismod augue semper congue sit amet ac sapien.",
         postImg: "20.jpg",
         postDate: '2018-04-14 9:00'
      },
      {
         postTitle: "Health",
         postText: "Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
         postImg: "21.jpg",
         postDate: '2018-04-14 8:00'
      },
      {
         postTitle: "Finance",
         postText: "Augue semper congue sit amet ac sapien. Fusce consequat.",
         postImg: "22.jpg",
         postDate: '2018-04-14 7:00'
      },
      {
         postTitle: "Travel",
         postText: "Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
         postImg: "23.jpg",
         postDate: '2018-04-14 9:00'
      },
      {
         postTitle: "Politics",
         postText: "Augue semper congue sit amet ac sapien. Fusce consequat.",
         postImg: "24.jpg",
         postDate: '2018-04-14 9:00'
      }]
      res.render('home', {
         latestPosts: latestPosts,
         title: "The News Paper - News & Lifestyle Magazine Template"
      });
      let now = new Date('2019-01-14 19:00:14');
      // console.log(app.locals.dateAndTime.format(now, 'h:mm A | MMM DD | YYYY'));
      //Inde i routes skal der stå app.locals, men ikke inde i ejs filen.
      //Der nøjes man med at skrive dateAndTime.format
      let formattedDate = app.locals.dateAndTime.format(now, 'h:mm A | MMM DD | YYYY');
      console.log(formattedDate);
   });

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