import ReviewsDAO from '../dao/ReviewsDAO.js'

export default class ReviewsController{
    static async apiPostReview(req,res,next) {
        try{
            const movieid = req.body.movie_id
            const review = req.body.review
            const userinfo = {
                name: req.body.name,
                _id : req.body.user_id
            }
            const date = new Date()

            const reviewResponse = await ReviewsDAO.addReview(
                movieid,
                userinfo,
                review,
                date
            )
            res.json({status:"success"})
        }
        catch(e){
            res.status(500).json({error : e.message})
        }
    }
    static async apiUpdateReview(req,res,next) {
        try{
            const reviewid = req.body.review_id
            const review = req.body.review

            const date = new Date()
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewid,
                req.body.user_id,
                review,
                date    
            )
            var {error} = reviewResponse
            if (error){
                res.status.json({error})
            }
            if (reviewResponse.modifiedCount === 0){
                throw new Error ("unable to update review. User may not be original poster")
            }
            res.json({status:"success"})
        }
        catch(e){
            res.status(500).json({error : e.message})
        }
    }
    static async apiDeleteReview(req,res,next) {
        try{
            const reviewid = req.body.review_id

            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewid,
                req.body.user_id,
            )
            res.json({status:"success"})
        }
        catch(e){
            res.status(500).json({error : e.message})
        }
    }
}