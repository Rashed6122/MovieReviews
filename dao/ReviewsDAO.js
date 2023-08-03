import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO{
    static async injectDB(conn){
        if (reviews){
            return
        }
        try {
            reviews = await conn.db('sample_mflix').collection('reviews')
        }
        catch(e){
            console.error(`unable to establish connection handle in review: ${e}`)
        }
    }
    static async addReview (movieid, userinfo, review, date){
        try {
            const reviewDOC ={
                name: userinfo.name,
                user_id: userinfo._id,
                date :date,
                review: review,
                movieid: new ObjectId(movieid)
            }
            return await reviews.insertOne(reviewDOC)
            
        }
        catch(e){
            console.error(`unable to post ${e}`)
            return{error :e}
        }
    }
    static async updateReview(reviewid, userid, review , date){
        const test = {
            review_id : new ObjectId(reviewid)
        }
        try{
        const updateResponse = await reviews.updateOne(
            {user_id:userid, _id :test.review_id},
            {$set:{review:review, date:date}})
            return updateResponse
        }
        catch(e){
            console.error(`unable to update review:${e}`)
            return {error : e}
        }
    }
    static async deleteReview(reviewid, userid){
        try{
        const deleteResponse = await reviews.deleteOne(
            {user_id:userid,_id:new ObjectId(reviewid)})
            return deleteResponse
        }
        catch(e){
            console.error(`unable to delete review:${e}`)
            return {error : e}
        }
    }
}