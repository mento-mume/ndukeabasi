const config = require ('config');
const mongoose = require ('mongoose')

module.exports = function(){
    const db = config.get('db');
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true,
})
    .then(()=>console.log(`connected to ${db}`))
    .catch(err=>console.error ('could not connect to mongodb'))
}