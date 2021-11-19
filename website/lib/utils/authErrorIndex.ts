const authErrorIndex: { [key: string]: string } = {
  'password-not-long-enough': 'Password must be at least 8 caracters long.',
  'passwords-do-not-match': 'Passwords do not match.',
  'user-does-not-exist': 'User doesn\'t exist.',
  'wrong-provider': 'This user account is linked to Discord or Google.',
  'wrong-password': 'Wrong password.',
  'email-already-used': 'Email is already used.',
  'name-already-used': 'Name is already used.',
};

export default authErrorIndex;
