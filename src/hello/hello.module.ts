import { Module } from '@nestjs/common';
import { HelloWorldResolver } from './hello-world/hello-world.resolver';

@Module({
  providers: [HelloWorldResolver],
})
export class HelloModule {}
