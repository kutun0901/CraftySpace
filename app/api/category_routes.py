from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Category, db


category_routes = Blueprint("categories", __name__)


@category_routes.route('/')
def get_all_categories():
    categories = Category.query.all()
    return [category.to_dict() for category in categories]
