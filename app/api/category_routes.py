from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Category, db, Product


category_routes = Blueprint("categories", __name__)


@category_routes.route('/')
def get_all_categories():
    categories = Category.query.all()
    return [category.to_dict() for category in categories]

@category_routes.route('/<int:id>')
def get_category_products(id):
    category_products = Product.query.filter(Product.category_id == id);

    return [product.to_dict() for product in category_products]
