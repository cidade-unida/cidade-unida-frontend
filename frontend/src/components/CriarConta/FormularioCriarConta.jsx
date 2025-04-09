import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

export default function CriarConta() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "nome":
        if (value.length < 3) {
          error = "O nome deve ter pelo menos 3 caracteres.";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "O email deve estar no formato correto.";
        }
        break;
      case "telefone":
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        if (!telefoneRegex.test(value)) {
          error = "O telefone deve estar no formato (11) 99999-9999.";
        }
        break;
      case "senha":
        const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        if (!senhaForteRegex.test(value)) {
          error =
            "A senha deve ter pelo menos 6 caracteres, incluindo letras maiúsculas, minúsculas e números.";
        }
        break;
      case "confirmarSenha":
        if (value !== form.senha) {
          error = "As senhas não coincidem.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validação em tempo real
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifique se há erros antes de enviar
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, form.email, form.senha);
      navigate("/entrar");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "O email já está em uso.",
        }));
      } else if (err.code === "auth/weak-password") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          senha: "A senha deve ter pelo menos 6 caracteres.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          geral: "Erro ao cadastrar: " + err.message,
        }));
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-azul-paleta shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-200">
          Bem-vindo ao Cidade Unida!
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Preencha o formulário abaixo para criar sua conta.
        </p>

        {errors.geral && <p className="text-red-500 mb-4">{errors.geral}</p>}

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
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-verde-paleta placeholder-gray-400 focus:border-verde-paleta"
                placeholder={placeholder}
                required
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-verde-paleta hover:bg-verde-escuro-paleta duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-verde-paleta"
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
