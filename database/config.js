const mongoose = require('mongoose');
require('dotenv').config()
const dbConection = async () => {
    try {
        await mongoose.connect(process.env.URL_DATABASE);
        console.log('DB is online');

    } catch (error) {
        console.log('DB connect error', error);
    }

}

module.exports = dbConection
//user: mean_user
//password: K0sWDtzX374EW2tM
// mongodb+srv://root:<password>@cluster0.rwkz9.mongodb.net/test
