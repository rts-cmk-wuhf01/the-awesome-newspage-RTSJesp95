const mysql = require('../config/mysql')
const date = require('date-and-time');
async function getCategories() {
   let db = await mysql.connect();
   let [categories] = await db.execute(`
      SELECT category_id, category_title 
      FROM categories
      ORDER BY category_title ASC`);
   db.end();
   return categories;
}
module.exports = (app) => {

   // app.get('/database', async (req, res, next) =>{
   //    // Ved hjælp af async, bliver det muligt mellem krølleparanteserne at bruge await
   //    // Efterfølgende udfører den funktionen
   //    let db = await mysql.connect();
   //    let [products] = await db.execute('SELECT * FROM products LEFT OUTER JOIN categories ON category_id = fk_category_id');
   //    db.end();

   //    // res.send(products);

   //    res.render('products', {
   //       'products': products
   //    });
   // })

   app.get('/test', async (req, res, next) =>{
      // Ved hjælp af async, bliver det muligt mellem krølleparanteserne at bruge await
      // Efterfølgende udfører den funktionen
      let db = await mysql.connect();
      let [authors] = await db.execute('SELECT * FROM authors');
      console.log(authors);
      db.end();

      // res.send(products);

      res.render('databaseTest', {
         'authors': authors
      });
   })

   app.get('/category/:category_id', async (req, res, next) => {
      // res.send(req.params.category_id); // for demonstrationens skyld! 
      let db = await mysql.connect();
      // let [articles] = await db.execute('SELECT * FROM articles WHERE fk_category_id = ?', [req.params.category_id]);
      // Eksempel på en SUBSELECT der henter antallet af kommentarer på en artikel
      // Her bliver tingene sat sammen med variablen articles og alle tingene der bliver selected bliver smidt ind i et array
      // For f.eks. at vælge author_name, I det her tilfælde fordi det er sat ind i en forEach (article)
      // skal man skrive article.author_name. Det samme gælder hvis man skal have fat i de andre ting
      // der er i SELECT, skal man bare skrive article(Navnet på vores forEach).(Navnet på det du vil have fat i, i din SELECT)
      let [articles] = await db.execute(`
         SELECT
              category_id
            , category_title
            , article_id
            , article_title
            , article_text
            , article_image
            , article_likes
            , author_id
            , author_name
            , (SELECT COUNT(comment_id) 
               FROM comments 
               WHERE fk_article_id = article_id) AS article_comments
         FROM articles 
         INNER JOIN categories ON category_id = fk_category_id
         INNER JOIN authors ON author_id = fk_author_id
         WHERE fk_category_id = ?`, [req.params.category_id]);
      let [categories] = await db.execute('SELECT * FROM  categories');
      // let [categoriesNav] = await db.execute('SELECT * FROM  categories');
      // Eksempel på hvordan man kan finde den nyeste post i hver kategori
      let [latestPosts] = await db.execute(`
      SELECT 
           category_id
         , category_title
         , article_id
         , article_title
         , article_image
         , article_postdate
      FROM categories 
      LEFT OUTER JOIN articles ON fk_category_id = category_id
      WHERE article_id = (
            SELECT article_id 
            FROM articles 
            WHERE fk_category_id = category_id 
            ORDER BY article_postdate DESC 
            LIMIT 1)
      ORDER BY article_postdate DESC`);
      db.end();
      res.render('category', {
         'categories': categories, 
         'articles': articles,
         'latestPosts': latestPosts
      });
      // her kan alle kategoriens artikler hentes osv...
   });

   app.get('/', async (req, res, next) => {
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
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM  categories');
      db.end();
      res.render('home', {
         latestPosts: latestPosts,
         title: "The News Paper - News & Lifestyle Magazine Template",
         'categories': categories
      });
      let now = new Date('2019-01-14 19:00:14');
      // console.log(app.locals.dateAndTime.format(now, 'h:mm A | MMM DD | YYYY'));
      //Inde i routes skal der stå app.locals, men ikke inde i ejs filen.
      //Der nøjes man med at skrive dateAndTime.format
      let formattedDate = app.locals.dateAndTime.format(now, 'h:mm A | MMM DD | YYYY');
      console.log(formattedDate);
   });

   // app.get('/', (req, res, next) => {
   //    res.render('home', {
   //       title: "The News Paper - News & Lifestyle Magazine Template"
   //    });
   // });

   app.get('/categories-post', async (req, res, next) => {
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM  categories');
      db.end();
      res.render('categories-post', {
         title: "The News Paper - News & Lifestyle Magazine Template",
         'categories': categories
      });
   });

   app.get('/single-post', async (req, res, next) => {
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM  categories');
      db.end();
      res.render('single-post', {
         title: "The News Paper - News & Lifestyle Magazine Template",
         'categories': categories
      });
   });

   app.get('/about', async (req, res, next) => {
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM  categories');
      db.end();
      res.render('about', {
         title: "The News Paper - News & Lifestyle Magazine Template",
         'categories': categories
      });
   });

   app.get('/contact', async (req, res, next) => {
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM  categories');
      db.end();
      res.render('contact', {
         title: "The News Paper - News & Lifestyle Magazine Template",
         'categories': categories
      });
   });

   //  tilføjes i routes.js filen f.eks. lige under app.get('/contact') endpoint
   app.post('/contact', async (req, res, next) => {
      // indsamling af værdierne og oprettelse af de nødvendige variabler.
      //I req.body.name leder den efter name="name" i input feltet
      //Det samme gælder for alle de andre variabler
      let name = req.body.name;
      let email = req.body.email;
      let subject = req.body.subject;
      let message = req.body.message;
      let contactDate = new Date();
   
      // håndter valideringen, alle fejl pushes til et array så de er samlet ET sted
      let return_message = [];
      if (name == undefined || name == '') {
         return_message.push('Navn mangler');
      }
      if (email == undefined || email == '') {
         return_message.push('Email mangler');
      }
      if (subject == undefined || subject == '') {
         return_message.push('Emne mangler');
      }
      if (message == undefined || message == '') {
         return_message.push('Beskedteksten mangler');
      }
   
      // dette er et kort eksempel på strukturen, denne udvides selvfølgelig til noget mere brugbart
      // hvis der er 1 eller flere elementer i `return_message`, så mangler der noget
      if (return_message.length > 0) {
         
         // der er mindst 1 information der mangler, returner beskeden som en string.
         let categories = await getCategories();
         res.render('contact', {
            'categories': categories,
            //Join gør at den sætter de forskellige felter sammen med mellemrum, hvis
            //felterne er tomme. I det her tilfælde bliver det joined i et tomt array
            //som hedder return_message, som er defineret lidt længere oppe
            'return_message': return_message.join(', '),
            'values': req.body, // læg mærke til vi "bare" sender req.body tilbage
            title: "The News Paper - News & Lifestyle Magazine Template"
         });
         
      } else {
         // send det modtagede data tilbage, så vi kan se det er korrekt
         let db = await mysql.connect();
         let result = await db.execute(`
         INSERT INTO messages 
         (message_name, message_email, message_subject, message_text, message_date) 
         VALUES 
         (?,?,?,?,?)`, [name, email, subject, message, contactDate]);
         db.end();
         // affected rows er større end nul, hvis en (eller flere) række(r) blev indsat
         if (result[0].affectedRows > 0) {
            return_message.push('Tak for din besked, vi vender tilbage hurtigst muligt');
         } else {
            return_message.push('Din besked blev ikke modtaget.... ');
         }
         let categories = await getCategories();
         res.render('contact', {
            'categories': categories,
            'return_message': return_message.join(', '),
            'values': req.body, // læg mærke til vi "bare" sender req.body tilbage
            title: "The News Paper - News & Lifestyle Magazine Template"
         });
      }
   });
};