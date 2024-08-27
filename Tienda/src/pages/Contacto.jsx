import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Contacto = () => {
  
  return (
    <>
      {/* Navbar */}
      <Navbar title='Contacto' />

      {/* Cuerpo de la pagina */}
      <div className="container mt-4 d-flex justify-content-center">
        <div className="flex-column">
          <h2 className='text-center'>Contáctanos</h2>
          <h5 className='text-center mt-2'>¿Como podriamos ayudarte?</h5>
        </div>
      </div>

      <div className="container mb-4">

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Nombre</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" style={{ backgroundColor: '#F0F0F0' }}/>
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Correo electrónico </label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="" style={{ backgroundColor: '#F0F0F0' }} />
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Teléfono</label>
          <input type="phone" class="form-control" id="exampleFormControlInput1" placeholder="" style={{ backgroundColor: '#F0F0F0' }} />
        </div>

        <div className="container mb-2">
          <h5 className="h5"> Seleccione el producto(s) a solicitar información </h5>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
            <label class="form-check-label" for="flexCheckChecked"> Mieles </label>
          </div>

          <div className="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault"> Bálsamos </label>
          </div>

          <div className="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault"> Velas </label>
          </div>

          <div className="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault"> Jabones </label>
          </div>

        </div>
        

        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label mt-2">Comentarios adicionales</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" style={{ backgroundColor: '#F0F0F0' }}></textarea>
        </div>

        <div className="container mt-4 d-flex justify-content-center">
          <button className="btn btn-success btn-lg">
            Enviar mensaje
          </button>
        </div>
      </div>

      {/* 2 Contenedor */}
      <div className="container mt-4 d-flex justify-content-center">
        <div className="flex-column">
          <h2 className='text-center'>O Visítanos en nuestra sucursal</h2>
        </div>
      </div>

      {/* Contenedor iframe */}
      <div className="container mt-4 mb-2 d-flex justify-content-center">
        <div className="flex-column">
          
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15723.461029240054!2d-83.9238161089467!3d9.861670071839415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0df1021af2921%3A0xb5e5548558a39c52!2sProvincia%20de%20Cartago%2C%20Cartago!5e0!3m2!1ses-419!2scr!4v1680804284758!5m2!1ses-419!2scr" 
          width="600" 
          height="450" 
          style={{ border: 0 }} 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
          </iframe>

          <i class="fa-brands fa-waze">Waze</i>


        </div>

      </div>


      {/* Footer */}
      <Footer />
    </>

    
  )
}

export default Contacto