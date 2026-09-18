import {Alert, Button, CircularProgress, Box, Container, Stack, TextField, Typography} from '@mui/material';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

function Form() {
  // Стан успішної реєстрації
  const [isSuccess, setIsSuccess] = useState(false);

  // Стан завантаження
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form
  const {
    register, // Реєструє поля форми
    handleSubmit, // Перевіряє форму перед відправкою
    formState: { errors } // Об'єкт з помилками валідації
  } = useForm();

  // Виконується після успішної валідації форми
  const onSubmit = (data) => {
    console.log(data);

    // Вмикаємо завантаження
    setIsLoading(true);

    // Прибираємо попереднє повідомлення про успіх
    setIsSuccess(false);

    // Імітуємо запит на сервер протягом 2 секунд
    setTimeout(() => {
      // Вимикаємо завантаження
      setIsLoading(false);

      // Показуємо повідомлення про успішну реєстрацію
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
     <Box
  component="form"
  onSubmit={handleSubmit(onSubmit)}
  sx={{
  width: '100%',
  maxWidth: 400
}}
  
>

        <Stack spacing={2}>
          {/* Заголовок форми */}
          <Typography variant="h5">
            Реєстрація
          </Typography>

          {/* Поле Name */}
          <TextField
            variant="outlined"
            type="text"
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', {
              required: "Ім'я обов'язкове",
              minLength: {
                value: 2,
                message: "Ім'я повинно містити щонайменше 2 символи"
              }
            })}
          />

          {/* Поле Email */}
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              required: "Email обов'язковий",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Введіть коректний email'
              }
            })}
          />

          {/* Поле Password */}
          <TextField
            variant="outlined"
            type="password"
            label="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', {
              required: "Пароль обов'язковий",
              minLength: {
                value: 8,
                message: 'Пароль повинен містити щонайменше 8 символів'
              }
            })}
          />

          {/* Показуємо коло під час завантаження */}
          {isLoading && <CircularProgress />}

          {/* Показуємо повідомлення після завершення завантаження */}
          {isSuccess && (
            <Alert severity="success">
              Реєстрація успішна
            </Alert>
          )}

          {/* Кнопка відправки форми */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              padding: 2,
              '&:hover': {
                backgroundColor: 'blue'
              }
            }}
          >
            Увійти
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default Form;