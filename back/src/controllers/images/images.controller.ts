import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import fs = require('fs');

@Controller('images')
export class ImagesController {

    @Get("/:imgId")
    getImageById(@Res() res: Response, @Param() params) { 
        const imagePath = `assets/qrCodes/${params.imgId}`

        res.contentType('image/png');
        res.sendFile(imagePath, {root: "./src"});
    }
}
