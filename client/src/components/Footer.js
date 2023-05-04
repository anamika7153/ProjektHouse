import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer style={{height: "25vh", bottom: "0 !important"}} className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12 footer-left">
                <h5 className="white-text">Contact Us</h5>
                {/* <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p> */}
                <ul>
                    {/* <li><a className="white-text" href="mailto:aanyayadav419@gmail.com">Anamika Yadav</a></li> */}
                    <li><a className="white-text" href="mailto:projekt.house.ph@gmail.com">Email</a></li>
                    <li><a className="white-text" href="https://wa.me/+918601337075">WhatsApp</a></li>
                </ul>
              </div>
              <div className="col l4 offset-l2 s12 footer-right">
                <h5 className="white-text">Created By</h5>
                <ul>
                  {/* <li><a className="grey-text text-lighten-3" href="#!">Anamika Yadav</a></li> */}
                  <li>Anamika Yadav</li>
                  <li>Aditi Garg</li>
                  <li>Akanksha Sharma</li>
                  <li>Aditi Negi</li>
                </ul>
              </div>
            </div>
          </div>
          {/* <div style={{bottom: "0"}} className="footer-copyright">
            <div className="container">
            © 2014 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div> */}
        </footer>
    </div>
  )
}

export default Footer
