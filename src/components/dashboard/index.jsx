import "./style.css";
import { Modal } from "@react-ui-org/react-ui";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Api from "../../services/api";
import logo from "../../assets/img/Logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard({ nameUser, module, lista, setLista, setAutenticathed }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [detalhes, setDetalhes] = useState(false);
  const [idProduct, setIdProduct] = useState();
  const { register, handleSubmit } = useForm();

  const token = JSON.parse(localStorage.getItem("@kenziehub:token"));
  function detalhesModal(id) {
    setDetalhes(true);
  }

  function excluirTech(id) {
    Api.delete(`/users/techs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((_) => {
      setLista([...lista]);
      return toast.success("excluído com sucesso", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }

  function clique() {
    setModalOpen(true);
  }

  function cadastrarTech(data) {
    Api.post("/users/techs", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((_) => {
        setLista([...lista, data]);
        setModalOpen(false);
        return toast.success("Cadastrado com sucesso", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((_) => {
        setModalOpen(false);
        return toast.error("Algo deu errado", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  const history = useHistory();

  return (
    <div className="layout-dashboard">
      <div className="header-dashboard-top">
        <img src={logo} />
        <button
          className="dashboard-btn-voltar"
          onClick={() => {
            localStorage.clear();
            setAutenticathed(false);
          }}
        >
          voltar
        </button>
      </div>
      <div className="linha"></div>
      <div className="welcome">
        <p className="apresentacao">Olá, {nameUser}</p>
        <p className="modulo-user">{module}</p>
      </div>
      <div className="linha"></div>

      <div>
        <div>
          <div className="tecnologias">
            <p>Tecnologias</p>
            <button className="btn-add-tech" onClick={() => clique()}>
              +
            </button>
          </div>

          {modalOpen && (
            <Modal>
              <div className="modal-cadastroTech">
                <form onSubmit={handleSubmit(cadastrarTech)}>
                  <div className="header-modal">
                    <p>Cadastrar tecnologia</p>
                    <button
                      className="btn-modal"
                      onClick={(e) => {
                        e.preventDefault();
                        setModalOpen(false);
                      }}
                    >
                      x
                    </button>
                  </div>
                  <div className="form-modal-tech">
                    <label className="modal-label">Nome</label>
                    <input
                      className="inputs-modal"
                      placeholder="Nome da Tecnologia"
                      {...register("title")}
                    />
                    <label className="modal-label">Selecionar status</label>
                    <select className="inputs-modal" {...register("status")}>
                      <option>Iniciante</option>
                      <option>Intermediário</option>
                      <option>Avançado</option>
                    </select>
                    <button className="btn-modal-tech" type="submit">
                      Cadastrar Tecnologia
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          )}

          {detalhes && (
            <Modal>
              <div className="modal-cadastroTech">
                <form>
                  <div className="header-modal">
                    <p>Tecnologia detalhes</p>
                    <button
                      className="btn-modal"
                      onClick={(e) => {
                        e.preventDefault();
                        setDetalhes(false);
                      }}
                    >
                      x
                    </button>
                  </div>
                  <div className="form-modal-tech">
                    <label className="modal-label">Nome do projeto</label>
                    <input
                      className="inputs-modal"
                      placeholder="Nome do projeto"
                    />
                    <label className="modal-label">Selecionar status</label>
                    <select className="inputs-modal">
                      <option>Iniciante</option>
                      <option>Intermediário</option>
                      <option>Avançado</option>
                    </select>
                    <div className="btn-editar-tech">
                      <button className="editar-btn">Salvar alterações</button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          excluirTech(idProduct);
                          setDetalhes(false);
                        }}
                        className="excluir-btn"
                        type="submit"
                      >
                        excluir
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Modal>
          )}

          <div className="card-de-tech">
            <div className="body-tech">
              {lista.map((elem) => {
                return (
                  <button
                    onClick={() => {
                      setIdProduct(elem.id);
                      detalhesModal();
                    }}
                    className="btn-tech-list"
                  >
                    <div className="card-tech">
                      <p className="title-do-btn">{elem.title}</p>
                      <p className="status-do-btn">{elem.status}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
export default Dashboard;
