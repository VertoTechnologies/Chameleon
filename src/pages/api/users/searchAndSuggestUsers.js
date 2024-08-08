import dbConnect from '../../../middleware/mongodb';
import User from '../../../models/user';
import Friendship from '@/models/friendship';

export default async function searchAndSuggestUsers(req, res) {
    let combinedUsers;
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    let { userId } = req.query;
    const { input, option, currentPage } = req.body; // Extract data from the request body
    let cp = Number(currentPage);
    let ITEMS_PER_PAGE = 4;
    const skip = (cp - 1) * ITEMS_PER_PAGE;
    if (!userId) {
        return res.status(400).json({ message: 'User data is required' });
    }
    try {
        await dbConnect();
        const user = await User.findOne({ userId: userId }).select('-password');

        const friendships = await Friendship.find({
            $or: [{ requester: user.userId }, { recipient: user.userId }]
        });

        const friendIds = friendships.map(friendship =>
            friendship.requester.toString() === user.userId ? friendship.recipient : friendship.requester
        );
        let searches1 = [], searches2 = [], searches3 = [], totalCount = 0;

        if (option.includes('Name')) {
            searches1 = await User.find({
                $and: [
                    { userId: { $nin: [user.userId] } },
                    { name: { $regex: input, $options: 'i' } }
                ]
            }).select('-password').skip(skip).limit(ITEMS_PER_PAGE);
            totalCount = await User.countDocuments({
                $and: [
                    { userId: { $nin: [user.userId] } },
                    { name: { $regex: input, $options: 'i' } }
                ]
            });
        }
        if (option.includes('Native Language')) {
            searches1 = await User.find({
                $and: [
                    { userId: { $nin: [user.userId] } },
                    { nativeLanguage: input }
                ]
            }).select('-password').skip(skip).limit(ITEMS_PER_PAGE);
            totalCount = await User.countDocuments({
                $and: [
                    { userId: { $nin: [user.userId] } },
                    { nativeLanguage: input }
                ]
            });
        }
        if (option.includes('Learning Language')) {
            searches2 = await User.find({
                $and: [
                    { userId: { $nin: [user.userId] } },
                    { learningLanguagess: input }
                ]
            }).select('-password').skip(skip).limit(ITEMS_PER_PAGE);
            totalCount = await User.countDocuments({
                $and: [
                    { userId: { $nin: [user.userId] } },
                    { learningLanguagess: input }
                ]
            });
        }
        if (option.includes('Fluent Language')) {
            searches3 = await User.find({
                $and: [
                    { userId: { $nin: [user.userId] } },
                    { fluentLanguagess: input }
                ]
            }).select('-password').skip(skip).limit(ITEMS_PER_PAGE);
        
            totalCount = await User.countDocuments({
                $and: [
                    { userId: { $nin: [user.userId] } },
                    { fluentLanguagess: input }
                ]
            });
        }
        combinedUsers = [...searches1, ...searches2, ...searches3];
        const users = Array.from(new Set(combinedUsers.map(user => user._id.toString())))
            .map(id => combinedUsers.find(user => user._id.toString() === id));

        res.status(200).json({ users, totalCount });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}