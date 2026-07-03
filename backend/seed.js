const fs = require("fs");
const path = require("path");
const db = require("./config/db");
async function seed() {
 try {
   console.log("Membaca file SQL...");
   // Ganti nama file jika berbeda
   const sqlPath = path.join(__dirname, "brooklyn_insurance.sql");
   const sql = fs.readFileSync(sqlPath, "utf8");
   // Hapus komentar
   const cleaned = sql
     .replace(/\/\*![\s\S]*?\*\//g, "")
     .replace(/^--.*$/gm, "");
   // Pecah menjadi query-query
   const queries = cleaned
     .split(";")
     .map(q => q.trim())
     .filter(q => q.length > 0);
   console.log(`Menjalankan ${queries.length} query...`);
   for (const query of queries) {
     try {
       await db.query(query);
     } catch (err) {
       console.log("Lewati query:");
       console.log(err.message);
     }
   }
   console.log("================================");
   console.log("DATABASE BERHASIL DIIMPORT");
   console.log("================================");
   process.exit(0);
 } catch (err) {
   console.error(err);
   process.exit(1);
 }
}
seed();