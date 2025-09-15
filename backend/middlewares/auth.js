import jwt from 'jsonwebtoken';



// const signup = async (req, res) => {
//     const { username, password } = req.body;
//     const existingUser = await User.findOne({ username });
//     if(existingUser) {
//         return res.json({message:"User already exists"})
//     }
//     const user = new User.create({ username, password });
//     await user.save();
//     res.status(201).json({ message: "User created successfully" });
// }

export const login = async (req, res) => {
    const { username, password } = req.body;
    if(username == "admin" && password == "admin123"){
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        return res.json({ token });
    } else {
        return res.status(401).json({ message: "Invalid Credentials" });
    }
}

export const authenticate = async(req, res, next) => {
    console.log(req.headers); 
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) return res.status(401).json({ message: "Access Denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Invalid Token" });
        req.user = user;
        next();
    });
}
