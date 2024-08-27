export default function ModalEliminar({ item }) {
  return (
    <div className="modal fade" id="eliminar" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="title" id="defaultModalLabel">
              Eliminar {item}
            </h6>
          </div>
          <div className="modal-body">
            <div className="row clearfix">
              <div className="col-12 d-flex justify-content-center">
                <h3>¿Desea eliminar el {item}?</h3>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger">
              si
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              no
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
