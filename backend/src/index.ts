import { AppService } from './app/app.service.ts'

const app = new AppService()

app.run(() => {
    console.log('Server has been started')
})
