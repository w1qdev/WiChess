import { AppService } from './app/app.service.ts'

const appService = new AppService()

appService.run(() => {
    console.log('Server has been started')
})
