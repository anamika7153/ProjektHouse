import React from 'react'

const Details = () => {
  return (
    <div className='container' style={{ marginTop: '40px' }}>
      <div className='row'>
        <div className='col s8'>
            <div className='card blue-grey darken-1'>
                <div className='card-content white-text'>
                    <div className="" style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "90%",
                    }}
                    >
                        <img src='https://res.cloudinary.com/ddzjlkiyw/image/upload/v1670847797/no-image-icon-hi-1_yksd2s_dfjdkw.png' style={{width:"50px", borderRadius: "50%"}}/>
                        <div>
                        <button className="btn #" style={{marginRight: "10px", }}><i className="material-icons center-align">edit</i></button>
                        <button className="btn deep-orange darken-3"><i className="material-icons center-align">delete</i></button>
                        </div>
                    </div>
                    <h5>Member 1: <span>Anamika Yadav</span></h5>
                    <h5>Member 2: <span>Anamika Yadav</span></h5>
                    <h5>Member 3: <span>Anamika Yadav</span></h5>
                    <h5>Member 4: <span>Anamika Yadav</span></h5>
                    <h5>Member 5: <span>Anamika Yadav</span></h5>
                    {/* <span className='card-title'>Card</span> */}
                    {/* <p>lorem5</p> */}
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Details
