from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Product, db, ProductImage
from app.forms.product_form import ProductForm
from .auth_routes import validation_errors_to_error_messages

shopping_cart_routes = Blueprint("shoppingCart", __name__)
