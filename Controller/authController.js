const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User'); 
const nodemailer = require('nodemailer');
const crypto = require('crypto'); 
const path = require('path');
const secretKey = 'avst';

const fs = require('fs');

function generateVerificationCode() {
    return crypto.randomBytes(3).toString('hex'); 
}   
function createToken(username) {
    // Create a payload with the username
    const payload = { username };

    // Sign the token with the payload and secret key
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour

    return token;
}

async function registerUser(req, res) {
    const { email, password, firstname, lastname, telephone, website, company, vat, street_address, postcode, city, country } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateVerificationCode();

        const newUser = await User.create({
            email,
            password: hashedPassword,
            firstname,
            lastname,
            telephone,
            website,
            company,
            vat,
            street_address,
            postcode,
            city,
            country,
            verificationCode
        });


        await sendVerificationEmail(email, verificationCode,lastname);
        
        res.status(201).json({ message: 'User registered successfully. Please check your email for the verification code.', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}   
const renderTemplate = (template, variables) => {
    let renderedTemplate = template;
    for (const key in variables) {
        const value = variables[key];
        const regex = new RegExp(`{{${key}}}`, 'g');
        renderedTemplate = renderedTemplate.replace(regex, value);
    }
    return renderedTemplate;
};
async function sendVerificationEmail(email, verificationCode,lastname) {
    const token = createToken(lastname)

    const verificationUrl = `http://localhost:3001/verify?token=${token}`;

    const emailTemplate = fs.readFileSync(path.join(__dirname, 'emailTemplate.html'), 'utf-8');
    

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', 
        port: 465, 
        secure: true, 
        auth: {
            user: 'wassimna68@gmail.com',
            pass: 'blavsuxydmqtqtjc' 
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    
    const mailOptions = {
        from: 'wassimna68@gmail.com',
        to: email,
        subject: 'Email Verification ',
        html: renderTemplate(emailTemplate, { verificationCode: verificationCode ,verificationLink:verificationUrl})
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}
async function sendconfirmationEmail(email) {


    const emailTemplate = fs.readFileSync(path.join(__dirname, 'confirmationEmailTemplate.html'), 'utf-8');
    

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', 
        port: 465, 
        secure: true, 
        auth: {
            user: 'wassimna68@gmail.com',
            pass: 'blavsuxydmqtqtjc' 
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    
    const mailOptions = {
        from: 'wassimna68@gmail.com',
        to: email,
        subject: 'Email Verification ',
        html: renderTemplate(emailTemplate)
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}


async function confirmMail(user) {


    const emailTemplate = fs.readFileSync(path.join(__dirname, 'confirm.html'), 'utf-8');
    

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', 
        port: 465, 
        secure: true, 
        auth: {
            user: 'wassimna68@gmail.com',
            pass: 'blavsuxydmqtqtjc' 
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    
    const mailOptions = {
        from: 'wassimna68@gmail.com',
        to: user.email,
        subject: 'Email Verification ',
        html: renderTemplate(emailTemplate,{firstame:user.firstname,username:user.lastname,email:user.email})
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('confirm email :', user.email);
    } catch (error) {
        console.error('Error sending confirm email:', error);
    }
}


async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in' });
        }
        if (!user.acceptRequest) {
            return res.status(403).json({ message: 'Your account request has not been accepted by the admin yet' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'test', { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function verifyEmail(req, res) {
    const token = req.params.token 
    const verificationCode  = req.body.verificationCode;
    try {
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded,verificationCode)

        const user = await User.findOne({ where: { lastname:decoded.username, verificationCode } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }
        user.isVerified = true;
        user.verificationCode = null; 
        await user.save();
        sendconfirmationEmail(user?.email)
        res.status(200).json({ message: 'Email verified successfully , Now admin Verified Your Account you Have request an Email' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

 const acceptAcountRequest = async (req , res )=> {
    const {id} = req.params ; 
    try {
     const user = await User.findOne({where: {id: id}}) ; 
     if(!user) 
        return res.status(404).json({ message: 'User not found' });
    confirmMail(user)
     user.acceptRequest = true ;
     await user.save() ;

     res.json({ message: 'User accepted'} ) ;
    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


const refuseUser = async (req , res) => {
    const {id} = req.params ;
    const user = await User.findOne({where : { id : id}}) ; 
    if(!user)
        return res.status(404).json({ message: 'User not found' });
    await user.destroy() ; 
    res.status(200).json({ message: 'User deleted' }) ;
}

module.exports = {
    registerUser,
    login,
    verifyEmail , 
    acceptAcountRequest,
    refuseUser,
};
