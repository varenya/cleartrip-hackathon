import React from 'react';
import './content.css';

const Content = (props) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    };
    const dateString = new Date(props.created_at).toLocaleDateString("en-US",options);
    return (
        <div className="content-item">
            <div className="content-subhead">
                <a href={props.url} target="_blank">
                    {props.title}
                </a>
            </div>
            <p className="content-meta">
              <strong>{props.num_points}</strong>  points by author : <strong>{props.author}</strong> | Comments : <strong>{props.num_comments}</strong> | Created At : <strong>{dateString}</strong>
            </p>
        </div>
    )
}

export default Content;
