import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id, ...attributes } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log({ attributes });


  // if (eventType === "user.created") {

  //   console.log("LOG✨✨✨✨", eventType)
  //   console.log("LOG✨✨✨✨", payload.data.email_addresses)

  //   const user = await db.insert(users)
  //   .values({
  //           external_id: id!,
  //           first_name: evt.data.first_name,
  //           last_name: evt.data.last_name,
  //           email: evt.data.primary_email_address_id,
  //           photo_url: evt.data.image_url,
  //           attributes: attributes,
  //         })
            
            
  // }

  if (eventType === "user.created") {
    // console.log("user created by clerk");
    const alreadyExists = await db
      .select()
      .from(users)
      .where(eq(users.external_id, id!)) // Add the non-null assertion operator (!) to ensure that id is not undefined
      .get();

    console.log(alreadyExists);

    if (alreadyExists) return;

    const newUser = await db
      .insert(users)
      .values({
        external_id: id!,
        first_name: evt.data.first_name,
        last_name: evt.data.last_name,
        email: evt.data.primary_email_address_id,
        photo_url: evt.data.image_url,
        attributes: attributes,
      })
      .returning()
      .get();

    console.log({ newUser });
  }
  else if (eventType === "user.updated") {
    const undatedUser = await db
      .update(users)
      .set({
        external_id: id,
        first_name: evt.data.first_name,
        last_name: evt.data.last_name,
        email: evt.data.primary_email_address_id,
        photo_url: evt.data.image_url,
        attributes: attributes,
      })
      .where(eq(users.external_id, id!))
      .returning()
      .get();

    console.log({ undatedUser });
  }

  // console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
