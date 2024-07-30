import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Icebreaker from '../../models/icebreaker';
import { icebreakersv } from '../../constants/enums'; // Import the icebreaker questions

const handler = async (req = NextApiRequest, res = NextApiResponse) => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    const { method } = req;
  
    switch (method) {
      case 'GET':
        try {
          const { userId, friendId } = req.query;
          console.log(`userId: ${userId}, friendId: ${friendId}`);
          const chatId = [userId, friendId].sort().join('_');
          console.log(`chatId: ${chatId}`);
          
          let icebreaker = await Icebreaker.findOne({ chatId });
          console.log(`Icebreaker found: ${icebreaker}`);
          
          if (!icebreaker) {
            // Create a new icebreaker if not found
            const randomIndex = Math.floor(Math.random() * icebreakersv.length);
            const question = icebreakersv[randomIndex];
            console.log(`New Icebreaker question: ${question}`);
            
            icebreaker = new Icebreaker({
              chatId,
              question,
            });
            await icebreaker.save();
          }
  
          res.status(200).json(icebreaker);
        } catch (error) {
          console.error('Server error:', error);
          res.status(500).json({ message: 'Server error', error });
        }
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  };
  
  export default handler;
  