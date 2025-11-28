import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'zyxcab101819.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `${process.env.SMTP_FROM_NAME || 'Employee Management'} <${process.env.SMTP_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

export const sendManagerWelcomeEmail = async (email, username, password, portalLink) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .credentials { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Employee Management System</h1>
        </div>
        <div class="content">
          <h2>Hello ${username},</h2>
          <p>Your manager account has been created successfully. Below are your login credentials:</p>
          
          <div class="credentials">
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>
          
          <p>Please keep these credentials secure and change your password after first login.</p>
          
          <a href="${portalLink}" class="button">Access Portal</a>
          
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    email,
    subject: 'Manager Account Created - Employee Management System',
    html,
  });
};

export const sendEmployeeWelcomeEmail = async (email, username, password, portalLink) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .credentials { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Employee Management System</h1>
        </div>
        <div class="content">
          <h2>Hello ${username},</h2>
          <p>Your employee account has been created successfully. Below are your login credentials:</p>
          
          <div class="credentials">
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>
          
          <p>Please keep these credentials secure and change your password after first login.</p>
          
          <a href="${portalLink}" class="button">Access Portal</a>
          
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    email,
    subject: 'Employee Account Created - Employee Management System',
    html,
  });
};

export const sendPasswordResetEmail = async (email, resetToken, role) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}&role=${role}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        .warning { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Hello,</h2>
          <p>You have requested to reset your password. Click the button below to reset it:</p>
          
          <a href="${resetUrl}" class="button">Reset Password</a>
          
          <div class="warning">
            <p><strong>Note:</strong> This link will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
          </div>
          
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
          
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    email,
    subject: 'Password Reset Request - Employee Management System',
    html,
  });
};

