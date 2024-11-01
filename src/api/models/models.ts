import { Schema, model, Document } from 'mongoose';

interface IWhitelist extends Document {
  ip: string;
  startDate: Date;
  endDate: Date;
}

interface IClient extends Document {
  ip: string;
  availableBandwidth: number;
  createdAt: Date;
  updatedAt: Date;
}

const WhitelistSchema = new Schema<IWhitelist>({
  ip: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
}, { timestamps: true });

const ClientSchema = new Schema<IClient>({
  ip: { type: String, required: true },
  availableBandwidth: { type: Number, required: true },
}, { timestamps: true });


const Whitelist = model<IWhitelist>('Whitelist', WhitelistSchema);
const Client = model<IClient>('Client', ClientSchema);

export { Whitelist, Client, IWhitelist, IClient };
