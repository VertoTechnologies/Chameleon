import dbConnect from '../../middleware/mongodb';
import User from '../../models/user';
import Friendship from '@/models/friendship';

export default async function getUsers(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const userString = req.query.user;
    if (!userString) {
        return res.status(400).json({ message: 'User is required' });
    }

    let user;
    try {
        user = JSON.parse(userString);
        console.log(user)
    } catch (error) {
        return res.status(400).json({ message: 'Invalid user format' });
    }

    try {
        await dbConnect();
        console.log(user.userId)
        
        const friendships = await Friendship.find({
            $or: [{ requester: user.userId }, { recipient: user.userId }],
            status: 'accepted'
        });

        const friendIds = friendships.map(friendship => 
            friendship.requester.toString() === user.userId ? friendship.recipient : friendship.requester
          );

        
        const first3users = await User.find({
            $and: [
                { userId: { $nin: friendIds } },
                { nativeLanguage: { $in: user.learningLanguagess } },
                { learningLanguagess: user.nativeLanguage },
                { fluentLanguagess: { $in: user.fluentLanguagess } },
                { userInterests: { $in: user.userInterests } }
            ]
        }).select('-password').limit(3);

        const next3users = await User.find({
            $and: [
                { userId: { $nin: friendIds } },
                {
                    $or: [
                        { nativeLanguage: { $in: user.learningLanguagess } },
                        { learningLanguagess: user.nativeLanguage }
                    ]
                },
                { fluentLanguagess: { $in: user.fluentLanguagess } },
                { userInterests: { $in: user.userInterests } }
            ]
        }).select('-password').limit(3);

        const last3users = await User.find({
            $and: [
                { userId: { $nin: friendIds } },
                {
                    $or: [
                        { nativeLanguage: { $in: user.learningLanguagess } },
                        { learningLanguagess: user.nativeLanguage }
                    ]
                },
                { fluentLanguagess: { $in: user.fluentLanguagess } }
            ]
        }).select('-password').limit(3);

        const combinedUsers = [...first3users, ...next3users, ...last3users];
        const users = Array.from(new Set(combinedUsers.map(user => user._id.toString())))
            .map(id => combinedUsers.find(user => user._id.toString() === id));

        
        
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}
// {
//     $or: [
        
//     ]
// },
