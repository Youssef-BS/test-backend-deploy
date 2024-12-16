const { where } = require("sequelize");
const User = require("../Models/User");
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {

    try{
        const users = await User.findAll() ; 
        res.status(200).json(users) ;
    }catch(error){
        res.status(500).json({error: error.message})
    }

}


const createUser  = async (req , res) => {

    const { email, password, firstname, lastname, telephone, website, company, vat, street_address, postcode, city, country , isVerified , acceptRequest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
   const newUser =  await User.create({email ,
         password : hashedPassword ,
         firstname,
         lastname,
         telephone, 
         postcode ,  
         website, 
         company, 
         vat , 
         street_address , 
         city, 
         country ,
         isVerified ,
         acceptRequest 
        });

    res.status(201).json({ message: 'User registered successfully', user: newUser }); 
    
    }catch(error){
        res.status(500).json({error: error.message})
    }
}


const  deleteUser = async (req , res)=>{

    const idUser = req.params.userId ; 
    try{
    const user = await User.findOne({where : {id: idUser}})
    if(!user) 
       res.status(404).json({message: 'User not found'});
    await User.destroy({where : {id: idUser}}) ;
    res.status(200).json({message: 'User deleted successfully'});
    }catch(error){
        res.status(500).json({error: error.message})
    }

}

const updateUser = async (req, res) => {
    const idUser = req.params.userId;
    const { email, password, firstname, lastname, telephone, website, company, vat, street_address, postcode, city, country, isVerified, acceptRequest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.findOne({ where: { id: idUser } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update({
            email,
            password : hashedPassword,
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
            isVerified,
            acceptRequest
        });

        res.status(200).json({ message: 'User updated successfully', user: user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message });
    }
};


const getUser = async (req , res) => {
const idUser = req.params.userId ;
try {
const user = await User.findOne({where : {id: idUser}});
res.status(200).json(user);
}catch(error) {
    res.status(500).json({error: error.message})
}
} 

const changePassword = async (req, res) => {
    const idUser = req.params.userId;
    const { passwordCurrent, passwordNew } = req.body;
  
    try {
      const user = await User.findOne({ where: { id: idUser } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(passwordCurrent, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
  
      const hashedPassword = await bcrypt.hash(passwordNew, 10);
      await user.update({ password: hashedPassword });
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    getAllUsers , 
    createUser , 
    deleteUser , 
    updateUser , 
    getUser ,
    changePassword
}