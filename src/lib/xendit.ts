import {Xendit} from 'xendit-node'

const xenditClient = new Xendit({
    secretKey: process.env.NEDXT_PUBLIC_XENDIT_KEY ?? '-'
})

export default xenditClient