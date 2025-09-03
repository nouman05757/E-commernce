import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcar-next" });

//inngest function to save the user database
export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-form-clerk'
    },
    {
        event:'clerk/user.created'
    },
    async ({event}) => {
        const { id, email_addresses, first_name, last_name,image_url } = event.data;
        const userData = {
            id: id,
            email: email_addresses[0].email_addresses,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url
        }
        await connectDB()
        await User.create(userData)
        // Your sync logic here
    }
)
// inngest function to update data in database
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-form-clerk'
    },
    {
        event: 'clerk/user.updated'
    },
    async ({ event }) => {
        const { id, email_addresses, first_name, last_name, image_url } = event.data;
        const userData = {
            id: id,
            email: email_addresses[0].email_addresses,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id, userData)
        // Your sync logic here
    }
)
///inngest  function to delete the user in database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-form-clerk'
    },
    {
        event: 'clerk/user.deleted'
    },
    async ({ event }) => {
        const { id } = event.data;
        await connectDB()
        await User.findByIdAndDelete(id)
        // Your sync logic here
    }
)
