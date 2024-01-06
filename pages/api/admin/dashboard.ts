import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = 
| {
    numberOfOrders: number; // contar las ordenes, los id de ordenes
    paidOrders: number; // contar el isPaid en true
    notPaidOrders: number; 
    numberOfClients: number; // buscar que el rol sea unicamente client
    numberOfProducts: number; // conteo de productos
    productsWithNoInventory: number; // 0
    lowInventory: number; // productos con 10 articulos o menos
    
}
| { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method) {
        case 'GET':
            return getDashboardData(req, res);

        default:
            return res.status(400).json({ message: 'Bad request'});
    }
}

const getDashboardData= async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const [
        numberOfOrders,
        paidOrders,        
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    ] = await Promise.all([
        Order.count(),
        Order.find({isPaid: true}).count(),
        User.find({role: 'client'}).count(),
        Product.count(),
        Product.find({inStock: 0}).count(),
        Product.find({inStock: {$lte: 10}}).count(),
    ])
    await db.disconnect();

    return res.status(201).json({
        numberOfOrders,
        paidOrders,
        notPaidOrders: numberOfOrders - paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory
    });    
}
