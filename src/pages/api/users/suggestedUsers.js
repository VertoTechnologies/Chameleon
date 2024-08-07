import dbConnect from '../../../middleware/mongodb';
import User from '../../../models/user';
import Friendship from '@/models/friendship';

export default async function suggestedUsers(req, res) {
    let combinedUsers;
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
  
    let { userId } = req.query
    if (!userId) {
        return res.status(400).json({ message: 'User data is required' });
    }
    try {
        await dbConnect();
        const user = await User.findOne({userId:userId}).select('-password');

        const friendships = await Friendship.find({
            $or: [{ requester: user.userId }, { recipient: user.userId }]
        });

        const friendIds = friendships.map(friendship =>
            friendship.requester.toString() === user.userId ? friendship.recipient : friendship.requester
        );
        let first3users, next3users, last3users;

        
            if (user.purpose === 'To Teach') {
                first3users = await User.find({
                    $and: [
                        { userId: { $nin: friendIds } },
                        { userId: { $nin: user.userId } },
                        { $or: [{ nativeLanguage: { $in: user.learningLanguagess } }, { fluentLanguagess: { $in: user.learningLanguagess } }] },
                        { fluentLanguagess: { $in: user.fluentLanguagess } },
                        { userInterests: { $in: user.userInterests } }
                    ]
                }).select('-password')

                next3users = await User.find({
                    $and: [
                        { userId: { $nin: friendIds } },
                        { userId: { $nin: user.userId } },
                        { $or: [{ nativeLanguage: { $in: user.learningLanguagess } }, { fluentLanguagess: { $in: user.learningLanguagess } }] },
                        { userInterests: { $in: user.userInterests } }
                    ]
                }).select('-password')

                last3users = await User.find({
                    $and: [
                        { userId: { $nin: friendIds } },
                        { userId: { $nin: user.userId } },
                        { $or: [{ nativeLanguage: { $in: user.learningLanguagess } }, { fluentLanguagess: { $in: user.learningLanguagess } }] },
                        { fluentLanguagess: { $in: user.fluentLanguagess } }
                    ]
                }).select('-password')
            } else {
                first3users = await User.find({
                    $and: [
                        { userId: { $nin: friendIds } },
                        { userId: { $nin: user.userId } },
                        { nativeLanguage: { $in: user.learningLanguagess } },
                        { learningLanguagess: user.nativeLanguage },
                        { fluentLanguagess: { $in: user.fluentLanguagess } },
                        { userInterests: { $in: user.userInterests } }
                    ]
                }).select('-password')

                next3users = await User.find({
                    $and: [
                        { userId: { $nin: friendIds } },
                        { userId: { $nin: user.userId } },
                        {
                            $or: [
                                { nativeLanguage: { $in: user.learningLanguagess } },
                                { learningLanguagess: user.nativeLanguage }
                            ]
                        },
                        { fluentLanguagess: { $in: user.fluentLanguagess } },
                        { userInterests: { $in: user.userInterests } }
                    ]
                }).select('-password')

                last3users = await User.find({
                    $and: [
                        { userId: { $nin: friendIds } },
                        { userId: { $nin: user.userId } },
                        {
                            $or: [
                                { nativeLanguage: { $in: user.learningLanguagess } },
                                { learningLanguagess: user.nativeLanguage }
                            ]
                        },
                        { fluentLanguagess: { $in: user.fluentLanguagess } }
                    ]
                }).select('-password')
            }
            combinedUsers = [...first3users, ...next3users, ...last3users];
   
        const users = Array.from(new Set(combinedUsers.map(user => user._id.toString())))
            .map(id => combinedUsers.find(user => user._id.toString() === id));

        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}