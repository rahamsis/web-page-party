import { getUser } from "@/app/lib/data";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

type User = {
    email?: string | null | undefined,
    name?: string | null | undefined,
}

const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                nombre: {},
                email: {}
            },
            authorize: async (credentials) => {
                const user = await getUser(credentials?.nombre as string, credentials?.email as string) as any;
                if (user) {
                    return user;
                }

                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // signIn: async ({ user, account, profile, email, credentials }) =>{
        //     console.log("signIn")
        //     return true;
        // },
        jwt: async ({ token, user }) => {
            if (user) {
                token.name = user.name;
                token.email = user.email
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                const user: User = {
                    name: token.name as string,
                    email: token.email as string
                }

                session.user = user;
            }
            return session;
        },
        // redirect: async ({ url, baseUrl}) =>{
        //     console.log("redirect")
        //     console.log(url, baseUrl)
        //     return baseUrl;
        // }
    },
}

export default authOptions;