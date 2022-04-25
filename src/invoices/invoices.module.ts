import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

@Module({ //Used to organize application components.
    imports:[TypeOrmModule.forFeature([Invoice])],
    controllers:[InvoicesController],
    providers: [InvoicesService]
})
export class InvoicesModule {}
