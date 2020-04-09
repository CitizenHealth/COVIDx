import React from 'react'
import './imageCard.css'


const ImageCard = props => (
    <a href={props.link}>
        <span>
            <div className="Card">
                <img src={props.Image} />
                <h3>{props.title}</h3>
                <p>{props.text}</p>
            </div>
        </span>
    </a>

)
export default ImageCard