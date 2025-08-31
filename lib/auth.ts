// better-auth
import { betterAuth } from "better-auth";

// adaptadores do de conexão do banco de dados:
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db";

// plugins:
import { twoFactor } from "better-auth/plugins";
import { sendVerificationEmail } from "@/lib/actions/send-verification-email";
import { passkey } from "better-auth/plugins/passkey";

export const auth = betterAuth({
  // conexão do bando de dados:
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  // plugins:
  plugins: [
     passkey({
      rpID: "palim.com.br",
      rpName: "Palim",
      origin: "https:/palim.com.br",
      authenticatorSelection: {
        authenticatorAttachment: "cross-platform",
        residentKey: "preferred",
        userVerification: "preferred"
      }
     }),
     twoFactor() 
  ],

  // tipos de autenticação possíveis:
  emailAndPassword: {
    // com credencias (e-mail e senha)
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail({
        name: user.name,
        email: user.email,
        verifyUrl: url,
      });
    },
    sendOnSignUp: true,
  },
  socialProviders: {
    // login com o github:
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    // login com o google:
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});