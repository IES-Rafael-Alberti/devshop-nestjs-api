import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';

@Module({//Used to organize application components.
    imports:[TypeOrmModule.forFeature([Supplier])],
    controllers:[SuppliersController],
    providers: [SuppliersService]
})
export class SuppliersModule {}
