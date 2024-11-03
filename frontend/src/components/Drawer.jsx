

const Drawer = () => {
  return (
    <>
    
    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
      Toggle static offcanvas
    </button>

<div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <div>
      I will not close if you click outside of me.
    </div>
  </div>
</div>
    
    </>
  
  )
}


export default Drawer