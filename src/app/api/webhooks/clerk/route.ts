import { deleteUser, upsertUser } from '@/services/repositories/user';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
// Your webhook secret from Clerk Dashboard
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
export async function POST(request: Request) {
  try {
    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');
    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new NextResponse('Error occured -- no svix headers', {
        status: 400,
      });
    }
    // Get the body
    const payload = await request.json();
    const wh = new Webhook(WEBHOOK_SECRET || '');
    const evt = (await wh.verify(JSON.stringify(payload), {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })) as WebhookEvent;
    // Handle the webhook
    const eventType = evt.type;
    if (eventType === 'user.created' || eventType === 'user.updated') {
      await handleUserCreatedOrUpdated(evt.data);
    } else if (eventType === 'user.deleted') {
      await handleUserDeleted(evt.data);
    }
    return NextResponse.json({ message: 'Webhook processed' });
  } catch (error: unknown) {
    return new NextResponse(error instanceof Error ? error.message : 'Unknown error', {
      status: 400,
    });
  }
}
async function handleUserCreatedOrUpdated(data: {
  id: string;
  email_addresses: Array<{ email_address: string }>;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
}) {
  const { id, email_addresses, first_name, last_name, image_url } = data;
  const primaryEmail = email_addresses?.[0]?.email_address;
  console.log('User created or updated:', { id });
  // Create or update user in database
  const user = await upsertUser({
    clerkUserId: id,
    name: `${first_name} ${last_name}`,
    email: primaryEmail,
    profileUrl: image_url || '',
  });
  return user;
}
async function handleUserDeleted(data: { id?: string }) {
  const id = data.id;
  if (!id) return;
  console.log('User deleted:', { id });
  await deleteUser(id.toString());
}
