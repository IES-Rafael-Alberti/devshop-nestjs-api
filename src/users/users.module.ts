import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Address } from '../addresses/entities/address.entity';
import {Event} from '../events/entities/event.entity';

class MockUsersService{}
@Module({//Used to organize application components.
    imports:[TypeOrmModule.forFeature([User, Order, Address, Event])],
    controllers:[UsersController],
    providers: [
        {
            provide: UsersService,
            useValue: new MockUsersService(),
        }
    ],
    exports: [UsersService],
})
export class UsersModule {}
