import { Request, Response } from 'express';
import knex from '../../database/knex';
import config from '../../config/app';

class ItemController {
    async index(request: Request, response: Response) {
        const items = await knex('items')
            .select([
                'items.id',
                'items.title',
                'items.image',
            ]);

        return response.json(items.map(item => ({
            id: item.id,
            title: item.title,
            image_url: `${config.scheme}://${config.domain}/images/items/${item.image}`,
        })));
    }
}

export default ItemController;
