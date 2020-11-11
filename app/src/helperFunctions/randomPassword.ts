/*
  Generates a random password with 18 characters for users who signup with oauth 
*/

const randomPassword = (): string => {
  const getRandomSpecialChar = (): string => {
    const code: number = Math.round(Math.random() * (38 - 37) + 37);
    return String.fromCharCode(code);
  }
  
  const getRandomDigit = (): string => {
    const code: number = Math.round(Math.random() * (57 - 48) + 48);
    return String.fromCharCode(code);
  }
  
  const getRandomLetter = (): string => {
    const code: number = Math.round(Math.random() * (90 - 65) + 65);
    return String.fromCharCode(code);
  }

  let password: string = '';

  for (let i = 0; i < 6; i += 1) {
    password += getRandomLetter() + getRandomDigit() + getRandomSpecialChar(); 
  }
  
  return password;
}

export default randomPassword;