import React, {useEffect, useState} from "react";
import {Navbar, Container, Nav, Button, Row, Col, Card, ButtonGroup, Image, Stack, ProgressBar} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

function BreedCard(props){
    const [imageURL, setImageURL] = useState([]);
    useEffect(()=>{
        const referenceID = props.Breed.reference_image_id;
        const referenceURL = `https://api.${props.Breed.type === 'cat' ? 'thecatapi' : 'thedogapi'}.com/v1/images/${referenceID}`;
        axios.get(referenceURL).then(response => {
            // If the request is successful, the image data will be in response.data
            console.log(response.data.url);
            setImageURL(response.data.url);
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
    },[props.Breed]);

    return(
        <Card className="my-3" style={{maxHeight: '370px', minHeight: '370px'}}>
            <Card.Img src={imageURL} style={{height: '200px', objectFit: 'cover'}}/>
            <Card.Body>
                {/* Render the content of each item here */}
                <Card.Title>{props.Breed.name}</Card.Title>
                <div className="card-text-truncate">
                    {props.Breed.type == 'cat' ? props.Breed.description : props.Breed.temperament}
                </div>
                <Button variant="primary" className="rounded-0 mt-3" onClick={() => props.setShowPet({show: true, petDetails: props.Breed})}>READ MORE</Button>
            </Card.Body>
        </Card>
    );
}

function BreedCardDetails(props) {
    const [imageURL, setImageURL] = useState([]);
    useEffect(()=>{
        const referenceID = props.Breed.reference_image_id;
        const referenceURL = `https://api.${props.Breed.type === 'cat' ? 'thecatapi' : 'thedogapi'}.com/v1/images/${referenceID}`;
        axios.get(referenceURL).then(response => {
            // If the request is successful, the image data will be in response.data
            console.log(response.data.url);
            setImageURL(response.data.url);
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
    },[props.Breed]);

    return(
        <Container className="px-0 my-3">
            <Row>
                <Button variant="light" className="w-auto text-primary m-2" onClick={() => props.setShowPet({show: false, petDetails: []})}>Back</Button>
            </Row>
            <Row>
                <Col md={6}>
                    <Image src={imageURL} style={{height: '400px', width:'100%', objectFit: 'cover'}}/>
                </Col>
                <Col md={6}>
                    <Stack gap={1}>
                        <h3>{props.Breed.name}</h3>
                        {props.Breed.type == 'dog' ? (
                            <>
                                <p className="mb-2"><span className="fw-bold">Bred For: </span>{props.Breed.bred_for}</p>
                                <p className="mb-2"><span className="fw-bold">Breed Group: </span>{props.Breed.breed_group}</p>
                                <p className="mb-2"><span className="fw-bold">Lifespan: </span>{props.Breed.life_span}</p>
                                
                                <p className="mb-2"><span className="fw-bold">Height (Metric):</span>{props.Breed.height.metric}</p>
                                
                                <p className="mb-2"><span className="fw-bold">Weight (Metric): </span>{props.Breed.height.metric}</p>
                            </>
                        ):(
                            <>
                                <p className="mb-2"><span className="fw-bold">Origin: </span>{props.Breed.origin}</p>
                                <p className="mb-2"><span className="fw-bold">Temperament: </span>{props.Breed.temperament}</p>
                                <p className="mb-2"><span className="fw-bold">Lifespan: </span>{props.Breed.life_span}</p>
                                <p className="fw-bold mb-2">Adaptability:</p>
                                <ProgressBar now={(props.Breed.adaptability / 5) * 100}/>
                                <p className="fw-bold mb-2">Child Friendly:</p>
                                <ProgressBar now={(props.Breed.child_friendly / 5) * 100}/>
                                <p className="fw-bold mb-2">Dog Friendly:</p>
                                <ProgressBar now={(props.Breed.dog_friendly / 5) * 100}/>
                                <p className="fw-bold mb-2">Intelligence:</p>
                                <ProgressBar now={(props.Breed.intelligence / 5) * 100}/>
                            </>
                        )}
                    </Stack>
                </Col>
                <Col md={12}>
                    <p className="my-2">{props.Breed.type == 'cat' ? props.Breed.description : props.Breed.temperament}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default function BreedsList(props) {
    
    const [breeds, setBreeds] = useState([]);
    const [itemsToshow, setItemsToShow] = useState([]);
    const [showPet, setShowPet] = useState({
        show: false,
        petDetails: []
    });

    const location = useLocation();
    
    const [kind, setKind] = useState(props.kind || 'Both'); // 'Both', 'Cat', or 'Dog'
    const page = new URLSearchParams(location.search).get('page') || 1; // Get 'page' parameter from the query, default to 1
    const limit = new URLSearchParams(location.search).get('limit') || 20; // Get 'limit' parameter from the query, default to 20
    const [currentPage, setCurrentPage] = useState(1);
    const [pageParams, setPageParams] = useState({
        pages: page,
        maxLimit: limit,
        numberPerPage: limit/page
    })

    function getPetImage(Breed){
        const referenceID = Breed.reference_image_id;
        const referenceURL = `https://api.${Breed.type === 'cat' ? 'thecatapi' : 'thedogapi'}.com/v1/images/${referenceID}`;
        axios.get(referenceURL).then(response => {
            // If the request is successful, the image data will be in response.data
            console.log('retrieved');
            console.log(response.data.url);
            return response.data.url;
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
    }
    // Handle "Next" button click
    function handleNextClick() {
        console.log('Next');
        
        console.log(currentPage);
        console.log(pageParams.pages);
        const nextpage = currentPage + 1;
        if (currentPage < pageParams.pages) {
            setCurrentPage(nextpage);
            console.log('Next');
        }
    }
    
    // Handle "Previous" button click
    function handlePreviousClick() {
        
        const prevPage = currentPage - 1;
        if (currentPage > 1) {
            setCurrentPage(prevPage);
        }
    }


    useEffect(() => {
        setBreeds([]);
      axios.get(`/api/breeds/${page}/${limit}/${kind}`)
        .then(response => {
            console.log(response.data.results);
            setBreeds(response.data.results);
            setPageParams({
                pages: page,
                maxLimit: limit,
                numberPerPage: limit/page
            });
            setCurrentPage(1);
            setItemsToShow(response.data.results.slice(0, limit < limit/page ? limit : limit/page * 1))
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [kind]);


    useEffect(() => {
        console.log(`current ${currentPage}`);
        console.log(`numberPerPage ${pageParams.numberPerPage}`);
        const firstIndex = (currentPage - 1) * pageParams.numberPerPage;
        const lastIndex = Math.min(firstIndex + pageParams.numberPerPage - 1, pageParams.maxLimit - 1);
        
        console.log(`Range ${firstIndex} - ${lastIndex}`);
        setItemsToShow(breeds.slice(currentPage > 1 ? firstIndex - 1 : 0, currentPage <= 1 ? lastIndex + 1 : lastIndex));
    },[currentPage])

    return (
        <>
        <Navbar bg="primary" data-bs-theme="dark">
            <Container className="ms-0">
                <Nav>
                    <Button variant="primary" active={kind === 'Both'} onClick={() => setKind('Both')}>Home</Button>
                    <Button variant="primary" active={kind === 'Cat'} onClick={() => setKind('Cat')}>Cat</Button>
                    <Button variant="primary" active={kind === 'Dog'} onClick={() => setKind('Dog')}>Dog</Button>
                </Nav>
            </Container>
        </Navbar>
        {showPet.show ? (
            <BreedCardDetails Breed={showPet.petDetails} setShowPet={setShowPet}/>
        ):(
            <>
                <Container>
                    <Row>
                        {itemsToshow ? 
                            itemsToshow.map((item, index) => (
                                <Col key={index} md={3}>
                                    <BreedCard Breed={item} setShowPet={setShowPet}/>
                                </Col>
                            ))
                            : <></>
                        }
                    </Row>
                </Container>
                <ButtonGroup className="mb-2">
                    <Button variant="light" className="text-primary" onClick={() => handlePreviousClick()}>Prev</Button>
                    <Button variant="light" className="text-primary" onClick={() => handleNextClick()}>Next</Button>
                </ButtonGroup>
                <p className="my-auto ms-2">{`${currentPage} out of ${pageParams.pages} page/s`}</p>
            </>
        )}
        </>
      );
  
  }