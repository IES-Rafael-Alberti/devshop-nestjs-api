import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Connection,Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class InvoicesService {// InvoicesService will be responsible for data storage and retieval.
    constructor(
      @InjectRepository(Invoice)
      private readonly invoiceRepository: Repository<Invoice>,
      private readonly connection:Connection,
    ) {}
    // Interactions with data sources
    
    findAll(paginationQuery: PaginationQueryDto) {//Pagination helps us divide into consumable segment of information
      const {limit, offset} =paginationQuery;

      return this.invoiceRepository.find({
        relations: ['order'],
        skip: offset,// offset is the number of records we want to skip before selecting records.
        take: limit,//Limit is the number of records we want to take after skipping is done.
      }
      );
    }
  
    async findOne(id: string) {
      const invoice = await this.invoiceRepository.findOne(id, {
        relations: ['order']
      });
      if (!invoice) {
        throw new NotFoundException(`Factura #${id} no encontrada`); // Exception when the invoice doesn't exist in data source
      }
      return invoice;
    }
  
    create(createInvoiceDto: CreateInvoiceDto) {
      const invoice = this.invoiceRepository.create(createInvoiceDto);
      return this.invoiceRepository.save(invoice);
    }
  
    async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
      const invoice = await this.invoiceRepository.preload({// Preload updates an existing entity. If not exists throws an exception
        id: +id,
        ...updateInvoiceDto,
      });
      if (!invoice) {
        throw new NotFoundException(`Factura #${id} no encontrada`);
      }
      return this.invoiceRepository.save(invoice);
    }
  
    async remove(id: string) {
      const invoice = await this.findOne(id);
      return this.invoiceRepository.remove(invoice);
    }
    async recommendInvoice(invoice: Invoice) {
      const queryRunner = this.connection.createQueryRunner();
      
      await queryRunner.connect();
      await queryRunner.startTransaction(); 
      try {
        invoice.recommendations++;
        
        const recommendEvent = new Event();
        recommendEvent.name = 'recommend_invoice';
        recommendEvent.type = 'invoice';
        recommendEvent.payload = { invoiceId: invoice.id };
      
        await queryRunner.manager.save(invoice); 
        await queryRunner.manager.save(recommendEvent);
        
        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }
}
