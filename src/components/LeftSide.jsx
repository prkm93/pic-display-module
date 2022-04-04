import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import moment from 'moment';
import { FcLike } from "react-icons/fc";
import RightSide from './RightSide';
import './LeftSide.css';
const api_url = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/instaf913f18.json';

const LeftSide = () => {
    
    const [imageData, setImageData] = useState('');
    const [loading, setLoading] = useState(false);

    const [picClicked, setPickClicked] = useState(false);

    useEffect( () => {
       fetchImageDetails();
    }, [])

    const fetchImageDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(api_url);
            if (response.status === 200) {
                setImageData(response.data);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            throw err;
        }
    }

    const clickHandler = (image, likes, timestamp) => {
        console.log(image, likes, timestamp);
        return <RightSide data={image, likes, timestamp}/>
    }

    return (
        <div className="left-pane">
            <div className="heading-pictures">
                <h3>Pictures</h3>
            </div>
            <div className="image-grid">
                {
                    imageData && Array.isArray(imageData) && imageData.map((item, index) => {
                        const { Image, likes, timestamp} = item;
                        return (
                            <Card id={index} className="img-card" onClick={(item) => clickHandler(Image, likes, timestamp)}>
                                <img variant="top" src={Image} className="card-img"/>
                                <div className="card-details">
                                        <p>{likes}<span className="like-icon"><FcLike/></span></p>
                                    <p>
                                        {moment(timestamp).fromNow()}
                                    </p>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LeftSide;