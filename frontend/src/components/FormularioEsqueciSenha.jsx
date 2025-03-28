import React from "react";
import { Link } from "react-router-dom";

const FormularioEsqueciSenha = () => {
  return (
    <div class="min-h-screen flex items-center justify-center">
      <div class="bg-azul-paleta shadow-md rounded-lg px-6 py-8 max-w-sm w-full">
        <h1 class="text-xl font-bold text-center mb-4 text-gray-200">
          Recuperar Senha
        </h1>
        <p class="text-center text-gray-400 mb-6">
          Digite seu e-mail abaixo para receber um link para redefinir sua
          senha.
        </p>
        <form id="password-recovery-form">
          <div class="mb-4">
            <label
              for="email"
              class="block text-sm font-medium text-gray-300 mb-2"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-verde-paleta sm:text-sm"
              placeholder="lyoto.machida@example.com"
              required
            ></input>
          </div>

          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-verde-paleta hover:bg-verde-escuro-paleta duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-verde-paleta"
          >
            Enviar Link de Redefinição
          </button>

          <p
            id="confirmation-message"
            class="hidden mt-4 text-center text-green-500"
          >
            O e-mail de recuperação foi enviado
          </p>
        </form>
        <p class="mt-4 text-center text-gray-400">
          Lembrou sua senha?{" "}
          <Link
            to="/entrar"
            class="text-verde-paleta hover:text-verde-escuro-paleta"
          >
            Voltar para Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormularioEsqueciSenha;
