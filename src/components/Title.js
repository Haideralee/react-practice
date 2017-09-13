import React from "react";

//making state less component
const StateLess = (props) => {
    return(
        <span>
            <b className="title">{props.title}</b>
            <i> | </i>
            <span className="tag-line">{props.tagLine}</span>
        </span>
    )
};

export default StateLess;