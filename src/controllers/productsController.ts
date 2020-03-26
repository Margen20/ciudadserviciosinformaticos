import { Request, Response, text} from 'express';

import pool from '../database'

class ProductsController {

    public async list (req: Request, res: Response)  {
         const products = await pool.query('SELECT * FROM product');
         res.json(products);
    } 

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const products = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
        if (products.length > 0) {
            return res.json(products[0]);
        }
        res.status(404).json({text: "the product doesn´t exist"});
    }


    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO product set ?', [req.body]);
        res.json({message: 'Product Save'});
    }
    
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE product set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The was updated'});
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM product WHERE id = ?', [id]);
        res.json({message: 'The product  was deleted'});
    }



}

const productController = new ProductsController();
export default productController;
