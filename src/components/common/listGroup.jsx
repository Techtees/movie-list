import React from 'react';

const ListGroup = (props) => {
    const { items ,textProperty,valueProperty,onItemSelect,selectedItem } = props;
    return ( 
        <ul className="list-group">
           {items.map((item) => {
               return (
                   <li style={{curson:'pointer'}} onClick={() => onItemSelect (item)} className={item== selectedItem ? 'list-group-item active' : 'list-group-item'} key={item[valueProperty]}>{item[textProperty]}</li>
               )
           })}
        </ul>
     );
}

ListGroup.defaultProps ={
    textProperty:'name',
    valueProperty:'_id'
}
 
export default ListGroup;