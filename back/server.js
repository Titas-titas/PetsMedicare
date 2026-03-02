import app from "./app.js";
import "dotenv/config";

//db connection and test function
import { testConnection, sql } from "./dbConnection.js";

const port = process.env.PORT;

(async () => {
  try {
    //test db connection
    await testConnection();

    //start server
    app.listen(port, () => {
      console.log("Server is ready and listening port " + port);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1); //with error
  }
})();

//when user presses ctrl+c to terminate application and close database connection
process.on("SIGINT", async () => {
  console.log("Closing database connection");
  await sql.end(); //closes all database connections
  process.exit(0); //without error
});
