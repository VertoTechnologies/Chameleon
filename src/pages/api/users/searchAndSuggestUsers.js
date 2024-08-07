import dbConnect from '../../../middleware/mongodb';
import User from '../../../models/user';
import Friendship from '@/models/friendship';

export default async function searchAndSuggestUsers(req, res) {
    let combinedUsers;
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
  
    let { userId } = req.query
    const { input, option, currentPage } = req.body; // Extract data from the request body
    let cp = Number(currentPage)
    let ITEMS_PER_PAGE = 4
    const skip = (cp - 1) * ITEMS_PER_PAGE;
    if (!userId) {
        return res.status(400).json({ message: 'User data is required' });
    }
    try {
        await dbConnect();
        const user = await User.findOne({userId:userId}).select('-password');

        let searches, totalCount;

            if (option === 'Name') {
                searches = await User.find({
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
            }else if (option === 'Native Language') {
                searches = await User.find({
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
            } else if (option === 'Learning Language') {
                searches = await User.find({
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
            } else if (option === 'Fluent Language') {
                searches = await User.find({
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
            combinedUsers = searches;
   
        const users = Array.from(new Set(combinedUsers.map(user => user._id.toString())))
            .map(id => combinedUsers.find(user => user._id.toString() === id));

        res.status(200).json({ users, totalCount });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}