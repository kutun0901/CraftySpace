from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product
from .auth_routes import validation_errors_to_error_messages


search_routes = Blueprint('search', __name__)

@search_routes.route('/')
def search_products(keyWord):
    products = Product.query.filter(Product.name.like("%keyWord%")).all()
    return [product.to_dict() for product in products]
