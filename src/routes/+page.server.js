// src/routes/+page.server.js
import nodemailer from 'nodemailer';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const MAX = { NAME: 100, EMAIL: 254, MSG: 2000 };

function hasCtlChars(s) {
  return /[\r\n]/.test(s); // durcit contre CRLF injection
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const website = (data.get('website') || '').toString();
    if (website) {
      return { ok: true };
    }

    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      return fail(400, { error: 'Merci de compléter tous les champs.' });
    }
    if (name.length > MAX.NAME || email.length > MAX.EMAIL || message.length > MAX.MSG) {
      return fail(400, { error: 'Texte trop long. Merci de raccourcir votre message.' });
    }
    if (hasCtlChars(email) || hasCtlChars(name)) {
      return fail(400, { error: "Caractères invalides détectés." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail(400, { error: 'Adresse email invalide.' });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = env;
    const hasSMTP = SMTP_HOST && SMTP_USER && SMTP_PASS;
    const DEV_LOG_CONTACT = env.DEV_LOG_CONTACT === 'true';

    if (!hasSMTP) {
      if (DEV_LOG_CONTACT) {
        console.log('[Leafie contact] DEMO MODE:', { name, email, message });
      }
      return { ok: true };
    }

    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT ?? 587),
        secure: (SMTP_SECURE ?? 'false') === 'true' || Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
      });

      await transporter.verify();

      await transporter.sendMail({
        from: MAIL_FROM || SMTP_USER,
        to: MAIL_TO || SMTP_USER,
        replyTo: { name, address: email },
        subject: `Leafie — Nouveau message de ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\n\n${message}`
      });

      return { ok: true };
    } catch (err) {
      console.error('SMTP error:', err);
      return fail(500, { error: "Impossible d'envoyer le message pour l'instant." });
    }
  }
};
