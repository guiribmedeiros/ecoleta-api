import { Request, Response } from 'express';
import knex from '../../database/knex';

class PointController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const points = await knex('points')
            .join('item_point', 'points.id', '=', 'item_point.point_id')
            .whereIn('item_point.item_id', String(items).split(',').map(item => Number(item.trim())))
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select([
                'points.id',
                'points.image',
                'points.name',
                'points.email',
                'points.whatsapp',
                'points.latitude',
                'points.longitude',
                'points.city',
                'points.uf',
            ]);

        return response.json(points);
    };

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({
                message: 'Point not found.'
            });
        }

        const items = await knex('items')
            .join('item_point', 'items.id', '=', 'item_point.item_id')
            .where('item_point.point_id', id)
            .select([
                'items.id',
                'items.title',
            ]);

        return response.json({
            point,
            items
        });
    };

    async create(request: Request, response: Response) {
        const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;
        const transaction = await knex.transaction();

        // Insert the point
        const insertedIds = await transaction('points').insert({
            image: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        });

        // Insert the item's point
        const point_id = insertedIds[0];

        await transaction('item_point').insert(
            items.map((item_id: Number) => ({
                item_id,
                point_id,
            }))
        );

        await transaction.commit();

        return response.json({
            point_id
        });
    };
}

export default PointController;
