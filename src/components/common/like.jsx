import React from 'react';


const Like  = (props) => {
    let classes = 'fa fa-heart';
    if (!props.liked) classes += '-o'
    return (
        <i className={!props.liked?'fa fa-heart-o': 'fa fa-heart'} onClick={props.onClick} style={{cursor:'pointer'}}></i>
    );
}
 
export default Like ;