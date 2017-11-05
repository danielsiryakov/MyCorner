import shop from '../../api/shop'
import axios from 'axios'
import router from '../../router'
import Vue from 'vue'
import { Cookies, Loading, Alert } from 'quasar'
const CREATE_STORE = shop.API_URL + 'store/create'
const IMAGEUPLOAD = shop.API_URL + 'assets/image/upload'
const state = {
  selectedStore: '',
  dashboardStore: {},
  T1Aisles: [],
  T2Categories: [],
  T2Aisles: {},
  orders: [],
  categoriesT2: [
    {
      category_id: '59f646a4584d101323d90b43',
      name: 'Condiments',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b3f',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b44',
      name: 'Spreads',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b3f',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b48',
      name: 'Oils & Vinegars',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b3f',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b40',
      name: 'Baking Ingredients',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b3f',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b41',
      name: 'Pickled Goods & Olives',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b3f',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b42',
      name: 'Spices & Seasonings',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b3f',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b45',
      name: 'Preserved Dips & Spreads',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b3f',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b46',
      name: 'Doughs, Gelatins & Bake Mixes',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b3f',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b47',
      name: 'Baking Supplies & Decor',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b3f',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b49',
      name: 'Salad Dressing & Toppings',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b3f',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b4a',
      name: 'Honeys, Syrups & Nectars',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b3f',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b4b',
      name: 'Marinades & Meat Preparation',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b3f',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b53',
      name: 'Lunch Meat',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b50',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b54',
      name: 'Prepared Meals',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b50',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b55',
      name: 'Prepared Soups & Salads',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b50',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b51',
      name: 'Specialty Cheeses',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b50',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b52',
      name: 'Fresh Dips & Tapenades',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b50',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b57',
      name: 'Bakery Desserts',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b56',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b58',
      name: 'Breakfast Bakery',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b56',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b59',
      name: 'Bread',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b56',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b5a',
      name: 'Buns & Rolls',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b56',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b5b',
      name: 'Tortillas & Flat Bread',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b56',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b5d',
      name: 'Fresh Fruits',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b5c',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b5e',
      name: 'Tofu & Meat Alternatives',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b5c',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b5f',
      name: 'Fresh Vegetables',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b5c',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b60',
      name: 'Packaged Vegetables & Fruits',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b5c',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b61',
      name: 'Fresh Herbs',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b5c',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b63',
      name: 'Baby Accessories',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b62',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b64',
      name: 'Baby Bath & Body Care',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b62',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b65',
      name: 'Baby Food & Formula',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b62',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b66',
      name: 'Baby First Aid & Vitamins',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b62',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b67',
      name: 'Diapers & Wipes',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b62',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b69',
      name: 'Kosher Foods',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b68',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b6a',
      name: 'Latino Foods',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b68',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b6b',
      name: 'Asian Foods',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b68',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b6c',
      name: 'Indian Foods',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b68',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b6e',
      name: 'Breakfast Bars & Pastries',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b6d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b6f',
      name: 'Cereal',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b6d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b70',
      name: 'Granola',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b6d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b71',
      name: 'Hot Cereal & Pancake Mixes',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b6d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b73',
      name: 'Cat Food & Care',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b72',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b74',
      name: 'Dog Food & Care',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b72',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b75',
      name: 'Small Animal Care',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b72',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90ae4',
      name: 'Canned Fruit & Applesauce',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae3',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90ae5',
      name: 'Canned & Jarred Vegetables',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae3',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90ae6',
      name: 'Canned Meals & Beans',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae3',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90ae7',
      name: 'Canned Meat & Seafood',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae3',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90ae8',
      name: 'Soup, Broth & Bouillon',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae3',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90aea',
      name: 'Milk',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae9',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90aeb',
      name: 'Packaged Cheese',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae9',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90aec',
      name: 'Other Creams & Cheeses',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae9',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90aed',
      name: 'Butter',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae9',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90aee',
      name: 'Cream',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae9',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90aef',
      name: 'Eggs',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae9',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90af0',
      name: 'Soy & Lactose-Free',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae9',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90af1',
      name: 'Refrigerated Pudding & Desserts',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae9',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90af2',
      name: 'Yogurt',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae9',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90af4',
      name: 'Packaged Seafood',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90af3',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90af5',
      name: 'Packaged Meat',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90af3',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90af6',
      name: 'Packaged Poultry',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90af3',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90af7',
      name: 'Hot Dogs, Bacon & Sausage',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90af3',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90af8',
      name: 'Meat Counter',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90af3',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90af9',
      name: 'Poultry Counter',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90af3',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90afa',
      name: 'Seafood Counter',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90af3',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90afc',
      name: 'Eye & Ear Care',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90afd',
      name: 'Body Lotions & Soap',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90afe',
      name: 'Oral Hygiene',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90aff',
      name: 'Adult Care',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b00',
      name: 'Cold, Flu & Allergy',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b01',
      name: 'Deodorants',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b02',
      name: 'Digestion',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b03',
      name: 'Facial Care',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b04',
      name: 'Feminine Care',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b05',
      name: 'First Aid',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b06',
      name: 'Hair Care',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b07',
      name: 'Hand Care',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b08',
      name: 'Muscles, Joints & Pain Relief',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b09',
      name: 'Protein & Meal Replacements',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b0a',
      name: 'Shave Needs',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b0b',
      name: 'Stress & Sleep Aids',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b0c',
      name: 'Vitamins & Supplements',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90afb',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b0e',
      name: 'Cookies & Cakes',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b0d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b0f',
      name: 'Ice Cream Toppings',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b0d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b10',
      name: 'Energy & Granola Bars',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b0d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b11',
      name: 'Nuts, Seeds & Dried Fruit',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b0d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b12',
      name: 'Chips & Pretzels',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b0d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b13',
      name: 'Candy & Chocolate',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b0d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b14',
      name: 'Fruit & Vegetable Snacks',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b0d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b15',
      name: 'Crackers',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b0d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b16',
      name: 'Popcorn & Jerky',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b0d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b17',
      name: 'Mint & Gum',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b0d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b18',
      name: 'Trail Mix & Snack Mix',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b0d',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b1a',
      name: 'Frozen Breads & Doughs',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b19',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b1b',
      name: 'Ice Cream & Ice',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b19',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b1c',
      name: 'Frozen Breakfast',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b19',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b1d',
      name: 'Frozen Appetizers & Sides',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b19',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b1e',
      name: 'Frozen Meals',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b19',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b1f',
      name: 'Frozen Produce',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b19',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b20',
      name: 'Frozen Vegan & Vegetarian',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b19',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b21',
      name: 'Frozen Dessert',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b19',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b22',
      name: 'Frozen Juice',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b19',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b23',
      name: 'Frozen Meat & Seafood',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b19',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b24',
      name: 'Frozen Pizza',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b19',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b26',
      name: 'Cleaning Products',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b25',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b27',
      name: 'Food Storage',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b25',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b28',
      name: 'More Household',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b25',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b29',
      name: 'Air Fresheners & Candles',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b25',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b2a',
      name: 'Laundry',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b25',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b2b',
      name: 'Dish Detergents',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b25',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b2c',
      name: 'Paper Goods',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b25',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b2d',
      name: 'Trash Bags & Liners',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b25',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b2e',
      name: 'Kitchen Supplies',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b25',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b2f',
      name: 'Plates, Bowls, Cups & Flatware',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b25',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b31',
      name: 'Cocoa & Drink Mixes',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b30',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b32',
      name: 'Refrigerated',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b30',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b33',
      name: 'Coffee',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b30',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b34',
      name: 'Water, Seltzer & Sparkling Water',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b30',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b35',
      name: 'Energy & Sports Drinks',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b30',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b36',
      name: 'Juice & Nectars',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b30',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b37',
      name: 'Tea',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b30',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b38',
      name: 'Soft Drinks',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b30',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b3d',
      name: 'Dry Pasta',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b39',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b3e',
      name: 'Fresh Pasta',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b39',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b3a',
      name: 'Grains, Rice & Dried Goods',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b39',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b3b',
      name: 'Instant Foods',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b39',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b3c',
      name: 'Pasta Sauce',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b39',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b4d',
      name: 'Bulk Dried Fruits & Vegetables',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b4c',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b4e',
      name: 'Bulk Grains, Rice & Dried Beans',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b4c',
      enabled: true,
      children: [ ]
    },
    {
      category_id: '59f646a4584d101323d90b4f',
      name: 'Bulk Tea & Coffee',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90b4c',
      enabled: true,
      children: [ ]
    }
  ],
  categoriesT1: [
    {
      category_id: '59f646a4584d101323d90b3f',
      name: 'Pantry',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b40',
        '59f646a4584d101323d90b41',
        '59f646a4584d101323d90b42',
        '59f646a4584d101323d90b43',
        '59f646a4584d101323d90b44',
        '59f646a4584d101323d90b45',
        '59f646a4584d101323d90b46',
        '59f646a4584d101323d90b47',
        '59f646a4584d101323d90b48',
        '59f646a4584d101323d90b49',
        '59f646a4584d101323d90b4a',
        '59f646a4584d101323d90b4b'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b50',
      name: 'Deli',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b51',
        '59f646a4584d101323d90b52',
        '59f646a4584d101323d90b53',
        '59f646a4584d101323d90b54',
        '59f646a4584d101323d90b55'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b56',
      name: 'Bakery',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b57',
        '59f646a4584d101323d90b58',
        '59f646a4584d101323d90b59',
        '59f646a4584d101323d90b5a',
        '59f646a4584d101323d90b5b'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b5c',
      name: 'Produce',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b5d',
        '59f646a4584d101323d90b5e',
        '59f646a4584d101323d90b5f',
        '59f646a4584d101323d90b60',
        '59f646a4584d101323d90b61'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b62',
      name: 'Babies',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b63',
        '59f646a4584d101323d90b64',
        '59f646a4584d101323d90b65',
        '59f646a4584d101323d90b66',
        '59f646a4584d101323d90b67'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b68',
      name: 'International',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b69',
        '59f646a4584d101323d90b6a',
        '59f646a4584d101323d90b6b',
        '59f646a4584d101323d90b6c'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b6d',
      name: 'Breakfast',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b6e',
        '59f646a4584d101323d90b6f',
        '59f646a4584d101323d90b70',
        '59f646a4584d101323d90b71'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b72',
      name: 'Pets',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b73',
        '59f646a4584d101323d90b74',
        '59f646a4584d101323d90b75'
      ]
    },
    {
      category_id: '59f646a4584d101323d90ae3',
      name: 'Canned Goods',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90ae4',
        '59f646a4584d101323d90ae5',
        '59f646a4584d101323d90ae6',
        '59f646a4584d101323d90ae7',
        '59f646a4584d101323d90ae8'
      ]
    },
    {
      category_id: '59f646a4584d101323d90ae9',
      name: 'Dairy & Eggs',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90aea',
        '59f646a4584d101323d90aeb',
        '59f646a4584d101323d90aec',
        '59f646a4584d101323d90aed',
        '59f646a4584d101323d90aee',
        '59f646a4584d101323d90aef',
        '59f646a4584d101323d90af0',
        '59f646a4584d101323d90af1',
        '59f646a4584d101323d90af2'
      ]
    },
    {
      category_id: '59f646a4584d101323d90af3',
      name: 'Meat & Seafood',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90af4',
        '59f646a4584d101323d90af5',
        '59f646a4584d101323d90af6',
        '59f646a4584d101323d90af7',
        '59f646a4584d101323d90af8',
        '59f646a4584d101323d90af9',
        '59f646a4584d101323d90afa'
      ]
    },
    {
      category_id: '59f646a4584d101323d90afb',
      name: 'Personal Care',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90afc',
        '59f646a4584d101323d90afd',
        '59f646a4584d101323d90afe',
        '59f646a4584d101323d90aff',
        '59f646a4584d101323d90b00',
        '59f646a4584d101323d90b01',
        '59f646a4584d101323d90b02',
        '59f646a4584d101323d90b03',
        '59f646a4584d101323d90b04',
        '59f646a4584d101323d90b05',
        '59f646a4584d101323d90b06',
        '59f646a4584d101323d90b07',
        '59f646a4584d101323d90b08',
        '59f646a4584d101323d90b09',
        '59f646a4584d101323d90b0a',
        '59f646a4584d101323d90b0b',
        '59f646a4584d101323d90b0c'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b0d',
      name: 'Snacks',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b0e',
        '59f646a4584d101323d90b0f',
        '59f646a4584d101323d90b10',
        '59f646a4584d101323d90b11',
        '59f646a4584d101323d90b12',
        '59f646a4584d101323d90b13',
        '59f646a4584d101323d90b14',
        '59f646a4584d101323d90b15',
        '59f646a4584d101323d90b16',
        '59f646a4584d101323d90b17',
        '59f646a4584d101323d90b18'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b19',
      name: 'Frozen',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b1a',
        '59f646a4584d101323d90b1b',
        '59f646a4584d101323d90b1c',
        '59f646a4584d101323d90b1d',
        '59f646a4584d101323d90b1e',
        '59f646a4584d101323d90b1f',
        '59f646a4584d101323d90b20',
        '59f646a4584d101323d90b21',
        '59f646a4584d101323d90b22',
        '59f646a4584d101323d90b23',
        '59f646a4584d101323d90b24'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b25',
      name: 'Household',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b26',
        '59f646a4584d101323d90b27',
        '59f646a4584d101323d90b28',
        '59f646a4584d101323d90b29',
        '59f646a4584d101323d90b2a',
        '59f646a4584d101323d90b2b',
        '59f646a4584d101323d90b2c',
        '59f646a4584d101323d90b2d',
        '59f646a4584d101323d90b2e',
        '59f646a4584d101323d90b2f'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b30',
      name: 'Beverages',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b31',
        '59f646a4584d101323d90b32',
        '59f646a4584d101323d90b33',
        '59f646a4584d101323d90b34',
        '59f646a4584d101323d90b35',
        '59f646a4584d101323d90b36',
        '59f646a4584d101323d90b37',
        '59f646a4584d101323d90b38'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b39',
      name: 'Dry Goods & Pasta',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b3a',
        '59f646a4584d101323d90b3b',
        '59f646a4584d101323d90b3c',
        '59f646a4584d101323d90b3d',
        '59f646a4584d101323d90b3e'
      ]
    },
    {
      category_id: '59f646a4584d101323d90b4c',
      name: 'Bulk',
      root: '59f646a4584d101323d90ae2',
      parent: '59f646a4584d101323d90ae2',
      enabled: true,
      Children: [
        '59f646a4584d101323d90b4d',
        '59f646a4584d101323d90b4e',
        '59f646a4584d101323d90b4f'
      ]
    }
  ],
  store: {
    category_ids: [],
    email: '',
    platform_categories: ['Grocery', 'Corner Store'],
    working_hours: {
      sunday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      monday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      tuesday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      wednesday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      thursday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      friday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      saturday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      }
    },
    name: '',
    image: '',
    delivery: {
      delivery_distance: 2,
      delivery_fee: 500,
      delivery_minimum: 500,
      minimum_time_to_delivery: 45,
      maximum_time_to_delivery: 100,
      service_offered: true
    },
    phone: '',
    pickup: {
      offered: true,
      maximum_time_to_pickup: 90,
      minimum_time_to_pickup: 30,
      pickup_items: {
        max: 80,
        min: 20
      }
    },
    tax_rate: 4.5,
    address: {
      street_number: '',
      country: '',
      route: '',
      postal_code: '',
      longitude: '',
      latitude: '',
      administrative_area_level_1: ''
    },
    short_description: '',
    long_description: '',
    category_names: ['Grocery', 'Corner Store'],
    categories: []
  },
  storeTemplate: {
    email: '',
    platform_categories: ['Grocery', 'Corner Store'],
    working_hours: {
      sunday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      monday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      tuesday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      wednesday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      thursday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      friday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      },
      saturday: {
        hours: {
          to: 1800,
          from: 800
        },
        open: true
      }
    },
    name: '',
    image: '',
    delivery: {
      delivery_distance: 2,
      delivery_fee: 500,
      delivery_minimum: 500,
      minimum_time_to_delivery: 45,
      maximum_time_to_delivery: 100,
      service_offered: true
    },
    phone: '',
    pickup: {
      offered: true,
      maximum_time_to_pickup: 90,
      minimum_time_to_pickup: 30,
      pickup_items: {
        max: 80,
        min: 20
      }
    },
    tax_rate: 4.5,
    address: {
      street_number: '',
      country: '',
      route: '',
      postal_code: '',
      longitude: '',
      latitude: '',
      administrative_area_level_1: ''
    },
    short_description: '',
    long_description: '',
    category_names: ['Grocery', 'Corner Store'],
    categories: []
  },
  payment_details: {
    store_id: '',
    legal_entity: {
      billing_address: {
        name: '',
        city: '',
        phone: '',
        line1: '',
        route: '',
        user_id: '',
        default: false,
        country: '',
        location: {
          coordinates: null
        },
        apt_suite: '',
        latitude: 0,
        longitude: 0,
        postal_code: '',
        street_number: '',
        administrative_area_level_1: '',
        formatted_address: '',
        NewDefaultID: ''
      },
      business_tax_id: '',
      legal_business_name: '',
      personal_id: '',
      last_4_ssn: '',
      Owner: {
        First: '',
        Last: '',
        DOB: {
          day: 0,
          month: 0,
          year: 0
        }
      }
    },
    business_type: '',
    cc_payment_available: false,
    cash_payment_available: false
  }
}

