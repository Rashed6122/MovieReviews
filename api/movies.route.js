import express  from "express"
import moviesController from "./movies.controller.js"
import ReviewsController from './Reviews.controller.js'


const router = express.Router()

router.route('/').get(moviesController.apiGetMovies)
router.route("/id/:id").get(moviesController.apiGetMovieById)
router.route("/ratings").get(moviesController.apiGetRatings)
router.route('/review')
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

export default router