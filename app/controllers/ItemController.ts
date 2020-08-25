import { Request, Response } from 'express';

import knex from '../../database/knex';
import url from '../utils/url';

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
            image_url: url(`/images/items/${item.image}`),
        })));
    }
}

export default ItemController;
