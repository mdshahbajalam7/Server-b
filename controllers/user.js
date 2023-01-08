import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ Message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ Message: "Invalid Credentials.!" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "textjwt",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ Message: "Somethings went wrong.!" });
  }
};

export const signup = async (req, res) => {
  const { email, password, FirstName, LastName, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ Message: "User Already exists.!" });

    if (password !== confirmPassword)
      return res.status(400).json({ Message: "Password don't Match.!" });

    const hashedpassword = await bcrypt.hash(password,12)

    
    const result = await User.create({email,password:hashedpassword,name:`${FirstName} ${LastName}`})

    
    const token = jwt.sign(
      { email: result.email, id: result._id },
      "textjwt",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });


  
  } catch (error) {
    res.status(500).json({ Message: "Somethings went wrong" });
  }
};
