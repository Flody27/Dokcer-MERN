import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Error404 = () => {
  return (
    <>
      <Navbar title="404" />

      <div className="d-flex justify-content-center align-items-center mt-4"  style={{ height: '50vh' }}>

            <div className="container mt-4 mb-4 " >

                  <div className="flex-column text-center mb-4">
                        <h1 className="mb-4" style={{ fontSize: 90 }} > 404 </h1>
                        <i class="bi bi-exclamation-octagon-fill text-danger" style={{ fontSize: '48px' }}> 
                              <span className="text-black" style={{ color: 'black' }} > Ooops, página no encontrada </span>
                        </i>
                        <br />
                        <a href="/" className="btn btn-success mt-4 mb-4 "> Volver al inicio </a>
                  </div>

            </div>

      </div>
      <Footer />

    </>
  )
}

export default Error404