const app = require('../../src/scripts/server.js')
const PORT = process.env.PORT || 3000 

app.listen(PORT, () => console.log("Servidor iniciado"))