import styles from './Login.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = () => {
    if (loginId.trim() === '') {
      setError('Please enter your ID.');
      return;
    }

    localStorage.setItem('loginId', loginId.trim());
    navigate('/main');
  };

  // 입력값 변경 핸들러
  const handleLoginIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value);
    setError('');
  };

  return (
    <div className={styles.loginContainer}>
      <img className="mainBottom" src="/assets/images/mainBottom.svg" alt="Main Bottom" />

      <img src="/assets/images/mainTop.svg" alt="Main Top" />
      <div className={styles.loginBottom}>
        <div className={styles.inputBox}>
          <input onChange={handleLoginIdChange} value={loginId} className={styles.input} type="text" placeholder="Enter your ID" />
          {/* 에러 메시지 표시 */}
          {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
        <MainButton voted={false} text="Log in" onClick={handleLoginClick} main={false} />
      </div>
    </div>
  );
};

export default Login;
