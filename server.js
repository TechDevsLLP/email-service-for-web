const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());


app.post("/send-email", async (req, res) => {
	const { name, email, subject, message } = req.body;

	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		const mailOptions = {
			from: process.env.SMTP_USER,
			to: ["techdevsinc@gmail.com", "ops@axploreDMC.com"],
			subject: `Contact Subject: ${subject}`,
			html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
		};

		const data = await transporter.sendMail(mailOptions);
		console.log(data)
		res.json({ success: true, message: "Email sent!" });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});


app.post("/send-email-nom-nom", async (req, res) => {
	const { name, email, phone, eventType, date, message } = req.body;

	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST_GMAIL,
			port: Number(process.env.SMTP_PORT_GMAIL),
			secure: true,
			auth: {
				user: process.env.SMTP_USER_NOMNOM,
				pass: process.env.SMTP_PASS_NOMNOM,
			},
		});

		const mailOptions = {
			from: process.env.SMTP_USER_NOMNOM,
			to: ["techdevsinc@gmail.com", "leigh@nomnom.ae"],
			subject: `Contact Details`,
			html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
		};

		const data = await transporter.sendMail(mailOptions);
		console.log(data)
		res.json({ success: true, message: "Email sent!" });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

app.post("/subscribe-email", async (req, res) => {
	const { email } = req.body;

	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		const mailOptions = {
			from: process.env.SMTP_USER,
			to: ["techdevsinc@gmail.com", "ops@axploreDMC.com"],
			subject: `New Email Subscription`,
			html: `
        <p><strong>Email:</strong> ${email}</p>
      `,
		};

		const data = await transporter.sendMail(mailOptions);
		console.log(data)
		res.json({ success: true, message: "Email sent!" });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
