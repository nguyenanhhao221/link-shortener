import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../db/client';

const handler: NextApiHandler = async (req, res) => {
  const { slug } = req.query;
  if (!slug || typeof slug !== 'string') {
    return res.status(404).json({ message: 'Please use link with slug' });
  }
  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  if (!data) return res.status(404).json({ message: 'slug not found' });

  res.redirect(data.url);
};

export default handler;
