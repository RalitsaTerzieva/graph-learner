import { redirectTo } from '@contentpi/lib'
import { ChangeEvent, FC, useState } from 'react'
import { StyledLogin } from './Login.styled'

interface IUser {
  id?: string;
  email: string;
  password: string;
  username?: string;
  role?: string;
  active?: boolean;
}

interface IProps {
  login(input: IUser): any;
  currentUrl: string;
}

const Login: FC<IProps> = ({ login, currentUrl }) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidLogin, setInvalidLogin] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (user: IUser): Promise<void> => {
    const response = await login(user);

    if (response.error) {
      setInvalidLogin(true);
      setErrorMessage(response.message);
    } else {
      redirectTo(currentUrl || '/');
    }
  };

  return (
    <StyledLogin>
      <div className="wrapper">
        {invalidLogin && <div className="alert">{errorMessage}</div>}
        <div className="form">
          <p>
            <input
              autoComplete="off"
              type="email"
              className="email"
              name="email"
              placeholder="Email"
              onChange={onChange}
              value={values.email}
            />
          </p>
          <p>
            <input
              autoComplete="off"
              type="password"
              className="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
              value={values.password}
            />
          </p>
          <div className="actions">
            <button name="login" onClick={() => handleSubmit(values)}>
              Login
            </button>
          </div>
        </div>
      </div>
    </StyledLogin>
  );
};

export default Login;
