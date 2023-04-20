import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile()
  })

  describe('getHello', () => {
    it('should return welcome message', () => {
      const appController = app.get(AppController)

      expect(appController.getHello()).toMatchObject({
        message: 'Hello from offers API!'
      })
    })
  })
})