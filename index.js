import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import MoviesDAO from './dao/MoviesDAO.js'
import ReviewsDAO from './dao/ReviewsDAO.js'

async function main (){
    
    //load env 
    dotenv.config()

    // creat mongo client instance
    const client = new mongodb.MongoClient(process.env.DB_URL)

    //retrieve port from env or use port 8000
    const port = process.env.PORT||8000

    try {
        //connect to database
        await client.connect()

        await MoviesDAO.injectDB(client)

        await ReviewsDAO.injectDB(client)
        app.listen(port,()=>{
            console.log('server is running on port '+ port );
        })
    }
    catch(e){
        console.error(e);
        process.exit(1)
    }
}

main().catch(console.error);