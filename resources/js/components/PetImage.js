import React, {useEffect, useState} from "react";
import { Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function PetImage (props) {

    const { image_id } = useParams();
    const [imageURL, setImageURL] = useState();

    function getPetImage(image_id){
        const referenceID = image_id;
        const referenceURL = `https://api.thecatapi.com/v1/images/${referenceID}`;
        axios.get(referenceURL).then(response => {
            // If the request is successful, the image data will be in response.data
            console.log('retrieved');
            console.log(response.data.url);
            setImageURL(response.data.url);
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
    }
    useEffect(() => {
        getPetImage(image_id);
    },[image_id]);
    return (
        imageURL ? <img src={imageURL} className="w-100" style={{objectFit: 'cover'}}/> : <></>
    );
}