const actions = {
  onFileChange ({commit}, e) {
    var files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    var reader = new FileReader()
    reader.onload = (e) => {
      Loading.show()
      axios.post(IMAGEUPLOAD, JSON.stringify({
        image: e.target.result,
        display_title: 'image'
      })
      ).then(response => {
        commit('createImage', response.data.link)
        Loading.hide()
      }).catch(error => {
        console.log(error)
      })
    }
    reader.readAsDataURL(files[0])
  },
  removeImage ({commit}) {
    commit('removeimage')
  },
  setName ({commit}, name) {
    commit('setname', name)
  },
  createStore ({ commit }) {
    let userID = Cookies.get('userID')
    let authtoken = Cookies.get('authtoken')
    axios.defaults.headers.common['authtoken'] = authtoken
    axios.defaults.headers.common['userID'] = userID
    var storePayload = state.store
    Object.keys(storePayload.working_hours).forEach(function (key) {
      var from = new Date(storePayload.working_hours[key].hours.from)
      var to = new Date(storePayload.working_hours[key].hours.to)
      console.log(from.getHours() * 100 + from.getMinutes())
      console.log(to.getHours() * 100 + to.getMinutes())
      storePayload.working_hours[key].hours = {
        from: from.getHours() * 100 + from.getMinutes(),
        to: to.getHours() * 100 + to.getMinutes()
      }
    })
    console.log(authtoken)
    axios.post(CREATE_STORE, JSON.stringify(storePayload)).then(function (response) {
      // axios.defaults.headers.common['authtoken'] = response.headers['authtoken']
      router.push('/admin')
      console.log(response)
    }).catch(function (error) {
      const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
      setTimeout(alert.dismiss, 7000)
      console.log(error)
    })
  },
  getFullStoreInfo ({commit}, id) {
    // shop.storeInfo
    shop.storeInfo(id, store => {
      commit('update_full_store', store)
      commit('update_store', {category_ids: store.category_ids})
    })
  },
  getActiveOrders ({commit}) {
    if (state.selectedStore !== '') {
      shop.ordersRetrieveActive(state.selectedStore).then(response => {
        commit('update_orders', response.data)
      }).catch(error => {
        console.log(error)
        const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
        setTimeout(alert.dismiss, 5000)
      })
    }
  },
  getT1Aisles ({commit}) {
    shop.templateCategoriesT1().then(response => {
      commit('updateT1Aisles', response.data)
    })
  },
  getT2Categories ({commit}, id) {
    shop.templateCategoriesT2(id).then(response => {
      commit('updateT2Categories', response.data)
    })
  }
}

