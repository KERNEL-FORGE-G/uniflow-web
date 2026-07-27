import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <img src="/assets/UniFlow_Logo_Principal.png" alt="UniFlow" className="mx-auto h-12 w-auto" />
          <h1 className="mt-4 text-2xl font-bold">Connexion</h1>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" className="mt-1 w-full rounded-lg border p-2.5" />
          </div>
          <div>
            <label className="block text-sm font-medium">Mot de passe</label>
            <input type="password" className="mt-1 w-full rounded-lg border p-2.5" />
          </div>
          <button className="w-full rounded-lg bg-primary py-2.5 text-white font-semibold">Se connecter</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Pas encore de compte ? <Link to="/register" className="text-primary">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
