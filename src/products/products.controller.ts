import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){

    }
    //GET HTTP handler using a Nest decorator

    @Get()
    // Request that will be used to fetch all the results for this controller

    findAll(@Query() paginationQuery){
        //const {limit, offset} = paginationQuery;
        return this.productService.findAll();
    }
    @Get(':id')
    /* Request that returns a result by its id.
    The @Param lets grab all incoming request parameters and use them 
    inside of the function body.*/
    findOne(@Param('id') id: number){
        return this.productService.findOne('' + id);
    }
    @Post()
    // Body decorator as parameter for getting all or specific portion of the request

    create(@Body() createProductDto: CreateProductDto){
        console.log(createProductDto instanceof CreateProductDto)
        return this.productService.create(createProductDto);
    }
    // Method to modify datas partially

    @Patch(':id')
    /* Needs of Param decorator that receives as parameter the product's id
    and the Body parameter that is going to be the request body */
update(@Param('id') id:string, @Body() updateProductDto: UpdateProductDto){
        return this.productService.update(id, updateProductDto);
    }
    // Method to remove a product by its id

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.productService.remove(id)
    }

}
