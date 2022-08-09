import React from 'react';
import PropsTypes from 'prop-types'
import _ from 'lodash'

const Pagination = (props) => {
    const {pageSize, itemCount,onPageChange,currentPage} = props;
    console.log(currentPage);
    const pageCount = Math.ceil(itemCount / pageSize)
    console.log(pageCount)
    if ( pageCount === 1 ) return null 
    const pages =_.range(1,pageCount + 1)
    return ( 
        <nav>
            <ul className="pagination">
                {pages.map((page)=> { 
                    return(<li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}><a onClick={()=> onPageChange(page)} className="page-link" style={{cursor:'pointer'}}>{page}</a></li>)
                })}
            </ul>
        </nav>
     );
}
Pagination.propTypes = {
    pageSize:PropsTypes.number.isRequired, itemCount: PropsTypes.number.isRequired,onPageChange: PropsTypes.func.isRequired,currentPage:PropsTypes.number.isRequired
}
 
export default Pagination;