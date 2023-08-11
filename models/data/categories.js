import 'dotenv/config.js'
import '../../config/database.js';
import Category from '../Category.js'

let categories = [
    {
        name: 'shonen',
        color: '#EF8481',
        create_by: '3123123123dsadda2213'
    },
    {
        name: 'comics',
        color: '#8883F0',
        create_by: '31238531zdsadda2213'
    },
]

Category.insertMany(categories);