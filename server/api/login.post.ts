import md5 from 'md5';

// Введенные данные добавляются в массив. Надо ли повторно добавлять, если введен тот же логин?
// Сделала проверку по active, потому что не совсем понимаю, как по заданию дальше происходит авторизация.

const data = [
  {
    name: 'David',
    surname: 'Jones',
    credentials: {
      username: 'david.jones@creds.com',
      passphrase: '52ccca432ab28afd90969084c061b23c',
    },
    active: true,
    created: '03.03.2025 10:00:21',
    _comment: "Пользователь David Jones с логином david.jones@creds.com и паролем '8u3&s-1uda'",
  },
  {
    name: 'Samantha',
    surname: 'Robertson',
    credentials: {
      username: 'sam.robertson@creds.com',
      passphrase: 'cefdd8f05b00320c8ff42f8734f96633',
    },
    active: true,
    created: '03.03.2025 10:28:13',
    _comment:
      "Пользователь Samantha Robertson с логином sam.robertson@creds.com и паролем '0k91sa639'",
  },
  {
    name: 'Nicholas',
    surname: 'Crew',
    credentials: {
      username: 'nic.crew@creds.com',
      passphrase: '23c2b519b1e2cd4bbaf5f68f58024785',
    },
    active: false,
    created: '01.03.2025 12:56:28',
    _comment: "Пользователь Nicholas Crew с логином nic.crew@creds.com и паролем '1atr48asf03'",
  },
];

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = data.find((user) => user.credentials.username === body.user.email && user.active);
  if (!user) {
    const newUser = {
      name: `Новый пользователь ${new Date().toLocaleString()}`,
      surname: '',
      credentials: {
        username: body.user.email,
        passphrase: md5(body.user.password),
      },
      active: false,
      created: new Date().toLocaleString(),
      _comment: `Новый пользователь с логином ${body.user.email} и паролем '${body.user.password}'`,
    };

    data.push(newUser);
    console.log('New data', data); //

    return {
      statusCode: 404,
      message: 'Введены неверные данные\n' + 'авторизации. Попробуйте ещё раз',
    };
  }

  const isPasswordValid = md5(body.user.password) === user.credentials.passphrase;

  if (!isPasswordValid) {
    return {
      statusCode: 401,
      message: 'Введены неверные данные\n' + 'авторизации. Попробуйте ещё раз',
    };
  }

  return {
    statusCode: 200,
    message: 'Успешная авторизация.',
    user: {
      name: user.name,
      surname: user.surname,
    },
  };
});
