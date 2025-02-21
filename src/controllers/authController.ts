import { Request, Response } from "express";
import User from '../db/models/user';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
    try {
      const { name, email, phone, password } = req.body;
      if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: 'Campos incompletos.' });
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'El correo ya está registrado.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword, 
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(201).json({
        message: 'Usuario registrado correctamente.',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      return res.status(500).json({ message: 'Error al registrar el usuario.' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son obligatorios.' });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        return res.status(404).json({ message: 'Credenciales inválidas.' });
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }


      return res.status(200).json({
        message: 'Inicio de sesión exitoso.',
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
        },
      });
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      res.status(500).json({ message: 'Error al iniciar sesión.' });
    }
  }
    
