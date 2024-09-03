import type { NextApiRequest, NextApiResponse } from 'next';
import { privy } from './privy';

export default async function authenticateUserMiddleWare(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let authHeader: string | null = null;
  if (req.headers.authorization) {
    // for NextApireq
    authHeader = req.headers.authorization || null;
  } else if (req.headers instanceof Headers) {
    // for Nextreq
    authHeader = req.headers.get('authorization');
  }
  const token = authHeader?.replace('Bearer ', '');

  if (token) {
    try {
      const verifiedClaims = await privy.verifyAuthToken(token);
      const user = await privy.getUser(verifiedClaims.userId);
      if (user.wallet?.address) return user;

      return res.status(401).json({ errorMsg: 'No user wallet found' });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ errorMsg: 'User verification failed' });
    }
  } else {
    return res.status(401).json({ errorMsg: 'No token found' });
  }
}
