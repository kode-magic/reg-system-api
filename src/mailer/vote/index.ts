const nodemailer = require("nodemailer");
import { google } from 'googleapis';
const hbs = require("nodemailer-express-handlebars");

import { refresh, redirect, client, secret, type, service, user } from './config';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  client,
  secret,
  redirect
);

const handlebarOptions = {
  viewEngine: {
    partialsDir: __dirname,
    layoutsDir: __dirname,
    extname: ".hbs",
  },
  extName: ".hbs",
  viewPath: __dirname,
};

export const transportVoteCode = async (name: string, voteCode: string, email: string, link: string) => {

    oauth2Client.setCredentials({
      refresh_token: refresh
    });

    const accessToken = await oauth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
        service: service,
        auth: {
          type: type,
          user: user,
          clientId: client,
          clientSecret: secret,
          refreshToken: refresh,
          accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    transporter.use("compile", hbs(handlebarOptions));

    const context = {
      name,
      voteCode,
      link
    };

    let mailOptions = {
      from: `IPAM VOTING APP<${user}>`,
      to: email,
      replyTo: user,
      subject: "Unique Voting Code",
      template: "main",
      context: context
    };


    try {
      return transporter.sendMail(mailOptions)
        .then(info => {
            return `Email sent`;
        })
        .catch(error => {
            throw error;
        })
        .finally(() => {
            transporter.close();
        });
    } catch (error) {
      throw error;
    }
};