from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import  InCartItem, db
from app.forms.shopping_cart_form import ShoppingCartForm
from .auth_routes import validation_errors_to_error_messages

shopping_cart_routes = Blueprint("shoppingCart", __name__)


@shopping_cart_routes.route('/')
@login_required
def get_all_items_in_cart ():
    items = InCartItem.query.filter(InCartItem.user_id == current_user.id)
    return [item.to_dict() for item in items]


@shopping_cart_routes.route('/', methods=["POST"])
@login_required
def add_to_cart():
    data = request.get_json()
    form = ShoppingCartForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        item = InCartItem(
            user_id=data["user_id"],
            product_id=data["product_id"],
            quantity=data["quantity"],
        )
        db.session.add(item)
        db.session.commit()
        return item.to_dict()

@shopping_cart_routes.route('/', methods=["PUT"])
@login_required
def edit_cart_item():
    data = request.get_json()

    item = InCartItem.query.get(data["id"])

    if item:
        item.quantity = data["quantity"]
        db.session.commit()

    return item.to_dict()

@shopping_cart_routes.route('/', methods=["DELETE"])
@login_required
def remove_item_in_cart():
    data = request.get_json()

    item = InCartItem.query.get(data["id"])

    if item:
        db.session.delete(item)
        db.session.commit()
        return {"message": "Successfully removed"}
