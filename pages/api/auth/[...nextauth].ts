import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github';
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";

declare module "next-auth" {
    interface Session {
      accessToken?: string;
    }
    interface User {
        id?: string
        _id: string
    }
};  

export default NextAuth({    
    providers: [  
        

        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'corre@google.com'},
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'},
            },
            async authorize(credentials) {
                console.log({credentials});
                // TODO: validar contra base de datos

                // return { name: 'Juan', correo: 'juan@google.com', role: 'admin'};
                return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
            }
        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],

    // Custom pages
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
    },
    jwt: {
        // deprecated
    },

    session: {
        maxAge: 2592000, /// 30d
        strategy: 'jwt',
        updateAge: 86400, // cada dia
    },

    // Callbacks
    callbacks: {
        async jwt({ token, account, user}) {

            if (account) {
                token.accessToken = account.access_token;

                switch(account.type) {
                    case 'oauth':
                        // TODO Crear usuario o verificar si existe en mi DB
                        token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
                    break;

                    case 'credentials':
                        token.user = user;
                    break;
                }
            }
            return token;
        },
        async session({ session, token, user }) {                 
            // console.log(({ session, token, user}));
            session.accessToken = token.accessToken as any;
            session.user = token.user as any;
            return session;
        }
    }
});