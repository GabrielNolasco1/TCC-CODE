import nodemailer from 'nodemailer';
import { IMailProvider, IMessage } from "@/application/providers/IMailProvider";
import { getAuthGmail } from "./google-auth.config"; // Importação local, muito mais limpa!

export class NodemailerMailProvider implements IMailProvider {
  async sendMail({ to, subject, body }: IMessage): Promise<void> {
    const auth = await getAuthGmail();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth,
    } as any);

    await transporter.sendMail({
      from: `Seu Sistema <${process.env.GMAIL}>`,
      to,
      subject,
      html: body,
    });
  }
}