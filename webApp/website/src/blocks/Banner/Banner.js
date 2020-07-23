import React from 'react';

const Banner = (props) => {
  return (
    <div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <div className="row">
                 {props.value} 
              </div>
            </div>
    </div>
  )
}

export default Banner;



