import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);

export const sendSMS = async (to: string, message: string) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: to,
    });
    
    return result;
  } catch (error) {
    throw new Error(`SMS sending failed: ${error}`);
  }
};

export const sendWorkOrderNotification = async (workOrderId: string, action: string, phoneNumber: string) => {
  const message = `WorkOrderWizard: Work Order #${workOrderId.slice(-8)} ${action}. Check your dashboard for details.`;
  return await sendSMS(phoneNumber, message);
};
