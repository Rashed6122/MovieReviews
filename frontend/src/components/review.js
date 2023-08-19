import React, { useState } from 'react'
import MovieDataService from "../services/movies"
import { Link , useLocation, useParams} from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Review(user){
    let editing = false
    let intReviewState = ""
    let movieid = useParams().id;
    let {state} = useLocation();
    if ( state && state.currentReview){
        editing = true
        intReviewState = state.currentReview.review
    }
    
    const [ submited , setSubmited] = useState(false)
    const [review, setReview] = useState(intReviewState)
    const onChangeReview = e =>{
        const review = e.target.value
        setReview(review)
    };

    const saveReview = () =>{
        var data = {
            review: review,
            name: user.user.name,
            user_id: user.user.id,
            movie_id: movieid
        }
        if (editing){
            data.review_id = state.currentReview._id
            MovieDataService.updateReview(data)
            .then(response =>{
                setSubmited(true)
                console.log(response.date)
            }).catch(e =>{console.log(e);})
        }
        else {
        MovieDataService.createReview(data)
        .then(response =>{
            setSubmited(true)
        }).catch(e =>{console.log(e);})
    }};
    return(
        <div>
            { submited?(
                <div>
                    <h4>Review submited Successfully</h4>
                    <Link to = {"/movies/" + movieid }>
                        Back To Movie
                    </Link>
                </div>
            ):(
                <Form>
                    <Form.Group>
                        <Form.Label>
                            {editing?"Edit":"Create"} Review
                        </Form.Label>
                        <Form.Control 
                            type = "text"
                            required
                            value={review}
                            onChange={onChangeReview}
                        />
                    </Form.Group>
                    <Button variant='primary' onClick={saveReview}> Submit </Button>
                </Form>
            )           
            }
        </div>
    )
}
export default Review;