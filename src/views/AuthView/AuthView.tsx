import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import Alert from '../../components/Alert/Alert';
import './styles.css';

function AuthView() {
  return (
    <div>
      <div className="relative">
        <Alert />
      </div>
      <AuthForm />
    </div>
  );
}

export default AuthView;
