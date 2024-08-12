import dbConnect from '../../../middleware/mongodb';
import User from '../../../models/user';
import Friendship from '@/models/friendship';
import { languages } from "../../../constants/enums";
import { capitalize } from '@mui/material';

export default async function searchAndSuggestUsers(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    const { userId } = req.query;
    const { input, option, currentPage } = req.body;
    const cp = Number(currentPage);
    const ITEMS_PER_PAGE = 4;
    const skip = (cp - 1) * ITEMS_PER_PAGE;

    if (!userId) {
        return res.status(400).json({ message: 'User data is required' });
    }

    try {
        await dbConnect();

        const user = await User.findOne({ userId }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Build the query object based on the options selected
        const query = {
            userId: { $nin: [user.userId] }, // Exclude the current user
        };

        function capitalizeFirstLetter(input) {
            if (!input) return '';
            return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        }

        const checker = languages.includes(capitalizeFirstLetter(input))
        
        if(!checker){
            query.name = { $regex: input, $options: 'i' };
        }
        else{
            if (option.includes('Native Language')) {
                query.nativeLanguage = { $regex: input, $options: 'i' };
            }
            if (option.includes('Learning Language')) {
                query.learningLanguagess = { $regex: input, $options: 'i' };
            }
            if (option.includes('Fluent Language')) {
                query.fluentLanguagess = { $regex: input, $options: 'i' };
            }
        }

        // if (option.length === 1 && option.includes('Name')) {
        //     query.name = { $regex: input, $options: 'i' };
        // } else {
        //     // Handle other options or multiple options
        //     if (option.includes('Native Language')) {
        //         query.nativeLanguage = { $regex: input, $options: 'i' };
        //     }
        //     if (option.includes('Learning Language')) {
        //         query.learningLanguagess = { $regex: input, $options: 'i' };
        //     }
        //     if (option.includes('Fluent Language')) {
        //         query.fluentLanguagess = { $regex: input, $options: 'i' };
        //     }
        // }

        // Execute the query
        const users = await User.find(query)
            .select('-password')
            .skip(skip)
            .limit(ITEMS_PER_PAGE);

        const totalCount = await User.countDocuments(query);

        res.status(200).json({ users, totalCount });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}
