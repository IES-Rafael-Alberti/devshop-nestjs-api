import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressesController {
    constructor(private readonly addressService: AddressesService){

    }
    //GET HTTP handler using a Nest decorator
    @Get()
    // Request that will be used to fetch all the results for this controller
    findAll(@Query() paginationQuery){
        //const {limit, offset} = paginationQuery;
        return this.addressService.findAll();
    }
    @Get(':id')
    /* Request that returns a result by its id.
    The @Param lets grab all incoming request parameters and use them 
    inside of the function body.*/
    findOne(@Param('id') id: number){
        return this.addressService.findOne('' + id);
    }
    @Post()
    // Body decorator as parameter for getting all or specific portion of the request
    create(@Body() createAddressDto: CreateAddressDto){
        console.log(createAddressDto instanceof CreateAddressDto)
        return this.addressService.create(createAddressDto);
    }
    // Method to modify datas partially
    @Patch(':id')
    /* Needs of Param decorator that receives as parameter the product's id
       and the Body parameter that is going to be the request body */
    update(@Param('id') id:string, @Body() updateAddressDto: UpdateAddressDto){
        return this.addressService.update(id, updateAddressDto);
    }
    // Method to remove a product by its id
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.addressService.remove(id)
    }
}