const mysql = require("../config/mysql");

async function getCategories() {
   let db = await mysql.connect();
   let [categories] = await db.execute(`
      SELECT category_id, category_title 
      FROM categories`);
   db.end();
   return categories;
}

module.exports = app => {
   // her placeres alle de routes administrations panelet har brug for 
   app.get("/admin/categories", async (req, res, next) => {
      // her skal alle kategorier hentes og sendes til template filen.....
      let categories = await getCategories();
      res.render('admin_categories', {
         'categories': categories
      });
    });

    app.post("/admin/categories", async (req, res, next) => {
      // her skal vi modtage form data og indsætte det i databasen
      // send bruger tilbage til kategori admin listen
      // indsamling af værdierne og oprettelse af de nødvendige variabler.
      //I req.body.name leder den efter name="name" i input feltet
      //Det samme gælder for alle de andre variabler
      let name = req.body.name;
      // let email = req.body.email;
      // let subject = req.body.subject;
      // let message = req.body.message;
      let contactDate = new Date();
   
      // håndter valideringen, alle fejl pushes til et array så de er samlet ET sted
      let return_message = [];
      if (name == undefined || name == '') {
         return_message.push('Navn mangler');
      }
      // if (email == undefined || email == '') {
      //    return_message.push('Email mangler');
      // }
      // if (subject == undefined || subject == '') {
      //    return_message.push('Emne mangler');
      // }
      // if (message == undefined || message == '') {
      //    return_message.push('Beskedteksten mangler');
      // }
   
      // dette er et kort eksempel på strukturen, denne udvides selvfølgelig til noget mere brugbart
      // hvis der er 1 eller flere elementer i `return_message`, så mangler der noget
      if (return_message.length > 0) {
         
         // der er mindst 1 information der mangler, returner beskeden som en string.
         let categories = await getCategories();
         res.render('admin_categories', {
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
         res.render('admin_categories', {
            'categories': categories,
            'return_message': return_message.join(', '),
            // 'values': req.body, // læg mærke til vi "bare" sender req.body tilbage
            title: "The News Paper - News & Lifestyle Magazine Template"
         });
      }
    });

    app.get("/admin/categories/edit/:category_id", async (req, res, next) => {
      // denne route skal hente både alle kategorier og den ene kategori
      // data skal sendes til template filen
    });

    app.post("/admin/categories/edit/:category_id", async (req, res, next) => {
      // tag form data og parameter fra endpoint og opdater databasen
      // send bruger tilbage til kategori admin listen
    });

    app.get("/admin/categories/delete/:category_id", async (req, res, next) =>{
      // benyt endpoint parameter til at slette en kategori fra databasen
      // send bruger tilbage til kategori admin listen
    })
};