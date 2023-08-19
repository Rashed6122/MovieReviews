import React, {useState, useEffect} from 'react'
import MovieDataService from '../services/movies'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import moment from 'moment';


function Movie(user){
    const [movie, setMovie] = useState({
        id:null,
        title:"",
        rated:"",
        reviews:[]
    })
    let movieid = useParams().id;
    const getMovie = (id)=>{
        MovieDataService.get(id)
        .then(response=>{
            console.log(response.data)
            setMovie(response.data)
        }).catch( e =>{
            console.log(e)
        })
    };
    useEffect(()=>{
        getMovie(movieid)
    },[movieid]);
    const deleteReview = (reviewid , index)=>{
        MovieDataService.deleteReview(reviewid, user.user.id)
        .then(response => {
            setMovie((currState)=>{
                currState.reviews.splice(index,1)
                return ({...currState})
            })
        }).catch(e=>{console.log(e)})
    };
    return(
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src ={movie.poster + "/100px200"} fluid/>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header >{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>{movie.plot}</Card.Text>
                                <Card.Text>{user.user && <Link to ={"/movies/"+ movieid +"/review"}> Add Review </Link>}</Card.Text>
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Reviews</h2>
                        <br></br>
                        {movie.reviews.map((review, index)=>{
                            return(
                                <Card Key = {index}>
                                    <CardHeader>{ review.name + " On " }{moment(review.date).format("Do MMMM YYYY")}</CardHeader>
                                    <Card.Text>
                                        {review.review }
                                    </Card.Text>
                                    { user.user && user.user.id === review.user_id  && 
                                        <Row>
                                            <Col>
                                                <Link to ={"/movies/" + movieid + "/review"} state = {{currentReview: review}}>
                                                    Edit 
                                                </Link>
                                            </Col>
                                            <Col>
                                                <Button variant="link" onClick={()=>{deleteReview(review._id,index)}} >Delete</Button>
                                            </Col>
                                        </Row>
                                    }
                                </Card>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Movie;