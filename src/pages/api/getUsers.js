import dbConnect from '../../middleware/mongodb';
import User from '../../models/user';

export default async function getUsers(req,res){
    if(req.method !== 'GET'){
        return res.status(405).json({message: 'method not allowed'})
    }
    try{ 
        await dbConnect()
        const users = await User.find().select('-password')

        res.status(200).json({users})
    }catch(error){
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}