const mutations = {
  updateT1Aisles (state, data) {
    state.T1Aisles = data
  },
  updateT2Categories (state, data) {
    state.T2Categories = data
  },
  createImage (state, file) {
    state.store.image = file
  },
  removeimage (state) {
    state.store.image = ''
  },
  update_orders (state, orders) {
    state.orders = orders
  },
  update_store (state, field) {
    let keys = Object.keys(field),
      key
    for (let index = keys.length - 1; index > -1; index--) {
      key = keys[index]

      if (state.store.hasOwnProperty(key)) {
        state.store[key] = field[key]
      }
    }
  },
  update_cash (state, field) {
    let keys = Object.keys(field),
      key
    for (let index = keys.length - 1; index > -1; index--) {
      key = keys[index]

      if (state.payment.cash.hasOwnProperty(key)) {
        state.payment.cash[key] = field[key]
      }
    }
  },
  update_pickup (state, field) {
    let keys = Object.keys(field),
      key
    for (let index = keys.length - 1; index > -1; index--) {
      key = keys[index]

      if (state.store.pickup.hasOwnProperty(key)) {
        state.store.pickup[key] = field[key]
      }
    }
  },
  update_delivery (state, field) {
    let keys = Object.keys(field),
      key
    for (let index = keys.length - 1; index > -1; index--) {
      key = keys[index]

      if (state.store.delivery.hasOwnProperty(key)) {
        state.store.delivery[key] = field[key]
      }
    }
  },
  update_working_hours (state, workingHours) {
    state.store.working_hours = workingHours
  },
  update_full_store (state, store) {
    state.store = store
  },
  update_store_selection (state, value) {
    state.selectedStore = value
  },
  reset_store (state) {
    state.store = state.storeTemplate
  },
  enableT1Aisle (state, id) {
    state.T1Aisles.forEach(aisle => {
      if (aisle.category_id === id) { aisle.enabled = false }
    })
    if (!(id in state.T2Aisles)) {
      shop.templateCategoriesT2(id).then(response => {
        Vue.set(state.T2Aisles, id, response.data)
      })
    }
    if (id in state.T2Aisles) {
      Vue.delete(state.T2Aisles, id)
      // setTimeout(console.log(this.T2Aisles), 300)
    }
  },
  addDeleteAisle (state, id) {
    let index = state.store.category_ids.indexOf(id)
    if (index > -1) {
      state.store.category_ids.splice(index, 1)
    }
    else {
      state.store.category_ids.push(id)
    }
  }
}

const getters = {
  storeImage (state) {
    return state.store.image
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
