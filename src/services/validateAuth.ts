import { parseCookies } from 'nookies';
import React from 'react'
import { getApiClient } from './getApiClient';

const validateAuth = async (ctx: any): Promise<boolean> => {
  const apiClient = getApiClient(ctx);
  const { ["restaurantApp.token"]: token } = parseCookies(ctx);

  if (!token) {
    return false
  }

  return true
}

export default validateAuth

