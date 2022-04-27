import "./style.css";
import logo from "../../assets/img/Logo.svg";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useHistory } from "react-router-dom";
import Api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormRegister() {
  /*   const formSchema = yup.object().shape({
    nome: yup.string.required("Campo obrigatório"),
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    senha: yup.string().min(3, "Minimo de 3").required("Campo obrigatório"),
    confirmarSenha: yup.string().required("Campo obrigatório"),
    modulo: yup.string().required("Selecione o módulo"),
  }); */
  const history = useHistory();
  const sucesso = () => {
    return toast.success("conta criada", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const formRegister = ({
    email,
    password,
    name,
    bio,
    contact,
    course_module,
  }) => {
    const register = { email, password, name, bio, contact, course_module };

    Api.post("/users", register)
      .then((_) => {
        sucesso();
        history.push("/");
      })
      .catch(() =>
        toast.error("Ops, algo deu errado ", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );
  };

  const {
    register,
    handleSubmit,
    /* formState: { errors }, */
  } = useForm(/* { resolver: yupResolver(formSchema) } */);

  return (
    <div className="Form-Register">
      <div className="header-register">
        <img className="register-logo" src={logo} />
        <button className="btn-voltar-register">
          <Link to="/">Voltar</Link>
        </button>
      </div>

      <form className="formRegister" onSubmit={handleSubmit(formRegister)}>
        <div className="header-register-criar">
          <h2>Crie sua conta</h2>
          <p>Rápido e grátis, vamos nessa</p>
        </div>
        <label className="RegisterLabel">Nome</label>
        <input
          className="RegisterInput"
          placeholder="Digite aqui seu nome"
          {...register("name")}
        />

        <label className="RegisterLabel">E-mail</label>
        <input
          className="RegisterInput"
          placeholder="Digite aqui seu email"
          {...register("email")}
        />

        <label className="RegisterLabel">Bio</label>
        <input
          className="RegisterInput"
          placeholder="Digite aqui sua bio"
          {...register("bio")}
        />

        <label className="RegisterLabel">Contato</label>
        <input
          className="RegisterInput"
          placeholder="Digite aqui seu contato"
          {...register("contact")}
        />

        <label className="RegisterLabel">Senha</label>
        <input
          className="RegisterInput"
          type="password"
          placeholder="Digite aqui sua senha"
          {...register("password")}
        />

        <label className="RegisterLabel">Confirmar sua senha</label>
        <input
          className="RegisterInput"
          type="password"
          placeholder="Digite aqui sua senha"
          {...register("confirmarPassword")}
        />

        <label className="RegisterLabel">Selecionar Módulo</label>
        <select className="RegisterInput" {...register("course_module")}>
          <option>Primeiro Módulo</option>
          <option>Segundo Módulo</option>
          <option>Terceiro Módulo</option>
          <option>Quarto Módulo</option>
          <option>Quinto Módulo</option>
          <option>Sexto Módulo</option>
        </select>

        <button className="RegisterBtn" type="submit">
          Entrar
        </button>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </form>
    </div>
  );
}
export default FormRegister;
