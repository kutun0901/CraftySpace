from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, product
from .auth_routes import validation_errors_to_error_messages


search_routes = Blueprint('search', __name__)
