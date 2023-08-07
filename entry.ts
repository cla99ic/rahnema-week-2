process.env.ENGINE = process.argv[0].includes('ts-node') ? 'ts-node' : 'node'

import { app } from './app'

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening On Port ${port}`)
})
