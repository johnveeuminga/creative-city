import Xendit from "xendit-node";

if(!process.env.XENDIT_SECRET_KEY)
  throw new Error('Unable to find Xendit Secret Key')


const xendit = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY
})

export default xendit