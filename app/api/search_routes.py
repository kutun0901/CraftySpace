from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Product


search_routes = Blueprint('search', __name__)

@search_routes.route('/<keyWord>')
def search_products(keyWord):
    products = Product.query.filter(Product.name.ilike("%" + keyWord + "%")).all()
    return [product.to_dict() for product in products]
