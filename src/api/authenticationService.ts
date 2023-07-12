import app from '../../realmConfig';

export const login = async (email: string, password: string) => {
  const credentials = Realm.Credentials.emailPassword(
    email,
    password
  );
  const user = await app.logIn(credentials)
    .then(user => {
      return {email: email, id: user.id}
    })
    .catch(error => {
      // Error occurred during login
      console.error('Error logging in:', error);
    });

  return user
}
