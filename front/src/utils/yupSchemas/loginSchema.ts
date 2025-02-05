import * as Yup from 'yup';

export default Yup.object().shape({
    email: Yup.string().email('Введите email').required('Обязательное поле'),
    password: Yup.string().required('Введите пароль'),
});