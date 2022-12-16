import { parseCookies } from 'nookies';

const validateAuth = async (ctx: any): Promise<boolean> => {
  const { ["restaurantApp.token"]: token } = parseCookies(ctx);

  if (!token) {
    return false
  }

  return true
}

export default validateAuth

