import styles from './Login.module.scss';
import Input from '../../components/Input/Input';
import MainButton from '../../components/MainButton/MainButton';

const Login = () => {
  const handleLoginClick = () => {
    alert('Log in clicked!');
  };

  return (
    <div>
      <img className="mainBottom" src="/assets/images/mainBottom.svg" alt="Main Bottom" />

      <img src="/assets/images/mainTop.svg" alt="Main Top" />
      <div className={styles.loginBottom}>
        <Input />
        <MainButton text="Log in" onClick={handleLoginClick} />
      </div>
    </div>
  );
};

export default Login;
