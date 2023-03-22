from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product

product_routes = Blueprint("products", __name__)

@product_routes.route('/')
def get_all_products():

    """
    get all products
    """
    products = Product.query.all()
    return {"product": [product.to_dict() for product in products]}

@product_routes.route('/<int:id>')
def get_single_product(id):
    product = Product.query.get(id)

    if not product:
        return {"error": "Product no longer available"}
    else:
        return product.to_dict()


@product_routes.route('/', methods=[POST])
@login_required
def
