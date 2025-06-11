
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createNewUser, getExistingUser } from "./lib/api"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  callbacks: {

    async signIn({ profile }) {
      

      try {
      
        const email = profile?.email;
        const first_name = profile?.name?.split(" ")[0];
        // const first_name = profile?.given_name
        const last_name = profile?.name?.split(" ")[1];
        // const last_name = profile?.family_name
        const username = profile?.email?.split("@")[0];
        const profile_picture_url = profile?.picture;

        const userObj = { email, first_name, last_name, username, profile_picture_url };

        console.log(profile);

         if (!email) {
          console.log("No email found in profile");
          return false;
        }

        const existingUser = await getExistingUser(email);

        if (!existingUser.exists) {
          // Only create if user does not exist
          await createNewUser(userObj);
        }

        return true;
      } catch (err) {
        console.error("signIn error:", err);
        return false;
      }
    }

  },
})