import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { GlobalHttpFilter } from './common/global-http.filter';
import { ResponseInterceptor } from './common/response.interceptor';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
      description: '填入用户手机号即可，例如 13300000001',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalHttpFilter());
  await app.listen(3000);
}
bootstrap();
