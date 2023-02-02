//Librerias y componentes de react que se necesitan para el funcionamiento de la app
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { useEffect, useState } from "react";


//Funcion que contiene todos los metodos utilizados
function Property() {
    const URL = "https://localhost:44316/api/tbl_Users";

    //Estado para guardar datos que llegan
    const [data, setData] = useState([]);
    //Estado para manipulat el modal
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    //Estado para guardar datos de los input
    const [tblUsers, settblUsers] = useState({
      id_DataUser: 0,
      Nombre : "",
      DocumentoId: "",
      Edad : 0,
      Domicilio : "",
      Telefono : "",
      Correo : "",
    });
  
    //Peticion get para obtener los datos
    const peticionGet = async () => {
      await axios
        .get(URL)
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    useEffect(() => {
      peticionGet();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      settblUsers({
        ...tblUsers,
        [name]: value,
      });
      console.log(tblUsers);
    };
  
    const modalInsertarOpen = () => {
      setModalInsertar(!modalInsertar);
    };
  
    const modalEditarOpen = () => {
      setModalEditar(!modalEditar);
    };
  
    const modalEliminarOpen = () => {
      setModalEliminar(!modalEliminar);
    };
  
    //Peticion post para obtener por id los datos
    const peticionPost = async () => {
      delete tblUsers.id_DataUser;
      await axios
        .post(URL, tblUsers)
        .then((res) => {
          setData(data.concat(res.data));
          modalInsertarOpen();
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    //Peticion get para modificar los datos
    const peticionPut = async () => {
      await axios
        .put(URL + "/" + tblUsers.id_DataUser, tblUsers)
        .then((res) => {
          var respuesta = res.data;
          var dataAux = data;
          dataAux.map((gestor) => {
            if (gestor.id_DataUser === tblUsers.id_DataUser) {
              gestor.Nombre = respuesta.Nombre;
              gestor.DocumentoId = respuesta.DocumentoId;
              gestor.Edad = respuesta.Edad;
              gestor.Domicilio = respuesta.Domicilio;
              gestor.Telefono = respuesta.Telefono;
              gestor.Correo = respuesta.Correo;
            }
          });
          modalEditarOpen();
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    //Peticion get para eliminar los datos
    const peticionDelete = async () => {
      await axios
        .delete(URL + "/" + tblUsers.id_DataUser)
        .then((res) => {
          setData(data.filter(item => item.id_DataUser !== res.data))
          modalEliminarOpen();
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const seleccionarDato = (dato, caso) => {
      caso === "Editar" ? modalEditarOpen() : modalEliminarOpen();
      settblUsers(dato);
    };
  
    return (
      <div className="App container">
        <button onClick={() => modalInsertarOpen()} className="btn btn-success">
          Insertar nueva propiedad
        </button>
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>DocumentoId</th>
              <th>Edad</th>
              <th>Domicilio</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id_DataUser}>
                <td>{item.id_DataUser}</td>
                <td>{item.Nombre}</td>
                <td>{item.DocumentoId}</td>
                <td>{item.Edad}</td>
                <td>{item.Domicilio}</td>
                <td>{item.Telefono}</td>
                <td>{item.Correo}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => seleccionarDato(item, "Editar")}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionarDato(item, "Eliminar")}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar nueva Propiedad</ModalHeader>
          <ModalBody>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="nombre"
              />
              <label>DocumentoId:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="documento"
              />
              <label>Edad:</label>
              <input
                type="number"
                className="form-control"
                onChange={handleChange}
                name="edad"
              />
              <label>Domicilio:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="domicilio"
              />
              <label>Telefono:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="telefono"
              />
              <label>Correo:</label>
              <input
                type="number"
                className="form-control"
                onChange={handleChange}
                name="correo"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => peticionPost()}>
              Insertar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => modalInsertarOpen()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
  
        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar datos de un usuario</ModalHeader>
          <ModalBody>
            <div>
              <label>User Id:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="idUser"
                readOnly
                value={tblUsers && tblUsers.id_DataUser}
              />
              <label>Nombre:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="nombre"
                value={tblUsers && tblUsers.Nombre}
              />
              <label>DocumentoId:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="documento"
                value={tblUsers && tblUsers.DocumentoId}
              />
              <label>Edad:</label>
              <input
                type="number"
                className="form-control"
                onChange={handleChange}
                name="edad"
                value={tblUsers && tblUsers.Edad}
              />
              <label>Domicilio:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="codeInternal"
                value={tblUsers && tblUsers.Domicilio}
              />
              <label>Telefono:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="year"
                value={tblUsers && tblUsers.Telefono}
              />
              <label>Correo:</label>
              <input
                type="number"
                className="form-control"
                onChange={handleChange}
                name="idOwner"
                value={tblUsers && tblUsers.Correo}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => peticionPut()}>
              Insertar
            </button>
            <button className="btn btn-danger" onClick={() => modalEditarOpen()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
  
        <Modal isOpen={modalEliminar}>
          <ModalHeader>Editar datos de un Usuario</ModalHeader>
          <ModalBody>
            ¿Estas seguro que deseas eliminar este registro de la base de datos{" "}
            {tblUsers && tblUsers.Nombre}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => peticionDelete()}>
              Si
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => modalEliminarOpen()}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
}

export default Property;