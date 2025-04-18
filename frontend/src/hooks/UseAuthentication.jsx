import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function CriarConta() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.senha !== form.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.senha);
      navigate("/entrar");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("O email já está em uso.");
      } else if (err.code === "auth/weak-password") {
        setError("A senha deve ter pelo menos 6 caracteres.");
      } else {
        setError("Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-azul-paleta shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-200">
          Bem-vindo ao Cidade Unida!
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Preencha o formulário abaixo para criar sua conta.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {[
            {
              label: "Nome Completo",
              name: "nome",
              type: "text",
              placeholder: "Seu Nome Completo",
            },
            {
              label: "E-mail",
              name: "email",
              type: "email",
              placeholder: "lyoto.machida@email.com",
            },
            {
              label: "Telefone",
              name: "telefone",
              type: "tel",
              placeholder: "(11) 99999-9999",
            },
            {
              label: "Senha",
              name: "senha",
              type: "password",
              placeholder: "Digite sua senha",
            },
            {
              label: "Confirmar Senha",
              name: "confirmarSenha",
              type: "password",
              placeholder: "Confirme sua senha",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div className="mb-4" key={name}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={placeholder}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-verde-paleta hover:bg-verde-escuro-paleta duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Criar Conta
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Já possui uma conta?{" "}
          <Link
            to="/entrar"
            className="text-verde-paleta hover:text-verde-escuro-paleta duration-500"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
    