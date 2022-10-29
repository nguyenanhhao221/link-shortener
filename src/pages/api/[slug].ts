import { NextApiHandler } from 'next';

import { prisma } from '../../db/client';

const handler: NextApiHandler = async (req, res) => {
    console.log('🚀 ~ consthandler:NextApiHandler= ~ req', req);
    const { slug } = req.query;
    console.log('🚀 ~ consthandler:NextApiHandler= ~ slug', slug);

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

    return res.json(data);
};

export default handler;
